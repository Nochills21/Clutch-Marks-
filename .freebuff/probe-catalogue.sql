select
  (select count(*) from public.subjects) as subjects,
  (select count(*) from public.subject_levels) as levels,
  (select count(*) from public.topics) as topics,
  (select count(*) from public.topics where coalesce(btrim(slug),'') = '') as topics_without_slug,
  (select count(distinct level::text) from public.subject_levels) as distinct_levels,
  (select string_agg(distinct level::text, ',') from public.subject_levels) as level_values;

select s.slug as subject_slug, lower(sl.level::text) as level, count(t.id) as topics
from public.topics t
join public.subject_levels sl on sl.id = t.subject_level_id
join public.subjects s on s.id = sl.subject_id
group by 1,2 order by 1,2;

select s.slug as subject_slug, lower(sl.level::text) as level, t.slug, t.name
from public.topics t
join public.subject_levels sl on sl.id = t.subject_level_id
join public.subjects s on s.id = sl.subject_id
order by 1,2, t.sort_order limit 12;
