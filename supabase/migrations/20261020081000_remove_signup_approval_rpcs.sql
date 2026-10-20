-- Signup-approval removal, part 2 (2026-10-20): the RPCs.
--
-- Part 1 (this file's companion) dropped is_user_approved() after rewriting the
-- five policies that called it — but plpgsql/SQL function BODIES are not
-- dependency-tracked, so ten SECURITY DEFINER RPCs kept calling the now-missing
-- predicate and raised "function does not exist" at runtime. The smoke test on
-- base.sql caught it.
--
-- Each function is replaced below with its live body minus the account check.
-- Behaviour notes per function:
--   * every removed check sat AFTER an auth.uid() null-check (or in a
--     published-only WHERE), so authentication still gates all ten;
--   * get_student_questions previously relied on the approval check to keep
--     DRAFT quiz questions private — it now requires the quiz to be published
--     (or the caller to be an admin), which preserves that privacy;
--   * get_subject_progress' only WHERE clause becomes auth.uid() IS NOT NULL:
--     signed-in users see their own progress, exactly as approved users did.
--   * get_free_preview now serves its published-only list to any signed-in or
--     anonymous caller — matching the site-wide public-content decision
--     (content tables allow anonymous SELECT; the study pages are prerendered).

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
    -- Published questions only: the same public-content rule the study
    -- pages and the sitemap already rely on. Anonymous and signed-in
    -- callers see the same set.
  ORDER BY z.title, q.sort_order
  LIMIT GREATEST(1, LEAST(_limit, 200))
  OFFSET GREATEST(0, _offset);
$function$;

CREATE OR REPLACE FUNCTION public.check_practice_answer(_question_id uuid, _selected integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  _q record;
  _is_correct boolean;
  _prev_correct boolean;
  _first_try boolean;
  _xp integer := 0;
  _corrected boolean := false;
begin
  if auth.uid() is null then raise exception 'Not authenticated'; end if;

  select q.correct_option, q.explanation
    into _q
  from public.questions q
  join public.quizzes z on z.id = q.quiz_id
  where q.id = _question_id and z.is_published = true;

  if not found then
    raise exception 'Question not found';
  end if;

  _is_correct := _selected = _q.correct_option;

  select pa.last_correct into _prev_correct
  from public.practice_attempts pa
  where pa.user_id = auth.uid() and pa.question_id = _question_id;

  insert into public.practice_attempts (user_id, question_id, last_correct, attempts_count, last_attempt_at)
  values (auth.uid(), _question_id, _is_correct, 1, now())
  on conflict (user_id, question_id) do update
    set last_correct = excluded.last_correct,
        attempts_count = public.practice_attempts.attempts_count + 1,
        last_attempt_at = now();

  _first_try := _prev_correct is null;

  if _is_correct then
    if public.award_xp(auth.uid(), 'practice', _question_id::text, 10, 100) then
      _xp := _xp + 10;
    end if;
    -- Turned a previous mistake around (never counted on a first attempt).
    if _prev_correct is false
       and public.award_xp(auth.uid(), 'mistake_fixed', _question_id::text, 15, 150) then
      _xp := _xp + 15;
      _corrected := true;
    end if;
    perform public.touch_streak(auth.uid());
  end if;

  return jsonb_build_object(
    'correct', _is_correct,
    'correct_option', _q.correct_option,
    'explanation', _q.explanation,
    'xp_earned', _xp,
    'corrected_mistake', _corrected,
    'first_attempt', _first_try
  );
end;
$function$;

CREATE OR REPLACE FUNCTION public.get_free_preview(_subject_level_id uuid DEFAULT NULL::uuid)
 RETURNS TABLE(item_id uuid, item_type text, topic_id uuid, topic_name text, title text, is_published boolean, is_ai_generated boolean, created_at timestamp with time zone)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  WITH published_questions AS (
    SELECT q.id AS item_id,
           'question' AS item_type,
           z.topic_id,
           t.name AS topic_name,
           z.title,
           z.is_published,
           z.is_ai_generated,
           q.created_at
    FROM public.questions q
    JOIN public.quizzes z ON z.id = q.quiz_id
    LEFT JOIN public.topics t ON t.id = z.topic_id
    WHERE z.is_published = true
      AND public.has_role(auth.uid(), 'admin') IS NOT TRUE
  ),
  published_quizzes AS (
    SELECT id AS item_id,
           'quiz' AS item_type,
           topic_id,
           NULL AS topic_name,
           title,
           is_published,
           is_ai_generated,
           created_at
    FROM public.quizzes
    WHERE is_published = true
      AND public.has_role(auth.uid(), 'admin') IS NOT TRUE
  ),
  past_papers AS (
    SELECT id AS item_id,
           'past_paper' AS item_type,
           topic_id,
           NULL AS topic_name,
           title,
           false AS is_published,
           false AS is_ai_generated,
           created_at
    FROM public.past_papers
    WHERE public.has_role(auth.uid(), 'admin') IS NOT TRUE
  )
  SELECT item_id, item_type, topic_id, topic_name, title, is_published,
         is_ai_generated, created_at
  FROM (
    SELECT * FROM published_questions
    UNION ALL
    SELECT * FROM published_quizzes
    UNION ALL
    SELECT * FROM past_papers
  ) AS combined
  WHERE _subject_level_id IS NULL
     OR combined.topic_id IN (
       SELECT t.id FROM public.topics t WHERE t.subject_level_id = _subject_level_id
     )
  ORDER BY combined.created_at DESC
  LIMIT GREATEST(1, LEAST(2, (SELECT count(*) FROM (
    SELECT * FROM published_questions
    UNION ALL
    SELECT * FROM published_quizzes
    UNION ALL
    SELECT * FROM past_papers
  ) AS sub)));
$function$;

CREATE OR REPLACE FUNCTION public.get_practice_questions(_topic_id uuid, _limit integer DEFAULT 10)
 RETURNS TABLE(id uuid, quiz_id uuid, question_text text, options jsonb)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT q.id, q.quiz_id, q.question_text, q.options
  FROM public.questions q
  JOIN public.quizzes z ON z.id = q.quiz_id
  WHERE z.is_published = true
    AND z.topic_id = _topic_id
  ORDER BY random()
  LIMIT GREATEST(1, LEAST(_limit, 50));
$function$;

CREATE OR REPLACE FUNCTION public.get_review_questions(_subject_level_id uuid DEFAULT NULL::uuid, _mode text DEFAULT 'incorrect'::text, _limit integer DEFAULT 50)
 RETURNS TABLE(id uuid, quiz_id uuid, quiz_title text, question_text text, options jsonb, difficulty text, topic_id uuid, topic_name text, bookmarked boolean, last_correct boolean, attempts_count integer, last_attempt_at timestamp with time zone)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT q.id, q.quiz_id, z.title, q.question_text, q.options,
         q.difficulty, t.id, t.name,
         (qb.id IS NOT NULL), pa.last_correct, COALESCE(pa.attempts_count, 0), pa.last_attempt_at
  FROM public.questions q
  JOIN public.quizzes z ON z.id = q.quiz_id
  LEFT JOIN public.topics t ON t.id = z.topic_id
  LEFT JOIN public.question_bookmarks qb ON qb.question_id = q.id AND qb.user_id = auth.uid()
  LEFT JOIN public.practice_attempts pa ON pa.question_id = q.id AND pa.user_id = auth.uid()
  WHERE z.is_published = true
    AND (_subject_level_id IS NULL OR t.subject_level_id = _subject_level_id)
    AND (
      (_mode = 'bookmarked' AND qb.id IS NOT NULL)
      OR (_mode = 'incorrect' AND pa.id IS NOT NULL AND pa.last_correct = false)
      OR (_mode = 'all' AND (qb.id IS NOT NULL OR (pa.id IS NOT NULL AND pa.last_correct = false)))
    )
  ORDER BY pa.last_attempt_at DESC NULLS LAST, z.title, q.sort_order
  LIMIT GREATEST(1, LEAST(_limit, 200));
$function$;

CREATE OR REPLACE FUNCTION public.get_student_questions(_quiz_id uuid)
 RETURNS TABLE(id uuid, quiz_id uuid, question_text text, options jsonb, sort_order integer)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT q.id, q.quiz_id, q.question_text, q.options, q.sort_order
  FROM public.questions q
  JOIN public.quizzes z ON z.id = q.quiz_id
  WHERE q.quiz_id = _quiz_id
    AND (z.is_published = true OR public.has_role(auth.uid(), 'admin'))
  ORDER BY q.sort_order;
$function$;

CREATE OR REPLACE FUNCTION public.get_subject_progress()
 RETURNS TABLE(subject_id uuid, subject_name text, subject_slug text, subject_icon text, subject_color text, subject_level_id uuid, level subject_level, topics_count bigint, lessons_total bigint, lessons_completed bigint, materials_total bigint, materials_bookmarked bigint, quiz_attempts bigint, quiz_avg_score numeric, ai_questions_total bigint, ai_questions_answered bigint, ai_questions_correct bigint, bookmarked_questions bigint, incorrect_questions bigint)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  WITH lv AS (
    SELECT sl.id AS level_id, sl.level, s.id AS s_id, s.name, s.slug, s.icon, s.color
    FROM public.subject_levels sl
    JOIN public.subjects s ON s.id = sl.subject_id
    WHERE sl.is_active = true AND s.is_active = true
  ),
  tp AS (SELECT t.id AS topic_id, t.subject_level_id FROM public.topics t WHERE t.subject_level_id IS NOT NULL),
  topic_counts AS (SELECT subject_level_id, COUNT(*) AS n FROM tp GROUP BY 1),
  les AS (
    SELECT tp.subject_level_id,
           COUNT(l.id) AS total,
           COUNT(lp.id) FILTER (WHERE lp.completed) AS done
    FROM tp JOIN public.lessons l ON l.topic_id = tp.topic_id
    LEFT JOIN public.lesson_progress lp ON lp.lesson_id = l.id AND lp.user_id = auth.uid()
    GROUP BY 1
  ),
  mat AS (
    SELECT tp.subject_level_id,
           COUNT(m.id) AS total,
           COUNT(b.id) AS saved
    FROM tp JOIN public.study_materials m ON m.topic_id = tp.topic_id
    LEFT JOIN public.bookmarks b ON b.material_id = m.id AND b.user_id = auth.uid()
    GROUP BY 1
  ),
  qz AS (
    SELECT tp.subject_level_id,
           COUNT(qa.id) AS attempts,
           ROUND(AVG(CASE WHEN qa.total_questions > 0 THEN qa.score::numeric / qa.total_questions * 100 END), 1) AS avg_score
    FROM tp JOIN public.quizzes z ON z.topic_id = tp.topic_id
    JOIN public.quiz_attempts qa ON qa.quiz_id = z.id AND qa.user_id = auth.uid()
    GROUP BY 1
  ),
  qs AS (
    SELECT tp.subject_level_id,
           COUNT(q.id) FILTER (WHERE z.is_ai_generated) AS ai_total,
           COUNT(pa.id) FILTER (WHERE z.is_ai_generated) AS ai_answered,
           COUNT(pa.id) FILTER (WHERE z.is_ai_generated AND pa.last_correct) AS ai_correct,
           COUNT(qb.id) AS saved_q,
           COUNT(pa.id) FILTER (WHERE pa.last_correct = false) AS wrong_q
    FROM tp
    JOIN public.quizzes z ON z.topic_id = tp.topic_id AND z.is_published = true
    JOIN public.questions q ON q.quiz_id = z.id
    LEFT JOIN public.practice_attempts pa ON pa.question_id = q.id AND pa.user_id = auth.uid()
    LEFT JOIN public.question_bookmarks qb ON qb.question_id = q.id AND qb.user_id = auth.uid()
    GROUP BY 1
  )
  SELECT lv.s_id, lv.name, lv.slug, lv.icon, lv.color, lv.level_id, lv.level,
         COALESCE(topic_counts.n, 0),
         COALESCE(les.total, 0), COALESCE(les.done, 0),
         COALESCE(mat.total, 0), COALESCE(mat.saved, 0),
         COALESCE(qz.attempts, 0), COALESCE(qz.avg_score, 0),
         COALESCE(qs.ai_total, 0), COALESCE(qs.ai_answered, 0),
         COALESCE(qs.ai_correct, 0), COALESCE(qs.saved_q, 0), COALESCE(qs.wrong_q, 0)
  FROM lv
  LEFT JOIN topic_counts ON topic_counts.subject_level_id = lv.level_id
  LEFT JOIN les ON les.subject_level_id = lv.level_id
  LEFT JOIN mat ON mat.subject_level_id = lv.level_id
  LEFT JOIN qz ON qz.subject_level_id = lv.level_id
  LEFT JOIN qs ON qs.subject_level_id = lv.level_id
  WHERE auth.uid() IS NOT NULL
  ORDER BY lv.name, lv.level;
$function$;

CREATE OR REPLACE FUNCTION public.grade_quiz(_quiz_id uuid, _answers jsonb, _submission_file_url text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  _user_id uuid := auth.uid();
  _correct integer := 0;
  _total integer := 0;
  _q record;
  _selected integer;
  _attempt_id uuid;
  _results jsonb := '[]'::jsonb;
  _xp integer := 0;
begin
  if _user_id is null then raise exception 'Not authenticated'; end if;

  for _q in
    select q.id, q.correct_option, q.explanation, q.options, q.objective_id
    from public.questions q
    where q.quiz_id = _quiz_id
    order by q.sort_order
  loop
    _total := _total + 1;
    _selected := (_answers->>(_q.id::text))::integer;
    if _selected = _q.correct_option then
      _correct := _correct + 1;
      if public.award_xp(_user_id, 'quiz', _q.id::text, 20, 200) then
        _xp := _xp + 20;
      end if;
    end if;
    -- Evidence for the mastery loop, for tagged questions only, and only when
    -- the question was actually answered (an unanswered question says nothing).
    -- The practice_attempts trigger advances the schedule from here.
    if _q.objective_id is not null and _selected is not null then
      insert into public.practice_attempts (user_id, question_id, last_correct, attempts_count, last_attempt_at)
      values (_user_id, _q.id, (_selected = _q.correct_option), 1, now())
      on conflict (user_id, question_id) do update
        set last_correct = excluded.last_correct,
            attempts_count = public.practice_attempts.attempts_count + 1,
            last_attempt_at = now();
    end if;
    _results := _results || jsonb_build_object(
      'question_id', _q.id,
      'selected', _selected,
      'correct_option', _q.correct_option,
      'explanation', _q.explanation,
      'options', _q.options
    );
  end loop;

  if _total > 0 then
    insert into public.quiz_attempts (
      quiz_id, user_id, score, total_questions, submission_file_url, answers, completed_at
    )
    values (
      _quiz_id, _user_id, _correct, _total, _submission_file_url,
      (select jsonb_agg(jsonb_build_object('question_id', k, 'selected', (_answers->>k)::integer))
         from jsonb_object_keys(_answers) k),
      now()
    )
    returning id into _attempt_id;
    perform public.touch_streak(_user_id);
  end if;

  return jsonb_build_object(
    'correct', _correct,
    'total', _total,
    'attempt_id', _attempt_id,
    'xp_earned', _xp,
    'results', _results
  );
end;
$function$;

CREATE OR REPLACE FUNCTION public.record_paper_attempt(p_paper_id uuid, p_paper_title text, p_score integer, p_total_marks integer, p_session text DEFAULT NULL::text, p_year integer DEFAULT NULL::integer, p_paper_number text DEFAULT NULL::text, p_duration_seconds integer DEFAULT NULL::integer, p_time_limit_seconds integer DEFAULT NULL::integer, p_corrected_papers jsonb DEFAULT NULL::jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  _user_id uuid := auth.uid();
  _attempt_id uuid;
  _percentage integer;
  _xp integer := 0;
  _streak integer := 0;
begin
  if _user_id is null then raise exception 'Not authenticated'; end if;

  _percentage := case
    when coalesce(p_total_marks, 0) > 0
      then round(least(greatest(coalesce(p_score, 0), 0), p_total_marks)::numeric / p_total_marks * 100)::integer
    else null
  end;

  insert into public.past_paper_attempts (
    user_id, paper_id, paper_title, session, year, paper_number,
    score, total_marks, percentage, duration_seconds, time_limit_seconds, corrected_papers
  ) values (
    _user_id, p_paper_id, p_paper_title, p_session, p_year, p_paper_number,
    greatest(coalesce(p_score, 0), 0), greatest(coalesce(p_total_marks, 0), 0), _percentage,
    p_duration_seconds, p_time_limit_seconds, p_corrected_papers
  )
  returning id into _attempt_id;

  if public.award_xp(_user_id, 'paper', _attempt_id::text, 20, 150) then
    perform public.touch_streak(_user_id);
  end if;

  -- award_xp() records the amount actually paid on the ledger row (and deletes
  -- the row when nothing was paid), so read it back rather than assuming 20.
  select points into _xp from public.xp_events
    where user_id = _user_id and tool = 'paper' and ref = _attempt_id::text;

  update public.past_paper_attempts set xp_earned = coalesce(_xp, 0) where id = _attempt_id;

  select current_streak into _streak from public.streaks where user_id = _user_id;

  return jsonb_build_object(
    'attempt_id', _attempt_id,
    'percentage', _percentage,
    'xp_earned', coalesce(_xp, 0),
    'streak', coalesce(_streak, 0)
  );
end;
$function$;

CREATE OR REPLACE FUNCTION public.start_study_session(_minutes integer DEFAULT 20)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  _uid uuid := auth.uid();
  _row public.study_sessions;
begin
  if _uid is null then raise exception 'Not authenticated'; end if;
  if _minutes not in (10, 20, 30) then raise exception 'Choose a 10, 20 or 30 minute session'; end if;

  update public.study_sessions
     set status = 'set_aside', ended_at = now()
   where user_id = _uid and status = 'active';

  insert into public.study_sessions (user_id, planned_minutes)
  values (_uid, _minutes)
  returning * into _row;

  return jsonb_build_object(
    'id', _row.id,
    'planned_minutes', _row.planned_minutes,
    'started_at', _row.started_at
  );
end;
$function$;

