// Shared helpers for the MCQ bank generator: seeded RNG, number formatting,
// and MCQ builders that guarantee the marked correct answer is correct.

/** Deterministic RNG (mulberry32) seeded from a string. */
export function rngFrom(seed) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

export function makeRng(seedStr) {
  const r = rngFrom(seedStr);
  return {
    next: r,
    int: (min, max) => min + Math.floor(r() * (max - min + 1)),
    pick: (arr) => arr[Math.floor(r() * arr.length)],
    shuffle: (arr) => {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(r() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
  };
}

/** Format a number for display: trims to <=3dp, strips trailing zeros. */
export function fmt(x, dp = 3) {
  if (Number.isInteger(x)) return String(x);
  const s = x.toFixed(dp).replace(/0+$/, "").replace(/\.$/, "");
  return s;
}

/**
 * Build an MCQ with 4 unique numeric-ish options. `distractors` is an array of
 * exactly 3 values (numbers or strings) distinct from `correct`.
 * Shuffles so the correct index varies.
 */
export function numericMcq(rng, question, correct, distractors, explanation) {
  const opts = [correct, ...dedupe(correct, distractors)];
  const seen = new Set();
  for (const o of opts) {
    const k = String(o);
    if (seen.has(k)) throw new Error(`duplicate option "${k}" in: ${question}`);
    seen.add(k);
  }
  const shuffled = rng.shuffle(opts);
  return {
    question_text: question,
    options: shuffled.map((o) => (typeof o === "number" ? fmt(o) : o)),
    correct_option: shuffled.indexOf(correct),
    explanation,
  };
}

/** Ensure 3 distractors distinct from the correct value and each other. */
export function dedupe(correct, candidates) {
  const out = [];
  const taken = new Set([String(correct)]);
  for (let c of candidates) {
    let key = String(c);
    let bump = 1;
    while (taken.has(key)) {
      c = typeof c === "number" ? +(c + bump).toFixed(6) : `${c} (check)`;
      key = String(c);
      bump++;
    }
    taken.add(key);
    out.push(c);
    if (out.length === 3) break;
  }
  return out;
}

/** Concept MCQ: correct answer text + exactly 3 wrong texts. */
export function conceptMcq(rng, question, correct, wrong, explanation) {
  const shuffled = rng.shuffle([correct, ...wrong]);
  return {
    question_text: question,
    options: shuffled,
    correct_option: shuffled.indexOf(correct),
    explanation,
  };
}

/** Take n distinct draws from a list of generator functions. */
export function takeN(rng, gens, n) {
  const out = [];
  const order = [];
  // Cycle through generators in shuffled order until we have n questions.
  while (out.length < n) {
    if (order.length === 0) order.push(...rng.shuffle(gens.map((_, i) => i)));
    const gi = order.pop();
    const q = gens[gi % gens.length](rng, out.length);
    if (q) out.push(q);
  }
  return out;
}
