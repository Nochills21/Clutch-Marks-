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
} from "./seoRoutes";

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
  it("carries a default index directive for routes without a prerendered file", () => {
    const html = read("/index.html");
    const robots = html.match(/<meta\s+name="robots"\s+content="([^"]+)"/i);
    expect(robots, "index.html needs a default robots meta").not.toBeNull();
    expect(robots![1]).toContain("index");
    expect(robots![1]).toContain("max-image-preview:large");
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
