-- Remove stale permissive policy bypassing approval gate
DROP POLICY IF EXISTS "Anyone authenticated can view materials" ON public.study_materials;

-- Tighten quiz-files SELECT to approved users only on the published-quiz branch
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
    OR (
      public.is_user_approved(auth.uid())
      AND EXISTS (
        SELECT 1 FROM public.quizzes q
        WHERE q.is_published = true
          AND (
            q.exam_file_url = storage.objects.name
            OR q.exam_file_url LIKE '%/' || storage.objects.name
            OR q.exam_file_url LIKE '%/' || storage.objects.name || '?%'
          )
      )
    )
    OR public.has_role(auth.uid(), 'admin'::app_role)
  )
);

-- Revoke anon EXECUTE on SECURITY DEFINER functions; require authenticated session
REVOKE EXECUTE ON FUNCTION public.get_practice_questions(uuid, integer) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.check_practice_answer(uuid, integer) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.browse_questions(uuid, integer, integer) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.get_student_questions(uuid) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.grade_quiz(uuid, jsonb, text) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.is_user_approved(uuid) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.is_linked_parent(uuid, uuid) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.get_profile_id(uuid) FROM anon, public;

GRANT EXECUTE ON FUNCTION public.get_practice_questions(uuid, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_practice_answer(uuid, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.browse_questions(uuid, integer, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_student_questions(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.grade_quiz(uuid, jsonb, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_user_approved(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_linked_parent(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_profile_id(uuid) TO authenticated;