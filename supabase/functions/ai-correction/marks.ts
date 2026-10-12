// Mark normalisation for ai-correction. Pure (no Deno or network APIs) so the
// frontend test suite can import it directly.
//
// The model returns marks_earned and total_marks per question. Those values
// are not trusted: a stray value (negative, fractional, above the total, or a
// non-number) must not produce a grade above 100% or a negative mark.
//
// Models also write marks as text. "3/4", "3 out of 4" and "3 marks" are read
// as the number they name rather than scored 0, because a silent zero is the
// most damaging error a marker can make.

export interface NormalisedMarks {
  marks_earned: number;
  total_marks: number;
  /** Percentage for this question, always within 0..100. */
  grade: number;
  /** True when the model's values were out of range and had to be bounded. */
  clamped: boolean;
}

/** "3/4", "3 / 4" or "3 out of 4" — earned and total in one string. */
const FRACTION = /^\s*(-?\d+(?:\.\d+)?)\s*(?:\/|out\s+of)\s*(-?\d+(?:\.\d+)?)\s*$/i;
/** A leading number, so "3 marks" and "3.5" read as 3 and 3.5. */
const LEADING_NUMBER = /^\s*(-?\d+(?:\.\d+)?)/;

function toNumber(value: unknown): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (typeof value === "string") {
    const m = value.match(LEADING_NUMBER);
    return m ? Number(m[1]) : 0;
  }
  return 0;
}

function wholeMarks(value: unknown): number {
  return Math.floor(toNumber(value));
}

export function normaliseMarks(raw: { marks_earned?: unknown; total_marks?: unknown } | null | undefined): NormalisedMarks {
  let earnedInput: unknown = raw?.marks_earned;
  let totalInput: unknown = raw?.total_marks;

  // "3/4" in marks_earned carries the total too; use it when total is absent.
  if (typeof earnedInput === "string") {
    const fraction = earnedInput.match(FRACTION);
    if (fraction) {
      earnedInput = Number(fraction[1]);
      if (wholeMarks(totalInput) === 0) totalInput = Number(fraction[2]);
    }
  }

  const rawEarned = wholeMarks(earnedInput);
  const rawTotal = wholeMarks(totalInput);
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

/**
 * The per-question list from a model reply. The prompt asks for a bare JSON
 * array, but models also wrap it ({"questions": [...]}) or return one question
 * as a bare object. Anything else returns null, so the caller can refuse it.
 */
export function questionList(parsed: unknown): unknown[] | null {
  if (Array.isArray(parsed)) return parsed;
  if (typeof parsed !== "object" || parsed === null) return null;
  const record = parsed as Record<string, unknown>;
  for (const value of Object.values(record)) {
    if (Array.isArray(value) && value.length > 0) return value;
  }
  if ("marks_earned" in record || "question" in record) return [parsed];
  return null;
}
