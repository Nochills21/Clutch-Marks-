-- Five-surface cleanup, found by .freebuff/audit-five-surfaces.sql:
--
--   4 published quizzes with no questions   — opened as an empty quiz
--   4 flashcard decks with no cards          — opened as an empty deck
--   3 summaries with NULL content            — a failed write, opened blank
--  13 flashcard pairs repeating one front    — the same prompt twice in a deck
--   6 past-paper rows ingested twice         — the same paper twice in the list
--
-- Every deleted row was written to .freebuff/drafts/five-surface-cleanup.json
-- first (.freebuff/snapshot-five-surface-cleanup.cjs); nothing here removes the
-- last copy of anything. Where a duplicate pair disagreed, the richer back and
-- the earlier row are the ones kept.

-- 1. Published quizzes with no questions. The topics keep their real quiz.
delete from public.quizzes z
where z.is_published
  and not exists (select 1 from public.questions q where q.quiz_id = z.id)
returning z.id;

-- 2. Decks with no cards. Every one of these topics has a second deck with cards.
delete from public.flashcard_sets s
where not exists (select 1 from public.flashcards c where c.set_id = s.id)
returning s.id;

-- 3. Summary rows whose content is NULL (the card opened blank).
delete from public.study_materials m
where m.material_type = 'summary'
  and coalesce(btrim(coalesce(m.content, '')), '') = ''
returning m.id;

-- 4. Repeated card fronts within one deck: keep the longest back (the fuller
--    explanation), the earliest row on a tie.
with ranked as (
  select c.id,
         row_number() over (
           partition by c.set_id, lower(btrim(c.front))
           order by length(coalesce(c.back, '')) desc, c.created_at asc, c.id
         ) as rn
  from public.flashcards c
)
delete from public.flashcards c
using ranked r
where c.id = r.id
  and r.rn > 1
returning c.id;

-- 5. The same paper ingested twice: keep the earlier row (both carry files).
with ranked as (
  select p.id,
         row_number() over (
           partition by p.title, p.year, p.session, p.paper_number
           order by p.created_at asc, p.id
         ) as rn
  from public.past_papers p
)
delete from public.past_papers p
using ranked r
where p.id = r.id
  and r.rn > 1
returning p.id;
