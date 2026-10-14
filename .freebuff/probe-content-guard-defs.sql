-- Read-only. What the database now enforces, straight from the catalogue.
select t.relname as table_name,
       pc.conname as constraint_name,
       pc.convalidated as validated,
       pg_get_constraintdef(pc.oid) as definition
  from pg_constraint pc
  join pg_class t on t.oid = pc.conrelid
  join pg_namespace n on n.oid = t.relnamespace
 where n.nspname = 'public'
   and pc.contype = 'c'
   and (pc.conname like '%no_replacement_character%' or pc.conname = 'questions_answer_index_in_range')
 order by t.relname, pc.conname;
