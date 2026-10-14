-- Remove the throwaway student created for preview verification, and confirm the
-- profile / role / prefs rows cascade with it.
do $$
declare
  uid uuid;
  n_profiles int;
  n_roles int;
  n_prefs int;
  n_sessions int;
begin
  select id into uid from auth.users where email = 'plan.student.muybd8z8@igcse-platform.local';
  if uid is null then raise exception 'TEMP student not found (already removed?)'; end if;

  delete from auth.users where id = uid;

  select count(*) into n_profiles from public.profiles where user_id = uid;
  select count(*) into n_roles from public.user_roles where user_id = uid;
  select count(*) into n_prefs from public.student_prefs where user_id = uid;
  select count(*) into n_sessions from public.study_sessions where user_id = uid;

  raise exception 'DELETED uid=% leftovers profiles=% roles=% prefs=% sessions=%',
    uid, n_profiles, n_roles, n_prefs, n_sessions;
end $$;
