select t.slug,
 (select length(sm.content) from study_materials sm where sm.topic_id=t.id and sm.material_type='notes' order by length(sm.content) desc limit 1) as notes,
 (select count(*) from questions q join quizzes z on z.id=q.quiz_id where z.topic_id=t.id and q.difficulty='exam' and q.statement_id is not null) as linked_exam,
 (select count(*) from questions q join quizzes z on z.id=q.quiz_id where z.topic_id=t.id and q.difficulty='exam' and q.statement_id is null) as unlinked_exam,
 (select count(*) from flashcards f join flashcard_sets fs on fs.id=f.set_id where fs.topic_id=t.id) as fc
from topics t where t.slug in ('earth-space','magnetism-electromagnetism','nuclear-physics','thermal-physics','waves-sound') order by t.slug;
