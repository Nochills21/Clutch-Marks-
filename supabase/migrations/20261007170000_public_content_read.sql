-- Bring the public content tables in line with the site's SEO surface.
--
-- The topic pages and the notes / lessons / quizzes / past-papers library
-- pages are being made publicly viewable (out of the approval gate) so that
-- their content can be crawled and indexed. The tables those pages read must
-- therefore allow anonymous SELECT.
--
-- Kept gated (not opened here):
--   questions      -- carries correct_option / explanations (the quiz answers)
--   flashcards     -- carries answers
--   study_sessions, practice_attempts, quiz_attempts, bookmarks, progress,
--   student_prefs, student_subject_prefs, profiles, subscriptions, etc. --
--   all personal/account data stays behind auth.

-- CRITICAL: these must be ADDED alongside the signed-in policies, not in
-- place of them. A policy granted `TO anon` does not apply to the
-- `authenticated` role — replacing the signed-in SELECT policies with
-- anonymous ones emptied the notes / lessons / quizzes / past-paper libraries
-- for every signed-in student. Permissive policies union, so each table needs
-- both roles covered. (Repaired live by .freebuff/fix-content-rls.sql.)

-- Lessons: educational content (title + markdown body). Public by nature of a
-- revision platform -- the same content a student sees when signed in.
DROP POLICY IF EXISTS "Anyone authenticated can view lessons" ON public.lessons;
CREATE POLICY "Anyone authenticated can view lessons" ON public.lessons
  FOR SELECT TO authenticated
  USING (true);
DROP POLICY IF EXISTS "Anyone can view lessons" ON public.lessons;
CREATE POLICY "Anyone can view lessons" ON public.lessons
  FOR SELECT TO anon
  USING (true);

-- Published quizzes: only published ones are reachable from the library and
-- topic pages, so an anonymous visitor can never stumble onto a draft quiz.
-- The quiz title + topic is enough for the listing; the questions underneath
-- stay gated (answers).
DROP POLICY IF EXISTS "Anyone authenticated can view published quizzes" ON public.quizzes;
CREATE POLICY "Anyone authenticated can view published quizzes" ON public.quizzes
  FOR SELECT TO authenticated
  USING ((is_published = true) OR has_role(auth.uid(), 'admin'::app_role));
DROP POLICY IF EXISTS "Anyone can view published quizzes" ON public.quizzes;
CREATE POLICY "Anyone can view published quizzes" ON public.quizzes
  FOR SELECT TO anon
  USING ((is_published = true) OR has_role(auth.uid(), 'admin'::app_role));

-- Past papers: public Cambridge documents. The paper metadata (year, session,
-- paper number, title) is what students search for, and the file itself is
-- guarded by storage RLS (past-papers bucket is private).
DROP POLICY IF EXISTS "Authenticated users can view past papers" ON public.past_papers;
CREATE POLICY "Authenticated users can view past papers" ON public.past_papers
  FOR SELECT
  USING ((auth.uid() IS NOT NULL));
DROP POLICY IF EXISTS "Anyone can view past papers" ON public.past_papers;
CREATE POLICY "Anyone can view past papers" ON public.past_papers
  FOR SELECT TO anon
  USING (true);

-- Study materials: the notes / summary library. The files live in the private
-- study-materials bucket (storage RLS is admin-only), so the row metadata is
-- harmless to expose — but the pre-existing rule limited signed-in students to
-- text rows, and that restriction is kept for anonymous callers too so the
-- change cannot widen what a non-admin can read.
DROP POLICY IF EXISTS "Authenticated can view text materials" ON public.study_materials;
CREATE POLICY "Authenticated can view text materials" ON public.study_materials
  FOR SELECT TO authenticated
  USING (((file_url IS NULL) OR has_role(auth.uid(), 'admin'::app_role)));
DROP POLICY IF EXISTS "Anyone can view study materials" ON public.study_materials;
CREATE POLICY "Anyone can view study materials" ON public.study_materials
  FOR SELECT TO anon
  USING (((file_url IS NULL) OR has_role(auth.uid(), 'admin'::app_role)));
