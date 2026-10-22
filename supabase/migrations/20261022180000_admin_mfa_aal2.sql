-- Admin authority requires a verified second factor, not just a password.
--
-- Why: /admin is only as strong as the session that reaches it. A stolen password
-- signs in at AAL1, and every admin RLS policy opened for that session — the
-- console's reads, its content writes, and the storage buckets holding the PDFs
-- and lesson resources. TOTP itself needs no schema change (GoTrue owns
-- auth.mfa_factors and both `mfa_totp_enroll_enabled` and
-- `mfa_totp_verify_enabled` are already on for this project); what was missing is
-- the server-side consequence of a verified factor.
--
-- So this migration moves *admin authority* behind AAL2 while leaving an AAL1
-- admin exactly as capable as a student: their own rows, public content and the
-- practice flow still work, which is what lets the owner reach /settings to enroll
-- and means a lost phone cannot lock them out of the whole app.
--
-- The lever is deliberate: 67 admin policies plus 9 storage policies all spell the
-- admin test one of two ways — the `has_role(auth.uid(), 'admin')` helper, or an
-- inline `EXISTS (... user_roles ... role = 'admin')` — and both are rewritten to
-- require AAL2 below, with a check that refuses to commit if a single one is left
-- ungated. Functions that gate admin RPCs
-- are rewritten the same way; the three student-facing helpers that merely give an
-- admin an exemption (preview, quota, question reading) are left alone so an AAL1
-- owner still has a working site.
--
-- Recovery, if the enrolled device is lost: delete the factor from the database,
-- which is SQL-only (see .freebuff/reset-admin-mfa.sql and docs/admin-2fa.md).

-- ── helpers ─────────────────────────────────────────────────────────────────

-- The AAL of the request being served: GoTrue puts it in the access token, and
-- PostgREST exposes the token's claims as `request.jwt.claims`. A request with no
-- JWT (service role, SQL editor, a trigger fired by the auth server) is AAL1 by
-- definition — which is why admin authority is never granted from those paths.
create or replace function public.request_aal()
returns text
language sql
stable
set search_path to 'public'
as $function$
  select coalesce(
    nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'aal',
    'aal1'
  )
$function$;

comment on function public.request_aal() is
  'Authentication assurance level of the current request (aal1 or aal2), from the verified access token.';

create or replace function public.is_aal2()
returns boolean
language sql
stable
set search_path to 'public'
as $function$
  select public.request_aal() = 'aal2'
$function$;

comment on function public.is_aal2() is
  'True when the caller signed in with a second factor (a verified TOTP code) in this session.';

