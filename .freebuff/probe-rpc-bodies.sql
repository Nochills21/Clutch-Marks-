select p.proname, substring(pg_get_functiondef(p.oid) from 1 for 1400) as def
from pg_proc p join pg_namespace n on n.oid=p.pronamespace
where n.nspname='public' and p.proname in ('browse_questions','get_student_questions')
order by p.proname;
