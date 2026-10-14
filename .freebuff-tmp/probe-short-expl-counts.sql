select sub.slug || ' ' || lvl.level::text || ' / ' || t.name as topic, count(*) as short_expl
from public.questions q
join public.quizzes z on z.id = q.quiz_id
join public.topics t on t.id = z.topic_id
join public.subject_levels lvl on lvl.id = t.subject_level_id
join public.subjects sub on sub.id = lvl.subject_id
where length(trim(coalesce(q.explanation,''))) < 40
group by 1
order by 2 desc, 1
limit 30;
