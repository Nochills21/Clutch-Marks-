-- Recurring past-paper link check: pg_cron job every Monday 06:00 UTC calls the
-- past-papers-harvest edge function via pg_net with the shared secret stored in
-- private.app_secrets (same pattern as the weekly parent digest).
--
-- The function re-verifies every archive link and re-harvests PMT index pages,
-- recording results in public.past_paper_link_checks. This migration only wires
-- up the schedule; the secret's value is mirrored into the function's
-- HARVEST_SECRET env var out of band (see docs/deploy.md).
--
-- Idempotent: re-running replaces the schedule and keeps exactly one job.

CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- 1. Secret row (generated once, never rotated by re-runs)
INSERT INTO private.app_secrets (key, value)
SELECT 'past_papers_harvest_secret', encode(gen_random_bytes(32), 'hex')
WHERE NOT EXISTS (SELECT 1 FROM private.app_secrets WHERE key = 'past_papers_harvest_secret');

-- 2. Cron job: Mondays 06:00 UTC -> past-papers-harvest function
DO $$
DECLARE
  v_secret text;
  v_job    bigint;
BEGIN
  SELECT value INTO v_secret FROM private.app_secrets WHERE key = 'past_papers_harvest_secret';
  IF v_secret IS NULL THEN
    RAISE EXCEPTION 'past_papers_harvest_secret missing from private.app_secrets';
  END IF;

  -- Replace any earlier version of this job
  FOR v_job IN SELECT jobid FROM cron.job WHERE jobname = 'past-papers-harvest' LOOP
    PERFORM cron.unschedule(v_job);
  END LOOP;

  PERFORM cron.schedule(
    'past-papers-harvest',
    '0 6 * * 1',
    format(
      'SELECT net.http_post(' ||
      'url := %L, ' ||
      'headers := jsonb_build_object(''Content-Type'',''application/json'',''x-harvest-secret'', %L), ' ||
      'body := ''{}''::jsonb);',
      'https://zzliiazovezhxbmfeqco.supabase.co/functions/v1/past-papers-harvest',
      v_secret
    )
  );
END $$;
