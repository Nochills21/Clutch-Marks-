CREATE TABLE IF NOT EXISTS public.login_lookup_throttle (
  client_key text PRIMARY KEY,
  window_started_at timestamptz NOT NULL DEFAULT now(),
  attempts integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.login_lookup_throttle TO service_role;

ALTER TABLE public.login_lookup_throttle ENABLE ROW LEVEL SECURITY;

CREATE POLICY "No client access to login throttle"
ON public.login_lookup_throttle FOR ALL
TO authenticated
USING (false) WITH CHECK (false);

CREATE OR REPLACE FUNCTION public.register_login_lookup(_client_key text, _max integer DEFAULT 10, _window_seconds integer DEFAULT 60)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;

REVOKE EXECUTE ON FUNCTION public.register_login_lookup(text, integer, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.register_login_lookup(text, integer, integer) TO service_role;