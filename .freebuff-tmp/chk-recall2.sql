select count(*) as flagged_new from questions q where q.difficulty='exam' and q.statement_id is not null and q.question_text ~* '^\s*(from the|which)' and q.question_text ~* '\mnotes\M';
