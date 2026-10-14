select json_build_object(
 'affected_topics', (select count(distinct z.topic_id) from questions q left join quizzes z on z.id=q.quiz_id where q.question_text ~* '^\s*(from the|which)' and q.question_text ~* '\mnotes\M'),
 'all_topics', (select count(*) from topics),
 'per_sl', (select string_agg(x.subj||'/'||x.level||'='||x.n, ' ' order by x.n desc) from (select s.slug subj, sl.level, count(*) n from questions q left join quizzes z on z.id=q.quiz_id left join topics t on t.id=z.topic_id join subject_levels sl on sl.id=t.subject_level_id join subjects s on s.id=sl.subject_id where q.question_text ~* '^\s*(from the|which)' and q.question_text ~* '\mnotes\M' group by 1,2) x),
 'topic_list', (select string_agg(x.topic||':'||x.n, ' ' order by x.n desc) from (select t.slug topic, count(*) n from questions q left join quizzes z on z.id=q.quiz_id left join topics t on t.id=z.topic_id where q.question_text ~* '^\s*(from the|which)' and q.question_text ~* '\mnotes\M' group by 1 order by 2 desc) x)
) as report;
