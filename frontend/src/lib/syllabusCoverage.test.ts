import { describe, it, expect } from "vitest";
import {
  COVERAGE_FILTERS,
  coverageRank,
  filterCoverage,
  searchCoverage,
  sortCoverage,
  summariseCoverage,
  tierLabel,
  topicPathFor,
  type CoverageRow,
} from "./syllabusCoverage";

function row(over: Partial<CoverageRow> = {}): CoverageRow {
  return {
    board: "CAIE",
    spec_code: "0580",
    level: "OL",
    area: null,
    code: "1.1",
    title: "Identify and use natural numbers",
    tier: "both",
    subject_slug: "mathematics",
    topic_slug: "number-arithmetic-and-place-value",
    topic_name: "Number: arithmetic and place value",
    mapped: true,
    topic_note_chars: 12_000,
    topic_questions: 40,
    topic_materials: 3,
    exam_tier_questions: 0,
    technique_materials: 0,
    statement_questions: 0,
    topic_ready: true,
    a_star_ready: false,
    ...over,
  };
}

describe("coverageRank", () => {
  it("puts an unmapped statement first, whatever its topic's numbers say", () => {
    // The report never calls an unmapped row ready; the panel must not either,
    // even if a row arrived with the readiness flags set.
    expect(coverageRank(row({ mapped: false, topic_slug: null, a_star_ready: true }))).toBe(0);
  });

  it("orders thin topic, then missing A* layer, then A*-ready", () => {
    expect(coverageRank(row({ topic_ready: false }))).toBe(1);
    expect(coverageRank(row())).toBe(2);
    expect(coverageRank(row({ a_star_ready: true, exam_tier_questions: 6, technique_materials: 1 }))).toBe(3);
  });
});

describe("sortCoverage", () => {
  it("sorts by attention needed while keeping each rank in the database's order", () => {
    const rows = [
      row({ code: "1.1", topic_ready: true, a_star_ready: true, technique_materials: 1, exam_tier_questions: 6 }),
      row({ code: "2.1" }),
      row({ code: "1.2", mapped: false, topic_slug: null }),
      row({ code: "3.1", topic_ready: false }),
      row({ code: "2.2" }),
    ];
    expect(sortCoverage(rows).map((r) => r.code)).toEqual(["1.2", "3.1", "2.1", "2.2", "1.1"]);
  });
});

describe("filterCoverage", () => {
  const rows = [
    row({ code: "1.1", mapped: false, topic_slug: null, topic_ready: false }),
    row({ code: "1.2", topic_ready: false }),
    row({ code: "1.3" }),
    row({ code: "1.4", a_star_ready: true, exam_tier_questions: 5, technique_materials: 1 }),
  ];

  it("buckets each statement exactly once, except the combined 'needs attention'", () => {
    expect(filterCoverage(rows, "all")).toHaveLength(4);
    expect(filterCoverage(rows, "unmapped").map((r) => r.code)).toEqual(["1.1"]);
    expect(filterCoverage(rows, "thin").map((r) => r.code)).toEqual(["1.2"]);
    expect(filterCoverage(rows, "not-a-star").map((r) => r.code)).toEqual(["1.3"]);
    expect(filterCoverage(rows, "a-star").map((r) => r.code)).toEqual(["1.4"]);
    expect(filterCoverage(rows, "needs-attention").map((r) => r.code)).toEqual(["1.1", "1.2"]);
  });

  it("counts in the summary agree with the filter results", () => {
    const summary = summariseCoverage(rows);
    for (const meta of COVERAGE_FILTERS) {
      expect(summary.counts[meta.key], meta.key).toBe(filterCoverage(rows, meta.key).length);
    }
  });
});

describe("searchCoverage", () => {
  const rows = [
    row({ code: "1.1", title: "Identify and use natural numbers" }),
    row({ code: "1.18", title: "Surds", topic_slug: "number-indices-and-standard-form" }),
  ];

  it("matches the board code, the statement and our topic", () => {
    expect(searchCoverage(rows, "surds").map((r) => r.code)).toEqual(["1.18"]);
    expect(searchCoverage(rows, "number-indices").map((r) => r.code)).toEqual(["1.18"]);
    expect(searchCoverage(rows, "1.1").map((r) => r.code)).toEqual(["1.1", "1.18"]);
    expect(searchCoverage(rows, "  ")).toHaveLength(2);
  });
});

describe("summariseCoverage", () => {
  it("keeps one row per spec+level, so a split spec is two specs", () => {
    const rows = [
      row({ spec_code: "9618", level: "AS" }),
      row({ spec_code: "9618", level: "AS", code: "1.2" }),
      row({ spec_code: "9618", level: "A2", code: "13.1" }),
    ];
    const summary = summariseCoverage(rows);
    expect(summary.specs.map((s) => s.key)).toEqual(["9618/AS", "9618/A2"]);
    expect(summary.specs[0].statements).toBe(2);
    expect(summary.statements).toBe(3);
  });

  it("is only 'clean' about mapping — a thin topic is readiness, not a hole", () => {
    const thin = summariseCoverage([row({ topic_ready: false })]);
    expect(thin.clean).toBe(true);
    expect(thin.thin).toBe(1);

    const hole = summariseCoverage([row({ mapped: false, topic_slug: null })]);
    expect(hole.clean).toBe(false);
    expect(hole.unmapped).toBe(1);
  });

  it("does not count an unmapped row as ready", () => {
    const summary = summariseCoverage([
      row({ mapped: false, topic_slug: null, topic_ready: true, a_star_ready: true }),
    ]);
    expect(summary.topicReady).toBe(0);
    expect(summary.aStarReady).toBe(0);
  });
});

describe("topicPathFor", () => {
  it("links a mapped statement at the public page it is claimed to be covered by", () => {
    expect(topicPathFor(row())).toBe(
      "/study/mathematics/OL/number-arithmetic-and-place-value/notes",
    );
  });

  it("has nowhere to send you for an unmapped statement", () => {
    expect(topicPathFor(row({ topic_slug: null }))).toBeNull();
    expect(topicPathFor(row({ subject_slug: null }))).toBeNull();
  });
});

describe("tierLabel", () => {
  it("reads the board's own tier wording back as prose", () => {
    expect(tierLabel("extended")).toBe("Extended only");
    expect(tierLabel("core")).toBe("Core only");
    expect(tierLabel("both")).toBe("Core + Extended");
    expect(tierLabel("Extended")).toBe("Extended only");
    // An unexpected value is shown as-is rather than swallowed.
    expect(tierLabel("supplement")).toBe("supplement");
  });
});
