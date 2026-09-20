
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Authenticated users can view quiz files" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can read quiz files" ON storage.objects;

-- Admins can access all quiz files
CREATE POLICY "Admins can access all quiz files"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'quiz-files'
  AND public.has_role(auth.uid(), 'admin')
);

-- Students can only access files linked to their own quiz attempts
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
      WHERE q.exam_file_url LIKE '%' || name
    )
  )
);
