# Rotating the Supabase management token and the legacy API keys

Written 2026-10-30 from the live project (`zzliiazovezhxbmfeqco`), because the
obvious version of this task ("rotate the two keys") would take the site down.

## What the project actually has

| Key | Type | Status |
|---|---|---|
| `anon` | legacy JWT, `role=anon`, exp 2036 | **enabled**, and baked into the deployed bundle |
| `service_role` | legacy JWT, `role=service_role`, exp 2036 | **enabled**, read by all 17 edge functions |
| `default` | `sb_publishable_…` | **verified working** — PostgREST 200, `/auth/v1/settings` 200 |
| `default` | `sb_secret_…` | present, but its value is **masked** through `GET /api-keys` (using it returns `401 Invalid API key`) |

`GET /v1/projects/{ref}/config/auth` confirms `site_url` and `uri_allow_list` are the
production domain, and `GET /api-keys/legacy` returns `{"enabled":true}`.

## Two things that are not what they look like

**1. The legacy `service_role` key cannot be rotated on its own.** `anon` and
`service_role` are two JWTs signed by one project secret. Disabling or rotating one
disables both, and the deployed client still uses the legacy `anon` key — measured:
the live `index-*.js` contains a legacy JWT and zero `sb_publishable_` keys. Rotate
blindly and every student's browser stops authenticating.

**2. Moving the functions to the new secret key is an authorization change, not a
key swap.** Per Supabase's migration guide, the platform's built-in `verify_jwt`
check only understands legacy JWTs, so a function reading `SUPABASE_SECRET_KEYS`
must also set `verify_jwt = false` and authorize requests in its own code. All 17
functions currently rely on `verify_jwt: true`. Flipping that without auditing each
handler *removes* the gate rather than rotating a credential.

`SUPABASE_SECRET_KEYS` and `SUPABASE_PUBLISHABLE_KEYS` already exist in the project
secrets (name-only listing), so the migration is a code change, not a provisioning one.

## Procedure

### A. Personal access token (`sbp_…`)

Dashboard only — `GET /v1/profile` answers `403 This endpoint requires a user-scoped
access token`, so a project-scoped PAT cannot manage tokens through the API.

1. Dashboard → **Account → Access Tokens → Generate new token**.
2. Put it in `.freebuff/get-keys.cjs` (replace the `TOKEN = '…'` literal). That one
   file is the source for ~245 scripts, so replace the literal rather than
   restructuring the line — most of them parse it with `/TOKEN = '([^']+)'/`.
3. Verify: `node .freebuff/probe-rotate-capability.cjs` (expects `GET /secrets 200`).
4. Only then **revoke the old token** in the same dashboard screen.

PATs live only in gitignored paths (12 files, none tracked), and `.githooks/pre-commit`
still blocks a committed one.

### B. Legacy `anon` + `service_role` → publishable + secret

Order matters; each step is verifiable and reversible until the last.

1. **Client first — DONE 2026-10-30 (`06b0776`).** The browser now builds against
   the `default` publishable key. Three places hold that value, and the first one is
   the only one a Vercel build reads:

   | Where | Why it matters |
   |---|---|
   | **Vercel project env** (`VITE_SUPABASE_PUBLISHABLE_KEY`, env id `pOgomQ33QdlfEAnw`) | A Vercel build sees this as `process.env`, and Vite does **not** let a `.env` file override an existing process env — so editing `.env.production` alone changes nothing live |
   | `.env.production` (tracked) | what a *local* production build reads |
   | `.env` | the dev server |

   Verified after deploying `06b0776`: the served bundle contains a `sb_publishable_`
   key and **zero** legacy JWTs, and that exact key signs a user in, refreshes a
   token and reads their own row under RLS. Re-check with
   `node .freebuff/verify-live-domain.cjs` and by grepping the served asset.

   One side effect worth knowing: that public key trips gitleaks' `generic-api-key`
   entropy rule on every commit, so `.gitleaks.toml` allowlists that single line.
   A canary with a secret key, a live-form Stripe key and a service-role JWT still
   fails the scan with three findings, so nothing else is weakened.
