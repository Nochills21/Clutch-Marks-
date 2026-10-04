-- XP + streaks + global leaderboard, with anti-abuse built into the award path.
--
-- Design:
--   * xp_events  — one row per awarded point batch; the append-only ledger.
--   * xp_daily   — per (user, day, tool) counters for enforcing daily caps.
--   * award_xp(p_user, p_tool, p_ref, p_points, p_cap, p_window) — the ONLY way
--     XP is granted. Server-side anti-abuse:
--       1. dedupe: same (user, tool, ref) can never be paid twice (unique index),
--       2. per-tool daily cap enforced inside the same transaction,
--       3. minimum gap between consecutive events (window seconds) kills burst spam,
--       4. admins are excluded from the leaderboard (no self-farming).
--   * Triggers on lesson_progress / material_progress / flashcard_progress pay XP
--     for genuine first-time completions; grade_quiz pays inside the RPC.
--   * leaderboard_public view: students only, opt-out respected, all-time + 30d.

-- ============ 1. Ledger ============
create table if not exists public.xp_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tool text not null,             -- 'quiz' | 'practice' | 'note' | 'flashcards' | 'lesson' | 'paper'
  ref text not null,              -- dedupe key: quiz id, lesson id, etc.
  points integer not null,
  created_at timestamptz not null default now()
);
create unique index if not exists xp_events_dedupe on public.xp_events (user_id, tool, ref);
create index if not exists xp_events_user_time on public.xp_events (user_id, created_at desc);
create index if not exists xp_events_time on public.xp_events (created_at desc);

alter table public.xp_events enable row level security;
drop policy if exists "xp read own" on public.xp_events;
create policy "xp read own" on public.xp_events for select
  using (user_id = auth.uid() or public.is_admin(auth.uid()));

-- ============ 2. Daily caps ============
create table if not exists public.xp_daily (
  user_id uuid not null references auth.users(id) on delete cascade,
  day date not null default current_date,
  tool text not null,
  points integer not null default 0,
  primary key (user_id, day, tool)
);
alter table public.xp_daily enable row level security;
drop policy if exists "xp_daily read own" on public.xp_daily;
create policy "xp_daily read own" on public.xp_daily for select
  using (user_id = auth.uid() or public.is_admin(auth.uid()));

-- ============ 3. Streaks ============
create table if not exists public.streaks (
  user_id uuid primary key references auth.users(id) on delete cascade,
  current_streak integer not null default 0,
  longest_streak integer not null default 0,
  last_active date,
  updated_at timestamptz not null default now()
);
alter table public.streaks enable row level security;
drop policy if exists "streaks read own" on public.streaks;
create policy "streaks read own" on public.streaks for select
  using (user_id = auth.uid() or public.is_admin(auth.uid()));

-- ============ 4. The single award path ============
create or replace function public.award_xp(
  p_user_id uuid,
  p_tool text,
  p_ref text,
  p_points integer,
  p_daily_cap integer,
  p_min_gap_seconds integer default 0
) returns boolean
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_today date := current_date;
  v_today_points integer;
  v_last_event timestamptz;
  v_paid integer;
