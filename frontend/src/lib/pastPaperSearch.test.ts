import { describe, expect, it } from "vitest";
import {
  filterPapersBySearch,
  highlightSegments,
  matchRanges,
  matchesPaperSearch,
  queryTokens,
  searchableFields,
} from "./pastPaperSearch";

const chem = {
  title: "Cambridge IGCSE Chemistry (0625) — Paper 2: Core (0625/22)",
  year: 2024,
  session: "May/June",
  paper_number: "Paper 2 (22)",
  extras: ["Chemistry", "IGCSE"],
};

describe("queryTokens", () => {
  it("splits on any whitespace and lower-cases", () => {
    expect(queryTokens("  2024   Chem\tPaper ")).toEqual(["2024", "chem", "paper"]);
  });

  it("is empty for an empty query", () => {
    expect(queryTokens("")).toEqual([]);
    expect(queryTokens(null)).toEqual([]);
    expect(queryTokens(undefined)).toEqual([]);
  });
});

describe("matchesPaperSearch", () => {
  it("matches an empty query", () => {
    expect(matchesPaperSearch(chem, "")).toBe(true);
    expect(matchesPaperSearch(chem, "   ")).toBe(true);
  });

  it("matches one token anywhere in the row", () => {
    expect(matchesPaperSearch(chem, "chem")).toBe(true);
    expect(matchesPaperSearch(chem, "2024")).toBe(true);
    expect(matchesPaperSearch(chem, "may")).toBe(true);
  });

  it("requires every token (AND, not phrase) in any order", () => {
    // The old phrase matcher failed this: "2024" and "chem" never appeared
    // adjacent in the joined haystack.
    expect(matchesPaperSearch(chem, "2024 chem")).toBe(true);
    expect(matchesPaperSearch(chem, "chem 2024")).toBe(true);
    expect(matchesPaperSearch(chem, "paper 2 2024")).toBe(true);
    expect(matchesPaperSearch(chem, "2024 physics")).toBe(false);
  });

  it("searches the extras (topic / subject / level labels)", () => {
    expect(matchesPaperSearch({ title: "WMA11/01" }, "mathematics")).toBe(false);
    expect(
      matchesPaperSearch({ title: "WMA11/01", extras: ["Mathematics", "AS Level"] }, "mathematics as"),
    ).toBe(true);
  });

  it("treats regex metacharacters literally", () => {
    expect(matchesPaperSearch(chem, "(0625)")).toBe(true);
    expect(matchesPaperSearch(chem, "0625/22")).toBe(true);
    // A pattern that would match anything if compiled as a regex.
    expect(matchesPaperSearch(chem, ".*")).toBe(false);
  });

  it("is case-insensitive", () => {
    expect(matchesPaperSearch(chem, "CHEMISTRY iGCSE")).toBe(true);
  });

  it("keeps only matching rows and preserves order", () => {
    const rows = [
      chem,
      { title: "Cambridge IGCSE Physics (0625) — Paper 4", year: 2024, extras: ["Physics"] },
      { title: "Cambridge IGCSE Chemistry (0625) — Paper 4", year: 2023, extras: ["Chemistry"] },
    ];
    expect(filterPapersBySearch(rows, "chemistry 2024")).toEqual([chem]);
    expect(filterPapersBySearch(rows, "").length).toBe(3);
  });

  it("reads optional fields defensively", () => {
    expect(searchableFields({ title: null, year: null, extras: [null, undefined, "x"] })).toEqual(["x"]);
    expect(matchesPaperSearch({}, "anything")).toBe(false);
  });
});

describe("matchRanges", () => {
  it("finds every case-insensitive occurrence", () => {
    expect(matchRanges("Paper paper PAPER", "paper")).toEqual([
      { start: 0, end: 5 },
      { start: 6, end: 11 },
      { start: 12, end: 17 },
    ]);
  });

  it("merges overlapping and adjacent runs", () => {
    expect(matchRanges("Chemistry", "chem chemistry")).toEqual([{ start: 0, end: 9 }]);
  });

  it("sorts tokens regardless of query order", () => {
    expect(matchRanges("2024 Chemistry", "chemistry 2024")).toEqual([
      { start: 0, end: 4 },
      { start: 5, end: 14 },
    ]);
  });

  it("returns nothing without a query or a match", () => {
    expect(matchRanges("Paper 1", "")).toEqual([]);
    expect(matchRanges("", "paper")).toEqual([]);
    expect(matchRanges("Paper 1", "physics")).toEqual([]);
  });

  it("folds case without locale-dependent surprises", () => {
    // Plain toLowerCase on both sides: no Turkish-I length change to break the
    // offsets a highlight relies on.
    expect(matchRanges("IGCSE", "igcse")).toEqual([{ start: 0, end: 5 }]);
  });
});

describe("highlightSegments", () => {
  it("splits a title around its matches", () => {
    expect(highlightSegments("Chemistry Paper 2", "chem 2")).toEqual([
      { text: "Chem", match: true },
      { text: "istry Paper ", match: false },
      { text: "2", match: true },
    ]);
  });

  it("returns the whole text unmarked when nothing matches", () => {
    expect(highlightSegments("Physics", "chem")).toEqual([{ text: "Physics", match: false }]);
    expect(highlightSegments("Physics", "")).toEqual([{ text: "Physics", match: false }]);
  });

  it("handles a match at the very start and end", () => {
    expect(highlightSegments("2024", "2024")).toEqual([{ text: "2024", match: true }]);
  });
});
