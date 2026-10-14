select json_build_object(
  'notes_recall_by_level', (select json_agg(t) from (
     select s.name as subject, sl.level::text as level, count(*) as n
     from questions q
     join quizzes z on z.id = q.quiz_id join topics t on t.id = z.topic_id
     join subject_levels sl on sl.id = t.subject_level_id join subjects s on s.id = sl.subject_id
     where q.question_text ~* '^\s*(from the|which)' and q.question_text ~* '\mnotes\M'
     group by 1,2 order by 3 desc) t),
  'notes_recall_quizzes', (select json_agg(t) from (
     select coalesce(z.title,'(no quiz)') as quiz, count(*) as n,
            count(*) filter (where q.statement_id is not null) as with_statement,
            count(*) filter (where q.objective_id is not null) as with_objective
     from questions q left join quizzes z on z.id = q.quiz_id
     where q.question_text ~* '^\s*(from the|which)' and q.question_text ~* '\mnotes\M'
     group by 1 order by 2 desc limit 10) t),
  'bank_composition', (select json_agg(t) from (
     select coalesce(z.is_ai_generated,false) as ai_generated, coalesce(z.exam_type,'(none)') as exam_type, count(*) as questions
     from questions q join quizzes z on z.id = q.quiz_id group by 1,2 order by 3 desc limit 12) t),
  'statement_link_gap', (select json_build_object(
      'questions_total', (select count(*) from questions),
      'with_statement', (select count(*) from questions where statement_id is not null),
      'with_objective', (select count(*) from questions where objective_id is not null),
      'topics_total', (select count(*) from topics)))
) as report;
