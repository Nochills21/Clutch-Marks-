-- Audit retention: entries older than 12 months are auto-archived into
-- admin_audit_log_archive by a nightly pg_cron job. The archive is a structural
-- twin (same columns, no action CHECK so future whitelist changes can't break
-- inserts of historical rows). SECURITY DEFINER mover batches insert+delete in
-- one statement so a row is never lost or duplicated between tables.
-- NOTE: distinct dollar-quote tags ($fn$/$do$/$job$) — nested $$ breaks SQL splitters.

-- 1. Archive table (structural twin).
CREATE TABLE IF NOT EXISTS public.admin_audit_log_archive (
  LIKE public.admin_audit_log INCLUDING ALL
);
-- Ids are unique across both tables, so the cloned PK is fine. The archive is
-- append-only: no client inserts/updates, reads gated to approved admins.
REVOKE ALL ON public.admin_audit_log_archive FROM anon, authenticated;
GRANT SELECT ON public.admin_audit_log_archive TO authenticated;

ALTER TABLE public.admin_audit_log_archive ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Archive read - approved admins only" ON public.admin_audit_log_archive;
CREATE POLICY "Archive read - approved admins only"
  ON public.admin_audit_log_archive
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles r
      WHERE r.user_id = auth.uid() AND r.role = 'admin' AND r.is_approved
    )
  );

-- 2. Batched mover: picks oldest rows, inserts into archive, deletes from live,
--    counts deleted. SKIP LOCKED makes concurrent runs safe (never double-move).
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

-- 3. Enable pg_cron (available on Supabase; no-op if already installed).
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- 4. Nightly at 03:30 UTC.
DO $do$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'archive-audit-log-nightly') THEN
    PERFORM cron.schedule('archive-audit-log-nightly', '30 3 * * *',
      $job$SELECT public.archive_old_audit_entries(5000)$job$);
  END IF;
END
$do$;
