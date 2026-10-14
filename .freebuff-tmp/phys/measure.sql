select s.name as subject, sl.level, t.slug, t.name,
  (select coalesce(max(length(m.content)),0) from public.study_materials m where m.topic_id = t.id and m.material_type in ('notes','summary')) as notes_chars,
  (select count(*) from public.quizzes qz join public.questions q on q.quiz_id = qz.id where qz.topic_id = t.id) as questions,
  (select count(*) from public.quizzes qz join public.questions q on q.quiz_id = qz.id where qz.topic_id = t.id and q.difficulty = 'exam') as exam_q,
  (select count(*) from public.study_materials m where m.topic_id = t.id and m.material_type in ('exam-technique','exam_technique')) as tech,
  (select count(*) from public.flashcards f join public.flashcard_sets fs on fs.id = f.set_id where fs.topic_id = t.id) as flashcards
from public.topics t
join public.subject_levels sl on sl.id = t.subject_level_id
join public.subjects s on s.id = sl.subject_id
where s.name ilike '%phys%'
order by sl.level, t.sort_order;
