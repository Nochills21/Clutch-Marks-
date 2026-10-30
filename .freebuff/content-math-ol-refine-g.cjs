/**
 * Mathematics OL deepening, pass g: adds h3 subsections to the bearings,
 * constructions and loci note (syllabus 4.2 Geometrical constructions,
 * 4.3 Scale drawings). Prose-only sections, inserted before "Equations and
 * symbols" by refine-note-sections.cjs; nothing already in the note is rewritten.
 */

const ID = "153c8051-6b06-48ca-b39a-24d41b791d2c";
const SLUG = "mensuration-bearings-and-loci";

const sections = [
  {
    id: ID,
    slug: SLUG,
    proseOnly: true,
    heading: "Bearings in more depth",
    html: `<h2>Bearings in more depth</h2>
<p>A bearing gives a direction as an angle measured clockwise from north, written as three figures. Bearings are the commonest context for angle questions in navigation, and they combine with the sine and cosine rules when the journey is not at right angles. The subsections below cover measuring, reversing and using bearings in a calculation, which are the three skills the mark scheme checks.</p>
<h3>Measuring a bearing with a protractor</h3>
<p>Place the centre of the protractor on the point where the bearing starts, with the zero line pointing north. Read the angle clockwise from north to the line that joins the start point to the target. A bearing of 65° is read on the outer scale of a protractor when the north line points up the page. Always check which scale you are reading, because the inner scale gives the anticlockwise angle and loses marks.</p>
<h3>Three-figure bearings in exam answers</h3>
<p>Exam bearings are written with exactly three figures, so a bearing of 8° is written 008°, and 65° is written 065°. The three-figure form is required even when the answer has a leading zero. A bearing given with two figures will normally be marked wrong, so write the final answer in the form the question asks for and keep the degree sign.</p>
<h3>The bearing of A from B and of B from A</h3>
<p>The bearing of B from A and the bearing of A from B are not the same. The first is measured at A, the second at B. They differ by exactly 180°, so if the bearing of B from A is 070°, the bearing of A from B is 250°. Draw a north line at each point, because the question usually asks for one direction and the reversed direction is the common error.</p>
<h3>Back bearings</h3>
<p>A back bearing is the bearing of the start point from the end point, and it is found by adding or subtracting 180°. If the bearing is less than 180°, add 180°. If it is more than 180°, subtract 180°. The back bearing is used when a journey is reversed, and it is also used as a check on a diagram, since the two north lines at the points are parallel.</p>
<h3>Bearings with trigonometry</h3>
<p>A bearing often describes one side of a triangle, and the other sides are found with the sine or cosine rule. Put the north lines on the diagram, mark the bearing as an angle between the north line and the side, and then find the interior angle of the triangle. Once the angle is known, the rule is applied in the usual way, and the bearings are only used to find that angle.</p>
<h3>A worked navigation problem</h3>
<p>A ship sails 12 km on a bearing of 040° and then 9 km on a bearing of 130°. The angle between the two legs at the turning point is found from the bearings: the turn is 130° − 040° = 090°, so the path is at right angles and the distance back to the start is √(12² + 9²) = 15 km. Each step uses one bearing to find an angle, and then Pythagoras or a rule gives the length.</p>
<h3>Checking a bearing answer</h3>
<p>A bearing must lie between 000° and 360°. Check that the answer is measured clockwise from north, that it has three figures, and that a diagram drawn to scale agrees with the value. A bearing of 200° points roughly south-south-west, so a diagram showing it pointing north-east is a sign that the angle was measured from the wrong line.</p>
`,
  },
  {
    id: ID,
    slug: SLUG,
    proseOnly: true,
    heading: "Geometrical constructions with ruler and compasses",
    html: `<h2>Geometrical constructions with ruler and compasses</h2>
<p>A construction is a drawing made with a ruler and a pair of compasses only, with no protractor and no measurement. The method is what gets the mark, so the arcs must be left visible on the final diagram. The subsections below give the standard constructions the syllabus asks for, with the steps for each and the checks that show the result is accurate.</p>
<h3>The perpendicular bisector of a line</h3>
<p>To construct the perpendicular bisector of a line AB, open the compasses to more than half the length of AB. Draw an arc from A above and below the line, then draw the same arc from B so that the two pairs of arcs cross at two points. The line joining those two crossing points is the perpendicular bisector. It cuts AB into two equal parts at a right angle.</p>
<h3>The bisector of an angle</h3>
<p>To bisect an angle, put the compass point on the vertex and draw an arc that cuts both arms of the angle. From each of those two points draw a further arc of equal radius, so the arcs cross inside the angle. The line from the vertex through the crossing point bisects the angle into two equal parts. The construction works for any angle, because the two triangles formed are congruent.</p>
<h3>A perpendicular from a point to a line</h3>
<p>To draw the perpendicular from a point P to a line, place the compass on P and draw an arc that cuts the line at two points. Then construct the perpendicular bisector of those two points. The bisector passes through P and meets the line at right angles, so it is the required perpendicular. This method works whether P is above or below the line.</p>
<h3>Constructing 60° and 90° angles</h3>
<p>A 60° angle is constructed by drawing an equilateral triangle. Draw a line, put the compass on one end, and mark an arc of radius equal to the line. From the other end draw a second arc of the same radius to cross it. Joining the crossing point to the two ends gives an equilateral triangle, so the angle at the end is 60°. A 90° angle is constructed as a perpendicular to a line through a point on it.</p>
<h3>Constructing a triangle from three sides</h3>
<p>To construct a triangle with sides 6 cm, 5 cm and 4 cm, draw the 6 cm base. Open the compass to 5 cm, place the point at one end, and draw an arc. Open to 4 cm, place the point at the other end, and draw a second arc to cross the first. Join the crossing point to the two ends. A triangle is fixed by its three sides, so the construction gives one unique shape.</p>
<h3>Accuracy and the arcs left on the diagram</h3>
<p>Examiners check the construction arcs, not only the final line. Leave every arc visible, use a sharp pencil, and keep the compass radius constant when it is supposed to be constant. A line drawn without its construction arcs can earn no method marks, even if it is in the correct place. Make the arcs light but clear, so a marker can see which steps were followed.</p>
<h3>Common construction errors</h3>
<p>The commonest errors are opening the compass by different amounts for arcs that should be equal, forgetting that the perpendicular bisector needs arcs from both ends, and drawing a bisector from the wrong vertex. Check each construction by measuring afterwards: the bisected parts should be equal, and the angle at a right-angle construction should be 90° when you check it with a protractor.</p>
`,
  },
  {
    id: ID,
    slug: SLUG,
    proseOnly: true,
    heading: "Loci: the set of points that obey a rule",
    html: `<h2>Loci: the set of points that obey a rule</h2>
<p>A locus is the set of all points that satisfy a given condition. In this note, loci are drawn with ruler and compasses, and the answer is a region or a line that a student must shade or describe. The subsections below cover the standard loci the syllabus names: points at a fixed distance, points equidistant from two points or two lines, and combined loci that give a region.</p>
<h3>A locus defined by a fixed distance</h3>
<p>The locus of points that are exactly 3 cm from a fixed point O is a circle of radius 3 cm with centre O. Every point on the circle is 3 cm from O, and no other point is. The locus of points within 3 cm of O is the region inside that circle, including the circle itself. Read the word "exactly" as a circle and the words "within" or "less than" as a region.</p>
<h3>Points equidistant from two points</h3>
<p>The locus of points equidistant from two points A and B is the perpendicular bisector of AB. Every point on that line is the same distance from A as from B. A question that asks for the points closer to A than to B asks for the half-plane on A's side of the bisector, so the answer is a region and not just the line.</p>
<h3>Points equidistant from two lines</h3>
<p>The locus of points equidistant from two intersecting lines is the pair of angle bisectors of the angles between them. The bisector of the angle between two lines passes through their intersection point. For two parallel lines, the locus is the single line midway between them, parallel to both.</p>
<h3>Combining loci to find a region</h3>
<p>Many questions ask for the region that satisfies two or more conditions at once. Draw each locus on the same diagram, using a light line for each. The required region is where all the conditions are true at the same time, so it is the overlap of the individual regions. Shade it and label it, since the marks are given for the correct region and not just for the lines.</p>
<h3>Loci with a distance from a line</h3>
<p>The locus of points at a fixed distance from a straight line is two lines, one on each side, parallel to the original line and at that distance. Within a given distance the region is the strip between those two lines. This type of question is often combined with a circle or a perpendicular bisector, so draw the strip first and then the other constraint.</p>
<h3>Reading a locus question in words</h3>
<p>The key phrases are "equidistant", "closer to", "within", "at a fixed distance" and "at equal distances from". Each phrase maps to one locus: equidistant from points gives a bisector, equidistant from lines gives an angle bisector, and within a distance gives a circle or a strip. Underline the phrase in the question, name its locus, and then construct it.</p>
<h3>Checking a locus diagram</h3>
<p>Test a point in each region of your answer and confirm it satisfies the conditions. A point inside the shaded area must be closer to the stated point, and a point outside it must fail. Leaving the construction arcs visible also lets the marker check the construction, so keep them even when the answer is a shaded region.</p>
`,
  },
  {
    id: ID,
    slug: SLUG,
    proseOnly: true,
    heading: "Scale drawings and scale factors",
    html: `<h2>Scale drawings and scale factors</h2>
<p>A scale drawing represents a real object or place at a reduced or enlarged size, and the scale tells you how each length in the drawing relates to the real length. The syllabus asks for scale drawings in statement 4.3, and the work involves ratios, unit conversion and the scale factor for areas. The subsections below go through each of these, with a method for each type of question.</p>
<h3>Writing a scale as a ratio</h3>
<p>A scale is often written as a ratio such as 1 : 50 or 1 cm to 2 m. In a ratio 1 : 50, one unit on the drawing represents 50 of the same units in reality. The two lengths must be in the same units before the ratio is used, because 1 cm to 2 m is 1 : 200, not 1 : 2. Convert first, then apply the ratio.</p>
<h3>Reading a scale drawing</h3>
<p>To find a real length from a drawing, measure the length on the drawing and multiply by the scale factor. A wall that measures 6 cm on a plan drawn to 1 : 50 is 6 × 50 = 300 cm, or 3 m, in reality. Keep track of the units throughout, and convert the final answer to the units the question asks for.</p>
<h3>Making a scale drawing</h3>
<p>To draw a room 4 m by 3 m at a scale of 1 cm to 1 m, divide each real length by the scale: 4 m becomes 4 cm and 3 m becomes 3 cm. Draw a rectangle 4 cm by 3 cm and label the scale on the drawing. A scale drawing that does not state its scale can be marked as incomplete, so always write it on the drawing.</p>
<h3>Scale factors for lengths</h3>
<p>A scale factor relates a length on the drawing to the corresponding real length. Given a scale of 1 : 25, the scale factor is 25, meaning every real length is 25 times its length on the drawing. If the drawing is an enlargement, the scale factor is greater than 1, and if it is a reduction it is less than 1, so read the direction of the change before using the value.</p>
<h3>Scale factors for areas</h3>
<p>When lengths are scaled by a factor k, areas are scaled by k². A square on a plan with side 2 cm at a scale of 1 : 100 has a real side of 200 cm, so its real area is 200² = 40 000 cm², or 4 m². The drawn area is 2² = 4 cm². The real area is 100² = 10 000 times the drawn area, which is the square of the length scale factor.</p>
<h3>Map scales and bearings together</h3>
<p>A map scale is used with bearings in navigation questions. A point 5 cm from a town on a map at 1 : 100 000 is 5 × 100 000 = 500 000 cm, or 5 km, from it. The bearing is measured on the map with a protractor in the usual way. Combining the scale and the bearing gives the position of one point relative to another, which is a common exam question.</p>
<h3>Checking a scale answer</h3>
<p>Confirm that the answer has the right order of magnitude. A distance of 3 km on a plan at 1 : 1000 should be drawn about 3 m, and a drawing that makes it 3 mm is wrong by a factor of 1000. Also check that area answers have units squared, since a common mistake is to scale the lengths correctly and forget to square the scale factor for the area.</p>
`,
  },
];

module.exports = { sections };
