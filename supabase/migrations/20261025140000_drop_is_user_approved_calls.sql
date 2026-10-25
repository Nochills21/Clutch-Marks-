-- Quiz submission and practice checking stopped working when
-- public.is_user_approved() was dropped with the signup approval gate
-- (20261020080000 / 20261020081000). Both RPCs are SECURITY DEFINER and still
-- called it, so every grade_quiz call raised
--   function public.is_user_approved(uuid) does not exist
-- which the student saw as "Submission failed". Accounts are auto-approved now,
-- so the guard it implemented no longer has a meaning to keep: the
-- authenticated-user check above it stays, and nothing else changes.
--
-- The bodies below are the live definitions with only that guard removed
-- (pg_get_functiondef output includes SECURITY DEFINER and search_path).

-- check_practice_answer(_question_id uuid, _selected integer)
CREATE OR REPLACE FUNCTION public.check_practice_answer(_question_id uuid, _selected integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  _q record;
  _is_correct boolean;
  _xp integer := 0;
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

  insert into public.practice_attempts (user_id, question_id, last_correct, attempts_count, last_attempt_at)
  values (auth.uid(), _question_id, _is_correct, 1, now())
  on conflict (user_id, question_id) do update
    set last_correct = excluded.last_correct,
        attempts_count = public.practice_attempts.attempts_count + 1,
        last_attempt_at = now();

  if _is_correct and public.award_xp(auth.uid(), 'practice', _question_id::text, 10, 100) then
    _xp := 10;
    perform public.touch_streak(auth.uid());
  end if;

  return jsonb_build_object(
    'correct', _is_correct,
    'correct_option', _q.correct_option,
    'explanation', _q.explanation,
    'xp_earned', _xp
  );
end;
$function$
;

-- grade_quiz(_quiz_id uuid, _answers jsonb, _submission_file_url text)
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
  _results jsonb := '[]'::jsonb;
  _xp integer := 0;
begin
  if _user_id is null then raise exception 'Not authenticated'; end if;

  for _q in
    select q.id, q.correct_option, q.explanation, q.options
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
    _results := _results || jsonb_build_object(
      'question_id', _q.id,
      'correct_option', _q.correct_option,
      'selected', _selected,
      'explanation', _q.explanation,
      'options', _q.options
    );
  end loop;

  -- Fixed 2026-10-01: this inserted a nonexistent `total` column and never set
  -- `completed_at` (which every progress/XP/gradebook query filters on). The
  -- authoritative definition, including the payload shape the client reads, now
  -- lives in 20261001120000_grade_quiz_attempts_fix.sql.
  if _total > 0 then
    insert into public.quiz_attempts (quiz_id, user_id, score, total_questions, submission_file_url, answers, completed_at)
    values (
      _quiz_id, _user_id, _correct, _total, _submission_file_url,
      (select jsonb_agg(jsonb_build_object('question_id', k, 'selected', (_answers->>k)::integer))
         from jsonb_object_keys(_answers) k),
      now()
    )
    returning id into _selected;
    perform public.touch_streak(_user_id);
  end if;

  return jsonb_build_object('correct', _correct, 'total', _total, 'attempt_id', _selected, 'xp_earned', _xp, 'results', _results);
end;
$function$
;
