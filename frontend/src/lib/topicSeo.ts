/**
 * One source of truth for a topic page's crawlable fields.
 *
 * The three topic pages (/study/:slug/:level/:topic/notes|quiz|papers) are the
 * site's main body of content — 100 topics x 3 pages — and until now each page
 * built its own <title>, description and JSON-LD inline. Those literals cannot
 * be checked against the routes table, and the prerenderer had no way to know
 * what they would be, so every one of those URLs served the generic SPA shell to
 * a crawler that does not run JavaScript: same title as the homepage, no
 * canonical, no breadcrumb, and no sitemap entry at all.
 *
 * Every topic value now comes from here, and both callers use it:
 *   - plugins/prerender-seo.ts writes it into static HTML per topic page, and
 *     into sitemap.xml
 *   - the page components pass it straight to <SEOHead />
 * so the static and runtime heads for a topic URL cannot drift apart.
 *
 * The /<topic> URL also carries the level code ("ol", "as", "a2") because that
 * is what the routes use; the readable label ("O Level") is what a student sees
 * in the breadcrumb and what goes into the structured data.
 */
import { SITE_NAME, SITE_URL, breadcrumbJsonLd } from "./seoRoutes";
import { levelLabel } from "./levels";

export type TopicPageKind = "notes" | "quiz" | "papers";

/** Order used when writing prerendered files and sitemap entries. */
export const TOPIC_PAGE_KINDS: readonly TopicPageKind[] = ["notes", "quiz", "papers"];

export interface TopicSeoInput {
  subjectSlug: string;
  subjectName: string;
  /** Level code as stored in subject_levels and used in the URL: OL | AS | A2. */
  level: string;
  topicSlug: string;
  topicName: string;
}

interface KindCopy {
  /**
   * Label in <title>. Kept short on purpose: a topic name can run to 44
   * characters, and the earlier wording ("Past Papers & Mark Schemes") pushed
   * 248 of these 300 titles past the ~70 characters a result can show, so the
   * part that matched the search was the part that got cut off.
   */
  titleLabel: string;
  /** Label the page shows in the breadcrumb, mirrored by the BreadcrumbList. */
  trailLabel: string;
  description: (ctx: CopyContext) => string;
  resourceDescription: (ctx: CopyContext) => string;
}

interface CopyContext {
  topic: string;
  subject: string;
  level: string;
}

const KIND_COPY: Record<TopicPageKind, KindCopy> = {
  notes: {
    titleLabel: "Notes",
    trailLabel: "Revision Notes",
    description: ({ topic, subject, level }) =>
      `Revision notes, topic questions and past papers for ${topic} in ${subject} ${level}.`,
    resourceDescription: ({ topic, subject, level }) =>
      `Revision notes and study materials for ${topic} in ${subject} ${level} at Clutch Marks.`,
  },
  quiz: {
    titleLabel: "Quiz",
    trailLabel: "Topic Questions",
    description: ({ topic, subject, level }) =>
      `Exam-style topic questions for ${topic} in ${subject} ${level}. Instant marking, worked answers and AI feedback.`,
    resourceDescription: ({ topic, subject, level }) =>
      `Exam-style questions for ${topic} in ${subject} ${level}, with instant marking and explanations.`,
  },
  papers: {
    titleLabel: "Papers",
    trailLabel: "Past Papers & Mark Schemes",
    description: ({ topic, subject, level }) =>
      `Past papers and mark schemes for ${topic} in ${subject} ${level}. Practise under real exam conditions with papers sorted by year.`,
    resourceDescription: ({ topic, subject, level }) =>
      `Past papers and mark schemes for ${topic} in ${subject} ${level}, organised by year and session.`,
  },
};

/**
 * The topic name to show, and to put in the head: the stored name verbatim.
 *
 * The quiz page used to title-case whatever it had, which re-cased the stored
 * name too ("Arithmetic and Place Value" became "Arithmetic And Place Value")
 * while the notes and papers pages, and the prerendered HTML for all three,
 * used the stored name as-is — so one URL shipped two different titles depending
 * on whether the crawler ran JavaScript. Only the slug fallback, for a URL
 * minted before topics had slugs, is cased up here.
 */
export function topicDisplayName(storedName: string | null | undefined, slug: string): string {
  const stored = (storedName ?? "").trim();
  if (stored) return stored;
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

/** Canonical path of one of a topic's three pages. */
export function topicPath(input: TopicSeoInput, kind: TopicPageKind): string {
  return `/study/${input.subjectSlug}/${input.level.toLowerCase()}/${input.topicSlug}/${kind}`;
}

/** Path of the level page this topic sits under (its breadcrumb parent). */
export function topicCoursePath(input: TopicSeoInput): string {
  return `/study/${input.subjectSlug}/${input.level.toLowerCase()}`;
}

/** <title>, description and JSON-LD for a topic page — crawler-visible fields. */
export function topicHead(
  input: TopicSeoInput,
  kind: TopicPageKind,
): {
  path: string;
  title: string;
  description: string;
  jsonLd: Record<string, unknown>[];
} {
  const copy = KIND_COPY[kind];
  const label = levelLabel(input.level);
  const ctx: CopyContext = { topic: input.topicName, subject: input.subjectName, level: label };
  const path = topicPath(input, kind);

  return {
    path,
    // "| Clutch Marks" is dropped from neither the brand nor the topic: the topic
    // name leads (that is what a search matched), the level code qualifies it,
    // and the brand closes it.
    title: `${input.topicName} — ${copy.titleLabel} | ${input.subjectName} ${input.level.toUpperCase()} | ${SITE_NAME}`,
    description: copy.description(ctx),
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        name: `${input.topicName} — ${copy.trailLabel}`,
        description: copy.resourceDescription(ctx),
        url: `${SITE_URL}${path}`,
        educationalLevel: label,
        about: { "@type": "Thing", name: input.topicName },
        isPartOf: {
          "@type": "Course",
          name: `${input.subjectName} ${label}`,
          url: `${SITE_URL}${topicCoursePath(input)}`,
        },
        provider: { "@type": "EducationalOrganization", name: SITE_NAME, url: `${SITE_URL}/` },
      },
      // Mirrors <TopicBreadcrumb>. A crumb that is not a real, reachable URL is
      // ignored (or penalised), so both the parent level page and the topic's
      // own notes page are the app's actual routes.
      breadcrumbJsonLd([
        { name: "Subjects", path: "/subjects" },
        { name: `${input.subjectName} ${label}`, path: topicCoursePath(input) },
        { name: input.topicName, path: topicPath(input, "notes") },
        { name: copy.trailLabel, path },
      ]),
    ],
  };
}
