select json_build_object(
 'topics', (select json_agg(t) from (select s.slug subj, sl.level, count(*) topics, sum(case when t.id in (select distinct qz.topic_id from quizzes qz join questions q on q.quiz_id=qz.id) then 1 else 0 end) with_bank from topics t join subjects s on s.id=t.subject_id join subject_levels sl on sl.id=t.subject_level_id group by 1,2 order by 1,2) t),
 'bank_questions', (select json_agg(t) from (select s.slug subj, sl.level, count(q.id) n from questions q join quizzes qz on qz.id=q.quiz_id join topics t on t.id=qz.topic_id join subjects s on s.id=t.subject_id join subject_levels sl on sl.id=t.subject_level_id group by 1,2 order by 1,2) t),
 'quizzes_kind', (select json_agg(t) from (select kind, count(*) n from quizzes group by 1 order by 2 desc) t)
) as report;
