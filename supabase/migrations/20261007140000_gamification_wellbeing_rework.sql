-- Gamification rework — reward understanding, not time; forgiving weekly goals;
-- personal progress over competition; opt-in everything; recovery not pressure.
--
-- Design notes, one per student-welfare principle:
--   1. Reward learning, not time  — XP still comes from completions and correct
--      answers. Two additions: fixing a question you previously got wrong pays
--      15 XP ('mistake_fixed', once per question ever), and *finishing a chosen
--      focus session* pays a FLAT 20 XP whatever its length (10/20/30 min are
--      equal — a longer timer is never worth more).
--   2. Forgiving weekly goals — `streaks` no longer tracks a days-in-a-row
--      counter that resets to zero. `touch_streak` never decrements: it records
--      `last_active` and keeps `longest_streak` = the best *number of days
--      studied in one week* ever. The number the UI shows is recomputed from the
--      XP ledger for the current ISO week, so missing a day cannot "break"
--      anything and a new week simply starts fresh.
--   3. Small and adjustable — student_prefs holds weekly_goal_days (1..7) and
--      session_minutes (10/20/30); both are changeable at any time and nothing
--      is lost by changing them.
--   4. Personal progress over competition — the leaderboard is opt-out via
--      student_prefs.leaderboard_visible and the dashboard leads with the
--      student's own week; my_wins() returns specific personal improvements.
--   5. Occasional specific encouragement — my_wins() supplies the data; the UI
--      shows at most a couple of concrete lines and nothing pushes a return.
--   6. Recovery — finishing a session tells the student to take a break and
--      stops pushing practice once the day's goal is met (today_goal_met).
--   7. No shame language — no counters here can decrease, so no copy can say
--      something was lost.
--   8. Student control — every optional surface has a stored preference.

-- ============ 1. Student preferences (everything optional lives here) ============
create table if not exists public.student_prefs (
  user_id uuid primary key references auth.users(id) on delete cascade,
  weekly_goal_days integer not null default 3 check (weekly_goal_days between 1 and 7),
  session_minutes integer not null default 20 check (session_minutes in (10, 20, 30)),
  leaderboard_visible boolean not null default true,
  reminders_enabled boolean not null default true,
  animations_enabled boolean not null default true,
  encouragement_enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.student_prefs enable row level security;
drop policy if exists "prefs read own" on public.student_prefs;
create policy "prefs read own" on public.student_prefs for select
  using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));
drop policy if exists "prefs write own" on public.student_prefs;
create policy "prefs write own" on public.student_prefs for insert
  with check (user_id = auth.uid());
drop policy if exists "prefs update own" on public.student_prefs;
create policy "prefs update own" on public.student_prefs for update
  using (user_id = auth.uid()) with check (user_id = auth.uid());

grant select, insert, update on public.student_prefs to authenticated;
grant all on public.student_prefs to service_role;

-- ============ 2. Focus sessions (10/20/30 min, pausable, never punitive) ============
create table if not exists public.study_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  planned_minutes integer not null check (planned_minutes in (10, 20, 30)),
  status text not null default 'active' check (status in ('active', 'completed', 'set_aside')),
  started_at timestamptz not null default now(),
  ended_at timestamptz
);
-- At most one open session per student, so "resume" is unambiguous.
create unique index if not exists study_sessions_one_active
  on public.study_sessions (user_id) where status = 'active';
create index if not exists study_sessions_user_time
  on public.study_sessions (user_id, started_at desc);

alter table public.study_sessions enable row level security;
drop policy if exists "sessions read own" on public.study_sessions;
create policy "sessions read own" on public.study_sessions for select
  using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));
drop policy if exists "sessions insert own" on public.study_sessions;
create policy "sessions insert own" on public.study_sessions for insert
  with check (user_id = auth.uid());
drop policy if exists "sessions update own" on public.study_sessions;
create policy "sessions update own" on public.study_sessions for update
  using (user_id = auth.uid()) with check (user_id = auth.uid());

