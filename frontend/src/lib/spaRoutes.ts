/**
 * The routes that never get a prerendered file — and the document that answers them.
 *
 * `plugins/prerender-seo.ts` writes a real HTML file for every route the build can
 * name: the literal `ROUTE_META` pages, the subject+level hubs, and the per-topic
 * pages. Everything else is answered by the host's SPA fallback, one document for
 * every URL the build did not write (the catch-all rewrite in `vercel.json`).
 *
 * That document used to be `dist/index.html`, which is also the indexable
 * homepage — so an unclassified URL (`/admin/...`, `/ai-marker`, a lesson's
 * notes, a typo a crawler found) arrived as a second copy of `/`: `index, follow`,
 * the homepage title, and a canonical pointing at `/`. The fallback is now its own
 * document (`SPA_FALLBACK_FILE`) carrying `noindex` and claiming no canonical or
 * og:url, so a route that never gets a prerendered file cannot ship an indexable
 * head.
 *
 * `SPA_ONLY_ROUTES` names the shapes that depend on that. It is deliberately not
 * part of `ROUTE_META`: an entry in that table is a route the build writes a file
 * for, so adding one of these there would hand it exactly the indexable head this
 * exists to prevent. The list cannot be exhaustive either — the catch-all rewrite
 * also answers URLs that are not routes at all — and the legacy alias routes
 * (`/homework`, `/revision`, …) are left out because `vercel.json` answers those
 * with a 301 before any document is served, so a crawler only ever sees the
 * redirect.
 *
 * Guarded by `plugins/seoIndexDirectives.ts` at build time, and by
 * `seoRobots.test.ts` / `seoConsistency.test.ts` at test time.
 */
import { ROBOTS_NOINDEX } from "./seoRoutes";

/** The fallback document's file name in the build output. */
export const SPA_FALLBACK_FILE = "spa-fallback.html";

/** The URL the fallback document is served at. */
export const SPA_FALLBACK_PATH = `/${SPA_FALLBACK_FILE}`;

/**
 * The directive the fallback ships: `noindex, follow`, the same value a private
 * page uses. One document answers an unknown route, a lesson's notes and the
 * admin console alike, so it may not be indexable — and it must not name a
 * canonical, because it is served for many different URLs.
 */
export const SPA_FALLBACK_ROBOTS = ROBOTS_NOINDEX;

/** One route shape that gets the fallback document instead of a file of its own. */
export interface SpaOnlyRoute {
  /** The route's path, with `:param` segments, as `src/App.tsx` declares it. */
  pattern: string;
  /** Why the build can never write a file for it. */
  reason: string;
}

export const SPA_ONLY_ROUTES: SpaOnlyRoute[] = [
  {
    pattern: "/admin/:screen",
    reason:
      "the admin console — one screen per segment, none of them a page for a crawler; public/robots.txt Disallows /admin as well, so the fallback is a second line of defence rather than the only one",
  },
  {
    pattern: "/lessons/:lessonId/notes",
    reason:
      "one URL per lesson row, so there is no list to enumerate; the page sits behind the approval gate and a crawler only ever reaches the sign-in redirect",
  },
  {
    pattern: "/ai-marker",
    reason:
      "account-gated and paid, and not in ROUTE_META — so the build writes no file and the fallback answers it",
  },
];

/**
 * Does a URL path fall under one of the declared shapes?
 *
 * `:param` matches exactly one path segment; every other segment must match
 * literally. Used by the build-time audit to notice a shape that was declared
 * file-less and has suddenly been claimed as an indexable page.
 */
export function matchesSpaOnlyRoute(pattern: string, path: string): boolean {
  const wanted = pattern.split("/").filter(Boolean);
  const actual = path.split("/").filter(Boolean);
  if (wanted.length !== actual.length) return false;
  return wanted.every((part, index) => part.startsWith(":") || part === actual[index]);
}
