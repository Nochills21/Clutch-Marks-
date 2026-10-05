# Production deployment — Vercel (frontend) + Render (backend)

Architecture of this app, and what each platform does:

| Piece | Runs on | Notes |
|---|---|---|
| SPA + prerendered SEO pages | **Vercel** | `npm run build` → `dist/` (static) |
| Postgres, Auth, Storage | **Supabase cloud** (existing) | unchanged — do NOT create a Render database |
| Edge functions (7) | **Supabase** (existing) | reached via the Render API proxy or directly |
| API origin / webhooks | **Render** (`backend-api/`) | fronts `/fn/<slug>` → edge functions, holds secrets |
| DNS | **Cloudflare** (zone `clutchmarks.study`) | DNS-only records; Vercel/Render terminate TLS |

## 0. Current production wiring (configured 2026-10-05)

This is the live setup — the sections below are the from-scratch recipe.

- **Vercel project** `clutch` (`prj_7sPn3SU1BF5MANHWStiWlN03hHdD`,
  team `clutch-marks`) builds `main` → `dist/`; `vercel.json` supplies the SPA
  rewrites/headers. Production env vars set: `VITE_SUPABASE_URL`,
  `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SITE_URL=https://clutchmarks.study`.
  Vercel Authentication (Deployment Protection) is **off** so the custom domain
  is public.
- **Domains**: apex `clutchmarks.study` is the production alias; `www` is attached
  as a permanent (308) redirect to the apex.
- **Render service** `Clutch-Marks` (`srv-dat7l8btqb8s73a3gv8g`,
  `https://clutch-marks.onrender.com`): rootDir `backend-api`, build `npm install`,
  start `npm start`, health `/healthz`. Env vars: `SUPABASE_URL`,
  `SUPABASE_ANON_KEY`, `SYNC_WEBHOOK_SECRET`, `CORS_ORIGIN`, `NODE_VERSION=22`.
  Custom domain `api.clutchmarks.study` is attached (verifies once DNS is live).
