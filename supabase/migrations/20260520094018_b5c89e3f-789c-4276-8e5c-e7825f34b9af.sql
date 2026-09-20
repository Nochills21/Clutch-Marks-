
-- Helper: is the user signed-in and approved in any role
CREATE OR REPLACE FUNCTION public.is_user_approved(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND is_approved = true
  );
$$;

-- Tighten SELECT policies: require approval (admins still allowed via has_role)
DO $$
DECLARE
  t text;
BEGIN
  FOR t IN SELECT unnest(ARRAY[
    'lessons','topics','quizzes','homework','announcements',
    'study_materials','past_papers','flashcards','flashcard_sets'
  ])
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS "Anyone authenticated can view %1$s" ON public.%1$s', t);
    EXECUTE format('DROP POLICY IF EXISTS "Authenticated can view %1$s" ON public.%1$s', t);
  END LOOP;
END$$;

CREATE POLICY "Approved users can view lessons"
ON public.lessons FOR SELECT TO authenticated
USING (public.is_user_approved(auth.uid()) OR public.has_role(auth.uid(),'admin'));

CREATE POLICY "Approved users can view topics"
ON public.topics FOR SELECT TO authenticated
USING (public.is_user_approved(auth.uid()) OR public.has_role(auth.uid(),'admin'));

CREATE POLICY "Approved users can view quizzes"
ON public.quizzes FOR SELECT TO authenticated
USING ((is_published = true AND public.is_user_approved(auth.uid())) OR public.has_role(auth.uid(),'admin'));

CREATE POLICY "Approved users can view homework"
ON public.homework FOR SELECT TO authenticated
USING (public.is_user_approved(auth.uid()) OR public.has_role(auth.uid(),'admin'));

CREATE POLICY "Approved users can view announcements"
ON public.announcements FOR SELECT TO authenticated
USING (public.is_user_approved(auth.uid()) OR public.has_role(auth.uid(),'admin'));

CREATE POLICY "Approved users can view study_materials"
ON public.study_materials FOR SELECT TO authenticated
USING (public.is_user_approved(auth.uid()) OR public.has_role(auth.uid(),'admin'));

CREATE POLICY "Approved users can view past_papers"
ON public.past_papers FOR SELECT TO authenticated
USING (public.is_user_approved(auth.uid()) OR public.has_role(auth.uid(),'admin'));

CREATE POLICY "Approved users can view flashcards"
ON public.flashcards FOR SELECT TO authenticated
USING (public.is_user_approved(auth.uid()) OR public.has_role(auth.uid(),'admin'));

CREATE POLICY "Approved users can view flashcard_sets"
ON public.flashcard_sets FOR SELECT TO authenticated
USING (public.is_user_approved(auth.uid()) OR public.has_role(auth.uid(),'admin'));

-- Drop existing "Anyone authenticated can view quizzes" already replaced via loop
DROP POLICY IF EXISTS "Anyone authenticated can view published quizzes" ON public.quizzes;

-- Practice attempts table
CREATE TABLE IF NOT EXISTS public.practice_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  question_id uuid NOT NULL,
  last_correct boolean NOT NULL,
  attempts_count integer NOT NULL DEFAULT 1,
  last_attempt_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, question_id)
);

CREATE INDEX IF NOT EXISTS idx_practice_attempts_user ON public.practice_attempts(user_id);

ALTER TABLE public.practice_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own practice_attempts"
ON public.practice_attempts FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can insert own practice_attempts"
ON public.practice_attempts FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own practice_attempts"
ON public.practice_attempts FOR UPDATE TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Admins can view all practice_attempts"
ON public.practice_attempts FOR SELECT TO authenticated
USING (public.has_role(auth.uid(),'admin'));

-- Update check_practice_answer to also record progress
CREATE OR REPLACE FUNCTION public.check_practice_answer(_question_id uuid, _selected integer)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  _q record;
  _is_correct boolean;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  SELECT q.correct_option, q.explanation
    INTO _q
  FROM public.questions q
  JOIN public.quizzes z ON z.id = q.quiz_id
  WHERE q.id = _question_id AND z.is_published = true;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Question not found';
  END IF;

  _is_correct := _selected = _q.correct_option;

  INSERT INTO public.practice_attempts (user_id, question_id, last_correct, attempts_count, last_attempt_at)
  VALUES (auth.uid(), _question_id, _is_correct, 1, now())
  ON CONFLICT (user_id, question_id) DO UPDATE
    SET last_correct = EXCLUDED.last_correct,
        attempts_count = public.practice_attempts.attempts_count + 1,
        last_attempt_at = now();

  RETURN jsonb_build_object(
    'correct', _is_correct,
    'correct_option', _q.correct_option,
    'explanation', _q.explanation
  );
END;
$$;

-- Browse questions by topic, paginated, no answers leaked
CREATE OR REPLACE FUNCTION public.browse_questions(_topic_id uuid, _limit integer DEFAULT 50, _offset integer DEFAULT 0)
RETURNS TABLE(id uuid, quiz_id uuid, quiz_title text, question_text text, options jsonb)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT q.id, q.quiz_id, z.title, q.question_text, q.options
  FROM public.questions q
  JOIN public.quizzes z ON z.id = q.quiz_id
  WHERE z.is_published = true
    AND (_topic_id IS NULL OR z.topic_id = _topic_id)
    AND auth.uid() IS NOT NULL
  ORDER BY z.title, q.sort_order
  LIMIT GREATEST(1, LEAST(_limit, 200))
  OFFSET GREATEST(0, _offset);
$$;
