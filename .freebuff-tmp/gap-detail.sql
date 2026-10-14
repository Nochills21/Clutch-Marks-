select s.name||' '||sl.level::text as course, t.slug, t.id as tid,
 coalesce((select max(length(m.content)) from study_materials m where m.topic_id=t.id and m.material_type in ('notes','summary')),0) as notes,
 (select count(*) from questions q join quizzes z on z.id=q.quiz_id where z.topic_id=t.id and q.statement_id is not null and q.difficulty='exam') as linked,
 (select count(*) from flashcards f join flashcard_sets fs on fs.id=f.set_id where fs.topic_id=t.id) as fc,
 (select count(*) from quizzes z where z.topic_id=t.id and z.exam_type='quiz') as quizzes,
 (select string_agg(ss.code||' '||left(ss.title,70), ' | ' order by ss.sort_order) from syllabus_statements ss where ss.topic_id=t.id) as stmts
from topics t join subject_levels sl on sl.id=t.subject_level_id join subjects s on s.id=sl.subject_id
where (select count(*) from syllabus_statements ss where ss.topic_id=t.id) > 0
 and (coalesce((select max(length(m.content)) from study_materials m where m.topic_id=t.id and m.material_type in ('notes','summary')),0) < 2000
 or (select count(*) from questions q join quizzes z on z.id=q.quiz_id where z.topic_id=t.id and q.statement_id is not null and q.difficulty='exam') < 6
 or (select count(*) from flashcards f join flashcard_sets fs on fs.id=f.set_id where fs.topic_id=t.id) < 10)
order by 1, 2;
