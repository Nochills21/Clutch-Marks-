select
  'question.options' as src,
  encode(substring(options::text from position(chr(65533) in options::text) for 8)::bytea, 'hex') as bytes
from questions
where options::text like '%' || chr(65533) || '%'
limit 1;
