# Why search shows “Login – Vercel” and how to clear it

## Symptom

Searching `clutchmarks.study` shows a result titled **“Login – Vercel”** (Vercel’s
own sign-in page) instead of the site.

## Root cause

That title belongs to **Vercel Deployment Protection**. When a deployment is
protected, an unauthenticated request — including Googlebot — is served Vercel’s
SSO page instead of the app. Google indexed the root URL while it was protected,
and once a result title is cached it survives recrawls for a long time.

Two things make this more likely:

- A **production** deployment left under Vercel Authentication returns the login
  page for the custom domain itself.
- **Preview / branch aliases** (`<project>-git-<branch>-<team>.vercel.app`) are
  protected by default. If one is ever linked, shared, or discovered, it is
  indexed with the login title and associated with the brand.

As of this change the production domain is **not** protected (verified: `200` with
`x-vercel-cache: HIT`, no `_vercel_jwt` challenge), so the remaining work is
stopping a recurrence and asking Google to replace the stale title.

## What this repo now does

- **Auth pages can never be indexed.** `ROUTE_META` marks `/auth` `noindex`, the
  prerender plugin writes `<meta name="robots" content="noindex, follow">` into
  the static `/auth` HTML, and `vercel.json` sends
  `X-Robots-Tag: noindex, nofollow` for `/auth` and `/reset-password`.
- **`robots.txt` no longer disallows those two pages.** A `Disallow` prevents the
  fetch, so Google can never *read* the `noindex` — which is how a sign-in page
  stays indexed. Private app routes (`/admin`, `/dashboard`, …) remain disallowed.
- **Public pages carry explicit directives**:
  `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`.
  Previously there was no `robots` meta at all, so Google picked its own limits.
- **A non-canonical host can never represent the site.** `SEOHead` emits
  `noindex, nofollow` when the runtime host isn’t `SITE_URL`, and the prerender
  plugin emits the same for any build where `VERCEL_ENV` is `preview` or
  `development`.
- **`<lastmod>` is stamped at build time** (see `plugins/prerender-seo.ts`), which
  is the freshness signal that asks Google to come back and replace the title.
- The homepage `WebSite` JSON-LD now carries `alternateName` (`ClutchMarks`,
  `clutchmarks.study`) so Google’s Site Names feature has a strong signal for the
  brand.

Guarded by `frontend/src/lib/seoRobots.test.ts`.

## What only you can do

These need account access the repo doesn’t hold.

### 1. Vercel — turn protection off for production

Project → **Settings → Deployment Protection**:

- **Vercel Authentication**: set to **Standard Protection** (preview only). Do
  **not** leave production protected — that is the direct cause.
- Ensure **Password Protection** is off for the production domain.

Then redeploy so the domain serves the app to crawlers again.

### 2. Google Search Console — replace the cached title

1. Verify the `clutchmarks.study` property (the repo already carries the
   `google-site-verification` meta tag in `index.html`).
2. **Sitemaps** → submit `https://clutchmarks.study/sitemap.xml`.
3. **URL Inspection** → enter `https://clutchmarks.study/` → **Request Indexing**.
   Do the same for `/past-papers`, `/notes`, `/quizzes`, `/subjects`.
4. If the Vercel login page is indexed as its own URL, use **Removals → Temporarily
   remove URL** on it; that clears it within a day and gives the recrawl a head
   start.
5. Give it a few days. Titles are refreshed on recrawl, not instantly.

### 3. Bing Webmaster Tools

Same drill: submit the sitemap and request indexing. Bing powers a lot of
third-party search surfaces (DuckDuckGo, some AI answers).

## How to verify

```bash
# The served HTML for a protected deployment would be Vercel's login page.
curl -sI https://clutchmarks.study/ | head -20        # expect 200, no _vercel_jwt
curl -s  https://clutchmarks.study/robots.txt          # /auth must NOT be Disallowed
curl -s  https://clutchmarks.study/sitemap.xml         # every <url> needs a <lastmod>
curl -s  https://clutchmarks.study/auth | grep robots  # expect noindex
```

Also re-check the runtime tags in a browser (View Source on `/` should show
`index, follow, max-image-preview:large…` and the canonical link).
