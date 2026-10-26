-- Read-only health audit of the five student-facing content surfaces:
-- flashcards, notes (study_materials), past papers, questions and quizzes.
--
-- One statement rather than five: the Management API returns only the LAST
-- result set of a multi-statement request, which silently hid the first four
-- audits (the flashcard and notes counts never came back).
with
flash_sets as (select id, topic_id from public.flashcard_sets),
flash_cards as (select id, set_id, front, back from public.flashcards),
flash_dupes as (
  select set_id, count(*) - 1 as dupes
  from flash_cards
  group by set_id, lower(btrim(front))
  having count(*) > 1
),
note_dupes as (
  select count(*) - 1 as dupes
  from public.study_materials
  group by topic_id, material_type
  having count(*) > 1
),
paper_dupes as (
  select count(*) - 1 as dupes
  from public.past_papers
  group by title, year, session, paper_number
  having count(*) > 1
),
question_dupes as (
  select count(*) - 1 as dupes
  from public.questions q
  join public.quizzes z on z.id = q.quiz_id
  group by z.topic_id, lower(btrim(q.question_text))
  having count(*) > 1
)
select 'flashcards.sets' as probe, count(*)::int as n from flash_sets
union all
select 'flashcards.cards', count(*)::int from flash_cards
union all
select 'flashcards.sets_without_cards',
  count(*)::int
from flash_sets s
where not exists (select 1 from flash_cards c where c.set_id = s.id)
union all
select 'flashcards.empty_side',
  count(*)::int
from flash_cards
where coalesce(btrim(front), '') = '' or coalesce(btrim(back), '') = ''
union all
select 'flashcards.identical_sides',
  count(*)::int
from flash_cards
where lower(btrim(front)) = lower(btrim(back))
union all
select 'flashcards.duplicate_front_in_set',
  coalesce(sum(dupes), 0)::int
from flash_dupes
union all
select 'flashcards.sets_without_topic',
  count(*)::int
from flash_sets
where topic_id is null
union all
select 'flashcards.cards_without_set',
  count(*)::int
from public.flashcards f
where not exists (select 1 from public.flashcard_sets s where s.id = f.set_id)
union all
select 'notes.materials', count(*)::int from public.study_materials
union all
select 'notes.typed_as_note_singular',
  count(*)::int
from public.study_materials
where material_type = 'note'
union all
select 'notes.under_1000_chars',
  count(*)::int
from public.study_materials
where material_type = 'notes' and length(btrim(coalesce(content, ''))) < 1000
union all
select 'notes.no_h2',
  count(*)::int
from public.study_materials
where material_type in ('notes', 'summary') and coalesce(content, '') not like '%<h2%'
union all
select 'notes.duplicate_type_per_topic',
  coalesce(sum(dupes), 0)::int
from note_dupes
union all
select 'notes.topics_with_no_notes',
  count(*)::int
from public.topics t
where not exists (
  select 1 from public.study_materials m where m.topic_id = t.id and m.material_type = 'notes'
)
union all
select 'notes.materials_without_topic',
  count(*)::int
from public.study_materials
where topic_id is null
union all
select 'papers.rows', count(*)::int from public.past_papers
union all
select 'papers.no_link_at_all',
  count(*)::int
from public.past_papers
where coalesce(btrim(paper_url), '') = ''
  and coalesce(btrim(source_url), '') = ''
union all
select 'papers.without_topic',
  count(*)::int
from public.past_papers
where topic_id is null
union all
select 'papers.duplicate_identity',
  coalesce(sum(dupes), 0)::int
from paper_dupes
union all
select 'papers.without_year',
  count(*)::int
from public.past_papers
where year is null
union all
select 'questions.rows', count(*)::int from public.questions
union all
select 'questions.blank_text',
  count(*)::int
from public.questions
where coalesce(btrim(question_text), '') = ''
union all
select 'questions.no_explanation',
  count(*)::int
from public.questions
where coalesce(btrim(explanation), '') = ''
union all
select 'questions.unattached_to_quiz',
  count(*)::int
from public.questions
where quiz_id is null
union all
select 'questions.duplicate_text_in_topic',
  coalesce(sum(dupes), 0)::int
from question_dupes
union all
select 'questions.topics_without_bank',
  count(*)::int
from public.topics t
where not exists (
  select 1 from public.questions q join public.quizzes z on z.id = q.quiz_id
  where z.topic_id = t.id
)
union all
select 'questions.no_difficulty_tier',
  count(*)::int
from public.questions
where coalesce(btrim(difficulty), '') = ''
union all
select 'quizzes.rows', count(*)::int from public.quizzes
union all
select 'quizzes.published_without_questions',
  count(*)::int
from public.quizzes z
where z.is_published
  and not exists (select 1 from public.questions q where q.quiz_id = z.id)
union all
select 'quizzes.without_topic',
  count(*)::int
from public.quizzes
where topic_id is null
union all
select 'quizzes.topics_without_published_quiz',
  count(*)::int
from public.topics t
where not exists (
  select 1 from public.quizzes z where z.topic_id = t.id and z.is_published
)
order by probe;
