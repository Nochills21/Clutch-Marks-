select m.id, m.title, m.material_type, length(m.content) as len, left(regexp_replace(m.content, '\s+', ' ', 'g'), 400) as preview
from public.study_materials m
where m.id in ('dd18931a-157d-48e7-9e66-bb652dc7340c','c3a28c7a-4e0b-41cc-aff2-7ce104799746','9cec7201-6956-44ec-aa6a-50a141777f11','6b6f013d-8fe1-4246-94fb-c87f4853fe07','432b462a-edc3-451c-878a-2e73b878cc7c');
