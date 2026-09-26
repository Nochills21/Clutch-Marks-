import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

/**
 * Single-file production build: bundles the entire SPA into dist-single/ with
 * every asset inlined as data URLs (assetsInlineLimit maxed). The next step
 * (scripts/build-single-file.cjs) folds the JS/CSS into one self-contained
 * HTML file at production/clutchmarks-frontend.html.
 *
 * Intentionally omits prerenderSeo/injectAnalytics/componentTagger — a single
 * file carries no extra routes or external script tags. Build env (e.g.
 * VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY) is read from .env as
 * usual, so set those before running.
 *
 * Run: bun.exe node_modules/vite/bin/vite.js build --config vite.single.config.ts
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@backend": path.resolve(__dirname, "./backend"),
    },
  },
  build: {
    outDir: "dist-single",
    emptyOutDir: true,
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    rollupOptions: {
      output: {
        // One JS chunk, one CSS chunk — nothing left to fetch at runtime.
        manualChunks: undefined,
        inlineDynamicImports: true,
      },
    },
  },
});
