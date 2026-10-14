select conrelid::regclass as from_table, conname, pg_get_constraintdef(oid) as def from pg_constraint where confrelid='public.questions'::regclass and contype='f';
