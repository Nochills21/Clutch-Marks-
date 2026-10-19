select t.slug, z.exam_type, count(*) as quizzes,
  (select count(*) from public.flashcard_sets fs where fs.topic_id = t.id) as sets
from public.topics t
join public.quizzes z on z.topic_id = t.id
where t.slug in ('binomial-distribution','complex-numbers','continuous-random-variables','differentiation-ii','further-algebra','further-trigonometry','hypothesis-testing','integration-ii','measures-of-variation-and-standard-deviation','coordinate-geometry','differentiation','functions','integration','quadratics','sequences-and-series','trigonometry')
group by t.slug, z.exam_type, t.id
order by t.slug;
