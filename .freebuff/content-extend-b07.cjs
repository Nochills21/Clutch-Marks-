// Batch 07: deepens eight thin notes toward 2500+ characters.
// Consumed by .freebuff/extend-materials.cjs. No backticks and no dollar-brace sequences.
module.exports = {
  expectType: "notes",
  rows: {
    "e57fcf07-484e-4716-b79e-2e80f4c59824": `
<h3>Worked example: a two-table database</h3>
<p>A school stores pupil details and the subjects each pupil takes. The table Pupil holds PupilID (primary key), Name and Form. The table Enrolment holds EnrolmentID (primary key), PupilID (foreign key referencing Pupil) and SubjectCode. Each enrolment row belongs to exactly one pupil, so the relationship is one-to-many from Pupil to Enrolment. The name is stored once, in Pupil, so moving a pupil to a new form needs one update rather than one per subject.</p>
<h3>Validation and data integrity</h3>
<ul>
<li>A range check rejects a mark outside 0 to 100. A presence check stops a required field being left empty.</li>
<li>A type check rejects text typed into a numeric field, and a length check limits how many characters a field accepts.</li>
<li>A referential integrity check refuses an enrolment whose PupilID does not exist in Pupil.</li>
</ul>
<h3>What a database management system does</h3>
<p>A DBMS keeps a data dictionary that describes every table and field, controls which users may read or change which data, backs the data up and recovers it after a failure, and manages concurrent access so that two users editing the same record do not corrupt it. Describe each of these with a named example from the question rather than listing the feature in general terms.</p>
`,
    "37923030-dd6a-49eb-b200-0cdfef605eea": `
<h3>Worked example: sharing in a ratio</h3>
<p>Share 180 in the ratio 2 : 3 : 4. The ratio has 2 + 3 + 4 = 9 parts, so one part is 180 ÷ 9 = 20. The shares are 2 × 20 = 40, 3 × 20 = 60 and 4 × 20 = 80. Check the answer by adding the shares: 40 + 60 + 80 = 180.</p>
<h3>Direct and inverse proportion</h3>
<ul>
<li>Direct proportion: 5 pens cost 3.50. The cost of one pen is 3.50 ÷ 5 = 0.70, so 12 pens cost 12 × 0.70 = 8.40.</li>
<li>Inverse proportion: 4 workers finish a job in 10 days. The total work is 4 × 10 = 40 worker-days. With 5 workers the job takes 40 ÷ 5 = 8 days. More workers means fewer days, so the product of the two quantities stays the same.</li>
</ul>
<h3>Average speed is not the mean of two speeds</h3>
<p>A car travels 60 km at 60 km/h and then 60 km at 30 km/h. The first leg takes 1 hour and the second takes 2 hours, so the total distance is 120 km in 3 hours. The average speed is 120 ÷ 3 = 40 km/h, not the mean of 60 and 30, which would be 45 km/h. Always divide total distance by total time.</p>
`,
    "7798ea37-c64d-4cc6-a474-c55584ee86a7": `
<h3>Worked example: reverse percentage</h3>
<p>After a 15% increase, a price is 230. The original price is the amount that equals 115% of itself, so divide by 1.15: 230 ÷ 1.15 = 200. Finding 15% of 230 and subtracting it gives 195.50, which is wrong, because 15% is taken of the original price, not the new one.</p>
<h3>Compound change</h3>
<p>1000 is invested at 4% per year for 3 years. Each year multiplies the value by 1.04, so the final value is 1000 × 1.04 × 1.04 × 1.04 = 1000 × 1.04³ = 1124.86 (to 2 decimal places). Simple interest would give only 1120, so the difference shows why compound growth is treated separately in the examination.</p>
<h3>Choosing a method</h3>
<ul>
<li>To find a fraction of an amount, divide by the denominator and multiply by the numerator: 3/4 of 80 = 80 ÷ 4 × 3 = 60.</li>
<li>To add or subtract fractions, write both over a common denominator first.</li>
<li>Write a percentage change as a multiplier: a 20% decrease is multiplier 0.8, and a 5% increase is 1.05.</li>
</ul>
<p>Exam point: give the final answer in the form the question asks for, such as a fraction in its simplest form or a percentage to 1 decimal place.</p>
`,
    "61da5c21-d745-4a51-ba0c-2a861af41061": `
<h3>Worked example: pressure from a force</h3>
<p>A force of 600 N acts on an area of 0.04 m². The pressure is p = F ÷ A = 600 ÷ 0.04 = 15 000 Pa, which is 15 kPa. Check the units first: the area must be in m² for the answer to be in pascals.</p>
<h3>Pressure in a liquid</h3>
<p>The pressure at depth in a liquid is p = h × ρ × g, where h is the depth in metres, ρ the density in kg/m³ and g the gravitational field strength (about 10 N/kg). For water of depth 2.5 m, p = 2.5 × 1000 × 10 = 25 000 Pa. The pressure depends on depth and density only, not on the shape of the container or the area of the base.</p>
<h3>Density</h3>
<p>Density is mass divided by volume, ρ = m ÷ V. A block of mass 540 g and volume 200 cm³ has density 540 ÷ 200 = 2.7 g/cm³. Convert to kg/m³ by multiplying by 1000, giving 2700 kg/m³, because 1 g/cm³ = 1000 kg/m³. Objects with a density greater than the fluid sink, and objects with a lower density float.</p>
<p>Exam point: state the formula, substitute the values with their units, and give the answer with the correct unit.</p>
`,
    "dcb48bc6-ebfa-4469-9a47-d9fc8394172f": `
<h3>Worked example: finding a side</h3>
<p>In a right-angled triangle the hypotenuse is 10 cm and angle θ is 35°. The side opposite θ is found with sine: opposite = 10 × sin 35° = 10 × 0.5736 = 5.74 cm (to 2 decimal places). The side adjacent to θ uses cosine: adjacent = 10 × cos 35° = 10 × 0.8192 = 8.19 cm.</p>
<h3>Worked example: finding an angle</h3>
<p>In a right-angled triangle the opposite side is 6 cm and the adjacent side is 9 cm. Use tan: tan θ = 6 ÷ 9 = 0.6667, so θ = tan⁻¹(0.6667) = 33.7° (to 1 decimal place). Check the answer: an angle less than 45° means the opposite side should be shorter than the adjacent side, which it is.</p>
<h3>Choosing the ratio</h3>
<ul>
<li>Label the sides as opposite, adjacent and hypotenuse relative to the angle you are given, not the angle at the right-angle corner.</li>
<li>Use the ratio that contains the two sides you know, or the side you want and one you know.</li>
<li>Keep the calculator in degree mode, and do not round until the final step.</li>
</ul>
<p>Exam point: a bearing is measured clockwise from north, so draw the north line first and then mark the angle before using the triangle.</p>
`,
    "3e7dd5a5-8c36-474d-9ae4-f9cbb91c9a3e": `
<h3>Worked example: the sine rule</h3>
<p>In triangle ABC, side a = 7 cm is opposite angle A = 40°, and angle B = 65°. Find side b, which is opposite B: b = a × sin B ÷ sin A = 7 × sin 65° ÷ sin 40° = 7 × 0.9063 ÷ 0.6428 = 9.87 cm (to 2 decimal places).</p>
<h3>Worked example: the cosine rule</h3>
<p>Triangle PQR has PQ = 5 cm, PR = 8 cm and the included angle P = 60°. The side QR is found from a² = b² + c² − 2bc cos A: QR² = 8² + 5² − 2 × 8 × 5 × cos 60° = 64 + 25 − 20 = 69, so QR = √69 = 8.31 cm.</p>
<h3>Area and 3-D problems</h3>
<ul>
<li>Area of a triangle = ½ × a × b × sin C, where C is the angle between sides a and b. With a = 8, b = 5 and C = 60°, the area is ½ × 8 × 5 × sin 60° = 17.32 cm².</li>
<li>In a 3-D question, first find a triangle that contains the unknown and two known values, then apply the sine or cosine rule to that triangle only.</li>
</ul>
<p>Exam point: use the sine rule when you have a matching pair (a side and the angle opposite it). Use the cosine rule when you have two sides and the included angle, or three sides.</p>
`,
    "57eaee80-6b7e-424d-b649-06a608be6256": `
<h3>Worked example: a Poisson probability</h3>
<p>The number of emails received per hour, X, follows a Poisson distribution with mean λ = 3, written X ~ Po(3). Then P(X = 2) = e⁻³ × 3² ÷ 2! = 0.04979 × 9 ÷ 2 = 0.2240 (to 4 decimal places). Use the calculator's Poisson function when the examination permits it, or the tables in the formula booklet.</p>
<h3>Scaling the interval</h3>
<p>If emails arrive at a mean rate of 3 per hour, the mean for 20 minutes is 3 × 20/60 = 1. Always multiply λ by the length of the new interval so that the rate and the time use the same unit.</p>
<h3>Adding independent Poisson variables</h3>
<p>If X ~ Po(2) and Y ~ Po(5) are independent, then X + Y ~ Po(7). The means add, and so do the variances, because for a Poisson distribution the mean and the variance are both λ.</p>
<h3>Exam method</h3>
<ul>
<li>State the distribution and its parameter in the form X ~ Po(λ) before calculating.</li>
<li>For P(X at least 1), use 1 − P(X = 0), which is usually quicker.</li>
<li>Give probabilities to 3 significant figures unless the question asks for a different accuracy.</li>
</ul>
`,
    "6103544a-0080-4c85-af53-ddbb12284c25": `
<h3>Worked example: enlargement</h3>
<p>Point P(3, 1) is enlarged by scale factor 2 with centre O(0, 0). Each coordinate is multiplied by 2, so P' = (6, 2). If the centre is (1, 1) instead, the vector from the centre to P is (2; 0), which becomes (4; 0) after the enlargement, so P' = (5, 1). Measure the distance from the centre to check the image.</p>
<h3>Vectors as column vectors</h3>
<ul>
<li>Addition: (2; 1) + (−3; 5) = (−1; 6). Add the components in the same position.</li>
<li>Scalar multiple: 3 × (2; −1) = (6; −3). Multiply each component by the number.</li>
<li>Magnitude: |(3; 4)| = √(3² + 4²) = √25 = 5.</li>
</ul>
<h3>Translation of a point</h3>
<p>Translating A(1, 2) by the vector (4; −2) gives A' = (1 + 4, 2 − 2) = (5, 0). A translation has no centre and does not change the size or orientation of a shape.</p>
<p>Exam point: a transformation needs a full description. For a reflection give the mirror line; for a rotation give the centre, the angle and the direction; for an enlargement give the centre and the scale factor.</p>
`,
  },
};
