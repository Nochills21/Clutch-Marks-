select json_build_object(
 'by_sl', (select json_agg(t) from (
    select s.slug subj, sl.level, count(distinct t.id) topics,
           count(distinct case when q.id is not null then t.id end) topics_with_q,
           count(q.id) questions,
           count(distinct case when z.is_ai_generated then t.id end) topics_ai
    from topics t join subject_levels sl on sl.id=t.subject_level_id join subjects s on s.id=sl.subject_id
    left join quizzes z on z.topic_id=t.id left join questions q on q.quiz_id=z.id
    group by 1,2 order by 1,2) t),
 'ai_quizzes', (select count(*) from quizzes where is_ai_generated),
 'total_q', (select count(*) from questions)
) as report;
