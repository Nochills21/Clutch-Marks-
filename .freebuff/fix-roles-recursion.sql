-- Replace the parent role-check policy with a SECURITY DEFINER helper that
-- avoids the recursive policy lookup on user_roles.
create or replace function public.i_am_parent()
returns boolean
language sql
security definer
set search_path = public
stable
as $fn$
  select exists (
    select 1 from public.user_roles
    where user_id = auth.uid() and role = 'parent'
  );
$fn$;

drop policy if exists "Parents can verify student roles" on public.user_roles;
create policy "Parents can verify student roles"
  on public.user_roles for select
  using (public.i_am_parent() and role = 'student');

drop policy if exists "Parents can view linked and findable students" on public.profiles;
create policy "Parents can view linked and findable students"
  on public.profiles for select
  using (public.i_am_parent());