2. **Functions, one at a time — pattern proven on `quiz-feedback` (2026-10-30).**
   First, the part that surprised the measurement: **this project's edge-function
   environment already holds modern keys.** `SUPABASE_SERVICE_ROLE_KEY` is itself an
   `sb_secret_…` and `SUPABASE_ANON_KEY` an `sb_publishable_…` (measured from inside a
   function), and `SUPABASE_SECRET_KEYS` is `{"default": "sb_secret_…"}` which reads
   `quizzes` with 308 rows as service role. So the key *value* needs no migration;
   what actually changes is **who authorizes the request.**

   Three changes per function:

   1. resolve the key modern-first, legacy second — `JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS")!)["default"]`,
      falling back to `SUPABASE_SERVICE_ROLE_KEY`. Modern-only breaks a project that
      has not created the new keys; legacy-only breaks the day they are revoked.
   2. deploy with `node .freebuff/redeploy-manage-accounts.cjs <slug> --public`
      (`verify_jwt: false`): the platform gate only understands legacy JWTs.
   3. **answer 401 in code**, for a missing *and* a forged token, before doing any
      work. With the gate off, the old `throw new Error("Missing authorization
      header")` became the only barrier — and it returned **500**, which reads to a
      caller as "try again". `auth.getUser()` must also be treated as a real
      verification (it calls GoTrue), not a decode.

   Verified by `node .freebuff/probe-quiz-feedback-live.cjs` (7 checks): no header →
   401 with the function's **own** `{"error":"Unauthorized"}` rather than the
   gateway's `Missing authorization header`; a forged bearer → 401; a signed-in
   student with no attempt → 403; and a real attempt answered perfectly → 200 on the
   perfect-score branch, which is only reachable if the service-key client read both
   `quizzes` **and** `questions` (a broken key would look exactly like "no attempt").
   It stops before the Gemini call, so the probe spends no AI credits.

   The same 403-for-broken-key trap is why a behaviour check must assert something
   *only a working key can produce*, not merely "a refusal came back".
3. **Disable legacy keys** only when step 1 is live and every function is migrated:
   `PUT /v1/projects/{ref}/api-keys/legacy {"enabled": false}` (the dashboard's
   Settings → API Keys → *Deactivate legacy keys* is the same switch).
4. **Verify**: the live domain, `GET /auth/v1/settings` with the publishable key, one
   function call per migrated function, and a sign-in. Access tokens are signed by
   the JWT signing key, not by these API keys, so sessions survive this — unlike a
   JWT-secret rotation, which logs every user out.

   Until step 3 runs, the legacy pair stays enabled, so the client being on the
   publishable key is a safe intermediate state: `GET /api-keys/legacy` still answers
   `{"enabled":true}`, and both keys work in parallel by design.

Rollback at any step: `PUT …/api-keys/legacy {"enabled": true}` restores the legacy
pair. Do **not** rotate the JWT signing key as a shortcut — that invalidates every
session, and `SUPABASE_SERVICE_ROLE_KEY` is set explicitly in this project's secrets,
so it would go stale and break all 17 functions at once.

## Verified live (2026-10-30)

`node .freebuff/verify-live-domain.cjs` — 33 checks against `https://clutchmarks.study`:
CSP (`script-src 'self'`, no `unsafe-inline`, `frame-ancestors 'self'`), HSTS
`max-age=31536000`, COOP, Permissions-Policy, `X-Content-Type-Options`,
`Referrer-Policy`, 17 routes 200, 602 sitemap URLs, built asset 200, `spa-fallback`
`noindex`. Vercel Deployment Protection was on `deploymentType: "all"`, so the live
domain answered `302 → vercel.com/sso-api` before this — production was not reachable
at all.
