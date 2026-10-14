-- Read-only. Does the LIVE handle_new_user record consent, and do the rows line up?
with counts as (
  select 'auth users'            as name, (select count(*)::text from auth.users) as value
  union all select 'profiles',            (select count(*)::text from public.profiles)
  union all select 'consent records',     (select count(*)::text from public.consent_records)
  union all select 'consent kinds',       (select coalesce(string_agg(distinct kind, ','), 'none') from public.consent_records)
  union all select 'consent versions',    (select coalesce(string_agg(distinct document_version, ','), 'none') from public.consent_records)
  union all select 'handle_new_user writes consent',
    (position('consent_records' in coalesce((select prosrc from pg_proc where proname = 'handle_new_user'), '')))::text
  union all select 'handle_new_user consent kind literal',
    (select coalesce((regexp_match(prosrc, '''(privacy|terms|guardian|marketing)'''))[1], 'NONE')
       from pg_proc where proname = 'handle_new_user')
  union all select 'export_my_data returns',
    (select pg_get_function_result(oid) from pg_proc where proname = 'export_my_data')
)
select name, value from counts order by name;
