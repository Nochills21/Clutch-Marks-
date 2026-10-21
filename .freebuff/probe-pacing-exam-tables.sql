select t.table_name,
       (select count(*) from pg_policies p
         where p.schemaname = 'public' and p.tablename = t.table_name) as policies,
       (select relrowsecurity from pg_class c
         where c.oid = (quote_ident(t.table_schema) || '.' || quote_ident(t.table_name))::regclass) as rls_enabled
from information_schema.tables t
where t.table_schema = 'public'
  and t.table_name in ('question_timings', 'exam_dates')
order by t.table_name;
