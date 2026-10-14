select t.sort_order as ord, t.slug,
  (select count(*) from quizzes qz join questions q on q.quiz_id = qz.id where qz.topic_id = t.id) as questions,
  (select count(*) from flashcard_sets fs join flashcards f on f.set_id = fs.id where fs.topic_id = t.id) as flashcards,
  (select coalesce(max(length(sm.content)),0) from study_materials sm where sm.topic_id = t.id and sm.material_type in ('notes','summary')) as notes_chars,
  (select count(*) from study_materials sm where sm.topic_id = t.id) as materials,
  (select count(*) from lessons l where l.topic_id = t.id) as lessons
from topics t order by t.sort_order
