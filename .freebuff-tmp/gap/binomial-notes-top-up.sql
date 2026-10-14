update study_materials set content = content || $n$
<p><strong>Exam cue:</strong> Always state n and p before calculating, and say which condition you are checking. For P(X ≥ r) or P(X > r), use the complement 1 − P(X ≤ r − 1), read from the cumulative table or calculator, and state the final probability to three significant figures.</p>
$n$ where id = (select sm.id from study_materials sm join topics t on t.id = sm.topic_id where t.slug = 'binomial-distribution' and sm.material_type = 'notes' order by length(sm.content) desc limit 1);
