// Sets document title/meta/canonical/JSON-LD per page.
import { Helmet } from "react-helmet-async";
import { SITE_NAME, SITE_URL, getRouteMeta, ogImageUrl } from "@/lib/seoRoutes";

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
  // Route-level card from ROUTE_META, so runtime metadata matches the
  // prerendered HTML the crawlers already saw.
  const image = ogImageUrl({
    ogImage: ogImage ?? (path ? getRouteMeta(path)?.ogImage : undefined),
  });
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
      {noindex && <meta name="robots" content="noindex, follow" />}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
