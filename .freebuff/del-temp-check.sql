select
  (select count(*) from auth.users where email = 'plan.student.muybd8z8@igcse-platform.local') as users_left,
  (select count(*) from public.profiles p where p.email = 'plan.student.muybd8z8@igcse-platform.local') as profiles_left;
