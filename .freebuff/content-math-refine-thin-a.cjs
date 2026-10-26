#!/usr/bin/env node
/**
 * Mathematics — the four thinnest notes in the estate, completed.
 *
 * These are the only four rows still failing `gate-notes-depth.cjs`, and they
 * fail by 5 to 40 characters of text: they were written to the bar and stopped.
 * A page that has just cleared a character count is exactly the page that is
 * thin in the way the count cannot see — so each of these gets the section it
 * was missing, drawn rather than described.
 *
 * Apply with:
 *   node .freebuff/refine-note-sections.cjs .freebuff/content-math-refine-thin-a.cjs
 *   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-refine.sql            (dry run)
 *   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-refine.sql --apply    (live)
 */
const fig = require("./note-figures.cjs");
const { C, esc } = fig;

/* --- a boxed step, for the two flow diagrams ------------------------ */
function box(x, y, w, h, title, detail, tone = "gold") {
  const stroke = tone === "muted" ? C.muted : C.gold;
  const fill = tone === "muted" ? "none" : C.goldFillSoft;
  const parts = [
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="1.6"/>`,
    fig.text(x + w / 2, y + (detail ? h / 2 - 4 : h / 2 + 4), title, { anchor: "middle", fill: C.ink, size: 13, weight: "600" }),
  ];
  if (detail) parts.push(fig.text(x + w / 2, y + h / 2 + 15, detail, { anchor: "middle", size: 11.5 }));
  return parts.join("\n");
}

function downArrow(x, y) {
  return [
    `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + 26}" stroke="${C.muted}" stroke-width="1.8"/>`,
    `<polygon points="${x},${y + 30} ${x - 5},${y + 21} ${x + 5},${y + 21}" fill="${C.muted}"/>`,
  ].join("\n");
}

/* ------------------------------------------------------------------ */
/* 1. Circular measure — the sector, drawn                             */
/* ------------------------------------------------------------------ */

const sector = (() => {
  // Geometry worked out once here rather than eyeballed: the centre sits low-left
  // so the sector opens up-right, and every label has empty space to sit in —
  // the first version put three labels on top of the fill.
  const ox = 110;
  const oy = 270;
  const r = 180;
  const deg = 55;
  const rad = (deg * Math.PI) / 180;
  const ax = ox + r;
  const ay = oy;
  const bx = ox + r * Math.cos(rad);
  const by = oy - r * Math.sin(rad);
  const parts = [];
  parts.push(`<path d="M${ox} ${oy} L${ax} ${ay} A${r} ${r} 0 0 0 ${bx.toFixed(1)} ${by.toFixed(1)} Z" fill="${C.goldFill}" stroke="${C.gold}" stroke-width="2"/>`);
  parts.push(`<line x1="${ox}" y1="${oy}" x2="${bx.toFixed(1)}" y2="${by.toFixed(1)}" stroke="${C.gold}" stroke-width="2"/>`);
  // The chord: the straight line between the same two points as the arc.
  parts.push(`<line x1="${ax}" y1="${ay}" x2="${bx.toFixed(1)}" y2="${by.toFixed(1)}" stroke="${C.muted}" stroke-width="1.3" stroke-dasharray="6 6"/>`);
  // The angle, drawn as an arc at the centre.
  const a1 = ox + 50;
  const a2x = ox + 50 * Math.cos(rad);
  const a2y = oy - 50 * Math.sin(rad);
  parts.push(`<path d="M${a1} ${oy} A50 50 0 0 0 ${a2x.toFixed(1)} ${a2y.toFixed(1)}" fill="none" stroke="${C.goldDeep}" stroke-width="1.6"/>`);
  parts.push(fig.text(ox + 56, oy - 20, "θ rad", { size: 12.5, fill: C.goldDeep, weight: "600" }));
  // Sides: the lower radius labelled below the line, the slanted one to its left.
  parts.push(fig.text((ox + ax) / 2, oy + 20, "r", { anchor: "middle", fill: C.ink, size: 13, weight: "600" }));
  parts.push(fig.text(ox + (r / 2) * Math.cos(rad) - 10, oy - (r / 2) * Math.sin(rad) + 4, "r", { anchor: "end", fill: C.ink, size: 13, weight: "600" }));
  parts.push(fig.text(ox - 6, oy + 18, "O", { anchor: "end", fill: C.muted, size: 12 }));
  // The arc, labelled outside the curve.
  const lx = ox + (r + 26) * Math.cos((deg / 2) * (Math.PI / 180));
  const ly = oy - (r + 26) * Math.sin((deg / 2) * (Math.PI / 180));
  parts.push(fig.text(lx, ly, "arc s = rθ", { anchor: "start", size: 12.5, fill: C.goldDeep, weight: "600" }));
  // Area label sits inside the sector, in the wide part near the centre line.
  parts.push(fig.text(ox + 42, oy - 44, "area = ½r²θ", { size: 12.5, fill: C.ink }));
  parts.push(fig.text(258, 198, "chord", { anchor: "start", size: 11.5 }));
  return fig.frame({
    id: "fig-cm-sector",
    title: "A sector of radius r with angle θ: the arc is rθ long and the area is ½r²θ",
    label: "Figure 1.",
    caption:
      "One sector, every quantity named. The arc is the piece of circumference the angle cuts off; the chord is the straight line between the same two points, and the area between chord and arc is the segment.",
    w: 520,
    h: 340,
    body: parts.join("\n"),
  });
})();

