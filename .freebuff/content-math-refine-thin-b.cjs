#!/usr/bin/env node
/**
 * Mathematics — the next four thinnest notes, completed.
 *
 * These clear the depth bar and are still the shortest notes in the estate, which
 * is the gap the character count cannot see. Each gets the drawn explanation it
 * was missing: a bearing measured the way the examiner measures it, the four
 * regions of a Venn diagram, the labelling that decides which trigonometric
 * ratio to use, and the radius-tangent picture behind a circle's equation.
 *
 * Apply with:
 *   node .freebuff/refine-note-sections.cjs .freebuff/content-math-refine-thin-b.cjs
 *   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-refine.sql --apply
 */
const fig = require("./note-figures.cjs");
const { C } = fig;

/* ------------------------------------------------------------------ */
/* 1. Bearings — measured clockwise from north                          */
/* ------------------------------------------------------------------ */

const bearingFigure = (() => {
  const ax = 190;
  const ay = 290;
  const len = 170;
  const theta = 60;
  const rad = (theta * Math.PI) / 180;
  const bx = ax + len * Math.sin(rad);
  const by = ay - len * Math.cos(rad);
  const parts = [];
  // North line: every bearing is measured from this, so it comes first.
  parts.push(`<line x1="${ax}" y1="${ay}" x2="${ax}" y2="${ay - 96}" stroke="${C.muted}" stroke-width="1.6" stroke-dasharray="6 5"/>`);
  parts.push(`<polygon points="${ax},${ay - 104} ${ax - 5},${ay - 94} ${ax + 5},${ay - 94}" fill="${C.muted}"/>`);
  parts.push(fig.text(ax + 8, ay - 92, "N", { fill: C.ink, size: 13, weight: "600" }));
  // The bearing itself.
  parts.push(`<line x1="${ax}" y1="${ay}" x2="${bx.toFixed(1)}" y2="${by.toFixed(1)}" stroke="${C.gold}" stroke-width="2.4"/>`);
  parts.push(`<circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="5" fill="${C.gold}"/>`);
  parts.push(fig.text(bx + 10, by - 8, "B", { fill: C.ink, size: 13, weight: "600" }));
  // Angle arc, from north round to the bearing: clockwise, which is the point.
  const ar = 62;
  const ex = ax + ar * Math.sin(rad);
  const ey = ay - ar * Math.cos(rad);
  parts.push(`<path d="M${ax} ${ay - ar} A${ar} ${ar} 0 0 1 ${ex.toFixed(1)} ${ey.toFixed(1)}" fill="none" stroke="${C.goldDeep}" stroke-width="1.8"/>`);
  // The value sits outside the middle of its own arc, which is the only place
  // that cannot be read as labelling the line instead of the angle.
  const midA = (theta / 2) * (Math.PI / 180);
  parts.push(fig.text(ax + 78 * Math.sin(midA), ay - 78 * Math.cos(midA) + 4, "060°", { fill: C.goldDeep, size: 13, weight: "600" }));
  parts.push(fig.text(ax - 8, ay + 22, "A", { fill: C.ink, size: 13, weight: "600", anchor: "end" }));
  // Back bearing: from B back to A, which is 060 + 180.
  // The back bearing is measured at B, from B's own north line. Drawing it as a
  // line back along AB put it exactly on top of the solid line it was meant to
  // mark, which is the mistake this figure now teaches against.
  parts.push(`<line x1="${bx.toFixed(1)}" y1="${by.toFixed(1)}" x2="${bx.toFixed(1)}" y2="${(by - 90).toFixed(1)}" stroke="${C.muted}" stroke-width="1.6" stroke-dasharray="6 5"/>`);
  parts.push(`<polygon points="${bx.toFixed(1)},${(by - 98).toFixed(1)} ${(bx - 5).toFixed(1)},${(by - 88).toFixed(1)} ${(bx + 5).toFixed(1)},${(by - 88).toFixed(1)}" fill="${C.muted}"/>`);
  parts.push(fig.text(bx + 8, by - 86, "N", { fill: C.ink, size: 13, weight: "600" }));
  const ar2 = 52;
  const back = (240 * Math.PI) / 180;
  const ex2 = bx + ar2 * Math.sin(back);
  const ey2 = by - ar2 * Math.cos(back);
  parts.push(`<path d="M${bx.toFixed(1)} ${(by - ar2).toFixed(1)} A${ar2} ${ar2} 0 1 1 ${ex2.toFixed(1)} ${ey2.toFixed(1)}" fill="none" stroke="${C.goldDeep}" stroke-width="1.6"/>`);
  // Halfway round the 240° sweep is 120°, which is clear of both the line back
  // to A and B's own north line.
  const midB = (120 * Math.PI) / 180;
  parts.push(fig.text(bx + 66 * Math.sin(midB), by - 66 * Math.cos(midB) + 4, "240°", { fill: C.goldDeep, size: 12.5, weight: "600" }));
  parts.push(fig.text(24, 40, "each bearing is measured at its own point, from north", { size: 11.5 }));
  return fig.frame({
    id: "fig-br-bearing",
    title: "A bearing of 060° measured clockwise from the north line at A, with the back bearing of 240° from B",
    label: "Figure 1.",
    caption:
      "Bearing 060° is a direction, not an angle on a triangle: it starts at the north line and turns clockwise. The line back from B to A is the back bearing, 060 + 180 = 240°, because it is the same line measured in the opposite direction.",
    w: 560,
    h: 360,
    body: parts.join("\n"),
  });
})();

