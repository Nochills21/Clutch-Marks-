select t.slug as slug, sm.id::text as id, sm.material_type as type, length(sm.content)::text as chars, sm.title as title
from study_materials sm join topics t on t.id = sm.topic_id
join subject_levels sl on sl.id = t.subject_level_id
join subjects s on s.id = sl.subject_id
where s.name = 'Mathematics' and sl.level::text = 'AS' and sm.material_type in ('notes','summary')
order by t.sort_order, sm.material_type
