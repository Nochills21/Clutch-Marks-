select
  (select count(*) from public.learning_objectives o
     join public.topics t on t.id = o.topic_id
     join public.subject_levels sl on sl.id = t.subject_level_id
     join public.subjects s on s.id = sl.subject_id
    where s.slug='mathematics' and sl.level='OL' and t.slug='algebra-equations') as objectives,
  (select count(*) from public.quizzes z join public.topics t on t.id = z.topic_id
    where z.title = 'Checkpoints — Algebra — Equations' and t.slug = 'algebra-equations') as checkpoint_quizzes,
  (select count(*) from public.questions q join public.quizzes z on z.id = q.quiz_id
    where z.title = 'Checkpoints — Algebra — Equations' and q.objective_id is not null) as tagged_questions,
  (select count(*) from public.quizzes z join public.topics t on t.id = z.topic_id
    where t.slug = 'algebra-equations') as quizzes_on_topic,
  (select count(*) from public.questions q join public.quizzes z on z.id = q.quiz_id join public.topics t on t.id = z.topic_id
    where t.slug = 'algebra-equations') as questions_on_topic;
