-- The mastery loop, on top of objectives.
--
-- 20261009170000 gave a topic its objectives (`learning_objectives`), its
-- micro-lessons (`teach`) and the tag that says which objective a question
-- checks (`questions.objective_id`). This migration turns answers into the three
-- things a student can act on:
--
--   public.objective_reviews            - the resurfacing schedule: one row per
--                                         (student, objective), advanced by answers
--   public.my_objective_mastery()       - the caller's state per objective
--   public.my_next_objective()          - the weakest thing to do next, as one row
--   public.objective_review_questions() - the checks to resurface for an objective
--
-- Evidence is public.practice_attempts, already the single row per
-- (student, question) that practice mode writes through check_practice_answer().
-- A trigger on that table advances the schedule, so every existing answer path
-- (and any future one) feeds the loop without the client knowing about it.
-- grade_quiz() — which used to write only quiz_attempts — now writes the same
-- rows for objective-tagged questions, because taking a topic's checkpoint quiz
-- is evidence about those objectives. Untagged questions (the legacy bank) are
-- left exactly as they were.
--
-- The schedule is a five-step ladder: 1, 3, 7, 16, 35 days. A correct answer
-- moves up one step; a wrong answer drops to the bottom and is due tomorrow.
-- Short and blunt on purpose — a student who is wrong should see the objective
-- again soon, and one who is right should stop seeing it.
--
-- Idempotent: safe to re-run.

-- ---------------------------------------------------------------- the schedule

create table if not exists public.objective_reviews (
  user_id uuid not null references auth.users(id) on delete cascade,
  objective_id uuid not null references public.learning_objectives(id) on delete cascade,
  -- 0 = answered, not yet right; 1..5 = rungs of the ladder.
  stage integer not null default 0,
  reviews integer not null default 0,
  -- How many of those reviews were wrong. Reported, never used to punish.
  lapses integer not null default 0,
  last_correct boolean,
  last_reviewed_at timestamp with time zone not null default now(),
  due_at timestamp with time zone not null default now(),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  primary key (user_id, objective_id)
);

comment on table public.objective_reviews is
  'Resurfacing schedule per student and objective; written by answers, never by the client.';

create index if not exists idx_objective_reviews_due
  on public.objective_reviews (user_id, due_at);

alter table public.objective_reviews enable row level security;

-- Read your own schedule. There is deliberately NO insert/update policy: the
-- schedule is evidence, and evidence a client can rewrite is not evidence. The
-- trigger below is SECURITY DEFINER, so it advances the schedule regardless.
drop policy if exists "Students can view their own review schedule" on public.objective_reviews;
create policy "Students can view their own review schedule"
  on public.objective_reviews for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Admins can manage review schedules" on public.objective_reviews;
create policy "Admins can manage review schedules"
  on public.objective_reviews for all to authenticated
  using (has_role(auth.uid(), 'admin'::app_role))
  with check (has_role(auth.uid(), 'admin'::app_role));

drop trigger if exists update_objective_reviews_updated_at on public.objective_reviews;
create trigger update_objective_reviews_updated_at
  before update on public.objective_reviews
  for each row execute function public.update_updated_at();

/** The ladder. Clamped, so a corrupted stage can never produce a null interval. */
create or replace function public.objective_review_interval(_stage integer)
returns interval
language sql
immutable
as $function$
  select (array[
    interval '1 day',
    interval '3 days',
    interval '7 days',
    interval '16 days',
    interval '35 days'
  ])[greatest(1, least(5, coalesce(_stage, 1)))];
$function$;

comment on function public.objective_review_interval(integer) is
  'Days until an objective should resurface, by ladder stage (1, 3, 7, 16, 35).';

-- ------------------------------------------------------- advancing the schedule

/**
 * Fold one answer into the schedule of the objective it checks. No-op for a
 * question that carries no objective, which is what keeps the legacy bank out.
 */
