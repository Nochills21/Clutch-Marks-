-- Reconcile migration: creates every object the app uses that the live database
-- was missing (the live DB was built by direct SQL application and never recorded
-- these migrations in supabase_migrations.schema_migrations).
-- Fully idempotent: safe on fresh and already-reconciled databases.

-- ============ 1. weekly_reports (AdminUsers + student dashboard) ============
CREATE TABLE IF NOT EXISTS public.weekly_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_user_id uuid NOT NULL,
  file_url text NOT NULL,
  file_name text NOT NULL,
  week_label text,
  uploaded_at timestamptz NOT NULL DEFAULT now(),
  uploaded_by uuid NOT NULL
);

ALTER TABLE public.weekly_reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage weekly reports" ON public.weekly_reports;
CREATE POLICY "Admins can manage weekly reports"
ON public.weekly_reports FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Students can view own reports" ON public.weekly_reports;
CREATE POLICY "Students can view own reports"
ON public.weekly_reports FOR SELECT
TO authenticated
USING (student_user_id = auth.uid());

DROP POLICY IF EXISTS "Parents can view linked student reports" ON public.weekly_reports;
CREATE POLICY "Parents can view linked student reports"
ON public.weekly_reports FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'parent'::app_role) AND is_linked_parent(auth.uid(), student_user_id));

-- ============ 2. Flashcards (Flashcards.tsx + AdminFlashcards) ============
CREATE TABLE IF NOT EXISTS public.flashcard_sets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id uuid,
  title text NOT NULL,
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.flashcard_sets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage flashcard_sets" ON public.flashcard_sets;
CREATE POLICY "Admins can manage flashcard_sets" ON public.flashcard_sets
  FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Authenticated can view flashcard_sets" ON public.flashcard_sets;
CREATE POLICY "Authenticated can view flashcard_sets" ON public.flashcard_sets
  FOR SELECT TO authenticated USING (true);

DROP TRIGGER IF EXISTS update_flashcard_sets_updated_at ON public.flashcard_sets;
CREATE TRIGGER update_flashcard_sets_updated_at
  BEFORE UPDATE ON public.flashcard_sets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TABLE IF NOT EXISTS public.flashcards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  set_id uuid NOT NULL REFERENCES public.flashcard_sets(id) ON DELETE CASCADE,
  front text NOT NULL,
  back text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage flashcards" ON public.flashcards;
CREATE POLICY "Admins can manage flashcards" ON public.flashcards
  FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Authenticated can view flashcards" ON public.flashcards;
CREATE POLICY "Authenticated can view flashcards" ON public.flashcards
  FOR SELECT TO authenticated USING (true);

-- Flashcard spaced-repetition progress
CREATE TABLE IF NOT EXISTS public.flashcard_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  flashcard_id uuid NOT NULL REFERENCES public.flashcards(id) ON DELETE CASCADE,
  ease_factor double precision NOT NULL DEFAULT 2.5,
  interval_days integer NOT NULL DEFAULT 1,
  repetitions integer NOT NULL DEFAULT 0,
  next_review_at timestamptz NOT NULL DEFAULT now(),
  last_reviewed_at timestamptz,
  UNIQUE (user_id, flashcard_id)
);

ALTER TABLE public.flashcard_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own flashcard_progress" ON public.flashcard_progress;
CREATE POLICY "Users can view own flashcard_progress" ON public.flashcard_progress
  FOR SELECT TO authenticated USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can insert own flashcard_progress" ON public.flashcard_progress;
CREATE POLICY "Users can insert own flashcard_progress" ON public.flashcard_progress
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own flashcard_progress" ON public.flashcard_progress;
CREATE POLICY "Users can update own flashcard_progress" ON public.flashcard_progress
  FOR UPDATE TO authenticated USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Admins can view all flashcard_progress" ON public.flashcard_progress;
CREATE POLICY "Admins can view all flashcard_progress" ON public.flashcard_progress
  FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- ============ 3. study_plans (StudyPlanner + TodaysTasks + study-planner fn) ============
CREATE TABLE IF NOT EXISTS public.study_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  start_date date,
  end_date date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.study_plans ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own study plans" ON public.study_plans;
CREATE POLICY "Users can view own study plans"
  ON public.study_plans FOR SELECT TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can insert own study plans" ON public.study_plans;
CREATE POLICY "Users can insert own study plans"
  ON public.study_plans FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own study plans" ON public.study_plans;
CREATE POLICY "Users can update own study plans"
  ON public.study_plans FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own study plans" ON public.study_plans;
CREATE POLICY "Users can delete own study plans"
  ON public.study_plans FOR DELETE TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Admins can view all study plans" ON public.study_plans;
CREATE POLICY "Admins can view all study plans"
  ON public.study_plans FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

