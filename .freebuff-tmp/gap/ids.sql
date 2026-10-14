select s.name as subj, sl.level::text as lvl, t.id, t.slug,
 (select length(m.content) from study_materials m where m.topic_id=t.id and m.material_type='notes' limit 1) as notes_len,
 (select count(*) from questions q join quizzes z on z.id=q.quiz_id where z.topic_id=t.id and q.statement_id is not null) as linked,
 (select count(*) from flashcards f join flashcard_sets fs on fs.id=f.set_id where fs.topic_id=t.id) as fc,
 (select string_agg(ss.code, ',' order by ss.code) from syllabus_statements ss where ss.topic_id=t.id) as codes
from topics t join subject_levels sl on sl.id=t.subject_level_id join subjects s on s.id=sl.subject_id
where s.name ilike '%computer%' order by sl.level::text, t.sort_order nulls last;
