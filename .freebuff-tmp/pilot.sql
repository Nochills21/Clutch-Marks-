select 'note' as k, sm.title as a, sm.material_type as b, sm.content as c
from study_materials sm join topics t on t.id = sm.topic_id
where t.slug = 'circular-measure' and sm.material_type in ('notes','summary')
union all
select 'statement', ss.code, ss.title, null
from syllabus_statements ss join topics t on t.id = ss.topic_id
where t.slug = 'circular-measure'
union all
select 'col', table_name, string_agg(column_name, ', ' order by ordinal_position), null
from information_schema.columns where table_schema='public' and table_name = 'syllabus_statements'
group by table_name
