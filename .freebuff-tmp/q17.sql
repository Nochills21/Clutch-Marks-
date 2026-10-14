select json_agg(t) from (
  select s.slug subj, sl.level, t.slug topic, count(*) n, min(z.title) quiz
    from questions q left join quizzes z on z.id=q.quiz_id left join topics t on t.id=z.topic_id
    join subject_levels sl on sl.id=t.subject_level_id join subjects s on s.id=sl.subject_id
   where q.question_text ~* '^\s*(from the|which)' and q.question_text ~* '\mnotes\M'
   group by 1,2,3 order by 4 desc) t as report;
