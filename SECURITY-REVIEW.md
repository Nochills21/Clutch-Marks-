# Security review — Clutch Marks

Date: 30 October 2026 (round 2; round 1 was 29 October 2026). Scope: the `clutchmarks.study`
SPA (Vite + React + TypeScript), the live Supabase project it talks to, its deployed edge
functions, and the Stripe integration.

> **Status of the site.** Production is paused. The blocker is an unrotated Supabase project
> access token (`sbp_…`) that was exposed in a chat session; it is the first open item below
> and only you can revoke it.
>
> **Git history was rewritten on 30 Oct 2026** to remove a committed session credential and the
> anon-key build artifacts (see M-3/M-4). **Existing clones must be re-cloned** — `main` moved
> from `072bcc9` to `958032c`, and pulling the old history would reintroduce the blobs.

## Scope and trust boundaries

In scope, and owned by the project owner: this repository; the live Supabase project
`zzliiazovezhxbmfeqco` (the production database, its RLS, its RPCs and its storage buckets);
the edge functions deployed from `supabase/functions`; the Vite/React SPA; and the Stripe
billing integration. Out of scope: load or denial-of-service testing, social engineering,
Supabase's and Stripe's own infrastructure, and anything reached only through a third party's
dashboard.

No live-URL testing: production is paused behind Vercel SSO, so the review is source plus the
live catalog plus the built app, not requests against the deployment.

Trust boundaries, outermost first: an **anonymous internet caller** holding only the
publishable key (every browser has it); an **authenticated student** (auto-approved, so
obtaining an account is free); an **authenticated parent** (can link one student by email); an
**admin**, who holds nothing without a second factor (`is_admin` = role *and* AAL2); the
**`service_role` edge functions** each running with a gate of their own; and **Stripe's
webhook**, an unauthenticated endpoint whose only credential is an HMAC over the raw body.

The invariants the review tests against, in the project's own terms:

1. A student's row ownership is `auth.uid()`; no write policy may be `using (true)`.
2. Correct answers never reach the browser; grading happens server-side.
3. Admin authority requires role **and** AAL2 — `has_role` alone is membership, not authority.
4. A parent reads exactly the students linked to them, never the profile estate.
5. Paid content is gated by `has_active_plan` server-side; the client holds a sales gate, not
a security boundary.
6. Student uploads live under `<user_id>/…` in a private bucket, and the bucket's policy and
the marker's IDOR check both enforce that prefix.
7. Board papers are linked, never served.
8. Every `service_role` function authenticates its own caller (signature, shared secret, or
a decoded token with an MFA check).

## Method

Four passes, then fixes with live verification:

1. **Map** the trust boundaries — browser → Supabase Auth/PostgREST (RLS) → `service_role`
   edge functions → Stripe webhook.
2. **Automated scans** — Gitleaks v8.30.1 (checksum-verified binary) over the full 264-commit
   history and the working tree; `npm audit --omit=dev` against the committed lockfile.
3. **Manual review** against the live catalog, not against the migrations folder (which does
   not describe the live database): `SECURITY DEFINER` functions and their `EXECUTE` grants,
   every RLS policy and its expression, every `dangerouslySetInnerHTML` sink, and each edge
   function's own gate.
4. **Fix and verify** — migrations applied after a rollback dry run, then re-read from the
   catalog and asserted by a probe.

Re-run the regression probe at any time:

```bash
node .freebuff/probe-security-hardening.cjs   # 17 checks, exit 1 on regression
```

## Findings

