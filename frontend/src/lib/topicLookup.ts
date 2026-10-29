// Short topic addresses, resolved without guessing.
//
// Topics are stored and indexed under full slugs (`databases-and-data-definition`),
// but readers and older links shorten them (`/study/computer-science/a2/databases/...`).
// That used to land on "Topic not found" for a topic the site actually has, which
// is a dead end that looks like missing content.
//
// A prefix is accepted only when exactly one topic matches it. With two topics
// starting the same way there is no honest answer, and picking one would send a
// student to the wrong notes — a worse failure than saying the address is not
// recognised.

import { slugifyTopicName } from "./topicUrls";

export function uniqueTopicPrefix<T extends { slug?: string | null; name: string }>(
  topics: T[],
  requested: string,
): T | null {
  const prefix = requested.trim().toLowerCase();
  if (!prefix) return null;
  const matches = topics.filter((topic) => {
    const slug = (topic.slug ?? "").trim() || slugifyTopicName(topic.name);
    return slug.toLowerCase().startsWith(`${prefix}-`);
  });
  return matches.length === 1 ? matches[0] : null;
}
