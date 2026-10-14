select t.slug, count(*) as recall_rows, count(*) filter (where true) as n
  from public.questions q
  join public.quizzes z on z.id = q.quiz_id
  join public.topics t on t.id = z.topic_id
 where q.question_text ~* '^\s*(from the|which)' and q.question_text ~* '\mnotes\M'
 group by t.slug
 order by recall_rows desc
 limit 100;
