select t.slug,
 (select count(*) from questions q join quizzes z on z.id=q.quiz_id where z.topic_id=t.id) as qs,
 (select count(*) from questions q join quizzes z on z.id=q.quiz_id where z.topic_id=t.id and q.difficulty='exam' and q.statement_id is not null) as exam_linked,
 (select count(*) from flashcards f join flashcard_sets fs on fs.id=f.set_id where fs.topic_id=t.id) as fc,
 (select length(m.content) from study_materials m where m.topic_id=t.id and m.material_type='notes') as notes_chars
from topics t join subject_levels sl on sl.id=t.subject_level_id join subjects s on s.id=sl.subject_id
where s.name ilike '%physics%' and sl.level::text ilike '%as%' order by t.sort_order nulls last, t.slug;
