select table_name, column_name, data_type, is_nullable, column_default
from information_schema.columns
where table_schema='public' and table_name in ('study_materials','questions','quizzes','flashcard_sets','flashcards')
order by table_name, ordinal_position;
select conrelid::regclass::text as table_name, conname, pg_get_constraintdef(oid) as definition
from pg_constraint where conrelid in ('public.study_materials'::regclass,'public.questions'::regclass,'public.flashcard_sets'::regclass,'public.flashcards'::regclass)
order by table_name, conname;
