
-- 1) Restrict public bucket listing
DROP POLICY IF EXISTS "Anyone can view lesson resources" ON storage.objects;
CREATE POLICY "Approved users can view lesson resources"
  ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'lesson-resources'
    AND (is_user_approved(auth.uid()) OR has_role(auth.uid(), 'admin'::app_role))
  );

DROP POLICY IF EXISTS "Anyone can view study materials files" ON storage.objects;
CREATE POLICY "Approved users can view study materials files"
  ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'study-materials'
    AND (is_user_approved(auth.uid()) OR has_role(auth.uid(), 'admin'::app_role))
  );

DROP POLICY IF EXISTS "Anyone authenticated can view past papers files" ON storage.objects;
CREATE POLICY "Approved users can view past papers files"
  ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'past-papers'
    AND (is_user_approved(auth.uid()) OR has_role(auth.uid(), 'admin'::app_role))
  );

-- 2) Revoke execute on internal SECURITY DEFINER helpers
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM authenticated, anon, public;
REVOKE EXECUTE ON FUNCTION public.is_user_approved(uuid) FROM authenticated, anon, public;
REVOKE EXECUTE ON FUNCTION public.is_linked_parent(uuid, uuid) FROM authenticated, anon, public;
REVOKE EXECUTE ON FUNCTION public.get_profile_id(uuid) FROM authenticated, anon, public;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM authenticated, anon, public;
REVOKE EXECUTE ON FUNCTION public.update_updated_at() FROM authenticated, anon, public;
