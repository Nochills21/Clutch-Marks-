select
  q.id,
  sub.slug || ' ' || lvl.level::text || ' / ' || t.name as topic,
  q.question_text as stem,
  q.options,
  q.correct_option,
  q.explanation
from public.questions q
join public.quizzes z on z.id = q.quiz_id
join public.topics t on t.id = z.topic_id
join public.subject_levels lvl on lvl.id = t.subject_level_id
join public.subjects sub on sub.id = lvl.subject_id
where length(trim(coalesce(q.explanation,''))) < 40
  and t.name in (
    'Simulation, Sensors and Real Data', 'Algorithms & Programming', 'Programming Concepts',
    'Algebra — Inequalities', 'Algebra — Simplifying and Expanding', 'Number — Sets',
    'Transformations and Vectors', 'Oscillations and Waves II', 'Nuclear Physics',
    'Database Systems', 'Logic Gates & Boolean Logic', 'Hypothesis Testing')
order by topic, q.id
limit 40;
