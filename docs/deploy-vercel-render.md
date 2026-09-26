# Production deployment — Vercel (frontend) + Render (backend)

Architecture of this app, and what each platform does:

| Piece | Runs on | Notes |
|---|---|---|
| SPA + prerendered SEO pages | **Vercel** | `npm run build` → `dist/` (static) |
| Postgres, Auth, Storage | **Supabase cloud** (existing) | unchanged — do NOT create a Render database |
| Edge functions (7) | **Supabase** (existing) | reached via the Render API proxy or directly |
| API origin / webhooks | **Render** (`backend-api/`) | fronts `/fn/<slug>` → edge functions, holds secrets |

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
