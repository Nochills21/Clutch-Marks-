-- Content guards: make the two damage classes the integrity report hunts for
-- impossible to write, instead of only reportable after they are in the database.
--
-- public.content_integrity_findings() (20261008150000) reports U+FFFD in
-- student-visible text and a correct_option that cannot point at the right
-- option, and both have really happened here: the replacement characters came
-- from a broken encode/decode round trip (repaired by 20261008130000), and the
-- answer indices from the 1-based legacy seeds. A report finds damage only after
-- it has been saved — every admin form could still write it, and the console
-- said "Saved" while it did. These CHECK constraints put the rule on the table,
-- where every writer meets it: the console (PostgREST, as an admin), the seeders
-- and the edge functions (service_role) alike. No role bypasses a constraint, the
-- way service_role does bypass RLS.
--
-- Checked before adding, so that each one is VALID rather than NOT VALID (see
-- .freebuff/probe-content-guard-baseline.sql): the only column in the database
-- holding U+FFFD is admin_audit_log.details — deliberately unguarded, since it
-- records what an admin action saw at the time — and no question row has
-- non-array options, fewer than two options, or an index outside its option list.
--
-- Two consequences worth knowing:
--   * Re-importing an old dump now fails where it used to succeed. The dumps in
--     backups/ and .freebuff/content-backup taken before 20261008130000 still
--     carry the replacement characters, and a seeder whose options array lost
--     its rows still carries an out-of-range index: that is exactly the damage
--     this refuses, so it must be repaired in the dump before it can be loaded.
--   * A question with an empty options array can no longer be saved at all —
--     there is nothing for correct_option to point at, and the console's
--     "add question" form drops blank options, so filling in fewer than two used
--     to write a row the integrity report then flagged.
--
-- Idempotent: each constraint is dropped if it exists and re-added, so the file
-- can be re-applied. The final block asserts every guard exists and is validated.

-- ── 1. U+FFFD in student-visible text ────────────────────────────────────────
-- chr(65533) rather than the literal character: this is the one character most
-- likely to be mangled by a copy/paste of the migration itself.
alter table public.questions
  drop constraint if exists questions_no_replacement_character;
alter table public.questions
  add constraint questions_no_replacement_character check (
    position(chr(65533) in question_text) = 0
    and position(chr(65533) in coalesce(explanation, '')) = 0
    and position(chr(65533) in options::text) = 0
  );

alter table public.quizzes
  drop constraint if exists quizzes_no_replacement_character;
alter table public.quizzes
  add constraint quizzes_no_replacement_character check (
    position(chr(65533) in title) = 0
    and position(chr(65533) in coalesce(description, '')) = 0
  );

alter table public.topics
  drop constraint if exists topics_no_replacement_character;
alter table public.topics
  add constraint topics_no_replacement_character check (
    position(chr(65533) in name) = 0
    and position(chr(65533) in coalesce(description, '')) = 0
  );

alter table public.lessons
  drop constraint if exists lessons_no_replacement_character;
alter table public.lessons
  add constraint lessons_no_replacement_character check (
    position(chr(65533) in title) = 0
    and position(chr(65533) in coalesce(content, '')) = 0
  );

alter table public.study_materials
  drop constraint if exists study_materials_no_replacement_character;
alter table public.study_materials
  add constraint study_materials_no_replacement_character check (
    position(chr(65533) in title) = 0
    and position(chr(65533) in coalesce(content, '')) = 0
  );

alter table public.flashcards
  drop constraint if exists flashcards_no_replacement_character;
alter table public.flashcards
  add constraint flashcards_no_replacement_character check (
    position(chr(65533) in front) = 0
    and position(chr(65533) in back) = 0
  );

alter table public.flashcard_sets
  drop constraint if exists flashcard_sets_no_replacement_character;
alter table public.flashcard_sets
  add constraint flashcard_sets_no_replacement_character check (
    position(chr(65533) in title) = 0
    and position(chr(65533) in coalesce(description, '')) = 0
  );

alter table public.past_papers
  drop constraint if exists past_papers_no_replacement_character;
alter table public.past_papers
  add constraint past_papers_no_replacement_character check (
    position(chr(65533) in title) = 0
  );

alter table public.announcements
  drop constraint if exists announcements_no_replacement_character;
alter table public.announcements
  add constraint announcements_no_replacement_character check (
    position(chr(65533) in title) = 0
    and position(chr(65533) in coalesce(content, '')) = 0
  );

-- ── 2. correct_option must index a real option ───────────────────────────────
-- The CASE is not decoration: jsonb_array_length() raises on a non-array, and
-- the evaluation order of AND is not guaranteed, so the array-ness is decided
-- explicitly before the length is taken. An empty list fails too — 0 < 0 is
-- false — which is the "nothing to choose between" error class as well.
alter table public.questions
  drop constraint if exists questions_answer_index_in_range;
alter table public.questions
  add constraint questions_answer_index_in_range check (
    correct_option >= 0
    and case
          when jsonb_typeof(options) = 'array' then correct_option < jsonb_array_length(options)
          else false
        end
  );

do $$
declare
  _missing text;
begin
  select string_agg(want.name, ', ' order by want.name) into _missing
    from (values
      ('questions_no_replacement_character'),
      ('questions_answer_index_in_range'),
      ('quizzes_no_replacement_character'),
      ('topics_no_replacement_character'),
      ('lessons_no_replacement_character'),
      ('study_materials_no_replacement_character'),
      ('flashcards_no_replacement_character'),
      ('flashcard_sets_no_replacement_character'),
      ('past_papers_no_replacement_character'),
      ('announcements_no_replacement_character')
    ) as want(name)
   where not exists (
     select 1 from pg_constraint pc
      where pc.conname = want.name
        and pc.contype = 'c'
        and pc.convalidated
   );

  if _missing is not null then
    raise exception 'content guards missing or not validated: %', _missing;
  end if;
end $$;
