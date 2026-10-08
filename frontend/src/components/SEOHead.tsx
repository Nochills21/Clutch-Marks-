// Sets document title/meta/canonical/JSON-LD per page.
import { useLayoutEffect } from "react";
import { Helmet } from "react-helmet-async";
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

export function SEOHead({ path, title, description, noindex, ogImage, jsonLd }: SEOHeadProps) {
  // Remove the build-time head tags for this route.
  //
  // Every prerendered page ships static <meta>/<link>/<script> tags for crawlers
  // that do not run JavaScript. Helmet does not adopt tags it did not create —
  // it appends its own — so leaving those in place gave each page two `robots`
  // tags, two canonicals and two conflicting `description` tags. The static ones
  // are marked data-seo="prerender" by plugins/prerender-seo.ts; drop them once,
  // before paint, and Helmet's become the only ones.
  useLayoutEffect(() => {
    document.querySelectorAll('[data-seo="prerender"]').forEach((el) => el.remove());
  }, []);

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

  return (
    <Helmet>
      <title>{head.title}</title>
      <meta name="description" content={head.description} />
      <link rel="canonical" href={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={head.title} />
      <meta property="og:description" content={head.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={head.title} />
      <meta name="twitter:description" content={head.description} />
      <meta name="twitter:image" content={image} />
      <meta name="robots" content={robots} />
      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </Helmet>
  );
}
