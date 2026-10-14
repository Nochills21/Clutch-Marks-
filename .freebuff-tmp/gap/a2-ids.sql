select t.slug, t.id as topic_id, z.id as quiz_id, (select string_agg(ss.code||'='||ss.id::text, ' ; ') from syllabus_statements ss where ss.topic_id=t.id) as stmts, (select count(*) from questions q where q.quiz_id=z.id and q.difficulty='exam' and q.statement_id is not null) as linked_exam, coalesce((select length(sm.content) from study_materials sm where sm.topic_id=t.id and sm.material_type='notes' order by length(sm.content) desc limit 1),0) as notes
from topics t join subject_levels sl on sl.id=t.subject_level_id join subjects s on s.id=sl.subject_id
left join quizzes z on z.topic_id=t.id
where s.name ilike '%math%' and sl.level::text='A2'
order by t.slug, z.id;
