/**
 * The subject+level hub index: the list of `/study/:subject/:level` pages, as
 * data and as static markup.
 *
 * Why it exists. Every one of the 17 hubs is the page a student and a crawler
 * has to reach before any topic page, but the app renders them client-side: the
 * prerendered `/subjects` document shipped an empty `<div id="root">`, so the
 * only route to the hubs was `sitemap.xml`. The coverage report showed the cost
 * — one hub indexed, eleven "Discovered - currently not indexed", five that
 * Google had never fetched at all. This module describes the hubs once, from the
 * same manifest the hubs are built from, so the page, the prerendered document
 * and the tests cannot disagree about which links belong there.
 *
 * No React and no Supabase: the build-time prerenderer imports this module
 * through `plugins/prerender-seo.ts`.
 */
import { LEVEL_MANIFEST, levelPath } from "./levelSeo";
import { LEVELS, levelLabel } from "./levels";
import { PUBLISHED_SUBJECTS } from "./subjectCatalogue";

export interface SubjectHub {
  subjectSlug: string;
  /** The subject's own name from the database, e.g. "English First Language (Cambridge)". */
  subjectName: string;
  /** Level code as stored and as used in the URL: OL | IGCSE | AS | A2. */
  level: string;
  /** What the level is called in copy: "IGCSE", "AS Level", "A2 Level". */
  levelLabel: string;
  /** Canonical path, e.g. `/study/mathematics/ol`. */
  path: string;
}

export interface SubjectHubGroup {
  subjectSlug: string;
  subjectName: string;
  hubs: SubjectHub[];
}

/**
 * Reading order for the subjects, borrowed from the site's own copy order
 * (Maths, Physics, Chemistry, Biology, Computer Science, English) rather than a
 * second hand-kept list. Anything the catalogue does not know sorts last.
 */
function familyRank(subjectSlug: string): number {
  const index = PUBLISHED_SUBJECTS.findIndex((subject) => subject.slugs.includes(subjectSlug));
  return index === -1 ? PUBLISHED_SUBJECTS.length : index;
}

/** Level reading order: IGCSE first, then AS, then A2 (OL and IGCSE read alike). */
const levelRank = (level: string) => {
  const index = LEVELS.indexOf(level as (typeof LEVELS)[number]);
  return index === -1 ? LEVELS.length : index;
};

/**
 * The hubs, grouped by subject. Built from `LEVEL_MANIFEST`, so a subject+level
 * that gains topics appears here without anyone updating a link list — the same
 * arrangement that keeps the hub pages themselves from going missing.
 */
export const SUBJECT_HUB_GROUPS: SubjectHubGroup[] = (() => {
  const groups = new Map<string, SubjectHubGroup>();

  for (const entry of LEVEL_MANIFEST) {
    const group = groups.get(entry.subjectSlug) ?? {
      subjectSlug: entry.subjectSlug,
      subjectName: entry.subjectName,
      hubs: [],
    };
    group.hubs.push({
      subjectSlug: entry.subjectSlug,
      subjectName: entry.subjectName,
      level: entry.level,
      levelLabel: levelLabel(entry.level),
      path: levelPath(entry),
    });
    groups.set(entry.subjectSlug, group);
  }

  return [...groups.values()]
    .map((group) => ({
      ...group,
      // LEVEL_MANIFEST sorts levels alphabetically (a2, as, ol, igcse); a reader
      // wants IGCSE first.
      hubs: [...group.hubs].sort((a, b) => levelRank(a.level) - levelRank(b.level)),
    }))
    .sort(
      (a, b) =>
        familyRank(a.subjectSlug) - familyRank(b.subjectSlug) ||
        a.subjectName.localeCompare(b.subjectName),
    );
})();

/** Every hub, in reading order. */
export const SUBJECT_HUBS: SubjectHub[] = SUBJECT_HUB_GROUPS.flatMap((group) => group.hubs);

/** The id of the prerendered copy, which the page removes once React has mounted. */
export const STATIC_HUB_INDEX_ID = "static-hub-index";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/**
 * The index as plain HTML for the prerendered `/subjects` document.
 *
 * It is written outside `<div id="root">`, because React clears that element on
 * mount; the page renders the same list (see `src/pages/Subjects.tsx`) and
 * removes this copy in its first effect, so a visitor never sees both. Inline
 * layout styles only: this HTML is read before any script has run, and the
 * stylesheet it may not have is the app's.
 */
export function subjectHubIndexHtml(): string {
  const groups = SUBJECT_HUB_GROUPS.map(
    (group) => `      <div style="margin:0 0 1.25rem">
        <h3 style="margin:0 0 .25rem;font-size:.75rem;letter-spacing:.14em;text-transform:uppercase;opacity:.7">${escapeHtml(group.subjectName)}</h3>
        <ul style="margin:0;padding:0 0 0 1rem;line-height:1.7">
${group.hubs
  .map(
    (hub) =>
      `          <li><a href="${escapeHtml(hub.path)}" style="color:inherit">${escapeHtml(hub.levelLabel)}</a></li>`,
  )
  .join("\n")}
        </ul>
      </div>`,
  ).join("\n");

  return `  <nav id="${STATIC_HUB_INDEX_ID}" aria-label="Every subject and level" style="max-width:72rem;margin:0 auto;padding:2.5rem 1rem;font-family:system-ui,-apple-system,'Segoe UI',sans-serif">
    <h2 style="margin:0 0 .5rem;font-size:1.25rem">Every subject and level</h2>
    <p style="margin:0 0 1.5rem;opacity:.75;font-size:.9rem">Open any subject to see its topics, notes, questions and past papers.</p>
    <div style="display:grid;gap:1rem;grid-template-columns:repeat(auto-fill,minmax(15rem,1fr))">
${groups}
    </div>
  </nav>`;
}
