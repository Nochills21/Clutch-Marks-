select
  (select pg_get_constraintdef(oid) from pg_constraint where conname = 'ai_audit_log_action_check') as action_check,
  (select prosecdef from pg_proc where proname = 'ai_marker_quota_today') as security_definer,
  (select string_agg(grantee, ',' order by grantee) from information_schema.routine_privileges
     where routine_name = 'ai_marker_quota_today' and privilege_type = 'EXECUTE') as execute_grantees;
