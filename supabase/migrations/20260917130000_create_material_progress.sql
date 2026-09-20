-- Per-user study-material progress tracking (Mark as studied).
-- The app (Notes.tsx, LessonNotes.tsx, StudentDashboard.tsx) already reads/writes
-- this table, but it was never created in the live database, so every query 404'd.
create table if not exists public.material_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  material_id uuid not null references public.study_materials (id) on delete cascade,
  completed boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, material_id)
);

alter table public.material_progress enable row level security;

drop policy if exists "Users manage own material progress" on public.material_progress;
create policy "Users manage own material progress"
  on public.material_progress
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Keep updated_at fresh on upserts (the app relies on onConflict: user_id,material_id).
create extension if not exists moddatetime with schema extensions;

create trigger set_material_progress_updated_at
  before update on public.material_progress
  for each row execute function moddatetime (updated_at);
