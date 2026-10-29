import { describe, expect, it } from "vitest";
import {
  boardLabel,
  isCurrentSyllabus,
  provenanceBadges,
  syllabusFilterCount,
  yearsCover,
} from "./questionProvenance";

describe("questionProvenance", () => {
  it("names the board from the subject slug", () => {
    expect(boardLabel("english-as-a-second-language-oxford")).toBe("OxfordAQA");
    expect(boardLabel("physics")).toBe("Cambridge (CAIE)");
    expect(boardLabel(null)).toBe("Cambridge (CAIE)");
  });

  it("reads a syllabus range, a single year, and nothing at all", () => {
    expect(yearsCover("2026-2028", 2026)).toBe(true);
    expect(yearsCover("2018-2026", 2026)).toBe(true);
    expect(yearsCover("2025-2027", 2026)).toBe(true);
    expect(yearsCover("2026", 2026)).toBe(true);
    expect(yearsCover("2027-2029", 2026)).toBe(false);
    expect(yearsCover(null, 2026)).toBe(false);
    expect(yearsCover("unknown", 2026)).toBe(false);
  });

  it("counts a question as current only when it is mapped and in date", () => {
    expect(isCurrentSyllabus({ statement_code: "3.2", statement_years: "2026-2028" }, 2026)).toBe(true);
    expect(isCurrentSyllabus({ statement_code: "3.2", statement_years: "2018-2024" }, 2026)).toBe(false);
    // Unmapped: no statement, no claim.
    expect(isCurrentSyllabus({ statement_years: "2026-2028" }, 2026)).toBe(false);
  });

  it("shows board, spec, difficulty and syllabus — and never a year/session badge", () => {
    const badges = provenanceBadges(
      { statement_code: "3.2", statement_title: "Kinematics of uniform motion", statement_years: "2026-2028", difficulty: "exam" },
      "Cambridge (CAIE)",
      2026,
    );
    expect(badges.map((b) => b.label)).toEqual([
      "Cambridge (CAIE)",
      "Spec 3.2",
      "Exam",
      "Current syllabus",
    ]);
    expect(badges.some((b) => /2019|May|June|variant/i.test(b.label))).toBe(false);
    expect(badges[1].title).toBe("Kinematics of uniform motion");
  });

  it("marks an outdated specification as outdated instead of current", () => {
    const badges = provenanceBadges({ statement_years: "2018-2024", statement_code: "1.1" }, "Cambridge (CAIE)", 2026);
    expect(badges.some((b) => b.label === "Current syllabus")).toBe(false);
    expect(badges.some((b) => b.label === "2018-2024")).toBe(true);
  });

  it("offers the filter only when some question is mapped", () => {
    const mapped = [{ statement_code: "1.1", statement_years: "2026-2028" }, { statement_years: null }];
    expect(syllabusFilterCount(mapped, 2026)).toBe(1);
    expect(syllabusFilterCount([{ statement_years: "2026-2028" }], 2026)).toBeNull();
  });
});
