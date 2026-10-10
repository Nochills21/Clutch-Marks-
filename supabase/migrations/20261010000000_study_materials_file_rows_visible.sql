-- File-backed study materials are invisible to the students who need them.
--
-- "Authenticated can view text materials" only allowed SELECT where
-- file_url IS NULL (or admin), so every uploaded PDF note (39 rows today)
-- was filtered out of the notes / topic / lesson queries for non-admins:
-- the notes looked like they "don't open nor download" — they never even
-- listed. The file BYTES stay protected (private study-materials bucket +
-- serve-material's approved-role gate); this only opens the row METADATA
-- (title, file path) to approved accounts so they can request the file.
--
-- Anon keeps the old text-only rule (no approved role possible without a uid).

DROP POLICY IF EXISTS "Authenticated can view text materials" ON public.study_materials;
CREATE POLICY "Authenticated can view text materials" ON public.study_materials
  FOR SELECT TO authenticated
  USING (
    (file_url IS NULL)
    OR has_role(auth.uid(), 'admin'::app_role)
    OR is_user_approved(auth.uid())
  );
