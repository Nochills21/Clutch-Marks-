-- Admin audit log: records who created/modified/deleted content and managed users.
-- All triggers funnel into public.admin_audit_log via a SECURITY DEFINER function
-- (so the log can never be blocked by target-table RLS and needs no grants on targets).
-- Client access: SELECT for approved admins only; no client can INSERT/UPDATE/DELETE.

-- ============ 1. Table ============
create table if not exists public.admin_audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid,                                -- profiles.user_id of the acting admin (null for service/system)
  actor_username text,                          -- captured at write time (username may change later)
  action text not null check (action in ('create','update','delete','approve','reject','role_change','login','download')),
  entity text not null,                         -- table/entity name, e.g. 'lessons', 'user'
  entity_id uuid,                               -- PK of the affected row (null for auth-user events)
  entity_label text,                            -- human-readable identifier (title, username, ...)
  details jsonb,                                -- before/after diff or action payload (never secrets)
  created_at timestamptz not null default now()
);

create index if not exists admin_audit_log_created_at_idx on public.admin_audit_log (created_at desc);
create index if not exists admin_audit_log_entity_idx on public.admin_audit_log (entity, created_at desc);
create index if not exists admin_audit_log_actor_idx on public.admin_audit_log (actor_id, created_at desc);

comment on table public.admin_audit_log is
  'Append-only audit trail of admin content changes and user-management actions. Written only by triggers and the audit_admin_action() SECURITY DEFINER function.';

-- ============ 2. Writer function (SECURITY DEFINER, hardened) ============
create or replace function public.write_admin_audit_log()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_actor uuid;
  v_username text;
  v_action text;
  v_old_label text;
  v_new_label text;
  v_diff jsonb;
  v_detail jsonb;
begin
  select p.user_id, p.username into v_actor, v_username
  from public.profiles p where p.user_id = auth.uid();

  if tg_op = 'INSERT' then
    v_action := 'create';
  elsif tg_op = 'UPDATE' then
    if new is not distinct from old then return null; end if;  -- no-op updates (updated_at touch)
    v_action := 'update';
  elsif tg_op = 'DELETE' then
    v_action := 'delete';
  end if;

  -- Label: prefer title/name, fall back to username/subject slug.
  -- Use JSONB field access (not raw row fields): tables differ in shape, and a
  -- raw reference like new.name errors on tables without that column.
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
  return null;
end;
$$;

-- Service-role / edge-function entry point (no table owner rights needed by callers)
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
  if p_action not in ('create','update','delete','approve','reject','role_change','login') then
    raise exception 'audit_admin_action: invalid action %', p_action;
  end if;
  if p_entity is null or length(p_entity) > 64 then
    raise exception 'audit_admin_action: invalid entity';
  end if;

  select p.user_id, p.username into v_actor, v_username
  from public.profiles p where p.user_id = auth.uid();

  -- Service-role callers (edge functions) run without a user JWT; they must pass
  -- the acting admin explicitly. Direct-JWT callers always resolve via auth.uid().
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

-- ============ 3. Lock the table down ============
alter table public.admin_audit_log enable row level security;

drop policy if exists "Admin audit log read - approved admins only" on public.admin_audit_log;
create policy "Admin audit log read - approved admins only"
  on public.admin_audit_log for select
  using (
    exists (
      select 1 from public.user_roles r
      where r.user_id = auth.uid()
        and r.role = 'admin'
        and r.is_approved = true
    )
  );

-- No INSERT/UPDATE/DELETE policies: clients can never write. Grants follow.
revoke all on public.admin_audit_log from anon, authenticated;
grant select on public.admin_audit_log to authenticated;

-- ============ 4. Content-table triggers ============
-- Drop first so re-running the migration is idempotent.
do $$
declare
  t text;
begin
  foreach t in array array[
    'subjects','subject_levels','topics','lessons','quizzes','questions',
    'past_papers','study_materials','announcements','homework','flashcard_sets','flashcards'
  ]
  loop
    execute format('drop trigger if exists audit_%s_changes on public.%I', t, t);
    execute format(
      'create trigger audit_%s_changes after insert or update or delete on public.%I
         for each row execute function public.write_admin_audit_log()', t, t);
  end loop;
end;
$$;

-- ============ 5. User-management actions (edge function path) ============
-- manage-accounts runs as service_role, so its own trigger writes log rows with
-- actor_id = null. To attribute the acting admin, the function now calls
-- audit_admin_action() *before* performing each mutation (see function source).

comment on function public.audit_admin_action(text, text, uuid, text, jsonb, uuid, text) is
  'Called by service-role code (edge functions) to attribute an action to the acting admin. Direct-JWT callers resolve the actor via auth.uid(); service-role callers must pass p_actor_id/p_actor_username.';
