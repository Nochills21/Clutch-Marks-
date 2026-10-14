select p.proname, pg_get_functiondef(p.oid) as def
from pg_proc p join pg_namespace n on n.oid = p.pronamespace
where n.nspname='public' and p.proname in ('check_practice_answer','grade_quiz');
