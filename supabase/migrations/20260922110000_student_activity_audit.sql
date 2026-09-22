-- Student activity in the audit trail: quiz attempts and homework submissions are
-- recorded as read-only activity events. Logging happens in AFTER INSERT triggers
-- (not client code) so it is tamper-proof: it fires no matter how the row is
-- written, and students have no INSERT policy on admin_audit_log, so they cannot
-- forge or erase entries. Entries are viewable by approved admins only (existing RLS).

-- 1. Widen the action whitelist (table CHECK + audit RPC's own whitelist).
ALTER TABLE public.admin_audit_log
  DROP CONSTRAINT IF EXISTS admin_audit_log_action_check;

ALTER TABLE public.admin_audit_log
  ADD CONSTRAINT admin_audit_log_action_check
  CHECK (action = ANY (ARRAY[
    'create'::text, 'update'::text, 'delete'::text, 'approve'::text,
    'reject'::text, 'role_change'::text, 'login'::text, 'download'::text,
    'quiz_attempt'::text, 'homework_submission'::text
  ]));

-- 2. Trigger-guarded logger. SECURITY DEFINER so student sessions (which have no
--    INSERT grant on admin_audit_log) still generate rows; identity comes from the
--    row itself, never from the calling session.
CREATE OR REPLACE FUNCTION public.log_student_activity()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_actor  text;
  v_label  text;
  v_action text;
  v_entity text;
  v_details jsonb;
BEGIN
  SELECT p.username INTO v_actor FROM public.profiles p WHERE p.user_id = NEW.user_id;

  IF TG_TABLE_NAME = 'quiz_attempts' THEN
    SELECT q.title INTO v_label FROM public.quizzes q WHERE q.id = NEW.quiz_id;
    v_action := 'quiz_attempt';
    v_entity := 'quiz_attempt';
    v_details := jsonb_build_object(
      'score', NEW.score,
      'total_questions', NEW.total_questions,
      'percentage', CASE WHEN NEW.total_questions > 0
                         THEN round((NEW.score::numeric / NEW.total_questions) * 100, 1)
                         ELSE NULL END,
      'completed_at', NEW.completed_at
    );
  ELSIF TG_TABLE_NAME = 'homework_submissions' THEN
    SELECT h.title INTO v_label FROM public.homework h WHERE h.id = NEW.homework_id;
    v_action := 'homework_submission';
    v_entity := 'homework_submission';
    v_details := jsonb_build_object(
      'status', NEW.status,
      'has_file', (NEW.file_url IS NOT NULL),
      'submitted_at', NEW.submitted_at
    );
  END IF;

  INSERT INTO public.admin_audit_log (actor_id, actor_username, action, entity, entity_id, entity_label, details)
  VALUES (
    NEW.user_id,
    COALESCE(v_actor, 'unknown'),
    v_action,
    v_entity,
    NEW.id,
    COALESCE(v_label, NEW.id::text),
    v_details
  );

  RETURN NEW;
END;
$$;

-- 3. Fire on every insert, no matter the writer.
DROP TRIGGER IF EXISTS trg_log_quiz_attempts ON public.quiz_attempts;
CREATE TRIGGER trg_log_quiz_attempts
AFTER INSERT ON public.quiz_attempts
FOR EACH ROW EXECUTE FUNCTION public.log_student_activity();

DROP TRIGGER IF EXISTS trg_log_homework_submissions ON public.homework_submissions;
CREATE TRIGGER trg_log_homework_submissions
AFTER INSERT ON public.homework_submissions
FOR EACH ROW EXECUTE FUNCTION public.log_student_activity();
