select json_build_object(
 'topic_cols', (select json_agg(column_name) from information_schema.columns where table_name='topics'),
 'quiz_cols', (select json_agg(column_name) from information_schema.columns where table_name='quizzes'),
 'subj_level_cols', (select json_agg(column_name) from information_schema.columns where table_name='subject_levels'),
 'subject_cols', (select json_agg(column_name) from information_schema.columns where table_name='subjects')
) as report;
