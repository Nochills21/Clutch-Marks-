/**
 * Build-time audit of the crawler directives on every page the build emits.
 *
 * Two failure modes this exists to make impossible, because both are invisible
 * in a green build and expensive once they reach search results:
 *
 *   1. A public page that ships without an `index` directive — or with a
 *      `noindex` nobody asked for. Google then either applies its own snippet
 *      and image limits or drops the page entirely, and no step of the build
 *      complains. The mirror case matters just as much: a page the metadata
 *      table marks private must not be indexable.
 *   2. A preview/branch deployment that is indexable. Those hosts sit behind
 *      Vercel Deployment Protection, so a crawler that reaches one is served
 *      Vercel's own sign-in page — that is how "Login – Vercel" gets attached to
 *      the brand in a search result. Every page of such a build must be
 *      `noindex, nofollow`.
 *   3. An indexable head on a URL that gets no page of its own. The host answers
 *      every path the build did not write with one fallback document, so if that
 *      document is indexable — it used to be the homepage — then the admin
 *      console, a lesson's notes, a dead topic slug and a typo all reach a
 *      crawler as `index, follow` copies of `/`, complete with a canonical
 *      pointing there. The fallback is audited here as well: it must exist, be
 *      noindex, claim no canonical, and be the file the catch-all rewrite
 *      actually sends those URLs to.
 *
 * The rules are checked against the HTML that was actually written, not against
 * the values the writing code intended to write. Reading the artifact back is
 * what catches a page emitted through a path that never consulted the route
 * metadata, a second `robots` tag left behind by the shell, a page nobody
 * classified, and a `noindex` that arrives from vercel.json's response headers
 * or from robots.txt instead of from the page itself.
 *
 * Called from plugins/prerender-seo.ts at the end of the build, so a violation
 * fails `npm run build` (and therefore `npm run verify`), not a later review.
 */
import { readFileSync, readdirSync } from "fs";
import { join, relative, resolve, sep } from "path";
import { ROUTE_META } from "../frontend/src/lib/seoRoutes";
import {
  SPA_FALLBACK_PATH,
  SPA_ONLY_ROUTES,
  matchesSpaOnlyRoute,
} from "../frontend/src/lib/spaRoutes";
import { TOPIC_MANIFEST } from "../frontend/src/lib/topicManifest.generated";
import { TOPIC_PAGE_KINDS, topicHead } from "../frontend/src/lib/topicSeo";
import { LEVEL_MANIFEST, levelHead } from "../frontend/src/lib/levelSeo";

/** One page the build is expected to emit, with whether it may be indexed. */
export interface PageDirective {
  /** URL path the page is served at. */
  path: string;
  /** True when this page is meant to be in Google's index. */
  indexable: boolean;
  /** Where the page (and therefore its rule) comes from, for the report. */
  source: string;
}

export interface IndexAuditOptions {
  /** Repository root, where vercel.json and public/robots.txt live. */
  root: string;
  /** Build output directory (dist). */
  outDir: string;
  /** Deployment environment; defaults to process.env.VERCEL_ENV. */
  env?: string | undefined;
}

/**
 * Vercel exposes VERCEL_ENV to the build as "production" | "preview" |
 * "development". Anything else — including a local `vite build`, which has no
 * such variable — is treated as production: that is the shape a local build has
 * to be checked against, or the audit would pass locally and fail in CI.
 */
export function isPreviewDeployment(env: string | undefined = process.env.VERCEL_ENV): boolean {
  const value = (env ?? "production").trim().toLowerCase();
  return value === "preview" || value === "development";
}

/**
 * Every page the build should emit, from the same three sources the prerenderer
 * writes them from: the literal routes, the subject+level hubs derived from the
 * topic manifest, and the per-topic pages.
 *
 * A `:slug` entry in ROUTE_META is a template rather than a page — the real
 * pages are the level and topic ones below — so it is not listed here, and a
 * file appearing at a path nobody declares is a failure (see `unknown` below).
 *
 * The routes that get no file of their own are not listed either: the fallback
 * document that answers them is audited separately (see `fallbackProblems` and
 * `spaOnlyProblems`), because it is not a page and has no path of its own to be
 * served at.
 */
