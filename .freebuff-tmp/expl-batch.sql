select q.id, t.slug as topic, left(q.question_text, 220) as qt, q.correct_option as ci,
  left(coalesce(q.options->>q.correct_option, ''), 120) as correct, q.explanation as expl
from public.questions q join public.quizzes z on z.id=q.quiz_id join public.topics t on t.id=z.topic_id
where length(coalesce(q.explanation,'')) < 40
order by q.id
limit 40;
