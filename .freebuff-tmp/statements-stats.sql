select t.slug as topic, ss.code, ss.tier, left(ss.title, 140) as title
from public.syllabus_statements ss
join public.topics t on t.id = ss.topic_id
join public.subject_levels sl on sl.id = t.subject_level_id
join public.subjects s on s.id = sl.subject_id
where s.slug = 'mathematics' and sl.level = 'OL'
  and t.slug in ('scatter-diagrams-and-correlation', 'statistics-data-handling', 'statistics-probability')
order by t.slug, ss.code;
