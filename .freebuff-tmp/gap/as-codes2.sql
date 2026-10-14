select t.slug, sl.level::text as lvl, ss.code, ss.id as stmt_id, t.id as topic_id,
 (select count(*) from questions q join quizzes z on z.id=q.quiz_id where z.topic_id=t.id) as total_q,
 (select z.id from quizzes z where z.topic_id=t.id order by z.created_at limit 1) as quiz_id,
 (select length(sm.content) from study_materials sm where sm.topic_id=t.id and sm.material_type='notes' order by length(sm.content) desc limit 1) as notes
from topics t join subject_levels sl on sl.id=t.subject_level_id join subjects s on s.id=sl.subject_id
left join syllabus_statements ss on ss.topic_id=t.id
where s.name ilike '%math%' and sl.level::text='AS'
order by t.slug, ss.code;