const circularSection = `
<h2>Reading a sector: the one drawing this topic is built on</h2>
<p>Every formula in circular measure comes from a single picture, and nearly every mistake comes from mixing up the two curves in it. Draw the sector once, label the radius, the angle and the arc, and the rest is arithmetic on that drawing.</p>
${sector}
<p><strong>Why the radian exists.</strong> An angle in radians is defined as the arc it cuts off divided by the radius:</p>
<p><strong>θ = s / r</strong> <em>Key:</em> θ = angle at the centre (rad); s = arc length (m); r = radius (m). The units cancel, so a radian is a pure ratio — one radius-length of arc per radius. That is why a full turn is 2π radians and not 360: the whole circumference is 2πr, so the angle it subtends is 2πr ÷ r = 2π.</p>
<p>Turn the definition around and you get the arc formula, which is the one you actually use:</p>
<p><strong>s = r θ</strong> <em>Key:</em> s = arc length (m); r = radius (m); θ = angle at the centre <strong>in radians</strong>. Using degrees here gives an answer 57 times too large — the single most common error in the topic.</p>
<p><strong>Where ½r²θ comes from.</strong> Cut the sector into many thin triangles, each with height r and a sliver of arc as its base. A triangle's area is ½ × base × height, so each sliver is ½ × (rΔθ) × r, and adding them all up gives ½r² × (total θ):</p>
<p><strong>A = ½ r² θ</strong> <em>Key:</em> A = area of the sector (m²); r = radius (m); θ = angle at the centre (rad). Notice that the arc is in this formula too — A = ½ r × (rθ) = ½ r s, which is the "thin triangle" statement written algebraically.</p>
<p><strong>Worked example.</strong> A sector has radius 9.0 cm and angle 1.2 rad. Find its arc length, its area, and the length of its chord.</p>
<p>arc: s = rθ = 9.0 × 1.2 = 10.8 cm<br>
area: A = ½r²θ = ½ × 81 × 1.2 = 48.6 cm²<br>
chord: the two radii and the chord form an isosceles triangle with sides 9.0, 9.0 and included angle 1.2 rad, so chord = 2 × 9.0 × sin(1.2/2) = 18 × 0.5646 = 10.2 cm</p>
<p>That last line is the step students skip, and it is the step the paper is testing: the chord is a straight line, so it needs trigonometry, not the arc formula. The segment area is then sector minus triangle, A = ½r²(θ − sin θ) = 48.6 − ½ × 81 × sin 1.2 = 48.6 − 37.7 = 10.9 cm².</p>
<p><strong>The perimeter of a sector is three sides, not one.</strong> A sector's boundary is the arc plus the two radii: P = 2r + rθ. For the example above, P = 18.0 + 10.8 = 28.8 cm. Answering with 10.8 alone is the most frequently lost mark on this topic, because the word "perimeter" invites you to think of the curve only.</p>
<p><strong>Where marks are lost.</strong> Degrees in an equation that needs radians (check the calculator is in RAD mode the moment a question says "radians"). Reading "arc" as "chord". Forgetting the two radii in a perimeter. And using ½r²θ for a segment — the segment is the sector <em>minus</em> the triangle, and the triangle's area is ½r² sin θ.</p>
`;

