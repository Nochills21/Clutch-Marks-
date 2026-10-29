// Level segments in study URLs, and the spellings that must resolve to them.
//
// The database has two codes for one qualification: `OL` (0580, 0610, 0620,
// 0625, 0478 — Cambridge IGCSE) and `IGCSE` (the two English subjects). The
// canonical URL segment follows the code (`/ol/` and `/igcse/`), but students,
// schools and search engines all write "IGCSE" for Cambridge too, so a link to
// `/study/chemistry/igcse/...` has to work. It used to 404 into "Level not
// found", which is the worst answer: the page exists, the address was just
// written the other way round.
//
// Resolving the alias is not enough by itself. Two spellings of one hub would
// be two indexable URLs for the same content, so each page also compares the
// resolved row's canonical segment with the one in the address and redirects
// when they differ. `vercel.json` answers the common shapes with a 301 before a
// document is served; this is the client-side half of the same rule, for links
// minted inside the app and for hosts that serve the SPA fallback.
//
// Pure functions, no React, so the tests and the build tooling can both use it.

import type { SubjectLevelCode } from "./levels";

/** The segment a level's pages live at. */
const CANONICAL: Record<SubjectLevelCode, string> = {
  OL: "ol",
  IGCSE: "igcse",
  AS: "as",
  A2: "a2",
};

/**
 * Slugs that resolve to each group of codes, lower-case.
 *
 * `OL` and `IGCSE` share every spelling because they share a label ("IGCSE");
 * which row a lookup finds is decided by the subject, never by the spelling.
 */
const ALIAS_GROUPS: Array<{ codes: SubjectLevelCode[]; slugs: string[] }> = [
  { codes: ["OL", "IGCSE"], slugs: ["ol", "igcse", "o-level", "olevel", "o level"] },
  { codes: ["AS"], slugs: ["as", "as-level", "aslevel"] },
  { codes: ["A2"], slugs: ["a2", "a-level", "alevel"] },
];

/** The URL segment for a level code, e.g. `OL` -> `ol`. */
export function canonicalLevelSlug(level: string): string {
  const code = level.trim().toUpperCase() as SubjectLevelCode;
  return CANONICAL[code] ?? level.trim().toLowerCase();
}

/**
 * The level codes a lookup should ask for, given the slug in the URL.
 *
 * An unknown slug keeps its own upper-cased form so the query still runs and the
 * page reports what it always did — "Level not found" — rather than silently
 * resolving to a level nobody asked for.
 */
export function levelAliasCodes(slug: string): SubjectLevelCode[] {
  const wanted = decodeURIComponent(slug ?? "").trim().toLowerCase();
  const group = ALIAS_GROUPS.find((g) => g.slugs.includes(wanted));
  if (group) return [...group.codes];
  return [wanted.toUpperCase() as SubjectLevelCode];
}

/**
 * True when a resolved row is being served at a non-canonical address.
 *
 * The comparison is against the row's own segment, not against the alias table:
 * `/study/physics/o-level` resolves the `OL` row and redirects to `/ol`, while
 * the same slug on an English subject resolves the `IGCSE` row and redirects to
 * `/igcse`. One rule, two subjects, correct both ways.
 */
export function levelNeedsRedirect(resolvedLevel: string, urlSlug: string): boolean {
  return canonicalLevelSlug(resolvedLevel) !== decodeURIComponent(urlSlug ?? "").trim().toLowerCase();
}
