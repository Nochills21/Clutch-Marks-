-- Backfill is_ai_generated for the AI question-bank quizzes.
--
-- The bank builder writes exam_type = 'ai_bank' but never set the
-- is_ai_generated flag, so the Subject "Question Bank" tab (which filters on
-- the flag) was empty site-wide while topic pages advertised the same quizzes
-- as "AI Bank". Pair the two markers, as 20260807100930 intended.
update public.quizzes
   set is_ai_generated = true
 where exam_type = 'ai_bank'
   and is_ai_generated = false;
