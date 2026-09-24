-- ============================================================
-- Launch readiness: auto-approve students, parent-child links,
-- payments (plans/subscriptions), with RLS throughout.
-- ============================================================

-- 1) Students are approved instantly on signup (admins still gate roles).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $fn$
DECLARE
  candidate text;
BEGIN
  candidate := COALESCE(
    NULLIF(NEW.raw_user_meta_data->>'username', ''),
    split_part(COALESCE(NEW.email, ''), '@', 1)
  );
  candidate := regexp_replace(candidate, '[^A-Za-z0-9._-]', '', 'g');
  IF candidate IS NULL OR length(candidate) < 2 THEN
    candidate := 'user-' || left(NEW.id::text, 8);
  END IF;

  WHILE EXISTS (SELECT 1 FROM public.profiles WHERE username = candidate) LOOP
    candidate := left(candidate, 56) || '-' || left(NEW.id::text, 4);
  END LOOP;

  INSERT INTO public.profiles (user_id, full_name, username, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    candidate,
    NEW.email
  );

  -- SECURITY: Never trust client-sent role. Everyone starts as a student on the
  -- free plan; approval is instant (no admin gate), only role elevation is admin-only.
  INSERT INTO public.user_roles (user_id, role, is_approved)
  VALUES (NEW.id, 'student', true);

  RETURN NEW;
END;
$fn$;

-- 2) Parent-child links: a parent links their account to a student by the
--    student's username (student confirms nothing; admin can unlink).
create table if not exists public.parent_children (
  parent_user_id uuid not null references auth.users(id) on delete cascade,
  child_user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (parent_user_id, child_user_id)
);
alter table public.parent_children enable row level security;

drop policy if exists "Parents read own links" on public.parent_children;
create policy "Parents read own links" on public.parent_children
  for select using (auth.uid() = parent_user_id);
drop policy if exists "Parents insert own links" on public.parent_children;
create policy "Parents insert own links" on public.parent_children
  for insert with check (auth.uid() = parent_user_id);
drop policy if exists "Parents delete own links" on public.parent_children;
create policy "Parents delete own links" on public.parent_children
  for delete using (auth.uid() = parent_user_id);

create index if not exists idx_parent_children_child on public.parent_children(child_user_id);

-- 3) Payments: three plans (monthly 20, quarterly 12/mo billed 36, annual 5/mo billed 60).
create table if not exists public.plans (
  id text primary key,                       -- 'free' | 'monthly' | 'quarterly' | 'annual'
  name text not null,
  price_monthly numeric not null,
  months int not null default 1,
  description text
);
insert into public.plans (id, name, price_monthly, months, description) values
  ('free', 'Free', 0, 1, 'O Level lessons, quizzes and notes only'),
  ('monthly', 'Monthly', 20, 1, 'Full access to every level, billed monthly'),
  ('quarterly', '3 Months', 12, 3, 'Full access, $12/month billed $36 every 3 months'),
  ('annual', 'Annual', 5, 12, 'Full access, $5/month billed $60 yearly')
on conflict (id) do nothing;

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_id text not null references public.plans(id),
  status text not null default 'pending_payment' check (status in ('pending_payment','active','expired','cancelled')),
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.subscriptions enable row level security;

drop policy if exists "Users read own subscription" on public.subscriptions;
create policy "Users read own subscription" on public.subscriptions
  for select using (auth.uid() = user_id);
drop policy if exists "Users create own subscription request" on public.subscriptions;
create policy "Users create own subscription request" on public.subscriptions
  for insert with check (auth.uid() = user_id and status = 'pending_payment');
-- updates and inserts of active subscriptions go through service-role/admin flows only.

create index if not exists idx_subscriptions_user on public.subscriptions(user_id);
create index if not exists idx_subscriptions_status on public.subscriptions(status);

-- 4) Helper: is a user's subscription currently active (or free tier)?
create or replace function public.has_active_subscription(p_user_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $fn$
  select exists (
    select 1 from public.subscriptions
    where user_id = p_user_id
      and status = 'active'
      and coalesce(ends_at, 'infinity') > now()
  );
$fn$;
