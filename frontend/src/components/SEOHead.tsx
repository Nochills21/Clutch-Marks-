// Sets document title/meta/canonical/JSON-LD per page.
import { Helmet } from "react-helmet-async";
import {
  SITE_NAME,
  SITE_URL,
  ROBOTS_INDEX,
  ROBOTS_NOINDEX,
  ROBOTS_NOINDEX_NOFOLLOW,
  getRouteMeta,
  ogImageUrl,
} from "@/lib/seoRoutes";

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  noindex?: boolean;
  /** Optional per-page social card override (path under /public). */
  ogImage?: string;
  /** Optional JSON-LD structured data object (or array of objects). */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export function SEOHead({ title, description, path, noindex, ogImage, jsonLd }: SEOHeadProps) {
  const url = path ? `${SITE_URL}${path}` : `${SITE_URL}/`;
  // Route-level metadata from ROUTE_META, so runtime tags match the
  // prerendered HTML the crawlers already saw.
  const routeMeta = path ? getRouteMeta(path) : undefined;
  const image = ogImageUrl({ ogImage: ogImage ?? routeMeta?.ogImage });

  // Mirrors the prerender plugin: auth/private routes stay out of the index, and
  // so does any host that isn't the canonical origin. A Vercel preview or branch
  // alias sits behind Deployment Protection and serves Vercel's own sign-in page
  // to a crawler — that is what put "Login – Vercel" next to the brand in search.
  const robots = (() => {
    if (noindex || routeMeta?.noindex) return ROBOTS_NOINDEX;
    if (typeof window === "undefined") return ROBOTS_INDEX;
    const host = window.location.hostname.toLowerCase();
    const canonical = (() => {
      try { return new URL(SITE_URL).hostname.toLowerCase(); } catch { return ""; }
    })();
    const isLocal = host === "localhost" || host === "127.0.0.1" || host === "::1";
    if (canonical && host !== canonical && !isLocal) return ROBOTS_NOINDEX_NOFOLLOW;
    return ROBOTS_INDEX;
  })();
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="robots" content={robots} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
