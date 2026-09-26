-- Feedback chat: every content_feedback row becomes a thread. The reporter and
-- admins exchange messages in-app (FeedbackPage for students, AdminFeedback for
-- admins). RLS: participants only — the reporter sees their own thread, admins
-- see all. Admin replies additionally drop a notification for the reporter.

CREATE TABLE IF NOT EXISTS public.feedback_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  feedback_id uuid NOT NULL REFERENCES public.content_feedback(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  body text NOT NULL CHECK (char_length(body) BETWEEN 1 AND 4000),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_feedback_messages_thread
  ON public.feedback_messages (feedback_id, created_at);

ALTER TABLE public.feedback_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Thread participants read messages" ON public.feedback_messages;
CREATE POLICY "Thread participants read messages" ON public.feedback_messages
  FOR SELECT TO authenticated
  USING (
    sender_id = auth.uid()
    OR public.has_role(auth.uid(), 'admin')
    OR EXISTS (
      SELECT 1 FROM public.content_feedback f
      WHERE f.id = feedback_id AND f.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users post to their own thread" ON public.feedback_messages;
CREATE POLICY "Users post to their own thread" ON public.feedback_messages
  FOR INSERT TO authenticated
  WITH CHECK (
    sender_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.content_feedback f
      WHERE f.id = feedback_id AND f.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Admins post to any thread" ON public.feedback_messages;
CREATE POLICY "Admins post to any thread" ON public.feedback_messages
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Notify the reporter when an admin replies to their feedback thread.
CREATE OR REPLACE FUNCTION public.notify_feedback_reply()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_reporter uuid;
  v_title   text;
BEGIN
  SELECT f.user_id, f.tool_label INTO v_reporter, v_title
  FROM public.content_feedback f
  WHERE f.id = NEW.feedback_id;

  IF v_reporter IS NOT NULL AND NEW.sender_id <> v_reporter THEN
    INSERT INTO public.notifications (user_id, title, message)
    VALUES (
      v_reporter,
      'New reply on your feedback',
      COALESCE(NULLIF(v_title, ''), 'Your report') || ' — the team replied to you.'
    );
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_feedback_reply_notify ON public.feedback_messages;
CREATE TRIGGER on_feedback_reply_notify
AFTER INSERT ON public.feedback_messages
FOR EACH ROW EXECUTE FUNCTION public.notify_feedback_reply();