export function expectedPages(): PageDirective[] {
  const literal = ROUTE_META.filter((meta) => !meta.path.includes(":")).map((meta) => ({
    path: meta.path,
    indexable: !meta.noindex,
    source: "ROUTE_META",
  }));
  const levels = LEVEL_MANIFEST.map((level) => ({
    path: levelHead(level).path,
    indexable: true,
    source: "levelSeo",
  }));
  const topics = TOPIC_MANIFEST.flatMap((topic) =>
    TOPIC_PAGE_KINDS.map((kind) => ({
      path: topicHead(topic, kind).path,
      indexable: true,
      source: "topicSeo",
    })),
  );
  return [...literal, ...levels, ...topics];
}

/** Every .html file under `dir`, recursively. */
function htmlFiles(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) htmlFiles(full, acc);
    else if (entry.isFile() && entry.name.endsWith(".html")) acc.push(full);
  }
  return acc;
}

/** The URL path a written file is served at: dist/notes/index.html → /notes. */
function urlPathOf(outDir: string, file: string): string {
  const rel = relative(outDir, file).split(sep).join("/");
  const withoutFile = rel.replace(/index\.html$/, "").replace(/\/$/, "");
  return withoutFile === "" ? "/" : `/${withoutFile}`;
}

const ROBOTS_TAG = /<meta\s[^>]*name="robots"[^>]*>/gi;

/** The directives of every robots meta in a page, in document order. */
function robotsDirectives(html: string): string[] {
  return [...html.matchAll(ROBOTS_TAG)].map((match) => {
    const content = match[0].match(/content="([^"]*)"/i);
    return (content?.[1] ?? "").trim();
  });
}

/**
 * `noindex` contains the word `index`, so a substring test reports a blocked
 * page as indexable. Directives are a comma-separated list; compare tokens.
 */
function tokens(directive: string): string[] {
  return directive
    .split(",")
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean);
}

function isBlocked(list: string[]): boolean {
  return list.includes("noindex");
}

function isAllowed(list: string[]): boolean {
  return list.includes("index") && !isBlocked(list);
}

/**
 * A `noindex` served as a response header de-indexes the page just as well as a
 * meta tag does, so a header rule is held to the same rule as the markup. A
 * source that is a pattern — `/(.*)`, `/admin/:path*` — is treated as covering
 * every page, which is the conservative reading: if it names `noindex`, the
 * public routes it would sweep in are reported.
 */
function headerProblems(root: string, pages: PageDirective[]): string[] {
  const problems: string[] = [];
  let headers: { source?: string; headers?: { key?: string; value?: string }[] }[];
  try {
    const config = JSON.parse(readFileSync(join(root, "vercel.json"), "utf8"));
    headers = Array.isArray(config.headers) ? config.headers : [];
  } catch {
    return problems;
  }

  for (const rule of headers) {
    const noindex = (rule.headers ?? []).find(
      (header) =>
        (header.key ?? "").toLowerCase() === "x-robots-tag" &&
        isBlocked(tokens(header.value ?? "")),
    );
    if (!noindex) continue;

    const source = (rule.source ?? "").replace(/\/+$/, "") || "/";
    const isPattern = /[*:()]/.test(source);
    for (const page of pages) {
      if (!page.indexable) continue;
      if (!isPattern && page.path !== source) continue;
      problems.push(
        `vercel.json sends "X-Robots-Tag: ${noindex.value}" to ${source}, which covers the indexable page ${page.path}`,
      );
    }
  }
  return problems;
}

/**
 * A Disallow blocks the fetch, and a blocked fetch means Google never reads the
 * page's own `noindex` — the trap /auth fell into, where the disallow won and a
 * sign-in page stayed in the index for weeks. So a public page must not be
 * disallowed either; a rule that names one is reported here.
 */
function robotsTxtProblems(root: string, pages: PageDirective[]): string[] {
  const problems: string[] = [];
  let text: string;
  try {
    text = readFileSync(join(root, "public", "robots.txt"), "utf8");
  } catch {
    return problems;
  }

  const disallowed = [...text.matchAll(/^\s*Disallow:\s*(\S+)\s*$/gim)]
    .map((match) => match[1])
    .filter((rule) => rule !== "/" && rule !== "");

  for (const rule of disallowed) {
    const isPattern = rule.includes("*") || rule.includes("$");
    const prefix = rule.replace(/\/+$/, "");
    for (const page of pages) {
      if (!page.indexable) continue;
      const hit = isPattern || page.path === prefix || page.path.startsWith(`${prefix}/`);
      if (hit) {
        problems.push(
          `public/robots.txt disallows ${rule}, which blocks the crawler from the indexable page ${page.path} (a blocked fetch also hides the page's own noindex)`,
        );
      }
    }
  }
  return problems;
}

