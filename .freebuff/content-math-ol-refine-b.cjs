/**
 * Mathematics OL deepening, pass b: adds h3 subsections to the scatter
 * diagrams and correlation note (syllabus 9.5). Prose-only sections, inserted
 * before "Equations and symbols" by refine-note-sections.cjs; nothing already
 * in the note is rewritten.
 */

const sections = [
  {
    id: "985e5e58-2c70-4482-a993-72769a2c63d1",
    slug: "scatter-diagrams-and-correlation",
    proseOnly: true,
    heading: "Plotting the points: axes, scales and accuracy",
    html: `<h2>Plotting the points: axes, scales and accuracy</h2>
<p>A scatter diagram shows two variables plotted against each other, one point for each pair of values. Most of the marks for a plotting question come from setting the axes up correctly and placing each point accurately, so the subsections below take the process one step at a time.</p>
<h3>Choosing which variable goes on which axis</h3>
<p>The variable that is being explained or predicted goes on the vertical axis, and the variable that does the explaining goes on the horizontal axis. If a question gives a table of hours of revision and test scores, hours go on the x-axis and scores on the y-axis. Check the wording of the question, because an examiner may ask you to read a value from one axis to predict a value on the other.</p>
<h3>Choosing a sensible scale</h3>
<p>The scale on each axis should spread the data over at least half of the grid in both directions. Use equal steps of 1, 2, 5 or 10 units, and do not start an axis at a value that wastes most of the grid. If the values run from 42 to 58, the axis can start at 40 rather than at 0, provided the axis is labelled clearly so the reader sees that it does not start at zero.</p>
<h3>Labelling the axes with name and unit</h3>
<p>Each axis needs the name of the quantity and its unit, for example "Mass (kg)" or "Time (minutes)". A diagram without labels or units loses the presentation mark even when every point is correct. Write the scale numbers evenly spaced and make the labels readable, because an unreadable scale makes an estimate from the graph unreliable.</p>
<h3>Plotting each point accurately</h3>
<p>Plot each pair (x, y) by moving across to x and then up to y, and mark the point with a small neat cross or dot. A point plotted at (3, 7) must sit three units along the horizontal axis and seven units up, not one unit off in either direction. Check the table again after plotting, because a single misread value shows up as a point far away from the rest of the cloud.</p>
<h3>Checking the number of points</h3>
<p>Count the points on the diagram and compare with the number of rows in the table. A missing point is the most common error, and a diagram with one point missing can still look like a correct pattern. Tick each row of the table as you plot it, which takes a few seconds and protects the mark.</p>
<h3>Spotting an outlier before you draw the line</h3>
<p>An outlier is a point that lies well away from the general pattern of the others. Identify any outlier before you decide on the trend, because a single extreme point can pull a line of best fit away from where most of the data lies. An outlier is not always an error: note it and say whether it affects the conclusion.</p>
<h3>Using a table to check the diagram</h3>
<p>Once the diagram is drawn, read two or three points back from the graph and check them against the table. If the graph reads 6 at a point the table lists as 9, there is a plotting mistake that would cost every later estimate. This habit is quick and it turns a plausible but wrong diagram into a checked one.</p>
`,
  },
  {
    id: "985e5e58-2c70-4482-a993-72769a2c63d1",
    slug: "scatter-diagrams-and-correlation",
    proseOnly: true,
    heading: "Describing correlation: strength, direction and the wording examiners expect",
    html: `<h2>Describing correlation: strength, direction and the wording examiners expect</h2>
<p>Correlation describes the relationship between two variables. The description has two parts, the direction and the strength, and an answer that gives only one of them earns little credit. The subsections below set out the terms in the order a mark scheme checks them.</p>
<h3>Positive correlation</h3>
<p>Positive correlation means that as one variable increases, the other tends to increase as well. The points rise from left to right on the diagram. Engine size and fuel consumption for cars is a common example, where larger engines tend to use more fuel. Write the description in terms of the two named quantities, not in general words.</p>
<h3>Negative correlation</h3>
<p>Negative correlation means that as one variable increases, the other tends to decrease. The points fall from left to right. The age of a car and its resale value is an example of a negative relationship. A mark scheme looks for the word "negative" together with the direction of change, so write both.</p>
<h3>No correlation</h3>
<p>No correlation means that the points show no clear pattern, so knowing one variable does not help predict the other. The points look scattered at random across the grid. Do not say "no correlation" when the points form a loose pattern: if a trend can be seen, describe it with a strength such as weak, and say that it is weak.</p>
<h3>Strong and weak correlation</h3>
<p>Strong correlation means that the points lie close to a straight line. Weak correlation means that they are spread out around a trend that is still visible. The strength depends on how closely the points cluster, not on how steep the trend is. A steep line of points that are widely scattered is a weak correlation.</p>
<h3>Linear and non-linear patterns</h3>
<p>A correlation can be described as linear if the points follow a straight line, and the line of best fit is only appropriate for a linear pattern. A curved pattern, such as a set of points that rise and then level off, should be described as a curve, and a straight line should not be drawn through it. Recognising the shape first prevents an inappropriate line from being used for an estimate.</p>
<h3>A complete description in one sentence</h3>
<p>A complete answer names the two variables, the direction and the strength in one sentence: "There is a strong positive correlation between the hours of revision and the test score." This form is safe in the exam because each element can be checked against the mark scheme. Avoid saying that the points "go up" without naming what they show.</p>
<h3>The wording that loses marks</h3>
<p>Two phrases lose marks repeatedly. "The more the variable increases, the more the other increases" describes a relationship without stating a direction clearly, and "the points are close" does not say close to what. Replace any vague phrase with the named quantities and the direction of change, and the description becomes precise.</p>
`,
  },
  {
    id: "985e5e58-2c70-4482-a993-72769a2c63d1",
    slug: "scatter-diagrams-and-correlation",
    proseOnly: true,
    heading: "The line of best fit: drawing it and using it",
    html: `<h2>The line of best fit: drawing it and using it</h2>
<p>A line of best fit is a straight line drawn through the middle of the points so that roughly as many points lie above it as below it. It summarises the trend and makes estimates possible. The subsections below cover how to draw the line and how to use it safely.</p>
<h3>Where the line must pass</h3>
<p>The line of best fit should pass through the mean point, which is the point with the mean of the x-values and the mean of the y-values. Calculate the mean of each variable from the table, plot that point, and then place the line through it. This gives the examiner a clear rule to check, and it stops the line drifting toward the outliers.</p>
<h3>Balancing the points</h3>
<p>Place the ruler so that the points are spread evenly on either side of the line, with about the same number above as below. Points that lie close together near the middle of the diagram count for more in deciding the position than a single distant point. Adjust the line by eye until the balance looks right, then check it against the mean point.</p>
<h3>Drawing a ruled line</h3>
<p>Draw the line with a sharp pencil and a ruler, from one edge of the grid to the other if the data allows it. A line that stops short of the data or wobbles between points will be marked as a poor line. Make the line thin and clear so that it can be read against the points.</p>
<h3>Estimating a value from the line</h3>
<p>To estimate the y-value for a given x-value, find the x-value on the horizontal axis, move up to the line, and then read across to the vertical axis. Mark the path with a dotted line so that the reading can be checked. Give the estimate with the same unit as the axis, and round it sensibly, usually to the precision of the scale.</p>
<h3>Estimating an x-value from the line</h3>
<p>The reverse process starts on the vertical axis. Find the required y-value, move across to the line, and then down to the horizontal axis. Students often confuse the two directions, so write the value you are looking for beside the axis before you begin.</p>
<h3>Gradient of the line of best fit</h3>
<p>The gradient of the line is the change in y divided by the change in x between two points on the line. Choose two points that are well apart on the line, not two points from the data, and read their coordinates accurately. The gradient tells you how fast y changes for each unit increase in x, which is the rate the question is usually asking about.</p>
<h3>Common errors when drawing the line</h3>
<p>The commonest errors are joining the points dot to dot, which produces a zigzag and is not a line of best fit, forcing the line through the origin when the data does not support it, and drawing a curve through points that follow a straight trend. Check the drawn line against the mean point and the balance of the points before you accept it.</p>
`,
  },
  {
    id: "985e5e58-2c70-4482-a993-72769a2c63d1",
    slug: "scatter-diagrams-and-correlation",
    proseOnly: true,
    heading: "Interpolation, extrapolation and the limits of a prediction",
    html: `<h2>Interpolation, extrapolation and the limits of a prediction</h2>
<p>Using a line to predict a value is only as reliable as the data behind it. Whether a prediction is safe depends on where the value lies relative to the data. The subsections below separate the two kinds of estimate and explain why one is more trustworthy than the other.</p>
<h3>Interpolation: estimating inside the data</h3>
<p>Interpolation estimates a value inside the range of the data already plotted. If the data covers hours of revision from 2 to 10 and you estimate the score for 6 hours, you are interpolating. Interpolation is generally reliable when the points follow a clear trend, because the estimate lies between values that were actually measured.</p>
<h3>Extrapolation: estimating beyond the data</h3>
<p>Extrapolation estimates a value outside the range of the data. Predicting the score for 15 hours of revision, when the data stops at 10 hours, is extrapolation. The trend may not continue beyond the data, so an extrapolated value is less reliable, and a good answer says so.</p>
<h3>Why extrapolation can mislead</h3>
<p>A straight-line trend may level off, reverse or stop altogether once the data runs out. A plant may stop growing once it reaches its maximum height, and a car's fuel use does not keep rising in a straight line at every speed. An examiner expects you to recognise that a value far outside the data is a weak prediction even when the arithmetic is correct.</p>
<h3>Stating the reliability of an estimate</h3>
<p>When you give an estimate, comment on whether it is an interpolation or an extrapolation, and on whether the pattern is strong enough to trust it. A sentence such as "This is an extrapolation, so it is less reliable because the trend may not continue" earns the mark for interpretation. Keep the comment short and specific to the data.</p>
<h3>Reading a value that is off the scale</h3>
<p>Sometimes the value you need lies just off the edge of the grid. Extend the line carefully along its existing direction and read the value from the extended line, marking clearly that the line has been extended. Do not extend the line by guesswork, and do not extend it far beyond the data.</p>
<h3>Using the trend for a context question</h3>
<p>A question may ask you to use the diagram to predict a value and then comment on whether the prediction is realistic. For example, if the line predicts a negative number of days, the answer is not sensible in context, even though it is what the line gives. Checking the sign and the size of a prediction against what the quantity can physically be is a mark in its own right.</p>
<h3>The effect of an outlier on a prediction</h3>
<p>A single outlier can shift the line of best fit and change a prediction noticeably. If the question asks you to comment on an estimate, say whether the outlier affects the line, and whether the prediction would change if the outlier were removed. This shows the examiner that you understand how fragile a single estimate can be.</p>
`,
  },
];

module.exports = { sections };
