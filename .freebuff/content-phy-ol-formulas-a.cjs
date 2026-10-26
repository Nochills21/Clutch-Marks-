// Physics OL (0625) — appended "Equations and symbols" sections, batch A.
//
// One entry per notes row: the complete equation set for that syllabus area,
// each equation followed immediately by a key defining every symbol and its
// unit. Notation is Unicode (Δ, ρ, θ, λ, ½, ², ³, ⁻¹, ₀, √) because those
// glyphs render identically on the page, in the saved PDF and on flashcards,
// and because no note in the corpus is authored in LaTeX.
//
// Applied by `.freebuff/append-note-sections.cjs`, which appends and never
// replaces: `content = content || section` guarded by id, material_type and a
// marker check, so a second run is a no-op.
module.exports = {
  subject: "physics",
  level: "OL",
  sections: {
    "944a7eb4-3cc4-4439-bc06-3250049bf117": {
      slug: "measurement-units",
      html: `<h2>Equations and symbols</h2>
<p>Measurement is the one topic whose equations are mostly about the <em>arithmetic of uncertainty</em> rather than a physical law. Paper 6 marks the method, the significant figures and the uncertainty, so each relation below is given with the symbols it uses and the unit each symbol carries.</p>

<h3>Averages and rates</h3>
<p><strong>x̄ = (x₁ + x₂ + … + xₙ) / n</strong><br><em>Key:</em> x̄ = mean value (same unit as the readings); x₁ … xₙ = individual readings, all in the same unit; n = number of readings (no unit). Anomalous readings are discarded before averaging, never included and then blamed on the mean.</p>

<p><strong>v = d / t</strong><br><em>Key:</em> v = average speed (m/s); d = total distance travelled (m); t = total time taken (s). On a two-leg journey this is total distance over total time, not the mean of the two speeds.</p>

<p><strong>T = t / N</strong><br><em>Key:</em> T = period of one oscillation (s); t = total time for N oscillations (s); N = number of oscillations counted (no unit). Timing twenty swings and dividing moves the reaction-time error from each swing to the whole interval.</p>

<h3>Uncertainty</h3>
<p><strong>percentage uncertainty = (Δx / x) × 100%</strong><br><em>Key:</em> Δx = absolute uncertainty of the reading, taken as ± half the smallest division for a single reading (same unit as x); x = the reading itself; the result is a percentage (no unit).</p>

<p><strong>percentage uncertainty of a product or quotient = %A + %B</strong><br><em>Key:</em> %A, %B = the percentage uncertainties of the measured quantities being multiplied or divided. Adding the percentages is the rule whenever the quantities are combined by × or ÷.</p>

<p><strong>percentage uncertainty of a power = n × (%x)</strong><br><em>Key:</em> n = the power to which the quantity is raised (2 for an area, 3 for a volume); %x = the percentage uncertainty in the measured length. This is why a 5% uncertainty in a diameter becomes 15% in a volume.</p>

<h3>Geometry needed to find a volume</h3>
<p><strong>V = πr²h</strong><br><em>Key:</em> V = volume of a cylinder (m³ or cm³); r = radius, half the diameter (m or cm); h = height (m or cm); π = 3.14 (no unit).</p>

<p><strong>V = (4/3)πr³</strong><br><em>Key:</em> V = volume of a sphere (m³ or cm³); r = radius (m or cm). The cube is what makes the percentage uncertainty three times the radius's.</p>

<p><strong>A = πr²</strong><br><em>Key:</em> A = area of a circle (m² or cm²); r = radius (m or cm).</p>

<p><strong>V = V₂ − V₁</strong><br><em>Key:</em> V = volume of an irregular solid (cm³); V₂ = cylinder reading with the solid submerged (cm³); V₁ = cylinder reading before it was added (cm³).</p>

<h3>Converting units before substituting</h3>
<p><strong>1 km/h = 1000 m / 3600 s = 0.278 m/s</strong><br><em>Key:</em> divide a speed in km/h by 3.6 to get m/s. Converting after substituting is the commonest arithmetic error on Paper 2.</p>

<p><strong>1 g/cm³ = 1000 kg/m³</strong><br><em>Key:</em> multiply a density in g/cm³ by 1000 to use it with masses in kg and volumes in m³.</p>

<p><strong>1 cm² = 1 × 10⁻⁴ m² and 1 cm³ = 1 × 10⁻⁶ m³</strong><br><em>Key:</em> areas scale with the square of the length conversion and volumes with the cube, which is why 100 cm² is 0.01 m², not 1 m².</p>

<h3>The one derived quantity this topic measures</h3>
<p><strong>ρ = m / V</strong><br><em>Key:</em> ρ (rho) = density (kg/m³ or g/cm³); m = mass (kg or g); V = volume (m³ or cm³). The units must match before dividing: 250 g in 30 cm³ is 8.3 g/cm³, which is 8300 kg/m³.</p>`,
    },

    "e08e10e6-d123-407a-877f-dcc7c82c3d5b": {
      slug: "forces-motion",
      html: `<h2>Equations and symbols</h2>
<p>Every equation 0625 uses across statements 1.2, 1.3, 1.5 and 1.6, in the form the mark scheme expects. Motion equations assume constant acceleration in a straight line; the force equations are vector equations, so direction is part of the answer.</p>

<h3>Motion</h3>
<p><strong>v = Δs / Δt</strong><br><em>Key:</em> v = speed or velocity (m/s); Δs = change in displacement (m); Δt = time interval (s). Velocity is a vector, so a change of direction is a change of velocity even at constant speed.</p>

<p><strong>a = Δv / Δt = (v − u) / t</strong><br><em>Key:</em> a = acceleration (m/s²); v = final velocity (m/s); u = initial velocity (m/s); t = time taken (s). A negative a means deceleration.</p>

<p><strong>v² = u² + 2as</strong><br><em>Key:</em> v = final velocity (m/s); u = initial velocity (m/s); a = constant acceleration (m/s²); s = displacement (m). Use it whenever time is neither given nor asked for.</p>

<p><strong>s = ut + ½at²</strong><br><em>Key:</em> s = displacement (m); u = initial velocity (m/s); t = time (s); a = acceleration (m/s²). For a body released from rest, u = 0 and the distance is ½at².</p>

<p><strong>s = ½(u + v)t</strong><br><em>Key:</em> s = displacement (m); u, v = initial and final velocity (m/s); t = time (s). This is the area under a velocity–time graph for constant acceleration, which is why the area is always a valid route to distance.</p>

<p><strong>g = 9.8 N/kg (9.8 m/s²)</strong><br><em>Key:</em> g = gravitational field strength near the Earth's surface; numerically equal to free-fall acceleration, so a dropped body gains 9.8 m/s of speed each second in the absence of air resistance.</p>

<h3>Mass, weight and force</h3>
<p><strong>W = mg</strong><br><em>Key:</em> W = weight (N); m = mass (kg); g = gravitational field strength (N/kg), 9.8 on Earth and about 1.6 on the Moon. Mass stays in kilograms and does not change with location; weight is the force and does.</p>

<p><strong>F = ma</strong><br><em>Key:</em> F = resultant force (N); m = mass (kg); a = acceleration (m/s²). F is the <em>resultant</em> after friction and air resistance are subtracted, which is the single most common lost mark in this topic.</p>

<p><strong>R = √(F₁² + F₂²)</strong><br><em>Key:</em> R = magnitude of the resultant (N); F₁, F₂ = two perpendicular forces (N). For forces along one line, add them when they point the same way and subtract when they oppose.</p>

<p><strong>Balanced forces: ΣF = 0 implies a = 0</strong><br><em>Key:</em> ΣF = the vector sum of all forces (N); a = acceleration (m/s²). Zero resultant means at rest or at constant velocity — never "no forces acting".</p>

<h3>Moments and springs</h3>
<p><strong>M = F × d</strong><br><em>Key:</em> M = moment of the force (N m); F = the force (N); d = the perpendicular distance from the pivot to the line of action of the force (m). A distance measured along a slant gives the wrong moment.</p>

<p><strong>Σ clockwise moments = Σ anticlockwise moments</strong><br><em>Key:</em> the principle of moments, for a body in equilibrium. Each term is a force times its perpendicular distance (N m).</p>

<p><strong>F = kx</strong><br><em>Key:</em> F = load or tension (N); k = spring constant (N/m or N/cm); x = extension beyond the natural length (m or cm). Valid only up to the limit of proportionality; beyond it the graph curves and the equation stops applying.</p>

<p><strong>k = F / x</strong><br><em>Key:</em> k = spring constant (N/m); found as the gradient of the straight part of a force–extension graph, not from a single point beyond the limit.</p>

<h3>Momentum</h3>
<p><strong>p = mv</strong><br><em>Key:</em> p = momentum (kg m/s); m = mass (kg); v = velocity (m/s). Momentum is a vector: opposite directions need opposite signs.</p>

<p><strong>F = Δp / Δt</strong><br><em>Key:</em> F = average force acting (N); Δp = change in momentum (kg m/s); Δt = time over which it acts (s). This is the form that explains crumple zones and seatbelts: the same Δp spread over a longer Δt gives a smaller F.</p>

<p><strong>m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂</strong><br><em>Key:</em> m₁, m₂ = masses (kg); u₁, u₂ = velocities before the collision (m/s); v₁, v₂ = velocities after (m/s). Total momentum is conserved when no external resultant force acts; kinetic energy is not necessarily conserved.</p>`,
    },

    "d371087c-b171-4536-ae7e-16eadfdba067": {
      slug: "energy-work-power",
      html: `<h2>Equations and symbols</h2>
<p>Statement 1.7 is a small set of equations used in a large number of combinations. The two rules that carry most of the marks are that work needs a force along the displacement, and that power is a <em>rate</em>, so every time must be in seconds before dividing.</p>

<h3>Work and the energy stores</h3>
<p><strong>W = Fd</strong><br><em>Key:</em> W = work done (J); F = force in the direction of motion (N); d = distance moved along that direction (m). A force at right angles to the motion does no work.</p>

<p><strong>KE = ½mv²</strong><br><em>Key:</em> KE = kinetic energy (J); m = mass (kg); v = speed (m/s). The speed is squared, so doubling the speed quadruples the energy — the reason braking distance rises so steeply.</p>

<p><strong>GPE = mgh</strong><br><em>Key:</em> GPE = gravitational potential energy (J); m = mass (kg); g = gravitational field strength (9.8 N/kg); h = height gained (m). A fall is a loss of GPE, so state the sign or the word.</p>

<p><strong>KE lost = GPE gained (no friction)</strong><br><em>Key:</em> the conservation statement used to link the two stores. With friction or air resistance, part of the energy is transferred to the thermal store of the surroundings and the equality becomes an inequality.</p>

<p><strong>v = √(2gh)</strong><br><em>Key:</em> v = speed at the bottom of a frictionless fall (m/s); g = 9.8 m/s²; h = height fallen (m). It comes from ½mv² = mgh, and the mass cancels — which is why a feather and a hammer match on the Moon.</p>

<h3>Power</h3>
<p><strong>P = E / t = W / t</strong><br><em>Key:</em> P = power (W); E or W = energy transferred or work done (J); t = time taken (s). One watt is one joule per second.</p>

<p><strong>E = Pt</strong><br><em>Key:</em> E = energy transferred (J); P = power (W); t = time (s). With P in kilowatts and t in hours the energy comes out in kilowatt-hours, which is what a meter measures.</p>

<p><strong>P = Fv</strong><br><em>Key:</em> P = useful power output (W); F = driving force (N); v = constant speed (m/s). For a car at steady speed the driving force equals the total resistive force.</p>

<p><strong>1 kWh = 3.6 × 10⁶ J</strong><br><em>Key:</em> one kilowatt-hour is the energy of a 1000 W appliance running for one hour; 1 kW × 3600 s = 3.6 MJ.</p>

<h3>Efficiency</h3>
<p><strong>efficiency = (useful energy output / total energy input) × 100%</strong><br><em>Key:</em> both energies in joules (or both powers in watts, since the time cancels); the result is a percentage and can never exceed 100. A figure above 100 means the wrong quantity was used as the input.</p>

<p><strong>wasted energy = input − useful output</strong><br><em>Key:</em> the remainder is transferred by friction, air resistance or sound to the thermal store of the surroundings. Energy is not destroyed, so the widths of a Sankey diagram must balance.</p>

<p><strong>useful power of a lifting motor = mgh / t</strong><br><em>Key:</em> m = load mass (kg); g = 9.8 N/kg; h = height lifted (m); t = time taken (s). Comparing this with the electrical input VI gives the motor's efficiency.</p>`,
    },

    "61da5c21-d745-4a51-ba0c-2a861af41061": {
      slug: "pressure-density",
      html: `<h2>Equations and symbols</h2>
<p>Density and pressure share one theme: a quantity spread over a volume or an area. Every equation below is a ratio, so the units of the two quantities must match before dividing.</p>

<h3>Density</h3>
<p><strong>ρ = m / V</strong><br><em>Key:</em> ρ (rho) = density (kg/m³ or g/cm³); m = mass (kg or g); V = volume (m³ or cm³). 1 g/cm³ = 1000 kg/m³.</p>

<p><strong>ρ(water) = 1.0 g/cm³ = 1000 kg/m³</strong><br><em>Key:</em> the reference value that decides floating and sinking for most questions; a body denser than this sinks in water.</p>

<p><strong>V = m / ρ</strong><br><em>Key:</em> the same relation rearranged to find a volume (m³ or cm³) from a mass (kg or g) and a density. Useful when a question gives the mass of displaced water.</p>

<h3>Pressure on a surface</h3>
<p><strong>p = F / A</strong><br><em>Key:</em> p = pressure (Pa, where 1 Pa = 1 N/m²); F = force acting perpendicular to the surface (N); A = area of contact (m²). Halving the area doubles the pressure for the same force, which is the whole physics of a sharp blade.</p>

<p><strong>F = pA</strong><br><em>Key:</em> F = force on a surface (N); p = pressure (Pa); A = area (m²).</p>

<p><strong>1 kPa = 1000 Pa and 1 MPa = 1 × 10⁶ Pa</strong><br><em>Key:</em> prefixes applied to the pascal; atmospheric pressure is about 1.0 × 10⁵ Pa, which is 100 kPa.</p>

<h3>Pressure in a liquid</h3>
<p><strong>p = ρgh</strong><br><em>Key:</em> p = pressure due to the liquid (Pa); ρ (rho) = density of the liquid (kg/m³); g = 9.8 N/kg; h = depth below the surface (m). The pressure depends on depth and density only — not on the shape or width of the container.</p>

<p><strong>Δp = ρgΔh</strong><br><em>Key:</em> Δp = pressure difference between two depths (Pa); Δh = vertical separation of the two points (m). This is the equation behind a manometer reading and behind the pressure on a diver's eardrum.</p>

<p><strong>F₁ / A₁ = F₂ / A₂</strong><br><em>Key:</em> F₁, F₂ = forces on the input and output pistons (N); A₁, A₂ = their areas (m² or cm²). The pressure is transmitted unchanged, so a larger area gives a larger force — the hydraulic press.</p>

<h3>Upthrust and floating</h3>
<p><strong>U = ρ(fluid) × V(displaced) × g</strong><br><em>Key:</em> U = upthrust (N); ρ(fluid) = density of the fluid (kg/m³); V(displaced) = volume of fluid pushed aside (m³); g = 9.8 N/kg. This is Archimedes' principle written as an equation.</p>

<p><strong>floating: ρ(object) (less than) ρ(fluid)</strong><br><em>Key:</em> ρ(object) = the object's <em>average</em> density, including any trapped air (kg/m³). A steel ship floats because its average density is below water's, not because steel is light.</p>

<p><strong>V(submerged) / V(total) = ρ(object) / ρ(fluid)</strong><br><em>Key:</em> V(submerged) = volume below the surface (m³); V(total) = whole volume (m³). A body floating half-submerged in water has half water's density, about 500 kg/m³.</p>

<p><strong>sinking: weight (greater than) maximum upthrust</strong><br><em>Key:</em> weight = mg (N); maximum upthrust = the upthrust when the body is fully submerged. A body sinks when its density exceeds the fluid's, because even fully submerged the upthrust cannot reach its weight.</p>`,
    },

    "944cae75-d042-4e44-adb7-84ee5a7e4f18": {
      slug: "thermal-physics",
      html: `<h2>Equations and symbols</h2>
<p>Thermal physics at 0625 is built on two energy equations — one for a change of temperature, one for a change of state — plus the power relation that turns either into a rate. The specific heat capacity and specific latent heat values are given in the exam, so the marks are in choosing the right equation and the right mass.</p>

<h3>Heating and cooling</h3>
<p><strong>E = mcΔθ</strong><br><em>Key:</em> E = energy transferred to or from the substance (J); m = mass (kg); c = specific heat capacity (J/(kg °C)); Δθ (delta theta) = temperature change (°C). Use mcΔθ when the temperature changes but the state does not.</p>

<p><strong>c(water) = 4200 J/(kg °C)</strong><br><em>Key:</em> the energy needed to raise 1 kg of water by 1 °C. Water's high value is why it is used as a coolant and why coastal climates are mild.</p>

<p><strong>E = mL</strong><br><em>Key:</em> E = energy needed to change state (J); m = mass changing state (kg); L = specific latent heat (J/kg). Use it at a melting or boiling point, where the temperature stays constant while the state changes.</p>

<p><strong>L(fusion, water) = 3.34 × 10⁵ J/kg and L(vaporisation, water) = 2.26 × 10⁶ J/kg</strong><br><em>Key:</em> L(fusion) melts or freezes 1 kg without changing temperature; L(vaporisation) boils or condenses it. Boiling takes far more energy than melting, which is why steam burns are worse than boiling-water burns at the same temperature.</p>

<p><strong>E(total) = mcΔθ + mL</strong><br><em>Key:</em> the two stages of heating ice from below 0 °C to steam above 100 °C, added in sequence: warm the ice, melt it, warm the water, boil it, warm the steam. Each stage uses the equation that matches what is happening.</p>

<h3>Rate of energy transfer</h3>
<p><strong>P = E / t</strong><br><em>Key:</em> P = power of the heater or the rate of energy transfer (W); E = energy transferred (J); t = time (s). Combined with mcΔθ this gives P = mcΔθ / t, the standard heater calculation.</p>

<p><strong>efficiency = (energy gained by the substance / energy supplied) × 100%</strong><br><em>Key:</em> the useful gain is mcΔθ (J); the supplied energy is Pt (J). Heat lost to the surroundings is why a measured specific heat capacity often comes out higher than the data-book value.</p>

<h3>Temperature and the gas laws</h3>
<p><strong>T(K) = θ(°C) + 273</strong><br><em>Key:</em> T = thermodynamic temperature (K); θ (theta) = Celsius temperature (°C). Gas-law ratios need kelvin: doubling 20 °C to 40 °C is not a doubling in kelvin.</p>

<p><strong>p / T = constant (volume fixed)</strong><br><em>Key:</em> p = gas pressure (Pa); T = temperature (K). Heating a sealed container raises the pressure because the particles move faster and hit the walls harder and more often.</p>

<p><strong>p₁V₁ = p₂V₂ (temperature fixed)</strong><br><em>Key:</em> p₁, V₁ = pressure and volume before (Pa, m³); p₂, V₂ = after. Compressing a gas at constant temperature raises its pressure in inverse proportion.</p>

<p><strong>p₁V₁ / T₁ = p₂V₂ / T₂</strong><br><em>Key:</em> the combined form, with temperatures in kelvin. Any one of pressure, volume or temperature can be found if the other two change and the third is fixed.</p>

<h3>The particle model as a rule set</h3>
<p><strong>pressure ∝ rate of collision × momentum change per collision</strong><br><em>Key:</em> the qualitative gas model behind every explanation mark: more particles per unit volume, or faster particles, means more forceful collisions with the container walls, hence a higher pressure.</p>`,
    },
  },
};
