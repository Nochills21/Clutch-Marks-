select 'plan' as kind, id::text as a, name::text as b, months::text as c, null::text as d from public.plans
union all
select 'col', table_name||'.'||column_name, data_type, is_nullable, column_default
from information_schema.columns where table_schema='public' and table_name in ('plans','subscriptions')
union all
select 'fk', conname, pg_get_constraintdef(oid), null, null
from pg_constraint where conrelid='public.subscriptions'::regclass and contype='f'
union all
select 'sub', status::text, plan_id::text, count(*)::text, null from public.subscriptions group by status, plan_id;
