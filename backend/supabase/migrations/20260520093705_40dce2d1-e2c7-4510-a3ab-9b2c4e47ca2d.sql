
DROP POLICY IF EXISTS "Authenticated can view questions for published quizzes" ON public.questions;

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
    AND auth.uid() IS NOT NULL
  ORDER BY random()
  LIMIT GREATEST(1, LEAST(_limit, 50));
$$;

CREATE OR REPLACE FUNCTION public.check_practice_answer(_question_id uuid, _selected integer)
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  _q record;
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

  RETURN jsonb_build_object(
    'correct', _selected = _q.correct_option,
    'correct_option', _q.correct_option,
    'explanation', _q.explanation
  );
END;
$$;

DROP POLICY IF EXISTS "Parents can view linked student profiles" ON public.profiles;
CREATE POLICY "Parents can view linked student profiles"
ON public.profiles FOR SELECT TO authenticated
USING (
  public.has_role(auth.uid(), 'parent'::app_role)
  AND public.is_linked_parent(auth.uid(), user_id)
);

DROP POLICY IF EXISTS "Users can access own quiz attempt files" ON storage.objects;
CREATE POLICY "Users can access own quiz attempt files"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'quiz-files'
  AND (
    EXISTS (
      SELECT 1 FROM public.quiz_attempts qa
      WHERE qa.user_id = auth.uid()
        AND (
          qa.submission_file_url = storage.objects.name
          OR qa.submission_file_url LIKE '%/' || storage.objects.name
          OR qa.submission_file_url LIKE '%/' || storage.objects.name || '?%'
          OR qa.correction_file_url = storage.objects.name
          OR qa.correction_file_url LIKE '%/' || storage.objects.name
          OR qa.correction_file_url LIKE '%/' || storage.objects.name || '?%'
        )
    )
    OR EXISTS (
      SELECT 1 FROM public.quizzes q
      WHERE q.is_published = true
        AND (
          q.exam_file_url = storage.objects.name
          OR q.exam_file_url LIKE '%/' || storage.objects.name
          OR q.exam_file_url LIKE '%/' || storage.objects.name || '?%'
        )
    )
  )
);
