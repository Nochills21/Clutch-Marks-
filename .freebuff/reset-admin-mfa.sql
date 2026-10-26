-- Remove every TOTP factor from one account — the recovery path for a lost phone.
--
-- The admin console demands AAL2, and nothing in the app can bypass that (a bypass
-- would be a password-only door to the console). So recovery happens here, at the
-- database, and only whoever can run SQL against the project can do it.
--
-- 1. Put the account's email between the quotes below.
-- 2. Dry run: node .freebuff/apply-sql-file.cjs .freebuff/reset-admin-mfa.sql
-- 3. Apply:    node .freebuff/apply-sql-file.cjs .freebuff/reset-admin-mfa.sql --apply
-- 4. Sign in with the password. /admin offers enrolment again.
--
-- Access tokens already issued keep their aal2 claim until they expire (30 min),
-- so a console tab left open keeps working for that window.
delete from auth.mfa_factors f
 using public.profiles p
 where p.user_id = f.user_id
   and p.email = 'owner@example.invalid'
   and f.factor_type = 'totp';
