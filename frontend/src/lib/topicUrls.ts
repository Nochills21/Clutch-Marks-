/**
 * SEO-friendly URL helpers for topic-level pages.
 *
 * Topic pages follow SaveMyExams-style paths:
 *   /study/:subjectSlug/:level/:topicSlug/notes
 *   /study/:subjectSlug/:level/:topicSlug/quiz
 *   /study/:subjectSlug/:level/:topicSlug/papers
 *
 * Pure functions only — no JSX (see TopicBreadcrumb component for UI).
 */

/** Build a URL-safe slug from a topic name, e.g.
 *  "Number — Arithmetic and Place Value" -> "number-arithmetic-and-place-value" */
export function slugifyTopicName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * The slug a topic's URL should use.
 *
 * Prefers the stored `topics.slug` (migration 20260929120000_topic_slugs) so
 * renaming a topic changes its title, not its address — bookmarks, shared links
 * and indexed URLs keep working. Falls back to deriving one from the name for
 * rows created before the column existed.
 */
export function topicSlugOf(topic: { slug?: string | null; name: string }): string {
  const stored = (topic.slug ?? "").trim();
  return stored || slugifyTopicName(topic.name);
}

export function topicNotesPath(subjectSlug: string, level: string, topicSlug: string): string {
  return `/study/${subjectSlug}/${level.toLowerCase()}/${topicSlug}/notes`;
}

export function topicQuizPath(subjectSlug: string, level: string, topicSlug: string): string {
  return `/study/${subjectSlug}/${level.toLowerCase()}/${topicSlug}/quiz`;
}

export function topicPapersPath(subjectSlug: string, level: string, topicSlug: string): string {
  return `/study/${subjectSlug}/${level.toLowerCase()}/${topicSlug}/papers`;
}
