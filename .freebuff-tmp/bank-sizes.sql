select sub.slug as subject, lvl.level::text as level, t.slug as topic,
  (select count(*) from public.questions q join public.quizzes z on z.id=q.quiz_id where z.topic_id=t.id) as q_count,
  (select count(*) from public.syllabus_statements s where s.topic_id=t.id) as stmts
from public.topics t
join public.subject_levels lvl on lvl.id=t.subject_level_id
join public.subjects sub on sub.id=lvl.subject_id
order by q_count asc
limit 25;