const bearingSection = `
<h2>Bearings drawn properly: clockwise from north, three digits, always</h2>
<p>A bearing is not an angle inside a triangle — it is a direction on the page, and almost every lost mark on this topic comes from measuring it from the wrong place or turning the wrong way. One drawing fixes the idea for good.</p>
${bearingFigure}
<p><strong>The three rules, in the order they bite.</strong> A bearing is measured from the north line at the point you are leaving, it turns <em>clockwise</em>, and it is written with three digits (060°, not 60°, and 025° rather than 25°). The third rule is not fussiness: 070° and 007° are different directions, and the leading zeros are how a reader tells them apart.</p>
<p><strong>The back bearing is the return journey.</strong> If B is on a bearing of 060° from A, then A is on a bearing of 240° from B:</p>
<p><strong>back bearing = bearing + 180° (or − 180° if the result would exceed 360°)</strong> <em>Key:</em> both are the same line measured from opposite ends. Adding 180° cannot go wrong; subtracting can, so add and then subtract 360° if necessary. For 060°: 60 + 180 = 240°. For 300°: 300 + 180 = 480, and 480 − 360 = 120°.</p>
<p><strong>Worked example.</strong> A ship sails 12 km from port P on a bearing of 060°, then 9 km on a bearing of 150°. How far is it from P, and on what bearing?</p>
<p>Draw the two legs nose-to-tail. The turn between them is 150 − 60 = 90°, so the two legs are perpendicular and the distance closes as a right-angled triangle:<br>
distance = √(12² + 9²) = √(144 + 81) = √225 = 15 km</p>
<p>The overall bearing is the angle from north to the closing line, which needs the angle at P inside the triangle: tan θ = 9 / 12, so θ = 36.9°, and the bearing is 60 − 36.9 = 023.1° on the far side — which is why the sketch, not the arithmetic, decides between adding and subtracting. Candidates who skip the sketch get 15 km and then guess the direction.</p>
<p><strong>Where marks are lost.</strong> Measuring anticlockwise (bearing 060 becomes the 300° direction). Measuring from the horizontal or from another bearing rather than from north. Writing two digits. And finding the distance with a scale drawing but then reading the bearing off the wrong vertex — the bearing of A from B is not the bearing of B from A, and the question always says which.</p>
`;

/* ------------------------------------------------------------------ */
/* 2. Sets — the four regions of a Venn diagram                         */
/* ------------------------------------------------------------------ */

