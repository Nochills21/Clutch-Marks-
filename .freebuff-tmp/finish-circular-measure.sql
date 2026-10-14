-- Finish the Circular Measure study note (mathematics / AS).
-- It sat at 937 chars, just under the 1000-char topic_ready bar, and was
-- missing major/minor arcs, sector and segment perimeters, the segment-area
-- derivation, rearranging for r, and a full worked example. This keeps every
-- existing sentence and adds the missing exam-critical pieces in the same
-- HTML voice. Content-only update: no schema, no RLS, no seeders hold this
-- text (verified: no repo file mentions it), so nothing will clobber it.
update public.study_materials
set content = '<h2>Circular Measure</h2>
<p>Cambridge International AS & A Level Mathematics 9709, Paper 1: radian measure, arc length, and the areas and perimeters of sectors and segments. Every formula here takes its angle in radians — that is the single fact most marks hinge on.</p>
<h3>Radians</h3>
<p>One radian is the angle at the centre of a circle subtended by an arc whose length equals the radius. The full circumference is 2πr, so a full turn is 2π radians and π radians = 180°.</p>
<ul>
<li>Degrees → radians: multiply by π/180. Example: 150° = 150π/180 = 5π/6 ≈ 2.618 rad.</li>
<li>Radians → degrees: multiply by 180/π. Example: 1.5 rad = 1.5 × 180/π ≈ 85.9°.</li>
</ul>
<p>Learn the common values: 30° = π/6, 45° = π/4, 60° = π/3, 90° = π/2, 180° = π, 360° = 2π. Leave answers in terms of π unless the question asks for a decimal — and when it does, give three significant figures.</p>
<h3>Arc Length</h3>
<p>s = rθ (θ in radians).</p>
<p><strong>Example:</strong> r = 6, θ = π/3 gives s = 6 × π/3 = 2π.</p>
<p>A chord splits the circumference into a minor arc and a major arc, and their lengths add to 2πr. If a question gives the major angle, use θ_major = 2π − θ_minor before substituting.</p>
<h3>Sector Area</h3>
<p>A = ½r²θ.</p>
<p><strong>Example:</strong> r = 5, θ = 1.2 gives A = ½ × 25 × 1.2 = 15.</p>
<p>Minor and major sector areas add to πr². The perimeter of a sector is P = 2r + s = 2r + rθ — the two straight edges count, so an arc length alone is not a perimeter.</p>
<h3>Segment Area</h3>
<p>A = ½r²(θ − sin θ). For r = 2, θ = π/2: A = 2(π/2 − 1) = π − 2.</p>
<p>The segment is the sector minus the triangle ½r²sin θ — that subtraction is where the formula comes from, and writing it down earns method marks even if the arithmetic slips. Its perimeter is the arc plus the chord, with chord length 2r sin(θ/2).</p>
<h3>Putting It Together</h3>
<p><strong>Worked example:</strong> a sector has radius 8 cm and angle 1.1 rad. Arc length s = 8 × 1.1 = 8.8 cm. Area A = ½ × 64 × 1.1 = 35.2 cm². Perimeter P = 2 × 8 + 8.8 = 24.8 cm.</p>
<h3>Rearranging</h3>
<ul>
<li>θ = s/r (must be radians)</li>
<li>θ = 2A/r²</li>
<li>r = s/θ, and r = √(2A/θ) — isolate the squared term first, then take the positive root only, since a radius is a length.</li>
</ul>
<p><strong>Exam traps:</strong> never mix degrees into s = rθ or A = ½r²θ — convert first, and check the calculator is in radian mode. Sketch the sector and mark r and θ before computing. Read whether the question asks for the major or the minor arc, sector, or segment, and confirm area answers carry squared units while arcs and perimeters are plain lengths.</p>'
where id = '929796bd-05c8-46af-85a3-af6815541b09';

select id, title, length(content) as content_chars
from public.study_materials
where id = '929796bd-05c8-46af-85a3-af6815541b09';