/* ------------------------------------------------------------------ */
/* 2. Indices and standard form — the powers-of-ten ladder             */
/* ------------------------------------------------------------------ */

const ladder = (() => {
  const rows = [
    ["10⁶", "megametre (Mm) — 1,000 km"],
    ["10³", "kilometre (km) — 1,000 m"],
    ["10⁰", "metre (m)"],
    ["10⁻¹", "decimetre (dm) — 10 cm"],
    ["10⁻²", "centimetre (cm) — 0.01 m"],
    ["10⁻³", "millimetre (mm) — 0.001 m"],
    ["10⁻⁶", "micrometre (μm) — a cell, a bacterium"],
    ["10⁻⁹", "nanometre (nm) — a molecule, a wavelength of light"],
  ];
  const x0 = 96;
  const top = 46;
  const gap = 30;
  const parts = [
    `<line x1="${x0}" y1="${top - 8}" x2="${x0}" y2="${top + gap * rows.length - 10}" stroke="${C.muted}" stroke-width="1.6"/>`,
  ];
  rows.forEach(([pow, what], i) => {
    const y = top + i * gap;
    parts.push(`<line x1="${x0 - 7}" y1="${y}" x2="${x0 + 7}" y2="${y}" stroke="${C.muted}" stroke-width="1.6"/>`);
    parts.push(fig.text(x0 - 16, y + 4.5, pow, { anchor: "end", fill: C.goldDeep, weight: "600", size: 13 }));
    parts.push(`<circle cx="${x0}" cy="${y}" r="2.6" fill="${C.gold}"/>`);
    parts.push(fig.text(x0 + 22, y + 4.5, what, { fill: C.ink, size: 12.5 }));
  });
  parts.push(fig.text(x0 - 16, top - 22, "power", { anchor: "end", size: 11.5 }));
  return fig.frame({
    id: "fig-ix-ladder",
    title: "The powers-of-ten ladder: each step up multiplies by ten and adds one to the index",
    label: "Figure 1.",
    caption:
      "The ladder every conversion walks along. One rung up is ×10 and one more on the index; one rung down is ÷10. Standard form is just a position on this ladder, written as a number between 1 and 10 multiplied by the rung you are on.",
    w: 520,
    h: top + gap * rows.length + 46,
    body: parts.join("\n"),
  });
})();

