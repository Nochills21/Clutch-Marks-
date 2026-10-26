-- Close the study loop: every answered quiz question joins the review ledger.
--
-- grade_quiz wrote practice_attempts only for objective-tagged questions (351 of
-- 4,223), so a mistake on any other question never reached get_review_questions
-- ('incorrect'), never counted in the practice summary or Progress' "to review",
-- and could never earn the mistake-fixed reward in check_practice_answer — the
-- "Practise mistakes" journey dead-ended for 92% of the bank.
--
-- practice_attempts is the one ledger those surfaces read, so the fix is to
-- write it for every question the student answered. The mastery ladder is
-- unaffected: the practice_attempts trigger calls record_objective_evidence,
-- which returns early when questions.objective_id is null, and tagged questions
-- keep the exact rows they had before.
--
-- Blank answers arrive as -1 from both quiz surfaces and record as not-correct:
-- unanswered work is precisely what should be waiting in the review queue.
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
    -- The review ledger: get_review_questions('incorrect'), the practice
    -- summary and the mistake-fixed reward all read practice_attempts, so every
    -- answered question records here — tagged or not. A blank (-1) records as
    -- not-correct, because unanswered work belongs in the review queue too.
    -- Mastery is a side effect only for tagged questions: the trigger forwards
    -- the row to record_objective_evidence, which no-ops when objective_id is
    -- null, so untagged rows move nothing on the ladder.
    if _selected is not null then
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
