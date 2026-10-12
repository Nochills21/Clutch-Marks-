-- Let the Subject "Question Bank" tab query AI-bank questions directly.
--
-- browse_questions caps results at 200 rows ordered by quiz title, so a
-- client-side is_ai_generated filter on the first page can never reach the
-- AI-bank rows (e.g. Maths OL: 693 questions, first AI row at #310). The new
-- optional _ai_only flag filters server-side before the limit; default NULL
-- keeps every existing caller unchanged.
CREATE OR REPLACE FUNCTION public.browse_questions(_topic_id uuid DEFAULT NULL::uuid, _subject_level_id uuid DEFAULT NULL::uuid, _difficulty text DEFAULT NULL::text, _exam_type text DEFAULT NULL::text, _search text DEFAULT NULL::text, _limit integer DEFAULT 50, _offset integer DEFAULT 0, _ai_only boolean DEFAULT NULL::boolean)
 RETURNS TABLE(id uuid, quiz_id uuid, quiz_title text, question_text text, options jsonb, difficulty text, exam_type text, is_ai_generated boolean, topic_id uuid, topic_name text, bookmarked boolean, last_correct boolean, attempts_count integer)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT q.id, q.quiz_id, z.title, q.question_text, q.options,
         q.difficulty, z.exam_type, z.is_ai_generated,
         t.id, t.name,
         (qb.id IS NOT NULL), pa.last_correct, COALESCE(pa.attempts_count, 0)
  FROM public.questions q
  JOIN public.quizzes z ON z.id = q.quiz_id
  LEFT JOIN public.topics t ON t.id = z.topic_id
  LEFT JOIN public.question_bookmarks qb ON qb.question_id = q.id AND qb.user_id = auth.uid()
  LEFT JOIN public.practice_attempts pa ON pa.question_id = q.id AND pa.user_id = auth.uid()
  WHERE z.is_published = true
    AND (_topic_id IS NULL OR z.topic_id = _topic_id)
    AND (_subject_level_id IS NULL OR t.subject_level_id = _subject_level_id)
    AND (_difficulty IS NULL OR q.difficulty = _difficulty)
    AND (_exam_type IS NULL OR z.exam_type = _exam_type)
    AND (_ai_only IS NULL OR z.is_ai_generated = _ai_only)
    AND (_search IS NULL OR _search = '' OR q.question_text ILIKE '%' || _search || '%' OR z.title ILIKE '%' || _search || '%')
    -- Signed-in callers still need an approved account; an anonymous caller
    -- (auth.uid() is null) gets published questions only, which is the same
    -- public-content rule the study pages and the sitemap already rely on.
    AND (auth.uid() IS NULL OR public.is_user_approved(auth.uid()))
  ORDER BY z.title, q.sort_order
  LIMIT GREATEST(1, LEAST(_limit, 200))
  OFFSET GREATEST(0, _offset);
$function$;
