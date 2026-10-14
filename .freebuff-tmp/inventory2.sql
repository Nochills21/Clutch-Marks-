select s.slug as subject, sl.level::text as level, count(t.id) as topics
from public.topics t
join public.subject_levels sl on sl.id = t.subject_level_id
join public.subjects s on s.id = sl.subject_id
group by s.slug, sl.level
order by s.slug, sl.level;
