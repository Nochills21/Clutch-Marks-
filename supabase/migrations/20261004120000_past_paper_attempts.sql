-- Paper-scoped practice: every sitting of a past paper is saved here, and
-- completing one pays XP through award_xp() (the single award path) and keeps
-- the streak alive via touch_streak() — the same machinery quizzes, practice,
-- lessons and flashcards use.
--
-- Why an RPC: award_xp() and touch_streak() are revoked from anon/authenticated,
-- so the client cannot mint XP directly. record_paper_attempt() inserts the
-- attempt and awards inside one transaction, which also means a paper can never
-- be "completed" without the corresponding XP ledger row.

create table if not exists public.past_paper_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  -- Paper rows can be removed by an admin; keep the attempt (and its score)
  -- history rather than cascading it away.
  paper_id uuid references public.past_papers(id) on delete set null,
  paper_title text not null,
  session text,
  year integer,
  paper_number text,
  score integer not null default 0,
  total_marks integer not null default 0,
  percentage integer,
  duration_seconds integer,
  time_limit_seconds integer,
  -- Full per-question correction payload, so the result can be reopened.
  corrected_papers jsonb,
  xp_earned integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists past_paper_attempts_user_idx
  on public.past_paper_attempts (user_id, created_at desc);
create index if not exists past_paper_attempts_paper_idx
  on public.past_paper_attempts (paper_id, created_at desc);

alter table public.past_paper_attempts enable row level security;

-- Read your own attempts; admins can read all for oversight. No insert/update/
-- delete policies: writes only happen inside record_paper_attempt().
drop policy if exists "past paper attempts read own" on public.past_paper_attempts;
create policy "past paper attempts read own"
  on public.past_paper_attempts for select to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));

revoke all on public.past_paper_attempts from anon, authenticated;
grant select on public.past_paper_attempts to authenticated;

-- ── Record + award ──────────────────────────────────────────────────────────
-- 20 XP for completing a timed paper, 150 XP/day cap, ref = the attempt id so
-- each distinct sitting pays at most once. Returns the exact XP paid (which can
-- be less than 20 near the cap) plus the new streak.
--
-- Nullable params carry defaults (and sit after the required ones, as plpgsql
-- requires) so callers can omit an absent session/paper number.
drop function if exists public.record_paper_attempt(uuid, text, text, integer, text, integer, integer, integer, integer, jsonb);
create or replace function public.record_paper_attempt(
  p_paper_id uuid,
  p_paper_title text,
  p_score integer,
  p_total_marks integer,
  p_session text default null,
  p_year integer default null,
  p_paper_number text default null,
  p_duration_seconds integer default null,
  p_time_limit_seconds integer default null,
  p_corrected_papers jsonb default null
)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  _user_id uuid := auth.uid();
  _attempt_id uuid;
  _percentage integer;
  _xp integer := 0;
  _streak integer := 0;
begin
  if _user_id is null then raise exception 'Not authenticated'; end if;
  if not (public.is_user_approved(_user_id) or public.has_role(_user_id, 'admin')) then
    raise exception 'Account not approved';
  end if;

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
$$;

revoke all on function public.record_paper_attempt(uuid, text, integer, integer, text, integer, text, integer, integer, jsonb) from public, anon;
grant execute on function public.record_paper_attempt(uuid, text, integer, integer, text, integer, text, integer, integer, jsonb) to authenticated;