const indicesSection = `
<h2>The powers-of-ten ladder: seeing standard form instead of memorising it</h2>
<p>Indices look like a rule to memorise and are really a picture to read. Every quantity in the course sits somewhere on one ladder of powers of ten, and multiplying, dividing and converting all move you up or down that ladder by whole rungs.</p>
${ladder}
<p><strong>One rung, one index.</strong> Moving up a rung multiplies by 10, and that is exactly what adding 1 to the index does: 10³ × 10 = 10⁴. Moving down divides by 10 and subtracts 1. Every index law is that sentence applied twice:</p>
<p><strong>aᵐ × aⁿ = aᵐ⁺ⁿ</strong> <em>Key:</em> a = the base; m and n = the indices (powers). Multiplying adds the indices because each factor contributes its own rungs.<br>
<strong>aᵐ ÷ aⁿ = aᵐ⁻ⁿ</strong> <em>Key:</em> dividing subtracts, because dividing by aⁿ is multiplying by a⁻ⁿ.<br>
<strong>(aᵐ)ⁿ = aᵐⁿ</strong> <em>Key:</em> a bracket applied n times multiplies the rungs by n.<br>
<strong>a⁰ = 1</strong> and <strong>a⁻ⁿ = 1 / aⁿ</strong> <em>Key:</em> both follow from the subtraction law: a³ ÷ a³ = a⁰ must be 1, and a² ÷ a⁵ = a⁻³ must be 1/a³.</p>
<p><strong>Standard form is a position on the ladder.</strong> A number is in standard form when it is written as</p>
<p><strong>N = A × 10ⁿ</strong> <em>Key:</em> A = a number with 1 ≤ A &lt; 10 (one non-zero digit before the point); n = a whole number, positive for large values and negative for small ones. 4.2 × 10³ means four decimal places' worth of rungs above 1: 4,200.</p>
<p><strong>Converting is counting rungs, not guessing the sign.</strong> To write 47,500 in standard form, move the point left until one digit remains in front: 4.75, which is three moves, so the index is +3 and the value is 4.75 × 10⁴. To write 0.00062, move the point right until one digit remains in front: 6.2, which is four moves, so the index is −4 and the value is 6.2 × 10⁻⁴. <strong>Left is positive, right is negative</strong> — the point moving right on a small number gives a negative index, which is the sign students most often flip.</p>
<p><strong>Worked example.</strong> A red blood cell has diameter 0.0000072 m and a virus 1.2 × 10⁻⁷ m. Write the cell in standard form and find how many times longer it is.</p>
<p>cell: 0.0000072 = 7.2 × 10⁻⁶ m (six moves right)<br>
ratio: (7.2 × 10⁻⁶) ÷ (1.2 × 10⁻⁷) = (7.2 ÷ 1.2) × 10⁻⁶⁻⁽⁻⁷⁾ = 6.0 × 10¹ = 60</p>
<p>The division law did the work: subtracting a negative index adds. Doing that sum as −6 − 7 = −13 is the error that turns 60 into 0.0000000000006.</p>
<p><strong>Estimating with the ladder.</strong> A calculation like (4.9 × 10⁵) × (2.1 × 10³) is roughly 5 × 2 = 10 times 10⁵⁺³ = 10⁸, so about 1.0 × 10⁹ before any calculator. This is how you catch a wrong power of ten — the most common way a correct method still loses the answer mark.</p>
<p><strong>Where marks are lost.</strong> Writing 0.42 × 10⁴ or 42 × 10² and calling it standard form: A must be at least 1 and less than 10. Flipping the sign of the index on a small number. And adding indices when multiplying <em>different</em> bases — 2³ × 3² is 8 × 9 = 72, not 6⁵.</p>
`;

/* ------------------------------------------------------------------ */
/* 3. AS proof — the shape of a contradiction                          */
/* ------------------------------------------------------------------ */

const contradictionFlow = fig.frame({
  id: "fig-pf-contradiction",
  title: "The three steps of a proof by contradiction: suppose the opposite, derive an impossibility, conclude",
  label: "Figure 1.",
  caption:
    "Proof by contradiction has three steps and a fixed order. The middle step is the only creative one; the first and last are the same sentences every time, which is why this method is worth rehearsing as a template.",
  w: 520,
  h: 300,
  body: [
    box(60, 16, 400, 58, "1. Suppose the statement is false", "assume the opposite of what you must prove"),
    downArrow(260, 78),
    box(60, 112, 400, 58, "2. Deduce something impossible", "a contradiction with a known fact, or with step 1"),
    downArrow(260, 174),
    box(60, 208, 400, 58, "3. Therefore the statement is true", "the assumption was false, so its opposite holds", "muted"),
  ].join("\n"),
});

