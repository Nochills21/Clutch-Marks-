select 'note' as kind, t.slug as slug, sm.id::text as id, sm.material_type as type, length(sm.content)::text as info, sm.title as text
from study_materials sm join topics t on t.id = sm.topic_id
where t.slug in ('number-fractions-decimals-and-percentages','algebra-equations','geometry-angles-and-polygons','trigonometry-right-angled-triangles','statistics-data-handling','forces-motion')
  and sm.material_type in ('notes','summary')
union all
select 'stmt', t.slug, ss.code, ss.spec_code, ss.tier, ss.title
from syllabus_statements ss join topics t on t.id = ss.topic_id
where t.slug in ('number-fractions-decimals-and-percentages','algebra-equations','geometry-angles-and-polygons','trigonometry-right-angled-triangles','statistics-data-handling','forces-motion')
order by 2, 1 desc, 3
