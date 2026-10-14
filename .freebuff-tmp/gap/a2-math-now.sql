select t.slug, t.id, sl.id as sl_id,
 coalesce((select length(sm.content) from study_materials sm where sm.topic_id=t.id and sm.material_type='notes' order by length(sm.content) desc limit 1),0) as notes,
 (select count(*) from questions q join quizzes z on z.id=q.quiz_id join syllabus_statements ss on ss.id=q.statement_id where z.topic_id=t.id and q.difficulty='exam') as linked_exam,
 (select count(*) from flashcards f join flashcard_sets fs on fs.id=f.set_id where fs.topic_id=t.id) as fc,
 (select string_agg(ss.code, ',') from syllabus_statements ss where ss.topic_id=t.id) as stmts
from topics t join subject_levels sl on sl.id=t.subject_level_id join subjects s on s.id=sl.subject_id
where s.name ilike '%math%' and sl.level::text='A2'
order by t.slug;
