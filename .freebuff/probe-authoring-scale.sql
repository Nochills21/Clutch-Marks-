-- Read-only: the size of the objective-authoring queue, for docs/objectives-authoring-pipeline.md.
with counts as (
  select 'topics' as metric, (select count(*)::text from public.topics) as value
  union all select 'statements_total', (select count(*)::text from public.syllabus_statements)
  union all select 'statements_mapped', (select count(*)::text from public.syllabus_statements where topic_id is not null)
  union all select 'statements_per_topic_avg', (select round(avg(n), 2)::text from (select count(*) as n from public.syllabus_statements where topic_id is not null group by topic_id) s)
  union all select 'statements_per_topic_max', (select max(n)::text from (select count(*) as n from public.syllabus_statements where topic_id is not null group by topic_id) s)
  union all select 'topics_with_objectives', (select count(distinct topic_id)::text from public.learning_objectives)
  union all select 'objectives_total', (select count(*)::text from public.learning_objectives)
  union all select 'objectives_per_statement_on_reference', (select count(*)::text from public.learning_objectives)
  union all select 'questions_total', (select count(*)::text from public.questions)
  union all select 'questions_tagged_to_objective', (select count(*)::text from public.questions where objective_id is not null)
  union all select 'questions_by_difficulty', (select string_agg(difficulty || '=' || n, ', ' order by difficulty) from (select difficulty, count(*)::text as n from public.questions group by difficulty) d)
  union all select 'study_materials_total', (select count(*)::text from public.study_materials)
  union all select 'material_types', (select string_agg(material_type || '=' || n, ', ' order by material_type) from (select coalesce(material_type,'NULL') as material_type, count(*)::text as n from public.study_materials group by material_type) m)
  union all select 'lessons_total', (select count(*)::text from public.lessons)
  union all select 'tables_named_like_a_draft_queue', (select coalesce(string_agg(table_name, ', '), 'none') from information_schema.tables where table_schema = 'public' and (table_name like '%draft%' or table_name like '%review%' or table_name like '%queue%'))
  union all select 'ai_audit_log_actions_allowed', (select pg_get_constraintdef(oid) from pg_constraint where conrelid = 'public.ai_audit_log'::regclass and contype = 'c' limit 1)
  union all select 'exam_tier_questions', (select count(*)::text from public.questions where difficulty = 'exam')
  union all select 'exam_technique_materials', (select count(*)::text from public.study_materials where lower(replace(coalesce(material_type,''), '_', '-')) = 'exam-technique')
)
select metric, value from counts order by metric;