const proofAsSection = `
<h2>The three shapes of a proof — and how to choose between them</h2>
<p>A proof is not a longer calculation; it is an argument with a shape. There are only three shapes in this specification, each fits a different kind of statement, and recognising which one a question wants is most of the mark.</p>
${contradictionFlow}
<p><strong>Shape 1: direct proof.</strong> Start from the definition, do algebra, arrive at the thing you were asked to show. It is the right choice whenever the statement is about all numbers of a kind, because a variable stands for all of them at once. "The sum of two consecutive integers is odd" is three lines: let them be n and n + 1, then n + (n + 1) = 2n + 1, which is odd by definition.</p>
<p><strong>Shape 2: exhaustion.</strong> When there are finitely many cases, check them all and say so. It is a real proof — but only because the list is complete.</p>
<p><strong>Shape 3: contradiction.</strong> When the statement denies something ("there is no greatest prime", "√2 is irrational"), assume the opposite and show it cannot stand. The template above is the whole method; the work is entirely in step 2.</p>
<p><strong>The sentence that makes step 2 work.</strong> Whatever you deduce must contradict something already established — a definition, a theorem you have proved, or the assumption you made in step 1. In the √2 proof the contradiction is that a fraction is shown to be reducible when it was written in lowest terms, and the words that carry it are "but this contradicts the assumption that a and b have no common factor".</p>
<p><strong>Why a counter-example is not a proof.</strong> One example can <em>disprove</em> a universal statement and can never prove one: "n² + n + 41 is prime for n = 1, 2, 3" is true and worthless, because n = 41 breaks it. If a question says "prove", an example earns nothing; if it says "disprove", one counter-example is a complete answer.</p>
<p><strong>Worked example.</strong> Prove that if n² is even then n is even.</p>
<p>Suppose instead that n is odd. Then n = 2k + 1 for some integer k, so<br>
n² = (2k + 1)² = 4k² + 4k + 1 = 2(2k² + 2k) + 1<br>
which is odd, because it is one more than a multiple of 2. But we were told n² is even, and a number cannot be both odd and even — a contradiction. Therefore n cannot be odd, so n is even. ∎</p>
<p>Two details earn marks that students routinely drop: <em>stating the form of the variable</em> ("n = 2k + 1 for some integer k", not "n is odd so write it as something odd"), and <em>naming the contradiction</em> rather than stopping at the algebra. The ∎ is optional; the sentence that says what was contradicted is not.</p>
<p><strong>Where marks are lost.</strong> Assuming what you are proving (writing "n² = 2m and n = 2k" straight away). Using the converse by accident — proving "n even ⇒ n² even" when the question asked the other way round. And ending with "therefore it is true" without saying <em>what</em> is true and <em>why</em> the assumption failed.</p>
`;

/* ------------------------------------------------------------------ */
/* 4. A2 proof — how the marks are laid out                            */
/* ------------------------------------------------------------------ */

const proofDecision = fig.frame({
  id: "fig-pf-choose",
  title: "Choosing a proof method: universal statements need an argument, existence statements need one example or one counter-example",
  label: "Figure 1.",
  caption:
    "The first question is not which algebra to use but what kind of statement you have been given. A universal claim about every case cannot be settled by examples, and an existence claim does not need an argument at all.",
  w: 520,
  h: 300,
  body: [
    box(60, 14, 400, 52, "Read the statement: is it about every case?", "“for all n”, “always”, “every triangle”"),
    `<line x1="260" y1="66" x2="260" y2="86" stroke="${C.muted}" stroke-width="1.8"/>`,
    `<line x1="130" y1="86" x2="390" y2="86" stroke="${C.muted}" stroke-width="1.8"/>`,
    `<line x1="130" y1="86" x2="130" y2="104" stroke="${C.muted}" stroke-width="1.8"/>`,
    `<polygon points="130,112 125,103 135,103" fill="${C.muted}"/>`,
    `<line x1="390" y1="86" x2="390" y2="104" stroke="${C.muted}" stroke-width="1.8"/>`,
    `<polygon points="390,112 385,103 395,103" fill="${C.muted}"/>`,
    box(18, 112, 224, 66, "Yes — argue in general", "direct proof, exhaustion, or contradiction"),
    box(268, 112, 224, 66, "No — exhibit a case", "a counter-example disproves it outright", "muted"),
    fig.text(130, 210, "One example never proves a universal claim.", { anchor: "middle", size: 11.5 }),
    fig.text(390, 210, "A single counter-example settles it.", { anchor: "middle", size: 11.5 }),
    fig.text(260, 240, "Then set it out in the four lines the mark scheme reads for:", { anchor: "middle", size: 11.5, fill: C.ink }),
    box(60, 252, 400, 34, "assumption → algebra → conclusion → what it shows", "", "muted"),
  ].join("\n"),
});

