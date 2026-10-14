select 'constraint' as k, pg_get_constraintdef(c.oid) as v from pg_constraint c join pg_class t on t.oid=c.conrelid where t.relname='ai_audit_log' and c.conname='ai_audit_log_action_check'
union all
select 'col', column_name || ':' || data_type || ':' || is_nullable from information_schema.columns where table_schema='public' and table_name='ai_audit_log'
union all
select 'fn', proname from pg_proc where proname in ('has_role','ai_marker_quota_today');
