// What the syllabus-coverage report means, in one place.
//
// The rows come from public.syllabus_coverage(), which reads the board's own
// subtopic list (public.syllabus_statements) joined to the topic that teaches it
// and recomputes that topic's readiness on every call — there is no snapshot to
// go stale, so a topic that loses its notes shows up here at once. See
// supabase/migrations/20261009180000_syllabus_coverage.sql and …190000 for the
// SQL, and docs/syllabus-coverage.md for why coverage is reported at all.
//
// This module only decides how those rows are labelled, ordered, counted and
// linked. Two orderings matter and they are different questions:
//   * the RPC's own order is the board's (spec, then the board's sort, then code)
//     — that is how a specification is read;
//   * `sortCoverage` re-ranks by how much attention a row needs, because the
//     point of the panel is the gaps, not the 140th green row.

export interface CoverageRow {
  board: string;
  spec_code: string;
  level: string;
  area: string | null;
  code: string;
  title: string;
  tier: string;
  subject_slug: string | null;
  topic_slug: string | null;
  topic_name: string | null;
  /** The statement has a topic. False is an open coverage gap. */
  mapped: boolean;
  topic_note_chars: number;
  topic_questions: number;
  topic_materials: number;
  exam_tier_questions: number;
  technique_materials: number;
  /**
   * Questions that name THIS statement, not the whole topic
   * (migration 20261009220000). A topic with fifteen questions on one of its
   * four statements reads as covered until this is on screen.
   */
  statement_questions: number;
  /** The floor: there is something to teach from and something to practise. */
  topic_ready: boolean;
  /** The top-grade layer: exam-tier questions and an exam-technique material. */
  a_star_ready: boolean;
}

export type CoverageFilter = "all" | "needs-attention" | "unmapped" | "thin" | "not-a-star" | "a-star";

export interface CoverageFilterMeta {
  key: CoverageFilter;
  label: string;
  /** What selecting this filter shows, and why it is its own bucket. */
  blurb: string;
}

/** Reading order for the filter cards: the gap first, the finished work last. */
export const COVERAGE_FILTERS: CoverageFilterMeta[] = [
  {
    key: "all",
    label: "All statements",
    blurb: "Every subtopic in every loaded specification, in the board's own order.",
  },
  {
    key: "needs-attention",
    label: "Needs attention",
    blurb: "Nothing or too little behind the statement: unmapped, or a topic below the floor.",
  },
  {
    key: "unmapped",
    label: "Unmapped",
    blurb: "The board teaches it and no topic of ours can point at it — a real hole in the claim.",
  },
  {
    key: "thin",
    label: "Thin topic",
    blurb: "Mapped, but the topic has too little notes or practice to teach it from.",
  },
  {
    key: "not-a-star",
    label: "Not A*-ready",
    blurb: "Below the top-grade layer: no exam-tier question set, or no exam-technique note.",
  },
  {
    key: "a-star",
    label: "A*-ready",
    blurb: "Carries the top-grade layer as well as the floor.",
  },
];

export function specLabel(row: CoverageRow): string {
  return `${row.board} ${row.spec_code} · ${row.level}`;
}

export function specKey(row: CoverageRow): string {
  return `${row.spec_code}/${row.level}`;
}

/**
 * How much attention a statement needs.
 *
 * An unmapped statement can never be ready, whatever its topic's numbers say, so
 * it ranks first regardless — the SQL already refuses to report it as ready, and
 * this keeps the panel from contradicting the report if a row ever arrives
 * malformed.
 */
export function coverageRank(row: CoverageRow): 0 | 1 | 2 | 3 {
  if (!row.mapped) return 0;
  if (!row.topic_ready) return 1;
  if (!row.a_star_ready) return 2;
  return 3;
}

/**
 * Gaps first, then thin topics, then the work that is only missing its top-grade
 * layer, then A*-ready last.
 *
 * The sort is stable on purpose: rows of equal rank keep the database's order
 * (the board's sort, then the board's own code), so a spec still reads as the
 * specification.
 */
