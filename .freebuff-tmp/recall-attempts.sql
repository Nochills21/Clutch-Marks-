with recall as (
  select q.id, q.quiz_id from public.questions q
  where q.question_text ~* '^\s*(from the|which)' and q.question_text ~* '\mnotes\M'
)
select 'practice_attempts_on_recall' as metric, count(*)::text as value from public.practice_attempts p where p.question_id in (select id from recall)
union all
select 'objective_reviews_linked_to_recall_objectives', count(*)::text from public.objective_reviews r
  where r.objective_id in (select objective_id from public.questions q where q.id in (select id from recall) and q.objective_id is not null)
union all
select 'quiz_empty:' || z.title || ' | published=' || z.is_published::text, '0' from public.quizzes z
  where z.id in (select quiz_id from recall)
  and not exists (select 1 from public.questions q where q.quiz_id = z.id and q.id not in (select id from recall));
