-- Per-user announcement read state.
--
-- The previous attempt put a single `unread` boolean on `announcements` and
-- restricted the SELECT policy to `unread = true`. That cannot work: the flag is
-- global, not per student, so the badge would show every student the same number
-- forever, and the moment anything marked a row read the announcement vanished
-- from every student's feed (the SELECT policy hid it). Nothing ever marked one
-- read, which is why the badge sat at zero.
--
-- Read state is per user, so it belongs in a join table. The announcements feed
-- itself is visible to all approved users again.
--
-- Idempotent: safe to re-run.

create table if not exists public.announcement_reads (
  user_id uuid not null references auth.users(id) on delete cascade,
  announcement_id uuid not null references public.announcements(id) on delete cascade,
  read_at timestamp with time zone not null default now(),
  constraint announcement_reads_pkey primary key (user_id, announcement_id)
);

create index if not exists announcement_reads_user_idx
  on public.announcement_reads (user_id);

alter table public.announcement_reads enable row level security;

drop policy if exists "Users read own announcement state" on public.announcement_reads;
create policy "Users read own announcement state"
  on public.announcement_reads for select to authenticated
  using (user_id = auth.uid());

drop policy if exists "Users mark own announcements read" on public.announcement_reads;
create policy "Users mark own announcements read"
  on public.announcement_reads for insert to authenticated
  with check (user_id = auth.uid());

drop policy if exists "Users update own announcement state" on public.announcement_reads;
create policy "Users update own announcement state"
  on public.announcement_reads for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "Users clear own announcement state" on public.announcement_reads;
create policy "Users clear own announcement state"
  on public.announcement_reads for delete to authenticated
  using (user_id = auth.uid());

-- The feed is not filtered by read state any more: a student who has read an
-- announcement must still be able to find it again.
drop policy if exists "Students can view unread announcements" on public.announcements;
drop policy if exists "Approved users can view announcements" on public.announcements;
create policy "Approved users can view announcements"
  on public.announcements for select to authenticated
  using (public.is_user_approved(auth.uid()) or public.has_role(auth.uid(), 'admin'::app_role));

-- This policy only existed so students could flip the global `unread` flag.
-- Read state now lives in announcement_reads, so students have no business
-- writing to the announcements table at all.
drop policy if exists "Students can mark announcements read" on public.announcements;

-- Deprecated: superseded by announcement_reads. Kept (not dropped) so this
-- migration stays non-destructive; nothing reads or writes it any more.
comment on column public.announcements.unread is
  'DEPRECATED — read state is per user in public.announcement_reads. Do not use.';
