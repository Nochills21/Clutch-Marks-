select q.id, left(q.question_text,90) as stem, q.options::text as opts, q.correct_option as k
from public.questions q
where q.id::text in ('35962340-d338-4afa-85db-e96361639a15','36aef05d-3939-45d9-a506-658c6da134e0','36cb7973-d0c9-459f-8d78-e0216c7d063e','3867c540-6cab-43dc-9d66-dd29c0ad22ef','38d1ac75-e488-4ee3-8c6c-8f3de8f149b1','38e4c64d-8a9c-414b-85a2-5d9c3d21dbda','390f5bf6-f653-47be-acfb-f6e00414ee97','39b318e9-8abb-4938-8360-13a7e44f2f70','39eb56c2-6660-4e2f-8710-cbe21b065864')
order by q.id;