| # | Severity | Finding | Status |
|---|---|---|---|
| H-1 | High | `notify_admins_of_sensitive_event` was anon- and authenticated-executable, `SECURITY DEFINER`, with no caller check | **Fixed** |
| H-2 | High | `profiles` SELECT for parents was gated only by `i_am_parent()`, exposing every user's name and email | **Fixed** |
| H-3 | High | Live Supabase project token exposed in chat; stored in plaintext, never rotated | **Open — needs you** |
| M-1 | Medium | `archive_old_audit_entries` was authenticated-executable with no caller check | **Fixed** |
| M-2 | Medium | `content_integrity_findings` gated by bare `has_role`, so an AAL1 admin could read it | **Fixed** |
| M-3 | Medium | A live session credential (access + refresh token + password) is committed in git history | **Fixed — history rewritten 30 Oct 2026**; rotate the password anyway |
| M-4 | Low | The Supabase anon JWT is baked into committed build artifacts | **Fixed — artifacts purged; anon key still shipped to browsers by design** |
| L-1 | Low | 14 dependency advisories; `zod` is the only one with a real exploit shape, and its fix is a breaking major | **Accepted for now** |
| I-1 | Info | `_seed_fixes` is a dead table with permissive grants (unreachable: RLS on, no policy) | **Left alone** |

## Round 2 — 30 October 2026

Round 1 read the migrations and the catalog. Round 2 read the **grants** and asked what one
mistake would cost. Everything below was found by introspecting the live database (55 tables,
151 policies, 62 `SECURITY DEFINER` functions, 6 buckets) rather than trusting the migration
folder, then hunting each finding's variants across the schema.

| # | Severity | Finding | Status |
|---|---|---|---|
| H-4 | High | `anon` and `authenticated` held `INSERT/UPDATE/DELETE/**TRUNCATE**` on every public table; RLS does not filter `TRUNCATE`, so one SQL-injection became a whole-database wipe | **Fixed** |
| H-5 | Medium | `restore_content_revision` gated on a raw `user_roles` admin row, so an AAL1 (password-only) admin could rewrite any lesson or note body | **Fixed** |
| M-5 | Medium | A parent could insert a `parent_student_links` row for **any** `student_id`; the policy checked only that `parent_id` was themselves | **Fixed** |
| M-6 | Medium | A student could `UPDATE` their own `quiz_attempts.score`, `practice_attempts.last_correct` and `homework_submissions.grade/feedback` after the server graded them | **Fixed** |
| M-7 | Medium | No `Content-Security-Policy`, `Strict-Transport-Security` or `Permissions-Policy` on the deployment, with 21 HTML sinks in the SPA | **Fixed** |
| M-8 | Low | The `past-papers` bucket was readable by any authenticated user, contradicting "board papers are linked, never served" | **Fixed** |
| L-2 | Low | Account-security notification emails were all disabled, so a password or MFA change was silent | **Fixed** |
| L-3 | Low | `get_profile_id(uid)` is authenticated-executable and answers "does this account exist" for any uid | Accepted |
| H-6 | High | **No backups and no point-in-time recovery.** `pitr_enabled: false`, 0 physical backups — a wipe or a bad write was unrecoverable | **Mitigated — nightly job built and restore tested; needs your passphrase + bucket** |

### H-6 — nothing to restore from (open)

**Evidence.** Management API `/v1/projects/{ref}/database/backups` answers `pitr_enabled: false`
with **0** physical backups. The project is on a plan without PITR, and no dump job exists —
`AGENTS.md` already said "there is no remote/backup yet".

**Why it outranks the code findings.** Every fix above is an attempt to prevent destruction.
This one decides what happens if prevention fails once: with no backup, a successful attack, a
bad migration, or a mistaken `delete` is permanent. It is the other half of "the site can get
nuked", and it is the highest-impact open item in this document.

**Fix — built 2026-10-30.** `scripts/db-backup.cjs` (`npm run backup:db`) dumps every table in
`public` from the catalog, gzips and encrypts the bundle (AES-256-GCM), uploads it to any
S3-compatible bucket, and prunes to `--keep` files. `scripts/db-restore.cjs` verifies the manifest
hashes and emits a `restore.sql`. Runbook: [`docs/database-backup-and-restore.md`](docs/database-backup-and-restore.md).

Proven, not asserted: a full dump of production (50,883 rows / 57 tables → 22.5 MB), an integrity
check, a restore round-trip of 7 tables including `questions` (4,223 rows of `jsonb`) whose counts
matched the manifest, and a SigV4 upload verified by an independent signature recomputation.

