// What a teacher account may open: one subject, every level of it.
//
// A teacher is a role plus a scope. The role alone says nothing about content —
// `user_roles.role = 'teacher'` would be a promise with no subject attached — so
// the grant row in `public.teacher_subjects` is the authority. This module turns
// that row into the one question every gated surface actually asks: "is this
// subject-level open for me?"
//
// The answer is *not* `hasPaid`. A teacher has no subscription, and pretending
// otherwise (by folding them into `usePlanAccess().hasPaid`) would have unlocked
// the whole estate and quietly removed the upgrade path the account exists to
// keep. Each surface instead passes `hasPaid || coversLevel(levelId)` into the
// same note/lesson pickers a free student uses.
//
// Like those previews, this is a sales gate rather than a security boundary: the
// rows are readable to any signed-in account, and what changes here is which of
// them the app hands over.

export const TEACHER_ROLE = "teacher";

export interface TeacherScope {
  subjectId: string;
  subjectSlug: string;
  subjectName: string;
  /** Every `subject_levels.id` of the granted subject (IGCSE, AS, A2, …). */
  levelIds: string[];
}

/** The shape `useTeacherScope` reads out of the database. */
export interface TeacherGrantRow {
  subject_id: string;
  subjects:
    | {
        id: string;
        name: string;
        slug: string;
        subject_levels: Array<{ id: string }> | null;
      }
    | null;
}

/**
 * Flatten a grant row, or null when the subject has gone (a deleted subject
 * takes its grants with it, but a cached row can still be in the client).
 */
export function scopeFromGrant(row: TeacherGrantRow | null | undefined): TeacherScope | null {
  const subject = row?.subjects;
  if (!row?.subject_id || !subject) return null;
  return {
    subjectId: subject.id ?? row.subject_id,
    subjectSlug: subject.slug,
    subjectName: subject.name,
    levelIds: (subject.subject_levels ?? []).map((level) => level.id),
  };
}

/** True when this subject-level is inside the grant. */
export function scopeCoversLevel(scope: TeacherScope | null, levelId: string | null | undefined): boolean {
  if (!scope || !levelId) return false;
  return scope.levelIds.includes(levelId);
}

/** True when this subject slug is the granted one (hubs and routes). */
export function scopeCoversSlug(scope: TeacherScope | null, slug: string | null | undefined): boolean {
  if (!scope || !slug) return false;
  return scope.subjectSlug === slug;
}

/**
 * The line a teacher reads instead of a plan: what is open, and what is not.
 * Kept here so the sidebar, the dashboard and Settings cannot word it three ways.
 */
export function describeTeacherScope(scope: TeacherScope | null): string {
  if (!scope) return "Teacher access — no subject assigned yet.";
  return `Teacher access: all of ${scope.subjectName}. Other subjects need a paid plan.`;
}
