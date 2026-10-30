import { describe, expect, it } from "vitest";
import { normaliseChecklist, normaliseMarks, questionList } from "../../../supabase/functions/ai-correction/marks";

describe("normaliseMarks (ai-correction)", () => {
  it("keeps in-range marks and computes the percentage", () => {
    expect(normaliseMarks({ marks_earned: 3, total_marks: 4 })).toEqual({
      marks_earned: 3,
      total_marks: 4,
      grade: 75,
      clamped: false,
    });
  });

  it("bounds marks above the total so the grade cannot exceed 100%", () => {
    const r = normaliseMarks({ marks_earned: 7, total_marks: 4 });
    expect(r.marks_earned).toBe(4);
    expect(r.grade).toBe(100);
    expect(r.clamped).toBe(true);
  });

  it("never returns a negative mark", () => {
    const r = normaliseMarks({ marks_earned: -2, total_marks: 5 });
    expect(r.marks_earned).toBe(0);
    expect(r.grade).toBe(0);
    expect(r.clamped).toBe(true);
  });

  it("gives 0% for a question with no total, never a divide-by-zero", () => {
    expect(normaliseMarks({ marks_earned: 3, total_marks: 0 })).toMatchObject({
      marks_earned: 0,
      total_marks: 0,
      grade: 0,
    });
  });

  it("treats non-numeric and missing values as zero", () => {
    expect(normaliseMarks({ marks_earned: "lots", total_marks: null })).toMatchObject({
      marks_earned: 0,
      total_marks: 0,
      grade: 0,
    });
    expect(normaliseMarks(undefined)).toMatchObject({ marks_earned: 0, total_marks: 0, grade: 0 });
  });

  it("floors fractional marks to whole marks", () => {
    expect(normaliseMarks({ marks_earned: 2.9, total_marks: 4 }).marks_earned).toBe(2);
  });

  it("keeps the paper total within range when summed across questions", () => {
    const rows = [
      normaliseMarks({ marks_earned: 9, total_marks: 4 }),
      normaliseMarks({ marks_earned: 2, total_marks: 4 }),
      normaliseMarks({ marks_earned: -1, total_marks: 2 }),
    ];
    const earned = rows.reduce((s, r) => s + r.marks_earned, 0);
    const possible = rows.reduce((s, r) => s + r.total_marks, 0);
    expect(earned).toBeLessThanOrEqual(possible);
    expect(earned).toBe(6);
    expect(possible).toBe(10);
  });

  it("reads a fraction in marks_earned as earned out of total", () => {
    expect(normaliseMarks({ marks_earned: "3/4" })).toMatchObject({
      marks_earned: 3,
      total_marks: 4,
      grade: 75,
    });
    expect(normaliseMarks({ marks_earned: "3 out of 4", total_marks: null })).toMatchObject({
      marks_earned: 3,
      total_marks: 4,
      grade: 75,
    });
  });

  it("reads a number with a unit word, so \"3 marks\" is not a zero", () => {
    expect(normaliseMarks({ marks_earned: "3 marks", total_marks: 4 })).toMatchObject({
      marks_earned: 3,
      total_marks: 4,
      grade: 75,
    });
  });

  it("still bounds a fraction that overscores", () => {
    const r = normaliseMarks({ marks_earned: "9/4" });
    expect(r).toMatchObject({ marks_earned: 4, total_marks: 4, grade: 100 });
    expect(r.clamped).toBe(true);
  });
});

describe("questionList (ai-correction)", () => {
  it("passes a bare array through", () => {
    const rows = [{ question: "1", marks_earned: 2, total_marks: 2 }];
    expect(questionList(rows)).toEqual(rows);
  });

  it("unwraps a list nested under a key", () => {
    const rows = [{ question: "1", marks_earned: 1, total_marks: 2 }];
    expect(questionList({ questions: rows })).toEqual(rows);
  });

  it("wraps a single question object", () => {
    const row = { question: "1", marks_earned: 1, total_marks: 2 };
    expect(questionList(row)).toEqual([row]);
  });

  it("returns null when there is nothing to mark", () => {
    expect(questionList("not json")).toBeNull();
    expect(questionList({ questions: [] })).toBeNull();
    expect(questionList({ note: "sorry" })).toBeNull();
    expect(questionList(null)).toBeNull();
  });
});

describe("normaliseChecklist (ai-correction, phase 3.1)", () => {
  const wellFormed = {
    mark_points: [
      {
        point: "M1 — substitutes u = 0, a = 2 into v = u + at",
        verdict: "PASS",
        evidence: "v = 0 + 2(3)",
        accept_equivalents: ["correct substitution"],
        reject_contradictions: [],
        ignore_clauses: ["awrt 2 s.f."],
      },
      {
        point: "A1 — v = 6 m s⁻¹",
        verdict: "MISS",
        evidence: "v = 8",
        accept_equivalents: [],
        reject_contradictions: ["v = 8 with no unit error shown"],
        ignore_clauses: ["ignore units"],
      },
    ],
  };

  it("reads a well-formed checklist and counts the verdicts", () => {
    const result = normaliseChecklist(wellFormed, 1);
    expect(result.points).toHaveLength(2);
    expect(result.passed).toBe(1);
    expect(result.missed).toBe(1);
    expect(result.points[0].accept_equivalents).toEqual(["correct substitution"]);
    expect(result.points[1].ignore_clauses).toEqual(["ignore units"]);
    expect(result.absent).toBe(false);
    // One PASS and marks_earned = 1, so the two agree.
    expect(result.disagreesWithMarks).toBe(false);
  });

  it("flags a checklist that disagrees with the mark", () => {
    const result = normaliseChecklist(wellFormed, 2);
    expect(result.disagreesWithMarks).toBe(true);
  });

  it("reads a boolean instead of a verdict word", () => {
    const result = normaliseChecklist(
      { criteria: [{ point: "B1 — names the unit", awarded: true }, { point: "B1 — sf", awarded: false }] },
      1,
    );
    expect(result.points.map((p) => p.verdict)).toEqual(["PASS", "MISS"]);
  });

  it("drops an unreadable verdict rather than guessing one", () => {
    // "partial" is not a verdict the UI can render; awarding it would be the
    // exact failure this feature exists to prevent.
    const result = normaliseChecklist(
      {
        mark_points: [
          { point: "M1 — method", verdict: "partial" },
          { point: "A1 — answer", verdict: "PASS", evidence: "6" },
          { verdict: "PASS" },
        ],
      },
      1,
    );
    expect(result.points).toHaveLength(1);
    expect(result.points[0].point).toBe("A1 — answer");
    expect(result.passed).toBe(1);
  });

  it("coerces a string where a list was asked for", () => {
    const result = normaliseChecklist(
      { mark_points: [{ point: "M1", verdict: "PASS", accept_equivalents: "oe; any valid method" }] },
      1,
    );
    expect(result.points[0].accept_equivalents).toEqual(["oe", "any valid method"]);
  });

  it("reports an absent checklist without claiming a disagreement", () => {
    for (const raw of [null, undefined, {}, { mark_points: [] }, { mark_points: "none" }]) {
      const result = normaliseChecklist(raw as Record<string, unknown>, 3);
      expect(result.absent).toBe(true);
      expect(result.points).toEqual([]);
      expect(result.disagreesWithMarks).toBe(false);
    }
  });
});
