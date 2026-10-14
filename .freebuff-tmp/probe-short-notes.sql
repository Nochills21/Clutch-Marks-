select m.id, m.title, length(coalesce(m.content,'')) as html_len, left(regexp_replace(coalesce(m.content,''), '<[^>]+>', ' ', 'g'), 400) as text_head
from public.study_materials m
where m.material_type = 'notes'
  and length(regexp_replace(coalesce(m.content,''), '<[^>]+>', '', 'g')) < 1000
order by m.title
limit 4;
