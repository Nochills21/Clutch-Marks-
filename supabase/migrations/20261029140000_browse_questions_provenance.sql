-- Provenance for a browsed question: which specification statement it tests, and
-- which syllabus years that statement runs.
--
-- The quiz pages used to know only the question's own text and difficulty, so a
-- card could not say what it was testing. `questions.statement_id` has held that
-- link since 20261009220000 — this exposes it through the one RPC every quiz
-- surface already calls, rather than adding a per-question round trip (and a
-- second permission surface) to the busiest page in the app.
--
-- Four nullable columns, joined with LEFT JOIN: 466 of 4,223 questions are
-- mapped, and the other 3,757 must keep working exactly as before. Nothing is
-- inferred when the join misses — an unmapped question simply has no spec badge.
--
-- The return type changed, so the function is dropped and recreated; the
-- grants are restored in the same transaction so no window exists where a
-- signed-in student's quiz page 404s.
drop function if exists public.browse_questions(uuid, uuid, text, text, text, integer, integer, boolean);

create or replace function public.browse_questions(
  _topic_id uuid default null,
  _subject_level_id uuid default null,
  _difficulty text default null,
  _exam_type text default null,
  _search text default null,
  _limit integer default 50,
  _offset integer default 0,
  _ai_only boolean default null
)
returns table (
  id uuid,
  quiz_id uuid,
  quiz_title text,
  question_text text,
  options jsonb,
  difficulty text,
  exam_type text,
  is_ai_generated boolean,
  topic_id uuid,
  topic_name text,
  bookmarked boolean,
  last_correct boolean,
  attempts_count integer,
  statement_id uuid,
  statement_code text,
  statement_title text,
  statement_years text
)
language sql
stable
security definer
set search_path to 'public'
as $function$
  SELECT q.id, q.quiz_id, z.title, q.question_text, q.options,
         q.difficulty, z.exam_type, z.is_ai_generated,
         t.id, t.name,
         (qb.id IS NOT NULL), pa.last_correct, COALESCE(pa.attempts_count, 0),
         q.statement_id, ss.code, ss.title, ss.syllabus_years
  FROM public.questions q
  JOIN public.quizzes z ON z.id = q.quiz_id
  LEFT JOIN public.topics t ON t.id = z.topic_id
  LEFT JOIN public.syllabus_statements ss ON ss.id = q.statement_id
  LEFT JOIN public.question_bookmarks qb ON qb.question_id = q.id AND qb.user_id = auth.uid()
  LEFT JOIN public.practice_attempts pa ON pa.question_id = q.id AND pa.user_id = auth.uid()
  WHERE z.is_published = true
    AND (_topic_id IS NULL OR z.topic_id = _topic_id)
    AND (_subject_level_id IS NULL OR t.subject_level_id = _subject_level_id)
    AND (_difficulty IS NULL OR q.difficulty = _difficulty)
    AND (_exam_type IS NULL OR z.exam_type = _exam_type)
    AND (_ai_only IS NULL OR z.is_ai_generated = _ai_only)
    AND (_search IS NULL OR _search = '' OR q.question_text ILIKE '%' || _search || '%' OR z.title ILIKE '%' || _search || '%')
  ORDER BY z.title, q.sort_order
  LIMIT GREATEST(1, LEAST(_limit, 200))
  OFFSET GREATEST(0, _offset);
$function$;

grant execute on function public.browse_questions(uuid, uuid, text, text, text, integer, integer, boolean)
  to anon, authenticated, service_role;
