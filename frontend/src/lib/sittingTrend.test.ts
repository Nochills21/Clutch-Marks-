import { describe, expect, it } from "vitest";
import { sittingTrend, type TimingRow } from "./pacing";

// One sitting = one submission: every row shares a quiz and a timestamp.
function sitting(quizId: string, at: string, seconds: number[]): TimingRow[] {
  return seconds.map((s, ordinal) => ({ quiz_id: quizId, created_at: at, ordinal, seconds: s }));
}

describe("sittingTrend: grouping", () => {
  it("treats rows with the same quiz and timestamp as one sitting", () => {
    const trend = sittingTrend([
      ...sitting("q1", "2026-10-01T10:00:00Z", [30, 40]),
      ...sitting("q1", "2026-10-08T10:00:00Z", [50]),
    ]);
    expect(trend.sittings.map((s) => s.answered)).toEqual([2, 1]);
  });

  it("orders sittings oldest first, whatever order the rows arrive in", () => {
    const trend = sittingTrend([
      ...sitting("q2", "2026-10-09T10:00:00Z", [20]),
      ...sitting("q1", "2026-10-01T10:00:00Z", [20]),
    ]);
    expect(trend.sittings.map((s) => s.at)).toEqual(["2026-10-01T10:00:00Z", "2026-10-09T10:00:00Z"]);
  });

  it("uses the median of each sitting, so one slow question does not dominate", () => {
    const trend = sittingTrend(sitting("q1", "2026-10-01T10:00:00Z", [10, 12, 14, 600]));
    expect(trend.sittings[0].medianSeconds).toBe(13);
  });
});

describe("sittingTrend: window", () => {
  it("keeps only the most recent sittings, oldest first", () => {
    const rows: TimingRow[] = [];
    for (let day = 1; day <= 9; day++) {
      rows.push(...sitting("q1", `2026-10-0${day}T10:00:00Z`, [day * 10]));
    }
    const trend = sittingTrend(rows, { last: 4 });
    expect(trend.sittings.map((s) => s.medianSeconds)).toEqual([60, 70, 80, 90]);
  });

  it("defaults to six sittings", () => {
    const rows: TimingRow[] = [];
    for (let day = 1; day <= 8; day++) {
      rows.push(...sitting("q1", `2026-10-0${day}T10:00:00Z`, [30]));
    }
    expect(sittingTrend(rows).sittings).toHaveLength(6);
  });
});

describe("sittingTrend: bad rows", () => {
  it("ignores negative, NaN and infinite times", () => {
    const trend = sittingTrend([
      { quiz_id: "q1", created_at: "2026-10-01T10:00:00Z", ordinal: 0, seconds: -5 },
      { quiz_id: "q1", created_at: "2026-10-01T10:00:00Z", ordinal: 1, seconds: Number.NaN },
      { quiz_id: "q1", created_at: "2026-10-01T10:00:00Z", ordinal: 2, seconds: Number.POSITIVE_INFINITY },
      { quiz_id: "q1", created_at: "2026-10-01T10:00:00Z", ordinal: 3, seconds: 42 },
    ]);
    expect(trend.sittings).toHaveLength(1);
    expect(trend.sittings[0].answered).toBe(1);
    expect(trend.sittings[0].medianSeconds).toBe(42);
  });

  it("returns no sittings and asks for more when there are no rows", () => {
    const trend = sittingTrend([]);
    expect(trend.sittings).toEqual([]);
    expect(trend.advice).toMatch(/at least two timed papers/);
  });
});

describe("sittingTrend: advice", () => {
  it("says the pace came down when the typical time fell by more than a tenth", () => {
    const trend = sittingTrend([
      ...sitting("q1", "2026-10-01T10:00:00Z", [60, 60, 60]),
      ...sitting("q1", "2026-10-08T10:00:00Z", [40, 40, 40]),
    ]);
    expect(trend.advice).toMatch(/come down from 1m to 40s/);
  });

  it("says the pace rose and suggests where to look", () => {
    const trend = sittingTrend([
      ...sitting("q1", "2026-10-01T10:00:00Z", [30, 30]),
      ...sitting("q1", "2026-10-08T10:00:00Z", [45, 45]),
    ]);
    expect(trend.advice).toMatch(/risen from 30s to 45s/);
    expect(trend.advice).toMatch(/hard questions/);
  });

  it("says the pace held when the change is small", () => {
    const trend = sittingTrend([
      ...sitting("q1", "2026-10-01T10:00:00Z", [50, 50]),
      ...sitting("q1", "2026-10-08T10:00:00Z", [52, 52]),
    ]);
    expect(trend.advice).toMatch(/held at about 52s/);
  });

  it("treats a 2-second wobble on a short paper as steady, not a trend", () => {
    const trend = sittingTrend([
      ...sitting("q1", "2026-10-01T10:00:00Z", [10, 10]),
      ...sitting("q1", "2026-10-08T10:00:00Z", [12, 12]),
    ]);
    expect(trend.advice).toMatch(/held at about 12s/);
  });
});
