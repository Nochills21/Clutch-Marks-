
-- Allow authenticated users to SELECT questions for published quizzes
DROP POLICY IF EXISTS "Authenticated can view questions for published quizzes" ON public.questions;
CREATE POLICY "Authenticated can view questions for published quizzes"
ON public.questions FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.quizzes q WHERE q.id = questions.quiz_id AND (q.is_published = true OR public.has_role(auth.uid(), 'admin'::app_role))));

-- Storage: admin UPDATE for homework-uploads
DROP POLICY IF EXISTS "Admins can update homework-uploads files" ON storage.objects;
CREATE POLICY "Admins can update homework-uploads files"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'homework-uploads' AND public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (bucket_id = 'homework-uploads' AND public.has_role(auth.uid(), 'admin'::app_role));

-- Storage: students update their own homework files
DROP POLICY IF EXISTS "Users can update own homework files" ON storage.objects;
CREATE POLICY "Users can update own homework files"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'homework-uploads' AND auth.uid()::text = (storage.foldername(name))[1])
WITH CHECK (bucket_id = 'homework-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage: admin UPDATE for quiz-files
DROP POLICY IF EXISTS "Admins can update quiz files" ON storage.objects;
CREATE POLICY "Admins can update quiz files"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'quiz-files' AND public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (bucket_id = 'quiz-files' AND public.has_role(auth.uid(), 'admin'::app_role));

-- Storage: parents can view quiz-submissions/{student_id}/... files for their linked students
DROP POLICY IF EXISTS "Parents can view linked student quiz submission files" ON storage.objects;
CREATE POLICY "Parents can view linked student quiz submission files"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'homework-uploads'
  AND (storage.foldername(name))[1] = 'quiz-submissions'
  AND public.has_role(auth.uid(), 'parent'::app_role)
  AND public.is_linked_parent(auth.uid(), ((storage.foldername(name))[2])::uuid)
);
