# Going live — deployment handoff

Verified state of this checkout (2026-09-25). Read alongside
`docs/infrastructure.md` (what lives where) and `docs/domain-launch-runbook.md`
(the Cloudflare-specific launch steps — now for `clutchmarks.study`).

## Verified in this checkout

- `npm run build` succeeds: Vite 5, ~9 s, `dist/` produced, and
  `plugins/prerender-seo.ts` writes 12 static route HTML files.
- The output is a **static SPA** plus prerendered HTML. It needs a host with
  SPA fallback; `public/_redirects` (`/* /index.html 200`) is already committed.
- The app is **not live**: `clutchmarks.pages.dev` and `clutchmarks.com` do not
  resolve (no DNS). The only reachable deployment is the temporary Lovable
  preview (`clutch-marks.lovable.app`).
- The app needs **no new database**: it already talks to its existing Supabase
  project (`zzliiazovezhxbmfeqco`) for Postgres, Auth and Storage. Do not add a
  managed Postgres/Redis/S3 instance — that would be a billable resource the
  app does not use.
- The frontend is now split into `frontend/` (see `backend/` for the Supabase
  functions). A `vite build` from `frontend/` produces a complete static app.

## Build-time environment variables

These are public values that ship inside the client bundle. Set them as build
environment variables on whatever host runs the build (see `.env.example`):

| Variable | Required | Purpose |
|---|---|---|
| `VITE_SUPABASE_URL` | yes | Supabase REST/RPC/Edge base URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | yes | anonymous/publishable key used by the client |
| `VITE_SITE_URL` | recommended | public origin override for canonical/OG tags (`src/lib/site.ts`) |
| `VITE_PLAUSIBLE_DOMAIN` | optional | enables Plausible analytics |

`VITE_SITE_URL` matters at launch: without it `src/lib/site.ts` falls back to
`https://clutchmarks.pages.dev`, which is not a resolvable host — set it to the
real origin (`https://clutchmarks.study`) at build time.

Never put a Supabase service-role key in any `VITE_*` variable; those are
inlined into the public bundle.

## Option A — Lizard (approved deployment path)

Lizard detects a static site, builds it and returns a live URL. The CLI is not
installed in this environment and this run could not add packages, so run these
on a machine where global installs are allowed:

```sh
npm i -g @lizard-build/cli        # or: curl -fsSL https://lizard.build/install.sh | bash
lizard skills get core --json     # version-matched agent guide — read it first
lizard login                      # prints an auth URL; finish in the browser
lizard status --json              # reuse the linked workspace/project if one exists
lizard up                         # uploads, builds, returns a live URL on onlizard.com
```

Notes from the official README (`@lizard-build/cli`) and the current repo:

- `lizard up` covers deploy; `lizard init` links a project. `lizard --help --json`
  dumps the exact command schema for the version you install.
- Scope for this app: **one static-site service, no addons.** Managed Postgres,
  Redis and Object Storage (`lizard add …`) are separately billable and unused
  here.
- Billing is for active resources; check the live pricing the CLI/console shows
  before running `lizard up`. No free tier is promised.
- After the deploy, set `VITE_SITE_URL` to the returned origin and redeploy so
  canonical/OG links point at the live host.

## Option B — Cloudflare Pages (existing documented path)

The free path already described in `docs/domain-launch-runbook.md`: connect the
repo, framework preset Vite, build `npm run build`, output `dist`, then attach
the custom domain `clutchmarks.study` (see the `clutchmarks.study` section of
that runbook).

## After either deploy

Re-run the launch checklist in `docs/domain-launch-runbook.md` §5 against the
real URL — the deploy is only done when that URL returns the app (not a platform
error page) and sign-in/reset flows work end to end.
