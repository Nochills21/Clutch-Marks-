select o.code, length(o.teach) as teach_chars
from public.learning_objectives o
join public.topics t on t.id = o.topic_id
where t.slug = 'algorithms-programming'
order by o.sort_order;
select z.id, z.title from public.quizzes z
join public.topics t on t.id = z.topic_id
where t.slug = 'algorithms-programming';
