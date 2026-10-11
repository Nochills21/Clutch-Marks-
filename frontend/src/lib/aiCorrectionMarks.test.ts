import { describe, expect, it } from "vitest";
import { normaliseMarks } from "../../../supabase/functions/ai-correction/marks";

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
});
