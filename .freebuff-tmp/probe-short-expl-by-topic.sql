select
  sub.slug || ' ' || lvl.level::text || ' / ' || t.name as topic,
  count(*) filter (where length(trim(coalesce(q.explanation,''))) < 40)::int as short_expl,
  count(*)::int as questions
from public.questions q
join public.quizzes z on z.id = q.quiz_id
join public.topics t on t.id = z.topic_id
join public.subject_levels lvl on lvl.id = t.subject_level_id
join public.subjects sub on sub.id = lvl.subject_id
group by sub.slug, lvl.level, t.name
having count(*) filter (where length(trim(coalesce(q.explanation,''))) < 40) > 0
order by short_expl asc, topic
limit 60;
