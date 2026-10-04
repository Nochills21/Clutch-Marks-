-- Flashcards were a shipped feature with zero content: `flashcard_sets` and
-- `flashcards` were both empty, so /flashcards (and the per-topic deck tabs)
-- rendered nothing at all.
--
-- This seeds a scaffold from text that already exists in the database — each
-- topic's own description and the opening of each of its lessons. Nothing is
-- invented: every card back is a verbatim excerpt of content written for this
-- site. Decks are marked as auto-generated so an admin can find, edit or delete
-- them, and to delete all of them in one statement:
--   delete from public.flashcard_sets
--    where description like 'Auto-generated recap%';
--
-- Idempotent: each step is guarded, so re-running adds nothing.

-- 1) One deck per topic that does not already have one. A topic stays untouched
--    if it already has a curated deck.
insert into public.flashcard_sets (topic_id, title, description)
select
  t.id,
  t.name,
  'Auto-generated recap from this topic''s description and lesson text — edit or replace with a curated deck.'
from public.topics t
where not exists (
  select 1 from public.flashcard_sets s where s.topic_id = t.id
);

-- 2) A "what does this cover" card per deck (sort_order 0).
insert into public.flashcards (set_id, front, back, sort_order)
select
  s.id,
  'What does "' || t.name || '" cover?',
  coalesce(
    nullif(btrim(t.description), ''),
    'Open the topic notes to review what this topic covers.'
  ),
  0
from public.flashcard_sets s
join public.topics t on t.id = s.topic_id
where s.topic_id is not null
  and not exists (
    select 1 from public.flashcards f where f.set_id = s.id and f.sort_order = 0
  );

-- 3) One recall card per lesson, quoting the start of that lesson's text.
--    Lesson content is HTML, so tags are stripped and whitespace collapsed;
--    the excerpt is truncated so a card stays readable on a phone.
insert into public.flashcards (set_id, front, back, sort_order)
select
  s.id,
  l.title,
  left(
    btrim(
      regexp_replace(
        regexp_replace(coalesce(l.content, ''), '<[^>]*>', ' ', 'g'),
        '\s+', ' ', 'g'
      )
    ),
    300
  ),
  row_number() over (partition by s.id order by l.sort_order nulls last, l.title)
from public.flashcard_sets s
join public.lessons l on l.topic_id = s.topic_id
where btrim(regexp_replace(coalesce(l.content, ''), '<[^>]*>', ' ', 'g')) <> ''
  and not exists (
    select 1 from public.flashcards f where f.set_id = s.id and f.sort_order > 0
  );
