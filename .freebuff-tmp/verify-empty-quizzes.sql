select 'published_empty_quizzes' as metric, count(*)::text as value
  from public.quizzes z
 where z.is_published and not exists (select 1 from public.questions q where q.quiz_id = z.id)
union all
select 'unpublished_quizzes_total', count(*)::text from public.quizzes z where not z.is_published
union all
select 'total_questions', count(*)::text from public.questions;
