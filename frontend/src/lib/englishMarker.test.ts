import { describe, expect, it } from "vitest";
import {
  isEnglishSubject,
  reconcileBand,
} from "../../../supabase/functions/ai-correction/englishMarker";

describe("isEnglishSubject (ai-correction, phase 3.3)", () => {
  it("recognises both English qualifications by slug", () => {
    expect(isEnglishSubject("english-first-language-cambridge", "English First Language (Cambridge)")).toBe(true);
    expect(isEnglishSubject("english-as-a-second-language-oxford", "English as a Second Language (Oxford)")).toBe(true);
  });

  it("falls back to the name when the slug is missing", () => {
    expect(isEnglishSubject(null, "English First Language (Cambridge)")).toBe(true);
  });

  it("does not claim a science or maths subject", () => {
    expect(isEnglishSubject("mathematics", "Mathematics")).toBe(false);
    expect(isEnglishSubject("physics", "Physics")).toBe(false);
    expect(isEnglishSubject(null, null)).toBe(false);
  });
});

describe("reconcileBand", () => {
  const writing = {
    question: "Describe a place you know well, and what makes it memorable. (25 marks)",
    total_marks: 25,
    band: "Band 4",
    criteria: [
      {
        name: "Content and Structure",
        band: "Band 4",
        marks_awarded: 10,
        marks_available: 13,
        descriptor: "Well-organised, sustained sense of place with selected detail.",
        evidence: "\"the tiles were cool even in August\"",
        next_step: "Give the second paragraph its own event so the piece has a turn.",
      },
      {
        name: "Style",
        band: "Band 3",
        marks_awarded: 7,
        marks_available: 12,
        descriptor: "Some varied sentence structures, occasional effective vocabulary.",
        evidence: "\"smelled of cardamom and old wood\"",
        next_step: "Vary the sentence openings in the final two paragraphs.",
      },
    ],
  };

  it("reads criteria, keeps the mark, and passes the question total through", () => {
    const band = reconcileBand(writing, 25);
    expect(band.absent).toBe(false);
    expect(band.criteria).toHaveLength(2);
    expect(band.marks_earned).toBe(17);
    expect(band.total_marks).toBe(25);
    expect(band.rescaled).toBe(false);
    expect(band.band).toBe("Band 4");
  });

  it("turns each criterion into a checklist entry that carries the band", () => {
    const band = reconcileBand(writing, 25);
    expect(band.points).toHaveLength(2);
    expect(band.points[0].point).toContain("Content and Structure");
    expect(band.points[0].point).toContain("Band 4");
    expect(band.points[0].verdict).toBe("MISS"); // 10 of 13
    expect(band.points[0].evidence).toContain("tiles");
    // A band grid names no "oe"/"ignore" lists; inventing them would put words
    // in the board's mouth.
    expect(band.points[0].accept_equivalents).toEqual([]);
    expect(band.criteria[1].next_step).toContain("sentence openings");
  });

  it("treats a criterion awarded in full as PASS", () => {
    const band = reconcileBand(
      {
        total_marks: 10,
        criteria: [
          { name: "Accuracy", band: "Band 5", marks_awarded: 10, marks_available: 10 },
          { name: "Content", band: "Band 2", marks_awarded: 2, marks_available: 4 },
        ],
      },
      10,
    );
    const verdicts = band.points.map((p) => p.verdict);
    expect(verdicts).toEqual(["PASS", "MISS"]);
  });

  it("never awards above a criterion's own maximum", () => {
    const band = reconcileBand(
      { total_marks: 10, criteria: [{ name: "Style", marks_awarded: 40, marks_available: 10 }] },
      10,
    );
    expect(band.marks_earned).toBe(10);
    expect(band.total_marks).toBe(10);
  });

  it("rescales criteria whose own totals disagree with the paper's total", () => {
    // The model reported a grid worth 30 for a 20-mark task.
    const band = reconcileBand(
      {
        total_marks: 20,
        criteria: [
          { name: "Content", marks_awarded: 15, marks_available: 20 },
          { name: "Style", marks_awarded: 5, marks_available: 10 },
        ],
      },
      20,
    );
    expect(band.rescaled).toBe(true);
    expect(band.total_marks).toBe(20);
    expect(band.marks_earned).toBeLessThanOrEqual(band.total_marks);
    // The ratio survives the scale: 20 of 30 credits becomes 14 of 20, not 20.
    expect(band.marks_earned).toBe(14);
  });

  it("falls back to the criteria total when the reply has no question total", () => {
    const band = reconcileBand(
      { criteria: [{ name: "Content", marks_awarded: 6, marks_available: 8 }] },
      0,
    );
    expect(band.total_marks).toBe(8);
    expect(band.marks_earned).toBe(6);
    expect(band.rescaled).toBe(false);
  });

  it("reports `absent` for a reading question, which has no criteria", () => {
    const band = reconcileBand({ mark_points: [{ point: "A1", verdict: "PASS" }] }, 5);
    expect(band.absent).toBe(true);
    expect(band.criteria).toEqual([]);
    expect(band.points).toEqual([]);
  });

  it("survives prose where the array belongs", () => {
    const band = reconcileBand({ criteria: "Band 3 overall, good piece." }, 20);
    expect(band.absent).toBe(true);
    expect(band.total_marks).toBe(20);
  });

  it("shares the question mark when the criteria carry none", () => {
    // Measured live: a Band 2 composition came back with every criterion at 0.
    const band = reconcileBand(
      {
        total_marks: 25,
        band: "Band 2",
        criteria: [
          { name: "Content and Structure", band: "Band 2", marks_awarded: 0, marks_available: 13, descriptor: "Clear focus.", evidence: "\"the market is loud\"" },
          { name: "Style", band: "Band 2", marks_awarded: 0, marks_available: 12, descriptor: "Some variation.", evidence: "\"cool even in August\"" },
        ],
      },
      25,
      17, // the question-level mark the model did send
    );
    expect(band.derivedFromQuestion).toBe(true);
    expect(band.marks_earned).toBe(17);
    expect(band.marks_earned).toBeLessThanOrEqual(band.total_marks);
    // Shared in proportion to the criteria's maxima: 13/25 of 17 is ~9.
    expect(band.criteria[0].marks_awarded).toBe(9);
    expect(band.criteria[1].marks_awarded).toBe(8);
  });

  it("leaves a genuinely unmarked script at zero", () => {
    const band = reconcileBand(
      { total_marks: 20, criteria: [{ name: "Content", marks_awarded: 0, marks_available: 20, evidence: "" }] },
      20,
      0,
    );
    expect(band.derivedFromQuestion).toBe(false);
    expect(band.marks_earned).toBe(0);
  });

  it("drops a criterion with no marks rather than inventing one", () => {
    const band = reconcileBand(
      {
        total_marks: 20,
        criteria: [
          { name: "Heading" },
          { name: "Content", marks_awarded: 8, marks_available: 10 },
        ],
      },
      20,
    );
    expect(band.criteria).toHaveLength(1);
    // One surviving criterion carries the paper's whole total, and the ratio
    // (8/10) survives the scale.
    expect(band.total_marks).toBe(20);
    expect(band.marks_earned).toBe(16);
  });
});
