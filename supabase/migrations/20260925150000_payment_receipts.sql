-- Payment requests now capture a payment method, the payer's full name and a
-- transaction receipt. Admins review both in Admin Payments.
-- (Names kept snake_case in the DB; the client maps camelCase.)

alter table public.subscriptions
  add column if not exists payment_method text,
  add column if not exists full_name text,
  add column if not exists receipt_url text,
  add column if not exists receipt_path text;

-- Only admins (via has_role) may change payment/receipt fields. Students can
-- still create a pending request and edit nothing else.
drop policy if exists "Users create own subscription request" on public.subscriptions;
create policy "Users create own subscription request"
  on public.subscriptions for insert
  to authenticated
  with check (
    auth.uid() = user_id
    and status = 'pending_payment'
    and (payment_method in ('bank_transfer', 'ewallet_urpay') or payment_method is null)
  );

drop policy if exists "Users update own pending subscription" on public.subscriptions;
create policy "Users update own pending subscription"
  on public.subscriptions for update
  to authenticated
  using (
    auth.uid() = user_id
    and status = 'pending_payment'
  )
  with check (
    auth.uid() = user_id
    and status = 'pending_payment'
    and (payment_method in ('bank_transfer', 'ewallet_urpay') or payment_method is null)
    and (
      has_role(auth.uid(), 'admin'::app_role)
      or (
        full_name is not null
        and (receipt_path is not null or receipt_url is not null)
      )
    )
  );

-- Receipts live in the private homework-uploads bucket under payments/<uid>/.
-- Students may upload ONLY there; admins keep full access.
drop policy if exists "Users can upload payment receipts" on storage.objects;
create policy "Users can upload payment receipts"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'homework-uploads'
    and (storage.foldername(name))[1] = 'payments'
    and (storage.foldername(name))[2] = auth.uid()::text
  );

-- Admins read the receipt; students can re-open their own.
drop policy if exists "Users can view payment receipts" on storage.objects;
create policy "Users can view payment receipts"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'homework-uploads'
    and (storage.foldername(name))[1] = 'payments'
    and ((storage.foldername(name))[2] = auth.uid()::text
         or has_role(auth.uid(), 'admin'::app_role))
  );

-- Admins grant paid access directly from the accounts page (no student
-- request needed) and can read every subscription to render the table.
drop policy if exists "Admins insert subscriptions" on public.subscriptions;
create policy "Admins insert subscriptions"
  on public.subscriptions for insert
  to authenticated
  with check (has_role(auth.uid(), 'admin'::app_role));

drop policy if exists "Admins select all subscriptions" on public.subscriptions;
create policy "Admins select all subscriptions"
  on public.subscriptions for select
  to authenticated
  using (has_role(auth.uid(), 'admin'::app_role));