begin
  if p_user_id is null or p_points is null or p_points <= 0 then
    return false;
  end if;
  -- Admins never earn XP: they aren't students and it blocks self-farming.
  if exists (select 1 from public.user_roles r where r.user_id = p_user_id and r.role = 'admin') then
    return false;
  end if;

  -- 4a. Dedupe: identical (user, tool, ref) already paid → no-op.
  insert into public.xp_events (user_id, tool, ref, points)
  values (p_user_id, p_tool, p_ref, p_points)
  on conflict (user_id, tool, ref) do nothing;

  if not found then
    return false;
  end if;

  -- 4b. Burst guard: too soon after the previous event.
  if p_min_gap_seconds > 0 then
    select max(created_at) into v_last_event from public.xp_events e
    where e.user_id = p_user_id and e.tool = p_tool and e.created_at < (select created_at from public.xp_events x where (x.user_id, x.tool, x.ref) = (p_user_id, p_tool, p_ref));
    if v_last_event is not null and now() - v_last_event < make_interval(secs => p_min_gap_seconds) then
      delete from public.xp_events where user_id = p_user_id and tool = p_tool and ref = p_ref;
      return false;
    end if;
  end if;

  -- 4c. Daily cap (points, not events — students can't game small awards).
  insert into public.xp_daily (user_id, day, tool, points) values (p_user_id, v_today, p_tool, 0)
  on conflict (user_id, day, tool) do nothing;
  select points into v_today_points from public.xp_daily
    where user_id = p_user_id and day = v_today and tool = p_tool for update;

  if v_today_points >= p_daily_cap then
    delete from public.xp_events where user_id = p_user_id and tool = p_tool and ref = p_ref;
    return false;
  end if;

  v_paid := least(p_points, p_daily_cap - v_today_points);
  update public.xp_daily set points = points + v_paid
    where user_id = p_user_id and day = v_today and tool = p_tool;
  update public.xp_events set points = v_paid
    where user_id = p_user_id and tool = p_tool and ref = p_ref;
  return v_paid > 0;
end;
$$;
revoke all on function public.award_xp(uuid, text, text, integer, integer, integer) from public, anon, authenticated;

-- ============ 5. Streak update (fires from award_xp callers via touch_streak) ============
create or replace function public.touch_streak(p_user_id uuid) returns void
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_last date;
begin
  if p_user_id is null then return; end if;
  insert into public.streaks (user_id, current_streak, longest_streak, last_active)
  values (p_user_id, 1, 1, current_date)
  on conflict (user_id) do nothing;

  select last_active into v_last from public.streaks where user_id = p_user_id;
  if v_last = current_date then
    return; -- already counted today
  elsif v_last = current_date - 1 then
    update public.streaks
      set current_streak = current_streak + 1,
          longest_streak = greatest(longest_streak, current_streak + 1),
          last_active = current_date, updated_at = now()
      where user_id = p_user_id;
  else
    update public.streaks set current_streak = 1, last_active = current_date, updated_at = now()
      where user_id = p_user_id;
  end if;
end;
$$;
revoke all on function public.touch_streak(uuid) from public, anon, authenticated;

-- ============ 6. Hook XP into real activity ============
-- 6a. Quiz grading: paid inside grade_quiz below.

-- 6b. Lesson completed for the first time (trigger fires only on flip to true).
create or replace function public.xp_on_lesson_complete() returns trigger
language plpgsql security definer set search_path to 'public' as $$
begin
  if new.completed and (old.completed is not true) then
    if public.award_xp(new.user_id, 'lesson', new.lesson_id::text, 10, 60) then
      perform public.touch_streak(new.user_id);
    end if;
  end if;
  return null;
end;
$$;
drop trigger if exists xp_lesson_complete on public.lesson_progress;
create trigger xp_lesson_complete after insert or update of completed on public.lesson_progress
  for each row execute function public.xp_on_lesson_complete();

-- 6c. Study material (note) completed for the first time.
create or replace function public.xp_on_material_complete() returns trigger
language plpgsql security definer set search_path to 'public' as $$
begin
  if new.completed and (old.completed is not true) then
    if public.award_xp(new.user_id, 'note', new.material_id::text, 10, 60) then
      perform public.touch_streak(new.user_id);
    end if;
  end if;
  return null;
end;
$$;
drop trigger if exists xp_material_complete on public.material_progress;
create trigger xp_material_complete after insert or update of completed on public.material_progress
  for each row execute function public.xp_on_material_complete();

-- 6d. Flashcard review: first review of a card ever (not per repetition — caps at
--     40 points/day; the unique dedupe makes re-reviewing worthless).
create or replace function public.xp_on_flashcard_review() returns trigger
language plpgsql security definer set search_path to 'public' as $$
begin
  if public.award_xp(new.user_id, 'flashcards', new.flashcard_id::text, 5, 40) then
    perform public.touch_streak(new.user_id);
  end if;
  return null;
end;
$$;
drop trigger if exists xp_flashcard_review on public.flashcard_progress;
create trigger xp_flashcard_review after insert on public.flashcard_progress
  for each row execute function public.xp_on_flashcard_review();

-- 6e. Practice/topic-question answers: paid from check_quiz_answer RPC (see below).

-- ============ 7. Wire grade_quiz + check_quiz_answer to award XP ============
-- grade_quiz: 20 XP per correct answer, 200 XP/day cap; also touches the streak.
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
  _results jsonb := '[]'::jsonb;
  _xp integer := 0;
begin
  if _user_id is null then raise exception 'Not authenticated'; end if;
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
$$;

-- check_practice_answer: 10 XP per correct answer, 100/day cap — applied in
-- 20260923150001_xp_check_practice.sql (kept separate because the live function
-- body is authoritative there).

-- ============ 8. Leaderboard ============
create or replace view public.leaderboard_public
with (security_invoker = true) as
select
  p.user_id,
  coalesce(p.full_name, split_part(p.email, '@', 1)) as display_name,
  coalesce(sum(e.points), 0)::integer as xp_all_time,
  coalesce(sum(case when e.created_at >= now() - interval '30 days' then e.points end), 0)::integer as xp_30d
from public.profiles p
join public.user_roles r on r.user_id = p.user_id and r.role in ('student', 'parent') and r.is_approved
left join public.xp_events e on e.user_id = p.user_id
group by p.user_id, display_name
having coalesce(sum(e.points), 0) > 0;

grant select on public.leaderboard_public to authenticated;

-- ============ 9. Per-user XP summary for the dashboard ============
create or replace function public.my_xp_summary()
returns jsonb
language sql
security definer
set search_path to 'public'
as $$
  select jsonb_build_object(
    'xp_all_time', coalesce((select sum(points) from xp_events where user_id = auth.uid()), 0),
    'xp_today', coalesce((select sum(points) from xp_events where user_id = auth.uid() and created_at >= current_date), 0),
    'xp_30d', coalesce((select sum(points) from xp_events where user_id = auth.uid() and created_at >= now() - interval '30 days'), 0),
    'caps_used', (select jsonb_object_agg(tool, points) from xp_daily where user_id = auth.uid() and day = current_date),
    'streak', coalesce((select current_streak from streaks where user_id = auth.uid()), 0),
    'longest_streak', coalesce((select longest_streak from streaks where user_id = auth.uid()), 0)
  );
$$;
grant execute on function public.my_xp_summary() to authenticated;
