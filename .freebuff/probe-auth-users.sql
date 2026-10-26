select (select count(*) from auth.users) as auth_users,
       (select count(*) from profiles) as profiles,
       (select count(*) from profiles where lower(email) like '%@igcse-platform.local') as test_accounts;
