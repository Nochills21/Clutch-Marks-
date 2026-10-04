# Going live — Clutch Marks production runbook

Stack: **Vercel** (frontend SPA) · **Render** (backend API) · **Supabase**
(Postgres + Auth + Storage + Edge Functions). Domain: `clutchmarks.study`.

See `docs/infrastructure.md` for what lives where and
`docs/deploy-vercel-render.md` for the original topology notes.

## 1. Supabase (do this first — the app assumes this schema)

Project ref: `zzliiazovezhxbmfeqco` (`backend/supabase/config.toml` must match).

### Migrations

The client and the edge functions are written against the migrations in
`backend/supabase/migrations/`. **A migration on disk that has not been applied
to the live project looks exactly like a broken feature at runtime** — PostgREST
answers `42703 (column does not exist)` or `PGRST205 (table not found)`, and the
UI shows an empty list or a failed submit rather than an error. This already
happened: five migrations (`announcement_read_state`, `study_plans_ai_persist`,
`ai_correction_rls`, `payment_receipts`, `past_papers_subject_level`) sat
unapplied and broke payment requests, AI marking persistence, the AI study
planner and the announcements badge in production.

Apply them with the Supabase CLI (needs `supabase login`):

```sh
supabase link --project-ref zzliiazovezhxbmfeqco
supabase db push                       # applies anything outstanding
```

`supabase db push` tracks what it has applied in `supabase_migrations.schema_migrations`.
Every migration in this repo is written to be **idempotent** (`if not exists`,
`drop policy if exists`), so re-running one is safe.

**Verify after applying** — probe the REST API with the publishable key from
`.env.production`; a missing column returns HTTP 400 `42703`:

```sh
curl -s -o /dev/null -w '%{http_code}\n' \
  -H "apikey: $VITE_SUPABASE_PUBLISHABLE_KEY" \
  "https://zzliiazovezhxbmfeqco.supabase.co/rest/v1/subscriptions?select=payment_method&limit=0"
# 200 = applied, 400 = still missing
```

### Edge functions

```sh
supabase functions deploy study-planner quiz-feedback generate-questions \
  manage-accounts promote-admin resolve-login-email serve-material \
  serve-external-paper welcome-email weekly-digest email-events feedback-alert \
  past-papers-harvest
```

`past-papers-harvest` is invoked by pg_cron, so deploy it with
`--no-verify-jwt` and set its shared secret: `supabase secrets set
HARVEST_SECRET=<value>` must match the `past_papers_harvest_secret` row in
`private.app_secrets` (both are created by
`20261003150000_past_papers_harvest_cron.sql` / seeded out of band).

Always deploy from `backend/supabase/functions/`, which is the source of truth.
The top-level `supabase/functions/` tree is a mirror that lags behind for
several slugs — deploying it once shipped `serve-material` without its
entitlement gate and without the CORS header on the PDF branch, so every
download silently fell back to an unwatermarked signed URL.

`ai-correction` exists in `backend/supabase/functions/` but is **not deployed**;
until it is, AI paper marking cannot run — which also blocks the timed
paper-practice flow (see `docs/past-papers.md`), since it corrects through the
same worker. Deploy it and set `CLOUDFLARE_API_KEY` + `CLOUDFLARE_ACCOUNT_ID`
(or `OPENAI_API_KEY`) as function secrets first. `study-planner`'s
generate action needs `LOVABLE_API_KEY` set as a function secret
(`supabase secrets set LOVABLE_API_KEY=…`) — without it the function returns 500.

## 2. Vercel (frontend)

Import the repo; settings come from `vercel.json`:

| Setting | Value |
|---|---|
| Framework | vite |
| Build command | `npm run build` |
| Output directory | `dist` |

`vercel.json` also carries the SPA fallback (`/(.*)` → `/index.html`), 301s for
the legacy alias routes, cache headers for `/assets/*`, and the security headers
(`nosniff`, `Referrer-Policy`, `X-Frame-Options`).

**Build-time environment variables.** These are public values that ship inside
the client bundle — the publishable key is protected by Row Level Security, not
by secrecy. Set them in the Vercel dashboard (Production + Preview):

| Variable | Required | Purpose |
|---|---|---|
| `VITE_SUPABASE_URL` | yes | `https://zzliiazovezhxbmfeqco.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | yes | anon/publishable key |
| `VITE_SITE_URL` | recommended | canonical/OG origin (`frontend/src/lib/site.ts`) |
| `VITE_PLAUSIBLE_DOMAIN` | optional | enables Plausible analytics |
| `VITE_API_URL` | optional | Render origin, e.g. `https://clutchmarks-api.onrender.com` |

`.env.production` is committed as a fallback carrying the same public values, so
a build can never silently produce an app with an undefined Supabase URL. Real
dashboard variables take priority over it (Vite does not let `.env` files
override an existing process variable), so rotating a key in the dashboard needs
no commit.

Never put a service-role key in a `VITE_*` variable.

## 3. Render (backend API)

`render.yaml` at the repo root is a Blueprint: one Node web service,
`rootDir: backend-api`, `npm install` + `npm start`, health check `/healthz`,
Node 22. It fronts the edge functions at stable `/fn/<slug>` URLs, adds
`/sync/webhook`, and holds server-only secrets so they never reach the bundle.

Set when prompted: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SYNC_WEBHOOK_SECRET`
(any long random string). Verify after deploy:

```sh
curl -s https://clutchmarks-api.onrender.com/healthz     # -> ok
```

## 4. Post-deploy verification

1. `https://clutchmarks.study/` returns the app (not a platform error page).
2. Sign-in, sign-out and password reset work end to end.
3. A deep link with several path segments — e.g.
   `/study/mathematics/OL/types-of-number-sets-powers-and-roots-1-1/notes` —
   loads on **hard refresh** (this is what the SPA fallback exists for).
4. Browser console is clean; in the network tab no request answers 400/404
   against `zzliiazovezhxbmfeqco`.
5. `/pricing` can submit a plan request with a receipt (needs the
   `payment_receipts` migration).
6. `https://clutchmarks.study/robots.txt` and `/sitemap.xml` are reachable.

The deploy is only done when all six pass — a platform "success" page says
nothing about the schema being current.