grant select, insert, update on public.study_sessions to authenticated;
grant all on public.study_sessions to service_role;

-- ============ 3. Forgiving momentum (replaces the reset-to-zero streak) ============
create or replace function public.touch_streak(p_user_id uuid)
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_week_start date := date_trunc('week', current_date)::date;
  v_days integer;
begin
  if p_user_id is null then return; end if;

  insert into public.streaks (user_id, current_streak, longest_streak, last_active)
  values (p_user_id, 0, 0, current_date)
  on conflict (user_id) do nothing;

  -- Days studied this ISO week, straight from the XP ledger. Nothing here can
  -- decrease: a quiet day just is not added, and Monday starts a fresh count.
  select count(distinct e.created_at::date)
    into v_days
  from public.xp_events e
  where e.user_id = p_user_id
    and e.created_at >= v_week_start
    and e.created_at < v_week_start + 7;

  update public.streaks
     set current_streak = coalesce(v_days, 0),
         longest_streak = greatest(longest_streak, coalesce(v_days, 0)),
         last_active = current_date,
         updated_at = now()
   where user_id = p_user_id;
end;
$function$;
revoke all on function public.touch_streak(uuid) from public, anon, authenticated;

-- Carry the historical day-streak over as "best week" so nobody is shown a 0
-- they never earned. Purely additive: greatest() can only raise the number.
update public.streaks s
   set longest_streak = sub.best
from (
  select user_id, max(days_in_week) as best
  from (
    select user_id, date_trunc('week', created_at)::date as wk,
           count(distinct created_at::date) as days_in_week
    from public.xp_events
    group by user_id, wk
  ) w
  group by user_id
) sub
where s.user_id = sub.user_id and sub.best > s.longest_streak;

-- ============ 4. Focus-session RPCs ============
-- Starting a new session sets the previous open one aside rather than deleting
-- it — a student who stops mid-session keeps the record, and nothing is lost.
create or replace function public.start_study_session(_minutes integer default 20)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  _uid uuid := auth.uid();
  _row public.study_sessions;
begin
  if _uid is null then raise exception 'Not authenticated'; end if;
  if not public.is_user_approved(_uid) then raise exception 'Account not approved'; end if;
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

-- Finishing pays a flat 20 XP for any length (cap 40/day — two sessions is a
-- full day; there is deliberately nothing to gain from grinding a third).
create or replace function public.finish_study_session(_session_id uuid, _completed boolean default true)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  _uid uuid := auth.uid();
  _row public.study_sessions;
  _xp integer := 0;
  _week_days integer;
  _goal integer;
  _goal_met boolean;
begin
  if _uid is null then raise exception 'Not authenticated'; end if;

  select * into _row from public.study_sessions
   where id = _session_id and user_id = _uid;
  if not found then raise exception 'Session not found'; end if;

  update public.study_sessions
     set status = case when _completed then 'completed' else 'set_aside' end,
         ended_at = now()
   where id = _session_id and user_id = _uid;

  if _completed and _row.status = 'active' then
    if public.award_xp(_uid, 'session', _session_id::text, 20, 40, 600) then
      _xp := 20;
    end if;
    perform public.touch_streak(_uid);
  end if;

  select count(distinct created_at::date) into _week_days
  from public.xp_events
  where user_id = _uid and created_at >= date_trunc('week', current_date)::date
    and created_at < date_trunc('week', current_date)::date + 7;

  _goal := coalesce((select weekly_goal_days from public.student_prefs where user_id = _uid), 3);
  _goal_met := public.today_goal_met(_uid);

  return jsonb_build_object(
    'xp_earned', _xp,
    'days_this_week', coalesce(_week_days, 0),
    'weekly_goal_days', _goal,
    'weekly_goal_met', coalesce(_week_days, 0) >= _goal,
    'today_goal_met', _goal_met
  );
end;
$function$;

