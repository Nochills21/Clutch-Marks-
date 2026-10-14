select u.email, ur.role, ur.is_approved, u.id
from auth.users u
left join public.user_roles ur on ur.user_id = u.id
where u.email like '%igcse-platform.local'
order by u.email, ur.role;
