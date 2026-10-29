-- What exists today for roles, plan gating and subject scope.
select 'user_roles.columns' as probe,
       string_agg(column_name || ':' || data_type || coalesce('(' || udt_name || ')', ''), ', ' order by ordinal_position) as detail
from information_schema.columns
where table_schema = 'public' and table_name = 'user_roles'
union all
select 'role_check',
       coalesce(pg_get_constraintdef(c.oid), '(none)')
from pg_constraint c
where c.conrelid = 'public.user_roles'::regclass and c.contype = 'c'
union all
select 'role_enum',
       coalesce((select string_agg(e.enumlabel, ',' order by e.enumsortorder)
                 from pg_type t join pg_enum e on e.enumtypid = t.oid
                 where t.typname = 'app_role'), '(no app_role type)')
union all
select 'has_active_plan',
       coalesce(pg_get_functiondef(p.oid), '(missing)')
from pg_proc p
where p.proname = 'has_active_plan' and p.pronamespace = 'public'::regnamespace
union all
select 'user_roles_policies',
       string_agg(polname || ' ' || coalesce(pg_get_expr(polqual, polrelid), ''), ' || ' order by polname)
from pg_policy where polrelid = 'public.user_roles'::regclass
union all
select 'roles_live',
       coalesce((select json_agg(x)::text from (select role, count(*) from public.user_roles group by role order by role) x), '[]')
union all
select 'admin_helpers',
       string_agg(p.proname, ',' order by p.proname)
from pg_proc p
where p.pronamespace = 'public'::regnamespace
  and p.proname in ('is_admin', 'has_role', 'has_active_plan', 'has_active_subscription', 'get_free_preview', 'get_student_questions', 'ai_marker_quota_today', 'set_my_username', 'username_sanitize');

-- The grant table itself, and proof it has no write path for a browser session.
select 'teacher_table' as probe,
       coalesce((select string_agg(column_name || ':' || data_type, ', ' order by ordinal_position)
                 from information_schema.columns
                 where table_schema = 'public' and table_name = 'teacher_subjects'), '(MISSING)') as detail
union all
select 'teacher_policies',
       coalesce((select string_agg(polname || ' -> ' || coalesce(pg_get_expr(polqual, polrelid), '(true)'), ' || ' order by polname)
                 from pg_policy where polrelid = 'public.teacher_subjects'::regclass), '(none)')
union all
select 'teacher_writers',
       coalesce((select string_agg(polname, ',') from pg_policy
                 where polrelid = 'public.teacher_subjects'::regclass and polcmd <> 'r'), '(no write policy - service role only)');
