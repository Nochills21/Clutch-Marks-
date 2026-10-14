-- Read-only. What does the LIVE signup trigger actually store for a new account,
-- and does that match the signup page's copy ("No approval needed")?
with fn as (select prosrc from pg_proc where proname = 'handle_new_user')
select 'is_approved literal in handle_new_user' as name,
       coalesce((select (regexp_match(prosrc, 'user_roles \(user_id, role, is_approved\)\s*VALUES \(NEW\.id, ''student'', (true|false)\)'))[1]
                   from fn), 'NONE') as value
union all
select 'approval gate exists in ApprovalGate.tsx', 'see frontend/src/components/ApprovalGate.tsx'
union all
select 'approved students', (select count(*)::text from public.user_roles where role = 'student' and is_approved)
union all
select 'unapproved students', (select count(*)::text from public.user_roles where role = 'student' and not is_approved)
union all
select 'role rows', (select count(*)::text from public.user_roles)
union all
select 'recent signups (last 50) approved', (
  select count(*)::text from auth.users u
   join public.user_roles r on r.user_id = u.id
  where u.created_at > now() - interval '60 days' and r.is_approved)
union all
select 'recent signups (last 50) total', (
  select count(*)::text from auth.users u where u.created_at > now() - interval '60 days');
