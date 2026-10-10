// Why a content save was refused, in words an admin can act on.
//
// The rules themselves live in the database (supabase/migrations/20261009140000_content_guards.sql),
// where every writer meets them — the console through PostgREST, the seeders and
// the edge functions as service_role. Nothing here enforces anything: it only
// explains the constraint name PostgREST put in the error, so the console can
// say what is wrong instead of "Save failed" (or, before, "Saved").
const BROKEN_CHARACTER =
  "The text contains a broken character (U+FFFD \uFFFD) — a real letter or symbol was lost when " +
  "it was pasted or saved. Retype or re-paste it from the original, then save again.";

const ANSWER_OUT_OF_RANGE =
  "The option marked as correct is not one of this question's options, so no student could answer it. " +
  "Fill in the option you marked, or pick the correct one again.";

/**
 * The guarded classes, matched on the constraint name PostgREST reports.
 * `*_no_replacement_character` covers questions, quizzes, topics, lessons,
 * study_materials, flashcards, flashcard_sets, past_papers and announcements.
 */
const GUARDS: Array<{ constraint: string; message: string }> = [
  { constraint: "_no_replacement_character", message: BROKEN_CHARACTER },
  { constraint: "questions_answer_index_in_range", message: ANSWER_OUT_OF_RANGE },
];

export function contentGuardMessage(message?: string | null): string | null {
  if (!message) return null;
  const hit = GUARDS.find((g) => message.includes(g.constraint));
  return hit ? hit.message : null;
}

/**
 * Props for a failed content save: the caller's own title, unless the database
 * refused the content itself — then the title says so, because "Could not save
 * the lesson" reads like a glitch, not like "this text is damaged".
 */
export function contentSaveError(title: string, message: string): {
  title: string;
  description: string;
  variant: "destructive";
} {
  const guard = contentGuardMessage(message);
  return {
    title: guard ? "Not saved — that content would show up damaged" : title,
    description: guard ?? message,
    variant: "destructive",
  };
}
