import { describe, it, expect } from "vitest";
import { diffPicks, hiddenLevels, isFiltering } from "./subjectPicks";

describe("diffPicks", () => {
  it("writes nothing when the selection is unchanged", () => {
    const { add, remove } = diffPicks(["a", "b"], ["b", "a"]);
    expect(add).toEqual([]);
    expect(remove).toEqual([]);
  });

  // The bug this exists for: un-picking one subject used to wipe the rest.
  it("removes only the deselected subject", () => {
    const { add, remove } = diffPicks(["a", "b", "c"], ["a", "c"]);
    expect(remove).toEqual(["b"]);
    expect(add).toEqual([]);
  });

  it("adds only the newly selected subject", () => {
    const { add, remove } = diffPicks(["a"], ["a", "b"]);
    expect(add).toEqual(["b"]);
    expect(remove).toEqual([]);
  });

  it("handles swapping one subject for another", () => {
    const { add, remove } = diffPicks(["a", "b"], ["b", "c"]);
    expect(add).toEqual(["c"]);
    expect(remove).toEqual(["a"]);
  });

  it("adds everything when starting from nothing", () => {
    const { add, remove } = diffPicks([], ["a", "b"]);
    expect(add.sort()).toEqual(["a", "b"]);
    expect(remove).toEqual([]);
  });

  it("removes everything when clearing", () => {
    const { add, remove } = diffPicks(["a", "b"], []);
    expect(add).toEqual([]);
    expect(remove.sort()).toEqual(["a", "b"]);
  });

  it("ignores duplicates on either side", () => {
    const { add, remove } = diffPicks(["a", "a"], ["a", "b", "b"]);
    expect(add).toEqual(["b"]);
    expect(remove).toEqual([]);
  });

  it("accepts Sets as well as arrays", () => {
    const { add, remove } = diffPicks(new Set(["a"]), new Set(["a", "b"]));
    expect(add).toEqual(["b"]);
    expect(remove).toEqual([]);
  });
});

describe("hiddenLevels / isFiltering", () => {
  it("reports the levels not picked, in list order", () => {
    expect(hiddenLevels(["a", "b", "c"], new Set(["b"]))).toEqual(["a", "c"]);
  });

  it("reports nothing hidden when everything is picked", () => {
    expect(hiddenLevels(["a", "b"], new Set(["a", "b"]))).toEqual([]);
    expect(isFiltering(["a", "b"], new Set(["a", "b"]))).toBe(false);
  });

  it("counts everything as hidden when nothing is picked", () => {
    expect(hiddenLevels(["a", "b"], new Set())).toEqual(["a", "b"]);
    expect(isFiltering(["a", "b"], new Set())).toBe(true);
  });

  // Before the options load we must not claim anything is being filtered.
  it("does not claim to be filtering before the options are known", () => {
    expect(isFiltering([], new Set())).toBe(false);
  });
});
