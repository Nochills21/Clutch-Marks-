begin;
insert into public.ai_audit_log (user_id, action, model, provider, output_preview)
select ur.user_id, 'quota_exhausted', 'probe-model', 'gemini', 'probe refusal'
from public.user_roles ur
where ur.role = 'admin' and ur.is_approved = true
limit 1;
select count(*) as probe_rows_visible from public.ai_audit_log where action = 'quota_exhausted' and model = 'probe-model';
rollback;
