-- The site owner is the only admin, and no browser session may create, promote,
-- demote or delete an admin row. Before this there were three ways in, all
-- gated on "is an approved admin" — which is exactly the session an attacker
-- would already have hijacked if they wanted a second admin:
--
--   * the console's "Make Admin" button (a direct PostgREST update, permitted by
--     the ALL policy "Admins can manage all roles");
--   * the `promote-admin` edge function (deleted in the same change);
--   * `manage-accounts` with `action: "create", role: "admin"`.
--
-- The trigger below is the layer that survives all of them. Note it keys off
-- `auth.uid()`, not `current_user`: this function is SECURITY DEFINER, so
-- `current_user` is always its owner (postgres) and the old check was a no-op —
-- the real gate was RLS alone. `auth.uid()` reads the request's JWT claims and
-- is null for the service role, for SQL, and for the SECURITY DEFINER auth
-- trigger (which is how signup still inserts its `student` row).
create or replace function public.enforce_user_roles_writer()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  -- No end-user JWT: service-role edge functions, SQL, and auth triggers.
  if auth.uid() is null then
    return coalesce(new, old);
  end if;

  -- A real signed-in session. Admin rows are off limits to every one of them,
  -- the owner included: admins are provisioned by SQL only.
  if (tg_op = 'DELETE' and old.role = 'admin')
     or (tg_op = 'UPDATE' and old.role = 'admin')
     or (tg_op <> 'DELETE' and new.role = 'admin') then
    raise exception 'admin role rows can only be changed by the site owner'
      using errcode = '42501';
  end if;

  if exists (
    select 1 from public.user_roles r
    where r.user_id = auth.uid() and r.role = 'admin' and r.is_approved = true
  ) then
    return coalesce(new, old);
  end if;
  raise exception 'Only approved admins can modify user roles'
    using errcode = '42501';
end;
$function$;

-- RLS follows the same rule: admins still READ every role row (the console's
-- Admins tab lists them), but no browser session can write `user_roles` at all.
-- Every mutation is an edge function (service role) or SQL.
drop policy if exists "Admins can manage all roles" on public.user_roles;
drop policy if exists "Admins can read all roles" on public.user_roles;
create policy "Admins can read all roles"
  on public.user_roles for select to public
  using (has_role(auth.uid(), 'admin'::app_role));

-- `has_active_subscription(uid)` answers for *any* uid and is called by neither
-- the app nor a policy (policies inline `has_active_plan`), so it was a free way
-- for an anonymous caller to probe whether an account pays. Same treatment
-- `has_active_plan` already got: service role only.
revoke execute on function public.has_active_subscription(uuid) from public;
revoke execute on function public.has_active_subscription(uuid) from anon;
revoke execute on function public.has_active_subscription(uuid) from authenticated;
grant execute on function public.has_active_subscription(uuid) to service_role;
