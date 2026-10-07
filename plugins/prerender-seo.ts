import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import type { Plugin, ResolvedConfig } from "vite";
import {
  ROUTE_META,
  SITE_URL,
  SITE_NAME,
  ROBOTS_INDEX,
  ROBOTS_NOINDEX,
  ROBOTS_NOINDEX_NOFOLLOW,
  ogImageUrl,
  type RouteMeta,
} from "../frontend/src/lib/seoRoutes";

/**
 * Emits a static HTML file per public route with route-specific
 * title/description/canonical/OpenGraph/Twitter/JSON-LD baked into the
 * markup. Crawlers that do not execute JavaScript (Facebook, LinkedIn,
 * Slack, WhatsApp, X) read these tags directly instead of the generic
 * homepage head.
 *
 * The React app still boots normally from the same HTML shell.
 */

/**
 * Vercel exposes VERCEL_ENV ("production" | "preview" | "development") to the
 * build. Preview/branch deployments are served behind Vercel Deployment
 * Protection, so a crawler that reaches one gets Vercel's own sign-in page —
 * the one that can end up titled "Login – Vercel" in a search result for the
 * brand. Such a build never emits an indexable robots tag.
 */
function robotsFor(meta: RouteMeta) {
  const env = process.env.VERCEL_ENV;
  if (env === "preview" || env === "development") return ROBOTS_NOINDEX_NOFOLLOW;
  return meta.noindex ? ROBOTS_NOINDEX : ROBOTS_INDEX;
}

function escapeAttr(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function stripTags(html: string, patterns: RegExp[]) {
  return patterns.reduce((acc, pattern) => acc.replace(pattern, ""), html);
}

function buildHead(meta: RouteMeta) {
  const url = `${SITE_URL}${meta.path === "/" ? "/" : meta.path}`;
  const title = escapeAttr(meta.title);
  const description = escapeAttr(meta.description);
  // Per-route social card, so each shared link previews with its own artwork.
  const image = ogImageUrl(meta);

  const tags = [
    `<title>${title}</title>`,
    `<meta name="robots" content="${robotsFor(meta)}" />`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${title}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ];

  if (meta.jsonLd) {
    const payload = JSON.stringify(meta.jsonLd).replace(/</g, "\\u003c");
    tags.push(`<script type="application/ld+json">${payload}</script>`);
  }

  return tags.join("\n    ");
}

function renderRoute(shell: string, meta: RouteMeta) {
  // Drop the generic homepage tags this route replaces, keeping the shared
  // ones (charset, viewport, verification, og:image, twitter:image).
  const cleaned = stripTags(shell, [
    /\s*<title>[\s\S]*?<\/title>/i,
    // Replaced per route below — the shell's default must not survive next to it.
    /\s*<meta\s+name="robots"[^>]*>/gi,
    /\s*<meta\s+name="description"[^>]*>/gi,
    /\s*<link\s+rel="canonical"[^>]*>/gi,
    /\s*<meta\s+property="og:(type|title|description|url|site_name|image|image:width|image:height|image:alt)"[^>]*>/gi,
    /\s*<meta\s+name="twitter:(card|title|description|image)"[^>]*>/gi,
    /\s*<script\s+type="application\/ld\+json"[\s\S]*?<\/script>/gi,
  ]);

  return cleaned.replace(/<\/head>/i, `  ${buildHead(meta)}\n  </head>`);
}

export function prerenderSeo(): Plugin {
  let config: ResolvedConfig;

  return {
    name: "clutch-marks-prerender-seo",
    apply: "build",
    configResolved(resolved) {
      config = resolved;
    },
    closeBundle() {
      const outDir = resolve(config.root, config.build.outDir);
      const indexPath = resolve(outDir, "index.html");

      let shell: string;
      try {
        shell = readFileSync(indexPath, "utf8");
      } catch {
        return;
      }

      let prerendered = 0;
      for (const meta of ROUTE_META) {
        // Skip parameterised routes (e.g. /study/:slug/:level/:topic/notes):
        // a static placeholder file can't know the real topic/subject, and
        // colon paths are invalid directory names on Windows. Those pages
        // emit correct tags at runtime via <SEOHead />.
        if (meta.path.includes(":")) continue;
        const html = renderRoute(shell, meta);
        const target =
          meta.path === "/"
            ? indexPath
            : resolve(outDir, `${meta.path.replace(/^\//, "")}/index.html`);
        mkdirSync(dirname(target), { recursive: true });
        writeFileSync(target, html);
        prerendered += 1;
      }

      // Keep the sitemap's freshness signal honest. `<lastmod>` is what asks a
      // crawler to come back and replace a stale result title, so it is stamped
      // with the build date instead of whatever the checked-in file says.
      const sitemapPath = resolve(outDir, "sitemap.xml");
      try {
        const sitemap = readFileSync(sitemapPath, "utf8");
        const today = new Date().toISOString().slice(0, 10);
        const refreshed = sitemap.replace(/<lastmod>[^<]*<\/lastmod>/g, `<lastmod>${today}</lastmod>`);
        if (refreshed !== sitemap) writeFileSync(sitemapPath, refreshed);
      } catch {
        // No sitemap in this build — nothing to refresh.
      }

      // eslint-disable-next-line no-console
      console.log(`prerender-seo: wrote ${prerendered} route HTML files`);
    },
  };
}