**Still yours:** the `BACKUP_PASSPHRASE` and the bucket credentials, then the scheduled task. The
job exits `2` rather than reporting success while the off-site leg is unconfigured. The bundle
**excludes `auth.users`**, so it restores data into a surviving project but not a deleted one —
PITR remains the answer for whole-project loss.

**Interim.** `supabase/base.sql` is a structure-only snapshot and does **not** contain any
content or student data, so it is not a backup. Do not treat it as one.

### H-4 — the database could be truncated with the publishable key (fixed)

**Evidence.** `information_schema.role_table_grants` showed `anon` holding `INSERT, UPDATE,
DELETE, REFERENCES, TRIGGER, TRUNCATE` on **all 55** public tables, and `authenticated` the
same. These are Supabase's default grants: RLS is left to do all the work.

**Why it matters here.** RLS filters `SELECT/INSERT/UPDATE/DELETE`. It does **not** filter
`TRUNCATE` — a truncated table is emptied regardless of policy, and it is the cheapest possible
way to destroy the estate. Today the only barrier is that PostgREST exposes no `TRUNCATE`
verb, so it takes one SQL-injection or one future `SECURITY DEFINER` function with a dynamic
statement to reach it. That is a single point of failure for exactly the outcome the owner is
worried about, and it was invisible to a policy-by-policy audit.

**Fix.** `20261030120000_security_hardening_r2.sql` revokes every write and destructive
grant from `anon` and `TRUNCATE/REFERENCES/TRIGGER` from `authenticated`, then sets
`ALTER DEFAULT PRIVILEGES` so new tables do not inherit them again. No anon write could ever
have succeeded (every write policy tests `auth.uid()` or a role anon lacks), and 50 anon
`SELECT` grants are left in place so the public/prerendered pages still read. Verified: 0 anon
write grants, 0 authenticated `TRUNCATE` grants, 50 anon SELECT grants.

### H-5 — a password-only admin could rewrite content (fixed)

**Evidence.** `restore_content_revision(uuid)` decided authority with
`select exists (…) where role = 'admin' and is_approved = true`, never calling `is_admin`.

**Impact.** The project's model is that AAL1 holds no admin power, so a stolen password cannot
lock the owner out of their own content. This function was the one admin write that skipped
that check: an AAL1 admin could restore any stored revision over a live lesson or note.

**Fix.** The function is recreated with `if not public.is_admin(auth.uid())` — role **and**
`is_aal2()` — and `EXECUTE` is re-granted to `authenticated, service_role` only (a new function
returns to `PUBLIC` by default). This was found by a variant hunt across all 62 definer
functions for a raw `role = 'admin'` test; every other hit was selecting admin *recipients*
(`award_xp`, `has_active_plan`, `notify_admins_of_sensitive_event`) or a trigger, not gating a
write.

### M-5 — any parent could link to any student (fixed)

**Evidence.** `Parents can create own links` on `parent_student_links` was
`with check (has_role(auth.uid(),'parent') and parent_id = auth.uid())`. Nothing constrained
`student_id`, so the browser chose it. Once a row existed, the parent could read that student's
profile, homework, attempts and lesson progress through the `is_linked_parent` policies.

**Fix.** The INSERT policy is dropped and linking moves into
`public.link_student_by_email(text)`: parent-only, `SECURITY DEFINER`, which repeats the exact
email lookup and writes the link in one statement, so the student id never comes from the
client. `ParentDashboard.tsx` calls the RPC. A parent can still link a child whose address
they know — that is the product — but not an arbitrary UUID.

### M-6 — a student could rewrite their own grade (fixed)

**Evidence.** `Users can update own attempts` (`quiz_attempts`), `…practice_attempts` and
`Users can update own submissions` (`homework_submissions`) each had a `using (user_id =
auth.uid())` predicate and no column restriction, so `score`, `total_questions`, `answers`,
`last_correct`, `grade`, `feedback` and `status` were all writable by their owner after
grading.

