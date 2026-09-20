
-- 1. Fix quiz correct answers exposure
-- Drop the permissive SELECT policy on questions
DROP POLICY IF EXISTS "Anyone authenticated can view questions" ON public.questions;

-- Create a function to return questions without correct answers for students
CREATE OR REPLACE FUNCTION public.get_student_questions(_quiz_id uuid)
RETURNS TABLE (
  id uuid,
  quiz_id uuid,
  question_text text,
  options jsonb,
  sort_order integer
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT q.id, q.quiz_id, q.question_text, q.options, q.sort_order
  FROM public.questions q
  WHERE q.quiz_id = _quiz_id
  ORDER BY q.sort_order;
$$;

-- Create a function to grade quiz server-side
CREATE OR REPLACE FUNCTION public.grade_quiz(
  _quiz_id uuid,
  _answers jsonb,
  _submission_file_url text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

  -- Insert the attempt
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
$$;

-- 2. Fix storage upload bypass - remove overly permissive policy
DROP POLICY IF EXISTS "Students can upload homework files" ON storage.objects;

-- Also fix quiz submissions policy to enforce user-specific paths
DROP POLICY IF EXISTS "Students can upload quiz submissions" ON storage.objects;
CREATE POLICY "Students can upload quiz submissions"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'homework-uploads'
  AND (storage.foldername(name))[1] = 'quiz-submissions'
  AND (storage.foldername(name))[2] = (auth.uid())::text
);
