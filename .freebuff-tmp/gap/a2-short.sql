select t.slug, s.name as subj, sl.level::text as lvl,
 coalesce((select length(sm.content) from study_materials sm where sm.topic_id=t.id and sm.material_type='notes' order by length(sm.content) desc limit 1),0) as notes,
 (select count(*) from questions q join quizzes z on z.id=q.quiz_id where z.topic_id=t.id and q.difficulty='exam' and q.statement_id is not null) as linked_exam,
 (select count(*) from flashcards f join flashcard_sets fs on fs.id=f.set_id where fs.topic_id=t.id) as fc,
 (select string_agg(ss.code, ',') from syllabus_statements ss where ss.topic_id=t.id) as codes
from topics t join subject_levels sl on sl.id=t.subject_level_id join subjects s on s.id=sl.subject_id
where sl.level::text='A2' and s.name ilike '%math%'
order by t.slug;
