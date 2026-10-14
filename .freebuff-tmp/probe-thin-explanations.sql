select q.id, z.topic_id, q.difficulty, length(coalesce(q.explanation,'')) as expl_len, left(coalesce(q.explanation,''), 160) as expl_head
from public.questions q
join public.quizzes z on z.id = q.quiz_id
order by length(coalesce(q.explanation,'')) asc
limit 20;
