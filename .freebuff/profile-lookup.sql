-- Parents need to look up a student by username to link (returns user_id + name only).
drop policy if exists "Parents can view linked and findable students" on public.profiles;
create policy "Parents can view linked and findable students"
  on public.profiles for select
  using (
    exists (
      select 1 from public.user_roles ur
      where ur.user_id = auth.uid() and ur.role = 'parent'
    )
  );
