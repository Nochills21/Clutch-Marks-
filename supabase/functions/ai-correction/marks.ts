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

/* ───────────────────────── rubric checklist (phase 3.1) ────────────────────
 *
 * A mark is only trustworthy if the student can see which mark-scheme point it
 * came from. The model returns one entry per mark: PASS with the words that
 * earned it, or MISS with the defect quoted.
 *
 * Everything here is defensive. A model that omits the list, sends prose
 * instead of an array, invents a verdict like "partial", or puts a string where
 * the array goes must not crash the marker, must not silently award a mark, and
 * must not silently drop one either: an unreadable entry is removed and the
 * caller can see the list is shorter than the mark count.
 */

export type MarkPointVerdict = "PASS" | "MISS";

export interface MarkPoint {
  /** The scheme's own label and wording, e.g. "M1 — substitutes into v = u + at". */
  point: string;
  verdict: MarkPointVerdict;
  /** Quoted from the student's answer. Empty only where there is nothing to quote. */
  evidence: string;
  /** Other phrasings the scheme accepts (`oe`). */
  accept_equivalents: string[];
  /** What cancels the mark, per the scheme (contradictions, `ecf` breaks). */
  reject_contradictions: string[];
  /** What the scheme tells the examiner to ignore (`awrt`, units, spelling). */
  ignore_clauses: string[];
}

export interface NormalisedChecklist {
  points: MarkPoint[];
  passed: number;
  missed: number;
  /** True when the checklist's PASS count disagrees with marks_earned. */
  disagreesWithMarks: boolean;
  /** True when the model sent nothing usable, so the UI must not claim a checklist. */
  absent: boolean;
}

const PASS_WORDS = /^(?:pass|passed|award|awarded|earned|yes|true|1|hit|met)$/i;
const MISS_WORDS = /^(?:miss|missed|not|no|false|0|lost|fail|failed|unmet)$/i;
const MAX_POINTS = 16;
const MAX_TEXT = 300;
const MAX_LIST_ITEMS = 6;
const MAX_LIST_TEXT = 160;

function text(value: unknown, limit = MAX_TEXT): string {
  if (typeof value === "string") return value.trim().slice(0, limit);
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return "";
}

/** A list field may arrive as an array, a single string, or "a; b, c". */
function stringList(value: unknown): string[] {
  const parts = Array.isArray(value) ? value : typeof value === "string" ? value.split(/[;\n]/) : [];
  const out: string[] = [];
  for (const part of parts) {
    const item = text(part, MAX_LIST_TEXT).replace(/^[-•*]\s*/, "");
    if (item && !out.includes(item)) out.push(item);
    if (out.length >= MAX_LIST_ITEMS) break;
  }
  return out;
}

/** Read a verdict, or null when the model said something unreadable. */
function verdictOf(raw: Record<string, unknown>): MarkPointVerdict | null {
  const stated = raw.verdict ?? raw.status;
  if (typeof stated === "string") {
    const clean = stated.trim();
    if (PASS_WORDS.test(clean)) return "PASS";
    if (MISS_WORDS.test(clean)) return "MISS";
    return null; // "partial", "half" — not a verdict this checklist can render
  }
  // Some models send a boolean instead of a word.
  const awarded = raw.awarded ?? raw.earned ?? raw.hit;
  if (typeof awarded === "boolean") return awarded ? "PASS" : "MISS";
  return null;
}

/**
 * One entry per mark, in scheme order.
 *
 * An entry needs a point and a readable verdict; anything else is dropped rather
 * than guessed, because a made-up PASS is the exact failure this feature exists
 * to prevent.
 */
export function normaliseChecklist(
  raw: Record<string, unknown> | null | undefined,
  marksEarned: number,
): NormalisedChecklist {
  const source = raw?.mark_points ?? raw?.criteria ?? raw?.mark_scheme;
  const entries = Array.isArray(source) ? source : [];

  const points: MarkPoint[] = [];
  for (const entry of entries) {
    if (!entry || typeof entry !== "object") continue;
    const record = entry as Record<string, unknown>;
    const point = text(record.point ?? record.label ?? record.criterion ?? record.description);
    const verdict = verdictOf(record);
    if (!point || !verdict) continue;
    points.push({
      point,
      verdict,
      evidence: text(record.evidence ?? record.quote),
      accept_equivalents: stringList(record.accept_equivalents ?? record.accepted ?? record.oe),
      reject_contradictions: stringList(record.reject_contradictions ?? record.rejected ?? record.contradictions),
      ignore_clauses: stringList(record.ignore_clauses ?? record.ignored ?? record.ignore),
    });
    if (points.length >= MAX_POINTS) break;
  }

  const passed = points.filter((p) => p.verdict === "PASS").length;
  const missed = points.length - passed;
  return {
    points,
    passed,
    missed,
    // Only a disagreement is a signal; an empty checklist is handled by `absent`.
    disagreesWithMarks: points.length > 0 && passed !== marksEarned,
    absent: points.length === 0,
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
