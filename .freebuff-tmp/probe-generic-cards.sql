select f.id, s.title as deck, f.front, f.back, f.sort_order
from public.flashcards f
join public.flashcard_sets s on s.id = f.set_id
where trim(f.front) ~* '^(basics|overview|summary|key terms|introduction|measuring|definitions?|testing|the nucleus|harmonics|recursion|ides|assembler|potential|capacitance|kinematics|photons|the nucleus|efficiency)$'
   or f.back ~ 'Type What changes'
order by s.title, f.sort_order;
