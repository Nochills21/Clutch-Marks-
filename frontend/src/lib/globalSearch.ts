/**
 * Pure helpers behind the global search palette (⌘K).
 *
 * Two jobs live here rather than in the component, because both are rules that
 * can be wrong in a way a screenshot does not show:
 *
 *  1. **Matching and ranking.** The palette filters the whole topic catalogue
 *     itself (`shouldFilter={false}`) instead of handing 500+ rows to cmdk, so
 *     "does this query match" and "which match comes first" are our decisions.
 *  2. **Which board a subject+level belongs to.** There is no `board` column on
 *     `subjects`; the boards the site actually follows live on
 *     `syllabus_statements.board` (CAIE, Edexcel), and the two English subjects
 *     are named for theirs. Without this the requested board filter could only
 *     be a guess.
 *
 * No React and no Supabase, so the test file can exercise all of it.
 */

/** The boards the palette can filter by. `other` is the honest fallback. */
export type ExamBoardKey = "cambridge" | "edexcel" | "oxfordaqa" | "other";

export const EXAM_BOARD_LABELS: Record<ExamBoardKey, string> = {
  cambridge: "Cambridge International",
  edexcel: "Pearson Edexcel",
  oxfordaqa: "OxfordAQA",
  other: "Other boards",
};

/**
 * A board code from `syllabus_statements.board` ("CAIE", "Edexcel") as a
 * palette key. Returns null for an empty value so the caller can fall through
 * to the next source rather than treating "unknown" as a real board.
 */
export function boardFromStatementBoard(board?: string | null): ExamBoardKey | null {
  const value = (board ?? "").trim().toLowerCase();
  if (!value) return null;
  if (value === "caie" || value.includes("cambridge")) return "cambridge";
  if (value.includes("edexcel") || value.includes("pearson")) return "edexcel";
  if (value.includes("oxford") || value === "aqa" || value.includes("aqa")) return "oxfordaqa";
  return "other";
}

/**
 * The board a subject's own name declares: "English First Language (Cambridge)",
 * "English as a Second Language (Oxford)". The parenthesised tag is how those
 * two rows stay distinct, so it is the most reliable signal they carry.
 */
export function boardFromSubjectName(name?: string | null): ExamBoardKey | null {
  const value = (name ?? "").toLowerCase();
  if (!value) return null;
  if (value.includes("(oxford)") || value.includes("oxfordaqa") || value.includes("oxford aqa")) {
    return "oxfordaqa";
  }
  if (value.includes("(cambridge)") || value.includes("cambridge international")) return "cambridge";
  if (value.includes("edexcel") || value.includes("pearson")) return "edexcel";
  return null;
}

/**
 * The board for one subject+level.
 *
 * Spec statements win, because they are loaded from the boards' own documents
 * (Biology AS *is* Edexcel 9BI0 while Biology IGCSE is Cambridge 0610 — one
 * subject name, two boards, decided by the level). The subject name is the
 * fallback for rows with no statements yet, which today is both English
 * subjects.
 */
export function resolveBoard(
  statementBoards: Iterable<string | null | undefined> | null | undefined,
  subjectName: string,
): ExamBoardKey {
  for (const board of statementBoards ?? []) {
    const key = boardFromStatementBoard(board);
    if (key) return key;
  }
  return boardFromSubjectName(subjectName) ?? "other";
}

/** Lower-case, strip accents and fold punctuation to single spaces. */
export function normaliseForSearch(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** A query as searchable tokens; empty for whitespace-only input. */
export function tokenize(query: string): string[] {
  const normalised = normaliseForSearch(query);
  return normalised ? normalised.split(" ") : [];
}

/**
 * Every token must appear somewhere in the haystack, in any order, so
 * "thermal phys" finds Thermal Physics and "physics 0625" does too.
 */
export function matchesTokens(haystack: string, tokens: string[]): boolean {
  if (!tokens.length) return true;
  return tokens.every((token) => haystack.includes(token));
}

/**
 * How well a name answers the query, low is better:
 *  0 exact ("thermal physics"), 1 prefix ("therm"), 2 a word start ("physics"
 *  for "Thermal Physics"), 3 substring anywhere, 4 no direct match.
 *
 * 4 still renders (the haystack may have matched the subject or level); it just
 * sorts below the rows whose own name matched.
 */
export function scoreName(name: string, tokens: string[]): number {
  if (!tokens.length) return 3;
  const normalised = normaliseForSearch(name);
  const query = tokens.join(" ");
  if (normalised === query) return 0;
  if (normalised.startsWith(query)) return 1;
  const words = normalised.split(" ");
  if (tokens.every((token) => words.some((word) => word.startsWith(token)))) return 2;
  if (normalised.includes(query)) return 3;
  if (tokens.every((token) => normalised.includes(token))) return 3;
  return 4;
}