-- Has the student done their bit for today? A finished focus session counts, and
-- so does ~50 XP of real work (a quiz plus some practice, say).
create or replace function public.today_goal_met(p_user_id uuid)
returns boolean
language sql
security definer
set search_path to 'public'
as $function$
  select exists (
      select 1 from public.study_sessions s
      where s.user_id = p_user_id and s.status = 'completed'
        and s.started_at::date = current_date
    )
    or coalesce((
      select sum(e.points) from public.xp_events e
      where e.user_id = p_user_id and e.created_at::date = current_date
    ), 0) >= 50;
$function$;
revoke all on function public.today_goal_met(uuid) from public, anon, authenticated;
grant execute on function public.today_goal_met(uuid) to service_role;

do $$
begin
  execute 'revoke all on function public.start_study_session(integer) from public, anon';
  execute 'revoke all on function public.finish_study_session(uuid, boolean) from public, anon';
end $$;
grant execute on function public.start_study_session(integer) to authenticated;
grant execute on function public.finish_study_session(uuid, boolean) to authenticated;

-- ============ 5. Preferences RPCs (client never touches the table) ============
create or replace function public.my_study_prefs()
returns jsonb
language sql
security definer
set search_path to 'public'
as $function$
  select jsonb_build_object(
    'weekly_goal_days', coalesce(p.weekly_goal_days, 3),
    'session_minutes', coalesce(p.session_minutes, 20),
    'leaderboard_visible', coalesce(p.leaderboard_visible, true),
    'reminders_enabled', coalesce(p.reminders_enabled, true),
    'animations_enabled', coalesce(p.animations_enabled, true),
    'encouragement_enabled', coalesce(p.encouragement_enabled, true)
  )
  from (select 1) _
  left join public.student_prefs p on p.user_id = auth.uid();
$function$;

create or replace function public.set_study_prefs(_patch jsonb)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  _uid uuid := auth.uid();
begin
  if _uid is null then raise exception 'Not authenticated'; end if;
  if _patch is null or jsonb_typeof(_patch) <> 'object' then raise exception 'Expected an object'; end if;

  insert into public.student_prefs (user_id) values (_uid) on conflict (user_id) do nothing;

  update public.student_prefs
     set weekly_goal_days = coalesce((_patch->>'weekly_goal_days')::integer, weekly_goal_days),
         session_minutes = coalesce((_patch->>'session_minutes')::integer, session_minutes),
         leaderboard_visible = coalesce((_patch->>'leaderboard_visible')::boolean, leaderboard_visible),
         reminders_enabled = coalesce((_patch->>'reminders_enabled')::boolean, reminders_enabled),
         animations_enabled = coalesce((_patch->>'animations_enabled')::boolean, animations_enabled),
         encouragement_enabled = coalesce((_patch->>'encouragement_enabled')::boolean, encouragement_enabled),
         updated_at = now()
   where user_id = _uid;

  return public.my_study_prefs();
end;
$function$;
revoke all on function public.my_study_prefs() from public, anon;
revoke all on function public.set_study_prefs(jsonb) from public, anon;
grant execute on function public.my_study_prefs() to authenticated;
grant execute on function public.set_study_prefs(jsonb) to authenticated;

-- ============ 6. Mistake-correction XP ============
-- Getting a question right that you had previously got wrong is the single most
-- valuable thing a student can do here, so it pays more than a fresh correct
-- answer. Once per question ever (the 'mistake_fixed' dedupe key is the id).
create or replace function public.check_practice_answer(_question_id uuid, _selected integer)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  _q record;
  _is_correct boolean;
  _prev_correct boolean;
  _first_try boolean;
  _xp integer := 0;
  _corrected boolean := false;
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
revoke all on function public.check_practice_answer(uuid, integer) from public, anon;
grant execute on function public.check_practice_answer(uuid, integer) to authenticated;

