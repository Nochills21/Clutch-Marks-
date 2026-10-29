// What a free account may open, lessons edition.
//
// Same rule as notes (`noteAccess.ts`), applied to the other half of a subject
// level: **one lesson per subject-level** is readable, every other lesson stays
// in the list with a lock on it. The hub used to slice the lesson list to the
// free preview and collapse the remainder into a "+ 17 more lessons" card, so a
// student could not see what the plan actually contained — the notes were
// advertised row by row while the lessons were only a number.
//
// The free lesson is the first by `sort_order` (ties broken by id), because a
// lesson list is a course sequence: the honest sample is where the course
// starts, unlike notes where the newest document is the best advertisement.
// Resolve it here rather than in the page so every surface that lists lessons
// (the subject hub today, the lessons index next) hands out the same one.
//
// This is a sales gate, not a security boundary, exactly like the note rule.

/** Lessons a free account may open in each subject-level. */
export const FREE_LESSON_PREVIEW_LIMIT = 1;

export interface LessonRef {
  id: string;
  sort_order?: number | null;
}

/** Course order first, then a stable tie-break so the pick cannot wobble. */
export function courseOrder<T extends LessonRef>(lessons: T[]): T[] {
  return [...lessons].sort((a, b) => {
    const diff = (a.sort_order ?? 0) - (b.sort_order ?? 0);
    return diff !== 0 ? diff : a.id.localeCompare(b.id);
  });
}

/**
 * The lesson ids a reader may open, given every lesson in one subject-level.
 * A paid account (and an admin, which `hasPaid` also reports) gets them all.
 */
export function openableLessonIds<T extends LessonRef>(levelLessons: T[], hasPaid: boolean): Set<string> {
  if (hasPaid) return new Set(levelLessons.map((lesson) => lesson.id));
  return new Set(courseOrder(levelLessons).slice(0, FREE_LESSON_PREVIEW_LIMIT).map((lesson) => lesson.id));
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
