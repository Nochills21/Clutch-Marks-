-- Dedupe the past-paper archive.
--
-- Two ingestion paths write rows into `past_papers`: the original single-file
-- ingest (`papers/<uuid>.pdf`, one row per paper with a Pearson source URL) and
-- the PMT bulk ingest (`papers/pmt/<stem>-qp.pdf` + `-ms.pdf`). Both were run
-- against the same sittings, so the archive listed 50 papers twice — same
-- syllabus code, same session, same year, two rows and two sets of files. On top
-- of that the PMT ingest was run twice concurrently at one point, and because
-- both passes walked the index pages before either inserted, 42 pairs ended up
-- as rows that are *byte-identical* duplicates: the same two storage objects
-- under two ids. A student browsing the archive sees every one of those papers
-- two or three times.
--
-- Nothing here is a schema change; it is a repair, like
-- 20261009120000_repair_transformations_vector_questions. Both statements are
-- idempotent (a second run finds nothing to delete) and both refuse to touch a
-- row anything depends on:
--
--   * `past_paper_attempts.paper_id` is ON DELETE SET NULL, so removing a row a
--     student actually practised would silently blank the paper on their
--     attempt history. Such rows are never deleted.
--   * `past_paper_link_checks.paper_id` cascades, so deleting a row would take
--     its link-health history with it. Rows that have checks are preferred as
--     the survivor and never deleted on the losing side.
--
-- The loser is chosen deterministically: the row with attempts, then the row
-- with link checks, then the row that carries a topic link, then the oldest.

-- ── 1. Exact duplicates: one pair of storage objects under two rows ─────────
with ranked as (
  select p.id,
         row_number() over (
           partition by p.paper_url, p.mark_scheme_url
           order by (select count(*) from public.past_paper_attempts a where a.paper_id = p.id) desc,
                    (select count(*) from public.past_paper_link_checks c where c.paper_id = p.id) desc,
                    (p.topic_id is not null) desc,
                    p.created_at,
                    p.id
         ) as rn
    from public.past_papers p
   where p.paper_url is not null
     and p.mark_scheme_url is not null
)
delete from public.past_papers p
 using ranked r
 where p.id = r.id
   and r.rn > 1
   and not exists (select 1 from public.past_paper_attempts a where a.paper_id = p.id)
   and not exists (select 1 from public.past_paper_link_checks c where c.paper_id = p.id);

-- ── 2. A fill-less row superseded by a PMT pair for the same sitting ───────
-- The paper is identified the way the archive titles it: the syllabus or unit
-- code in parentheses (`(0580/12)`, `(9709/12)`, `(WMA11/01)`), with the session
-- and the year. A row without files of its own is only dropped when a PMT row
-- with both files exists for that same triple, and its topic link is carried
-- over first so a paper filed under a topic does not lose that filing.
--
-- "Without files of its own" covers both shapes the archive has: the original
-- single-file ingest rows (`papers/<uuid>.pdf`) and the placeholders the harvest
-- recorded for a sitting it had found but nobody had published a PDF for yet
-- (`paper_url is null`, a board page in `source_url`). Both are the same paper as
-- the PMT row that now carries the actual files, so listing them side by side is
-- a duplicate — and, without this, every future ingest run re-creates the
-- duplicate the moment PMT publishes the sitting.
with coded as (
  select p.id,
         p.topic_id,
         p.paper_url,
         p.session,
         p.year,
         coalesce(
           substring(p.title from '\(([0-9A-Z]{4}/[0-9]{2})\)'),
           substring(p.title from '\(([0-9]{4}/[0-9]{2})\)'),
           substring(p.title from '\(([A-Z]{3}[0-9]{2}/[0-9]{2})\)')
         ) as paper_code
    from public.past_papers p
),
pairs as (
  select l.id as legacy_id,
         l.topic_id as legacy_topic,
         k.id as keep_id
    from coded l
    join lateral (
      select c.id, c.topic_id
        from coded c
       where c.paper_url like 'papers/pmt/%'
         and c.paper_code = l.paper_code
         and c.session is not distinct from l.session
         and c.year is not distinct from l.year
       order by c.id
       limit 1
    ) k on true
   where l.paper_code is not null
     and (
       l.paper_url is null
       or (l.paper_url like 'papers/%' and l.paper_url not like 'papers/pmt/%')
     )
),
carried as (
  update public.past_papers p
     set topic_id = q.legacy_topic
    from pairs q
   where p.id = q.keep_id
     and p.topic_id is null
     and q.legacy_topic is not null
   returning p.id
)
delete from public.past_papers p
 using pairs q
 where p.id = q.legacy_id
   and p.id not in (select id from carried)
   and not exists (select 1 from public.past_paper_attempts a where a.paper_id = p.id);
-- A superseded row's own link checks cascade away with it. That is deliberate:
-- the checks describe the files that just left the listing, and the PMT row that
-- replaces it is checked on the next harvest pass. Keeping the old checks would
-- mean keeping the duplicate row, which is the thing being repaired.
