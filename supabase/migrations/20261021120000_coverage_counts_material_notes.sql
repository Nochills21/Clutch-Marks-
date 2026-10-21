-- Coverage honesty: a topic's notes are whatever the student can actually read
-- on its page — lessons AND study_materials of type 'notes'. The estate was
-- authored in two styles: lesson-first (old OL content) and material-first
-- (the Edexcel/AS-A2 seeders and every IGCSE Biology/Chemistry note). The report
-- only summed lessons, so ten maths/physics AS-A2 topics read as "not ready —
-- 0 note chars" while carrying 1.5–4.4 KB of notes material on the same topic.
--
-- topic_note_chars now sums both sources; topic_ready keeps its bar
-- (>= 1000 chars AND >= 15 questions). Nothing else about the report changes.
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
  statement_questions integer,
  topic_ready boolean,
  a_star_ready boolean
)
language sql
stable
set search_path to 'public'
as $function$
  with per_topic as (
    select t.id,
           (coalesce((select sum(length(l.content)) from public.lessons l where l.topic_id = t.id), 0)
            + coalesce((select sum(length(m.content)) from public.study_materials m
                         where m.topic_id = t.id
                           and lower(replace(coalesce(m.material_type, ''), '_', '-')) = 'notes'), 0))::int as note_chars,
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
