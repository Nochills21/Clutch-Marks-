select id, title, subject_slug, level, paper_number, year, session, paper_url is not null as has_qp, mark_scheme_url is not null as has_ms, source_url, topic_id is not null as topic_linked
from public.past_papers
where subject_slug ilike '%math%' and level::text in ('AS','A2','as','a2','AS_LEVEL','A2_LEVEL') or title ilike '%WMA%' or title ilike '%9709%'
order by year desc, session;
