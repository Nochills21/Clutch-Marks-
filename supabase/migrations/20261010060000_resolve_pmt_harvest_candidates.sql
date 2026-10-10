-- Close out the PMT harvest candidates that were approved and never became a paper.
--
-- Background: `past-papers-harvest` records a newly-published sitting as a
-- `past_paper_link_checks` row with `slot = 'candidate'`. Approving one is
-- supposed to create the `past_papers` row and stamp `created_paper_id`, but the
-- 46 rows approved here were approved without a paper, so the admin panel kept
-- showing "N new sittings to review" for papers that never existed — and the
-- PDFs behind them were never fetched.
--
-- `.freebuff/pmt-bulk-ingest.cjs` now downloads those papers (question paper +
-- mark scheme, as PDFs in the private `past-papers` bucket) and files the rows.
-- This attaches each already-ingested paper back to the candidate that found it,
-- which is what takes it out of the review queue. Idempotent: only rows still
-- carrying no `created_paper_id` are touched, and only where a paper for that
-- code/session/year now exists.
--
-- Match key: the candidate records the exam code (`WMA11`, `WPH13`, `0478`, …)
-- and the sitting; the paper row carries the same code inside its title
-- (e.g. "Edexcel IAL Maths — Pure Mathematics P1 (WMA11/01)"). Session and year
-- must both agree, since one code runs for years.

update public.past_paper_link_checks c
   set created_paper_id = p.id,
       review_status = 'resolved',
       reviewed_at = now()
  from public.past_papers p
 where c.slot = 'candidate'
   and c.created_paper_id is null
   and c.source_code is not null
   and p.title like '%' || c.source_code || '%'
   and p.session is not distinct from c.session
   and p.year is not distinct from c.year
   and p.paper_url is not null;
