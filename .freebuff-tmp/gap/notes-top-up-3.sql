update study_materials set content = content || $n$
<h3>Exam method: R-form</h3>
<p>To write a sinθ + b cosθ as R sin(θ + α), expand R sin(θ + α) = R sinθ cosα + R cosθ sinα and compare coefficients. This gives R = √(a² + b²) and tan α = b / a, with α in the quadrant where cos α and sin α have the signs of a and b.</p>
<p><strong>Exam cue:</strong> Find the maximum and minimum from R, then solve for θ over the stated interval. Give α in the correct quadrant before writing the final angles.</p>
$n$ where id = (select sm.id from study_materials sm join topics t on t.id = sm.topic_id where t.slug = 'further-trigonometry' and sm.material_type = 'notes' order by length(sm.content) desc limit 1);

update study_materials set content = content || $n$
<h3>Exam method: arithmetic and geometric sums</h3>
<p>For an arithmetic sequence with first term a and common difference d, the nth term is a + (n − 1)d and the sum of the first n terms is S_n = n/2 (2a + (n − 1)d). For a geometric sequence with ratio r, the nth term is ar^(n − 1) and S_n = a(1 − r^n)/(1 − r) for r ≠ 1.</p>
<p>The sum to infinity exists only when |r| &lt; 1, and then S∞ = a/(1 − r). If |r| ≥ 1, say so explicitly rather than applying the formula.</p>
<p><strong>Exam cue:</strong> Identify whether the sequence is arithmetic or geometric from the common difference or ratio before choosing a formula. Check the number of terms n carefully when you set up the equation.</p>
$n$ where id = (select sm.id from study_materials sm join topics t on t.id = sm.topic_id where t.slug = 'sequences-and-series' and sm.material_type = 'notes' order by length(sm.content) desc limit 1);

update study_materials set content = content || $n$
<h3>Exam method: using simulation output with real data</h3>
<p>Sensor readings are noisy, drift over time and can contain missing or impossible values. Before using them, check each reading against a sensible range, remove or flag outliers, and decide how to handle gaps, for example by ignoring them or interpolating between neighbouring readings. State which cleaning step you chose.</p>
<p>A simulation is only as reliable as its assumptions and its inputs. In an exam answer, state one assumption the model makes, explain how it could make the output differ from reality, and suggest a way to test the model against measured data.</p>
<p><strong>Exam cue:</strong> When asked to evaluate a simulation, give a specific limitation tied to the scenario in the question rather than a general comment that simulations are approximate.</p>
$n$ where id = (select sm.id from study_materials sm join topics t on t.id = sm.topic_id where t.slug = 'simulation-sensors-and-real-data' and sm.material_type = 'notes' order by length(sm.content) desc limit 1);
