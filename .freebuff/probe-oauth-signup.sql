-- Simulate the auth.users row Supabase creates for a Google sign-in and check
-- the trigger's output. The whole thing rolls back via the raised exception.
do $$
declare
  uid uuid := gen_random_uuid();
  p record;
  r record;
begin
  insert into auth.users (
    id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at
  ) values (
    uid,
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'zaid.google.probe@gmail.com',
    'x',
    now(),
    '{"provider":"google","providers":["google"]}'::jsonb,
    '{"iss":"https://accounts.google.com","name":"Zaid Probe","picture":"https://lh3.googleusercontent.com/a/probe=s96-c","email_verified":true,"full_name":"Zaid Probe"}'::jsonb,
    now(),
    now()
  );

  select full_name, username, email, avatar_url into p from public.profiles where user_id = uid;
  select role, is_approved into r from public.user_roles where user_id = uid;

  raise exception 'SIGNUP full_name=% username=% email=% avatar=% role=% approved=%',
    p.full_name, coalesce(p.username, '(null)'), p.email, coalesce(p.avatar_url, '(null)'), r.role, r.is_approved;
end $$;