/**
 * The fallback document's own rules. It is the one artifact that is not a page:
 * every URL the build wrote no file for is served it, so it has to be safe for
 * all of them at once, and the two ways it can fail are both invisible to the
 * page-by-page checks above.
 */
function fallbackProblems(html: string, preview: boolean, env: string): string[] {
  const found = robotsDirectives(html);
  if (found.length !== 1) {
    return [
      `${SPA_FALLBACK_PATH}: ${found.length} robots meta tag(s) [${found.join(" | ")}], expected exactly one`,
    ];
  }

  const list = tokens(found[0]);
  if (preview) {
    return isBlocked(list) && list.includes("nofollow")
      ? []
      : [
          `${SPA_FALLBACK_PATH}: preview deployment (VERCEL_ENV=${env}) must be noindex, nofollow — has "${found[0]}"`,
        ];
  }

  const problems: string[] = [];
  if (!isBlocked(list)) {
    problems.push(
      `${SPA_FALLBACK_PATH}: the document served to every URL with no page of its own is "${found[0]}" — it must be noindex, or an SPA-only route ships an indexable head`,
    );
  }
  // A canonical (or og:url) here is the URL-consolidation signal: one document is
  // served for many different URLs, so naming one of them as the original tells
  // Google the rest are copies of it.
  if (/<link\s[^>]*rel="canonical"/i.test(html)) {
    problems.push(
      `${SPA_FALLBACK_PATH}: carries a canonical, but it is served for many different URLs and cannot claim one`,
    );
  }
  if (/<meta\s[^>]*property="og:url"/i.test(html)) {
    problems.push(
      `${SPA_FALLBACK_PATH}: carries an og:url for the same reason as a canonical`,
    );
  }
  return problems;
}

/**
 * The rule that decides what a URL with no file of its own is served. The
 * document audited above only helps if the rewrite actually points there: a
 * catch-all sending those URLs to an indexable page (the homepage, as it once
 * did) undoes it no matter how the fallback is written. Read from vercel.json
 * rather than assumed, and only the shape this repo uses is recognised; without
 * a catch-all rewrite the platform answers a 404, which needs no directive.
 */
function spaFallbackRewriteProblems(root: string): string[] {
  let rewrites: { source?: string; destination?: string }[];
  try {
    const config = JSON.parse(readFileSync(join(root, "vercel.json"), "utf8"));
    rewrites = Array.isArray(config.rewrites) ? config.rewrites : [];
  } catch {
    return [
      "vercel.json could not be read, so the rule that answers a URL with no prerendered file is unchecked",
    ];
  }

  return rewrites
    .filter((rule) => (rule.source ?? "").trim() === "/(.*)")
    .filter((rule) => rule.destination !== SPA_FALLBACK_PATH)
    .map(
      (rule) =>
        `vercel.json's catch-all rewrite (${rule.source}) sends a URL with no prerendered file to ${rule.destination}, not the noindex fallback ${SPA_FALLBACK_PATH}`,
    );
}

/**
 * A route that never gets a file is safe only while it stays that way: the
 * moment ROUTE_META claims one of these paths as an indexable page, the build
 * writes a real file for it and the rewrite stops answering it — so the route
 * ships an indexable head again, with nobody having touched this audit. The two
 * lists live in different files (the app's routes in `src/App.tsx`, the
 * metadata in `frontend/src/lib/seoRoutes.ts`), which is exactly why the check
 * is here.
 */
function spaOnlyProblems(pages: PageDirective[]): string[] {
  const problems: string[] = [];
  for (const route of SPA_ONLY_ROUTES) {
    for (const page of pages) {
      if (!page.indexable) continue;
      if (!matchesSpaOnlyRoute(route.pattern, page.path)) continue;
      problems.push(
        `${page.path} (${page.source}) is expected to be indexable, but ${route.pattern} is a route with no prerendered file (${route.reason}) — it must be noindex, or stay out of ROUTE_META`,
      );
    }
  }
  return problems;
}

