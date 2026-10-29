// What a free account may open, lessons edition.
//
// Same rule as notes (`noteAccess.ts`), applied to the other half of a subject
// level: **one lesson per subject-level** is readable, every other lesson stays
// in the list with a lock on it. The hub used to slice the lesson list to the
// free preview and collapse the remainder into a "+ 17 more lessons" card, so a
// student could not see what the plan actually contained — the notes were
// advertised row by row while the lessons were only a number.
//
// The free lesson is the **first lesson of the first topic**, because a lesson
// list is a course: the honest sample is where the course starts. Ordering by
// the lesson's own `sort_order` alone is not enough — every lesson in the estate
// carries `sort_order = 1` (it orders lessons *within* a topic), so that alone
// left the pick to an id tie-break and handed out an arbitrary lesson halfway
// down the page. The topic's `sort_order` is what puts a level's first topic
// first, so it has to be part of the comparison; pass `topicRank` when you have
// it. Resolve the pick here so every surface that lists lessons (the subject hub
// and the `/lessons` index) hands out the same one — which is why the ranking
// lives here too, rather than being re-derived per page.
//
// This is a sales gate, not a security boundary, exactly like the note rule.

/** Lessons a free account may open in each subject-level. */
export const FREE_LESSON_PREVIEW_LIMIT = 1;

export interface LessonRef {
  id: string;
  sort_order?: number | null;
  topic_id?: string | null;
}

export interface TopicRef {
  id: string;
  sort_order?: number | null;
  subject_level_id: string;
}

/**
 * A level's topics in course order, as id → position.
 *
 * Shared by both lesson surfaces so "the first topic" means the same row on each
 * of them; the id tie-break keeps the order stable when two topics share a
 * `sort_order`, because a different tie-break would hand out a different free
 * lesson on the hub than on the index.
 */
export function rankTopics<T extends { id: string; sort_order?: number | null }>(topics: T[]): Map<string, number> {
  return new Map(
    [...topics]
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0) || a.id.localeCompare(b.id))
      .map((t, i) => [t.id, i] as const),
  );
}

/** The same ranking, for a list that spans several subject-levels. */
export function ranksByLevel<T extends TopicRef>(topics: T[]): Map<string, Map<string, number>> {
  const byLevel = new Map<string, T[]>();
  for (const t of topics) {
    const list = byLevel.get(t.subject_level_id) ?? [];
    list.push(t);
    byLevel.set(t.subject_level_id, list);
  }
  return new Map([...byLevel].map(([levelId, list]) => [levelId, rankTopics(list)] as const));
}

/**
 * Order lessons the way a student meets them: topic first, then the lesson
 * within it, then a stable tie-break so the order cannot wobble between renders.
 * `topicRank` maps a topic id to its position in the level (its `sort_order`
 * index); omit it only when every lesson belongs to one topic.
 */
export function courseOrder<T extends LessonRef>(lessons: T[], topicRank?: Map<string, number>): T[] {
  const rankOf = (lesson: T) => (lesson.topic_id ? topicRank?.get(lesson.topic_id) ?? 0 : 0);
  return [...lessons].sort((a, b) => {
    const topicDiff = rankOf(a) - rankOf(b);
    if (topicDiff !== 0) return topicDiff;
    const diff = (a.sort_order ?? 0) - (b.sort_order ?? 0);
    return diff !== 0 ? diff : a.id.localeCompare(b.id);
  });
}

/**
 * The lesson ids a reader may open, given every lesson in one subject-level.
 * A paid account (and an admin, which `hasPaid` also reports) gets them all.
 */
export function openableLessonIds<T extends LessonRef>(
  levelLessons: T[],
  hasPaid: boolean,
  topicRank?: Map<string, number>,
): Set<string> {
  if (hasPaid) return new Set(levelLessons.map((lesson) => lesson.id));
  return new Set(
    courseOrder(levelLessons, topicRank)
      .slice(0, FREE_LESSON_PREVIEW_LIMIT)
      .map((lesson) => lesson.id),
  );
}

/**
 * True when this lesson is locked for the reader. `available === null` means
 * "not resolved yet" and locks nothing, so nothing flashes as locked while the
 * answer is in flight — the same contract as `isLockedNote`.
 */
export function isLockedLesson(lessonId: string, available: Set<string> | null): boolean {
  if (available === null) return false;
  return !available.has(lessonId);
}
