-- Is uniqueness of profiles.username actually enforced in the live database,
-- and are there already duplicates?
select 'index' as kind, indexname as name, indexdef as detail
from pg_indexes
where schemaname = 'public' and tablename = 'profiles'
union all
select 'duplicate-lower', lower(username) as name, count(*)::text as detail
from public.profiles
where username is not null
group by lower(username)
having count(*) > 1
union all
select 'duplicate-exact', username as name, count(*)::text
from public.profiles
where username is not null
group by username
having count(*) > 1
union all
select 'trigger', tgname, pg_get_triggerdef(t.oid)
from pg_trigger t
join pg_class c on c.oid = t.tgrelid
where c.relname = 'profiles' and not t.tgisinternal
union all
select 'rpc-signature', p.proname, pg_get_function_identity_arguments(p.oid) || ' secdef=' || p.prosecdef || ' invoker_ok=' || has_function_privilege('authenticated', p.oid, 'execute')
from pg_proc p join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public' and p.proname in ('set_my_username','username_is_canonical','username_sanitize')
union all
select 'counts', 'profiles', count(*)::text || ' rows, ' || count(username)::text || ' with a username'
from public.profiles;
