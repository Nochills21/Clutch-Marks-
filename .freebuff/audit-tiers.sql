select 'difficulty' as kind, coalesce(difficulty,'(null)') as value, count(*)::int as n
from public.questions group by 2
union all
select 'material_type', coalesce(material_type,'(null)'), count(*)::int
from public.study_materials group by 2
order by 1, 2;