**Why it is a fix and not a break.** No client path updates these tables — grading happens in
the `grade_quiz` definer function — so the policies were unused, and the parent dashboard and
the student's own progress page only `SELECT` from them. The admin grade book *does* upload a
correction to `quiz_attempts` from the browser and had no policy permitting it, so it gains a
least-privilege `Admins can update attempts` policy in the same migration.

### M-7 — no CSP, HSTS or Permissions-Policy (fixed)

**Evidence.** `vercel.json` sent `X-Content-Type-Options`, `Referrer-Policy` and
`X-Frame-Options` and nothing else.

**Fix.** The catch-all header block now also sends `Strict-Transport-Security`
(`max-age=31536000; includeSubDomains`), `Permissions-Policy`, `Cross-Origin-Opener-Policy` and
a `Content-Security-Policy` of `default-src 'self'` with `object-src 'none'`, `base-uri 'self'`,
`frame-ancestors 'self'`, `script-src 'self'`, and `connect-src` limited to Supabase, the HIBP
endpoint and Plausible. This is the mitigation that matters if a stored-XSS ever gets past
DOMPurify: without it, one bad content row is game over for every admin session.

**Verified, not assumed.** The built app was served with these exact headers and loaded in real
Chrome at `/`, `/subjects`, `/pricing`, `/notes` and `/auth`: **0 CSP violations, 0 console
errors**. Fonts are self-hosted, and the only inline script is the JSON-LD data block, which is
not executable. (`.freebuff-tmp/audit/csp-check.cjs` is the harness.)

### M-8 — board papers were downloadable (fixed)

**Evidence.** `Authenticated users can read past paper files` on `storage.objects` allowed any
signed-in user to read the `past-papers` bucket — 2,107 PDFs — while `serve-material`
deliberately refuses that bucket to non-admins.

**Fix.** The policy is dropped, leaving the admin policies. The app never reads those objects
for a student, so nothing breaks.

### L-2 / L-3 — small ones

- `mailer_notifications_password_changed_enabled` and the two MFA-factor notifications were
  `false`, so a takeover that changed a password was silent. All three are now `true`.
- `get_profile_id(uuid)` is `SECURITY DEFINER`, authenticated-executable, and maps any uid to a
  profile id — an "does this account exist" oracle. Left alone: it is low value (no PII is
  returned) and something may still call it; revoking `PUBLIC` and re-granting would be the fix
  if it is unused.

### Triage of the scans (nothing left unexplained)

- **Gitleaks, 265 commits, 64 findings.** 61 are the **anon** JWT in committed build artifacts
  (`production/`, `dist-single/`, `.env.production`) — public by design. 1 is a truncated JWT in
  a markdown note. 2 are the local `palette-session.json` handled under M-3, **which is reachable
  only from the local `refs/backups/daily` ref**: it is not in `origin/main`, and the public
  GitHub repo never received that ref.
- **Gitleaks, working tree, 305 findings.** All but a handful were the JSON reports this audit
  wrote. The real ones are gitignored locals: `.env`, and `.freebuff/get-keys.cjs` holding the
  `sbp_` token (see H-3 — still the item only the owner can close).
- **Semgrep, `p/default`, 326 files, 20 findings.** 8 `path.join` path-traversal hits are build
  scripts and tests on trusted paths; 1 script-tag hit is the prerenderer, which already escapes
  `<` in the JSON-LD payload; 3 are `console.log` format-string warnings in Deno, where
  `console.log` does not do `%s` substitution. **No finding in auth, upload, payment or admin
  code.**
- **Dependencies.** `bun audit` — 0 vulnerabilities across 586 packages; the OSV API over the
  615 versions pinned in `bun.lock` — 0. `npm audit` cannot run (only `bun.lock` is committed;
  `ENOLOCK`), so the previous L-1 list of 14 advisories no longer reproduces.
- **Could not run:** Trivy (not installed, no Docker, no container/IaC target) and the OWASP ZAP
  baseline (no Docker; the deployed URL was excluded by the owner and production is paused
  behind Vercel SSO). Both are recorded as gaps, not passes.

