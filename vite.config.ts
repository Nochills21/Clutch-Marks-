import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { prerenderSeo } from "./plugins/prerender-seo";
import { injectAnalytics } from "./plugins/inject-analytics";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Top-level resolve.alias is what BOTH the dev server and the production
  // bundle read. Keeping it only under build.rollupOptions silently broke dev
  // ("Failed to resolve import @/…").
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "frontend/src"),
      "@backend": path.resolve(__dirname, "./backend"),
    },
    // The repo carries two node_modules (root + frontend/) and the `@` alias
    // pulls source from frontend/src, so libraries used to load twice —
    // "Invalid hook call / more than one copy of React", and two distinct
    // SupabaseClient classes (~600 kB of duplicated vendor code). The two
    // trees are installed independently and there is no root lockfile, so
    // their copies can drift to different versions. Pin every library that is
    // reachable from both trees to a single copy.
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "@supabase/supabase-js",
      "jspdf",
      "html2canvas",
      "dompurify",
    ],
  },
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    prerenderSeo(),
    injectAnalytics(),
  ].filter(Boolean),
  build: {
    // minify aggressively and de-duplicate the two huge ancillaries (pdfExport
    // and html2canvas are each split into their own ~200-500 kB chunk).
    minify: "esbuild",
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // react + react-dom shared chunk (kept separate from the app bundle)
          react: ["react", "react-dom", "react-router-dom", "react-helmet-async", "next-themes", "@tanstack/react-query", "react-resizable-panels"],
          // peer libraries that ship 200-500 kB bundles and are loaded everywhere
          ui: ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "@radix-ui/react-select", "@radix-ui/react-tabs", "@radix-ui/react-toast", "@radix-ui/react-tooltip", "@radix-ui/react-accordion", "@radix-ui/react-alert-dialog", "@radix-ui/react-checkbox", "@radix-ui/react-switch", "@radix-ui/react-radio-group", "@radix-ui/react-slider", "@radix-ui/react-progress", "@radix-ui/react-separator"],
          // The Supabase client (~150 kB) changes far less often than app code:
          // its own chunk stays cached across deploys instead of being
          // re-downloaded inside the entry chunk every release.
          supabase: ["@supabase/supabase-js"],
        },
      },
    },
  },
  optimizeDeps: {
    // Only the real app entry. Left to the default glob, the scanner also
    // parses frontend/index.html and the checked-in 2 MB production/
    // clutchmarks-frontend.html single-file bundle, which esbuild cannot parse
    // ("Expected ) but found ;") — it aborts dependency scanning entirely.
    entries: ["index.html"],
    // pre-bundle heavy third-party node_modules so first load is fast
    include: [
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-select",
      "@radix-ui/react-toast",
      "@radix-ui/react-tabs",
      "@radix-ui/react-tooltip",
      "@radix-ui/react-accordion",
      "@radix-ui/react-alert-dialog",
      "react-dom",
      "react-helmet-async",
      "next-themes",
      "@tanstack/react-query",
      "react-resizable-panels",
      // No source file imports html2canvas or pdf-lib (pdf-lib isn't even
      // installed); listing them only made Vite warn about a failed prebundle.
      "dompurify",
      "jspdf",
    ],
  },
}));
