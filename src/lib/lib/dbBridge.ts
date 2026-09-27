// dbBridge — safe runtime casts for rows coming back from the database.
//
// The app talks to a real Supabase project whose generated TS types lag the
// live schema. Casts like `data as unknown as T` silently accept wrong shapes,
// which is the root cause of the "undefined has no map/set/length" crashes you
// hit in prod.  Every boundary (all RPCs and table reads) is guarded here so a
// 4xx/5xx response or a schema drift can never reach the UI as "cannot read
// properties of undefined".  The cost is a few hundred bytes of validation —
// the price of a stable app.
//
// Usage:
//   import { asStr, asStrArr, asBool, toNum, asTable } from "@/lib/dbBridge";
//
//   const { data } = await supabase.from("subjects").select("*");
//   const rows = asTable<SubjectRow>(data);   // never throws, always an array

/** Greedy assertion helper so the file stays small. Each generic is a
 *  sentinel type used only to infer the return type at the call site. */
export type Assert<T extends boolean> = true;

/** Guard: is `v` a string? Returns `v` unchanged if yes, "" otherwise. */
export function asStr(v: unknown): string {
  return typeof v === "string" ? v : "";
}

/** Guard: is `v` an array of strings? Returns a filtered string[] (never an
 *  index signature or object that would crash .map / .includes). */
export function asStrArr(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
}

/** Guard: is `v` a boolean? */
export function asBool(v: unknown): boolean {
  return typeof v === "boolean" ? v : false;
}

/** Guard: is `v` a finite number? Returns 0 if not (so arithmetic never
 *  propagates NaN into a query or a rendered number). */
export function toNum(v: unknown): number {
  const n =
    typeof v === "number"
      ? v
      : typeof v === "string" && v.trim() !== ""
        ? Number(v)
        : NaN;
  return Number.isFinite(n) ? n : 0;
}

/** Guard: is `v` a boolean-like "date"? Returns true for real ISO dates. */
export function isIsoDate(v: unknown): v is string {
  return typeof v === "string" && v.length > 0;
}

/** Guard: is `v` an unknown object (not null, not array, not primative)?
 *  Returns the narrowed object so you can read one field at a time. */
export function asObj<T extends Record<string, unknown>>(v: unknown): T | null {
  if (v === null || v === undefined) return null;
  if (Array.isArray(v)) return null;
  if (typeof v !== "object") return null;
  return v as T;
}

/** Guard: is `v` an array? Returns a plain empty array when it isn't, so the
 *  caller can safely call .map / .filter / .length without guarding. */
export function asArray<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v as T[]) : [];
}

/**
 * Guard: convert a raw Supabase `data` payload into an array of `T`.
 * - null / undefined / non-array  -> []
 * - array with wrong shape        -> [] (never throws, never returns
 *   mixed-index objects)
 */
export function asTable<T extends Record<string, unknown>>(data: unknown): T[] {
  return asArray(data).filter((row): row is T => {
    if (row === null || row === undefined) return false;
    if (Array.isArray(row)) return false;
    if (typeof row !== "object") return false;
    return true;
  });
}

/** stringify a row for logs — never a raw `any` JSON.parse */
export function toLogString(v: unknown): string {
  try {
    return JSON.stringify(v);
  } catch {
    return String(v);
  }
}
