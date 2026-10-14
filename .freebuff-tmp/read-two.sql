select t.slug as slug, sm.content as content
from study_materials sm join topics t on t.id = sm.topic_id
where sm.id in ('1ad7eb98-7831-4f23-85f8-9790a66e4ca4','410f9140-4fa3-467e-8cac-852bafc28653')
