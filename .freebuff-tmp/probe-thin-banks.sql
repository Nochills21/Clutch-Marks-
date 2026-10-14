select t.slug, count(q.id) as questions,
       (select count(*) from public.syllabus_statements s where s.topic_id = t.id) as statements
from public.topics t
left join public.quizzes z on z.topic_id = t.id
left join public.questions q on q.quiz_id = z.id
group by t.id, t.slug
having count(q.id) < 15
order by count(q.id), t.slug;
