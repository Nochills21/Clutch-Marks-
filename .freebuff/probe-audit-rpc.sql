select p.proname,
       pg_get_function_arguments(p.oid) as args,
       pg_get_function_result(p.oid) as result
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public' and p.proname = 'audit_admin_action';
