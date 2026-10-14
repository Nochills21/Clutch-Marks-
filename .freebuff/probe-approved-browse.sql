begin;
select set_config('request.jwt.claims', '{"sub":"0b6d4621-23ad-4393-a1af-05a58c960f1f","role":"authenticated"}', true);
set local role authenticated;
select count(*) as approved_student_rows
from public.browse_questions(_subject_level_id => 'b8100a48-b4f7-414b-a796-528259b28a84'::uuid);
rollback;
