select p.proname, pg_get_function_arguments(p.oid) args, pg_get_function_result(p.oid) ret
from pg_proc p join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname in ('is_admin','is_user_approved','has_role','current_user_role','get_user_role')
order by p.proname;
