select t.slug, s.name as subject, sl.level, sl.id as subject_level_id,
  (select count(*) from public.quizzes qz join public.questions q on q.quiz_id = qz.id where qz.topic_id = t.id) as questions,
  (select count(*) from public.quizzes qz join public.questions q on q.quiz_id = qz.id where qz.topic_id = t.id and q.statement_id is not null) as linked
from public.topics t
join public.subject_levels sl on sl.id = t.subject_level_id
join public.subjects s on s.id = sl.subject_id
where t.slug = 'simulation-sensors-and-real-data';
