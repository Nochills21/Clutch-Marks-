select m.id, m.material_type, m.title, t.slug as topic_slug, sl.level, s.slug as subject_slug
from study_materials m
join topics t on t.id = m.topic_id
join subject_levels sl on sl.id = t.subject_level_id
join subjects s on s.id = sl.subject_id
where m.content ~ '\.###\s'
limit 3;
