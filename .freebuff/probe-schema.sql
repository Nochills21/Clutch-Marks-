-- Introspect the tables the new personal-wins / week RPCs will read.
select 'COL' k, table_name, string_agg(column_name, ', ' order by ordinal_position) v
from information_schema.columns
where table_schema='public' and table_name in
  ('topics','subject_levels','subjects','quiz_attempts','practice_attempts','lessons','lesson_progress','xp_events','study_sessions','student_prefs','questions','quizzes','flashcards','flashcard_sets')
group by table_name
union all
select 'TBL', c.relname, 'exists'
from pg_class c join pg_namespace n on n.oid=c.relnamespace
where n.nspname='public' and c.relname in ('study_sessions','student_prefs','subject_levels','subjects','topics')
union all
select 'FN', p.proname, 'exists'
from pg_proc p join pg_namespace n on n.oid=p.pronamespace
where n.nspname='public' and p.proname in ('is_admin','is_user_approved','has_role','touch_streak','award_xp','my_xp_summary','check_practice_answer','grade_quiz')
order by 1,2;
