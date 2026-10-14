select coalesce(json_agg(q order by q.id), '[]'::json) as backup
from public.questions q
where q.question_text ~* '^\s*(from the|which)' and q.question_text ~* '\mnotes\M';
