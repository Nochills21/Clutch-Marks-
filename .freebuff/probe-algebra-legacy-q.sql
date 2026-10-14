select q.id, z.title as quiz, q.sort_order, left(q.question_text, 150) as question,
       q.options::text as options, q.correct_option, q.difficulty,
       coalesce(q.objective_id::text, '-') as objective
from public.questions q
join public.quizzes z on z.id = q.quiz_id
join public.topics t on t.id = z.topic_id
join public.subject_levels sl on sl.id = t.subject_level_id
join public.subjects s on s.id = sl.subject_id
where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-equations'
  and q.difficulty = 'medium'
order by z.title, q.sort_order;
