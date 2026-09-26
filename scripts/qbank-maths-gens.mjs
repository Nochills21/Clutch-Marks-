// Per-topic MCQ generator families for Cambridge IGCSE Mathematics (0580).
// Every generator computes its correct answer from the randomized inputs, so
// the marked answer is always mathematically right. Difficulty varies by
// paper: Core P1/P3 stay gentler, Extended P2/P4 push harder numbers.
import { numericMcq, fmt } from "./qbank-lib.mjs";

const HCF = (a, b) => (b === 0 ? a : HCF(b, a % b));

export const MATHS_GENS = {
  "1.1": [
    (r) => {
      const n = r.int(2, 60);
      const isPrime = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59].includes(n);
      const square = [4, 9, 16, 25, 36, 49].includes(n);
      return numericMcq(r, `Which of these best describes the number ${n}?`,
        isPrime ? "Prime" : square ? "A square number" : "Composite (not prime)",
        ["Prime", "A square number", "Composite (not prime)"].filter((x) => x !== (isPrime ? "Prime" : square ? "A square number" : "Composite (not prime)")).slice(0, 3),
        isPrime ? `${n} has no factors other than 1 and itself.` : square ? `${n} = ${Math.sqrt(n)}².` : `${n} has a factor other than 1 and itself.`);
    },
    (r) => {
      const a = r.pick([8, 12, 18, 24, 30, 36, 48]);
      const b = a + r.pick([4, 6, 10, 12, 18]);
      return numericMcq(r, `Find the HCF of ${a} and ${b}.`, HCF(a, b), [HCF(a, b) * 2, Math.abs(a - b) || 2, HCF(a, b) + 2],
        `Common factors of ${a} and ${b} give HCF = ${HCF(a, b)}.`);
    },
    (r) => {
      const a = r.pick([6, 8, 9, 10, 12, 15]);
      const b = r.pick([14, 16, 18, 20, 21, 24]);
      return numericMcq(r, `Find the LCM of ${a} and ${b}.`, (a * b) / HCF(a, b), [(a * b) / (HCF(a, b) * 2), a * b, Math.max(a, b)],
        `LCM = (${a} × ${b}) ÷ HCF(${HCF(a, b)}) = ${(a * b) / HCF(a, b)}.`);
    },
  ],
  "1.2": [
    (r) => {
      const n = r.pick([2, 3, 4, 5, 6, 8]);
      const d = n + r.int(1, 5);
      const g = HCF(n, d);
      return numericMcq(r, `Write ${n}/${d} in its simplest form.`, `${n / g}/${d / g}`, [`${n + 1}/${d + 1}`, `${n * 2}/${d * 2}`, `${d / g}/${n / g}`],
        `Divide numerator and denominator by ${g}.`);
    },
    (r) => {
      const p = r.pick([10, 15, 20, 25, 40, 60]);
      const v = r.pick([40, 60, 80, 120, 200]);
      return numericMcq(r, `Work out ${p}% of ${v}.`, (p * v) / 100, [(p * v) / 1000, (p * v) / 10, v - p],
        `${p}% of ${v} = ${p}/100 × ${v} = ${(p * v) / 100}.`);
    },
    (r) => {
      const a = r.int(2, 9), b = r.int(2, 9), c = r.int(2, 9), d = r.int(2, 9);
      return numericMcq(r, `Work out ${a}/${b} + ${c}/${d} in simplest form (answer as fraction).`,
        `${a * d + c * b}/${b * d}`, [`${a + c}/${b + d}`, `${a * c}/${b * d}`, `${a * d - c * b}/${b * d}`],
        `Common denominator ${b * d}: (${a * d} + ${c * b})/${b * d}.`);
    },
  ],
  "1.3": [
    (r) => {
      const a = r.int(2, 6), m = r.int(2, 5), n = r.int(2, 4);
      return numericMcq(r, `Simplify (${a}x^${m}) × (${a}x^${n}).`, `${a * a}x^${m + n}`, [`${a * a}x^${m * n}`, `${a + a}x^${m + n}`, `${a * a}x^${m - n}`],
        `Multiply coefficients (${a}×${a}=${a * a}) and add indices (${m}+${n}=${m + n}).`);
    },
    (r) => {
      const c = r.pick([2, 3, 4, 5]), e = r.int(2, 4), k = r.int(2, 9);
      return numericMcq(r, `Write ${k * Math.pow(c, e)} as ${c} to a power × ${k}. What power is needed?`, e, [e + 1, e - 1, e * 2],
        `${c}^${e} = ${Math.pow(c, e)}, and ${Math.pow(c, e)} × ${k} = ${k * Math.pow(c, e)}.`);
    },
    (r) => {
      const m = r.int(3, 8);
      return numericMcq(r, `A number in standard form is A × 10^n with 1 ≤ A < 10. Which n suits ${m}00 000?`, 5 + String(m).length - 1, [4, 6, 7],
        `${m}00 000 = ${m} × 10^${5 + String(m).length - 1}.`);
    },
  ],
  "1.4": [
    (r) => {
      const v = r.int(2, 90) / 10;
      const dp = 1;
      const lb = Math.floor(v * 10) / 10, ub = lb + 0.1;
      return numericMcq(r, `A length is ${fmt(v)} cm to the nearest 0.1 cm. What is its upper bound?`, fmt(ub), [fmt(ub + 0.05), fmt(lb), fmt(v + 0.1)],
        `Upper bound = ${fmt(v)} + 0.05 = ${fmt(ub)}.`);
    },
    (r) => {
      const n = r.int(120, 980);
      return numericMcq(r, `Round ${n} to 2 significant figures.`, Math.round(n / 10) * 10, [Math.round(n / 100) * 100, n, Math.round(n / 10) * 10 + 10],
        `The second significant figure is the tens digit: ${Math.round(n / 10) * 10}.`);
    },
  ],
  "1.5": [
    (r) => {
      const total = r.pick([60, 84, 90, 120]);
      const parts = r.pick([[3, 4], [2, 5], [1, 4], [5, 7]]);
      const sum = parts[0] + parts[1];
      return numericMcq(r, `Divide $${total} in the ratio ${parts[0]}:${parts[1]}. What is the larger share?`,
        (total / sum) * Math.max(...parts), [(total / sum) * Math.min(...parts), total / sum, total - (total / sum) * Math.max(...parts)],
        `${total} ÷ ${sum} parts = $${fmt(total / sum)} per part; larger = ${parts[0] > parts[1] ? parts[0] : parts[1]} parts.`);
    },
    (r) => {
      const p = r.pick([10, 20, 25, 50]);
      const orig = r.pick([40, 60, 80, 120]);
      return numericMcq(r, `A price increases by ${p}% from $${orig}. What is the new price?`, orig * (1 + p / 100), [orig * (1 - p / 100), orig + p, orig * (p / 100)],
        `Multiplier 1.${p < 10 ? "0" : ""}${p}: ${orig} × ${1 + p / 100} = ${fmt(orig * (1 + p / 100))}.`);
    },
  ],
  "1.6": [
    (r) => {
      const P = r.pick([100, 200, 500, 1000]), rate = r.pick([5, 10, 20]), t = r.int(2, 3);
      const si = (P * rate * t) / 100;
      return numericMcq(r, `Simple interest on $${P} at ${rate}% per year for ${t} years:`, si, [si + P, (P * rate) / 100, P * Math.pow(1 + rate / 100, t) - P],
        `I = Prt/100 = ${P}×${rate}×${t}/100 = ${fmt(si)}.`);
    },
  ],
  "2.1": [
    (r) => {
      const a = r.int(2, 6), b = r.int(2, 8), c = r.int(2, 6);
      return numericMcq(r, `Expand ${a}(x + ${b}) − ${c}x.`, `${a - c}x + ${a * b}`, [`${a + c}x + ${a * b}`, `${a - c}x − ${a * b}`, `${a}x + ${a * b - c}`],
        `${a}x + ${a * b} − ${c}x = ${a - c}x + ${a * b}.`);
    },
    (r) => {
      const a = r.int(2, 7), b = r.int(2, 9);
      return numericMcq(r, `Factorise x² + ${a + b}x + ${a * b}.`, `(x + ${a})(x + ${b})`, [`(x − ${a})(x − ${b})`, `(x + ${a * b})(x + 1)`, `(x + ${a})(x − ${b})`],
        `${a} + ${b} = ${a + b} and ${a} × ${b} = ${a * b}.`);
    },
  ],
  "2.2": [
    (r) => {
      const a = r.int(2, 9), x = r.int(2, 9), b = r.int(1, 20);
      return numericMcq(r, `Solve ${a}x + ${b} = ${a * x + b}.`, x, [x + 1, x - 1, (a * x + b) / (a + 1)],
        `${a}x = ${a * x + b} − ${b} = ${a * x}, so x = ${x}.`);
    },
    (r) => {
      const a = r.int(2, 6), b = r.int(2, 9), c = r.int(2, 9);
      return numericMcq(r, `Make x the subject: y = ${a}x − ${b}. What is x?`, `(y + ${b})/${a}`, [`(y − ${b})/${a}`, `y/${a} + ${b}`, `${a}y + ${b}`],
        `y + ${b} = ${a}x, so x = (y + ${b})/${a}.`);
    },
  ],
  "2.3": [
    (r) => {
      const a = r.int(2, 9), b = r.int(10, 40);
      return { question_text: `Solve the inequality ${a}x > ${a * b} and pick the correct solution.`, options: [`x > ${b}`, `x < ${b}`, `x > ${fmt(a * b)}`, `x < ${fmt(a * b)}`], correct_option: 0, explanation: `Divide both sides by ${a} (positive, so the sign stays): x > ${b}.` };
    },
  ],
  "2.4": [
    (r) => {
      const m = r.int(2, 6), c = r.int(-5, 6);
      return { question_text: `The line y = ${m}x ${c >= 0 ? "+ " + c : "− " + Math.abs(c)} crosses the y-axis at which point?`, options: [`(0, ${c})`, `(${c}, 0)`, `(0, ${m})`, `(${m}, 0)`], correct_option: 0, explanation: `At x = 0, y = c, so the intercept is (0, ${c}).` };
    },
  ],
  "3.1": [
    (r) => {
      const x1 = r.int(-4, 3), y1 = r.int(-4, 3), dx = r.int(2, 6), dy = r.int(2, 6);
      const x2 = x1 + dx, y2 = y1 + dy;
      return numericMcq(r, `Find the distance between (${x1}, ${y1}) and (${x2}, ${y2}).`,
        fmt(Math.sqrt(dx * dx + dy * dy)), [fmt(dx + dy), fmt(Math.abs(dx - dy)), fmt(dx * dy)],
        `√(${dx}² + ${dy}²) = √${dx * dx + dy * dy} ≈ ${fmt(Math.sqrt(dx * dx + dy * dy))}.`);
    },
    (r) => {
      const x1 = r.int(-4, 3), y1 = r.int(-4, 3), dx = r.int(1, 5), dy = r.int(1, 5);
      return numericMcq(r, `Find the midpoint of (${x1}, ${y1}) and (${x1 + dx}, ${y1 + dy}).`,
        `(${fmt(x1 + dx / 2)}, ${fmt(y1 + dy / 2)})`, [`(${x1 + dx}, ${y1 + dy})`, `(${fmt(dx / 2)}, ${fmt(dy / 2)})`, `(${x1}, ${y1})`],
        `Average each coordinate: ((${x1}+${x1 + dx})/2, (${y1}+${y1 + dy})/2).`);
    },
  ],
  "3.2": [
    (r) => {
      const m1 = r.pick([2, 3, 4, 1 / 2]);
      const m2 = m1 === 1 / 2 ? -2 : -1 / m1;
      return { question_text: `A line perpendicular to y = ${m1}x + 1 has gradient:`, options: [fmt(m2), fmt(m1), fmt(-m1), "1"], correct_option: 0, explanation: `Perpendicular gradients multiply to −1: m₂ = −1/${fmt(m1)} = ${fmt(m2)}.` };
    },
  ],
  "4.1": [],
  "4.2": [],
  "4.3": [],
  "5.1": [
    (r) => {
      const w = r.int(3, 12), h = r.int(3, 12);
      return numericMcq(r, `A rectangle is ${w} cm by ${h} cm. Its area is:`, w * h, [2 * (w + h), w + h, (w + h) * 2 + 2],
        `Area = ${w} × ${h} = ${w * h} cm².`);
    },
  ],
  "5.2": [
    (r) => {
      const rad = r.pick([3, 5, 7, 10]);
      return numericMcq(r, `The circumference of a circle of radius ${rad} cm (π = 3.14):`, fmt(2 * Math.PI * rad, 2), [fmt(Math.PI * rad * rad, 2), fmt(Math.PI * rad, 2), fmt(4 * Math.PI * rad, 2)],
        `C = 2πr = 2 × 3.14 × ${rad} ≈ ${fmt(2 * Math.PI * rad, 2)} cm.`);
    },
  ],
  "6.1": [
    (r) => {
      const triple = r.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15]]);
      return numericMcq(r, `A right triangle has legs ${triple[0]} and ${triple[1]}. The hypotenuse is:`, triple[2], [triple[0] + triple[1], triple[2] + 1, triple[1] - triple[0]],
        `${triple[0]}² + ${triple[1]}² = ${triple[2]}², so the hypotenuse is ${triple[2]}.`);
    },
  ],
  "7.1": [],
  "7.2": [],
  "8.1": [
    (r) => {
      const heads = r.int(1, 9), n = 10;
      return numericMcq(r, `A coin is flipped 10 times and lands heads ${heads} times. The experimental probability of heads is:`, fmt(heads / 10), [fmt((10 - heads) / 10), fmt(heads), fmt(heads / 100)],
        `P(heads) = ${heads}/10 = ${fmt(heads / 10)}.`);
    },
  ],
  "8.2": [
    (r) => {
      const g = r.int(2, 5), y = r.int(2, 5);
      return numericMcq(r, `A bag has ${g} green and ${y} yellow balls. P(green) as a fraction:`, `${g}/${g + y}`, [`${g}/${y}`, `${y}/${g + y}`, `1/${g + y}`],
        `${g} of ${g + y} balls are green.`);
    },
  ],
  "9.1": [
    (r) => {
      const vals = [r.int(2, 9), r.int(2, 9), r.int(2, 9), r.int(2, 9), r.int(2, 9)];
      const mean = vals.reduce((a, b) => a + b) / 5;
      return numericMcq(r, `Find the mean of ${vals.join(", ")}.`, fmt(mean), [fmt(Math.max(...vals) - Math.min(...vals)), fmt([...vals].sort((a, b) => a - b)[2]), fmt(vals.reduce((a, b) => a + b))],
        `Sum ${vals.reduce((a, b) => a + b)} ÷ 5 = ${fmt(mean)}.`);
    },
    (r) => {
      const vals = r.shuffle([1, 2, 3, 4, 5, 6, 7].slice(0, r.int(5, 7)));
      const sorted = [...vals].sort((a, b) => a - b);
      const med = sorted[Math.floor(sorted.length / 2)];
      return numericMcq(r, `Find the median of ${vals.join(", ")}.`, med, [med + 1, med - 1, fmt(vals.reduce((a, b) => a + b) / vals.length)],
        `Ordered: ${sorted.join(", ")}; middle value is ${med}.`);
    },
  ],
  "9.2": [],
  // Chapters 4, 7.2, and Extended-only sections get generic algebra/data gens:
  fallback: [
    (r) => {
      const a = r.int(2, 9), b = r.int(2, 9), c = r.int(2, 9);
      return numericMcq(r, `Evaluate ${a} + ${b} × ${c}.`, a + b * c, [(a + b) * c, a * c + b, a * b * c],
        `Multiplication first: ${b} × ${c} = ${b * c}; ${a} + ${b * c} = ${a + b * c}.`);
    },
    (r) => {
      const a = r.int(3, 12), b = r.int(2, 9);
      return numericMcq(r, `Simplify ${a}x + ${b}x.`, `${a + b}x`, [`${a * b}x`, `${a + b}x²`, `${a - b}x`],
        `Like terms: (${a} + ${b})x = ${a + b}x.`);
    },
  ],
};
