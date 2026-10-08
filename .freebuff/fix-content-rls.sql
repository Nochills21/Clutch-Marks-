-- URGENT repair: 20261007170000_public_content_read.sql replaced the
-- `TO authenticated` SELECT policies on lessons/quizzes/past_papers/
-- study_materials with `TO anon` ones. A policy granted to `anon` does NOT
-- apply to the `authenticated` role, so every signed-in student lost read
-- access and the notes / lessons / quizzes / past-paper libraries rendered
-- empty. Restore the original signed-in policies (exactly as in base.sql) and
-- keep the anonymous policies alongside them — permissive policies union, so
-- the crawler view and the student view both work.

-- lessons -------------------------------------------------------------------
DROP POLICY IF EXISTS "Anyone authenticated can view lessons" ON public.lessons;
CREATE POLICY "Anyone authenticated can view lessons" ON public.lessons
  FOR SELECT TO authenticated USING (true);

-- quizzes -------------------------------------------------------------------
DROP POLICY IF EXISTS "Anyone authenticated can view published quizzes" ON public.quizzes;
CREATE POLICY "Anyone authenticated can view published quizzes" ON public.quizzes
  FOR SELECT TO authenticated
  USING ((is_published = true) OR has_role(auth.uid(), 'admin'::app_role));

-- past_papers ---------------------------------------------------------------
DROP POLICY IF EXISTS "Authenticated users can view past papers" ON public.past_papers;
CREATE POLICY "Authenticated users can view past papers" ON public.past_papers
  FOR SELECT USING ((auth.uid() IS NOT NULL));

-- study_materials -----------------------------------------------------------
-- The original rule only exposed text rows to signed-in students; file-backed
-- rows stay readable by admins. Keep that restriction for anonymous callers
-- too, so the change cannot widen what a non-admin can read from the row
-- metadata.
DROP POLICY IF EXISTS "Authenticated can view text materials" ON public.study_materials;
CREATE POLICY "Authenticated can view text materials" ON public.study_materials
  FOR SELECT TO authenticated
  USING (((file_url IS NULL) OR has_role(auth.uid(), 'admin'::app_role)));

DROP POLICY IF EXISTS "Anyone can view study materials" ON public.study_materials;
CREATE POLICY "Anyone can view study materials" ON public.study_materials
  FOR SELECT TO anon
  USING ((file_url IS NULL) OR has_role(auth.uid(), 'admin'::app_role));
