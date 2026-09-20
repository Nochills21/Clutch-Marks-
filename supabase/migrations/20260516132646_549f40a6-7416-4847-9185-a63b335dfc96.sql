-- 1) Storage: prevent anonymous listing of public buckets.
-- Public file URLs still work (served via CDN) but the list/metadata API is locked down.
DROP POLICY IF EXISTS "Public read lesson-resources" ON storage.objects;
DROP POLICY IF EXISTS "Public read study-materials" ON storage.objects;
DROP POLICY IF EXISTS "Public read past-papers" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated read lesson-resources" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated read study-materials" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated read past-papers" ON storage.objects;

CREATE POLICY "Authenticated read lesson-resources"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'lesson-resources');

CREATE POLICY "Authenticated read study-materials"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'study-materials');

CREATE POLICY "Authenticated read past-papers"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'past-papers');

-- 2) Revoke EXECUTE from anon on all SECURITY DEFINER helper functions.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.get_profile_id(uuid) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.is_linked_parent(uuid, uuid) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.get_student_questions(uuid) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.grade_quiz(uuid, jsonb, text) FROM anon, public;

-- Trigger functions: only the trigger needs to invoke them. Revoke from everyone.
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.update_updated_at() FROM anon, authenticated, public;

-- Grant the minimum needed back to authenticated.
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_profile_id(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_linked_parent(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_student_questions(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.grade_quiz(uuid, jsonb, text) TO authenticated;