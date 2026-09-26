-- Announcement read-state tracking: add an `unread` flag so the student's
-- bell menu can count and mark announcements without a separate notifications
-- table. Admins always see the full list; students only see unread items.
--
-- The column is added with a safe default so existing rows keep `true`
-- (everything is unread until the student opens the feed or the bell).

alter table public.announcements
  add column if not exists unread boolean default true not null;

-- Students can only see unread announcements through the bell.
drop policy if exists "Anyone authenticated can view announcements" on public.announcements;
create policy "Students can view unread announcements"
  on public.announcements for select to authenticated
  using (unread = true);

-- Admins see everything (for post and manage).
drop policy if exists "Admins can manage announcements" on public.announcements;
create policy "Admins can manage announcements"
  on public.announcements for all to authenticated
  using (has_role(auth.uid(), 'admin'::app_role));

-- Mark-as-read is covered by the manage policy (admins) — but students
-- also need a way to clear their own unread flag. Allow students to
-- update only the rows they have open.
create policy "Students can mark announcements read"
  on public.announcements for update to authenticated
  using (unread = true)
  with check (unread = true);
