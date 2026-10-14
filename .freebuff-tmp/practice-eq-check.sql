select left(q.question_text, 80) as q, q.options, q.correct_option, left(q.explanation, 200) as expl
from public.questions q join public.quizzes z on z.id = q.quiz_id
join public.topics t on t.id = z.topic_id
join public.subject_levels sl on sl.id = t.subject_level_id
join public.subjects s on s.id = sl.subject_id
where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-equations'
and z.title like 'Practice%' order by q.sort_order;