## H-1 — any visitor could write into every admin's notifications (fixed)

**Evidence.** `public.notify_admins_of_sensitive_event(text, text, text, text)` was
`SECURITY DEFINER` with `has_function_privilege('anon', …) = true` and an ACL of
`=X/postgres | anon=X … | authenticated=X …`. Its body inserted into
`public.notifications` for every row of `user_roles` where `role = 'admin'`, building the
`title` and `message` from its four arguments. It never looked at `auth.uid()` and had no
role check of any kind.

**Impact.** With only the publishable key — which every browser receives by design — an
unauthenticated stranger could insert arbitrary text into the notification centre of every
administrator. That is notification spam at minimum and a credible spear-phishing surface at
worst: the message appears inside the admin UI, addressed to the owner, and its wording was
entirely attacker-chosen. One request also fans out to one row per admin, so it doubles as a
write amplifier.

**Fix.** `20261029210000_security_hardening_anon_rpcs.sql` revokes `PUBLIC`, `anon` and
`authenticated` and grants `service_role`. This does not disturb the audit trail: the only
caller is `public.write_admin_audit_log`, which is itself `SECURITY DEFINER`, and inside a
definer function the `EXECUTE` check is made as that function's owner.

## H-2 — every parent could read every profile, emails included (fixed)

**Evidence.** `profiles` had three SELECT policies, and this one was OR'd in for all
comers:

```sql
create policy "Parents can view linked and findable students"
  on public.profiles for select using (i_am_parent());
```

`i_am_parent()` is a role test — it answers "is the caller a parent?" and says nothing about
*whose* row is being read. The policy's name promised "linked and findable"; the expression
implemented neither. `profiles` carries `full_name`, `username` and `email`.

**Impact.** Any parent account could `select * from profiles` and receive the whole estate:
name, handle and email address of every student, every other parent and the owner. That is a
mass PII / user-enumeration leak from an ordinary consumer account, and the emails are the
recovery channel for every account in the system.

**Fix.** The blanket policy is replaced by `Parents can view their linked students`, which
requires a matching row in `parent_student_links` for `auth.uid()`. The dashboard's link form
needed to find a child by exact email, which is why the wide policy existed, so that one
lookup moves server-side into `public.lookup_student_for_linking(text)`: parent-only, `SECURITY
DEFINER`, matching on `lower(email) = lower(btrim(…))` — equality rather than `ILIKE`, because
an email local part may contain `_` and LIKE reads it as "any single character" — and
returning a row only when the target holds the `student` role.
`ParentDashboard.tsx` now calls that RPC instead of querying the table.

## M-1 — any student could drive a bulk delete of the audit log (fixed)

**Evidence.** `public.archive_old_audit_entries(integer)` is `SECURITY DEFINER`, was revoked
from `anon` on 29 Oct but left executable by `authenticated`, and contains no `auth.uid()`
reference and no role check. Its body moves rows older than 12 months out of
`admin_audit_log` into `admin_audit_log_archive` and then **deletes** them from the source
table, looping in batches.

**Impact.** A signed-in student could call it repeatedly with a large batch size. The fixed
12-month cutoff bounds what can be moved, so recent evidence survives — but the audit trail is
meant to be append-only for non-admins, and this is a bulk `DELETE` reachable from a student
session. It also hands an outsider a way to churn the table and its locks at will.

**Fix.** Same migration: `EXECUTE` is `service_role` only. It is a maintenance function with
no browser caller.

## M-2 — the content-health report skipped the second factor (fixed)

**Evidence.** `content_integrity_findings()` guarded itself with
`if not public.has_role(_uid, 'admin')`. Every other admin surface in this project asks
`public.is_admin(uid)`, which is role **and** `is_aal2()`.

**Impact.** An administrator signed in with a password alone (AAL1, no TOTP code) could read
the content-health report, which the project's own model says AAL1 must not reach. Low data
sensitivity — content metadata, not student PII — but it contradicts the invariant that makes a
stolen password insufficient for admin power, and an exception like this is how that invariant
erodes.

