-- 1. Metadata columns for filtering
ALTER TABLE public.questions ADD COLUMN IF NOT EXISTS difficulty text NOT NULL DEFAULT 'medium';
ALTER TABLE public.quizzes ADD COLUMN IF NOT EXISTS exam_type text NOT NULL DEFAULT 'quiz';
ALTER TABLE public.quizzes ADD COLUMN IF NOT EXISTS is_ai_generated boolean NOT NULL DEFAULT false;

CREATE OR REPLACE FUNCTION public.validate_question_difficulty()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.difficulty NOT IN ('easy','medium','hard') THEN
    RAISE EXCEPTION 'difficulty must be easy, medium or hard';
  END IF;
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS validate_question_difficulty ON public.questions;
CREATE TRIGGER validate_question_difficulty BEFORE INSERT OR UPDATE ON public.questions
FOR EACH ROW EXECUTE FUNCTION public.validate_question_difficulty();

CREATE OR REPLACE FUNCTION public.validate_quiz_exam_type()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.exam_type NOT IN ('quiz','exam','mock','ai_bank') THEN
    RAISE EXCEPTION 'exam_type must be quiz, exam, mock or ai_bank';
  END IF;
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS validate_quiz_exam_type ON public.quizzes;
CREATE TRIGGER validate_quiz_exam_type BEFORE INSERT OR UPDATE ON public.quizzes
FOR EACH ROW EXECUTE FUNCTION public.validate_quiz_exam_type();

-- 2. Question bookmarks
CREATE TABLE IF NOT EXISTS public.question_bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  question_id uuid NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, question_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.question_bookmarks TO authenticated;
GRANT ALL ON public.question_bookmarks TO service_role;

ALTER TABLE public.question_bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved users manage own question bookmarks"
ON public.question_bookmarks FOR ALL TO authenticated
USING (user_id = auth.uid() AND public.is_user_approved(auth.uid()))
WITH CHECK (user_id = auth.uid() AND public.is_user_approved(auth.uid()));

CREATE POLICY "Admins view all question bookmarks"
ON public.question_bookmarks FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 3. Content file version history (admin only)
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

CREATE POLICY "Admins manage content file versions"
ON public.content_file_versions FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 4. Browse questions with filters + bookmark/attempt state
DROP FUNCTION IF EXISTS public.browse_questions(uuid, integer, integer);

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
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
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

REVOKE ALL ON FUNCTION public.browse_questions(uuid, uuid, text, text, text, integer, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.browse_questions(uuid, uuid, text, text, text, integer, integer) TO authenticated;

-- 5. Review questions (incorrect / bookmarked)
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
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
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

REVOKE ALL ON FUNCTION public.get_review_questions(uuid, text, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_review_questions(uuid, text, integer) TO authenticated;

-- 6. Per subject/level progress dashboard
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
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
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

REVOKE ALL ON FUNCTION public.get_subject_progress() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_subject_progress() TO authenticated;

-- Mark existing AI-generated sets
UPDATE public.quizzes
SET is_ai_generated = true, exam_type = 'ai_bank'
WHERE title ILIKE 'AI Practice%' OR description ILIKE 'AI-generated%';