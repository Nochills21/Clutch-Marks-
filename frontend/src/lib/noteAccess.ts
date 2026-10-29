// What a free account may read, notes edition.
//
// A free account gets **one note in each subject-level** — the newest note in
// that level — so a visitor can judge the quality of the writing without being
// handed the library. Every other note stays visible but locked, and its button
// is an upgrade prompt rather than a dead end; that is deliberately different
// from hiding the row, because a student who cannot see what they would get has
// no reason to pay for it.
//
// The rule has to resolve to the *same* note everywhere it is applied, or a
// student who was allowed to read a note from the subject hub would be refused it
// a page later. So "the free note of a level" is defined here once — newest by
// `created_at`, ties broken by id — and every surface derives its lock state from
// this module.
//
// This is a sales gate, not a security boundary: note bodies live in the database
// and the tables are readable (the pages are indexed). Do not present it as more
// than a nudge.
//
// `study_materials` has no `subject_level_id` — a note belongs to a topic, and
// the topic to a subject-level — so anything asking "which note is free in this
// level" has to go through `topics`.

import { supabase } from "@/integrations/supabase/client";

/** Notes a free account may open in each subject-level. */
export const FREE_NOTE_PREVIEW_LIMIT = 1;

/**
 * Material types that count as "a note" for this rule. `exam-technique` extras
 * are part of the paid set, so they can never be the free pick — otherwise a
 * level's newest row being technique material would hand a free reader an extra
 * and lock the actual notes.
 */
export const NOTE_TYPES = ["notes", "summary"] as const;

const countsAsNote = (note: NoteRef) =>
  !note.material_type || (NOTE_TYPES as readonly string[]).includes(note.material_type);

export interface NoteRef {
  id: string;
  created_at?: string | null;
  material_type?: string | null;
}

const timeOf = (note: NoteRef) => (note.created_at ? Date.parse(note.created_at) : 0);

/**
 * Full notes outrank summaries as the free pick.
 *
 * "Newest wins" alone handed several levels a one-page *Quick Revision Summary*,
 * because those rows happen to be the newest — a thin document is the worst
 * possible advertisement for the library. The database query sorts by
 * `material_type` ascending for the same reason: `notes` < `summary`.
 */
const typeRank = (note: NoteRef) => (note.material_type === "notes" ? 0 : 1);

/** Best pick first: notes before summaries, then newest, ties broken by id. */
export function newestFirst<T extends NoteRef>(notes: T[]): T[] {
  return [...notes].sort((a, b) => {
    const rank = typeRank(a) - typeRank(b);
    if (rank !== 0) return rank;
    const diff = timeOf(b) - timeOf(a);
    return diff !== 0 ? diff : a.id.localeCompare(b.id);
  });
}

/**
 * The ids a reader may open, given every note in one subject-level.
 *
 * A paid account (and an admin, which `hasPaid` already reports as paid) gets the
 * whole set back.
 */
export function openableNoteIds<T extends NoteRef>(levelNotes: T[], hasPaid: boolean): Set<string> {
  if (hasPaid) return new Set(levelNotes.map((note) => note.id));
  const notes = levelNotes.filter(countsAsNote);
  return new Set(newestFirst(notes).slice(0, FREE_NOTE_PREVIEW_LIMIT).map((note) => note.id));
}

const EMPTY_LEVELS: ReadonlySet<string> = new Set<string>();

/**
 * The ids a reader may open, given a list that spans several subject-levels.
 *
 * The library page holds every note in one array, so "one note per level" has to
 * be applied per group. Grouping here rather than in the page keeps the library
 * and the subject hub from selecting different free notes.
 */
export function openableIdsAcrossLevels<T extends NoteRef & { subject_level_id: string }>(
  notes: T[],
  hasPaid: boolean,
  /**
   * Levels this reader owns through something other than a plan — a teacher's
   * subject. Empty for everyone else, and deliberately a separate argument: a
   * teacher must not read as "paid", or every subject would unlock.
   */
  unlockedLevelIds: ReadonlySet<string> = EMPTY_LEVELS,
): Set<string> {
  if (hasPaid) return new Set(notes.map((note) => note.id));
  const byLevel = new Map<string, T[]>();
  for (const note of notes) {
    if (!note.subject_level_id) continue;
    const group = byLevel.get(note.subject_level_id);
    if (group) group.push(note);
    else byLevel.set(note.subject_level_id, [note]);
  }
  const ids = new Set<string>();
  for (const [levelId, group] of byLevel) {
    for (const id of openableNoteIds(group, unlockedLevelIds.has(levelId))) ids.add(id);
  }
  return ids;
}

/**
 * True when this note is locked for the reader.
 *
 * `available === null` means "not resolved yet" and locks nothing, so a note is
 * never flashed as locked while the answer is still in flight.
 */
export function isLockedNote(noteId: string, available: Set<string> | null): boolean {
  if (available === null) return false;
  return !available.has(noteId);
}

// The reader page and the per-topic list hold one note (or one topic's notes)
// rather than the level's list, so they ask the database which note is free.

/**
 * Which note is open in a level, resolved from the database.
 *
 * For surfaces that hold one note rather than the level's list — the reader page
 * and the per-topic list. Returns `null` when the level is unknown or the query
 * fails, which callers must treat as "unknown", never as "everything unlocked".
 */
export async function fetchOpenableNoteIdsForLevel(
  levelId: string | null | undefined,
  hasPaid: boolean,
): Promise<Set<string> | null> {
  // A paid reader has nothing locked; skip the round trip.
  if (hasPaid) return null;
  if (!levelId) return null;
  const { data, error } = await supabase
    .from("study_materials")
    // `topics!inner` both embeds and filters: a note belongs to a topic, and the
    // topic carries the level.
    .select("id, created_at, topics!inner(subject_level_id)")
    .eq("topics.subject_level_id", levelId)
    .in("material_type", NOTE_TYPES as unknown as string[])
    // Same ranking as `newestFirst`: notes before summaries, then newest.
    .order("material_type", { ascending: true })
    .order("created_at", { ascending: false })
    .limit(FREE_NOTE_PREVIEW_LIMIT);
  if (error) return null;
  return new Set((data ?? []).map((row) => row.id));
}
