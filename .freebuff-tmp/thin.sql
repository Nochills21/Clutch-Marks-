select s.slug as subject, sl.level::text as level, t.slug as topic, m.id as material_id, m.material_type, length(m.content) as chars
from public.study_materials m join public.topics t on t.id=m.topic_id join public.subject_levels sl on sl.id=t.subject_level_id join public.subjects s on s.id=sl.subject_id
where m.material_type in ('notes','summary')
order by length(m.content) asc limit 25;
