
-- 1. Fix has_role to check is_approved
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role AND is_approved = true
  )
$$;

-- 2. Make quiz-files bucket private
UPDATE storage.buckets SET public = false WHERE id = 'quiz-files';

-- 3. Add authenticated SELECT policy for quiz-files
CREATE POLICY "Authenticated users can view quiz files"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'quiz-files');

-- 4. Add parent SELECT policy for homework-uploads
CREATE POLICY "Parents can view linked student homework files"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'homework-uploads'
  AND public.is_linked_parent(auth.uid(), ((storage.foldername(name))[1])::uuid)
);
