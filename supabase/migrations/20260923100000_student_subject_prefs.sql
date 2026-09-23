-- Student subject picker: each student chooses which subject-levels they study.
-- Unselected ones disappear from Lessons/Practice/etc. Admins see everything.
create table if not exists public.student_subject_prefs (
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_level_id uuid not null references public.subject_levels(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, subject_level_id)
);
alter table public.student_subject_prefs enable row level security;

drop policy if exists "Read own subject prefs" on public.student_subject_prefs;
create policy "Read own subject prefs" on public.student_subject_prefs
  for select using (auth.uid() = user_id);
drop policy if exists "Write own subject prefs" on public.student_subject_prefs;
create policy "Write own subject prefs" on public.student_subject_prefs
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists idx_student_subject_prefs_user on public.student_subject_prefs(user_id);
