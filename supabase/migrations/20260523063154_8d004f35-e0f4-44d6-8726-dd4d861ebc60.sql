DROP POLICY IF EXISTS "Anyone authenticated can view past papers files" ON storage.objects;
DROP POLICY IF EXISTS "Approved users can view past papers files" ON storage.objects;

CREATE POLICY "Approved users can view past papers files"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'past-papers'
  AND (public.is_user_approved(auth.uid()) OR public.has_role(auth.uid(), 'admin'::public.app_role))
);