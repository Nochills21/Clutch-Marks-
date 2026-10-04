// Shared network policy for every outbound request in the app.
//
// Why this exists: nothing in the app bounded a request. On a flaky connection a
// stalled socket left the UI spinning forever — worst of all in `AuthProvider`,
// where an unresolved `getSession()` kept the entire app behind a loading gate
// with no error and no way out. Every request now has a hard ceiling.
//
// Edge functions that legitimately take a long time (an LLM writing a plan or
// marking a paper) opt into a longer ceiling with the `x-cm-timeout-ms` header,
// which is stripped before the request leaves the browser.

/** Default ceiling for PostgREST / Auth / Storage calls. */
export const DEFAULT_TIMEOUT_MS = 25_000;

/** Ceiling for AI edge functions, which wait on an upstream model. */
export const AI_TIMEOUT_MS = 120_000;

/** Ceiling for edge functions that render a file server-side (e.g. watermarking). */
export const RENDER_TIMEOUT_MS = 60_000;

/**
 * Ceiling for binary transfers to/from Storage.
 *
 * Supabase hands `global.fetch` to its Storage client, so uploads and downloads
 * go through this wrapper. A few megabytes of PDF on a weak mobile connection
 * easily exceeds the API ceiling, and aborting an upload that was still making
 * progress would have been a regression — so object transfers get their own,
 * much longer budget. Signing calls stay on the short ceiling: they are small
 * metadata requests and should fail fast.
 */
export const STORAGE_TIMEOUT_MS = 5 * 60_000;

/** Per-request override, consumed and removed by `fetchWithTimeout`. */
export const TIMEOUT_HEADER = "x-cm-timeout-ms";

export class TimeoutError extends Error {
  constructor(readonly ms: number) {
    super(`Request timed out after ${ms}ms`);
    this.name = "TimeoutError";
  }
}

/** Pull a readable message out of anything: Error, DOMException, or PostgREST's plain object. */
export function messageOf(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (error && typeof error === "object") {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string") return message;
  }
  return String(error ?? "");
}

/** Normalise a thrown value (or PostgREST's `{ message, hint }`) into an Error. */
export function toError(value: unknown): Error {
  if (value instanceof Error) return value;
  const error = new Error(messageOf(value) || "Unknown error");
  const hint = (value as { hint?: unknown } | null)?.hint;
  if (typeof hint === "string" && hint) error.message += ` (${hint})`;
  return error;
}

/**
 * A network-level failure (offline, DNS, reset, timeout) — safe to retry.
 *
 * Deliberately NOT matching bare "aborted": an aborted request can mean the
 * caller walked away, which should not be re-run.
 */
export function isTransientError(error: unknown): boolean {
  const name = (error as { name?: unknown } | null)?.name;
  if (typeof name === "string" && (name === "AbortError" || name === "TimeoutError")) return true;
  // `fetch` rejects with a TypeError for DNS/offline/CORS-preflight failures.
  if (error instanceof TypeError) return true;
  if (/failed to fetch|networkerror|network request failed|load failed|timeout|timed out|econnreset|etimedout|enotfound/i.test(messageOf(error))) {
    return true;
  }
  // PostgREST reports the HTTP status; 429/5xx are worth another attempt, while
  // a 4xx (RLS denial, bad request) never is.
  const status = (error as { status?: unknown } | null)?.status;
  return typeof status === "number" && (status === 429 || status >= 500);
}

/**
 * User-facing copy for a failed load, e.g. "Couldn't load your quizzes.".
 *
 * A transient network failure gets advice the student can act on; anything
 * else (an RLS denial, a bad request) carries the server's own reason, which is
 * far more useful than a generic apology.
 */
export function loadFailureMessage(what: string, error?: unknown): string {
  const base = `Couldn't load ${what}.`;
  if (!error) return `${base} Please try again.`;
  const detail = messageOf(error).trim();
  if (!detail || isTransientError(error) || detail === "Unknown error") {
    return `${base} Check your connection and try again.`;
  }
  return `${base} ${detail}`;
}

/**
 * `fetch` with a hard timeout, drop-in compatible with the global signature so
 * it can be handed to Supabase as `global.fetch`.
 */
