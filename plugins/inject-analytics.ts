// Injects the Plausible analytics script into index.html at build time when
// VITE_PLAUSIBLE_DOMAIN is configured. Dev builds and env-less builds stay
// script-free — no tracking in local dev or previews.
//
// The injected markup checks the reader's stored choice first. That ordering is
// the point: a plain `<script defer src=…>` starts downloading as soon as it is
// parsed, so removing the tag later (or silencing our own events) would already
// be too late to honour an opt-out. Nothing is fetched unless the key is absent.
import type { Plugin } from "vite";

/**
 * Must equal ANALYTICS_OPT_OUT_KEY in frontend/src/lib/analyticsOptOut.ts.
 * analyticsOptOut.test.ts imports both and fails if they drift, which is why
 * this file does not import the module: it is a browser module (React hook), and
 * pulling React into the config process to share one string is not worth it.
 */
const OPT_OUT_KEY = "cm-analytics-optout";
const SCRIPT_SRC = "https://plausible.io/js/script.tagged-events.js";

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
      // `var`/no arrow functions: this is inlined verbatim into an HTML parser
      // that may meet an older browser, and it must not depend on the bundle.
      const tag = [
        "<script>",
        "(function(){",
        `try{if(localStorage.getItem("${OPT_OUT_KEY}")==="1")return}catch(e){}`,
        'var s=document.createElement("script");',
        "s.defer=true;",
        `s.setAttribute("data-domain","${domain}");`,
        `s.src="${SCRIPT_SRC}";`,
        "document.head.appendChild(s);",
        "})();",
        "</script>",
      ].join("");
      return html.replace("<!--analytics-inject-->", tag);
    },
  };
}
