import { describe, expect, it } from "vitest";
import {
  CATEGORY_ORDER,
  adminPathForTable,
  categoryMeta,
  filterFindings,
  isSeverityError,
  sortFindings,
  summariseFindings,
  type IntegrityFinding,
} from "./contentIntegrity";

const finding = (over: Partial<IntegrityFinding> = {}): IntegrityFinding => ({
  category: "answer_index",
  severity: "warning",
  table_name: "questions",
  row_id: "00000000-0000-0000-0000-000000000001",
  label: "Algebra — Equations",
  field: "correct_option",
  detail: "2 duplicated option(s)",
  snippet: null,
  ...over,
});

describe("summariseFindings", () => {
  it("counts totals by severity and reports every category, including empty ones", () => {
    const summary = summariseFindings([
      finding({ category: "replacement_character", severity: "error" }),
      finding({ category: "answer_index", severity: "warning" }),
      finding({ category: "answer_index", severity: "error" }),
    ]);

    expect(summary.total).toBe(3);
    expect(summary.errors).toBe(2);
    expect(summary.warnings).toBe(1);
    expect(summary.clean).toBe(false);
    // A category with nothing wrong must still be listed — the panel shows the
    // count as 0 rather than omitting the check, so "clean" is visible as a fact.
    expect(summary.byCategory).toEqual([
      { category: "replacement_character", count: 1 },
      { category: "answer_index", count: 2 },
      { category: "material_type_alias", count: 0 },
      { category: "notes_recall_prompt", count: 0 },
    ]);
  });

  it("treats an empty report as clean", () => {
    const summary = summariseFindings([]);
    expect(summary.clean).toBe(true);
    expect(summary.total).toBe(0);
    expect(summary.byCategory.every((c) => c.count === 0)).toBe(true);
  });

  it("keeps a category the panel has no copy for instead of dropping it", () => {
    const summary = summariseFindings([finding({ category: "brand_new_check", severity: "error" })]);
    expect(summary.total).toBe(1);
    expect(summary.byCategory).toContainEqual({ category: "brand_new_check", count: 1 });
  });
});

describe("sortFindings", () => {
  it("puts errors first, then the fixed category order, then table and label", () => {
    const rows = [
      finding({ category: "material_type_alias", severity: "warning", label: "Zeta" }),
      finding({ category: "answer_index", severity: "warning", label: "Beta" }),
      finding({ category: "replacement_character", severity: "error", label: "Alpha" }),
      finding({ category: "answer_index", severity: "warning", label: "Alpha" }),
    ];

    expect(sortFindings(rows).map((r) => r.label)).toEqual([
      "Alpha", // the error first, whatever its category
      "Alpha", // then answer_index, alphabetical by label
      "Beta",
      "Zeta",
    ]);
  });

  it("does not reorder the caller's array", () => {
    const rows = [
      finding({ severity: "warning", label: "B" }),
      finding({ severity: "error", label: "A" }),
    ];
    sortFindings(rows);
    expect(rows.map((r) => r.label)).toEqual(["B", "A"]);
  });
});

describe("filterFindings", () => {
  it("returns everything for 'all' and one category otherwise", () => {
    const rows = [
      finding({ category: "answer_index" }),
      finding({ category: "material_type_alias" }),
    ];
    expect(filterFindings(rows, "all")).toHaveLength(2);
    expect(filterFindings(rows, "material_type_alias")).toHaveLength(1);
    expect(filterFindings(rows, "replacement_character")).toHaveLength(0);
  });
});

describe("categoryMeta", () => {
  it("labels every known category, in the panel's reading order", () => {
    expect(CATEGORY_ORDER.map((c) => categoryMeta(c).label)).toEqual([
      "Replacement characters",
      "Answer index",
      "Material type aliases",
      "Notes-recall prompts",
    ]);
  });

  it("falls back to a generic label for an unknown category", () => {
    const meta = categoryMeta("something_new");
    expect(meta.label).toBe("Other");
    expect(meta.fix).not.toBe("");
  });
});

describe("adminPathForTable", () => {
  it("routes each table to the screen that repairs it", () => {
    expect(adminPathForTable("questions")).toBe("/admin/quizzes");
    expect(adminPathForTable("study_materials")).toBe("/admin/materials");
    expect(adminPathForTable("flashcards")).toBe("/admin/flashcards");
    expect(adminPathForTable("past_papers")).toBe("/admin/past-papers");
  });

  it("returns null when there is nowhere to send the admin", () => {
    expect(adminPathForTable("some_new_table")).toBeNull();
  });
});

describe("isSeverityError", () => {
  it("only calls 'error' an error", () => {
    expect(isSeverityError(finding({ severity: "error" }))).toBe(true);
    expect(isSeverityError(finding({ severity: "warning" }))).toBe(false);
    expect(isSeverityError(finding({ severity: "notice" }))).toBe(false);
  });
});
