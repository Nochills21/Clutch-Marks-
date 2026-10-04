-- Quiz submission was dead: the XP-era grade_quiz inserted into
--   quiz_attempts (quiz_id, user_id, score, total, submission_file_url, created_at)
-- but the table has no `total` column (it is `total_questions`), so every
-- "Submit Quiz" answered with
--   column "total" of relation "quiz_attempts" does not exist.
-- The same statement never set `completed_at`, which every progress, XP and
-- gradebook query filters on — so even a corrected insert would have been
-- invisible to the rest of the app.
--
-- The result payload also drifted from what the client reads: Quizzes.tsx and
-- TopicQuiz.tsx expect `correct`/`total` and per-question `selected` +
-- `correct_option`, while the live function returned `score` and
-- `selected_option`/`is_correct`. This restores the shape both pages use and
-- keeps the XP bits (attempt id, xp_earned, streak touch).
create or replace function public.grade_quiz(_quiz_id uuid, _answers jsonb, _submission_file_url text default null)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
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
  -- Admins bypass the approval gate for oversight, as everywhere else.
  if not (public.is_user_approved(_user_id) or public.has_role(_user_id, 'admin')) then
    raise exception 'Account not approved';
  end if;

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
$$;

grant execute on function public.grade_quiz(uuid, jsonb, text) to authenticated;
