// Cross-checks the crawler-facing pieces against each other.
//
// The audit that produced this file found three defects that no single file
// looked wrong on its own:
//   1. the SPA shell (index.html) hard-coded a canonical to "/", so every URL
//      without its own prerendered file claimed to be a copy of the homepage;
//   2. robots.txt disallowed /auth, which blocked the crawl and therefore hid
//      the noindex on that page — the two rules fought, and the wrong one won;
//   3. nothing tied public/sitemap.xml to the routes that are actually
//      indexable, so the sitemap and the route list could drift apart silently.
//
// Each test below encodes one of the rules so the same class of bug cannot come
// back without failing the suite.
import { existsSync, readFileSync, readdirSync } from "fs";
import { describe, it, expect } from "vitest";
import { ROUTE_META, SITE_URL, getRouteMeta, headFor } from "./seoRoutes";
import { LEVELS } from "./levels";
import { TOPIC_MANIFEST } from "./topicManifest.generated";
import { TOPIC_PAGE_KINDS, topicHead } from "./topicSeo";

const root = process.cwd();
const read = (p: string) => readFileSync(root + p, "utf8");

// Comments stripped, so documenting the rule cannot trip the rule: the note in
// index.html explains why there is no canonical link, and it quotes the tag.
const shell = () => read("/index.html").replace(/<!--[\s\S]*?-->/g, "");
const robots = () => read("/public/robots.txt");
const sitemapUrls = () =>
  [...read("/public/sitemap.xml").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const isPlaceholder = (path: string) => path.includes(":");

/** The tag kinds the app itself writes, and therefore has to be able to remove. */
const REPLACED_BY_APP =
  /<(?:link[^>]+rel="canonical"|meta[^>]+name="(?:description|robots)"|meta[^>]+property="og:|meta[^>]+name="twitter:|script[^>]+application\/ld\+json)/i;

/** HTML-escape the way plugins/prerender-seo.ts does, for head comparisons. */
const attr = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Every topic page the site publishes, from the committed manifest. */
const topicPaths = () =>
  TOPIC_MANIFEST.flatMap((t) => TOPIC_PAGE_KINDS.map((kind) => topicHead(t, kind).path));

describe("the SPA shell", () => {
  it("does not claim a canonical for every route it is served for", () => {
    // The shell is the fallback for any URL with no page of its own (404s,
    // /study/... paths). A canonical here says "all of those are the homepage",
    // which is a consolidation signal Google acts on.
    expect(shell()).not.toMatch(/<link[^>]+rel="canonical"/i);
    expect(shell()).not.toMatch(/property="og:url"/i);
  });

  it("still ships the shared icons and verification tags", () => {
    expect(shell()).toMatch(/rel="icon"/);
    expect(shell()).toMatch(/rel="manifest"/);
    expect(shell()).toMatch(/google-site-verification/);
  });
});

describe("sitemap", () => {
  it("lists the indexable routes and nothing else", () => {
    const listed = new Set(sitemapUrls().map((u) => new URL(u).pathname));

    for (const path of listed) {
      const meta = ROUTE_META.find((m) => m.path === path);
      expect(meta, `${path} is in the sitemap but not in ROUTE_META`).toBeDefined();
      expect(meta?.noindex, `${path} is noindex but still in the sitemap`).toBeFalsy();
    }
  });

  it("covers every indexable route that has a real page", () => {
    // Parameterised routes are generated per topic/subject by the build, so the
    // checked-in sitemap cannot list them; every literal route must be here.
    const expected = ROUTE_META.filter((m) => !m.noindex && !isPlaceholder(m.path))
      .map((m) => m.path)
      .sort();
    const listed = sitemapUrls()
      .map((u) => new URL(u).pathname)
      .sort();
    expect(listed).toEqual(expected);
  });

  it("gives every entry a real lastmod date", () => {
    const entries = read("/public/sitemap.xml").match(/<url>[\s\S]*?<\/url>/g) ?? [];
    expect(entries.length).toBeGreaterThan(0);
    for (const entry of entries) {
      const lastmod = entry.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
      expect(lastmod, `missing lastmod in ${entry.slice(0, 60)}`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      // A future date reads as a lie to a crawler and gets ignored.
      expect(new Date(lastmod as string).getTime()).toBeLessThanOrEqual(Date.now() + 86_400_000);
    }
  });
});

describe("robots.txt", () => {
  it("never disallows a URL it expects Google to read a noindex from", () => {
    const disallowed = [...robots().matchAll(/^Disallow:\s*(\S+)/gm)].map((m) => m[1].trim());
    const noindexed = ROUTE_META.filter((m) => m.noindex).map((m) => m.path);

    for (const path of noindexed) {
      expect(
        disallowed.includes(path),
        `${path} is noindex but Disallowed in robots.txt — the Disallow wins and the noindex is never read`,
      ).toBe(false);
    }
  });

  it("points at the canonical sitemap and allows the crawl", () => {
    expect(robots()).toContain("Sitemap: https://clutchmarks.study/sitemap.xml");
    expect(robots()).toMatch(/User-agent: \*/);
    expect(robots()).toMatch(/Allow: \//);
  });
});

// These read the build output, like the other suites that inspect dist/. They are
// also the browser-behaviour guard: a prerendered tag with no marker is a tag the
// app cannot remove, and it would survive as a duplicate in the live DOM.
describe("prerendered pages", () => {
  const pages = () => {
    const dirs = [""];
    for (const meta of ROUTE_META) {
      if (meta.path === "/" || isPlaceholder(meta.path)) continue;
      dirs.push(meta.path.replace(/^\//, ""));
    }
    return dirs
      .map((d) => (d ? `dist/${d}/index.html` : "dist/index.html"))
      .filter((p) => existsSync(root + "/" + p))
      .map((p) => ({ path: p, html: read("/" + p) }));
  };

  it("emits exactly one canonical per page", () => {
    const rendered = pages();
    expect(rendered.length).toBeGreaterThan(10);
    for (const { path, html } of rendered) {
      const canonicals = html.match(/<link[^>]+rel="canonical"/gi) ?? [];
      expect(canonicals.length, `${path} should have one canonical`).toBe(1);
    }
  });

  it("marks every head tag it writes so the app can replace it", () => {
    // Only the tag kinds React also writes matter: those are the ones that would
    // end up duplicated in the live DOM. The shell's own tags (author, icons,
    // manifest, Vite's modulepreload/stylesheet links) are not per-route, are not
    // replaced by Helmet, and must NOT carry the marker.
    for (const { path, html } of pages()) {
      const unmarked = perRouteUnmarked(html);
      expect(unmarked, `${path} has per-route tags the app cannot remove`).toEqual([]);
    }
  });
});

/** Per-route head tags in `html` that the app could not remove at runtime. */
function perRouteUnmarked(html: string): string[] {
  const head = html.slice(0, html.indexOf("</head>"));
  return [
    ...head.matchAll(/<(?:meta|link)[^>]*>/gi),
    ...head.matchAll(/<script type="application\/ld\+json"[^>]*>/gi),
  ]
    .map((m) => m[0])
    .filter((tag) => REPLACED_BY_APP.test(tag))
    .filter((tag) => !tag.includes('data-seo="prerender"'));
}

// ---- Topic pages ---------------------------------------------------------
// The 300 /study/... pages are the site's actual content, and until this work
// the build left every one of them on the generic SPA shell: the homepage's
// title, no canonical, no breadcrumb, and no sitemap entry, for any crawler that
// does not execute JavaScript. These checks tie the four pieces together — the
// committed manifest (which topics exist), the ROUTE_META templates (how the
// wording is shaped), the emitted HTML and the shipped sitemap — so a missing or
// drifted topic page fails here instead of shipping.
describe("topic pages", () => {
  it("lists a well-formed manifest entry per topic", () => {
    expect(TOPIC_MANIFEST.length).toBeGreaterThan(50);
    for (const topic of TOPIC_MANIFEST) {
      expect(topic.subjectSlug, "subject slug").toMatch(/^[a-z0-9-]+$/);
      expect(topic.topicSlug, `${topic.subjectSlug} topic slug`).toMatch(/^[a-z0-9-]+$/);
      expect(LEVELS, `${topic.subjectSlug}/${topic.topicSlug} level`).toContain(topic.level);
      expect(topic.topicName.length, `${topic.topicSlug} name`).toBeGreaterThan(1);
    }

    const paths = topicPaths();
    expect(new Set(paths).size, "two topics share a page path").toBe(paths.length);
  });

  it("keeps the ROUTE_META templates honest about the real wording", () => {
    // The table cannot hold a topic's real title, so the entries are templates.
    // A template that no longer describes what topicSeo produces is worse than
    // no template: it documents wording the site does not ship.
    const sample = {
      subjectSlug: "mathematics",
      subjectName: "Mathematics",
      level: "OL",
      topicSlug: "sample-topic",
      topicName: "Sample Topic",
    };
    const fill = (template: string) =>
      template
        .replace(/:levelLabel/g, "O Level")
        .replace(/:topic/g, sample.topicName)
        .replace(/:subject/g, sample.subjectName)
        .replace(/:level/g, sample.level);

    for (const kind of TOPIC_PAGE_KINDS) {
      const meta = ROUTE_META.find((m) => m.path === `/study/:slug/:level/:topic/${kind}`);
      expect(meta, `no ROUTE_META template for the ${kind} page`).toBeDefined();
      const head = topicHead(sample, kind);
      expect(fill(meta!.title), `${kind} title template`).toBe(head.title);
      expect(fill(meta!.description), `${kind} description template`).toBe(head.description);
    }
  });

  it("prerenders every topic page with its own head", () => {
    for (const topic of TOPIC_MANIFEST) {
      for (const kind of TOPIC_PAGE_KINDS) {
        const head = topicHead(topic, kind);
        const file = `dist${head.path}/index.html`;
        expect(existsSync(`${root}/${file}`), `${file} was not prerendered`).toBe(true);
        const html = read(`/${file}`);

        expect(html, `${head.path} title`).toContain(`<title>${attr(head.title)}</title>`);
        expect(html, `${head.path} description`).toContain(`content="${attr(head.description)}"`);

        const canonicals = html.match(/<link[^>]+rel="canonical"[^>]*>/gi) ?? [];
        expect(canonicals.length, `${head.path} should have one canonical`).toBe(1);
        expect(canonicals[0], `${head.path} canonical`).toContain(`href="${SITE_URL}${head.path}"`);

        // Breadcrumbs are the one piece of structured data that tells a crawler
        // this page sits under a subject and level instead of floating alone.
        expect(html, `${head.path} structured data`).toContain('"BreadcrumbList"');
        expect(html, `${head.path} structured data`).toContain('"LearningResource"');

        const unmarked = perRouteUnmarked(html);
        expect(unmarked, `${head.path} has per-route tags the app cannot remove`).toEqual([]);
      }
    }
  });

  it("lists every topic page in the shipped sitemap, and nothing else", () => {
    const listed = [...read("/dist/sitemap.xml").matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (m) => new URL(m[1]).pathname,
    );
    const expected = [
      ...ROUTE_META.filter((m) => !m.noindex && !isPlaceholder(m.path)).map((m) => m.path),
      ...topicPaths(),
    ].sort();

    expect([...listed].sort()).toEqual(expected);
    expect(new Set(listed).size, "the sitemap repeats a URL").toBe(listed.length);
  });
});

describe("route metadata", () => {
  it("has no duplicate paths", () => {
    const paths = ROUTE_META.map((m) => m.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("gives every literal route a unique, sensibly sized title and description", () => {
    const literal = ROUTE_META.filter((m) => !isPlaceholder(m.path));
    const titles = literal.map((m) => m.title);
    expect(new Set(titles).size).toBe(titles.length);

    for (const meta of literal) {
      expect(meta.title.length, `${meta.path} title`).toBeGreaterThan(5);
      expect(meta.title, `${meta.path} title should carry the brand`).toContain("Clutch Marks");
      expect(meta.description.length, `${meta.path} needs a description`).toBeGreaterThan(10);

      // Snippet limits only matter where a snippet can be shown: a noindex page
      // is never in a result, so its wording is free.
      if (!meta.noindex) {
        expect(meta.title.length, `${meta.path} title is long enough to be truncated`).toBeLessThanOrEqual(70);
        expect(meta.description.length, `${meta.path} description`).toBeGreaterThanOrEqual(40);
        expect(meta.description.length, `${meta.path} description is long enough to be truncated`).toBeLessThanOrEqual(200);
      }
    }
  });

  it("falls back to the shared table for a literal route", () => {
    // The whole point of headFor: a page that passes only a path gets exactly the
    // title/description the prerenderer wrote into its static HTML.
    for (const meta of ROUTE_META.filter((m) => !isPlaceholder(m.path))) {
      expect(headFor(meta.path).title).toBe(meta.title);
      expect(headFor(meta.path).description).toBe(meta.description);
      expect(headFor(meta.path).noindex).toBe(Boolean(meta.noindex));
    }
    // And a caller's own copy still wins — that is what topic pages rely on.
    expect(headFor("/pricing", { title: "x" }).title).toBe("x");
  });
});

describe("page components", () => {
  it("never hard-code head copy for a literal route", () => {
    // Pages used to carry their own title/description literals next to the ones
    // in ROUTE_META, and the two drifted: /practice shipped four different
    // descriptions, /lessons two, and the homepage's static and runtime titles
    // disagreed outright. A literal route gets its copy from the table only.
    //
    // A variable path is skipped on purpose: Legal.tsx shares one shell between
    // /privacy and /terms, and passing `path` through is fine because the title
    // it renders is the shared table's anyway.
    const dir = `${root}/src/pages`;
    const offenders: string[] = [];

    for (const file of readdirSync(dir).filter((f) => f.endsWith(".tsx"))) {
      const source = readFileSync(`${dir}/${file}`, "utf8");
      for (const element of source.match(/<SEOHead[\s\S]*?\/>/g) ?? []) {
        const path = element.match(/path="([^"]+)"/)?.[1];
        if (!path || !getRouteMeta(path)) continue;
        if (/\btitle=|\bdescription=/.test(element)) offenders.push(`${file} -> ${path}`);
      }
    }

    expect(offenders, "these pages override copy the shared table already owns").toEqual([]);
  });
});
