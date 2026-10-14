select json_build_object(
  'questions_per_level', (
    select json_agg(t order by t.subject, t.level) from (
      select s.name as subject, sl.level, count(q.id) as questions,
             count(distinct t.id) as topics, count(distinct q.id) filter (where q.statement_id is not null) as statement_linked
      from questions q
      join quizzes z on z.id = q.quiz_id
      join topics t on t.id = z.topic_id
      join subject_levels sl on sl.id = t.subject_level_id
      join subjects s on s.id = sl.subject_id
      group by 1,2
    ) t
  ),
  'integrity_by_category', (
    select json_agg(t) from (select category, severity, count(*) as n from public.content_integrity_findings() group by 1,2) t
  ),
  'quiz_and_question_totals', (
    select json_build_object('quizzes', (select count(*) from quizzes), 'questions', (select count(*) from questions),
      'topics', (select count(*) from topics), 'objectives', (select count(*) from learning_objectives))
  )
) as report;
