// Past-paper search, tokenised.
//
// The archive's search box used to test the whole query as one substring of a
// joined haystack, so "2024 chem" matched nothing: the haystack holds "2024" and
// "chemistry" but never that phrase. Students type what they remember, in any
// order, so each space-separated token must now match somewhere in the row
// (AND, not phrase), and topic / subject / level are searchable too — they sit
// in an embed the old predicate could not see.
//
// The same tokens drive on-page highlighting, which is why matching and range
// finding live in one module: a row that filters in must be the row whose
// matches are marked, and two implementations would drift.
//
// Pure and dependency-free — `pastPaperSearch.test.ts` holds the cases.

/**
 * One field set worth searching. Every string is optional: the archive row, the
 * topic rows and the per-topic paper page each carry a different subset.
 */
export interface SearchablePaper {
  title?: string | null;
  year?: number | null;
  session?: string | null;
  paper_number?: string | null;
  /** Free-form extras the caller adds: topic name, subject name, level label. */
  extras?: ReadonlyArray<string | null | undefined>;
}

/** Trim, lower-case and split on whitespace. Empty query → no tokens. */
export function queryTokens(query: string | null | undefined): string[] {
  const raw = String(query ?? "").trim().toLowerCase();
  if (!raw) return [];
  return raw.split(/\s+/).filter(Boolean);
}

/** Every string a row can be found by, in the order a student reads them. */
export function searchableFields(paper: SearchablePaper): string[] {
  const fields: string[] = [];
  if (paper.title) fields.push(String(paper.title));
  if (paper.year != null) fields.push(String(paper.year));
  if (paper.paper_number) fields.push(String(paper.paper_number));
  if (paper.session) fields.push(String(paper.session));
  for (const extra of paper.extras ?? []) {
    if (extra) fields.push(String(extra));
  }
  return fields;
}

/**
 * True when every token appears in at least one field.
 *
 * Tokens are compared case-insensitively as plain text — `(0625)` and `a/b`
 * contain regex metacharacters, so nothing here builds a RegExp from the query
 * without escaping it.
 */
export function matchesPaperSearch(paper: SearchablePaper, query: string | null | undefined): boolean {
  const tokens = queryTokens(query);
  if (tokens.length === 0) return true;
  const fields = searchableFields(paper).map((f) => f.toLowerCase());
  return tokens.every((token) => fields.some((field) => field.includes(token)));
}

/** Filter a list with the tokenised predicate, keeping the input order. */
export function filterPapersBySearch<T extends SearchablePaper>(
  papers: T[],
  query: string | null | undefined,
): T[] {
  const tokens = queryTokens(query);
  if (tokens.length === 0) return papers;
  return papers.filter((p) => matchesPaperSearch(p, tokens.join(" ")));
}

/** A literal, case-insensitive occurrence of `query` inside `text`. */
export interface MatchRange {
  start: number;
  end: number;
}

/**
 * Ranges of `text` matched by any token, merged and sorted — so
 * "Cambridge Chemistry" marks "Cambridge" and "Chemistry" as two runs and
 * adjacent tokens do not produce overlapping segments.
 */
export function matchRanges(text: string, query: string | null | undefined): MatchRange[] {
  const hay = String(text ?? "");
  const tokens = queryTokens(query);
  if (!hay || tokens.length === 0) return [];
  const lower = hay.toLowerCase();
  const found: MatchRange[] = [];
  for (const token of tokens) {
    let from = 0;
    for (;;) {
      const at = lower.indexOf(token, from);
      if (at === -1) break;
      found.push({ start: at, end: at + token.length });
      from = at + token.length;
    }
  }
  if (found.length === 0) return [];
  found.sort((a, b) => a.start - b.start || a.end - b.end);
  const merged: MatchRange[] = [found[0]];
  for (const range of found.slice(1)) {
    const last = merged[merged.length - 1];
    if (range.start <= last.end) {
      last.end = Math.max(last.end, range.end);
    } else {
      merged.push({ ...range });
    }
  }
  return merged;
}

/** A run of text, flagged when the query matches it. */
export interface HighlightSegment {
  text: string;
  match: boolean;
}

/**
 * Split `text` into alternating plain / matched runs for rendering.
 *
 * An untouched string comes back as a single `match: false` segment, so a caller
 * can render the result unconditionally instead of branching on "is there a
 * query?" — and a query that matches nothing yields the whole text unchanged.
 */
export function highlightSegments(text: string, query: string | null | undefined): HighlightSegment[] {
  const hay = String(text ?? "");
  const ranges = matchRanges(hay, query);
  if (ranges.length === 0) return [{ text: hay, match: false }];
  const segments: HighlightSegment[] = [];
  let cursor = 0;
  for (const range of ranges) {
    if (range.start > cursor) {
      segments.push({ text: hay.slice(cursor, range.start), match: false });
    }
    segments.push({ text: hay.slice(range.start, range.end), match: true });
    cursor = range.end;
  }
  if (cursor < hay.length) segments.push({ text: hay.slice(cursor), match: false });
  return segments;
}
