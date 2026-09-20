-- Quiz/question infrastructure repair — promoted from an operational hotfix.
--
-- The live database was originally built by direct SQL application, so most of
-- this repo's migrations were never recorded in supabase_migrations.schema_migrations.
-- This file collects the quiz/question objects the app calls (8 RPCs, 2 tables,
-- 4 columns) so a FRESH project gets them in the normal migration chain.
-- Fully idempotent: safe to re-run on a database that already has the objects.

-- Idempotent repair for missing quiz/question infrastructure.
-- Safe to re-run: CREATE TABLE IF NOT EXISTS / ADD COLUMN IF NOT EXISTS /
-- CREATE OR REPLACE FUNCTION / DROP POLICY IF EXISTS.

-- ============ 0. Helper (must exist before policies/functions below) ============
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

-- ============ 1. Missing columns ============
ALTER TABLE public.questions ADD COLUMN IF NOT EXISTS difficulty text NOT NULL DEFAULT 'medium';
ALTER TABLE public.quizzes ADD COLUMN IF NOT EXISTS exam_type text NOT NULL DEFAULT 'quiz';
ALTER TABLE public.quizzes ADD COLUMN IF NOT EXISTS is_ai_generated boolean NOT NULL DEFAULT false;
ALTER TABLE public.quiz_attempts ADD COLUMN IF NOT EXISTS submission_file_url text;

-- ============ 2. Missing tables ============
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

CREATE TABLE IF NOT EXISTS public.question_bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  question_id uuid NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, question_id)
);

CREATE INDEX IF NOT EXISTS idx_practice_attempts_user ON public.practice_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_question_bookmarks_user ON public.question_bookmarks(user_id);

ALTER TABLE public.practice_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_bookmarks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own practice_attempts" ON public.practice_attempts;
CREATE POLICY "Users can view own practice_attempts"
ON public.practice_attempts FOR SELECT TO authenticated
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can insert own practice_attempts" ON public.practice_attempts;
CREATE POLICY "Users can insert own practice_attempts"
ON public.practice_attempts FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own practice_attempts" ON public.practice_attempts;
CREATE POLICY "Users can update own practice_attempts"
ON public.practice_attempts FOR UPDATE TO authenticated
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Admins can view all practice_attempts" ON public.practice_attempts;
CREATE POLICY "Admins can view all practice_attempts"
ON public.practice_attempts FOR SELECT TO authenticated
USING (public.has_role(auth.uid(),'admin'));

DROP POLICY IF EXISTS "Approved users manage own question bookmarks" ON public.question_bookmarks;
CREATE POLICY "Approved users manage own question bookmarks"
ON public.question_bookmarks FOR ALL TO authenticated
USING (user_id = auth.uid() AND public.is_user_approved(auth.uid()))
WITH CHECK (user_id = auth.uid() AND public.is_user_approved(auth.uid()));

DROP POLICY IF EXISTS "Admins view all question bookmarks" ON public.question_bookmarks;
CREATE POLICY "Admins view all question bookmarks"
ON public.question_bookmarks FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- ============ 3. The 8 RPCs the app calls ============

-- 3a. Questions for a quiz (Quizzes page)
CREATE OR REPLACE FUNCTION public.get_student_questions(_quiz_id uuid)
RETURNS TABLE(id uuid, quiz_id uuid, question_text text, options jsonb, sort_order integer)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT q.id, q.quiz_id, q.question_text, q.options, q.sort_order
  FROM public.questions q
  WHERE q.quiz_id = _quiz_id
    AND public.is_user_approved(auth.uid())
  ORDER BY q.sort_order;
$$;

-- 3c. Random practice questions for a topic
CREATE OR REPLACE FUNCTION public.get_practice_questions(_topic_id uuid, _limit integer DEFAULT 10)
RETURNS TABLE(id uuid, quiz_id uuid, question_text text, options jsonb)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT q.id, q.quiz_id, q.question_text, q.options
  FROM public.questions q
  JOIN public.quizzes z ON z.id = q.quiz_id
  WHERE z.is_published = true
    AND z.topic_id = _topic_id
    AND public.is_user_approved(auth.uid())
  ORDER BY random()
  LIMIT GREATEST(1, LEAST(_limit, 50));
