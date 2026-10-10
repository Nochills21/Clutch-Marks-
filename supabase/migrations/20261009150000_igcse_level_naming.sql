-- Level naming: the OL tier is IGCSE.
--
-- The *code* stays 'OL' everywhere (URLs, the subject_level enum, filters,
-- topic manifest) — only human-readable copy says IGCSE. The free plan's
-- description was the one stored string still reading "O Level"; /pricing and
-- the plan cards render it verbatim, so students saw it.
--
-- Idempotent: re-running matches nothing once the row is updated.
update plans
   set description = 'IGCSE lessons, quizzes and notes only'
 where id = 'free'
   and description = 'O Level lessons, quizzes and notes only';
