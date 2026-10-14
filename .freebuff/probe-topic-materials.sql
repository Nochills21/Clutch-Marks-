select m.id, m.title, m.material_type, length(coalesce(m.content, '')) as content_chars, m.file_url is not null as has_file
from public.study_materials m
join public.topics t on t.id = m.topic_id
join public.subject_levels sl on sl.id = t.subject_level_id
join public.subjects s on s.id = sl.subject_id
where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-equations';
