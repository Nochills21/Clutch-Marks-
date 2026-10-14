select 'material_type_check' as metric, pg_get_constraintdef(oid) as value
  from pg_constraint where conrelid = 'public.study_materials'::regclass and conname = 'study_materials_material_type_check'
union all
select 'notes_recall_rows', count(*)::text from public.questions q
 where q.question_text ~* '^\s*(from the|which)' and q.question_text ~* '\mnotes\M'
union all
select 'notes_recall_topics', count(distinct z.topic_id)::text from public.questions q
  join public.quizzes z on z.id = q.quiz_id
 where q.question_text ~* '^\s*(from the|which)' and q.question_text ~* '\mnotes\M'
union all
select 'denotes_false_positive', count(*)::text from public.questions q
 where q.question_text ~* '^\s*(from the|which)' and q.question_text ~* 'notes' and q.question_text !~* '\mnotes\M'
union all
select 'function_exists', (count(*) > 0)::text from pg_proc where proname = 'content_integrity_findings';
