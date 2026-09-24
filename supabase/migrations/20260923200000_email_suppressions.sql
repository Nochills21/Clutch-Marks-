-- Email reputation protection: suppression list for bounced/complained
-- recipients, filled by Resend webhooks via the email-events edge function.
-- Every sender function checks this table before sending.

CREATE TABLE IF NOT EXISTS public.email_suppressions (
  email text PRIMARY KEY,
  reason text NOT NULL CHECK (reason IN ('bounce', 'complaint', 'admin')),
  detail text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.email_suppressions ENABLE ROW LEVEL SECURITY;

-- No client access at all: managed by the service role via edge functions and
-- viewed by admins through service-role-backed tooling. This also keeps the
-- list itself out of reach — it's a deliverability asset.
REVOKE ALL ON public.email_suppressions FROM anon, authenticated;

-- Admin read access for the audit trail (matches admin users' JWT claims).
CREATE POLICY "admins_view_suppressions"
ON public.email_suppressions FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles r
    WHERE r.user_id = auth.uid() AND r.role = 'admin'
  )
);
