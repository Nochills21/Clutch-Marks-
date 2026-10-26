select id, title, left(coalesce(content,''), 70) as body, published_at
from announcements
order by published_at desc nulls last
limit 6;
