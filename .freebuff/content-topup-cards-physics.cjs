// Top-up module: Physics — flashcard top-ups (5 fresh cards per topic).
// Covers OL (10), AS (9) and A2 (8) topics currently holding 10-12 cards each.
module.exports = {
  groups: [
  {
    subject: "physics",
    level: "OL",
    topics: [
    { slug: "measurement-units", cards: [
      ["SI base units", "metre, kilogram, second, ampere, kelvin, mole, candela."],
      ["Scalars and vectors", "Scalars have magnitude only; vectors have magnitude and direction."],
      ["Prefixes", "kilo = 10^3, centi = 10^-2, milli = 10^-3, micro = 10^-6."],
      ["Density", "mass / volume, in kg/m^3."],
      ["Significant figures", "Report answers to the least precise data used."],
    ]},
    { slug: "forces-motion", cards: [
      ["Speed", "distance / time; scalar quantity."],
      ["Velocity", "speed in a given direction; vector quantity."],
      ["Acceleration", "change in velocity / time; a = (v - u)/t."],
      ["Newton's first law", "Objects keep their velocity unless a resultant force acts."],
      ["Balanced forces", "Equal and opposite forces give zero resultant: no acceleration."],
    ]},
    { slug: "energy-work-power", cards: [
      ["Kinetic energy", "KE = 1/2 mv^2."],
      ["Gravitational PE", "GPE = mgh near the Earth's surface."],
      ["Work done", "force x distance moved in the direction of the force."],
      ["Power", "work done / time; measured in watts."],
      ["Conservation of energy", "Energy cannot be created or destroyed, only transferred."],
    ]},
    { slug: "pressure-density", cards: [
      ["Pressure", "force / area; measured in pascals (Pa)."],
      ["Pressure in liquids", "P = rho g h, increasing with depth."],
      ["Atmospheric pressure", "About 101 kPa at sea level, decreasing with altitude."],
      ["Upthrust", "Buoyant force equal to the weight of fluid displaced (Archimedes)."],
      ["Hooke's law", "F = k x extension (up to the limit of proportionality)."],
    ]},
    { slug: "thermal-physics", cards: [
      ["Temperature vs heat", "Temperature measures average kinetic energy; heat is energy transfer."],
      ["Specific heat capacity", "Energy to raise 1 kg by 1 K: E = mc delta T."],
      ["Latent heat", "Energy for a phase change at constant temperature: E = mL."],
      ["Conduction", "Energy transfer through a material by vibrating particles and free electrons."],
      ["Convection", "Heat transfer by movement of fluids (warm fluid rises)."],
    ]},
    { slug: "waves-sound", cards: [
      ["Wave basics", "Amplitude, frequency, wavelength, wave speed: v = f lambda."],
      ["Transverse waves", "Oscillations perpendicular to travel (light, water waves)."],
      ["Longitudinal waves", "Oscillations parallel to travel (sound: compressions and rarefactions)."],
      ["Reflection", "Wave bounces off a surface; angle of incidence = angle of reflection."],
      ["Echo", "Reflected sound heard after the original; distance = speed x time / 2."],
    ]},
    { slug: "electricity-circuits", cards: [
      ["Ohm's law", "V = IR for ohmic conductors at constant temperature."],
      ["Series circuits", "Current same everywhere; resistances add."],
      ["Parallel circuits", "Voltage same across branches; currents add."],
      ["Electrical power", "P = VI = I^2 R."],
      ["Fuse", "Thin wire that melts when current exceeds its rating, breaking the circuit."],
    ]},
    { slug: "magnetism-electromagnetism", cards: [
      ["Magnetic field", "Region where a magnetic pole experiences a force."],
      ["Field around a wire", "Concentric circles; direction given by the right-hand grip rule."],
      ["Electromagnets", "Coils with iron cores strengthen the field; used in relays and cranes."],
      ["Fleming's left hand", "Relates motor force, field and current directions."],
      ["Generator effect", "Moving a conductor through a field induces a voltage (electromagnetic induction)."],
    ]},
    { slug: "nuclear-physics", cards: [
      ["Isotopes", "Same element, different neutron numbers; same chemical properties."],
      ["Radioactive decay", "Random emission of alpha, beta or gamma radiation."],
      ["Alpha particles", "Helium nuclei; stopped by paper; most ionising."],
      ["Half-life", "Time for half the nuclei in a sample to decay."],
      ["Nuclear fission", "Splitting a heavy nucleus releasing energy and neutrons (reactors)."],
    ]},
    { slug: "earth-space", cards: [
      ["Solar system", "Eight planets orbiting the Sun under gravity."],
      ["Orbits", "Elliptical paths maintained by gravitational attraction."],
      ["Moons and satellites", "Natural or artificial bodies orbiting larger ones."],
      ["Gravity", "Attractive force between masses; keeps planets in orbit."],
      ["Light-year", "Distance light travels in one year (~9.46 x 10^15 m)."],
    ]},
    ]
  },
  {
    subject: "physics",
    level: "AS",
    topics: [
    { slug: "kinematics", cards: [
      ["Displacement", "Distance in a given direction (vector)."],
      ["Velocity-time graph", "Gradient = acceleration; area under graph = displacement."],
      ["Displacement-time graph", "Gradient = velocity; flat sections = rest."],
      ["Free fall", "All bodies fall with a = g = 9.8 m/s^2 (ignoring air resistance)."],
      ["Terminal velocity", "Reached when drag equals weight; acceleration becomes zero."],
    ]},
    { slug: "dynamics", cards: [
      ["Newton's second law", "F = ma with F the resultant force."],
      ["Inertia", "Resistance to change in motion; measured by mass."],
      ["Newton's third law", "Equal and opposite forces act on DIFFERENT bodies."],
      ["Momentum", "p = mv; conserved in collisions."],
      ["Impulse", "Force x time = change of momentum."],
    ]},
    { slug: "forces-and-equilibrium", cards: [
      ["Resultant force", "Single force with the same effect as all forces combined."],
      ["Equilibrium", "Zero resultant force AND zero resultant moment."],
      ["Moment", "Force x perpendicular distance from the pivot."],
      ["Centre of mass", "Point where the whole weight of a body appears to act."],
      ["Couples", "Equal opposite parallel forces creating rotation only."],
    ]},
    { slug: "work-energy-and-power", cards: [
      ["Work", "W = Fs cos(theta); energy transferred mechanically."],
      ["Power", "P = work/time = force x velocity."],
      ["Efficiency", "useful output energy / total input energy x 100%."],
      ["Elastic potential energy", "E = 1/2 k x^2 stored in a stretched spring."],
      ["Conservation of energy", "Total energy of a closed system stays constant."],
    ]},
    { slug: "materials-deformation", cards: [
      ["Hooke's law", "F = kx; extension proportional to load up to the limit."],
      ["Elastic deformation", "Returns to original shape when load is removed."],
      ["Plastic deformation", "Permanent shape change beyond the elastic limit."],
      ["Young's modulus", "Stress/strain; stiffness of a material."],
      ["Stress and strain", "Stress = force/area; strain = extension/original length."],
    ]},
    { slug: "waves", cards: [
      ["Wave speed", "v = f lambda."],
      ["Period", "T = 1/f; time for one complete oscillation."],
      ["Refraction", "Speed change bends waves entering a new medium."],
      ["Diffraction", "Waves spread through gaps or around obstacles."],
      ["Electromagnetic spectrum", "Radio to gamma; all travel at 3 x 10^8 m/s in vacuum."],
    ]},
    { slug: "superposition", cards: [
      ["Superposition", "Displacements of overlapping waves add together."],
      ["Constructive interference", "Waves in phase: amplitudes add (louder/brighter)."],
      ["Destructive interference", "Waves in antiphase: amplitudes cancel."],
      ["Two-source interference", "Path difference = n lambda gives maxima; half-integer lambda gives minima."],
      ["Stationary waves", "Formed by counter-propagating waves; nodes stay fixed."],
    ]},
    { slug: "electricity-d-c-circuits", cards: [
      ["Drift velocity", "Slow net movement of electrons along a conductor."],
      ["Resistivity", "R = rho L / A; property of the material."],
      ["Internal resistance", "Real sources waste voltage internally: E = V + Ir."],
      ["Potential divider", "Series resistors share voltage in proportion to resistance."],
      ["Kirchhoff's laws", "Current into a junction = current out; total EMF = sum of p.d.s."],
    ]},
    { slug: "motion-in-a-circle-and-gravity", cards: [
      ["Centripetal acceleration", "a = v^2/r directed towards the centre."],
      ["Angular speed", "omega = 2 pi/T; v = omega r."],
      ["Gravitational field strength", "g = GM/r^2; decreases with distance from the mass."],
      ["Kepler's third law", "T^2 proportional to r^3 for planetary orbits."],
      ["Geostationary orbit", "Period 24 h above the equator; stays above one point."],
    ]},
    ]
  },
  {
    subject: "physics",
    level: "A2",
    topics: [
    { slug: "circular-motion-and-shm", cards: [
      ["SHM condition", "Acceleration proportional to displacement and directed towards the centre: a = -omega^2 x."],
      ["SHM equations", "x = A cos(omega t); v = omega sqrt(A^2 - x^2)."],
      ["Phase difference", "Fraction of a cycle between two oscillating quantities."],
      ["Resonance", "Large amplitude when a driving frequency matches the natural frequency."],
      ["Damping", "Reduces amplitude over time; critical damping returns to rest fastest."],
    ]},
    { slug: "thermal-physics", cards: [
      ["Specific latent heat", "Energy for a phase change per unit mass: E = mL."],
      ["Kinetic theory", "Temperature measures the mean kinetic energy of molecules."],
      ["Ideal gas law", "pV = nRT; pV = NkT for a fixed mass."],
      ["Root-mean-square speed", "Increases with temperature and falls with molar mass."],
      ["Thermal radiation", "Emission increases with temperature (Stefan-Boltzmann law)."],
    ]},
    { slug: "electric-fields-and-capacitance", cards: [
      ["Electric field strength", "E = F/q; force per unit positive charge."],
      ["Point charge field", "E = kQ/r^2, radial field."],
      ["Capacitance", "C = Q/V; charge stored per volt, in farads."],
      ["Capacitor energy", "E = 1/2 QV = 1/2 CV^2."],
      ["Capacitor discharge", "Q = Q0 e^(-t/RC); time constant tau = RC."],
    ]},
    { slug: "magnetic-fields-and-electromagnetism", cards: [
      ["Force on a charge", "F = Bqv sin(theta); perpendicular to B and v."],
      ["Force on a wire", "F = BIL sin(theta) in a magnetic field."],
      ["Solenoid field", "B = mu0 n I inside a long solenoid."],
      ["Ampere's law", "Relates magnetic field around a current to the current enclosed."],
      ["Electromagnetic induction", "EMF = -rate of change of flux linkage (Faraday's law)."],
    ]},
    { slug: "quantum-physics", cards: [
      ["Photon", "Quantum of light energy: E = hf = hc/lambda."],
      ["Photoelectric effect", "Emission of electrons when light exceeds a threshold frequency."],
      ["Work function", "Minimum energy to liberate an electron from a metal surface."],
      ["Photoelectric equation", "hf = phi + KE_max."],
      ["Wave-particle duality", "Light and matter exhibit both waves and particle behaviour."],
    ]},
    { slug: "nuclear-physics", cards: [
      ["Mass defect", "Mass of a nucleus is less than its parts; converted to binding energy."],
      ["Binding energy per nucleon", "Measures nuclear stability; peaks near iron."],
      ["Nuclear fission", "Heavy nuclei split, releasing energy and neutrons."],
      ["Nuclear fusion", "Light nuclei combine, releasing energy (stars)."],
      ["Radioactive decay law", "N = N0 e^(-lambda t); half-life = ln2/lambda."],
    ]},
    { slug: "oscillations-and-waves-ii", cards: [
      ["Damped oscillations", "Amplitude decays as energy is dissipated to surroundings."],
      ["Forced oscillations", "Oscillation driven at the frequency of an external periodic force."],
      ["Natural frequency", "Frequency at which a system oscillates when undisturbed."],
      ["Standing waves", "Nodes and antinodes; formed between fixed boundaries."],
      ["Polarisation", "Confining oscillation direction to one plane; transverse waves only."],
    ]},
    { slug: "astronomy-and-cosmology", cards: [
      ["Stellar parallax", "Shift in a star's apparent position; used to measure distances."],
      ["Hubble's law", "Recession velocity proportional to distance: v = H0 d."],
      ["Cosmic microwave background", "Thermal radiation left from the early universe."],
      ["Redshift", "Light stretched to longer wavelengths by expansion (or motion away)."],
      ["Stellar evolution", "Main sequence -> red giant/supernova -> white dwarf/neutron star/black hole."],
    ]},
    ]
  }
  ]
};
