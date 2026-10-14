select s.slug as subject, sl.level, count(t.id) as topics,
       string_agg(t.slug, ', ' order by t.slug) as slugs
from public.subjects s
join public.subject_levels sl on sl.subject_id = s.id
left join public.topics t on t.subject_level_id = sl.id
group by 1,2
order by 1,2;
