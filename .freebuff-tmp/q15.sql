select json_build_object(
 'topic_cols', (select string_agg(column_name, ',') from information_schema.columns where table_name='topics'),
 'quiz_cols', (select string_agg(column_name, ',') from information_schema.columns where table_name='quizzes')
) as report;
