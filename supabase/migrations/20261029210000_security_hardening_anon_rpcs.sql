-- Security hardening: close the anon-executable RPCs and the parent-wide
-- profile read. Applied 2026-10-29.
--
-- Three holes, each measured live before this file:
--
-- 1. public.notify_admins_of_sensitive_event(...) is SECURITY DEFINER with
--    EXECUTE to PUBLIC/anon/authenticated and no caller check. Any visitor
--    holding the publishable key could insert attacker-written text into the
--    notifications of every admin (spam / spear-phishing in the admin UI).
--    It is called only by public.write_admin_audit_log (a definer function
--    owned by postgres), so revoking PUBLIC leaves the audit trail working:
--    the EXECUTE check inside a definer function is made as its owner.
--
-- 2. public.archive_old_audit_entries(integer) is SECURITY DEFINER and was
--    revoked from anon by 20261029200000 but left executable by
--    `authenticated` with no caller check — any signed-in student could drive
--    a bulk DELETE of admin_audit_log into the archive table. It is a
--    maintenance function; service_role is the only caller it needs.
--
-- 3. public.profiles had SELECT for parents gated only by i_am_parent(), which
--    is a role test and says nothing about *whose* row. Any parent account
--    could read every profile in the estate: full_name, username and email.
--    The dashboard needs two reads — its own linked children, and one exact
--    email lookup when linking a new child — so this replaces the blanket
--    policy with a linked-only policy plus a parent-only RPC that performs
--    the single exact-match lookup (equality, not LIKE, so `_` cannot widen
--    it) and returns only a student.
--
-- Idempotent: safe to re-run. Each statement stands alone, because the
-- Management API runs one transaction per statement.

-- ── 1. notifications: service_role only ────────────────────────────────────
do $$
declare
  sig text;
begin
  for sig in
    select p.oid::regprocedure::text
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.proname = 'notify_admins_of_sensitive_event'
  loop
    execute format('revoke all on function %s from public', sig);
    execute format('revoke all on function %s from anon', sig);
    execute format('revoke all on function %s from authenticated', sig);
    execute format('grant execute on function %s to service_role', sig);
  end loop;
end $$;

-- ── 2. audit archiver: service_role only ───────────────────────────────────
do $$
declare
  sig text;
begin
  for sig in
    select p.oid::regprocedure::text
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.proname = 'archive_old_audit_entries'
  loop
    execute format('revoke all on function %s from public', sig);
    execute format('revoke all on function %s from anon', sig);
    execute format('revoke all on function %s from authenticated', sig);
    execute format('grant execute on function %s to service_role', sig);
  end loop;
end $$;

-- ── 3. profiles: only a parent's own linked children ───────────────────────
drop policy if exists "Parents can view linked and findable students" on public.profiles;
drop policy if exists "Parents can view their linked students" on public.profiles;
create policy "Parents can view their linked students"
  on public.profiles
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.parent_student_links l
      where l.parent_id = auth.uid()
        and l.student_id = profiles.user_id
    )
  );

-- ── 4. the one lookup the link form legitimately needs ─────────────────────
create or replace function public.lookup_student_for_linking(p_email text)
returns table (user_id uuid, full_name text)
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;
  -- A parent, not an admin: this is the dashboard's own form. Admins read
  -- profiles through their own policy and never need this.
  if not public.has_role(auth.uid(), 'parent') then
    raise exception 'Parent only';
  end if;
  if coalesce(btrim(p_email), '') = '' then
    return;
  end if;

  -- Equality on lower(), not ILIKE: an email local part may contain `_`, which
  -- SQL LIKE reads as "any single character". Exact match also means the caller
  -- learns nothing unless they already know the whole address.
  return query
    select p.user_id, p.full_name
    from public.profiles p
    where lower(p.email) = lower(btrim(p_email))
      and exists (
        select 1 from public.user_roles r
        where r.user_id = p.user_id and r.role = 'student'
      )
    limit 1;
end;
$$;

revoke all on function public.lookup_student_for_linking(text) from public;
revoke all on function public.lookup_student_for_linking(text) from anon;
grant execute on function public.lookup_student_for_linking(text) to authenticated;
