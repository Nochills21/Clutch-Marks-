-- [1] login_lookup_throttle table (needed by resolve-login-email rate limiter)
CREATE TABLE IF NOT EXISTS public.login_lookup_throttle (
  client_key text PRIMARY KEY,
  window_started_at timestamptz NOT NULL DEFAULT now(),
  attempts integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.login_lookup_throttle TO service_role;
ALTER TABLE public.login_lookup_throttle ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "No client access to login throttle" ON public.login_lookup_throttle;
CREATE POLICY "No client access to login throttle"
ON public.login_lookup_throttle FOR ALL
TO authenticated
USING (false) WITH CHECK (false);
@@STATEMENT@@
-- [2] register_login_lookup RPC (service-role only; used by resolve-login-email)
CREATE OR REPLACE FUNCTION public.register_login_lookup(_client_key text, _max integer DEFAULT 10, _window_seconds integer DEFAULT 60)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $fn$
DECLARE
  _attempts integer;
BEGIN
  INSERT INTO public.login_lookup_throttle (client_key, window_started_at, attempts, updated_at)
  VALUES (_client_key, now(), 1, now())
  ON CONFLICT (client_key) DO UPDATE
    SET attempts = CASE
          WHEN public.login_lookup_throttle.window_started_at < now() - make_interval(secs => _window_seconds)
          THEN 1
          ELSE public.login_lookup_throttle.attempts + 1
        END,
        window_started_at = CASE
          WHEN public.login_lookup_throttle.window_started_at < now() - make_interval(secs => _window_seconds)
          THEN now()
          ELSE public.login_lookup_throttle.window_started_at
        END,
        updated_at = now()
  RETURNING attempts INTO _attempts;

  DELETE FROM public.login_lookup_throttle
  WHERE updated_at < now() - interval '1 hour';

  RETURN _attempts > _max;
END;
$fn$;
REVOKE ALL ON FUNCTION public.register_login_lookup(text, integer, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.register_login_lookup(text, integer, integer) TO service_role;
@@STATEMENT@@
-- [3] Tighten user_roles: RLS is the real gate, but strip dangerous table grants
-- (TRUNCATE bypasses RLS; INSERT/UPDATE/DELETE should never be grantable to anon)
REVOKE TRUNCATE ON public.user_roles FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.user_roles FROM anon;
@@STATEMENT@@
-- [4] Defense in depth: trigger that blocks any user_roles write executed in a
-- non-service-role session, except by users who are THEMSELVES admins+approved.
CREATE OR REPLACE FUNCTION public.enforce_user_roles_writer()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $fn$
BEGIN
  IF current_user IN ('service_role', 'postgres') THEN
    RETURN COALESCE(NEW, OLD);
  END IF;
  IF EXISTS (
    SELECT 1 FROM public.user_roles r
    WHERE r.user_id = auth.uid() AND r.role = 'admin' AND r.is_approved = true
  ) THEN
    RETURN COALESCE(NEW, OLD);
  END IF;
  RAISE EXCEPTION 'Only approved admins can modify user roles';
END;
$fn$;

DROP TRIGGER IF EXISTS user_roles_writer_guard ON public.user_roles;
CREATE TRIGGER user_roles_writer_guard
BEFORE INSERT OR UPDATE OR DELETE ON public.user_roles
FOR EACH ROW EXECUTE FUNCTION public.enforce_user_roles_writer();
@@STATEMENT@@
-- [5] study-materials bucket (private; used by AdminMaterials + Notes pages)
INSERT INTO storage.buckets (id, name, public)
VALUES ('study-materials', 'study-materials', false)
ON CONFLICT (id) DO NOTHING;
@@STATEMENT@@
-- [6] study-materials storage policies: admin-only manage, approved users read
DROP POLICY IF EXISTS "Admins manage study materials" ON storage.objects;
CREATE POLICY "Admins manage study materials"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'study-materials' AND has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'study-materials' AND has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Approved users read study materials" ON storage.objects;
CREATE POLICY "Approved users read study materials"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'study-materials' AND is_user_approved(auth.uid()));
