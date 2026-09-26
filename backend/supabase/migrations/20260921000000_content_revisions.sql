-- Migration: content revision history + restore for lessons & study_materials.
-- Every UPDATE snapshots the previous row into content_revisions (latest+previous
-- both always available). Admins restore any version via restore_content_revision().

-- ============ 1. Revisions table ============
create table if not exists public.content_revisions (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null check (entity_type in ('lesson','material')),
  entity_id uuid not null,
  title text,
  content text,
  extra jsonb,                       -- other mutable fields (video_url, material_type, file_url, ...)
  version integer not null,          -- monotonically increasing per entity
  created_by uuid,                   -- profiles.user_id of the editor who produced this state
  created_by_username text,
  created_at timestamptz not null default now()
);

create index if not exists content_revisions_entity_idx
  on public.content_revisions (entity_type, entity_id, version desc);
create index if not exists content_revisions_created_at_idx on public.content_revisions (created_at desc);

comment on table public.content_revisions is
  'Version history for lessons and study materials. A new row is written by trigger before each UPDATE of lessons/study_materials; restore via restore_content_revision().';

-- ============ 2. Snapshot trigger (BEFORE UPDATE on source tables) ============
create or replace function public.snapshot_content_revision()
returns trigger
language plpgsql
security definer
set search_path = public
as $rev$
declare
  v_actor uuid;
  v_username text;
  v_version integer;
  v_changed boolean;
begin
  select p.user_id, p.username into v_actor, v_username
  from public.profiles p where p.user_id = auth.uid();

  if tg_table_name = 'lessons' then
    v_changed := (old.title is distinct from new.title)
              or (old.content is distinct from new.content)
              or (old.video_url is distinct from new.video_url)
              or (old.sort_order is distinct from new.sort_order);
    if not v_changed then return new; end if;
    insert into public.content_revisions
      (entity_type, entity_id, title, content, extra, version, created_by, created_by_username)
    values
      ('lesson', old.id, old.title, old.content,
       jsonb_build_object('video_url', old.video_url, 'sort_order', old.sort_order),
       coalesce((select max(version) + 1 from public.content_revisions r
                 where r.entity_type = 'lesson' and r.entity_id = old.id), 1),
       v_actor, v_username);
  elsif tg_table_name = 'study_materials' then
    v_changed := (old.title is distinct from new.title)
              or (old.content is distinct from new.content)
              or (old.material_type is distinct from new.material_type)
              or (old.file_url is distinct from new.file_url);
    if not v_changed then return new; end if;
    insert into public.content_revisions
      (entity_type, entity_id, title, content, extra, version, created_by, created_by_username)
    values
      ('material', old.id, old.title, old.content,
       jsonb_build_object('material_type', old.material_type, 'file_url', old.file_url),
       coalesce((select max(version) + 1 from public.content_revisions r
                 where r.entity_type = 'material' and r.entity_id = old.id), 1),
       v_actor, v_username);
  end if;

  return new;
end;
$rev$;

drop trigger if exists trg_lessons_revision on public.lessons;
create trigger trg_lessons_revision before update on public.lessons
  for each row execute function public.snapshot_content_revision();

drop trigger if exists trg_materials_revision on public.study_materials;
create trigger trg_materials_revision before update on public.study_materials
  for each row execute function public.snapshot_content_revision();

-- ============ 3. Restore function (approved admins only) ============
create or replace function public.restore_content_revision(p_revision_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $rev$
declare
  r public.content_revisions%rowtype;
  v_is_admin boolean;
begin
  select exists (
    select 1 from public.user_roles ur
    where ur.user_id = auth.uid() and ur.role = 'admin' and ur.is_approved = true
  ) into v_is_admin;
  if not v_is_admin then
    raise exception 'restore_content_revision: only approved admins can restore revisions';
  end if;

  select * into r from public.content_revisions c where c.id = p_revision_id;
  if not found then
    raise exception 'restore_content_revision: revision % not found', p_revision_id;
  end if;

  if r.entity_type = 'lesson' then
    update public.lessons set
      title = r.title,
      content = r.content,
      video_url = r.extra->>'video_url',
      sort_order = coalesce((r.extra->>'sort_order')::integer, sort_order),
      updated_at = now()
    where id = r.entity_id;
  elsif r.entity_type = 'material' then
    update public.study_materials set
      title = r.title,
      content = r.content,
      material_type = coalesce(r.extra->>'material_type', material_type),
      file_url = coalesce(r.extra->>'file_url', file_url),
      updated_at = now()
    where id = r.entity_id;
  else
    raise exception 'restore_content_revision: unsupported entity_type %', r.entity_type;
  end if;
end;
$rev$;

revoke all on function public.restore_content_revision(uuid) from public, anon, authenticated;
grant execute on function public.restore_content_revision(uuid) to authenticated;

-- ============ 4. Lock down the history table ============
alter table public.content_revisions enable row level security;

drop policy if exists "Content revisions read - approved admins only" on public.content_revisions;
create policy "Content revisions read - approved admins only"
  on public.content_revisions for select
  using (
    exists (
      select 1 from public.user_roles r
      where r.user_id = auth.uid() and r.role = 'admin' and r.is_approved = true
    )
  );

revoke all on public.content_revisions from anon, authenticated;
grant select on public.content_revisions to authenticated;

-- ============ 5. Straighten updated_at ============
-- (lessons/study_materials already maintain updated_at; nothing to do here.)
