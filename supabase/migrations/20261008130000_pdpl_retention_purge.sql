-- PDPL retention: keep what we say we keep, and when we say we keep it.
--
-- A retention table in a privacy notice is only true if something enforces it.
-- The audit log already archives itself after 12 months (see
-- 20260922120000_audit_retention.sql); these three tables had no bound at all,
-- and one of them (login_lookup_throttle) holds a client key for every failed
-- sign-in, growing forever.
--
-- Deliberately conservative: nothing here touches learning records, consent
-- records, parent links or payments. Deleting those is a decision an admin makes
-- in response to a request, not something a nightly job should guess at.
--
-- Idempotent: safe to re-run.

create or replace function public.purge_expired_personal_data()
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_throttle int := 0;
  v_notifications int := 0;
  v_requests int := 0;
begin
  -- Login throttling keys: only useful for the window they measure.
  delete from public.login_lookup_throttle
  where updated_at < now() - interval '30 days';
  get diagnostics v_throttle = row_count;

  -- Read notifications are a convenience log, not a record of anything.
  delete from public.notifications
  where read and created_at < now() - interval '180 days';
  get diagnostics v_notifications = row_count;

  -- Closed requests stay as a compliance record for two years, then go. Their
  -- email snapshot is the only personal data left in them.
  delete from public.data_requests
  where status in ('completed', 'refused')
    and coalesce(resolved_at, requested_at) < now() - interval '24 months';
  get diagnostics v_requests = row_count;

  return jsonb_build_object(
    'purged_at', now(),
    'login_throttle_rows', v_throttle,
    'notification_rows', v_notifications,
    'closed_request_rows', v_requests
  );
end;
$function$;

revoke all on function public.purge_expired_personal_data() from public, anon, authenticated;

-- Nightly, off the top of the hour so it never competes with the audit archive.
create extension if not exists pg_cron;

do $sched$
declare
  v_job record;
begin
  for v_job in select jobid from cron.job where jobname = 'purge-expired-personal-data' loop
    perform cron.unschedule(v_job.jobid);
  end loop;
  perform cron.schedule(
    'purge-expired-personal-data',
    '15 4 * * *',
    $cron$select public.purge_expired_personal_data();$cron$
  );
end
$sched$;
