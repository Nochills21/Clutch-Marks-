// Top-up module: Physics A2 — further-mechanics (empty topic).
// Notes + 21 questions (11 exam tier + 10 drill) + 15 flashcards, matching the
// depth of the other A2 physics topics (21 q / 11 exam).
// Arithmetic verified: 2*4/5 = 1.6; 50*0.4/2 = 10; 0.5*36/2 = 9; sqrt(9.8*0.8) = 2.8;
// elastic v2' = 4; T = 2*pi*sqrt(0.866/9.8) = 1.87; atan(0.408) = 22.2 deg;
// KE loss 8-2 = 6 J; w^2 r = 36*0.5 = 18; 0.5*64/4 = 8 N; 60*3/40 = 4.5.
module.exports = {
  subject: "physics",
  level: "A2",
  topics: [
    {
      slug: "further-mechanics",
      notes: `# Further mechanics: momentum, impulse and circular motion

This unit unifies two big ideas: momentum (with its conservation law) and circular motion (with its centripetal requirement). Both are favourite sources of longer exam questions.

### Momentum and impulse

- Momentum p = mv, a vector measured in kg m/s.
- Impulse = force x time = change of momentum: F t = m(v - u). Units N s (equivalently kg m/s).
- Newton's second law in momentum form: F = rate of change of momentum = m(v - u)/t.
- A force-time graph has area = impulse.

### Conservation of momentum

- In a closed system (no external resultant force) total momentum before = total after. This is a vector law: in two dimensions, resolve along two perpendicular axes.
- It holds for all collisions, explosions and separations.

### Collisions

- Elastic: total kinetic energy is conserved as well as momentum (e.g. perfectly hard spheres).
- Inelastic: kinetic energy is not conserved — it transforms into heat, sound and deformation.
- Perfectly inelastic: the bodies stick together; this gives the maximum kinetic energy loss.
- In one dimension use simultaneous momentum (and, if elastic, energy) equations.

### Circular motion

- Angular speed: omega = 2 pi / T = 2 pi f = v / r.
- A body moving in a circle at constant speed still accelerates: centripetal acceleration a = v^2 / r = omega^2 r, directed towards the centre.
- The centripetal force is the resultant force towards the centre: F = m v^2 / r = m omega^2 r. It is not a new type of force — tension, weight, friction or normal reaction can supply it.

### Vertical circles and pendulums

- For a body on a string in a vertical circle, the string stays taut at the top only if v >= sqrt(g r).
- Conical pendulum: a mass on a string sweeps a horizontal circle; with string length L at angle theta to the vertical, tan(theta) = v^2/(r g) and the period is T = 2 pi sqrt(L cos(theta)/g).
- Banked track with no friction: tan(theta) = v^2/(r g); the normal reaction supplies the centripetal force.

### Exam technique

- Momentum is a vector: fix a positive direction and keep signs consistent.
- Energy is scalar and never negative; check whether the collision is elastic before conserving energy.
- For circles, draw the force diagram at the point of interest first, then resolve towards the centre.`,
      exam: [
        ["A 2 kg ball moving at 4 m/s collides head-on with a stationary 3 kg ball and the two stick together. Find their common velocity.", ["2.4 m/s", "1.6 m/s", "0.8 m/s", "3.2 m/s"], 1, "Momentum conservation: 2(4) + 3(0) = 5v, so v = 8/5 = 1.6 m/s."],
        ["A 2 kg trolley at rest is pushed by a 50 N force for 0.4 s on a smooth surface. Find its final speed.", ["5 m/s", "20 m/s", "10 m/s", "2.5 m/s"], 2, "Impulse Ft = 50 x 0.4 = 20 N s = change of momentum = 2v, so v = 10 m/s."],
        ["A 0.5 kg ball moves in a circle of radius 2 m at 6 m/s. Find the centripetal force.", ["4.5 N", "18 N", "9 N", "3 N"], 2, "F = m v^2 / r = 0.5 x 36 / 2 = 9 N, directed towards the centre."],
        ["A ball of mass m is swung in a vertical circle on a light string of length 0.8 m. Find the minimum speed at the highest point for the string to stay taut (g = 9.8).", ["3.9 m/s", "2.8 m/s", "5.6 m/s", "1.4 m/s"], 1, "At the top the limiting case has tension zero: mg = mv^2/r, so v = sqrt(g r) = sqrt(9.8 x 0.8) = sqrt(7.84) = 2.8 m/s."],
        ["A 2 kg ball moving at 3 m/s collides elastically head-on with a stationary 1 kg ball. Find the velocity of the 1 kg ball after the collision.", ["1 m/s", "2 m/s", "3 m/s", "4 m/s"], 3, "For an elastic head-on collision with target at rest: v2' = 2 m1 v1/(m1 + m2) = 2(2)(3)/3 = 4 m/s."],
        ["A conical pendulum has a string of length 1.0 m at 30 degrees to the vertical (g = 9.8). Find its period to 3 s.f.", ["2.00 s", "1.87 s", "1.42 s", "3.74 s"], 1, "T = 2 pi sqrt(L cos(theta)/g) = 2 pi sqrt(cos30/9.8) = 2 pi sqrt(0.08837) = 2 pi(0.2973) = 1.87 s."],
        ["A circular track of radius 100 m is banked so that a car travelling at 20 m/s needs no sideways friction (g = 9.8). Find the banking angle.", ["11.5 degrees", "30.0 degrees", "22.2 degrees", "44.4 degrees"], 2, "tan(theta) = v^2/(r g) = 400/980 = 0.4082, so theta = arctan(0.4082) = 22.2 degrees."],
        ["A 3 kg trolley moving at 2 m/s collides head-on with a 1 kg trolley moving at 2 m/s in the opposite direction; they stick together. Find the kinetic energy lost in the collision.", ["4 J", "6 J", "8 J", "2 J"], 1, "Total momentum = 6 - 2 = 4 kg m/s over 4 kg gives v = 1 m/s. KE before = 6 + 2 = 8 J; KE after = 2 J; lost = 6 J."],
        ["A particle moves in a circle of radius 0.5 m with angular speed 6 rad/s. Find its centripetal acceleration.", ["12 m/s^2", "27 m/s^2", "3 m/s^2", "18 m/s^2"], 3, "a = omega^2 r = 36 x 0.5 = 18 m/s^2."],
        ["A 0.5 kg ball on a light string travels in a horizontal circle of radius 4 m at 8 m/s. Find the tension.", ["16 N", "8 N", "2 N", "4 N"], 1, "The tension supplies the centripetal force: T = m v^2/r = 0.5 x 64/4 = 8 N."],
        ["An ice-skater of mass 60 kg moves off at 3 m/s after pushing against a stationary 40 kg partner on smooth ice. Find the partner's recoil speed.", ["3.0 m/s", "4.5 m/s", "6.0 m/s", "2.25 m/s"], 1, "Total momentum is zero before and after: 60(3) + 40v = 0, so the partner moves at 4.5 m/s in the opposite direction."],
      ],
      extra: [
        ["Find the momentum of a 5 kg trolley moving at 6 m/s.", ["11 kg m/s", "30 kg m/s", "25 kg m/s", "36 kg m/s"], 1, "p = mv = 5 x 6 = 30 kg m/s."],
        ["A 20 N force acts for 3 s. What impulse does it deliver?", ["20 N s", "3 N s", "66 N s", "60 N s"], 3, "Impulse = Ft = 20 x 3 = 60 N s."],
        ["Find the kinetic energy of a 2 kg ball moving at 3 m/s.", ["18 J", "6 J", "9 J", "4.5 J"], 2, "KE = (1/2)mv^2 = 0.5 x 2 x 9 = 9 J."],
        ["A particle completes a circle in 0.25 s. Find its period and frequency.", ["T = 0.25 s, f = 4 Hz", "T = 4 s, f = 0.25 Hz", "T = 0.25 s, f = 2 Hz", "T = 0.5 s, f = 2 Hz"], 0, "The period is the time for one revolution, T = 0.25 s, and f = 1/T = 4 Hz."],
        ["A particle has angular speed 5 rad/s in a circle of radius 2 m. Find its speed.", ["2.5 m/s", "10 m/s", "5 m/s", "0.4 m/s"], 1, "v = omega r = 5 x 2 = 10 m/s."],
        ["What distinguishes an inelastic collision?", ["Momentum is not conserved", "Kinetic energy is not conserved", "Both momentum and KE are conserved", "The bodies must stick together"], 1, "In every collision momentum is conserved, but in an inelastic collision kinetic energy is transformed into heat, sound or deformation."],
        ["Under what condition is the total momentum of a system conserved?", ["No external resultant force acts", "Kinetic energy is constant", "The collision is elastic", "All bodies have equal mass"], 0, "Momentum is conserved whenever the net external force on the system is zero."],
        ["In uniform circular motion, the centripetal acceleration points:", ["Away from the centre", "Tangentially forwards", "Towards the centre", "Along the velocity"], 2, "Centripetal means 'centre-seeking': the acceleration is perpendicular to the velocity, towards the centre of the circle."],
        ["A particle moves in a circle of period 0.5 s. What is its frequency?", ["4 Hz", "0.5 Hz", "2 Hz", "1 Hz"], 2, "f = 1/T = 1/0.5 = 2 Hz."],
        ["A particle moves in a circle at constant speed. Which statement about its velocity is correct?", ["It is constant in magnitude and direction", "It is constant in magnitude but changes direction", "It is zero", "It increases steadily"], 1, "The speed is constant but the direction of motion turns continuously, so the velocity (a vector) is not constant."],
      ],
      cards: [
        ["Momentum", "p = mv, vector, units kg m/s."],
        ["Impulse", "Ft = change of momentum = m(v - u); units N s."],
        ["Newton's second law (momentum)", "F = rate of change of momentum."],
        ["Force-time graph", "Area under the graph equals the impulse."],
        ["Conservation of momentum", "Total momentum before = after when no external resultant force acts."],
        ["Elastic collision", "Momentum AND kinetic energy are conserved."],
        ["Inelastic collision", "Momentum conserved; kinetic energy lost to heat/sound/deformation."],
        ["Perfectly inelastic", "Bodies stick together; maximum kinetic energy loss."],
        ["Kinetic energy", "KE = (1/2)mv^2."],
        ["Angular speed", "omega = 2 pi/T = 2 pi f = v/r."],
        ["Centripetal acceleration", "a = v^2/r = omega^2 r, towards the centre."],
        ["Centripetal force", "F = m v^2/r = m omega^2 r; supplied by real forces (tension, weight, friction)."],
        ["Vertical circle minimum", "String just taut at the top when v = sqrt(g r)."],
        ["Conical pendulum", "tan(theta) = v^2/(rg); T = 2 pi sqrt(L cos(theta)/g)."],
        ["Banked track (no friction)", "tan(theta) = v^2/(rg); the normal reaction supplies the centripetal force."],
      ],
    },
  ],
};
