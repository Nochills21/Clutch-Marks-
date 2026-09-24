-- Parents must verify a child is a student before linking (no role data leaks:
-- they can only see that a user row exists for linkage purposes).
drop policy if exists "Parents can verify student roles" on public.user_roles;
create policy "Parents can verify student roles"
  on public.user_roles for select
  using (
    exists (select 1 from public.user_roles ur where ur.user_id = auth.uid() and ur.role = 'parent')
    and exists (
      select 1 from public.user_roles ur2
      where ur2.user_id = auth.uid() and ur2.role = 'parent'
    )
    and role = 'student'
  );
