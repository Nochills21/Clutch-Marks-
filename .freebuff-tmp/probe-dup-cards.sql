select c.id, c.front, c.back, c.sort_order, s.title as deck
from public.flashcards c
join public.flashcard_sets s on s.id = c.set_id
where (s.title = 'Statistics — Probability' and lower(c.front) = 'conditional probability')
   or (s.title = 'Algorithms & Programming' and lower(c.front) = 'validation vs verification')
order by s.title, c.front, c.sort_order;
