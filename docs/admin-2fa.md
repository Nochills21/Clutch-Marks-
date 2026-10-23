# Admin two-factor authentication (TOTP)

The admin console is guarded by a second factor. A password — however it was
obtained — signs in at **AAL1**, and an AAL1 session holds no admin authority: no
console data, no content writes, no account management. Only a session that has
verified a 6-digit TOTP code is **AAL2**, and only AAL2 passes the admin checks.

## How it works

- **GoTrue owns the factor.** Enrolment, challenge and verification go through
  `supabase.auth.mfa`; the secret lives in `auth.mfa_factors` and never touches
  our tables. The project already had `mfa_totp_enroll_enabled` and
  `mfa_totp_verify_enabled` on.
- **The database decides.** Migration `20261022180000` adds
  `public.request_aal()` (the `aal` claim of the request's access token),
  `public.is_aal2()`, and `public.is_admin(uid)` = *holds the admin role* **and**
  `is_aal2()`. Every admin policy and admin RPC was rewritten to ask
  `is_admin(...)`; the rewrite refuses to commit if any expression is left
  ungated, and both `public` and `storage` policies are covered (the content
  buckets were admin-writable too).
- **The client is the polite version of that rule.** `frontend/src/lib/mfa.ts` is
  the only place that talks to `supabase.auth.mfa`; `frontend/src/components/TwoFactor.tsx`
  renders the wall in front of `/admin`, the settings card and the login step.
  `AdminRoute` requires `aal === "aal2"` and shows the gate otherwise — it does
  not redirect, because an admin one code away from the console should see that,
  not a student view.
- **Edge functions check the claim themselves.** `manage-accounts` and
  `generate-questions` write with the service role, so they cannot rely on RLS;
  both decode the (gateway-verified) access token and refuse anything but `aal2`.

## Enrolling (the owner)

1. Sign in at `/auth` with the password.
2. Open `/admin` (or `/settings`) — the console shows **One more step** and the
   setup QR.
3. Scan it in an authenticator app (Google Authenticator, 1Password, Authy…) or
   type the key shown underneath, then enter the 6-digit code.
4. The console opens. The session stays AAL2 for its lifetime; a new sign-in asks
   for a code every time.

Signup, student pages and practice are unchanged: an AAL1 admin still browses the
site exactly as a student does. That is deliberate — it is what lets a locked-out
owner reach `/settings` to recover.

## If the authenticator is lost

There is no self-service bypass (by design: a bypass would be a password-only
path to the console). Recovery is SQL, and only the owner can run it:

1. Edit the email in `.freebuff/reset-admin-mfa.sql`.
2. Dry run: `node .freebuff/apply-sql-file.cjs .freebuff/reset-admin-mfa.sql`
3. Apply: append `--apply`.
4. Sign in with the password; the console now offers enrolment again.

Old sessions keep their `aal2` claim until their access token expires (30 minutes,
`jwt_exp=1800`) or the refresh token is revoked, so a factor removed this way does
not retroactively close a console tab that is already open.

## Verifying a change

`node .freebuff/probe-admin-mfa-live.cjs` creates a throwaway admin (SQL-granted,
student row and all), proves the AAL1 session cannot read admin data, run admin
RPCs, write content or call the admin edge functions, then enrols TOTP, generates
a real code, verifies it and repeats every call at AAL2. It never enrols the
owner's account and deletes its fixtures. 18 checks.

Related: `docs/learning-objectives.md` is unrelated, but the admin lockdown story
is in `AGENTS.md` under *Auth & security model* (`20261022150000`).
