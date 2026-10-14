select count(*) as flagged_new from questions q where q.difficulty='exam' and q.statement_id is not null and q.question_text ilike '%appears in%';