-- ============ 7. Weekly + personal summary ============
create or replace function public.my_xp_summary()
returns jsonb
language sql
security definer
set search_path to 'public'
as $function$
  with me as (select auth.uid() as uid),
  wk as (select date_trunc('week', current_date)::date as ws),
  days as (
    select distinct e.created_at::date as d
    from public.xp_events e, me
    where e.user_id = me.uid and e.created_at >= (select ws from wk)
  ),
  prefs as (select p.* from public.student_prefs p, me where p.user_id = me.uid)
  select jsonb_build_object(
    'xp_all_time', coalesce((select sum(points) from public.xp_events where user_id = (select uid from me)), 0),
    'xp_today', coalesce((select sum(points) from public.xp_events where user_id = (select uid from me) and created_at >= current_date), 0),
    'xp_30d', coalesce((select sum(points) from public.xp_events where user_id = (select uid from me) and created_at >= now() - interval '30 days'), 0),
    'caps_used', (select jsonb_object_agg(tool, points) from public.xp_daily where user_id = (select uid from me) and day = current_date),
    -- Repurposed, and now non-punishing: days studied this week.
    'streak', (select count(*) from days),
    'longest_streak', coalesce((select longest_streak from public.streaks where user_id = (select uid from me)), 0),
    'days_this_week', (select count(*) from days),
    'week_days', coalesce((select jsonb_agg(distinct extract(isodow from d)) from days), '[]'::jsonb),
    'weekly_goal_days', coalesce((select weekly_goal_days from prefs), 3),
    'weekly_goal_met', (select count(*) from days) >= coalesce((select weekly_goal_days from prefs), 3),
    'session_minutes', coalesce((select session_minutes from prefs), 20),
    'leaderboard_visible', coalesce((select leaderboard_visible from prefs), true),
    'reminders_enabled', coalesce((select reminders_enabled from prefs), true),
    'animations_enabled', coalesce((select animations_enabled from prefs), true),
    'encouragement_enabled', coalesce((select encouragement_enabled from prefs), true),
    'today_goal_met', public.today_goal_met((select uid from me)),
    'today_active_session', coalesce((
      select jsonb_build_object('id', s.id, 'planned_minutes', s.planned_minutes, 'started_at', s.started_at)
      from public.study_sessions s, me
      where s.user_id = me.uid and s.status = 'active'
      limit 1
    ), 'null'::jsonb),
    'sessions_this_week', (
      select count(*) from public.study_sessions s, me
      where s.user_id = me.uid and s.status = 'completed'
        and s.started_at >= (select ws from wk)
    )
  );
$function$;
grant execute on function public.my_xp_summary() to authenticated;

