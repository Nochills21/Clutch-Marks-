select t.slug, m.title, m.material_type, m.content
from public.study_materials m
join public.topics t on t.id = m.topic_id
where t.slug in ('exponentials-and-logarithms','proof')
order by t.slug, m.created_at;
