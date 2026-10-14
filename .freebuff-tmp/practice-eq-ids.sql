select q.id, left(q.question_text, 60) as q, q.correct_option, q.explanation
from public.questions q join public.quizzes z on z.id = q.quiz_id
join public.topics t on t.id = z.topic_id
join public.subject_levels sl on sl.id = t.subject_level_id
join public.subjects s on s.id = sl.subject_id
where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-equations'
and z.title like 'Practice%' and (q.question_text ilike '%bakery%' or q.question_text ilike '%2x - 6%' or q.question_text ilike '%ratio of 2:3:5%' or q.question_text ilike '%x + y = 7 and 2x - 2y%');
