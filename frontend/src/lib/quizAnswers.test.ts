import { describe, expect, it } from "vitest";

import { resolveQuizOptions } from "./quizAnswers";

describe("resolveQuizOptions", () => {
  it("keeps the index when every filled option survives", () => {
    expect(resolveQuizOptions(["2", "3", "4", "5"], 2)).toEqual({
      options: ["2", "3", "4", "5"],
      correctOption: 2,
      error: null,
    });
  });

  it("supports fewer than four options", () => {
    expect(resolveQuizOptions(["2", "3", "", ""], 1)).toEqual({
      options: ["2", "3"],
      correctOption: 1,
      error: null,
    });
  });

  it("follows the picked option across a blank slot instead of shifting it", () => {
    // Slot 4 is blank, so "5" moves from index 3 to index 2 — the index the form
    // reported (3) would have pointed past the end of the saved list.
    expect(resolveQuizOptions(["2", "3", "4", "", "6"], 4)).toEqual({
      options: ["2", "3", "4", "6"],
      correctOption: 3,
      error: null,
    });

    expect(resolveQuizOptions(["0.5", "", "0.25"], 2)).toEqual({
      options: ["0.5", "0.25"],
      correctOption: 1,
      error: null,
    });
  });

  it("never returns an index outside the options it hands back", () => {
    for (const [slots, picked] of [
      [["2", "3", "4", ""], 3],
      [["2", "3"], 4],
      [["2", "3", "4", "5"], 0],
      [["2", "3", "4", "5"], 3],
    ] as Array<[string[], number]>) {
      const r = resolveQuizOptions(slots, picked);
      if (r.error) continue;
      expect(r.options[r.correctOption]).toBe(slots[picked].trim());
      expect(r.correctOption).toBeLessThan(r.options.length);
      expect(r.correctOption).toBeGreaterThanOrEqual(0);
    }
  });

  it("refuses a question the picked option cannot point into", () => {
    for (const [slots, picked] of [
      [["2", "3", "4", ""], 3], // the picked slot is the blank one
      [["2", "3"], 4], // the pick is out of range entirely
    ] as Array<[string[], number]>) {
      expect(resolveQuizOptions(slots, picked).error).toMatch(/correct/i);
    }
  });

  it("refuses a question with nothing to choose between", () => {
    const r = resolveQuizOptions(["2", "  ", "", ""], 0);
    expect(r.error).toMatch(/two answer options/);
    expect(r.correctOption).toBe(-1);
  });

  it("trims option text on the way in", () => {
    expect(resolveQuizOptions(["  2 ", " 3", "", ""], 0)).toEqual({
      options: ["2", "3"],
      correctOption: 0,
      error: null,
    });
  });
});
