select conname, pg_get_constraintdef(oid) as definition
from pg_constraint
where conrelid = 'public.ai_audit_log'::regclass
  and contype = 'c';
