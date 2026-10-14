select s.slug as subject, sl.level, t.slug as topic, t.name as topic_name
from public.subjects s
join public.subject_levels sl on sl.subject_id = s.id
join public.topics t on t.subject_level_id = sl.id
where t.name ilike '%circular measure%'
order by 1, 2;