const proofA2Section = `
<h2>How a proof is marked: the four lines that earn the marks</h2>
<p>At A level the algebra is rarely the hard part — the marking is. A proof is read for four things, in order, and a script that has all the algebra but none of the signposting loses marks that were never in doubt.</p>
${proofDecision}
<p><strong>Line 1: state what you are working with.</strong> Introduce every variable and say what kind of object it is: "let n be an integer", "let x and y be real numbers with x &lt; y". Every mark that depends on parity or divisibility hangs off this line, because without it the algebra could be about anything.</p>
<p><strong>Line 2: the algebra, one implication at a time.</strong> Each step must follow from the previous one, and the connector says which way the logic runs. "⇒" means the next line follows; a proof needs that direction, not its converse. Writing = between two expressions that are merely equal in value at the end is not the same as showing one implies the other.</p>
<p><strong>Line 3: name the conclusion.</strong> "Therefore n² + n is always even, for every integer n." A proof that stops at the algebra leaves the marker to infer the point, and that inference is the mark.</p>
<p><strong>Line 4: say what the conclusion shows about the original statement.</strong> In a contradiction this is the sentence that names what was contradicted; in exhaustion it is "these cases are exhaustive, so the result holds in all cases"; in direct proof it is "as required".</p>
<p><strong>Worked example.</strong> Prove that x² + 4x + 7 &gt; 0 for all real x.</p>
<p>Complete the square:<br>
x² + 4x + 7 = (x + 2)² − 4 + 7 = (x + 2)² + 3</p>
<p>Now argue from a fact about squares: (x + 2)² ≥ 0 for every real x, so (x + 2)² + 3 ≥ 3 &gt; 0. Hence x² + 4x + 7 &gt; 0 for all real x.</p>
<p>The line (x + 2)² ≥ 0 is not decoration: it is the only reason the conclusion holds, and the mark scheme wants it written. The same argument answers "show this quadratic has no real roots" — the completed-square form shows the minimum value, and a minimum above zero cannot touch the axis.</p>
<p><strong>The three ways this goes wrong.</strong> Assuming the result and working towards something true — that proves nothing, because a false statement can imply a true one. Using "if and only if" when only one direction was proved. And proving the converse: "if n is even then n² is even" is a different statement from "if n² is even then n is even", and only the second needs contradiction.</p>
<p><strong>Reading the question's verbs.</strong> "Show that" wants a derivation from given facts. "Prove" wants the argument with its assumptions stated. "Disprove" wants one counter-example and no more. "Determine whether" wants a decision plus its justification — and the mark is for the decision being argued, not merely stated.</p>
`;

module.exports = {
  sections: [
    {
      id: "929796bd-05c8-46af-85a3-af6815541b09",
      slug: "circular-measure-sector",
      heading: "Reading a sector: the one drawing this topic is built on",
      html: circularSection,
    },
    {
      id: "e1c1569d-a45c-4ebe-8012-6df10e500034",
      slug: "indices-powers-of-ten-ladder",
      heading: "The powers-of-ten ladder: seeing standard form instead of memorising it",
      html: indicesSection,
    },
    {
      id: "1da2d645-3b35-4626-9a02-59685e70c60a",
      slug: "proof-as-shapes",
      heading: "The three shapes of a proof — and how to choose between them",
      html: proofAsSection,
    },
    {
      id: "f8fe66ce-4d84-4329-9cb4-7dd7fc8825a1",
      slug: "proof-a2-marking",
      heading: "How a proof is marked: the four lines that earn the marks",
      html: proofA2Section,
    },
  ],
};
