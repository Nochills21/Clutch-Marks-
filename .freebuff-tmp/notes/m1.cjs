// Mechanics 1 notes. Every worked number here was checked by hand.
module.exports = [
  {
    file: 'm1-dynamics',
    eyebrow: 'Pearson Edexcel International Mechanics 1, section 4',
    title: 'Mechanics 1: dynamics',
    syllabus: "Pearson Edexcel International Mechanics 1, section 4: Newton's laws, connected particles, momentum and impulse, and friction.",
    sections: [
      {
        h: "Newton's second law",
        why: 'The resultant force, not any single force, determines the acceleration.',
        paras: [
          'Newton\'s second law says that when a resultant force F acts on a particle of mass m, the particle accelerates in the direction of the force, with acceleration a given by F = ma. The resultant is the single force that has the same effect as all the forces acting together. Forces are vectors, so you add them as vectors: resolve each force into horizontal and vertical components, add the components, and then find the magnitude and direction of the result.',
          'Units matter. With mass in kilograms and acceleration in metres per second squared, force comes out in newtons, and 1 N is the force that gives a 1 kg mass an acceleration of 1 m/s². Weight is a force too, W = mg, with g about 9.8 m/s² near the Earth\'s surface. A 5 kg mass therefore has weight 49 N, and it is this weight, not the mass, that appears in the equations of motion.',
          'Most errors come from applying F = ma to the wrong thing. If forces are not in one line, write the equation along each axis separately. If there is a system of particles, decide whether the question needs the whole system or one particle, and write only the equations that the question needs.',
        ],
        formulas: ['F = ma', 'W = mg'],
        examples: [
          'a 6 N force and an 8 N force act at right angles on a 2 kg particle. The resultant is √(6² + 8²) = 10 N, so a = 10 ÷ 2 = 5 m/s². The resultant makes an angle tan⁻¹(6/8) ≈ 36.9° with the 8 N force.',
        ],
      },
      {
        h: 'Connected particles',
        why: 'A light inextensible string has the same tension throughout, so it links the accelerations of the particles it joins.',
        paras: [
          'When particles are joined by a string over a pulley, draw a separate force diagram for each particle and write one equation of motion for each, taking the direction of that particle\'s motion as positive. The tension T is the unknown that links them. Because the string is inextensible, both particles have accelerations of the same magnitude, and because the pulley is smooth, the tension is the same on both sides of it.',
          'Adding the two equations usually eliminates T and gives the acceleration directly. Substituting back gives the tension. A useful check is that the tension lies between the two weights for a hanging case, and that the heavier particle accelerates in its own direction.',
          'If one particle is on a horizontal table, its only horizontal force is the tension, and there is no vertical acceleration. Remember that on a smooth table the normal reaction balances the weight, so it does not appear in the horizontal equation.',
        ],
        formulas: ['For each particle: resultant force in its direction of motion = mass × acceleration'],
        examples: [
          'masses 3 kg and 2 kg hang either side of a smooth pulley, with g = 9.8 m/s². For the 3 kg mass: 3g − T = 3a. For the 2 kg mass: T − 2g = 2a. Adding gives g = 5a, so a = 1.96 m/s² and T = 2(a + g) ≈ 23.5 N. This lies between 2g = 19.6 N and 3g = 29.4 N, as expected.',
          'a 4 kg block on a smooth table is joined by a string over a smooth pulley at the table edge to a 2 kg mass hanging freely. For the block: T = 4a. For the hanging mass: 2g − T = 2a. Substituting gives 2g = 6a, so a = g/3 ≈ 3.27 m/s² and T = 4g/3 ≈ 13.1 N.',
        ],
      },
      {
        h: 'Inclined planes',
        why: 'Resolve the weight along and perpendicular to the plane; the perpendicular part is cancelled by the normal reaction.',
        paras: [
          'On a plane inclined at θ to the horizontal, the weight mg acts vertically downward. Resolving parallel to the plane gives a component mg sin θ down the slope. Resolving perpendicular to the plane gives mg cos θ into the plane, and the normal reaction R balances it, so R = mg cos θ when no other force acts perpendicular to the plane.',
          'On a smooth plane there is no friction, so the net force along the plane is mg sin θ and a = g sin θ. On a rough plane, friction F opposes the motion, so the net force along the plane is mg sin θ − F, with F ≤ μR = μmg cos θ.',
          'As θ increases, the component along the plane increases and the perpendicular component decreases. At θ = 90° the plane is vertical and a particle falls freely with a = g, which is a good check on any formula you derive.',
        ],
        formulas: ['Along the plane: mg sin θ', 'Perpendicular to the plane: R = mg cos θ'],
        examples: [
          'a 3 kg particle on a smooth plane at 30° has a = g sin 30° = 4.9 m/s² down the slope. If the same plane is rough with μ = 0.2 and the particle slides down, friction is 0.2 × 3g cos 30° ≈ 5.1 N, so a = (14.7 − 5.1) ÷ 3 ≈ 3.2 m/s².',
        ],
      },
      {
        h: 'Friction',
        why: 'Friction opposes motion and cannot exceed μR; when it reaches μR the particle is limiting.',
        paras: [
          'Friction is a contact force parallel to the surface. For a particle at rest it takes whatever value is needed to keep it at rest, up to a maximum F = μR. When the particle is moving, or about to move, friction takes its maximum value, F = μR, and it acts opposite to the direction of motion or the tendency to move.',
          'The normal reaction R comes from the forces perpendicular to the surface, and it is not always the weight. A force pressing the particle into the surface increases R; a force pulling it up decreases R. Always resolve perpendicular to the surface before writing F = μR.',
          'A common error is using F = μR when no sliding is taking place. In that case friction is unknown: find it from the equation of motion, then check that it does not exceed μR. If it does, the particle must slide, and friction is μR.',
        ],
        formulas: ['F ≤ μR, with F = μR when the particle is limiting'],
        examples: [
          'a 5 kg block on a horizontal plane with μ = 0.2 and g = 9.8: R = 49 N and the limiting friction is 9.8 N. A horizontal push of 12 N exceeds 9.8 N, so the block moves with a = (12 − 9.8) ÷ 5 = 0.44 m/s².',
          'the same block is pulled at 30° above the horizontal with a 20 N force. Vertically R = 49 − 20 sin 30° = 39 N, so the friction limit is 7.8 N. Horizontally 20 cos 30° ≈ 17.3 N, so a = (17.3 − 7.8) ÷ 5 ≈ 1.9 m/s².',
        ],
      },
      {
        h: 'Momentum and impulse',
        why: 'Impulse is the change in momentum, which gives speeds without finding accelerations.',
        paras: [
          'Momentum is mass times velocity, p = mv. It is a vector and is measured in kg m/s, which is the same as N s. Impulse is the force multiplied by the time for which it acts, and it equals the change in momentum: I = mv − mu, where u is the initial velocity and v is the final velocity. This follows from F = ma, since F = m(v − u) ÷ t rearranges to Ft = m(v − u).',
          'Impulse is the quickest route when a constant force acts over a known time, or when only velocities are asked for. Because impulse is a vector, a reversal of direction gives a negative impulse, so a sign convention must be chosen and kept throughout the question.',
          'Check the units: a 2 kg mass multiplied by a speed in m/s gives kg m/s, and a force multiplied by a time in s gives N s. Mixing grams with kilograms is a common source of lost marks.',
        ],
        formulas: ['I = Ft = mv − mu'],
        examples: [
          'a 2 kg particle slows from 3 m/s to 2 m/s. Its impulse is 2(2 − 3) = −2 N s, so the impulse opposes the motion. A constant 5 N force acting on a 2 kg mass at rest for 4 s gives I = 20 N s, so v = 20 ÷ 2 = 10 m/s.',
        ],
      },
      {
        h: 'Direct collisions',
        why: 'For two particles, momentum is conserved because the collision forces are equal and opposite, so their impulses cancel.',
        paras: [
          'In a collision the forces between the two particles are equal and opposite and act for the same time, so their impulses cancel. The total momentum of the pair is the same before and after: m1u1 + m2u2 = m1v1 + m2v2. Choose one direction as positive and give each velocity a sign to match.',
          'If the particles stick together, they share one velocity afterwards, so the right side has a single term (m1 + m2)v. If they separate, there are two unknown velocities, and you need one more fact, such as the velocity of one particle after the collision, before both can be found.',
          'An explosion is the reverse of a collision: the pair starts together and separates. Total momentum before equals total momentum after, so if the pair starts at rest, the two momenta afterwards must be equal and opposite.',
        ],
        formulas: ['m1u1 + m2u2 = m1v1 + m2v2'],
        examples: [
          'a 2 kg particle moving at 3 m/s hits a 1 kg particle at rest, and they stick together. Momentum: 2 × 3 = 3v, so v = 2 m/s. A 3 kg and a 1 kg particle start at rest and separate, with the 3 kg moving forward at 2 m/s: 0 = 3(2) + 1·v, so the 1 kg particle moves at −6 m/s, that is, 6 m/s backwards.',
        ],
      },
    ],
    exam: [
      'Draw a force diagram and label every force before writing any equation.',
      'For connected particles, write one equation for each particle, not one for the whole system.',
      'Use F = μR only when the particle is moving or limiting; otherwise find friction from the equations.',
      'Choose one positive direction for momentum and impulse questions and keep the signs consistent.',
    ],
  },
  {
    file: 'm1-statics-and-moments',
    eyebrow: 'Pearson Edexcel International Mechanics 1, sections 5 and 6',
    title: 'Mechanics 1: statics and moments',
    syllabus: 'Pearson Edexcel International Mechanics 1, sections 5 and 6: equilibrium of a particle under coplanar forces, friction, and moments.',
    sections: [
      {
        h: 'Forces as vectors',
        why: 'Any force can be split into two perpendicular components, and the components add like ordinary numbers.',
        paras: [
          'A force is written as a pair of components, (X, Y), where X is the horizontal part and Y the vertical part. The magnitude is √(X² + Y²), and the direction is found with tan θ = Y ÷ X, taking care with the quadrant. Two forces are added by adding their horizontal components and their vertical components separately.',
          'The reason this works is that horizontal and vertical motions are independent. A particle can only accelerate in the direction of the resultant, so the components give a full description of the forces acting.',
          'When a force is given as a magnitude and an angle, the components are F cos θ and F sin θ, measured from the positive x-axis. Make sure the angle is measured from the correct axis; many errors come from using sin where cos is needed.',
        ],
        formulas: ['Components: (F cos θ, F sin θ)', 'Magnitude: √(X² + Y²)'],
        examples: [
          'the forces (3, 4) N and (−1, 2) N act on a particle. Their resultant is (2, 6) N, with magnitude √(4 + 36) = √40 ≈ 6.32 N.',
        ],
      },
      {
        h: 'Equilibrium of a particle',
        why: 'A particle is in equilibrium when the resultant of all the forces on it is zero.',
        paras: [
          'For a particle in equilibrium, the sum of the horizontal components is zero and the sum of the vertical components is zero. These are two independent equations, so at most two unknown forces can be found from a problem with a particle in equilibrium.',
          'A useful alternative is the triangle of forces: if three forces are in equilibrium, placed head to tail they form a closed triangle. The sine rule or the cosine rule can then give unknown magnitudes. This works only when the forces are in equilibrium, not merely when they act at a point.',
          'Always state the angle clearly on a diagram. Many exam questions give an angle to the horizontal in one place and to the vertical in another, and the wrong reference makes every later equation wrong.',
        ],
        formulas: ['ΣX = 0 and ΣY = 0 for equilibrium'],
        examples: [
          'a 10 N weight hangs from a point, held by two strings: one at 30° to the horizontal on the left, with tension T1, and one at 45° to the horizontal on the right, with tension T2. Horizontally T1 cos 30° = T2 cos 45°, and vertically T1 sin 30° + T2 sin 45° = 10. Solving gives T2 ≈ 8.97 N and T1 ≈ 7.32 N.',
        ],
      },
      {
        h: 'Friction in equilibrium',
        why: 'Friction in equilibrium is not automatically at its maximum: it takes the smallest value that keeps the particle still, up to μR.',
        paras: [
          'When a particle is in equilibrium on a rough surface, the friction force F is unknown and satisfies 0 ≤ F ≤ μR. Find F from the equilibrium equations, then check that the value found does not exceed μR. If it does, the particle cannot be in equilibrium and it slides.',
          'When the particle is on the point of moving, friction is limiting and F = μR. This is the case used to find the largest or smallest force that keeps a particle at rest. Such problems are asked with words such as "least", "greatest", or "on the point of".',
          'The normal reaction is again found from the perpendicular equilibrium equation, so a force pulling the particle upwards reduces R and therefore reduces the friction that can be used.',
        ],
        formulas: ['0 ≤ F ≤ μR in equilibrium', 'F = μR when limiting'],
        examples: [
          'a 4 kg block rests on a horizontal rough floor with μ = 0.5, and a horizontal force P is applied. Then R = 4g = 39.2 N, so the largest P that keeps the block at rest is μR = 0.5 × 39.2 = 19.6 N.',
        ],
      },
      {
        h: 'Moments',
        why: 'A body is in rotational equilibrium when the clockwise and anticlockwise moments about any point are equal.',
        paras: [
          'The moment of a force about a point is the force multiplied by the perpendicular distance from the point to the line of action of the force. Moments are measured in N m. A force passing through the point has zero moment, which is why a well-chosen point removes unknown forces from an equation.',
          'For a body in equilibrium, the sum of clockwise moments about any point equals the sum of anticlockwise moments. Choose the point where the unknown force acts, so that its moment is zero, and solve for the remaining unknown.',
          'For a uniform beam, the weight acts at the midpoint. A common mistake is to use the distance from the end of the beam when the question gives the distance from the pivot, so draw the distances on the diagram before writing the equation.',
        ],
        formulas: ['Moment = force × perpendicular distance', 'Clockwise moments = anticlockwise moments'],
        examples: [
          'a uniform beam of length 4 m and weight 40 N rests on a pivot 1 m from its left end. A 40 N weight hangs from the left end. The beam\'s weight acts at its midpoint, 1 m to the right of the pivot, giving a clockwise moment of 40 N m. The hanging weight is 1 m to the left, giving an anticlockwise moment of 40 N m. The beam balances.',
        ],
      },
    ],
    exam: [
      'Mark the angle reference on every diagram before you resolve.',
      'Use the equilibrium equations in each direction, and check the sign of every component.',
      'For a moments question, choose the pivot where an unknown force has zero moment.',
      'Use F = μR only for limiting friction; otherwise leave F as an unknown with 0 ≤ F ≤ μR.',
    ],
  },
  {
    file: 'm1-vectors-and-kinematics',
    eyebrow: 'Pearson Edexcel International Mechanics 1, sections 2 and 3',
    title: 'Mechanics 1: vectors and kinematics',
    syllabus: 'Pearson Edexcel International Mechanics 1, sections 2 and 3: vectors in mechanics and motion in a straight line with constant acceleration.',
    sections: [
      {
        h: 'Vectors in mechanics',
        why: 'Displacement, velocity and acceleration all have magnitude and direction, so they are written as vectors.',
        paras: [
          'A displacement vector gives the change in position from one point to another. Its magnitude is the distance in a straight line, and its direction is the angle it makes with a reference direction. Velocity is the rate of change of displacement, and acceleration is the rate of change of velocity, so both are vectors too.',
          'A velocity written as (3, −4) m/s has speed √(3² + (−4)²) = 5 m/s, which is the magnitude of the vector. The direction is given by the components: the particle moves 3 m/s east and 4 m/s south.',
          'Speed is the magnitude of velocity and is a scalar. A common error in exam questions is to treat speed and velocity as the same thing when the direction changes, so always ask whether the question wants a vector or a magnitude.',
        ],
        formulas: ['Speed = |v| = √(vx² + vy²)'],
        examples: [
          'a particle has velocity (3, −4) m/s. Its speed is 5 m/s, and it travels in the direction of the vector (3, −4), that is, 3 m/s east and 4 m/s south.',
        ],
      },
      {
        h: 'Constant-acceleration formulae',
        why: 'With constant acceleration, four equations link the five quantities s, u, v, a and t, and any three known values give the other two.',
        paras: [
          'The standard equations are v = u + at, s = ut + ½at², v² = u² + 2as, and s = ½(u + v)t. Each one involves four of the five quantities, so choose the equation that contains the quantities you know and the one you want. Writing down the five quantities first avoids the most common mistake, which is picking an equation that needs a value you have not been given.',
          'Acceleration due to gravity is a constant, so these formulae apply to vertical motion as well. Take upward as positive, so g acts with a = −9.8 m/s², or take downward as positive. Whichever you choose, keep it consistent throughout the question.',
          'At the highest point of a vertical motion, the velocity is zero. This gives an equation with v = 0, which is often the quickest route to the maximum height or the time to reach it.',
        ],
        formulas: ['v = u + at', 's = ut + ½at²', 'v² = u² + 2as', 's = ½(u + v)t'],
        examples: [
          'a car accelerates uniformly from rest to 20 m/s with a = 2 m/s². Then t = 10 s, and s = ½ × 2 × 10² = 100 m, so the distance travelled is 100 m.',
          'a ball is thrown upwards at 15 m/s, with g = 9.8 m/s². At the top, v = 0, so 0 = 15² − 2(9.8)s, giving s = 225 ÷ 19.6 ≈ 11.5 m. The time to reach the top is 15 ÷ 9.8 ≈ 1.53 s.',
        ],
      },
      {
        h: 'Graphs of motion',
        why: 'On a displacement-time graph the gradient is the velocity; on a velocity-time graph the gradient is the acceleration and the area is the displacement.',
        paras: [
          'A displacement-time graph has gradient equal to velocity. A horizontal line means the particle is at rest, and a steeper line means a larger speed. A velocity-time graph has gradient equal to acceleration, and the area between the line and the time axis equals the displacement.',
          'If the area is below the axis, it counts as negative displacement, so a velocity-time graph that dips below zero shows motion in the opposite direction. The total distance travelled is found by adding the areas as positive, which can differ from the displacement.',
          'For a velocity-time graph made of straight lines, split the region into triangles and trapezia and add their areas. This is faster and more reliable than using a formula for the whole region.',
        ],
        formulas: ['Gradient of s–t graph = velocity', 'Area under v–t graph = displacement'],
        examples: [
          'a velocity-time graph rises linearly from 0 to 12 m/s in 4 s, then stays at 12 m/s until t = 10 s. The displacement is ½ × 4 × 12 + 6 × 12 = 24 + 72 = 96 m.',
        ],
      },
    ],
    exam: [
      'Write the five quantities s, u, v, a and t before choosing a formula.',
      'Keep one positive direction throughout a vertical-motion question.',
      'Use v = 0 at the highest point when finding maximum height or the time to reach it.',
      'On a v–t graph, check whether an area is above or below the axis before adding it.',
    ],
  },
];
