select count(*) as papers,
       count(distinct year) as years,
       min(year) as first_year,
       max(year) as last_year
from past_papers;
