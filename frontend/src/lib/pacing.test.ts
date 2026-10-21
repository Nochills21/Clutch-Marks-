import { describe, expect, it } from "vitest";
import { formatSeconds, pacingSummary, toTimingRows, type QuestionTiming } from "./pacing";

const t = (ordinal: number, seconds: number): QuestionTiming => ({
  questionId: `q${ordinal}`,
  ordinal,
  seconds,
});

describe("formatSeconds", () => {
  it("reads like a clock a student would say out loud", () => {
    expect(formatSeconds(0)).toBe("0s");
    expect(formatSeconds(45)).toBe("45s");
    expect(formatSeconds(60)).toBe("1m");
    expect(formatSeconds(80)).toBe("1m 20s");
    expect(formatSeconds(600)).toBe("10m");
  });
});

describe("pacingSummary", () => {
  it("finds the median, including the even-length case", () => {
    const odd = pacingSummary([t(0, 10), t(1, 20), t(2, 90)]);
    expect(odd.medianSeconds).toBe(20);
    const even = pacingSummary([t(0, 10), t(1, 20), t(2, 30), t(3, 40)]);
    expect(even.medianSeconds).toBe(25);
  });

  it("names a genuinely slow question, with how far off it was", () => {
    const summary = pacingSummary([t(0, 20), t(1, 20), t(2, 20), t(3, 150)]);
    expect(summary.slowest?.ordinal).toBe(3);
    expect(summary.slowest?.multipleOfMedian).toBe(7.5); // 150 / median 20
    expect(summary.slowestIsNotable).toBe(true);
    expect(summary.advice).toContain("Question 4");
    expect(summary.advice).toContain("2m 30s");
  });

  it("does not call a short question slow just because it is off the median", () => {
    // 12s against a 3s median is 4×, but nobody lost a paper over 12 seconds.
    const summary = pacingSummary([t(0, 3), t(1, 3), t(2, 12)]);
    expect(summary.slowestIsNotable).toBe(false);
    expect(summary.advice).not.toContain("budget");
  });

  it("puts blanks first, because they are the marks that were actually lost", () => {
    const summary = pacingSummary([t(0, 20), t(1, 20), t(2, 200)], { blank: 2 });
    expect(summary.blank).toBe(2);
    expect(summary.advice.startsWith("You left 2 questions blank.")).toBe(true);
    expect(summary.advice).toContain("Question 3");
  });

  it("uses the singular for a single blank", () => {
    const summary = pacingSummary([t(0, 20), t(1, 30)], { blank: 1 });
    expect(summary.advice.startsWith("You left 1 question blank.")).toBe(true);
  });

  it("notices a paper that consumed almost the whole clock", () => {
    const summary = pacingSummary([t(0, 300), t(1, 300), t(2, 250)], { limitSeconds: 900 });
    expect(summary.advice).toContain("of the 15m allowed");
  });

  it("says something true and positive when pacing was even", () => {
    const summary = pacingSummary([t(0, 40), t(1, 42), t(2, 38)], { limitSeconds: 600 });
    expect(summary.slowestIsNotable).toBe(false);
    expect(summary.advice).toContain("evenly spread");
  });

  it("does not print a multiple of a zero median when answers were near-instant", () => {
    const summary = pacingSummary([t(0, 0), t(1, 0), t(2, 9)]);
    expect(summary.medianSeconds).toBe(0);
    expect(summary.advice).not.toContain("×");
    expect(summary.advice).toContain("no pacing pattern");
  });

  it("survives an empty sitting without inventing numbers", () => {
    const summary = pacingSummary([]);
    expect(summary.answered).toBe(0);
    expect(summary.totalSeconds).toBe(0);
    expect(summary.slowest).toBeNull();
    expect(summary.advice.length).toBeGreaterThan(10);
  });

  it("ignores a negative or non-finite duration rather than folding it into the median", () => {
    const summary = pacingSummary([t(0, 10), t(1, -5), { ...t(2, 20), seconds: Number.NaN }]);
    expect(summary.answered).toBe(1);
    expect(summary.totalSeconds).toBe(10);
  });
});

describe("toTimingRows", () => {
  it("maps a sitting onto the table's columns", () => {
    const rows = toTimingRows([t(0, 12), t(1, 30)], { userId: "u1", quizId: "z1" });
    expect(rows).toEqual([
      { user_id: "u1", quiz_id: "z1", question_id: "q0", ordinal: 0, seconds: 12 },
      { user_id: "u1", quiz_id: "z1", question_id: "q1", ordinal: 1, seconds: 30 },
    ]);
  });

  it("drops a duration the CHECK constraint would reject", () => {
    const rows = toTimingRows([t(0, 12), t(1, 4000)], { userId: "u1", quizId: "z1" });
    expect(rows).toHaveLength(1);
  });
});
