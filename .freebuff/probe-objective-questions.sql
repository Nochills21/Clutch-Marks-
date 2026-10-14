select q.difficulty, count(*) as n, count(q.objective_id) as tagged
from public.questions q
join public.quizzes z on z.id = q.quiz_id
where z.title = 'Checkpoints — Algebra — Equations'
group by q.difficulty;
