select
  (select json_agg(column_name order by ordinal_position) from information_schema.columns
     where table_schema='public' and table_name='syllabus_statements') as cols,
  (select json_agg(t) from (
     select to_jsonb(s) - 'description' - 'statement' as t
     from public.syllabus_statements s limit 3) x) as sample;
