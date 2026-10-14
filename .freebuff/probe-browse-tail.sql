select substring(pg_get_functiondef(p.oid) from 1300 for 1200) as tail
from pg_proc p join pg_namespace n on n.oid=p.pronamespace
where n.nspname='public' and p.proname='browse_questions';
