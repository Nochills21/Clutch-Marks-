select json_build_object(
 'topic_cols', (select string_agg(column_name, ',') from information_schema.columns where table_name='topics'),
 'quiz_cols', (select string_agg(column_name, ',') from information_schema.columns where table_name='quizzes'),
 'quiz_kinds', (select json_agg(t) from (select kind, count(*) n from quizzes group by 1 order by 2 desc) t)
) as report;
