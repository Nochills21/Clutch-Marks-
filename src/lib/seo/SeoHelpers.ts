/**
 * SEO helpers for topic-level pages.
 * Used by TopicNotes / TopicQuiz / TopicPapers and by the build-time
 * prerender plugin to generate per-topic <title>/<meta> tags.
 */
import { slugifyTopicName } from "@/lib/topicUrls";

export function topicPageTitle({
  topicName,
  subjectName,
  levelLabel,
  pageLabel,
  siteName = "Clutch Marks",
}: {
  topicName: string;
  subjectName: string;
  levelLabel: string;
  pageLabel: string;
  siteName?: string;
}): string {
  const cleanTopic = topicName.trim();
  const cleanPage = pageLabel.trim();
  if (cleanTopic && subjectName) {
    return `${cleanTopic} — ${cleanPage} | ${subjectName} ${levelLabel} | ${siteName}`;
  }
  return `${cleanPage} — ${subjectName ? `${subjectName} ${levelLabel}` : siteName}`;
}

export function topicPageDescription({
  topicName,
  subjectName,
  levelLabel,
  pageLabel,
}: {
  topicName: string;
  subjectName: string;
  levelLabel: string;
  pageLabel: string;
}): string {
  const cleanTopic = topicName.trim();
  const cleanPage = pageLabel.trim();
  const pageVerb = cleanPage.toLowerCase().replace(/^revision notes$/, "study notes, revision notes and materials").replace(/^topic questions$/, "exam-style topic questions with instant marking").replace(/^past papers.*$/, "past papers and mark schemes for topic revision").replace(/^notes$/, "notes and revision materials");
  return `${cleanTopic} ${pageVerb} ${subjectName ? `in ${subjectName} ${levelLabel}` : ""}.`;
}

/**
 * Build a set of SEO-friendly topic slugs from a list of topics.
 */
export function topicSlugs(topics: Array<{ name: string }>): Array<{ name: string; slug: string }> {
  return topics.map((t) => ({ name: t.name, slug: slugifyTopicName(t.name) }));
}
