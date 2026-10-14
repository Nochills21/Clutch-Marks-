select o.code, r.stage, r.reviews, r.lapses, r.last_correct, r.due_at,
       round(extract(epoch from (r.due_at - now()))/86400, 1) as due_in_days
from public.objective_reviews r
join public.learning_objectives o on o.id = r.objective_id
join auth.users u on u.id = r.user_id
where u.email = 'e2e-student@igcse-platform.local'
order by o.sort_order;
