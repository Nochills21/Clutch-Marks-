DROP POLICY IF EXISTS "Users can update own attempts" ON public.quiz_attempts;
CREATE POLICY "Users can update own attempts" ON public.quiz_attempts
FOR UPDATE TO authenticated
USING (user_id = auth.uid())
WITH CHECK (
  user_id = auth.uid()
  AND NOT (score IS DISTINCT FROM (SELECT qa.score FROM public.quiz_attempts qa WHERE qa.id = quiz_attempts.id))
  AND NOT (total_questions IS DISTINCT FROM (SELECT qa.total_questions FROM public.quiz_attempts qa WHERE qa.id = quiz_attempts.id))
  AND NOT (correction_file_url IS DISTINCT FROM (SELECT qa.correction_file_url FROM public.quiz_attempts qa WHERE qa.id = quiz_attempts.id))
  AND NOT (completed_at IS DISTINCT FROM (SELECT qa.completed_at FROM public.quiz_attempts qa WHERE qa.id = quiz_attempts.id))
);

DROP POLICY IF EXISTS "Users can update own submissions" ON public.homework_submissions;
CREATE POLICY "Users can update own submissions" ON public.homework_submissions
FOR UPDATE TO authenticated
USING (user_id = auth.uid())
WITH CHECK (
  user_id = auth.uid()
  AND NOT (grade IS DISTINCT FROM (SELECT hs.grade FROM public.homework_submissions hs WHERE hs.id = homework_submissions.id))
  AND NOT (feedback IS DISTINCT FROM (SELECT hs.feedback FROM public.homework_submissions hs WHERE hs.id = homework_submissions.id))
  AND NOT (graded_at IS DISTINCT FROM (SELECT hs.graded_at FROM public.homework_submissions hs WHERE hs.id = homework_submissions.id))
  AND NOT (correction_file_url IS DISTINCT FROM (SELECT hs.correction_file_url FROM public.homework_submissions hs WHERE hs.id = homework_submissions.id))
  AND NOT (status IS DISTINCT FROM (SELECT hs.status FROM public.homework_submissions hs WHERE hs.id = homework_submissions.id))
);