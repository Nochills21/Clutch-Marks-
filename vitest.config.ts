import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
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
