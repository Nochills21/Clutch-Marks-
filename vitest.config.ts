import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    // jsdom hands out web storage only for a real origin: against an opaque one
    // ("about:blank") merely *reading* localStorage throws a SecurityError, so a
    // suite that needs storage would find none. Pin the origin instead of
    // inheriting jsdom's default. The environment is not the only thing that can
    // change under a suite, either — the shared setup and the storage-dependent
    // specs tolerate a DOM-less runner (vitest --environment node, `bun test`)
    // rather than assuming this line was honoured.
    environmentOptions: { jsdom: { url: "http://localhost/" } },
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    // The `@` alias resolves to frontend/src everywhere else (vite.config.ts),
    // so unit tests must live there too — including root src/ here meant the
    // tests exercised a different tree than the one that ships.
    include: ["frontend/src/**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./frontend/src") },
  },
});
