import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";
import { ANALYTICS_OPT_OUT_KEY, isAnalyticsOptedOut, setAnalyticsOptedOut } from "./analyticsOptOut";
import { injectAnalytics } from "../../../plugins/inject-analytics";

const PLACEHOLDER = "<!--analytics-inject-->";
const SCRIPT_URL = "https://plausible.io/js/script.tagged-events.js";

/** The plugin's hook is typed as Vite's union (function | {handler}); call it directly. */
const injectInto = (html: string): string =>
  (injectAnalytics().transformIndexHtml as (h: string) => string)(html);

// ---- the storage this suite needs -----------------------------------------
// The module under test is browser code: it reads `window` and `localStorage`.
// vitest's jsdom environment (see vitest.config.ts) supplies both for real, and
// `vi.spyOn(Storage.prototype, …)` below intercepts them exactly as written. A
// runner that loads no config — `bun test`, or vitest started with --no-config
// or --environment node — supplies neither: `localStorage.clear()` then died
// with "localStorage is not defined", while the module's own
// `typeof window === "undefined"` guard quietly turned its assertions into
// no-ops. Install the smallest correct stand-in only when the environment has
// nothing (or an opaque origin, where even reading localStorage throws), so
// these assertions mean the same thing wherever the suite is run.
class MemoryStorage {
  private items = new Map<string, string>();
  get length(): number {
    return this.items.size;
  }
  key(index: number): string | null {
    return [...this.items.keys()][index] ?? null;
  }
  getItem(key: string): string | null {
    return this.items.has(key) ? (this.items.get(key) as string) : null;
  }
  setItem(key: string, value: string): void {
    this.items.set(key, String(value));
  }
  removeItem(key: string): void {
    this.items.delete(key);
  }
  clear(): void {
    this.items.clear();
  }
}

/** Give the suite web storage if the environment did not. A no-op under jsdom. */
function ensureWebStorage(): void {
  if (typeof window !== "undefined") {
    try {
      void window.localStorage; // reading it can throw on an opaque origin
      return;
    } catch {
      // Opaque origin: fall through and provide storage of our own.
    }
  }
  const scope = globalThis as unknown as {
    window?: unknown;
    Storage?: unknown;
    localStorage?: unknown;
    sessionStorage?: unknown;
  };
  scope.window = globalThis;
  scope.Storage = MemoryStorage;
  scope.localStorage = new MemoryStorage();
  scope.sessionStorage = new MemoryStorage();
}

ensureWebStorage();

describe("the analytics opt-out choice", () => {
  it("runs against web storage, whichever runner started it", () => {
    // Guards the environment rather than the module: `vi.spyOn` below reaches
    // the methods through Storage.prototype, so storage has to be an instance of
    // a real Storage — jsdom's under vitest, the stand-in installed above only
    // when the environment supplied none.
    expect(typeof Storage).toBe("function");
    expect(localStorage instanceof Storage).toBe(true);
    expect(sessionStorage instanceof Storage).toBe(true);
  });

  beforeEach(() => localStorage.clear());
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("starts opted in, and remembers an opt-out", () => {
    expect(isAnalyticsOptedOut()).toBe(false);

    setAnalyticsOptedOut(true);
    expect(localStorage.getItem(ANALYTICS_OPT_OUT_KEY)).toBe("1");
    expect(isAnalyticsOptedOut()).toBe(true);

    // Opting back in clears the key rather than storing "0": absent is the
    // default the build-time gate already understands.
    setAnalyticsOptedOut(false);
    expect(localStorage.getItem(ANALYTICS_OPT_OUT_KEY)).toBeNull();
    expect(isAnalyticsOptedOut()).toBe(false);
  });

  // Storage can throw outright (private mode, blocked cookies). The page must
  // still render, and must not claim a preference it cannot persist.
  it("treats unreadable storage as not opted out instead of throwing", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("storage blocked");
    });
    expect(() => isAnalyticsOptedOut()).not.toThrow();
    expect(isAnalyticsOptedOut()).toBe(false);
  });

  it("does not throw when storage refuses a write", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("quota exceeded");
    });
    expect(() => setAnalyticsOptedOut(true)).not.toThrow();
  });
});

describe("the build-time analytics gate", () => {
  const originalDomain = process.env.VITE_PLAUSIBLE_DOMAIN;

  afterEach(() => {
    if (originalDomain === undefined) delete process.env.VITE_PLAUSIBLE_DOMAIN;
    else process.env.VITE_PLAUSIBLE_DOMAIN = originalDomain;
  });

  // The gate and the storage module live in different trees (one runs in the Vite
  // config, one in the browser), so this is what stops their key drifting: the
  // injected script must read the exact key the app writes.
  it("reads the same opt-out key the app writes, before fetching the script", () => {
    process.env.VITE_PLAUSIBLE_DOMAIN = "clutchmarks.study";
    const html = injectInto(`<head>${PLACEHOLDER}</head>`);

    expect(html).toContain(ANALYTICS_OPT_OUT_KEY);
    expect(html).toContain(SCRIPT_URL);
    expect(html).not.toContain(PLACEHOLDER);
    // The script must be created conditionally, not shipped as a plain tag: a
    // defer script tag would already be downloading by the time anything ran.
    expect(html).not.toContain(`<script defer data-domain=`);
    expect(html).toMatch(/localStorage\.getItem\("[^"]+"\)==="1"\)return/);
    // The domain decides which site the page views are attributed to.
    expect(html).toContain('"clutchmarks.study"');
  });

  it("ships nothing at all when no domain is configured", () => {
    delete process.env.VITE_PLAUSIBLE_DOMAIN;
    const html = injectInto(`<head>${PLACEHOLDER}</head>`);

    expect(html).not.toContain(PLACEHOLDER);
    expect(html).not.toContain("plausible.io");
    expect(html).not.toContain(ANALYTICS_OPT_OUT_KEY);
  });
});
