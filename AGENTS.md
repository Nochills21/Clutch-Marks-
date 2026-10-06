# AGENTS.md

Notes for AI agents working in this repo. Keep entries terse; only record what code/docs can't tell you.

## Project
Clutch Marks — Cambridge IGCSE/AS/A2 revision platform (Vite + React + TS + Supabase). Maths 0580/9709, Physics 0625/9702, CS 0478/9618. The live Supabase DB is production — treat it as such.

## Environment & commands
- No Supabase CLI. All SQL goes through the Management API: `POST https://api.supabase.com/v1/projects/{REF}/database/query` with Bearer token `sbp_…` (read from `.freebuff/get-keys.cjs`); project ref + anon key come from `.env` (`VITE_SUPABASE_PROJECT_ID`, `VITE_SUPABASE_PUBLISHABLE_KEY`). Service key: `GET /v1/projects/{REF}/api-keys`.
- Use the bundled Bun, not npm: `BUN="$LOCALAPPDATA/Programs/@codebufffreebuff-desktop/resources/bun/bun.exe"`. Typecheck: `"$BUN" node_modules/typescript/bin/tsc --noEmit -p tsconfig.app.json`. No CI exists.
- Tests: `"$BUN" node_modules/vitest/vitest.mjs run` (vitest only collects `frontend/src/**/*.test.ts`). `frontend/src/lib/domainGuard.test.ts` fails on any tracked file matching `/clutchmarks\.com/i` outside its reasoned `EXEMPTIONS` list — the legacy `production/` bundle and `public/downloads/*.pdf` are exempt as generated artifacts (regenerate, don't hand-edit). Write the domain escaped in AGENTS.md/docs too, or the guard flags the doc.
- Dev server: Vite on port 8080; run doc `.freebuff/run.md`. On Windows, detach via PowerShell `Start-Process -FilePath 'npm.cmd' … -RedirectStandardOutput/-RedirectStandardError` (two different files).
- Deploy an edge function: `"$BUN" .freebuff/redeploy-manage-accounts.cjs <slug>` — multipart deploy, slug arg required, `verify_jwt: true`.
- The `run_terminal_command` heredoc mangles backslashes/quotes in tricky strings; build such strings with `String.fromCharCode` or use file tools instead.

## Database truth (critical)
- The live DB was built by direct SQL application — most of `supabase/migrations/` was never applied/recorded there. Never assume the migrations folder describes the live DB; introspect it first.
- `supabase/base.sql` is the golden full-schema snapshot (structure only, idempotent, validated by a BEGIN…ROLLBACK smoke test). After any schema change: apply live → add a migration file → regenerate with `.freebuff/golden-dump.cjs` → re-smoke-test.
- `src/integrations/supabase/types.ts` is hand-maintained — every new table/column must be added there manually or typecheck breaks.
- All curriculum content lives only in the live DB; seeders/exports are `.freebuff/content-*.cjs` + `.freebuff/seed-*.cjs`. There is no remote/backup yet (repo is local-only).

## Auth & security model
- `handle_new_user` (auth.users trigger, SECURITY DEFINER) seeds profile + `user_roles(role='student', is_approved=false)` and deliberately ignores client-sent role — never trust signup metadata for roles.
- `auth.admin.createUser` does NOT create role rows; `manage-accounts` must write `user_roles` explicitly (past bug: panel-created admins landed as students).
- Trigger `enforce_user_roles_writer` gates `user_roles` writes by `current_user` (service_role/postgres) or approved-admin `auth.uid()`; auth triggers run as `supabase_auth_admin`, so guards must allowlist by role name, not just `auth.uid()`.
- Edge functions run as service_role → normal audit triggers see a null actor; attribute mutations explicitly via the `audit_admin_action` RPC.
- Password policy: GoTrue global min length 6, `jwt_exp=1800`; admins 12+ & complexity enforced server-side in `manage-accounts`; students 6+ + complexity + HIBP k-anonymity check in `src/lib/passwordPolicy.ts`. Managed-config `password_hibp_enabled` is Pro-only (402) and the `required_characters` preset enum is broken server-side — don't retry config, enforce in code.
- Signup email domains are restricted; create test accounts as `anything@igcse-platform.local` (`example.com` → 400).
- `auth.admin.deleteUser` cascades profile/role rows — capture identity before deleting (audit trail needs it).

## Gotchas (misleading errors)
- PostgREST embed `topics(name)` returns 400 if the FK is missing — embeds require real FKs (`flashcard_sets` lost its FK once and every list query 400'd).
- Generic PL/pgSQL triggers spanning multiple tables: `NEW.name` throws at runtime on tables without that column (broke announcement inserts with an unhelpful 400) — use `to_jsonb(NEW)->>'field'`.
- `pg_get_functiondef` output ends with a bare `$function$` line (no semicolon) — concatenating emitted SQL without terminating produces confusing downstream syntax errors.
- `login_lookup_throttle` table + `register_login_lookup` RPC back the `resolve-login-email` rate limiter; if the RPC is missing the limiter silently no-ops.
- `user_roles` PK is `id` only (no unique on `user_id`) — role rows can duplicate; admin checks use `.eq("role","admin").eq("is_approved",true)`.
- **Every edge function must call `Deno.serve(handler)`** (or export a default fetch handler). With only `export async function handler` the deploy still reports ACTIVE but the function is never dispatched: invocations hang with *no log entry at all* until the platform kills them at ~150s (opaque 504/546). `study-planner` shipped that way and had never worked.

## Content conventions
- Quiz answers are 0-based (`correct_option`); legacy seeds were 1-based and were fixed+rotated — any new seed content MUST use 0-based indices.
- Lessons are markdown stored in DB; `.cjs` content files are template literals — never put backticks in lesson text (broke parsing once; fixers in `.freebuff/fix-backticks*.cjs`).
- Student pages filter `material_type='notes'`; some admin paths wrote `'note'` — treat as aliases.
- `study-materials` bucket is private; open files via `openSignedFile` (`src/lib/contentFiles.ts`); preview PNGs live under `study-materials/previews/`.
- Brand assets (`public/icon-*.png`, `favicon.ico`, `og.png`, `brand/*`, `site.webmanifest`) are generated by `.freebuff/build-brand-assets.cjs` from the owner's artwork — regenerate, never hand-edit. Resize first, apply the rounded mask last: sharp doesn't premultiply, so masking before resizing rings pink/yellow along the alpha edge. `BrandMark`/`BrandLockup` render `brand/mark-512.png` (logo tile above the wordmark band).
- PDF toolchain: `.freebuff/pdftool/` (own package.json, pdfjs) with local PDFs in `out/`; scripts `build-materials.cjs`, `build-booklet-splits.cjs`, `build-previews.cjs` — re-run after re-splitting. Uploaded files live in storage, not the repo.
- AI features run on Cloudflare Workers AI (`CLOUDFLARE_API_KEY` + `CLOUDFLARE_ACCOUNT_ID`): `ai-correction` marks papers, `study-planner` writes plans. No `LOVABLE_API_KEY` is set, so `study-planner` uses Cloudflare, and falls back to a deterministic offline plan (bounded 90s upstream call) rather than ever returning a 504.
- Workers AI rejects retired/short model names outright ("No such model"; `llama-3.1-8b-instruct` died 2026-05-30). Both functions keep an alias map — send `@cf/…` ids or nothing and let the worker resolve.

## User preferences
- Notes must be exam-grade and syllabus-referenced, not simplified "explain-like-I'm-5" style.
- SaveMyExams-like UX: per-topic pages with SEO-friendly slugs (`/study/:subject/:level/:topic/notes|quiz|papers` via `src/lib/topicUrls.ts`); minimize clicks to reach anything.
- Security is the user's top concern (account takeover destroying content/reputation) — prefer defense in depth and verify changes live instead of assuming.
