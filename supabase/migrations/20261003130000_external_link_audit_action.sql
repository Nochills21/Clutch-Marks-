-- Record when an external past-paper link is opened (or blocked).
--
-- serve-external-paper audits every attempt at an externally-hosted paper, so
-- a blocked free-plan click is visible in the admin audit viewer alongside the
-- successful opens. That needs a new action value in both the table check
-- constraint and the audit_admin_action() validator.

alter table public.admin_audit_log
  drop constraint admin_audit_log_action_check;

alter table public.admin_audit_log
  add constraint admin_audit_log_action_check
  check (action in (
    'create','update','delete','approve','reject','role_change','login','download',
    'quiz_attempt','homework_submission','external_link_opened'
  ));

create or replace function public.audit_admin_action(
  p_action text,
  p_entity text,
  p_entity_id uuid default null,
  p_entity_label text default null,
  p_details jsonb default null,
  p_actor_id uuid default null,
  p_actor_username text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_actor uuid;
  v_username text;
begin
  if p_action not in (
    'create','update','delete','approve','reject','role_change','login','download',
    'quiz_attempt','homework_submission','external_link_opened'
  ) then
    raise exception 'audit_admin_action: invalid action %', p_action;
  end if;
  if p_entity is null or length(p_entity) > 64 then
    raise exception 'audit_admin_action: invalid entity';
  end if;

  select p.user_id, p.username into v_actor, v_username
  from public.profiles p where p.user_id = auth.uid();

  -- Service-role callers (edge functions) run without a user JWT; they must pass
  -- the acting user explicitly. Direct-JWT callers resolve via auth.uid().
  if v_actor is null then
    v_actor := p_actor_id;
    v_username := p_actor_username;
  end if;

  insert into public.admin_audit_log (actor_id, actor_username, action, entity, entity_id, entity_label, details)
  values (v_actor, v_username, p_action, p_entity, p_entity_id, p_entity_label, p_details);
end;
$$;

revoke all on function public.audit_admin_action(text, text, uuid, text, jsonb, uuid, text) from public, anon, authenticated;
grant execute on function public.audit_admin_action(text, text, uuid, text, jsonb, uuid, text) to service_role;
