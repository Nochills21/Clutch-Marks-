-- Remove Core-tier past papers, keeping Extended only.
--
-- Owner decision: the archive serves Extended candidates, so IGCSE Maths
-- 0580 Papers 1 & 3 (Core) and IGCSE Physics 0625 Papers 1 (Multiple Choice
-- Core) & 3 (Theory Core) go — 93 rows. Practical / Alternative-to-Practical
-- papers stay, and every other subject/level is untouched (their "Paper 1"
-- rows are NOT Core: CS 0478, AS/A2 9709/9702/9618, Edexcel IAL).
--
-- Safety, verified before applying:
--   * past_paper_attempts is empty (no student sittings orphaned);
--   * no content_file_versions rows reference these papers;
--   * paper files live in the past-papers bucket — deleting a row does not
--     delete its blobs, so .freebuff/prune-orphan-paper-files.cjs --apply
--     runs after this to reclaim them (SQL-deleting storage.objects would
--     leak the objects).

with core as (
  select pp.id
  from public.past_papers pp
  left join public.topics t on t.id = pp.topic_id
  left join public.subject_levels sl on sl.id = t.subject_level_id
  left join public.subjects s on s.id = sl.subject_id
  where pp.paper_number in ('Paper 1 (12)', 'Paper 3 (32)')
    and (pp.title ilike '%0580%' or pp.title ilike '%0625%' or pp.title ilike '%core%')
    and (
      ((s.slug in ('mathematics', 'physics')) and sl.level = 'OL')
      or ((pp.subject_slug in ('mathematics', 'physics')) and pp.level = 'OL')
    )
)
delete from public.past_papers p using core where p.id = core.id;