**Fix.** `20261029211000_content_integrity_aal2.sql` replaces the function (regenerated from
`pg_get_functiondef`, so the body is byte-identical apart from the guard) and now asks
`public.is_admin(_uid)`. A probe asserts both that `is_admin` is present and that bare
`has_role(_uid` is gone.

## Open items

### H-3 — the live project token (only you can close this)

A long-lived Supabase project access token (`sbp_…`) was pasted into a chat session and is
also stored in plaintext in `.freebuff/get-keys.cjs` (gitignored, but on disk).

**Impact.** A project token is account-level: it can read and write the database through the
Management API, read the service key, and deploy functions. It is the single most powerful
credential in this system.

**What to do.** Supabase Dashboard → Account → Access Tokens → revoke that token, then issue a
new one and **never put it in a chat**. Until it is revoked, treat every database change as
something the holder could also make. This is also why production should stay paused. It is not
in committed source (verified with Gitleaks over the full history), so this is a credential
rotation exercise, not a code change.

Step-by-step, with the verification commands: [`docs/security-credential-rotation.md`](docs/security-credential-rotation.md).

### M-3 — a live session credential is in git history

Gitleaks found a committed `palette-session.json` holding an `email`, a plaintext `password`,
an access token and a refresh token (4 findings: 2 `generic-api-key`, 2 `jwt`). The access token
**expired on 2026-10-24 20:11 UTC**, so the live risk is the refresh token and the password.

Containment, measured today: the file was committed in `923557f` and `c3e80a5` and removed in
`198a9d2`, all on the local ref **`refs/backups/daily`** only. It is not on `main`, not on
`origin/main`, and not on either Vercel branch — `git ls-remote origin` lists three heads and no
`refs/backups/*`. **The repository is not local-only as previously assumed** (`origin` is
`github.com/Nochills21/Clutch-Marks-`); it simply never received that ref, because only
`git push --mirror` would send a ref outside `refs/heads/`.

**What to do.** Rotate the account's password, force a global sign-out, delete the scratch
file, then drop the ref (or rewrite history in a throwaway clone). Exact commands, in order:
[`docs/security-credential-rotation.md`](docs/security-credential-rotation.md).

**Resolved, 30 October 2026.** `git filter-repo --invert-paths` was run in a **mirror clone**, so
the dirty working tree was never touched, and the cleaned refs were imported back. `.freebuff-tmp/
palette-session.json` was removed from all **284** rewritten commits across every ref — `main`, the
`recovery/ui-overlap-and-ai-quota-2026-10-14` branch and the 20-snapshot `refs/backups/daily`
chain — then reflogs were expired and `git gc --prune=now` run: `git fsck --unreachable` reports
**0** objects, so no copy survives in the object database.

Verified afterwards: `git log --all -- '.freebuff-tmp/palette-session.json'` → **0 commits**, and a
full-history Gitleaks scan (`gitleaks git --log-opts=--all`) → **0** `role=authenticated` JWTs and
**0** `palette-session` findings (the only 3 that remain are the anon JWT, see M-4).

Two consequences worth knowing. `main` was rewritten (`072bcc9` → `958032c`), so **any existing
clone must be re-cloned**, not pulled — a `git pull` on the old history would merge the blobs
straight back. And the rewrite removes the token from history, not from whoever already read it:
**rotating the password and forcing a global sign-out is still the fix.** The pre-rewrite history
is kept as `.freebuff-tmp/pre-purge.bundle` (gitignored) purely as a rollback, and it **contains
the session file** — confirmed by cloning the bundle and scanning that clone (3 commits, 2
`role=authenticated` JWTs), because Gitleaks cannot read into a packfile. Delete it once the app
is confirmed working: `rm -f .freebuff-tmp/pre-purge.bundle`.

### M-4 — the anon JWT in committed build artifacts

