-- Read-only: the answer_index classifier evaluated on the exact patterns that
-- matter (synthetic rows; no table is touched), so the historical 1-based bug is
-- shown to be detected rather than assumed to be.
with sample(kind, n, correct_option) as (
  values
    ('array', 4, 2),     -- healthy
    ('array', 4, 4),     -- the 1-based signature: index equals the option count
    ('array', 4, 5),     -- outside 0..3
    ('array', 4, -1),    -- negative
    ('array', 1, 0),     -- a single option
    ('string', null, 0)  -- options is not an array at all
)
select
  kind, n, correct_option,
  case
    when kind <> 'array' then 'error'
    when n < 2 then 'error'
    when correct_option < 0 then 'error'
    when correct_option >= n then 'error'
    else 'ok'
  end as severity,
  case
    when kind <> 'array' then 'options is ' || coalesce(kind, 'null') || ', not an array'
    when n < 2 then 'only ' || n || ' option(s) - nothing to choose between'
    when correct_option < 0 then 'correct_option is ' || correct_option || ' (negative)'
    when correct_option = n then 'correct_option ' || correct_option || ' equals the option count - looks 1-based'
    when correct_option > n then 'correct_option ' || correct_option || ' is outside 0..' || (n - 1)
    else 'not flagged on index grounds'
  end as detail
from sample;
