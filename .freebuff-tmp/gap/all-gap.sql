select s.name as subj, sl.level::text as lvl, t.slug, t.id,
 coalesce((select length(sm.content) from study_materials sm where sm.topic_id=t.id and sm.material_type='notes' order by length(sm.content) desc limit 1),0) as notes,
 (select count(*) from questions q join quizzes z on z.id=q.quiz_id join syllabus_statements ss on ss.id=q.statement_id where z.topic_id=t.id and q.difficulty='exam') as linked_exam,
 (select count(*) from flashcards f join flashcard_sets fs on fs.id=f.set_id where fs.topic_id=t.id) as fc,
 (select count(*) from syllabus_statements ss where ss.topic_id=t.id) as nst
from topics t join subject_levels sl on sl.id=t.subject_level_id join subjects s on s.id=sl.subject_id
where sl.level::text in ('IGCSE','OL','AS','A2') order by s.name, sl.level::text, t.sort_order nulls last, t.slug;
