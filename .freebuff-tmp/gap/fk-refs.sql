select
  (select json_agg(json_build_object('table', cl.relname, 'constraint', c.conname))
     from pg_constraint c
     join pg_class cl on cl.oid = c.conrelid
     where c.contype = 'f' and c.confrelid = 'public.syllabus_statements'::regclass) as fk_refs,
  (select count(*) from public.syllabus_statements where code like '9709%' or code like '9702%') as caie_rows;
