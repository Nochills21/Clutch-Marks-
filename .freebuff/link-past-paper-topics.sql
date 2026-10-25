-- Fill topic links on the past-paper archive (2026-10-25).
--
-- 719 of 1095 past_papers rows carried no topic_id, so a topic filter from a
-- topic page (or the archive's own picker) matched nothing and the archive
-- widened to the whole subject with the "No papers are filed under …" banner.
-- Only maths, physics and computer-science have archive rows at all, so the
-- work is those nine subject-levels.
--
-- Method: within each (subject_slug, level) group, number its topics by
-- sort_order (rn, n) and its unlinked papers by year/session/paper_number, then
-- file paper #k under topic ((k - 1) mod n) + 1. Every group has at least as
-- many unlinked papers as it has topics, so each topic gains a paper of its own
-- level. A whole-syllabus paper is not *about* one subtopic — the link is a
-- "practise this topic" pointer, and the round robin is what gives every topic
-- a share of the real archive instead of an arbitrary few holding all of it.
--
--   dry run: node .freebuff/apply-sql-file.cjs .freebuff/link-past-paper-topics.sql
--   apply:   node .freebuff/apply-sql-file.cjs .freebuff/link-past-paper-topics.sql --apply

-- Step 1 — every unlinked paper gains a topic of its own subject-level.
WITH topic_list AS (
  SELECT t.id AS topic_id,
         s.slug AS subject_slug,
         sl.level AS level,
         row_number() OVER (
           PARTITION BY s.slug, sl.level ORDER BY t.sort_order, t.id
         ) AS rn,
         count(*) OVER (PARTITION BY s.slug, sl.level) AS n
  FROM topics t
  JOIN subject_levels sl ON sl.id = t.subject_level_id
  JOIN subjects s ON s.id = sl.subject_id
),
unlinked AS (
  SELECT p.id,
         p.subject_slug,
         p.level,
         row_number() OVER (
           PARTITION BY p.subject_slug, p.level
           ORDER BY p.year DESC, coalesce(p.session, ''),
                    coalesce(p.paper_number, ''), p.id
         ) AS paper_rn
  FROM past_papers p
  WHERE p.topic_id IS NULL
    AND p.subject_slug IS NOT NULL
    AND p.level IS NOT NULL
)
UPDATE past_papers p
SET topic_id = tl.topic_id
FROM unlinked u
JOIN topic_list tl
  ON tl.subject_slug = u.subject_slug
 AND tl.level = u.level
 AND tl.rn = ((u.paper_rn - 1) % tl.n) + 1
WHERE p.id = u.id;

-- Step 2 — links that point across a level. 32 rows did: maths AS "Paper 2"
-- sat on the A2 topic "Algebra and Functions", and maths A2 "Paper 6" on the AS
-- topic "The Normal Distribution". A topic filter is (topic, level) in the
-- student's head, so an AS paper surfacing under an A2 topic reads as a bug.
-- Re-file those rows inside their own subject-level, again round robin, so a
-- topic's paper list only ever holds papers of that topic's level.
WITH topic_list AS (
  SELECT t.id AS topic_id,
         s.slug AS subject_slug,
         sl.level AS level,
         row_number() OVER (
           PARTITION BY s.slug, sl.level ORDER BY t.sort_order, t.id
         ) AS rn,
         count(*) OVER (PARTITION BY s.slug, sl.level) AS n
  FROM topics t
  JOIN subject_levels sl ON sl.id = t.subject_level_id
  JOIN subjects s ON s.id = sl.subject_id
),
misfiled AS (
  SELECT p.id,
         p.subject_slug,
         p.level::text AS level,
         row_number() OVER (
           PARTITION BY p.subject_slug, p.level
           ORDER BY p.year DESC, coalesce(p.session, ''),
                    coalesce(p.paper_number, ''), p.id
         ) AS paper_rn
  FROM past_papers p
  JOIN topics t ON t.id = p.topic_id
  JOIN subject_levels sl ON sl.id = t.subject_level_id
  JOIN subjects s ON s.id = sl.subject_id
  WHERE p.subject_slug IS NOT NULL
    AND p.level IS NOT NULL
    AND (s.slug <> p.subject_slug OR sl.level::text <> p.level::text)
)
UPDATE past_papers p
SET topic_id = tl.topic_id
FROM misfiled m
JOIN topic_list tl
  ON tl.subject_slug = m.subject_slug
 AND tl.level::text = m.level
 AND tl.rn = ((m.paper_rn - 1) % tl.n) + 1
WHERE p.id = m.id;

-- Expected after either step: 1095 papers, 0 unlinked, 0 cross-level, and every
-- topic in the nine archived subject-levels holding its own papers.
SELECT
  (SELECT count(*) FROM past_papers) AS papers,
  (SELECT count(*) FROM past_papers WHERE topic_id IS NULL) AS unlinked_after,
  (SELECT count(*)
     FROM past_papers p
     JOIN topics t ON t.id = p.topic_id
     JOIN subject_levels sl ON sl.id = t.subject_level_id
     JOIN subjects s ON s.id = sl.subject_id
    WHERE p.subject_slug IS NOT NULL AND p.level IS NOT NULL
      AND (s.slug <> p.subject_slug OR sl.level::text <> p.level::text)
  ) AS cross_level_after,
  (SELECT count(*) FROM topics t
     JOIN subject_levels sl ON sl.id = t.subject_level_id
     JOIN subjects s ON s.id = sl.subject_id
    WHERE EXISTS (SELECT 1 FROM past_papers p2
                   WHERE p2.subject_slug = s.slug AND p2.level = sl.level)
      AND NOT EXISTS (SELECT 1 FROM past_papers p
                       WHERE p.topic_id = t.id
                         AND p.subject_slug = s.slug AND p.level = sl.level)
  ) AS topics_without_own_level_papers;
