-- Repair the "Transformations and Vectors" quiz rows whose column vectors were
-- flattened into bracket-piece glyphs.
--
-- The source for this quiz (.freebuff/seed-ol-geometry.cjs) drew a column vector
-- as two stacked lines of Unicode bracket pieces:
--
--     ⎛⎝3⎞⎠      row 1  (U+239B U+239D 3 U+239E U+23A0)
--     ⎝2⎠        row 2
--
-- so the vector only reads correctly while the line break survives. Copied into
-- a single-line question or option, every second row was dropped and the pieces
-- were all that remained: the signature left behind is ⎛⎝ (U+239B U+239D).
-- Four questions in this quiz carry it, and in one of them the loss makes two
-- different options identical — ["⎛⎝1⎞⎠", "⎛⎝3⎞⎠", "⎛⎝1⎞⎠", "⎛⎝3⎞⎠"] — which is what
-- public.content_integrity_findings() reports as a duplicated option. That row
-- is the flagged one; the other three are the sibling rows from the same seed.
--
-- Restored in the notation the topic's own lesson teaches — "Column vector
-- (x; y); magnitude = √(x² + y²)", with points written A(1, 2) and vectors
-- (3; 4) — which is also how the notes-derived practice quiz for this topic
-- writes a vector. Nothing is invented beyond what the flattening removed:
--
--   * the sum question — its explanation still computes (2 + (−1), 5 + 3) = (1, 8),
--     so the addends are (2; 5) and (−1; 3) and the sum is (1; 8). The damaged
--     options still show their first rows in order, 1, 3, 1, 3, so the rebuilt
--     distractors keep those and pair them with the second rows the explanation
--     and a subtraction slip produce (8 and 2). Its correct_option pointed at a
--     former duplicate once the two 1s and two 3s were distinguishable, so it is
--     moved to the option the explanation names.
--   * the magnitude question — its explanation computes √(6² + 8²) = 10, so the
--     vector is (6; 8). The options and the answer (10, at index 2) already stand.
--   * the translation question — its explanation reads "−3 (left) and −2 (down)",
--     so the vector is (−3; −2). The options and the answer already stand.
--   * the vector-geometry question — its explanation computes OB − OA =
--     (4−2, 1−3) = (2, −2), so OA = (2; 3) and OB = (4; 1); its options (AB, BA,
--     OA + OB, 2OA) and its answer (AB) already stand, and only the question lost
--     its vectors.
--
-- Keyed on the surviving text plus the ⎛⎝ signature, not on row ids: ids differ
-- between a fresh database and the live one, while after the first run no row
-- matches any more — so this is idempotent. The glyphs are spelled with chr()
-- because they are exactly the characters a copy/paste of this file is most
-- likely to mangle; the replaced text uses U+2212 MINUS SIGN, as the rest of the
-- content does. The final block makes the file self-checking: if a flattened
-- vector survives in any question field, the whole migration rolls back.

-- 1. The flagged row: duplicated options, and a correct_option that no longer
--    points at the answer its own explanation states.
update public.questions
   set question_text = 'What is (2; 5) + (−1; 3)?',
       options = '["(1; 8)", "(3; 8)", "(1; 2)", "(3; 2)"]'::jsonb,
       correct_option = 0
 where question_text like 'What is %'
   and question_text like '%+%'
   and question_text like '%' || chr(9115) || chr(9117) || '%';

-- 2. Magnitude of the (6; 8) of its own explanation.
update public.questions
   set question_text = 'Calculate the magnitude of the vector (6; 8).'
 where question_text like 'Calculate the magnitude of vector %'
   and question_text like '%' || chr(9115) || chr(9117) || '%';

-- 3. Translation row: both the question and the explanation lost the second row.
update public.questions
   set question_text = 'A translation is given by the vector (−3; −2). What does this mean?',
       explanation = 'Vector (−3; −2) means −3 (left) and −2 (down).'
 where question_text like 'A translation is given by the vector %'
   and question_text like '%' || chr(9115) || chr(9117) || '%';

-- 4. Vector geometry: only the question lost its position vectors.
update public.questions
   set question_text = 'If OA = (2; 3) and OB = (4; 1), which of these vectors is OB − OA?'
 where question_text like 'If OA = %'
   and question_text like '%' || chr(9115) || chr(9117) || '%';

do $$
declare
  _left integer;
begin
  select count(*) into _left
    from public.questions
   where question_text like '%' || chr(9115) || chr(9117) || '%'
      or options::text like '%' || chr(9115) || chr(9117) || '%'
      or coalesce(explanation, '') like '%' || chr(9115) || chr(9117) || '%';

  if _left > 0 then
    raise exception 'flattened column vectors still present in % question row(s)', _left;
  end if;
end $$;