- **Cloudflare DNS** (zone `b5964f0c9a7c36cb2019e30d833b30b6`), all records
  **DNS-only** (grey cloud):
  - `A @` → `216.198.79.1` and `64.29.17.1` (Vercel's required apex values)
  - `CNAME www` → `cname.vercel-dns.com`
  - `CNAME api` → `clutch-marks.onrender.com`
  - `CNAME _domainconnect` → `_domainconnect.vercel-dns.com`
  - `CAA @` → allow `sectigo.com`, `pki.goog`, `letsencrypt.org`

  These are deliberately **not proxied**: Vercel and Render both terminate TLS
  with their own certificates, and Cloudflare's proxy in front of them adds
  cert-renewal and redirect-loop failure modes. Cloudflare still owns DNS.
  Flipping a record to proxied later is a one-click change, but then keep the
  zone's SSL mode on **Full (strict)**.
- **Registrar dependency**: the Cloudflare zone stays `pending` until the
  registrar (Namecheap) switches nameservers to `brady.ns.cloudflare.com` and
  `faye.ns.cloudflare.com`. Until then the public site continues to resolve via
  Vercel's own nameservers (`ns1/ns2.vercel-dns.com`) and works normally.
- **Supabase Auth**: Site URL = `https://clutchmarks.study`; redirect allow-list
  includes `https://clutchmarks.study/**`, `https://www.clutchmarks.study/**`,
  plus the existing `*.vercel.app` preview patterns.

## 1. Backend on Render

1. Push this repo to GitHub.
2. Render → **New → Blueprint** → select the repo. `render.yaml` defines the
   `clutchmarks-api` web service (root `backend-api/`, health check `/healthz`).
3. Fill the prompted env vars:
   - `SUPABASE_URL` = `https://zzliiazovezhxbmfeqco.supabase.co`
   - `SUPABASE_ANON_KEY` = the publishable/anon key
   - `SYNC_WEBHOOK_SECRET` = any long random string (or leave empty to disable the hook)
4. Deploy; verify `https://<service>.onrender.com/healthz` → `ok`.
5. (Recommended, later) point a subdomain like `api.clutchmarks.study` at the service.

Note: on Render's free plan the service sleeps after ~15 min idle; the first
request then takes a few seconds. The app keeps working during that spin-up
because every edge-function call path still tolerates slow/retried responses
(offline fixes shipped 2026-09-26). Paid plans keep it warm.

## 2. Frontend on Vercel

1. Vercel → **Add New → Project** → import the repo.
2. Framework preset **Vite** (auto-detected), build `npm run build`, output `dist`.
   `vercel.json` adds the SPA fallback rewrites, immutable asset caching and
   baseline security headers.
3. Environment variables (Production + Preview):
   - `VITE_SUPABASE_URL` = `https://zzliiazovezhxbmfeqco.supabase.co`
   - `VITE_SUPABASE_PUBLISHABLE_KEY` = the publishable/anon key
   - `VITE_SITE_URL` = the final origin (e.g. `https://clutchmarks.study` — set it
     once the domain is attached; it drives canonical/OG tags via `src/lib/site.ts`)
4. Deploy. The first build proves the pipeline; attach the custom domain under
   **Settings → Domains** afterwards (DNS: CNAME `cname.vercel-dns.com`).

## 3. CORS: allow the Vercel origin

The edge functions return `Access-Control-Allow-Origin: *` today, so the Vercel
deploy works immediately. If that is ever tightened, set the function-side CORS
origin to the Vercel domain (and the Render `CORS_ORIGIN` env var to the same).

## 4. Supabase Auth redirect allow-list

Supabase → Auth → URL Configuration: add BOTH the Vercel preview domain
(`*.vercel.app`) and the production domain to the redirect allow-list, and set
the Site URL to the production origin — otherwise sign-in/reset email links
land on a blocked host.

## 5. Post-deploy checks

- `/` renders and `/pricing`, `/feedback`, `/practice` route correctly (SPA fallback).
- Sign-up + sign-in work end to end (auth emails link to the right origin).
- Admin → AI question bank generation still works (`generate-questions` v18+,
  notes-grounded).
- The practice question bank shows the notes-built sets (60+ topics / 940 MCQs as
  of 2026-09-26).
- `VITE_SITE_URL` is set to the FINAL origin and the site is rebuilt, so
  canonical/OG tags point at production.
- Per-route social cards exist for every prerendered route (`/og/<route>.png`,
  default `/og.png`). After editing card copy, regenerate with
  `node scripts/make-og-image.mjs` — the generator also writes the default card.

## 6. Launch checklist — search, social & DNS cutover

One consolidated list. **A** works today; **B** is the single nameserver move only
you can make; **C** is post-cutover verification. Exact values inline.

### A. Do now (works while DNS is still on Vercel's nameservers)

1. **Confirm the site is crawlable.** Expect exactly:
   - `curl -sI https://clutchmarks.study/sitemap.xml` → `HTTP/2 200`
   - `curl -s https://clutchmarks.study/robots.txt` → contains
     `Sitemap: https://clutchmarks.study/sitemap.xml`
   - `curl -s https://clutchmarks.study/sitemap.xml | grep -c "<loc>"` → `13`

2. **Google Search Console** — <https://search.google.com/search-console>
   - Add property → *URL prefix* → `https://clutchmarks.study`
   - Verify via the **HTML tag** method: the tag is already committed and live —
     `m5Qj2P9Rv04eQ1Q05i5zYUceYinJWgsDtaHJgVjYv80`
   - **Sitemaps** → submit `sitemap.xml`
   - **Removals** → *Temporary removal* → `https://clutchmarks.study/` to clear the
     stale "Login – Vercel" result cached while Deployment Protection was on
   - **URL Inspection** → `https://clutchmarks.study/` → *Request indexing*

3. **Bing Webmaster Tools** — <https://www.bing.com/webmasters>
   - Fastest path is *Import from Google Search Console*; otherwise add
     `https://clutchmarks.study`, verify, and submit
     `https://clutchmarks.study/sitemap.xml`.

4. **RelateSEO / RelateSocial** — Namecheap → **Apps → Relate**
   - Site URL: `https://clutchmarks.study`
   - **Prefer HTML meta-tag verification over a DNS TXT record.** A meta tag
     verifies immediately; a TXT record cannot resolve until step B completes and
     the Cloudflare zone is `active`.
   - Add the verification `<meta>` in `index.html` beside the existing
     `google-site-verification` tag (around line 25). The prerender plugin keeps
     shared head tags, so it propagates into all 12 prerendered route files.
   - RelateSocial: connect the profiles you actually post from, then schedule
     content from its AI assistant.

5. **Analytics** — ✅ configured 5 Oct 2026: Vercel → project `clutch` →
   Environment Variables has `VITE_PLAUSIBLE_DOMAIN=clutchmarks.study` for
   Production + Preview + Development. It takes effect on the next production
   build. `plugins/inject-analytics.ts` emits the script only when that variable
   is present, and it also gates the custom events in
   `frontend/src/lib/analytics.ts` (both are no-ops without it).
   **Still required, and only you can do it:** register `clutchmarks.study` as a
   site in a Plausible account — otherwise the script loads but the hits are
   discarded.

### B. Nameserver cutover (only you can do this)

The Cloudflare zone `clutchmarks.study` (`b5964f0c9a7c36cb2019e30d833b30b6`) is
still **`pending`** because the registrar still points at Vercel's nameservers
(`ns1/ns2.vercel-dns.com`). Nothing is broken meanwhile — the site serves fine.

1. Namecheap → Domain List → `clutchmarks.study` → Nameservers → **Custom DNS**:
   - `brady.ns.cloudflare.com`
   - `faye.ns.cloudflare.com`
2. Wait for the zone to flip `pending` → `active` (minutes to a few hours).
3. Confirm with:
   - `nslookup -type=NS clutchmarks.study 8.8.8.8` → `brady.ns.cloudflare.com`, `faye.ns.cloudflare.com`
   - `nslookup -type=A clutchmarks.study 8.8.8.8` → `216.198.79.1`, `64.29.17.1`

### C. Verify after the cutover

- **Cloudflare DNS** — all records **DNS-only** (grey cloud), as staged:

  | Type | Name | Content |
  |---|---|---|
  | A | `@` | `216.198.79.1` |
  | A | `@` | `64.29.17.1` |
  | CNAME | `www` | `cname.vercel-dns.com` |
  | CNAME | `api` | `clutch-marks.onrender.com` |
  | CNAME | `_domainconnect` | `_domainconnect.vercel-dns.com` |
  | CAA | `@` | allow `sectigo.com`, `pki.goog`, `letsencrypt.org` |

- **Vercel** — `https://clutchmarks.study` still `200` with the app title;
  `www` still `308` → apex.
- **Render** — `api.clutchmarks.study` flips `unverified` → `verified`
  (service `Clutch-Marks`, `srv-dat7l8btqb8s73a3gv8g`):
  `curl -s https://api.clutchmarks.study/healthz` → `ok`
- **TXT-based verification** (any vendor that insists on DNS rather than a meta
  tag) becomes possible only now.
- **Resend webhook** — Resend → Webhooks → add
  `https://zzliiazovezhxbmfeqco.supabase.co/functions/v1/email-events`,
  subscribe to `email.bounced` + `email.complained`, copy the signing secret into
  the Supabase function secret `RESEND_WEBHOOK_SECRET`.
- **Supabase Auth** — already set: Site URL `https://clutchmarks.study`; redirects
  `https://clutchmarks.study/**` and `https://www.clutchmarks.study/**`.

### Expectation setting

Search-result titles and social link previews are cached by Google/Meta/etc. The
markup is already correct (verified per-route prerendered HTML), so only the
re-crawl request in A2/A3 clears the stale "Login – Vercel" entry — and that is
not instant (usually days).
