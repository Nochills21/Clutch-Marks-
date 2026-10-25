// Sets document title/meta/canonical/JSON-LD per page.
//
// Written by hand instead of through react-helmet-async. That library is
// installed at 3.0.0 and writes nothing at all here — not the title, not a
// single <meta> — so every page's head was whatever the prerenderer had
// written, and this component's own cleanup then deleted those tags on
// hydration. Measured on the live site: the pricing HTML carried a
// description, canonical, robots and an FAQPage block, and after hydration the
// document carried none of them (Googlebot renders before it reads). Managing
// the tags directly makes the rendered head equal the prerendered one, which is
// also what the prerender plugin and seoConsistency tests already assume.
import { useLayoutEffect } from "react";
import {
  SITE_NAME,
  SITE_URL,
  ROBOTS_INDEX,
  ROBOTS_NOINDEX,
  ROBOTS_NOINDEX_NOFOLLOW,
  headFor,
  getRouteMeta,
  ogImageUrl,
} from "@/lib/seoRoutes";

interface SEOHeadProps {
  /**
   * The route's canonical path. Also the key into ROUTE_META, which supplies the
   * title/description/canonical so the runtime head is byte-identical to the
   * prerendered HTML for the same URL.
   */
  path: string;
  /**
   * Title override. Only parameterised pages should use it (the prerenderer
   * cannot know a topic's name); a literal route that sets its own title is how
   * the same URL ends up describing itself two different ways.
   */
  title?: string;
  /** Description override — same rule as `title`. */
  description?: string;
  noindex?: boolean;
  /** Optional per-page social card override (path under /public). */
  ogImage?: string;
  /** Optional JSON-LD structured data object (or array of objects). */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

/** Marks the tags this component owns, so a later page can replace them. */
const MANAGED = "app";

type TagSpec =
  | { kind: "meta"; attr: "name" | "property"; key: string; content: string }
  | { kind: "link"; rel: string; href: string };

export function SEOHead({ path, title, description, noindex, ogImage, jsonLd }: SEOHeadProps) {
  const url = `${SITE_URL}${path}`;
  // Route-level metadata from ROUTE_META, so runtime tags match the
  // prerendered HTML the crawlers already saw.
  const routeMeta = getRouteMeta(path);
  const head = headFor(path, { title, description });
  const image = ogImageUrl({ ogImage: ogImage ?? routeMeta?.ogImage });

  // Mirrors the prerender plugin: auth/private routes stay out of the index, and
  // so does any host that isn't the canonical origin. A Vercel preview or branch
  // alias sits behind Deployment Protection and serves Vercel's own sign-in page
  // to a crawler — that is what put "Login – Vercel" next to the brand in search.
  const robots = (() => {
    if (noindex || head.noindex) return ROBOTS_NOINDEX;
    if (typeof window === "undefined") return ROBOTS_INDEX;
    const host = window.location.hostname.toLowerCase();
    const canonical = (() => {
      try { return new URL(SITE_URL).hostname.toLowerCase(); } catch { return ""; }
    })();
    const isLocal = host === "localhost" || host === "127.0.0.1" || host === "::1";
    if (canonical && host !== canonical && !isLocal) return ROBOTS_NOINDEX_NOFOLLOW;
    return ROBOTS_INDEX;
  })();

  const structuredData = jsonLd ?? routeMeta?.jsonLd;
  // Serialised once so the effect below can compare strings rather than object
  // identities: several pages pass an inline literal, which is a new object on
  // every render.
  const structuredJson = structuredData ? JSON.stringify(structuredData) : null;

  const tags: TagSpec[] = [
    { kind: "meta", attr: "name", key: "description", content: head.description },
    { kind: "meta", attr: "name", key: "robots", content: robots },
    { kind: "link", rel: "canonical", href: url },
    { kind: "meta", attr: "property", key: "og:site_name", content: SITE_NAME },
    { kind: "meta", attr: "property", key: "og:type", content: "website" },
    { kind: "meta", attr: "property", key: "og:title", content: head.title },
    { kind: "meta", attr: "property", key: "og:description", content: head.description },
    { kind: "meta", attr: "property", key: "og:url", content: url },
    { kind: "meta", attr: "property", key: "og:image", content: image },
    { kind: "meta", attr: "property", key: "og:image:width", content: "1200" },
    { kind: "meta", attr: "property", key: "og:image:height", content: "630" },
    { kind: "meta", attr: "name", key: "twitter:card", content: "summary_large_image" },
    { kind: "meta", attr: "name", key: "twitter:title", content: head.title },
    { kind: "meta", attr: "name", key: "twitter:description", content: head.description },
    { kind: "meta", attr: "name", key: "twitter:image", content: image },
  ];
  // The tag list is rebuilt on every render, so key the effect on its contents.
  const tagKey = JSON.stringify(tags);

  useLayoutEffect(() => {
    // The build-time tags are for crawlers that do not run JavaScript; now that
    // this component writes its own, keeping both would give every page two
    // descriptions, two canonicals and two robots rules. Everything this
    // component owns is covered, whether or not the prerenderer marked it — the
    // dev shell's static tags are not marked, and duplicated the head there.
    document
      .querySelectorAll(
        '[data-seo="prerender"], meta[name="description"], meta[name="robots"], link[rel="canonical"], meta[property^="og:"], meta[name^="twitter:"]',
      )
      .forEach((el) => {
        if (el.getAttribute("data-seo") !== MANAGED) el.remove();
      });

    const specs: TagSpec[] = JSON.parse(tagKey);
    for (const spec of specs) {
      const el =
        spec.kind === "meta"
          ? document.createElement("meta")
          : document.createElement("link");
      if (spec.kind === "meta") {
        el.setAttribute(spec.attr, spec.key);
        el.setAttribute("content", spec.content);
      } else {
        el.setAttribute("rel", spec.rel);
        el.setAttribute("href", spec.href);
      }
      el.setAttribute("data-seo", MANAGED);
      document.head.appendChild(el);
    }

    document.title = head.title;

    let script: HTMLScriptElement | null = null;
    if (structuredJson) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo", MANAGED);
      script.textContent = structuredJson;
      document.head.appendChild(script);
    }

    return () => {
      document.querySelectorAll(`[data-seo="${MANAGED}"]`).forEach((el) => el.remove());
    };
    // `head.title`, `head.description` and the robots rule fold into tagKey
    // (they appear in the tags array), so the key alone is the dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagKey, structuredJson]);

  return null;
}
