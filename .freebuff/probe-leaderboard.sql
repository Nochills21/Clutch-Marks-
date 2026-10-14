-- Probe: does the security_invoker leaderboard view actually return rows for a
-- plain authenticated (non-admin) student? raise exception carries the count
-- back through the Management API response.
do $$
declare
  n_view int;
  n_profiles int;
  n_xp int;
  uid uuid;
begin
  select p.user_id into uid from public.profiles p join public.user_roles r on r.user_id=p.user_id
    where r.role='student' order by p.created_at limit 1;
  perform set_config('role', 'authenticated', true);
  perform set_config('request.jwt.claims', json_build_object('sub', uid::text, 'role', 'authenticated')::text, true);
  select count(*) into n_view from public.leaderboard_public;
  select count(*) into n_profiles from public.profiles;
  select count(*) into n_xp from public.xp_events;
  perform set_config('role', 'postgres', true);
  raise exception 'PROBE uid=% leaderboard_rows=% profiles_visible=% xp_visible=%', uid, n_view, n_profiles, n_xp;
end $$;
