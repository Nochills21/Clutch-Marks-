select
  left(options->>1, 80) as option_text,
  encode(substring((options->>1) from 1 for 3)::bytea, 'hex') as first_bytes
from questions
where id = 'f8a13a61-bcfc-4c0c-abbe-93acbd5ec233';
select left(back, 60) as card_back from flashcards where id = '6a911898-b919-48bd-9a48-db7c43c6b941';
