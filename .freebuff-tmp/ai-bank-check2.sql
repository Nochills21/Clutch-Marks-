select z.exam_type, z.is_ai_generated, count(*) as quizzes, sum((select count(*) from public.questions q where q.quiz_id = z.id)) as questions
from public.quizzes z group by z.exam_type, z.is_ai_generated order by z.exam_type, z.is_ai_generated;