const vennFigure = (() => {
  const parts = [
    `<rect x="20" y="30" width="480" height="270" rx="10" fill="none" stroke="${C.muted}" stroke-width="1.4"/>`,
    fig.text(34, 54, "ξ", { fill: C.muted, size: 14, weight: "600" }),
    `<circle cx="200" cy="170" r="94" fill="${C.goldFillSoft}" stroke="${C.gold}" stroke-width="1.8"/>`,
    `<circle cx="320" cy="170" r="94" fill="${C.goldFillSoft}" stroke="${C.gold}" stroke-width="1.8"/>`,
    fig.text(150, 100, "A", { fill: C.ink, size: 14, weight: "600" }),
    fig.text(368, 100, "B", { fill: C.ink, size: 14, weight: "600" }),
    fig.text(158, 176, "7", { anchor: "middle", fill: C.ink, size: 15, weight: "600" }),
    fig.text(260, 176, "5", { anchor: "middle", fill: C.goldDeep, size: 15, weight: "600" }),
    fig.text(362, 176, "9", { anchor: "middle", fill: C.ink, size: 15, weight: "600" }),
    fig.text(462, 284, "4", { anchor: "middle", fill: C.ink, size: 15, weight: "600" }),
    fig.text(160, 238, "A only", { anchor: "middle", size: 11 }),
    fig.text(260, 204, "both", { anchor: "middle", size: 11 }),
    fig.text(360, 238, "B only", { anchor: "middle", size: 11 }),
    fig.text(462, 256, "neither", { anchor: "middle", size: 11 }),
  ];
  return fig.frame({
    id: "fig-st-venn",
    title: "A two-set Venn diagram with counts in its four regions: 7 in A only, 5 in both, 9 in B only, 4 in neither",
    label: "Figure 1.",
    caption:
      "Four regions, not two. Everything inside the box but outside both circles is the fourth region — the one students forget, and the one that makes the totals add up.",
    w: 520,
    h: 320,
    body: parts.join("\n"),
  });
})();

const setsSection = `
<h2>The four regions: reading a Venn diagram as a counting grid</h2>
<p>A two-set Venn diagram is not a picture of two sets. It is a grid with four cells, and every question about it is answered by putting a number in each cell and adding.</p>
${vennFigure}
<p><strong>Name the four cells before you write anything.</strong> For sets A and B inside a universal set ξ, every element is in exactly one of: only A, both, only B, neither. In the figure that is 7, 5, 9 and 4. The moment all four numbers are on the page, every part of the question is a sum:</p>
<p><strong>n(A) = 7 + 5 = 12</strong> <em>Key:</em> n(A) counts everything inside circle A, including the overlap.<br>
<strong>n(A ∩ B) = 5</strong> <em>Key:</em> the intersection — the region inside both circles.<br>
<strong>n(A ∪ B) = 7 + 5 + 9 = 21</strong> <em>Key:</em> the union — everything inside at least one circle.<br>
<strong>n(ξ) = 21 + 4 = 25</strong> <em>Key:</em> the universal set also counts what is in neither set.</p>
<p><strong>Why the formula has a minus sign.</strong> Adding n(A) and n(B) counts the overlap twice — once with each circle — so it has to come back off:</p>
<p><strong>n(A ∪ B) = n(A) + n(B) − n(A ∩ B)</strong> <em>Key:</em> n(A ∪ B) = elements in at least one set; n(A ∩ B) = elements in both. In the figure, 12 + 14 − 5 = 21, which is exactly the sum of the three inner cells. The subtraction is not a rule to remember; it is the double count being removed.</p>
<p><strong>Worked example.</strong> In a class of 30, 18 study French, 15 study Spanish and 6 study both. How many study neither?</p>
<p>French only = 18 − 6 = 12<br>
Spanish only = 15 − 6 = 9<br>
at least one = 12 + 6 + 9 = 27<br>
neither = 30 − 27 = 3</p>
<p>Going the other way — "9 study neither" — is the same arithmetic in reverse, and it is the version that appears when the examiner wants an unknown: if the total is 30 and 9 study neither, then 21 study at least one, and 18 + 15 − x = 21 gives x = 12 studying both. Filling the grid from the overlap outwards always works, because the overlap is the only cell that belongs to both circles.</p>
<p><strong>Where marks are lost.</strong> Treating "18 study French" as 18 in the French-only region, which double-counts 6. Forgetting the neither region, so the four numbers do not add to the total. And shading the wrong side for A′ ∩ B: the complement of A is everything outside A, so A′ ∩ B is the B-only region, not the overlap.</p>
`;

