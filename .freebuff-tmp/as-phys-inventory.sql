select t.id, t.name, t.sort_order,
 (select count(*) from lessons l where l.topic_id = t.id) as lessons,
 (select count(*) from quizzes q join questions qq on qq.quiz_id = q.id where q.topic_id = t.id) as questions,
 (select count(*) from study_materials m where m.topic_id = t.id) as materials,
 (select coalesce(sum(length(m.content)),0) from study_materials m where m.topic_id = t.id and m.material_type in ('notes','summary')) as notes_chars
from topics t
where t.subject_level_id = '70fb9c0c-35bf-4036-b265-1833f594f3f6'
order by t.sort_order nulls last, t.name;
