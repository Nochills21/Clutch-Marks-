select sub.slug as subject, lvl.level::text as level, t.slug as topic, m.id, m.material_type, m.title,
       length(regexp_replace(coalesce(m.content,''), '<[^>]+>', '', 'g')) as text_len
from public.study_materials m
join public.topics t on t.id = m.topic_id
join public.subject_levels lvl on lvl.id = t.subject_level_id
join public.subjects sub on sub.id = lvl.subject_id
where m.material_type in ('notes','summary')
  and length(regexp_replace(coalesce(m.content,''), '<[^>]+>', '', 'g')) < 1000
order by sub.slug, lvl.level, t.slug, m.title;
