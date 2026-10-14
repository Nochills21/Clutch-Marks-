select json_build_object(
 'questions_cols', (select json_agg(column_name) from information_schema.columns where table_name='questions'),
 'questions_total', (select count(*) from questions),
 'stmt_linked', (select count(*) from questions where statement_id is not null),
 'obj_linked', (select count(*) from questions where objective_id is not null),
 'fk_targets', (select json_agg(json_build_object('col',kcu.column_name,'ref',ccu.table_name||'.'||ccu.column_name)) from information_schema.table_constraints tc join information_schema.key_column_usage kcu on kcu.constraint_name=tc.constraint_name join information_schema.constraint_column_usage ccu on ccu.constraint_name=tc.constraint_name where tc.table_name='questions' and tc.constraint_type='FOREIGN KEY')
) as report;
