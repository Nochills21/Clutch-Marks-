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
import { TOPIC_MANIFEST } from "../frontend/src/lib/topicManifest.generated";
import { TOPIC_PAGE_KINDS, topicHead } from "../frontend/src/lib/topicSeo";

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

/**
 * Tag the prerendered head elements so the app can recognise and remove them.
 *
 * These static tags are what a crawler that does not run JavaScript reads. But
 * react-helmet-async does not adopt tags it did not create — it appends its own —
 * so without a marker every page ended up with two `robots` tags, two canonicals
 * and two *different* `description` tags in the DOM once React had rendered.
 * <SEOHead /> strips anything carrying this attribute before its own tags land,
 * leaving exactly one of each. Do not emit a head tag here without it.
 */
function mark(tag: string) {
  // <title> is left alone: react-helmet-async already removes any title it did
  // not create, and deleting it here would blank the tab for a frame.
  if (tag.startsWith("<title")) return tag;
  return tag.replace(/^(<[a-z]+)/, `$1 data-seo="prerender"`);
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
  ].map((tag) => mark(tag));

  if (meta.jsonLd) {
    const payload = JSON.stringify(meta.jsonLd).replace(/</g, "\\u003c");
    tags.push(mark(`<script type="application/ld+json">${payload}</script>`));
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

/** Sentinel for the generated topic block, so a re-run cannot duplicate it. */
const TOPIC_MARKER = "<!-- topic pages: generated by plugins/prerender-seo.ts -->";

function writeRoute(target: string, shell: string, meta: RouteMeta) {
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, renderRoute(shell, meta));
}

function countSitemapEntries(path: string): number {
  try {
    return (readFileSync(path, "utf8").match(/<loc>/g) ?? []).length;
  } catch {
    return 0;
  }
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

      // Same list the runtime routes live in, minus the parameterised ones:
      // those are written below, one real file per topic instead of one
      // placeholder (a colon path is not a directory name on Windows either).
      let prerendered = 0;
      for (const meta of ROUTE_META) {
        if (meta.path.includes(":")) continue;
        const target =
          meta.path === "/"
            ? indexPath
            : resolve(outDir, `${meta.path.replace(/^\//, "")}/index.html`);
        writeRoute(target, shell, meta);
        prerendered += 1;
      }

      // Every topic page (100 topics x notes|quiz|papers) as real static HTML.
      // These are the site's content pages, and without this they were served
      // the generic SPA shell: the homepage's title, no canonical, no
      // breadcrumb — to every crawler that does not execute JavaScript.
      let topicPages = 0;
      for (const topic of TOPIC_MANIFEST) {
        for (const kind of TOPIC_PAGE_KINDS) {
          const meta = topicHead(topic, kind);
          writeRoute(resolve(outDir, `${meta.path.replace(/^\//, "")}/index.html`), shell, meta);
          topicPages += 1;
        }
      }

      // One sitemap for both kinds of page. The checked-in public/sitemap.xml
      // lists only the literal routes — it cannot know which topics exist — so
      // the topic URLs are appended here from the same manifest that produced
      // the files above. A missing manifest is not a silent trim: it is logged.
      const sitemapPath = resolve(outDir, "sitemap.xml");
      try {
        let sitemap = readFileSync(sitemapPath, "utf8");
        const today = new Date().toISOString().slice(0, 10);

        if (topicPages > 0 && !sitemap.includes(TOPIC_MARKER)) {
          const entries = TOPIC_MANIFEST.flatMap((topic) =>
            TOPIC_PAGE_KINDS.map((kind) => {
              const { path } = topicHead(topic, kind);
              const priority = kind === "notes" ? "0.7" : "0.6";
              return `  <url>\n    <loc>${SITE_URL}${path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
            }),
          ).join("\n");
          sitemap = sitemap.replace(
            /\s*<\/urlset>/,
            `\n  ${TOPIC_MARKER}\n${entries}\n</urlset>`,
          );
        } else if (topicPages === 0) {
          // eslint-disable-next-line no-console
          console.warn("prerender-seo: no topics in the manifest — sitemap left without topic URLs");
        }

        // `<lastmod>` is what asks a crawler to come back and replace a stale
        // result title, so every entry is stamped with the build date instead of
        // whatever the checked-in file, or a topic's own row, happened to say.
        const refreshed = sitemap.replace(/<lastmod>[^<]*<\/lastmod>/g, `<lastmod>${today}</lastmod>`);
        if (refreshed !== sitemap) writeFileSync(sitemapPath, refreshed);
      } catch {
        // No sitemap in this build — nothing to refresh.
      }

      // eslint-disable-next-line no-console
      console.log(
        `prerender-seo: wrote ${prerendered} route HTML files + ${topicPages} topic pages, sitemap has ${countSitemapEntries(sitemapPath)} URLs`,
      );
    },
  };
}