-- Admin *authority* — the thing every admin policy means — is membership plus a
-- second factor. Plain membership still has a name (`has_role`), used where the
-- question really is "does this user hold the role".
create or replace function public.is_admin(_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path to 'public'
as $function$
  select public.has_role(_user_id, 'admin'::app_role) and public.is_aal2()
$function$;

comment on function public.is_admin(uuid) is
  'Admin authority: holds the admin role AND the session has verified a second factor. Unchanged by approval.';

grant execute on function public.request_aal() to authenticated, anon;
grant execute on function public.is_aal2() to authenticated, anon;
grant execute on function public.is_admin(uuid) to authenticated, anon;

-- ── policies ────────────────────────────────────────────────────────────────
--
-- pg_get_expr renders a policy body canonically, so the four spellings below are
-- the complete set this database actually contains (verified: 58 policies use
-- has_role, 9 spell the test inline, 9 storage policies use has_role). Whitespace
-- is collapsed first so the literals match regardless of formatting; the
-- rewritten expression is exactly as strict as before, plus AAL2.
do $migration$
declare
  p record;
  q text;
  c text;
  changed int := 0;
  ungated int;
begin
  for p in
    select schemaname, tablename, policyname, qual, with_check
      from pg_policies
     where schemaname in ('public', 'storage')
       and (coalesce(qual, '') || coalesce(with_check, '')) ilike '%admin%'
  loop
    q := regexp_replace(coalesce(p.qual, ''), '\s+', ' ', 'g');
    c := regexp_replace(coalesce(p.with_check, ''), '\s+', ' ', 'g');

    q := replace(q, 'has_role(auth.uid(), ''admin''::app_role)', 'public.is_admin(auth.uid())');
    q := replace(q, '(r.role = ''admin''::app_role)', '(r.role = ''admin''::app_role AND public.is_aal2())');
    q := replace(q, '(ur.role = ''admin''::app_role)', '(ur.role = ''admin''::app_role AND public.is_aal2())');
    q := replace(q, '(user_roles.role = ''admin''::app_role)', '(user_roles.role = ''admin''::app_role AND public.is_aal2())');

    c := replace(c, 'has_role(auth.uid(), ''admin''::app_role)', 'public.is_admin(auth.uid())');
    c := replace(c, '(r.role = ''admin''::app_role)', '(r.role = ''admin''::app_role AND public.is_aal2())');
    c := replace(c, '(ur.role = ''admin''::app_role)', '(ur.role = ''admin''::app_role AND public.is_aal2())');
    c := replace(c, '(user_roles.role = ''admin''::app_role)', '(user_roles.role = ''admin''::app_role AND public.is_aal2())');

    if p.qual is not null and nullif(q, '') is not null
       and q is distinct from regexp_replace(p.qual, '\s+', ' ', 'g') then
      execute format('alter policy %I on %I.%I using (%s)', p.policyname, p.schemaname, p.tablename, q);
      changed := changed + 1;
    end if;
    if p.with_check is not null and nullif(c, '') is not null
       and c is distinct from regexp_replace(p.with_check, '\s+', ' ', 'g') then
      execute format('alter policy %I on %I.%I with check (%s)', p.policyname, p.schemaname, p.tablename, c);
      changed := changed + 1;
    end if;
  end loop;

  select count(*) into ungated
    from pg_policies
   where schemaname in ('public', 'storage')
     and (coalesce(qual, '') || coalesce(with_check, '')) ilike '%admin%'
     and (coalesce(qual, '') || coalesce(with_check, '')) not ilike '%is_admin(%'
     and (coalesce(qual, '') || coalesce(with_check, '')) not ilike '%is_aal2(%';
  if ungated > 0 then
    raise exception 'refusing to commit: % admin policy expression(s) still grant admin without AAL2', ungated;
  end if;

  raise notice 'admin policies rewritten: % expression(s) across % policy rows', changed, changed;
end;
$migration$;

-- ── admin RPCs ──────────────────────────────────────────────────────────────
--
-- These six functions decide for themselves whether the caller is an admin, so
-- rewriting the policies is not enough: a policy cannot gate a SECURITY DEFINER
-- RPC. Each one's body is rewritten in place so the check becomes authority at
-- AAL2 rather than mere membership.
do $migration$
declare
  f record;
  body text;
  patched int := 0;
begin
  for f in
    select p.oid, p.proname, pg_get_functiondef(p.oid) as def
      from pg_proc p
      join pg_namespace n on n.oid = p.pronamespace
     where n.nspname = 'public'
       and p.proname in (
         'approve_paper_candidate', 'dismiss_paper_candidate', 'resolve_paper_link',
         'content_integrity_findings', 'syllabus_coverage', 'protect_profile_identity_fields'
       )
  loop
    body := f.def;
    body := replace(body, 'public.has_role(_uid, ''admin'')', 'public.is_admin(_uid)');
    body := replace(body, 'public.has_role(auth.uid(), ''admin''::app_role)', 'public.is_admin(auth.uid())');
    if body is distinct from f.def then
      execute body;
      patched := patched + 1;
    end if;
    if body ilike '%has_role(_uid, ''admin'')%'
       or body ilike '%has_role(auth.uid(), ''admin''::app_role)%' then
      raise exception 'refusing to commit: % still asks for the admin role without AAL2', f.proname;
    end if;
  end loop;

  if patched <> 6 then
    raise exception 'refusing to commit: expected to gate 6 admin RPCs, rewrote %', patched;
  end if;
end;
$migration$;
