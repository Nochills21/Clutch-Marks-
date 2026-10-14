select sl.level::text as level, s.name as subject, t.sort_order as ord, t.slug, t.name,
  (select coalesce(max(length(sm.content)),0) from study_materials sm where sm.topic_id = t.id and sm.material_type in ('notes','summary')) as notes_chars,
  (select count(*) from syllabus_statements ss where ss.topic_id = t.id) as statements
from topics t
join subject_levels sl on sl.id = t.subject_level_id
join subjects s on s.id = sl.subject_id
order by sl.level::text, s.name, t.sort_order
