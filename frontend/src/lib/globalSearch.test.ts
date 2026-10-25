import { describe, it, expect } from "vitest";
import {
  boardFromStatementBoard,
  boardFromSubjectName,
  resolveBoard,
  normaliseForSearch,
  tokenize,
  matchesTokens,
  scoreName,
} from "./globalSearch";

describe("boardFromStatementBoard", () => {
  it("maps the board codes the spec statements actually store", () => {
    expect(boardFromStatementBoard("CAIE")).toBe("cambridge");
    expect(boardFromStatementBoard("Edexcel")).toBe("edexcel");
  });

  it("treats an empty value as unknown rather than as a board", () => {
    expect(boardFromStatementBoard(null)).toBeNull();
    expect(boardFromStatementBoard("")).toBeNull();
    expect(boardFromStatementBoard("   ")).toBeNull();
  });

  it("keeps a board it does not know out of the named groups", () => {
    expect(boardFromStatementBoard("WJEC")).toBe("other");
  });
});

describe("boardFromSubjectName", () => {
  it("reads the board out of the two English subject names", () => {
    expect(boardFromSubjectName("English First Language (Cambridge)")).toBe("cambridge");
    expect(boardFromSubjectName("English as a Second Language (Oxford)")).toBe("oxfordaqa");
  });

  it("does not invent a board for a plain subject name", () => {
    expect(boardFromSubjectName("Physics")).toBeNull();
  });
});

describe("resolveBoard", () => {
  // The case that makes statements win: Biology IGCSE is Cambridge 0610, while
  // Biology AS/A2 carry Edexcel 9BI0 statements. One name, two boards.
  it("follows the spec statements over the subject name", () => {
    expect(resolveBoard(["Edexcel"], "Biology")).toBe("edexcel");
    expect(resolveBoard([null, "CAIE"], "Biology")).toBe("cambridge");
  });

  it("falls back to the name when a subject has no statements yet", () => {
    expect(resolveBoard([], "English First Language (Cambridge)")).toBe("cambridge");
    expect(resolveBoard(null, "English as a Second Language (Oxford)")).toBe("oxfordaqa");
  });

  it("says 'other' when neither source knows", () => {
    expect(resolveBoard([], "Physics")).toBe("other");
  });
});

describe("normaliseForSearch", () => {
  it("folds punctuation, case and accents", () => {
    expect(normaliseForSearch("Forces & Motion")).toBe("forces motion");
    expect(normaliseForSearch("Acids, Bases — Salts")).toBe("acids bases salts");
    expect(normaliseForSearch("Énergie")).toBe("energie");
  });
});

describe("tokenize", () => {
  it("splits on whitespace and drops an empty query", () => {
    expect(tokenize("thermal  physics")).toEqual(["thermal", "physics"]);
    expect(tokenize("   ")).toEqual([]);
  });
});

describe("matchesTokens", () => {
  it("needs every token, in any order", () => {
    const haystack = "thermal physics physics igcse cambridge";
    expect(matchesTokens(haystack, ["thermal", "igcse"])).toBe(true);
    expect(matchesTokens(haystack, ["igcse", "thermal"])).toBe(true);
    expect(matchesTokens(haystack, ["thermal", "chemistry"])).toBe(false);
  });
});

describe("scoreName", () => {
  it("ranks exact, prefix, word-start and substring matches in that order", () => {
    expect(scoreName("Thermal Physics", tokenize("thermal physics"))).toBe(0);
    expect(scoreName("Thermal Physics", tokenize("therm"))).toBe(1);
    // The query names the second word, which a plain prefix test would miss.
    expect(scoreName("Thermal Physics", tokenize("physics"))).toBe(2);
    expect(scoreName("Thermal Physics", tokenize("ermal"))).toBe(3);
  });

  it("still reports a name that only matched through the haystack last", () => {
    expect(scoreName("Thermal Physics", tokenize("chemistry"))).toBe(4);
  });

  it("ranks an empty query as a weak match rather than an exact one", () => {
    expect(scoreName("Thermal Physics", [])).toBe(3);
  });
});
