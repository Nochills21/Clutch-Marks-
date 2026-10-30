/**
 * Mathematics AS circular-measure deepening, pass a: five new h2 sections with
 * 28 h3 subsections in total (9 → 37 h3 headings, above the 36 bar). Prose
 * only: the note already carries its sector figure. Inserted before
 * "Equations and symbols" by refine-note-sections.cjs; nothing already in the
 * note is rewritten.
 */

const NOTE = "929796bd-05c8-46af-85a3-af6815541b09";

const sections = [
  {
    id: NOTE,
    slug: "circular-measure",
    proseOnly: true,
    heading: "Deriving the arc and sector formulae from the fraction of a circle",
    html: `<h2>Deriving the arc and sector formulae from the fraction of a circle</h2>
<p>Both formulae come from one idea: a sector is the same fraction of its circle as its angle is of a full turn. Seeing that fraction is more useful than memorising two formulae, because the same reasoning works when a question changes the circle or the angle.</p>
<h3>Arc length as a fraction of the circumference</h3>
<p>The full circumference is 2πr, and a full turn is 2π radians. A sector of angle θ takes the fraction θ/(2π) of the circle, so s = (θ/2π) × 2πr = rθ. The π cancels, which is why radians make the arc formula so short.</p>
<h3>Sector area as a fraction of the disc</h3>
<p>The whole disc has area πr². The sector takes the same fraction, so A = (θ/2π) × πr² = ½r²θ. Check it with θ = 2π: ½r²(2π) = πr², the whole disc.</p>
<h3>What goes wrong if the angle is in degrees</h3>
<p>In degrees a full turn is 360, not 2π, so the fraction becomes θ/360 and the arc is (θ/360) × 2πr. Putting a degree value straight into rθ gives an answer about 57.3 times too large, because one radian is 180/π degrees.</p>
<h3>The area formula from integration</h3>
<p>Adding thin sectors of area ½r² dθ from 0 to θ gives ∫₀^θ ½r² dθ = ½r²θ. This is the same result reached by integration, and it is the method behind the formula rather than a separate rule.</p>
<h3>Recovering the radius and angle from the arc and area</h3>
<p>Dividing the area by the arc gives A/s = ½r, so r = 2A/s, and then θ = s/r. A sector with arc 15 cm and area 75 cm² has r = 2 × 75 / 15 = 10 cm and θ = 15/10 = 1.5 rad.</p>
<h3>Checking the units of the answer</h3>
<p>An arc is a length, so its unit is the radius unit. A sector's area has square units. An area with no square unit usually means the arc formula was used by mistake.</p>`,
  },
  {
    id: NOTE,
    slug: "circular-measure",
    proseOnly: true,
    heading: "Converting angles and keeping exact values",
    html: `<h2>Converting angles and keeping exact values</h2>
<p>Most lost marks on this topic are not hard mathematics. They come from an angle left in the wrong unit, or from a decimal where the question wanted π. These habits prevent both.</p>
<h3>Degrees to radians, exactly</h3>
<p>Multiply degrees by π/180. For example 150° × π/180 = 5π/6. When the question asks for an exact value, keep π in the answer and evaluate it only at the end.</p>
<h3>Radians to degrees</h3>
<p>Multiply radians by 180/π. For example 1.2 rad × 180/π = 68.75°. As a check, 1 rad is about 57.3°, so 1.2 rad must be a little more than 60°.</p>
<h3>Multiples of π in an answer</h3>
<p>A sector with r = 6 cm and θ = π/3 has arc length 6 × π/3 = 2π cm, which is about 6.28 cm. Give the exact form 2π cm when the question asks for it, and the decimal only when it asks for a decimal.</p>
<h3>Estimating the size of a radian</h3>
<p>π/2 ≈ 1.57 is a right angle and π ≈ 3.14 is a straight line. Since 1 rad is about 57°, an angle of 0.5 rad is roughly 29°. A quick estimate like this catches a wrong calculator mode before the answer is written.</p>
<h3>Setting the calculator to radians</h3>
<p>Check the mode before every trigonometric step. In RAD mode sin(π/6) = 0.5. In DEG mode, sin 0.5236 gives 0.0091, which shows the calculator was not in radians.</p>
<h3>Mixed units in one question</h3>
<p>A question may give the radius in metres and the angle in degrees. Convert the angle first, find the arc in the radius unit, and then state the answer in the unit the question asks for.</p>`,
  },
  {
    id: NOTE,
    slug: "circular-measure",
    proseOnly: true,
    heading: "The triangle and the segment inside a sector",
    html: `<h2>The triangle and the segment inside a sector</h2>
<p>A chord joins the two ends of the arc, which turns the sector into a triangle plus a segment. Most questions on this topic that look hard are one of these three shapes in disguise, so identify the shape before choosing a formula.</p>
<h3>The triangle inside a sector</h3>
<p>The two radii and the chord form an isosceles triangle with sides r, r and included angle θ. Its area is ½r² sin θ, and it is always smaller than the sector.</p>
<h3>Segment area as sector minus triangle</h3>
<p>The segment between the chord and the arc has area ½r²θ − ½r² sin θ = ½r²(θ − sin θ). With r = 10 cm and θ = 1.2 rad, sin 1.2 = 0.9320, so the segment is ½ × 100 × (1.2 − 0.9320) = 13.4 cm².</p>
<h3>Chord length from the cosine rule</h3>
<p>The chord satisfies c² = r² + r² − 2r² cos θ, which simplifies to c = 2r sin(θ/2). With r = 10 cm and θ = 1.2 rad, c = 20 sin 0.6 = 11.29 cm.</p>
<h3>Choosing the sector, triangle or segment</h3>
<p>Read the shaded region before choosing a formula. Bounded by the two radii and the arc, it is the sector. Bounded by the chord and the arc, it is the segment. Bounded by the two radii and the chord, it is the triangle. Choosing the wrong one is the most common cause of a lost method mark.</p>
<h3>Angles in the isosceles triangle</h3>
<p>The two base angles of the triangle are equal, and each is (π − θ)/2. Those angles are needed when a question asks for an angle at the chord rather than at the centre.</p>
<h3>Reflex angles and the major segment</h3>
<p>The segment formula ½r²(θ − sin θ) applies for θ less than π. For a reflex angle, find the minor segment using 2π − θ, and subtract it from the whole disc to get the major part.</p>`,
  },
  {
    id: NOTE,
    slug: "circular-measure",
    proseOnly: true,
    heading: "Applied problems: pendulums, wheels and wipers",
    html: `<h2>Applied problems: pendulums, wheels and wipers</h2>
<p>Context questions give the same arc and sector formulae inside a story. The skill is to see which length is the radius and which angle is in radians, and then apply the formula for the quantity asked.</p>
<h3>A pendulum sweeping an arc</h3>
<p>The bob of a pendulum moves on an arc whose radius is the string length. A string of length 0.8 m that swings through 0.5 rad traces an arc of length 0.8 × 0.5 = 0.4 m.</p>
<h3>Distance covered by a wheel</h3>
<p>A wheel of radius 0.35 m turns through 2π per revolution, so it rolls 2π × 0.35 = 2.20 m per turn. In 50 turns it covers about 110 m.</p>
<h3>The area swept by a windscreen wiper</h3>
<p>An arm of length 0.6 m sweeps 100°, which is θ = 100π/180 = 1.745 rad. The swept area is ½ × 0.6² × 1.745 = 0.314 m².</p>
<h3>Working backwards from an arc length</h3>
<p>A curved track has arc length 18 m and subtends 0.75 rad at the centre of its circle. The radius is r = s/θ = 18/0.75 = 24 m.</p>
<h3>Perimeter of a shape with arcs and straight sides</h3>
<p>Add the straight sides to the arc lengths. For a sector, the perimeter is the arc plus both radii, not the arc alone. For a shape that contains only a curved edge, use the arc alone.</p>
<h3>Angular speed and the angle turned</h3>
<p>An angular speed in rad s⁻¹ multiplied by a time gives the angle turned in radians. A wheel at 4 rad s⁻¹ turns through 4 × 2.5 = 10 rad in 2.5 s, and the arc it rolls is rθ.</p>`,
  },
  {
    id: NOTE,
    slug: "circular-measure",
    proseOnly: true,
    heading: "Marked questions with full answers",
    html: `<h2>Marked questions with full answers</h2>
<p>Each question is set at the AS level with its marks shown. Write the formula and the numbers you substitute before reading the answer, because the marks are awarded for the method as well as the final value.</p>
<h3>Question 1: area from radius and angle [3 marks]</h3>
<p><strong>Question.</strong> A sector has radius 6 cm and angle 2.5 radians. Find its area.</p>
<p><strong>Answer.</strong> A = ½r²θ = ½ × 6² × 2.5 = ½ × 36 × 2.5 = 45 cm².</p>
<h3>Question 2: radius and angle from arc and area [4 marks]</h3>
<p><strong>Question.</strong> A sector has arc length 15 cm and area 75 cm². Find its radius and its angle in radians.</p>
<p><strong>Answer.</strong> From A = ½rs, 75 = ½ × r × 15, so r = 10 cm. Then θ = s/r = 15/10 = 1.5 rad.</p>
<h3>Question 3: arc length in exact form [3 marks]</h3>
<p><strong>Question.</strong> A sector has radius 4 cm and angle 75°. Find its arc length, giving the answer in terms of π.</p>
<p><strong>Answer.</strong> Convert first: θ = 75π/180 = 5π/12. Then s = rθ = 4 × 5π/12 = 5π/3 cm, which is about 5.24 cm.</p>
<h3>Question 4: area of a segment [5 marks]</h3>
<p><strong>Question.</strong> A chord of a circle of radius 9 cm subtends an angle of 2 radians at the centre. Find the area of the minor segment.</p>
<p><strong>Answer.</strong> Segment = ½r²(θ − sin θ) = ½ × 81 × (2 − sin 2) = 40.5 × (2 − 0.9093) = 40.5 × 1.0907 = 44.2 cm², to 1 decimal place.</p>
<h3>Question 5: perimeter from area [4 marks]</h3>
<p><strong>Question.</strong> A sector has radius 5 cm and area 15 cm². Find its perimeter.</p>
<p><strong>Answer.</strong> From A = ½r²θ, 15 = ½ × 25 × θ, so θ = 1.2 rad. The arc is rθ = 5 × 1.2 = 6 cm, and the perimeter is 6 + 2 × 5 = 16 cm.</p>
<h3>How examiners award these questions</h3>
<p>A method mark is given for the correct formula with the numbers substituted, and an accuracy mark for the final value with its unit. Writing the formula before the numbers is what keeps the method mark when the final value is wrong.</p>`,
  },
];

module.exports = { sections };
