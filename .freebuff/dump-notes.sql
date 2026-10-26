select t.slug, m.title, m.material_type, m.content
from public.study_materials m
join public.topics t on t.id = m.topic_id
where t.slug = 'characteristics-and-classification-of-living-organisms'
order by m.created_at;