/**
 * Audit the emitted HTML and the two config files that can contradict it.
 * Throws — failing the build — with every violation it found, or returns a
 * one-line summary for the caller to log.
 */
export function verifyIndexDirectives(options: IndexAuditOptions): string {
  const { root, outDir } = options;
  const env = (options.env ?? process.env.VERCEL_ENV ?? "production").trim() || "production";
  const preview = isPreviewDeployment(env);

  const pages = expectedPages();
  const byPath = new Map(pages.map((page) => [page.path, page]));
  const problems: string[] = [];
  const seen = new Set<string>();
  let fallbackSeen = false;

  for (const file of htmlFiles(outDir)) {
    const path = urlPathOf(outDir, file);

    // The fallback is not a page — it is what a URL with no page is served — so
    // it is held to its own rule and skipped by the per-route ones.
    if (path === SPA_FALLBACK_PATH) {
      fallbackSeen = true;
      problems.push(...fallbackProblems(readFileSync(file, "utf8"), preview, env));
      continue;
    }

    seen.add(path);
    const page = byPath.get(path);

    if (!page) {
      problems.push(`${path} was written but no route or manifest entry describes it`);
      continue;
    }

    const found = robotsDirectives(readFileSync(file, "utf8"));
    if (found.length !== 1) {
      problems.push(
        `${path}: ${found.length} robots meta tag(s) [${found.join(" | ")}], expected exactly one`,
      );
      continue;
    }

    const list = tokens(found[0]);
    if (list.length === 0) {
      problems.push(`${path}: robots meta is empty`);
      continue;
    }

    if (preview) {
      if (!isBlocked(list) || !list.includes("nofollow")) {
        problems.push(
          `${path}: preview deployment (VERCEL_ENV=${env}) must be noindex, nofollow — has "${found[0]}"`,
        );
      }
      continue;
    }

    if (page.indexable && !isAllowed(list)) {
      problems.push(
        `${path} (${page.source}) is a public page but ships "${found[0]}" instead of an index directive`,
      );
    }
    if (!page.indexable && !isBlocked(list)) {
      problems.push(
        `${path} (${page.source}) is a private page but ships "${found[0]}" — it is indexable`,
      );
    }
  }

  for (const page of pages) {
    if (!seen.has(page.path)) {
      problems.push(`${page.path} (${page.source}) was expected but no HTML was written for it`);
    }
  }

  if (!fallbackSeen) {
    problems.push(
      `${SPA_FALLBACK_PATH} was not written, so a URL with no page of its own is served whatever the host falls back to — nothing there marks it noindex`,
    );
  }

  problems.push(
    ...spaFallbackRewriteProblems(root),
    ...spaOnlyProblems(pages),
    ...headerProblems(root, pages),
    ...robotsTxtProblems(root, pages),
  );

  if (problems.length > 0) {
    const shown = problems.slice(0, 12);
    const rest = problems.length - shown.length;
    throw new Error(
      [
        `index directives are wrong for this build (VERCEL_ENV=${env}) — refusing to ship it:`,
        ...shown.map((problem) => `  ${problem}`),
        ...(rest > 0 ? [`  …and ${rest} more`] : []),
        "",
        preview
          ? "A preview/development build must mark every page noindex, nofollow: those hosts are behind Vercel Deployment Protection, so a crawler is served Vercel's sign-in page."
          : "Every page must carry exactly one robots meta: index for a public route, noindex for a private one — and the fallback that answers URLs with no page of their own must be noindex and claim no canonical. Fix it in ROUTE_META, topicSeo.ts/levelSeo.ts, frontend/src/lib/spaRoutes.ts, vercel.json or public/robots.txt — not by editing dist/.",
      ].join("\n"),
    );
  }

  const indexable = pages.filter((page) => page.indexable).length;
  return preview
    ? `verified ${seen.size} pages: noindex,nofollow on all of them, plus the noindex fallback at ${SPA_FALLBACK_PATH} (VERCEL_ENV=${env})`
    : `verified ${seen.size} pages: ${indexable} indexable, ${seen.size - indexable} noindex, plus the noindex fallback at ${SPA_FALLBACK_PATH} for URLs with no page (VERCEL_ENV=${env})`;
}

/** Resolve the options from a Vite config root (where vercel.json lives). */
export function auditOptionsFor(configRoot: string, outDir: string): IndexAuditOptions {
  return { root: resolve(configRoot), outDir };
}
