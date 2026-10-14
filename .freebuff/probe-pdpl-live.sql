-- Read-only. One result set so nothing is lost: everything the PDPL migrations
-- declare, checked against the live database.
with objects as (
  select 'consent_records'      as name, to_regclass('public.consent_records')::text      as found
  union all select 'data_requests',        to_regclass('public.data_requests')::text
  union all select 'email_suppressions',   to_regclass('public.email_suppressions')::text
  union all select 'fn export_my_data',    (select count(*)::text from pg_proc p join pg_namespace n on n.oid = p.pronamespace
                                              where n.nspname = 'public' and p.proname = 'export_my_data')
  union all select 'fn purge',             (select string_agg(p.proname, ', ' order by p.proname) from pg_proc p join pg_namespace n on n.oid = p.pronamespace
                                              where n.nspname = 'public' and (p.proname ilike '%purge%' or p.proname ilike '%retention%'))
  union all select 'cron jobs',            (select coalesce(string_agg(jobname || ' @ ' || schedule, ' | '), 'NONE') from cron.job)
  union all select 'exec export as anon',  has_function_privilege('anon', 'public.export_my_data()', 'execute')::text
  union all select 'exec export as authd', has_function_privilege('authenticated', 'public.export_my_data()', 'execute')::text
  union all select 'consent rows',         (select count(*)::text from public.consent_records)
  union all select 'consent cols',         (select string_agg(column_name, ',' order by ordinal_position) from information_schema.columns
                                              where table_schema = 'public' and table_name = 'consent_records')
  union all select 'data_request cols',    (select string_agg(column_name, ',' order by ordinal_position) from information_schema.columns
                                              where table_schema = 'public' and table_name = 'data_requests')
  union all select 'profiles consent cols',(select coalesce(string_agg(column_name, ',' order by ordinal_position), 'NONE') from information_schema.columns
                                              where table_schema = 'public' and table_name = 'profiles' and column_name like 'consent%')
  union all select 'data_request triggers',(select coalesce(string_agg(tgname, ','), 'NONE') from pg_trigger t
                                              where not t.tgisinternal and t.tgrelid::regclass::text like '%data_request%')
)
select name, found from objects order by name;
