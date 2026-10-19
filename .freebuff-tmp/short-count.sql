select sm.material_type, count(*) as n, count(*) filter (where length(sm.content) < 1000) as under_1000,
  min(length(sm.content)) as min_len, round(avg(length(sm.content))) as avg_len
from study_materials sm
where sm.material_type in ('exam-technique','summary','notes')
group by sm.material_type order by 1;
