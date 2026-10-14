select s.slug as subject, sl.level, count(*) filter (where z.is_ai_generated and z.is_published) as ai_quizzes,
  count(*) filter (where z.is_published) as all_quizzes
from public.quizzes z
join public.topics t on t.id = z.topic_id
join public.subject_levels sl on sl.id = t.subject_level_id
join public.subjects s on s.id = sl.subject_id
group by s.slug, sl.level order by s.slug, sl.level;