-- ============ 8. Specific, personal wins ============
-- Feeds "you corrected three mistakes in Forces" style encouragement. The client
-- chooses the wording; this only reports what actually happened.
create or replace function public.my_wins(_days integer default 7)
returns jsonb
language sql
security definer
set search_path to 'public'
as $function$
  with me as (select auth.uid() as uid),
  win as (select now() - make_interval(days => greatest(1, least(coalesce(_days, 7), 30))) as t),
  recent as (
    select pa.* from public.practice_attempts pa, me
    where pa.user_id = me.uid and pa.last_correct and pa.attempts_count > 1
      and pa.last_attempt_at >= (select t from win)
  )
  select jsonb_build_object(
    'days_studied', (
      select count(distinct e.created_at::date) from public.xp_events e, me
      where e.user_id = me.uid and e.created_at >= (select t from win)
    ),
    'mistakes_fixed', (select count(*) from recent),
    'mistakes_fixed_by_subject', coalesce((
      select jsonb_agg(x order by (x->>'fixed')::integer desc) from (
        select jsonb_build_object('subject', s.name, 'fixed', count(*)) as x
        from recent r
        join public.questions q on q.id = r.question_id
        join public.quizzes z on z.id = q.quiz_id
        join public.topics t on t.id = z.topic_id
        join public.subject_levels sl on sl.id = t.subject_level_id
        join public.subjects s on s.id = sl.subject_id
        group by s.name
        order by count(*) desc
        limit 3
      ) sub
    ), '[]'::jsonb),
    'lessons_completed', (
      select count(*) from public.lesson_progress lp, me
      where lp.user_id = me.uid and lp.completed and lp.completed_at >= (select t from win)
    ),
    'notes_completed', (
      select count(*) from public.material_progress mp, me
      where mp.user_id = me.uid and mp.completed and mp.completed_at >= (select t from win)
    ),
    'quizzes_done', (
      select count(*) from public.quiz_attempts qa, me
      where qa.user_id = me.uid and qa.completed_at >= (select t from win)
    ),
    'best_quiz_pct', (
      select max(round(100.0 * qa.score / nullif(qa.total_questions, 0)))::integer
      from public.quiz_attempts qa, me
      where qa.user_id = me.uid and qa.completed_at >= (select t from win)
    ),
    'sessions_completed', (
      select count(*) from public.study_sessions s, me
      where s.user_id = me.uid and s.status = 'completed' and s.started_at >= (select t from win)
    ),
    -- "You improved on algebra": this week's quiz average vs last week's, per
    -- subject, only where there is a real (>=5 point) improvement.
    'subject_improvements', coalesce((
      select jsonb_agg(jsonb_build_object(
               'subject', subject, 'recent_pct', recent_pct, 'delta', delta
             ) order by delta desc)
      from (
        select s.name as subject,
               round(avg(case when qa.completed_at >= now() - interval '7 days'
                              then 100.0 * qa.score / nullif(qa.total_questions, 0) end))::integer as recent_pct,
               (round(avg(case when qa.completed_at >= now() - interval '7 days'
                               then 100.0 * qa.score / nullif(qa.total_questions, 0) end))
              - round(avg(case when qa.completed_at < now() - interval '7 days'
                               then 100.0 * qa.score / nullif(qa.total_questions, 0) end)))::integer as delta
        from public.quiz_attempts qa
        join public.quizzes z on z.id = qa.quiz_id
        join public.topics t on t.id = z.topic_id
        join public.subject_levels sl on sl.id = t.subject_level_id
        join public.subjects s on s.id = sl.subject_id, me
        where qa.user_id = me.uid and qa.completed_at >= now() - interval '14 days'
        group by s.name
        having avg(case when qa.completed_at >= now() - interval '7 days'
                        then 100.0 * qa.score / nullif(qa.total_questions, 0) end) is not null
           and avg(case when qa.completed_at < now() - interval '7 days'
                        then 100.0 * qa.score / nullif(qa.total_questions, 0) end) is not null
      ) sub
      where delta >= 5
    ), '[]'::jsonb)
  );
$function$;
revoke all on function public.my_wins(integer) from public, anon;
grant execute on function public.my_wins(integer) to authenticated;

-- ============ 9. Leaderboard: fixed, privacy-safe, opt-out ============
-- Two live bugs fixed here:
--   a) the view was `security_invoker = true`, so a student's RLS on xp_events
--      (deny-all: no policy exists) made every row read as 0 XP and the HAVING
--      clause then dropped it — the board was empty for everyone. The view now
--      runs with owner rights and exposes only aggregates plus a display name.
--   b) display_name fell back to the email local part, publishing half of every
--      student's address. Names now come from full_name / username only.
-- Opt-out: students who turned the leaderboard off are excluded per row.
drop view if exists public.leaderboard_public;
create view public.leaderboard_public
with (security_invoker = false) as
select
  p.user_id,
  coalesce(
    nullif(btrim(p.full_name), ''),
    nullif(btrim(p.username), ''),
    'Student'
  ) as display_name,
  coalesce(sum(e.points), 0)::integer as xp_all_time,
  coalesce(sum(case when e.created_at >= now() - interval '30 days' then e.points end), 0)::integer as xp_30d
from public.profiles p
join public.user_roles r
  on r.user_id = p.user_id and r.role in ('student', 'parent') and r.is_approved
left join public.student_prefs sp on sp.user_id = p.user_id
left join public.xp_events e on e.user_id = p.user_id
where coalesce(sp.leaderboard_visible, true)
group by p.user_id, display_name
having coalesce(sum(e.points), 0) > 0;

grant select on public.leaderboard_public to authenticated;
grant select on public.leaderboard_public to service_role;
