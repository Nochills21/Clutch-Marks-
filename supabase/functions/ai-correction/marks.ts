// Mark normalisation for ai-correction. Pure (no Deno or network APIs) so the
// frontend test suite can import it directly.
//
// The model returns marks_earned and total_marks per question. Those values
// are not trusted: a stray value (negative, fractional, above the total, or a
// non-number) must not produce a grade above 100% or a negative mark.

export interface NormalisedMarks {
  marks_earned: number;
  total_marks: number;
  /** Percentage for this question, always within 0..100. */
  grade: number;
  /** True when the model's values were out of range and had to be bounded. */
  clamped: boolean;
}

function wholeMarks(value: unknown): number {
  const n = Number(value ?? 0);
  return Number.isFinite(n) ? Math.floor(n) : 0;
}

export function normaliseMarks(raw: { marks_earned?: unknown; total_marks?: unknown } | null | undefined): NormalisedMarks {
  const rawEarned = wholeMarks(raw?.marks_earned);
  const rawTotal = wholeMarks(raw?.total_marks);
  const total_marks = Math.max(0, rawTotal);
  const marks_earned = Math.min(total_marks, Math.max(0, rawEarned));
  const grade = total_marks > 0 ? Math.round((marks_earned / total_marks) * 100) : 0;
  return {
    marks_earned,
    total_marks,
    grade,
    clamped: marks_earned !== rawEarned || total_marks !== rawTotal,
  };
}
