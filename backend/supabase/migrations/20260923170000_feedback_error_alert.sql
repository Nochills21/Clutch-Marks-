-- Admin email alert on error feedback: when a content_feedback row with
-- rating = 'error' is inserted, pg_net calls the feedback-alert edge function
-- (fire-and-forget — the student's submission never waits on mail).
-- The endpoint is gated by a shared secret stored in private.app_secrets.

CREATE EXTENSION IF NOT EXISTS pg_net;

CREATE OR REPLACE FUNCTION public.notify_admins_error_feedback()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_secret text;
BEGIN
  -- Only page admins for actual error reports.
  IF NEW.rating <> 'error' THEN
    RETURN NEW;
  END IF;

  SELECT value INTO v_secret FROM private.app_secrets WHERE key = 'feedback_alert_secret';

  IF v_secret IS NULL THEN
    RAISE WARNING 'feedback-alert skipped: no secret configured';
    RETURN NEW;
  END IF;

  BEGIN
    PERFORM net.http_post(
      url := 'https://zzliiazovezhxbmfeqco.supabase.co/functions/v1/feedback-alert',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'x-feedback-secret', v_secret
      ),
      body := jsonb_build_object('feedbackId', NEW.id),
      timeout_milliseconds := 5000
    );
  EXCEPTION WHEN OTHERS THEN
    -- Email is best-effort; never block the feedback insert.
    RAISE WARNING 'feedback-alert dispatch failed: %', SQLERRM;
  END;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_feedback_error_alert ON public.content_feedback;
CREATE TRIGGER on_feedback_error_alert
AFTER INSERT ON public.content_feedback
FOR EACH ROW
EXECUTE FUNCTION public.notify_admins_error_feedback();