DROP TRIGGER IF EXISTS set_study_plans_updated_at ON public.study_plans;
CREATE TRIGGER set_study_plans_updated_at
  BEFORE UPDATE ON public.study_plans
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============ 4. content_file_versions (admin upload history) ============
CREATE TABLE IF NOT EXISTS public.content_file_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type text NOT NULL,
  entity_id uuid NOT NULL,
  slot text NOT NULL DEFAULT 'file',
  bucket text NOT NULL,
  file_path text NOT NULL,
  file_name text NOT NULL,
  version integer NOT NULL DEFAULT 1,
  uploaded_by uuid NOT NULL DEFAULT auth.uid(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS content_file_versions_entity_idx
  ON public.content_file_versions (entity_type, entity_id, slot, version DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.content_file_versions TO authenticated;
GRANT ALL ON public.content_file_versions TO service_role;

ALTER TABLE public.content_file_versions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins manage content file versions" ON public.content_file_versions;
CREATE POLICY "Admins manage content file versions"
ON public.content_file_versions FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============ 5. Legacy columns still referenced by the app ============
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS zoom_url text;
ALTER TABLE public.homework_submissions ADD COLUMN IF NOT EXISTS correction_file_url text;
ALTER TABLE public.quiz_attempts ADD COLUMN IF NOT EXISTS correction_file_url text;

-- ============ 6. Helper RPCs the app calls ============
CREATE OR REPLACE FUNCTION public.get_practice_summary()
RETURNS TABLE(
  topic_id uuid,
  topic_name text,
  total_questions bigint,
  answered bigint,
  correct bigint,
  attempts bigint,
  last_attempt_at timestamptz
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
  WITH base AS (
    SELECT
      t.id AS topic_id,
      t.name AS topic_name,
      q.id AS question_id,
      pa.last_correct,
      pa.attempts_count,
      pa.last_attempt_at
    FROM public.topics t
    LEFT JOIN public.quizzes z ON z.topic_id = t.id AND z.is_published = true
    LEFT JOIN public.questions q ON q.quiz_id = z.id
    LEFT JOIN public.practice_attempts pa
      ON pa.question_id = q.id AND pa.user_id = auth.uid()
    WHERE auth.uid() IS NOT NULL
  )
  SELECT
    topic_id,
    topic_name,
    COUNT(question_id) FILTER (WHERE question_id IS NOT NULL) AS total_questions,
    COUNT(question_id) FILTER (WHERE last_attempt_at IS NOT NULL) AS answered,
    COUNT(question_id) FILTER (WHERE last_correct IS TRUE) AS correct,
    COALESCE(SUM(attempts_count), 0)::bigint AS attempts,
    MAX(last_attempt_at) AS last_attempt_at
  FROM base
  GROUP BY topic_id, topic_name
  ORDER BY topic_name;
$fn$;

REVOKE ALL ON FUNCTION public.get_practice_summary() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_practice_summary() TO authenticated;

-- ============ 7. protect_profile_identity_fields trigger ============
CREATE OR REPLACE FUNCTION public.protect_profile_identity_fields()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $fn$
DECLARE
  _identity_changed boolean;
  _is_service boolean;
BEGIN
  _identity_changed :=
       NEW.user_id  IS DISTINCT FROM OLD.user_id
    OR NEW.username IS DISTINCT FROM OLD.username
    OR NEW.email    IS DISTINCT FROM OLD.email;

  IF NOT _identity_changed THEN
    RETURN NEW;
  END IF;

  _is_service := current_setting('request.jwt.claim.role', true) = 'service_role'
                 OR current_setting('role', true) IN ('service_role', 'postgres')
                 OR session_user IN ('postgres', 'supabase_admin');

  IF _is_service THEN
    RETURN NEW;
  END IF;

  IF auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin') THEN
    RETURN NEW;
  END IF;

  IF NEW.user_id IS DISTINCT FROM OLD.user_id THEN
    RAISE EXCEPTION 'Only an administrator can change a profile owner';
  END IF;
  IF NEW.username IS DISTINCT FROM OLD.username THEN
    RAISE EXCEPTION 'Only an administrator can change your username';
  END IF;
  RAISE EXCEPTION 'Only an administrator can change your email';
END;
$fn$;

DROP TRIGGER IF EXISTS protect_profile_identity_fields ON public.profiles;
CREATE TRIGGER protect_profile_identity_fields
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.protect_profile_identity_fields();

-- ============ 8. quiz-files bucket (exam attachments + submissions) ============
INSERT INTO storage.buckets (id, name, public)
VALUES ('quiz-files', 'quiz-files', false)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Admins manage quiz files" ON storage.objects;
CREATE POLICY "Admins manage quiz files"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'quiz-files' AND has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'quiz-files' AND has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Approved users read quiz files" ON storage.objects;
CREATE POLICY "Approved users read quiz files"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'quiz-files' AND is_user_approved(auth.uid()));
