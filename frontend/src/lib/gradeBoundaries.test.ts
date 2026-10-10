import { describe, expect, it } from "vitest";
import { gradeForPercent, indicativeGradeLabel } from "./gradeBoundaries";

describe("gradeForPercent", () => {
  it.each([
    [100, "A*"],
    [90, "A*"],
    [89, "A"],
    [80, "A"],
    [70, "B"],
    [60, "C"],
    [50, "D"],
    [40, "E"],
    [39, "U"],
    [0, "U"],
  ])("maps %i%% to %s", (percent, grade) => {
    expect(gradeForPercent(percent)).toBe(grade);
  });
});

describe("indicativeGradeLabel", () => {
  it("always carries the qualifier", () => {
    expect(indicativeGradeLabel(85)).toBe("A (indicative)");
    expect(indicativeGradeLabel(95)).toContain("(indicative)");
  });
});
