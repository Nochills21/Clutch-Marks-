select
  q.id,
  t.name as topic,
  q.question_text as stem,
  q.options,
  q.correct_option,
  q.explanation
from public.questions q
join public.quizzes z on z.id = q.quiz_id
join public.topics t on t.id = z.topic_id
join public.subject_levels lvl on lvl.id = t.subject_level_id
join public.subjects sub on sub.id = lvl.subject_id
where sub.slug = 'mathematics' and lvl.level::text = 'OL'
  and t.name in ('Algebra — Graphs', 'Statistics — Probability')
  and length(trim(coalesce(q.explanation,''))) < 40
order by t.name, q.id;