create or replace function public.record_objective_evidence(
  _user_id uuid,
  _question_id uuid,
  _is_correct boolean
)
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  _objective uuid;
begin
  select q.objective_id into _objective
    from public.questions q
   where q.id = _question_id;

  if _objective is null then
    return;
  end if;

  insert into public.objective_reviews as r
    (user_id, objective_id, stage, reviews, lapses, last_correct, due_at)
  values (
    _user_id,
    _objective,
    case when _is_correct then 1 else 0 end,
    1,
    case when _is_correct then 0 else 1 end,
    _is_correct,
    now() + public.objective_review_interval(case when _is_correct then 1 else 0 end)
  )
  on conflict (user_id, objective_id) do update
    set stage = case when _is_correct then least(5, r.stage + 1) else 0 end,
        reviews = r.reviews + 1,
        lapses = r.lapses + (case when _is_correct then 0 else 1 end),
        last_correct = excluded.last_correct,
        last_reviewed_at = now(),
        updated_at = now(),
        due_at = now() + public.objective_review_interval(
          case when _is_correct then least(5, r.stage + 1) else 0 end
        );
end;
$function$;

comment on function public.record_objective_evidence(uuid, uuid, boolean) is
  'Advance the review schedule from one answer. Service-side only: it takes a user id.';

revoke all on function public.record_objective_evidence(uuid, uuid, boolean) from public, anon, authenticated;

-- The one place every answer lands, so the loop needs no client cooperation.
create or replace function public.trg_practice_attempt_objective()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  perform public.record_objective_evidence(new.user_id, new.question_id, new.last_correct);
  return null;
end;
$function$;

drop trigger if exists practice_attempts_objective_review on public.practice_attempts;
create trigger practice_attempts_objective_review
  after insert or update of last_correct on public.practice_attempts
  for each row execute function public.trg_practice_attempt_objective();

-- ----------------------------------------------------- quiz attempts count too

/**
 * Unchanged from the version it replaces except for the block that writes
 * practice_attempts rows for objective-tagged questions. Without it, a student
 * answering a topic's checkpoint quiz would move their quiz score and nothing
 * else — the quiz path and the practice path would disagree about the same
 * answers.
 */
create or replace function public.grade_quiz(
  _quiz_id uuid,
  _answers jsonb,
  _submission_file_url text default null::text
)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
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

-- ------------------------------------------------------------- reading the loop

/**
 * The caller's state per objective, across every topic that has objectives.
 *
 * Security invoker: `practice_attempts` and `objective_reviews` are RLS-scoped
 * to their owner, so this cannot report anybody else's mastery, and there is no
 * uid parameter — that is the shape that turns a progress function into an
 * enumeration oracle.
 */
create or replace function public.my_objective_mastery()
returns table (
  subject_slug text,
  level text,
  topic_id uuid,
  topic_slug text,
  topic_name text,
  objective_id uuid,
  code text,
  statement text,
  sort_order integer,
  checks integer,
  attempted integer,
  correct integer,
  state text,
  stage integer,
  due_at timestamp with time zone,
  overdue boolean,
  last_reviewed_at timestamp with time zone
)
language sql
stable
security invoker
set search_path to 'public'
as $function$
  with per_objective as (
    select o.id,
           o.topic_id,
           o.code,
           o.statement,
           o.sort_order,
           (select count(*) from public.questions q where q.objective_id = o.id)::int as checks,
           (select count(*)
              from public.practice_attempts pa
              join public.questions q on q.id = pa.question_id
             where q.objective_id = o.id and pa.user_id = auth.uid())::int as attempted,
           (select count(*)
              from public.practice_attempts pa
              join public.questions q on q.id = pa.question_id
             where q.objective_id = o.id and pa.user_id = auth.uid() and pa.last_correct)::int as correct
      from public.learning_objectives o
  )
  select s.slug as subject_slug,
         sl.level::text as level,
         t.id as topic_id,
         t.slug as topic_slug,
         t.name as topic_name,
         po.id as objective_id,
         po.code,
         po.statement,
         po.sort_order,
         po.checks,
         po.attempted,
         po.correct,
         case
           when po.attempted = 0 then 'not_started'
           when po.checks > 0 and po.correct >= po.checks then 'mastered'
           else 'working'
         end as state,
         coalesce(r.stage, 0) as stage,
         r.due_at,
         (r.due_at is not null and r.due_at <= now()) as overdue,
         r.last_reviewed_at
    from per_objective po
    join public.topics t on t.id = po.topic_id
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
    left join public.objective_reviews r
      on r.objective_id = po.id and r.user_id = auth.uid()
   order by s.slug, sl.level, t.name, po.sort_order, po.code;
