// Top-up module: Mathematics AS — statistics-s1 & mechanics-m1 (empty topics).
// Notes + 15 questions (5 exam tier + 10 drill) + 15 flashcards each.
// Arithmetic re-derived: IQR=4, coded mean 11/SD 4, fence 40, SD sqrt(20.8)=4.56,
// b=Sxy/Sxx=0.75, s=80, a=4, t=sqrt(90/9.8)=3.03, moment F=40, friction 0.4*49=19.6.
module.exports = {
  subject: "mathematics",
  level: "AS",
  topics: [
    {
      slug: "statistics-s1",
      notes: `# Statistics 1: data, sampling and correlation

S1 is about collecting, summarising and relating data. You must choose sensible models, compute summary statistics quickly, code data, spot outliers and fit a regression line.

### Sampling

- Random sample: every member of the population has equal chance of selection.
- Systematic: every kth member. Stratified: split population into strata, sample each in proportion.
- Bias must be avoided: random numbers, representative strata, no convenience sampling.

### Averages

- Mean: x-bar = (sum of x) / n. Sensitive to outliers.
- Median: the middle value; for n values ordered, position (n + 1)/2. Robust to outliers.
- Mode: the most frequent value.

### Measuring spread

- Range = largest - smallest.
- Quartiles: Q1 is the median of the lower half, Q3 the median of the upper half; IQR = Q3 - Q1.
- Variance = (sum of x^2)/n - (x-bar)^2, and SD = sqrt(variance).
- The variance uses squared units; the SD returns to the original units.

### Coding

For x = a + by: mean of x = a + b x-bar, SD of x = |b| SD of y. Coding never changes the correlation coefficient.

### Outliers and box plots

An outlier lies below Q1 - 1.5 x IQR or above Q3 + 1.5 x IQR. Box plots show min, Q1, median, Q3, max (whiskers to the furthest non-outlier).

### Correlation and regression

- The product moment correlation coefficient r measures linear strength: -1 <= r <= 1.
- r close to +1: strong positive linear; close to -1: strong negative; close to 0: no linear correlation. Correlation is not causation.
- Regression line of y on x: y = a + bx with b = Sxy / Sxx and a = y-bar - b x-bar. Use it to interpolate, never extrapolate.`,
      exam: [
        ["Find the interquartile range of 3, 5, 5, 7, 9, 12.", ["2", "4", "5", "6"], 1, "Q1 = median of 3, 5, 5 = 5. Q3 = median of 7, 9, 12 = 9. IQR = 9 - 5 = 4."],
        ["A coding is x = 2y + 3. The data y have mean 4 and standard deviation 2. Find the mean and standard deviation of x.", ["(8, 4)", "(11, 2)", "(11, 4)", "(7, 4)"], 2, "Mean of x = 2(4) + 3 = 11. SD of x = |2| x 2 = 4. Coding shifts the mean by the constant and scales the spread by the multiplier."],
        ["For a data set, Q1 = 10 and Q3 = 22. Which value counts as an outlier?", ["36", "30", "38", "42"], 3, "IQR = 22 - 10 = 12, so the upper fence is Q3 + 1.5 x IQR = 22 + 18 = 40. Only 42 lies above 40."],
        ["For 5 values: sum of x = 40 and sum of x^2 = 424. Find the standard deviation to 3 significant figures.", ["4.56", "20.8", "5.73", "6.51"], 0, "Mean = 40/5 = 8. Variance = 424/5 - 8^2 = 84.8 - 64 = 20.8. SD = sqrt(20.8) = 4.56 (3 s.f.)."],
        ["For bivariate data: Sxy = 24, Sxx = 32, x-bar = 5, y-bar = 9. Find the regression line of y on x.", ["y = 9 + 0.75x", "y = 5.25 + 0.75x", "y = 0.75 + 5.25x", "y = 5.25 + 9x"], 1, "b = Sxy / Sxx = 24/32 = 0.75. a = y-bar - b x-bar = 9 - 0.75(5) = 5.25. So y = 5.25 + 0.75x."],
      ],
      extra: [
        ["Find the mean of 4, 7, 9, 10.", ["7", "8", "7.5", "9"], 2, "Sum = 30 over 4 values, so the mean is 7.5."],
        ["Find the median of 2, 8, 9, 11, 13, 15, 17.", ["9", "11", "13", "12"], 1, "With 7 ordered values the median is the 4th, which is 11."],
        ["Find the mode of 3, 3, 5, 7, 7, 7, 9.", ["7", "3", "5", "9"], 0, "The mode is the most frequent value: 7 appears three times."],
        ["Find the range of 12, 19, 5, 8.", ["7", "12", "8", "14"], 3, "Range = largest - smallest = 19 - 5 = 14."],
        ["A coding is x = y - 5 and the mean of y is 12. What is the mean of x?", ["17", "7", "60", "2.4"], 1, "Subtracting 5 shifts the mean down by 5: mean of x = 12 - 5 = 7."],
        ["A correlation coefficient r = -0.9 is calculated. Which conclusion is correct?", ["Strong positive linear correlation", "No correlation", "Strong negative linear correlation", "The variables are causally linked"], 2, "r close to -1 indicates a strong negative linear correlation. Correlation never implies causation."],
        ["Every value in a data set is 12. What is the standard deviation?", ["0", "12", "1", "144"], 0, "No value differs from the mean, so the variance and hence the SD are 0."],
        ["For any data set, what is the sum of (x - x-bar) over all values?", ["n", "0", "1", "x-bar"], 1, "The deviations about the mean balance exactly, so they sum to 0. This is why the variance squares the deviations."],
        ["A data set has 25 ordered values. What is the position of the median?", ["12th", "25th", "13th", "26th"], 2, "The median position is (n + 1)/2 = (25 + 1)/2 = 13th value."],
        ["Which quantity is measured in the same units as the original data?", ["The variance", "The standard deviation", "Sxx", "The mean of x^2"], 1, "The variance uses squared units; the square root returns the SD to the original units."],
      ],
      cards: [
        ["Random sample", "Every population member has equal chance of selection; avoids bias."],
        ["Mean", "x-bar = (sum of x) / n; sensitive to outliers."],
        ["Median", "Middle ordered value at position (n + 1)/2; robust to outliers."],
        ["Mode", "Most frequent value."],
        ["Range", "Largest value minus smallest value."],
        ["Quartiles", "Q1 = median of lower half, Q3 = median of upper half."],
        ["IQR", "Q3 - Q1; the spread of the middle 50%."],
        ["Variance", "(sum of x^2)/n - (x-bar)^2; in squared units."],
        ["Standard deviation", "Square root of the variance; same units as the data."],
        ["Coding x = a + by", "Mean: a + b x-bar. SD: |b| x SD(y). Correlation unchanged."],
        ["Outlier rule", "Below Q1 - 1.5 x IQR or above Q3 + 1.5 x IQR."],
        ["Box plot", "Shows min, Q1, median, Q3, max with whiskers to furthest non-outlier."],
        ["Correlation coefficient r", "-1 <= r <= 1; measures strength of LINEAR association only."],
        ["Regression line of y on x", "y = a + bx with b = Sxy / Sxx, a = y-bar - b x-bar."],
        ["Interpolation vs extrapolation", "Use regression inside the data range; extrapolating is unreliable."],
      ],
    },
    {
      slug: "mechanics-m1",
      notes: `# Mechanics 1: forces and motion

M1 models particles under constant acceleration and in equilibrium. The whole subject rests on three pillars: the SUVAT equations, Newton's laws, and the turning-effect (moments) of forces.

### Kinematics (constant acceleration)

- v = u + at
- s = ut + (1/2)at^2
- v^2 = u^2 + 2as
- s = (u + v)t / 2
- A displacement-time graph has gradient = velocity; a velocity-time graph has gradient = acceleration and area = displacement.
- Free fall: a = g = 9.8 m/s^2 downwards; a ball thrown up decelerates at g on the way up.

### Dynamics: Newton's laws

- First law: a body stays at rest or constant velocity unless a resultant force acts.
- Second law: F = ma, where F is the resultant force on the particle.
- Third law: every action has an equal and opposite reaction, acting on DIFFERENT bodies.
- Weight = mg, acting vertically downwards through the centre of mass.

### Connected particles

Treat the system as one body first (F = total mass x a) to find the acceleration, then isolate one particle to find the connecting force (tension in a string, thrust in a tow bar).

### Forces at angles

Resolve horizontally and vertically: a force F at angle theta to the horizontal has components F cos(theta) and F sin(theta). Equilibrium means the resultant force in each direction is zero.

### Friction

- F <= mu R, with limiting friction F = mu R when the body is on the point of slipping.
- Friction opposes motion (or the tendency to motion) and acts along the surface.
- On a rough inclined plane: R = mg cos(theta) and the component down the plane is mg sin(theta).

### Moments

- Moment of a force = force x perpendicular distance from the pivot.
- A rigid body in equilibrium has zero resultant force AND zero total moment about any point.
- Uniform beams have their weight acting at the mid-point.`,
      exam: [
        ["A car starts from rest and accelerates at 2.5 m/s^2 for 8 s. Find the distance travelled.", ["40 m", "80 m", "100 m", "20 m"], 1, "Using s = ut + (1/2)at^2 with u = 0: s = (1/2)(2.5)(8^2) = (1/2)(2.5)(64) = 80 m."],
        ["A 12 N resultant force acts on a 3 kg block on a smooth horizontal surface. Find the acceleration.", ["36 m/s^2", "0.25 m/s^2", "4 m/s^2", "9 m/s^2"], 2, "Newton's second law: F = ma, so a = F/m = 12/3 = 4 m/s^2."],
        ["A ball is dropped from rest and falls 45 m under gravity (g = 9.8 m/s^2). Find the time taken to 3 significant figures.", ["3.03 s", "4.59 s", "2.16 s", "9.18 s"], 0, "s = (1/2)gt^2 gives 45 = 4.9t^2, so t^2 = 9.1837 and t = 3.03 s (3 s.f.)."],
        ["On a beam, a 20 N load sits 3 m from a pivot. What force applied 1.5 m from the pivot on the other side balances the beam?", ["10 N", "60 N", "20 N", "40 N"], 3, "For balance the moments match: 20 x 3 = F x 1.5, so F = 60/1.5 = 40 N."],
        ["A 5 kg block rests on a rough horizontal surface with mu = 0.4 (g = 9.8). What is the maximum frictional force?", ["9.8 N", "19.6 N", "20.5 N", "1.23 N"], 1, "R = mg = 5 x 9.8 = 49 N, so limiting friction F = mu R = 0.4 x 49 = 19.6 N."],
      ],
      extra: [
        ["A particle moves from rest with a = 3 m/s^2 for 4 s. What is its final velocity?", ["7 m/s", "12 m/s", "15 m/s", "24 m/s"], 1, "v = u + at = 0 + 3 x 4 = 12 m/s."],
        ["What is the weight of a 2 kg mass (g = 9.8)?", ["9.8 N", "20 N", "19.6 N", "10 N"], 2, "Weight = mg = 2 x 9.8 = 19.6 N."],
        ["A car travelling at 20 m/s brakes to rest in 4 s. What is the acceleration?", ["5 m/s^2", "-20 m/s^2", "-0.2 m/s^2", "-5 m/s^2"], 3, "a = (v - u)/t = (0 - 20)/4 = -5 m/s^2; the negative sign means deceleration."],
        ["A particle has u = 10 m/s and a = -2 m/s^2 for 5 s. Find the displacement.", ["30 m", "25 m", "50 m", "10 m"], 1, "s = ut + (1/2)at^2 = 10(5) + (1/2)(-2)(25) = 50 - 25 = 25 m."],
        ["Newton's third law pairs always:", ["Act on the same body", "Act on different bodies and are equal and opposite", "Cancel to give zero resultant", "Act in the same direction"], 1, "A third-law pair acts on two different bodies (e.g. car pushes road, road pushes car), so they never cancel on one body."],
        ["Forces of 3 N and 4 N act at right angles on a particle. What is their resultant?", ["7 N", "1 N", "12 N", "5 N"], 3, "By Pythagoras: R = sqrt(3^2 + 4^2) = sqrt(25) = 5 N."],
        ["A particle is in equilibrium. Which statement must hold?", ["Its velocity is zero", "The resultant force on it is zero", "No forces act on it", "Its acceleration is g"], 1, "Equilibrium means zero resultant force, so acceleration is zero; the particle may still move with constant velocity."],
        ["A block of mass m rests on a rough plane inclined at angle theta. What is the normal reaction?", ["mg sin(theta)", "mg tan(theta)", "mg cos(theta)", "mg"], 2, "Resolving perpendicular to the plane: R = mg cos(theta); the component of weight down the plane is mg sin(theta)."],
        ["A 4 kg block and a 6 kg block are connected by a light string and pulled by 20 N on a smooth surface. Find the acceleration.", ["3.3 m/s^2", "5 m/s^2", "2 m/s^2", "0.4 m/s^2"], 2, "Treat both as one system: F = (4 + 6)a, so a = 20/10 = 2 m/s^2."],
        ["On a velocity-time graph, what does the area under the graph represent?", ["Acceleration", "Displacement", "Speed", "Distance only"], 1, "The area under a velocity-time graph is the displacement; the gradient is the acceleration."],
      ],
      cards: [
        ["SUVAT 1", "v = u + at (constant acceleration only)."],
        ["SUVAT 2", "s = ut + (1/2)at^2."],
        ["SUVAT 3", "v^2 = u^2 + 2as (no time needed)."],
        ["SUVAT 4", "s = (u + v)t / 2."],
        ["Free fall", "a = g = 9.8 m/s^2 downwards; a rising ball decelerates at g."],
        ["Newton's first law", "No resultant force means constant velocity (or rest)."],
        ["Newton's second law", "F = ma with F the resultant force."],
        ["Newton's third law", "Equal and opposite forces on DIFFERENT bodies."],
        ["Weight", "W = mg, acts vertically down through the centre of mass."],
        ["Connected particles", "Find a from the whole system, then isolate one body for the connecting force."],
        ["Resolving a force", "F at angle theta: horizontal F cos(theta), vertical F sin(theta)."],
        ["Friction", "F <= mu R; limiting friction F = mu R at the point of slipping."],
        ["Inclined plane", "R = mg cos(theta); component down plane = mg sin(theta)."],
        ["Moment", "Force x perpendicular distance from the pivot."],
        ["Rigid body equilibrium", "Resultant force zero AND total moment about any point zero."],
      ],
    },
  ],
};
