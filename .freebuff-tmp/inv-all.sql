select s.name as subject, sl.level::text as lvl, t.slug,
 (select coalesce(max(length(m.content)),0) from study_materials m where m.topic_id=t.id and m.material_type in ('notes','summary')) as notes_chars,
 (select count(*) from questions q join quizzes z on z.id=q.quiz_id where z.topic_id=t.id and q.statement_id is not null and q.difficulty='exam') as linked_exam,
 (select count(*) from questions q join quizzes z on z.id=q.quiz_id where z.topic_id=t.id) as all_qs,
 (select count(*) from flashcards f join flashcard_sets fs on fs.id=f.set_id where fs.topic_id=t.id) as flashcards,
 (select count(*) from syllabus_statements ss where ss.topic_id=t.id) as stmts
from topics t join subject_levels sl on sl.id=t.subject_level_id join subjects s on s.id=sl.subject_id
order by s.name, sl.level::text, t.slug;
