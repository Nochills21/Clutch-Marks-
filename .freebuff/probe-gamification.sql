-- Verify the reworked gamification as a real student, then roll everything back
-- by raising the results as an exception.
do $$
declare
  uid uuid;
  qid uuid;
  correct integer;
  lb int;
  lb_admin int;
  s jsonb;
  w jsonb;
  prefs jsonb;
  prefs_after jsonb;
  sess jsonb;
  fin jsonb;
  ans jsonb;
  backfilled int;
  other_students int;
begin
  select p.user_id into uid
  from public.profiles p
  join public.user_roles r on r.user_id = p.user_id and r.role = 'student'
  where exists (select 1 from public.xp_events e where e.user_id = p.user_id)
  order by p.created_at
  limit 1;

  -- A question this student has never attempted, on a published quiz.
  select q.id, q.correct_option into qid, correct
  from public.questions q
  join public.quizzes z on z.id = q.quiz_id and z.is_published
  where not exists (select 1 from public.practice_attempts pa where pa.user_id = uid and pa.question_id = q.id)
  limit 1;

  -- Simulate a previous wrong attempt.
  insert into public.practice_attempts (user_id, question_id, last_correct, attempts_count, last_attempt_at)
  values (uid, qid, false, 1, now() - interval '1 day');

  select count(*) into other_students from public.xp_events;

  perform set_config('role', 'authenticated', true);
  perform set_config('request.jwt.claims', json_build_object('sub', uid::text, 'role', 'authenticated')::text, true);

  select count(*) into lb from public.leaderboard_public;
  s := public.my_xp_summary();
  w := public.my_wins(7);
  prefs := public.my_study_prefs();

  sess := public.start_study_session(20);
  fin := public.finish_study_session((sess->>'id')::uuid, true);

  ans := public.check_practice_answer(qid, correct);
  w := public.my_wins(7);

  prefs_after := public.set_study_prefs('{"weekly_goal_days": 4, "leaderboard_visible": false, "session_minutes": 10}'::jsonb);
  select count(*) into lb_admin from public.leaderboard_public;

  perform set_config('role', 'postgres', true);

  raise exception 'RES %', jsonb_build_object(
    'uid', uid,
    'leaderboard_rows', lb,
    'leaderboard_rows_after_opt_out', lb_admin,
    'summary', s,
    'wins_after_correction', w,
    'prefs_before', prefs,
    'prefs_after', prefs_after,
    'session_start', sess,
    'session_finish', fin,
    'practice_answer', ans,
    'xp_events_total', other_students
  );
end $$;
