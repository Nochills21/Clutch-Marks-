import { afterEach, describe, expect, it, vi } from "vitest";
import {
  DEFAULT_TIMEOUT_MS,
  fetchWithTimeout,
  isTransientError,
  retrySupabase,
  STORAGE_TIMEOUT_MS,
  TIMEOUT_HEADER,
  TimeoutError,
  timeoutFor,
  withRetry,
} from "./net";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

/** A fetch stub that hangs until its signal aborts, like a stalled socket. */
function hangingFetch() {
  return vi.fn(
    (_input: RequestInfo | URL, init?: RequestInit) =>
      new Promise<Response>((_resolve, reject) => {
        const signal = init?.signal;
        if (!signal) return;
        signal.addEventListener("abort", () => reject(signal.reason));
      }),
  );
}

describe("fetchWithTimeout", () => {
  it("aborts a stalled request and rejects with TimeoutError", async () => {
    vi.stubGlobal("fetch", hangingFetch());

    await expect(
      fetchWithTimeout("https://example.test/slow", {
        headers: { [TIMEOUT_HEADER]: "10" },
      }),
    ).rejects.toBeInstanceOf(TimeoutError);
  });

  it("strips the internal timeout header before the request leaves", async () => {
    const fetchMock = vi.fn(
      async (_input: RequestInfo | URL, _init?: RequestInit) => new Response("{}"),
    );
    vi.stubGlobal("fetch", fetchMock);

    await fetchWithTimeout("https://example.test/ok", {
      headers: { [TIMEOUT_HEADER]: "5000", "X-Test": "1" },
    });

    const sentHeaders = fetchMock.mock.calls[0]![1]?.headers as Headers;
    expect(sentHeaders.get(TIMEOUT_HEADER)).toBeNull();
    expect(sentHeaders.get("X-Test")).toBe("1");
  });

  it("forwards an external abort", async () => {
    vi.stubGlobal("fetch", hangingFetch());
    const controller = new AbortController();
    const pending = fetchWithTimeout("https://example.test/abort", {
      signal: controller.signal,
    });

    controller.abort();

    await expect(pending).rejects.toBeDefined();
  });
});

describe("timeoutFor", () => {
  it("gives storage object transfers a far longer budget than API calls", () => {
    // Supabase routes Storage through `global.fetch`, so an upload must not be
    // cut off at the API ceiling.
    expect(timeoutFor("https://x.test/storage/v1/object/past-papers/big.pdf", "PUT")).toBe(STORAGE_TIMEOUT_MS);
    expect(timeoutFor("https://x.test/storage/v1/object/past-papers/big.pdf", "GET")).toBe(STORAGE_TIMEOUT_MS);
    expect(STORAGE_TIMEOUT_MS).toBeGreaterThan(DEFAULT_TIMEOUT_MS);
  });

  it("keeps metadata calls on the short ceiling", () => {
    expect(timeoutFor("https://x.test/storage/v1/object/sign/past-papers/a.pdf", "POST")).toBe(DEFAULT_TIMEOUT_MS);
    expect(timeoutFor("https://x.test/rest/v1/past_papers", "GET")).toBe(DEFAULT_TIMEOUT_MS);
  });

  it("lets an explicit header override the destination default", async () => {
    // A 10ms budget must abort even though the URL would normally get 5 minutes.
    vi.stubGlobal("fetch", hangingFetch());
    await expect(
      fetchWithTimeout("https://x.test/storage/v1/object/b/p.pdf", {
        method: "PUT",
        headers: { [TIMEOUT_HEADER]: "10" },
      }),
    ).rejects.toBeInstanceOf(TimeoutError);
  });
});

describe("isTransientError", () => {
  it("retries transport-level failures", () => {
    expect(isTransientError(new TypeError("Failed to fetch"))).toBe(true);
    expect(isTransientError(new TimeoutError(1000))).toBe(true);
    expect(isTransientError({ message: "TypeError: Failed to fetch" })).toBe(true);
    expect(isTransientError({ message: "FetchError: request timed out", status: 0 })).toBe(true);
    expect(isTransientError({ message: "service down", status: 503 })).toBe(true);
    expect(isTransientError({ message: "slow down", status: 429 })).toBe(true);
  });

  it("does not retry errors the server deliberately returned", () => {
    expect(isTransientError(new Error("boom"))).toBe(false);
    expect(isTransientError({ message: "permission denied", status: 403 })).toBe(false);
    expect(isTransientError({ message: "not found", status: 404 })).toBe(false);
  });
});

describe("withRetry", () => {
  it("retries transient failures with backoff and then succeeds", async () => {
    let attempts = 0;
    const value = await withRetry(
      async () => {
        attempts += 1;
        if (attempts < 3) throw new TypeError("Failed to fetch");
        return "ok";
      },
      { baseDelayMs: 1 },
    );

    expect(value).toBe("ok");
    expect(attempts).toBe(3);
  });

  it("fails fast on a non-transient error", async () => {
    let attempts = 0;
    await expect(
      withRetry(async () => {
        attempts += 1;
        throw new Error("boom");
      }, { baseDelayMs: 1 }),
    ).rejects.toThrow("boom");

    expect(attempts).toBe(1);
  });
});

describe("retrySupabase", () => {
  it("retries a query that RESOLVED with a transient error", async () => {
    // Regression guard: PostgREST resolves `{ data, error }` instead of
    // rejecting, so a plain withRetry would never retry at all.
    let attempts = 0;
    const result = await retrySupabase<{ data: string[] | null; error: unknown }>(
      () => {
        attempts += 1;
        return Promise.resolve(
          attempts < 3
            ? { data: null, error: { message: "TypeError: Failed to fetch", status: 0 } }
            : { data: ["row"], error: null },
        );
      },
      { baseDelayMs: 1 },
    );

    expect(attempts).toBe(3);
    expect(result.data).toEqual(["row"]);
  });

  it("returns a deliberate error without retrying, so callers can read it", async () => {
    let attempts = 0;
    const result = await retrySupabase<{ data: null; error: unknown }>(
      () => {
        attempts += 1;
        return Promise.resolve({
          data: null,
          error: { message: "permission denied", status: 403 },
        });
      },
      { baseDelayMs: 1 },
    );

    expect(attempts).toBe(1);
    expect(result.error).toEqual({ message: "permission denied", status: 403 });
  });
});
