// What a content-integrity finding means, in one place.
//
// The findings themselves come from public.content_integrity_findings(), which
// recomputes them from the live tables on every call (see
// supabase/migrations/20261008150000_content_integrity_report.sql) — there is no
// snapshot to go stale, so the panel cannot show green while a broken row is in
// the content. This module only decides how those rows are labelled, ordered,
// filtered and linked back to the screen that repairs them.
//
// Every category is something that has really happened here:
//   replacement_character — U+FFFD left by a broken encode/decode round trip
//   answer_index          — correct_option that cannot point at the right option
//   material_type_alias   — 'note' where student pages read 'notes'
//   notes_recall_prompt   — a question that tests the notes prose, not the subject
//
// The last one is the largest content problem in the database by volume (940 of
// 1,952 questions when it was added) and the only one that is invisible to every
// other check: no U+FFFD, the answer index is in range, the options differ. Its
// count is the finding, so the panel reports it like any other rather than
// hiding 940 rows behind a severity.

export type IntegritySeverity = "error" | "warning";

export interface IntegrityFinding {
  category: string;
  severity: string;
  table_name: string;
  row_id: string;
  label: string | null;
  field: string | null;
  detail: string;
  snippet: string | null;
}

export interface CategoryMeta {
  /** Short name for a badge or a filter chip. */
  label: string;
  /** What the finding means, for someone who did not build it. */
  blurb: string;
  /** What fixing one looks like. */
  fix: string;
}

/** Reading order for the panel: the damage a student sees first. */
export const CATEGORY_ORDER = [
  "replacement_character",
  "answer_index",
  "material_type_alias",
  "notes_recall_prompt",
] as const;

export const CATEGORY_META: Record<string, CategoryMeta> = {
  replacement_character: {
    label: "Replacement characters",
    blurb:
      "A real character was lost and replaced by U+FFFD (\uFFFD). This is what a broken encode/decode round trip leaves behind: one multi-byte character becomes one replacement character per byte.",
    fix: "Open the row and retype the lost character from the source it was quoted from — never blanket-replace, because only the surrounding words say what the character was.",
  },
  answer_index: {
    label: "Answer index",
    blurb:
      "correct_option is a 0-based index into options, but the legacy seeds were 1-based. A value equal to the option count is that mistake; a value outside 0..n-1, a single option, options that are not an array, or duplicated/blank options all mean the question cannot be marked correctly.",
    fix: "Open the question in Manage Quizzes, confirm which option is right, and set its 0-based index. Duplicated or blank options usually mean the option text itself is damaged.",
  },
  material_type_alias: {
    label: "Material type aliases",
    blurb:
      "Student pages read material_type 'notes'; the admin form used to write 'note'. The CHECK constraint accepts both, so the row saves, looks correct in the console, and is invisible to students.",
    fix: "Open the material and set its type to Notes (or Summary/Flashcard) so the student surfaces pick it up.",
  },
  notes_recall_prompt: {
    label: "Notes-recall prompts",
    blurb:
      "The stem asks which statement appears in the topic's notes. Nothing about it is about the subject, and the distractors are lifted from other topics' summaries, so the only way to answer is to have memorised the page. Counts, not single rows, are the finding: this was 940 of 1,952 questions.",
    fix: "Replace the question with one that tests the subject, not the notes — the topic-bank builder deletes this pattern as it rebuilds a topic's bank. A cleared topic stops being reported here.",
  },
};

export const UNKNOWN_CATEGORY: CategoryMeta = {
  label: "Other",
  blurb: "A finding the panel does not recognise yet — the database reports a category this build has no copy for.",
  fix: "Re-check the report after the next deploy; the category was added to the SQL without a label here.",
};

export function categoryMeta(category: string): CategoryMeta {
  return CATEGORY_META[category] ?? UNKNOWN_CATEGORY;
}

/**
 * Where an admin repairs a row of this kind. The panel links out rather than
 * editing in place: every one of these edits already has a screen with its own
 * validation and audit trail.
 */
const TABLE_ADMIN_PATHS: Record<string, string> = {
  questions: "/admin/quizzes",
  quizzes: "/admin/quizzes",
  study_materials: "/admin/materials",
  lessons: "/admin/lessons",
  topics: "/admin/subjects",
  flashcards: "/admin/flashcards",
  flashcard_sets: "/admin/flashcards",
  past_papers: "/admin/past-papers",
  announcements: "/admin/announcements",
};

export function adminPathForTable(table: string): string | null {
  return TABLE_ADMIN_PATHS[table] ?? null;
}

export function isSeverityError(finding: IntegrityFinding): boolean {
  return finding.severity === "error";
}

export interface IntegritySummary {
  total: number;
  errors: number;
  warnings: number;
  /** Per category, in CATEGORY_ORDER, including categories with zero findings. */
  byCategory: { category: string; count: number }[];
  clean: boolean;
}

export function summariseFindings(findings: IntegrityFinding[]): IntegritySummary {
  const counts = new Map<string, number>();
  for (const category of CATEGORY_ORDER) counts.set(category, 0);
  let errors = 0;
  let warnings = 0;

  for (const finding of findings) {
    counts.set(finding.category, (counts.get(finding.category) ?? 0) + 1);
    if (isSeverityError(finding)) errors += 1;
    else warnings += 1;
  }

  return {
    total: findings.length,
    errors,
    warnings,
    byCategory: [...counts.entries()].map(([category, count]) => ({ category, count })),
    clean: findings.length === 0,
  };
}

function categoryRank(category: string): number {
  const index = (CATEGORY_ORDER as readonly string[]).indexOf(category);
  return index === -1 ? CATEGORY_ORDER.length : index;
}

/** Errors first, then the fixed category order, then table and label. */
export function sortFindings(findings: IntegrityFinding[]): IntegrityFinding[] {
  return [...findings].sort((a, b) => {
    if (isSeverityError(a) !== isSeverityError(b)) return isSeverityError(a) ? -1 : 1;
    const byCategory = categoryRank(a.category) - categoryRank(b.category);
    if (byCategory !== 0) return byCategory;
    const byTable = a.table_name.localeCompare(b.table_name);
    if (byTable !== 0) return byTable;
    return (a.label ?? "").localeCompare(b.label ?? "");
  });
}

export function filterFindings(
  findings: IntegrityFinding[],
  filter: string,
): IntegrityFinding[] {
  return filter === "all" ? findings : findings.filter((f) => f.category === filter);
}
