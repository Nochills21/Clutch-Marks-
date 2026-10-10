// Turning the "add question" form into a question row.
//
// The form shows four fixed option slots, but blank ones are not answer options
// and are dropped before saving — which shifts every option after them. An index
// taken straight from the form therefore can point at a *different* answer, or
// past the end of the list. The database refuses the latter
// (questions_answer_index_in_range, 20261009140000), and this resolves the
// picked slot by its text so the console cannot produce the former either.
//
// `error` rather than an `ok` discriminant on purpose: this app compiles with
// strictNullChecks off, where boolean-literal narrowing does not work.
export type ResolvedQuizOptions = {
  options: string[];
  /** -1 when there is nothing to point at; only meaningful when `error` is null. */
  correctOption: number;
  /** null when the row is safe to save; otherwise what the admin must fix. */
  error: string | null;
};

export function resolveQuizOptions(slots: string[], picked: number): ResolvedQuizOptions {
  const options = slots.map((slot) => slot.trim()).filter(Boolean);
  if (options.length < 2) {
    return { options, correctOption: -1, error: "Add at least two answer options." };
  }
  const correctOption = options.indexOf(slots[picked]?.trim() ?? "");
  if (correctOption < 0) {
    return {
      options,
      correctOption: -1,
      error: "The option you marked as correct is empty — fill it in, or mark another one.",
    };
  }
  return { options, correctOption, error: null };
}
