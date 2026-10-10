-- Coverage is not the same claim as "ready for the top grade".
--
-- The first cut of syllabus_coverage() said a statement was fine when its topic
-- had ~1,000 characters of notes and 15 questions. Measured live, that made every
-- one of the 20 IGCSE Mathematics topics "ready" — a threshold that cannot be
-- wrong is a threshold that says nothing.
--
-- Two levels now, because they answer two different questions:
--
--   topic_ready   - there is something to teach from and something to practise
--                   (the floor: notes plus a working question set)
--   a_star_ready  - the topic carries the *top-grade* layer as well:
--                     at least one exam-technique material
--                     (material_type 'exam-technique') and at least five
--                     exam-tier questions (difficulty 'exam' — past-paper style,
--                     full marks, mark-scheme habits).
--
-- The gap between the two is the honest answer to "do we go an extra step?".
-- Today it is total: every topic clears the floor, none carries the A* layer.
--
-- The row type gains columns, and Postgres refuses to change a function's OUT
-- parameter list with CREATE OR REPLACE (42P13), so the function is dropped and
-- recreated — it is a report with no dependants. Grants and the admin gate are
-- restated below.
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
               -- 'exam_technique' / 'exam-technique' are the same thing written two
               -- ways, which this estate has already done once for notes/'note'.
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
  'Admin report: every board subtopic, its covering topic, and whether that topic is ready — and A*-ready.';

revoke all on function public.syllabus_coverage() from public, anon;
grant execute on function public.syllabus_coverage() to authenticated;
