select material_type,
       title,
       left(content, 700) as head,
       position('### Worked example' in content) as worked_pos,
       length(content) as len
from study_materials
where topic_id = (select id from topics where slug = 'algebra-equations' limit 1)
order by material_type, title;
