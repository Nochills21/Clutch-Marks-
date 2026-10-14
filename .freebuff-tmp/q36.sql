select string_agg(tc.table_name||'.'||kcu.column_name||' -> '||ccu.table_name||' ('||rc.delete_rule||')', ' ; ') as refs
  from information_schema.table_constraints tc
  join information_schema.key_column_usage kcu on kcu.constraint_name = tc.constraint_name
  join information_schema.constraint_column_usage ccu on ccu.constraint_name = tc.constraint_name
  join information_schema.referential_constraints rc on rc.constraint_name = tc.constraint_name
 where tc.constraint_type='FOREIGN KEY' and ccu.table_name='past_papers';
