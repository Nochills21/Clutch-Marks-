// Pure helpers behind the app-wide subject filter.
//
// The filter is applied on almost every page, and it is applied by *writing* to
// the student's picks. That makes the write path the dangerous part: the old
// implementation deleted every row and re-inserted the selection, so a failed
// insert erased a student's picks and every subject disappeared at once. These
// helpers keep the write minimal — only what actually changed.

export interface PicksDiff {
  /** Subject-levels to add. */
  add: string[];
  /** Subject-levels to remove — and nothing else. */
  remove: string[];
}

/**
 * Work out the smallest set of writes that turns `prev` into `next`.
 *
 * Anything in both lists is deliberately left untouched, so an unchanged
 * selection never issues a delete.
 */
export function diffPicks(
  prev: Iterable<string>,
  next: Iterable<string>,
): PicksDiff {
  const before = new Set(prev);
  const after = new Set(next);
  const add: string[] = [];
  const remove: string[] = [];
  for (const id of after) if (!before.has(id)) add.push(id);
  for (const id of before) if (!after.has(id)) remove.push(id);
  return { add, remove };
}

/** Subject-levels the student is NOT seeing, in the order given. */
export function hiddenLevels(
  allIds: readonly string[],
  pickedIds: ReadonlySet<string>,
): string[] {
  return allIds.filter((id) => !pickedIds.has(id));
}

/** True when this selection is filtering anything out. */
export function isFiltering(
  allIds: readonly string[],
  pickedIds: ReadonlySet<string>,
): boolean {
  return allIds.length > 0 && hiddenLevels(allIds, pickedIds).length > 0;
}

/**
 * Who is reading, and has their selection arrived yet.
 *
 * Every gated page and every "something is hidden" notice needs the same two
 * answers. Thirteen of them used to spell the conditions out for themselves —
 * three left out `loaded`, so a student who had already picked was shown the
 * picker before their picks arrived, and one left out `signedIn`, so an
 * anonymous visitor on the now-public study pages was told every subject was
 * hidden and offered a "Show all" that could only fail. Deriving both answers
 * from this one function is what stops those pages disagreeing again.
 */
export interface ReaderPicks {
  /** Is there a session? An anonymous reader is never "missing" a pick. */
  signedIn: boolean;
  /** Admins see the whole catalogue and never choose. */
  isAdmin: boolean;
  /** Have this reader's picks been read yet? Nothing is decided before they are. */
  loaded: boolean;
  /** How many subject-levels the reader has chosen. */
  pickedCount: number;
}

/** True when this reader has to choose subjects before gated content makes sense. */
export function needsSubjectPick(reader: ReaderPicks): boolean {
  return reader.signedIn && !reader.isAdmin && reader.loaded && reader.pickedCount === 0;
}

/** True when this reader's own picks are hiding part of the catalogue. */
export function picksAreFiltering(reader: ReaderPicks): boolean {
  return reader.signedIn && !reader.isAdmin && reader.loaded && reader.pickedCount > 0;
}
