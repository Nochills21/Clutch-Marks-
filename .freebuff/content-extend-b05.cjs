// Batch 05: deepens eight thin notes toward 2500+ characters.
// Consumed by .freebuff/extend-materials.cjs. No backticks and no dollar-brace sequences.
module.exports = {
  expectType: "notes",
  rows: {
    "4c3feece-d824-42a8-88ae-a9f3c5c313f7": `
<h3>Worked example: wave equation</h3>
<p>A sound wave has frequency 500 Hz and travels at 340 m s⁻¹ in air. Using v = fλ, the wavelength is λ = 340/500 = 0.68 m. Doubling the frequency to 1000 Hz halves the wavelength to 0.34 m. The speed is fixed by the medium, not by the frequency, so the product fλ stays constant.</p>
<h3>Echo calculations</h3>
<p>A reflected sound returns after a time t. The distance to the reflecting surface is d = vt/2, because the sound travels to the surface and back. Forgetting the factor of one half doubles the answer, which is the most common error in echo questions.</p>
<h3>Reflection, refraction and diffraction</h3>
<ul>
<li>Reflection: the angle of incidence equals the angle of reflection, both measured from the normal, not from the surface.</li>
<li>Refraction: a wave changes speed and direction at a boundary between media, but its frequency stays the same.</li>
<li>Diffraction: spreading is greatest when the gap or obstacle is comparable to the wavelength. Low-pitched sound, with its longer wavelength, bends around a doorway more than high-pitched speech does.</li>
</ul>
<p>These are the wave properties examined in the wave topic of the Cambridge IGCSE 0625 and AS 9702 syllabi. Name each property precisely and apply it to a labelled diagram.</p>
`,
    "fc1ffd6d-f913-4c5a-9336-ec908c9223ec": `
<h3>Worked example: clock speed and throughput</h3>
<p>A processor runs at 2.0 GHz, which is 2.0 × 10⁹ clock cycles per second. If each instruction takes four cycles on average, the processor completes 2.0 × 10⁹ / 4 = 5.0 × 10⁸ instructions per second. Clock speed alone does not decide performance: a faster clock with more cycles per instruction can still be slower overall.</p>
<h3>Cache memory</h3>
<p>Cache is small, fast memory between the CPU and main memory. It holds copies of recently or frequently used data and instructions. A cache hit avoids a slow RAM access; a cache miss forces one. Cache is faster than RAM but much smaller, which is why it holds only the data most likely to be needed next.</p>
<h3>The ALU and the control unit</h3>
<p>The ALU performs arithmetic and logic operations. The control unit fetches and decodes instructions and sends control signals around the system. A comparison such as A &gt; B is evaluated in the ALU, while the decision about which instruction runs next is made by the control unit.</p>
<ul>
<li>Pipelining overlaps the fetch, decode and execute stages of successive instructions to raise throughput.</li>
<li>Multi-core processors run several fetch-decode-execute cycles at once, but one program gains speed only if its work can be split into parallel tasks.</li>
<li>A 16-bit address bus can address 2¹⁶ = 65 536 locations.</li>
</ul>
`,
    "42a00afc-901a-4089-8544-5d9011e1d6ca": `
<h3>Worked example: integration by parts</h3>
<p>Find the integral of x e^x with respect to x. Let u = x and dv/dx = e^x, so du/dx = 1 and v = e^x. Then the integral equals x e^x minus the integral of e^x, which is x e^x − e^x + c = (x − 1) e^x + c. Differentiate the answer to check that it returns the integrand.</p>
<h3>Definite integrals and area</h3>
<p>For a region above the x-axis, the definite integral between the limits gives its area. If part of the curve lies below the axis, that part contributes a negative value to the integral, so the total area is the sum of the absolute values of each part. Sketch the curve first. Integrating across a point where the curve crosses the axis gives the signed net value, not the area.</p>
<h3>Checking your answer</h3>
<ul>
<li>After integrating, differentiate the answer and confirm that it reproduces the original function.</li>
<li>Include the constant of integration on indefinite integrals, and never write it on a definite integral.</li>
<li>When a substitution changes the variable, change the limits too, or convert back to x before substituting the original limits.</li>
</ul>
<p>The integration topic of the Cambridge AS and A Level Mathematics 9709 syllabus expects these methods to be applied to standard forms and to exam-style problems, with the method stated clearly at each step.</p>
`,
    "7e15d4c0-7177-419e-989b-05b5eca76131": `
<h3>Worked example: field between parallel plates</h3>
<p>Two parallel plates are 0.040 m apart with a potential difference of 2.0 kV. The uniform field strength is E = V/d = 2000/0.040 = 5.0 × 10⁴ V m⁻¹. A proton placed at rest between the plates feels a force F = eE = (1.6 × 10⁻¹⁹)(5.0 × 10⁴) = 8.0 × 10⁻¹⁵ N, directed from the positive plate towards the negative plate.</p>
<h3>Radial fields and potential</h3>
<p>For a point charge, E = Q/(4πε₀r²), so field strength falls with the square of distance. The potential is V = Q/(4πε₀r), which falls only with the first power of distance. Students often mix these two; the field depends on r², the potential on r.</p>
<h3>Energy and the electronvolt</h3>
<p>The work done in moving a charge Q through a potential difference V is W = QV. A charge accelerated from rest through 500 V gains 500 eV of kinetic energy, which is 8.0 × 10⁻¹⁷ J for an electron. Expressing energies in electronvolts makes many A-level questions faster to work through.</p>
<ul>
<li>Field lines point away from positive charge and towards negative charge, and they never cross.</li>
<li>Equipotential surfaces are always perpendicular to field lines.</li>
<li>Energy stored in a capacitor is ½CV² = ½QV = ½Q²/C. Choose the form that matches the data given.</li>
</ul>
`,
    "e1c1569d-a45c-4ebe-8012-6df10e500034": `
<h3>Worked example: a combined index calculation</h3>
<p>Simplify (2³ × 2⁵) ÷ 2⁴. Add the indices in the numerator to get 2⁸ ÷ 2⁴, then subtract the indices to get 2⁴ = 16. Check by a second method: 2³ × 2⁵ = 8 × 32 = 256, and 256 ÷ 16 = 16. Both routes agree.</p>
<h3>Fractional and negative powers</h3>
<p>A negative index means a reciprocal: 5⁻² = 1/5² = 1/25. A fractional index with denominator n means an nth root: 16^(1/2) = 4, and 27^(2/3) = (27^(1/3))² = 3² = 9. Taking the root first and then raising the result to the power keeps the arithmetic small.</p>
<ul>
<li>Any non-zero number to the power 0 equals 1, so 7⁰ = 1.</li>
<li>Do not multiply the base by the index: (2³)² = 2⁶, not 2⁵ and not 6.</li>
<li>Standard form for a number between 0 and 1 uses a negative index: 0.00047 = 4.7 × 10⁻⁴.</li>
</ul>
`,
    "eb9deec8-1112-4fa5-aaff-c4302c1ed6ad": `
<h3>Worked example: a stack trace</h3>
<p>Start with an empty stack. Push A, push B and push C, so the stack holds A, B, C with C on top. Pop returns C, and a second pop returns B. Push D, and the stack now holds A and D. A trace table with one row per operation is the method examiners expect in a trace question.</p>
<h3>Choosing a structure</h3>
<ul>
<li>Use a queue for tasks processed in arrival order, such as a print queue.</li>
<li>Use a stack for reversing data, undo operations and backtracking, because the last item added is the first removed.</li>
<li>Use a hash table for fast lookup by key. A good hash gives average-case constant-time access, but collisions must be handled, usually by chaining or open addressing.</li>
</ul>
<h3>Linked list pointers</h3>
<p>Each node holds a data item and a pointer to the next node. Inserting or deleting a node means changing pointers rather than moving elements, so the change is quick once the position is known. Finding a node by its position still means following pointers from the start of the list, which is a linear search.</p>
<p>Exam point: state the behaviour precisely. Describing a queue as first in, last out loses the mark; the correct description is first in, first out (FIFO).</p>
`,
    "7ff7a883-b6e3-483a-aa83-bea75fbfc73f": `
<h3>Worked example: angle between two vectors</h3>
<p>Find the angle between a = (3; 4) and b = (5; −2). The scalar product is a·b = 15 − 8 = 7. The magnitudes are |a| = √(9 + 16) = 5 and |b| = √(25 + 4) = √29 ≈ 5.385. So cos θ = 7/(5 × 5.385) ≈ 0.260, giving θ ≈ 74.9°.</p>
<h3>Perpendicular vectors</h3>
<p>Two non-zero vectors are perpendicular exactly when their scalar product is zero. Use this to find an unknown component: if (2; k) is perpendicular to (4; −3), then 8 − 3k = 0, so k = 8/3.</p>
<h3>Vector equation of a line</h3>
<ul>
<li>The line r = a + λd passes through the point with position vector a and has direction d; λ is the parameter.</li>
<li>To test whether a point lies on the line, find λ from one component and check that it satisfies the other components.</li>
<li>Two lines are parallel when their direction vectors are scalar multiples of each other. They are skew when they neither meet nor are parallel.</li>
</ul>
`,
    "798f9e7d-33c5-456e-9070-c32874b67978": `
<h3>Worked example: orbital speed of the Earth</h3>
<p>The Earth orbits the Sun at a mean distance of about 1.5 × 10¹¹ m and takes one year, about 3.15 × 10⁷ s. Its average speed is v = 2πr/T = 2π × 1.5 × 10¹¹ / 3.15 × 10⁷ ≈ 3.0 × 10⁴ m s⁻¹, about 30 km per second.</p>
<h3>Why the seasons happen</h3>
<p>The seasons come from the tilt of the Earth's axis, about 23.5°, not from changes in distance to the Sun. When the northern hemisphere is tilted towards the Sun, sunlight arrives more directly and is spread over a smaller area, so the surface receives more energy per unit area and the days are longer.</p>
<h3>Day, month and year</h3>
<ul>
<li>A solar day, noon to noon, is about 24 hours. The sidereal day, measured against the stars, is about 23 hours 56 minutes.</li>
<li>The Moon takes about 27.3 days to orbit the Earth relative to the stars, but about 29.5 days to return to the same phase, because the Earth moves along its own orbit in the meantime.</li>
<li>The phase of the Moon depends on how much of its sunlit half faces the Earth. The Earth's shadow causes an eclipse only when the three bodies are almost in line.</li>
</ul>
`
  }
};