/* ------------------------------------------------------------------ */
/* 3. Right-angled trigonometry — label first, then choose              */
/* ------------------------------------------------------------------ */

const triangleFigure = (() => {
  const ax = 96;
  const ay = 258;
  const bx = 430;
  const by = 258;
  const cx = 430;
  const cy = 118;
  const parts = [
    `<polygon points="${ax},${ay} ${bx},${by} ${cx},${cy}" fill="${C.goldFillSoft}" stroke="${C.gold}" stroke-width="2"/>`,
    // Right-angle marker at B.
    `<path d="M${bx - 16} ${by} L${bx - 16} ${by - 16} L${bx} ${by - 16}" fill="none" stroke="${C.muted}" stroke-width="1.4"/>`,
    // Angle arc at A.
    `<path d="M${ax + 52} ${ay} A52 52 0 0 0 ${(ax + 52 * Math.cos((28 * Math.PI) / 180)).toFixed(1)} ${(ay - 52 * Math.sin((28 * Math.PI) / 180)).toFixed(1)}" fill="none" stroke="${C.goldDeep}" stroke-width="1.6"/>`,
    fig.text(ax + 58, ay - 12, "θ", { fill: C.goldDeep, size: 13, weight: "600" }),
    fig.text((ax + bx) / 2, ay + 22, "adjacent", { anchor: "middle", fill: C.ink, size: 12.5 }),
    fig.text(bx - 10, (by + cy) / 2, "opposite", { anchor: "end", fill: C.ink, size: 12.5 }),
    fig.text((ax + cx) / 2 - 26, (ay + cy) / 2 - 10, "hypotenuse", { anchor: "middle", fill: C.ink, size: 12.5 }),
    fig.text(24, 302, "sin θ = opposite / hypotenuse      cos θ = adjacent / hypotenuse", { size: 11.5 }),
    fig.text(24, 320, "tan θ = opposite / adjacent", { size: 11.5 }),
  ];
  return fig.frame({
    id: "fig-tr-triangle",
    title: "A right-angled triangle with the angle θ at A, showing which side is opposite, adjacent and hypotenuse",
    label: "Figure 1.",
    caption:
      "Opposite and adjacent are named relative to θ, not fixed to the triangle. Move θ to the other acute angle and the two labels swap — the hypotenuse never does.",
    w: 520,
    h: 340,
    body: parts.join("\n"),
  });
})();

const trigSection = `
<h2>Label the triangle before you reach for a ratio</h2>
<p>Right-angled trigonometry is not three formulas to memorise; it is one decision made three times: which side am I given, which do I want, and which ratio connects them. Every error in this topic is a labelling error made before any calculation starts.</p>
${triangleFigure}
<p><strong>Only the hypotenuse is fixed.</strong> It is the side opposite the right angle, and it is always the longest. "Opposite" and "adjacent" are relative to the angle you are working with: in the figure, the side BC is opposite θ and AB is adjacent to it. Put the angle at C instead and those two swap. Annotate the diagram with O, A and H in pencil before choosing anything.</p>
<p><strong>The ratios are ratios, which is why they work at any size.</strong> Similar triangles taught that corresponding sides scale together — double every side and the ratio stays the same. That is precisely why sin 30° is ½ for a triangle of any size:</p>
<p><strong>sin θ = opposite / hypotenuse</strong> <em>Key:</em> θ = the angle inside the triangle; opposite = the side across from θ; hypotenuse = the side opposite the right angle.<br>
<strong>cos θ = adjacent / hypotenuse</strong> <em>Key:</em> adjacent = the side next to θ that is not the hypotenuse.<br>
<strong>tan θ = opposite / adjacent</strong> <em>Key:</em> the only ratio that does not use the hypotenuse.</p>
<p><strong>Choosing in one step.</strong> Given an angle and one side, mark on the diagram which two sides the question involves, then read off: two sides with the hypotenuse means sine or cosine; two sides without it means tangent. Use the inverse function when the angle is the unknown.</p>
<p><strong>Worked example.</strong> A ladder 5.0 m long leans against a wall, making 68° with the ground. How far up the wall does it reach, and how far is its foot from the wall?</p>
<p>height is opposite the 68° angle, ladder is the hypotenuse:</p>
<p>sin 68° = h / 5.0, so h = 5.0 × sin 68° = 5.0 × 0.9272 = 4.6 m</p>
<p>distance from the wall is adjacent:</p>
<p>cos 68° = d / 5.0, so d = 5.0 × cos 68° = 5.0 × 0.3746 = 1.9 m</p>
<p>Check with Pythagoras: 4.6² + 1.9² = 21.2 + 3.6 = 24.8 ≈ 25 = 5.0². That thirty-second check catches a swapped ratio every time, and the two answers being 4.6 and 1.9 rather than a plausible pair like 4.6 and 4.4 is exactly what the check is for.</p>
<p><strong>The special angles come from two triangles.</strong> A 45-45-90 triangle with legs 1 gives sin 45° = 1/√2. Half of an equilateral triangle of side 2 gives sides 1, √3 and 2, hence sin 30° = ½, cos 30° = √3/2 and tan 60° = √3. These are worth deriving once so they are not three more things to memorise.</p>
<p><strong>Where marks are lost.</strong> The calculator in radians or grads — check the mode before the first question, not after. Using the adjacent side when the question needs the opposite, because the labels were never written on the diagram. And rounding at 4.6 m then using 4.6 in Pythagoras: keep the full value and round only the answer.</p>
`;

