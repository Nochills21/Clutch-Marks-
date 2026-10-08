/**
 * Crawlable fields for a subject+level page (/study/:subject/:level).
 *
 * These nine pages are the hub a student (and a crawler) reaches from
 * /subjects, and every topic page links back up to one. They were the last
 * public pages with no prerendered HTML: the app set their title at runtime, so
 * a crawler that does not run JavaScript read the homepage's head — and none of
 * the nine were in sitemap.xml, while all 300 of their child topic pages were.
 *
 * Same arrangement as topicSeo.ts: one source of truth, read by the page
 * component and by the build-time prerenderer, so the static and runtime heads
 * cannot drift. The set of pages comes from the topic manifest rather than a
 * second hand-maintained list, so a new subject+level cannot ship with topics
 * but without a hub page.
 */
import { SITE_NAME, SITE_URL, breadcrumbJsonLd } from "./seoRoutes";
import { levelLabel } from "./levels";
import { TOPIC_MANIFEST } from "./topicManifest.generated";

export interface LevelSeoInput {
  subjectSlug: string;
  subjectName: string;
  /** Level code as used in the URL and stored in subject_levels: OL | AS | A2. */
  level: string;
}

/** Every subject+level pair that has topics, i.e. that has a page. */
export const LEVEL_MANIFEST: LevelSeoInput[] = [
  ...new Map(
    TOPIC_MANIFEST.map((topic) => [
      `${topic.subjectSlug}/${topic.level.toLowerCase()}`,
      { subjectSlug: topic.subjectSlug, subjectName: topic.subjectName, level: topic.level },
    ]),
  ).values(),
].sort(
  (a, b) => a.subjectSlug.localeCompare(b.subjectSlug) || a.level.localeCompare(b.level),
);

/** Canonical path of the level page. */
export function levelPath(input: LevelSeoInput): string {
  return `/study/${input.subjectSlug}/${input.level.toLowerCase()}`;
}

/** <title>, description and JSON-LD for a level page. */
export function levelHead(input: LevelSeoInput): {
  path: string;
  title: string;
  description: string;
  jsonLd: Record<string, unknown>[];
} {
  const label = levelLabel(input.level);
  const name = `${input.subjectName} ${label}`;
  const path = levelPath(input);

  return {
    path,
    title: `${name} — ${SITE_NAME}`,
    description: `Lessons, revision materials, exams and a question bank for ${name}.`,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Course",
        name,
        description: `Lessons, revision materials, exams and a question bank for ${name}.`,
        url: `${SITE_URL}${path}`,
        inLanguage: "en",
        educationalLevel: label,
        provider: { "@type": "EducationalOrganization", name: SITE_NAME, url: `${SITE_URL}/` },
      },
      // Same trail that /subjects links through, and the same breadcrumb
      // treatment as the level's topic pages — otherwise a crawler would render
      // the subject page without the level above it.
      breadcrumbJsonLd([
        { name: "Subjects", path: "/subjects" },
        { name, path },
      ]),
    ],
  };
}
