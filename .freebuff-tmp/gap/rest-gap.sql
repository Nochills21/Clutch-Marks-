select t.id, t.slug, s.name as subj, l.level,
 (select length(m.content) from study_materials m where m.topic_id=t.id and m.material_type='notes' limit 1) as notes_len,
 (select count(*) from questions q join quizzes z on z.id=q.quiz_id where z.topic_id=t.id and q.statement_id is not null and q.difficulty='exam') as linked_exam,
 (select count(*) from flashcards f join flashcard_sets fs on fs.id=f.set_id where fs.topic_id=t.id) as flash,
 (select string_agg(ss.code, ',' order by ss.code) from syllabus_statements ss where ss.topic_id=t.id) as codes
from topics t join subjects s on s.id=t.subject_id join subject_levels l on l.id=t.subject_level_id
where (s.name ilike '%computer%' and l.level::text like 'OL%' or s.name ilike '%math%' or s.name ilike '%phys%' or s.name ilike '%comp%')
  and not (s.name ilike '%computer%' and l.level::text not like 'OL%')
order by s.name, l.level, t.slug;
