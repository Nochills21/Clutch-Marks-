
-- 1. Fix quiz_attempts: restrict student UPDATE to non-grade columns
DROP POLICY IF EXISTS "Users can update own attempts" ON public.quiz_attempts;
CREATE POLICY "Users can update own attempts"
ON public.quiz_attempts FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (
  user_id = auth.uid()
  AND score IS NOT DISTINCT FROM (SELECT score FROM public.quiz_attempts WHERE id = quiz_attempts.id)
  AND total_questions IS NOT DISTINCT FROM (SELECT total_questions FROM public.quiz_attempts WHERE id = quiz_attempts.id)
  AND correction_file_url IS NOT DISTINCT FROM (SELECT correction_file_url FROM public.quiz_attempts WHERE id = quiz_attempts.id)
  AND completed_at IS NOT DISTINCT FROM (SELECT completed_at FROM public.quiz_attempts WHERE id = quiz_attempts.id)
);

-- 2. Fix homework_submissions: restrict student UPDATE to non-grade columns
DROP POLICY IF EXISTS "Users can update own submissions" ON public.homework_submissions;
CREATE POLICY "Users can update own submissions"
ON public.homework_submissions FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (
  user_id = auth.uid()
  AND grade IS NOT DISTINCT FROM (SELECT grade FROM public.homework_submissions WHERE id = homework_submissions.id)
  AND feedback IS NOT DISTINCT FROM (SELECT feedback FROM public.homework_submissions WHERE id = homework_submissions.id)
  AND graded_at IS NOT DISTINCT FROM (SELECT graded_at FROM public.homework_submissions WHERE id = homework_submissions.id)
  AND correction_file_url IS NOT DISTINCT FROM (SELECT correction_file_url FROM public.homework_submissions WHERE id = homework_submissions.id)
  AND status IS NOT DISTINCT FROM (SELECT status FROM public.homework_submissions WHERE id = homework_submissions.id)
);

-- 3. Fix quiz-files storage: restrict exam file access to published quizzes only
DROP POLICY IF EXISTS "Users can access own quiz attempt files" ON storage.objects;
CREATE POLICY "Users can access own quiz attempt files"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'quiz-files'
  AND (
    EXISTS (
      SELECT 1 FROM public.quiz_attempts qa
      WHERE qa.user_id = auth.uid()
      AND (
        qa.submission_file_url LIKE '%' || name
        OR qa.correction_file_url LIKE '%' || name
      )
    )
    OR EXISTS (
      SELECT 1 FROM public.quizzes q
      WHERE q.is_published = true
      AND q.exam_file_url LIKE '%' || name
    )
  )
);
