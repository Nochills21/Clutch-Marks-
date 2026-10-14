select count(*) as new_linked_null_stmt from questions q where q.created_at > now()-interval '10 minutes' and q.statement_id is null and q.difficulty='exam';
