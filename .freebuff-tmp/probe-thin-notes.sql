select m.id, m.title, m.material_type, length(m.content) as content_len, left(m.content, 160) as content_head, m.file_url, t.slug
from public.study_materials m
left join public.topics t on t.id = m.topic_id
where m.material_type = 'notes'
  and length(regexp_replace(coalesce(m.content,''), '<[^>]+>', ' ', 'g')) < 1000
order by t.slug, m.title;
