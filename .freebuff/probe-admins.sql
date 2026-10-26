select p.email, p.username, p.full_name, ur.role, ur.is_approved, ur.id as role_row
from user_roles ur
left join profiles p on p.user_id = ur.user_id
where ur.role = 'admin'
order by p.email;
