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
AS $$
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
$$;

REVOKE EXECUTE ON FUNCTION public.get_practice_summary() FROM anon, public;
GRANT EXECUTE ON FUNCTION public.get_practice_summary() TO authenticated;