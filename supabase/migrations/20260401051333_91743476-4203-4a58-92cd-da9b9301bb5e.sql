CREATE POLICY "Admins can upload to homework-uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'homework-uploads' AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete homework-uploads files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'homework-uploads' AND has_role(auth.uid(), 'admin'::app_role)
);