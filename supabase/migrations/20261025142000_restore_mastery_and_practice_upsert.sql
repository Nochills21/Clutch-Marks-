-- Live had fallen behind supabase/base.sql for two student RPCs, and both
-- faults were only visible when the function ran:
--
--   grade_quiz          stored the inserted attempt's uuid in `_selected integer`
--                       ("invalid input syntax for type integer"), and skipped
--                       the practice_attempts evidence the mastery schedule
--                       advances from, so /mastery never moved.
--   check_practice_answer inserted without ON CONFLICT, so a second attempt on
--                       the same question raised a duplicate-key error, and it
--                       never paid first-try or mistake-fixed XP.
--
-- The definitions below are the golden snapshot's, verbatim — they already
-- carry the uuid variable and the mastery writes. No approval guard appears in
-- either (the gate was removed 2026-10-20; the older live body still called the
-- dropped helper, which 20261025140000 removed).

-- grade_quiz
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

-- check_practice_answer
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
