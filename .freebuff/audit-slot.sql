select correct_option as slot, count(*)::int as n,
  round(100.0 * count(*) / sum(count(*)) over (), 1) as pct
from public.questions group by 1 order by 1;
