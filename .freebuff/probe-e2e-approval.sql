select p.email, p.is_approved, ur.role, ur.is_approved as role_approved
from public.profiles p
left join public.user_roles ur on ur.user_id = p.id
where p.email like '%igcse-platform.local';
