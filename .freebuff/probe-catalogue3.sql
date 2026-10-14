select s.slug || '/' || lower(sl.level::text) as subject_level, count(t.id) as topics
from public.topics t
join public.subject_levels sl on sl.id = t.subject_level_id
join public.subjects s on s.id = sl.subject_id
group by 1 order by 1;
