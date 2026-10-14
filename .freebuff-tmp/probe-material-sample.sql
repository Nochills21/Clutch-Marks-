(select 'long' as kind, m.title, length(m.content) as html_len, left(m.content, 600) as content_head, m.file_url, m.page_count, m.source_range
 from public.study_materials m
 where m.material_type = 'notes' and length(regexp_replace(coalesce(m.content,''), '<[^>]+>', '', 'g')) >= 1000
 order by length(m.content) desc limit 1)
union all
(select 'placeholder', m.title, length(m.content), m.content, m.file_url, m.page_count, m.source_range
 from public.study_materials m
 where m.material_type = 'notes' and length(regexp_replace(coalesce(m.content,''), '<[^>]+>', '', 'g')) < 1000
 order by m.title limit 3);
