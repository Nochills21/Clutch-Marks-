select t.slug, sm.id, sm.material_type, length(sm.content) as len, sm.title
from study_materials sm join topics t on t.id = sm.topic_id
where t.slug in ('number-arithmetic-and-place-value','number-sets','number-indices-and-standard-form','number-ratio-rate-and-proportion','algebra-simplifying-and-expanding','algebra-inequalities','algebra-sequences-and-functions','algebra-graphs','mensuration-bearings-and-loci','geometry-congruence-and-similarity','mensuration-area-and-volume','trigonometry-sine-and-cosine-rules','transformations-and-vectors','statistics-probability','scatter-diagrams-and-correlation')
order by t.slug, len desc