61 of the 64 findings from the full-history scan are one key repeated: the Supabase **anon** JWT,
baked into `production/clutchmarks-frontend.html` (43), the old
`dist-single/assets/index-CiNaddSj.js` (6), the tracked `.env.production` (2) and copies across
commits. Decoding each distinct copy confirmed `role=anon` every time — no `service_role` key
is committed anywhere. This is genuinely low severity — the same key is served to
every browser that loads the site, and RLS is what protects the data — but build output should
never be committed. Rotating it is not required;
regenerating those artifacts from source, or removing them from the tree, is the clean fix.

**Resolved, 30 October 2026.** `production/` and `dist-single/` were removed from history in the
same rewrite (`git log --all -- production/ dist-single/` → **0 commits**) and are now gitignored,
so a rebuild cannot re-add them. What remains is deliberate: the same key in the tracked
`.env.production` (build-time config) and in `vercel.json`. Purging those would delete working
configuration to hide a key that is served to every browser on purpose — the fix for the anon key
giving away more than it should is RLS and the `anon` grant revocation, which is already done
(round 2, `20261030120000`), not history editing.

### L-1 — dependency advisories

`npm audit --omit=dev`: **0 critical, 9 high, 5 moderate** (14 total).

- `zod` (high) — the only one with a real exploit shape (memory exhaustion on adversarial
  input). Its fix is a breaking major bump, so it is a planned upgrade, not a patch.
- `postcss` (high) — build-time, so the exposure is the build environment, not the running SPA.
- The rest (`lodash`, `nanoid`, `minimatch`, `glob`, `brace-expansion`, `picomatch`,
  `source-map-js`, `fflate`, `postcss-selector-parser`, `react-router`, `react-router-dom`,
  `yaml`) are transitive or tooling advisories. Worth an update pass; none is a remote code path
  a student can reach.

### I-1 — `_seed_fixes`

A leftover seeder table with `SELECT/INSERT/UPDATE/DELETE` granted to `anon`, RLS enabled and
**no policies** — so it is unreachable, it just looks alarming in a grants listing. Dropping it
is a data deletion, so it was left alone rather than done unasked.

## Checked and found sound

These were reviewed by hand and needed no change; they are recorded so the next review does not
re-derive them.

- **RLS coverage.** Every table in `public` has RLS enabled (0 tables off), and no
  `anon`/`PUBLIC` policy grants a write with a `true` predicate. Every write policy is scoped
  by `auth.uid() = user_id`.
- **No correct answers to the browser.** `browse_questions`, `get_practice_questions`,
  `get_review_questions` and `get_student_questions` do not select `correct_option` — checked in
  the live function sources, not inferred from the client. Grading happens in `grade_quiz`.
- **Admin policies.** Every admin policy asks `is_admin(auth.uid())` or inlines the same
  role-plus-`is_aal2()` test. The five policies that mention `has_role` without `is_admin` are
  parent policies (`'parent'`), not admin ones — an apparent finding that did not survive
  reading the expressions.
- **XSS sinks.** All 13 `dangerouslySetInnerHTML` sites in `src/` and `frontend/src/` are
  either wrapped in `DOMPurify.sanitize` or fed by our own KaTeX/HTML builder, with KaTeX run
  with `trust` left off and the sanitizer applied *before* the maths pass. The one raw
  `innerHTML` (pdf export) and the chart primitive take no user input.
- **Edge-function gates.** Every function that writes with `service_role` has its own gate:
  `stripe-webhook` verifies the `Stripe-Signature` HMAC in constant time; `email-events`
  verifies the svix signature; `weekly-digest`, `welcome-email`, `feedback-alert` and
  `past-papers-harvest` require a shared secret header and **fail closed** when the secret is
  unset; `draft-content` checks the `service_role` claim; `manage-accounts` and
  `generate-questions` decode the gateway-verified token and refuse at AAL1 with
  `mfa_required`.
- **Secrets in source.** No `sbp_`, `sk_live_`/`rk_live_` or service-role key in committed
  code. The Gitleaks hits are the anon JWT (public by design) and the dev session file above.
