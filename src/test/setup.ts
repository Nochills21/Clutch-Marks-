import "@testing-library/jest-dom";

// jsdom does not implement matchMedia, so anything rendering a component that
// queries it (theme switch, breakpoints) would throw. Installed only when there
// is a window to install it on: vitest's configured environment is jsdom, but a
// run started with --environment node (or a runner that loads no config, like
// `bun test`) still has to *load* this file, and touching `window` there aborted
// every suite with "window is not defined" before a single test could run.
// Storage-free logic tests can therefore run anywhere; a test that needs a real
// DOM still needs jsdom, and fails on its own terms.
if (typeof window !== "undefined") {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    }),
  });

  // Node 26 defines `localStorage` (and `sessionStorage`) as globals that stay
  // undefined unless the process was started with --localstorage-file, and
  // vitest's jsdom environment only overrides globals the runtime does NOT
  // already have — so every storage-dependent suite met `undefined` under
  // Node 26 and died on `localStorage.clear()` while CI (bun) passed. jsdom's
  // own Storage is still reachable: the environment parks its window on
  // `globalThis.jsdom`, so point the shadowed globals back at it. On a runtime
  // that has no such global (bun, Node <= 24) this is a no-op.
  if (typeof (globalThis as { localStorage?: Storage }).localStorage === "undefined") {
    const jsdomWindow = (globalThis as { jsdom?: { window?: Window } }).jsdom?.window;
    for (const key of ["localStorage", "sessionStorage"] as const) {
      const storage = jsdomWindow?.[key];
      if (storage) Object.defineProperty(globalThis, key, { configurable: true, writable: true, value: storage });
    }
  }
}
