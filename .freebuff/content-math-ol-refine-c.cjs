/**
 * Mathematics OL deepening, pass c: adds h3 subsections to the transformations
 * and vectors note (syllabus 7.1 to 7.4). Prose-only sections, inserted before
 * "Equations and symbols" by refine-note-sections.cjs; nothing already in the
 * note is rewritten.
 */

const sections = [
  {
    id: "6103544a-0080-4c85-af53-ddbb12284c25",
    slug: "transformations-and-vectors",
    proseOnly: true,
    heading: "Translations: moving a shape without changing it",
    html: `<h2>Translations: moving a shape without changing it</h2>
<p>A translation slides every point of a shape the same distance in the same direction. The shape keeps its size, its shape and its orientation, so the image is congruent to the object. The description needs a column vector, written (x; y), where x is the movement to the right and y is the movement up. Negative values move left or down.</p>
<h3>Reading a column vector</h3>
<p>The vector (3; −2) means move 3 units to the right and 2 units down. Read the top number first, as the horizontal movement, and the bottom number second, as the vertical movement. Swapping the two numbers is one of the most common errors, and it moves the shape to a completely different place.</p>
<h3>Translating a point</h3>
<p>To translate a point, add the vector to its coordinates. The point A(1, 4) under the translation (3; −2) becomes A′(1 + 3, 4 − 2) = A′(4, 2). Work out each coordinate separately and check that the sign of each movement is right before you write the answer.</p>
<h3>Translating a whole shape</h3>
<p>A triangle is translated by translating each of its three vertices and joining the new points with straight lines. Drawing only one vertex, or moving the shape by eye, loses the mark. Check the result by counting the squares between each object point and its image: every pair should show the same horizontal and vertical movement.</p>
<h3>Working backwards from an image</h3>
<p>A question may give the image and ask for the vector. Take one point and its image, and find the change in x and the change in y. If P(2, 5) maps to P′(7, 1), the vector is (7 − 2; 1 − 5) = (5; −4). Check with a second point before you write the vector down.</p>
<h3>Translations and the notation of the answer</h3>
<p>The answer to a translation question must give the vector, not a verbal description alone. \"Move 5 right and 4 down\" is acceptable in words, but the examiner expects the column vector form (5; −4), which is what the syllabus asks for. Write it in brackets with a semicolon between the two numbers.</p>
<h3>Common errors with translations</h3>
<p>The commonest errors are reversing the direction of the movement, moving only the x-coordinate, and rotating the shape by mistake when a translation was asked for. A translation never turns the shape over and never changes its size, so an image that looks rotated or stretched is wrong. Check each answer against the rule that the shape is unchanged.</p>
`,
  },
  {
    id: "6103544a-0080-4c85-af53-ddbb12284c25",
    slug: "transformations-and-vectors",
    proseOnly: true,
    heading: "Reflections: the mirror line and the image",
    html: `<h2>Reflections: the mirror line and the image</h2>
<p>A reflection flips a shape over a mirror line. Every point of the image is the same distance from the mirror line as the matching point of the object, on the opposite side. The size and shape are unchanged, but the orientation is reversed. A full description needs the equation of the mirror line, and a mark is lost for any answer that names no line.</p>
<h3>Reflection in the x-axis and y-axis</h3>
<p>Reflection in the x-axis sends (x, y) to (x, −y), so the sign of the y-coordinate changes. Reflection in the y-axis sends (x, y) to (−x, y). Learn these two rules as fixed facts, because they are the quickest marks in the topic.</p>
<h3>Reflection in a line such as y = x</h3>
<p>Reflection in the line y = x swaps the two coordinates: (x, y) maps to (y, x). Reflection in y = −x sends (x, y) to (−y, −x). Test a single point to confirm the rule before you apply it to the whole shape, since a sign slip here changes every vertex.</p>
<h3>Using the perpendicular distance</h3>
<p>For a mirror line that is not a standard axis, each point of the image lies on the perpendicular from the object point to the line, at the same distance beyond the line. Draw the perpendicular with a set square so the image is placed accurately, and count the squares on each side to check.</p>
<h3>Finding the mirror line from an object and image</h3>
<p>When the question asks for the mirror line, join each point to its image. All those joining lines are parallel, and the mirror line is the perpendicular bisector of each joining segment. Read the line from the diagram, then give its equation, for example x = 2 or y = x.</p>
<h3>Invariant points under reflection</h3>
<p>A point is invariant under a reflection if it does not move, which happens when it lies on the mirror line. Any point on the mirror line maps to itself, so it is a useful check: if a vertex you expected to stay fixed has moved, the reflection has been drawn in the wrong place.</p>
<h3>Common errors with reflections</h3>
<p>The commonest errors are reflecting in the wrong axis, giving the mirror line as a point rather than a line, and forgetting that the image is the reverse of the object. A reflection that leaves the shape the same way round as the object is a translation or a rotation, not a reflection, so check the orientation of the image.</p>
`,
  },
  {
    id: "6103544a-0080-4c85-af53-ddbb12284c25",
    slug: "transformations-and-vectors",
    proseOnly: true,
    heading: "Rotations: centre, angle and direction",
    html: `<h2>Rotations: centre, angle and direction</h2>
<p>A rotation turns a shape about a fixed point, the centre of rotation, through a given angle in a given direction. The size and shape are unchanged. A complete description has three parts: the centre, the angle and the direction, and a mark is lost for any part that is missing.</p>
<h3>The three parts of a rotation</h3>
<p>Write the rotation as "rotation through 90° clockwise about (0, 0)". Omitting the centre, or describing the rotation without its direction, does not earn the full mark even when the image is drawn correctly.</p>
<h3>Clockwise and anticlockwise</h3>
<p>Anticlockwise is the positive direction in mathematics, and clockwise is the negative. Confirm the direction by tracing the movement of one vertex from its object position to its image before you finalise the answer. Many lost marks come from drawing the image in the opposite direction.</p>
<h3>Rotations about the origin by 90° and 180°</h3>
<p>A 90° anticlockwise rotation about the origin sends (x, y) to (−y, x). A 180° rotation sends (x, y) to (−x, −y). A 90° clockwise rotation sends (x, y) to (y, −x). Check the rule on one vertex before you draw the whole image.</p>
<h3>Rotating a shape by drawing</h3>
<p>To rotate a shape by drawing, measure the distance from each vertex to the centre, and rotate the line through the given angle. Use tracing paper or a protractor, and check that every vertex is the same distance from the centre as its original. A vertex that lies at a different distance has been placed wrongly.</p>
<h3>Finding the centre of rotation</h3>
<p>When the question gives the object and the image and asks for the centre, the centre is the point that is the same distance from an object point and its image. Draw the perpendicular bisector of the segment joining a point to its image, and repeat with a second point. The two bisectors cross at the centre.</p>
<h3>Common errors with rotations</h3>
<p>The commonest errors are rotating about the wrong point, using the wrong sign for the angle, and changing the size of the shape. A rotation keeps every length the same, so a rotated image that looks bigger or smaller than the object has been enlarged, and the answer is wrong.</p>
`,
  },
  {
    id: "6103544a-0080-4c85-af53-ddbb12284c25",
    slug: "transformations-and-vectors",
    proseOnly: true,
    heading: "Enlargements: scale factor and centre",
    html: `<h2>Enlargements: scale factor and centre</h2>
<p>An enlargement changes the size of a shape by a scale factor from a centre of enlargement. The image is similar to the object, so the angles stay the same and the lengths are multiplied by the scale factor. A full answer gives the scale factor and the centre, and the centre is the point from which every line joining an object point to its image passes.</p>
<h3>Scale factor greater than one</h3>
<p>A scale factor greater than 1 makes the shape bigger. A scale factor of 3 triples every length, so a side of 4 cm becomes 12 cm, and the image lies further from the centre than the object. Check that the image is bigger in the right proportion before you finish.</p>
<h3>Scale factor between zero and one</h3>
<p>A scale factor between 0 and 1 makes the shape smaller. A scale factor of one half halves every length, so a side of 8 cm becomes 4 cm. The image lies between the centre and the object.</p>
<h3>Negative scale factors</h3>
<p>A negative scale factor enlarges the shape and also turns it through 180° about the centre. The image is on the opposite side of the centre from the object. A scale factor of −2 doubles the size and places the image on the other side. Include the sign in the answer, because −2 and 2 give different images.</p>
<h3>Finding the centre from the object and image</h3>
<p>Join each object point to its image with a straight line, and extend the lines until they meet. The point where they all cross is the centre of enlargement. Use two lines to find it, and check the third if you have one. Do not join the points to the wrong images, because the lines will not meet at a single point.</p>
<h3>Finding the scale factor from lengths</h3>
<p>The scale factor is the ratio of a length on the image to the matching length on the object: scale factor = image length ÷ object length. A side of 6 cm on the object matching 15 cm on the image gives a scale factor of 15 ÷ 6 = 2.5. Use the same pair of matching sides for the calculation, and check the answer with a second pair.</p>
<h3>Common errors with enlargements</h3>
<p>The commonest errors are dividing the wrong way round when finding the scale factor, adding the scale factor to the lengths rather than multiplying, and drawing the image from the wrong centre. An enlargement keeps the angles unchanged, so an image with changed angles is wrong, even if its lengths look correct.</p>
`,
  },
];

module.exports = { sections };
