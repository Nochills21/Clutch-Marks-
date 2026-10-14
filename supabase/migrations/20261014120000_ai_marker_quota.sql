-- AI marker quota visibility.
--
-- Gemini's free-tier daily limit is per project and not published per model, so
-- the console cannot read it. What it can show is what this project actually
-- did: how many papers were marked today and how many requests Gemini refused
-- with a 429. ai-correction now writes a 'quota_exhausted' audit row for each
-- refusal; this RPC counts both kinds of row for the current quota day.
--
-- 1. Widen the audit action CHECK. Same rule as 20261008140000: a new action
--    migrates the constraint in the same change, or every insert fails silently.
alter table public.ai_audit_log drop constraint if exists "ai_audit_log_action_check";
alter table public.ai_audit_log add constraint "ai_audit_log_action_check"
  check (action = any (array['plan'::text, 'correction'::text, 'paper_correction'::text, 'quota_exhausted'::text]));

-- 2. Admin-gated counts. Gemini resets its daily quota at midnight Pacific time
--    (https://ai.google.dev/gemini-api/docs/rate-limits), so the window starts
--    there rather than at UTC midnight.
create or replace function public.ai_marker_quota_today()
returns table (
  marked_today      integer,
  refusals_today    integer,
  last_refusal_at   timestamptz,
  window_start      timestamptz
)
language plpgsql
security definer
stable
set search_path to 'public'
as $$
declare
  _uid uuid := auth.uid();
  _start timestamptz;
begin
  if _uid is null then raise exception 'Not authenticated'; end if;
  if not public.has_role(_uid, 'admin') then raise exception 'Admin only'; end if;

  _start := date_trunc('day', now() at time zone 'America/Los_Angeles') at time zone 'America/Los_Angeles';

  return query
  select
    (select count(*)::integer from public.ai_audit_log a
      where a.action = 'paper_correction' and a.provider = 'gemini' and a.created_at >= _start),
    (select count(*)::integer from public.ai_audit_log a
      where a.action = 'quota_exhausted' and a.provider = 'gemini' and a.created_at >= _start),
    (select max(a.created_at) from public.ai_audit_log a
      where a.action = 'quota_exhausted' and a.provider = 'gemini' and a.created_at >= _start),
    _start;
end;
$$;

-- Admins only, gate inside the body (same pattern as content_integrity_findings).
revoke all on function public.ai_marker_quota_today() from public, anon;
grant execute on function public.ai_marker_quota_today() to authenticated;
