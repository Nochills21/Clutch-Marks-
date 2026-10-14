select id::text as id, title, year::text as yr, session, paper_number, (paper_url is not null)::text as has_qp, (mark_scheme_url is not null)::text as has_ms
from public.past_papers where paper_number ilike '%WMA11%' or title ilike '%WMA11%' and year = 2025;