$function$;

comment on function public.my_objective_mastery() is
  'The caller''s mastery state per objective; security invoker, no uid parameter.';

/**
 * The single weakest thing to do next, as one row.
 *
 * Order, and why:
 *   1. overdue reviews, most overdue first — the schedule is the whole point of
 *      resurfacing, and an objective the student has already met still has to be
 *      held;
 *   2. objectives they are getting wrong (state 'working'), weakest ratio first;
 *   3. objectives never started;
 *   4. otherwise the least recently reviewed one, so there is always an action
 *      rather than an empty panel.
 */
create or replace function public.my_next_objective()
returns table (
  action text,
  subject_slug text,
  level text,
  topic_id uuid,
  topic_slug text,
  topic_name text,
  objective_id uuid,
  code text,
  statement text,
  checks integer,
  attempted integer,
  correct integer,
  state text,
  stage integer,
  due_at timestamp with time zone,
  overdue boolean
)
language sql
stable
security invoker
set search_path to 'public'
as $function$
  select case
           when m.overdue then 'review'
           when m.state = 'working' then 'practise'
           when m.state = 'not_started' then 'start'
           else 'review'
         end as action,
         m.subject_slug, m.level, m.topic_id, m.topic_slug, m.topic_name,
         m.objective_id, m.code, m.statement,
         m.checks, m.attempted, m.correct, m.state, m.stage, m.due_at, m.overdue
    from public.my_objective_mastery() m
   where m.checks > 0
   order by (case when m.overdue then 0 else 1 end),
            (case when m.overdue then now() - m.due_at else interval '0' end) desc,
            (case m.state when 'working' then 0 when 'not_started' then 1 else 2 end),
            (case when m.attempted > 0 then m.correct::numeric / greatest(m.checks, 1) else 1 end),
            m.last_reviewed_at asc nulls first,
            m.code
   limit 1;
$function$;

comment on function public.my_next_objective() is
  'The weakest objective to work on now, for the caller.';

/**
 * The checks to resurface for one objective.
 *
 * Deliberately does NOT return correct_option: the answer key stays on the
 * server, and check_practice_answer() reveals it only after the student commits
 * to an answer. Ordering is the resurfacing rule — never-answered and
 * last-wrong checks first, then the ones not seen for longest.
 */
create or replace function public.objective_review_questions(
  _objective_id uuid,
  _limit integer default 5
)
returns table (
  question_id uuid,
  question_text text,
  options jsonb,
  difficulty text,
  sort_order integer,
  attempts_count integer,
  last_correct boolean,
  last_attempt_at timestamp with time zone,
  next_due_at timestamp with time zone,
  stage integer
)
language sql
stable
security invoker
set search_path to 'public'
as $function$
  select q.id as question_id,
         q.question_text,
         q.options,
         q.difficulty,
         q.sort_order,
         coalesce(pa.attempts_count, 0) as attempts_count,
         pa.last_correct,
         pa.last_attempt_at,
         r.due_at as next_due_at,
         coalesce(r.stage, 0) as stage
    from public.questions q
    left join public.practice_attempts pa
      on pa.question_id = q.id and pa.user_id = auth.uid()
    left join public.objective_reviews r
      on r.objective_id = q.objective_id and r.user_id = auth.uid()
   where q.objective_id = _objective_id
   order by coalesce(pa.last_correct, false) asc,
            pa.last_attempt_at asc nulls first,
            q.sort_order
   limit greatest(1, least(20, coalesce(_limit, 5)));
$function$;

comment on function public.objective_review_questions(uuid, integer) is
  'Checks to resurface for one objective, without the answer key.';

-- Authenticated only: all three report the caller's own state, so an anonymous
-- grant would only ever return zeros while inviting calls that cannot mean
-- anything.
revoke all on function public.my_objective_mastery() from public, anon;
revoke all on function public.my_next_objective() from public, anon;
revoke all on function public.objective_review_questions(uuid, integer) from public, anon;
grant execute on function public.my_objective_mastery() to authenticated;
grant execute on function public.my_next_objective() to authenticated;
grant execute on function public.objective_review_questions(uuid, integer) to authenticated;
