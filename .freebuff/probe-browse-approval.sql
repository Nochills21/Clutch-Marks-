-- approved student
begin;
select set_config('request.jwt.claims',
  json_build_object('sub', (select user_id::text from public.user_roles where role='student' and is_approved=true limit 1), 'role','authenticated')::text, true);
set local role authenticated;
select 'approved student' as who,
       (select count(*) from public.browse_questions(_subject_level_id => 'b8100a48-b4f7-414b-a796-528259b28a84'::uuid)) as rows;
rollback;
-- unapproved / pending student
begin;
select set_config('request.jwt.claims',
  json_build_object('sub', (select user_id::text from public.user_roles where is_approved=false limit 1), 'role','authenticated')::text, true);
set local role authenticated;
select 'unapproved student' as who,
       (select count(*) from public.browse_questions(_subject_level_id => 'b8100a48-b4f7-414b-a796-528259b28a84'::uuid)) as rows;
rollback;
