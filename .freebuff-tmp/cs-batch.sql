select 'note' as kind, t.slug as slug, sm.id::text as id, sm.material_type as type, length(sm.content)::text as info, sm.title as text
from study_materials sm join topics t on t.id = sm.topic_id
join subject_levels sl on sl.id = t.subject_level_id
join subjects s on s.id = sl.subject_id
where s.name = 'Computer Science' and sl.level::text = 'OL' and sm.material_type in ('notes','summary')
union all
select 'stmt', t.slug, ss.code, ss.spec_code, ss.tier, ss.title
from syllabus_statements ss join topics t on t.id = ss.topic_id
join subject_levels sl on sl.id = t.subject_level_id
join subjects s on s.id = sl.subject_id
where s.name = 'Computer Science' and sl.level::text = 'OL'
order by 2, 1 desc, 3
