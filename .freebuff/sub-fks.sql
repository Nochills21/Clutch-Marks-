-- Explicit FKs so PostgREST can embed profiles through user_id.
alter table public.subscriptions
  drop constraint if exists subscriptions_profiles_fk;
alter table public.subscriptions
  add constraint subscriptions_profiles_fk
  foreign key (user_id) references public.profiles(user_id) on delete cascade;
