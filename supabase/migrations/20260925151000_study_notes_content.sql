-- Study-notes content seed: IGCSE (OL) + AS/A2 topic notes generated from the
-- curated markdown study pack (6 packs: Maths, Physics, Computer Science).
-- Topics: 150. Idempotent: existing topics are UPDATED in place
-- (matched by subject+level+name); missing ones are inserted. Existing topic
-- slugs are never overwritten so saved URLs keep working.

-- 1) Subjects and the three levels (no-ops when present).
insert into public.subjects (name, slug, description, icon, color, sort_order)
values
  ('Mathematics','mathematics','Pure and applied mathematics from foundations to advanced calculus.','Sigma','primary',1),
  ('Physics','physics','Mechanics, electricity, waves, and modern physics with exam-style practice.','Atom','purple',2),
  ('Computer Science','computer-science','Programming, architecture, networks, algorithms and data structures.','Cpu','cyan',3)
on conflict (slug) do nothing;

insert into public.subject_levels (subject_id, level, sort_order)
select s.id, l.level, l.ord
from public.subjects s
cross join (values ('OL'::public.subject_level,1),('AS'::public.subject_level,2),('A2'::public.subject_level,3)) as l(level, ord)
where s.slug in ('mathematics','physics','computer-science')
on conflict (subject_id, level) do nothing;

-- 2) Staging table: one row per pack section.
create temp table _seed_topics (
  subject_slug text, level text, name text, slug text,
  description text, sort_order int, content text
);
insert into _seed_topics (subject_slug, level, name, slug, description, sort_order, content)
values
  ('mathematics', 'OL', '1.1 Types of number, sets, powers and roots', 'types-of-number-sets-powers-and-roots-1-1', $md$Recognise natural numbers, integers, primes, square and cube numbers, factors, multiples, rational and irrational numbers, and reciprocals. Use prime factorisation to obtain HCF/LCM when useful. A rational number can be written as (p/q), (qne0); a non-terminating, non-recurring decimal such as (sqrt2) is irrational. The reciprocal of non-zero (a) is (1/a).$md$, 101, $md$Recognise natural numbers, integers, primes, square and cube numbers, factors, multiples, rational and irrational numbers, and reciprocals. Use prime factorisation to obtain HCF/LCM when useful. A rational number can be written as \(p/q\), \(q\ne0\); a non-terminating, non-recurring decimal such as \(\sqrt2\) is irrational. The reciprocal of non-zero \(a\) is \(1/a\).

Use squares, square roots, cubes, cube roots and other powers. Know squares/roots to \(15^2\) and cubes/roots of \(1,2,3,4,5,10\). **Extended** additionally uses fractional powers and recurring-decimal notation; \(a^{1/n}=\sqrt[n]{a}\).

Sets describe collections. Core uses \(n(A)\), complement \(A'\), universal set, union \(A\cup B\) and intersection \(A\cap B\), with Venn diagrams limited to two sets. Extended adds \(\in,\notin,\varnothing,\subseteq,\nsubseteq\) and may use two or three sets.

**Micro-example.** If \(A=\{2,3,5,7\}\) and \(B=\{3,7,11\}\), then \(A\cap B=\{3,7\}\), so \(n(A\cap B)=2\). If 30 people are in the universal set, \(n(A\cup B)=5\), then \(n((A\cup B)')=25\).

**Common errors.** Treating \(\sqrt{a+b}\) as \(\sqrt a+\sqrt b\); calling 1 prime; putting overlap values twice in a Venn diagram; confusing \(A\cup B\) (“in either or both”) with \(A\cap B\) (“in both”).

**Exam cue:** If a set problem gives totals, fill the intersection first, then the “A only” and “B only” regions, then “neither”. Check that all regions total the universal set.$md$),
  ('mathematics', 'OL', '1.2 Fractions, decimals, percentages, ordering and operations', 'fractions-decimals-percentages-ordering-and-operations-1-2', $md$Use proper/improper fractions, mixed numbers, decimals and percentages; convert equivalent forms and simplify fractions fully. Follow the order brackets, powers/roots, multiplication/division, addition/subtraction. For fractions, add/subtract only after finding a common denominator; multiply numerators and denominators; divide by multiplying by the reciprocal.$md$, 102, $md$Use proper/improper fractions, mixed numbers, decimals and percentages; convert equivalent forms and simplify fractions fully. Follow the order **brackets, powers/roots, multiplication/division, addition/subtraction**. For fractions, add/subtract only after finding a common denominator; multiply numerators and denominators; divide by multiplying by the reciprocal.

Core need not convert recurring decimals to fractions. **Extended** must use recurring notation and convert both ways. For example, \(0.\overline{27}=27/99=3/11\): set \(x=0.\overline{27}\), then \(100x=27.\overline{27}\); subtract to get \(99x=27\).

**Micro-example.** \(\frac34-\frac16=\frac9{12}-\frac2{12}=\frac7{12}\). To calculate \(\frac25\div\frac34\), write \(\frac25\times\frac43=\frac8{15}\), not \(\frac{2\div3}{5\div4}\).

**Common errors.** Adding denominators, reversing the wrong fraction when dividing, and using a percentage as if it were already a decimal. A 15% increase multiplier is **1.15**, not 0.15.

**Exam cue:** In P1/P2, leave exact fractions unless a decimal is requested. In money contexts use two decimal places in the final answer.$md$),
  ('mathematics', 'OL', '1.3 Indices and standard form', 'indices-and-standard-form-1-3', $md$For non-zero bases: (a^m a^n=a^{m+n}), (a^m/a^n=a^{m-n}), ((a^m)^n=a^{mn}), (a^0=1), (a^{-n}=1/a^n). Core uses positive, zero and negative integer indices; Extended also uses fractional indices.$md$, 103, $md$For non-zero bases: \(a^m a^n=a^{m+n}\), \(a^m/a^n=a^{m-n}\), \((a^m)^n=a^{mn}\), \(a^0=1\), \(a^{-n}=1/a^n\). Core uses positive, zero and negative **integer** indices; Extended also uses fractional indices.

Write standard form as \(A\times10^n\), where \(1\le A<10\) and \(n\) is an integer. Moving the decimal left makes \(n\) positive; moving it right makes \(n\) negative. Core can convert to/from standard form on P1/P3, but **calculations in standard form are P3 only**. Extended may calculate in standard form on P2/P4.

**Micro-example.** \((6x^3)^2=36x^6\). Also \(0.00456=4.56\times10^{-3}\), and \((3\times10^5)(2\times10^{-3})=6\times10^2\).

**Common errors.** Writing \(10^3+10^4=10^7\) (indices cannot be combined across addition); forgetting that \((2x)^3=8x^3\); giving \(45.6\times10^3\), whose first factor is outside the standard-form range.

**Exam cue:** Check whether a negative index means a reciprocal. In a non-calculator paper, use index laws before evaluating.$md$),
  ('mathematics', 'OL', '1.4 Estimation, rounding and bounds', 'estimation-rounding-and-bounds-1-4', $md$Round to stated decimal places or significant figures, estimate using convenient rounded inputs, and select an accuracy appropriate to context. If (x=7.4) correct to the nearest 0.1, then (7.35le x<7.45): lower bound includes the value, upper bound does not.$md$, 104, $md$Round to stated decimal places or significant figures, estimate using convenient rounded inputs, and select an accuracy appropriate to context. If \(x=7.4\) correct to the nearest 0.1, then \(7.35\le x<7.45\): lower bound includes the value, upper bound does not.

Core finds bounds of a stated rounded datum. **Extended** also finds bounds of a calculated result. For positive quantities: to maximise \(a/b\), use upper \(a\) and lower \(b\); to minimise it, use lower \(a\) and upper \(b\).

**Micro-example.** A length is \(8.2\) cm to the nearest 0.1 cm. Its upper bound is **8.25 cm**, not 8.3 cm. If \(A=3.6\) cm and \(B=2.1\) cm, both to 0.1 cm, the upper bound of \(A+B\) is \(3.65+2.15=5.80\) cm.

**Common errors.** Using \(\pm0.1\) instead of half the rounding interval; rounding too early in a multi-step calculator calculation; reporting more precision than the data justify.

**Exam cue:** For “estimate”, show your rounded values. For “upper/lower bound”, state the boundary values before combining them.$md$),
  ('mathematics', 'OL', '1.5 Ratio, proportion, rates and percentages', 'ratio-proportion-rates-and-percentages-1-5', $md$Simplify ratios in the same units, divide a total in a given ratio, and use proportional reasoning in context. Use common rates including pay, exchange, flow and fuel consumption; required formulas such as density or pressure are supplied, but know (text{speed}=text{distance}/text{time}). Convert time to one unit first.$md$, 105, $md$Simplify ratios in the same units, divide a total in a given ratio, and use proportional reasoning in context. Use common rates including pay, exchange, flow and fuel consumption; required formulas such as density or pressure are supplied, but know \(\text{speed}=\text{distance}/\text{time}\). Convert time to one unit first.

Percentage change uses a multiplier: increase by \(r\%\) gives \(\times(1+r/100)\); decrease gives \(\times(1-r/100)\). Compound change repeats the multiplier; simple interest is \(I=Prt\) when \(r\) is decimal per period. **Extended** includes reverse percentages and algebraic direct/inverse proportion, including square, square-root, cube and cube-root forms.

**Micro-example.** Divide \$84 in the ratio \(3:4\): total parts \(=7\), so shares \(=\$36\) and \(\$48\). A price is discounted 20% to \$64, so original \(=64/0.80=\$80\). If \(y\propto x^2\) and \(y=45\) at \(x=3\), \(y=5x^2\); at \(x=4\), \(y=80\).

**Common errors.** Adding percentage points rather than applying a multiplier; using 3 h 45 min as 3.45 h; using the new value as the base in a reverse-percentage question.

**Exam cue:** Write the units in every rate calculation. A final speed without km/h, m/s, etc. is incomplete.$md$),
  ('mathematics', 'OL', '1.6 Calculator, time, money, growth/decay and surds', 'calculator-time-money-growth-decay-and-surds-1-6', $md$Use a scientific calculator efficiently, enter brackets correctly, interpret displays and convert entries such as 2 h 30 min to 2.5 h. The *calculator-use* objective is not assessed in P1/P2, but time and money mathematics can be. Read 12- and 24-hour time, timetables, time zones and currency conversions.$md$, 106, $md$Use a scientific calculator efficiently, enter brackets correctly, interpret displays and convert entries such as 2 h 30 min to 2.5 h. The *calculator-use* objective is not assessed in P1/P2, but time and money mathematics can be. Read 12- and 24-hour time, timetables, time zones and currency conversions.

**Extended only:** model exponential growth/decay with \(A=P(1+r)^n\) or \(A=P(1-r)^n\); \(e\) is not required. A **surd** is an exact irrational root. Simplify by extracting square factors and rationalise a denominator where needed.

**Micro-example.** \(\sqrt{72}=\sqrt{36\times2}=6\sqrt2\). Rationalise \(\frac3{\sqrt5}\): multiply top and bottom by \(\sqrt5\) to obtain \(\frac{3\sqrt5}{5}\). A value falling 8% each year has multiplier \(0.92\), so after 3 years it is \(P(0.92)^3\).

**Common errors.** Using the calculator’s rounded display in later work; interpreting 3.25 h as 3 h 25 min rather than 3 h 15 min; changing \(\sqrt{12}+\sqrt3\) into \(\sqrt{15}\).

**Exam cue:** On P3/P4, write the calculator expression before evaluating it; on P1/P2, use exact arithmetic and surd laws rather than decimal approximations.

---

# 2. Algebra and graphs$md$),
  ('mathematics', 'OL', '2.1 Algebraic language, manipulation and fractions', 'algebraic-language-manipulation-and-fractions-2-1', $md$Letters represent generalized numbers. Substitute with brackets, especially for negative inputs. Collect only like terms. Expand by distributing every term; factorise fully by reversing expansion.$md$, 201, $md$Letters represent generalized numbers. Substitute with brackets, especially for negative inputs. Collect only like terms. Expand by distributing every term; factorise fully by reversing expansion.

Core includes collecting terms, single-bracket expansion and two brackets in one variable, and extracting a common factor. **Extended** adds multiple brackets, grouping \(ax+bx+kay+kby\), difference of two squares, perfect-square trinomials, quadratics \(ax^2+bx+c\), cubics \(ax^3+bx^2+cx\), completing the square, and algebraic fractions/rational expressions.

**Micro-example.** \((2x-3)(x+4)=2x^2+5x-12\). Factorise \(6x^2-15x=3x(2x-5)\). For Extended grouping, \(ax+ay+3x+3y=(a+3)(x+y)\). To add \(\frac1{x-2}+\frac1{x+2}\), use denominator \((x-2)(x+2)\), giving \(\frac{2x}{x^2-4}\).

**Common errors.** \((a+b)^2=a^2+b^2\) (the middle \(2ab\) is missing); cancelling terms across addition, e.g. cancelling \(x\) in \((x+2)/x\); stopping before full factorisation.

**Exam cue:** For a rational expression, factorise numerator and denominator first, state excluded values if relevant, and cancel **factors**, never terms joined by \(+\) or \(-\).$md$),
  ('mathematics', 'OL', '2.2 Equations and rearranging formulae', 'equations-and-rearranging-formulae-2-2', $md$Construct an expression/equation from words. Solve a linear equation by applying equal operations to both sides. Solve simultaneous linear equations by elimination or substitution. A formula is rearranged by isolating the required variable with inverse operations.$md$, 202, $md$Construct an expression/equation from words. Solve a linear equation by applying equal operations to both sides. Solve simultaneous linear equations by elimination or substitution. A formula is rearranged by isolating the required variable with inverse operations.

Core changes subject where it occurs once and has no power/root. **Extended** solves fractional equations, simultaneous equations with one linear and one non-linear relation (powers no higher than two), quadratics by factorising, completing the square and the quadratic formula, and formulae where the subject occurs more than once or has a power/root.

**Micro-example.** Solve \(5-2x=3(x+1)\): \(5-2x=3x+3\), so \(2=5x\), \(x=0.4\). For \(x^2-5x+6=0\), \((x-2)(x-3)=0\), hence \(x=2\) or 3. Complete \(x^2+6x+5=(x+3)^2-4\).

**Common errors.** Failing to multiply every term when clearing a denominator; losing a solution in a non-linear simultaneous equation; giving only one quadratic root; taking a square root without \(\pm\) when solving \(x^2=k\).

**Exam cue:** After an Extended fractional equation, substitute candidate roots into the original denominator restrictions. For “show that”, retain enough working to demonstrate the target result, not just the final line.$md$),
  ('mathematics', 'OL', '2.3 Inequalities and sequences', 'inequalities-and-sequences-2-3', $md$Represent a strict inequality with an open circle and (<) or (>); use a filled circle for (le) or (ge). Core represents/interprets inequalities on a number line. Extended constructs and solves linear inequalities, including compound ones, and represents regions from linear inequalities in two variables. On a graph, a broken boundary is strict; a solid boundary is inclusive. Cam$md$, 203, $md$Represent a strict inequality with an open circle and \(<\) or \(>\); use a filled circle for \(\le\) or \(\ge\). Core represents/interprets inequalities on a number line. **Extended** constructs and solves linear inequalities, including compound ones, and represents regions from linear inequalities in two variables. On a graph, a broken boundary is strict; a solid boundary is inclusive. Cambridge convention normally shades the unwanted region unless told otherwise. Linear programming is not included.

Continue patterns and find/use an \(n\)th term. Core requires linear, simple quadratic and simple cubic sequences. Extended includes linear, quadratic, cubic, exponential sequences and simple combinations.

**Micro-example.** \(-3\le2x+1<7\) gives \(-4\le2x<6\), so \(-2\le x<3\). For \(5,8,11,14,\dots\), difference is 3, so \(T_n=3n+2\). For \(2,5,10,17\), subtract \(n^2\): \(1,1,1,1\), so \(T_n=n^2+1\).

**Common errors.** Forgetting to reverse an inequality when multiplying/dividing by a negative; treating the first term as \(n=0\) without checking; assuming every non-linear sequence is quadratic.

**Exam cue:** Verify an \(n\)th-term rule against at least the first two terms. For a two-variable inequality, test a point in the unlabelled region before final shading.$md$),
  ('mathematics', 'OL', '2.4 Practical graphs, function graphs and sketches', 'practical-graphs-function-graphs-and-sketches-2-4', $md$Interpret travel and conversion graphs; gradient represents a rate of change. On a distance–time graph, horizontal means stationary; on a speed–time graph, area represents distance. Extended estimates a curve’s gradient using a tangent, uses acceleration/deceleration, and finds distance under linear sections of a speed–time graph.$md$, 204, $md$Interpret travel and conversion graphs; gradient represents a rate of change. On a distance–time graph, horizontal means stationary; on a speed–time graph, area represents distance. **Extended** estimates a curve’s gradient using a tangent, uses acceleration/deceleration, and finds distance under linear sections of a speed–time graph.

Core draws/recognises \(ax+b\), \(\pm x^2+ax+b\), and \(a/x\); it sketches linear and quadratic functions, with roots and symmetry but no turning-point knowledge required. **Extended** uses sums of up to three \(ax^n\) terms where \(n\in\{-2,-1,-\tfrac12,0,\tfrac12,1,2,3\}\), plus \(ab^x+c\); it sketches linear, quadratic, cubic, reciprocal and exponential curves, including roots, turning points, symmetry and vertical/horizontal asymptotes.

**Micro-example.** For \(y=x^2-4\), roots are \(x=\pm2\), axis of symmetry is \(x=0\), and the minimum is \((0,-4)\). For a speed–time graph that rises linearly from 0 to 12 m/s in 5 s, distance \(=\tfrac12\times5\times12=30\) m.

**Common errors.** Joining non-linear graph points with a ruler; calling a speed–time gradient “speed” (it is acceleration); drawing an asymptote as a line the curve crosses without reason.

**Exam cue:** A **plot** needs accurately marked points and appropriate ruled/smooth joining. A **sketch** is freehand but must label axes and show decisive features: intercepts, turning points, symmetry/asymptotes and correct long-term behaviour.$md$),
  ('mathematics', 'OL', '2.5 Differentiation, functions and inverse functions', 'differentiation-functions-and-inverse-functions-2-5', $md$For (y=ax^n), (frac{dy}{dx}=anx^{n-1}); differentiate each term in a sum. A stationary point satisfies (dy/dx=0). Identify maximum/minimum by a sign change in gradient, a valid sketch or the second derivative; points of inflection are not required.$md$, 205, $md$For \(y=ax^n\), \(\frac{dy}{dx}=anx^{n-1}\); differentiate each term in a sum. A stationary point satisfies \(dy/dx=0\). Identify maximum/minimum by a sign change in gradient, a valid sketch or the second derivative; points of inflection are not required.

A function maps each allowed input (domain) to one output (range). \(f^{-1}\) reverses \(f\): interchange \(x,y\), then solve for \(y\). A composite \(gf(x)\) means \(g(f(x))\), not multiplication.

**Micro-example.** \(y=2x^3-3x^2+4\) gives \(dy/dx=6x^2-6x=6x(x-1)\); stationary \(x=0,1\). If \(f(x)=3x-5\), then \(f^{-1}(x)=(x+5)/3\). If \(g(x)=x^2+1\), \(gf(2)=g(1)=2\).

**Common errors.** Reducing the coefficient instead of multiplying it by the power; writing \(fg(x)\) when the instruction means \(gf(x)\); assuming an inverse exists over an unrestricted non-one-to-one domain.

**Exam cue:** At a stationary-point question, substitute every \(x\)-value back into the original function to give coordinates, then justify maximum/minimum. For an inverse, verify by composing if time permits.

---

# 3. Coordinate geometry$md$),
  ('mathematics', 'OL', '3.1 Coordinates, gradients, distance and midpoint', 'coordinates-gradients-distance-and-midpoint-3-1', $md$Use Cartesian coordinates and draw straight lines. In (y=mx+c), (m) is gradient and (c) is the y-intercept. Core finds gradient from a grid and uses/obtains equations in (y=mx+c) or (x=k). Extended also calculates gradient from two points, distance and midpoint.$md$, 301, $md$Use Cartesian coordinates and draw straight lines. In \(y=mx+c\), \(m\) is gradient and \(c\) is the y-intercept. Core finds gradient from a grid and uses/obtains equations in \(y=mx+c\) or \(x=k\). Extended also calculates gradient from two points, distance and midpoint.

\[
m=\frac{y_2-y_1}{x_2-x_1},\qquad d=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2},\qquad M=\left(\frac{x_1+x_2}{2},\frac{y_1+y_2}{2}\right).
\]

**Micro-example.** Between \((-1,2)\) and \((3,10)\), \(m=(10-2)/(3-(-1))=2\). The line through \((-1,2)\) is \(y=2x+4\). The midpoint is \((1,6)\).

**Common errors.** Reversing one subtraction but not the other in a gradient; using the distance formula with unsigned differences inconsistently; reading the y-intercept as the x-intercept.

**Exam cue:** In Extended coordinate work, write both coordinate pairs before substituting into a formula. This makes sign errors visible and earns method credit.$md$),
  ('mathematics', 'OL', '3.2 Equations, parallel and perpendicular lines', 'equations-parallel-and-perpendicular-lines-3-2', $md$Put a linear equation into a usable form. Extended questions may use (ax+by=c), (y=mx+c) or (x=k); fully simplify the final equation. Parallel non-vertical lines have equal gradient. Perpendicular non-vertical lines have gradients whose product is (-1): the perpendicular gradient is the negative reciprocal.$md$, 302, $md$Put a linear equation into a usable form. Extended questions may use \(ax+by=c\), \(y=mx+c\) or \(x=k\); fully simplify the final equation. Parallel non-vertical lines have equal gradient. Perpendicular non-vertical lines have gradients whose product is \(-1\): the perpendicular gradient is the negative reciprocal.

**Micro-example.** A line perpendicular to \(y=\tfrac23x-1\) has gradient \(-\tfrac32\). Through \((2,5)\): \(y-5=-\tfrac32(x-2)\), so \(y=-\tfrac32x+8\).

**Common errors.** Using the reciprocal but not changing the sign; claiming vertical lines have gradient 0 (they have undefined gradient); leaving an equation unsimplified when asked for its equation.

**Exam cue:** For a line from a graph, use two well-separated points exactly on the line; then independently check the intercept.

---

# 4. Geometry$md$),
  ('mathematics', 'OL', '4.1 Vocabulary, constructions, scales and symmetry', 'vocabulary-constructions-scales-and-symmetry-4-1', $md$Know triangle, quadrilateral, polygon, solid and circle vocabulary. Core includes point, vertex, line, parallel, perpendicular, bearings, angle types, similar/congruent, standard polygons, cube/cuboid/prism/cylinder/pyramid/cone/sphere and circle terms. Extended adds plane, perpendicular bisector, hemisphere, frustum, and major/minor arcs. Candidates are not required to prove s$md$, 401, $md$Know triangle, quadrilateral, polygon, solid and circle vocabulary. Core includes point, vertex, line, parallel, perpendicular, bearings, angle types, similar/congruent, standard polygons, cube/cuboid/prism/cylinder/pyramid/cone/sphere and circle terms. Extended adds **plane**, **perpendicular bisector**, **hemisphere**, **frustum**, and major/minor arcs. Candidates are not required to prove shapes congruent.

Measure/draw lines and angles, construct a triangle from three sides using ruler and compasses, and draw/use nets. Construction arcs must remain visible. Scale drawings use a ruler. Bearings are three figures, measured clockwise from north, \(000^\circ\) to \(360^\circ\).

Symmetry covers lines of symmetry and rotational order; Extended also includes symmetry of prisms, cylinders, pyramids and cones.

**Micro-example.** A map scale 1:50 000 means 1 cm represents 50 000 cm = 500 m. A bearing of 045° must be written with its leading zero.

**Common errors.** Measuring bearings anticlockwise or from east; erasing construction arcs; using a protractor for a construction that requires ruler/compasses; confusing similar (same shape, possibly different size) with congruent (same size and shape).

**Exam cue:** A transformation description is only complete with its defining data. In a construction, a correct final figure without visible arcs can lose credit.$md$),
  ('mathematics', 'OL', '4.2 Angles, similarity and polygons', 'angles-similarity-and-polygons-4-2', $md$Use: angles around a point (=360^circ); straight line (=180^circ); vertically opposite angles equal; triangle sum (=180^circ); quadrilateral sum (=360^circ). For parallel lines: corresponding equal, alternate equal, co-interior sum (180^circ). Interior angle sum of an (n)-gon is ((n-2)180^circ); each exterior angle of a regular polygon is (360^circ/n).$md$, 402, $md$Use: angles around a point \(=360^\circ\); straight line \(=180^\circ\); vertically opposite angles equal; triangle sum \(=180^\circ\); quadrilateral sum \(=360^\circ\). For parallel lines: corresponding equal, alternate equal, co-interior sum \(180^\circ\). Interior angle sum of an \(n\)-gon is \((n-2)180^\circ\); each exterior angle of a regular polygon is \(360^\circ/n\).

Core calculates lengths in similar shapes and uses regular polygons. Extended also uses length:area ratio \(k:k^2\), and length:surface-area:volume ratio \(k:k^2:k^3\); it handles irregular polygons and gives simple similarity reasoning, including showing triangles similar.

**Micro-example.** Similar solids have length ratio \(2:5\). If the smaller volume is 64 cm³, larger volume \(=64\times(5/2)^3=1000\) cm³. A regular decagon’s exterior angle is \(360/10=36^\circ\).

**Common errors.** Scaling area by \(k\) instead of \(k^2\); citing “alternate” without establishing parallel lines; using the wrong polygon angle formula.

**Exam cue:** Geometry explanations should use named reasons—e.g., “angles in the same segment are equal”—not merely “angles are equal”.$md$),
  ('mathematics', 'OL', '4.3 Circle theorems', 'circle-theorems-4-3', $md$Core uses angle in a semicircle (=90^circ), and tangent perpendicular to radius. Extended adds: centre angle is twice circumference angle on the same arc; angles in the same segment equal; opposite angles in a cyclic quadrilateral sum to (180^circ); alternate segment theorem; equal chords are equidistant from centre; perpendicular bisector of a chord passes through centre; tang$md$, 403, $md$Core uses angle in a semicircle \(=90^\circ\), and tangent perpendicular to radius. Extended adds: centre angle is twice circumference angle on the same arc; angles in the same segment equal; opposite angles in a cyclic quadrilateral sum to \(180^\circ\); alternate segment theorem; equal chords are equidistant from centre; perpendicular bisector of a chord passes through centre; tangents from one external point are equal.

**Micro-example.** If an angle at the centre subtending a chord is \(124^\circ\), the angle at the circumference on the same arc is \(62^\circ\). If a cyclic quadrilateral has one angle \(113^\circ\), its opposite is \(67^\circ\).

**Common errors.** Applying “centre twice circumference” to angles subtending different arcs; saying a tangent is perpendicular to a chord rather than to the radius at the point of contact; omitting a theorem name when an explanation is asked.

**Exam cue:** Annotate equal angles/lengths on the diagram, then write one named circle property beside each deduction. This prevents an unsupported answer chain.

---

# 5. Mensuration$md$),
  ('mathematics', 'OL', '5.1 Units, perimeter and area', 'units-perimeter-and-area-5-1', $md$Use and convert metric length, area, volume, capacity and mass. Square conversion factors for area and cube them for volume: (1text{ m}^2=10,000text{ cm}^2); (1text{ m}^3=1,000,000text{ cm}^3); (1text{ m}^3=1000) litres.$md$, 501, $md$Use and convert metric length, area, volume, capacity and mass. Square conversion factors for area and cube them for volume: \(1\text{ m}^2=10\,000\text{ cm}^2\); \(1\text{ m}^3=1\,000\,000\text{ cm}^3\); \(1\text{ m}^3=1000\) litres.

Know perimeter/area of rectangles, triangles, parallelograms and trapezia. Apart from triangle area, these formulas are not supplied, so learn them. A compound area is usually a sum/difference of non-overlapping simple areas.

**Micro-example.** A trapezium with parallel sides 7 cm and 11 cm and height 4 cm has area \(\tfrac12(7+11)\times4=36\text{ cm}^2\).

**Common errors.** Adding units of different dimensions; multiplying a length conversion by 10 rather than 100 in an area conversion; using a sloping side instead of perpendicular height.

**Exam cue:** Convert all inputs into the requested unit **before** applying an area or volume formula; label the final dimension with cm², cm³, litres, etc.$md$),
  ('mathematics', 'OL', '5.2 Circles, sectors and solids', 'circles-sectors-and-solids-5-2', $md$Use (C=2pi r) and (A=pi r^2). An arc length is (theta/360times2pi r); sector area is (theta/360timespi r^2). Core sectors have an angle that is a factor of (360^circ); Extended includes minor and major sectors.$md$, 502, $md$Use \(C=2\pi r\) and \(A=\pi r^2\). An arc length is \(\theta/360\times2\pi r\); sector area is \(\theta/360\times\pi r^2\). Core sectors have an angle that is a factor of \(360^\circ\); Extended includes minor and major sectors.

Calculate surface area/volume of cuboids, prisms, cylinders, spheres, pyramids and cones, including compound shapes and parts. A **prism** is any solid with a uniform cross-section, not only a rectangular one. Extended includes surface area and volume of a frustum.

**Micro-example.** A sector of radius 6 cm, angle 120°, has arc \((120/360)\times2\pi\times6=4\pi\) cm and area \((120/360)\times\pi\times36=12\pi\) cm². A prism with cross-sectional area 18 cm² and length 7 cm has volume \(126\) cm³.

**Common errors.** Using diameter as radius; calling curved surface area the total surface area (include circular ends when needed); forgetting to subtract the removed solid/hole; reporting volume in cm².

**Exam cue:** Leave \(\pi\) exact if requested. Otherwise on P3/P4 use the calculator’s \(\pi\) key or Cambridge’s stated 3.142, and round only at the end.

---

# 6. Trigonometry$md$),
  ('mathematics', 'OL', '6.1 Pythagoras and right-angled triangles', 'pythagoras-and-right-angled-triangles-6-1', $md$For a right triangle, (a^2+b^2=c^2), where (c) is the hypotenuse—the side opposite the right angle. Use (sintheta=O/H), (costheta=A/H), (tantheta=O/A) for acute angles. Solve 2D problems, including bearings. Extended adds shortest perpendicular distance from a point to a line, and elevation/depression.$md$, 601, $md$For a right triangle, \(a^2+b^2=c^2\), where \(c\) is the hypotenuse—the side opposite the right angle. Use \(\sin\theta=O/H\), \(\cos\theta=A/H\), \(\tan\theta=O/A\) for acute angles. Solve 2D problems, including bearings. **Extended** adds shortest perpendicular distance from a point to a line, and elevation/depression.

**Micro-example.** If opposite = 7 and adjacent = 24, hypotenuse \(=\sqrt{7^2+24^2}=25\). If \(\tan\theta=5/12\), \(\theta=\tan^{-1}(5/12)\approx22.6^\circ\).

**Common errors.** Choosing the longest-looking rather than the right-angle-opposite side as hypotenuse; using the wrong angle in a bearing diagram; calculator set to radians instead of degrees.

**Exam cue:** Mark O, A and H relative to the **given angle**, not the diagram’s orientation. In a multi-stage problem, retain an unrounded side length for the next calculation.$md$),
  ('mathematics', 'OL', '6.2 Exact trig, trig graphs, non-right-angled triangles and 3D', 'exact-trig-trig-graphs-non-right-angled-triangles-and-3d-6-2', $md$Know exact sine/cosine values at (0^circ,30^circ,45^circ,60^circ,90^circ), and exact tangent values at (0^circ,30^circ,45^circ,60^circ). Sketch (sin x), (cos x), (tan x) for (0^circle xle360^circ) and solve trig equations in that range, using quadrants and tangent’s period.$md$, 602, $md$Know exact sine/cosine values at \(0^\circ,30^\circ,45^\circ,60^\circ,90^\circ\), and exact tangent values at \(0^\circ,30^\circ,45^\circ,60^\circ\). Sketch \(\sin x\), \(\cos x\), \(\tan x\) for \(0^\circ\le x\le360^\circ\) and solve trig equations in that range, using quadrants and tangent’s period.

For any triangle, use the sine rule \(a/\sin A=b/\sin B=c/\sin C\), cosine rule \(a^2=b^2+c^2-2bc\cos A\), and area \(=\tfrac12ab\sin C\). Be alert to the ambiguous sine-rule case. In 3D, draw a clear right-triangle cross-section; an angle between a line and a plane is the angle between the line and its projection onto the plane.

**Micro-example.** \(\sin x=\tfrac12\) for \(0^\circ\le x\le360^\circ\) gives \(x=30^\circ,150^\circ\). For sides 7 and 9 with included angle \(60^\circ\), area \(=\tfrac12(7)(9)\sin60^\circ\).

**Common errors.** Giving only the principal calculator solution; using the sine rule with a side and non-opposite angle; using 2D Pythagoras directly on a 3D diagonal without first identifying the right triangle.

**Exam cue:** For a trigonometric equation, use the reference angle and state every solution in the stated interval. For sine/cosine rule, label each side opposite its matching angle first.

---

# 7. Transformations and vectors$md$),
  ('mathematics', 'OL', '7.1 Transformations', 'transformations-7-1', $md$Describe and draw reflection, rotation, enlargement and translation. A complete description includes: reflection line; rotation centre, angle and direction; enlargement centre and scale factor; translation vector. Core reflections are in vertical/horizontal lines, rotations through multiples of 90° about specified centres, enlargements have positive/fractional scale factor, and$md$, 701, $md$Describe and draw reflection, rotation, enlargement and translation. A complete description includes: reflection line; rotation centre, angle and direction; enlargement centre and scale factor; translation vector. Core reflections are in vertical/horizontal lines, rotations through multiples of 90° about specified centres, enlargements have positive/fractional scale factor, and combinations are not used. Extended allows reflection in any straight line, rotation through multiples of 90°, negative enlargement scale factors and combinations.

**Micro-example.** Enlargement centre \((0,0)\), scale factor \(-2\): \((3,-1)\mapsto(-6,2)\). The negative factor places the image on the opposite side of the centre and doubles its distance.

**Common errors.** Naming an enlargement without centre; reversing the translation vector; stating clockwise/anticlockwise incorrectly; treating a negative scale factor as a reflection in an axis.

**Exam cue:** Use a ruler for every image edge. Before writing a transformation, test one vertex and check the listed centre/line/vector against that movement.$md$),
  ('mathematics', 'OL', '7.2 Vectors', 'vectors-7-2', $md$Represent translation by a column vector, (overrightarrow{AB}) or a bold/underlined vector as printed. Add/subtract component-wise; multiply by a scalar; magnitude of (begin{pmatrix}xyend{pmatrix}) is (sqrt{x^2+y^2}). Use position vectors and directed segments to establish parallelism, collinearity, ratios and similarity.$md$, 702, $md$Represent translation by a column vector, \(\overrightarrow{AB}\) or a bold/underlined vector as printed. Add/subtract component-wise; multiply by a scalar; magnitude of \(\begin{pmatrix}x\\y\end{pmatrix}\) is \(\sqrt{x^2+y^2}\). Use position vectors and directed segments to establish parallelism, collinearity, ratios and similarity.

**Micro-example.** \(\mathbf a=\begin{pmatrix}4\\-1\end{pmatrix}\), \(\mathbf b=\begin{pmatrix}-2\\3\end{pmatrix}\). Then \(2\mathbf a-\mathbf b=\begin{pmatrix}10\\-5\end{pmatrix}\), and \(|\mathbf a|=\sqrt{17}\). If \(\overrightarrow{PQ}=3\mathbf a\) and \(\overrightarrow{RS}=6\mathbf a\), the segments are parallel.

**Common errors.** Treating \(AB\) and \(BA\) as equal; subtracting a vector with only one sign changed; confusing a vector with its magnitude.

**Exam cue:** In vector geometry, draw arrows consistently and name the route: for example, \(\overrightarrow{AC}=\overrightarrow{AB}+\overrightarrow{BC}\).

---

# 8. Probability$md$),
  ('mathematics', 'OL', '8.1 Single events, frequency and combined events', 'single-events-frequency-and-combined-events-8-1', $md$Probability lies between 0 and 1. Extended uses (P(A)) and (P(A')); both tiers use (P(text{not }A)=1-P(A)). Relative frequency is an experimental estimate: (text{successes}/text{trials}). Expected frequency (=text{probability}timestext{number of trials}). Interpret fair, biased and random.$md$, 801, $md$Probability lies between 0 and 1. Extended uses \(P(A)\) and \(P(A')\); both tiers use \(P(\text{not }A)=1-P(A)\). Relative frequency is an experimental estimate: \(\text{successes}/\text{trials}\). Expected frequency \(=\text{probability}\times\text{number of trials}\). Interpret fair, biased and random.

Use sample spaces, two-set Venn diagrams and tree diagrams for combined events. Core tree problems are **with replacement only** and Core Venn diagrams have two sets. Extended combined events may be with or without replacement and may use \(P(A\cap B)\), \(P(A\cup B)\).

**Micro-example.** A bag has 3 red and 2 blue counters. With replacement, \(P(R\text{ then }B)=\frac35\times\frac25=\frac6{25}\). In 200 trials with event probability 0.35, expected frequency is \(70\).

**Common errors.** Adding probabilities along a “then” path (multiply); multiplying alternatives when they are “or”; failing to change the second fraction when there is no replacement; claiming experimental relative frequency is the exact theoretical probability.

**Exam cue:** On a tree, multiply along a branch and add the branches that satisfy an “or” event. Write changed totals explicitly in without-replacement questions.$md$),
  ('mathematics', 'OL', '8.2 Conditional probability', 'conditional-probability-8-2', $md$Conditional probability asks for an event within a restricted condition. Use the Venn/table/tree information to reset the total to the relevant condition; formal (P(Amid B)) notation/formula is not required by the syllabus.$md$, 802, $md$Conditional probability asks for an event within a restricted condition. Use the Venn/table/tree information to reset the total to the relevant condition; formal \(P(A\mid B)\) notation/formula is not required by the syllabus.

**Micro-example.** Of 40 students, 18 play football, 12 play basketball and 5 play both. Given a student plays football, probability they also play basketball is \(5/18\), not \(5/40\).

**Common errors.** Keeping the original universal total after the word “given”; adding the intersection twice when using a Venn diagram.

**Exam cue:** Circle or shade the condition after “given”; it becomes the denominator population. Use a table/Venn/tree route that makes that restricted total visible.

---

# 9. Statistics$md$),
  ('mathematics', 'OL', '9.1 Data, averages and displays', 'data-averages-and-displays-9-1', $md$Classify/tabulate data using tally and two-way tables. Interpret and compare data while acknowledging limitations: sample size, representativeness, scale, bias and outliers can limit a conclusion. Calculate mean, median, mode and range for ungrouped data/frequency tables. A mean uses (sum fx/sum f) when values have frequency.$md$, 901, $md$Classify/tabulate data using tally and two-way tables. Interpret and compare data while acknowledging limitations: sample size, representativeness, scale, bias and outliers can limit a conclusion. Calculate mean, median, mode and range for ungrouped data/frequency tables. A mean uses \(\sum fx/\sum f\) when values have frequency.

Draw/read bar charts (including composite and dual), pie charts, pictograms, ordered stem-and-leaf diagrams with key, and simple frequency distributions. A pie-chart angle is \(\text{frequency}/\text{total}\times360^\circ\). Scatter graphs show association, not proof of causation; draw one ruled line of best fit by eye across the data, with broadly balanced points.

**Micro-example.** Values 2, 4, 4, 7, 8 have mean \(25/5=5\), median 4, mode 4, range 6. If 18 of 72 choose an option, its pie angle is \(18/72\times360=90^\circ\).

**Common errors.** Using an average without spread to compare inconsistent datasets; drawing a line of best fit point-to-point; no key on a stem-and-leaf diagram; assuming correlation proves causation.

**Exam cue:** State what the data show, then qualify the claim where appropriate: an observed correlation supports an association, not a cause. Use a ruler for the line of best fit.$md$),
  ('mathematics', 'OL', '9.2 Extended grouped data, cumulative frequency and histograms', 'extended-grouped-data-cumulative-frequency-and-histograms-9-2', $md$Extended uses quartiles, interquartile range (IQR=Q_3-Q_1), estimated mean for grouped discrete/continuous data using class midpoints, and modal class. An estimated grouped mean is (sum(ftimestext{midpoint})/sum f); call it an estimate because individual values are unknown.$md$, 902, $md$Extended uses quartiles, interquartile range \(IQR=Q_3-Q_1\), estimated mean for grouped discrete/continuous data using class midpoints, and modal class. An estimated grouped mean is \(\sum(f\times\text{midpoint})/\sum f\); call it an **estimate** because individual values are unknown.

For cumulative frequency, accumulate frequencies at upper class boundaries; plot marked points and join with a smooth curve. Read median, quartiles, percentiles and IQR from the correct cumulative positions. A histogram has continuous class boundaries and vertical axis **frequency density**, where \(\text{frequency density}=\text{frequency}/\text{class width}\); bar area represents frequency.

**Micro-example.** A class \(20<x\le30\) has frequency 18. Its width is 10, so frequency density is \(18/10=1.8\). If 80 data values are sorted, median is read at cumulative frequency 40, \(Q_1\) at 20 and \(Q_3\) at 60.

**Common errors.** Using class width 30 instead of \(30-20=10\); comparing histogram heights when widths differ; treating grouped-midpoint mean as exact; plotting cumulative frequency at class midpoints.

**Exam cue:** In a comparison sentence, name both a measure of centre and spread: “A has a higher median, but B is more consistent because its IQR is smaller.”

---

# Formula, notation and method quick reference

## Formulae supplied by Cambridge

All papers include the Core formula list: triangle area; circle area/circumference; curved surface area of cylinder/cone; sphere surface area; volumes of prism, pyramid, cylinder, cone and sphere. Extended Papers 2/4 additionally include the quadratic formula, sine rule, cosine rule and \(\tfrac12ab\sin C\). Formula sheets reduce recall load but do not replace choosing the correct formula. [1]

| Topic | Formula / fact to know and use |
|---|---|
| Percentage | new value \(=\) original \(\times(1\pm r/100)\); compound change repeats multiplier |
| Speed / density | \(v=d/t\); use supplied rate formulas with consistent units |
| Indices | \(a^ma^n=a^{m+n}\), \(a^m/a^n=a^{m-n}\), \((a^m)^n=a^{mn}\), \(a^{-n}=1/a^n\) |
| Line | \(m=(y_2-y_1)/(x_2-x_1)\); \(y=mx+c\) |
| Distance / midpoint [E] | \(d=\sqrt{(\Delta x)^2+(\Delta y)^2}\); \(M=((x_1+x_2)/2,(y_1+y_2)/2)\) |
| Polygon | interior sum \((n-2)180^\circ\); regular exterior \(360^\circ/n\) |
| Area / volume | \(A_{\triangle}=\tfrac12bh\); \(A_{trap}=\tfrac12(a+b)h\); \(V_{prism}=A_{cross\ section}\ell\) |
| Circle | \(C=2\pi r\); \(A=\pi r^2\); arc \(=\theta/360\times2\pi r\); sector \(=\theta/360\times\pi r^2\) |
| Right-triangle trig | \(a^2+b^2=c^2\); \(\sin=O/H\), \(\cos=A/H\), \(\tan=O/A\) |
| Any triangle [E] | \(a/\sin A=b/\sin B=c/\sin C\); \(a^2=b^2+c^2-2bc\cos A\); \(\tfrac12ab\sin C\) |
| Quadratic [E] | \(x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}\) for \(ax^2+bx+c=0\) |
| Differentiation [E] | \(\frac{d}{dx}(ax^n)=anx^{n-1}\) |
| Probability | \(P(A')=1-P(A)\); expected frequency \(=np\) |
| Statistics | mean \(=\sum fx/\sum f\); density \(=f/\text{class width}\); \(IQR=Q_3-Q_1\) [E] |

## Notation and presentation habits

Use \(\approx\) for approximate values and \(=\) only for equality. Keep \(\pi\) and surds exact when requested. Label graph axes and units, use small crosses for plotted points, rule straight lines, and make non-linear curves smooth. A tangent touches at the stated point and should not cut the curve there. Read values from a graph within half the smallest grid square. [1]

---

# Final paper checklists and command words

## Paper 1 — Core non-calculator

- I can do fraction, ratio, percentage, integer-index and basic surd/root arithmetic without a calculator.
- I know every Core formula that is **not** supplied, particularly trapezium/parallelogram areas, polygon facts and SOHCAHTOA.
- I use exact values where appropriate, show construction arcs, use three-figure bearings and label units.
- I do **not** expect calculator-use questions or Core standard-form calculations.

## Paper 3 — Core calculator

- I can enter brackets, powers, fractions, \(\pi\), inverse trig and time conversions correctly.
- I retain calculator precision, then give non-exact answers to 3 s.f. or angles to 1 d.p. unless instructed differently.
- I can calculate with standard form and check order of magnitude.
- I still show method: a calculator answer alone may not communicate the required mathematics.

## Paper 2 — Extended non-calculator

- I can factorise, complete the square, manipulate algebraic fractions and solve quadratics exactly.
- I know exact trig values, surd simplification/rationalisation, coordinate formulae and all Extended circle/vector arguments.
- I can choose sine/cosine rule, use exact forms and solve graph/function/differentiation work without electronic support.
- I do **not** expect calculator-use questions; manage arithmetic strategically rather than converting every exact value to a decimal.

## Paper 4 — Extended calculator

- I can execute the entire Extended course under calculator conditions, including numerical trig, statistics, probability, bounds and 3D geometry.
- I check degree mode, use memory/Ans only safely, and preserve display precision.
- I state final units, appropriate accuracy and a contextual conclusion.
- I use the formula sheet efficiently but recognise which formula represents the situation.

## High-yield command-word strategy

| Command word | What to do in a mathematics response |
|---|---|
| **Calculate / Work out** | Set out a valid calculation, then state a numerical answer with units/accuracy. |
| **Construct** | Use accurate instruments and leave construction arcs/lines visible. |
| **Determine** | Establish the value or conclusion decisively; give supporting steps if not a write-down fact. |
| **Describe** | State defining features, such as transformation type plus line/centre/angle/scale factor. |
| **Explain** | Give linked reason(s), such as a named geometry theorem or a data-based comparison. |
| **Give / State / Write down** | Provide the requested fact concisely; unnecessary unsupported working is not a substitute for the answer. |
| **Plot** | Mark accurately on the given scale, normally as a small cross. |
| **Show that** | Provide a chain of valid algebra/calculation from the information to the stated result; do not assume the result. |
| **Sketch** | Draw freehand key features—not a point-by-point accurate plot—on labelled axes. |
| **Write** | Give the answer in the required form, such as standard form, an equation, or a vector. |

> **Accuracy final check:** Simplify unless told otherwise. For an exact-value request use \(\pi\), fractions or surds as suitable. For a proof/show request involving stated accuracy, retain full working and calculate to at least one degree of accuracy beyond that requested before the final rounding. [1]

---

# Compact study sequence

| Phase | Focus | Practical output |
|---|---|---|
| **1. Build fluency** | Number; algebra manipulation; equations; coordinates | One no-calculator mixed set after each topic, with an error log. |
| **2. Build representations** | Graphs; geometry; transformations; mensuration | Redraw every diagram/graph accurately and write a one-line reason beside each step. |
| **3. Build applications** | Trigonometry; rates; probability; statistics | Choose the method before calculating; write units and interpretation sentences. |
| **4. Add tier depth** | Extended-only algebra, functions, circle theorems, 3D trig, vectors, grouped data | Make a separate “E only” checklist and revisit weak objectives two days later. |
| **5. Split paper conditions** | P1/P2 non-calculator; P3/P4 calculator | Practise both styles weekly; mark rounding, exactness and calculator-entry errors separately. |
| **6. Consolidate** | Mixed papers by tier | Before each timed attempt, use the relevant final checklist; afterwards classify every lost mark by topic and cause. |

A useful weekly rhythm is: learn/retrieve on day 1, mixed questions on day 2, short delayed recall on day 4, and a timed section on day 7. Prioritise redoing errors without notes over rereading worked solutions.

---

# Sources and specification notes

This document is aligned to Cambridge’s official 2025–2027 **Mathematics 0580** syllabus, including its version-3 update. Its assessment map, paper times/marks, formula-sheet statements, grade eligibility, calculator restrictions, subject-content coverage, graph conventions and command words derive from that syllabus. The public qualification page currently lists both 2025–2027 and forthcoming 2028–2030 documents, so the examination year must be checked at entry. [1] [2] [3]

Cambridge states that examinations under the 2025–2027 syllabus are available in the June and November series, and additionally March in India. Centre administrative zone/timetable and entry route should be confirmed with the examinations officer; **verify on your entry** for the actual series and any access arrangements. [1]

## References

[1]: https://www.cambridgeinternational.org/Images/662466-2025-2027-syllabus.pdf "Cambridge IGCSE Mathematics 0580 syllabus for examination in 2025, 2026 and 2027, version 3"

[2]: https://www.cambridgeinternational.org/Images/709706-2025-2027-syllabus-update.pdf "Syllabus update: Cambridge IGCSE Mathematics 0580 for examination in 2025, 2026 and 2027"

[3]: https://www.cambridgeinternational.org/programmes-and-qualifications/view/cambridge-igcse-mathematics-0580/ "Cambridge IGCSE Mathematics 0580 qualification page"

[4]: https://www.cambridgeinternational.org/Images/745681-2028-2030-syllabus.pdf "Cambridge IGCSE Mathematics 0580 syllabus for exams in 2028, 2029 and 2030"$md$),
  ('physics', 'OL', '1.1 Physical quantities and measurement techniques', 'physical-quantities-and-measurement-techniques-1-1', $md$Papers: Core theory 1/3; Extended theory 2/4; practical contexts 5/6.$md$, 101, $md$**Papers:** Core theory 1/3; Extended theory 2/4; practical contexts 5/6.

**[C] Measure deliberately.** Use a ruler or measuring cylinder for length or volume and a clock/digital timer for time. For a small distance or short time, measure many repeats and divide: for example, time 20 pendulum oscillations, then divide by 20. This reduces the percentage effect of reaction time.

**[S] Scalars and vectors.** A scalar has magnitude only: distance, speed, time, mass, energy and temperature. A vector has magnitude and direction: force, weight, velocity, acceleration, momentum, electric field strength and gravitational field strength. Draw a vector with its direction; add right-angle force/velocity vectors by scale drawing or Pythagoras.

> **Exam-use cue:** Write the measured quantity **and unit**. For a result based on repeated readings, state that repeats are taken and averaged; this is a reliability improvement, not merely “do it again”.

**Micro-example.** A pendulum takes 32.0 s for 20 oscillations. Its period is \(T=32.0/20=1.60\ \text{s}\). The count of 20 is deliberate; do not write 32.0 s as the period.

**Common errors:** calling a vector “a number with units”; giving a direction without magnitude; using one timing for a short event; adding perpendicular vectors arithmetically.$md$),
  ('physics', 'OL', '1.2 Motion', 'motion-1-2', $md$Papers: Core 1/3; Extended 2/4 adds all [S]; practical 5/6 frequently uses timing and graphs.$md$, 102, $md$**Papers:** Core 1/3; Extended 2/4 adds all **[S]**; practical 5/6 frequently uses timing and graphs.

**[C] Definitions and equations.** Speed is distance travelled per unit time, \(v=s/t\). Velocity is speed **in a stated direction**. Average speed is total distance divided by total time, not an average of selected speeds. Acceleration of free fall near Earth is approximately \(g=9.8\ \text{m s}^{-2}\).

**[C] Graph language.** On a distance–time graph, gradient is speed: horizontal means at rest; a straight sloping line means constant speed. On a speed–time graph, gradient indicates acceleration/deceleration and the area under the graph is distance travelled. Identify rest, constant speed, accelerating and decelerating from data or graph shape.

**[S] Acceleration and falling.** \(a=\Delta v/\Delta t\); a deceleration is negative acceleration. A straight, non-horizontal speed–time line has constant acceleration; a curve indicates changing acceleration. In free fall without resistance speed rises at about \(9.8\ \text{m s}^{-2}\). With air/liquid resistance, drag grows as speed rises; terminal velocity occurs when drag equals weight, hence resultant force and acceleration are zero.

> **Exam-use cue:** In a graph calculation, show the large gradient triangle and attach units. On a speed–time graph, calculate **area**, not gradient, for distance.

**Worked micro-example.** A speed rises uniformly from 4.0 to 16.0 m/s in 6.0 s. \(a=(16.0-4.0)/6.0=2.0\ \text{m s}^{-2}\). Distance is trapezium area: \(((4.0+16.0)/2)\times6.0=60\ \text{m}\).

**Common errors:** treating velocity and speed as synonyms; using final speed instead of change in velocity; saying a terminal-velocity object has no forces (it has balanced forces).$md$),
  ('physics', 'OL', '1.3 Mass and weight', 'mass-and-weight-1-3', $md$Papers: Core 1/3; Extended 2/4; practical 5/6 may use balances and force meters.$md$, 103, $md$**Papers:** Core 1/3; Extended 2/4; practical 5/6 may use balances and force meters.

**[C] Mass** measures quantity of matter in an object at rest relative to the observer; it is measured in kg or g. **Weight** is the gravitational force on a mass, measured in N. Gravitational field strength is force per unit mass: \(g=W/m\), equivalently the acceleration of free fall. Balances can compare mass (and, in the same field, weight).

**[S] Interpretation.** Weight is the effect of a gravitational field on mass. Mass stays the same between planets; weight changes because \(g\) changes.

**Micro-example.** A 0.60 kg package on Earth has \(W=mg=0.60\times9.8=5.88\ \text{N}\), about 5.9 N. The answer “0.60 N” confuses mass with weight.

**Common errors:** using kg as a unit of weight; stating that mass decreases on the Moon; omitting the force direction when drawing weight (vertically downward, toward the planet’s centre).$md$),
  ('physics', 'OL', '1.4 Density', 'density-1-4', $md$Papers: Core 1/3; Extended 2/4; practical 5/6.$md$, 104, $md$**Papers:** Core 1/3; Extended 2/4; practical 5/6.

**[C] Density** is mass per unit volume: \(\rho=m/V\). Find liquid density from a measured mass and volume. Find a regular solid’s volume from dimensions. For an irregular solid that sinks, use displacement to find volume. An object floats if its average density is lower than the liquid’s; it sinks if higher.

**[S] Two liquids.** If they do not mix, the less dense liquid forms the upper layer.

> **Exam-use cue:** Convert to coherent units before substitution: \(1\ \text{cm}^3=10^{-6}\ \text{m}^3\); \(1\ \text{g cm}^{-3}=1000\ \text{kg m}^{-3}\). State how a submerged object is prevented from trapping air in a displacement method.

**Worked micro-example.** A metal sample has mass 54 g and displaces 20 cm³ of water. \(\rho=54/20=2.7\ \text{g cm}^{-3}\). It is denser than water, so it sinks.

**Common errors:** reading the final measuring-cylinder volume instead of the change; mixing g with m³; using “heavy” rather than density to justify floating.$md$),
  ('physics', 'OL', '1.5 Forces, moments and stability', 'forces-moments-and-stability-1-5', $md$Papers: Core 1/3; Extended 2/4 adds [S]; practical 5/6 commonly uses springs, beams and force meters.$md$, 105, $md$**Papers:** Core 1/3; Extended 2/4 adds **[S]**; practical 5/6 commonly uses springs, beams and force meters.

### 1.5.1 Effects of forces

**[C] Resultant force and deformation.** A force can change size or shape. Plot/sketch/interpret a load–extension graph for an elastic solid and describe how to obtain it: add known loads, measure extension, repeat/average if appropriate, then plot load against extension. The resultant is the single force equivalent to all forces along one line. With zero resultant force, an object stays at rest or continues at constant speed in a straight line. A resultant force changes velocity — speed, direction, or both. Friction between surfaces can oppose motion and heat them; drag opposes motion through liquids and gases.

**[S] Spring constant, Newton’s second law and circular motion.** \(k=F/x\), where \(x\) is extension. The limit of proportionality is where the load–extension graph stops being a straight line through the origin; do not confuse it with the elastic limit, which is not required. \(F=ma\), with force and acceleration in the same direction. For circular motion, a force perpendicular to the motion changes direction. At fixed mass and radius, more force means greater speed; at fixed mass and speed, more force means smaller radius; more mass needs more force for the same speed/radius. \(mv^2/r\) is **not** required.

**Micro-example.** A 0.50 kg trolley accelerates at 3.0 m/s². \(F=ma=1.5\ \text{N}\) in the direction of acceleration. If friction is 0.4 N opposite motion, the driving force is 1.9 N, not 1.5 N.

**Common errors:** saying “there is a force in the direction of motion” for uniform motion; using total length instead of extension; ignoring opposing forces in a force balance.

### 1.5.2 Turning effect and equilibrium

**[C] Moment** is a turning effect: \(\text{moment}=F\times d_\perp\), where \(d_\perp\) is perpendicular distance from pivot. For a balanced beam with one force each side, clockwise moment equals anticlockwise moment. Equilibrium requires **both** no resultant force and no resultant moment.

**[S]** Apply the principle to several forces on either side; describe a practical demonstration with balanced moments.

**Micro-example.** A 12 N force acts 0.30 m from a pivot. Moment = \(12\times0.30=3.6\ \text{N m}\). A 9 N force balances it at \(3.6/9=0.40\ \text{m}\) on the opposite side.

**Common errors:** using distance along a sloping beam instead of the perpendicular distance; claiming zero net force alone guarantees no rotation.

### 1.5.3 Centre of gravity and stability

**[C]** The centre of gravity is the point through which the object’s weight acts. Locate that of an irregular plane lamina by suspending it from different points, drawing the vertical plumb-line each time, and finding the intersection. A low centre of gravity and broad base increase stability: an object topples when the weight’s line of action falls outside its base.

> **Exam-use cue:** A stability explanation needs a **line of action** statement, not only “it has a large base”.$md$),
  ('physics', 'OL', '1.6 Momentum', 'momentum-1-6', $md$Papers: Extended 2/4 only; practical scenarios may support the ideas.$md$, 106, $md$**Papers:** Extended 2/4 only; practical scenarios may support the ideas.

Momentum is \(p=mv\), a vector in the direction of velocity. Impulse is force × time and equals change in momentum: \(F\Delta t=\Delta(mv)\). In an isolated one-dimensional interaction, total momentum before equals total momentum after. Resultant force is rate of change of momentum: \(F=\Delta p/\Delta t\).

**Worked micro-example.** A 0.20 kg ball changes velocity from +5.0 m/s to −3.0 m/s in 0.10 s. \(\Delta p=0.20(-3.0-5.0)=-1.6\ \text{kg m s}^{-1}\). \(F=-1.6/0.10=-16\ \text{N}\): magnitude 16 N, opposite the initial positive direction.

**Common errors:** conserving kinetic energy in every collision; omitting signs/directions; using total mass after a collision but an individual velocity before it.$md$),
  ('physics', 'OL', '1.7 Energy, work and power', 'energy-work-and-power-1-7', $md$Papers: Core 1/3; Extended 2/4 adds [S]; practical 5/6 can use energy transfers, efficiency and data.$md$, 107, $md$**Papers:** Core 1/3; Extended 2/4 adds **[S]**; practical 5/6 can use energy transfers, efficiency and data.

### 1.7.1 Stores, transfers and efficiency

**[C]** Know chemical, kinetic, gravitational potential, elastic potential, nuclear, internal (thermal), electrostatic, magnetic and light energy stores. Energy is transferred mechanically, electrically, by heating and by radiation. In a closed system total energy is conserved, though useful energy often becomes less useful internal energy in surroundings. Draw/interpret Sankey diagrams: arrow width represents energy amount.

**[S]** The Sun is the main source for energy resources except geothermal, nuclear and tidal. Fusion releases energy in the Sun; research investigates large-scale fusion electricity. Efficiency is:

\[
\text{efficiency}=\frac{\text{useful energy output}}{\text{total energy input}}\times100\%\quad\text{or}\quad
\frac{\text{useful power output}}{\text{total power input}}\times100\%.
\]

### 1.7.2 Work and 1.7.4 Power

**[C]** Mechanical/electrical work done equals energy transferred. For a force moving an object in its direction, \(W=Fd=\Delta E\). Power is transfer rate: \(P=W/t=\Delta E/t\).

**Micro-example.** A 200 N load is raised 1.5 m in 3.0 s. \(W=200\times1.5=300\ \text{J}\); \(P=300/3.0=100\ \text{W}\). The mass of the load is irrelevant once its weight is given.

### 1.7.3 Energy resources

**[C]** Explain the chain for fossil fuels/biofuels, water (waves, tides, hydroelectric), geothermal, nuclear fuel, solar cells and solar heating/wind. Where relevant, use **boiler → turbine → generator**. Compare each on renewability, availability, reliability, scale and environmental impact. A fair comparison distinguishes intermittent sunlight/wind from dispatchable fuel sources and distinguishes operational emissions from broader impacts.

> **Exam-use cue:** “Renewable” is not automatically “reliable” or “no environmental impact”. Give a linked reason: “wind output is variable because wind speed varies”.

**Common errors:** describing energy as “used up” instead of transferred/dissipated; making Sankey output arrows total more than the input; reversing useful and wasted output in an efficiency calculation.$md$),
  ('physics', 'OL', '1.8 Pressure', 'pressure-1-8', $md$Papers: Core 1/3; Extended 2/4 adds [S]; practical 5/6 may test force/area reasoning.$md$, 108, $md$**Papers:** Core 1/3; Extended 2/4 adds **[S]**; practical 5/6 may test force/area reasoning.

**[C]** Pressure is force per unit area: \(p=F/A\). At constant area, larger force gives larger pressure. At constant force, larger area gives lower pressure. Pressure beneath a liquid rises with depth and with liquid density.

**[S]** Quantitatively, \(\Delta p=\rho g\Delta h\).

**Micro-example.** A 600 N person stands on two shoes with total contact area 0.040 m²: \(p=600/0.040=15\,000\ \text{Pa}\). Standing on one shoe doubles pressure if its contact area is half.

**Common errors:** using surface area of the object instead of the contact area; treating liquid pressure as dependent on container shape rather than depth/density.

---

# 2. Thermal physics$md$),
  ('physics', 'OL', '2.1 Kinetic particle model of matter', 'kinetic-particle-model-of-matter-2-1', $md$Papers: Core 1/3; Extended 2/4 adds [S]; practical 5/6 may involve heating, cooling and volume.$md$, 201, $md$**Papers:** Core 1/3; Extended 2/4 adds **[S]**; practical 5/6 may involve heating, cooling and volume.

### 2.1.1 States of matter and 2.1.2 particle model

**[C]** In a solid, particles are close together in a fixed, regular arrangement and vibrate. In a liquid, they remain close but have random arrangement and move past each other. In a gas, they are far apart, randomly arranged and move rapidly. Use this model to explain shape, volume, compressibility, diffusion and density. Brownian motion is random motion of visible particles caused by collisions with unseen particles.

**[S]** Interpret diffusion using random molecular motion; link changing internal energy to particle kinetic/potential energies. Use the particle model to explain gas pressure as collisions on container walls.

### 2.1.3 Gases and absolute temperature

**[C]** For a fixed mass of gas, increasing temperature at constant volume raises pressure because particles collide with walls more often and harder. At constant temperature, reducing volume raises pressure because collisions are more frequent. Convert using \(T/\text{K}=\theta/{}^\circ\text{C}+273\).

**[S]** At constant temperature for fixed mass, \(pV=\text{constant}\); plot/interpet an inverse \(p\)-\(V\) relationship.

**Micro-example.** \(27^\circ\text{C}=300\ \text{K}\), not 246 K. If volume halves at constant temperature, pressure doubles.

**Common errors:** saying particles themselves expand; using Celsius in \(pV=\text{constant}\) (the equation does not use temperature, but Kelvin is essential when temperature ratios are involved); claiming gases have no volume.$md$),
  ('physics', 'OL', '2.2 Thermal properties and temperature', 'thermal-properties-and-temperature-2-2', $md$### 2.2.1 Thermal expansion$md$, 202, $md$### 2.2.1 Thermal expansion

**Papers:** Core 1/3; Extended 2/4.

**[C]** Solids, liquids and gases expand when heated at constant pressure. Know applications/consequences such as expansion gaps and bimetallic strips. **[S]** Explain the relative order: gases expand most, then liquids, then solids, because particle separation and bonding differ.

### 2.2.2 Specific heat capacity **[S]**

**Papers:** Extended 2/4; practical 5/6 contexts can assess a heating method.

**[C]** Raising an object’s temperature increases internal energy. **[S]** It increases average kinetic energy of particles. Specific heat capacity is energy needed per kg per °C (or K) rise: \(c=\Delta E/(m\Delta\theta)\). To measure a solid or liquid’s \(c\), supply known electrical energy, measure mass and temperature rise, insulate, stir liquids and account for heat losses/apparatus heating.

**Micro-example.** 840 J raises 0.20 kg by 10 °C: \(c=840/(0.20\times10)=420\ \text{J kg}^{-1}\,{}^\circ\text{C}^{-1}\).

### 2.2.3 Melting, boiling and evaporation

**[C]** During melting and boiling, energy is supplied but temperature stays constant because energy changes particle potential energy/separation. Water melts at 0 °C and boils at 100 °C at standard atmospheric pressure. Condensation and solidification involve particles becoming more closely bound. Evaporation is escape of higher-energy surface particles and cools the remaining liquid.

**[S]** Boiling occurs throughout a liquid at a fixed boiling temperature with bubble formation; evaporation occurs at the surface and can occur below boiling. Higher temperature, larger surface area and faster air movement increase evaporation. An object touching an evaporating liquid cools because energy transfers to replace energy carried away by escaping particles.

**Common errors:** “boiling is faster evaporation”; saying temperature rises during a pure substance’s phase change; calling latent energy “lost”.$md$),
  ('physics', 'OL', '2.3 Transfer of thermal energy', 'transfer-of-thermal-energy-2-3', $md$### 2.3.1 Conduction$md$, 203, $md$### 2.3.1 Conduction

**Papers:** Core 1/3; Extended 2/4; practical 5/6.

**[C]** Compare good conductors and thermal insulators using a fair test. **[S]** In solids, energy passes through lattice vibrations; in metals, delocalised electrons transfer energy quickly too. Gases and most liquids conduct poorly because particles are separated and have less effective transfer. Some solids are intermediate conductors, not simply “conductors” or “insulators”.

### 2.3.2 Convection

**[C]** Convection transfers thermal energy in liquids and gases. A heated region expands, becomes less dense and rises; cooler, denser material sinks, producing a convection current. Describe a dye/smoke demonstration.

### 2.3.3 Radiation and 2.3.4 applications

**[C]** Thermal radiation is infrared and every object emits it. It needs no medium. Dull black surfaces are good emitters/absorbers and poor reflectors; shiny white/light surfaces are poor emitters/absorbers and good reflectors. Explain pans, room heating and insulation in terms of conduction, convection and radiation.

**[S]** Constant temperature means rate received = rate transferred away. A greater incoming rate warms an object; greater outgoing rate cools it. Explain Earth’s temperature using incoming/outgoing radiation balance. Compare IR emitters/absorbers experimentally and know emission rate increases with surface temperature and area. Explain combined processes in a wood/coal fire and car radiator.

> **Exam-use cue:** Identify the mechanism before explaining: radiation does not require particles; convection requires moving fluid; conduction needs particle/electron interaction.

**Common errors:** saying black “attracts heat”; using convection in a solid; describing a pan handle as insulated because it is shiny (its material controls conduction).

---

# 3. Waves$md$),
  ('physics', 'OL', '3.1 General properties of waves', 'general-properties-of-waves-3-1', $md$Papers: Core 1/3; Extended 2/4 adds [S]; practical 5/6 may use ripple tanks and measurements.$md$, 301, $md$**Papers:** Core 1/3; Extended 2/4 adds **[S]**; practical 5/6 may use ripple tanks and measurements.

**[C] Wave language.** Waves transfer energy without net transfer of matter. A transverse wave has vibrations perpendicular to travel direction; a longitudinal wave has vibrations parallel to travel direction. Use amplitude, wavelength \(\lambda\), frequency \(f\), period \(T\), wavefront and speed \(v\). \(v=f\lambda\); \(T=1/f\). Describe reflection, refraction (direction change due to speed change) and diffraction. Ripple tanks show reflection, refraction from changed depth, diffraction through a gap and at an edge.

**[S]** Explain that speed is frequency × wavelength; use \(f=1/T\). In a given medium, changing frequency changes wavelength; at a narrow gap diffraction is greater when wavelength is larger relative to gap width. Also describe wavelength’s effect on edge diffraction.

**Worked micro-example.** A wave has \(f=5.0\ \text{Hz}\) and \(\lambda=0.40\ \text{m}\). \(v=5.0\times0.40=2.0\ \text{m s}^{-1}\). Its period is \(1/5.0=0.20\ \text{s}\).

**Common errors:** claiming amplitude changes speed in a given medium; calling refraction a change in frequency; using crest-to-trough as one wavelength (it is half a wavelength).$md$),
  ('physics', 'OL', '3.2 Light', 'light-3-2', $md$### 3.2.1 Reflection$md$, 302, $md$### 3.2.1 Reflection

**Papers:** Core 1/3; Extended 2/4 adds construction/calculation; practical 5/6 optics.

**[C]** The normal is perpendicular to the surface at incidence. Measure angles from the normal. \(i=r\). A plane mirror image is virtual, same size, same perpendicular distance behind mirror as object is in front, and laterally inverted. **[S]** Construct reflected rays accurately and use geometry/measurements.

### 3.2.2 Refraction

**[C]** Refraction is a direction change at a boundary because speed changes. Define normal, angle of incidence and angle of refraction. Trace rays through transparent blocks. Critical angle is the incidence angle in the denser medium that gives a refracted ray at 90°. Above it, total internal reflection occurs; apply it to optical fibres.

**[S]** Refractive index \(n\) is the ratio of wave speeds in two regions and, for air into a material, \(n=\sin i/\sin r\) and \(n=1/\sin c\). Explain fibre telecommunications.

### 3.2.3 Thin lenses

**[C]** A converging lens brings parallel rays to a principal focus; a diverging lens spreads them as if from a focus. Know focal length, principal axis and principal focus. Draw rays for a **real** converging-lens image; describe image size, orientation and whether real/virtual. A virtual image is found by backward extrapolation of diverging rays and cannot be projected onto a screen.

**[S]** Construct virtual images with a converging lens; use a magnifying glass; correct long-sightedness with a converging lens and short-sightedness with a diverging lens.

### 3.2.4 Dispersion

**[C]** A prism disperses white light by refraction. Know the seven colours in frequency order: red, orange, yellow, green, blue, indigo, violet (low to high frequency; reverse for wavelength). **[S]** Monochromatic light has one frequency.

> **Exam-use cue:** A ray diagram needs arrows, a normal where relevant, and solid rays for actual light. Use dashed extensions only for virtual rays.

**Common errors:** measuring angle to the surface; saying an image is “virtual because it is upright” (classify by whether rays meet/project); placing long-sight correction lens as diverging.$md$),
  ('physics', 'OL', '3.3 Electromagnetic spectrum', 'electromagnetic-spectrum-3-3', $md$Papers: Core 1/3; Extended 2/4 adds [S] communications; practical contexts may involve optics.$md$, 303, $md$**Papers:** Core 1/3; Extended 2/4 adds **[S]** communications; practical contexts may involve optics.

**[C]** In increasing frequency (and decreasing wavelength): radio, microwaves, infrared, visible light, ultraviolet, X-rays, gamma rays. All electromagnetic waves travel at approximately the same speed in air. Know uses: radio/TV/astronomy/RFID; microwaves for satellite TV, mobiles and ovens; IR for grills, remotes, alarms, thermal imaging and fibres; visible for vision/photography/illumination; UV for security marks and water sterilisation; X-rays for medical/security scanning; gamma for food/equipment sterilisation and cancer detection/treatment.

**[C] Safety:** excess microwaves heat internal body cells; IR burns skin; UV damages skin/eyes and can lead to skin cancer/eye conditions; X-rays/gamma can mutate/damage cells. Satellite communication mainly uses microwaves, with examples of low-orbit and geostationary satellite systems.

**[S]** Mobile/wireless internet use microwaves because they penetrate some walls and require a short aerial; Bluetooth uses radio waves that pass through walls but weaken. Visible/short-wavelength IR in optical fibre can carry high data rates because the glass is transparent. Distinguish analogue (continuously varying) and digital (discrete) signals. Sound can be sent in either form; digital signals offer high data rates and accurate regeneration, improving range.

**Common errors:** putting gamma at the low-frequency end; saying a microwave oven uses “radioactivity”; treating all EM exposure as equally ionising.$md$),
  ('physics', 'OL', '3.4 Sound', 'sound-3-4', $md$Papers: Core 1/3; Extended 2/4 adds [S]; practical 5/6 timing contexts.$md$, 304, $md$**Papers:** Core 1/3; Extended 2/4 adds **[S]**; practical 5/6 timing contexts.

**[C]** Sound is made by vibration and is longitudinal. Human hearing is about 20 Hz to 20 000 Hz. Sound needs a medium and travels about 330–350 m/s in air. Measure its speed from distance/time. Amplitude affects loudness; frequency affects pitch. An echo is reflected sound. Ultrasound has frequency above 20 kHz.

**[S]** A longitudinal wave has compressions and rarefactions. In general sound is faster in solids than liquids, and faster in liquids than gases. Apply ultrasound to non-destructive testing, soft-tissue scanning and sonar, including \(d=vt\) and halving a return-trip distance.

**Micro-example.** An echo returns in 0.80 s in air at 340 m/s. Wall distance \(=340\times0.80/2=136\ \text{m}\). Divide by two because the wave travels there and back.

**Common errors:** calling ultrasound “very loud”; linking pitch to amplitude; forgetting the return path in echo/sonar questions.

---

# 4. Electricity and magnetism$md$),
  ('physics', 'OL', '4.1 Simple phenomena of magnetism', 'simple-phenomena-of-magnetism-4-1', $md$Papers: Core 1/3; Extended 2/4; practical 5/6 may use magnets/compasses.$md$, 401, $md$**Papers:** Core 1/3; Extended 2/4; practical 5/6 may use magnets/compasses.

**[C]** Like poles repel; unlike poles attract. Plot a magnetic field using a plotting compass and show direction N→S outside a magnet. A uniform field has parallel, equally spaced lines. Soft iron is easily magnetised/demagnetised; steel is harder to magnetise but stays magnetised. Permanent magnets have fixed fields; electromagnets are temporary and can be switched/varied. Describe uses, including magnetic materials in switches, relays and separation.

**[S]** Explain induced magnetism and distinguish magnetic from non-magnetic materials. Describe force between parallel current-carrying conductors and use field patterns around a bar magnet, straight wire and solenoid to determine relative directions.

**Common errors:** drawing field lines that cross; reversing compass interpretation; calling any iron object a permanent magnet.$md$),
  ('physics', 'OL', '4.2 Electrical quantities', 'electrical-quantities-4-2', $md$### 4.2.1 Charge and 4.2.2 current$md$, 402, $md$### 4.2.1 Charge and 4.2.2 current

**Papers:** Core 1/3; Extended 2/4 adds **[S]**; practical 5/6 circuits.

**[C]** Positive and negative charges attract; like charges repel. Charge by friction is transfer of electrons. An electric field is a region where an electric charge experiences a force; field lines show force direction on a positive test charge. Conductors have mobile electrons; insulators do not. Current relates to flow of charge. Use analogue/digital ammeters on a suitable range. In metals, free electrons move. d.c. is one direction; a.c. repeatedly reverses.

**[S]** \(I=Q/t\). Conventional current is positive to negative; electron flow is negative to positive.

### 4.2.3 e.m.f., p.d. and 4.2.4 resistance

**[C]** E.m.f. is work done by a source per unit charge around a complete circuit; p.d. is work done per unit charge through a component. Both are volts; voltmeters are placed in parallel and selected on an appropriate range. \(R=V/I\). Determine resistance with ammeter + voltmeter. A longer metallic wire has higher resistance; a thicker wire has lower resistance.

**[S]** \(E=W/Q\) and \(V=W/Q\). Sketch/explain I–V graphs: an ohmic constant resistor has a straight line through origin; a filament lamp’s gradient decreases as it heats; a diode conducts mainly in one direction after threshold. For metal wire, \(R\propto l\) and \(R\propto1/A\).

### 4.2.5 Electrical energy and power

**[C]** A circuit transfers energy from cell/mains to components/surroundings. \(P=IV\); \(E=IVt\). A kilowatt-hour is energy from 1 kW for 1 hour; calculate cost from energy used × tariff.

**Worked micro-example.** A 12 V lamp has current 0.50 A: \(P=12\times0.50=6.0\ \text{W}\). In 5 minutes, \(E=6.0\times300=1800\ \text{J}\). Use seconds for joules, or hours for kWh — never mix them.

**Common errors:** putting an ammeter in parallel; calling e.m.f. “current from the cell”; using kW × seconds to claim kWh.$md$),
  ('physics', 'OL', '4.3 Electric circuits', 'electric-circuits-4-3', $md$### 4.3.1 Circuit diagrams and components$md$, 403, $md$### 4.3.1 Circuit diagrams and components

**Papers:** Core 1/3; Extended 2/4 adds diodes/LEDs; practical 5/6.

**[C]** Draw and interpret standard symbols for cells/batteries, a.c./d.c. supplies, generators, potential dividers, switches, fixed/variable resistors, heaters, NTC thermistors, LDRs, lamps, motors, bells, ammeters, voltmeters, magnetising coils, transformers, fuses and relays. Know their behaviour: an NTC thermistor’s resistance decreases as temperature rises; an LDR’s resistance decreases as light intensity rises. **[S]** Include diodes and LEDs; they allow current mainly in one direction (LED emits when forward biased).

### 4.3.2 Series and parallel

**[C]** In series, current is the same everywhere; e.m.f.s and resistances in series add. In parallel, source current is larger than an individual branch current; combined resistance of parallel resistors is below either individual resistance. Lamps in parallel operate independently and each receives supply p.d.

**[S]** At a junction, currents in = currents out. Series p.d.s add. Each parallel branch has the same p.d. Calculate two parallel resistors with \(1/R_T=1/R_1+1/R_2\) (or product-over-sum for two). Explain conservation of charge at a junction.

### 4.3.3 Potential divider **[S]**

A variable potential divider supplies a variable fraction of a p.d. For two resistors in series, \(R_1/R_2=V_1/V_2\). **[C]** Also know that for constant current, higher resistance means greater p.d. across a conductor.

**Micro-example.** Two series resistors are 2 Ω and 4 Ω across 12 V. Ratio of p.d.s is 1:2, so they are 4 V and 8 V respectively. Check: they add to 12 V.

**Common errors:** saying current splits equally without equal branch resistances; adding parallel resistances; treating a potential divider as two components in parallel.$md$),
  ('physics', 'OL', '4.4 Electrical safety', 'electrical-safety-4-4', $md$Papers: Core 1/3; Extended 2/4; practical safety in 5/6.$md$, 404, $md$**Papers:** Core 1/3; Extended 2/4; practical safety in 5/6.

**[C]** Know hazards of damaged insulation, overheating cables, damp conditions and overloading plugs/extension leads/sockets. Mains circuits have live, neutral and earth wires. Put the switch in the **live** wire so switching off disconnects the appliance from live potential. A fuse melts if current exceeds its rating; choose a rating just above normal operating current. The earth wire protects a metal case: a fault sends current to earth, creating a large current that melts fuse/trips protection. Double insulation avoids an exposed metal case.

> **Exam-use cue:** Give the causal chain: damaged live wire touches metal case → case becomes live → earth provides low-resistance path → large current → fuse melts/disconnects. “Earth removes electricity” is not an explanation.$md$),
  ('physics', 'OL', '4.5 Electromagnetic effects', 'electromagnetic-effects-4-5', $md$### 4.5.1 Induction and 4.5.2 a.c. generator$md$, 405, $md$### 4.5.1 Induction and 4.5.2 a.c. generator

**Papers:** Core 1/3; Extended 2/4 adds mechanisms/graphs; practical 5/6 conceptual contexts.

**[C]** A changing magnetic field induces e.m.f. (and current in a complete circuit). Increase induced e.m.f. by faster relative movement, stronger magnet/field, or more turns. An a.c. generator rotates a coil in a magnetic field and uses slip rings/brushes.

**[S]** Explain changing magnetic flux linkage and interpret e.m.f.–time graph: maximum magnitude when flux linkage changes fastest; zero when it is momentarily not changing. Relate peaks/troughs/zeros to coil position.

### 4.5.3 Magnetic effect of current

**[C]** Describe field pattern/direction around a straight wire and solenoid; use iron filings/plotting compass. Relays use an electromagnet to switch another circuit; loudspeakers use force on a current-carrying coil. **[S]** State qualitative field-strength variation and effects of current magnitude/direction.

### 4.5.4 Force on conductors and 4.5.5 d.c. motor

**[C]** A current-carrying conductor in a magnetic field experiences a force. Reversing current or field reverses force. A current-carrying coil can turn; more turns, current or field strength increase turning effect. **[S]** Use relative directions of force, field and current; determine force on charged-particle beams. Explain a motor including brushes and split-ring commutator, which reverses coil current every half turn to preserve rotation direction.

### 4.5.6 Transformers

**[C]** A simple transformer has primary and secondary coils on a soft-iron core. A step-up transformer has more secondary turns; a step-down fewer. \(V_p/V_s=N_p/N_s\). Use transformers in high-voltage transmission; high voltage means low current for a given power and hence less cable heating.

**[S]** Explain operation by changing current in primary producing changing magnetic field/core flux and induced e.m.f. in secondary. At 100% efficiency \(I_pV_p=I_sV_s\). Cable loss \(P=I^2R\), so lowering current reduces loss.

**Micro-example.** A 240 V primary has 1200 turns and a 100-turn secondary. \(V_s=240\times100/1200=20\ \text{V}\): it is step-down. Do not use d.c. for a conventional transformer because it does not provide a continuously changing magnetic field.

**Common errors:** claiming transformers work with steady d.c.; interchanging primary/secondary ratios; saying a relay “increases current” rather than switches a circuit.

---

# 5. Nuclear physics$md$),
  ('physics', 'OL', '5.1 The nuclear model of the atom', 'the-nuclear-model-of-the-atom-5-1', $md$Papers: Core 1/3; Extended 2/4 adds isotope/nuclear detail; practical 5/6 can use count-rate data.$md$, 501, $md$**Papers:** Core 1/3; Extended 2/4 adds isotope/nuclear detail; practical 5/6 can use count-rate data.

### 5.1.1 Atom

**[C]** Atoms have a tiny positive nucleus surrounded by negative electrons. Protons have +1 charge, electrons −1, neutrons zero; protons/neutrons have roughly equal mass and electron mass is negligible. Atomic number/proton number is number of protons; a neutral atom has the same number of electrons. **[S]** Isotopes have the same proton number but different neutron numbers; nucleon/mass number is protons + neutrons. Use nuclide notation \({}^{A}_{Z}X\).

### 5.1.2 Nucleus

**[C]** The nucleus contains protons and neutrons. **[S]** Nuclear binding holds nucleons together; nuclear energy release comes from changes in nuclei, including fission/fusion contexts. (Use the syllabus’s required model and equations rather than introducing unrequired mass-defect calculations.)

> **Exam-use cue:** In \({}^{23}_{11}\mathrm{Na}\), protons = 11, neutrons = \(23-11=12\), electrons = 11 if neutral.$md$),
  ('physics', 'OL', '5.2 Radioactivity', 'radioactivity-5-2', $md$### 5.2.1 Detection and 5.2.2 emissions$md$, 502, $md$### 5.2.1 Detection and 5.2.2 emissions

**Papers:** Core 1/3; Extended 2/4 adds detail; practical 5/6 may present count data.

**[C]** Detect radiation with a Geiger–Müller tube/counter; background radiation must be considered. Compare alpha, beta and gamma by nature, ionising power, penetration, range and deflection in electric/magnetic fields. Alpha is a helium nucleus, beta is an electron, gamma is electromagnetic radiation. Alpha is most ionising/least penetrating; gamma least ionising/most penetrating. Use paper, aluminium and thick lead/concrete as appropriate absorbers.

**[S]** Explain differences in deflection using charge and mass; compare penetration and ionisation in applications. Beta emission follows \(\text{neutron}\rightarrow\text{proton}+\text{electron}\).

### 5.2.3 Decay and 5.2.4 half-life

**[C]** Radioactive decay is spontaneous and random change in an unstable nucleus, emitting alpha/beta and/or gamma. Alpha/beta changes the element. Half-life is the time for half the nuclei in a sample to decay. Use tables/decay curves for straightforward calculations where background has already been dealt with.

**[S]** Isotopes can be radioactive because of excess neutrons and/or a heavy nucleus. Show alpha, beta and gamma changes with nuclide equations. Calculate half-life from data/curves where background has not been subtracted: subtract background count rate first. Select isotopes using radiation type and half-life for smoke alarms, food irradiation, gamma sterilisation, thickness control, cancer diagnosis and treatment.

**Worked micro-example.** A source gives 1000 counts/min, with background 40 counts/min. Net = 960. After 6 h it gives 280 counts/min net? First subtract 40 from a measured 320: 280. Since 960 → 480 → 240, 280 is close to two half-lives, so half-life is about 3 h (use the exact graph/data supplied in an exam).

### 5.2.5 Safety

**[C]** Ionising radiation can cause cell death, mutations and cancer. Move, use and store sources safely. **[S]** Explain safety in terms of minimising exposure time, maximising distance and using shielding; source handling tools and sealed containers reduce exposure.

**Common errors:** describing gamma as a particle; failing to subtract background when asked; saying decay can be sped up by heat/pressure; claiming alpha is safe in every situation (it is dangerous inside the body).

---

# 6. Space physics$md$),
  ('physics', 'OL', '6.1 The Earth and the Solar System', 'the-earth-and-the-solar-system-6-1', $md$Papers: Core 1/3; Extended 2/4 adds [S]; practical-style graph/data skills may occur in 5/6.$md$, 601, $md$**Papers:** Core 1/3; Extended 2/4 adds **[S]**; practical-style graph/data skills may occur in 5/6.

### 6.1.1 The Earth

**[C]** Earth rotates on a tilted axis once every 24 h, causing day/night. It orbits the Sun once each year. The tilt and orbit cause seasons: a hemisphere tilted toward the Sun receives more direct radiation and longer days. The Moon orbits Earth; phases arise because we see differing portions of its sunlit half. Solar eclipses occur when Moon lies between Sun and Earth; lunar eclipses when Earth lies between Sun and Moon.

**[S]** Explain tides mainly by gravitational attraction of Moon (and Sun) and relate data to orbital/rotational phenomena.

### 6.1.2 Solar System

**[C]** The Solar System includes the Sun; eight planets in order from Sun — Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune — plus minor planets (dwarf planets such as Pluto and asteroids), moons, comets and natural satellites. Inner four are small/rocky; outer four are large/gaseous. Explain with accretion: gravity gathers varied material in a rotating cloud/disc, with temperature/material differences across it. A planet’s surface gravitational field depends on its mass and weakens with distance from planet. Use \(t=d/v\) for light travel. The Sun has most Solar-System mass, so its gravity holds planetary orbits; gravitational attraction provides orbiting force.

**[S]** Planet/minor-planet/comet orbits are elliptical; Sun is not at the centre except approximately circular orbit. Analyse orbital distance, duration, density, surface temperature and field strength data. Sun’s field and planet orbital speed decrease with increasing distance. In an elliptical orbit, an object is faster nearer the Sun; explain via conservation of energy.

**Micro-example.** Light takes \(1.50\times10^{11}\ \text{m}/3.0\times10^8\ \text{m s}^{-1}=500\ \text{s}\), about 8.3 min, to travel from Sun to Earth.

**Common errors:** saying seasons are caused by changing Earth–Sun distance; confusing rotation with orbit; placing the Sun at the centre of every ellipse.$md$),
  ('physics', 'OL', '6.2 Stars and the Universe', 'stars-and-the-universe-6-2', $md$### 6.2.1 Sun and 6.2.2 stars$md$, 602, $md$### 6.2.1 Sun and 6.2.2 stars

**Papers:** Core 1/3; Extended 2/4 adds **[S]**.

**[C]** The Sun is a medium-sized star, mostly hydrogen and helium, radiating most energy as infrared, visible and ultraviolet. Galaxies contain many billions of stars; Sun is in the Milky Way, whose other stars are much farther from Earth. A light-year is distance light travels in vacuum in one year. The Milky Way is one of billions of galaxies and is about 100 000 light-years across.

**[S]** One light-year is \(9.5\times10^{15}\ \text{m}\). Stars are powered by nuclear fusion of hydrogen to helium. Life cycle: gas/dust cloud → collapsing/heating protostar → stable star when inward gravity balances outward effect of high central temperature → hydrogen depletion → red giant (lower mass) or red supergiant (higher mass). A red giant forms planetary nebula + white dwarf; a red supergiant explodes as supernova, forming nebula/new heavier elements and leaving neutron star or black hole. Supernova nebula can form new stars/planets.

### 6.2.3 Universe

**[C]** Redshift is increased observed wavelength of EM radiation from receding stars/galaxies. Distant galaxies are redshifted relative to light observed on Earth. This evidence supports an expanding Universe and the Big Bang theory.

**[S]** Cosmic microwave background radiation is observed in all directions; it was produced shortly after Universe formation and its wavelength stretched into the microwave region as the Universe expanded. From redshift determine recession speed \(v\); supernova brightness can determine distance \(d\). \(H_0=v/d\), with current syllabus estimate \(H_0=2.2\times10^{-18}\ \text{s}^{-1}\). \(d/v=1/H_0\) estimates Universe age and supports an origin in a single point.

**Worked micro-example.** If \(v=4.4\times10^7\ \text{m s}^{-1}\) and \(d=2.0\times10^{25}\ \text{m}\), \(H_0=v/d=2.2\times10^{-18}\ \text{s}^{-1}\). Use the supplied value/units; do not quote a different cosmology constant from memory.

**Common errors:** calling redshift evidence that light “turns red” due to distance alone; confusing light-year (distance) with year (time); saying all stars end as black holes.

---

# Practical skills: Papers 5 and 6

**Papers:** Paper 5 Practical Test or Paper 6 Alternative to Practical; **both routes test AO3, 40 marks, 20%**. They use the same experimental skills and contexts; Paper 5 requires laboratory experiments and Paper 6 does not. [1]

> **Route cue:** Do not treat Paper 6 as a “theory paper”. It tests practical judgement: reading apparatus, choosing controls, handling uncertainty, processing data and evaluating a method.

## Practical planning algorithm

1. State the **independent variable** (what you change) and a sensible range/number of values.
2. State the **dependent variable** (what you measure) and how/with what apparatus.
3. Name relevant **control variables** and state how they are kept constant.
4. Describe a repeatable method, including enough detail to reproduce it.
5. Identify a specific hazard and a specific precaution.
6. Prepare a table with quantity/unit headings before data collection.
7. Repeat readings where appropriate; calculate means; identify anomalies only with evidence.
8. Plot/process data, state the trend with data support, then evaluate limitations and improvements.

## Core practical contexts to rehearse

Cambridge may set measurement of length/volume/force and small distances/times; derived quantities such as spring extension per load, resistance and acceleration; relationships such as p.d. versus wire length; comparison of reflection angles or density; heating/cooling; springs/balances; motion/oscillations; circuits and current/p.d.; and optics with pins, mirrors, prisms, lenses or blocks. A method may use unfamiliar simple apparatus. [1]

## Accuracy, precision, reliability and validity

| Term | Use it correctly in an answer | Useful improvement |
|---|---|---|
| **Accuracy** | Closeness to true value; reduce systematic error | Zero/check calibration; avoid parallax; use a more suitable instrument |
| **Precision** | Spread/repeatability of readings | Use finer scale resolution; take repeated readings |
| **Reliability** | Consistency of repeated data | Repeat and calculate a mean; identify a justified anomaly |
| **Validity** | Whether test measures intended relationship fairly | Control variables; use a method matching the question |
| **Random error** | Unpredictable variation between readings | Repeat/mean; use longer time or larger distance |
| **Systematic error** | Same bias in a direction | Correct zero error; recalibrate/change method |

**Graph protocol.** Put quantity and unit on each axis, e.g. `time / s`; use more than half the grid; choose sensible 1, 2 or 5 scales; plot within half a small square; draw one thin best-fit line/curve. Ignore a clearly identified anomaly for the line. Use a triangle spanning at least half the best-fit line for gradient, normally to 2–3 significant figures. Interpolate within data and extrapolate cautiously beyond it. [1]

**Practical micro-example.** To test \(V\) against wire length, change **length**, measure **p.d.** with voltmeter, and keep wire material, diameter, current/temperature conditions as controlled as practicable. “Use more accurate equipment” alone is weak; “use a longer wire length range so changes in p.d. exceed voltmeter resolution” identifies a mechanism.

**Safety language that earns credit.** Name the hazard, consequence and action: “hot water may scald; use heatproof gloves/tongs and allow apparatus to cool.” For a mains question, do not recommend touching/re-wiring live equipment; isolate supply first.

---

# Paper checklists and command words

## Paper 1 / Paper 2: Multiple Choice

- Read the stem, unit and qualifier (`best`, `not`, `always`, `resultant`, `average`) before looking at options.
- Estimate scale/sign first. Eliminate unit-impossible options before calculating.
- For Paper 2, actively check whether the question reaches **Supplement** depth: momentum, \(F=ma\), SHC, refractive index, parallel-resistance calculation, transformer power, decay equations, Hubble relation, etc.
- Use diagrams as data. A field line, graph gradient and ray direction are information, not decoration.
- If unsure, choose the option consistent with a stated law; do not leave a multiple-choice item blank.

## Paper 3 / Paper 4: Theory

- Match number of distinct points to marks where possible; use one clear physical point per sentence.
- In calculations: equation → substitution with units → answer/unit → sensible rounding. Rearrange before inserting values when it reduces mistakes.
- For “explain”, link cause to mechanism to outcome. Example: “resistance rises, so for constant current p.d. rises because \(V=IR\).”
- For Paper 4, label every **[S]** extension in revision and practise joining it to Core ideas rather than memorising isolated equations.
- Draw graph/ray/circuit diagrams using correct conventions and labels. A correct answer without a required unit or direction may lose credit.

## Paper 5: Practical Test

- Read every scale to the nearest half smallest division where appropriate; check zero positions and units.
- Build/alter the requested apparatus systematically; for circuits, switch off before changing connections where relevant.
- Record readings immediately in a pre-headed table; do not place units repeatedly in table cells.
- Perform repeats where time permits and use observations as well as numbers.
- State a conclusion from the data, then a limitation and a physically targeted improvement.

## Paper 6: Alternative to Practical

- Identify what each instrument measures and select a realistic range/resolution.
- If a diagram is supplied, use it exactly: include known scale-reading limitations, not invented apparatus faults.
- Plan fair tests with explicit control variables; “keep everything the same” is not enough.
- Inspect anomalies before calculating a gradient or conclusion. Subtract background radiation where required.
- When asked for an improvement, link it to the limitation and expected effect on uncertainty/accuracy.

## High-yield command-word strategy

| Command word | What a strong Physics response does |
|---|---|
| **Calculate / determine** | Selects an equation or method, substitutes compatible units, gives an answer with unit and appropriate significant figures |
| **Define** | Gives precise meaning, not an example: e.g. “force per unit area” for pressure |
| **State / give / identify** | Gives the requested fact briefly; do not bury it in an unneeded paragraph |
| **Describe** | Sets out observable features or ordered steps, without necessarily giving causes |
| **Explain** | Connects why/how using a physical mechanism and the stated situation |
| **Compare** | Gives matched similarities and/or differences using the same criterion |
| **Deduce / predict** | Uses supplied trend/information to reach a consequence; cite the relevant data or law |
| **Suggest** | Applies knowledge to a plausible unfamiliar situation; more than one answer may be valid |
| **Justify / comment** | Makes a claim and supports it with evidence, data, calculation or a relevant principle |
| **Sketch** | Draws key shape/features/proportions only; label axes/critical points when relevant |

The official command-word meanings are the governing definitions in the syllabus. [1]

---

# Formula, definitions and data quick reference

## Equation bank

| Area | Equation | Use / unit check |
|---|---|---|
| Motion | \(v=s/t\); average speed = total distance / total time | m/s when m and s are used |
| Acceleration **[S]** | \(a=\Delta v/\Delta t\) | m/s²; sign indicates direction convention |
| Weight | \(g=W/m\), hence \(W=mg\) | \(g\) in N/kg or m/s² |
| Density | \(\rho=m/V\) | kg/m³ or g/cm³ consistently |
| Spring **[S]** | \(k=F/x\) | N/m or N/cm; extension, not total length |
| Newton’s second law **[S]** | \(F=ma\) | resultant force in N |
| Moment | \(M=F d_\perp\) | N m; perpendicular distance |
| Momentum **[S]** | \(p=mv\); \(F\Delta t=\Delta(mv)\); \(F=\Delta p/\Delta t\) | kg m/s; N s |
| Work / power | \(W=Fd=\Delta E\); \(P=W/t=\Delta E/t\) | J, W |
| Efficiency **[S]** | useful / total × 100% | both quantities must be same type: energy/energy or power/power |
| Pressure | \(p=F/A\); **[S]** \(\Delta p=\rho g\Delta h\) | Pa = N/m² |
| Gas **[S]** | \(pV=\text{constant}\) | fixed mass, constant temperature |
| Temperature | \(T/\text{K}=\theta/{}^\circ\text{C}+273\) | Kelvin is an absolute scale |
| SHC **[S]** | \(c=\Delta E/(m\Delta\theta)\) | J kg⁻¹ °C⁻¹ or J kg⁻¹ K⁻¹ |
| Waves | \(v=f\lambda\); **[S]** \(f=1/T\) | m/s, Hz, m |
| Refraction **[S]** | \(n=\sin i/\sin r\); \(n=1/\sin c\) | angles measured from normal |
| Current **[S]** | \(I=Q/t\) | A = C/s |
| e.m.f. / p.d. **[S]** | \(E=W/Q\); \(V=W/Q\) | V = J/C |
| Resistance | \(R=V/I\) | Ω |
| Electrical | \(P=IV\); \(E=IVt\) | J if t is s; kWh for billing contexts |
| Series / parallel **[S]** | \(1/R_T=1/R_1+1/R_2\); \(R_1/R_2=V_1/V_2\) | second equation is two series resistors in divider |
| Transformer | \(V_p/V_s=N_p/N_s\); **[S]** \(I_pV_p=I_sV_s\), \(P=I^2R\) | primary and secondary subscripts must stay paired |
| Space **[S]** | \(H_0=v/d\); \(d/v=1/H_0\) | \(H_0\) in s⁻¹ in this syllabus |

## Essential definitions

- **Resultant force:** single force with same effect as all forces together.
- **Equilibrium:** no resultant force and no resultant moment.
- **Internal energy:** combined random kinetic and potential energies of particles in a system.
- **E.m.f.:** work done by source per unit charge around a complete circuit.
- **Potential difference:** work done per unit charge through a component.
- **Ionising radiation:** radiation energetic enough to remove electrons from atoms, creating ions.
- **Half-life:** time for half the unstable nuclei in a sample to decay.
- **Redshift:** observed increase in wavelength from a receding source.

## Units and presentation

Use accepted SI-style symbols: m, s, kg, N, J, W, Pa, Hz, V, A, Ω, C and K. A table/graph heading should take the form `quantity / unit`, for example `current / A`. Use a decimal point, appropriate significant figures, and units on final measured/calculated values. Calculators may be used in all examination components. [1]

---

# Compact study sequence

**Phase 1 — build Core language (Weeks 1–3).** Study 1.1–1.5, 2.1–2.3 and 3.1–3.2. On each day, learn definitions/formulae, complete ten mixed retrieval prompts, then explain one graph or apparatus method aloud. Start a unit-error log.

**Phase 2 — systems and applications (Weeks 4–5).** Study 3.3–3.4, 4.1–4.5 and 5.1–5.2. Interleave circuits with energy and waves; these reward equation selection and causal explanations. Build one-page comparison grids for radiation, EM waves, series/parallel circuits and energy resources.

**Phase 3 — space and Extended bridge (Weeks 6–7).** Study Topic 6, then revisit each **[S]** item in topic order. Extended candidates should solve a short calculation set daily: acceleration/momentum, thermal/waves, circuits/transformers, nuclear/space. Core candidates should deepen explanations and graph/data confidence rather than memorising unassessed S equations.

**Phase 4 — practical and exam transfer (final 2–3 weeks).** Complete three planning/evaluation tasks and three graph tasks per week regardless of Paper 5/6 route. Then use timed mixed questions: multiple-choice decisions first, structured explanations second, practical data handling third. Mark with a checklist: command word met, equation shown, units, direction/sign, data evidence, and route boundary correct.

> **Last 48 hours:** use the formula bank actively. Cover the right-hand side, reconstruct the equation, say its condition of use, and complete one micro-calculation. This diagnoses usable knowledge better than rereading.

---

# Sources and specification notes

This pack is original revision material aligned to the official learning objectives, assessment details, practical requirements, units, mathematical requirements and command words. It does not reproduce textbook passages or past-paper questions. The official syllabus is the authority if a local timetable, entry code or accessibility arrangement differs.

**Confirmed specification status.** The official qualification page lists the active **2026–2028** syllabus and its update; the PDF inspected is **Version 2, December 2025**, with no significant teaching changes. Cambridge also lists a **2029** syllabus, Version 1 (September 2026), explicitly for 2029 examinations and likewise stating no significant teaching changes. For an examination in 2029, follow that document and **verify on your entry** rather than assuming a 2026–2028 administrative detail applies unchanged. [2] [3] [4]

**Confirmed availability.** For the 2026–2028 syllabus, entries are available in June and November, and additionally in March for schools in India. Centres operate in administrative zones and must check their timetable; confirm the available practical option (Paper 5 or Paper 6) with the centre/exams officer. [1]

## References

[1]: https://www.cambridgeinternational.org/Images/697209-2026-2028-syllabus.pdf "Cambridge IGCSE Physics (0625) syllabus for examination in 2026, 2027 and 2028, Version 2"

[2]: https://www.cambridgeinternational.org/Images/748914-2026-2028-syllabus-update.pdf "Syllabus update: Cambridge IGCSE Physics (0625) for examination in 2026, 2027 and 2028"

[3]: https://www.cambridgeinternational.org/programmes-and-qualifications/view/cambridge-igcse-physics-0625/ "Cambridge IGCSE Physics (0625) official qualification page"

[4]: https://www.cambridgeinternational.org/Images/764332-2029-syllabus.pdf "Cambridge IGCSE Physics (0625) syllabus for exams in 2029, Version 1"$md$),
  ('computer-science', 'OL', '1. Data representation — Paper 1', 'data-representation-paper-1-1', $md$### 1.1 Number systems$md$, 100, $md$### 1.1 Number systems

A computer represents data in **binary** because electronic circuits can reliably distinguish two states, conventionally `0` and `1`. A **bit** is one binary digit. Registers and logic gates operate on these binary patterns.

| System | Base | Digits | Place-value meaning |
|---|---:|---|---|
| **Denary** (decimal) | 10 | 0–9 | powers of 10 |
| **Binary** | 2 | 0, 1 | powers of 2 |
| **Hexadecimal** | 16 | 0–9, A–F | powers of 16; A=10 … F=15 |

To convert binary to denary, sum each set bit multiplied by its power of two. To convert positive denary to binary, select place values that total the denary number. The syllabus limits number-system conversion to **positive integers**, with binary values no longer than 16 bits. [1]

**Worked micro-example.**

```text
10110110₂ = 1×128 + 0×64 + 1×32 + 1×16 + 0×8 + 1×4 + 1×2 + 0×1
          = 182₁₀
182₁₀ = B6₁₆ because B = 11 and 6 = 6: 11×16 + 6 = 182
```

Hexadecimal is compact human-readable shorthand for binary: each hex digit maps exactly to a four-bit **nibble**. It is useful for long binary values such as MAC addresses, colour codes and memory-related values because it is shorter and less error-prone to transcribe.

**Binary addition and overflow.** Add from right to left, carrying `1` when `1 + 1` occurs. An unsigned 8-bit pattern can represent only 0–255. **Overflow** occurs when a calculation requires a value outside the fixed register range; the discarded carry does not mean the result was valid.

```text
  11110000   (240)
+ 00110000   ( 48)
----------
1 00100000   stored 8-bit result = 32, with overflow
```

A **logical left shift** moves every bit left, inserts `0` at the right and loses bits pushed out at the left. For a positive integer it normally multiplies by 2 per shift if no significant bit is lost. A **logical right shift** inserts `0` at the left and normally divides a positive value by 2 per shift, discarding any fractional remainder.

```text
00110101 (53) logical left shift → 01101010 (106)
00110101 (53) logical right shift → 00011010 (26)
```

**Two’s complement (8 bit).** This encoding represents signed integers from **−128 to +127**. A pattern whose most significant bit is `0` is non-negative. To encode a negative magnitude: write its positive eight-bit binary pattern, invert every bit, then add 1. To decode a negative pattern, invert and add 1 to find the magnitude, then attach a negative sign.

```text
Encode −18: 00010010 → invert 11101101 → add 1 = 11101110
Decode 11101110: invert 00010001 → add 1 = 00010010 = 18, so −18
```

> **Exam-use cue.** For a conversion, show place values or division/selection working. For a shift, draw all eight positions and state whether a bit is lost. For overflow, name the **fixed bit-width/range**, not merely “the answer is too large.”

**Common errors.** Treating hexadecimal `B6` as “binary”; using signed-range rules for an unsigned 8-bit addition; preserving a bit that should leave a logical shift; forgetting the final `+1` in two’s complement.

### 1.2 Text, sound and images

**Text.** A **character set** maps characters to binary codes. **ASCII** provides a relatively small character repertoire. **Unicode** represents a much wider range of scripts, symbols and emoji; it needs more bits per character than ASCII. Text must be encoded before a computer can store or process it.

**Sound.** Analogue sound is sampled at regular instants and each sample is quantised to a binary value. **Sample rate** is samples per second (Hz); **sample resolution** or bit depth is bits used per sample. Raising either usually improves fidelity and increases file size.

**Images.** A bitmap/raster image is a grid of **pixels**. **Resolution** is the number of pixels (often width × height). **Colour depth** is the number of bits used to encode each pixel’s colour. More pixels and/or more bits per pixel generally gives greater detail/colour choice but a larger file.

**Worked micro-example.** A 200 × 100 image at 8-bit colour depth contains `20 000 × 8 = 160 000` bits = `20 000` bytes before any metadata or compression. Doubling both width and height creates four times as many pixels, not twice as many.

> **Exam-use cue.** Explain quality and file-size effects separately. “Higher resolution” means more pixels; it is not automatically “more bits per colour.” For sound, name the correct factor: sample **rate** is frequency of samples; sample **resolution** is bits in each sample.

**Common errors.** Calling a sample rate “bits per second”; saying Unicode is “better” without its larger repertoire and potential storage cost; confusing image resolution with colour depth.

### 1.3 Data storage and compression

Storage units use binary multiples in this syllabus:

```text
8 bits = 1 byte                  1024 KiB = 1 MiB
4 bits = 1 nibble                1024 MiB = 1 GiB
1024 bytes = 1 KiB               1024 GiB = 1 TiB
1024 TiB = 1 PiB                 1024 PiB = 1 EiB
```

For an uncompressed image and sound recording, apply the units requested in the question:

```text
image size in bits  = width × height × colour depth
image size in bytes = bits ÷ 8
sound size in bits  = sample rate × sample resolution × duration in seconds
sound size in bytes = bits ÷ 8
```

Convert between byte-based units by **1024**, not 1000. [1]

**Worked micro-example.** A mono 4-second sound at 8 000 samples/s and 8 bits/sample uses `8 000 × 8 × 4 = 256 000` bits = `32 000` bytes ≈ `31.25 KiB`.

**Compression** reduces a file’s storage and transmission demands. Consequences can include less bandwidth needed, reduced storage and a shorter transfer time.

* **Lossy compression** permanently removes selected data, such as image detail/colour information or sound samples/precision. It can make a much smaller file but cannot restore the original exactly.
* **Lossless compression** preserves every original value; decompression restores an identical file. **Run-length encoding (RLE)** replaces consecutive repeats with a count and value. It is most effective on long runs.

```text
Original pixels: R R R R B B G
RLE idea:        (4,R) (2,B) (1,G)
```

> **Exam-use cue.** State whether exact reconstruction is required, then justify lossless or lossy. A medical record or program file needs lossless; a photograph for fast web display may tolerate carefully chosen loss.

**Common errors.** Forgetting to divide bits by 8; applying 1000 conversion; claiming every RLE file becomes smaller; saying “lossy deletes the whole file.”

---$md$),
  ('computer-science', 'OL', '2. Data transmission — Paper 1', 'data-transmission-paper-1-2', $md$### 2.1 Packets, direction and interfaces$md$, 200, $md$### 2.1 Packets, direction and interfaces

Networks divide a message into **packets**. A packet contains a **header**, **payload** and **trailer**. The header includes destination address, originator/source address and packet number; the payload carries part of the data. The trailer supports checking/control.

In **packet switching**, a message is split into packets. Routers choose routes, so packets can travel by different paths and arrive out of order. At the destination, packet numbers permit reassembly once all necessary packets arrive.

| Method | Meaning | Appropriate reasoning |
|---|---|---|
| **Serial** | Bits travel one after another on one channel. | Fewer wires; reliable over longer distances; usually lower simultaneous throughput. |
| **Parallel** | Several bits travel at once on multiple channels. | Can transfer a group quickly over short distances; needs more connections and can suffer timing skew. |
| **Simplex** | One direction only. | Use where a sender never needs to receive, such as a sensor broadcasting to a controller. |
| **Half-duplex** | Both directions, but not at the same time. | Suitable for turn-taking communication. |
| **Full-duplex** | Both directions simultaneously. | Suitable where both ends must send/receive continuously. |

**USB (Universal Serial Bus)** is a standard serial interface for connecting peripherals and transferring data. Benefits include a widely compatible standard and one cable/interface family; drawbacks may include distance limits, port/cable dependence and lower suitability than some alternatives for a particular specialised high-speed need.

**Worked micro-example.** A file is packetised as 1, 2, 3. The receiver gets 2, 1, 3. It uses packet numbers to reassemble 1, 2, 3; arrival order is not file order.

> **Exam-use cue.** In a suitability answer, link the property to the scenario: “full-duplex because both participants must speak/send data concurrently,” rather than merely defining it.

**Common errors.** Calling the payload an address; saying all packets follow the same route; treating half-duplex as one-way.

### 2.2 Detecting and responding to errors

Interference can produce data loss, data gain or changed bits. Error detection checks whether received data appears corrupted; it does not by itself guarantee correction.

* **Parity check:** append a parity bit so the count of `1`s is even (**even parity**) or odd (**odd parity**). The receiver recounts. A **parity byte** applies a parity bit per character/byte; a **parity block check** also checks columns across a block. Some patterns of multiple errors can remain undetected.
* **Checksum:** sender calculates a value from the data and sends it; receiver recalculates and compares. A mismatch signals likely corruption.
* **Echo check:** receiver sends back received data; sender compares the echo with its original.
* **Check digit:** a calculated digit incorporated in a data-entry code, such as an ISBN or barcode. It detects likely keyboard/scanning errors when the code is entered.
* **ARQ (automatic repeat query):** recipient sends a positive acknowledgement when correct or a negative acknowledgement when an error is found. If no acknowledgement arrives before a **timeout**, the sender retransmits.

**Worked micro-example.** With even parity, `1011001` has four `1`s, so parity bit `0` makes an even total. If one bit changes in transit, the number becomes odd and the receiver detects an error.

> **Exam-use cue.** Distinguish the *location*: parity/checksum/echo detect transmission errors; a check digit detects errors in **entered identifiers**. For ARQ, include acknowledgement **and** timeout/re-send.

**Common errors.** Saying parity corrects every error; omitting the sender’s comparison in echo checking; calling a check digit encryption.

### 2.3 Encryption

**Encryption** transforms readable plaintext into unreadable ciphertext so an interceptor cannot understand transmitted data without the right key. It supports confidentiality during transmission.

* **Symmetric encryption** uses the same shared secret key to encrypt and decrypt. It is efficient but the shared key must be exchanged securely.
* **Asymmetric encryption** uses a related **public key** and **private key**. A public key can be distributed; the corresponding private key is kept secret. This reduces the need to send the private decryption key.

> **Exam-use cue.** Do not write “encryption stops data being stolen.” It protects the meaning if intercepted; it does not necessarily stop interception, deletion or traffic analysis.

---$md$),
  ('computer-science', 'OL', '3. Hardware — Paper 1', 'hardware-paper-1-3', $md$### 3.1 Computer architecture$md$, 300, $md$### 3.1 Computer architecture

The **CPU (central processing unit)** processes input data and instructions to produce output. A **microprocessor** is an integrated circuit containing a processor on a single chip. A Von Neumann computer stores instructions and data in memory and processes them through the CPU.

| CPU component | Precise role |
|---|---|
| **ALU** | Performs arithmetic calculations and logical comparisons. |
| **CU** | Coordinates and controls the fetch–decode–execute cycle; issues control signals. |
| **PC** | Holds the address of the next instruction. |
| **MAR** | Holds the memory address currently being accessed. |
| **MDR** | Holds data/instruction transferred to or from memory. |
| **CIR** | Holds the current instruction while it is decoded/executed. |
| **ACC** | Holds intermediate arithmetic/logic results. |
| **Address bus** | Carries addresses, generally from CPU to memory/device. |
| **Data bus** | Carries data/instructions in either direction. |
| **Control bus** | Carries control signals, such as read/write. |

**Fetch–decode–execute (FDE) cycle.** The PC’s address is copied to MAR; a memory read is signalled on the control bus; the instruction travels from memory through MDR to CIR; the PC is advanced. The CU decodes the CIR instruction, then coordinates execution. The ALU may calculate; data may be moved to/from memory via MAR/MDR; a result may be placed in ACC. Exact instruction details vary, but every explanation must link registers, buses and CPU units coherently.

**Performance factors.** More **cores** permit more independent processing tasks; a larger/faster **cache** keeps frequently used data/instructions close to the CPU; higher **clock speed** gives more cycles per second. None alone guarantees a proportionate real-world performance improvement because the workload and other bottlenecks matter.

An **instruction set** is the complete list of machine-code commands a CPU can process. An **embedded system** is a dedicated computer system built into a product to perform a specific function (for example, a washing machine, car controller, security system or vending machine), unlike a general-purpose PC.

**Worked micro-example.** If PC = 104, the CPU copies 104 to MAR and fetches the instruction at memory location 104 into MDR then CIR. It increments PC to 105 before fetching the next instruction. This is not “PC stores the instruction.”

> **Exam-use cue.** In FDE questions, use action verbs: **holds, copies, sends, fetches, decodes, executes**. Do not describe the ALU as fetching instructions.

**Common errors.** Mixing MAR (address) and MDR (data); saying cache is permanent storage; calling every device with a processor “a general-purpose computer.”

### 3.2 Input, output and sensors

An **input device** sends data or control signals into a computer. An **output device** presents information or produces a physical effect from computer-controlled signals. An **actuator** is an output device that creates a physical action, such as switching, moving or opening.

Required input-device examples are barcode scanner, digital camera, keyboard, microphone, optical mouse, QR-code scanner, resistive/capacitive/infra-red touch screen, and 2D/3D scanner. Required outputs include actuator, DLP projector, inkjet printer, laser printer, LED screen, LCD projector, LCD screen, speaker and 3D printer. Explain choice by matching what is captured/produced to the context: a microphone captures sound; a 3D scanner captures a shape; a 3D printer produces a physical three-dimensional object.

A **sensor** measures a physical property and converts it to data that a computer can process. Know the data and use of: acoustic (sound level), accelerometer (acceleration/motion), flow (rate of fluid/gas movement), gas (gas concentration), humidity (water vapour), infra-red (IR radiation/heat or detection), level (height/amount), light (light intensity), magnetic field (field strength), moisture (water content), pH (acidity/alkalinity), pressure (force per area), proximity (nearness), and temperature (thermal condition).

**Worked micro-example.** An automatic greenhouse needs to start watering when soil is dry. Select a **moisture sensor** to input soil water content, a microprocessor to compare with a threshold and a pump actuator as output. A light sensor would answer a different question.

> **Exam-use cue.** “Identify the data captured” needs a measurable quantity, not merely “information.” “Choose a sensor” needs a reason tied to the required measurement.

**Common errors.** Calling a sensor an output device; saying a speaker is an input because it uses sound; naming an actuator when the question asks for a sensor.

### 3.3 Primary, secondary, virtual and cloud storage

**Primary storage** is directly accessed by the CPU. **RAM** is volatile working memory holding data/programs currently in use; **ROM** is non-volatile memory holding fixed or firmware/boot instructions. A computer needs RAM for changeable working data and ROM for instructions available when it starts.

**Secondary storage** is not directly accessed by the CPU and provides more permanent storage. Storage technologies:

| Technology | How it operates | Examples |
|---|---|---|
| **Magnetic** | Electromagnets read/write magnetic patterns on rotating platters divided into tracks and sectors. | HDD |
| **Optical** | A laser reads pits and lands on a disc. | CD, DVD, Blu-ray |
| **Solid-state / flash** | Electronic charge states in NAND/NOR flash cells using transistor control/floating gates. | SSD, SD card, USB drive |

**Virtual memory** is part of secondary storage used as an extension of RAM when RAM is insufficient. The operating system transfers **pages** between RAM and virtual memory as needed. It allows larger programs/more concurrent work, but storage is much slower than RAM, so excessive paging reduces performance.

**Cloud storage** stores data on remote, physical servers accessed across a network rather than only on a local device. Advantages can include remote access, synchronisation and provider-managed backup/scalability. Disadvantages can include dependency on connectivity/provider, recurring cost, latency, privacy/security concerns and the fact that physical data centres still consume resources. Compare these directly with a named local-storage benefit such as offline access and local control.

> **Exam-use cue.** RAM is not “temporary because it can only hold small files”; it is volatile, direct CPU-access working storage. A balanced cloud evaluation gives a linked advantage and disadvantage in the stated context.

**Common errors.** Saying ROM is read/write working memory; describing virtual memory as extra physical RAM; calling cloud storage non-physical.

### 3.4 Network hardware and addressing

A device needs a **NIC (network interface card)** to connect to a network. A NIC has a **MAC address**, normally written in hexadecimal, assigned at manufacture. Its structure includes a manufacturer code and serial/device code. A MAC address identifies a network interface locally.

An **IP address** is allocated by a network to identify a device for network communication. It may be **static** (fixed) or **dynamic** (allocated/changed, commonly by a network service). **IPv4** uses shorter 32-bit addresses; **IPv6** uses much longer 128-bit addresses, creating a vastly larger address space and usually displayed in hexadecimal groups.

A **router** directs data packets towards a particular destination, can assign IP addresses, and can link a local network to the internet.

> **Exam-use cue.** Contrast MAC and IP on *assignment and purpose*: MAC is interface/manufacturer-assigned; IP is network-assigned and routes across networks. Avoid saying one simply “identifies the computer” without distinction.

---$md$),
  ('computer-science', 'OL', '4. Software — Paper 1', 'software-paper-1-4', $md$### 4.1 System software, applications and interrupts$md$, 400, $md$### 4.1 System software, applications and interrupts

**System software** operates and supports the computer, including the operating system and utilities. **Application software** performs a task for the user, such as word processing, image editing or a booking system.

An **operating system (OS)** manages files, memory, multitasking, peripherals and drivers, user accounts and system security; handles interrupts; provides a user interface and a platform on which applications run. The dependency chain is: **hardware → firmware/bootloader → operating system → application**.

An **interrupt** is a signal requiring the CPU’s attention. A hardware interrupt can arise when a key is pressed or a mouse moves. A software interrupt can arise from division by zero or two processes trying to access the same memory location. The CPU completes a safe point, saves its current state, runs the appropriate **interrupt service routine (ISR)**, then restores state and resumes its interrupted task.

**Worked micro-example.** While a program is calculating, a key press triggers an interrupt. The OS/CPU records the current task state, executes the keyboard ISR to process the input, then returns to the calculation. It does not delete the original program.

> **Exam-use cue.** For “how an interrupt operates,” include: event/signal → save state → ISR → restore/resume. For software types, give an example that fits the definition.

**Common errors.** Calling the OS an application; saying an interrupt always stops the computer permanently; reversing firmware and OS in the stack.

### 4.2 Languages, translators and IDEs

A **high-level language** is closer to human-readable problem statements and is generally easier to write, read, debug and transport between machine types. A **low-level language** is closer to machine operation; it permits more direct hardware control but is harder to read/write/debug and is more machine dependent. **Assembly language** is low-level code using mnemonic instructions; an **assembler** converts it to machine code.

A **compiler** translates the whole high-level program before it runs, creating an executable and reporting detected errors together. An **interpreter** translates and executes one statement at a time and stops when it reaches an error. Interpreters are often useful during development; a compiler is commonly used to create a final distributable program. Explain both a benefit and limitation in a scenario, rather than declaring one universally superior.

An **IDE (integrated development environment)** supports program development. Typical features are a code editor, run-time environment, translator, error diagnostics, auto-completion, auto-correction and pretty-printing/formatting.

> **Exam-use cue.** A compiler does not “translate line by line and then make an executable”; that is a contradiction. State **whole program before execution** versus **line-by-line during execution**.

---$md$),
  ('computer-science', 'OL', '5. The internet and its uses — Paper 1', 'the-internet-and-its-uses-paper-1-5', $md$### 5.1 Internet, web, URLs and browsers$md$, 500, $md$### 5.1 Internet, web, URLs and browsers

The **internet** is the global network infrastructure connecting networks. The **World Wide Web (WWW)** is the collection of interlinked websites/pages accessed through that infrastructure. A **URL** is a text address for a web resource and may include a protocol, domain name and page/file path.

**HTTP** is a protocol for requesting/transferring web resources. **HTTPS** is HTTP secured using encryption/security mechanisms, helping protect data in transit and authenticate a site connection.

A **web browser** renders HTML and displays pages. Its functions can include bookmarks/favourites, history, tabs, cookies, navigation controls and an address bar.

**URL-to-page process.** The browser reads a URL, asks a **DNS** service to translate its domain name to an IP address, connects to the appropriate **web server**, requests the resource using HTTP/HTTPS, receives HTML and linked resources, then renders the page. The browser displays it; DNS does not store/render the web page.

**Cookies** are small stored data items used by websites. A **session cookie** supports a current visit and normally ends with the session; a **persistent cookie** remains beyond it until expiry/deletion. Uses include retaining a shopping cart, preferences, personal details or login-related state. Their convenience can create privacy/tracking concerns.

> **Exam-use cue.** Learn the order browser → DNS → IP/web server → HTML → browser display. A URL is not itself an IP address, and a cookie is not a cache of the entire website.

### 5.2 Digital currency and blockchain

A **digital currency** exists electronically rather than as physical notes/coins and can be used for electronic transactions. A **blockchain**, in this syllabus’s basic model, is a time-stamped digital ledger: a sequence of records used to track transactions that cannot be altered retrospectively without invalidating the chain/record system. Avoid assuming every electronic payment necessarily uses a blockchain.

### 5.3 Cyber security

Cyber security protects systems, networks and data from threats. Know the process and aim of each threat:

| Threat | Process and aim |
|---|---|
| **Brute-force attack** | Tries many credentials/keys until one succeeds; aims for unauthorised access. |
| **Data interception** | Captures data in transit; aims to read or misuse it. |
| **DDoS** | Many compromised sources overwhelm a service with traffic; aims to deny legitimate access. |
| **Hacking** | Exploits weaknesses or bypasses controls; aims for unauthorised access/change/disruption. |
| **Virus** | Attaches/replicates through a host file/program; aims to damage, alter or spread. |
| **Worm** | Self-replicates across networks without a host file; aims to spread/disrupt. |
| **Trojan horse** | Masquerades as legitimate software; aims to install harmful access/code. |
| **Spyware / adware** | Spyware secretly gathers data; adware pushes advertising, sometimes tracking users. |
| **Ransomware** | Encrypts/locks data and demands payment; aims for extortion. |
| **Pharming** | Redirects a user to a fake site, often via compromised DNS/settings; aims to steal data. |
| **Phishing** | Deceptive messages/sites solicit credentials or actions; aims to steal/access. |
| **Social engineering** | Manipulates people into revealing data or bypassing controls; aims to exploit human trust. |

Defences must match the threat: access levels enforce least privilege; anti-malware (anti-virus/anti-spyware) detects/removes harmful programs; authentication may use username/password, biometrics or two-step verification; automatic updates close known vulnerabilities. Users should scrutinise spelling/tone and destination URLs in messages/links. Firewalls filter traffic; privacy settings reduce exposure; proxy servers can mediate/filter requests; SSL security helps protect browser-server communication.

**Worked micro-example.** A message says “reset now” but contains a misspelt domain. The immediate defence is to avoid the link, independently navigate to the official URL and report it. A firewall alone does not prove that a user-entered password is safe.

> **Exam-use cue.** “Explain a defence” requires mechanism and benefit: “two-step verification adds an independent factor, so a stolen password alone is insufficient.”

**Common errors.** Equating phishing with pharming; saying anti-virus prevents all attacks; confusing encryption with authentication; treating a firewall as a guarantee of secure behaviour.

---$md$),
  ('computer-science', 'OL', '6. Automated and emerging technologies — Paper 1', 'automated-and-emerging-technologies-paper-1-6', $md$### 6.1 Automated systems$md$, 600, $md$### 6.1 Automated systems

An **automated system** operates with limited human intervention using an input–process–output control loop: sensors collect data, a microprocessor applies program rules/thresholds, and actuators perform an action. For example, a temperature sensor can supply readings to a controller that turns a fan actuator on or off.

Evaluate in context. Advantages may include consistent operation, speed, operation in hazardous locations, continuous monitoring and reduced routine labour. Disadvantages can include setup/maintenance cost, unsuitable decisions when conditions are unusual, job displacement, sensor faults causing unsafe output and reduced human oversight. Apply this to industry, transport, agriculture, weather, gaming, lighting or science as the question requires.

### 6.2 Robotics

**Robotics** is the branch of computer science concerned with the design, construction and operation of robots. A robot has a mechanical structure/framework, electrical components such as sensors, microprocessors and actuators, and is programmable. Uses include industry, transport, agriculture, medicine, homes and entertainment; examples include factory equipment, domestic robots and drones.

**Exam-use cue.** Do not call any automatic device a robot without identifying programmable control, physical structure and input/output components. Give a context-linked benefit and limitation, such as precision in a dangerous factory environment versus high purchase/maintenance cost.

### 6.3 Artificial intelligence

**Artificial intelligence (AI)** is computer science concerned with simulating intelligent behaviours by computers. Its main characteristics include collecting data, rules or models for using data, ability to reason, and sometimes ability to learn and adapt.

* An **expert system** contains a **knowledge base** (facts), **rule base** (if–then rules), **inference engine** (applies rules to facts) and user **interface**. It reaches a recommendation by matching facts and rules.
* **Machine learning** lets a program automatically adapt its processes and/or data from examples/experience. Its output quality depends on relevant, representative data and careful evaluation.

> **Exam-use cue.** Distinguish an expert system’s explicitly stored rules from machine learning’s adaptation. Do not claim AI is necessarily conscious or infallible.

---

# Paper 2 — Algorithms, Programming and Logic$md$),
  ('computer-science', 'OL', '7. Algorithm design and problem-solving — Paper 2', 'algorithm-design-and-problem-solving-paper-2-7', $md$> Paper distinction. The following content is assessed in Paper 2 only. Standard coding answers should use the Cambridge-style pseudocode in the quick reference. The language option belongs only to the 15-mark scenario. [1] [3]$md$, 700, $md$> **Paper distinction.** The following content is assessed in **Paper 2 only**. Standard coding answers should use the Cambridge-style pseudocode in the quick reference. The language option belongs only to the 15-mark scenario. [1] [3]

### 7.1 Development, decomposition and design

The **program development life cycle** is limited here to **analysis, design, coding and testing**.

* **Analysis:** identify the problem and requirements; apply **abstraction** by removing irrelevant detail; decompose the problem.
* **Design:** break work into modules and represent the solution using structure diagrams, flowcharts and/or pseudocode.
* **Coding:** implement the design and test iteratively while developing.
* **Testing:** run the completed code using planned test data and compare actual with expected outcomes.

A complex system comprises **subsystems**, each of which may contain smaller subsystems. **Decomposition** breaks a problem into manageable components by identifying inputs, processes, outputs and storage. A **structure diagram** shows modules and hierarchy; a **flowchart** shows control flow with standard symbols; **pseudocode** expresses logic independent of a particular language.

**Worked micro-example.** For a canteen order system: inputs = meal code and quantity; processes = validate code, calculate price, update total; outputs = receipt; storage = menu-price list/order record. A top module can call `GetOrder`, `CalculateTotal` and `PrintReceipt`.

> **Exam-use cue.** A design artifact must match its purpose. A structure diagram is not a flowchart with arrows; a flowchart must show decisions and flow.

### 7.2 Standard algorithms, validation and testing

Know these standard solution methods:

* **Linear search:** inspect values from the first onward until the target is found or the list ends. It works on an unsorted list.
* **Bubble sort:** repeatedly compare adjacent values and swap an out-of-order pair; after a pass, a largest remaining value bubbles to the end. Repeat passes until no swaps are needed or the required passes finish.
* **Totalling/counting:** initialise total/count before the loop, then update exactly when the specified condition holds.
* **Maximum/minimum/average:** initialise max/min sensibly (often from the first valid value); average is `total ÷ count`.

```text
// Linear-search micro-example: find 14 in [8, 14, 3]
Found ← FALSE
FOR Position ← 1 TO 3
    IF Numbers[Position] = 14
       THEN
           Found ← TRUE
    ENDIF
NEXT Position
// Found becomes TRUE at Position 2
```

**Validation** checks whether input is sensible/acceptable according to rules; it does **not** prove that it is true. Use range, length, type, presence, format and check-digit checks. **Verification** checks that data was copied/entered accurately; use a visual check or double entry. For a date of birth, a format check may test `DD/MM/YYYY`; double-entry verification asks the user to enter it twice and compares the values.

Test data categories:

| Category | Meaning | Example for permitted integer 1–30 |
|---|---|---|
| **Normal** | Typical valid value | 17 |
| **Abnormal** | Invalid value | `blue` or 31 |
| **Extreme** | Smallest/largest acceptable value | 1 or 30 |
| **Boundary** | Limit values **and corresponding rejected values** | 0, 1, 30, 31 |

A **trace table** is a dry-run record of every relevant variable, output and prompt at each algorithm step. Use it to determine output or identify a logic error. Typical errors include wrong initial value, off-by-one loop limit, incorrect condition and wrong array index; give a specific correction.

> **Exam-use cue.** When asked to “write/amend an algorithm,” use precise operators such as `>` rather than prose such as “is greater than.” In test-data questions, supply **input, category, expected result and reason** where space permits.

**Common errors.** Calling an extreme test invalid; saying validation verifies accuracy; resetting a total inside a loop; not including rejected values in a boundary set; failing to initialise a maximum.

---$md$),
  ('computer-science', 'OL', '8. Programming — Paper 2', 'programming-paper-2-8', $md$### 8.1 Core programming concepts$md$, 800, $md$### 8.1 Core programming concepts

A **variable** names a memory location whose value can change. A **constant** is a named fixed literal value, useful for clarity and maintenance. Required basic types are `INTEGER`, `REAL`, `CHAR`, `STRING` and `BOOLEAN` (`TRUE`/`FALSE`). Choose type to match the data: a number of tickets is integer; a price can be real; a single initial is char; a name is string.

**Input/output:** use `INPUT` to receive a value and `OUTPUT` to display a value or message. Programs use **sequence** (statements in order), **selection** (`IF` or `CASE`) and **iteration** (loops).

| Construct | Use it when | Key property |
|---|---|---|
| `IF … THEN … ELSE` | A Boolean condition determines a branch. | May have no `ELSE`; supports nested selection. |
| `CASE OF` | One variable chooses among distinct simple values. | Include `OTHERWISE` if a default action is needed. |
| `FOR` | Number of iterations is known/count-controlled. | Endpoints are inclusive; a `STEP` may be used. |
| `WHILE` | Condition must be true before each repeat. | May execute zero times. |
| `REPEAT … UNTIL` | Body should run before the condition is tested. | Executes at least once; stops when condition is true. |

Use **totalling** by initialising `Total ← 0` and adding values; use **counting** by initialising `Count ← 0` and incrementing for matching items. String handling uses length, substring and case conversion. Note that systems may index first characters from 0 or 1; declare/observe the convention supplied.

Required operators are arithmetic `+`, `-`, `/`, `*`, `^`, `MOD`, `DIV`; relational `=`, `<`, `<=`, `>`, `>=`, `<>`; and logical `AND`, `OR`, `NOT`. Parenthesise a complex expression to make order unambiguous.

```text
DECLARE Valid : BOOLEAN
INPUT Age
Valid ← (Age >= 13) AND (Age <= 18)
IF Valid
   THEN
       OUTPUT "Eligible"
   ELSE
       OUTPUT "Not eligible"
ENDIF
```

**Nesting** means placing selection and/or iteration inside another statement. This syllabus does not require candidates to write more than three nested levels. Every `IF`, loop or `CASE` needs the matching termination, and each loop needs a route towards termination.

A **procedure** performs a named task but does not return a value; a **function** returns one value used in an expression. A **parameter** passes a value into a procedure/function; up to three parameters are required. A **local variable** exists only inside its subroutine; a **global variable** is accessible more widely. Prefer local scope unless shared access is necessary.

```text
FUNCTION IsEven(Number : INTEGER) RETURNS BOOLEAN
    RETURN MOD(Number, 2) = 0
ENDFUNCTION

IF IsEven(18) THEN
    OUTPUT "even"
ENDIF
```

Required library routines include `DIV`, `MOD`, `ROUND` and `RANDOM`. `DIV(10,3)` is 3 and `MOD(10,3)` is 1. `ROUND(value, places)` rounds a real value to the stated number of decimal places. `RANDOM()` returns a value from 0 to 1 inclusive in the syllabus pseudocode. [1]

**Maintainability** means a future programmer can understand, test and alter the program. Use meaningful identifiers, purposeful comments, named procedures/functions, sensible layout and appropriate comments on non-obvious syntax. Do not use a comment to excuse unclear code.

> **Exam-use cue.** Before writing code, list inputs, outputs, variables, initial values, validation and loop condition. Trace a small input manually. A function call appears in an expression; prefixing it with `CALL` is wrong.

**Common errors.** Using `=` as assignment instead of `←`; treating `REPEAT UNTIL` as “repeat while true”; forgetting to update a `WHILE` loop control variable; calculating average before count is known; using an uninitialised total.

### 8.2 Arrays

A one-dimensional (**1D**) array is an ordered fixed-length collection of same-type elements indexed by one position. A two-dimensional (**2D**) array has rows and columns, accessed with two indices. An index can be a variable. The first index may be 0 or 1; follow the declared lower bound/question convention.

```text
DECLARE Scores : ARRAY[1:5] OF INTEGER
DECLARE Seats : ARRAY[1:3, 1:4] OF BOOLEAN
FOR Student ← 1 TO 5
    INPUT Scores[Student]
NEXT Student
```

Use nested iteration to traverse a 2D array: outer loop controls row, inner loop controls column. State the correct dimension order consistently.

**Common errors.** Accessing index 0 in `ARRAY[1:5]`; using one index for a 2D array; declaring an array with mixed element types; resetting a row total in the wrong loop.

### 8.3 File handling

A file permits a program to retain data after it ends and reuse it later. Open a file in a specified mode, read/write an item or a line, then close it. `READ` mode reads data; `WRITE` mode creates a new file and loses any existing contents. A file should be open in one mode at a time.

```text
DECLARE Name : STRING
OPENFILE "Names.txt" FOR READ
READFILE "Names.txt", Name
CLOSEFILE "Names.txt"

OPENFILE "Output.txt" FOR WRITE
WRITEFILE "Output.txt", Name
CLOSEFILE "Output.txt"
```

> **Exam-use cue.** State the mode and close every opened file. In a write-mode answer, acknowledge overwrite risk if the context asks about existing data.

---$md$),
  ('computer-science', 'OL', '9. Databases — Paper 2', 'databases-paper-2-9', $md$A single-table database stores related records in one table. A field is one attribute/column, such as `MemberID`; a record is all fields for one entity/member. Design from storage requirements: give useful field names, an appropriate data type and validation rules.$md$, 900, $md$A **single-table database** stores related records in one table. A **field** is one attribute/column, such as `MemberID`; a **record** is all fields for one entity/member. Design from storage requirements: give useful field names, an appropriate data type and validation rules.

Required types are text/alphanumeric, character, Boolean, integer, real and date/time. A **primary key** is a field (or chosen identifier) that uniquely identifies each record; it must not duplicate or be blank. A name is often unsuitable because two people can share it; a generated member ID may be suitable.

| Field | Suitable type | Example validation / reason |
|---|---|---|
| `MemberID` | Integer or text/alphanumeric | Presence plus uniqueness/format; primary key. |
| `FirstName` | Text | Presence; not a primary key. |
| `Paid` | Boolean | Only true/false values. |
| `JoinDate` | Date/time | Valid date format/range. |
| `Balance` | Real | Numeric range if negative values are disallowed. |

SQL is restricted to querying one table with `SELECT`, `FROM`, `WHERE`, `ORDER BY ASCENDING`, `ORDER BY DESCENDING`, `SUM`, `COUNT`, `AND` and `OR`. Read it in order: choose fields, choose table, filter rows, then order or aggregate.

```sql
SELECT FirstName, Balance
FROM Members
WHERE Paid = TRUE AND Balance > 0
ORDER BY DESCENDING Balance
```

This returns the selected columns only for paid members with a positive balance, highest balance first. `COUNT` counts qualifying records; `SUM` totals a numeric field. `AND` requires both conditions; `OR` accepts either condition.

> **Exam-use cue.** When predicting SQL output, filter rows first, then select columns, then sort. Do not invent joins, `INSERT`, `UPDATE`, or multi-table relationships: they are outside this specified SQL scope.

**Common errors.** Calling any identifier a primary key without testing uniqueness; using text for a calculation field; confusing `COUNT(field)` with displaying every record; ordering before applying the `WHERE` condition.

---$md$),
  ('computer-science', 'OL', '10. Boolean logic — Paper 2', 'boolean-logic-paper-2-10', $md$Boolean logic uses binary inputs/outputs. `0` represents false/off and `1` true/on. Know the standard symbols as provided in the official syllabus and the functions below; NOT has one input, while the remaining required gates use two inputs. [1]$md$, 1000, $md$Boolean logic uses binary inputs/outputs. `0` represents false/off and `1` true/on. Know the standard symbols as provided in the official syllabus and the functions below; NOT has one input, while the remaining required gates use two inputs. [1]

| Gate | Expression | Output is 1 when… |
|---|---|---|
| **NOT** | `NOT A` | A is 0. |
| **AND** | `A AND B` | both A and B are 1. |
| **OR** | `A OR B` | at least one input is 1. |
| **NAND** | `NOT(A AND B)` | not both inputs are 1. |
| **NOR** | `NOT(A OR B)` | both inputs are 0. |
| **XOR / EOR** | `A XOR B` | inputs are different; exactly one is 1. |

**Two-input truth table.**

| A | B | AND | OR | NAND | NOR | XOR |
|---:|---:|---:|---:|---:|---:|---:|
| 0 | 0 | 0 | 0 | 1 | 1 | 0 |
| 0 | 1 | 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 1 | 0 | 0 | 0 |

You must be able to create a circuit from a problem statement, expression or truth table; complete a truth table from statement/expression/circuit; and write an expression from each representation. Circuits are limited to a maximum of three inputs and one output, and should be drawn **without simplification** when the question asks for a circuit from the supplied statement.

**Worked micro-example.** “Alarm sounds if door is open `D` and system is armed `A`, or smoke `S` is detected” becomes `(D AND A) OR S`. For `D=1`, `A=0`, `S=1`: `(1 AND 0) OR 1 = 1`; alarm is on. Draw an AND gate for D/A, then feed its output and S into an OR gate.

> **Exam-use cue.** Work circuit outputs in named stages: `X ← A AND B`, then `Output ← X OR C`. This prevents skipping an inversion bubble. XOR means **one but not both**, unlike inclusive OR.

**Common errors.** Treating XOR as OR; forgetting that NAND/NOR invert the whole AND/OR result; simplifying an expression when instructed not to; using more than the permitted inputs.

---

# Final paper checklists and command-word strategy

## Paper 1 checklist

Before Paper 1, be able to convert binary/denary/hexadecimal, add 8-bit binary and identify overflow, use 8-bit two’s complement and calculate uncompressed image/sound sizes without a calculator. Rehearse a full FDE explanation with PC, MAR, MDR, CIR, ACC, buses, CU and ALU. For every comparison, prepare paired language: RAM/ROM, compiler/interpreter, IPv4/IPv6, MAC/IP, internet/WWW, symmetric/asymmetric and cloud/local.

For longer explanations, make the causal chain explicit: packet switching; URL to rendered page; interrupt handling; automated control loop; encryption; and cyberattack plus appropriate countermeasure. In evaluation answers, give a context-linked advantage, context-linked disadvantage and a justified conclusion where asked.

## Paper 2 checklist

Before Paper 2, trace selections and all three loop types; write a linear search, bubble-sort pass, total/count/max/min/average; construct a test-data table; distinguish validation from verification; and correct common algorithm errors. Write arrays with legal bounds, files with open/read-or-write/close, SQL from a single-table dataset and complete a three-input truth table.

For the final scenario, spend a short initial period extracting requirements and markable features. Declare variables/arrays, initialise counters/totals, use validation where needed, implement every stated output and trace at least a normal and boundary input. Allocate approximately **30 minutes** to this 15-mark question as Cambridge advises. [1]

## Command words: answer to the verb

| Command word | What the response must do | Fast response pattern |
|---|---|---|
| **Calculate** | Work out a numeric result from supplied facts. | Formula → substitution → units/answer. |
| **Define** | Give a precise meaning. | “X is …” with essential distinguishing feature. |
| **Describe** | State main features/process steps. | Ordered factual steps; little or no “why.” |
| **Explain** | Give reasons, purpose or how/why relationships. | Point → mechanism → consequence in context. |
| **Compare** | Identify similarities and/or differences. | Use paired statements about the same feature. |
| **Evaluate** | Judge value/quality/importance. | Relevant benefits and drawbacks → justified judgement. |
| **Demonstrate / Show** | Provide an example or structured evidence. | Work visibly; label intermediate stages. |
| **Identify / Give / State** | Select, name or express a direct answer. | Concise, accurate term; no invented detail. |
| **Outline** | Give main points only. | Brief, high-level summary. |
| **Suggest** | Apply knowledge where several valid answers exist. | Plausible proposal explicitly linked to scenario. |

The official definitions of these command words govern their use in the assessment. [1]

> **Last-minute rule.** Spend marks like information: a 4-mark “explain” normally needs multiple distinct developed points, not one long generic sentence. Never add an unasked claim that contradicts an accurate answer.

---

# Quick reference: formulae, definitions and pseudocode

## Formula and numerical essentials

```text
binary denary value = Σ(bit × 2^position)
8-bit unsigned range = 0 to 255
8-bit two’s-complement range = −128 to +127
1 byte = 8 bits; 1 KiB = 1024 bytes; each larger binary unit = 1024 previous units
image bits = width × height × colour depth
sound bits = sample rate × sample resolution × duration
bytes = bits ÷ 8
average = total ÷ count
```

Use `DIV(a,b)` for integer quotient and `MOD(a,b)` for remainder. For percentage or real division, use `/`. No calculator is permitted, so organise working and estimate whether the magnitude is sensible.

## Cambridge-style pseudocode essentials

```text
DECLARE Age : INTEGER
CONSTANT Maximum ← 30
Age ← 16
INPUT Age
OUTPUT "Age = ", Age

IF Age >= 13 AND Age <= 18
   THEN
       OUTPUT "Teen"
   ELSE
       OUTPUT "Other"
ENDIF

FOR Index ← 1 TO 5
    OUTPUT Index
NEXT Index

WHILE Age < 18 DO
    Age ← Age + 1
ENDWHILE

REPEAT
    INPUT Password
UNTIL Password = "Secret"
```

Identifiers should be meaningful and use Pascal case (for example `HighestScore`); begin with a capital letter, contain letters/digits only and do not use keywords. `CHAR` uses single quotes; `STRING` uses double quotes. Use `//` for a comment. Arrays use square brackets, such as `DECLARE Marks : ARRAY[1:30] OF INTEGER` and `Marks[1] ← 87`.

```text
LENGTH(Name)                  // string length
UCASE(Name), LCASE(Name)      // case conversion
SUBSTRING(Name, Start, Length)
ROUND(Value, Places)
RANDOM()                      // 0 to 1 inclusive
OPENFILE "File.txt" FOR READ
READFILE "File.txt", Line
WRITEFILE "File.txt", Line
CLOSEFILE "File.txt"
```

**Flowchart quick guide.** Use arrows for flow; a rectangle for a process; a parallelogram for input/output; a diamond for a true/false decision; a terminator for start/stop; and the standard subroutine symbol for a call. Use the official logic-gate symbols when drawing circuits. [1]

---

# Compact study sequence

| Phase | Focus | Product to make before moving on |
|---|---|---|
| **1. Foundations** | Number systems, storage units, binary arithmetic and file-size calculations. | One error-free conversion/calculation sheet completed without a calculator. |
| **2. Systems processes** | Packets/errors/encryption; CPU/FDE; storage/networking; software. | Six labelled process explanations, each under ten lines. |
| **3. Society and emerging tech** | Web/DNS/cookies, cyber security, automated systems, robotics and AI. | A threat–defence matching grid and two balanced evaluations. |
| **4. Algorithm fluency** | Development cycle, design methods, searches/sorts, validation/testing, traces. | Hand-traced algorithms and a four-category test-data table. |
| **5. Code construction** | Pseudocode constructs, subroutines, arrays, files, SQL and logic circuits. | One timed scenario algorithm plus one SQL and one truth-table task. |
| **6. Exam integration** | Timed Paper 1 and Paper 2 practice; review mistakes by syllabus heading. | A personal “error log” with a corrected rule and one fresh example per error. |

Use spaced retrieval: revisit definitions after a day, a week and several weeks; interleave calculation, explanation and coding. Practical programming remains important even though Paper 2 is written: run, test and debug your own small programs so the pseudocode represents real control flow rather than memorised phrases. Cambridge explicitly expects practical problem-solving and experience of writing, running, testing and debugging programs. [1]

---

# Sources and specification notes

**Specification status.** This pack was checked against the official Cambridge **0478 Version 6** syllabus PDF, which states examination in **2026, 2027 and 2028**. Cambridge’s qualification page identifies 0478 as the paper-only route (0265 is the digital-only route) and hosts the current syllabus links. The official update notes the Version 6 change to `ROUND` guidance and reiterates the Paper 2 response-format clarification. Use the syllabus for the year in which you sit the exam and verify centre/series arrangements on entry. [1] [2] [3]

**Original-material note.** Explanations, examples, traces, tables and pseudocode here are newly written revision material. They are not reproduced past-paper questions or textbook passages. The syllabus’s assessed terminology, listed content and official pseudocode conventions are necessarily reflected so that study remains aligned with the qualification.

[1]: https://www.cambridgeinternational.org/Images/697167-2026-2028-syllabus.pdf "Cambridge IGCSE Computer Science 0478 syllabus for examination in 2026, 2027 and 2028, Version 6"
[2]: https://www.cambridgeinternational.org/programmes-and-qualifications/view/cambridge-igcse-computer-science-0478/ "Cambridge IGCSE Computer Science (0478) official qualification page"
[3]: https://www.cambridgeinternational.org/Images/711263-2026-2028-syllabus-update.pdf "Syllabus update: Cambridge IGCSE Computer Science (0478) for examination in 2026, 2027 and 2028"
[4]: https://help.cambridgeinternational.org/hc/en-gb/articles/23007154008210-What-high-level-procedural-language-should-candidates-use "Cambridge International Help Centre: What high-level procedural language should candidates use?"$md$),
  ('mathematics', 'AS', '2.1 Algebra and functions', 'algebra-and-functions-2-1', $md$### 2.1.1 Indices, surds and algebraic manipulation$md$, 201, $md$### 2.1.1 Indices, surds and algebraic manipulation

**Assessed on:** P1; used throughout P2–P4 and all optional applications.

For non-zero \(a\), use \(a^m a^n=a^{m+n}\), \(a^m/a^n=a^{m-n}\), \((a^m)^n=a^{mn}\), \(a^{-n}=1/a^n\), and \(a^{p/q}=\sqrt[q]{a^p}\) where the real expression is defined. A **surd** is an irrational root left exactly, such as \(\sqrt 3\). Rationalising a denominator removes a surd from the denominator by multiplying by a suitable factor or conjugate.

*Micro-example.*
\[
\frac{3}{2-\sqrt3}=\frac{3(2+\sqrt3)}{(2-\sqrt3)(2+\sqrt3)}=3(2+\sqrt3)=6+3\sqrt3.
\]

**Common errors:** applying \((a+b)^2=a^2+b^2\) (false); cancelling across addition; treating \(\sqrt{x^2}\) as \(x\) rather than \(|x|\) when \(x\) can be negative.

**Exam-use cue:** **“Simplify”** means produce an equivalent expression with valid restrictions, not merely a numerical approximation.

### 2.1.2 Quadratics, simultaneous equations and inequalities

**Assessed on:** P1; prerequisite for P2–P4.

For \(ax^2+bx+c\), the discriminant \(\Delta=b^2-4ac\) determines real roots: \(\Delta>0\) gives two distinct roots, \(\Delta=0\) a repeated root, and \(\Delta<0\) no real roots. Completing the square exposes the vertex:
\[
ax^2+bx+c=a\left(x+\frac b{2a}\right)^2+c-\frac{b^2}{4a}.
\]
Solve a quadratic by factorisation, completing the square, the quadratic formula, or a calculator where appropriate. Solve a pair of equations by substitution when one variable can be expressed simply.

*Micro-example.* \(x^2-4x+1=(x-2)^2-3\), so the minimum is \(-3\) at \(x=2\); \(x^2-4x+1\le0\) for \(2-\sqrt3\le x\le2+\sqrt3\).

For an inequality, bring all terms to one side, find the critical roots, then use a sign diagram or graph. With rational expressions, exclude zero denominators before multiplying through.

**Common errors:** reversing an inequality after multiplying by an expression of unknown sign; including a root when the sign is \(<\) or \(>\); forgetting that a solid boundary is used for \(\le\) or \(\ge\), dotted for \(<\) or \(>\).

**Exam-use cue:** **“Hence solve graphically”** asks for the \(x\)-coordinates of intersections or regions, not a fresh unrelated algebraic method.

### 2.1.3 Polynomial and function graphs; basic transformations

**Assessed on:** P1; transformations are extended in P3.

Factor and expand polynomials of degree up to three; interpret equation solutions as graph intersections. Know simple cubic and reciprocal graphs, including asymptotes for \(y=k/x\) and \(y=k/x^2\). Given \(y=f(x)\):

| Transformation | Effect to remember |
|---|---|
| \(y=af(x)\) | vertical scale factor \(|a|\); reflect in the \(x\)-axis if \(a<0\) |
| \(y=f(x)+a\) | translate up \(a\) |
| \(y=f(x+a)\) | translate left \(a\) |
| \(y=f(ax)\) | horizontal scale factor \(1/|a|\); reflect in the \(y\)-axis if \(a<0\) |

*Micro-example.* From \(y=x^2\), \(y=2(x+1)^2-3\) is vertically stretched by 2, then shifted left 1 and down 3. Its vertex is \((-1,-3)\).

**Common errors:** moving \(f(x+3)\) right rather than left; forgetting asymptotes; confusing a graph’s roots with its \(y\)-intercept.

**Exam-use cue:** Mark transformed intercepts, turning points and asymptotes explicitly; an unlabelled shape is rarely enough evidence.$md$),
  ('mathematics', 'AS', '2.2 Coordinate geometry in the \((x,y)\) plane', 'coordinate-geometry-in-the-x-y-plane-2-2', $md$Assessed on: P1; circle work follows in P2 and parametrics in P4.$md$, 202, $md$**Assessed on:** P1; circle work follows in P2 and parametrics in P4.

A line of gradient \(m\) through \((x_1,y_1)\) can be written \(y-y_1=m(x-x_1)\). In \(ax+by+c=0\), rearrange to identify \(m=-a/b\) when \(b\ne0\). Parallel lines have equal gradients. Perpendicular non-vertical lines have \(m_1m_2=-1\).

*Micro-example.* A line perpendicular to \(3x+4y=18\) has gradient \(4/3\). Through \((2,3)\), \(y-3=\frac43(x-2)\).

**Common errors:** taking the reciprocal without changing sign; claiming a vertical line has gradient 0; using the supplied point after an algebraic rearrangement mistake.

**Exam-use cue:** **“Find the equation”** needs a complete equation, not only a gradient. Substitute the stated point once as a quick check.$md$),
  ('mathematics', 'AS', '2.3 Trigonometry', 'trigonometry-2-3', $md$Assessed on: P1; identities and more advanced equations develop in P2–P3.$md$, 203, $md$**Assessed on:** P1; identities and more advanced equations develop in P2–P3.

In a triangle, use the sine rule \(a/\sin A=b/\sin B=c/\sin C\), cosine rule \(a^2=b^2+c^2-2bc\cos A\), and area \(\frac12 ab\sin C\). The sine rule may give an **ambiguous case**: a second valid angle may exist if it fits the triangle.

Radians measure angle as arc length divided by radius. With \(\theta\) in radians, \(s=r\theta\) and sector area \(A=\frac12r^2\theta\). For sine, cosine and tangent graphs, know period, symmetry, amplitude where relevant, and how transformations alter them.

*Micro-example.* A sector with \(r=5\) and \(\theta=0.8\) has arc \(s=4\) and area \(10\) square units. Do not use degree mode: \(0.8\) is a radian value.

**Common errors:** calculator in the wrong angular mode; using a sine-rule inverse answer without checking the supplementary angle; applying sector formulae to degrees without converting.

**Exam-use cue:** Draw the triangle, label the side opposite each angle, and state degrees or radians in the answer where it matters.$md$),
  ('mathematics', 'AS', '2.4 Differentiation', 'differentiation-2-4', $md$Assessed on: P1; rules and applications extend in P2–P4.$md$, 204, $md$**Assessed on:** P1; rules and applications extend in P2–P4.

The derivative is the instantaneous rate of change and gradient of the tangent. \(f'(x)\) is the first derivative; \(f''(x)\) describes how the gradient changes. For powers, \(\frac{d}{dx}x^n=nx^{n-1}\); differentiate sums term by term. A tangent at \(x=a\) has gradient \(f'(a)\); its normal has gradient \(-1/f'(a)\) when the tangent is not horizontal.

*Micro-example.* For \(y=x^3-3x\), \(dy/dx=3x^2-3\). At \(x=2\), the tangent gradient is 9 and \(y=2\), so \(y-2=9(x-2)\).

**Common errors:** reducing a constant incorrectly; using the negative reciprocal for a tangent rather than a normal; omitting the point when forming the line.

**Exam-use cue:** **“Find the gradient at…”** requires substitution into the *derivative*, not the original function.$md$),
  ('mathematics', 'AS', '2.5 Integration', 'integration-2-5', $md$Assessed on: P1; definite integrals and areas develop in P2; techniques develop in P3–P4.$md$, 205, $md$**Assessed on:** P1; definite integrals and areas develop in P2; techniques develop in P3–P4.

Indefinite integration reverses differentiation: \(\int x^n\,dx=x^{n+1}/(n+1)+C\), \(n\ne-1\). Integrate terms individually. If given \(dy/dx\) and a point, integrate then use the point to find \(C\).

*Micro-example.* \(\frac{dy}{dx}=6x-4\), and \(y=5\) when \(x=1\). Then \(y=3x^2-4x+C\), so \(5=3-4+C\), hence \(y=3x^2-4x+6\).

**Common errors:** forgetting \(+C\); increasing rather than decreasing the power; applying the power rule to \(x^{-1}\), which is handled later as \(\ln|x|\).

**Exam-use cue:** **“Find the curve”** needs the constant determined, not an indefinite family of curves.

---

# 3. P2: Pure Mathematics 2 — IAS compulsory

**Assessment position:** WMA12/01; IAS and IAL compulsory. P1 knowledge is assumed and may be tested. [2]$md$),
  ('mathematics', 'AS', '3.1 Proof', 'proof-3-1', $md$Assessed on: P2; contradiction is specifically P4.$md$, 301, $md$**Assessed on:** P2; contradiction is specifically P4.

A proof moves from stated assumptions through valid logical steps to a conclusion. **Proof by exhaustion** checks every case in a finite, stated set. A **counterexample** disproves a universal claim by one permitted value for which the claim fails.

*Micro-example.* To disprove “\(n^2-n+1\) is prime for every positive integer \(n\),” choose \(n=5\): \(25-5+1=21\), which is not prime. One valid counterexample is enough.

**Common errors:** treating several numerical examples as proof of “for all”; saying “obvious”; using a counterexample outside the claimed domain.

**Exam-use cue:** Under **“prove”**, start from the given information and show a chain of equalities/implications. Under **“disprove”**, name the counterexample and evaluate it.$md$),
  ('mathematics', 'AS', '3.2 Polynomials and the Factor/Remainder Theorems', 'polynomials-and-the-factor-remainder-theorems-3-2', $md$Assessed on: P2; rational expressions and division are extended in P3.$md$, 302, $md$**Assessed on:** P2; rational expressions and division are extended in P3.

For polynomial \(f(x)\), the remainder on division by \(x-a\) is \(f(a)\). Thus \(x-a\) is a factor exactly when \(f(a)=0\). For \(ax-b\), test \(x=b/a\). Use algebraic division by a linear expression to find a quotient and remainder.

*Micro-example.* If \(f(x)=x^3-4x+3\), then \(f(1)=0\); \((x-1)\) is a factor. Division gives \(x^2+x-3\), so \(f(x)=(x-1)(x^2+x-3)\).

**Common errors:** substituting \(-a\) into \(f\) for a factor \(x-a\); calling \(f(a)\) the quotient; failing to factor the quotient further where asked.

**Exam-use cue:** State the theorem link, e.g. “\(f(1)=0\), so by the Factor Theorem \((x-1)\) is a factor.”$md$),
  ('mathematics', 'AS', '3.3 Circle geometry', 'circle-geometry-3-3', $md$Assessed on: P2.$md$, 303, $md$**Assessed on:** P2.

A circle with centre \((a,b)\) and radius \(r\) is \((x-a)^2+(y-b)^2=r^2\). Know that an angle in a semicircle is a right angle, the perpendicular from centre to chord bisects the chord, and the radius is perpendicular to a tangent at the point of contact.

*Micro-example.* \((x-3)^2+(y+1)^2=25\) has centre \((3,-1)\) and radius 5. A tangent at a point has gradient perpendicular to the radius from \((3,-1)\) to that point.

**Common errors:** centre signs reversed; using a tangent gradient equal to the radius gradient; applying the semicircle theorem when endpoints are not a diameter.

**Exam-use cue:** Add a radius and mark the right angle before forming gradients or equations.$md$),
  ('mathematics', 'AS', '3.4 Sequences, series and binomial expansion for positive integer powers', 'sequences-series-and-binomial-expansion-for-positive-integer-3-4', $md$Assessed on: P2; rational binomial expansion follows in P4.$md$, 304, $md$**Assessed on:** P2; rational binomial expansion follows in P4.

An **arithmetic sequence** has constant difference \(d\): \(u_n=a+(n-1)d\), \(S_n=\frac n2[2a+(n-1)d]\). A **geometric sequence** has constant ratio \(r\): \(u_n=ar^{n-1}\), \(S_n=a(1-r^n)/(1-r)\) for \(r\ne1\); \(S_\infty=a/(1-r)\) only when \(|r|<1\). Identify increasing, decreasing and periodic sequences, including recurrence-defined sequences \(x_{n+1}=f(x_n)\).

For \((a+b)^n\), \(n\) a positive integer,
\[
(a+b)^n=\sum_{r=0}^{n}\binom nr a^{n-r}b^r,
\qquad \binom nr=\frac{n!}{r!(n-r)!}.
\]

*Micro-example.* In a GP with \(a=12\), \(r=\frac13\), \(S_\infty=12/(1-1/3)=18\). The convergence condition must be stated.

**Common errors:** using \(ar^n\) rather than \(ar^{n-1}\) for the first term convention; using \(S_\infty\) when \(|r|\ge1\); mixing a term \(u_n\) with a sum \(S_n\).

**Exam-use cue:** **“Show that”** often rewards substitution into the relevant formula. Keep \(\Sigma\) limits and the first/last term clear.$md$),
  ('mathematics', 'AS', '3.5 Exponentials and logarithms', 'exponentials-and-logarithms-3-5', $md$Assessed on: P2; (e^x), (ln x), and models extend in P3.$md$, 305, $md$**Assessed on:** P2; \(e^x\), \(\ln x\), and models extend in P3.

For base \(a>0\), \(a\ne1\), \(y=a^x\) is exponential. Log laws require positive arguments:
\[
\log_a(xy)=\log_a x+\log_a y,\quad
\log_a(x/y)=\log_a x-\log_a y,\quad
\log_a(x^k)=k\log_a x.
\]
Solve \(a^x=b\) as \(x=\log_a b=\ln b/\ln a\), provided the quantities are valid.

*Micro-example.* \(3^{2x-1}=7\) gives \(2x-1=\log_3 7\), hence \(x=\frac12(1+\ln7/\ln3)\).

**Common errors:** splitting \(\log(a+b)\); taking logs of a non-positive expression; omitting a restriction from an equation containing \(\log(2x-1)\).

**Exam-use cue:** When expanding or combining logs, state the arguments are positive if the domain is not already clear.$md$),
  ('mathematics', 'AS', '3.6 Trigonometric identities and equations', 'trigonometric-identities-and-equations-3-6', $md$Assessed on: P2; extended identities and forms appear in P3.$md$, 306, $md$**Assessed on:** P2; extended identities and forms appear in P3.

Use \(\tan\theta=\sin\theta/\cos\theta\) and \(\sin^2\theta+\cos^2\theta=1\). Solve within the exact stated interval; general solutions alone are not enough. For equations such as \(6\cos^2x+\sin x-5=0\), rewrite in one function using \(\cos^2x=1-\sin^2x\), then solve a quadratic in \(\sin x\) and reject values outside \([-1,1]\).

*Micro-example.* \(\sin x=1/2\) for \(0\le x<2\pi\) gives \(x=\pi/6,5\pi/6\), not merely \(\pi/6\).

**Common errors:** calculator only gives a principal value; missing periodic roots; mixing degrees with radians; dividing by an expression that might be zero.

**Exam-use cue:** Write the interval at the top of your work and test every candidate against it.$md$),
  ('mathematics', 'AS', '3.7 Differentiation: stationary points and curve behaviour', 'differentiation-stationary-points-and-curve-behaviour-3-7', $md$Assessed on: P2; more differentiation techniques appear in P3–P4.$md$, 307, $md$**Assessed on:** P2; more differentiation techniques appear in P3–P4.

A **stationary point** satisfies \(dy/dx=0\). Use \(d^2y/dx^2\) to classify a stationary point: positive indicates local minimum, negative local maximum; if zero, investigate sign changes or another method. Use derivative sign to state increasing/decreasing intervals.

*Micro-example.* \(y=x^3-3x\) has \(y'=3(x^2-1)\), so stationary points at \(x=\pm1\). Since \(y''=6x\), \(x=-1\) is a local maximum and \(x=1\) a local minimum.

**Common errors:** calling every \(y'=0\) point a maximum/minimum; classifying using \(y\) rather than \(y''\); reporting \(x\) but not coordinates where requested.

**Exam-use cue:** In optimisation, define the quantity being maximised/minimised in one variable, state its valid domain, then interpret the endpoint/stationary comparison.$md$),
  ('mathematics', 'AS', '3.8 Definite integration, area and trapezium rule', 'definite-integration-area-and-trapezium-rule-3-8', $md$Assessed on: P2; advanced integration develops in P3–P4.$md$, 308, $md$**Assessed on:** P2; advanced integration develops in P3–P4.

\(\int_a^b f(x)\,dx=F(b)-F(a)\), where \(F'=f\). A definite integral is signed area; if a curve crosses the axis, split at roots for total geometric area. For equally spaced ordinates \(y_0,\ldots,y_n\) width \(h\),
\[
\int_a^b y\,dx\approx \frac h2\left[y_0+y_n+2(y_1+\cdots+y_{n-1})\right].
\]

*Micro-example.* For \(y=x^2\) at \(x=0,1,2\), \(h=1\): trapezium estimate \(\frac12[0+4+2(1)]=3\), while the exact area is \(8/3\). For a convex curve, these straight-edged trapezia overestimate.

**Common errors:** forgetting the factor \(h/2\); counting an endpoint twice; using a signed integral when the question asks for total area.

**Exam-use cue:** **“Estimate”** requires the trapezium-rule substitution, not an exact integral. Comment on improvement if the question asks about increasing the number of strips.

---

# 4. P3: Pure Mathematics 3 — IA2 compulsory

**Assessment position:** WMA13/01; compulsory only in the full IAL. P1–P2 content is assumed. [2]$md$),
  ('mathematics', 'A2', '4.1 Rational expressions, functions, inverses and modulus', 'rational-expressions-functions-inverses-and-modulus-4-1', $md$Assessed on: P3.$md$, 401, $md$**Assessed on:** P3.

Factor before cancelling a rational expression and record excluded inputs. A **function** maps each allowed input in its domain to exactly one output. The **range** is the set of outputs. For composition, \(fg(x)=f(g(x))\): do \(g\) first. An inverse \(f^{-1}\) reverses a one-to-one function; it exists only on a suitably restricted domain.

To find an inverse, set \(y=f(x)\), rearrange for \(x\), then swap labels. A modulus \(|u|\) is \(u\) if \(u\ge0\) and \(-u\) if \(u<0\). Sketch \(y=|f(x)|\) by reflecting portions below the \(x\)-axis; sketch \(y=f(|x|)\) by mirroring the right half into the left.

*Micro-example.* \(f(x)=3x-2\) gives \(y=3x-2\Rightarrow x=(y+2)/3\), so \(f^{-1}(x)=(x+2)/3\). Check \(f(f^{-1}(x))=x\).

**Common errors:** writing \(1/f(x)\) for \(f^{-1}(x)\); composing in the wrong order; cancelling \((x-1)\) but then allowing \(x=1\); reflecting the wrong graph for modulus.

**Exam-use cue:** **“State the domain/range”** demands set or interval notation with all exclusions. A calculator graph is not an adequate domain argument.$md$),
  ('mathematics', 'A2', '4.2 Combined transformations', 'combined-transformations-4-2', $md$Assessed on: P3; P1 covers individual transformations.$md$, 402, $md$**Assessed on:** P3; P1 covers individual transformations.

Apply transformations in the stated algebraic order. In \(y=af(bx+c)+d\), factor the inside first when interpreting horizontal change; P3 requires combinations such as \(2f(3x)\), \(f(-x)+1\), and transformed trigonometric graphs. The specification does not require \(f(ax+b)\) as a general new category, but algebraic interpretation remains helpful. [2]

*Micro-example.* From \(y=f(x)\), \(y=-2f(x)+3\): reflect in the \(x\)-axis, stretch vertically by 2, then translate up 3.

**Common errors:** treating inside changes like outside changes; applying vertical translation before reflection when interpreting coordinates.

**Exam-use cue:** Map a recognisable point \((p,q)\) on \(f\) to a point on the new graph to check every transformation.$md$),
  ('mathematics', 'A2', '4.3 Advanced trigonometry', 'advanced-trigonometry-4-3', $md$Assessed on: P3.$md$, 403, $md$**Assessed on:** P3.

Know \(\sec\theta=1/\cos\theta\), \(\cosec\theta=1/\sin\theta\), \(\cot\theta=1/\tan\theta\), and the restricted inverse functions \(\arcsin\), \(\arccos\), \(\arctan\). Use
\[
\sec^2\theta=1+\tan^2\theta,\quad \cosec^2\theta=1+\cot^2\theta,
\]
\[
\sin2A=2\sin A\cos A,\quad \cos2A=\cos^2A-\sin^2A,
\quad \tan2A=\frac{2\tan A}{1-\tan^2A},
\]
and addition/subtraction formulae. Convert \(a\cos\theta+b\sin\theta\) to \(R\cos(\theta-\alpha)\) or \(R\sin(\theta+\alpha)\), where \(R=\sqrt{a^2+b^2}\), matching coefficients and choosing a quadrant-consistent angle.

*Micro-example.* \(3\cos x+4\sin x=5\cos(x-\alpha)\), with \(\cos\alpha=3/5\), \(\sin\alpha=4/5\). This immediately shows the expression lies between \(-5\) and \(5\).

**Common errors:** using \(R=a+b\); choosing \(\alpha\) in the wrong quadrant; accepting an inverse-trig output outside its principal range without returning to the original equation.

**Exam-use cue:** In a trig identity proof, convert the more complicated side into sine/cosine and use identities—not decimal testing.$md$),
  ('mathematics', 'A2', '4.4 Exponentials, logarithms and models', 'exponentials-logarithms-and-models-4-4', $md$Assessed on: P3.$md$, 404, $md$**Assessed on:** P3.

\(e^x\) is its own derivative and \(\ln x\) is its inverse on \(x>0\). Solve forms such as \(e^{ax+b}=p\) and \(\ln(ax+b)=q\) after enforcing the log domain. Linearise \(y=ax^n\) by plotting \(\log y\) against \(\log x\): gradient \(n\), intercept \(\log a\). Linearise \(y=kb^x\) by plotting \(\log y\) against \(x\): gradient \(\log b\), intercept \(\log k\).

Growth/decay models commonly have \(y=Ae^{kt}\): \(A\) is the initial value at \(t=0\), \(k>0\) growth, \(k<0\) decay.

*Micro-example.* If \(N=400e^{-0.2t}\), \(N(0)=400\). To find \(N=100\): \(e^{-0.2t}=1/4\), so \(t=\ln4/0.2\). State the time units supplied by the model.

**Common errors:** saying the intercept is \(a\) rather than \(\log a\); using \(\ln x\) for non-positive \(x\); extrapolating a model beyond a sensible context without comment.

**Exam-use cue:** **“Estimate parameters”** means identify gradient/intercept from the specified transformed graph and back-transform correctly.$md$),
  ('mathematics', 'A2', '4.5 Differentiation: standard functions, rules and rates', 'differentiation-standard-functions-rules-and-rates-4-5', $md$Assessed on: P3; implicit/parametric differentiation is P4.$md$, 405, $md$**Assessed on:** P3; implicit/parametric differentiation is P4.

Differentiate \(e^{kx}\to ke^{kx}\), \(\ln x\to1/x\), \(\sin kx\to k\cos kx\), \(\cos kx\to-k\sin kx\), \(\tan kx\to k\sec^2kx\). Use product rule \((uv)'=u'v+uv'\), quotient rule \((u/v)'=(u'v-uv')/v^2\), and chain rule \(\frac d{dx}f(g(x))=f'(g(x))g'(x)\). If \(x\) is given in terms of \(y\), use \(dy/dx=1/(dx/dy)\) only where the reciprocal is defined.

*Micro-example.* \(y=(x^2+1)e^{3x}\) gives \(y'=2xe^{3x}+3(x^2+1)e^{3x}=e^{3x}(3x^2+2x+3)\).

**Common errors:** omitting the inner derivative; differentiating a quotient by dividing derivatives; using \(1/(dy/dx)\) instead of \(1/(dx/dy)\).

**Exam-use cue:** For a composite function, annotate the outer and inner functions before differentiating; it makes the chain factor visible.$md$),
  ('mathematics', 'A2', '4.6 Integration by recognition', 'integration-by-recognition-4-6', $md$Assessed on: P3; substitution/parts/partial fractions are P4.$md$, 406, $md$**Assessed on:** P3; substitution/parts/partial fractions are P4.

Know integrals of \(e^{kx}\), \(1/x\), \(\sin kx\), \(\cos kx\), and \(a^x\). Recognition reverses a chain-rule derivative:
\[
\int \frac{f'(x)}{f(x)}\,dx=\ln|f(x)|+C,
\qquad
\int f'(x)[f(x)]^n\,dx=\frac{[f(x)]^{n+1}}{n+1}+C.
\]
Use identities first when needed, e.g. \(\sin^2x=(1-\cos2x)/2\).

*Micro-example.* \(\int\frac{6x}{3x^2+5}\,dx=\ln(3x^2+5)+C\), because the numerator is the derivative of the denominator.

**Common errors:** forgetting \(|\cdot|\) in the general log rule; integrating \(\tan x\) as if it were a power; missing an identity that simplifies a squared trig function.

**Exam-use cue:** Ask “what would differentiate to the numerator?” before applying a technique.$md$),
  ('mathematics', 'A2', '4.7 Numerical methods', 'numerical-methods-4-7', $md$Assessed on: P3.$md$, 407, $md$**Assessed on:** P3.

If \(f\) is continuous and \(f(a)\) and \(f(b)\) have opposite signs, a root lies in \((a,b)\). For a supplied iteration \(x_{n+1}=g(x_n)\), start at the given \(x_1\) or \(x_0\), retain sufficient figures, and iterate until the requested accuracy is secure. A sequence that oscillates, diverges or settles outside the stated interval is a warning.

*Micro-example trace.* For \(x_{n+1}=\sqrt{2+x_n}\), \(x_1=1\): \(x_2=1.732\), \(x_3=1.932\), \(x_4=1.983\), approaching 2. The fixed point obeys \(x=\sqrt{2+x}\), hence \(x^2-x-2=0\); the iteration selects the positive root.

**Common errors:** claiming a sign change without calculating both signs; rounding every iterate too early; failing to state the final estimate to the requested accuracy.

**Exam-use cue:** Present a short, labelled table \(n,x_n\). It evidences the method even if later arithmetic slips.

---

# 5. P4: Pure Mathematics 4 — IA2 compulsory

**Assessment position:** WMA14/01; compulsory only in the full IAL. P1–P3 knowledge is assumed. [2]$md$),
  ('mathematics', 'A2', '5.1 Proof by contradiction', 'proof-by-contradiction-5-1', $md$Assessed on: P4.$md$, 501, $md$**Assessed on:** P4.

To prove a proposition by contradiction, assume its negation, combine that assumption with accepted facts, derive an impossibility, then conclude the original proposition must be true. The contradiction must be genuine—not merely a result you dislike.

*Micro-example structure.* To show \(\sqrt2\) is irrational, assume \(\sqrt2=p/q\) in lowest terms. Squaring gives \(p^2=2q^2\), so \(p\) is even; then \(q\) is even. This contradicts “lowest terms,” so \(\sqrt2\) is irrational.

**Common errors:** assuming what must be proved without using a negation; ending at an unexpected statement without identifying the contradicted assumption; omitting why “even square implies even integer” applies.

**Exam-use cue:** Name the assumption and write an explicit final sentence: “This contradiction means the assumption is false; therefore …”.$md$),
  ('mathematics', 'A2', '5.2 Partial fractions', 'partial-fractions-5-2', $md$Assessed on: P4; supports integration and series work.$md$, 502, $md$**Assessed on:** P4; supports integration and series work.

First make a rational function proper using division if numerator degree is at least denominator degree. For linear factors, use templates such as
\[
\frac{P(x)}{(ax+b)(cx+d)}=\frac A{ax+b}+\frac B{cx+d},\qquad
\frac{P(x)}{(x-a)^2(x-b)}=\frac A{x-a}+\frac B{(x-a)^2}+\frac C{x-b}.
\]
Equate coefficients or substitute convenient values after multiplying through. Quadratic factors such as \(x^2+a\) are not required in this unit’s partial-fractions content. [2]

*Micro-example.* \(\frac5{(x-1)(x+1)}=\frac A{x-1}+\frac B{x+1}\). Then \(5=A(x+1)+B(x-1)\). At \(x=1\), \(A=5/2\); at \(x=-1\), \(B=-5/2\).

**Common errors:** forgetting every required repeated-factor term; not dividing first; losing brackets when multiplying through.

**Exam-use cue:** Verify by recombining your fractions or testing one non-special \(x\)-value.$md$),
  ('mathematics', 'A2', '5.3 Parametric equations', 'parametric-equations-5-3', $md$Assessed on: P4.$md$, 503, $md$**Assessed on:** P4.

A parametric curve gives \(x=f(t)\), \(y=g(t)\). Eliminate \(t\) where asked, but retain parameter form when it simplifies calculus. The chain rule gives
\[
\frac{dy}{dx}=\frac{dy/dt}{dx/dt},\qquad \frac{d^2y}{dx^2}=\frac{d(dy/dx)/dt}{dx/dt}.
\]

*Micro-example.* \(x=t^2+1,\ y=t^3-3t\). Then \(dx/dt=2t\), \(dy/dt=3t^2-3\), so \(dy/dx=\frac{3t^2-3}{2t}\) for \(t\ne0\). Substitute the requested \(t\) to obtain both point and gradient.

**Common errors:** calculating \((dy/dt)/(dx/dt)\) in reverse; using a parametric gradient at a point without finding its parameter; losing restrictions when eliminating \(t\).

**Exam-use cue:** For a tangent/normal, show \(dx/dt\), \(dy/dt\), \(dy/dx\), then the coordinate.$md$),
  ('mathematics', 'A2', '5.4 Binomial series for rational powers', 'binomial-series-for-rational-powers-5-4', $md$Assessed on: P4; P2 covers positive integer powers.$md$, 504, $md$**Assessed on:** P4; P2 covers positive integer powers.

For rational \(n\),
\[
(1+x)^n=1+nx+\frac{n(n-1)}{2!}x^2+\frac{n(n-1)(n-2)}{3!}x^3+\cdots,
\quad |x|<1.
\]
Rewrite \((ax+b)^n\) into a constant times \((1+u)^n\), then use the condition \(|u|<1\). A truncated expansion is an approximation unless the power is a non-negative integer.

*Micro-example.* \((4+x)^{-1/2}=\frac12(1+x/4)^{-1/2}\). Therefore its first three terms are \(\frac12[1-\frac12(x/4)+\frac{(-1/2)(-3/2)}2(x/4)^2]\).

**Common errors:** forgetting the factored constant; using \(|x|<1\) when the actual small quantity is \(x/4\); treating the series as finite for a non-integer exponent.

**Exam-use cue:** State the range of \(x\) from the convergence condition whenever it is requested or relevant.$md$),
  ('mathematics', 'A2', '5.5 Implicit and parametric differentiation; differential equations', 'implicit-and-parametric-differentiation-differential-equatio-5-5', $md$Assessed on: P4.$md$, 505, $md$**Assessed on:** P4.

For an implicit relation, differentiate every term with respect to \(x\), applying the chain rule to any \(y\)-term: \(d(y^2)/dx=2y\,dy/dx\). A differential equation relates a variable to its derivative. In connected-rate contexts, choose units and define each changing variable before differentiating.

For a separable equation \(dy/dx=f(x)g(y)\), rearrange to put all \(y\)-terms with \(dy\) and \(x\)-terms with \(dx\), integrate both sides, then use an initial condition for a particular solution.

*Micro-example.* \(dy/dx=2xy\). Separate: \(dy/y=2x\,dx\). Thus \(\ln|y|=x^2+C\), so \(y=Ae^{x^2}\). If \(y=3\) at \(x=0\), \(y=3e^{x^2}\).

**Common errors:** differentiating \(y^2\) as \(2y\); mixing the constant into both sides; using an initial condition before integrating without justification.

**Exam-use cue:** **“Form a differential equation”** asks for the relationship in derivatives; **“solve”** requires general or particular solution as instructed.$md$),
  ('mathematics', 'A2', '5.6 Integration: volumes, substitution, parts and partial fractions', 'integration-volumes-substitution-parts-and-partial-fractions-5-6', $md$Assessed on: P4.$md$, 506, $md$**Assessed on:** P4.

For revolution about the \(x\)-axis, \(V=\pi\int_a^b y^2\,dx\). In parametric form, \(V=\pi\int y^2(dx/dt)\,dt\), with correct parameter limits. This specification requires this \(x\)-axis form, not \(\pi\int x^2dy\). [2]

Use substitution as reverse chain rule: change every occurrence of \(x\) and \(dx\), integrate in the new variable, then return to \(x\). For integration by parts, \(\int u\,dv=uv-\int v\,du\); choose \(u\) that simplifies on differentiation. Integrate decomposed partial fractions term by term.

*Micro-example.* \(\int xe^x\,dx\): choose \(u=x\), \(dv=e^x dx\). Then \(xe^x-\int e^x dx=e^x(x-1)+C\).

**Common errors:** forgetting to square the radius in a volume; mixing old/new variables after substitution; using integration by parts with an unhelpful choice; losing \(+C\) in indefinite integrals.

**Exam-use cue:** State the substitution or identify \(u,dv\). Method marks depend on the setup, not only the final integral.$md$),
  ('mathematics', 'A2', '5.7 Vectors in two and three dimensions', 'vectors-in-two-and-three-dimensions-5-7', $md$Assessed on: P4; two-dimensional vector ideas support M1/M2.$md$, 507, $md$**Assessed on:** P4; two-dimensional vector ideas support M1/M2.

A vector has magnitude and direction. For \(\mathbf a=(a_1,a_2,a_3)\), \(|\mathbf a|=\sqrt{a_1^2+a_2^2+a_3^2}\); a unit vector in its direction is \(\mathbf a/|\mathbf a|\). If \(\overrightarrow{OA}=\mathbf a\), \(\overrightarrow{OB}=\mathbf b\), then \(\overrightarrow{AB}=\mathbf b-\mathbf a\). A line is \(\mathbf r=\mathbf a+t\mathbf b\). Determine whether two lines are parallel, intersecting or skew by comparing directions and solving parameter equations.

The scalar product is \(\mathbf a\cdot\mathbf b=a_1b_1+a_2b_2+a_3b_3=|\mathbf a||\mathbf b|\cos\theta\). Non-zero vectors are perpendicular when \(\mathbf a\cdot\mathbf b=0\).

*Micro-example.* \(\mathbf a=(1,2,2)\) has \(|\mathbf a|=3\), so its unit vector is \((1/3,2/3,2/3)\). For \(\mathbf a\cdot\mathbf b=0\), explicitly note both vectors are non-zero before concluding perpendicularity.

**Common errors:** subtracting position vectors in the wrong order; finding the angle using a cross product (not needed here); treating skew lines as parallel simply because they do not meet.

**Exam-use cue:** Use distinct parameters for distinct lines. A single parameter can accidentally force a false intersection.

---

# 6. M1: Mechanics 1 — IAS/IAL application option

**Assessment position:** WME01/01; an optional application unit for IAS and IAL Mathematics. It assumes P1–P2 and two-dimensional vectors. [2]

> **Mechanics protocol.** Draw an isolate-and-label diagram before writing equations. State positive directions, resolve consistently, retain signs, and use SI units. A mechanics equation without a defined particle/system/axis is fragile.$md$),
  ('mathematics', 'A2', '6.1 Mathematical models and vectors in mechanics', 'mathematical-models-and-vectors-in-mechanics-6-1', $md$Assessed on: M1.$md$, 601, $md$**Assessed on:** M1.

A model simplifies a situation. Key terms include **particle** (mass, negligible size), **lamina** (thin flat body), **rigid body** (shape does not deform), **light** string/rod (negligible mass), **inextensible** string (fixed length), **smooth** surface (no friction), **rough** surface (friction possible), and **light smooth pulley**. State a model limitation where relevant.

Resolve a vector using \(i,j\) or components. Velocity is rate of change of displacement; acceleration is rate of change of velocity. The resultant is the vector sum.

*Micro-example.* A force 10 N at \(30^\circ\) above horizontal has components \((10\cos30^\circ)\mathbf i+(10\sin30^\circ)\mathbf j\). Do not swap sine/cosine without reference to the labelled angle.

**Common errors:** placing friction in the direction of motion instead of opposing relative motion/tendency; assuming a string is taut without the model saying so; treating a force diagram as a trajectory sketch.

**Exam-use cue:** **“Model”** or **“comment”** asks for an assumption and its possible effect, e.g. air resistance neglected may make a calculated range too large.$md$),
  ('mathematics', 'A2', '6.2 Kinematics in one dimension with constant acceleration', 'kinematics-in-one-dimension-with-constant-acceleration-6-2', $md$Assessed on: M1.$md$, 602, $md$**Assessed on:** M1.

When acceleration is constant, use
\[
v=u+at,\quad s=ut+\tfrac12at^2,\quad v^2=u^2+2as,\quad s=\tfrac12(u+v)t.
\]
Here \(u,v,s,a,t\) must refer to one particle over the same interval and chosen positive direction. Gradient of a displacement–time graph is velocity; gradient of velocity–time graph is acceleration; area under a velocity–time graph is displacement.

*Micro-example.* Taking upward positive, an object projected upward at \(12\,\mathrm{m\,s^{-1}}\) has \(a=-9.8\). At maximum height \(v=0\), so \(0=12^2+2(-9.8)s\), giving \(s\approx7.35\) m.

**Common errors:** using speed where signed velocity is required; changing sign convention midway; taking area under a speed-time graph as displacement when direction changes.

**Exam-use cue:** Declare “upwards positive” (or equivalent) once, then allow gravity to be negative automatically.$md$),
  ('mathematics', 'A2', '6.3 Dynamics, connected particles, momentum and friction', 'dynamics-connected-particles-momentum-and-friction-6-3', $md$Assessed on: M1.$md$, 603, $md$**Assessed on:** M1.

Newton’s second law is \(\sum\mathbf F=m\mathbf a\). Draw a separate diagram for each connected particle, then write one equation along each motion direction. For a moving particle on a rough surface, friction magnitude is \(F=\mu R\); in limiting/equilibrium situations, use \(F\le\mu R\), not automatic equality.

Momentum is \(\mathbf p=m\mathbf v\). Impulse is change in momentum. In a direct collision of two particles, total momentum is conserved if external impulse is negligible; M1 does **not** require Newton’s law of restitution. [2]

*Micro-example.* Two particles of masses 2 kg and 3 kg move on a line. If their velocities just before/after collision are known, write \(2u_1+3u_2=2v_1+3v_2\) with one direction positive. Do not use magnitudes unless every object moves in that direction.

**Common errors:** adding tensions on a two-particle system then also treating them as external; setting friction equal to \(\mu R\) before movement/limiting condition is established; conserving momentum across a time interval with a significant external force.

**Exam-use cue:** **“Find the tension/acceleration”** usually needs simultaneous \(F=ma\) equations before elimination. Name which equation belongs to which body.$md$),
  ('mathematics', 'A2', '6.4 Statics of a particle and moments', 'statics-of-a-particle-and-moments-6-4', $md$Assessed on: M1; rigid-body statics is extended in M2.$md$, 604, $md$**Assessed on:** M1; rigid-body statics is extended in M2.

For a particle in equilibrium, \(\sum F_x=0\) and \(\sum F_y=0\). Include weight, reaction, tension, thrust and friction on the diagram. A moment about a point is force \(\times\) perpendicular distance. For equilibrium under coplanar parallel forces, take moments about a convenient point and keep clockwise/anticlockwise signs consistent.

*Micro-example.* A 20 N vertical force acts 0.5 m from a pivot at right angles to the rod. Its moment magnitude is \(10\,\mathrm{N\,m}\); label whether it is clockwise or anticlockwise.

**Common errors:** using the length to a force rather than the **perpendicular** distance; omitting the reaction; taking moments about a point but including a force through that point as non-zero.

**Exam-use cue:** In equilibrium solutions, write both force balance and moment balance when the object is not a particle and non-parallel/positioned forces are involved.

---

# 7. M2: Mechanics 2 — IA2 application option

**Assessment position:** WME02/01; IAL Mathematics option only, and the M2 route requires M1. It assumes P1–P4 and M1. [2]$md$),
  ('mathematics', 'A2', '7.1 Projectile and vector kinematics', 'projectile-and-vector-kinematics-7-1', $md$Assessed on: M2.$md$, 701, $md$**Assessed on:** M2.

For projectile motion without air resistance, acceleration is \(-g\mathbf j\). Resolve initial velocity into horizontal and vertical components. Horizontal acceleration is zero; vertical motion has constant acceleration \(-g\). If position is \(\mathbf r(t)\), velocity \(\mathbf v=d\mathbf r/dt\), acceleration \(\mathbf a=d\mathbf v/dt\).

*Micro-example.* A particle launched at speed \(u\), angle \(\theta\), has \(x=u\cos\theta\,t\), \(y=u\sin\theta\,t-\frac12gt^2\). Solve \(y=0\) for flight time only after retaining the non-zero root.

**Common errors:** using one SUVAT equation across horizontal and vertical components with different accelerations; taking \(g\) positive after declaring up positive; discarding the required time root without contextual reason.

**Exam-use cue:** Start by writing \(\mathbf r\), \(\mathbf v\), and \(\mathbf a\) with unit vectors where the question is vector-based.$md$),
  ('mathematics', 'A2', '7.2 Centres of mass and lamina equilibrium', 'centres-of-mass-and-lamina-equilibrium-7-2', $md$Assessed on: M2.$md$, 702, $md$**Assessed on:** M2.

For discrete masses \(m_i\) at coordinates \((x_i,y_i)\),
\[
\bar x=\frac{\sum m_ix_i}{\sum m_i},\qquad \bar y=\frac{\sum m_iy_i}{\sum m_i}.
\]
For uniform composite laminae, mass is proportional to area; use component areas and their centroids, subtracting holes as negative areas. Use symmetry where valid. The M2 specification does not require integration to find centres of mass of plane laminae. [2]

*Micro-example.* Two masses, 2 kg at \(x=0\) and 3 kg at \(x=4\), have \(\bar x=(0+12)/5=2.4\) m.

**Common errors:** averaging positions without weights; forgetting to subtract a removed area; assuming symmetry where a hole breaks it.

**Exam-use cue:** Present a centroid table with component, mass/area, coordinate, and moment. It makes every sign auditable.$md$),
  ('mathematics', 'A2', '7.3 Work, energy and power', 'work-energy-and-power-7-3', $md$Assessed on: M2.$md$, 703, $md$**Assessed on:** M2.

Kinetic energy is \(\frac12mv^2\); gravitational potential energy change is \(mgh\). Work by a constant force is \(Fs\cos\theta\). Power is rate of work, \(P=\mathbf F\cdot\mathbf v\) for aligned/angle-aware force and velocity. With only conservative forces, mechanical energy is conserved. With resistance, include its negative work.

*Micro-example.* A 2 kg body rises 3 m: its GPE increase is \(2\times9.8\times3=58.8\) J. If resistance does 10 J of negative work, the energy equation must include it.

**Common errors:** using total height rather than change in vertical height; writing resistance as a positive gain; conserving mechanical energy when a non-conservative force is doing work.

**Exam-use cue:** Write an energy ledger from “initial” to “final,” with signs and named work terms, before substituting values.$md$),
  ('mathematics', 'A2', '7.4 Collisions and restitution', 'collisions-and-restitution-7-4', $md$Assessed on: M2.$md$, 704, $md$**Assessed on:** M2.

Momentum is a vector and is conserved for an isolated system. For a direct elastic impact, Newton’s law of restitution is
\[
e=\frac{\text{speed of separation}}{\text{speed of approach}},\qquad 0\le e\le1.
\]
Use signed velocities carefully when converting each speed phrase. The loss of mechanical energy due to impact may be required. M2 includes successive impacts and direct impacts with a smooth plane, not oblique plane impacts. [2]

*Micro-example.* If A approaches B at 6 m/s and B at 2 m/s in the same direction, speed of approach is \(6-2=4\) m/s—not 8 m/s.

**Common errors:** using signed relative velocity directly in the restitution ratio and obtaining negative \(e\); assuming kinetic energy is conserved for \(e<1\); applying momentum conservation to one particle rather than the system.

**Exam-use cue:** Write the momentum equation and restitution equation separately, then solve simultaneously. State the direction convention.$md$),
  ('mathematics', 'A2', '7.5 Statics of rigid bodies', 'statics-of-rigid-bodies-7-5', $md$Assessed on: M2.$md$, 705, $md$**Assessed on:** M2.

A rigid body in equilibrium satisfies \(\sum F_x=0\), \(\sum F_y=0\), and \(\sum M=0\). Problems may involve rods/ladders and smooth or rough walls/ground. Place reactions according to surface type: smooth reactions are normal to the surface; rough contacts may have friction along the surface.

*Micro-example.* For a ladder, choose moments about the foot to eliminate both unknown force components at the foot. Then use horizontal/vertical equilibrium to find them.

**Common errors:** putting wall reaction vertically on a vertical smooth wall; giving friction a direction not opposing impending slip; taking a moment arm parallel rather than perpendicular to its force.

**Exam-use cue:** Mark every contact force on the diagram before equations. Unknown directions may be assumed; a negative result reverses the assumed direction.

---

# 8. S1: Statistics 1 — IAS/IAL application option

**Assessment position:** WST01/01; optional application unit for IAS and IAL Mathematics. [2]

> **Statistics protocol.** Define events and random variables, preserve inequality symbols, and translate the numerical result back to the population/context. “Probability” answers should be between 0 and 1; correlation is not causation.$md$),
  ('mathematics', 'A2', '8.1 Statistical models and data summaries', 'statistical-models-and-data-summaries-8-1', $md$Assessed on: S1.$md$, 801, $md$**Assessed on:** S1.

A statistical model makes assumptions about data-generating behaviour; judge whether assumptions are reasonable. Interpret histograms, stem-and-leaf diagrams (including back-to-back) and box plots. Compare **location** (mean, median, mode) and **spread** (range, IQR, variance, standard deviation), and discuss skewness and specified outlier rules. Data may be grouped/ungrouped, discrete/continuous; understand coding transformations.

For frequencies, \(\bar x=\sum fx/\sum f\). Standard deviation is the positive square root of variance. IQR \(=Q_3-Q_1\).

*Micro-example.* If all values are coded \(Y=(X-10)/2\), then \(\bar X=2\bar Y+10\) and \(\mathrm{Var}(X)=4\mathrm{Var}(Y)\). Additive shifts do not change spread; scaling does.

**Common errors:** claiming a larger mean means more variable; using standard deviation instead of variance under a scale factor; reading frequency density as frequency on a histogram with unequal classes.

**Exam-use cue:** **“Compare”** requires both a comparative statistic and a contextual conclusion, usually one for centre and one for spread/shape.$md$),
  ('mathematics', 'A2', '8.2 Probability', 'probability-8-2', $md$Assessed on: S1; distributions and tests develop in S2.$md$, 802, $md$**Assessed on:** S1; distributions and tests develop in S2.

Use complements, unions, intersections and conditional probability:
\[
P(A')=1-P(A),\quad P(A\cup B)=P(A)+P(B)-P(A\cap B),
\]
\[
P(A\cap B)=P(A)P(B\mid A).
\]
Events are independent exactly when \(P(A\cap B)=P(A)P(B)\), equivalently \(P(B\mid A)=P(B)\) where defined. Use tree diagrams for sequential selections and Venn diagrams for set relationships.

*Micro-example.* If \(P(A)=0.6\), \(P(B)=0.5\), \(P(A\cap B)=0.2\), then \(P(A\cup B)=0.9\), and the events are not independent because \(0.2\ne0.3\).

**Common errors:** adding probabilities for non-exclusive events without subtracting the overlap; treating independence as mutual exclusivity; failing to update denominators for “without replacement.”

**Exam-use cue:** **“Given that”** signals conditional probability. Define it as a fraction over the restricted event space before calculation.$md$),
  ('mathematics', 'A2', '8.3 Correlation and regression', 'correlation-and-regression-8-3', $md$Assessed on: S1.$md$, 803, $md$**Assessed on:** S1.

A scatter plot suggests direction/strength/form of association. The product moment correlation coefficient \(r\) measures linear association from \(-1\) to 1; it does not prove causation or guarantee useful extrapolation. The least-squares regression line of \(y\) on \(x\), \(y=a+bx\), predicts the **response** variable \(y\) from explanatory variable \(x\). Use it inside the observed \(x\)-range with care.

*Micro-example.* A line \(\hat y=1.2+0.8x\) predicts \(\hat y=5.2\) at \(x=5\). Say “estimated” and do not claim certainty.

**Common errors:** using the regression of \(x\) on \(y\) to predict \(y\); saying \(r=0\) means variables are unrelated in every possible non-linear sense; extrapolating far beyond data.

**Exam-use cue:** Use named variables in interpretation: “For each one-unit increase in [explanatory variable], predicted [response] increases by … on average.”$md$),
  ('mathematics', 'A2', '8.4 Discrete random variables', 'discrete-random-variables-8-4', $md$Assessed on: S1.$md$, 804, $md$**Assessed on:** S1.

A discrete random variable has countable values. Its probability function is \(p(x)=P(X=x)\), with non-negative probabilities summing to 1. Its cumulative distribution function is \(F(x_0)=P(X\le x_0)\). Compute
\[
E(X)=\sum xp(x),\quad E(X^2)=\sum x^2p(x),\quad \mathrm{Var}(X)=E(X^2)-[E(X)]^2.
\]
For \(Y=aX+b\), \(E(Y)=aE(X)+b\), \(\mathrm{Var}(Y)=a^2\mathrm{Var}(X)\). A discrete uniform variable taking consecutive equally likely integer values can be summarised by its mean and variance.

*Micro-example.* If \(P(X=0)=0.3\), \(P(X=1)=0.7\), then \(E(X)=0.7\), \(E(X^2)=0.7\), and \(\mathrm{Var}(X)=0.7-(0.7)^2=0.21\). The variance is small because the variable can only be 0 or 1.

**Common errors:** allowing probabilities not to sum to 1; using \(E(X)^2\) in place of \(E(X^2)\); forgetting that variance is scaled by \(a^2\), not \(a\).

**Exam-use cue:** Construct a table with columns \(x\), \(p(x)\), \(xp(x)\), \(x^2p(x)\). It prevents the common expectation/variance confusion.$md$),
  ('mathematics', 'A2', '8.5 The Normal distribution', 'the-normal-distribution-8-5', $md$Assessed on: S1; Normal approximations appear in S2.$md$, 805, $md$**Assessed on:** S1; Normal approximations appear in S2.

Write \(X\sim N(\mu,\sigma^2)\), where the second parameter is **variance**, not standard deviation. Standardise with \(Z=(X-\mu)/\sigma\), then use the supplied cumulative Normal table or approved calculator method. The Normal distribution is continuous, symmetric about \(\mu\), and probabilities at a single point are zero.

*Micro-example.* If \(X\sim N(50,4^2)\), then \(P(X<56)=P(Z<1.5)\). Use the table/calculator cumulative value for 1.5.

**Common errors:** standardising with variance 16 rather than \(\sigma=4\); reading a cumulative table as an upper-tail value without complementing; using \(P(X\le x)\) versus \(P(X<x)\) as a meaningful distinction for a continuous model.

**Exam-use cue:** Draw and shade the target region. This tells you whether to use \(\Phi(z)\), \(1-\Phi(z)\), or a difference of two cumulative probabilities.

---

# 9. S2: Statistics 2 — IA2 application option

**Assessment position:** WST02/01; IAL Mathematics option only, requiring S1. It also assumes specified Pure prerequisites. [2]$md$),
  ('mathematics', 'A2', '9.1 Binomial and Poisson distributions', 'binomial-and-poisson-distributions-9-1', $md$Assessed on: S2.$md$, 901, $md$**Assessed on:** S2.

Use \(X\sim B(n,p)\) when there is a fixed number \(n\) of independent trials, each with two outcomes and constant success probability \(p\). Then \(P(X=x)=\binom nxp^x(1-p)^{n-x}\), \(E(X)=np\), \(\mathrm{Var}(X)=np(1-p)\). Use \(X\sim\mathrm{Po}(\lambda)\) for counts in a fixed interval with independent events at constant mean rate: \(P(X=x)=e^{-\lambda}\lambda^x/x!\), mean and variance both \(\lambda\). Poisson counts add: independent \(\mathrm{Po}(\lambda_1)\) and \(\mathrm{Po}(\lambda_2)\) sum to \(\mathrm{Po}(\lambda_1+\lambda_2)\).

Poisson may approximate \(B(n,p)\) when \(n\) is large, \(p\) is small, using \(\lambda=np\). Judge appropriateness in context; do not quote a rule without considering the model.

*Micro-example.* A count averages 1.5 per minute. Over four minutes, \(X\sim\mathrm{Po}(6)\), not \(\mathrm{Po}(1.5)\). The interval is four times as long.

**Common errors:** using binomial when number of trials is not fixed; treating Poisson as a probability rather than count distribution; substituting \(np\) for both binomial mean and variance; failing to complement for “at least.”

**Exam-use cue:** Before calculation, write a one-sentence model justification and the distribution with parameters. It earns clarity and exposes wrong parameter scaling.$md$),
  ('mathematics', 'A2', '9.2 Continuous random variables and distributions', 'continuous-random-variables-and-distributions-9-2', $md$Assessed on: S2.$md$, 902, $md$**Assessed on:** S2.

A continuous random variable is described by a probability density function (pdf) \(f(x)\), with \(f(x)\ge0\) and total area 1. Probability is area:
\[
P(a<X\le b)=\int_a^b f(x)\,dx.
\]
Its cumulative distribution function is \(F(x)=P(X\le x)=\int_{-\infty}^x f(t)\,dt\), and \(f(x)=dF/dx\). For a continuous variable, \(P(X=a)=0\). Find \(E(X)=\int xf(x)\,dx\), \(E(X^2)=\int x^2f(x)\,dx\), and variance by \(E(X^2)-[E(X)]^2\). Obtain the mode from the maximum density; median/quartiles from the appropriate cumulative probabilities.

For \(X\sim U(a,b)\), \(f(x)=1/(b-a)\) on \([a,b]\), \(E(X)=(a+b)/2\), \(\mathrm{Var}(X)=(b-a)^2/12\).

*Micro-example.* If \(f(x)=kx\) for \(0\le x\le2\), normalization gives \(1=\int_0^2kx\,dx=2k\), so \(k=1/2\). Then \(P(X<1)=\int_0^1x/2\,dx=1/4\).

**Common errors:** setting \(f(x)=1\) at a point as a probability; failing to find the normalising constant; using an invalid range in the integral; confusing pdf height with probability.

**Exam-use cue:** **“Find \(k\)”** means integrate the pdf over its full support and set equal to 1. State the support whenever you write the function.$md$),
  ('mathematics', 'A2', '9.3 Normal approximations and continuity correction', 'normal-approximations-and-continuity-correction-9-3', $md$Assessed on: S2.$md$, 903, $md$**Assessed on:** S2.

For a binomial approximation, use \(N(np,np(1-p))\) when appropriate. For a Poisson approximation, use \(N(\lambda,\lambda)\) when appropriate. Apply a **continuity correction** because a discrete count is represented by a continuous interval: \(P(X\le k)\approx P(Y<k+0.5)\); \(P(X\ge k)\approx P(Y>k-0.5)\); \(P(X=k)\approx P(k-0.5<Y<k+0.5)\).

*Micro-example.* If a count is approximated by \(Y\), then \(P(X\ge10)\approx P(Y>9.5)\), not \(P(Y\ge10)\).

**Common errors:** applying correction in the wrong direction; using \(np\) as the standard deviation; approximating without checking/contextualising suitability.

**Exam-use cue:** Draw integer bars and the continuous boundary marks \(k\pm0.5\) before standardising.$md$),
  ('mathematics', 'A2', '9.4 Sampling and hypothesis tests', 'sampling-and-hypothesis-tests-9-4', $md$Assessed on: S2.$md$, 904, $md$**Assessed on:** S2.

Know population, census, sample, sampling unit and sampling frame. A census aims at every population member; a sample is faster/cheaper but can be biased or subject to sampling variation. A **statistic** is calculated from a sample; its sampling distribution describes its variation across samples.

A hypothesis test begins with \(H_0\) (null model) and \(H_1\) (alternative). Set a significance level, identify a test statistic/distribution under \(H_0\), determine the critical region or p-value, then decide whether to reject \(H_0\). A one-tailed test has directional \(H_1\); a two-tailed test has \(H_1\) using \(\ne\). S2 tests a binomial parameter \(p\) and Poisson mean; binomial tests may use a Normal approximation. [2]

*Micro-example workflow.* To test whether a coin has become biased toward heads: \(H_0:p=0.5\), \(H_1:p>0.5\). If 18 heads are observed in 25 tosses, calculate \(P(X\ge18\mid X\sim B(25,0.5))\). Reject \(H_0\) at the stated level only if this tail probability/critical-region result warrants it.

**Common errors:** writing \(H_0:p\ne0.5\); making a conclusion about the sample rather than the population/model; saying “accept \(H_0\)” instead of “do not reject \(H_0\)”; selecting the wrong tail.

**Exam-use cue:** Write in this order: parameter, \(H_0/H_1\), distribution under \(H_0\), observed statistic, critical region/p-value, decision at stated level, contextual conclusion.

---

# 10. D1: Decision Mathematics 1 — IAS/IAL application option

**Assessment position:** WDM11/01; optional application unit for IAS and IAL Mathematics. Pearson requires clearly shown algorithm application. Matrix representation is required, but matrix manipulation is not. [2]

> **D1 protocol.** Algorithms are marks on paper. Keep a trace table, show interim labels/sets/routes, and state why a result is optimal or only a bound. Do not replace a prescribed algorithm with an unexplained calculator answer.$md$),
  ('mathematics', 'A2', '10.1 Algorithms: bin packing, sorting and binary search', 'algorithms-bin-packing-sorting-and-binary-search-10-1', $md$Assessed on: D1.$md$, 1001, $md$**Assessed on:** D1.

An **algorithm** is a finite ordered procedure. Follow supplied flowchart/text notation exactly. Know bin packing, bubble sort, quick sort and binary search. In quick sort, Pearson specifies choosing the **middle item** as pivot; use the official D1 middle-item convention: position \((N+1)/2\) for odd \(N\), \((N+2)/2\) for even \(N\). [2]

*Bubble-sort trace.* For \([4,1,3]\), pass 1: compare 4,1 \(\to[1,4,3]\); compare 4,3 \(\to[1,3,4]\). A final pass with no swaps confirms sorted order.

Binary search works only on an ordered list: compare target with middle, discard the half that cannot contain it, repeat. Bin packing assigns objects to containers under capacity constraints; state the rule used and count bins.

**Common errors:** binary-searching an unsorted list; choosing an arbitrary quick-sort pivot; hiding passes; claiming first-fit packing is necessarily optimal.

**Exam-use cue:** **“Apply”** means show each pass, partition or midpoint. **“Explain”** asks for the decision rule, not merely the outcome.$md$),
  ('mathematics', 'A2', '10.2 Network algorithms: spanning trees and shortest paths', 'network-algorithms-spanning-trees-and-shortest-paths-10-2', $md$Assessed on: D1.$md$, 1002, $md$**Assessed on:** D1.

A graph has vertices/nodes joined by edges/arcs. A weighted network has edge weights. A **tree** is connected with no cycles; a **spanning tree** includes all vertices; a **minimum spanning tree** (MST) has least total weight. Use Prim’s or Kruskal’s algorithm; Prim may use matrix representation. Dijkstra’s algorithm finds shortest paths from a chosen source in non-negative networks by permanently labelling the nearest temporary node and updating tentative distances.

*Dijkstra trace template.* Record columns: node, temporary label, predecessor, permanently labelled order. When an edge to a new node is considered, compare the proposed total with its current temporary label and keep the smaller one.

**Common errors:** forming a cycle in Kruskal/Prim; changing a permanent Dijkstra label; reporting a shortest distance without reconstructing the route where requested.

**Exam-use cue:** For an MST, count \(V-1\) accepted edges for \(V\) vertices. For Dijkstra, retain predecessors so the actual path can be traced backwards.$md$),
  ('mathematics', 'A2', '10.3 Route inspection and travelling salesperson problems', 'route-inspection-and-travelling-salesperson-problems-10-3', $md$Assessed on: D1.$md$, 1003, $md$**Assessed on:** D1.

The route-inspection/Chinese-postman problem seeks a shortest closed route that traverses every edge at least once. Identify odd vertices, pair them using the least added distances, duplicate the corresponding shortest paths, then find an Eulerian route in the augmented network. D1 networks have up to four odd nodes for this task. [2]

For travelling salesperson problems, distinguish a feasible tour, an upper bound (from a tour such as nearest neighbour) and a lower bound (often MST-based). In the classical complete network, respect the triangle inequality. Nearest neighbour is a heuristic, not an automatic optimum.

*Micro-example.* If a network has exactly two odd vertices A and B, the postman route must include an extra traversal joining A and B along a shortest A–B path; add that path length to the original edge total.

**Common errors:** pairing odd vertices by straight-line visual closeness rather than shortest network distance; calling an upper bound the optimum; failing to return to the start in a tour.

**Exam-use cue:** Label every total explicitly: “lower bound,” “route length/upper bound,” or “optimal (bounds equal).”$md$),
  ('mathematics', 'A2', '10.4 Critical path analysis', 'critical-path-analysis-10-4', $md$Assessed on: D1.$md$, 1004, $md$**Assessed on:** D1.

Represent a project as an activity-on-arc network from a precedence table; dummies may be needed. Perform a forward pass for earliest event times and backward pass for latest event times. Determine earliest/latest starts and finishes and **total float**. Activities of zero total float form the critical path; its duration is the project duration. Use Gantt/cascade charts for schedule interpretation.

*Micro-example trace.* Forward pass: earliest event time = maximum of predecessor earliest time + activity duration. Backward pass: latest event time = minimum of successor latest time − activity duration. Use max forward, min backward—never the reverse.

**Common errors:** using minimum in the forward pass; missing dummy dependencies; treating a zero-float activity as critical without confirming the start-to-finish connected path.

**Exam-use cue:** Work in a structured table (activity, duration, ES, EF, LS, LF, float). State the critical path with arrow/activity sequence and total duration.$md$),
  ('mathematics', 'A2', '10.5 Linear programming', 'linear-programming-10-5', $md$Assessed on: D1.$md$, 1005, $md$**Assessed on:** D1.

Define decision variables, translate constraints into linear inequalities including non-negativity, draw the feasible region, and optimize the objective by testing vertices. The ruler method locates intersections graphically; the vertex method evaluates the objective at every feasible vertex. If the context requires integer values, evaluate feasible nearby integer points rather than reporting an impossible fractional production plan.

*Micro-example.* Maximise \(P=3x+2y\) subject to \(x+y\le4\), \(x\le3\), \(x,y\ge0\). Test feasible vertices \((0,0),(3,0),(3,1),(0,4)\); the largest value is at \((3,1)\), \(P=11\).

**Common errors:** shading the wrong side of a boundary; omitting \(x,y\ge0\); testing a non-feasible intersection; failing to enforce integer conditions.

**Exam-use cue:** **“Formulate”** means define variables, objective and all inequalities in context. **“Optimise”** requires a vertex table and a contextual conclusion with units.

---

# 11. Formulae, notation and method quick-reference

Pearson supplies a *Mathematical Formulae and Statistical Tables* booklet in the examinations, but the specification names formulae students are expected to know and not necessarily find there. Use the official booklet during timed practice; do not assume every desirable formula is printed. [2] [4]$md$),
  ('mathematics', 'A2', '11.1 Core Pure formulae and triggers', 'core-pure-formulae-and-triggers-11-1', $md$| Topic | Essential recall | Trigger / check | |---|---|---| | Quadratic | (x=(-bpmsqrt{b^2-4ac})/(2a)); (Delta=b^2-4ac) | (Delta) tells number of real roots; denominator is 2a. | | Lines | (y-y_1=m(x-x_1)); perpendicular gradients multiply to (-1) | Vertical/horizontal cases need direct handling. | | Triangle/radians | sine/cosine rules; (A=frac12absin C); (s=rtheta); sector ($md$, 1101, $md$| Topic | Essential recall | Trigger / check |
|---|---|---|
| Quadratic | \(x=(-b\pm\sqrt{b^2-4ac})/(2a)\); \(\Delta=b^2-4ac\) | \(\Delta\) tells number of real roots; denominator is **2a**. |
| Lines | \(y-y_1=m(x-x_1)\); perpendicular gradients multiply to \(-1\) | Vertical/horizontal cases need direct handling. |
| Triangle/radians | sine/cosine rules; \(A=\frac12ab\sin C\); \(s=r\theta\); sector \(=\frac12r^2\theta\) | Sector angle must be radians. |
| AP/GP | \(u_n=a+(n-1)d\), \(S_n=\frac n2[2a+(n-1)d]\); \(u_n=ar^{n-1}\), \(S_\infty=a/(1-r)\) | Only use \(S_\infty\) if \(|r|<1\). |
| P2/P3 trig | \(\sin^2x+\cos^2x=1\); double/addition formulae | Keep the requested interval visible. |
| Derivatives | product, quotient, chain; \((e^{kx})'=ke^{kx}\), \((\ln x)'=1/x\) | Chain factor is mandatory. |
| Integrals | \(\int f'/f=\ln|f|+C\); integration by parts \(\int u\,dv=uv-\int v\,du\) | Add \(+C\) for indefinite integrals. |
| Parametrics | \(dy/dx=(dy/dt)/(dx/dt)\) | Find both parameter and gradient for a tangent. |
| Binomial series | \((1+x)^n=1+nx+\frac{n(n-1)}2x^2+\cdots\) | Rational-power series requires \(|x|<1\). |
| Vectors | \(\mathbf a\cdot\mathbf b=|\mathbf a||\mathbf b|\cos\theta\) | Dot product 0 gives perpendicular only for non-zero vectors. |$md$),
  ('mathematics', 'A2', '11.2 Applied formulae and notation', 'applied-formulae-and-notation-11-2', $md$| Route | Essential recall | Interpretation check | |---|---|---| | M1 kinematics | (v=u+at), (s=ut+frac12at^2), (v^2=u^2+2as) | All variables refer to same body/interval/sign convention. | | M1/M2 mechanics | (summathbf F=mmathbf a), (p=mv), impulse (=Delta p), moment = force × perpendicular distance | Draw all forces; set axis and direction before signs. | | M2 energy | (KE=f$md$, 1102, $md$| Route | Essential recall | Interpretation check |
|---|---|---|
| M1 kinematics | \(v=u+at\), \(s=ut+\frac12at^2\), \(v^2=u^2+2as\) | All variables refer to same body/interval/sign convention. |
| M1/M2 mechanics | \(\sum\mathbf F=m\mathbf a\), \(p=mv\), impulse \(=\Delta p\), moment = force × perpendicular distance | Draw all forces; set axis and direction before signs. |
| M2 energy | \(KE=\frac12mv^2\), \(\Delta PE=mg\Delta h\), \(P=\mathbf F\cdot\mathbf v\) | Include resistance/external work with sign. |
| M2 impacts | \(e=\) separation speed / approach speed | Use speeds in the ratio; signed velocities in momentum equation. |
| S1 data | \(\bar x=\sum fx/\sum f\), \(IQR=Q_3-Q_1\) | Interpret context; do not just calculate. |
| S1 probability | \(P(A\cap B)=P(A)P(B\mid A)\) | Independence is a testable condition, not a visual claim. |
| S1 RV | \(\mathrm{Var}(X)=E(X^2)-E(X)^2\) | \(E(X)^2\ne E(X^2)\). |
| S1 Normal | \(Z=(X-\mu)/\sigma\) | Second Normal parameter is variance \(\sigma^2\). |
| S2 Binomial | \(X\sim B(n,p)\), mean \(np\), variance \(np(1-p)\) | fixed \(n\), independent trials, constant \(p\). |
| S2 Poisson | \(X\sim\mathrm{Po}(\lambda)\), mean = variance = \(\lambda\) | Scale \(\lambda\) to the stated time/space interval. |
| S2 continuous | \(P(a<X\le b)=\int_a^bf(x)dx\), \(f=F'\) | Total pdf area = 1; a single point has zero probability. |
| S2 tests | \(H_0\), \(H_1\), test statistic, critical region/p-value | Conclude on the population/model at the stated level. |$md$),
  ('mathematics', 'A2', '11.3 Calculator, tables and accuracy', 'calculator-tables-and-accuracy-11-3', $md$- Use radian mode for calculus/radian-trigonometry work and degree mode only when the question uses degrees. Check the display before beginning. - Preserve unrounded values in calculator memory or written working. Round only at the final requested stage. - Use the supplied statistical tables/official formula booklet in practice exactly as in the exam. The formula booklet contai$md$, 1103, $md$- Use **radian mode** for calculus/radian-trigonometry work and degree mode only when the question uses degrees. Check the display before beginning.
- Preserve unrounded values in calculator memory or written working. Round only at the final requested stage.
- Use the supplied statistical tables/official formula booklet in practice exactly as in the exam. The formula booklet contains mathematical formulae, statistical tables and random numbers; it is provided for the IAL Mathematics assessments. [4]
- A calculator root/solve function is a check or an efficient numerical tool, but show the equation/model and ensure the answer lies in the requested interval/domain.

---

# 12. Paper-by-paper final checklists and command words

## P1 final checklist

- Can I manipulate indices/surds and solve linear, quadratic and graphical inequalities with correct restrictions?
- Can I sketch basic polynomial, reciprocal and trig graphs with asymptotes/transforms?
- Can I move between line forms and identify perpendicular/parallel gradients?
- Can I use triangle/radian formulae in the correct angular mode?
- Can I form tangent/normal equations and integrate to a curve using a given point?

**High-yield command strategy:** **“Sketch”** means features first: intercepts, turning points, asymptotes, period/domain. **“Find the equation”** means complete form plus substitution check. **“Hence”** tells you to exploit the previous result.

## P2 final checklist

- Can I distinguish proof, exhaustion and a counterexample?
- Can I use the Factor/Remainder Theorems and algebraic division accurately?
- Can I select AP/GP formulae and state the GP convergence condition?
- Can I solve trig equations across a specified interval, not just find a principal value?
- Can I use integration for signed/total area and execute the trapezium rule?

**High-yield command strategy:** **“Prove”** requires a logical chain; **“show that”** demands visible substitution/working; **“estimate”** needs the specified numerical method, with units/accuracy.

## P3 final checklist

- Can I state a function’s domain/range, find an inverse, and preserve exclusions after cancellation?
- Can I use identities/compound-angle form and choose correct trig branches?
- Can I differentiate composite products/quotients and recognize reverse-chain integrals?
- Can I construct/explain an exponential model and a log-linear plot?
- Can I show a root bracket and a transparent iteration trace?

**High-yield command strategy:** **“State”** calls for no derivation but an exact, unambiguous answer; **“verify”** asks for substitution; **“use iteration”** demands successive values, not an isolated decimal.

## P4 final checklist

- Can I write a contradiction proof with a clearly stated conflicting assumption?
- Can I decompose proper/improper rational functions and use the right repeated-factor template?
- Can I differentiate/integrate parameter and implicit expressions, including geometry at a parameter value?
- Can I choose substitution, by parts or partial fractions and show the setup?
- Can I solve line/vector problems with separate parameters and dot-product reasoning?

**High-yield command strategy:** **“Hence”** often directs you to reuse a decomposition or result; **“obtain an expansion”** needs terms in ordered powers and a validity condition; **“show that”** means do not merely quote the given target.

## M1 final checklist

- Can I draw force diagrams with weight/reaction/tension/friction correctly directed?
- Can I set and maintain one sign convention in SUVAT and \(F=ma\)?
- Can I distinguish moving friction \(F=\mu R\) from static \(F\le\mu R\)?
- Can I choose a system for momentum and a point for moments?

**High-yield command strategy:** **“Model”** invites an assumption/limitation; **“find”** needs a labelled equation chain; **“show that”** means retain exact physical units and do not round early.

## M2 final checklist

- Can I split projectile motion into horizontal/vertical equations or use vector differentiation?
- Can I use weighted moments for centre of mass and subtract a hole/component correctly?
- Can I make a signed energy/work ledger?
- Can I write both momentum and restitution equations for a collision?
- Can I solve rigid-body equilibrium with forces and moments?

**High-yield command strategy:** **“Determine whether”** needs a criterion and conclusion; **“deduce”** expects a short logical use of established results; always contextualise time, speed and length with units.

## S1 final checklist

- Can I compare distributions by both typical value and spread/shape?
- Can I choose union/intersection/conditional/independence formulae from wording?
- Can I distinguish correlation from causation and prediction from extrapolation?
- Can I create \(x,p,xp,x^2p\) tables and standardise a Normal variable correctly?

**High-yield command strategy:** **“Interpret”** means sentence in context; **“comment on”** needs a model/data judgement, not only a number; **“estimate”** must acknowledge prediction and range limitations.

## S2 final checklist

- Can I justify B, Po or continuous models and write parameters exactly?
- Can I normalise a pdf and derive/use its cdf?
- Can I apply a correct continuity correction?
- Can I distinguish census/sample/frame and articulate sampling limitations?
- Can I carry a full hypothesis test through to the population conclusion?

**High-yield command strategy:** **“Test at the 5% level”** requires hypotheses, distribution, tail, critical region/p-value, decision and conclusion. **“Appropriate?”** requires assumptions tied to the context.

## D1 final checklist

- Can I trace prescribed sorting/searching/packing algorithms and identify the middle/pivot convention?
- Can I show every label update in Prim/Kruskal/Dijkstra?
- Can I distinguish a route-inspection optimum from TSP upper/lower bounds?
- Can I complete forward/backward passes and identify float/critical path?
- Can I formulate, graph and optimise an LP with integer restriction where needed?

**High-yield command strategy:** **“Apply the algorithm”** means show the intermediate state after each step. **“Find a lower bound”** is not “find an optimum.” **“Formulate”** requires words-to-variables-to-inequalities before graphing.

---

# 13. Compact study sequence

Use a loop of **learn → mixed retrieval → timed questions → error repair**, rather than postponing practice until every topic is covered. Adjust sequence to your entered optional pair.

| Phase | Focus | Evidence of readiness |
|---|---|---|
| 1. Build Pure base | P1 algebra/graphs/lines/trig, then differentiation/integration | Solve short non-calculator-style algebra exactly; explain each graph feature. |
| 2. Complete IAS Pure | P2 proof, polynomials, circles, series, logs, trig, calculus applications | One mixed P1/P2 set with a corrected error log. |
| 3. Build your IAS applied unit | M1 **or** S1 **or** D1, following its section sequence | A one-page formula/process sheet and a timed unit section. |
| 4. Advance to IA2 Pure | P3 functions/trig/calculus/numerical methods, then P4 calculus/vectors | Alternate P3/P4 problems with prerequisite questions deliberately mixed in. |
| 5. Add IA2 application only if entered | M2 after M1; S2 after S1; no extra unit if your route is M1+D1 | Explain every model/hypothesis/algorithm aloud before calculating. |
| 6. Consolidate | Timed unit papers, formula-book practice, targeted reattempts | Error log shows a corrected method and a future trigger for each mistake. |
| 7. Final fortnight | Route-specific papers under 90-minute conditions; light retrieval of prerequisites | Consistent timing, complete conclusions, no recurring presentation errors. |

> **Minimal weekly rhythm.** Use two short retrieval sessions for formulae/definitions, two focused topic sessions, one mixed-problem session, and one timed/marked session. After marking, re-solve only the failed steps without notes before reading a solution.

---

# 14. Sources and specification notes

**Specification status and coverage.** The assessed content in this pack follows the official Pearson *International Advanced Level Mathematics/Further Mathematics/Pure Mathematics Specification*, Issue 3 (April 2019), specifically P1–P4, M1–M2, S1–S2 and D1. The document is a combined Mathematics/Further Mathematics/Pure Mathematics specification; this pack intentionally covers only the units that can contribute to **Pearson Edexcel IAL Mathematics**, not FP1–FP3, M3 or S3. [2]

**Current assessment/entry note.** Pearson’s current 2026/27 International Qualifications Information Manual confirms cash-in codes **XMA01** and **YMA01**, the exact required unit combinations, and the listed unit availability for Oct 2026, Jan 2027 and Jun 2027. It also notes that cash-in must be entered for an award and that unit results can be banked. Availability and entry rules are administrative information, so learners must **verify on their entry** with their centre and the newest Pearson manual. [3]

**Formula-book note.** Pearson’s official *Mathematical Formulae and Statistical Tables* is supplied in assessments. This pack deliberately lists only high-value formulae/method triggers and does not reproduce the booklet as a substitute. Practise locating formulae and tables in the official booklet. [4]

**Official sources**

[1]: https://qualifications.pearson.com/en/qualifications/edexcel-international-advanced-levels/mathematics-2018.html "Pearson Edexcel International Advanced Levels Mathematics (2018) qualification page"
[2]: https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Mathematics/2018/Specification-and-Sample-Assessment/international-a-level-maths-spec.pdf "Pearson Edexcel International Advanced Level Mathematics, Further Mathematics and Pure Mathematics Specification, Issue 3, April 2019"
[3]: https://qualifications.pearson.com/content/dam/pdf/Support/Information-manual/4-international-a-level-2026-2027.pdf "Pearson Qualifications International Advanced A Level Information Manual 2026/27"
[4]: https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Mathematics/2018/Specification-and-Sample-Assessment/IAL-Mathematics-Formula-Book.pdf "Pearson Edexcel International Advanced Subsidiary/Advanced Level Mathematical Formulae and Statistical Tables, Issue 2"$md$),
  ('physics', 'AS', '2.1 Waves, superposition and standing waves', 'waves-superposition-and-standing-waves-2-1', $md$Assessed in: Unit 2; wave ideas recur in Units 4 and 5.$md$, 201, $md$**Assessed in:** Unit 2; wave ideas recur in Units 4 and 5.

A wave transfers energy and information, not a net transfer of matter. Amplitude is maximum displacement from equilibrium; frequency `f` is cycles per second; period `T = 1/f`; wavelength `λ` is the shortest distance between points in phase; speed is `v = fλ`. A transverse wave oscillates perpendicular to travel direction. A longitudinal wave consists of pressure/density compressions and rarefactions, with molecular displacement parallel to travel direction.

**Superposition** says resultant displacement is the vector/algebraic sum of individual displacements. Coherent sources have constant phase difference and same frequency. Path difference `Δx` relates to phase difference: `Δφ/2π = Δx/λ`. Constructive interference occurs at `nλ`; destructive interference at `(n + 1/2)λ`. A stationary wave forms from equal-frequency, equal-amplitude travelling waves in opposite directions. Nodes have zero displacement; antinodes have maximum displacement. There is no net energy transfer along an ideal stationary wave.

For a stretched string, `v = √(T/μ)`, where `T` is tension and `μ` is mass per unit length. For the fundamental of a string fixed at both ends, `L = λ/2`; higher harmonics fit additional half-wavelengths.

At a boundary, a travelling wave can be reflected and transmitted; the amplitudes depend on the media. In **pulse–echo** imaging/ranging, time delay gives distance `d = vt/2`; the factor two accounts for outward and return paths. Spatial detail is limited by wavelength, while the ability to distinguish echoes close together is limited by pulse duration.

**Micro-example.** Two in-phase waves arrive with path difference `0.75 m`, wavelength `0.30 m`: `Δx/λ = 2.5`, therefore the waves are in antiphase and destructively interfere.

**Common errors.** Calling node-to-node distance one wavelength—it is `λ/2`; confusing molecular motion with wave motion; omitting that sources need coherence for a stable interference pattern.

> **Exam-use cue:** For a longitudinal-wave graph, state whether vertical axis is particle displacement or pressure before identifying phase; the two descriptions are offset.$md$),
  ('physics', 'AS', '2.2 Intensity, refraction, diffraction and polarisation', 'intensity-refraction-diffraction-and-polarisation-2-2', $md$Assessed in: Unit 2.$md$, 202, $md$**Assessed in:** Unit 2.

Intensity is power per unit area: `I = P/A`; for an isotropic point source spreading over a sphere, `I = P/(4πr²)`. Refraction is direction change due to speed change at a boundary; frequency is unchanged. Refractive index `n = c/v` and Snell’s law is `n₁ sin θ₁ = n₂ sin θ₂`, with angles measured to the normal. Total internal reflection requires travel from higher `n` to lower `n` and incidence angle greater than critical angle `c`, for which `sin c = 1/n` when the second medium is air.

To determine refractive index of a solid, trace a narrow ray through a transparent block, draw normals, measure several incidence/refraction angle pairs and use `n = sin i/sin r` (air to block), or determine the critical angle with a semicircular block. Avoid a single angle and thick pencil lines; a spread of angles lets anomalous readings be identified.

Plane polarisation restricts transverse oscillations to one plane; its observation supports a transverse-wave model. **Diffraction** is spreading at a gap or obstacle; spreading is prominent when gap size is comparable with `λ`. Huygens’ construction treats each point on a wavefront as a source of secondary wavelets. For a grating, `nλ = d sin θ`; `d` is line spacing, not lines per metre (if density is `N`, `d = 1/N`).

**Micro-example.** A 600 lines mm⁻¹ grating gives `d = 1/(600 × 10³) = 1.67 × 10⁻⁶ m`. First-order angle for `λ = 500 nm` has `sin θ = 0.300`, hence `θ ≈ 17.5°`.

**Common errors.** Measuring refraction angle to surface; using a critical-angle formula with degrees/radians incorrectly set; placing a grating order in the denominator; stating that polarisation proves all waves are transverse.$md$),
  ('physics', 'AS', '2.3 Matter waves, photons and atomic line spectra', 'matter-waves-photons-and-atomic-line-spectra-2-3', $md$Assessed in: Unit 2; nuclear/particle contexts develop in Unit 4.$md$, 203, $md$**Assessed in:** Unit 2; nuclear/particle contexts develop in Unit 4.

Electron diffraction demonstrates wave behaviour: de Broglie wavelength is `λ = h/p`. Light also has photons of energy `E = hf`. The photoelectric effect is emission of electrons when an individual photon transfers sufficient energy. The **work function** `φ` is the minimum energy required to release an electron; threshold frequency `f₀ = φ/h`. Above threshold, `hf = φ + 1/2 mvmax²`. Increasing intensity above threshold raises photon number/rate and hence photoelectron rate; increasing frequency raises photon energy and maximum electron kinetic energy.

An electronvolt is energy gained by charge `e` across `1 V`: `1 eV = 1.60 × 10⁻¹⁹ J`. Atomic energy levels are discrete. An electron moving down a level difference emits a photon with `hf = ΔE`; absorption needs a photon matching a permitted gap, explaining line spectra.

The models developed because no one model accounts for every observation: reflection/refraction/diffraction/interference are efficiently described by waves, whereas photoelectric emission and discrete energy transfer require photons. Do not write that light “changes its nature”; choose the model that predicts the observation.

**Micro-example.** For a metal with `φ = 2.0 eV`, a `3.0 eV` photon gives maximum kinetic energy `1.0 eV`, provided the photon is absorbed by a surface electron.

**Common errors.** Saying a more intense low-frequency beam eventually ejects electrons below threshold; treating photon energy as dependent on intensity; using `E = hc/λ` but forgetting to convert nm to m.

> **Exam-use cue:** Contrast claims need both models: diffraction/interference for wave evidence, photoelectric effect for photon/particle evidence.$md$),
  ('physics', 'AS', '2.4 Charge, current, p.d. and resistance', 'charge-current-p-d-and-resistance-2-4', $md$Assessed in: Unit 2; foundations for Unit 4 circuits and fields.$md$, 204, $md$**Assessed in:** Unit 2; foundations for Unit 4 circuits and fields.

Current is rate of charge flow, `I = ΔQ/Δt`; conventional current is direction of positive charge movement. Potential difference is energy transferred per charge, `V = W/Q`. Resistance is `R = V/I`; Ohm’s law is the special case `I ∝ V` at constant temperature. Charge conservation explains equal current entering and leaving a junction; energy conservation explains p.d. changes around a complete circuit.

Resistors in series have `Rtotal = R₁ + R₂ + …`. For parallel branches, `1/Rtotal = 1/R₁ + 1/R₂ + …`; the total is less than the smallest branch resistance. Electrical power is `P = VI = I²R = V²/R`, and energy `W = VIt`. Resistivity is material property: `R = ρL/A`. Microscopic current relation is `I = nqAv`, where `n` is carrier number density, `q` charge per carrier, `A` area and `v` drift speed.

An ohmic conductor has a straight `I–V` line through origin. A filament bulb’s resistance rises as it heats. An NTC thermistor has resistance falling with temperature; a diode conducts strongly in its forward direction after its turn-on p.d. An LDR’s resistance falls as illumination raises number of conduction electrons.

**Micro-example.** A `12 V` supply drives `2.0 A` through a heater: `P = 24 W`; energy in three minutes is `24 × 180 = 4.32 kJ`.

**Common errors.** Reading the gradient of an `I–V` graph as resistance—it is `1/R`; using cross-sectional area in mm² without conversion to m²; calling emf the terminal p.d. while current flows.$md$),
  ('physics', 'AS', '2.5 Potential dividers, emf and internal resistance', 'potential-dividers-emf-and-internal-resistance-2-5', $md$Assessed in: Unit 2.$md$, 205, $md$**Assessed in:** Unit 2.

For two series resistors across supply `Vin`, the p.d. across `R₂` is `Vout = Vin × R₂/(R₁ + R₂)`. A potential divider converts a change in resistance into an output-p.d. change. State exactly which component is across the output before predicting direction. A uniform wire’s potential falls linearly with distance along it when current is steady.

**Emf** is energy supplied per unit charge by a source. Internal resistance `r` causes lost volts `Ir`; terminal p.d. is `V = ε − Ir`, so a graph of terminal p.d. against current has intercept `ε` and gradient `−r`.

**Micro-example.** A `9.0 V` divider has `Rfixed = 2.0 kΩ` and `Rthermistor = 8.0 kΩ`, with output across the thermistor. `Vout = 9.0 × 8/(2 + 8) = 7.2 V`. If an NTC thermistor heats, its resistance falls, so this output falls.

**Common errors.** Using the thermistor change without defining output position; treating emf as a force; writing `V = ε + Ir` when the cell delivers current.

---

# Unit 3 — Practical Skills I (WPH13/01) — IAS

**Assessed in:** Unit 3 only, using practical competence developed mainly through Units 1 and 2. It is a written paper, not a laboratory assessment. It assesses planning, implementation/measurement and processing results. [1]$md$),
  ('physics', 'AS', '3.1 Plan an experiment that can answer the question', 'plan-an-experiment-that-can-answer-the-question-3-1', $md$Name the independent variable (deliberately changed), dependent variable (measured), and every control variable with how it is controlled. Specify apparatus with appropriate resolution/range: for example, use a micrometer (0.01 mm) for wire diameter rather than a ruler. Explain zero/calibration checks. Describe repeats and a suitable range. Address a genuine hazard with a speci$md$, 301, $md$Name the independent variable (deliberately changed), dependent variable (measured), and every control variable with how it is controlled. Specify apparatus **with appropriate resolution/range**: for example, use a micrometer (0.01 mm) for wire diameter rather than a ruler. Explain zero/calibration checks. Describe repeats and a suitable range. Address a genuine hazard with a specific control—not a generic “wear goggles”. Finally say how data give the target quantity: graph axes, expected line/curve, and how gradient/intercept supplies the answer.

Where an IAS planning question asks for wider implications, make a balanced, physics-linked point: state a benefit or risk, identify who/environment is affected, and link it to a mechanism or evidence. For example, a medical imaging technique can diagnose non-invasively but exposure/energy deposition must be controlled; this is stronger than simply writing “it is useful”.

**Original planning trace — resistivity.** Measure wire diameter at several positions/orientations using a zero-checked micrometer; calculate `A = πd²/4`. Clamp a fixed length `L`, use ammeter in series and voltmeter across wire, vary `L`, take repeated `V/I` values so `R` is found. Plot `R` against `L`; gradient is `ρ/A`, therefore `ρ = gradient × A`. Keep material and temperature stable; use low current/switch off between readings to limit heating.

**Common errors.** “Keep temperature constant” without a method; insufficient range; repeats called “more accurate” (they improve reliability/precision); proposing a different experiment rather than a change linked to a stated limitation.$md$),
  ('physics', 'AS', '3.2 Implement and process IAS data', 'implement-and-process-ias-data-3-2', $md$Read an analogue scale from eye level to reduce parallax; record a digital resolution honestly; use consistent decimal places. Identify an anomalous point only after checking, then repeat rather than deleting it automatically. Graph axes require a plotted variable and unit; use most of the grid; draw a best-fit line/curve rather than joining points; use a large triangle for gra$md$, 302, $md$Read an analogue scale from eye level to reduce parallax; record a digital resolution honestly; use consistent decimal places. Identify an anomalous point only after checking, then repeat rather than deleting it automatically. Graph axes require a plotted variable and unit; use most of the grid; draw a best-fit line/curve rather than joining points; use a large triangle for gradient. Give final values to a justified number of significant figures.

For a single reading, absolute uncertainty is usually half the instrument resolution. From repeats, estimate uncertainty as half range. Percentage uncertainty is `absolute uncertainty / measured value × 100%`. Unit 3 expects these individual percentage uncertainties but **not compound percentage uncertainty**; that is explicit in Unit 6.

> **Exam-use cue:** Separate **precision** (repeatability/small spread) from **accuracy** (closeness to accepted value) and **resolution** (smallest readable increment). A better resolution can reduce uncertainty; it does not automatically remove systematic error.

### IAS core practical experience checklist

| # | Practical thread to recognise | Key analysis / risk / limitation |
|---:|---|---|
| 1 | Free-fall acceleration | Light gates/timing; measure distance carefully; release without push. |
| 2 | Falling-ball viscosity | Terminal region and laminar-flow condition; temperature control. |
| 3 | Young modulus | Small diameter uncertainty dominates area; avoid exceeding elastic limit. |
| 4 | Speed of sound with two-beam oscilloscope | Measure microphone separation and time delay/phase accurately. |
| 5 | Vibrating string/wire | Alter one of length, tension, `μ` at a time; identify resonance. |
| 6 | Laser diffraction grating | Laser safety; convert line density; measure screen distance/fringe displacement. |
| 7 | Electrical resistivity | Low current limits heating; use `R–L` gradient and averaged diameter. |
| 8 | Cell emf and internal resistance | `V–I` graph: intercept emf, magnitude of gradient internal resistance. |

---
# Unit 4 — Further Mechanics, Fields and Particles (WPH14/01) — IA2

> **A2 distinction.** Unit 4 extends IAS ideas: momentum becomes two-dimensional and impulse-based; force fields and particle interactions require vector direction and conservation. The paper may be synoptic with Units 1–2. [1]$md$),
  ('physics', 'A2', '4.1 Further mechanics: impulse, collisions and circular motion', 'further-mechanics-impulse-collisions-and-circular-motion-4-1', $md$Assessed in: Unit 4; builds on Unit 1.$md$, 401, $md$**Assessed in:** Unit 4; builds on Unit 1.

Impulse is force times time and equals momentum change: `FΔt = Δp`. It is the area under a force–time graph. In two dimensions conserve momentum separately along two perpendicular axes. A collision is **elastic** if kinetic energy as well as momentum is conserved; it is inelastic if kinetic energy decreases, though momentum remains conserved in an isolated system. For non-relativistic particles, `Ek = p²/(2m)`.

Angular displacement may be in degrees or radians; one revolution is `2π rad`. Angular velocity `ω = 2π/T = 2πf`; linear speed `v = ωr`. Circular motion needs a resultant inward (centripetal) force: `a = v²/r = rω²`, `F = mv²/r = mrω²`. Centripetal force is not an extra force category; it is the name of the resultant inward force, supplied by tension, gravity, friction, normal reaction, or electric/magnetic force.

**Micro-example.** A `0.50 kg` object travels in a `2.0 m` circle at `6.0 m s⁻¹`. Required inward resultant `F = 0.50 × 36/2.0 = 9.0 N`. If a string supplies it, tension is 9.0 N only if no other radial force component exists.

**Common errors.** Conserving momentum as a scalar in a two-dimensional collision; calling all collisions “elastic” because momentum is conserved; adding a fictitious outward force in an inertial-frame free-body diagram; mixing rpm, Hz and rad s⁻¹.

> **Exam-use cue:** Resolve before conserving. A momentum vector diagram must have arrows and labelled directions; do not determine a final angle from magnitudes alone.$md$),
  ('physics', 'A2', '4.2 Electric fields and capacitance', 'electric-fields-and-capacitance-4-2', $md$Assessed in: Unit 4.$md$, 402, $md$**Assessed in:** Unit 4.

An electric field is a region where a charge experiences force. Field strength `E = F/Q`. Coulomb’s law for point charges is `F = Q₁Q₂/(4πε₀r²)`, and field due to a point charge is `E = Q/(4πε₀r²)`. The direction is away from a positive source charge and toward a negative source charge. Field lines show force direction on a positive test charge; closer lines indicate stronger field. Equipotentials are lines/surfaces of constant potential and meet field lines at right angles.

Potential is energy per charge. In a uniform field, magnitude `E = V/d`. In a radial field, `V = Q/(4πε₀r)`. Do not confuse potential `V` (scalar) with electric field `E` (vector); in a radial field, the change of potential per distance depends on position.

Capacitance `C = Q/V` is charge stored per p.d. Energy stored is `W = 1/2 QV = 1/2 CV² = Q²/(2C)`: it is the triangular area under a `V–Q` graph. During discharge through a resistor, `Q`, `V` and `I` fall exponentially with time constant `RC`: `Q = Q₀e^(−t/RC)`, and equivalent forms for `V` and `I`. A graph of `ln V` against `t` has gradient `−1/RC`.

**Micro-example.** A `220 μF` capacitor charged to `12 V` stores `W = 1/2 × 220×10⁻⁶ × 12² = 1.58×10⁻² J`. With `R = 10 kΩ`, `RC = 2.2 s`; after one time constant, voltage is about `0.37V₀`, not zero.

**Common errors.** Writing `F = QE` but assigning field direction rather than force direction for a negative charge; missing micro (`10⁻⁶`); treating a time constant as the time to fully discharge; using capacitor steady-state behaviour as if current continues in a d.c. circuit.$md$),
  ('physics', 'A2', '4.3 Magnetism and electromagnetic induction', 'magnetism-and-electromagnetic-induction-4-3', $md$Assessed in: Unit 4.$md$, 403, $md$**Assessed in:** Unit 4.

Magnetic flux density `B` characterises a field; its unit is tesla. Magnetic flux `Φ` through area is `BA cos θ` for a uniform field (angle to normal), and flux linkage is `NΦ`. A charge moving in a magnetic field experiences `F = BQv sin θ`; a current-carrying wire has `F = BIL sin θ`. Use Fleming’s **left-hand** rule for motor-force direction: first finger field (N→S), second conventional current, thumb force. Force is zero if motion/current is parallel to field.

A moving charge subjected to a perpendicular magnetic force follows a circle because `BQv = mv²/r`, so `r = p/(BQ)` for a non-relativistic particle. The magnetic force does no work: it changes direction but not speed/kinetic energy.

An induced emf arises when flux linkage changes. Increase the number of turns, field strength, coil area or rate of relative motion to increase induced emf. Faraday–Lenz law is `ε = −d(NΦ)/dt`; the minus sign says induced effects oppose the change that creates them. For mutual induction, changing current in one coil changes flux linking another.

**Micro-example.** A `0.20 m` wire carries `3.0 A` perpendicular to `0.50 T`: `F = BIL = 0.30 N`. Reversing current reverses force; doubling both `B` and `I` makes force four times as large.

**Common errors.** Using right-hand generator rule for a motor-force request; measuring angle to field when formula expects angle between conductor/current and field—state it; saying Lenz’s law opposes the field rather than the **change** in flux.$md$),
  ('physics', 'A2', '4.4 Nuclear structure, accelerators and particle model', 'nuclear-structure-accelerators-and-particle-model-4-4', $md$Assessed in: Unit 4; nuclear decay is Unit 5.$md$, 404, $md$**Assessed in:** Unit 4; nuclear decay is Unit 5.

Nucleon (mass) number `A` is protons + neutrons; proton (atomic) number `Z` is protons. Large-angle alpha scattering showed that most atom volume is empty and positive charge/mass are concentrated in a tiny nucleus. Thermionic emission releases electrons from a heated metal. Electric fields accelerate charged particles; magnetic fields bend their paths. A linac uses successive electric-field acceleration; a cyclotron uses alternating electric fields with magnetic deflection. Detectors use ionisation and/or deflection principles at this level.

Particle interactions must conserve charge, total energy and momentum. Pair creation/annihilation uses `ΔE = Δmc²`. High energies are required to probe small nucleon structure: shorter de Broglie wavelength gives greater resolution. Use `MeV`, `GeV`, `MeV c⁻²`, `GeV c⁻²` appropriately; know that `1 eV = 1.60×10⁻¹⁹ J`. At very high speeds, an observed particle lifetime can be longer because of relativistic time dilation; no relativistic equation is required.

When interpreting **particle tracks**, use curvature direction and charge sign in a known magnetic field, radius for momentum magnitude, ionisation/track character where given, and conservation at vertices. Do not infer a particle identity from one visual feature alone.

The standard quark–lepton model classifies baryons (three quarks, such as proton/neutron), mesons (quark + antiquark, such as pion), leptons (fundamental, e.g. electron/neutrino) and photons. Each particle has an antiparticle. Test possible interactions by conserving **charge, baryon number and lepton number** as well as energy/momentum.

**Micro-example.** In `p → p + π⁰`, charge is `+1 → +1 + 0` and baryon number `+1 → +1 + 0`; these two counts allow it, but an exam’s full context still requires energy–momentum feasibility. For `e⁻ + e⁺ → γ + γ`, total charge remains zero and the two photons allow momentum conservation in the centre-of-mass frame.

**Common errors.** Calling an electron a nucleon; using `r = mv/BQ` without unit-consistent momentum; deciding an interaction is allowed from charge alone; confusing antiparticle charge reversal with arbitrary mass change.

---

# Unit 5 — Thermodynamics, Radiation, Oscillations and Cosmology (WPH15/01) — IA2$md$),
  ('physics', 'A2', '5.1 Thermal energy, internal energy and ideal gases', 'thermal-energy-internal-energy-and-ideal-gases-5-1', $md$Assessed in: Unit 5.$md$, 501, $md$**Assessed in:** Unit 5.

Heating without change of state gives `ΔE = mcΔθ`, where `c` is specific heat capacity. A phase change gives `ΔE = mL`, where `L` is specific latent heat. Internal energy is the random distribution of kinetic and potential energy among particles. During melting/boiling of a pure substance at constant pressure, added energy predominantly changes intermolecular potential energy, so temperature can stay constant.

Absolute zero is `0 K`; it is the extrapolated temperature at which ideal-gas particle random kinetic energy is minimal. Convert `T/K = θ/°C + 273.15`. For an ideal gas, `pV = NkT`; `N` is number of molecules, not moles. Mean kinetic energy satisfies `1/2 m⟨c²⟩ = 3/2 kT`. Thus a higher temperature means larger mean kinetic energy and rms speed, not identical speeds for all particles.

**Micro-example.** Heating `0.50 kg` of water by `10 K` with `c = 4200 J kg⁻¹ K⁻¹` needs `21 000 J`. If supplied at `100 W` with no losses, time is `210 s`; in practice, explain why heat loss makes time longer.

**Common errors.** Using Celsius in `pV = NkT`; calling internal energy only kinetic energy; using latent-heat equation through a temperature rise; treating “average kinetic energy” as `1/2 mv²` for one particular molecule.$md$),
  ('physics', 'A2', '5.2 Nuclear binding energy and radioactive decay', 'nuclear-binding-energy-and-radioactive-decay-5-2', $md$Assessed in: Unit 5; particle ideas from Unit 4 are synoptic.$md$, 502, $md$**Assessed in:** Unit 5; particle ideas from Unit 4 are synoptic.

A nucleus has less mass than its separated nucleons; this **mass deficit** corresponds to binding energy: `ΔE = Δmc²`. Binding energy per nucleon indicates stability. Fusion of light nuclei and fission of very heavy nuclei release energy because products move toward higher binding energy per nucleon. Fusion needs extreme temperature and density to overcome electrostatic repulsion and sustain enough collisions.

Alpha is a helium nucleus: strongly ionising, short range, stopped by paper/air. Beta-minus is an electron from nuclear transformation: medium ionisation/range, stopped by thin aluminium. Gamma is high-frequency electromagnetic radiation: weakly ionising but penetrating, reduced by thick lead/concrete. Background radiation must be measured for the same time and subtracted from measured count rate/activity.

Decay is spontaneous and random for individual nuclei but predictable statistically. Activity `A = λN`; `dN/dt = −λN`; `λ = ln2/t½`; `N = N₀e^(−λt)` and `A = A₀e^(−λt)`. A semi-log plot linearises exponential decay: `ln A = ln A₀ − λt`.

**Micro-example.** Detector count is `480` counts in 60 s and background is `60` counts in 60 s. Corrected count rate = `(480 − 60)/60 = 7.0 s⁻¹`; do not subtract 60 from a rate.

**Common errors.** Saying decay is caused by external conditions; confusing count rate with total counts; failing to balance both `A` and `Z` in nuclear equations; treating gamma as a particle with mass/charge.$md$),
  ('physics', 'A2', '5.3 Simple harmonic motion, damping and resonance', 'simple-harmonic-motion-damping-and-resonance-5-3', $md$Assessed in: Unit 5.$md$, 503, $md$**Assessed in:** Unit 5.

A system is in SHM when its acceleration/force is proportional to displacement from equilibrium and directed toward equilibrium: `F = −kx`, `a = −ω²x`. For displacement `x = A cos ωt`, velocity `v = −Aω sin ωt`, acceleration `a = −Aω² cos ωt`, `T = 1/f = 2π/ω`. Maximum speed is at equilibrium; maximum magnitude of acceleration is at endpoints. For a mass–spring system, `T = 2π√(m/k)`; for a small-angle simple pendulum, `T = 2π√(l/g)`.

The gradient of an `x–t` graph is velocity; the gradient of a `v–t` graph is acceleration. In an undamped oscillator, energy swaps between kinetic and elastic/gravitational potential stores at constant total. Damping transfers energy to surroundings and reduces amplitude. A free oscillation follows its natural frequency. A forced oscillation is driven externally. **Resonance** is maximum response when driving frequency equals (or is near) natural frequency; more damping gives a lower, broader peak. Plastic deformation in ductile structures dissipates energy and reduces amplitude.

**Micro-example.** A `0.40 kg` mass on `100 N m⁻¹` spring has `T = 2π√(0.40/100) = 0.397 s`. Increasing the mass makes `T` larger by a square-root relation—not directly proportional.

**Common errors.** Missing the negative sign in SHM condition; calling amplitude a peak-to-peak distance; using spring equation for a pendulum; stating damping changes natural frequency substantially without qualification.$md$),
  ('physics', 'A2', '5.4 Gravitational fields, stellar physics and cosmology', 'gravitational-fields-stellar-physics-and-cosmology-5-4', $md$Assessed in: Unit 5; compares with Unit 4 electric fields.$md$, 504, $md$**Assessed in:** Unit 5; compares with Unit 4 electric fields.

A gravitational field is a region where mass experiences force. `g = F/m`; Newton’s universal gravitation is `F = Gm₁m₂/r²`; field due to a point mass is `g = GM/r²`; radial gravitational potential is `Vgrav = −GM/r`. Gravitational field is always attractive and acts on mass, whereas electric field can attract/repel and acts on charge. For a circular orbit, set gravity equal to centripetal resultant, e.g. `GMm/r² = mv²/r`.

A black body is an ideal absorber/emitter. Higher-temperature black-body curves have greater peak intensity and shorter peak wavelength. Luminosity `L = σAT⁴`; Wien: `λmaxT = 2.898×10⁻³ m K`; received intensity `I = L/(4πd²)`. Distance methods include trigonometric parallax for nearer stars and standard candles of known luminosity for farther ones. A Hertzsprung–Russell diagram plots luminosity against surface temperature; relate main sequence, giants/supergiants and white dwarfs to stellar evolution.

Doppler shift for electromagnetic radiation gives `z = Δλ/λ ≈ Δf/f ≈ v/c` at non-relativistic speeds. Redshift indicates recession. For cosmological distances, `v = H₀d`. The measured Hubble constant affects inferred age/fate, and dark matter is a proposed/observed-gravitational influence in this discussion.

**Micro-example.** If a spectral line shifts from `500.0 nm` to `500.5 nm`, `z = 0.5/500.0 = 1.0×10⁻³`; recession speed ≈ `3.0×10⁵ km s⁻¹ × 10⁻³ = 300 km s⁻¹`.

**Common errors.** Using altitude above surface instead of centre-to-centre distance in `GM/r²`; treating gravitational potential as positive; confusing luminosity (source power) with received intensity; deciding a redshift is simply “evidence light has slowed down”.

---

# Unit 6 — Practical Skills II (WPH16/01) — IA2

**Assessed in:** Unit 6 only, based on experimental skills developed through Units 4–5 as well as prior skills. It is a written paper. Its planning/implementation/analysis headings look like Unit 3 but demand more appropriate apparatus detail, possible logarithmic graphs and **correct compounding** of percentage uncertainties. [1]$md$),
  ('physics', 'A2', '6.1 A2 practical planning and implementation', 'a2-practical-planning-and-implementation-6-1', $md$Use the Unit 3 plan structure, but make the quantitative detail fit the physics. For example, specify a data logger sampling rate for a rapidly changing voltage, or a pressure sensor range for a gas investigation. State a calibration/zero check, independent/dependent/control variables, repeats and range. Explain how each improvement reduces an identified uncertainty or systemat$md$, 601, $md$Use the Unit 3 plan structure, but make the quantitative detail fit the physics. For example, specify a data logger sampling rate for a rapidly changing voltage, or a pressure sensor range for a gas investigation. State a calibration/zero check, independent/dependent/control variables, repeats and range. Explain how each improvement reduces an identified uncertainty or systematic effect. Treat risk proportionately: gamma source work requires time–distance–shielding, safe storage and appropriate monitoring; hot apparatus requires cooling/thermal protection.

When criticising a method, distinguish between:

- **Random uncertainty:** changes readings unpredictably; reduce with repeats, averaging or a more sensitive instrument.
- **Systematic error:** shifts all readings similarly; reduce by calibration, zero correction, avoiding parallax or controlling a biased condition.
- **Resolution:** smallest change an instrument can read; choose a finer device only where it is sufficient and appropriate.
- **Accuracy:** closeness to accepted/true value; **precision:** small spread of repeats; **sensitivity:** output change per input change.

**Original planning trace — `p–V` gas relationship.** Fix mass of gas and temperature; use a gas syringe connected to pressure sensor. Vary volume over a broad safe range, wait for thermal equilibrium after each adjustment, take repeat pressure readings. Plot `ln p` against `ln V`. If `p ∝ Vⁿ`, gradient is `n`; a gradient near `−1` supports Boyle’s law. A slow adjustment and wait reduce temperature-change systematic effects; do not claim a syringe eliminates all leaks.$md$),
  ('physics', 'A2', '6.2 A2 analysis, log graphs and uncertainty', 'a2-analysis-log-graphs-and-uncertainty-6-2', $md$Use graph form deliberately. If `y = Axⁿ`, then `ln y = ln A + n ln x`: a `ln y` versus `ln x` graph has gradient `n` and intercept `ln A`. If `y = Ae^(−kt)`, then `ln y = ln A − kt`: a `ln y` versus `t` graph has gradient `−k`. A negative gradient on a log–log graph is a power law with negative exponent, not necessarily exponential decay.$md$, 602, $md$Use graph form deliberately. If `y = Axⁿ`, then `ln y = ln A + n ln x`: a `ln y` versus `ln x` graph has gradient `n` and intercept `ln A`. If `y = Ae^(−kt)`, then `ln y = ln A − kt`: a `ln y` versus `t` graph has gradient `−k`. A negative gradient on a log–log graph is a power law with negative exponent, not necessarily exponential decay.

For multiplication/division/powers, add percentage uncertainties, multiplying a percentage by the absolute power where relevant. For addition/subtraction, add absolute uncertainties. Quote an uncertainty at a sensible precision, normally one significant figure (two if first digit is 1 or 2), and match decimal places of value and absolute uncertainty.

**Micro-example.** `ρ = m/V`, where `m = 12.0 ± 0.1 g` and `V = 4.0 ± 0.2 cm³`. `% uncertainty in ρ = (0.1/12.0×100) + (0.2/4.0×100) = 0.8% + 5.0% = 5.8%`. The volume measurement dominates; improve it before chasing a much finer balance.

**Common errors.** Adding absolute uncertainties for a product; using only small triangles for gradient; passing best-fit line through every point; writing “human error”; concluding results are accurate merely because points are close together.

### A2 core practical experience checklist

| # | Practical thread to recognise | Key analysis / risk / limitation |
|---:|---|---|
| 9 | Force and change of momentum | Force–time area; adequate sampling rate/calibration. |
| 10 | ICT collision analysis | Two-dimensional velocity components; scale and frame rate. |
| 11 | Capacitor charge/discharge | `RC` and exponential/log analysis; high input resistance where suitable. |
| 12 | Thermistor potential-divider thermostat | Calibration curve; self-heating and controlled water-bath temperature. |
| 13 | Specific latent heat | Account for heat losses and initial sensible heating; electrical energy `VIt`. |
| 14 | Pressure–volume relation | Constant temperature; log–log gradient tests power law. |
| 15 | Gamma absorption in lead | Background correction, count time, inverse-square geometry, radiation safety. |
| 16 | Unknown mass from resonance | Driving frequency/amplitude, multiple known masses; plot a linearised relationship. |

---

# Paper checklists and command words

## Unit-by-unit final checklist

### WPH11/01 — Unit 1

- Can I choose and apply SUVAT only for constant one-dimensional acceleration, read every graph’s gradient/area, and split projectile motion into components?
- Can I make a force diagram, resolve it, apply `ΣF = ma`, and identify a genuine third-law pair?
- Can I conserve signed momentum, use perpendicular moment arms, and track energy/work/power with units?
- Can I distinguish force–extension from stress–strain, use Stokes’ law conditions, and calculate Young modulus/elastic energy?

### WPH12/01 — Unit 2

- Can I label phase/path difference and nodes/antinodes, apply `v = fλ`, and reason about stationary waves?
- Can I use Snell, critical angle and grating equations with angles to the normal and SI units?
- Can I explain photon evidence and calculate photoelectric/line-spectrum energy changes?
- Can I analyse series/parallel circuits, `I–V` shapes, potential dividers, and `V = ε − Ir`?

### WPH13/01 — Unit 3

- Can I create a fair, feasible plan that names apparatus resolution, controls, repeats, safety and graph method?
- Can I read instruments, use sensible significant figures, plot/interpret a graph and evaluate an anomaly?
- Can I calculate single-reading or half-range uncertainty and propose a specific improvement? Remember: Unit 3 does **not** require compound percentage uncertainty.

### WPH14/01 — Unit 4

- Can I conserve two perpendicular momentum components, use impulse as force–time area, and identify the inward resultant in a circle?
- Can I distinguish electric potential/field and calculate capacitor energy/exponential discharge?
- Can I choose the correct magnetic-field direction rule and explain induced emf using changing flux linkage?
- Can I balance particle equations and test charge, baryon and lepton number alongside energy/momentum?

### WPH15/01 — Unit 5

- Can I decide whether a thermal calculation uses `mcΔθ` or `mL`, and use kelvin in gas equations?
- Can I account for background radiation, write/balance nuclear equations and linearise exponential decay?
- Can I interpret SHM graphs, identify energy transfers, distinguish free/forced oscillation and resonance?
- Can I work fluently from field/orbit equations through black-body, stellar-distance and redshift evidence?

### WPH16/01 — Unit 6

- Can I specify most appropriate apparatus with range/resolution/dimensions and realistic control variables?
- Can I identify units/SF/outliers, choose linear or logarithmic axes, get a large-triangle gradient and interpret it physically?
- Can I distinguish accuracy, precision and sensitivity, and correctly **compound** percentage uncertainties?

## High-yield command-word strategy

| Command word | What earns credit |
|---|---|
| **Calculate / Determine** | Show equation → substituted values in SI → answer with unit and appropriate rounding. Check whether direction/sign is needed. |
| **Show that** | Work to at least one more significant figure than the stated result, then make the stated rounding visible. |
| **Derive** | Start from named relevant equation(s), substitute/eliminate symbolically, and show every algebra step needed to reach target. |
| **Explain** | Make a causal chain. Example: “temperature rises → lattice vibrations increase → more electron collisions → resistivity/resistance increases.” |
| **Describe** | Report what happens in a sequence or pattern; do not add an unsupported mechanism. |
| **Compare** | State at least one similarity **and** one difference, each linked to the named objects. |
| **Evaluate / Criticise** | Identify evidence-based strengths and limitations, then give feasible improvements that address those limitations. |
| **Sketch** | Use unscaled axes but label variables and decisive features: intercepts, asymptotes, peaks, sign/direction. |
| **Predict / Suggest** | Apply a principle to the new context and explain why; a plausible unsupported assertion is incomplete. |

Pearson’s taxonomy states, for example, that “show that” needs a calculation to at least one more significant figure, while “evaluate” requires evidence-based strengths, weaknesses and a supported judgement. [1]

---

# Formula, definitions and practical quick reference

## Essential formulae by theme

| Theme | Formulae and notation |
|---|---|
| Motion & dynamics | `v = u + at`; `s = ut + 1/2at²`; `v² = u² + 2as`; `ΣF = ma`; `W = mg`; `p = mv`; `impulse = FΔt = Δp`; `moment = Fd⊥`. |
| Energy & materials | `W = Fs cosθ`; `Ek = 1/2mv² = p²/2m`; `ΔEgrav = mgΔh`; `P = W/t`; `ηeff = useful/total`; `ρ = m/V`; `Fdrag = 6πηrv`; `stress = F/A`; `strain = ΔL/L`; `EYoung = stress/strain`; `Eel = 1/2Fx`. |
| Waves & photons | `v = fλ`; `vstring = √(T/μ)`; `I = P/A`; `n = c/v`; `n₁sinθ₁ = n₂sinθ₂`; `sin c = 1/n`; `nλ = d sinθ`; `λ = h/p`; `E = hf = hc/λ`; `hf = φ + 1/2mvmax²`. |
| Electricity | `I = Q/t`; `V = W/Q`; `R = V/I`; `P = VI = I²R = V²/R`; `R = ρL/A`; `I = nqAv`; `Vout = Vin R₂/(R₁+R₂)`; `V = ε − Ir`. |
| Fields/capacitance | `E = F/Q`; `F = Q₁Q₂/(4πε₀r²)`; `E = Q/(4πε₀r²)`; `E = V/d`; `V = Q/(4πε₀r)`; `C = Q/V`; `Wcap = 1/2QV = 1/2CV²`; `V = V₀e^(−t/RC)`. |
| Magnetism/particles | `F = BQv sinθ`; `F = BIL sinθ`; `ε = −d(NΦ)/dt`; `r = p/(BQ)`; `ΔE = Δmc²`. |
| Thermal/decay/SHM | `ΔE = mcΔθ`; `ΔE = mL`; `pV = NkT`; `1/2m⟨c²⟩ = 3/2kT`; `A = λN`; `λ = ln2/t½`; `N = N₀e^(−λt)`; `F = −kx`; `a = −ω²x`; `T = 2π√(m/k)`; `Tpendulum = 2π√(l/g)`. |
| Cosmology | `F = Gm₁m₂/r²`; `g = GM/r²`; `Vgrav = −GM/r`; `L = σAT⁴`; `λmaxT = 2.898×10⁻³ m K`; `I = L/(4πd²)`; `z = Δλ/λ ≈ v/c`; `v = H₀d`. |

## Definitions that need precise language

- **Accuracy:** closeness of a measurement to an accepted/true value.
- **Precision:** closeness of repeated measurements to one another.
- **Uncertainty:** interval around a result within which the true value is reasonably expected to lie.
- **Systematic error:** repeatable bias that shifts results in one direction.
- **Random error:** unpredictable variation that causes scatter.
- **Emf:** energy supplied by a source per unit charge.
- **Potential difference:** energy transferred per unit charge between points.
- **Electric field strength:** force per unit positive charge at a point.
- **Gravitational potential:** work done per unit mass in moving from infinity to a point; negative in an attractive radial field with zero at infinity.
- **Activity:** number of nuclear decays per second; unit becquerel, `Bq`.
- **Resonance:** largest steady response when driving frequency matches/approaches natural frequency.

## Practical calculation and data checklist

1. Convert prefixes before substitution: `m = 10⁻³`, `μ = 10⁻⁶`, `n = 10⁻⁹`, `M = 10⁶`, `G = 10⁹`.
2. Give every numerical answer a unit; express very large/small values in scientific notation where useful.
3. Round at the end. Measurements set significant figures; calculated values should not claim more precision.
4. Gradient uses values widely separated on the **line of best fit**, not necessarily data points.
5. In Unit 3, find percentage uncertainty for one reading with half-resolution or for repeats with half-range. In Unit 6, compound percentages for multiplication/division/powers.
6. For radioactive count data, convert counts to count rate if requested and subtract background measured over compatible time.

---

# Compact study sequence

| Phase | Focus | Retrieval target |
|---|---|---|
| **1. Build AS mechanics** | Unit 1 in order: motion → forces → conservation/energy → materials. | Draw one force diagram and one graph interpretation daily; explain every equation condition. |
| **2. Build AS waves/circuits** | Unit 2: wave language → optical phenomena → photons → circuits. | Alternate calculation sets with two short explanations; redraw `I–V` and field/optical diagrams from memory. |
| **3. Secure IAS practicals** | Unit 3 plus Core Practicals 1–8. | Plan one investigation, calculate uncertainty, and complete one graph/evaluation each week. |
| **4. Add A2 structure** | Unit 4: 2-D vectors/circular motion → fields/capacitors → magnetism → particles. | Make direction-rule and conservation checks automatic; revisit Unit 1–2 links weekly. |
| **5. Add A2 models** | Unit 5: thermal → nuclear → SHM → astrophysics. | Use a formula sheet from memory, then correct it against this pack; practise model comparisons. |
| **6. Finish practical/synoptic** | Unit 6 plus Core Practicals 9–16, then mixed-unit timed work. | Diagnose errors as knowledge, set-up, algebra, units, graph, or command-word failures and target the category. |

> **Final-week rule:** Do not only read notes. Cycle **closed-book recall → worked calculation → explanation in a novel context → correction**. The written practical units reward the same scientific thinking as the content papers.

---

# Sources and specification notes

This is original revision material written to organise the awarding body’s assessed content; it does not reproduce Pearson textbook content or past-paper questions. The authoritative content basis is Pearson’s *International Advanced Subsidiary/Advanced Level in Physics Specification*, **Issue 3, July 2021**. It gives the 2018 qualification code structure, unit content, assessment format, core practicals, data/uncertainty guidance and command-word taxonomy. [1]

**Current-status note.** Pearson’s current legacy page links to a new Physics (2027) qualification, which begins teaching in September 2027 and has IAS first certification in August 2028. Pearson’s published legacy/new science table says current-specification learners should complete it and cannot mix legacy/new units. The table currently lists legacy IAL availability through June 2029 as a resit; centres should verify the actual entry option/series at the time of entry. [2] [4] [5]

## References

[1]: https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Physics/2018/Specification%20and%20Sample%20Assessment/9781446957783_IAL_Physics_Iss3.pdf "Pearson Edexcel International Advanced Subsidiary/Advanced Level in Physics: Specification, Issue 3, July 2021"

[2]: https://qualifications.pearson.com/en/qualifications/edexcel-international-advanced-levels/physics-2018.html "Pearson Edexcel International Advanced Levels Physics (2018) qualification page"

[3]: https://qualifications.pearson.com/content/dam/pdf/Support/Information-manual/4-ial-2025-2026.pdf "Pearson Qualifications Information Manual 2025/26: International Advanced Levels"

[4]: https://qualifications.pearson.com/en/qualifications/edexcel-international-advanced-levels/chemistry-2027/key-dates.html "Pearson International Advanced Levels key dates: legacy 2018 and new 2027 sciences"

[5]: https://qualifications.pearson.com/en/qualifications/edexcel-international-advanced-levels/physics-2027.html "Pearson Edexcel International Advanced Levels Physics (2027) qualification page"$md$),
  ('computer-science', 'AS', '1. Information representation — AS Paper 1', 'information-representation-as-paper-1-1', $md$### 1.1 Data representation$md$, 100, $md$### 1.1 Data representation

**Know precisely.** A bit is one binary digit; a byte is normally eight bits. A **binary prefix** is a power of 2 (`1 KiB = 2^10 bytes`), whereas a decimal prefix is a power of 10 (`1 kB = 10^3 bytes`). Distinguish kibi/kilo, mebi/mega, gibi/giga and tebi/tera. Use binary, denary, hexadecimal, BCD, one’s complement and two’s complement; convert integer values among them. [1]

- **Unsigned n-bit range:** `0` to `2^n − 1`.  
- **n-bit two’s-complement range:** `−2^(n−1)` to `2^(n−1) − 1`. To negate a fixed-width positive binary number, invert its bits and add 1. An overflow occurs when a result is outside the representable range; for signed addition, adding two values with the same sign but getting the opposite sign signals overflow.
- **BCD** stores each denary digit separately as four bits. It is convenient where exact decimal digits matter (for example, a display or currency digit), but is storage-inefficient compared with pure binary. **Hexadecimal** compactly represents binary, especially addresses, machine code and colour values: one hex digit represents four bits.
- Character encoding maps characters to numeric binary codes. Be familiar with ASCII, extended ASCII and Unicode; do **not** attempt to memorise code points. Unicode supports far more characters than ASCII.

**Micro-calculation.** In 8-bit two’s complement, `0001 1010` is +26. Its negative is `1110 0101 + 1 = 1110 0110`, so `0001 1010 + 1110 0110 = 1 0000 0000`; discard the carry, leaving `0000 0000`. In 8 bits, +120 + +20 gives `0111 1000 + 0001 0100 = 1000 1100`: two positives produced a negative-pattern result, so it overflows.

**Common errors.** Calling `1 MB` and `1 MiB` identical; treating the carry-out alone as signed overflow; reversing a two’s-complement result with no fixed bit width; claiming Unicode is a single fixed-size encoding.

**Exam-use cues.** In conversion answers, label bases such as `101101₂ = 45₁₀ = 2D₁₆`. For “why BCD?”, give the specific benefit and the storage trade-off. For character questions, say **encoding/representation**, not “the computer stores letters”.

### 1.2 Multimedia: graphics and sound

A **bitmap** stores a grid of pixels; each pixel’s colour uses a chosen colour depth. Its header stores metadata. **Image resolution** is the number of pixels in the image; screen resolution is the display’s pixel grid. A **vector graphic** stores drawing objects and properties in a drawing list, so it scales cleanly but suits geometric objects better than detailed photographs. [1]

- Approximate uncompressed bitmap size in **bits**: `width × height × colour depth`; divide by 8 for bytes. Add a file header only if the question supplies/requires it.
- Higher resolution usually improves detail but increases file size. Higher colour depth usually gives smoother/more colours but increases size.
- Digital sound is made by **sampling** analogue sound. A higher **sampling rate** takes more measurements per second; higher **sampling resolution** uses more bits per sample. Both can improve fidelity but increase storage.
- Approximate uncompressed sound size in bits: `duration (s) × sampling rate (Hz) × sampling resolution (bits) × number of channels`.

**Micro-calculation.** A 640 × 480, 24-bit bitmap has `640 × 480 × 24 = 7 372 800` bits = `921 600` bytes before header/compression. A 2 s mono sound at 8 000 samples/s and 8 bits/sample is `2 × 8000 × 8 = 128 000` bits = 16 000 bytes.

**Common errors.** Dividing by 8 twice; omitting channels from a stereo audio calculation; claiming vectors are always smaller; confusing bit depth with resolution.

**Exam-use cues.** For a suitability justification, link **content + required quality/scalability + storage/editing**: a logo benefits from vector scaling; a photograph needs bitmap pixel detail.

### 1.3 Compression

Compression reduces storage and/or transmission requirements. **Lossless** compression permits exact reconstruction; **lossy** compression permanently removes information judged less important. Select based on whether exact recovery is essential, the media type and acceptable quality loss. [1]

**Run-length encoding (RLE)** replaces a run of identical values with value plus run length. Example: `AAAABCC` can be represented as `(A,4)(B,1)(C,2)`. It is effective only when long runs exist; detailed/noisy data can become no smaller or larger once markers are stored.

- Text and vector data often require lossless compression because an altered character/object can change meaning.  
- A bitmap or sound recording can use lossy compression where a smaller file and acceptable perceptual loss matter; lossless remains appropriate where original accuracy is required.

**Common errors.** Saying lossless “has no compression”; treating RLE as inherently lossy; omitting the reason for the selected method.

**Exam-use cues.** In “justify”, do not only name a method. State the file’s use, whether every original value must survive, and the storage/bandwidth consequence.

---$md$),
  ('computer-science', 'AS', '2. Communication — AS Paper 1', 'communication-as-paper-1-2', $md$### 2.1 Networks including the internet$md$, 200, $md$### 2.1 Networks including the internet

A network connects devices to share resources, data and services. A **LAN** spans a limited local area, often under one organisation’s control; a **WAN** spans a larger geographic area using communication links. A client requests a service; a server provides it. In peer-to-peer systems, peers can both request and provide resources. A thin client relies mainly on server processing; a thick client performs more locally. [1]

**Topology and infrastructure.** A bus shares one backbone; a star connects devices to a central device; a mesh provides multiple interconnections; a hybrid combines topologies. Trace packet paths using the stated topology. A star eases fault isolation but a central-device failure can affect the network; a mesh has redundancy but costs more cable/ports.

Know the role of: **NIC/WNIC** (network interface), **switch** (forwards within a LAN), **server** (provides service), **WAP** (wireless LAN access), **bridge** (connects LAN segments), **repeater** (regenerates signal) and **router** (forwards packets between networks using addressing/routing). Ethernet includes collision detection/avoidance concepts, including CSMA/CD. A collision-prone shared medium is checked before transmission; a detected collision makes devices wait/retry, reducing efficiency.

**Transmission and cloud.** Compare copper, fibre optic, radio/Wi‑Fi, microwaves and satellite by bandwidth, attenuation/interference, mobility, installation cost and latency. Cloud computing uses remotely hosted resources; public cloud shares provider infrastructure while private cloud is dedicated to an organisation. Benefits include scalable access and reduced local maintenance; drawbacks include dependence on connectivity, external control, cost and security/compliance concerns. Bit streaming may be real-time or on-demand; bit rate/broadband speed affects quality, buffering and delay.

**Internet and addressing.** The **internet** is the interconnected network infrastructure; the **WWW** is a hypertext service that runs over it. A modem, PSTN, dedicated line or cellular network can provide internet access. An IP address identifies an interface for routing. IPv4 uses 32 bits; IPv6 uses 128 bits. **Subnetting** separates a network into logical sub-networks. A public address is routable on the internet; a private address is for internal networks and normally needs controlled translation/gateway access. A static address stays assigned; a dynamic one can change.

A **URL** identifies a web resource, for example `https://learn.example.org:443/notes/a.html`: scheme/protocol, host/domain, optional port and path. **DNS** resolves a domain name to the needed IP address, so a client can route to the host.

**Micro-example.** A learner’s device requests a web page. DNS translates `learn.example.org` to an IP address; the router forwards packets towards that network; the server responds. If bandwidth is too low for a live video stream, playback may lower quality or buffer because it cannot receive data at the required rate.

**Common errors.** Calling a switch a router; defining the WWW as “all websites and the internet”; claiming a private IP is inherently encrypted; describing a topology without a context-based advantage and drawback.

**Exam-use cues.** Network “compare” answers need paired points: ownership/range for LAN vs WAN, or central dependency/redundancy for star vs mesh. For packet paths, name the actual devices and links rather than writing “data goes through the network”.

---$md$),
  ('computer-science', 'AS', '3. Hardware — AS Paper 1', 'hardware-as-paper-1-3', $md$### 3.1 Computers and their components$md$, 300, $md$### 3.1 Computers and their components

A computer needs **input**, processing/primary memory, **output**, and secondary storage. Primary memory is directly used while programs run; secondary storage is persistent. Removable storage is secondary storage that can be detached. An **embedded system** is dedicated to a particular control function: it can be efficient and reliable, but is less flexible to upgrade or repurpose. [1]

Know the principal operation and appropriate use of a laser printer, 3D printer, microphone, speakers, magnetic hard disk, solid-state/flash memory, optical reader/writer, touchscreen and VR headset. A **buffer** is temporary memory used to absorb a timing/rate mismatch, such as printer spooling or streaming.

- **RAM** is volatile working memory; **ROM** is non-volatile and stores fixed/firmware instructions.  
- **SRAM** stores data using flip-flop circuitry: faster and more expensive, often cache. **DRAM** stores charge and needs refresh: denser/cheaper, often main memory.  
- **PROM** is programmed once; **EPROM** can be erased (traditionally with UV); **EEPROM** is electrically erasable/reprogrammable.

A monitoring system collects sensor data and reports it; a control system compares measured data with a target and uses an **actuator** to change the environment. Sensors may detect temperature, pressure, infra-red or sound. **Feedback** is essential because it provides the current state for the next decision.

**Micro-example.** In a greenhouse controller, a temperature sensor reads 16 °C against a 20 °C target. The controller activates a heater (actuator), then reads temperature again. A temperature logger that merely records 16 °C is monitoring, not control.

**Common errors.** Calling RAM permanent storage; saying DRAM is faster because it has “dynamic” in its name; naming a sensor as an actuator; forgetting feedback in a control explanation.

**Exam-use cues.** A device-selection answer must name the **physical operation** and why it fits the scenario: flash storage is solid state and portable; a hard disk offers high capacity but has moving parts.

### 3.2 Logic gates and logic circuits

Know NOT, AND, OR, NAND, NOR and XOR/EOR (two-input gates except NOT). Build a truth table, logic expression or circuit from any of the other representations. [1]

| A | B | AND | OR | XOR | NAND | NOR |
|---:|---:|---:|---:|---:|---:|---:|
| 0 | 0 | 0 | 0 | 0 | 1 | 1 |
| 0 | 1 | 0 | 1 | 1 | 1 | 0 |
| 1 | 0 | 0 | 1 | 1 | 1 | 0 |
| 1 | 1 | 1 | 1 | 0 | 0 | 0 |

`NOT A` reverses A. Example expression: `Q = (A AND B) OR (NOT C)`. For `A=1, B=0, C=1`, `Q=(0) OR (0)=0`.

**Common errors.** Treating XOR as “one or both”; applying NOT to a whole expression when it applies to a single stated input; changing gate order while building a truth table.

**Exam-use cues.** Create columns for intermediate gate outputs in circuit-order. In an expression, use brackets to make grouping unambiguous.

---$md$),
  ('computer-science', 'AS', '4. Processor fundamentals — AS Paper 1', 'processor-fundamentals-as-paper-1-4', $md$### 4.1 CPU architecture$md$, 400, $md$### 4.1 CPU architecture

The Von Neumann model uses stored programs and data in memory. The CPU contains the **ALU** (arithmetic/logic), **CU** (coordinates execution), registers and clock. Know these registers: **PC** (address of next instruction), **MAR** (memory address in use), **MDR** (data/instruction transferred to/from memory), **CIR** (current instruction), **ACC** (working result), **IX** (offset/index) and **status register** (flags). General-purpose registers hold flexible values; special-purpose registers have defined roles. **IAS** refers to immediate-access/main store. [1]

- Address bus carries addresses (normally one direction from CPU); data bus carries data/instructions; control bus carries signals such as read/write and timing.  
- Performance depends on processor type/core count, bus width, clock speed and cache. Explain the particular bottleneck: more cores only help suitably parallel tasks; cache reduces average main-memory access; a wider bus can transfer more bits per cycle.
- USB, HDMI and VGA are ports/interfaces for peripherals/display connections.

**Fetch–execute trace (register-transfer notation).** A typical fetch is:

```text
MAR ← PC
MDR ← Memory[MAR]          // memory read
CIR ← MDR
PC ← PC + 1
Decode CIR; execute its operation
```

An interrupt may be caused by I/O completion, timer, hardware fault or user/device event. The CPU completes the appropriate current stage/instruction, saves the necessary context, transfers control to an **ISR**, then restores context and resumes. This lets urgent/asynchronous events be handled without constant polling.

**Common errors.** Putting data in MAR rather than its address; making CIR hold the next address; claiming clock speed alone determines performance; describing an interrupt as a program error only.

**Exam-use cues.** In a trace, write every changed register and label a memory read/write. In an interrupt answer, include **detect → save state → ISR → restore/resume**.

### 4.2 Assembly language

Assembly uses mnemonics that an assembler converts to machine code. A two-pass assembler first builds a symbol table by locating labels; it then substitutes/uses addresses and generates object code. Trace instructions carefully with a table containing PC/address, instruction, ACC, IX, flags/output and changed memory. [1]

Know instruction groups: data movement, input/output, arithmetic, unconditional/conditional branch and compare. Know addressing modes:

| Mode | Meaning | Example interpretation |
|---|---|---|
| Immediate | Operand is the value | `LDM #7` loads 7 into ACC. |
| Direct | Operand is the data address | `LDD 40` loads `Memory[40]`. |
| Indirect | Operand points to an address which points to data | `LDI 40` loads `Memory[Memory[40]]`. |
| Indexed | Address plus IX identifies data | `LDX 40` loads `Memory[40 + IX]`. |
| Relative | Displacement is relative to current location | Used for position-relative branches where stated. |

**Micro-trace.** Suppose `Memory[20]=7`, `Memory[21]=5`. `LDD 20; ADD 21; STO 22` leaves `ACC=12` and `Memory[22]=12`. `CMP #12; JPE Done` transfers only if the comparison is true.

**Common errors.** Loading an address when the mode asks for its contents; letting `CMP` alter ACC; ignoring a label’s address in pass one; treating `#` as a memory location.

**Exam-use cues.** State the addressing mode and resolve the effective address before fetching data. Do not invent instructions outside the instruction set given in the question.

### 4.3 Bit manipulation

A logical left/right shift introduces zeros. An arithmetic right shift preserves the sign bit for signed two’s-complement values; a cyclic shift rotates a bit out of one end into the other. Shifts can multiply/divide only under stated conditions; do not claim they preserve all signed values in every situation. [1]

A **bit mask** selects or alters particular bits: `value AND mask` tests selected bits; `value OR mask` sets selected bits; `value XOR mask` toggles selected bits. Example: `10110100 AND 00000100 = 00000100`, so bit 2 is set. A control register can store several device states in separate bits.

**Common errors.** Saying every right shift divides signed data safely; using OR to test; forgetting leading zeros in fixed-width work.

**Exam-use cues.** State the width and whether the shift is logical, arithmetic or cyclic. Write a mask in aligned binary before operating.

---$md$),
  ('computer-science', 'AS', '5. System software — AS Paper 1', 'system-software-as-paper-1-5', $md$### 5.1 Operating systems$md$, 500, $md$### 5.1 Operating systems

An **operating system (OS)** manages hardware/resources and provides services/interfaces for users and applications. Core management includes memory, files, security, hardware/I/O/peripherals and processes. Utility software supports maintenance: disk formatting, antivirus, defragmentation, disk analysis/repair, file compression and backup. [1]

A **program library** contains reusable routines. It reduces development time, may improve reliability and avoids rewriting tested code; a dynamic-link library can be linked when required, reducing duplication/update effort. It also creates version/dependency and trust considerations.

**Common errors.** Calling every application a utility; claiming an OS only provides a GUI; saying libraries eliminate testing.

**Exam-use cues.** For a task such as printing, explain OS coordination: application requests service, OS uses driver/scheduler and controls hardware access.

### 5.2 Language translators and IDEs

An **assembler** translates assembly language; a **compiler** translates a whole high-level source program into executable/object code before execution; an **interpreter** translates and executes instructions during running. A compiler often gives faster subsequent execution and distributes compiled code, but recompilation is needed after changes. An interpreter supports immediate execution/debugging but may be slower each run. Java may be both compiled to an intermediate form and interpreted/JIT executed. [1]

An **IDE** supports coding (including prompts), early/dynamic syntax checks, presentation/formatting and debugging (single stepping, breakpoints, watches/variables, expressions and reporting windows).

**Common errors.** Saying an interpreter permanently produces machine code; confusing compiler errors with run-time errors; claiming an IDE is itself a programming language.

**Exam-use cues.** A “justify compiler vs interpreter” answer must use the stated application, not a generic claim. For IDE debugging, link a breakpoint to inspecting state at a chosen line.

---$md$),
  ('computer-science', 'AS', '6. Security, privacy and data integrity — AS Paper 1', 'security-privacy-and-data-integrity-as-paper-1-6', $md$### 6.1 Data security$md$, 600, $md$### 6.1 Data security

**Security** protects systems/data from unauthorised access, change, destruction or interruption. **Privacy** concerns appropriate control of personal/sensitive information. **Integrity** means data remain accurate, complete and unaltered except by authorised processes. Protect both the computer system and the data. [1]

Controls include accounts, strong passwords, authentication (biometrics/digital signatures where relevant), firewall, anti-virus, anti-spyware, encryption and access rights. Threats include malware (virus/spyware), hackers, phishing and pharming. Select layered controls: anti-malware and patching reduce malware risk; a firewall filters traffic; user training/URL checking reduces phishing; permissions and encryption reduce exposure after unauthorised access.

**Micro-example.** A staff records system uses unique accounts and role-based access rights, encrypts data at rest and in transit, and keeps offline backups. A password alone does not prevent a deleted file; backup and permissions address different threats.

**Common errors.** Calling encryption authentication; claiming a firewall removes all malware; describing privacy as “keeping data correct”.

**Exam-use cues.** Name the threat, mechanism, and residual limitation. “Use a firewall” earns less than “filter unsolicited inbound traffic, reducing unauthorised network access, while endpoint malware controls remain necessary”.

### 6.2 Data integrity

**Validation** checks whether input is sensible/acceptable; it does not prove it is factually correct. **Verification** checks that copied/transferred data match the source. Use range, format, length, presence, existence, limit and check-digit validation; use visual or double entry on input, and parity (byte/block) or checksum on transfer. [1]

**Micro-example.** A membership age field may apply a range `0–120`; this accepts `25` but cannot prove the applicant is 25. Double entry compares two entered versions. A checksum recomputed at the receiver and compared with the sent checksum can signal corruption.

**Common errors.** Saying validation guarantees correct data; treating a lookup/existence check as a format check; asserting parity corrects any error.

**Exam-use cues.** Give the exact rule and the failure it catches. Identify validation vs verification before explaining it.

---$md$),
  ('computer-science', 'AS', '7. Ethics and ownership — AS Paper 1', 'ethics-and-ownership-as-paper-1-7', $md$### 7.1 Ethics and ownership$md$, 700, $md$### 7.1 Ethics and ownership

Professional computing ethics guide responsible decisions beyond mere legal compliance. Ethical membership/professional bodies such as BCS or IEEE promote standards of competence, honesty, privacy and public interest. Analyse both the likely stakeholder impact and the professional duty. [1]

Copyright protects creators’ works. Software licences determine permitted use/distribution/modification. Know free-software, open-source, shareware and commercial licensing, and choose according to access to source, redistribution/modification rights, trial/payment model, support and organisational need. AI applications bring social, economic and environmental effects as well as benefits; distinguish an application from an evaluation of its impact.

**Micro-example.** Releasing a medical decision tool without bias testing can harm groups through systematically unequal outcomes. An ethical response includes testing representative data, human review and clear accountability; “AI is bad” is not analysis.

**Common errors.** Equating open source with public domain; assuming legal means ethical; giving an AI benefit with no linked risk or mitigation.

**Exam-use cues.** In an ethics discussion, identify stakeholders, benefit, harm/risk, evidence/constraint and a reasoned conclusion.

---$md$),
  ('computer-science', 'AS', '8. Databases — AS Paper 1', 'databases-as-paper-1-8', $md$### 8.1 Database concepts$md$, 800, $md$### 8.1 Database concepts

A file-based system risks data duplication, inconsistency, isolated data, difficult sharing/querying and weak centrally managed integrity/security. A relational database stores related tables and uses keys/relationships to reduce these problems. Know: entity/table, record/tuple, field/attribute, candidate key, primary key, secondary key, foreign key, one-to-one, one-to-many, many-to-many, referential integrity and indexing. [1]

A primary key uniquely identifies each record; a foreign key refers to a valid related key, supporting **referential integrity**. An ER diagram names entities, attributes and relationship cardinalities. Resolve a many-to-many relationship using an associative/link table containing foreign keys.

**Normalisation.**

- **1NF:** fields contain atomic values; no repeating groups.  
- **2NF:** is in 1NF and every non-key attribute depends on the whole primary key (no partial dependency on part of a composite key).  
- **3NF:** is in 2NF and non-key attributes do not depend on other non-key attributes (no transitive dependency).

**Micro-example.** `Booking(BookingID, MemberID, MemberName, ClassID, ClassName)` repeats member/class facts. Separate `Member(MemberID, MemberName)`, `Class(ClassID, ClassName)` and `Booking(BookingID, MemberID, ClassID)`. Now non-key names depend on their own entity key, reducing update anomalies.

**Common errors.** Saying a foreign key is automatically unique; calling every identifier a primary key; stopping normalisation after splitting repeating groups; confusing a relationship with a field.

**Exam-use cues.** Show keys explicitly (`PK`, `FK`) in designs. When judging 3NF, write the dependency that breaks it, then the table decomposition that removes it.

### 8.2 DBMS

A **DBMS** creates, stores, queries, updates and controls a database. It supports data management/data dictionary, data modelling/logical schema, integrity, security (including access rights and backups), developer interface and query processor. Explain how that feature specifically addresses a file-based limitation. [1]

**Common errors.** Calling a database and a DBMS the same thing; claiming a DBMS prevents all incorrect input without designed constraints.

**Exam-use cues.** For “how does a DBMS help?”, pair feature with outcome: central access rights reduce unauthorised changes; a data dictionary standardises field definitions.

### 8.3 DDL and DML / SQL

**DDL** defines or changes structure; **DML** queries or changes stored rows. SQL is the relevant standard. Write/read `CREATE DATABASE`, `CREATE TABLE`, `ALTER TABLE`, primary/foreign keys and the specified types: `CHARACTER`, `VARCHAR(n)`, `BOOLEAN`, `INTEGER`, `REAL`, `DATE`, `TIME`. DML scope includes `SELECT ... FROM`, `WHERE`, `ORDER BY`, `GROUP BY`, `INNER JOIN`, `SUM`, `COUNT`, `AVG`, `INSERT INTO`, `DELETE FROM` and `UPDATE`; tasks use at most two tables. [1]

```sql
CREATE TABLE Booking (
  BookingID INTEGER PRIMARY KEY,
  MemberID INTEGER,
  SessionDate DATE,
  FOREIGN KEY (MemberID) REFERENCES Member(MemberID)
);

SELECT MemberID, COUNT(*)
FROM Booking
WHERE SessionDate >= '2026-01-01'
GROUP BY MemberID
ORDER BY MemberID;
```

**Common errors.** Using a text literal without quotation marks; joining unrelated fields; selecting a non-aggregated column with `COUNT` but no suitable `GROUP BY`; forgetting the predicate in `UPDATE`/`DELETE`.

**Exam-use cues.** Translate the question into a checklist: needed output fields, table(s), join condition, row filter, grouping/aggregate, sort order and modification target. DDL changes the **schema**; DML changes/reads **data**.

---

# AS problem-solving content$md$),
  ('computer-science', 'AS', '9. Algorithm design and problem-solving — AS Paper 2', 'algorithm-design-and-problem-solving-as-paper-2-9', $md$### 9.1 Computational thinking skills$md$, 900, $md$### 9.1 Computational thinking skills

**Abstraction** deliberately models only essential details, making a problem manageable. **Decomposition** divides a problem into sub-problems that can become modules/procedures/functions. Do not confuse abstraction (omit irrelevant detail) with decomposition (split the work). [1]

**Micro-example.** For a library loan system, an abstract borrower model may retain ID and current-loan count but omit favourite colour. Decompose into `GetBorrower`, `CheckLimit`, `RecordLoan` and `PrintReceipt`.

**Common errors.** Removing information that is actually required; listing modules without a meaningful purpose or data flow.

**Exam-use cues.** State what is deliberately omitted and why. A high-quality decomposition gives modules with single, testable responsibilities.

### 9.2 Algorithms

An **algorithm** is a defined sequence of steps that solves a problem. Use an identifier table with meaningful name, purpose, type and scope/initial value if useful. Write IPO (input–process–output), sequence, selection and iteration. Translate among structured English, flowcharts and pseudocode; use stepwise refinement until a programmer could implement the solution. Use logical statements accurately. [1]

```text
// refinement of “process order”
INPUT ItemCount
Total ← 0
FOR Index ← 1 TO ItemCount
  INPUT Price
  Total ← Total + Price
NEXT Index
OUTPUT Total
```

**Common errors.** Inputting inside a loop when it should occur once; an uninitialised accumulator; a flowchart decision with no labelled/clear exits; pseudocode that describes intention rather than executable steps.

**Exam-use cues.** Paper 2 rewards valid **pseudocode**, not a particular real language. Indent blocks, use clear identifiers and retain the question’s supplied bounds/assumptions.

---$md$),
  ('computer-science', 'AS', '10. Data types and structures — AS Paper 2', 'data-types-and-structures-as-paper-2-10', $md$### 10.1 Data types and records$md$, 1000, $md$### 10.1 Data types and records

Select `INTEGER`, `REAL`, `CHAR`, `STRING`, `BOOLEAN`, `DATE`, `ARRAY` and `FILE` appropriately. A **record** groups different typed fields under one identifier, unlike an array whose elements share one type. Define/read/write records in pseudocode. [1]

```text
TYPE PlayerRecord
  DECLARE Name : STRING
  DECLARE Score : INTEGER
ENDTYPE
DECLARE Player : PlayerRecord
Player.Name ← "Ravi"
Player.Score ← 12
```

**Common errors.** Using `INTEGER` for decimal measurement; calling an array a record; not declaring the fields or type before use.

**Exam-use cues.** Choose the narrowest valid type and explain it: a `BOOLEAN` has two states, while a `STRING` is needed for a non-numeric ID with leading zeros.

### 10.2 Arrays

An array is indexed, fixed-size storage for same-type elements. Know lower/upper bounds and choose 1D for one list dimension or 2D for a grid/table. Process 1D/2D arrays, including bubble-sort and linear-search pseudocode. [1]

```text
DECLARE Marks : ARRAY[1:5] OF INTEGER
Found ← FALSE
FOR Index ← 1 TO 5
  IF Marks[Index] = Target THEN
    Found ← TRUE
  ENDIF
NEXT Index
```

**Common errors.** Traversing `1 TO 5` when the stated lower bound is 0; swapping values without a temporary variable; accessing `[row, column]` in the wrong order.

**Exam-use cues.** Write declared bounds before loops. For a 2D array, use two nested loops and name which loop controls rows/columns.

### 10.3 Files

Files provide persistent storage beyond a program run. Paper 2 requires pseudocode handling text files of one or more lines. Think through open mode, reading until end condition, processing and closing where the supplied pseudocode conventions require it. [1]

```text
OPENFILE "scores.txt" FOR READ
WHILE NOT EOF("scores.txt")
  READFILE "scores.txt", Line
  OUTPUT Line
ENDWHILE
CLOSEFILE "scores.txt"
```

**Common errors.** Reading after EOF; overwriting when append is intended; treating a line as a numeric value without conversion where needed.

**Exam-use cues.** State the file mode and termination condition. Paper 4 later requires actual language-specific file code and exception handling.

### 10.4 Introduction to ADTs

An **abstract data type (ADT)** specifies data and permitted operations independently of implementation. A stack is **LIFO**; a queue is **FIFO**; a linked list stores nodes connected by links. At AS, use/edit/add/delete items conceptually and justify a structure; you are not required to write pseudocode for these structures. Explain that arrays can implement them, for example with top/front/rear indices or next-link values. [1]

**Micro-example.** Browser back-history suits a stack: push each page; pop returns the most recently visited page. A print queue suits FIFO so the earliest queued job is processed first.

**Common errors.** Describing a stack as FIFO; claiming a linked list stores items physically adjacent; writing complex linked-list code for an AS-only question that asks for usage.

**Exam-use cues.** Justify using the access/removal order demanded by the situation.

---$md$),
  ('computer-science', 'AS', '11. Programming — AS Paper 2', 'programming-as-paper-2-11', $md$### 11.1 Programming basics$md$, 1100, $md$### 11.1 Programming basics

Implement a flowchart/structured-English design in pseudocode. Declare/initialise constants and variables; assign values; use arithmetic/logical expressions, keyboard input and console output. Use built-in/library routines. Any function not in the prescribed pseudocode guide is provided; string functions are provided in the question. [1] [4]

```text
CONSTANT PassMark = 50
DECLARE Mark : INTEGER
INPUT Mark
IF Mark >= PassMark THEN
  OUTPUT "Pass"
ELSE
  OUTPUT "Try again"
ENDIF
```

**Common errors.** Using `=` for assignment when the exam pseudocode uses `←`; changing a constant; comparing a string/character with an incompatible numeric type.

**Exam-use cues.** Declare before use, initialise counters/totals, and quote string literals. The Paper 2 insert is authoritative for syntax/functions in that examination.

### 11.2 Constructs

Use `IF ... THEN ... ELSE ... ENDIF`, including nested selection; `CASE`; count-controlled `FOR`; post-condition `REPEAT ... UNTIL`; and pre-condition `WHILE ... ENDWHILE`. Select the loop based on whether count is known and whether the body must execute at least once. [1]

```text
REPEAT
  INPUT Choice
UNTIL Choice >= 1 AND Choice <= 3
```

This post-condition loop accepts input at least once. A `WHILE` loop might execute zero times. A `FOR` loop is clearest for a fixed number of iterations.

**Common errors.** Reversing the `UNTIL` condition; an unchanged `WHILE` loop control variable; using `CASE` when a range comparison is required without appropriate cases; off-by-one boundaries.

**Exam-use cues.** When asked to justify a construct, state the condition: “the iteration count is known”, or “the menu must be displayed before validity can be tested”.

### 11.3 Structured programming

A **procedure** performs an action; a **function** returns a value and can appear in an expression. A header/interface defines its name, parameters and, for a function, return type. An **argument** is the actual passed value; a **parameter** is the receiving variable. Pass by value copies; pass by reference lets the called routine alter the caller’s variable. [1]

```text
FUNCTION IsEven(Value : INTEGER) RETURNS BOOLEAN
  RETURN Value MOD 2 = 0
ENDFUNCTION

IF IsEven(14) THEN OUTPUT "even" ENDIF
```

Use procedures for tasks such as output or updates; use functions when a computed result is needed. Efficient pseudocode avoids unnecessary repetition, uses meaningful modules and does not recompute values without need.

**Common errors.** A function with no return; treating a procedure call as a value; assuming every parameter is by reference; placing unrelated actions in one giant module.

**Exam-use cues.** Identify inputs, outputs/return value and side effects. For a routine choice, explain whether the caller needs a returned value or an action performed.

---$md$),
  ('computer-science', 'AS', '12. Software development — AS Paper 2', 'software-development-as-paper-2-12', $md$### 12.1 Program development life cycle$md$, 1200, $md$### 12.1 Program development life cycle

A development life cycle structures analysis, design, coding, testing and maintenance. **Waterfall** is sequential and documented; it suits stable requirements but handles change poorly. **Iterative** development repeats refinement using feedback; it manages evolving requirements but needs active review. **RAD** emphasises rapid prototyping/user feedback; it can deliver early versions but risks weak design if rushed. [1]

**Common errors.** Treating testing as a one-time final action only; asserting one model is universally best; confusing a prototype with a fully tested product.

**Exam-use cues.** A life-cycle justification needs project conditions: requirement stability, stakeholder availability, risk, timescale and need for early feedback.

### 12.2 Program design

A **structure chart** decomposes a system into modules and shows hierarchy and data/parameters passed between them. It is not a flowchart: it describes program organisation, not step-by-step control flow. Derive matching pseudocode. A **state-transition diagram** documents states and labelled events/conditions that cause moves between states. [1]

**Micro-example.** `Main` calls `ReadOrder`, `ValidateOrder`, `CalculateTotal` and `PrintReceipt`; `CalculateTotal` receives `Items` and returns `Total`. A turnstile state model might move `Locked → Unlocked` on valid payment and `Unlocked → Locked` on passage.

**Common errors.** Drawing arrows as execution sequence in a structure chart; missing parameter direction/purpose; state transition without an event.

**Exam-use cues.** Each module should have a single clear purpose. Trace data passed through the design before converting it to code.

### 12.3 Testing and maintenance

Errors may be **syntax** (break language rules), **logic** (runs but produces wrong result) or **run-time** (fails while executing). Find/correct them and explain how testing exposes faults. Know dry run, walkthrough, white-box, black-box, integration, alpha, beta, acceptance and stub testing. A test plan includes test ID, purpose, input data, expected result, actual result and pass/fail/action. [1]

Test data: **normal** valid typical input; **abnormal** invalid input; **extreme/boundary** at or around limits. Maintenance is **corrective** (fix fault), **adaptive** (environment change) or **perfective** (improve/enhance).

**Micro-example.** If permitted marks are 0–100, test 0 and 100 (boundaries), −1 and 101 (abnormal/outside), and 56 (normal). A loop that ends at `< 100` should be corrected if 100 is valid.

**Common errors.** Calling an extreme value automatically invalid; treating beta testing as internal only; calling an added feature corrective maintenance.

**Exam-use cues.** Pair each datum with an expected result. In a program amendment, preserve existing requirements and identify which tests must be rerun.

---

# A Level content$md$),
  ('computer-science', 'A2', '13. Data representation — A Level Paper 3', 'data-representation-a-level-paper-3-13', $md$### 13.1 User-defined data types$md$, 1300, $md$### 13.1 User-defined data types

A user-defined type models a domain concept more accurately/readably than primitive types. Non-composite types include **enumerated** types (one value from a named set) and **pointer** types (store/refer to an address). Composite types include **set**, **record**, **class/object**. Choose/design a type that matches operations and valid values. [1]

```text
TYPE Membership = (Standard, Premium, Staff)
TYPE Player
  DECLARE Name : STRING
  DECLARE Level : INTEGER
ENDTYPE
```

A pointer supports linked structures by referring to another node; a set represents membership without unnecessary duplicates; a class combines attributes with methods/behaviour.

**Common errors.** Describing an enumeration as a string without restricted values; treating a record, class and object as exactly identical; using a pointer as the stored item rather than a reference/address.

**Exam-use cues.** State why a bespoke type improves validation, clarity or modelling. Show a valid declaration and one valid use, not only a definition.

### 13.2 File organisation and access

A **serial file** stores records in arrival order; a **sequential file** stores/uses a key order; a **random/direct file** accesses a record using a record key/address. Sequential access reads in order; direct access can jump to a location. Select based on workload: sequential processing of all records suits batch reports; direct access suits rapid retrieval/update of a known record. [1]

**Hashing** maps a key to a storage location, such as `address = key MOD tableSize`. It needs collision handling (for example, probing or overflow area) because two keys can map to one address.

**Micro-example.** With size 10, keys 27 and 37 both hash to 7. Store 27 at 7; probe the next available location or follow an overflow link for 37, according to the stated method.

**Common errors.** Calling any file with a key random access; ignoring collisions; claiming hashing guarantees one disk read.

**Exam-use cues.** Name both the organisation and access method. A selection justification needs the key/workload and the relevant time/storage trade-off.

### 13.3 Floating-point numbers, representation and manipulation

Binary floating point represents a real number as **mantissa/significand × 2^exponent**, usually with signed two’s-complement fields as specified. It offers wide range but finite precision. Normalisation puts the mantissa into the required standard form, maximising meaningful leading bits. More mantissa bits improve precision; more exponent bits improve range. [1]

Use the binary-point convention supplied in the question. For an illustrative convention where `0.1011₂ × 2^3` is used, the value is `0.6875 × 8 = 5.5`. Do **not** apply this layout to an exam representation unless its bit allocation and point position match.

**Underflow** occurs when magnitude is too small for the available exponent/format; **overflow** when too large. Many decimal fractions have non-terminating binary representations, so stored values are approximations and rounding errors can accumulate.

**Common errors.** Treating normalisation as changing the value; adding mantissas without aligning exponents; forgetting that the question determines bit allocation and fixed binary point.

**Exam-use cues.** Show exponent adjustment and mantissa shift together. If asked about error, state whether it arises from finite representation, rounding, overflow or underflow.

---$md$),
  ('computer-science', 'A2', '14. Communication and internet technologies — A Level Paper 3', 'communication-and-internet-technologies-a-level-paper-3-14', $md$### 14.1 Protocols$md$, 1400, $md$### 14.1 Protocols

A **protocol** is an agreed set of rules that enables interoperable communication. A stack divides communication into layers, each with a defined responsibility. The TCP/IP suite has **Application, Transport, Internet and Link** layers. Explain encapsulation/de-encapsulation in a message journey: application data is given transport information, IP routing information and link framing for each hop; receivers remove/interpret layers. [1]

Know purposes: **HTTP** transfers web resources; **FTP** transfers files; **POP3** retrieves email (often downloads); **IMAP** manages/accesses mail on server; **SMTP** sends/relays email; **BitTorrent** supports peer-to-peer file sharing.

**Common errors.** Treating TCP/IP layers as physical devices; saying HTTP is inherently encryption; mixing SMTP’s sending role with POP3/IMAP retrieval.

**Exam-use cues.** Explain the purpose of each named layer/protocol and sequence a message end-to-end, rather than listing acronyms.

### 14.2 Circuit switching and packet switching

**Circuit switching** establishes a dedicated end-to-end path/reserved resources for a session. It can give predictable performance but wastes capacity during silence and setup is needed. **Packet switching** splits a message into packets routed through shared networks; it uses resources efficiently and can route around faults, but packets can be delayed, lost or arrive out of order. Routers forward packets toward destinations. [1]

**Micro-example.** A large file sent as packets can take different routes and be reassembled using sequencing information. A dedicated circuit is more appropriate where consistent reserved capacity is essential, but the conclusion must fit the given scenario.

**Common errors.** Saying packet switching guarantees ordered arrival; claiming circuit switching has no delay; calling each packet an independent full copy of the message.

**Exam-use cues.** Compare setup, bandwidth reservation, efficiency, resilience and latency predictability, then state a justified application.

---$md$),
  ('computer-science', 'A2', '15. Hardware and virtual machines — A Level Paper 3', 'hardware-and-virtual-machines-a-level-paper-3-15', $md$### 15.1 Processors, parallel processing and virtual machines$md$, 1500, $md$### 15.1 Processors, parallel processing and virtual machines

**RISC** typically uses a smaller, simpler instruction set, fixed/simple formats and efficient pipelining; **CISC** typically offers more complex/richer instructions and addressing. Compare implementations, including interrupt handling, in the context supplied—do not claim one is universally faster. Registers and pipelining support RISC throughput by overlapping instruction stages, though hazards can require stalls/handling. [1]

Flynn’s architectures: **SISD** (single instruction, single data), **SIMD** (one instruction across multiple data values), **MISD** (multiple instructions, one data stream), **MIMD** (multiple instruction streams and data streams). Massively parallel computers use many processing elements for large decomposable workloads; coordination, communication and non-parallel portions limit speed-up.

A **virtual machine (VM)** emulates/provides a computer environment on physical hardware. It enables isolation, consolidation, portability and safe testing, but uses resources and can have overhead/limited direct hardware performance.

**Common errors.** Defining RISC only by “fewer registers”; calling any multicore machine SIMD; saying a VM is the same as an emulator without considering context.

**Exam-use cues.** For parallelism, identify how instructions/data are distributed and a limiting factor. For VMs, give both a practical role and a limitation.

### 15.2 Boolean algebra and logic circuits

Extend Paper 1: create truth tables/circuits for half adders and full adders, including gates with more than two inputs; understand SR/JK flip-flops as storage elements; use Boolean algebra, De Morgan’s laws and Karnaugh maps to simplify logic. [1]

- **Half adder:** `Sum = A XOR B`, `Carry = A AND B`.  
- **Full adder:** inputs `A, B, Cin`; `Sum = A XOR B XOR Cin`; `Cout = (A AND B) OR (Cin AND (A XOR B))`.  
- **De Morgan:** `NOT(A AND B) = (NOT A) OR (NOT B)`; `NOT(A OR B) = (NOT A) AND (NOT B)`.

A flip-flop retains a binary state. For SR, invalid/forbidden input handling depends on the stated implementation; for JK, both inputs active generally toggle. Use the supplied truth table/diagram where conventions are stated. A K-map groups adjacent 1s in powers of two (including wrap-around adjacency) to remove changing variables.

**Micro-example.** For half adder inputs A=1, B=1, `Sum=0`, `Carry=1`, representing binary `10`. Simplify `(A AND B) OR (A AND NOT B)` by factoring A: `A AND (B OR NOT B) = A`.

**Common errors.** Forgetting carry-in for a full adder; using non-power-of-two K-map groups; simplifying by grouping diagonal cells; applying De Morgan without negating both operands and switching operator.

**Exam-use cues.** In K-map work, write groups and the term each yields. In Boolean proofs, show one legal transformation per line.

---$md$),
  ('computer-science', 'A2', '16. System software — A Level Paper 3', 'system-software-a-level-paper-3-16', $md$### 16.1 Purposes of an operating system$md$, 1600, $md$### 16.1 Purposes of an operating system

The OS maximises resource use and hides hardware complexity through an interface/abstraction. A **process** is a program in execution. Know running, ready and blocked states; multitasking; scheduler purpose; and FCFS, shortest job first, shortest remaining time and round robin. The kernel handles low-level interrupts and uses them in scheduling. [1]

- **FCFS:** simple/fair by arrival, but a long job can delay short jobs.  
- **Shortest job first/remaining time:** can reduce average waiting where durations are known, but long jobs can starve.  
- **Round robin:** time slices improve responsiveness/fairness, but context switching costs overhead.

**Virtual memory** uses secondary storage to extend apparent main memory. **Paging** divides memory into fixed-size pages/frames; **segmentation** divides it into logical variable-size sections. Page replacement chooses a victim page; too much swapping/page faulting causes **thrashing**, leaving little useful CPU work.

**Common errors.** Calling blocked “finished”; confusing paging and segmentation; saying virtual memory makes RAM physically larger; omitting scheduler trade-offs.

**Exam-use cues.** Trace a process state transition using an event: I/O request causes running → blocked; I/O completion returns blocked → ready. Explain thrashing as repeated disk transfer/page faults, not merely “memory is full”.

### 16.2 Translation software

An interpreter executes source without producing a separate translated version. Compilation stages include **lexical analysis** (tokens), **syntax analysis** (grammar structure), **code generation**, and **optimisation**. A grammar can be expressed with syntax diagrams or **BNF**. **RPN** (postfix) places an operator after operands and enables stack evaluation. [1]

**Micro-example.** In RPN, `3 4 2 * +` evaluates as: push 3, push 4, push 2; `*` gives 8; `+` gives 11. In BNF-style notation, `<digit> ::= 0 | 1 | ... | 9` means a digit is one listed alternative.

**Common errors.** Saying lexical analysis checks all program logic; reading RPN left-to-right as infix; treating BNF alternatives as literal program code.

**Exam-use cues.** In a compilation answer, preserve the stage order and output of each. In RPN traces, draw/use a stack after each token.

---$md$),
  ('computer-science', 'A2', '17. Security — A Level Paper 3', 'security-a-level-paper-3-17', $md$### 17.1 Encryption, encryption protocols and digital certificates$md$, 1700, $md$### 17.1 Encryption, encryption protocols and digital certificates

Encryption transforms **plaintext** into **ciphertext** using a key; decryption reverses it with the appropriate key. **Symmetric cryptography** uses a shared secret key and is efficient, but key distribution is a challenge. **Asymmetric cryptography** uses public/private key pairs: encrypt with the recipient’s public key for confidential delivery; verify a signed message using the sender’s public key, where the sender used their private key to create the signature. [1]

SSL/TLS protects client–server communication by establishing authenticated encrypted transport. A **digital certificate**, issued/validated through a trusted certification process, binds an identity to a public key and supports authentication/signature verification. Quantum cryptography has potential security benefits in key exchange but demands specialised infrastructure and has practical limitations.

**Micro-example.** To send a confidential message to Organisation O, encrypt it using O’s public key; only O’s private key should decrypt it. To prove a message originated from Sender S, S signs with S’s private key and recipients verify with S’s public key/certificate chain.

**Common errors.** Encrypting a confidential message with the sender’s private key; stating encryption alone proves identity; confusing a certificate with the data itself; saying SSL/TLS is a website rather than a protocol suite.

**Exam-use cues.** Draw labelled public/private keys and arrows. For each process, name the security property: confidentiality, authenticity, integrity/non-repudiation as context permits.

---$md$),
  ('computer-science', 'A2', '18. Artificial intelligence — A Level Paper 3', 'artificial-intelligence-a-level-paper-3-18', $md$### 18.1 Artificial intelligence$md$, 1800, $md$### 18.1 Artificial intelligence

A graph has vertices/nodes and edges; weighted edges can model path cost. Use **Dijkstra** to find shortest paths with non-negative weights, and **A\*** using actual path cost plus a heuristic estimate to guide search. You must apply searches, but are not required to write graph construction/access/search code. [1]

**Micro-example.** Starting at S, write a frontier table of tentative distances. Dijkstra selects the unvisited node with smallest tentative distance, relaxes outgoing edges, then repeats. A* prioritises `f(n)=g(n)+h(n)`, where `g` is known cost and `h` estimates remaining cost. Show every update/selection in the given graph.

An artificial neural network has interconnected weighted nodes; training adjusts weights so outputs better match examples. **Machine learning** learns patterns from data. **Supervised learning** uses labelled target outputs; **unsupervised learning** seeks structure without labels; **reinforcement learning** learns actions from reward/penalty. **Deep learning** uses multiple representation layers. **Backpropagation** sends output error information backwards to adjust weights. **Regression** predicts a numeric/continuous value rather than a class.

**Common errors.** Calling any graph route “A*” without `g+h`; assuming Dijkstra is appropriate with negative edges; confusing regression with classification; claiming training guarantees unbiased/correct results.

**Exam-use cues.** For graph work, show visited/frontier/tentative values; do not jump directly to an answer. For ML, identify data type, learning category, output and a limitation such as biased training data or explainability.

---$md$),
  ('computer-science', 'A2', '19. Computational thinking and problem-solving — A Level Papers 3 and 4', 'computational-thinking-and-problem-solving-a-level-papers-3--19', $md$> Boundary: Paper 3 assesses the theory and written algorithms in Sections 19–20. Paper 4 applies Section 19 plus high-level/procedural and OOP/file/exception aspects of Section 20. Paper 4 excludes low-level and declarative programming. [1]$md$, 1900, $md$> **Boundary:** Paper 3 assesses the theory and written algorithms in Sections 19–20. Paper 4 applies Section 19 plus high-level/procedural and OOP/file/exception aspects of Section 20. Paper 4 excludes **low-level** and **declarative** programming. [1]

### 19.1 Algorithms

#### Searching and sorting

**Linear search** checks elements in order and works on unsorted data. **Binary search** repeatedly compares a target with a middle item and discards half; the data **must be sorted**. **Bubble sort** repeatedly swaps adjacent out-of-order elements. **Insertion sort** inserts each next item into its correct position in an already sorted prefix. Performance depends on input size/order; compare time/space with **Big O** notation. [1]

```text
// binary search over sorted Data[1:Count]
Low ← 1
High ← Count
Found ← FALSE
WHILE Low <= High AND NOT Found
  Mid ← (Low + High) DIV 2
  IF Data[Mid] = Target THEN
    Found ← TRUE
  ELSE
    IF Data[Mid] < Target THEN
      Low ← Mid + 1
    ELSE
      High ← Mid - 1
    ENDIF
  ENDIF
ENDWHILE
```

Typical comparison: linear search `O(n)`, binary search `O(log n)` on sorted indexed data; bubble/insertion sort are `O(n²)` worst case, with insertion/bubble potentially better on nearly sorted data depending on implementation; array storage is typically `O(n)`. State the assumptions behind any complexity statement.

```text
// bubble sort: Data[1:Count], ascending
FOR Pass ← 1 TO Count - 1
  Swapped ← FALSE
  FOR Index ← 1 TO Count - Pass
    IF Data[Index] > Data[Index + 1] THEN
      Temp ← Data[Index]
      Data[Index] ← Data[Index + 1]
      Data[Index + 1] ← Temp
      Swapped ← TRUE
    ENDIF
  NEXT Index
NEXT Pass
```

For **insertion sort**, treat `Data[1:Index − 1]` as the sorted prefix: store `Data[Index]` as `Item`, shift larger prefix items one position right, then place `Item` in the gap. The crucial invariant is that the prefix is sorted after every outer iteration; this is often easier to trace than remembering code by shape. `Swapped` can be retained for a trace/efficiency discussion, but this deliberately stays within simple prescribed loop notation.

**Micro-trace.** Sorted `[3, 7, 12, 18, 25]`, target 18: middle index 3 has 12, so set low to 4; middle of 4–5 is 4, value 18, found. Never binary-search `[12, 3, 18, 7, 25]` as if it were sorted.

**Common errors.** Binary searching unsorted data; forgetting to update a bound; declaring bubble sort finished after one pass; confusing worst-case with a guaranteed time.

**Exam-use cues.** For Paper 3, trace and explain preconditions. For Paper 4, implement robustly, test empty/singleton/first/last/not-found cases and capture evidence.

#### ADTs, implementations and complexity

At A Level, write algorithms to find in a linked list/binary tree; insert into stack, queue, linked list and binary tree; delete from stack, queue and linked list. Describe/implement a stack, queue, linked list, dictionary and binary tree using built-in types or other ADTs. A graph is an ADT: describe key features and justify its use, but no graph-structure code is required. [1]

- **Stack:** push/pop at top; check overflow/underflow.  
- **Queue:** enqueue at rear, dequeue at front; manage empty/full/wraparound if array-based.  
- **Linked list:** node holds data and link; insertion/deletion requires reconnecting links safely.  
- **Dictionary:** maps a key to a value; efficient lookup depends on implementation/hashing.  
- **Binary search tree:** each node has at most two children; for a BST, left values are smaller and right values larger under the stated comparison policy.

```text
// stack insertion using a fixed array
IF Top < MaxSize THEN
  Top ← Top + 1
  Stack[Top] ← NewItem
ELSE
  OUTPUT "Overflow"
ENDIF
```

```text
// enqueue in an array queue where Rear is the next free position
IF Rear < MaxSize THEN
  Queue[Rear] ← NewItem
  Rear ← Rear + 1
ELSE
  OUTPUT "Overflow"
ENDIF

// BST insertion (outline): compare until an empty child link is found
Current ← Root
WHILE Current is not NULL
  Parent ← Current
  IF NewKey < Current.Key THEN Current ← Current.Left ELSE Current ← Current.Right ENDIF
ENDWHILE
// attach NewNode as Parent.Left or Parent.Right by the final comparison
```

**Micro-example.** To delete a linked-list node after `Previous`, set `Previous.Next ← Current.Next`; then ensure head/deletion-at-start is handled as a separate case. Losing `Current.Next` before reconnecting can lose the rest of the list.

**Common errors.** Pushing before checking capacity; deleting a queue item from rear; treating linked-list index access as automatically constant time; breaking a link before saving the successor.

**Exam-use cues.** Name exceptional cases: empty, full, one node, target at head, target absent. Explain **interface/behaviour** separately from implementation.

### 19.2 Recursion

A recursive routine calls itself with a smaller/simpler case and has a **base case** that stops it. The call stack retains activation records; as base case returns, calls **unwind**. Use recursion where the problem has self-similar subproblems, but note overhead/stack-depth risk. [1]

```text
FUNCTION SumTo(Number : INTEGER) RETURNS INTEGER
  IF Number = 0 THEN
    RETURN 0                 // base case
  ELSE
    RETURN Number + SumTo(Number - 1)
  ENDIF
ENDFUNCTION
```

`SumTo(3)` returns `3 + SumTo(2) → 3 + 2 + SumTo(1) → 3 + 2 + 1 + SumTo(0) = 6`. A compiler/runtime must support calls, parameters/return addresses and stack use/unwinding.

**Common errors.** No reachable base case; recursive call that does not approach it; confusing recursion with a loop; forgetting the return on recursive path.

**Exam-use cues.** State base case, recursive case and shrinking measure. Trace calls in a column/table; for Paper 4 test the base case and deep input where safe.

---$md$),
  ('computer-science', 'A2', '20. Further programming — A Level Papers 3 and 4', 'further-programming-a-level-papers-3-and-4-20', $md$### 20.1 Programming paradigms$md$, 2000, $md$### 20.1 Programming paradigms

A **programming paradigm** is a broad style/model for structuring computation. [1]

#### Low-level programming — Paper 3 only

Write/read low-level code using immediate, direct, indirect, indexed and relative addressing. This extends Section 4 assembly content. Trace effective addresses, ACC/IX and flags. **Not assessed in Paper 4.**

#### Imperative (procedural) programming — Papers 3 and 4

Imperative/procedural programs change state through ordered statements, variables, selection, iteration, procedures and functions. This is assumed from AS Section 11.3 and is assessed in written application and practical programming. Design modules with clear interfaces and minimise unwanted side effects.

**Micro-example.** A `CalculateTotal` function receives an order list and returns a value; a `PrintReceipt` procedure performs output. The separation makes each unit easier to test.

**Common errors.** Writing a routine with mixed, unrelated jobs; changing global data when a returned value/parameter would be clearer.

**Exam-use cues.** In Paper 4, use the centre’s selected console language, but retain the same disciplined design: valid input, named variables, modular routines and tests.

#### Object-oriented programming (OOP) — Papers 3 and 4

A **class** is a blueprint; an **object/instance** is a created instance. Its **properties/attributes** hold state and its **methods** define behaviour. **Encapsulation** keeps data and methods together and restricts direct state access; **getters/setters** are controlled accessor/mutator methods. **Inheritance** creates a more specialised class from a base class. **Polymorphism** allows one interface/method call to produce behaviour appropriate to the actual object. **Containment/aggregation** models a “has-a” relationship. [1]

```text
CLASS Loan
  PRIVATE DueDays : INTEGER
  PUBLIC PROCEDURE SetDueDays(NewDays : INTEGER)
    IF NewDays >= 1 THEN
      DueDays ← NewDays
    ENDIF
  ENDPROCEDURE
ENDCLASS
```

**Micro-example.** `EBookLoan` can inherit common borrower/title behaviour from `Loan` while overriding `GetExpiryRule`; a `Library` object can contain a collection of `Loan` objects. This is not the same relationship: inheritance is **is-a**; aggregation is **has-a**.

**Common errors.** Calling a class an object; claiming inheritance means copying every field manually; exposing all attributes as public; saying polymorphism means “many objects” without a common interface/overridden behaviour.

**Exam-use cues.** Start from nouns and responsibilities in the scenario; assign data and methods; use inheritance only where the subtype truly **is a** base type. On Paper 4, test constructors/initial state, validation methods and each subclass behaviour.

#### Declarative programming — Paper 3 only

Declarative programming states **what** relationships/goal should hold rather than a step-by-step imperative route. Use appropriate **facts** and **rules** based on supplied information, then satisfy a goal from them. It is **not assessed in Paper 4**. [1]

```text
fact(parent(amira, ben)).
fact(parent(ben, cara)).
rule(grandparent(X, Z) :- parent(X, Y), parent(Y, Z)).
```

A goal such as `grandparent(amira, cara)` succeeds by matching facts through the rule. Use the notation/style supplied in a question; the example only illustrates the distinction.

**Common errors.** Writing a procedural loop instead of facts/rules; a rule variable that cannot be bound by a fact; treating facts as commands that execute in sequence.

**Exam-use cues.** Identify facts, rule conditions and requested goal. State the substitutions/matches that establish a result.

### 20.2 File processing and exception handling — Papers 3 and 4

Write code to open files in read, write and append modes; close a file; read/write records; and process serial, sequential and random files. An **exception** is an abnormal condition during execution, such as a missing file, invalid conversion or unavailable resource. Exception handling anticipates it, performs controlled recovery/reporting and preserves program integrity where possible. [1]

```text
TRY
  OPENFILE "members.txt" FOR READ
  WHILE NOT EOF("members.txt")
    READFILE "members.txt", Record
    // process Record
  ENDWHILE
  CLOSEFILE "members.txt"
CATCH FileError
  OUTPUT "File could not be opened"
ENDTRY
```

The actual Paper 4 syntax must be that of Java, Visual Basic .NET or Python chosen by the centre. For example, Python uses `try/except`, Java uses `try/catch`, and Visual Basic .NET uses `Try/Catch`; do not submit pseudocode as a practical program. [1]

**Micro-example.** A report must append new entries rather than overwrite historic records: open in append mode, write a complete record in the agreed format, close reliably, then reopen/read to verify. If a file is unavailable, a handler can show a useful message and avoid a crash.

**Common errors.** Confusing write (replace/create) with append; not closing/flush-saving a file; catching every exception and silently continuing; assuming exception handling prevents the underlying fault; using a binary-file assumption in Paper 4 source-file tasks.

**Exam-use cues.** Paper 3: compare file organisations/modes and write valid algorithmic logic. Paper 4: build working language code, handle plausible failures, and paste code/output/screenshots into the supplied evidence document. **No evidence means no marks for that work**, so save regularly and verify centre procedures. [1]

---

# Paper-by-paper final checklist and command-word strategy

## Paper 1 — Theory Fundamentals

- [ ] I can convert binary/denary/hex/BCD/two’s complement and show overflow; calculate bitmap and sound sizes with units.
- [ ] I can trace packets/devices and distinguish internet/WWW, LAN/WAN, client–server/P2P, addressing and DNS.
- [ ] I can build logic tables/circuits and trace fetch–execute, interrupts, assembly and bit masks.
- [ ] I can compare RAM/ROM/SRAM/DRAM, sensors/actuators, devices, OS functions and translators in context.
- [ ] I can distinguish security, privacy, integrity, validation and verification with methods/limitations.
- [ ] I can normalise to 3NF, draw an ER design and write SQL DDL/DML in the stated subset.
- [ ] I use technical terms accurately and give a contextual consequence, not a memorised list.

## Paper 2 — Fundamental Problem-solving and Programming Skills

- [ ] I start with declarations, clear identifiers, initialisation, IPO and necessary validation.
- [ ] I select `FOR`, `WHILE` or `REPEAT` based on the stated control condition and trace boundary cases.
- [ ] I can turn flowchart/structured English into indented pseudocode and vice versa.
- [ ] I can handle 1D/2D arrays, records and text files with valid bounds/end conditions.
- [ ] I can choose procedure versus function, parameters versus arguments and value versus reference appropriately.
- [ ] I can create a structure chart/state model, a test plan and explain fault/maintenance type.
- [ ] I rely on the examination pseudocode insert for built-ins/operators; I do not invent real-language syntax.

## Paper 3 — Advanced Theory

- [ ] I can convert/normalise floating point and explain precision, range, approximation, overflow and underflow.
- [ ] I can compare file organisation/access, hash with collision handling, explain TCP/IP/protocols and switching.
- [ ] I can compare RISC/CISC, architectures/parallelism/VMs, scheduling methods and paging/segmentation.
- [ ] I can simplify Boolean expressions, work an adder/flip-flop/K-map and evaluate RPN/translation stages.
- [ ] I can explain encryption key direction, certificates/TLS, AI graph searches and learning methods.
- [ ] I can write/trace search/sort/ADT/recursive algorithms, use Big O, and explain low-level/declarative paradigms.
- [ ] I show method in diagrams/traces/calculations; a final result without working rarely demonstrates full understanding.

## Paper 4 — Practical

- [ ] I have rehearsed the **centre-approved** Java, Visual Basic .NET or Python console environment and file locations; I will verify the exact arrangements with my centre.
- [ ] I can deliver working high-level procedural/OOP code for Sections 19–20, with files and appropriate exceptions.
- [ ] I do **not** spend time preparing low-level or declarative code for Paper 4; those are excluded.
- [ ] I plan input, processing, output, data representation, validation and tests before coding.
- [ ] I test normal, boundary, abnormal and exceptional cases; I fix the cause, then retest.
- [ ] I save often and capture requested code/results/screenshots in the supplied evidence document at each stage.
- [ ] I remember: no internet/email in the assessment environment; source files have no binary files. [1] [3]

## High-yield command-word response strategy

| Command word | What to do in a computing answer |
|---|---|
| **Define** | Give a tight, precise meaning. Avoid examples unless requested. |
| **Describe** | State main features or steps in sensible order; no extended causal analysis required unless asked. |
| **Explain** | Give why/how: mechanism → cause → effect in the stated system. |
| **Compare / contrast** | Make paired, matched points. Contrast requires differences; compare can include similarities and differences. |
| **Calculate** | Write formula/substitution, working, result and correct unit/base. |
| **Analyse / examine** | Break the system/problem into parts and show relationships or consequences. |
| **Justify / assess / evaluate** | Apply criteria to the scenario, weigh benefit against drawback/constraint, and give a supported judgement. |
| **Demonstrate / write / develop** | Produce a valid algorithm, SQL, logic circuit, code/design or worked method in the required notation. |

> **Timing discipline:** use the mark allocation as a guide to breadth. For a multi-step calculation or trace, reserve a final check: correct fixed width? correct units? correct bounds? correct precondition? correct output/evidence?

---

# Quick reference: formulae, definitions and syntax

## Formulae and representation

| Need | Quick reference |
|---|---|
| Unsigned `n`-bit range | `0` to `2^n − 1` |
| Two’s-complement `n`-bit range | `−2^(n−1)` to `2^(n−1) − 1` |
| Bitmap size | `width × height × colour depth (bits)`; then `/ 8` for bytes; account for header only when required. |
| Sound size | `duration × sampling rate × resolution × channels` in bits; then `/ 8` for bytes. |
| RLE | Store each run as value + count; benefit depends on repeated values. |
| Full-adder outputs | `Sum = A XOR B XOR Cin`; `Cout = (A AND B) OR (Cin AND (A XOR B))`. |
| A* priority | `f(n) = g(n) + h(n)`. |
| Hash example | `address = key MOD tableSize`, with collision strategy. |
| Common complexity | Linear search `O(n)`; binary search on sorted data `O(log n)`; typical bubble/insertion worst case `O(n²)`; always state assumptions. |

## Essential distinctions

| Do not confuse | With | Distinction |
|---|---|---|
| Validation | Verification | Validation checks whether data meet rules; verification checks copied/transferred data agree with source. |
| Security | Privacy | Security protects systems/data; privacy governs appropriate handling of personal/sensitive data. |
| RAM | Secondary storage | RAM is volatile working memory; secondary storage is persistent. |
| Bitmap | Vector | Bitmap stores pixels; vector stores drawing objects/properties. |
| Procedure | Function | Procedure performs an action; function returns a value for an expression. |
| Stack | Queue | Stack is LIFO; queue is FIFO. |
| Class | Object | Class is a blueprint; object is an instance. |
| Symmetric | Asymmetric encryption | Symmetric shares one secret key; asymmetric uses public/private pair. |
| Circuit | Packet switching | Circuit reserves a path; packet switching shares links with routed packets. |
| Paging | Segmentation | Paging fixed-size blocks; segmentation logical variable-size units. |

## Cambridge-style pseudocode essentials

The official teacher guide uses `←` for assignment and provides the syntax/functions used in assessment; the examination insert governs a particular Paper 2. [4]

```text
DECLARE Count : INTEGER
CONSTANT Limit = 10
DECLARE Names : ARRAY[1:Limit] OF STRING

INPUT Count
OUTPUT "Total: ", Count

IF Count > 0 THEN
  OUTPUT "positive"
ELSE
  OUTPUT "zero or negative"
ENDIF

FOR Index ← 1 TO Limit
  // instructions
NEXT Index

WHILE Condition
  // instructions; ensure the condition can change
ENDWHILE

REPEAT
  // instructions
UNTIL Condition

PROCEDURE Show(Name : STRING)
  OUTPUT Name
ENDPROCEDURE

FUNCTION Square(Value : INTEGER) RETURNS INTEGER
  RETURN Value * Value
ENDFUNCTION
```

- Arithmetic: `+ − * / DIV MOD`; `/` produces a `REAL`; `DIV` is integer quotient; `MOD` is remainder.  
- Use `AND`, `OR`, `NOT` for logic. Parenthesise non-trivial expressions.  
- Arrays normally declare explicit lower and upper bounds. Preserve the bounds given in the question.  
- In a practical answer, translate the **logic**, not the pseudocode spelling, to the selected language.

---

# Compact study sequence

**Phase 1 — Build AS foundations (weeks 1–3).** Study Sections 1–4 alongside short numerical/tracing drills. Then Sections 5–8 with one ER/normalisation/SQL exercise each session. End each topic with “define, explain, justify” flash responses.

**Phase 2 — Make Paper 2 automatic (weeks 4–5).** Work through Sections 9–12 in this order: decomposition/design → constructs/arrays/records/files → routines → test plans/life cycles. Dry-run every algorithm with normal, boundary and invalid data. Convert one design into pseudocode daily.

**Phase 3 — Extend to A Level theory (weeks 6–8).** Add Sections 13–18 in pairs: representation/files; networks/hardware; OS/translators; security/AI. Use comparison grids and traces rather than prose-only notes.

**Phase 4 — Integrate algorithms and coding (weeks 9–10).** Master Section 19 before Section 20. Implement searches, sorts, stack/queue/list/BST operations, recursion, OOP, file processing and exceptions in the Paper 4 language. Capture testing evidence as a habit.

**Phase 5 — Exam refinement (final weeks).** Alternate a timed theory paper, a timed pseudocode/algorithm set and a practical build. Maintain an error log tagged **knowledge**, **method**, **notation**, **boundary case** or **evidence**. Revisit the official syllabus checklist so every objective has a worked example and an exam-use cue.

> **Minimum weekly loop:** retrieve definitions without notes; solve one calculation/trace; write one short explanation with a contextual consequence; write/test one algorithm or practical routine; correct the error log.

---

# Sources and specification notes

This is original revision material, organised against the official Cambridge International subject content and assessment documents. It does **not** reproduce textbook passages or past-paper questions. Official facts about assessment, content, availability and pseudocode are cited below.

**Specification note.** This pack covers **Cambridge International AS & A Level Computer Science 9618, syllabus for examinations in 2026, Version 2 (December 2025)**. The official qualification page lists a successor 2027–2029 syllabus. Learners taking another series must use that series’ document, and must **verify on their entry** the available route, option code, practical arrangements and administrative-zone timetable. [1] [2] [5]

[1]: https://www.cambridgeinternational.org/Images/697372-2026-syllabus.pdf "Cambridge International AS & A Level Computer Science 9618 syllabus for 2026, Version 2"
[2]: https://www.cambridgeinternational.org/programmes-and-qualifications/view/cambridge-international-as-and-a-level-computer-science-9618/ "Cambridge International AS & A Level Computer Science (9618) qualification page"
[3]: https://www.cambridgeinternational.org/Images/747145-2026-syllabus-update.pdf "Syllabus update: Cambridge International AS & A Level Computer Science (9618) for examination in 2026"
[4]: https://www.cambridgeinternational.org/Images/697401-2026-pseudocode-guide-for-teachers.pdf "Pseudocode Guide for Teachers: Cambridge International AS & A Level Computer Science 9618 for 2026"
[5]: https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf "Cambridge International AS & A Level Computer Science 9618 syllabus for 2027, 2028 and 2029, Version 2"$md$);

-- 3) Topics: insert missing, then refresh description/order of existing rows
--    (matched by subject + level + name). Slugs of existing rows untouched.
insert into public.topics (subject_level_id, name, slug, description, sort_order)
select sl.id, v.name, v.slug, v.description, v.sort_order
from _seed_topics v
join public.subjects s on s.slug = v.subject_slug
join public.subject_levels sl on sl.subject_id = s.id and sl.level = v.level::public.subject_level
where not exists (
  select 1 from public.topics t
  where t.subject_level_id = sl.id and t.name = v.name
);

update public.topics t
set description = v.description,
    sort_order = v.sort_order
from _seed_topics v
join public.subjects s on s.slug = v.subject_slug
join public.subject_levels sl on sl.subject_id = s.id and sl.level = v.level::public.subject_level
where t.subject_level_id = sl.id and t.name = v.name;

-- 4) Notes content: one study_material per topic, kept in sync with the pack.
insert into public.study_materials (topic_id, title, content, material_type)
select t.id, v.name || ' — revision notes', v.content, 'notes'
from _seed_topics v
join public.subjects s on s.slug = v.subject_slug
join public.subject_levels sl on sl.subject_id = s.id and sl.level = v.level::public.subject_level
join public.topics t on t.subject_level_id = sl.id and t.name = v.name
where not exists (
  select 1 from public.study_materials m
  where m.topic_id = t.id and m.title = v.name || ' — revision notes'
);

update public.study_materials m
set content = v.content,
    material_type = 'notes',
    updated_at = now()
from _seed_topics v
join public.subjects s on s.slug = v.subject_slug
join public.subject_levels sl on sl.subject_id = s.id and sl.level = v.level::public.subject_level
join public.topics t on t.subject_level_id = sl.id and t.name = v.name
where m.topic_id = t.id and m.title = v.name || ' — revision notes';

drop table _seed_topics;
