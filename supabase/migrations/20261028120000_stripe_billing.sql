-- Stripe replaces the manual bank-transfer / UrPay flow, with a 3-day free trial.
--
-- Three things change here, and they have to move together:
--
--   1. `subscriptions` grows the Stripe identifiers the webhook writes.
--   2. 'trialing' joins the status vocabulary and every "is this user paid?"
--      predicate, because a student inside the trial is inside the product.
--   3. The browser loses its write path. Until now a student could insert their
--      own `pending_payment` row and upload a receipt; with Stripe there is no
--      manual verification step left, and a client-writable subscriptions table
--      is a self-grant waiting to happen. From here the only writer is the
--      `stripe-webhook` function, running as service_role.
--
-- `plans.stripe_price_id` is the Stripe Price billed for each plan. The checkout
-- function compares that Price's amount and interval against `price_total` and
-- `months` before charging, so the two cannot silently disagree — change a price
-- and its Stripe Price must be recreated in the same change.
--
-- No BEGIN/COMMIT: .freebuff/apply-sql-file.cjs wraps the file in
-- BEGIN … ROLLBACK for the dry run, and an inner COMMIT would make it permanent.
-- Every statement is idempotent.

-- ---- 1. Stripe identifiers -------------------------------------------------

alter table public.plans
  add column if not exists stripe_price_id text;

comment on column public.plans.stripe_price_id is
  'Stripe Price billed for this plan (live mode). create-checkout-session refuses to charge when its amount, interval or interval_count disagrees with price_total/months.';

alter table public.subscriptions
  add column if not exists stripe_customer_id text,
  add column if not exists stripe_subscription_id text,
  add column if not exists stripe_status text,
  add column if not exists trial_ends_at timestamptz,
  add column if not exists cancel_at_period_end boolean not null default false;

comment on column public.subscriptions.stripe_status is
  'Raw Stripe subscription status (trialing, active, past_due, canceled, …). `status` is the app vocabulary derived from it.';
comment on column public.subscriptions.trial_ends_at is
  'End of the 3-day free trial, as Stripe reports it. Set for trialing and for converted subscriptions.';

-- The webhook looks a subscription up by its Stripe id on every event. Unique so
-- a duplicate insert (two events racing) is refused by the database rather than
-- by timing.
create unique index if not exists subscriptions_stripe_subscription_idx
  on public.subscriptions (stripe_subscription_id)
  where stripe_subscription_id is not null;

create index if not exists subscriptions_stripe_customer_idx
  on public.subscriptions (stripe_customer_id)
  where stripe_customer_id is not null;

-- ---- 2. Status vocabulary --------------------------------------------------

alter table public.subscriptions drop constraint if exists subscriptions_status_check;
alter table public.subscriptions
  add constraint subscriptions_status_check
  check (status = any (array[
    'pending_payment'::text,
    'active'::text,
    'trialing'::text,
    'past_due'::text,
    'expired'::text,
    'cancelled'::text
  ]));

-- The one predicate the app's paid gates are built on. `has_active_plan` is the
-- version with the admin exemption; `has_active_subscription` is the plain one.
-- Keep the two in step: ai-correction's insert policy inlines the same rule.
create or replace function public.has_active_plan(_user_id uuid)
returns boolean
language sql
stable security definer
set search_path to 'public'
as $function$
  select
    -- Admins own the content and must be able to exercise the marker they ship.
    exists (
      select 1 from public.user_roles
       where user_id = _user_id
         and role = 'admin'
         and is_approved = true
    )
    or exists (
      select 1 from public.subscriptions
       where user_id = _user_id
         -- 'trialing' grants the same access as 'active': the trial is the
         -- product, not a preview of it.
         and status in ('active', 'trialing')
         and (ends_at is null or ends_at > now())
    );
$function$;

create or replace function public.has_active_subscription(p_user_id uuid)
returns boolean
language sql
stable security definer
set search_path to 'public'
as $function$
  select exists (
    select 1 from public.subscriptions
    where user_id = p_user_id
      and status in ('active', 'trialing')
      and coalesce(ends_at, 'infinity') > now()
  );
$function$;

-- ai-correction's insert policy is the only RLS expression that inlines the plan
-- check instead of calling has_active_plan(). Recreated with the same shape plus
-- 'trialing'; everything else in the estate reads the function above.
drop policy if exists "Students can insert own AI corrections" on public.ai_correction;
create policy "Students can insert own AI corrections"
  on public.ai_correction
  for insert
  to authenticated
  with check (
    user_id = auth.uid()
    and (
      exists (
        select 1 from public.user_roles
        where user_roles.user_id = auth.uid()
          and user_roles.role = 'admin'::app_role
          and user_roles.is_approved = true
          and public.is_aal2()
      )
      or exists (
        select 1 from public.subscriptions
        where subscriptions.user_id = auth.uid()
          and subscriptions.status in ('active', 'trialing')
          and (subscriptions.ends_at is null or subscriptions.ends_at > now())
      )
    )
  );

-- ---- 3. Close the browser write path --------------------------------------
--
-- `Users create own subscription request` and `Users update own pending
-- subscription` existed so a student could file a bank/UrPay receipt. Nothing
-- honours that flow any more, and leaving it open would let the client write a
-- row the webhook never reconciles. Reads stay open to the row's owner.
drop policy if exists "Users create own subscription request" on public.subscriptions;
drop policy if exists "Users update own pending subscription" on public.subscriptions;

-- ---- 4. Stripe Price per plan (live mode) ---------------------------------
--
-- The prices were created in the live Stripe account on 2026-10-28: one product
-- per plan, each with its default recurring Price at the amount `plans` holds.
-- recreation: create the Price, then update this column — never edit the money
-- here without doing both.

update public.plans set stripe_price_id = 'price_1UVUmDQ3xk2ovSDM0vaSML20' where id = 'monthly';
update public.plans set stripe_price_id = 'price_1UVUmDQ3xk2ovSDMiGo3YCK9' where id = 'quarterly';
update public.plans set stripe_price_id = 'price_1UVUmDQ3xk2ovSDM80b8taAE' where id = 'annual';

do $$
declare
  missing text;
begin
  select string_agg(id, ', ' order by id)
    into missing
    from public.plans
   where price_total > 0
     and stripe_price_id is null;

  if missing is not null then
    raise exception 'paid plans without a Stripe Price: %', missing;
  end if;
end
$$;
