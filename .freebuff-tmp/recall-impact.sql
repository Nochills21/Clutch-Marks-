with recall as (
  select q.id, q.quiz_id from public.questions q
  where q.question_text ~* '^\s*(from the|which)' and q.question_text ~* '\mnotes\M'
)
select 'recall_questions' as metric, count(*)::text as value from recall
union all
select 'quizzes_touched', count(distinct quiz_id)::text from recall
union all
select 'quizzes_total_questions_before', count(*)::text from public.questions q where q.quiz_id in (select quiz_id from recall)
union all
select 'quizzes_left_empty', count(*)::text from public.quizzes z
  where z.id in (select quiz_id from recall)
  and not exists (select 1 from public.questions q where q.quiz_id = z.id and q.id not in (select id from recall))
union all
select 'bookmarks_on_recall', count(*)::text from public.question_bookmarks b where b.question_id in (select id from recall)
union all
select 'attempt_tables_with_question_id', string_agg(table_name, ',') from information_schema.columns
  where table_schema='public' and column_name in ('question_id') and table_name <> 'question_bookmarks'
union all
select 'questions_has_column_list', string_agg(column_name, ',' order by ordinal_position) from information_schema.columns
  where table_schema='public' and table_name='questions';