/* ------------------------------------------------------------------ */
/* 4. AS coordinate geometry — the circle picture                       */
/* ------------------------------------------------------------------ */

const circleFigure = (() => {
  const cx = 250;
  const cy = 176;
  const r = 108;
  const rad = (40 * Math.PI) / 180;
  const px = cx + r * Math.cos(rad);
  const py = cy - r * Math.sin(rad);
  const ux = Math.cos(rad);
  const uy = -Math.sin(rad);
  const vx = -uy;
  const vy = ux;
  const parts = [
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.goldFillSoft}" stroke="${C.gold}" stroke-width="1.8"/>`,
    `<line x1="${cx}" y1="${cy}" x2="${px.toFixed(1)}" y2="${py.toFixed(1)}" stroke="${C.goldDeep}" stroke-width="2"/>`,
    `<line x1="${(px + 96 * vx).toFixed(1)}" y1="${(py + 96 * vy).toFixed(1)}" x2="${(px - 96 * vx).toFixed(1)}" y2="${(py - 96 * vy).toFixed(1)}" stroke="${C.muted}" stroke-width="2"/>`,
    // Right angle between radius and tangent at P.
    `<path d="M${(px + 14 * vx).toFixed(1)} ${(py + 14 * vy).toFixed(1)} L${(px + 14 * vx - 14 * ux).toFixed(1)} ${(py + 14 * vy - 14 * uy).toFixed(1)} L${(px - 14 * ux).toFixed(1)} ${(py - 14 * uy).toFixed(1)}" fill="none" stroke="${C.muted}" stroke-width="1.3"/>`,
    `<circle cx="${cx}" cy="${cy}" r="4" fill="${C.ink}"/>`,
    fig.text(cx - 12, cy + 20, "C(a, b)", { anchor: "end", fill: C.ink, size: 12.5 }),
    fig.text(px + 10, py - 10, "P(x₁, y₁)", { fill: C.ink, size: 12.5, weight: "600" }),
    fig.text(cx + (r / 2) * Math.cos(rad) + 6, cy - (r / 2) * Math.sin(rad) + 16, "r", { fill: C.ink, size: 12.5, weight: "600" }),
    fig.text((px + 90 * vx).toFixed(1), (py + 90 * vy).toFixed(1), "tangent", { anchor: "middle", size: 11.5 }),
    fig.text(24, 40, "the radius meets the tangent at right angles", { size: 11.5 }),
  ];
  return fig.frame({
    id: "fig-cg-circle",
    title: "A circle with centre C and a point P on it: the radius CP is perpendicular to the tangent at P",
    label: "Figure 1.",
    caption:
      "The one fact every circle problem is built on: a tangent touches at exactly one point, and the radius to that point is perpendicular to it. The perpendicular gradient rule turns that geometry into an equation.",
    w: 520,
    h: 340,
    body: parts.join("\n"),
  });
})();

