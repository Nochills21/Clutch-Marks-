-- Quiz submission failed for every student with
--   invalid input syntax for type integer: '<uuid>'
-- because grade_quiz kept the inserted attempt's uuid in `_selected integer`
-- (the variable that holds an option index). A uuid variable now holds the
-- attempt id, and the returned payload carries the real id instead of the last
-- answer index. The rest of the function is the live definition unchanged.

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
  _attempt_id uuid;
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
    returning id into _attempt_id;
    perform public.touch_streak(_user_id);
  end if;

  return jsonb_build_object('correct', _correct, 'total', _total, 'attempt_id', _attempt_id, 'xp_earned', _xp, 'results', _results);
end;
$function$
;