export function sortCoverage(rows: CoverageRow[]): CoverageRow[] {
  return [...rows].sort((a, b) => coverageRank(a) - coverageRank(b));
}

export function filterCoverage(rows: CoverageRow[], filter: CoverageFilter): CoverageRow[] {
  switch (filter) {
    case "needs-attention":
      return rows.filter((r) => coverageRank(r) <= 1);
    case "unmapped":
      return rows.filter((r) => !r.mapped);
    case "thin":
      return rows.filter((r) => r.mapped && !r.topic_ready);
    case "not-a-star":
      return rows.filter((r) => r.mapped && r.topic_ready && !r.a_star_ready);
    case "a-star":
      return rows.filter((r) => r.mapped && r.a_star_ready);
    default:
      return rows;
  }
}

/** Free-text filter over the board code, the statement title and our topic. */
export function searchCoverage(rows: CoverageRow[], query: string): CoverageRow[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return rows;
  return rows.filter((r) =>
    [r.code, r.title, r.topic_slug ?? "", r.topic_name ?? "", r.area ?? ""]
      .join(" ")
      .toLowerCase()
      .includes(needle),
  );
}

export interface SpecSummary {
  key: string;
  label: string;
  spec_code: string;
  level: string;
  subject_slug: string | null;
  statements: number;
  mapped: number;
  /** Statements on a topic at the floor. */
  topicReady: number;
  aStarReady: number;
}

export interface CoverageSummary {
  statements: number;
  mapped: number;
  unmapped: number;
  thin: number;
  topicReady: number;
  aStarReady: number;
  specs: SpecSummary[];
  counts: Record<CoverageFilter, number>;
  /** No statement is missing a topic. Thin topics are a readiness gap, not a hole. */
  clean: boolean;
}

export function summariseCoverage(rows: CoverageRow[]): CoverageSummary {
  const bySpec = new Map<string, SpecSummary>();

  for (const row of rows) {
    const key = specKey(row);
    let spec = bySpec.get(key);
    if (!spec) {
      spec = {
        key,
        label: specLabel(row),
        spec_code: row.spec_code,
        level: row.level,
        subject_slug: row.subject_slug,
        statements: 0,
        mapped: 0,
        topicReady: 0,
        aStarReady: 0,
      };
      bySpec.set(key, spec);
    }
    spec.statements += 1;
    if (row.mapped) spec.mapped += 1;
    if (row.mapped && row.topic_ready) spec.topicReady += 1;
    if (row.mapped && row.a_star_ready) spec.aStarReady += 1;
  }

  const unmapped = rows.filter((r) => !r.mapped).length;
  const thin = rows.filter((r) => r.mapped && !r.topic_ready).length;

  return {
    statements: rows.length,
    mapped: rows.length - unmapped,
    unmapped,
    thin,
    topicReady: rows.filter((r) => r.mapped && r.topic_ready).length,
    aStarReady: rows.filter((r) => r.mapped && r.a_star_ready).length,
    specs: [...bySpec.values()],
    counts: {
      all: rows.length,
      "needs-attention": rows.filter((r) => coverageRank(r) <= 1).length,
      unmapped,
      thin,
      "not-a-star": rows.filter((r) => r.mapped && r.topic_ready && !r.a_star_ready).length,
      "a-star": rows.filter((r) => r.mapped && r.a_star_ready).length,
    },
    clean: unmapped === 0,
  };
}

/**
 * Where an admin reads or fixes the statement: the topic's notes page, which is
 * the public surface the statement is claimed to be covered by. Unmapped
 * statements have no topic to open, so the panel sends you to the console that
 * creates one.
 */
export function topicPathFor(row: CoverageRow): string | null {
  if (!row.subject_slug || !row.topic_slug) return null;
  return `/study/${row.subject_slug}/${row.level}/${row.topic_slug}/notes`;
}

/** The tier label the board prints: our rows keep the board's own wording. */
export function tierLabel(tier: string): string {
  const normalised = tier.trim().toLowerCase();
  if (normalised === "extended") return "Extended only";
  if (normalised === "core") return "Core only";
  if (normalised === "both") return "Core + Extended";
  return tier;
}
