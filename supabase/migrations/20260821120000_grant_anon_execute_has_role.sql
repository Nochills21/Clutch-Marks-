-- Fix: the subjects and subject_levels public SELECT policies call has_role()
-- for every row, even when the caller is anonymous. Since anon lacks EXECUTE
-- on has_role, Postgres returns "permission denied for function has_role" (401).
--
-- Solution A (preferred): grant anon the missing execute permission.
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO anon;

-- Solution B (belt-and-suspenders): rewrite the policies so has_role is only
-- called when auth.uid() is non-null, avoiding the permission check entirely
-- for anonymous callers.
DROP POLICY IF EXISTS "Anyone can view active subjects" ON public.subjects;
CREATE POLICY "Anyone can view active subjects" ON public.subjects
  FOR SELECT USING (is_active = true OR (auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin')));

DROP POLICY IF EXISTS "Anyone can view active subject levels" ON public.subject_levels;
CREATE POLICY "Anyone can view active subject levels" ON public.subject_levels
  FOR SELECT USING (is_active = true OR (auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin')));
