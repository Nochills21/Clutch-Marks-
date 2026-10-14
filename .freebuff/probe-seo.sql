select 'POLICY' k, tablename, policyname, cmd, roles::text
from pg_policies where schemaname='public' and tablename in ('topics','subjects','subject_levels')
union all
select 'RLS', c.relname, c.relrowsecurity::text, '', ''
from pg_class c join pg_namespace n on n.oid=c.relnamespace
where n.nspname='public' and c.relname in ('topics','subjects','subject_levels')
union all
select 'GRANT', c.relname, r.rolname, p.privilege_type, ''
from information_schema.role_table_grants p
join pg_class c on c.relname = p.table_name
join pg_namespace n on n.oid = c.relnamespace and n.nspname='public'
join pg_roles r on r.rolname = p.grantee
where p.table_schema='public' and c.relname in ('topics','subjects','subject_levels')
  and p.privilege_type='SELECT' and r.rolname in ('anon','authenticated')
order by 1,2,3;
