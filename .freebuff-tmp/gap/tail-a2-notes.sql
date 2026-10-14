select t.slug, right(sm.content, 160) as tail
from study_materials sm join topics t on t.id=sm.topic_id
where sm.material_type='notes' and t.id in ('9c985dc8-bbb0-4506-9dfc-2f49b774fc24','52889198-3121-4be7-8cd7-e3bd37e97430');
