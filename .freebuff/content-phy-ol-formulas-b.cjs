// Physics OL (0625) — appended "Equations and symbols" sections, batch B:
// waves and sound, electricity, magnetism and electromagnetism, nuclear
// physics, Earth and space.
module.exports = {
  subject: "physics",
  level: "OL",
  sections: {
    "4c3feece-d824-42a8-88ae-a9f3c5c313f7": {
      slug: "waves-sound",
      html: `<h2>Equations and symbols</h2>
<p>One equation, v = fλ, carries the whole of wave physics; the rest of this topic is refraction, the lens and the echo. Frequency and period are reciprocals, so a question that gives one and asks for the other is testing whether you inverted it correctly.</p>

<h3>The wave equation</h3>
<p><strong>v = fλ</strong><br><em>Key:</em> v = wave speed (m/s); f = frequency (Hz, waves per second); λ (lambda) = wavelength (m). The speed is set by the medium, so when a wave crosses into a new medium f stays the same and λ changes.</p>

<p><strong>f = 1 / T</strong><br><em>Key:</em> f = frequency (Hz); T = period, the time for one complete oscillation (s). A 0.004 s period is 250 Hz.</p>

<p><strong>T = 1 / f</strong><br><em>Key:</em> the same relation rearranged; T in seconds, f in hertz.</p>

<p><strong>d = vt</strong><br><em>Key:</em> d = distance travelled by the wave (m); v = wave speed (m/s); t = time (s). For an echo the sound travels to the surface and back, so the distance to the surface is half of vt.</p>

<p><strong>s = vt / 2</strong><br><em>Key:</em> s = distance to the reflecting surface (m); v = speed of sound in the medium (m/s); t = total time between the pulse and its echo (s). The factor of 2 is the most frequently dropped mark in echo questions.</p>

<p><strong>v(sound in air) ≈ 340 m/s and v(light in vacuum) = 3.0 × 10⁸ m/s</strong><br><em>Key:</em> the two speeds that explain thunder arriving after lightning; light is nearly a million times faster, so the flash is seen almost instantly.</p>

<p><strong>audible range for a human = 20 Hz to 20 000 Hz</strong><br><em>Key:</em> f below 20 Hz is infrasound and above 20 kHz is ultrasound; both are outside human hearing but ultrasound is used in medical scanning and sonar.</p>

<h3>Refraction</h3>
<p><strong>n = sin i / sin r</strong><br><em>Key:</em> n = refractive index of the material (no unit); i = angle of incidence in the less dense medium, measured from the normal (°); r = angle of refraction in the material (°). Both angles are always measured from the normal, never from the surface.</p>

<p><strong>n = 1 / sin c</strong><br><em>Key:</em> c = critical angle (°), the angle of incidence in the denser medium for which the refracted ray runs along the surface. A larger n means a smaller critical angle.</p>

<p><strong>n = c / v</strong><br><em>Key:</em> c = speed of light in a vacuum (3.0 × 10⁸ m/s); v = speed of light in the material (m/s). Light slows on entering a denser medium, which is what bends it towards the normal.</p>

<p><strong>total internal reflection when i (greater than) c</strong><br><em>Key:</em> i = angle of incidence inside the denser medium (°); c = critical angle (°). Beyond c no light escapes, which is the rule behind optical fibres and reflecting prisms.</p>

<h3>Lenses and images</h3>
<p><strong>m = h(image) / h(object)</strong><br><em>Key:</em> m = magnification (no unit); h(image) = image height (m or cm); h(object) = object height in the same unit. m greater than 1 means enlarged, less than 1 means diminished.</p>

<p><strong>real image: formed where rays actually meet, and can be projected on a screen</strong><br><em>Key:</em> a converging lens gives a real image when the object is beyond the focal length; the image is inverted. A virtual image is where rays only appear to come from, and cannot be projected.</p>`,
    },

    "cad3375c-cc3e-4846-8a72-441509ebada1": {
      slug: "electricity-circuits",
      html: `<h2>Equations and symbols</h2>
<p>Statements 4.2 to 4.4 rest on five equations and three circuit rules. Charge, current, voltage and resistance are defined by the first three; the power relations all follow from them, so a question that gives two quantities can almost always be finished without memorising a fourth formula.</p>

<h3>Charge, current and voltage</h3>
<p><strong>Q = It</strong><br><em>Key:</em> Q = charge flowing (C); I = current (A); t = time (s). One coulomb is one ampere for one second.</p>

<p><strong>I = Q / t</strong><br><em>Key:</em> I = current (A); Q = charge passing a point (C); t = time (s). Current is a rate of charge flow, not a quantity of charge.</p>

<p><strong>V = W / Q</strong><br><em>Key:</em> V = potential difference (V); W = work done or energy transferred (J); Q = charge moved (C). One volt is one joule per coulomb, which is the definition the mark scheme wants.</p>

<p><strong>E = QV</strong><br><em>Key:</em> E = energy transferred by the charge (J); Q = charge (C); V = potential difference (V).</p>

<p><strong>Q = Ne</strong><br><em>Key:</em> Q = total charge (C); N = number of electrons (no unit); e = elementary charge, 1.6 × 10⁻¹⁹ C. Used when a question asks how many electrons carry a given charge.</p>

<h3>Resistance and Ohm's law</h3>
<p><strong>V = IR</strong><br><em>Key:</em> V = potential difference across the component (V); I = current through it (A); R = resistance (Ω). Ohm's law holds only when temperature is constant, which is why a filament lamp's I–V graph curves.</p>

<p><strong>R = V / I</strong><br><em>Key:</em> R = resistance (Ω); V = potential difference (V); I = current (A). For a curved I–V graph, R is still V/I at the chosen point, not the gradient.</p>

<p><strong>1 Ω = 1 V / 1 A</strong><br><em>Key:</em> the definition of the ohm; a component has 1 Ω when 1 V drives 1 A through it.</p>

<h3>Power and energy in a circuit</h3>
<p><strong>P = VI</strong><br><em>Key:</em> P = power (W); V = potential difference (V); I = current (A).</p>

<p><strong>P = I²R</strong><br><em>Key:</em> P = power dissipated as heat (W); I = current (A); R = resistance (Ω). This is the form that explains why transmission cables carry a low current at high voltage.</p>

<p><strong>P = V² / R</strong><br><em>Key:</em> P = power (W); V = potential difference (V); R = resistance (Ω). Use it when the current is not given.</p>

<p><strong>E = Pt = VIt</strong><br><em>Key:</em> E = energy transferred (J); P = power (W); t = time (s); V = potential difference (V); I = current (A).</p>

<p><strong>cost = P(kW) × t(h) × price per kWh</strong><br><em>Key:</em> P in kilowatts (W ÷ 1000); t in hours; the price is per kilowatt-hour. A 2000 W heater for 3 hours uses 6 kWh.</p>

<p><strong>fuse rating: I = P / V</strong><br><em>Key:</em> I = normal operating current (A); P = appliance power (W); V = supply voltage (V). Choose the next standard fuse above this value, never below it.</p>

<h3>The three circuit rules</h3>
<p><strong>series: R(total) = R₁ + R₂ + …</strong><br><em>Key:</em> resistances in ohms (Ω); the current is the same everywhere in the series path and the supply voltage divides between the components.</p>

<p><strong>parallel: 1 / R(total) = 1 / R₁ + 1 / R₂ + …</strong><br><em>Key:</em> resistances in ohms (Ω); the potential difference is the same across each branch and the current divides. Two 6 Ω resistors in parallel give 3 Ω, which is less than either — a parallel combination always has a lower resistance.</p>

<p><strong>V(total) = V₁ + V₂ (series) and I(total) = I₁ + I₂ (parallel)</strong><br><em>Key:</em> the voltage rule for series and the current rule for parallel, both in the units of the quantity. The companion rules — voltage equal in parallel, current equal in series — follow from charge and energy conservation.</p>`,
    },

    "53568d22-201e-404e-83d9-0e61912f2c1b": {
      slug: "magnetism-electromagnetism",
      html: `<h2>Equations and symbols</h2>
<p>Two groups of equations share this topic: the force on a current-carrying conductor, and the transformer relations that make the national grid work. The transformer equations are ratios, so the units must match on each side and efficiencies are quoted per second.</p>

<h3>Force on a conductor</h3>
<p><strong>F = BIL</strong><br><em>Key:</em> F = force on the conductor (N); B = magnetic flux density (T, tesla); I = current (A); L = length of conductor inside the field (m). The force is greatest when the conductor is at right angles to the field, and zero when it is parallel to it.</p>

<p><strong>B = F / (IL)</strong><br><em>Key:</em> B = magnetic flux density (T); F = force (N); I = current (A); L = length in the field (m). One tesla is one newton per ampere-metre.</p>

<p><strong>F = 0 when the conductor is parallel to the field</strong><br><em>Key:</em> the direction rule (Fleming's left hand): first finger = field, second finger = current, thumb = force, all mutually at right angles. Reversing either the current or the field reverses the force.</p>

<h3>Transformers</h3>
<p><strong>V(s) / V(p) = N(s) / N(p)</strong><br><em>Key:</em> V(s) = secondary voltage (V); V(p) = primary voltage (V); N(s) = number of turns on the secondary coil; N(p) = number of turns on the primary. More secondary turns than primary means a step-up transformer.</p>

<p><strong>I(p) / I(s) = N(s) / N(p)</strong><br><em>Key:</em> I(p), I(s) = primary and secondary currents (A). A step-up transformer raises the voltage and lowers the current in the same ratio.</p>

<p><strong>V(p) I(p) = V(s) I(s)</strong><br><em>Key:</em> the ideal-transformer condition: input power equals output power (W). Real transformers lose some energy to heat in the coils and core, so the output power is slightly lower.</p>

<p><strong>efficiency = (V(s) I(s)) / (V(p) I(p)) × 100%</strong><br><em>Key:</em> both products are powers in watts; the result is a percentage below 100 for a real transformer.</p>

<p><strong>P(loss) = I²R</strong><br><em>Key:</em> P(loss) = power wasted as heat in the transmission cables (W); I = current in the cables (A); R = cable resistance (Ω). This is why the grid steps voltage up: at ten times the voltage the current falls tenfold and the loss falls a hundredfold.</p>

<p><strong>P = VI (power transmitted)</strong><br><em>Key:</em> P = power carried (W); V = transmission voltage (V); I = current (A).</p>

<h3>Magnetic rules worth stating as equations of condition</h3>
<p><strong>induced e.m.f. requires a changing magnetic field or relative motion</strong><br><em>Key:</em> a conductor experiences an induced voltage only while the flux through it changes; a stationary magnet beside a stationary coil induces nothing.</p>

<p><strong>like poles repel, unlike poles attract</strong><br><em>Key:</em> the field lines run from a north pole to a south pole outside the magnet; the force between two wires carrying current in the same direction is attractive, and in opposite directions repulsive.</p>`,
    },

    "d7f2e9e8-ff4a-4fba-9960-48d8ca800dd6": {
      slug: "nuclear-physics",
      html: `<h2>Equations and symbols</h2>
<p>Nuclear decay is described by two bookkeeping rules — the nuclide notation and the conservation of nucleon number and charge — plus the exponential half-life relation. There is no equation for "why" a nucleus decays; the marks are in the accounting.</p>

<h3>Nuclide notation</h3>
<p><strong>A = Z + N</strong><br><em>Key:</em> A = nucleon (mass) number, the total protons plus neutrons; Z = proton (atomic) number, which fixes the element; N = neutron number. Written as A over Z before the symbol, as in ²³⁵₉₂U.</p>

<p><strong>proton number Z = number of protons = number of electrons in a neutral atom</strong><br><em>Key:</em> Z decides the element; changing Z changes the element, which is what transmutation means.</p>

<p><strong>isotopes: same Z, different A</strong><br><em>Key:</em> isotopes of an element have the same number of protons and different numbers of neutrons, so they behave identically chemically and differently in nuclear decay.</p>

<h3>Decay bookkeeping</h3>
<p><strong>alpha decay: A → A − 4 and Z → Z − 2</strong><br><em>Key:</em> an alpha particle is a helium nucleus, ⁴₂He, so the parent loses two protons and two neutrons. Example: ²³⁸₉₂U → ²³⁴₉₀Th + ⁴₂He.</p>

<p><strong>beta-minus decay: A unchanged and Z → Z + 1</strong><br><em>Key:</em> a neutron turns into a proton and an electron, so the nucleon number is unchanged and the proton number rises by one. Example: ¹⁴₆C → ¹⁴₇N + ⁰₋₁e.</p>

<p><strong>gamma emission: A and Z unchanged</strong><br><em>Key:</em> a gamma ray is electromagnetic energy released from an excited nucleus; the nucleus loses energy but not particles, so the nuclide stays the same element.</p>

<p><strong>conservation in every decay: ΣA and ΣZ balance on both sides</strong><br><em>Key:</em> the totals of nucleon number and of charge must be equal before and after. This is the check that catches a wrong particle on the right-hand side.</p>

<h3>Half-life</h3>
<p><strong>N = N₀ × (½)^(t / t½)</strong><br><em>Key:</em> N = number of nuclei (or count rate) remaining after time t; N₀ = the starting number or rate; t = elapsed time (s, or any unit); t½ = half-life in the same unit as t. After three half-lives, one eighth remains.</p>

<p><strong>t½ = the time for half the nuclei in a sample to decay</strong><br><em>Key:</em> a fixed property of the isotope, unaffected by temperature, pressure or chemical state. It is measured from a decay curve as the time for the count rate to halve.</p>

<p><strong>A = ΔN / Δt</strong><br><em>Key:</em> A = activity (Bq, decays per second); ΔN = number of decays recorded; Δt = time interval (s). The measured count rate is lower than the activity because the detector only intercepts a fraction of the radiation.</p>

<h3>Penetration and ionisation</h3>
<p><strong>penetrating power: alpha (less than) beta (less than) gamma</strong><br><em>Key:</em> alpha is stopped by paper or a few centimetres of air; beta by a few millimetres of aluminium; gamma is reduced but not stopped by thick lead. Ionising power runs the other way: alpha ionises most strongly because it is the most charged and most massive.</p>

<p><strong>E = mc² (extension, beyond the 0625 requirement)</strong><br><em>Key:</em> E = energy released (J); m = mass lost, the mass defect (kg); c = speed of light, 3.0 × 10⁸ m/s. It explains where the energy of a decay comes from, and why a small mass defect is a large energy release.</p>`,
    },

    "798f9e7d-33c5-456e-9070-c32874b67978": {
      slug: "earth-space",
      html: `<h2>Equations and symbols</h2>
<p>Earth and space is mostly descriptive, but three quantitative ideas carry the marks: orbital speed, weight on another world, and the distance units that make astronomy's numbers manageable. The cosmological relations are marked as extensions, because 0625 examines the redshift qualitatively.</p>

<h3>Orbits</h3>
<p><strong>v = 2πr / T</strong><br><em>Key:</em> v = orbital speed (m/s); r = orbital radius, measured from the centre of the body being orbited (m); T = orbital period, the time for one complete orbit (s). The 2πr is the circumference of the orbit, so the equation is just speed = distance ÷ time applied to a circle.</p>

<p><strong>a larger orbital radius gives a smaller orbital speed for the same central body</strong><br><em>Key:</em> the rule behind a satellite's period rising steeply with height; a geostationary satellite must sit at about 36 000 km above the equator to take exactly 24 hours.</p>

<p><strong>gravitational force provides the centripetal force</strong><br><em>Key:</em> the single force keeping a planet or satellite in orbit points towards the centre of the orbit; without it the body would travel in a straight line.</p>

<h3>Weight elsewhere</h3>
<p><strong>W = mg</strong><br><em>Key:</em> W = weight (N); m = mass (kg), unchanged by location; g = gravitational field strength of that body (N/kg). On the Moon g is about 1.6 N/kg, so a 60 kg astronaut weighs about 96 N there and 588 N on Earth.</p>

<p><strong>g(Earth) = 9.8 N/kg and g(Moon) = 1.6 N/kg</strong><br><em>Key:</em> the two values used in 0625 questions; weight changes with g while mass does not, which is the whole point of the distinction.</p>

<h3>Astronomical distances</h3>
<p><strong>1 light year = 9.46 × 10¹⁵ m</strong><br><em>Key:</em> the distance light travels in one year, from d = vt with v = 3.0 × 10⁸ m/s and t = 3.15 × 10⁷ s. A light year is a distance, not a time.</p>

<p><strong>1 astronomical unit (AU) = 1.5 × 10¹¹ m</strong><br><em>Key:</em> the mean Earth–Sun distance, used for distances inside the Solar System; a light year is about 63 000 AU.</p>

<p><strong>orbital period of the planets: T² ∝ r³ (extension)</strong><br><em>Key:</em> T = orbital period (s or years); r = orbital radius (m or AU). Kepler's third law, which is why the outer planets take far longer to complete an orbit.</p>

<h3>Redshift and the expanding Universe</h3>
<p><strong>z = Δλ / λ</strong><br><em>Key:</em> z = redshift (no unit); Δλ (delta lambda) = increase in wavelength (m); λ = wavelength emitted in the laboratory (m). A larger z means the galaxy is receding faster.</p>

<p><strong>v = H₀ d (extension)</strong><br><em>Key:</em> v = recession speed of a galaxy (km/s); H₀ = the Hubble constant (about 70 km/s per Mpc); d = distance to the galaxy (Mpc). Plotting v against d and taking the gradient gives H₀, and 1/H₀ estimates the age of the Universe.</p>

<p><strong>redshift means the source is receding; blueshift means it is approaching</strong><br><em>Key:</em> the observed wavelength is stretched when the source moves away and compressed when it moves towards the observer — the same Doppler effect as a passing siren.</p>`,
    },
  },
};
