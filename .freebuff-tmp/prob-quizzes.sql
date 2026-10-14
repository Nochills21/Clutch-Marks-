select q.id, q.title, count(qu.id) as questions
from public.quizzes q
left join public.questions qu on qu.quiz_id = q.id
join public.topics t on t.id = q.topic_id
join public.subject_levels sl on sl.id = t.subject_level_id
join public.subjects s on s.id = sl.subject_id
where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'statistics-probability'
group by q.id, q.title;
