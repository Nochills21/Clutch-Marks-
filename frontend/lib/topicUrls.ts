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

export function topicNotesPath(subjectSlug: string, level: string, topicSlug: string): string {
  return `/study/${subjectSlug}/${level.toLowerCase()}/${topicSlug}/notes`;
}

export function topicQuizPath(subjectSlug: string, level: string, topicSlug: string): string {
  return `/study/${subjectSlug}/${level.toLowerCase()}/${topicSlug}/quiz`;
}

export function topicPapersPath(subjectSlug: string, level: string, topicSlug: string): string {
  return `/study/${subjectSlug}/${level.toLowerCase()}/${topicSlug}/papers`;
}
