// Preconnect to the Supabase origin while the HTML is still being parsed.
//
// The app cannot render much before it has talked to Supabase (session restore,
// then the page's own queries), and that first request paid a fresh DNS lookup
// plus a TLS handshake after the entry bundle had already downloaded. Lighthouse
// named it: "Preconnected origins — no origins were preconnected", with the
// critical chain HTML → entry JS → API. A preconnect starts the handshake in
// parallel with the JS download instead.
//
// `crossorigin` is required, not cosmetic: the access token and apikey make every
// Supabase request a CORS request, and a preconnect without it opens a connection
// the credentialled request cannot reuse.
//
// The origin comes from the build environment, so a fork (or a local build with a
// different project) points at its own database or ships no hint at all — never a
// hardcoded project ref.
import type { Plugin, ResolvedConfig } from "vite";

/**
 * Vite loads `.env` into `config.env`, not into `process.env`, so a plugin that
 * only reads `process.env` emits nothing locally and only works where the host
 * injects real environment variables. Read both: whichever the build has.
 */
function supabaseOrigin(config: ResolvedConfig | null): string | null {
  const raw = String(config?.env?.VITE_SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "").trim();
  if (!raw) return null;
  try {
    return new URL(raw).origin;
  } catch {
    return null;
  }
}

export function preconnectSupabase(): Plugin {
  let config: ResolvedConfig | null = null;
  return {
    name: "preconnect-supabase",
    apply: "build",
    configResolved(resolved) {
      config = resolved;
    },
    transformIndexHtml(html) {
      const origin = supabaseOrigin(config);
      if (!origin) return html;
      const tags = [
        `<link rel="preconnect" href="${origin}" crossorigin />`,
        // Older browsers ignore preconnect; dns-prefetch is the cheap fallback.
        `<link rel="dns-prefetch" href="${origin}" />`,
      ].join("\n    ");
      // Before </head> so the hint precedes the module script that triggers it.
      return html.replace("</head>", `    ${tags}\n  </head>`);
    },
  };
}
