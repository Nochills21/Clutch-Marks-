CREATE OR REPLACE FUNCTION public.archive_old_audit_entries(p_batch integer DEFAULT 5000)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $fn$
DECLARE
  v_cutoff timestamptz := now() - interval '12 months';
  v_moved  integer := 0;
  v_chunk  integer;
BEGIN
  LOOP
    WITH picked AS (
      SELECT id FROM public.admin_audit_log
      WHERE created_at < v_cutoff
      ORDER BY created_at
      FOR UPDATE SKIP LOCKED
      LIMIT p_batch
    ),
    ins AS (
      INSERT INTO public.admin_audit_log_archive
      SELECT l.* FROM public.admin_audit_log l JOIN picked USING (id)
      RETURNING 1
    ),
    del AS (
      DELETE FROM public.admin_audit_log l USING picked WHERE l.id = picked.id
      RETURNING 1
    )
    SELECT count(*) INTO v_chunk FROM del;

    v_moved := v_moved + v_chunk;
    EXIT WHEN v_chunk < p_batch;
  END LOOP;
  RETURN v_moved;
END;
$fn$;

DO $do$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'archive-audit-log-nightly') THEN
    PERFORM cron.schedule('archive-audit-log-nightly', '30 3 * * *',
      $job$SELECT public.archive_old_audit_entries(5000)$job$);
  END IF;
END
$do$;
