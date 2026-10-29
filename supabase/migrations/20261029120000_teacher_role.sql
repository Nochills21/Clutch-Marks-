-- A fourth account type: the teacher.
--
-- A teacher account is one role plus one subject. It exists because a tutor who
-- owns Physics should be able to open all of Physics — IGCSE, AS and A2 — without
-- buying a student plan, and should still be sold a plan the moment they wander
-- into Chemistry. The grant lives in its own table rather than in `profiles`
-- because `profiles` has a column-level guard on identity fields and this is an
-- access decision, not identity.
--
-- Two deliberate limits:
--   * `user_id` is the primary key, so one teacher holds exactly one subject. A
--     second grant is a constraint error, not a silent third subject.
--   * there is no insert/update/delete policy. The console writes grants through
--     `manage-accounts` with the service role; a browser session can only read.
--
-- Like the note and lesson previews, this is a sales gate rather than a security
-- boundary: content rows are readable to any signed-in account, and what the
-- grant changes is which of them the app hands over. Do not present it as more.
--
-- The enum value is added first and used nowhere in this file: PostgreSQL forbids
-- using a new enum label in the transaction that created it, and the whole file
-- arrives as one multi-statement request.
alter type public.app_role add value if not exists 'teacher';

create table if not exists public.teacher_subjects (
  user_id uuid primary key references auth.users (id) on delete cascade,
  subject_id uuid not null references public.subjects (id) on delete restrict,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users (id) on delete set null
);

comment on table public.teacher_subjects is
  'One row per teacher account: the single subject it may open in full. Written only by manage-accounts (service role).';

create index if not exists teacher_subjects_subject_id_idx
  on public.teacher_subjects (subject_id);

alter table public.teacher_subjects enable row level security;

-- The app must know which subject is open, so a teacher reads their own grant.
drop policy if exists "Teachers read their own subject" on public.teacher_subjects;
create policy "Teachers read their own subject"
  on public.teacher_subjects
  for select
  to authenticated
  using (user_id = auth.uid());

-- The console lists every teacher with its subject. `is_admin` is the AAL2-aware
-- helper: an AAL1 admin reads nothing, exactly as on every other admin policy.
drop policy if exists "Admins read teacher subjects" on public.teacher_subjects;
create policy "Admins read teacher subjects"
  on public.teacher_subjects
  for select
  to authenticated
  using (public.is_admin(auth.uid()));
