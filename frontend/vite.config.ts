import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { prerenderSeo } from "./plugins/prerender-seo";
import { injectAnalytics } from "./plugins/inject-analytics";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
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
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
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
          ui: ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "@radix-ui/react-select", "@radix-ui/react-tabs", "@radix-ui/react-toast", "@radix-ui/react-tooltip", "@radix-ui/react-accordion", "@radix-ui/react-alert-dialog", "@radix-ui/react-checkbox", "@radix-ui/react-switch", "@radix-ui/react-radio-group", "@radix-ui/react-slider", "@radix-ui/react-progress", "@radix-ui/react-separator", "@radix-ui/react-textarea", "@radix-ui/react-input"],
        },
      },
    },
  },
  optimizeDeps: {
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
      "html2canvas",
      "dompurify",
      "jspdf",
      "pdf-lib",
    ],
  },
}));
