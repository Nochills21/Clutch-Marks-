// Inline symbol keys for batch 3: the key goes directly under the equations that
// lacked one, instead of a whole reference sheet appended to a short summary.
//
//   node .freebuff/apply-inline-keys.cjs .freebuff/content-inline-keys-3.cjs          (dry)
//   node .freebuff/apply-inline-keys.cjs .freebuff/content-inline-keys-3.cjs --apply  (live)
//
// Every find string is a character-exact fragment of the live body and must
// occur exactly once; replace is that same fragment with the key added.
module.exports = {
  edits: {
    /* Sequences and Series, AS summary — a, d, r, n, S_n in the formula list. */
    "1e4fed25-c788-42a1-8331-cea119299ab9": [
      {
        find: '<p><strong>How to use this:</strong> skim the list above, then read the full study notes for any area that feels shaky, and finish with the topic quiz to check yourself.</p>',
        replace:
          '<p><em>Key:</em> a = first term; d = common difference; r = common ratio; n = number of terms; S_n = sum of the first n terms; the sum to infinity exists only when |r| &lt; 1, which is why the condition is part of the formula rather than an optional extra.</p>\n<p><strong>How to use this:</strong> skim the list above, then read the full study notes for any area that feels shaky, and finish with the topic quiz to check yourself.</p>',
      },
    ],

    /* Electricity & Circuits, OL summary — I = Q/t, V = E/Q, R = V/I, P = IV, E = Pt. */
    "c7daf842-eea0-4694-822c-73d26ee9d12a": [
      {
        find: '<li>Power P = I × V, and energy transferred E = P × t.</li></ul><h3>Common errors</h3>',
        replace:
          '<li>Power P = I × V, and energy transferred E = P × t.</li></ul><p><em>Key:</em> I = current (A); Q = charge (C, where 1 C = 1 A s); t = time (s); V = potential difference (V); E = energy transferred (J); R = resistance (Ω); P = power (W). Watch the two meanings of E: energy in E = P × t, and e.m.f. when a question asks for the source.</p><h3>Common errors</h3>',
      },
    ],

    /* Energy, Work & Power, OL summary — W = Fd, P = E/t, KE = ½mv², GPE = mgh. */
    "bfa1398d-e6d9-434d-b29a-7d1e0ec1c782": [
      {
        find: '<li>Energy is conserved, so the total energy after a transfer equals the total before it.</li></ul><h3>Common errors</h3>',
        replace:
          '<li>Energy is conserved, so the total energy after a transfer equals the total before it.</li></ul><p><em>Key:</em> W = work done (J); F = force (N); d = distance moved in the direction of the force (m); P = power (W); t = time (s); m = mass (kg); v = speed (m s⁻¹); g = gravitational field strength (9.8 N kg⁻¹); h = height gained (m); efficiency has no unit once written as a decimal, and is × 100 for a percentage.</p><h3>Common errors</h3>',
      },
    ],

    /* Kinetics, A2 summary — rate = k[A]^m[B]^n and the Arrhenius equation. */
    "bac944a1-250f-4fa9-99e0-6e5fcf626f16": [
      {
        find: '<h3>Worked example</h3><p>For a reaction with rate equation',
        replace:
          '<p><em>Key:</em> rate = rate of reaction (mol dm⁻³ s⁻¹); k = rate constant, whose units depend on the overall order; [A] and [B] = concentrations of A and B (mol dm⁻³); m and n = the orders with respect to A and B (no units); overall order = m + n. A power of 2 means the rate is proportional to the square of that concentration, so doubling it multiplies the rate by four.</p><h3>Worked example</h3><p>For a reaction with rate equation',
      },
    ],

    /* Thermal Physics, OL summary — Q = mcΔθ and Q = mL. */
    "52d7d95f-02a1-4bca-8cd8-56763ac82239": [
      {
        find: '<li>The temperature stays constant during a change of state because the energy is used to break bonds between particles.</li></ul><h3>Common errors</h3>',
        replace:
          '<li>The temperature stays constant during a change of state because the energy is used to break bonds between particles.</li></ul><p><em>Key:</em> Q = thermal energy transferred (J); m = mass (kg); c = specific heat capacity (J kg⁻¹ °C⁻¹); Δθ = temperature change (°C, the same size as K); L = specific latent heat (J kg⁻¹). Δθ, not θ, is the change — a temperature of 20 °C carries no energy on its own.</p><h3>Common errors</h3>',
      },
    ],

    /* Algebra — Simplifying and Expanding, OL summary — the index laws behind 3a²b × 4ab³. */
    "6b07220f-fe34-4ce6-83b5-5a5e4c4fe103": [
      {
        find: 'Factorise 6x² + 9x = 3x(2x + 3).',
        replace:
          'Factorise 6x² + 9x = 3x(2x + 3).\n<p><em>Key:</em> a, b, x = algebraic variables standing for numbers (no units); coefficients multiply while the indices of a like base add (a² × a¹ = a³); the highest common factor is taken out first, so 6x² + 9x has 3x outside and the bracket that remains must multiply back to the original.</p>',
      },
    ],

    /* Number — Ratio, Rate and Proportion, OL summary — y = kx and y = k/x. */
    "a62a1c91-ed1b-4585-9247-e2804f9c434b": [
      {
        find: 'and it is written y = k/x.',
        replace:
          'and it is written y = k/x. <em>Key:</em> y = the dependent quantity; x = the independent quantity; k = the constant of proportionality, found by substituting one known pair of values. In y = kx a doubling of x doubles y; in y = k/x it halves y, and the graph is a curve, not a straight line through the origin.',
      },
    ],

    /* Forces and Equilibrium, AS summary — moment = F × d and the principle of moments. */
    "d744af58-5730-4a8b-abf9-dc3a40c52896": [
      {
        find: '<li>A couple is two equal and opposite forces that produce a turning effect with no net force; its moment is F × d.</li></ul><h3>Common errors</h3>',
        replace:
          '<li>A couple is two equal and opposite forces that produce a turning effect with no net force; its moment is F × d.</li></ul><p><em>Key:</em> F = force (N); d = perpendicular distance from the pivot to the line of action of the force (m); moment (N m). Equilibrium needs both conditions at once — the resultant force is zero and the total moment about any point is zero — and a body can satisfy one while turning.</p><h3>Common errors</h3>',
      },
    ],

    /* Plant Nutrition, IGCSE notes — the balanced symbol equation for photosynthesis. */
    "5c9c13d2-f88c-4c1d-9e08-7e23f9596e78": [
      {
        find: 'C₆H₁₂O₆ + 6O₂. To balance it from scratch:',
        replace:
          'C₆H₁₂O₆ + 6O₂. <em>Key:</em> CO₂ = carbon dioxide; H₂O = water; C₆H₁₂O₆ = glucose; O₂ = oxygen; the coefficients give 6 C, 12 H and 18 O on each side, which is what balanced means. To balance it from scratch:',
      },
    ],

    /* Materials: Deformation, AS summary — Hooke, stress, strain, Young modulus. */
    "ea3e26f0-5633-44d8-83cd-a2b20075b086": [
      {
        find: "<li>The area under a force-extension graph gives the elastic strain energy stored in the material.</li></ul><h3>Common errors</h3>",
        replace:
          "<li>The area under a force-extension graph gives the elastic strain energy stored in the material.</li></ul><p><em>Key:</em> F = applied force (N); k = spring constant (N m⁻¹); x = extension from the natural length (m); σ = stress (Pa); ε = strain (no units, because it is a length divided by a length); E = Young modulus (Pa); A = cross-sectional area (m²). Beyond the limit of proportionality the line curves, so F = k x stops describing the spring.</p><h3>Common errors</h3>",
      },
    ],

    /* Motion in a Circle and Gravity, AS summary — ω, v, a, F, g, orbit speed. */
    "f6199585-7784-4ada-8bb6-a7bd76b8a931": [
      {
        find: '<li>Gravitational field strength g = G M / r², and a satellite in a stable circular orbit has speed v = √(G M / r).</li></ul><h3>Common errors</h3>',
        replace:
          '<li>Gravitational field strength g = G M / r², and a satellite in a stable circular orbit has speed v = √(G M / r).</li></ul><p><em>Key:</em> ω = angular speed (rad s⁻¹); T = period of one orbit (s); v = linear speed (m s⁻¹); r = radius of the circle or orbit, measured to the centre (m); a = centripetal acceleration (m s⁻²); F = centripetal force (N); m = mass of the orbiting body (kg); M = mass of the central body (kg); G = gravitational constant (6.67 × 10⁻¹¹ N m² kg⁻²); g = gravitational field strength (N kg⁻¹).</p><h3>Common errors</h3>',
      },
    ],

    /* Entropy and Energetics, A2 summary — ΔG = ΔH − TΔS and total entropy. */
    "8789fc33-7c67-402d-95d0-3ec009dc2d45": [
      {
        find: 'ΔG = ΔH - TΔS, is used to predict reaction feasibility.</p>',
        replace:
          'ΔG = ΔH - TΔS, is used to predict reaction feasibility. <em>Key:</em> ΔG = Gibbs free energy change (kJ mol⁻¹); ΔH = enthalpy change (kJ mol⁻¹); T = temperature (K); ΔS = entropy change (J K⁻¹ mol⁻¹, so divide it by 1000 before combining with ΔH); ΔS_total = ΔS_system + ΔS_surroundings (J K⁻¹ mol⁻¹), with ΔS_surroundings = −ΔH/T. A reaction is feasible when ΔG is negative, which is the same statement as ΔS_total being positive.</p>',
      },
    ],
  },
};
