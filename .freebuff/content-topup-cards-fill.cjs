// Top-up module: final flashcard fill — tops the last 34 topics (12-14 cards)
// to 15+ with fronts that do not collide with the sets already in the database.
// Each topic gets a couple of cards above the deficit so a dedup skip can never
// leave it short.
module.exports = {
  groups: [
  {
    subject: "computer-science",
    level: "OL",
    topics: [
    { slug: "algorithms-programming", cards: [
      ["Procedure vs function", "A procedure performs a task and returns nothing; a function returns a value."],
      ["Search vs sort", "Search finds an item's position; sort rearranges items into order."],
      ["Boolean operators", "AND, OR and NOT combine conditions in selection and iteration."],
    ]},
    { slug: "operating-systems", cards: [
      ["Scheduling", "The OS decides which process runs next, keeping the CPU and peripherals busy."],
      ["Virtual memory", "Uses disk space as an extension of RAM so more programs can run at once."],
      ["File management", "The OS organises files and folders, tracks storage and handles permissions."],
    ]},
    { slug: "database-systems", cards: [
      ["Redundancy", "The same data stored in several places; a DBMS removes it by normalising."],
      ["Data dictionary", "Central store describing every field: name, type, size and permitted values."],
      ["Forms and reports", "Forms capture or display one record; reports present data for a reader."],
    ]},
    { slug: "web-technologies", cards: [
      ["Cookies", "Small files a site stores on the visitor's device to remember state between pages."],
      ["HTTP methods", "GET retrieves a page; POST sends form data to the server."],
      ["Bandwidth", "Data transfer rate of a connection; low bandwidth makes pages slow to load."],
      ["Static vs dynamic pages", "Static pages are identical for everyone; dynamic pages are built per request."],
      ["Browser rendering", "HTML structures, CSS styles, JavaScript adds behaviour — loaded in order."],
    ]},
    { slug: "robotics-ai", cards: [
      ["Turing test", "Test of machine intelligence: can a judge tell a computer's replies from a human's?"],
      ["AI in everyday life", "Spam filters, recommendation systems, translation and voice assistants."],
      ["Knowledge base", "In an expert system, the stored facts and rules a reasoner applies to new data."],
    ]},
    ],
  },
  {
    subject: "computer-science",
    level: "AS",
    topics: [
    { slug: "information-representation", cards: [
      ["Two's complement range", "n bits store -2^(n-1) to 2^(n-1)-1; 8 bits gives -128 to 127."],
      ["Unicode vs ASCII", "ASCII is 7-bit (128 characters); Unicode uses 16+ bits for every script."],
      ["Why some images compress badly", "Detailed photographic images have little repetition for compression to remove."],
    ]},
    { slug: "databases", cards: [
      ["ACID", "Atomicity, Consistency, Isolation, Durability — the four guarantees of a transaction."],
      ["Candidate key", "A field (or pair) that could uniquely identify a record; one becomes the primary key."],
      ["Self-join need", "A table joined to itself when one column references the same table's key."],
    ]},
    ],
  },
  {
    subject: "computer-science",
    level: "A2",
    topics: [
    { slug: "data-types-and-file-organisation", cards: [
      ["Record and file", "A record groups fields about one item; a file is a collection of records."],
      ["Direct (random) access", "Any record can be reached immediately via its key, without reading the rest."],
      ["Run-length encoding", "Replaces repeated consecutive values with value + count; lossless compression."],
    ]},
    ],
  },
  {
    subject: "mathematics",
    level: "OL",
    topics: [
    { slug: "number-arithmetic-and-place-value", cards: [
      ["Factor vs multiple", "A factor divides exactly into a number; a multiple is a number's times table."],
      ["Prime factorisation", "Break a number into prime factors, then read off HCF or LCM from the powers."],
      ["Upper and lower bounds", "Round to the nearest stated unit, then half a unit up and down."],
    ]},
    { slug: "number-fractions-decimals-and-percentages", cards: [
      ["Adding fractions", "Make denominators equal first, then add the numerators only."],
      ["Percent multiplier", "An increase of 15% multiplies by 1.15; a decrease of 15% multiplies by 0.85."],
      ["Successive percentages", "Apply each percentage change in turn — never add them."],
    ]},
    { slug: "number-ratio-rate-and-proportion", cards: [
      ["Ratio and fraction link", "A share of 2:3 gives the first part 2/5 of the whole."],
      ["Finding k in y = kx", "Substitute one matching pair, solve for k, then reuse it."],
      ["Sharing money in a ratio", "Add the ratio parts, find one part, then multiply up per person."],
      ["Rates with units", "Keep the units attached — 60 km/h for 2 h gives 120 km, not 30 km."],
    ]},
    { slug: "number-indices-and-standard-form", cards: [
      ["Index laws: adding powers", "When multiplying powers of the same base, add the indices."],
      ["Roots as fractional powers", "The n-th root of x is x^(1/n)."],
      ["Large numbers in standard form", "Write as a x 10^n with 1 <= a < 10; n counts the place-value shift."],
    ]},
    { slug: "algebra-simplifying-and-expanding", cards: [
      ["Double bracket expansion", "Multiply every term in the first bracket by every term in the second."],
      ["Negative outside brackets", "Distribute the minus sign across every term inside."],
      ["Subtracting a bracket", "Subtracting (a - b) is -a + b — the sign flips on both terms."],
      ["Common denominator first", "Before adding algebraic fractions, rewrite over a shared denominator."],
      ["Multiplying three terms", "Multiply the numbers and the variables separately, adding index powers."],
    ]},
    { slug: "algebra-equations", cards: [
      ["Clearing brackets", "Expand brackets before collecting like terms on each side."],
      ["Equations with fractions", "Multiply through by the denominator to clear every fraction."],
      ["Subject of a formula", "Rearrange so the wanted variable stands alone using inverse operations."],
      ["Checking a solution", "Substitute the answer back into the original equation — both sides must match."],
    ]},
    { slug: "algebra-inequalities", cards: [
      ["Inequalities with brackets", "Expand as usual, but remember multiplying by a negative flips the sign."],
      ["Graphing a linear inequality", "Draw the boundary line dashed for < or >, solid for <= or >=."],
      ["Trapping values", "A double inequality pins x between two bounds — plot both ends on a number line."],
    ]},
    { slug: "algebra-sequences-and-functions", cards: [
      ["Quadratic nth term", "Look for a constant second difference, then build x^2, 2x^2, 3x^2 terms."],
      ["Generating terms", "Substitute n = 1, 2, 3... into the rule to list the sequence."],
      ["Domain and range", "Domain is the set of allowed inputs; range is the set of outputs produced."],
    ]},
    { slug: "mensuration-area-and-volume", cards: [
      ["Sphere and hemisphere volume", "V = (4/3) pi r^3; a hemisphere is half of that plus its base circle."],
      ["Parallelogram area", "A = base x perpendicular height — not the slanted side length."],
      ["Surface area of a prism", "Add the areas of all faces: two ends plus every rectangular side."],
    ]},
    { slug: "mensuration-bearings-and-loci", cards: [
      ["Measuring a bearing", "Align the protractor at north on the point, measure clockwise to the line."],
      ["Bearing with trigonometry", "Use the sine or cosine rule in the triangle, then convert the angle to a bearing."],
      ["Regions bounded by loci", "Shade the area satisfying every condition at once — the overlap wins."],
    ]},
    { slug: "transformations-and-vectors", cards: [
      ["Reading a translation", "The column vector gives right/up movement: top is horizontal, bottom vertical."],
      ["Negative scale factor", "An enlargement with scale -1 rotates the shape through the centre."],
      ["Subtracting vectors", "a - b = a + (-b): reverse b, then add head to tail."],
      ["Midpoint via vectors", "Midpoint of AB is position vector (a + b)/2."],
    ]},
    { slug: "trigonometry-sine-and-cosine-rules", cards: [
      ["SOH CAH TOA", "sin = opposite/hypotenuse, cos = adjacent/hypotenuse, tan = opposite/adjacent."],
      ["Exact values", "sin/cos 30, 45, 60 and tan 45, 60 come from two standard triangles — learn them."],
      ["Elevation and depression", "Both angles are measured from the horizontal: up to an object or down from it."],
      ["Right-angled triangle basics", "Two known sides or one side plus an angle unlock the rest via SOH CAH TOA."],
    ]},
    { slug: "statistics-probability", cards: [
      ["Sample space listing", "Write every outcome once, then count the favourable ones over the total."],
      ["Complement rule", "P(not A) = 1 - P(A) — often the fastest route when the opposite is rare."],
      ["Addition rule for overlap", "P(A or B) = P(A) + P(B) - P(A and B)."],
    ]},
    { slug: "scatter-diagrams-and-correlation", cards: [
      ["Drawing a line of best fit", "Balance the points either side; it need not pass through any data point."],
      ["Estimating from a trend line", "Read up from the x-value to the line, then across to the y-axis."],
      ["Negative correlation example", "As one variable rises the other falls, e.g. altitude vs temperature."],
    ]},
    ],
  },
  {
    subject: "mathematics",
    level: "A2",
    topics: [
    { slug: "the-normal-distribution", cards: [
      ["68-95-99.7 rule", "Within 1 SD of the mean sits 68% of data, 2 SDs 95%, 3 SDs 99.7%."],
      ["Continuity correction", "When approximating a discrete distribution, extend the boundary by 0.5 either side."],
      ["Conditions for normal approximation", "np and n(1-p) both at least 5; state the correction if the counts are small."],
    ]},
    ],
  },
  {
    subject: "physics",
    level: "OL",
    topics: [
    { slug: "measurement-units", cards: [
      ["Vernier calipers", "Read the main scale, then add the vernier reading where its mark lines up."],
      ["Random vs systematic errors", "Random errors scatter around a mean; systematic errors shift every reading one way."],
      ["Speed as a derived unit", "m/s comes from base units: metres divided by seconds."],
      ["Consistency of units", "Every term in an equation must share units before the numbers mean anything."],
    ]},
    { slug: "energy-work-power", cards: [
      ["Sankey diagram", "Arrow widths show energy splits; useful output plus wasted = total input."],
      ["Kilowatt hour", "Energy from a 1 kW appliance running for 1 hour = 3.6 x 10^6 J."],
      ["Work done against friction", "W = friction force x distance — energy transferred to thermal stores."],
      ["Renewable energy sources", "Wind, solar, hydro, tidal and geothermal replenish on a human timescale."],
      ["Kinetic energy formula", "KE = 1/2 m v^2 — velocity matters twice over because it is squared."],
    ]},
    { slug: "pressure-density", cards: [
      ["Pressure on a square surface", "F = p x A: multiply the pressure by the area to get the force."],
      ["Dam walls thicken at the base", "Liquid pressure rises with depth, so the base must resist the greatest load."],
      ["Atmospheric pressure and weather", "Falling pressure often signals approaching rain; rising pressure brings clear skies."],
    ]},
    { slug: "thermal-physics", cards: [
      ["Melting and boiling points", "Pure substances melt and boil at fixed temperatures at a stated pressure."],
      ["Specific latent heat meaning", "Per unit mass, and the temperature stays constant throughout the change."],
      ["Conduction in metals", "Free electrons carry kinetic energy through the metal far faster than lattice vibrations."],
      ["Heat capacity vs specific heat capacity", "Heat capacity is per object (J/K); specific is per kilogram (J/kg/K)."],
      ["Why metals feel colder", "They conduct heat away from your hand quickly — the surface is not colder."],
    ]},
    { slug: "waves-sound", cards: [
      ["Diffraction and gap size", "Waves spread most when the gap is close to their wavelength."],
      ["Polarisation", "Confines oscillation to one plane; only transverse waves can be polarised."],
      ["Uses of the EM spectrum", "Radio broadcasts, microwaves cook, IR remotes, UV sterilises, X-rays image bones."],
    ]},
    { slug: "magnetism-electromagnetism", cards: [
      ["Fleming's right-hand rule", "Thumb = motion, first finger = field, second finger = current — for generators."],
      ["Factors affecting an electromagnet", "More turns, more current and an iron core all strengthen the field."],
      ["Permanent vs induced magnets", "Permanent magnets keep their field; induced ones only magnetise near a field."],
    ]},
    ],
  },
  {
    subject: "physics",
    level: "AS",
    topics: [
    { slug: "dynamics", cards: [
      ["Newton's first law", "A body stays at rest or at constant velocity unless a resultant force acts."],
      ["Inelastic collision", "Momentum is conserved but kinetic energy is not — some becomes heat or sound."],
      ["Momentum is a vector", "Direction matters; take one way as positive and keep signs consistent."],
      ["Explosions", "Total momentum stays zero if the system started at rest — parts fly apart equally."],
    ]},
    { slug: "work-energy-and-power", cards: [
      ["Work done against friction", "W = Fd with F the friction force; the energy ends up as thermal energy."],
      ["Kilowatt hour", "1 kWh = 3.6 MJ; the unit household electricity bills use."],
      ["Power = force x velocity", "P = Fv — derived from P = W/t with W = Fs."],
      ["Resistive forces drain energy", "Work done against drag and friction is real energy, just not useful output."],
    ]},
    { slug: "materials-deformation", cards: [
      ["Ductile vs brittle", "Ductile materials stretch plastically before breaking; brittle ones snap suddenly."],
      ["Tensile vs compressive", "Tension pulls and lengthens; compression pushes and shortens or buckles."],
      ["Reading a stress-strain graph", "The linear region obeys Hooke's law; its gradient gives Young's modulus."],
    ]},
    ],
  },
  {
    subject: "physics",
    level: "A2",
    topics: [
    { slug: "circular-motion-and-shm", cards: [
      ["Period and frequency link", "T = 1/f; angular speed omega = 2 pi f."],
      ["Centripetal force sources", "Tension, gravity, friction or the normal reaction can provide it."],
      ["Forced oscillations", "Driven at the forcing frequency; amplitude peaks at resonance when damping is low."],
    ]},
    { slug: "astronomy-and-cosmology", cards: [
      ["H-R diagram", "Plots luminosity against temperature; most stars sit on the main sequence band."],
      ["Apparent and absolute magnitude", "Apparent is seen from Earth; absolute is the brightness at 10 parsecs."],
      ["End states of stars", "Low-mass stars end as white dwarfs; massive ones as neutron stars or black holes."],
    ]},
    ],
  },
  ]
};
