-- Weekly parent digest: pg_cron job every Monday 07:00 UTC calls the
-- weekly-digest edge function via pg_net with the shared secret stored in
-- private.app_secrets (same pattern as the welcome-email trigger).
-- Idempotent: re-running replaces the schedule and keeps exactly one job.

CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- 1. Secret row (generated once, never rotated by re-runs)
INSERT INTO private.app_secrets (key, value)
SELECT 'weekly_digest_secret', encode(gen_random_bytes(32), 'hex')
WHERE NOT EXISTS (SELECT 1 FROM private.app_secrets WHERE key = 'weekly_digest_secret');

-- 2. Cron job: Mondays 07:00 UTC -> weekly-digest function
DO $$
DECLARE
  v_secret text;
  v_job    bigint;
BEGIN
  SELECT value INTO v_secret FROM private.app_secrets WHERE key = 'weekly_digest_secret';
  IF v_secret IS NULL THEN
    RAISE EXCEPTION 'weekly_digest_secret missing from private.app_secrets';
  END IF;

  -- Replace any earlier version of this job
  FOR v_job IN SELECT jobid FROM cron.job WHERE jobname = 'weekly-parent-digest' LOOP
    PERFORM cron.unschedule(v_job);
  END LOOP;

  PERFORM cron.schedule(
    'weekly-parent-digest',
    '0 7 * * 1',
    format(
      'SELECT net.http_post(' ||
      'url := %L, ' ||
      'headers := jsonb_build_object(''Content-Type'',''application/json'',''x-digest-secret'', %L), ' ||
      'body := ''{}''::jsonb);',
      'https://zzliiazovezhxbmfeqco.supabase.co/functions/v1/weekly-digest',
      v_secret
    )
  );
END $$;
