// Physics AS notes, deepened to the depth bar — Waves (statements 7.1-7.5),
// Superposition (8.1-8.4) and Quantum Physics (22.1-22.4). Board framing:
// Edexcel IAL Physics Units 1-2.
// Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-phy-as-a-depth.cjs > .freebuff-tmp/phy-as-a.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/phy-as-a.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/phy-as-a.sql --apply    (live)
module.exports = {
  expectType: "notes",
  titles: {
    "025cde37-5b9f-4913-bf5c-b8b4d99007af": "AS Level Physics: Waves",
    "013ebfea-e165-48f6-ad1d-2e01fd4e5214": "AS Level Physics: Superposition",
    "9078e0a1-ee3d-4cec-bb01-092369018e88": "AS Level Physics: Quantum Physics",
  },
  rows: {
    "025cde37-5b9f-4913-bf5c-b8b4d99007af": `
<h2>AS Level Physics: Waves</h2>
<p>Waves are how energy moves without matter moving with it — a statement that sounds abstract until you watch a crowd do the Mexican wave: the people stay in their seats while the disturbance travels the stadium. This note builds the full wave toolkit from zero: the vocabulary of progressive waves and the two graphs that encode them, the wave equation and its arithmetic, the difference between transverse and longitudinal waves, the Doppler effect for sound, the electromagnetic spectrum, and polarisation. Every quantity here is defined by how it is measured, and every calculation reduces to v = fλ applied carefully.</p>

<h3>What a wave is: the rope and the stadium</h3>
<p>Shake one end of a long rope: a crest travels to the far end, but the rope itself only moves up and down. That separation is the whole idea — a wave is a propagating disturbance that transfers energy and, in some cases, information, while the medium oscillates about fixed positions. Two families of wave carry the syllabus: mechanical waves (sound, water, waves on ropes — they need a medium) and electromagnetic waves (light, radio, X-rays — they need no medium and travel at c in vacuum).</p>

<h3>Progressive waves: the vocabulary</h3>
<p>A progressive wave transfers energy from place to place. Its quantities are defined on two graphs, and learning to read both is half the topic:</p>
<ul>
<li><strong>Displacement–distance graph</strong> (a snapshot, like a photograph of the rope): the horizontal axis is position along the wave, the vertical axis is displacement from equilibrium.</li>
<li><strong>Displacement–time graph</strong> (one point's diary): the horizontal axis is time, the vertical axis is the displacement of a single particle.</li>
</ul>
<table border="1" cellpadding="6">
<tr><th>Quantity</th><th>Symbol</th><th>Definition</th><th>Read from which graph</th></tr>
<tr><td>Displacement</td><td>x (m)</td><td>distance of a particle from equilibrium, with direction</td><td>vertical axis of both</td></tr>
<tr><td>Amplitude</td><td>A (m)</td><td>maximum displacement from equilibrium</td><td>peak height (both)</td></tr>
<tr><td>Wavelength</td><td>λ (m)</td><td>distance between two consecutive points in phase (crest to crest)</td><td>distance graph: crest-to-crest</td></tr>
<tr><td>Period</td><td>T (s)</td><td>time for one complete oscillation of one particle</td><td>time graph: one full cycle</td></tr>
<tr><td>Frequency</td><td>f (Hz)</td><td>number of complete oscillations per second, f = 1/T</td><td>calculated from T</td></tr>
<tr><td>Phase difference</td><td>φ (rad)</td><td>fraction of a cycle between two points, in radians (2π per cycle)</td><td>horizontal shift as a fraction of λ or T</td></tr>
<tr><td>Speed</td><td>v (m s⁻¹)</td><td>distance the disturbance travels per second</td><td>calculated from v = fλ</td></tr>
</table>
<p>Phase is worth an explicit definition because marks live there: two points are in phase when they are one or more whole wavelengths (or periods) apart — same displacement, moving in the same direction. They are in antiphase when separated by half a wavelength (π radians, 180°). A quarter wavelength is π/2 radians. The exam expects radians here.</p>

<h3>The wave equation and its arithmetic</h3>
<p>One speed, three expressions: in one period T a wave travels exactly one wavelength λ, so λ = vT and therefore</p>
<pre><code>v = f λ        f = 1/T        λ = vT</code></pre>
<p>Units discipline: v in m s⁻¹, f in Hz, λ in m. Convert before substituting: 3.4 cm = 0.034 m; 450 kHz = 4.5 × 10⁵ Hz.</p>
<p><strong>Worked example 1.</strong> A wave on a rope has frequency 2.5 Hz and wavelength 1.20 m. Find its speed and period.</p>
<pre><code>v = f λ = 2.5 x 1.20 = 3.0 m s-1
T = 1/f = 1/2.5 = 0.40 s</code></pre>
<p><strong>Worked example 2.</strong> A sound wave travels at 340 m s⁻¹ and has frequency 2.0 kHz. Find the wavelength in centimetres.</p>
<pre><code>f = 2.0 kHz = 2000 Hz
lambda = v/f = 340/2000 = 0.17 m
       = 17 cm</code></pre>
<p><strong>Worked example 3 (reading the graphs).</strong> On a displacement–distance graph, consecutive crests sit at 0.20 m and 0.65 m. A particle completes one oscillation in 0.020 s. Find v.</p>
<pre><code>lambda = 0.65 - 0.20 = 0.45 m
T = 0.020 s  ->  f = 1/0.020 = 50 Hz
v = f lambda = 50 x 0.45 = 22.5 m s-1</code></pre>
<p>Note the exam habit that prevents the commonest error: write the wavelength and period extractions as their own lines before any multiplication.</p>

<h3>Intensity: how the energy spreads</h3>
<p>Intensity is power per unit area, I = P/A, measured in W m⁻². For a wave spreading from a point source uniformly in three dimensions, the same power spreads over the surface of a sphere, so I = P/(4πr²) and intensity falls with the inverse square of distance. Amplitude matters too: intensity is proportional to the square of the amplitude, I ∝ A² — double the amplitude, quadruple the intensity.</p>
<p><strong>Worked example.</strong> A small source emits 4.0 W uniformly. Find the intensity 2.0 m away.</p>
<pre><code>I = P/(4 pi r^2) = 4.0/(4 x 3.14 x 2.0^2) = 4.0/50.3
  = 0.080 W m-2</code></pre>

<h3>Transverse and longitudinal waves</h3>
<p>The distinction is the angle between the oscillation and the travel direction:</p>
<table border="1" cellpadding="6">
<tr><th></th><th>Transverse</th><th>Longitudinal</th></tr>
<tr><td>Particle vibration</td><td>perpendicular to the direction of energy transfer</td><td>parallel to the direction of energy transfer</td></tr>
<tr><td>Features</td><td>crests and troughs; can be polarised</td><td>compressions and rarefactions; cannot be polarised</td></tr>
<tr><td>Examples</td><td>light and all EM waves, waves on strings, S-waves</td><td>sound in air, ultrasound in tissue, P-waves, spring coils</td></tr>
</table>
<p>A key exam consequence: because electromagnetic waves are transverse, they can be polarised; sound in air is longitudinal, so it cannot. The oscillation of the electric field vector in a light wave can be confined to one plane by a polarising filter — that is polarisation, and it is a property only transverse waves possess.</p>

<h3>The Doppler effect for sound</h3>
<p>When a source of sound moves relative to an observer, the observed frequency shifts: the wavefronts bunch up ahead of the source (higher pitch) and stretch out behind (lower pitch). Ambulances are the standard demonstration. For sound with source speed vₛ along the line joining source and observer, and sound speed v:</p>
<pre><code>source approaching observer:   f' = f v/(v - v_s)
source receding from observer: f' = f v/(v + v_s)</code></pre>
<p>The general form taught for exams: f' = f v/(v ∓ vₛ) with the minus sign for approach and the plus sign for recession; for a moving observer the roles swap (approaching observer: f' = f (v + v_o)/v). Learn the sign logic, not a mnemonic: less distance between wavefronts means higher frequency.</p>
<p><strong>Worked example.</strong> A car horn emits 400 Hz. The car approaches a stationary pedestrian at 25 m s⁻¹. Take the speed of sound as 340 m s⁻¹.</p>
<pre><code>approaching: f' = f v/(v - v_s) = 400 x 340/(340 - 25)
           = 136 000/315 = 432 Hz
receding:    f' = 400 x 340/(340 + 25) = 136 000/365 = 373 Hz</code></pre>
<p>The classic two-part question: the observer hears 432 Hz as the car arrives and 373 Hz as it leaves. The perceived shift is about 59 Hz in total — the difference of the two answers, not one answer.</p>
<p>Limitation to know: the formula above assumes the motion is along the line of source and observer, and it fails when vₛ approaches v (the denominator collapses) — at the speed of sound the wavefronts pile into a shock wave, the sonic boom.</p>

<h3>The electromagnetic spectrum</h3>
<p>All electromagnetic waves travel at c = 3.0 × 10⁸ m s⁻¹ in vacuum; they differ in frequency and wavelength, and their properties follow in an unbroken spectrum. The order is examinable in both directions:</p>
<table border="1" cellpadding="6">
<tr><th>Region (increasing frequency)</th><th>Wavelength scale</th><th>Typical uses and effects</th></tr>
<tr><td>Radio</td><td>10³–10⁻¹ m</td><td>broadcasting, communications, MRI signals</td></tr>
<tr><td>Microwave</td><td>10⁻¹–10⁻³ m</td><td>satellite links, mobile phones, ovens (water rotation)</td></tr>
<tr><td>Infrared</td><td>10⁻³–7 × 10⁻⁷ m</td><td>thermal imaging, remote controls, heating</td></tr>
<tr><td>Visible</td><td>7 × 10⁻⁷–4 × 10⁻⁷ m</td><td>vision, photography, fibre optics</td></tr>
<tr><td>Ultraviolet</td><td>4 × 10⁻⁷–10⁻⁸ m</td><td>sterilisation, fluorescence, vitamin D; sunburn risk</td></tr>
<tr><td>X-rays</td><td>10⁻⁸–10⁻¹¹ m</td><td>medical imaging, security scanning; ionising</td></tr>
<tr><td>Gamma</td><td>below 10⁻¹¹ m</td><td>sterilising equipment, cancer radiotherapy; ionising</td></tr>
</table>
<p>Shared properties: all transverse, all travel at c in vacuum, all obey v = fλ, all can be polarised. The property that changes down the table is photon energy — which is why the short-wavelength end (UV, X-ray, gamma) is ionising and dangerous to tissue.</p>

<h3>Polarisation in depth</h3>
<p>Unpolarised light has its electric field vector oscillating in every direction perpendicular to travel. A polarising filter passes only the component aligned with its axis — so a second filter (the analyser) at 90° to the first extinguishes the beam entirely. Intermediate angles pass a fraction of the intensity. Practical applications are examinable: Polaroid sunglasses cut glare (glare from roads and water is partially polarised by reflection), and radio aerials must be aligned with the polarisation of the signal.</p>
<p><strong>Worked example.</strong> Unpolarised light of intensity I₀ passes one polariser. What fraction emerges, and what happens if a second polariser is added at 30° to the first?</p>
<pre><code>after 1st polariser: I1 = I0/2
2nd polariser at 30 deg: I2 = I1 cos^2(30) = (I0/2)(0.75)
                       = 0.375 I0</code></pre>
<p>The first filter halves unpolarised light; subsequent filters follow the cos²θ rule (an A-level standard result worth knowing for multiple-choice items).</p>

<h3>Worked examples: exam-style calculations</h3>
<p><strong>Worked example 1 (graph + equation).</strong> A student measures a wave: 5 full waves occupy 2.0 m, and 20 oscillations take 3.0 s. Find the wave speed.</p>
<pre><code>5 wavelengths in 2.0 m -> lambda = 2.0/5 = 0.40 m
20 oscillations in 3.0 s -> T = 3.0/20 = 0.15 s
f = 1/0.15 = 6.67 Hz
v = f lambda = 6.67 x 0.40 = 2.67 m s-1  (2 s.f.: 2.7 m s-1)</code></pre>
<p><strong>Worked example 2 (Doppler with unknown speed).</strong> A stationary observer hears 500 Hz from an approaching source and 420 Hz as it recedes. If v = 340 m s⁻¹, find the source speed.</p>
<pre><code>approach: 500 = f x 340/(340 - v_s)   ... (1)
recede:   420 = f x 340/(340 + v_s)   ... (2)
divide (1) by (2): 500/420 = (340 + v_s)/(340 - v_s)
1.190(340 - v_s) = 340 + v_s
404.6 - 1.190 v_s = 340 + v_s
64.6 = 2.190 v_s  ->  v_s = 29.5 m s-1  (2 s.f.: 30 m s-1)</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Definitions)</strong> Define wavelength and phase difference. <em>Answer:</em> Wavelength: the distance between consecutive points in phase, e.g. crest to crest. Phase difference: the fraction of an oscillation cycle between two oscillating points, expressed in radians (2π per complete cycle).</li>
<li><strong>(Wave equation)</strong> A radio wave has frequency 1.5 MHz. Find its wavelength (c = 3.0 × 10⁸ m s⁻¹). <em>Answer:</em> λ = c/f = 3.0 × 10⁸ / 1.5 × 10⁶ = 200 m.</li>
<li><strong>(Graphs)</strong> On a displacement–time graph for one particle, successive peaks occur at 0.10 s and 0.35 s. State the period and frequency. <em>Answer:</em> T = 0.25 s; f = 1/T = 4.0 Hz.</li>
<li><strong>(Transverse/longitudinal)</strong> Explain, in terms of particle motion, why sound cannot be polarised. <em>Answer:</em> In a longitudinal wave the oscillations are parallel to the direction of energy transfer, so there is no perpendicular vibration to restrict to one plane; polarisation requires transverse oscillations.</li>
<li><strong>(Doppler)</strong> An ambulance emitting 700 Hz moves away from a cyclist at 20 m s⁻¹ (sound 340 m s⁻¹). Find the frequency heard. <em>Answer:</em> f' = 700 × 340/(340 + 20) = 238 000/360 = 661 Hz.</li>
<li><strong>(EM spectrum)</strong> Arrange in order of increasing frequency: infrared, gamma, radio, visible. Name one use of ultraviolet. <em>Answer:</em> radio, infrared, visible, gamma. Uses of UV include sterilising equipment, detecting forged notes (fluorescence) and sunbeds; also responsible for sunburn and vitamin D production.</li>
<li><strong>(Polarisation)</strong> Two polarising filters are placed in a beam of light with their axes at 90°. State and explain the observation. <em>Answer:</em> No light passes: the first filter polarises the light along its axis, and the second (analyser) blocks all vibration parallel to that axis because its own axis is perpendicular.</li>
<li><strong>(Intensity)</strong> The amplitude of a wave is doubled. State the effect on intensity. <em>Answer:</em> Intensity increases by a factor of 4, because I ∝ A².</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Graph confusion:</strong> reading wavelength from a displacement–time graph (it gives period) or period from a distance graph (it gives wavelength). Label the axes first, always.</li>
<li><strong>Unit conversions:</strong> kHz and MHz to Hz, cm to m, before substitution. Losing a factor of 1000 in the Doppler denominator is the classic arithmetic loss.</li>
<li><strong>Phase in degrees:</strong> phase difference is demanded in radians (π, 2π). 180° is π; a quarter cycle is π/2.</li>
<li><strong>Doppler signs:</strong> approach is minus in the denominator — do not memorise blindly; sketch the bunched and stretched wavefronts and derive the sign each time.</li>
<li><strong>f versus T:</strong> f = 1/T, and f = 50 Hz means T = 0.02 s, not 50 s. Inverting too quickly under pressure is common.</li>
<li><strong>Spectrum order and properties:</strong> candidates memorise the order but forget that all EM waves travel at c and are transverse — the shared-properties questions catch them.</li>
<li><strong>Polarisation of sound:</strong> stating that sound can be polarised is an immediate mark loss; sound is longitudinal.</li>
<li><strong>Precision and units:</strong> this paper wants answers to 2 or 3 significant figures with units; unrounded 7-digit answers and unitless numbers cost marks.</li>
<li><strong>Method marks:</strong> write v = fλ and substitute in separate lines — the formula line earns credit even when the arithmetic fails.</li>
</ul>
`,
    "013ebfea-e165-48f6-ad1d-2e01fd4e5214": `
<h2>AS Level Physics: Superposition</h2>
<p>Superposition is what happens when two waves occupy the same space at the same time: the displacements add, and from that single rule emerge stationary waves, diffraction, interference and the diffraction grating — the four phenomena of this topic. The mental picture to keep is two people shaking ropes that cross: at the crossing, the rope's shape is the sum of both shapes, instant by instant. This note builds each phenomenon from that rule, with the derivations and calculations line by line and the practical skills the papers demand.</p>

<h3>The superposition principle</h3>
<p>When two or more waves meet, the resultant displacement at any point is the vector sum of the individual displacements at that point. The waves pass through each other unchanged afterwards — they do not bounce off or alter each other. Everything in this topic is that sentence applied to different geometries:</p>
<ul>
<li><strong>Constructive interference:</strong> crest meets crest — displacements add, amplitude is a maximum.</li>
<li><strong>Destructive interference:</strong> crest meets trough — displacements cancel, amplitude is a minimum (zero for equal waves).</li>
</ul>
<p>Interference is sustained (a stable pattern) only when the sources are coherent: same frequency and a constant phase difference. Two unrelated lamps are incoherent and produce no stable pattern — this distinction is examinable every session.</p>

<h3>Stationary waves</h3>
<p>A stationary (standing) wave forms when two progressive waves of the same frequency and amplitude travel in opposite directions — classically a wave and its reflection. The pattern oscillates but does not travel: there are fixed points of zero displacement (nodes) and fixed points of maximum displacement (antinodes), and the wave profile stays in place while the medium oscillates within it.</p>
<table border="1" cellpadding="6">
<tr><th>Feature</th><th>Progressive wave</th><th>Stationary wave</th></tr>
<tr><td>Energy</td><td>transferred along the wave</td><td>stored in the oscillating regions; not transferred</td></tr>
<tr><td>Nodes</td><td>none</td><td>fixed zero-displacement points, half a wavelength apart</td></tr>
<tr><td>Antinodes</td><td>crests move along</td><td>fixed maximum points, half a wavelength apart</td></tr>
<tr><td>Phase</td><td>neighbouring points vary smoothly in phase</td><td>all points between two adjacent nodes oscillate in phase</td></tr>
</table>
<p>Harmonics give the numbers. For a string fixed at both ends (or a pipe closed at both ends), the fundamental has nodes at both ends and one antinode between: the string length L fits half a wavelength, so λ = 2L. The next mode fits a full wavelength (λ = L), the next 3λ/2 (λ = 2L/3), and in general λₙ = 2L/n with fₙ = n v/(2L). For a pipe closed at one end, the closed end is a node and the open end an antinode: the fundamental fits a quarter wavelength, λ = 4L, and only odd harmonics appear, fₙ = n v/(4L) with n = 1, 3, 5 ...</p>
<p><strong>Worked example.</strong> A guitar string 0.65 m long has a wave speed of 320 m s⁻¹. Find the fundamental and second harmonic frequencies.</p>
<pre><code>fundamental: lambda = 2L = 1.30 m
f1 = v/lambda = 320/1.30 = 246 Hz
second harmonic: lambda = L = 0.65 m
f2 = 320/0.65 = 492 Hz   (exactly 2 x f1, as expected)</code></pre>
<p><strong>Worked example (closed pipe).</strong> A pipe 0.50 m long, closed at one end, has sound speed 340 m s⁻¹. Find the fundamental and state the next allowed frequency.</p>
<pre><code>fundamental: lambda = 4L = 2.00 m
f1 = 340/2.00 = 170 Hz
only odd harmonics allowed -> next is the 3rd: f3 = 3 x 170 = 510 Hz</code></pre>

<h3>Diffraction</h3>
<p>Diffraction is the spreading of waves as they pass through a gap or around an obstacle. It is significant when the gap (or obstacle) size is comparable to the wavelength — the wave bends generously around a 1 cm gap if λ is a few centimetres, but barely at all for light through a doorway. The rule to quote: noticeable diffraction requires gap size approximately equal to the wavelength. Consequences: long-wavelength radio diffract around hills; short-wavelength microwaves need line-of-sight aerials; light through everyday doors shows negligible diffraction, which is why shadows exist.</p>
<p>The single-slit pattern is examinable in outline: a broad central maximum of width related to λ/a (slit width a), with the intensity falling away on either side; a narrower slit produces a wider spread. Water waves in a ripple tank photograph the same behaviour macroscopically.</p>

<h3>Interference: two sources</h3>
<p>Two coherent sources produce a stable pattern of maxima and minima. The controlling quantity is the path difference — the difference in distance from the two sources to the point in question:</p>
<ul>
<li><strong>Constructive (maximum):</strong> path difference = nλ (n = 0, 1, 2 ...), i.e. a whole number of wavelengths.</li>
<li><strong>Destructive (minimum):</strong> path difference = (n + ½)λ — a whole number plus half.</li>
</ul>
<p><strong>Worked example.</strong> Two speakers sit 4.0 m apart, driven in phase at 170 Hz (sound speed 340 m s⁻¹). A listener stands on the perpendicular bisector, then moves until the first minimum. Find the path difference at the first minimum.</p>
<pre><code>lambda = v/f = 340/170 = 2.0 m
first minimum: path difference = lambda/2 = 1.0 m</code></pre>
<p>On the perpendicular bisector the path difference is zero, so the centre is a maximum; the first minimum occurs where the difference reaches half a wavelength — 1.0 m of extra path.</p>

<h3>Young's double-slit experiment</h3>
<p>Light through two closely spaced slits forms fringes of alternating bright and dark bands on a screen. The fringe spacing formula, derived from path difference across a distant screen, is the calculation the papers test:</p>
<pre><code>fringe spacing  w  = lambda D / d

D = slit-to-screen distance (m)
d = slit separation (m)
lambda = wavelength (m)</code></pre>
<p><strong>Worked example 1.</strong> Light of wavelength 600 nm falls on slits 0.25 mm apart; the screen is 1.8 m away.</p>
<pre><code>lambda = 600 nm = 6.0 x 10-7 m
d = 0.25 mm = 2.5 x 10-4 m
w = lambda D/d = (6.0 x 10-7 x 1.8)/(2.5 x 10-4)
  = 1.08 x 10-6/2.5 x 10-4 = 4.32 x 10-3 m = 4.3 mm</code></pre>
<p><strong>Worked example 2 (working backwards).</strong> Fringe spacing 2.0 mm is measured with D = 2.0 m and λ = 500 nm. Find the slit separation.</p>
<pre><code>d = lambda D/w = (5.0 x 10-7 x 2.0)/(2.0 x 10-3)
  = 1.0 x 10-6/2.0 x 10-3 = 5.0 x 10-4 m = 0.50 mm</code></pre>
<p>Examiner note: the formula assumes small angles and a distant screen; when asked to describe the effect of moving the screen away, the answer is that fringes spread out (w increases with D) — a proportionality answer, not a guess.</p>

<h3>The diffraction grating</h3>
<p>A diffraction grating has many equally spaced slits; the interference from all of them produces sharp, bright maxima at angles given by</p>
<pre><code>n lambda = d sin theta

n = 0, 1, 2, ... (the order)
d = slit spacing (grating spacing), the distance between
    adjacent slits (m)
theta = angle of the maximum from the central beam</code></pre>
<p>The number of orders is a standard question: since sin θ ≤ 1, the maximum order n is the largest integer with nλ ≤ d, i.e. n = floor(d/λ); each order appears twice (either side) plus the central beam.</p>
<p><strong>Worked example 1.</strong> A grating has 300 lines per millimetre. Light of wavelength 550 nm is incident normally. Find the angles of the first- and second-order maxima.</p>
<pre><code>grating spacing: d = 1 mm/300 = 3.33 x 10-6 m
first order (n = 1):
sin theta = lambda/d = 5.5 x 10-7/3.33 x 10-6 = 0.165
theta = sin-1(0.165) = 9.5 degrees
second order (n = 2):
sin theta = 2 x 0.165 = 0.330
theta = 19.3 degrees</code></pre>
<p><strong>Worked example 2 (counting orders).</strong> With the same grating and λ = 550 nm, how many maxima are visible in total?</p>
<pre><code>max order: n lambda <= d  ->  n <= d/lambda = 3.33 x 10-6/5.5 x 10-7 = 6.06
largest integer n = 6
orders: -6 to +6 plus n = 0  ->  13 maxima in total</code></pre>
<p>Practical skill: measuring d from a grating quoted as N lines per metre, d = 1/N. A grating with 500 lines per mm has d = 2.0 × 10⁻⁶ m. Getting that reciprocal wrong doubles every downstream answer.</p>

<h3>Worked examples: comparing the phenomena</h3>
<p><strong>Worked example.</strong> White light falls on a double slit and, separately, on a diffraction grating. Describe and explain the difference between the two patterns.</p>
<pre><code>double slit: equally spaced fringes; the central fringe is white,
             outer fringes coloured because fringe spacing depends
             on lambda - blue (shorter lambda) fringes sit closer
             to the centre than red
grating:     sharply defined maxima at angles set by sin theta =
             n lambda/d, so each order spreads into a spectrum
             with violet least deviated and red most</code></pre>
<p>Why the marks land: the description names the pattern shape, then the mechanism (spacing proportional to λ) and the colour ordering — explanation, not just observation.</p>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Definitions)</strong> State the principle of superposition and define coherence. <em>Answer:</em> When waves meet, the resultant displacement is the sum of the individual displacements. Coherent waves have the same frequency and a constant phase difference.</li>
<li><strong>(Stationary waves)</strong> Describe the formation of a stationary wave in a string. <em>Answer:</em> A wave produced at one end travels along the string and reflects at the fixed end; the incident and reflected waves of equal frequency and amplitude superpose; at nodes the two are in antiphase and cancel, at antinodes in phase and reinforce; the pattern oscillates without propagating.</li>
<li><strong>(Closed pipe)</strong> The fundamental of a closed pipe is 220 Hz. State the frequency of the next possible harmonic and why. <em>Answer:</em> 660 Hz — closed pipes support odd harmonics only, so the next is the third harmonic, 3 × 220.</li>
<li><strong>(Diffraction)</strong> State and explain why long-wave radio signals can be received behind hills but microwave signals cannot. <em>Answer:</em> Radio wavelengths (hundreds of metres) are comparable to hill sizes, so they diffract noticeably around them; microwaves (centimetres) diffract negligibly and need line of sight.</li>
<li><strong>(Double slit)</strong> Blue light (450 nm) is replaced by red (650 nm) with no other change. State the effect on fringe spacing and explain. <em>Answer:</em> The spacing increases because w = λD/d and λ has increased; the fringes spread out proportionally.</li>
<li><strong>(Grating)</strong> A grating has 600 lines per mm and is illuminated with 500 nm light. Calculate the angle of the first-order maximum. <em>Answer:</em> d = 1/600 000 = 1.67 × 10⁻⁶ m; sin θ = 5.0 × 10⁻⁷/1.67 × 10⁻⁶ = 0.300; θ = 17.5°.</li>
<li><strong>(Orders)</strong> In question 6, how many maxima are visible altogether? <em>Answer:</em> d/λ = 3.33, so n = 3; orders −3 to +3 plus the central beam make 7 maxima.</li>
<li><strong>(Practical)</strong> Describe how you would measure the fringe spacing of a double-slit pattern. <em>Answer:</em> Measure the distance across several fringes (e.g. from the centre of one bright fringe to the centre of the nth bright fringe) with a ruler or travelling microscope, then divide by n — measuring many fringes reduces the fractional uncertainty.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Grating spacing inversion:</strong> 300 lines per mm means d = 3.33 × 10⁻⁶ m, not 3.33 × 10⁻³ m. Write the reciprocal step as its own line.</li>
<li><strong>Units in the grating formula:</strong> d and λ must both be in metres. Nanometres into the formula directly gives sin θ in the thousands.</li>
<li><strong>sin θ vs tan θ:</strong> fringe positions at large angles cannot use the small-angle approximation; use sin⁻¹ from the grating equation and w = λD/d only where angles are small.</li>
<li><strong>Counting orders:</strong> remember the central beam (n = 0) and both sides; and round the order down (floor of d/λ), never up.</li>
<li><strong>Node/antinode language:</strong> nodes are zero displacement and exist because of antiphase superposition; antinodes vibrate with double amplitude. Swapping the two is a definition mark lost.</li>
<li><strong>Closed-pipe harmonics:</strong> an open–closed pipe supports odd harmonics only (1st, 3rd, 5th); answering with the second harmonic loses the mark.</li>
<li><strong>Incoherent sources:</strong> two separate lamps cannot produce a stable interference pattern — coherence is the condition, and it is worth a stated mark.</li>
<li><strong>Path difference conditions:</strong> maxima at whole wavelengths, minima at half-integer. State the condition in words and symbols.</li>
<li><strong>Method marks:</strong> write the formula (nλ = d sin θ or w = λD/d) before numbers; a correct formula with failed arithmetic still earns credit.</li>
</ul>
`,
    "9078e0a1-ee3d-4cec-bb01-092369018e88": `
<h2>AS Level Physics: Quantum Physics</h2>
<p>Quantum physics begins with a failure: classical physics could not explain why hot objects glow the way they do, why light sometimes knocks electrons out of metal, or why atoms emit sharp lines rather than continuous rainbows. The answers — photons, the photoelectric effect, wave–particle duality and quantised energy levels — rebuilt physics in the twentieth century. This note builds the quantum toolkit from zero: the photon model and its arithmetic, Einstein's photoelectric equation with its graphs, de Broglie's matter waves, and the energy-level picture of the atom that explains every spectrum you will meet.</p>

<h3>Why classical physics failed</h3>
<p>Classical theory treated light as a continuous wave and predicted that any frequency should eject electrons from a metal if you wait long enough. Experiment said otherwise: below a threshold frequency, no electrons appear however intense the light; above it, electrons appear instantly however faint the light. Similarly, classical theory predicted that hot objects should radiate infinite energy at high frequencies (the ultraviolet catastrophe) — absurd. Planck's and Einstein's fix: energy is exchanged in discrete packets, quanta, each carrying E = hf. The packet idea is the whole foundation.</p>

<h3>Photons: energy and momentum</h3>
<p>A photon is a quantum of electromagnetic radiation. Its energy is set by its frequency alone:</p>
<pre><code>E = h f = h c / lambda

h = 6.63 x 10-34 J s  (Planck constant)
f = frequency (Hz)
c = 3.0 x 108 m s-1
lambda = wavelength (m)</code></pre>
<p>Photons also carry momentum, p = h/λ — a particle property that waves do not have in classical theory, and the bridge to matter waves later.</p>
<p><strong>Worked example 1.</strong> Find the energy of a photon of 500 nm light.</p>
<pre><code>E = hc/lambda = (6.63 x 10-34 x 3.0 x 108)/(5.0 x 10-7)
  = 1.989 x 10-25/5.0 x 10-7 = 3.98 x 10-19 J</code></pre>
<p><strong>Worked example 2 (electronvolts).</strong> Convert to electronvolts (1 eV = 1.60 × 10⁻¹⁹ J) and find the photon momentum.</p>
<pre><code>E = 3.98 x 10-19/1.60 x 10-19 = 2.49 eV
p = h/lambda = 6.63 x 10-34/5.0 x 10-7 = 1.33 x 10-27 kg m s-1</code></pre>
<p>Exam conversions deserve care: keV and MeV appear in nuclear contexts, and the eV↔J conversion (multiply or divide by 1.60 × 10⁻¹⁹) is a mark waiting to be lost.</p>

<h3>The photoelectric effect</h3>
<p>Light on a clean metal surface ejects electrons — but only according to rules that demand the photon model:</p>
<ul>
<li><strong>Threshold frequency f₀:</strong> below it, no emission at all, whatever the intensity. The photon's energy must exceed the metal's work function φ (the minimum energy to free an electron from the surface).</li>
<li><strong>Instantaneity:</strong> above f₀, emission begins immediately — one photon transfers all its energy to one electron in one interaction.</li>
<li><strong>Intensity effect:</strong> above threshold, doubling the intensity doubles the number of photons and hence the photoelectric current (more electrons per second) but does not change their maximum kinetic energy.</li>
<li><strong>Frequency effect:</strong> raising the frequency above f₀ increases the maximum kinetic energy of the emitted electrons linearly.</li>
</ul>
<p>Einstein's equation ties the numbers together:</p>
<pre><code>h f = phi + KE_max

phi = work function of the metal (J or eV)
KE_max = maximum kinetic energy of an emitted electron
f0 = threshold frequency: h f0 = phi</code></pre>
<p><strong>Worked example.</strong> Sodium has work function 2.3 eV. Light of wavelength 450 nm falls on it. Find whether emission occurs and the maximum kinetic energy.</p>
<pre><code>photon energy: E = hc/lambda = (6.63 x 10-34 x 3.0 x 108)/(4.5 x 10-7)
               = 4.42 x 10-19 J = 2.76 eV
compare: 2.76 eV > 2.3 eV  ->  emission occurs
KE_max = 2.76 - 2.3 = 0.46 eV
       = 0.46 x 1.6 x 10-19 = 7.4 x 10-20 J</code></pre>
<p><strong>Worked example (threshold).</strong> Find the threshold wavelength for sodium (φ = 2.3 eV).</p>
<pre><code>h f0 = phi -> f0 = phi/h = (2.3 x 1.6 x 10-19)/6.63 x 10-34
     = 5.55 x 1014 Hz
lambda0 = c/f0 = 3.0 x 108/5.55 x 1014 = 5.4 x 10-7 m = 540 nm</code></pre>
<p>Below 540 nm (higher frequency) sodium emits; above it, nothing. Note the inverse relationship: threshold wavelength corresponds to threshold frequency.</p>

<h3>The graphs the papers love</h3>
<p>Two plots encode the photoelectric effect and both are examinable:</p>
<ul>
<li><strong>KEₘₐₓ against frequency:</strong> a straight line with gradient h, crossing the frequency axis at f₀ and the KE axis at −φ. The gradient is the same for every metal — the metal only moves the intercepts.</li>
<li><strong>Stopping potential against frequency:</strong> the same shape, since eVₛ = KEₘₐₓ.</li>
<li><strong>Current against intensity:</strong> linear above threshold (more photons, more electrons).</li>
</ul>
<p><strong>Worked example.</strong> A plot of KEₘₐₓ against frequency has gradient 6.5 × 10⁻³⁴ J s and crosses the axis at 5.0 × 10¹⁴ Hz. Identify Planck's constant and the work function.</p>
<pre><code>gradient = h = 6.5 x 10-34 J s (close to 6.63 x 10-34,
           the difference being experimental error)
phi = h f0 = 6.5 x 10-34 x 5.0 x 1014 = 3.25 x 10-19 J
    = 2.0 eV</code></pre>

<h3>Wave–particle duality</h3>
<p>The quantum world refuses the wave/particle distinction: light, treated for centuries as a wave, arrives in photon packets; electrons, treated as particles, can diffract. Electron diffraction — beams of electrons producing interference patterns when scattered by crystals — is the evidence that convinced the profession. De Broglie unified the picture: every particle of momentum p has an associated wavelength</p>
<pre><code>lambda = h / p = h / (m v)</code></pre>
<p><strong>Worked example.</strong> Find the de Broglie wavelength of an electron accelerated through 100 V.</p>
<pre><code>KE = eV = 1.60 x 10-19 x 100 = 1.60 x 10-17 J
KE = (1/2) m v^2 -> p = sqrt(2 m KE)
p = sqrt(2 x 9.11 x 10-31 x 1.60 x 10-17)
  = sqrt(2.915 x 10-47) = 5.40 x 10-24 kg m s-1
lambda = h/p = 6.63 x 10-34/5.40 x 10-24 = 1.23 x 10-10 m
       = 0.123 nm   (comparable to atomic spacing: electrons
         diffract through crystals)</code></pre>
<p>Why electrons diffract through crystals but footballs do not: the wavelength is only noticeable when it is comparable to the gap it passes through — the same rule as diffraction for waves. A macroscopic ball has such a large momentum that its de Broglie wavelength is immeasurably small.</p>

<h3>Energy levels in atoms and line spectra</h3>
<p>Electrons in atoms occupy quantised energy levels — only specific energies are allowed. Transitions between them absorb or emit a photon whose energy exactly equals the level difference:</p>
<pre><code>Delta E = E_upper - E_lower = h f = h c / lambda</code></pre>
<ul>
<li><strong>Emission spectrum:</strong> an excited atom drops to a lower level and emits a photon; a hot gas produces bright lines at specific wavelengths — a line spectrum.</li>
<li><strong>Absorption spectrum:</strong> cold gas absorbs those same wavelengths from white light, leaving dark lines at identical positions.</li>
<li><strong>Fluorescence:</strong> a photon is absorbed (UV, say), some energy is lost as heat, and a lower-energy (visible) photon is emitted — which is why white shirts glow blue under UV light.</li>
</ul>
<p>The energy-level diagram is the standard question: a vertical scale in eV or J, arrows drawn downward for emission and upward for absorption, each arrow labelled with its transition energy.</p>
<p><strong>Worked example 1.</strong> A hydrogen electron falls from level −0.54 eV to −1.51 eV. Find the photon's wavelength.</p>
<pre><code>Delta E = -0.54 - (-1.51) = 0.97 eV
in joules: 0.97 x 1.60 x 10-19 = 1.552 x 10-19 J
lambda = hc/Delta E = (6.63 x 10-34 x 3.0 x 108)/1.552 x 10-19
       = 1.28 x 10-6 m = 1280 nm  (infrared)</code></pre>
<p><strong>Worked example 2.</strong> Explain why the spectral lines of an element are sharp rather than continuous.</p>
<pre><code>Electrons occupy quantised levels, so only specific differences
Delta E exist between them; only photons with energy exactly equal
to a difference are emitted or absorbed; since f = Delta E/h, only
specific frequencies appear - sharp lines, not a continuum.</code></pre>

<h3>Worked examples: combined quantum calculations</h3>
<p><strong>Worked example.</strong> A metal has threshold frequency 7.5 × 10¹⁴ Hz. Light of wavelength 300 nm shines on it. Find the work function and the maximum kinetic energy of the photoelectrons.</p>
<pre><code>phi = h f0 = 6.63 x 10-34 x 7.5 x 1014 = 4.97 x 10-19 J
    = 3.1 eV
photon energy: E = hc/lambda = (6.63 x 10-34 x 3.0 x 108)/(3.0 x 10-7)
               = 6.63 x 10-19 J = 4.14 eV
KE_max = E - phi = 6.63 x 10-19 - 4.97 x 10-19 = 1.66 x 10-19 J
       = 1.04 eV</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Photon energy)</strong> Calculate the energy of a photon of frequency 5.0 × 10¹⁴ Hz. <em>Answer:</em> E = hf = 6.63 × 10⁻³⁴ × 5.0 × 10¹⁴ = 3.3 × 10⁻¹⁹ J (≈ 2.1 eV).</li>
<li><strong>(Photoelectric rules)</strong> Explain why red light cannot eject electrons from a given metal however intense it is, while faint blue light can. <em>Answer:</em> Emission requires individual photons above the threshold frequency f₀; red photons have lower frequency and energy below the work function, so no single red photon can free an electron regardless of photon number; blue photons exceed the energy requirement, so each can eject an electron on its own.</li>
<li><strong>(Graph reading)</strong> State what the gradient and x-intercept of a KEₘₐₓ against frequency graph represent. <em>Answer:</em> The gradient is Planck's constant h; the x-intercept is the threshold frequency f₀.</li>
<li><strong>(Intensity)</strong> The intensity of light above the threshold frequency is doubled. State the effect on (a) the photoelectric current, (b) the maximum kinetic energy. <em>Answer:</em> (a) The current doubles — twice the photons, twice the electrons. (b) The maximum kinetic energy is unchanged — it depends only on frequency and the work function.</li>
<li><strong>(De Broglie)</strong> Explain why electrons can be diffracted by crystals but tennis balls cannot. <em>Answer:</em> Diffraction is noticeable when the de Broglie wavelength λ = h/(mv) is comparable to the gap size; electrons have very small momentum and wavelengths of atomic scale, while a tennis ball's momentum makes its wavelength negligibly small.</li>
<li><strong>(Energy levels)</strong> An atom transitions between two levels 3.0 eV apart. Find the frequency of the emitted photon. <em>Answer:</em> ΔE = 3.0 × 1.60 × 10⁻¹⁹ = 4.8 × 10⁻¹⁹ J; f = ΔE/h = 4.8 × 10⁻¹⁹/6.63 × 10⁻³⁴ = 7.2 × 10¹⁴ Hz.</li>
<li><strong>(Spectra)</strong> Distinguish between an emission and an absorption spectrum. <em>Answer:</em> An emission spectrum shows bright lines on black where excited atoms drop to lower levels; an absorption spectrum shows dark lines on a continuous spectrum where cooler gas absorbs the same wavelengths — the line positions match.</li>
<li><strong>(Explanation)</strong> Explain, using photon theory, why photoelectric emission is instantaneous. <em>Answer:</em> One photon transfers all its energy to one electron in a single interaction; there is no gradual accumulation, so emission happens immediately once the photon energy exceeds the work function.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Intensity/frequency confusion:</strong> intensity changes the electron count, not their energy; frequency changes their energy. The two-sentence distinction above is worth marks every year.</li>
<li><strong>eV/J conversions:</strong> 1 eV = 1.60 × 10⁻¹⁹ J. Work function in eV with photon energy in joules is a guaranteed arithmetic failure — convert before subtracting.</li>
<li><strong>Threshold frequency vs threshold wavelength:</strong> they are inversely related (f₀ = φ/h, λ₀ = c/f₀); a short threshold wavelength means a high threshold frequency. Do not mix the inequalities.</li>
<li><strong>h units:</strong> Planck's constant is 6.63 × 10⁻³⁴ J s (or 4.14 × 10⁻¹⁵ eV s); using the wrong pair with the wrong energy unit fails the calculation.</li>
<li><strong>Sign errors in ΔE:</strong> emission means the electron falls, so ΔE = E_upper − E_lower is positive for the photon. Sketch the level diagram and draw the arrow before calculating.</li>
<li><strong>De Broglie with v = fλ confusion:</strong> for matter waves λ = h/(mv); substituting the wave speed of sound or light for the electron's speed is a common error.</li>
<li><strong>Graph axes:</strong> KEₘₐₓ against f has gradient h — but KE against intensity is flat (above threshold, no change). Label what is plotted before reading anything off.</li>
<li><strong>Photons of light and electrons are different things:</strong> photon energy E = hf for radiation; electron kinetic energy uses ½mv² (non-relativistic). Mixing the two formulas in one question is frequent under pressure.</li>
<li><strong>Precision:</strong> give answers to 2 or 3 significant figures with units; quote h = 6.63 × 10⁻³⁴ J s from the data sheet rather than from memory.</li>
</ul>
`,
  },
};
