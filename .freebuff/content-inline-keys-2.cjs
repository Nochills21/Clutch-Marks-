// Inline symbol keys for batch 2 of the keyed-equation queue.
//
// Each edit is an exact-string replacement against the live row: `find` is copied
// from the material's own body and must occur exactly once, and `replace` is that
// same text with a `<em>Key:</em>` line added below the equation it belongs to.
// Where the body carried the same worked-example block twice, the edit removes the
// duplicate and leaves the key in its place — the material stays the same length or
// shorter, and no equation is lost.
module.exports = {
  edits: {
    /* ── Functions (AS) ──────────────────────────────────────────────── */
    "34e6b43c-48b2-408f-81c4-7699c8a95a7d": [
      {
        find: `<p><strong>Mathematics — AS (9709).</strong> A function maps each input in the domain to exactly one output in the range. Example: f(x) = x² + 1 for x ∈ ℝ has range f(x) ≥ 1, because x² is never negative.</p>`,
        replace: `<p><strong>Mathematics — AS (9709).</strong> A function maps each input in the domain to exactly one output in the range. Example: f(x) = x² + 1 for x ∈ ℝ has range f(x) ≥ 1, because x² is never negative.</p>
<p><em>Key:</em> f(x) = the output the function assigns to the input x (no units); x = the input, taken from the domain given after it — here x ∈ ℝ, so any real number is allowed; f(x) ≥ 1 = the range, the set of possible outputs, because x² is never negative. In the transformations below, a = the constant added or the stretch factor (no units), and y = the vertical coordinate of the transformed graph.</p>`,
      },
    ],

    /* ── Trigonometry (AS) ───────────────────────────────────────────── */
    "0886ecfd-6c56-4cec-a789-c9fb76259cd4": [
      {
        find: `</ul>

<h3>Worked example</h3>
<p>Solve 2 sin x = −1 for 0 ≤ x ≤ 360°. Rearrange to sin x = −1/2. The reference angle is 30°, and sine is negative in the third and fourth quadrants, so x = 180° + 30° = 210° and x = 360° − 30° = 330°. Both answers go in the final line, because a question that asks for "all solutions in the interval" loses marks when one is missing.</p>
<h3>Common mistakes</h3>
<ul><li>Stopping at the calculator value and missing the second solution in the interval.</li><li>Giving answers in degrees when the question asks for radians, or the reverse. Check the units against the question before writing the final answer.</li><li>Dividing both sides of an equation by a trig expression that could be zero, which loses solutions. Factorise and set each factor to zero instead.</li></ul>
`,
        replace: `</ul>
<p><em>Key:</em> x = the angle being solved for (degrees when the interval is 0 ≤ x ≤ 360°, radians when it is 0 ≤ x ≤ 2π); 1/2 and −1/2 = the sine value being solved for (no units); 30° (or π/6) = the acute reference angle the calculator returns; the second solution comes from the symmetry of the sine curve — 180° − 30° in the second quadrant, 180° + 30° in the third.</p>
`,
      },
    ],

    /* ── Coordination, Response and Gene Technology (A2 Biology) ─────── */
    "eb9a809a-a086-4f98-b365-670ae0c8f7aa": [
      {
        find: `<p>Two electrodes on a giant axon are 30 mm apart. The trace shows an action potential arriving at the first electrode, and the same potential arriving at the second 1.5 ms later. Conduction velocity is distance divided by time, so the answer is 0.030 m divided by 0.0015 s = 20 m per second. Convert millimetres to metres and milliseconds to seconds before dividing, and give the unit, because the mark is for the calculation and the unit together.</p>`,
        replace: `<p>Two electrodes on a giant axon are 30 mm apart. The trace shows an action potential arriving at the first electrode, and the same potential arriving at the second 1.5 ms later. Conduction velocity is distance divided by time, so the answer is 0.030 m divided by 0.0015 s = 20 m per second. Convert millimetres to metres and milliseconds to seconds before dividing, and give the unit, because the mark is for the calculation and the unit together. Written as a relation: <strong>v = d / t = 0.030 m / 0.0015 s = 20 m s⁻¹</strong> <em>Key:</em> v = conduction velocity (m s⁻¹); d = distance between the two electrodes (m); t = time between the two arrivals (s).</p>`,
      },
      {
        find: `<p>The same trace gives information about the refractory period. If the axon cannot fire again for 5 ms after each impulse, the maximum frequency is 1 divided by 0.005 s = 200 impulses per second. That limit, not the size of the stimulus, is why a stronger stimulus cannot raise the frequency indefinitely: the all-or-nothing law means a bigger stimulus does not make a bigger impulse, it can only make more impulses or recruit more axons.</p>`,
        replace: `<p>The same trace gives information about the refractory period. If the axon cannot fire again for 5 ms after each impulse, the maximum frequency is 1 divided by 0.005 s = 200 impulses per second. That limit, not the size of the stimulus, is why a stronger stimulus cannot raise the frequency indefinitely: the all-or-nothing law means a bigger stimulus does not make a bigger impulse, it can only make more impulses or recruit more axons. Written as a relation: <strong>f = 1 / T = 1 / 0.005 s = 200 Hz</strong> <em>Key:</em> f = maximum frequency of impulses (Hz, impulses per second); T = refractory period (s), the shortest gap the axon can manage between impulses; 1/T = the reciprocal of that gap, which is the frequency.</p>`,
      },
    ],

    /* ── Complex Numbers (A2) ────────────────────────────────────────── */
    "4f15878c-8b50-429c-a3ea-19b2eae76d4c": [
      {
        find: `<p><strong>Mathematics — A2 (9709).</strong> i² = −1. A complex number z = a + bi has real part a and imaginary part b. Two numbers are equal iff both parts match.</p>`,
        replace: `<p><strong>Mathematics — A2 (9709).</strong> i² = −1. A complex number z = a + bi has real part a and imaginary part b. Two numbers are equal iff both parts match.</p>
<p><em>Key:</em> i = the imaginary unit, defined by i² = −1; z = the complex number (no units); a = Re(z), its real part; b = Im(z), the coefficient of i; |z| = √(a² + b²) = the modulus, the distance from the origin on an Argand diagram; a + bi and a − bi are a conjugate pair, whose product is |z|².</p>`,
      },
    ],

    /* ── Dynamics (AS) ───────────────────────────────────────────────── */
    "909d81df-9e5c-4113-8588-db4986eb9a6a": [
      {
        find: `<p><strong>Physics — AS.</strong> Dynamics links forces to the motion they cause. Example: a 2 kg mass with a 10 N resultant force accelerates at a = F/m = 10/2 = 5 m s⁻².</p>`,
        replace: `<p><strong>Physics — AS.</strong> Dynamics links forces to the motion they cause. Example: a 2 kg mass with a 10 N resultant force accelerates at a = F/m = 10/2 = 5 m s⁻².</p>
<p><em>Key:</em> F = resultant force (N); m = mass (kg); a = acceleration (m s⁻²); W = weight (N); g = gravitational field strength, 9.81 N kg⁻¹; p = momentum (kg m s⁻¹); v = velocity (m s⁻¹) and Δp = change in momentum (kg m s⁻¹); μ = coefficient of friction (no units); R = normal reaction (N); t = the time for which a force acts (s).</p>`,
      },
    ],

    /* ── Circular Motion and SHM (A2) ────────────────────────────────── */
    "24f6e4fa-159d-45b1-8282-7bd24292eb53": [
      {
        find: `<p><strong>Physics — A2.</strong> Angular speed ω = 2π/T; v = ωr; a = ω²r = v²/r; F = mv²/r toward the centre.</p>`,
        replace: `<p><strong>Physics — A2.</strong> Angular speed ω = 2π/T; v = ωr; a = ω²r = v²/r; F = mv²/r toward the centre.</p>
<p><em>Key:</em> ω = angular speed (rad s⁻¹); T = period of one revolution (s); r = radius of the circle (m); v = speed along the arc (m s⁻¹); a = centripetal acceleration (m s⁻²); F = centripetal force (N); m = mass (kg); A = amplitude (m); x = displacement from equilibrium (m); k = spring constant (N m⁻¹); l = pendulum length (m); g = 9.81 m s⁻².</p>`,
      },
    ],

    /* ── Hypothesis Testing (A2) ─────────────────────────────────────── */
    "46636b0d-bd26-45c4-92ab-5957188bc34d": [
      {
        find: `<p><strong>Mathematics — A2.</strong> The null hypothesis H₀ is the default claim (no change, p = p₀). The alternative H₁ is what a suspicious observation suggests (p > p₀, p < p₀, or p ≠ p₀). The significance level α is the probability of rejecting a true H₀ — the false-alarm rate, usually 5% or 1%.</p>`,
        replace: `<p><strong>Mathematics — A2.</strong> The null hypothesis H₀ is the default claim (no change, p = p₀). The alternative H₁ is what a suspicious observation suggests (p > p₀, p < p₀, or p ≠ p₀). The significance level α is the probability of rejecting a true H₀ — the false-alarm rate, usually 5% or 1%.</p>
<p><em>Key:</em> H₀ = the null hypothesis, the claim being tested; H₁ = the alternative hypothesis, which fixes one tail or two; p = the population proportion (or, in the conclusion, the p-value: the probability of a result at least as extreme as the one observed, assuming H₀); p₀ = the proportion claimed under H₀ (no units, it is a probability); α = the significance level, 0.05 or 0.01, the chance of rejecting a true H₀.</p>`,
      },
      {
        find: `</p>
### Worked example
A test of a claimed mean has a null hypothesis H₀ and an alternative H₁. Choose a significance level such as 5%, calculate the test statistic and its p-value, then reject H₀ if p < α. A two-tailed test looks for a change in either direction, so the 5% is split between the two tails.
### Worked example
A test of a claimed mean has a null hypothesis H₀ and an alternative H₁. Choose a significance level such as 5%, calculate the test statistic and its p-value, then reject H₀ if p < α. A two-tailed test looks for a change in either direction, so the 5% is split between the two tails.`,
        replace: `</p>
### Worked example
A test of a claimed mean has a null hypothesis H₀ and an alternative H₁. Choose a significance level such as 5%, calculate the test statistic and its p-value, then reject H₀ if p < α. A two-tailed test looks for a change in either direction, so the 5% is split between the two tails.
<p><em>Key:</em> p = the p-value from the test (a probability, no units); α = the significance level, 0.05 for a 5% test; reject H₀ when p &lt; α, and for a two-tailed test compare p with α but split the critical region between both tails.</p>`,
      },
    ],

    /* ── Algorithms, Recursion and Graph Traversal (A2 CS) ───────────── */
    "fa0fd6bb-1dda-4f3c-af76-0db40924f2a3": [
      {
        find: `must name the halving and the sorted-data precondition.</code></pre>`,
        replace: `must name the halving and the sorted-data precondition.</code></pre>
<p><em>Key:</em> low, high = the index bounds of the current search range, both inclusive; mid = ⌊(low + high) / 2⌋, the middle index tested next; target = the value being searched for; n = the number of items. Halving the range each comparison is why the count is about log₂ n.</p>`,
      },
      {
        find: `n=1 → 1 (returns), then the multiplications unwind: 2, 6, 24.</code></pre>`,
        replace: `n=1 → 1 (returns), then the multiplications unwind: 2, 6, 24.</code></pre>
<p><em>Key:</em> n = the argument whose factorial is being computed (no units); factorial(n) = n × factorial(n − 1), ended by the base case factorial(1) = 1; the stack depth equals n, because every call waits for the one below it to return. Without a reachable base case the recursion never terminates.</p>`,
      },
      {
        find: `Complexity: O(V + E) with adjacency lists - every vertex and edge processed
once.</code></pre>`,
        replace: `Complexity: O(V + E) with adjacency lists - every vertex and edge processed
once.</code></pre>
<p><em>Key:</em> V = the number of vertices (nodes); E = the number of edges; O(V + E) = the work grows with their sum, because each vertex is visited once and each edge examined once; the visited set is what stops a cycle from looping forever.</p>`,
      },
    ],

    /* ── Kinematics (AS) ─────────────────────────────────────────────── */
    "12080994-0309-4d7d-8fea-86149b5a013f": [
      {
        find: `<p><strong>Physics — AS.</strong> Sign convention matters: take up as positive and g = −9.81 m s⁻² for falling objects.</p>`,
        replace: `<p><strong>Physics — AS.</strong> Sign convention matters: take up as positive and g = −9.81 m s⁻² for falling objects.</p>
<p><em>Key:</em> u = initial velocity (m s⁻¹); v = final velocity (m s⁻¹); s = displacement (m); a = acceleration (m s⁻²); t = time (s); g = the acceleration of free fall, 9.81 m s⁻², negative when up is taken as positive. In v² = u² + 2as the displacement and the acceleration must carry the same sign for a fall, or the term double-counts the direction.</p>`,
      },
      {
        find: `</ul>

<h3>Worked example</h3>
<p>A ball is dropped from rest and falls 20 m. Taking down as positive, u = 0, s = 20 m and a = 9.81 m s⁻². Then v² = u² + 2as = 392.4, so v ≈ 19.8 m s⁻¹. Using the sign convention with up positive instead gives s = −20 m and a = −9.81 m s⁻², which gives the same answer with the signs consistent.</p>
<h3>Common mistakes</h3>
<ul><li>Using SUVAT for a case with non-uniform acceleration, such as a body with increasing air resistance.</li><li>Mixing signs, for example taking up as positive but using g = +9.81 m s⁻².</li><li>Reading a displacement–time gradient as velocity only when it is a straight line. The gradient gives instantaneous velocity at any point on a curve.</li></ul>
`,
        replace: `</ul>
<p><em>Key:</em> u = 0 (released from rest); v = the speed on landing (m s⁻¹); s = 20 m, the displacement (m); a = 9.81 m s⁻², the acceleration (m s⁻²); t = the time of the fall (s). The same numbers with s and a both negative give the same 19.8 m s⁻¹, which is the check that the sign convention was applied consistently.</p>
`,
      },
    ],

    /* ── Permutations and Combinations (A2) ──────────────────────────── */
    "5f4ea511-14f7-47b6-b864-7c036cdcaaaf": [
      {
        find: `### Worked example
A permutation is an ordered arrangement, so nPr = n! ÷ (n − r)!. A combination ignores order, so nCr = n! ÷ (r!(n − r)!). Five people in a line can be arranged in 5! = 120 ways. Choosing a committee of 3 from 8 people gives 8C3 = 56, while choosing a ranked top 2 from 5 gives 5P2 = 20.
### Worked example
A permutation is an ordered arrangement, so nPr = n! ÷ (n − r)!. A combination ignores order, so nCr = n! ÷ (r!(n − r)!). Five people in a line can be arranged in 5! = 120 ways. Choosing a committee of 3 from 8 people gives 8C3 = 56, while choosing a ranked top 2 from 5 gives 5P2 = 20.`,
        replace: `### Worked example
A permutation is an ordered arrangement, so nPr = n! ÷ (n − r)!. A combination ignores order, so nCr = n! ÷ (r!(n − r)!). Five people in a line can be arranged in 5! = 120 ways. Choosing a committee of 3 from 8 people gives 8C3 = 56, while choosing a ranked top 2 from 5 gives 5P2 = 20.
<p><em>Key:</em> n = the number of items available (no units); r = the number chosen or arranged; n! = n × (n − 1) × … × 1; nPr = the number of ordered arrangements of r items from n, where order matters; nCr = the number of unordered selections of r from n, where order is ignored. Note 5P2 = 20 against 5C2 = 10: the factor r! is exactly the over-count that ordering removes.</p>`,
      },
    ],

    /* ── Probability (A2) ────────────────────────────────────────────── */
    "ef8a0104-500c-4738-ba8d-7b0355e3119b": [
      {
        find: `<p><strong>Mathematics — A2.</strong> For an event A with P(A) = p: 0 ≤ p ≤ 1, and P(A′) = 1 − P(A). For mutually exclusive events, probabilities add: P(A ∪ B) = P(A) + P(B). For events that can occur together, subtract the overlap:</p>`,
        replace: `<p><strong>Mathematics — A2.</strong> For an event A with P(A) = p: 0 ≤ p ≤ 1, and P(A′) = 1 − P(A). For mutually exclusive events, probabilities add: P(A ∪ B) = P(A) + P(B). For events that can occur together, subtract the overlap: P(A ∪ B) = P(A) + P(B) − P(A ∩ B).</p>
<p><em>Key:</em> P(A) = the probability of event A (a number between 0 and 1, no units); p = the value of that probability; A′ = the complement of A, everything that is not A, so P(A′) = 1 − P(A); P(A ∪ B) = the probability that A or B or both occur; P(A ∩ B) = the probability that both occur, which is zero for mutually exclusive events and the subtracted term otherwise.</p>`,
      },
    ],

    /* ── Probability Distributions (A2) ──────────────────────────────── */
    "844f4bee-1575-40a3-a553-5acf50a41168": [
      {
        find: `<p><strong>Mathematics — A2.</strong> A discrete random variable X takes values xᵢ with probabilities pᵢ where each pᵢ ≥ 0 and Σpᵢ = 1. A probability distribution can be given as a table, a formula, or a function. Any missing probability is found by subtraction.</p>`,
        replace: `<p><strong>Mathematics — A2.</strong> A discrete random variable X takes values xᵢ with probabilities pᵢ where each pᵢ ≥ 0 and Σpᵢ = 1. A probability distribution can be given as a table, a formula, or a function. Any missing probability is found by subtraction.</p>
<p><em>Key:</em> X = the discrete random variable (no units, it is a count or a score); xᵢ = each value X can take; pᵢ = P(X = xᵢ), the probability of that value; Σpᵢ = 1 means the probabilities account for every possible outcome, which is how a missing probability is found. For a linear transformation, a and b are constants (no units) with E(aX + b) = aE(X) + b and Var(aX + b) = a² Var(X).</p>`,
      },
    ],

    /* ── Binomial Distribution (A2) ──────────────────────────────────── */
    "464ba5ea-f481-4229-ac71-6b3217804ea8": [
      {
        find: `<p><strong>Mathematics — A2.</strong> X ~ B(n, p) counts successes in n independent trials when:</p>`,
        replace: `<p><strong>Mathematics — A2.</strong> X ~ B(n, p) counts successes in n independent trials when:</p>
<p><em>Key:</em> X = the number of successes (no units); n = the fixed number of trials; p = the probability of success in one trial (a probability, no units); 1 − p = the probability of failure; r = the particular number of successes asked for; ⁿCᵣ = n! ÷ (r!(n − r)!), the number of ways of choosing which r trials succeed; the mean is np and the variance np(1 − p).</p>`,
      },
    ],

    /* ── Waves (AS) ──────────────────────────────────────────────────── */
    "0a6dd708-d477-4b7b-a734-f1178b3a3f67": [
      {
        find: `</ul>

<h3>Worked example</h3>
<p>A wave on a rope has a frequency of 500 Hz and a wavelength of 0.68 m. Its speed is v = fλ = 500 × 0.68 = 340 m s⁻¹. The same equation applies to sound and light, but the speed of light in a vacuum is 3.0 × 10⁸ m s⁻¹ and does not depend on the source. Intensity falls with the inverse square of distance from a point source, so doubling the distance cuts the intensity to one quarter.</p>
<h3>Common mistakes</h3>
<ul><li>Mixing up frequency and wavelength in v = fλ, or leaving wavelength in centimetres while using metres per second.</li><li>Saying waves carry matter. A wave carries energy, and the particles of the medium oscillate about fixed positions.</li><li>Assuming polarisation applies to longitudinal waves. Only transverse waves can be polarised.</li></ul>
`,
        replace: `</ul>
<p><em>Key:</em> v = wave speed (m s⁻¹); f = frequency (Hz, oscillations per second); λ = wavelength (m), the distance between successive crests; so v = fλ is one oscillation's distance times the number of oscillations per second. For intensity, I = P / (4πr²): I = intensity (W m⁻²), P = power of the source (W), r = distance from it (m), which is why doubling r quarters I.</p>
`,
      },
    ],

    /* ── Poisson Distribution (A2) ───────────────────────────────────── */
    "5fa2d944-3cb4-4d1b-b811-fe3f1d75dcbc": [
      {
        find: `<p><strong>Mathematics — A2.</strong> X ~ Po(λ) counts events in a fixed interval of time or space when events occur independently, at a constant average rate λ, and never twice at the same instant. Classic settings: calls per hour at a helpdesk, typos per page, cars per minute at a quiet junction.</p>`,
        replace: `<p><strong>Mathematics — A2.</strong> X ~ Po(λ) counts events in a fixed interval of time or space when events occur independently, at a constant average rate λ, and never twice at the same instant. Classic settings: calls per hour at a helpdesk, typos per page, cars per minute at a quiet junction.</p>
<p><em>Key:</em> X = the number of events in the interval (no units); λ = the mean number of events in that interval, which is also the variance, so its unit is events per interval; r = the particular count asked for; e = 2.718…, the exponential base; r! = r × (r − 1) × … × 1. Because the mean equals the variance, a measured variance far from the mean says the Poisson model does not fit.</p>`,
      },
    ],

    /* ── Magnetic Fields and Electromagnetism (A2) ───────────────────── */
    "0b8c2b5f-335c-4baa-89a2-b14c808bfd1f": [
      {
        find: `</ul>

<h3>Worked example</h3>
<p>A straight wire of length 0.40 m carries a current of 2.5 A at right angles to a uniform magnetic field of flux density 0.12 T. The force is F = BIL sin θ = 0.12 × 2.5 × 0.40 × sin 90° = 0.12 N. Fleming's left hand gives the direction: the field points from the first finger (north to south), the current points along the second finger, and the force is the thumb.</p>
<h3>Common mistakes</h3>
<ul><li>Using θ = 0° when the wire is at right angles to the field. The force is zero only when the wire is parallel to the field.</li><li>Mixing up the left and right hand rules. The left hand is for motors (force), and the right hand is for generators (induced current).</li><li>Forgetting that the force on a charge moving in a field is F = BQv, not BIL, unless you convert the current first.</li></ul>
`,
        replace: `</ul>
<p><em>Key:</em> F = force on the conductor (N); B = magnetic flux density (T, weber per square metre); I = current (A); L = the length of wire in the field (m); θ = the angle between the wire and the field (degrees), so sin θ = 1 at right angles and 0 when parallel. For a moving charge the same force is F = BQv with Q = charge (C) and v = speed perpendicular to the field (m s⁻¹).</p>
`,
      },
    ],

    /* ── Continuous Random Variables (A2) ────────────────────────────── */
    "2533db4e-b82d-4d5d-bc05-6e82b803ba82": [
      {
        find: `<p><strong>Mathematics — A2.</strong> A continuous variable X is described by a density f(x) with f(x) ≥ 0 and ∫f(x)dx = 1 over all x. Probabilities are areas:</p>`,
        replace: `<p><strong>Mathematics — A2.</strong> A continuous variable X is described by a density f(x) with f(x) ≥ 0 and ∫f(x)dx = 1 over all x. Probabilities are areas under that curve, so every probability in this topic is an integral.</p>
<p><em>Key:</em> X = the continuous random variable (no units beyond whatever is measured); f(x) = its probability density function, which is not itself a probability; ∫f(x)dx = 1 over all x means the total area under the curve is one; P(a &lt; X &lt; b) = the area between a and b; E(X) = the mean; Var(X) = E(X²) − [E(X)]²; m = the median, with half the area on each side; for the uniform distribution on [a, b], f(x) = 1/(b − a), mean (a + b)/2 and variance (b − a)²/12.</p>`,
      },
    ],

    /* ── Algebra — Equations (OL) ────────────────────────────────────── */
    "5044a262-a2b1-459f-92fb-3866734eb1a1": [
      {
        find: `For rearranging, make t the subject of v = u + at by subtracting u and dividing by a, giving t = (v − u)/a.
<h3>Key points to remember</h3>`,
        replace: `For rearranging, make t the subject of v = u + at by subtracting u and dividing by a, giving t = (v − u)/a.
<p><em>Key:</em> v = final velocity (m s⁻¹); u = initial velocity (m s⁻¹); a = acceleration (m s⁻²); t = time (s), the subject of the rearrangement. For the quadratic formula, x = (−b ± √(b² − 4ac)) / 2a with a, b, c the coefficients of ax² + bx + c = 0 and a ≠ 0; the discriminant b² − 4ac decides how many real roots there are.</p>
<h3>Key points to remember</h3>`,
      },
    ],
  },
};
