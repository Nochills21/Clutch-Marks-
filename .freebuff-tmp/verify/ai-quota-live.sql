-- Read-only: constraint, function security, grants, and the RPC run as an approved admin.
select
  (select pg_get_constraintdef(oid) from pg_constraint where conname = 'ai_audit_log_action_check') as action_check,
  (select prosecdef from pg_proc where proname = 'ai_marker_quota_today') as security_definer,
  (select string_agg(grantee, ',' order by grantee) from information_schema.routine_privileges
     where routine_name = 'ai_marker_quota_today' and privilege_type = 'EXECUTE') as execute_grantees;

select s.claims_set, q.*
from (
  select set_config(
    'request.jwt.claims',
    (select json_build_object('sub', ur.user_id::text, 'role', 'authenticated')::text
       from public.user_roles ur
      where ur.role = 'admin' and ur.is_approved = true
      limit 1),
    true) as claims_set
) s
cross join lateral public.ai_marker_quota_today() q;