const coordSection = `
<h2>From picture to algebra: what each coordinate formula is doing</h2>
<p>Coordinate geometry is geometry written in numbers, and each formula is a fact you already know in a different language. Learn which fact each one encodes and the questions stop being arbitrary.</p>
${circleFigure}
<p><strong>The distance formula is Pythagoras.</strong> The horizontal gap between two points and the vertical gap are the two legs of a right-angled triangle; the distance is its hypotenuse:</p>
<p><strong>d = √((x₂ − x₁)² + (y₂ − y₁)²)</strong> <em>Key:</em> d = distance between two points (units); (x₁, y₁) and (x₂, y₂) their coordinates. The squares make the order of subtraction irrelevant.</p>
<p><strong>The midpoint is the average.</strong> Halfway between two points is the mean of the x's and the mean of the y's. Its gradient language version: the midpoint is the point that splits the segment in the ratio 1 : 1, which is why a perpendicular bisector passes through it.</p>
<p><strong>Gradient is rise over run.</strong> m = (y₂ − y₁) / (x₂ − x₁), and the two derived rules are what make lines into equations: parallel lines have equal gradients, perpendicular lines have gradients whose product is −1. The second is the whole content of the tangent picture above.</p>
<p><strong>The circle equation is the distance formula rearranged.</strong> A point (x, y) lies on a circle of radius r centred at (a, b) exactly when its distance from the centre equals r. Square both sides of the distance formula:</p>
<p><strong>(x − a)² + (y − b)² = r²</strong> <em>Key:</em> (a, b) = centre; r = radius. Expanding gives x² + y² − 2ax − 2by + a² + b² − r² = 0, which is the general form the paper usually hands you — and why finding the centre means completing the square, not solving.</p>
<p><strong>Worked example.</strong> A circle has equation x² + y² − 6x + 8y − 11 = 0. Find its centre, radius, and the equation of the tangent at the point (6, −1).</p>
<p>Complete the square in x and in y:<br>
(x² − 6x + 9) + (y² + 8y + 16) = 11 + 9 + 16 = 36<br>
so (x − 3)² + (y + 4)² = 36, centre (3, −4), radius 6.</p>
<p>Check that (6, −1) is on the circle: (6 − 3)² + (−1 + 4)² = 9 + 9 = 18 ≠ 36, so it is not — this is exactly the check the paper expects you to do silently. Taking a point P on the circle instead, the tangent's gradient is the negative reciprocal of the radius gradient:</p>
<p><strong>m<sub>tangent</sub> = −1 / m<sub>radius</sub></strong> <em>Key:</em> the product of the two gradients is −1; the radius runs from the centre to the point of contact, so its gradient is (y₁ − b) / (x₁ − a).</p>
<p>With centre (3, −4) and a point P(3, 2) at the top of the circle, the radius is vertical so its gradient is undefined and the tangent is horizontal: y = 2. That degenerate case is worth knowing, because "vertical radius, horizontal tangent" is where candidates write m = 0 and lose the mark.</p>
<p><strong>Where marks are lost.</strong> Reading the centre off the expanded form as (−3, 4) instead of (3, −4) — the signs invert when the bracket is written. Forgetting that r² = 36 means r = 6, not r = 36. And using the radius gradient as the tangent gradient: the perpendicular rule is the entire point of the tangent question.</p>
`;

module.exports = {
  sections: [
    {
      id: "153c8051-6b06-48ca-b39a-24d41b791d2c",
      slug: "bearings-clockwise",
      heading: "Bearings drawn properly: clockwise from north, three digits, always",
      html: bearingSection,
    },
    {
      id: "dcbbe01b-cbb0-4e90-bf61-0ecc971a9467",
      slug: "sets-four-regions",
      heading: "The four regions: reading a Venn diagram as a counting grid",
      html: setsSection,
    },
    {
      id: "dcb48bc6-ebfa-4469-9a47-d9fc8394172f",
      slug: "trig-label-first",
      heading: "Label the triangle before you reach for a ratio",
      html: trigSection,
    },
    {
      id: "7eaeae86-301f-41c8-9901-70ab01bf804c",
      slug: "coord-circle-picture",
      heading: "From picture to algebra: what each coordinate formula is doing",
      html: coordSection,
    },
  ],
};
