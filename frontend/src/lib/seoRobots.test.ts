// Guards the crawler-facing config that decides what Google may index.
//
// Background: a search for the domain used to surface Vercel's own sign-in page
// ("Login – Vercel"). That happens when the deployment is behind Vercel
// Deployment Protection, so a crawler is handed the SSO page instead of the app.
// The repo cannot flip that project setting, but it can make sure (a) a sign-in
// page is never indexable, (b) public pages carry explicit index directives, and
// (c) hosts that aren't the canonical origin can't represent the site at all.
import { readFileSync } from "fs";
import { describe, it, expect } from "vitest";
import {
  ROUTE_META,
  ROBOTS_INDEX,
  ROBOTS_NOINDEX,
  ROBOTS_NOINDEX_NOFOLLOW,
  getRouteMeta,
} from "./seoRoutes";
import { SPA_FALLBACK_PATH, SPA_ONLY_ROUTES, matchesSpaOnlyRoute } from "./spaRoutes";

const root = process.cwd();
const read = (p: string) => readFileSync(root + p, "utf8");

describe("robots directives", () => {
  it("keeps the sign-in page out of the index", () => {
    const auth = ROUTE_META.find((m) => m.path === "/auth");
    expect(auth, "ROUTE_META must still describe /auth").toBeDefined();
    expect(auth?.noindex).toBe(true);
  });

  it("leaves public routes indexable", () => {
    const home = ROUTE_META.find((m) => m.path === "/");
    expect(home?.noindex).toBeUndefined();
    expect(ROBOTS_INDEX).toContain("index");
    expect(ROBOTS_INDEX).not.toContain("noindex");
    // Large image previews are what let the social card show in results.
    expect(ROBOTS_INDEX).toContain("max-image-preview:large");
  });

  it("blocks a non-canonical host outright", () => {
    expect(ROBOTS_NOINDEX_NOFOLLOW).toContain("noindex");
    expect(ROBOTS_NOINDEX_NOFOLLOW).toContain("nofollow");
    expect(ROBOTS_NOINDEX).toContain("noindex");
    expect(ROBOTS_NOINDEX).toContain("follow");
    expect(ROBOTS_NOINDEX).not.toContain("nofollow");
  });
});

describe("index.html shell", () => {
  it("carries the indexable default the homepage is rendered from", () => {
    // The shell is the source for two documents: `/` keeps this directive, and
    // the SPA fallback (below) replaces it with noindex. This test is about the
    // homepage, not about every URL — the fallback is where the rest are settled.
    const html = read("/index.html");
    const robots = html.match(/<meta\s+name="robots"\s+content="([^"]+)"/i);
    expect(robots, "index.html needs a default robots meta").not.toBeNull();
    expect(robots![1]).toContain("index");
    expect(robots![1]).toContain("max-image-preview:large");
  });
});

// The routes the build never writes a file for are all answered by one fallback
// document, so "no prerendered file" has to mean "no indexable head" rather than
// "the homepage's head". One edit in vercel.json is all it takes to point the
// catch-all back at the indexable homepage, which is why this is a test.
describe("SPA fallback", () => {
  const config = () => JSON.parse(read("/vercel.json")) as {
    rewrites?: { source: string; destination: string }[];
  };

  it("sends every URL with no prerendered file to the noindex fallback", () => {
    const catchAll = (config().rewrites ?? []).filter((rule) => rule.source === "/(.*)");
    expect(catchAll, "vercel.json needs exactly one catch-all rewrite").toHaveLength(1);
    expect(
      catchAll[0].destination,
      "the catch-all must not serve the indexable homepage to unclassified URLs",
    ).toBe(SPA_FALLBACK_PATH);
  });

  it("declares the route shapes that depend on the fallback", () => {
    // An entry in ROUTE_META is a route the build writes a file for, so one of
    // these appearing there as indexable would hand that route exactly the
    // indexable head the fallback exists to prevent.
    for (const route of SPA_ONLY_ROUTES) {
      const meta = getRouteMeta(route.pattern);
      expect(meta?.noindex ?? true, `${route.pattern} is indexable in ROUTE_META`).toBe(true);
      expect(route.reason.length, `${route.pattern} needs a reason`).toBeGreaterThan(10);
    }
  });

  it("matches a declared shape to the URLs it covers, and nothing wider", () => {
    expect(matchesSpaOnlyRoute("/admin/:screen", "/admin/accounts")).toBe(true);
    expect(matchesSpaOnlyRoute("/admin/:screen", "/admin/accounts/extra")).toBe(false);
    expect(matchesSpaOnlyRoute("/admin/:screen", "/administrators")).toBe(false);
    expect(matchesSpaOnlyRoute("/lessons/:lessonId/notes", "/lessons/abc/notes")).toBe(true);
    expect(matchesSpaOnlyRoute("/lessons/:lessonId/notes", "/lessons/abc")).toBe(false);
    expect(matchesSpaOnlyRoute("/ai-marker", "/ai-marker")).toBe(true);
    expect(matchesSpaOnlyRoute("/ai-marker", "/ai-marker/anything")).toBe(false);
  });
});

describe("robots.txt", () => {
  const robots = read("/public/robots.txt");

  it("does not Disallow the pages it wants de-indexed", () => {
    // A Disallow blocks the fetch, so Google never reads the noindex those pages
    // send and a sign-in page can stay in the index forever.
    expect(robots).not.toMatch(/^Disallow:\s*\/(auth|reset-password)\s*$/m);
  });

  it("still keeps private app routes out", () => {
    expect(robots).toMatch(/^Disallow:\s*\/admin\s*$/m);
  });

  it("points at the sitemap", () => {
    expect(robots).toContain("Sitemap: https://clutchmarks.study/sitemap.xml");
  });
});

describe("sitemap.xml", () => {
  const sitemap = read("/public/sitemap.xml");

  it("lists only canonical, publicly reachable routes", () => {
    expect(sitemap).toContain("<loc>https://clutchmarks.study/</loc>");
    // Redirects and the noindexed sign-in page must never be listed.
    for (const bad of ["/auth", "/homework", "/revision", "/heatmap", "/calendar"]) {
      expect(sitemap).not.toContain(`clutchmarks.study${bad}<`);
    }
  });

  it("gives every url a real lastmod date", () => {
    const urls = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
    expect(urls.length).toBeGreaterThan(0);
    for (const url of urls) {
      expect(url, "every <url> needs a <lastmod>").toMatch(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/);
    }
  });
});

describe("vercel.json", () => {
  it("sends X-Robots-Tag: noindex for the auth pages", () => {
    const config = JSON.parse(read("/vercel.json"));
    const rules = (config.headers ?? []) as { source: string; headers: { key: string; value: string }[] }[];
    for (const page of ["/auth", "/reset-password"]) {
      const rule = rules.find((r) => r.source === page);
      expect(rule, `vercel.json needs a header rule for ${page}`).toBeDefined();
      const tag = rule!.headers.find((h) => h.key.toLowerCase() === "x-robots-tag");
      expect(tag?.value).toContain("noindex");
    }
  });
});
