-- Lock down the SECURITY DEFINER functions an anonymous caller could reach.
--
-- Supabase's security advisor (lint 0028) lists 26 public functions as
-- `anon`-executable SECURITY DEFINER. That count overstates the surface: most of
-- them `RETURN trigger`, and PostgREST cannot invoke a trigger function, so they
-- are flagged but harmless. Three are plain callables with **no caller check**
-- and they are the real finding:
--
--   archive_old_audit_entries(int)  moves audit rows older than 12 months into
--                                   admin_audit_log_archive. Maintenance DML:
--                                   anon cannot even SELECT the audit log
--                                   (has_table_privilege = false), so an
--                                   unauthenticated caller has no business
--                                   triggering the archive either.
--   get_profile_id(uuid)            maps any auth uid to its profile id, i.e.
--                                   "does this account exist" for anyone holding
--                                   the public anon key.
--   rls_auto_enable()               an event-trigger helper; only the owner
--                                   should run it.
--
-- EXECUTE is revoked from `anon` only. `authenticated` keeps it, so nothing the
-- signed-in app does changes, and `service_role` bypasses function privileges so
-- the edge functions and cron are untouched.
--
-- Deliberately NOT revoked, and why:
--   · has_role / is_admin / is_linked_parent — reached from RLS policy
--     expressions on parent-facing tables. Revoking from anon turns "no rows"
--     into "permission denied for function" for any anonymous query against
--     those tables, which is a worse failure than the (minor) role probing they
--     allow. is_admin itself already requires the admin role *and* AAL2.
--   · browse_questions / restore_content_revision / record_paper_attempt /
--     approve_/dismiss_paper_candidate / resolve_paper_link — each checks
--     auth.uid() or is_admin() in its body, so anon gets an error, not data.

-- `revoke ... from anon` alone does NOT close this: Postgres grants EXECUTE on a
-- new function to PUBLIC, and anon keeps the privilege through that grant.
-- Measured live: after the anon-only revoke, has_function_privilege('anon', …)
-- still answered true. The grant that matters is PUBLIC, so revoke that and
-- re-grant to the roles that should keep it.
revoke execute on function public.archive_old_audit_entries(integer) from public;
revoke execute on function public.get_profile_id(uuid) from public;
revoke execute on function public.rls_auto_enable() from public;

-- Signed-in users and the service role keep the RPCs they already had. The
-- owner (postgres) always retains EXECUTE, which is what the pg_cron job and the
-- event trigger run as.
grant execute on function public.archive_old_audit_entries(integer) to authenticated, service_role;
grant execute on function public.get_profile_id(uuid) to authenticated, service_role;
grant execute on function public.rls_auto_enable() to service_role;

-- Advisor lint 0011: a definer function that resolves an unqualified name
-- through the caller's search_path can be pointed at a shadowing schema. These
-- three had no `search_path` at all (the other flagged one already did).
alter function public.topics_set_slug() set search_path = public, pg_temp;
alter function public.slugify_topic_name(text) set search_path = public, pg_temp;
alter function public.objective_review_interval(integer) set search_path = public, pg_temp;
