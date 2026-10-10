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
}
