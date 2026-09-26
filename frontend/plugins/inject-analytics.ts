// Injects the Plausible analytics script into index.html at build time when
// VITE_PLAUSIBLE_DOMAIN is configured. Dev builds and env-less builds stay
// script-free — no tracking in local dev or previews.
import type { Plugin } from "vite";

export function injectAnalytics(): Plugin {
  return {
    name: "inject-analytics",
    apply: "build",
    transformIndexHtml(html) {
      const domain = process.env.VITE_PLAUSIBLE_DOMAIN;
      if (!domain) {
        // Remove the placeholder comment so nothing ships when unconfigured.
        return html.replace("<!--analytics-inject-->", "");
      }
      const tag = `<script defer data-domain="${domain}" src="https://plausible.io/js/script.tagged-events.js"></script>`;
      return html.replace("<!--analytics-inject-->", tag);
    },
  };
}
