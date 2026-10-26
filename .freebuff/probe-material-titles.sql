-- Every study_materials title, checked as a title (read-only).
--
-- The notes gate only sees `material_type = 'notes'` (and only the rows it is
-- pointed at), so a scripted write that copied a body — or the model's scratch
-- text — into the title would go unnoticed on every other material type. This
-- asks the whole table the same three questions the gate now asks of one row,
-- plus two widening ones for "this is prose" and "this is the model talking".
--
-- Flags:
--   blank        null or whitespace title
--   too_long     > 100 characters after trimming (a heading, not a paragraph)
--   has_tag      contains an HTML tag
--   has_newline  contains CR/LF (pasted body text)
--   has_fffd     contains U+FFFD (a broken encoding round-trip)
--   body_like    > 60 chars and sentence punctuation — a paragraph, not a title
--   scratch      opens with the model's or a draft's voice
select
  m.id,
  m.material_type,
  s.slug as subject,
  sl.level::text as level,
  t.slug as topic,
  length(m.title) as title_len,
  array_remove(array[
    case when m.title is null or btrim(m.title) = '' then 'blank' end,
    case when length(btrim(coalesce(m.title, ''))) > 100 then 'too_long' end,
    case when coalesce(m.title, '') ~ '<[a-zA-Z/!]' then 'has_tag' end,
    case when coalesce(m.title, '') ~ '[\r\n]' then 'has_newline' end,
    case when position(chr(65533) in coalesce(m.title, '')) > 0 then 'has_fffd' end,
    case
      when length(btrim(coalesce(m.title, ''))) > 60
       and btrim(coalesce(m.title, '')) ~ '[.!?](\s|$)'
      then 'body_like'
    end,
    case
      when btrim(coalesce(m.title, '')) ~* '^(here(''s| is)|sure|certainly|as an ai|model answer|draft|scratch|appendix|chapter [0-9]|answer:)'
      then 'scratch'
    end
  ], null) as flags,
  left(regexp_replace(btrim(coalesce(m.title, '')), '\s+', ' ', 'g'), 140) as title_preview
from public.study_materials m
join public.topics t on t.id = m.topic_id
join public.subject_levels sl on sl.id = t.subject_level_id
join public.subjects s on s.id = sl.subject_id
where
     m.title is null
  or btrim(m.title) = ''
  or length(btrim(m.title)) > 100
  or m.title ~ '<[a-zA-Z/!]'
  or m.title ~ '[\r\n]'
  or position(chr(65533) in m.title) > 0
  or (length(btrim(m.title)) > 60 and btrim(m.title) ~ '[.!?](\s|$)')
  or btrim(m.title) ~* '^(here(''s| is)|sure|certainly|as an ai|model answer|draft|scratch|appendix|chapter [0-9]|answer:)'
order by length(m.title) desc nulls first, s.slug, sl.level, t.slug;
