// Where a question comes from, and whether its specification is still current.
//
// The blueprint asks for provenance badges — board, spec point, year/session/
// variant, difficulty — and a "current syllabus only" filter. Two of those five
// facts exist in this estate and three do not, so this module reports exactly
// what is known and never invents the rest:
//
//   * board      — derived from the subject (`/oxford/` slugs are OxfordAQA);
//   * spec point — `questions.statement_id` → `syllabus_statements.code/title`,
//                  present on the mapped part of the bank (466 of 4,223 today);
//   * syllabus   — `syllabus_statements.syllabus_years`, a range like
//                  "2025-2027", so "current" is a real comparison, not a guess;
//   * difficulty — `questions.difficulty` (check / drill / exam);
//   * year/session/variant — not stored anywhere. A badge for it would be a
//                  fabricated citation, so there is none.
//
// The filter is deliberately opt-in: 89% of the bank is not mapped to a
// statement, so defaulting to "current syllabus only" would empty most topics.

export interface QuestionProvenance {
  difficulty?: string | null;
  statement_code?: string | null;
  statement_title?: string | null;
  statement_years?: string | null;
}

export interface ProvenanceBadge {
  label: string;
  /** The full fact behind a short label, e.g. the statement's own wording. */
  title?: string;
  tone?: "board" | "spec" | "level" | "current" | "legacy";
}

/** Which board teaches a subject. Only the ESL subject is OxfordAQA today. */
export function boardLabel(subjectSlug: string | null | undefined): string {
  return subjectSlug && /oxford/i.test(subjectSlug) ? "OxfordAQA" : "Cambridge (CAIE)";
}

const DIFFICULTY_LABEL: Record<string, string> = {
  check: "Check",
  drill: "Drill",
  exam: "Exam",
  medium: "Medium",
};

/**
 * Does a `syllabus_years` range cover this year?
 *
 * The values are ranges ("2018-2026", "2026-2028") or a single year ("2026").
 * Anything unparseable is treated as not current rather than as current: an
 * unknown validity period must not put a question behind a "current" claim.
 */
export function yearsCover(years: string | null | undefined, year: number): boolean {
  if (!years) return false;
  const bounds = years.match(/\d{4}/g);
  if (!bounds || bounds.length === 0) return false;
  const from = Number(bounds[0]);
  const to = bounds.length > 1 ? Number(bounds[1]) : from;
  if (!Number.isFinite(from) || !Number.isFinite(to)) return false;
  return year >= Math.min(from, to) && year <= Math.max(from, to);
}

/** True only when the question is mapped to a statement that still runs. */
export function isCurrentSyllabus(q: QuestionProvenance, year: number): boolean {
  if (!q.statement_code) return false;
  return yearsCover(q.statement_years, year);
}

/** The badges a card may honestly show, best evidence first. */
export function provenanceBadges(q: QuestionProvenance, board: string, year: number): ProvenanceBadge[] {
  const badges: ProvenanceBadge[] = [{ label: board, tone: "board" }];
  if (q.statement_code) {
    badges.push({
      label: `Spec ${q.statement_code}`,
      title: q.statement_title ?? undefined,
      tone: "spec",
    });
  }
  if (q.difficulty) {
    badges.push({ label: DIFFICULTY_LABEL[q.difficulty] ?? q.difficulty, tone: "level" });
  }
  if (q.statement_years) {
    badges.push({
      label: yearsCover(q.statement_years, year) ? "Current syllabus" : q.statement_years,
      title: `Specification runs ${q.statement_years}`,
      tone: yearsCover(q.statement_years, year) ? "current" : "legacy",
    });
  }
  return badges;
}

/**
 * Why the "current syllabus only" filter can be offered for a set of questions —
 * or null when no question in the set is mapped, where the filter could only
 * ever empty the page.
 */
export function syllabusFilterCount(questions: QuestionProvenance[], year: number): number | null {
  if (!questions.some((q) => q.statement_code)) return null;
  return questions.filter((q) => isCurrentSyllabus(q, year)).length;
}
