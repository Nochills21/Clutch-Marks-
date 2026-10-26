select
  sub.slug  as subject,
  lvl.level::text as level,
  t.slug    as topic,
  t.name,
  (select count(*)::int from public.study_materials m where m.topic_id = t.id and m.material_type='notes') as notes_mats,
  (select coalesce(max(length(m.content)),0)::int from public.study_materials m where m.topic_id = t.id and m.material_type='notes') as notes_len,
  (select count(*)::int from public.study_materials m where m.topic_id = t.id and m.material_type='exam-technique') as tech_mats,
  (select count(*)::int from public.quizzes z join public.questions q on q.quiz_id=z.id where z.topic_id = t.id) as questions,
  (select count(*)::int from public.quizzes z join public.questions q on q.quiz_id=z.id where z.topic_id = t.id and q.difficulty='exam') as exam_q,
  (select count(*)::int from public.questions q where q.statement_id in (select id from public.syllabus_statements s where s.topic_id = t.id)) as stmt_linked_q,
  (select count(*)::int from public.flashcard_sets f where f.topic_id = t.id) as card_sets,
  (select count(*)::int from public.flashcards c join public.flashcard_sets f on f.id=c.set_id where f.topic_id = t.id) as cards,
  (select count(*)::int from public.learning_objectives o where o.topic_id = t.id) as objectives,
  (select count(*)::int from public.syllabus_statements s where s.topic_id = t.id) as statements
from public.topics t
join public.subject_levels lvl on lvl.id = t.subject_level_id
join public.subjects sub on sub.id = lvl.subject_id
order by sub.slug, lvl.level, t.sort_order;
