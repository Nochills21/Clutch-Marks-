-- 20261012151000 added _ai_only by CREATE OR REPLACE, but a new defaulted
-- parameter is a new signature, so the old 7-argument overload survived and
-- PostgREST can no longer choose between the two ("could not choose the best
-- candidate function"). Drop the superseded overload; the 8-argument version
-- with DEFAULT NULL keeps every existing caller working.
DROP FUNCTION IF EXISTS public.browse_questions(uuid, uuid, text, text, text, integer, integer);