$$;

-- 3d. Browse questions with filters (Subject page + TopicQuiz page).
--     Matches the app call: _topic_id, _subject_level_id, _difficulty,
--     _exam_type, _search, _limit, _offset.
CREATE OR REPLACE FUNCTION public.browse_questions(
  _topic_id uuid DEFAULT NULL,
  _subject_level_id uuid DEFAULT NULL,
  _difficulty text DEFAULT NULL,
  _exam_type text DEFAULT NULL,
  _search text DEFAULT NULL,
  _limit integer DEFAULT 50,
  _offset integer DEFAULT 0
)
RETURNS TABLE(
  id uuid, quiz_id uuid, quiz_title text, question_text text, options jsonb,
  difficulty text, exam_type text, is_ai_generated boolean,
  topic_id uuid, topic_name text,
  bookmarked boolean, last_correct boolean, attempts_count integer
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT q.id, q.quiz_id, z.title, q.question_text, q.options,
         q.difficulty, z.exam_type, z.is_ai_generated,
         t.id, t.name,
         (qb.id IS NOT NULL), pa.last_correct, COALESCE(pa.attempts_count, 0)
  FROM public.questions q
  JOIN public.quizzes z ON z.id = q.quiz_id
  LEFT JOIN public.topics t ON t.id = z.topic_id
  LEFT JOIN public.question_bookmarks qb ON qb.question_id = q.id AND qb.user_id = auth.uid()
  LEFT JOIN public.practice_attempts pa ON pa.question_id = q.id AND pa.user_id = auth.uid()
  WHERE z.is_published = true
    AND (_topic_id IS NULL OR z.topic_id = _topic_id)
    AND (_subject_level_id IS NULL OR t.subject_level_id = _subject_level_id)
    AND (_difficulty IS NULL OR q.difficulty = _difficulty)
    AND (_exam_type IS NULL OR z.exam_type = _exam_type)
    AND (_search IS NULL OR _search = '' OR q.question_text ILIKE '%' || _search || '%' OR z.title ILIKE '%' || _search || '%')
    AND public.is_user_approved(auth.uid())
  ORDER BY z.title, q.sort_order
  LIMIT GREATEST(1, LEAST(_limit, 200))
  OFFSET GREATEST(0, _offset);
$$;

-- 3e. Grade a quiz submission (0-based correct_option; app sends 0-based indices)
CREATE OR REPLACE FUNCTION public.grade_quiz(_quiz_id uuid, _answers jsonb, _submission_file_url text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  _user_id uuid := auth.uid();
  _correct integer := 0;
  _total integer := 0;
  _q record;
  _selected integer;
  _results jsonb := '[]'::jsonb;
BEGIN
  IF _user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  IF NOT public.is_user_approved(_user_id) THEN
    RAISE EXCEPTION 'Account not approved';
  END IF;

  FOR _q IN
    SELECT q.id, q.correct_option, q.explanation, q.options
    FROM public.questions q
    WHERE q.quiz_id = _quiz_id
    ORDER BY q.sort_order
  LOOP
    _total := _total + 1;
    _selected := (_answers->>(_q.id::text))::integer;
    IF _selected = _q.correct_option THEN
      _correct := _correct + 1;
    END IF;
    _results := _results || jsonb_build_object(
      'question_id', _q.id,
      'selected', _selected,
      'correct_option', _q.correct_option,
      'explanation', _q.explanation,
      'options', _q.options
    );
  END LOOP;

  INSERT INTO public.quiz_attempts (user_id, quiz_id, score, total_questions, completed_at, submission_file_url, answers)
  VALUES (
    _user_id, _quiz_id, _correct, _total, now(), _submission_file_url,
    (SELECT jsonb_agg(jsonb_build_object('question_id', k, 'selected', (_answers->>k)::integer))
     FROM jsonb_object_keys(_answers) k)
  );

  RETURN jsonb_build_object('correct', _correct, 'total', _total, 'results', _results);
END;
$$;

-- 3f. Record a single practice answer (used by practice/revision flows)
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
  IF NOT public.is_user_approved(auth.uid()) THEN
    RAISE EXCEPTION 'Account not approved';
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

-- 3g. Review queue (incorrect / bookmarked questions)
CREATE OR REPLACE FUNCTION public.get_review_questions(
  _subject_level_id uuid DEFAULT NULL,
  _mode text DEFAULT 'incorrect',
  _limit integer DEFAULT 50
)
RETURNS TABLE(
  id uuid, quiz_id uuid, quiz_title text, question_text text, options jsonb,
  difficulty text, topic_id uuid, topic_name text,
  bookmarked boolean, last_correct boolean, attempts_count integer,
  last_attempt_at timestamptz
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT q.id, q.quiz_id, z.title, q.question_text, q.options,
         q.difficulty, t.id, t.name,
         (qb.id IS NOT NULL), pa.last_correct, COALESCE(pa.attempts_count, 0), pa.last_attempt_at
  FROM public.questions q
  JOIN public.quizzes z ON z.id = q.quiz_id
  LEFT JOIN public.topics t ON t.id = z.topic_id
  LEFT JOIN public.question_bookmarks qb ON qb.question_id = q.id AND qb.user_id = auth.uid()
  LEFT JOIN public.practice_attempts pa ON pa.question_id = q.id AND pa.user_id = auth.uid()
  WHERE z.is_published = true
    AND public.is_user_approved(auth.uid())
    AND (_subject_level_id IS NULL OR t.subject_level_id = _subject_level_id)
    AND (
      (_mode = 'bookmarked' AND qb.id IS NOT NULL)
      OR (_mode = 'incorrect' AND pa.id IS NOT NULL AND pa.last_correct = false)
      OR (_mode = 'all' AND (qb.id IS NOT NULL OR (pa.id IS NOT NULL AND pa.last_correct = false)))
    )
  ORDER BY pa.last_attempt_at DESC NULLS LAST, z.title, q.sort_order
  LIMIT GREATEST(1, LEAST(_limit, 200));
$$;

-- 3h. Per subject/level progress dashboard
CREATE OR REPLACE FUNCTION public.get_subject_progress()
RETURNS TABLE(
  subject_id uuid, subject_name text, subject_slug text, subject_icon text, subject_color text,
  subject_level_id uuid, level subject_level,
  topics_count bigint, lessons_total bigint, lessons_completed bigint,
  materials_total bigint, materials_bookmarked bigint,
  quiz_attempts bigint, quiz_avg_score numeric,
  ai_questions_total bigint, ai_questions_answered bigint, ai_questions_correct bigint,
  bookmarked_questions bigint, incorrect_questions bigint
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  WITH lv AS (
    SELECT sl.id AS level_id, sl.level, s.id AS s_id, s.name, s.slug, s.icon, s.color
    FROM public.subject_levels sl
    JOIN public.subjects s ON s.id = sl.subject_id
    WHERE sl.is_active = true AND s.is_active = true
  ),
  tp AS (SELECT t.id AS topic_id, t.subject_level_id FROM public.topics t WHERE t.subject_level_id IS NOT NULL),
  topic_counts AS (SELECT subject_level_id, COUNT(*) AS n FROM tp GROUP BY 1),
  les AS (
    SELECT tp.subject_level_id,
           COUNT(l.id) AS total,
           COUNT(lp.id) FILTER (WHERE lp.completed) AS done
    FROM tp JOIN public.lessons l ON l.topic_id = tp.topic_id
    LEFT JOIN public.lesson_progress lp ON lp.lesson_id = l.id AND lp.user_id = auth.uid()
    GROUP BY 1
  ),
  mat AS (
    SELECT tp.subject_level_id,
           COUNT(m.id) AS total,
           COUNT(b.id) AS saved
    FROM tp JOIN public.study_materials m ON m.topic_id = tp.topic_id
    LEFT JOIN public.bookmarks b ON b.material_id = m.id AND b.user_id = auth.uid()
    GROUP BY 1
  ),
  qz AS (
    SELECT tp.subject_level_id,
           COUNT(qa.id) AS attempts,
           ROUND(AVG(CASE WHEN qa.total_questions > 0 THEN qa.score::numeric / qa.total_questions * 100 END), 1) AS avg_score
    FROM tp JOIN public.quizzes z ON z.topic_id = tp.topic_id
    JOIN public.quiz_attempts qa ON qa.quiz_id = z.id AND qa.user_id = auth.uid()
    GROUP BY 1
  ),
  qs AS (
    SELECT tp.subject_level_id,
           COUNT(q.id) FILTER (WHERE z.is_ai_generated) AS ai_total,
           COUNT(pa.id) FILTER (WHERE z.is_ai_generated) AS ai_answered,
           COUNT(pa.id) FILTER (WHERE z.is_ai_generated AND pa.last_correct) AS ai_correct,
           COUNT(qb.id) AS saved_q,
           COUNT(pa.id) FILTER (WHERE pa.last_correct = false) AS wrong_q
    FROM tp
    JOIN public.quizzes z ON z.topic_id = tp.topic_id AND z.is_published = true
    JOIN public.questions q ON q.quiz_id = z.id
    LEFT JOIN public.practice_attempts pa ON pa.question_id = q.id AND pa.user_id = auth.uid()
    LEFT JOIN public.question_bookmarks qb ON qb.question_id = q.id AND qb.user_id = auth.uid()
    GROUP BY 1
  )
  SELECT lv.s_id, lv.name, lv.slug, lv.icon, lv.color, lv.level_id, lv.level,
         COALESCE(topic_counts.n, 0),
         COALESCE(les.total, 0), COALESCE(les.done, 0),
         COALESCE(mat.total, 0), COALESCE(mat.saved, 0),
         COALESCE(qz.attempts, 0), COALESCE(qz.avg_score, 0),
         COALESCE(qs.ai_total, 0), COALESCE(qs.ai_answered, 0), COALESCE(qs.ai_correct, 0),
         COALESCE(qs.saved_q, 0), COALESCE(qs.wrong_q, 0)
  FROM lv
  LEFT JOIN topic_counts ON topic_counts.subject_level_id = lv.level_id
  LEFT JOIN les ON les.subject_level_id = lv.level_id
  LEFT JOIN mat ON mat.subject_level_id = lv.level_id
  LEFT JOIN qz ON qz.subject_level_id = lv.level_id
  LEFT JOIN qs ON qs.subject_level_id = lv.level_id
  WHERE public.is_user_approved(auth.uid())
  ORDER BY lv.name, lv.level;
$$;

-- ============ 4. Grants: app calls these as authenticated ============
REVOKE ALL ON FUNCTION public.is_user_approved(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_user_approved(uuid) TO authenticated;
REVOKE ALL ON FUNCTION public.get_student_questions(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_student_questions(uuid) TO authenticated;
REVOKE ALL ON FUNCTION public.get_practice_questions(uuid, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_practice_questions(uuid, integer) TO authenticated;
REVOKE ALL ON FUNCTION public.browse_questions(uuid, uuid, text, text, text, integer, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.browse_questions(uuid, uuid, text, text, text, integer, integer) TO authenticated;
REVOKE ALL ON FUNCTION public.grade_quiz(uuid, jsonb, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.grade_quiz(uuid, jsonb, text) TO authenticated;
REVOKE ALL ON FUNCTION public.check_practice_answer(uuid, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.check_practice_answer(uuid, integer) TO authenticated;
REVOKE ALL ON FUNCTION public.get_review_questions(uuid, text, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_review_questions(uuid, text, integer) TO authenticated;
REVOKE ALL ON FUNCTION public.get_subject_progress() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_subject_progress() TO authenticated;
