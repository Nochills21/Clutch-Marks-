select s.name as subject, sl.level::text as lvl, count(*) as topics,
 count(*) filter (where coalesce((select max(length(m.content)) from study_materials m where m.topic_id=t.id and m.material_type in ('notes','summary')),0) < 1000) as thin_notes,
 count(*) filter (where (select count(*) from questions q join quizzes z on z.id=q.quiz_id where z.topic_id=t.id and q.statement_id is not null and q.difficulty='exam') < 4) as few_linked_exam,
 count(*) filter (where (select count(*) from flashcards f join flashcard_sets fs on fs.id=f.set_id where fs.topic_id=t.id) < 5) as few_flashcards,
 count(*) filter (where (select count(*) from syllabus_statements ss where ss.topic_id=t.id) = 0) as no_statements
from topics t join subject_levels sl on sl.id=t.subject_level_id join subjects s on s.id=sl.subject_id
group by s.name, sl.level::text order by s.name, sl.level::text;
