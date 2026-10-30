/**
 * Mathematics OL deepening, pass j: adds h3 subsections to the statistics and
 * data handling note (syllabus 9.1 classifying, 9.2 interpreting, 9.3 averages
 * and range, 9.4 charts and diagrams, 9.6 cumulative frequency, 9.7 histograms).
 * Prose-only sections, inserted before "Equations and symbols" by
 * refine-note-sections.cjs; nothing already in the note is rewritten.
 */

const ID = "c4de73c5-5ba1-4192-a207-71e25ddd6870";
const SLUG = "statistics-data-handling";

const sections = [
  {
    id: ID,
    slug: SLUG,
    proseOnly: true,
    heading: "Collecting and classifying data",
    html: `<h2>Collecting and classifying data</h2>
<p>Every statistical question starts with data, and the type of data decides which averages and diagrams are sensible. Before any calculation, decide where the data came from, what kind of values it holds, and whether the sample is fair. The subsections below set out these decisions in the order an examiner expects them to be made.</p>
<h3>Primary and secondary data</h3>
<p>Primary data is collected by the person who uses it, for example by a survey or an experiment carried out in class. Secondary data is taken from an existing source such as a census, a published table or a sports website. Primary data suits a question that needs a specific answer, while secondary data is quicker but may not match the exact question being asked. State which kind you have used when you describe an investigation.</p>
<h3>Discrete and continuous data</h3>
<p>Discrete data takes separate values that are usually counted, such as the number of goals scored or the number of people in a family. Continuous data can take any value in a range and is measured, such as height, mass or time. The distinction matters for grouping: a discrete table can use single values, while a continuous table needs class intervals with clear boundaries such as 10 ≤ t &lt; 20.</p>
<h3>Qualitative and quantitative data</h3>
<p>Qualitative data describes a quality, such as eye colour or favourite subject, and cannot be averaged. Quantitative data is numerical and can be ordered and added. A mean is only meaningful for quantitative data, so a question that asks for the mean colour is answered by naming the mode or by stating that no mean exists.</p>
<h3>Reading the question before the data</h3>
<p>Underline what the question asks for before reading the table: a mode, a median, a range, a comparison or a conclusion. Many marks are lost by calculating the right number and then answering a different question. Note the units and the sample size at the same time, because the sample size is needed for a relative frequency and the units for a correct final statement.</p>
<h3>Bias in samples and questionnaires</h3>
<p>A sample is biased when some members of the population are more likely to be chosen than others. Asking only students in one class about a school-wide question is biased, and so is a question that leads the respondent, such as asking whether people agree that the bus service is too slow. A fair sample is random, large enough to represent the group, and drawn from the whole population being studied.</p>
<h3>Judging the reliability of a conclusion</h3>
<p>A conclusion is only as reliable as the data behind it. A small sample, an unrepresentative group or a question with an obvious bias weakens any statement drawn from it. A good answer names one weakness and suggests a change, such as taking a larger sample across a wider range of times or places.</p>
<h3>Drawing a conclusion from a table</h3>
<p>A conclusion must be supported by a number from the table and must answer the question asked. If the mean time for group A is 14 minutes and for group B is 18 minutes, the statement that group B took longer on average is supported, but a statement about all pupils in the school is not, because only two groups were measured.</p>
`,
  },
  {
    id: ID,
    slug: SLUG,
    proseOnly: true,
    heading: "Averages and spread in depth",
    html: `<h2>Averages and spread in depth</h2>
<p>The mean, median and mode each describe the centre of a set of data in a different way, and the range and interquartile range describe the spread. A careful answer uses the average that fits the data and the measure of spread that shows how far the values lie from it. The subsections below work through each measure in the form the question is most likely to use.</p>
<h3>The mode for discrete and grouped data</h3>
<p>The mode is the value that occurs most often. In a discrete frequency table it is the value with the largest frequency. For grouped data it is the modal class, the class with the largest frequency, and the answer is given as a class interval rather than a single value. A data set can have no mode, one mode or several modes.</p>
<h3>The median from an ordered list</h3>
<p>To find the median, arrange the values in order and locate the middle one. For n values the median is at position (n + 1) ÷ 2. With nine values the median is the fifth value, and with ten values it is the average of the fifth and sixth. Always order the data before counting, because the median taken from an unsorted list is wrong even when the middle value is chosen carefully.</p>
<h3>Choosing an average</h3>
<p>The mean uses every value, but it is pulled by extreme values. The median is not affected by one very large value, and the mode is the only average that can be used with qualitative data. A typical question asks which average best describes a set of salaries that includes one very large income; the answer is the median, with the reason that the mean is pulled up by the outlier.</p>
<h3>The effect of an outlier</h3>
<p>An outlier is a value far from the rest of the data. Adding one outlier to a small set changes the mean noticeably but may leave the median and mode unchanged. When an exam question asks for the effect of a change, work out the mean before and after the change, rather than guessing the direction from the size of the new value.</p>
<h3>Range as a measure of spread</h3>
<p>The range is the largest value minus the smallest value. It is quick to find but depends on only two values, so one outlier can make it large even when the rest of the data are close together. When comparing two data sets, state both the range and the centre, because two sets with the same mean can have very different ranges.</p>
<h3>The interquartile range</h3>
<p>The interquartile range is the upper quartile minus the lower quartile, the spread of the middle half of the data. It ignores the extreme values at each end and is therefore less affected by outliers than the range. For a list of 12 ordered values, the lower quartile is the median of the lower six values and the upper quartile is the median of the upper six.</p>
<h3>Estimating the mean of grouped data</h3>
<p>For grouped data the exact values are unknown, so the mean is estimated using the midpoint of each class. Multiply each midpoint by its frequency, add the products and divide by the total frequency: mean = Σfx ÷ Σf, where x is the midpoint. The answer is an estimate, and the working should say so, because the true mean depends on where each value sits inside its class.</p>
`,
  },
  {
    id: ID,
    slug: SLUG,
    proseOnly: true,
    heading: "Reading charts and diagrams",
    html: `<h2>Reading charts and diagrams</h2>
<p>A chart is a summary of data, and the examiner expects you to read the values it shows, compare them and point out where a chart is misleading. Each diagram type has its own rules for scales, keys and angles. The subsections below cover the diagrams most often used in this topic and the errors that lose marks.</p>
<h3>Bar charts and dual bar charts</h3>
<p>A bar chart shows the frequency of each category, with equal gaps between the bars. A dual bar chart places two bars side by side for each category, so the two data sets can be compared directly. Read the scale carefully, because a scale that starts at a value other than zero exaggerates small differences between bars.</p>
<h3>Pictograms with a key</h3>
<p>A pictogram uses a symbol to stand for a number of items, and the key says how many each symbol represents. A symbol that stands for 10 items with 3 and a half symbols shown means 35 items. Partial symbols are the step that most often goes wrong, so divide the partial symbol by its share of the full symbol before multiplying by the key value.</p>
<h3>Pie charts and angles</h3>
<p>In a pie chart each sector has an angle equal to the frequency divided by the total, multiplied by 360°. A category with frequency 30 out of a total of 120 has an angle of 30 ÷ 120 × 360° = 90°. Working backwards, a sector of 72° in a total of 200 represents 72 ÷ 360 × 200 = 40 items.</p>
<h3>Line graphs for time series</h3>
<p>A line graph joins points that show a quantity over time, and the gradient shows the rate of change. A steeper line means a faster increase or decrease. When a question asks for the trend, describe the direction and the rate in words, and do not join points across a gap in the time axis without saying so.</p>
<h3>Misleading scales and axes</h3>
<p>A chart is misleading when its vertical axis does not start at zero, when the bars have different widths, or when a three-dimensional effect distorts the sizes. Each of these changes how large a difference looks. In an exam, name the feature that misleads, state what it does to the picture, and say how the chart should be drawn instead.</p>
<h3>Comparing two distributions on one chart</h3>
<p>Two distributions can be compared on one chart by using the same scales and the same class intervals. Compare the centre, using a median or mean, and the spread, using a range or interquartile range. A comparison that gives only the higher or lower value of one data set is incomplete, and must be followed by the matching value for the other.</p>
<h3>Reading a chart in an exam question</h3>
<p>Read the title, the axis labels, the units and the key before answering. Then take each value from the chart and write it in the working so the marker can see where it came from. A correct chart reading with the value written out earns the method marks even when the final statement is worded loosely.</p>
`,
  },
  {
    id: ID,
    slug: SLUG,
    proseOnly: true,
    heading: "Cumulative frequency and histograms in practice",
    html: `<h2>Cumulative frequency and histograms in practice</h2>
<p>A cumulative frequency curve is built from a running total, and it gives the median and quartiles of a grouped data set. A histogram displays the same kind of grouped data with frequency density on the vertical axis, so its bars can have unequal widths. The subsections below set out the steps for each diagram in the order used in a written answer.</p>
<h3>Building the cumulative frequency table</h3>
<p>Add a column to the grouped table and fill it with the running total of the frequencies. The cumulative frequency at the upper boundary of each class is the total of all frequencies up to and including that class. The final cumulative frequency equals the total number of values, and this check should be made before plotting.</p>
<h3>Plotting the cumulative frequency curve</h3>
<p>Plot each cumulative frequency against the upper class boundary, and join the points with a smooth curve. The first point is usually placed at the lower boundary of the first class with a cumulative frequency of zero. A ruler-straight line between points is not the expected shape, because the curve shows how the data build up across the range.</p>
<h3>Reading the median and quartiles from the curve</h3>
<p>The median is read at a cumulative frequency of n ÷ 2, the lower quartile at n ÷ 4 and the upper quartile at 3n ÷ 4. Draw a horizontal line from each of these values to the curve, then a vertical line down to the horizontal axis. The interquartile range is the upper quartile minus the lower quartile, and it should be stated with its units.</p>
<h3>Percentiles and other points on the curve</h3>
<p>A percentile is read in the same way, with the cumulative frequency given as a percentage of the total. The 90th percentile is at 0.9n, and a question that asks how many values lie above a given value is answered by subtracting the cumulative frequency at that value from the total. Showing the subtraction in the working is what earns the method mark.</p>
<h3>Drawing a histogram from a grouped table</h3>
<p>For a histogram with unequal class widths, calculate the frequency density for each class as frequency ÷ class width, and plot that on the vertical axis. The horizontal axis is a continuous scale with the class boundaries marked. The bars touch because the data are continuous, and the histogram must have a title, labelled axes and a scale.</p>
<h3>Reading a frequency estimate from a histogram</h3>
<p>The area of a bar equals the frequency of its class, because the bar's height is the frequency density and its width is the class width. To estimate how many values lie between 20 and 35, add the areas of the bars across that interval, using part of a bar when the interval starts or ends inside a class. This is the most common histogram question, and the working should show each area.</p>
<h3>Comparing two histograms and two curves</h3>
<p>Two histograms or two cumulative frequency curves are compared by their medians and spreads. A curve lying further to the right has a higher median, and a steeper curve has a smaller interquartile range. A comparison statement names the group, gives the value of the measure for each group and states which is larger, in that order.</p>
`,
  },
];

module.exports = { sections };
