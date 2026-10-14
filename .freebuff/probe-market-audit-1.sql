-- Read-only: what is actually in the live database (row estimates per table).
select relname as table_name, n_live_tup as rows
from pg_stat_user_tables
where schemaname = 'public'
order by n_live_tup desc, relname;
