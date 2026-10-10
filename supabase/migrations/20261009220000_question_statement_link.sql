-- Let a question say which board statement it tests.
--
-- `questions.objective_id` points at `learning_objectives`, which is the per-topic
-- teaching layer and exists for exactly one topic today. There was therefore no
-- column anywhere that could record "this question tests 0580 2.5", so
-- "our questions cover the specification" could only ever be checked per topic —
-- a topic with fifteen questions about one of its four statements looked fully
-- covered, because the statement level was invisible.
--
-- `statement_id` is that link: nullable (the 1,952 existing questions predate it,
-- and a question may legitimately sit between statements), `on delete set null`
-- so removing a statement from the syllabus never deletes a question, and indexed
-- because the coverage report joins on it.
--
-- Idempotent: safe to re-run.

alter table public.questions
  add column if not exists statement_id uuid;

alter table public.questions
  drop constraint if exists questions_statement_id_fkey;
alter table public.questions
  add constraint questions_statement_id_fkey
  foreign key (statement_id) references public.syllabus_statements(id) on delete set null;

create index if not exists idx_questions_statement on public.questions (statement_id);

comment on column public.questions.statement_id is
  'The syllabus statement this question tests. NULL for the legacy bank, which was written before the specification was loaded.';

-- Note what is NOT added here: a guard on the code text. The column is a uuid
-- reference, so there is no string to hold to the replacement-character standard
-- the other student-visible fields already meet (20261009140000).

-- ── the report, with the statement level visible ─────────────────────────────
-- The OUT parameter list changes, and Postgres refuses that with CREATE OR
-- REPLACE (42P13), so the function is dropped and recreated; it is a report with
-- no dependants. The admin gate and the grants are restated below.
drop function if exists public.syllabus_coverage();

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
  topic_materials integer,
  exam_tier_questions integer,
  technique_materials integer,
  -- How many questions name THIS statement. The difference between this and
  -- topic_questions is the whole point of the column.
  statement_questions integer,
  topic_ready boolean,
  a_star_ready boolean
)
language sql
stable
security invoker
set search_path to 'public'
as $function$
  with per_topic as (
    select t.id,
           coalesce((select sum(length(l.content)) from public.lessons l where l.topic_id = t.id), 0)::int as note_chars,
           (select count(*) from public.questions q join public.quizzes z on z.id = q.quiz_id where z.topic_id = t.id)::int as questions,
           (select count(*) from public.study_materials m where m.topic_id = t.id)::int as materials,
           (select count(*) from public.questions q join public.quizzes z on z.id = q.quiz_id
             where z.topic_id = t.id and lower(coalesce(q.difficulty, '')) = 'exam')::int as exam_questions,
           (select count(*) from public.study_materials m
             where m.topic_id = t.id
               and lower(replace(coalesce(m.material_type, ''), '_', '-')) = 'exam-technique')::int as technique_materials
      from public.topics t
  )
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
         coalesce(pt.note_chars, 0) as topic_note_chars,
         coalesce(pt.questions, 0) as topic_questions,
         coalesce(pt.materials, 0) as topic_materials,
         coalesce(pt.exam_questions, 0) as exam_tier_questions,
         coalesce(pt.technique_materials, 0) as technique_materials,
         (select count(*) from public.questions q where q.statement_id = st.id)::int as statement_questions,
         (st.topic_id is not null and coalesce(pt.note_chars, 0) >= 1000 and coalesce(pt.questions, 0) >= 15) as topic_ready,
         (st.topic_id is not null
            and coalesce(pt.exam_questions, 0) >= 5
            and coalesce(pt.technique_materials, 0) >= 1) as a_star_ready
    from public.syllabus_statements st
    left join public.topics t on t.id = st.topic_id
    left join per_topic pt on pt.id = st.topic_id
    left join public.subject_levels sl on sl.id = t.subject_level_id
    left join public.subjects sub on sub.id = sl.subject_id
   where public.has_role(auth.uid(), 'admin'::app_role)
   order by st.spec_code, st.sort_order, st.code;
$function$;

comment on function public.syllabus_coverage() is
  'Admin report: every board subtopic, its covering topic, whether that topic is ready — and A*-ready — and how many questions name the statement itself.';

revoke all on function public.syllabus_coverage() from public, anon;
grant execute on function public.syllabus_coverage() to authenticated;
