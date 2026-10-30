/**
 * Mathematics OL deepening, pass a: adds h3 subsections to the
 * fractions, decimals and percentages note. Each section is prose-only
 * (the note carries no diagram that these sections need). Inserted before
 * "Equations and symbols" by refine-note-sections.cjs; nothing already in
 * the note is rewritten.
 */

const sections = [
  {
    id: "7798ea37-c64d-4cc6-a474-c55584ee86a7",
    slug: "number-fractions-decimals-and-percentages",
    proseOnly: true,
    heading: "Fractions in practice: simplifying, adding and dividing",
    html: `<h2>Fractions in practice: simplifying, adding and dividing</h2>
<p>Most lost marks on fraction questions come from skipping one small step. Simplify early, find a common denominator before adding, and turn a division into a multiplication by the reciprocal. Each subsection below gives one rule and one fully worked number.</p>
<h3>Simplifying by the highest common factor</h3>
<p>To simplify a fraction, divide the numerator and the denominator by their highest common factor. For example, 6/8 has a highest common factor of 2, so 6/8 = 3/4. A fraction is fully simplified when the numerator and denominator share no factor except 1. Check this before you give a final answer, because an unsimplified fraction usually loses the accuracy mark.</p>
<h3>Adding and subtracting fractions</h3>
<p>Fractions can only be added or subtracted once they share a denominator. Write each over the lowest common multiple of the denominators. For 2/3 + 3/4, the common denominator is 12, so the sum is 8/12 + 9/12 = 17/12. Leave an improper fraction as a mixed number if the question asks for one: 17/12 = 1 5/12.</p>
<h3>Multiplying fractions</h3>
<p>Multiply the numerators together and the denominators together. Cancel common factors first, because it keeps the numbers small. For 2/3 × 3/5, the 3 on the top and the 3 on the bottom cancel, leaving 2/5. Do not add the denominators when multiplying, which is a common error.</p>
<h3>Dividing fractions: keep, change, flip</h3>
<p>To divide by a fraction, multiply by its reciprocal. Keep the first fraction, change the division to multiplication, and flip the second fraction. For 3/4 ÷ 2/5, write 3/4 × 5/2 = 15/8 = 1 7/8. A whole number divided by a fraction works the same way once the whole number is written over 1.</p>
<h3>Converting between mixed numbers and improper fractions</h3>
<p>To write a mixed number as an improper fraction, multiply the whole number by the denominator, add the numerator, and keep the denominator. So 2 3/5 = (2 × 5 + 3)/5 = 13/5. To go the other way, divide the numerator by the denominator: 13 ÷ 5 gives 2 remainder 3, so 13/5 = 2 3/5. Use whichever form the question's wording suggests.</p>
<h3>Finding a fraction of an amount</h3>
<p>To find a fraction of a quantity, divide by the denominator and then multiply by the numerator. Three eighths of 240 is 240 ÷ 8 = 30, then 30 × 3 = 90. Writing the fraction as a single multiplication, 3/8 × 240 = 90, gives the same answer and is quicker on a calculator.</p>
<h3>Fractions in word problems</h3>
<p>When a question says "two fifths of the class walk to school", the phrase "of" means multiply. Identify the whole first, because the fraction applies to that whole. If a quantity is left after a fraction is taken, subtract the fraction from 1 before you multiply. For example, if 3/8 of the money is spent, 1 − 3/8 = 5/8 is left.</p>`,
  },
  {
    id: "7798ea37-c64d-4cc6-a474-c55584ee86a7",
    slug: "number-fractions-decimals-and-percentages",
    proseOnly: true,
    heading: "Decimals in practice: place value, rounding and estimating",
    html: `<h2>Decimals in practice: place value, rounding and estimating</h2>
<p>Decimal questions test place value more than arithmetic. Know which digit is the tenths, the hundredths and the thousandths, and round only once you have the final value. The subsections below cover the rules that appear most often in papers.</p>
<h3>Rounding to decimal places and significant figures</h3>
<p>To round to a number of decimal places, look at the digit after the last one you keep. If it is 5 or more, round up. For example, 0.004 56 rounded to 3 decimal places is 0.005, while rounded to 2 significant figures it is 0.0046. Significant figures count from the first non-zero digit, so the leading zeros in 0.004 56 do not count.</p>
<h3>Multiplying and dividing by powers of ten</h3>
<p>Multiplying by 10 moves every digit one place to the left, so 3.27 × 100 = 327. Dividing by 10 moves the digits one place to the right, so 0.5 ÷ 10 = 0.05. Use this rule instead of long multiplication when the multiplier is a power of ten. It is also how you check that a decimal point is in a sensible position.</p>
<h3>Terminating and recurring decimals</h3>
<p>A fraction in its simplest form gives a terminating decimal if its denominator has no prime factors other than 2 and 5. So 1/4 = 0.25 terminates, while 1/3 = 0.333… recurs. Recurring decimals are written with a dot or a line over the repeating digits. Knowing which fractions terminate helps you decide whether a decimal answer is exact.</p>
<h3>Converting a recurring decimal to a fraction (Extended)</h3>
<p>Let x = 0.363636…. Multiply by 100 because two digits repeat, so 100x = 36.363636…. Subtract the first equation from the second: 99x = 36, so x = 36/99. Simplify by 9 to get x = 4/11. The method works because the repeating part cancels out exactly.</p>
<h3>Ordering decimals</h3>
<p>To order decimals, compare the digits place by place, starting from the left. Pad the numbers with zeros so they have the same number of decimal places. Writing 0.7, 0.07 and 0.707 as 0.700, 0.070 and 0.707 makes the order clear: 0.07 is smallest, then 0.7, then 0.707. A common mistake is to think 0.707 is smaller than 0.7 because it has more digits.</p>
<h3>Decimals in money and measurement</h3>
<p>Money is written to two decimal places, so £4.5 should be written as £4.50 when you give a final answer. Measurements in decimal form convert with a power of ten: 3.5 km = 3.5 × 1000 m = 3500 m. Check that the unit in your answer matches the unit the question asks for.</p>
<h3>Estimating answers before calculating</h3>
<p>To estimate, round each number to one significant figure and calculate the result. For 49.8 × 0.31, use 50 × 0.3 = 15, which tells you the true answer should be close to 15. An estimate is a check, not an answer. If your calculator gives a value far from the estimate, you have probably mistyped a number or put the decimal point in the wrong place.</p>`,
  },
  {
    id: "7798ea37-c64d-4cc6-a474-c55584ee86a7",
    slug: "number-fractions-decimals-and-percentages",
    proseOnly: true,
    heading: "Percentages in practice: finding, reversing and compounding",
    html: `<h2>Percentages in practice: finding, reversing and compounding</h2>
<p>Percentage questions are often about the base: the original amount that the percentage refers to. Each subsection below asks you to identify the base first, then choose a method that uses it. The multiplier method is the reliable choice in most cases.</p>
<h3>Finding a percentage of an amount</h3>
<p>To find 17.5% of 260, write 17.5% as the decimal 0.175 and multiply: 0.175 × 260 = 45.5. A percentage is always a fraction of 100, so dividing by 100 and multiplying by the percentage gives the same result. Use the multiplier method rather than a separate division step, because it leaves fewer places to make a mistake.</p>
<h3>Reversing a percentage change</h3>
<p>If a price rises by 20% to £36, the new price is 120% of the original, so the original is found by dividing by 1.2: 36 ÷ 1.2 = £30. Taking 20% off £36 gives £28.80, which is not the original price. This is the most common percentage error in examinations.</p>
<h3>Percentage increase and decrease with multipliers</h3>
<p>A 35% decrease is a multiplier of 1 − 0.35 = 0.65, and a 6% increase is a multiplier of 1.06. Multiply the original amount by the multiplier once. A quantity increased by 35% and then decreased by 35% does not return to its original value, because the two changes apply to different bases.</p>
<h3>Repeated percentage change (compound growth)</h3>
<p>If £1000 is invested at 5% a year and left for three years, each year multiplies the amount by 1.05. After three years the value is 1000 × 1.05 × 1.05 × 1.05 = 1000 × 1.05³ = £1157.63 to the nearest penny. The power of the multiplier equals the number of years, so the calculation does not need a separate step for each year.</p>
<h3>Simple interest</h3>
<p>Simple interest is calculated on the original amount only. The formula is I = PRT/100, where P is the principal, R is the rate per cent and T is the time in years. For £500 at 4% for 3 years, I = 500 × 4 × 3 / 100 = £60. Simple interest grows in a straight line, while compound interest grows faster each year.</p>
<h3>Profit and loss as a percentage</h3>
<p>Profit as a percentage is always taken of the cost price, not the selling price. An item bought for £40 and sold for £52 gives a profit of £12, and 12 ÷ 40 × 100 = 30%. Using the selling price as the base gives 23.1%, which is wrong. Identify the cost price in the question before you divide.</p>
<h3>Comparing proportions expressed as percentages</h3>
<p>To compare two results, convert each to a percentage of its own total. If 18 out of 45 students passed one test and 25 out of 60 passed another, the first pass rate is 18/45 = 40% and the second is 25/60 = 41.7%, so the second test had the higher pass rate. Comparing the raw numbers, 18 and 25, would mislead because the groups are different sizes.</p>`,
  },
  {
    id: "7798ea37-c64d-4cc6-a474-c55584ee86a7",
    slug: "number-fractions-decimals-and-percentages",
    proseOnly: true,
    heading: "Exam technique: the checks that protect your marks",
    html: `<h2>Exam technique: the checks that protect your marks</h2>
<p>Most numerical questions carry method marks as well as answer marks. The subsections below set out the habits that keep a correct method from being lost to a rounding slip, a missing unit or an unsimplified fraction.</p>
<h3>Reading what form the answer must take</h3>
<p>Before you calculate, read whether the question asks for a fraction, a decimal, a percentage or a value to a given degree of accuracy. A correct value given in the wrong form can lose the mark. If the question says "give your answer as a fraction in its simplest form", a decimal answer earns nothing even when it is accurate.</p>
<h3>Showing working for method marks</h3>
<p>Write each step on its own line: the method, the substitution, then the result. An examiner can award a method mark for a correct approach even when the final answer is wrong. Do not work only on the calculator and write down the final number, because the working is the evidence for those marks.</p>
<h3>Checking the answer is sensible</h3>
<p>Ask whether the answer is plausible before you move on. A percentage of an amount must be smaller than the amount for a percentage below 100%. A price after a reduction must be lower than the original. A quick estimate, like the one used for decimals, catches most of the errors caused by a mistyped number on the calculator.</p>
<h3>Rounding only at the end</h3>
<p>Keep full calculator values through every step and round only the final answer. Rounding an intermediate value can change the last digit of the answer, and a question that asks for 3 significant figures will be marked against the correct rounding of the exact result. Store the number in the calculator memory if the working is long.</p>
<h3>Using the right base for percentage change</h3>
<p>A percentage change is always calculated as a fraction of the original value, not the new one. The change is the new value minus the original, divided by the original, then multiplied by 100. A value that rises from 80 to 100 has increased by 20/80 = 25%, not 20/100 = 20%.</p>
<h3>Writing units and checking them</h3>
<p>Every answer that is a measurement needs its unit, and the unit must match the question. A length in centimetres must not be given as metres without conversion. Convert all quantities to the same unit before you combine them, because adding 2 km to 500 m without converting gives a meaningless total.</p>
<h3>Reading the final line of the question</h3>
<p>Many lost marks come from answering a different question. Underline the value the question asks for, such as the increase rather than the new total, or the cost rather than the selling price. Read the last sentence of the question again before you write the final answer, and check it against the value you have calculated.</p>`,
  },
];

module.exports = { sections };
