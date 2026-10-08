-- Repair the U+FFFD damage in question options/explanations and one flashcard.
--
-- Nine fields across eight rows hold the Unicode replacement character where a
-- single real character used to be: the practice-quiz options quote a line from
-- the "Algebra — Inequalities" notes, and that line begins with a minus sign.
-- The stored bytes are
--     efbfbd efbfbd efbfbd 31 20 e289a4 20 78   (\uFFFD\uFFFD\uFFFD 1 ≤ x)
-- while the lesson they were quoted from holds
--     e2 88 92 31                               (−1)
-- so the lost character is U+2212 MINUS SIGN, and the damaged run is exactly
-- three replacement characters — the three bytes of the original, each decoded
-- on its own. (That is how the damage was made: `response.on("data", c => out += c)`
-- without `res.setEncoding("utf8")` decodes every HTTP chunk separately, so any
-- multi-byte character straddling a chunk boundary becomes one U+FFFD per byte.
-- The reader in .freebuff/auto-sync.cjs is fixed in the same change, and now
-- refuses to publish a dump that still contains U+FFFD.)
--
-- Scoped to the exact damaged token rather than `replace(..., chr(65533), '−')`
-- on purpose: storage must never be rewritten on a guess, and every damaged
-- field here ends up matching one of these two patterns (verified before the
-- fix: 7 option rows + 1 explanation row + 1 flashcard row, 3 characters each).
--
-- Idempotent: after the first run no row matches the WHERE clause any more.
-- admin_audit_log.details also contains U+FFFD (137 rows) — that is a record of
-- what an admin action saw at the time, so it is deliberately left untouched.
update public.questions
set options = replace(options::text, repeat(chr(65533), 3) || '1 ≤ x', '−1 ≤ x')::jsonb
where options::text like '%' || repeat(chr(65533), 3) || '1 ≤ x%';

update public.questions
set explanation = replace(explanation, repeat(chr(65533), 3) || '1 ≤ x', '−1 ≤ x')
where explanation like '%' || repeat(chr(65533), 3) || '1 ≤ x%';

update public.flashcards
set back = replace(back, '+ to ' || repeat(chr(65533), 3) || ' (', '+ to − (')
where back like '%+ to ' || repeat(chr(65533), 3) || ' (%';
