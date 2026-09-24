-- RLS "Users read own subscription" used auth.uid() = user_id — correct. But the
-- admin needs to read ALL rows. Add admin SELECT policy.
drop policy if exists "Admins read all subscriptions" on public.subscriptions;
create policy "Admins read all subscriptions"
  on public.subscriptions for select
  using (
    exists (select 1 from public.user_roles ur where ur.user_id = auth.uid() and ur.role = 'admin')
  );
