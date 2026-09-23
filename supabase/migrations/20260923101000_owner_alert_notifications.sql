-- Owner alerts: notify every admin (in-app) when sensitive audit events fire.
-- Appends to write_admin_audit_log (SECURITY DEFINER) so the notification is
-- tamper-proof too. Two event classes:
--   * any DELETE on content entities
--   * any change to user_roles (account/role changes: create/update/delete)
create or replace function public.notify_admins_of_sensitive_event(
  p_action text,
  p_entity text,
  p_label text,
  p_actor text
) returns void
language plpgsql
security definer
set search_path = public
as $fn$
begin
  insert into public.notifications (user_id, title, message)
  select r.user_id,
    case when p_action = 'delete'
      then 'Content deleted: ' || p_entity
      else 'Account change: ' || p_entity end,
    coalesce(p_actor, 'someone') || ' ' ||
      case p_action
        when 'delete' then 'deleted '
        when 'create' then 'created '
        when 'update' then 'modified '
        when 'approve' then 'changed '
        else p_action || 'd '
      end ||
      coalesce(p_label, 'a ' || p_entity) ||
      '. Review the Audit Log for details.'
  from public.user_roles r
  where r.role = 'admin';
end;
$fn$;

-- Wrap write_admin_audit_log: after its insert, fire notifications for the two classes.
create or replace function public.write_admin_audit_log() returns trigger
language plpgsql
security definer
set search_path = public
as $fn$
declare
  v_actor uuid;
  v_username text;
  v_action text;
  v_old_label text;
  v_new_label text;
  v_diff jsonb;
begin
  select p.user_id, p.username into v_actor, v_username
  from public.profiles p where p.user_id = auth.uid();

  if tg_op = 'INSERT' then
    v_action := 'create';
  elsif tg_op = 'UPDATE' then
    if new is not distinct from old then return null; end if;
    v_action := 'update';
  elsif tg_op = 'DELETE' then
    v_action := 'delete';
  end if;

  v_new_label := coalesce(to_jsonb(new)->>'title', to_jsonb(new)->>'name', to_jsonb(new)->>'username');
  v_old_label := coalesce(to_jsonb(old)->>'title', to_jsonb(old)->>'name', to_jsonb(old)->>'username');
  v_diff := jsonb_build_object(
    'before', to_jsonb(old),
    'after', to_jsonb(new)
  );

  insert into public.admin_audit_log (actor_id, actor_username, action, entity, entity_id, entity_label, details)
  values (
    v_actor,
    v_username,
    v_action,
    tg_table_name,
    coalesce(to_jsonb(new)->>'id', to_jsonb(old)->>'id')::uuid,
    coalesce(v_new_label, v_old_label),
    v_diff
  );

  -- Owner alerts: content deletions and user_roles changes.
  if v_action = 'delete' or tg_table_name = 'user_roles' then
    perform public.notify_admins_of_sensitive_event(
      v_action, tg_table_name, coalesce(v_new_label, v_old_label), v_username);
  end if;

  return null;
end;
$fn$;
