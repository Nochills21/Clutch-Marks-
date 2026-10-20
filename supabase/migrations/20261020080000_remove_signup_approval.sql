-- Signup-approval removal (2026-10-20).
--
-- Accounts are auto-approved at signup: handle_new_user already inserts
-- user_roles.is_approved = true, and the client and edge-function gates that
-- consumed the flag for *account* access are removed in the same change
-- (ApprovalGate wall, AppLayout pending card, AdminUsers approve/reject flow,
-- and the 403 "Account not yet approved" branches in ai-correction,
-- quiz-feedback, study-planner, serve-material, serve-external-paper).
--
-- user_roles.is_approved itself stays: its remaining uses are deliberate plan
-- and privilege checks, not account gates — has_active_plan's approved-admin
-- exemption, the approved-admin RLS reads, and the admin-only gates in
-- manage-accounts / promote-admin / resolve-login-email.
--
-- Five RLS policies called the account-approval predicate is_user_approved():
-- they are recreated below with the predicate removed. Because every row is
-- already is_approved = true, this is behaviour-preserving for every existing
-- user — it removes the gate, it does not move anyone through it.
--
-- Policy names change with them: a policy called "Approved users ..." would
-- lie about what it checks. Nothing references policy names.

drop policy if exists "Approved users can view announcements" on public.announcements;
create policy "Authenticated can view announcements" on public.announcements
  for select to authenticated using (true);

drop policy if exists "Approved users read quiz files" on storage.objects;
create policy "Authenticated read quiz files" on storage.objects
  for select to authenticated using (bucket_id = 'quiz-files');

drop policy if exists "Approved users read study materials" on storage.objects;
create policy "Authenticated read study materials" on storage.objects
  for select to authenticated using (bucket_id = 'study-materials');

drop policy if exists "Approved users manage own question bookmarks" on public.question_bookmarks;
create policy "Users manage own question bookmarks" on public.question_bookmarks
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "Authenticated can view text materials" on public.study_materials;
create policy "Authenticated can view study materials" on public.study_materials
  for select to authenticated using (true);

-- The predicate itself: no live object calls it once the policies above are
-- replaced. Dropped last so the dependency error surfaces before the function
-- disappears, never after.
drop function if exists public.is_user_approved(uuid);
