select t.slug as topic, q.id, length(q.explanation) as len, q.explanation
from public.questions q join public.quizzes z on z.id=q.quiz_id join public.topics t on t.id=z.topic_id
where length(coalesce(q.explanation,'')) < 40
order by len asc
limit 12;
