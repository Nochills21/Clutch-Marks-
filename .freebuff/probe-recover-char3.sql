-- Exact byte-level confirmation, server side (no client decode involved).
--   1. the lesson text around '1 ≤ x' — what precedes the surviving '1'?
--   2. the corrupted fields — what exactly is the U+FFFD run, and how many chars?
select
  'lesson' as src,
  encode(substring(content from position('1 ≤ x' in content) - 4 for 4)::bytea, 'hex') as prefix_bytes,
  substring(content from position('1 ≤ x' in content) - 4 for 4) as prefix_text
from lessons
where content like '%1 ≤ x%'
union all
select
  'question.options' as src,
  encode(substring(options::text from position(chr(65533) in options::text) for 4)::bytea, 'hex') as prefix_bytes,
  substring(options::text from position(chr(65533) in options::text) for 4) as prefix_text
from questions
where options::text like '%' || chr(65533) || '%'
limit 1;

-- How many U+FFFD runs vs chars, and is every run exactly three chars?
select
  'questions.options' as col,
  count(*) as rows,
  sum(length(options::text) - length(replace(options::text, chr(65533), ''))) as chars,
  count(*) filter (where options::text like '%' || repeat(chr(65533), 3) || '1 ≤ x%') as runs3_before_1
from questions where options::text like '%' || chr(65533) || '%'
union all
select
  'questions.explanation',
  count(*),
  sum(length(explanation) - length(replace(explanation, chr(65533), ''))),
  count(*) filter (where explanation like '%' || repeat(chr(65533), 3) || '1 ≤ x%')
from questions where explanation like '%' || chr(65533) || '%'
union all
select
  'flashcards.back',
  count(*),
  sum(length(back) - length(replace(back, chr(65533), ''))),
  count(*) filter (where back like '%+ to ' || repeat(chr(65533), 3) || ' (%')
from flashcards where back like '%' || chr(65533) || '%';
