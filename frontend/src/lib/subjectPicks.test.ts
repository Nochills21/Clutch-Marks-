import { describe, it, expect } from "vitest";
import {
  diffPicks,
  hiddenLevels,
  isFiltering,
  needsSubjectPick,
  picksAreFiltering,
  type ReaderPicks,
} from "./subjectPicks";

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

describe("the one definition of who has to pick subjects", () => {
  const reader = (over: Partial<ReaderPicks> = {}): ReaderPicks => ({
    signedIn: true,
    isAdmin: false,
    loaded: true,
    pickedCount: 0,
    ...over,
  });

  it("asks a signed-in student with nothing picked to pick", () => {
    expect(needsSubjectPick(reader())).toBe(true);
    expect(picksAreFiltering(reader())).toBe(false);
  });

  it("leaves a signed-in student who has picked alone", () => {
    const picked = reader({ pickedCount: 3 });
    expect(needsSubjectPick(picked)).toBe(false);
    expect(picksAreFiltering(picked)).toBe(true);
  });

  // The public study pages depend on this: a signed-out visitor must never be
  // told they are missing a pick and must never be offered a "Show all" write.
  it("never gates or filters an anonymous reader", () => {
    const anon = reader({ signedIn: false });
    expect(needsSubjectPick(anon)).toBe(false);
    expect(picksAreFiltering(anon)).toBe(false);
  });

  it("never gates or filters an admin", () => {
    for (const pickedCount of [0, 4]) {
      const admin = reader({ isAdmin: true, pickedCount });
      expect(needsSubjectPick(admin)).toBe(false);
      expect(picksAreFiltering(admin)).toBe(false);
    }
  });

  // Three pages used to skip this, and flashed the picker at a student who had
  // already chosen subjects while their picks were still loading.
  it("decides nothing until the picks have loaded", () => {
    for (const pickedCount of [0, 3]) {
      const loading = reader({ loaded: false, pickedCount });
      expect(needsSubjectPick(loading)).toBe(false);
      expect(picksAreFiltering(loading)).toBe(false);
    }
  });

  it("never reports both at once", () => {
    for (const pickedCount of [0, 1, 7]) {
      for (const loaded of [true, false]) {
        for (const signedIn of [true, false]) {
          const r = reader({ pickedCount, loaded, signedIn });
          expect(needsSubjectPick(r) && picksAreFiltering(r)).toBe(false);
        }
      }
    }
  });
});
