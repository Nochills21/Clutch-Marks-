-- Maths OL batch 3: notes top-up (append only)

UPDATE study_materials SET content = content || $n$
<h3>Reading a scatter diagram</h3>
<p>Each point plots one pair of values. Positive correlation means y tends to rise as x rises; negative correlation means it falls. The strength of correlation depends on how closely the points cluster around a line. Correlation does not prove causation.</p>
<h3>Lines of best fit</h3>
<p>Draw a straight line through the middle of the points, with roughly equal numbers of points on each side, and use it to estimate values. Interpolation (inside the data range) is generally reliable; extrapolation (beyond the data) is less so and should be stated as an estimate.</p>
<h3>Outliers</h3>
<p>A point far from the general pattern is an outlier. Mention it in your answer and state whether it affects the conclusion, rather than ignoring it silently.</p>
$n$ WHERE material_type = 'notes' AND topic_id = (SELECT id FROM topics WHERE slug = 'scatter-diagrams-and-correlation');

UPDATE study_materials SET content = content || $n$
<h3>Mean, median, mode and range</h3>
<p>For ungrouped data, the mean is the sum of values divided by the number of values; the median is the middle value after ordering (the average of the two middle values if there is an even count); the mode is the most frequent value; the range is the largest minus the smallest value.</p>
<h3>Frequency tables and grouped data</h3>
<p>For a frequency table, the mean is the sum of (value × frequency) divided by the total frequency. For grouped data, use the midpoint of each class as the value and state that the answer is an estimate.</p>
<h3>Charts and diagrams</h3>
<p>Pie charts use angles: each sector angle is the category frequency divided by the total, multiplied by 360°. Bar charts have gaps between bars; histograms have no gaps, and for unequal class widths the height shown is frequency density.</p>
$n$ WHERE material_type = 'notes' AND topic_id = (SELECT id FROM topics WHERE slug = 'statistics-data-handling');

UPDATE study_materials SET content = content || $n$
<h3>Probability scale and notation</h3>
<p>Probabilities lie between 0 (impossible) and 1 (certain), and may be written as fractions, decimals or percentages. The probabilities of all outcomes in a sample space add up to 1, so the probability of an event not happening is 1 minus the probability it happens.</p>
<h3>Combined events and tree diagrams</h3>
<p>For independent events, multiply the probabilities along the branches. For events without replacement, the second probabilities change, so recalculate the denominators on the second set of branches. Add the probabilities of separate routes that give the required outcome.</p>
<h3>Expected frequency</h3>
<p>Expected frequency is the probability multiplied by the number of trials. For example, if a coin is tossed 200 times the expected number of heads is 200 × 0.5 = 100.</p>
$n$ WHERE material_type = 'notes' AND topic_id = (SELECT id FROM topics WHERE slug = 'statistics-probability');

UPDATE study_materials SET content = content || $n$
<h3>Translations</h3>
<p>A translation moves every point the same distance in the same direction, described by a column vector (x; y): x units across (positive to the right) and y units up (positive upwards). The shape and orientation do not change.</p>
<h3>Reflections, rotations and enlargements</h3>
<p>A reflection is described by its mirror line, such as x = 2 or y = x. A rotation needs its centre, angle and direction. An enlargement needs its centre and scale factor; a negative scale factor inverts the image. Check the image by measuring its distance from the centre.</p>
<h3>Vectors and magnitude</h3>
<p>Write a column vector as (x; y). Its magnitude is √(x² + y²). Adding vectors adds the corresponding components, and multiplying by a scalar multiplies each component. The vector from A to B is found as the position vector of B minus the position vector of A.</p>
$n$ WHERE material_type = 'notes' AND topic_id = (SELECT id FROM topics WHERE slug = 'transformations-and-vectors');

UPDATE study_materials SET content = content || $n$
<h3>SOH CAH TOA</h3>
<p>In a right-angled triangle with angle θ: sin θ = opposite ÷ hypotenuse, cos θ = adjacent ÷ hypotenuse and tan θ = opposite ÷ adjacent. Label the sides relative to the angle you are using before choosing the ratio. Use Pythagoras to find a missing side first if needed.</p>
<h3>Finding angles</h3>
<p>To find an angle, use the inverse function, sin⁻¹, cos⁻¹ or tan⁻¹, on the calculator. Set the calculator to degree mode and check that the answer is sensible for the triangle drawn.</p>
<h3>Bearings and angles of elevation</h3>
<p>An angle of elevation is measured up from the horizontal, and an angle of depression down from it. Draw a clear right-angled triangle from the description to choose the correct ratio. Round the answer to the accuracy in the question, and keep full accuracy in intermediate steps.</p>
$n$ WHERE material_type = 'notes' AND topic_id = (SELECT id FROM topics WHERE slug = 'trigonometry-right-angled-triangles');

UPDATE study_materials SET content = content || $n$
<h3>The sine rule</h3>
<p>For any triangle with sides a, b, c opposite angles A, B, C: a/sin A = b/sin B = c/sin C. Use it when you know a pair of opposite side and angle (for example, two angles and a side, or a side and its opposite angle with another side). Find the missing angle using the angle sum of 180° first.</p>
<h3>The cosine rule</h3>
<p>a² = b² + c² − 2bc cos A, and cos A = (b² + c² − a²) ÷ 2bc. Use it when you know two sides and the included angle, or all three sides. Careful with negative cosines: an obtuse angle gives a negative cos value.</p>
<h3>Area of a triangle</h3>
<p>Area = ½ab sin C, using two sides and the included angle. This avoids finding the perpendicular height.</p>
$n$ WHERE material_type = 'notes' AND topic_id = (SELECT id FROM topics WHERE slug = 'trigonometry-sine-and-cosine-rules');