function requestUrl(input: RequestInfo | URL): string {
  if (typeof input === "string") return input;
  if (input instanceof URL) return input.toString();
  return (input as Request).url ?? "";
}

/** Pick the ceiling for a request: explicit override, else by destination. */
export function timeoutFor(url: string, method = "GET"): number {
  // Object transfers carry the bytes; `/object/sign/` is a metadata call.
  if (url.includes("/storage/v1/object/") && !url.includes("/object/sign/")) {
    return STORAGE_TIMEOUT_MS;
  }
  // A GET of an object is a download; a PUT/POST is an upload. Both are exempt
  // above regardless of method, so `method` is only reserved for future rules.
  void method;
  return DEFAULT_TIMEOUT_MS;
}

export const fetchWithTimeout: typeof fetch = async (input, init) => {
  const headers = new Headers(init?.headers ?? undefined);
  const override = headers.get(TIMEOUT_HEADER);
  if (override !== null) headers.delete(TIMEOUT_HEADER);
  const parsed = override ? Number(override) : NaN;
  const timeoutMs =
    Number.isFinite(parsed) && parsed > 0
      ? parsed
      : timeoutFor(requestUrl(input), init?.method);

  const controller = new AbortController();
  const external = init?.signal ?? undefined;
  const forwardAbort = () => controller.abort(external?.reason);
  if (external) {
    if (external.aborted) controller.abort(external.reason);
    else external.addEventListener("abort", forwardAbort, { once: true });
  }

  const timer = setTimeout(
    () => controller.abort(new TimeoutError(timeoutMs)),
    timeoutMs,
  );

  try {
    return await fetch(input, { ...init, headers, signal: controller.signal });
  } finally {
    clearTimeout(timer);
    external?.removeEventListener("abort", forwardAbort);
  }
};

export interface RetryOptions {
  /** Total attempts, including the first. */
  attempts?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
  /** Decide whether a thrown value is worth retrying. Defaults to `isTransientError`. */
  shouldRetry?: (error: unknown, attempt: number) => boolean;
}

/**
 * Retry a thunk with jittered exponential backoff.
 *
 * Only wrap idempotent work (reads, session refresh). Never wrap a write: a
 * timeout does not mean the server did not commit.
 */
export async function withRetry<T>(
  // `PromiseLike`, not `Promise`: Supabase's query builder is thenable but does
  // not implement `catch`/`finally`.
  run: () => PromiseLike<T>,
  options: RetryOptions = {},
): Promise<T> {
  const {
    attempts = 3,
    baseDelayMs = 400,
    maxDelayMs = 4_000,
    shouldRetry = isTransientError,
  } = options;

  let lastError: unknown;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await run();
    } catch (error) {
      lastError = error;
      if (attempt === attempts || !shouldRetry(error, attempt)) throw error;
      // Full jitter: spreads a thundering herd of retries after an outage.
      const ceiling = Math.min(maxDelayMs, baseDelayMs * 2 ** (attempt - 1));
      await new Promise((resolve) => setTimeout(resolve, Math.random() * ceiling));
    }
  }
  throw lastError;
}

/**
 * Retry a Supabase query.
 *
 * This is not a style choice: PostgREST query builders **resolve** with
 * `{ data, error }` instead of rejecting, so a plain `withRetry` around one
 * would retry exactly never. This throws on a transient `error` so the retry
 * loop actually engages, then hands the original result back.
 */
export async function retrySupabase<T extends { error?: unknown }>(
  run: () => PromiseLike<T>,
  options: RetryOptions = {},
): Promise<T> {
  return withRetry<T>(async () => {
    const result = await run();
    if (result && result.error && isTransientError(result.error)) {
      throw toError(result.error);
    }
    return result;
  }, options);
}

/** Race a promise against a deadline, for non-`fetch` awaits (e.g. blob bodies). */
export async function withDeadline<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  const deadline = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new TimeoutError(ms)), ms);
  });
  try {
    return await Promise.race([promise, deadline]);
  } finally {
    clearTimeout(timer!);
  }
}
