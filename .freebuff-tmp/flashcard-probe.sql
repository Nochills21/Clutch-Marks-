select id,
       left(front, 160) as front,
       left(back, 160) as back
from flashcards
where front ~ '&[a-zA-Z]+;|&#[0-9]+;|\\\(|\$|\\[a-z]+'
   or back ~ '&[a-zA-Z]+;|&#[0-9]+;|\\\(|\$|\\[a-z]+'
limit 40;
