// Command words, as Cambridge actually uses them.
//
// Exam technique is where our students lose marks they knew how to earn: a
// two-mark "Explain" answered with a description scores zero for the second
// mark, and no amount of extra practice fixes that until the student knows what
// the word is asking for. Tutopiya sells this as a headline feature; this module
// is the content layer, and it is deliberately data-only so it can be tested
// without a browser and reused by any surface (drill, notes sidebar, the AI
// marker's feedback copy).
//
// The wording below is written in our own voice from the CAIE publishing
// conventions for command words, not copied from a board document.

export interface CommandWordDrill {
  /** The exam-style prompt the student is shown. */
  prompt: string;
  /** Four candidate answers; exactly one earns the marks. */
  options: string[];
  /** Index into `options` of the response that earns the marks. */
  answer: number;
  /** Why that one earns the marks, and what the others are missing. */
  why: string;
}

export interface CommandWord {
  /** The word itself, lower-cased, as it appears in a question. */
  word: string;
  /** What the examiner is asking for, in one line. */
  wants: string;
  /** The shape of an answer that scores. */
  shape: string;
  /** The mistake most students make with this exact word. */
  trap: string;
  /** Two drills so a student can check the idea, not just read it. */
  drills: CommandWordDrill[];
}

export const COMMAND_WORDS: CommandWord[] = [
  {
    word: "state",
    wants: "Name or give the answer. No reasoning is required.",
    shape: "One word, one number, or one short fact.",
    trap: "Writing a paragraph. It costs time and earns nothing extra — the mark is for the fact.",
    drills: [
      {
        prompt: "State the SI unit of electric charge. (1 mark)",
        options: [
          "Coulomb, before deriving it from current × time",
          "The coulomb (C)",
          "Charge is measured by multiplying current by time, so the unit is ampere-seconds",
          "You find the unit from the equation Q = It",
        ],
        answer: 1,
        why: "“State” wants the answer only. The other options are reasoning, which is not asked for and cannot add a mark.",
      },
      {
        prompt: "State what happens to the resistance of a thermistor as its temperature rises. (1 mark)",
        options: [
          "It decreases",
          "It decreases because the number of charge carriers increases, which is why thermistors are used in potential dividers",
          "It depends on the circuit it is in",
          "The resistance is V/I, so it must fall as current rises",
        ],
        answer: 0,
        why: "The direction is the mark. The second option is a full explanation — correct, but it answers a question that was not asked.",
      },
    ],
  },
  {
    word: "describe",
    wants: "Say what happens — the observations, stages or trends, in order.",
    shape: "A sequence of facts with no cause-and-effect claim.",
    trap: "Explaining. Giving the “because” when only “what” was asked spends time and can lose the thread.",
    drills: [
      {
        prompt: "Describe the pattern in the table of resistance against length. (2 marks)",
        options: [
          "Resistance increases as length increases, and doubling the length roughly doubles the resistance",
          "Resistance increases because the electrons collide more often in a longer wire",
          "Resistance is proportional to length by the formula R = ρl/A",
          "Longer wires have more resistance than shorter ones",
        ],
        answer: 0,
        why: "Two separable facts: the direction of the trend, and its proportionality. That is where the two marks are. The others each give one idea, or give the reason instead of the pattern.",
      },
      {
        prompt: "Describe what you would see when a current-carrying wire is placed in a magnetic field. (2 marks)",
        options: [
          "The wire moves, and it moves at right angles to both the field and the wire",
          "The wire moves because the field exerts a force on the current",
          "The wire gets hot",
          "There is a force on the wire given by F = BIl",
        ],
        answer: 0,
        why: "“Describe” asks what is observed — motion, and its direction. Reaching for the formula or the cause misses the observation the marks are attached to.",
      },
    ],
  },
  {
    word: "explain",
    wants: "Give the reason, mechanism or cause. The “because” is the mark.",
    shape: "A claim plus a mechanism, usually joined by “because”, “so” or “therefore”.",
    trap: "Restating the observation. Writing the fact again in different words earns nothing; the linkage has to be new.",
    drills: [
      {
        prompt: "Explain why the resistance of a filament lamp increases as the current increases. (2 marks)",
        options: [
          "The lamp gets brighter and the resistance goes up",
          "Higher current makes the filament hotter, so the ions vibrate more and electrons collide more often",
          "Because resistance increases with current",
          "The filament is made of tungsten, which has a high melting point",
        ],
        answer: 1,
        why: "The sound answer names the mechanism in order: current → temperature → lattice vibration → more collisions. The first and third just restate the question.",
      },
      {
        prompt: "Explain why the pressure of a fixed mass of gas rises when it is heated at constant volume. (2 marks)",
        options: [
          "The molecules hit the walls harder and more often, because their mean speed increases",
          "The gas expands",
          "The temperature increases",
          "Pressure and temperature are directly proportional at constant volume",
        ],
        answer: 0,
        why: "Two scoring ideas: greater mean speed (harder collisions) and greater frequency of collisions. A proportionality statement is a description of the relationship, not the reason for it.",
      },
    ],
  },
  {
    word: "calculate",
    wants: "Work it out from the data and show the working.",
    shape: "Equation, substitution with units, answer with the correct unit and sensible significant figures.",
    trap: "Writing the answer only. Method marks are lost even when the number is right, and a missing unit can cost the final mark.",
    drills: [
      {
        prompt: "A resistor of 12 Ω carries a current of 0.50 A. Calculate the power dissipated. (3 marks)",
        options: [
          "6 W",
          "P = I²R = 0.50² × 12 = 3.0 W",
          "P = I²R = 0.25 × 12 = 3 W so the answer is 3",
          "P = VI = 12 × 0.50 = 6 W",
        ],
        answer: 1,
        why: "The equation, the substitution and the unit are each worth a mark. The first answer has no working; the third is right until it drops the unit; the fourth uses the wrong equation.",
      },
      {
        prompt: "Calculate the acceleration of a car that goes from 4.0 m/s to 20 m/s in 8.0 s. (2 marks)",
        options: [
          "2 m/s²",
          "a = (v − u)/t = (20 − 4.0)/8.0 = 2.0 m/s²",
          "(20 − 4)/8",
          "16 m/s²",
        ],
        answer: 1,
        why: "Candidate two shows the equation, the substitution and the unit, which is the shape that cannot lose a method mark. Its neighbours leave the examiner guessing.",
      },
    ],
  },
  {
    word: "compare",
    wants: "Both similarities and differences — and both subjects.",
    shape: "Paired statements: “X is …, whereas Y is …”.",
    trap: "Describing one thing only. A compare question with no comparison in the answer rarely scores more than half.",
    drills: [
      {
        prompt: "Compare the motion of a car travelling at constant speed with one accelerating uniformly. (2 marks)",
        options: [
          "The first has a constant velocity, whereas the second has a changing velocity and covers increasing distance each second",
          "A car at constant speed has no acceleration",
          "Both cars move forward, but one goes faster",
          "The accelerating car has a larger velocity",
        ],
        answer: 0,
        why: "One statement about each, joined explicitly. Answer two describes only one car; answer three makes a claim about speed that need not be true.",
      },
      {
        prompt: "Compare series and parallel circuits. (2 marks)",
        options: [
          "In series the current is the same everywhere and the p.d.s add, whereas in parallel the p.d. is the same across each branch and the currents add",
          "Series circuits have one path, parallel circuits have more than one",
          "Parallel circuits are more useful in houses",
          "Series circuits have higher resistance",
        ],
        answer: 0,
        why: "Two paired contrasts, each naming the quantity and what it does in both circuits. The single-path observation is true but only half of what the word asks for.",
      },
    ],
  },
  {
    word: "deduce",
    wants: "Reach a conclusion from the information already given — not from a recalled fact.",
    shape: "The conclusion, plus the step that follows from the data.",
    trap: "Quoting a memorised formula. “Deduce” means the answer is recoverable from the stem.",
    drills: [
      {
        prompt: "An object on a spring is pulled down and released. Deduce the direction of its acceleration at the lowest point. (1 mark)",
        options: [
          "Upwards, because the spring is stretched further than at equilibrium",
          "Downwards, because gravity acts downwards",
          "Zero, because it stops momentarily",
          "Upwards, because a = −ω²x",
        ],
        answer: 0,
        why: "The reasoning must come from the situation given — at the lowest point the extension exceeds equilibrium, so the resultant force, and the acceleration, point up. The formula is true but does not deduce anything.",
      },
      {
        prompt: "A gas is compressed at constant temperature. Deduce what happens to its pressure. (1 mark)",
        options: [
          "It increases, because the molecules hit the walls more often in a smaller volume",
          "It increases, because pV = constant",
          "It increases, because pressure always rises when volume falls",
          "It stays the same",
        ],
        answer: 0,
        why: "The deduction traces the given condition (constant temperature, smaller volume) to the microscopic consequence. Citing pV = constant states the rule without using the stem.",
      },
    ],
  },
  {
    word: "suggest",
    wants: "Apply your physics to a situation you have not been taught directly.",
    shape: "A plausible mechanism that uses known principles, often with a reason.",
    trap: "Leaving it blank because it “isn't in the syllabus”. Suggest questions are designed to be answerable from what you do know.",
    drills: [
      {
        prompt: "Suggest why a metal cup feels colder than a plastic cup at the same temperature. (2 marks)",
        options: [
          "Metal conducts heat away from your hand faster, so your skin cools more quickly",
          "Metal is colder than plastic",
          "Metal has a higher density",
          "Plastic is an insulator, so it feels warmer",
        ],
        answer: 0,
        why: "The answer applies conduction — a known principle — to an unfamiliar situation, which is exactly what “suggest” invites. Answer four gestures at it but never says what happens to the hand.",
      },
      {
        prompt: "Suggest one reason a satellite in a low orbit needs occasional boosting. (1 mark)",
        options: [
          "Friction with the thin atmosphere at that height slowly removes energy, lowering the orbit",
          "Gravity is stronger at low altitude",
          "The satellite's mass decreases as fuel is used",
          "It must avoid other satellites",
        ],
        answer: 0,
        why: "An acceptably reasoned application of drag and energy loss. The others are either wrong or not a reason the situation implies.",
      },
    ],
  },
  {
    word: "evaluate",
    wants: "Weigh both sides and reach a supported judgement.",
    shape: "Advantages, disadvantages, then a conclusion that follows from them.",
    trap: "Listing only one side, or ending with no judgement at all. The conclusion is usually a mark on its own.",
    drills: [
      {
        prompt: "Evaluate the use of renewable sources for a country's electricity supply. (4 marks)",
        options: [
          "Renewables are cheap to run and do not produce CO₂, but output varies with weather and initial cost is high; overall they suit a country with a mix of sources and storage",
          "Renewables are better for the environment",
          "Renewables are unreliable",
          "Renewables do not produce CO₂",
        ],
        answer: 0,
        why: "Two benefits, two costs and a judgement that follows from them — that is the four-mark shape. Each other option is a single point with no weighing.",
      },
      {
        prompt: "Evaluate the claim that increasing the temperature always increases the rate of a reaction. (3 marks)",
        options: [
          "It usually does, because particles collide more often and with more energy, but for some reactions the reactants decompose differently at high temperature, so the claim needs qualification",
          "It is true, because rate increases with temperature",
          "It is false, because some reactions are exothermic",
          "It depends on the reaction",
        ],
        answer: 0,
        why: "A supported general reason, a real exception, and a judgement. “It depends” is not an evaluation; it is the beginning of one.",
      },
    ],
  },
];

/** Look a word up case-insensitively, tolerating a trailing colon or full stop. */
export function findCommandWord(raw: string): CommandWord | null {
  const key = raw.trim().toLowerCase().replace(/[.:;,!?]+$/, "");
  return COMMAND_WORDS.find((c) => c.word === key) ?? null;
}

/** Every drill, flattened with the word it belongs to — what the trainer cycles. */
export interface DrillItem extends CommandWordDrill {
  word: string;
  /** Stable id so the UI can key a list without an index (and tests can assert). */
  id: string;
}

export const DRILLS: DrillItem[] = COMMAND_WORDS.flatMap((c) =>
  c.drills.map((d, i) => ({ ...d, word: c.word, id: `${c.word}-${i + 1}` })),
);

/**
 * A gentle, shuffled-but-stable practice order.
 *
 * Deterministic on purpose: the gate test and any future regression test need a
 * fixed order, and a student who reloads should not be asked the same question
 * twice in a row by accident.
 */
export function drillOrder(seed = 7): DrillItem[] {
  const items = [...DRILLS];
  for (let i = items.length - 1; i > 0; i -= 1) {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    const j = seed % (i + 1);
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}
