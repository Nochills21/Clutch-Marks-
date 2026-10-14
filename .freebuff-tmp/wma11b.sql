select 'paper' as kind, id::text as id, title, year::text as yr, session, paper_number, (paper_url is not null)::text as has_qp, (mark_scheme_url is not null)::text as has_ms, source_url
from public.past_papers where title ilike '%WMA11%' or paper_number ilike '%WMA11%';
