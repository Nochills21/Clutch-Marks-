select (select user_id::text from public.user_roles where role='student' and is_approved=true limit 1) as approved_uid,
       (select count(*) from public.user_roles where is_approved=true) as approved_rows,
       (select count(*) from public.user_roles where is_approved=false) as unapproved_rows,
       (select count(*) from public.user_roles) as all_rows;
