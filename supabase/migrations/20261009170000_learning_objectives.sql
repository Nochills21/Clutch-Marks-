-- Learning objectives: the spine the content was missing.
--
-- Today a topic is one markdown lesson (~1,450 characters) plus ~20 uniformly
-- "medium" multiple-choice questions. That teaches and tests at the *topic*
-- level, which is why a student who is weak on one idea inside a topic cannot be
-- shown what to fix. The platforms we are measured against are built the other
-- way round: a topic is a list of objectives, each objective carries its own
-- short explanation and its own checks, and mastery is tracked per objective.
--
-- So:
--   public.learning_objectives  - one row per syllabus statement we teach
--                                 (code + statement + `teach`, the micro-lesson)
--   questions.objective_id      - which objective a question checks
--   questions.difficulty        - the tier vocabulary, now meaningful:
--                                 'check'  (after the teach block, recall)
--                                 'drill'  (the topic quiz, application)
--                                 'exam'   (past-paper style, full marks)
--                                 'medium' is the legacy value and stays valid
--   public.topic_objective_mastery(_topic_id) - per-objective state for the
--                                 caller, derived from practice_attempts
--
-- Content stays public to read (the site's content tables answer anonymous
-- SELECT); only admins write.
--
-- Idempotent: safe to re-run.

create table if not exists public.learning_objectives (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid not null references public.topics(id) on delete cascade,
  -- Syllabus reference, exactly as it reads in the specification, e.g.
  -- '0580 E2.5' — "nothing more, and nothing missing" only means something if
  -- each objective can be pointed at the statement it covers.
  code text not null,
  -- What the student must be able to do, in one sentence, in their language.
  statement text not null,
  -- The micro-lesson: markdown, short enough to read in a few minutes, ending
  -- in the check that follows it. Nullable while an objective is being written.
  teach text,
  sort_order integer not null default 0,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  unique (topic_id, code)
);

comment on table public.learning_objectives is
  'Per-topic syllabus objectives: the micro-lesson and the unit of mastery.';

create index if not exists idx_learning_objectives_topic
  on public.learning_objectives (topic_id, sort_order);

alter table public.learning_objectives enable row level security;

drop policy if exists "Anyone can view objectives" on public.learning_objectives;
create policy "Anyone can view objectives"
  on public.learning_objectives for select to anon using (true);

drop policy if exists "Anyone authenticated can view objectives" on public.learning_objectives;
create policy "Anyone authenticated can view objectives"
  on public.learning_objectives for select to authenticated using (true);

drop policy if exists "Admins can manage objectives" on public.learning_objectives;
create policy "Admins can manage objectives"
  on public.learning_objectives for all to authenticated
  using (has_role(auth.uid(), 'admin'::app_role))
  with check (has_role(auth.uid(), 'admin'::app_role));

drop trigger if exists update_learning_objectives_updated_at on public.learning_objectives;
create trigger update_learning_objectives_updated_at
  before update on public.learning_objectives
  for each row execute function public.update_updated_at();

-- Which objective a question checks. on delete set null so removing an
-- objective never deletes student-facing questions.
alter table public.questions
  add column if not exists objective_id uuid references public.learning_objectives(id) on delete set null;

create index if not exists idx_questions_objective on public.questions (objective_id);

comment on column public.questions.difficulty is
  'Tier: check (post-teach recall), drill (topic quiz), exam (past-paper style). Legacy value: medium.';

-- Per-objective mastery for the caller.
--
-- Security invoker on purpose: practice_attempts is RLS-scoped to its owner, so
-- the function cannot be used to read somebody else's mastery, and an anonymous
-- caller simply sees every objective as not started. No uid parameter — that is
-- the shape that turns a progress function into an enumeration oracle.
create or replace function public.topic_objective_mastery(_topic_id uuid)
returns table (
  objective_id uuid,
  code text,
  statement text,
  sort_order integer,
  checks integer,
  attempted integer,
  correct integer,
  state text
)
language sql
stable
set search_path to 'public'
as $function$
  with checks as (
    select q.objective_id,
           count(*)::int as checks
      from public.questions q
      join public.quizzes z on z.id = q.quiz_id
     where z.topic_id = _topic_id
       and q.objective_id is not null
     group by q.objective_id
  ),
  mine as (
    select q.objective_id,
           count(*)::int as attempted,
           count(*) filter (where p.last_correct)::int as correct
      from public.practice_attempts p
      join public.questions q on q.id = p.question_id
      join public.quizzes z on z.id = q.quiz_id
     where z.topic_id = _topic_id
       and p.user_id = auth.uid()
       and q.objective_id is not null
     group by q.objective_id
  )
  select o.id,
         o.code,
         o.statement,
         o.sort_order,
         coalesce(c.checks, 0),
         coalesce(m.attempted, 0),
         coalesce(m.correct, 0),
         case
           when coalesce(m.attempted, 0) = 0 then 'not_started'
           when coalesce(c.checks, 0) > 0 and coalesce(m.correct, 0) >= c.checks then 'mastered'
           else 'working'
         end
    from public.learning_objectives o
    left join checks c on c.objective_id = o.id
    left join mine m on m.objective_id = o.id
   where o.topic_id = _topic_id
   order by o.sort_order, o.code;
$function$;

-- Authenticated only: it reports the caller's own progress, so an anonymous
-- grant would only ever return zeros while inviting calls that cannot mean
-- anything. (RLS still decides which attempt rows are visible.)
revoke all on function public.topic_objective_mastery(uuid) from public, anon;
grant execute on function public.topic_objective_mastery(uuid) to authenticated;
