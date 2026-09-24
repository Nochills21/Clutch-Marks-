-- Admins manage subscriptions (activate/reject) via the client as admins.
create policy "Admins manage subscriptions"
  on public.subscriptions for update
  using (
    exists (select 1 from public.user_roles ur where ur.user_id = auth.uid() and ur.role = 'admin')
  );
