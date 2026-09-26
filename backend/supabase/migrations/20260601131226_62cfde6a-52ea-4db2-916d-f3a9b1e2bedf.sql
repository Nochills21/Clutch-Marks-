
CREATE OR REPLACE FUNCTION public.get_student_questions(_quiz_id uuid)
 RETURNS TABLE(id uuid, quiz_id uuid, question_text text, options jsonb, sort_order integer)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT q.id, q.quiz_id, q.question_text, q.options, q.sort_order
  FROM public.questions q
  WHERE q.quiz_id = _quiz_id
    AND public.is_user_approved(auth.uid())
  ORDER BY q.sort_order;
$function$;

CREATE OR REPLACE FUNCTION public.get_practice_questions(_topic_id uuid, _limit integer DEFAULT 10)
 RETURNS TABLE(id uuid, quiz_id uuid, question_text text, options jsonb)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT q.id, q.quiz_id, q.question_text, q.options
  FROM public.questions q
  JOIN public.quizzes z ON z.id = q.quiz_id
  WHERE z.is_published = true
    AND z.topic_id = _topic_id
    AND public.is_user_approved(auth.uid())
  ORDER BY random()
  LIMIT GREATEST(1, LEAST(_limit, 50));
$function$;

CREATE OR REPLACE FUNCTION public.browse_questions(_topic_id uuid, _limit integer DEFAULT 50, _offset integer DEFAULT 0)
 RETURNS TABLE(id uuid, quiz_id uuid, quiz_title text, question_text text, options jsonb)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT q.id, q.quiz_id, z.title, q.question_text, q.options
  FROM public.questions q
  JOIN public.quizzes z ON z.id = q.quiz_id
  WHERE z.is_published = true
    AND (_topic_id IS NULL OR z.topic_id = _topic_id)
    AND public.is_user_approved(auth.uid())
  ORDER BY z.title, q.sort_order
  LIMIT GREATEST(1, LEAST(_limit, 200))
  OFFSET GREATEST(0, _offset);
$function$;

CREATE OR REPLACE FUNCTION public.check_practice_answer(_question_id uuid, _selected integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
$function$;

CREATE OR REPLACE FUNCTION public.grade_quiz(_quiz_id uuid, _answers jsonb, _submission_file_url text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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

  RETURN jsonb_build_object(
    'correct', _correct,
    'total', _total,
    'results', _results
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_practice_summary()
 RETURNS TABLE(topic_id uuid, topic_name text, total_questions bigint, answered bigint, correct bigint, attempts bigint, last_attempt_at timestamp with time zone)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
    WHERE public.is_user_approved(auth.uid())
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
$function$;
