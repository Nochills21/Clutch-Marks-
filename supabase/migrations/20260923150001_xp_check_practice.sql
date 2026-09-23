-- Practice answers earn XP too: 10 XP per correct answer, 100/day cap.
-- Applied after 20260923150000 (which notes it should be separate).
create or replace function public.check_practice_answer(_question_id uuid, _selected integer)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  _q record;
  _is_correct boolean;
  _xp integer := 0;
begin
  if auth.uid() is null then raise exception 'Not authenticated'; end if;
  if not public.is_user_approved(auth.uid()) then raise exception 'Account not approved'; end if;

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
$$;
