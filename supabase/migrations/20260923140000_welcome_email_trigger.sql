-- Welcome email on signup: the auth trigger calls the welcome-email edge
-- function via pg_net (async, fire-and-forget — signup never waits on mail).
-- The endpoint is gated by a shared secret (private table -> function env).

CREATE EXTENSION IF NOT EXISTS pg_net;

CREATE SCHEMA IF NOT EXISTS private;
CREATE TABLE IF NOT EXISTS private.app_secrets (
  key text PRIMARY KEY,
  value text NOT NULL
);
ALTER TABLE private.app_secrets ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON private.app_secrets FROM anon, authenticated, service_role;

CREATE OR REPLACE FUNCTION public.send_welcome_email()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_role text;
  v_secret text;
BEGIN
  SELECT role INTO v_role FROM public.user_roles WHERE user_id = NEW.id;

  SELECT value INTO v_secret FROM private.app_secrets WHERE key = 'welcome_secret';

  IF v_secret IS NULL THEN
    RAISE WARNING 'welcome-email skipped: no secret configured';
    RETURN NEW;
  END IF;

  BEGIN
    PERFORM net.http_post(
      url := 'https://zzliiazovezhxbmfeqco.supabase.co/functions/v1/welcome-email',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'x-welcome-secret', v_secret
      ),
      body := jsonb_build_object(
        'recipient', jsonb_build_object(
          'email', NEW.email,
          'full_name', COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
          'role', v_role
        )
      ),
      timeout_milliseconds := 5000
    );
  EXCEPTION WHEN OTHERS THEN
    -- Email is best-effort; never block signup.
    RAISE WARNING 'welcome-email dispatch failed: %', SQLERRM;
  END;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_user_created_welcome_email ON auth.users;
CREATE TRIGGER on_user_created_welcome_email
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.send_welcome_email();