- **`plans`.** Zero policies, but granted to `anon` — which reads as alarming and is correct:
  the only reader is the `billing` function under `service_role`, and the site's price copy
  comes from `frontend/src/lib/plans.generated.ts`.
- **Storage.** No `storage.objects` policy grants admin rights without `is_admin`.

## Verification performed

- `.freebuff/probe-security-hardening.cjs` — **24/24 pass**, covering both rounds plus the RLS,
  grant and write-policy invariants. It asserts against the catalog, so a future migration that
  re-grants `PUBLIC` `EXECUTE` or hands `anon` its write grants back fails it. Seven checks are
  new: anon write/TRUNCATE grants, authenticated TRUNCATE, `restore_content_revision`'s AAL2
  gate, the three self-tampering policies, the `past-papers` bucket read, the parent-link
  INSERT policy, and the `link_student_by_email` grant shape.
- Round-2 migration applied only after a `BEGIN … ROLLBACK` dry run, then every effect read back
  from the catalog: 0 anon write grants, 0 authenticated TRUNCATE, 50 anon SELECT grants kept,
  `restore_content_revision` no longer contains a raw `role = 'admin'`, the three policies gone,
  `link_student_by_email` anon=false / authenticated=true.
- `supabase/base.sql` regenerated (`golden-dump.cjs`, 57 tables / 73 functions / 148 policies)
  and re-smoke-tested — full file executes and rolls back cleanly.
- CSP verified in real Chrome with the shipped headers: 0 violations, 0 console errors on 5
  routes.
- `tsc --noEmit -p tsconfig.app.json` — clean.
- `vitest run` — 43 of 44 files pass. The one failure is
  `frontend/src/lib/authBootstrap.test.ts`, which needs a jsdom `localStorage`; this Node 26
  runtime exposes its own and the test file's environment does not override it. Pre-existing
  and unrelated to these changes.
- Both migrations were applied only after a `BEGIN … ROLLBACK` dry run, and the resulting
  grants and policy expressions were read back from `pg_catalog` afterwards.

## Files changed

Round 1 (29 Oct):

- `supabase/migrations/20261029210000_security_hardening_anon_rpcs.sql` — new.
- `supabase/migrations/20261029211000_content_integrity_aal2.sql` — new.
- `frontend/src/components/dashboards/ParentDashboard.tsx` — link form uses the RPC.
- `frontend/src/integrations/supabase/types.ts` — the RPC's signature.
- `.freebuff/probe-security-hardening.cjs` — new regression probe.

Round 2 (30 Oct):

- `supabase/migrations/20261030120000_security_hardening_r2.sql` — new: the grant revocation,
  the AAL2 fix, the three dropped policies plus the admin one, the bucket policy, and
  `link_student_by_email`.
- `vercel.json` — HSTS, Permissions-Policy, COOP and CSP.
- `frontend/src/components/dashboards/ParentDashboard.tsx` — linking is one RPC call.
- `frontend/src/integrations/supabase/types.ts` — `link_student_by_email` signature.
- `supabase/base.sql` — regenerated from the live schema.
- `.freebuff/probe-security-hardening.cjs` — 7 new checks.
- `.freebuff-tmp/palette-session.json` — deleted (see M-3).

History rewrite (30 Oct, later the same day):

- `.githooks/pre-commit` (new) + `.gitattributes` — the commit-time Gitleaks gate that stops the
  next leak, verified to block and to fail closed (see `docs/pre-commit-secret-scan.md`).
- `scripts/db-backup.cjs`, `scripts/db-restore.cjs`, `docs/database-backup-and-restore.md`,
  `.freebuff/probe-db-restore.cjs` — encrypted off-site dump plus a restore runbook, for the
  "someone deleted the content" case.
- Git history — `palette-session.json` removed from all 284 rewritten commits on every ref;
  `production/` and `dist-single/` removed as artifacts.
- `.gitignore` — `dist-single/`, so a rebuild cannot recommit the key-bearing bundle.

