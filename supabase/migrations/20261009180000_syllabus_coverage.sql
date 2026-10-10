-- Syllabus coverage: the specification, as a checklist we can be held to.
--
-- The claim we want to make is "every statement in the specification is covered,
-- and here is where" — the claim the platforms we are measured against make. It
-- is only true if the board's own subtopic list exists in the database, mapped to
-- the topic that teaches it. Then coverage is a query, not an opinion.
--
-- public.syllabus_statements      - one row per official board subtopic
-- public.syllabus_coverage()      - per-statement coverage for the admin report
--
-- Rows come from .freebuff/syllabus-outline.cjs (which downloads the board's own
-- PDF and records its URL and date) via .freebuff/content-syllabus-statements.cjs.
-- `board`, `spec_code` and `code` are the board's own identifiers so a row can
-- always be traced back to the sentence it came from.
--
-- Coverage is deliberately reported at two levels, because "mapped" is not the
-- same as "ready":
--   mapped       - the subtopic is mapped to one of our topics
--   topic_ready  - that topic actually has notes and questions to teach it with
-- A subtopic mapped to a topic whose notes are 900 characters and 12 questions is
-- covered on paper and thin in practice, and the admin report says so.
--
-- Idempotent: safe to re-run.

create table if not exists public.syllabus_statements (
  id uuid primary key default gen_random_uuid(),
  board text not null,
  spec_code text not null,
  level text not null,
  -- The board's own subtopic code, e.g. '2.5' for 0580, 'Unit 4' for Edexcel.
  code text not null,
  title text not null default '',
  -- Board area/unit number as published — kept loose because the boards group
  -- differently (CAIE numbers areas, Edexcel names units).
  area text,
  -- 'core' | 'extended' | 'both': which candidates the subtopic is required for.
  tier text not null default 'both',
  subject_level_id uuid references public.subject_levels(id) on delete set null,
  -- Null means "not yet mapped": an open coverage gap, not a silent pass.
  topic_id uuid references public.topics(id) on delete set null,
  source_url text,
  syllabus_years text,
  sort_order integer not null default 0,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  unique (board, spec_code, code)
);

comment on table public.syllabus_statements is
  'Official board subtopics (the specification checklist), mapped to the topic that teaches them.';

create index if not exists idx_syllabus_statements_spec
  on public.syllabus_statements (spec_code, level, sort_order);
create index if not exists idx_syllabus_statements_topic
  on public.syllabus_statements (topic_id);

alter table public.syllabus_statements enable row level security;

drop policy if exists "Anyone can view syllabus statements" on public.syllabus_statements;
create policy "Anyone can view syllabus statements"
  on public.syllabus_statements for select to anon using (true);

drop policy if exists "Anyone authenticated can view syllabus statements" on public.syllabus_statements;
create policy "Anyone authenticated can view syllabus statements"
  on public.syllabus_statements for select to authenticated using (true);

drop policy if exists "Admins can manage syllabus statements" on public.syllabus_statements;
create policy "Admins can manage syllabus statements"
  on public.syllabus_statements for all to authenticated
  using (has_role(auth.uid(), 'admin'::app_role))
  with check (has_role(auth.uid(), 'admin'::app_role));

drop trigger if exists update_syllabus_statements_updated_at on public.syllabus_statements;
create trigger update_syllabus_statements_updated_at
  before update on public.syllabus_statements
  for each row execute function public.update_updated_at();

/**
 * Every statement with the topic that covers it, and whether that topic is
 * actually ready (notes long enough to teach from, questions to practise on).
 * Admin-gated: it describes the content estate, not a student's own progress.
 */
create or replace function public.syllabus_coverage()
returns table (
  board text,
  spec_code text,
  level text,
  area text,
  code text,
  title text,
  tier text,
  subject_slug text,
  topic_slug text,
  topic_name text,
  mapped boolean,
  topic_note_chars integer,
  topic_questions integer,
  topic_ready boolean
)
language sql
stable
security invoker
set search_path to 'public'
as $function$
  select st.board,
         st.spec_code,
         st.level,
         st.area,
         st.code,
         st.title,
         st.tier,
         sub.slug as subject_slug,
         t.slug as topic_slug,
         t.name as topic_name,
         (st.topic_id is not null) as mapped,
         coalesce(notes.chars, 0)::int as topic_note_chars,
         coalesce(qs.n, 0)::int as topic_questions,
         (st.topic_id is not null and coalesce(notes.chars, 0) >= 1000 and coalesce(qs.n, 0) >= 15) as topic_ready
    from public.syllabus_statements st
    left join public.topics t on t.id = st.topic_id
    left join public.subject_levels sl on sl.id = t.subject_level_id
    left join public.subjects sub on sub.id = sl.subject_id
    left join lateral (
      select sum(length(l.content))::int as chars
        from public.lessons l
       where l.topic_id = st.topic_id
    ) notes on true
    left join lateral (
      select count(*)::int as n
        from public.questions q
        join public.quizzes z on z.id = q.quiz_id
       where z.topic_id = st.topic_id
    ) qs on true
   where public.has_role(auth.uid(), 'admin'::app_role)
   order by st.spec_code, st.sort_order, st.code;
$function$;

comment on function public.syllabus_coverage() is
  'Admin report: every board subtopic, its covering topic, and whether that topic is ready.';

revoke all on function public.syllabus_coverage() from public, anon;
grant execute on function public.syllabus_coverage() to authenticated;
