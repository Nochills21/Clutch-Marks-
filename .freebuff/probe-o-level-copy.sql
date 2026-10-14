-- Read-only: does any student-visible stored copy still say "O Level"?
-- Returns one row per table with the number of rows whose whole record text matches.
select 'plans'            as tbl, count(*) as hits from plans            x where to_jsonb(x)::text ~* 'o[- ]level'
union all select 'subjects',        count(*) from subjects         x where to_jsonb(x)::text ~* 'o[- ]level'
union all select 'topics',          count(*) from topics           x where to_jsonb(x)::text ~* 'o[- ]level'
union all select 'lessons',         count(*) from lessons          x where to_jsonb(x)::text ~* 'o[- ]level'
union all select 'quizzes',         count(*) from quizzes          x where to_jsonb(x)::text ~* 'o[- ]level'
union all select 'questions',       count(*) from questions        x where to_jsonb(x)::text ~* 'o[- ]level'
union all select 'study_materials', count(*) from study_materials  x where to_jsonb(x)::text ~* 'o[- ]level'
union all select 'flashcards',      count(*) from flashcards       x where to_jsonb(x)::text ~* 'o[- ]level'
union all select 'flashcard_sets',  count(*) from flashcard_sets   x where to_jsonb(x)::text ~* 'o[- ]level'
union all select 'past_papers',     count(*) from past_papers      x where to_jsonb(x)::text ~* 'o[- ]level'
union all select 'announcements',   count(*) from announcements    x where to_jsonb(x)::text ~* 'o[- ]level'
order by hits desc, tbl;
