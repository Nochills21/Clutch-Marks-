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
import { LEVEL_MANIFEST, levelHead, levelPath } from "../frontend/src/lib/levelSeo";
import {
  SPA_FALLBACK_FILE,
  SPA_FALLBACK_PATH,
  SPA_FALLBACK_ROBOTS,
} from "../frontend/src/lib/spaRoutes";
import { verifyIndexDirectives } from "./seoIndexDirectives";

/**
 * Emits a static HTML file per public route with route-specific
 * title/description/canonical/OpenGraph/Twitter/JSON-LD baked into the
 * markup. Crawlers that do not execute JavaScript (Facebook, LinkedIn,
 * Slack, WhatsApp, X) read these tags directly instead of the generic
 * homepage head.
 *
 * The React app still boots normally from the same HTML shell.
 *
 * It also writes the fallback document (`SPA_FALLBACK_FILE`) that the host's
 * catch-all rewrite serves for every URL it wrote no page for — see
 * frontend/src/lib/spaRoutes.ts. That document is noindex, so a route the build
 * cannot prerender does not reach a crawler wearing the homepage's indexable
 * head; before it existed, `dist/index.html` (the indexable homepage) answered
 * those URLs too.
 *
 * Having written every page, it then reads them all back and audits their
 * crawler directives (see ./seoIndexDirectives.ts): a public page without an
 * index directive, a private page that is indexable, an indexable fallback, or
 * an indexable preview deployment fails the build here instead of surfacing in
 * search results.
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

/** The shell's default robots tag, which every rendering below replaces. */
const ROBOTS_META_TAG = /\s*<meta\s+name="robots"[^>]*>/gi;

function renderRoute(shell: string, meta: RouteMeta) {
  // Drop the generic homepage tags this route replaces, keeping the shared
  // ones (charset, viewport, verification, og:image, twitter:image).
  const cleaned = stripTags(shell, [
    /\s*<title>[\s\S]*?<\/title>/i,
    // Replaced per route below — the shell's default must not survive next to it.
    ROBOTS_META_TAG,
    /\s*<meta\s+name="description"[^>]*>/gi,
    /\s*<link\s+rel="canonical"[^>]*>/gi,
    /\s*<meta\s+property="og:(type|title|description|url|site_name|image|image:width|image:height|image:alt)"[^>]*>/gi,
    /\s*<meta\s+name="twitter:(card|title|description|image)"[^>]*>/gi,
    /\s*<script\s+type="application\/ld\+json"[\s\S]*?<\/script>/gi,
  ]);

  return cleaned.replace(/<\/head>/i, `  ${buildHead(meta)}\n  </head>`);
}

/**
 * The document the host's catch-all rewrite serves every URL that has no page of
 * its own: an unknown route, `/lessons/<id>/notes`, the admin console, a typo a
 * crawler followed. One document answers all of them, so it must not be
 * indexable and must not claim to be some other page.
 *
 * Built from the pristine shell read before `/`'s page replaced it: the shell's
 * head stays (title, description, icons, social tags — the brand is the right
 * thing to show for a URL we cannot describe), the shell's indexable default is
 * swapped for the fallback directive, and any canonical or og:url is dropped. A
 * canonical pointing at `/` is what once told Google that every URL without a
 * page of its own was a copy of the homepage.
 */
function renderFallback(shell: string) {
  const cleaned = stripTags(shell, [
    ROBOTS_META_TAG,
    /\s*<link\s+rel="canonical"[^>]*>/gi,
    /\s*<meta\s+property="og:url"[^>]*>/gi,
  ]);
  return cleaned.replace(
    /<\/head>/i,
    `  ${mark(`<meta name="robots" content="${SPA_FALLBACK_ROBOTS}" />`)}\n  </head>`,
  );
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
        // A prerender that quietly does nothing is how every route came to serve
        // the homepage shell to crawlers. A missing shell is a broken build, not
        // a reason to skip the step silently.
        throw new Error(
          `prerender-seo: ${indexPath} does not exist, so no route page could be written`,
        );
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

      // The fallback document. Written from `shell`, which still holds the
      // pristine build output because the loop above overwrote the file at
      // indexPath with `/`'s own page.
      writeFileSync(resolve(outDir, SPA_FALLBACK_FILE), renderFallback(shell));

      // Every subject+level hub page (9) and topic page (100 x notes|quiz|papers)
      // as real static HTML. These are the site's content pages, and without this
      // they were served the generic SPA shell: the homepage's title, no
      // canonical, no breadcrumb — to every crawler that does not execute
      // JavaScript, while the sitemap listed none of them.
      let contentPages = 0;
      for (const level of LEVEL_MANIFEST) {
        const meta = levelHead(level);
        writeRoute(resolve(outDir, `${meta.path.replace(/^\//, "")}/index.html`), shell, meta);
        contentPages += 1;
      }
      for (const topic of TOPIC_MANIFEST) {
        for (const kind of TOPIC_PAGE_KINDS) {
          const meta = topicHead(topic, kind);
          writeRoute(resolve(outDir, `${meta.path.replace(/^\//, "")}/index.html`), shell, meta);
          contentPages += 1;
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

        if (contentPages > 0 && !sitemap.includes(TOPIC_MARKER)) {
          const url = (path: string, priority: string) =>
            `  <url>\n    <loc>${SITE_URL}${path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
          const entries = [
            ...LEVEL_MANIFEST.map((level) => url(levelPath(level), "0.8")),
            ...TOPIC_MANIFEST.flatMap((topic) =>
              TOPIC_PAGE_KINDS.map((kind) =>
                url(topicHead(topic, kind).path, kind === "notes" ? "0.7" : "0.6"),
              ),
            ),
          ].join("\n");
          sitemap = sitemap.replace(
            /\s*<\/urlset>/,
            `\n  ${TOPIC_MARKER}\n${entries}\n</urlset>`,
          );
        } else if (contentPages === 0) {
          // eslint-disable-next-line no-console
          console.warn("prerender-seo: empty manifest — sitemap left without study URLs");
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
        `prerender-seo: wrote ${prerendered} route HTML files + ${contentPages} study pages, a noindex fallback at ${SPA_FALLBACK_PATH}, sitemap has ${countSitemapEntries(sitemapPath)} URLs`,
      );

      // Read every page back and audit its crawler directives. This throws — and
      // so fails `npm run build` — if a public page is missing its index
      // directive, a private page is indexable, a page nobody classified was
      // emitted, or a preview/development build would be indexable at all.
      // eslint-disable-next-line no-console
      console.log(`prerender-seo: ${verifyIndexDirectives({ root: config.root, outDir })}`);
    },
  };
}
