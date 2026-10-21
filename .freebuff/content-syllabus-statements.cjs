#!/usr/bin/env node
/**
 * Load a board's syllabus outline into public.syllabus_statements.
 *
 *   "$BUN" .freebuff/syllabus-outline.cjs 0580            # refresh the outline
 *   node .freebuff/content-syllabus-statements.cjs 0580   # load it + map it
 *   node .freebuff/content-syllabus-statements.cjs all    # every mapped spec
 *
 * The outline JSON comes from the board's own PDF, so this file holds only what
 * a machine cannot derive: which of OUR topics teaches each board subtopic. A
 * missing mapping is written as NULL on purpose — an unmapped statement is a
 * coverage gap the admin report must show, not a row that quietly looks fine.
 *
 * Mapping value forms:
 *   'topic-slug'               the statement sits in the spec's default level
 *   'topic-slug@A2'            …but this statement is in the A2 half (9618 areas
 *                              13-20; the extractor only knows "AS+A2")
 *
 * The `level` recorded on the row is always the BOARD's level. Our topic may
 * live in the other half of the qualification (9618's area 15 is A2 on the
 * board's list and taught by our AS `processor-fundamentals` topic); when the
 * two differ the script prints a cross-level line, so the mismatch is visible
 * rather than a silent claim that the levels agree.
 *
 * Idempotent: re-running updates titles, tiers and mappings in place (the board
 * reissues PDFs; the outline may grow), keyed on (board, spec_code, code).
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

const REF = "zzliiazovezhxbmfeqco";
const TOKEN = (fs.readFileSync(path.join(__dirname, "get-keys.cjs"), "utf8").match(/sbp_[a-f0-9]+/) || [])[0];

/** spec -> { subject, level, drop, mapping: { boardCode: 'slug[@LEVEL]' } } */
const SPECS = {
  /**
   * CAIE 0580 Mathematics, 2025-2027. The extractor reads the curriculum tier
   * off the code prefix (C = Core, E = Extended), so tier arrives correct.
   */
  "0580": {
    subject: "mathematics",
    level: "OL",
    mapping: {
      "1.1": "number-arithmetic-and-place-value",
      "1.2": "number-sets",
      "1.3": "number-indices-and-standard-form",
      "1.4": "number-fractions-decimals-and-percentages",
      "1.5": "number-arithmetic-and-place-value",
      "1.6": "number-arithmetic-and-place-value",
      "1.7": "number-indices-and-standard-form",
      "1.8": "number-indices-and-standard-form",
      "1.9": "number-arithmetic-and-place-value",
      "1.10": "number-arithmetic-and-place-value",
      "1.11": "number-ratio-rate-and-proportion",
      "1.12": "number-ratio-rate-and-proportion",
      "1.13": "number-fractions-decimals-and-percentages", // Percentages
      "1.14": "number-arithmetic-and-place-value",
      "1.15": "number-arithmetic-and-place-value", // Time
      "1.16": "number-arithmetic-and-place-value", // Money
      "1.17": "number-fractions-decimals-and-percentages", // Exponential growth and decay
      "1.18": "number-indices-and-standard-form", // Surds
      "2.1": "algebra-simplifying-and-expanding",
      "2.2": "algebra-simplifying-and-expanding",
      "2.3": "algebra-simplifying-and-expanding",
      "2.4": "number-indices-and-standard-form", // Indices II
      "2.5": "algebra-equations",
      "2.6": "algebra-inequalities",
      "2.7": "algebra-sequences-and-functions",
      "2.8": "number-ratio-rate-and-proportion", // Proportion
      "2.9": "algebra-graphs",
      "2.10": "algebra-graphs",
      "2.11": "algebra-graphs",
      "2.12": "algebra-graphs",
      "2.13": "algebra-sequences-and-functions",
      "3.1": "algebra-graphs",
      "3.2": "algebra-graphs",
      "3.3": "algebra-graphs",
      "3.4": "algebra-graphs",
      "3.5": "algebra-graphs",
      "3.6": "algebra-graphs",
      "3.7": "algebra-graphs",
      "4.1": "geometry-angles-and-polygons",
      "4.2": "mensuration-bearings-and-loci",
      "4.3": "mensuration-bearings-and-loci",
      "4.4": "geometry-congruence-and-similarity",
      "4.5": "geometry-congruence-and-similarity",
      "4.6": "geometry-angles-and-polygons",
      "4.7": "geometry-angles-and-polygons",
      "4.8": "geometry-angles-and-polygons",
      "5.1": "mensuration-area-and-volume",
      "5.2": "mensuration-area-and-volume",
      "5.3": "mensuration-area-and-volume",
      "5.4": "mensuration-area-and-volume",
      "5.5": "mensuration-area-and-volume",
      "6.1": "trigonometry-right-angled-triangles",
      "6.2": "trigonometry-right-angled-triangles",
      "6.3": "trigonometry-right-angled-triangles",
      "6.4": "trigonometry-sine-and-cosine-rules",
      "6.5": "trigonometry-sine-and-cosine-rules",
      // 6.6 is the Extended grid's summary row, not a taught subtopic. Mapped so
      // it is not reported as a gap; it is a row to re-verify on a PDF refresh.
      "6.6": "trigonometry-right-angled-triangles",
      "7.1": "transformations-and-vectors",
      "7.2": "transformations-and-vectors",
      "7.3": "transformations-and-vectors",
      "7.4": "transformations-and-vectors",
      "8.1": "statistics-probability",
      "8.2": "statistics-probability",
      "8.3": "statistics-probability",
      "8.4": "statistics-probability",
      "9.1": "statistics-data-handling",
      "9.2": "statistics-data-handling",
      "9.3": "statistics-data-handling",
      "9.4": "statistics-data-handling",
      "9.5": "scatter-diagrams-and-correlation",
      "9.6": "statistics-data-handling", // Cumulative frequency diagrams
      "9.7": "statistics-data-handling", // Histograms
    },
  },

  /**
   * CAIE 0625 Physics, 2026-2028 (core + supplement; the 2026 layout does not
   * split the list by tier, so every row is 'both').
   */
  "0625": {
    subject: "physics",
    level: "OL",
    // Extractor artifacts, checked against the PDF's subject-content pages:
    // '1.0' is a table of contents spill and the '2.5 …V) and holders' row is a
    // nested table cell — neither is a taught subtopic.
    drop: ["1.0", "2.5"],
    mapping: {
      "1.1": "measurement-units", // Physical quantities and measurement techniques
      "1.2": "forces-motion", // Motion
      "1.3": "forces-motion", // Mass and weight
      "1.4": "pressure-density", // Density
      "1.5": "forces-motion", // Forces
      "1.6": "forces-motion", // Momentum
      "1.7": "energy-work-power", // Energy, work and power
      "1.8": "pressure-density", // Pressure
      "2.1": "thermal-physics", // Kinetic particle model of matter
      "2.2": "thermal-physics", // Thermal properties and temperature
      "2.3": "thermal-physics", // Transfer of thermal energy
      "3.1": "waves-sound", // General properties of waves
      "3.2": "waves-sound", // Light
      "3.3": "waves-sound", // Electromagnetic spectrum
      "3.4": "waves-sound", // Sound
      "4.1": "magnetism-electromagnetism", // Simple phenomena of magnetism
      "4.2": "electricity-circuits", // Electrical quantities
      "4.3": "electricity-circuits", // Electric circuits
      "4.4": "electricity-circuits", // Electrical safety
      "4.5": "magnetism-electromagnetism", // Electromagnetic effects
      "5.1": "nuclear-physics", // The nuclear model of the atom
      "5.2": "nuclear-physics", // Radioactivity
      "6.1": "earth-space", // The Earth and the Solar System
      "6.2": "earth-space", // Stars and the Universe
    },
  },

  /**
   * CAIE 9618 Computer Science, 2026. The extractor cannot know which half of
   * the qualification a statement belongs to (the PDF's areas are the split:
   * 1-12 are AS, 13-20 A2), so every A2 statement carries the `@A2` marker.
   */
  "9618": {
    subject: "computer-science",
    level: "AS",
    mapping: {
      "1.1": "information-representation",
      "1.2": "information-representation", // Multimedia graphics
      "1.3": "information-representation", // Compression
      "2.1": "communication-and-networking",
      "3.1": "hardware-and-logic-gates",
      "3.2": "hardware-and-logic-gates",
      "4.1": "processor-fundamentals",
      "4.2": "processor-fundamentals", // Assembly language
      "4.3": "processor-fundamentals", // Bit manipulation
      "5.1": "system-software-and-security",
      "5.2": "system-software-and-security", // Language translators
      "6.1": "system-software-and-security", // Data security
      "6.2": "system-software-and-security", // Data integrity
      "7.1": "ethics-and-ai", // Ethics and ownership
      "8.1": "databases", // Database concepts
      "8.2": "databases", // DBMS
      "8.3": "databases-and-data-definition", // DDL — our DDL topic is A2
      "9.1": "programming-and-algorithms", // Computational thinking skills
      "9.2": "programming-and-algorithms", // Algorithms
      "10.1": "data-structures", // Data types and records
      "10.2": "data-structures", // Arrays
      "10.3": "data-types-and-file-organisation", // Files — our files topic is A2
      "10.4": "abstract-data-types", // Intro to ADTs — our ADT topic is A2
      "11.1": "programming-and-algorithms", // Programming basics
      "11.2": "programming-and-algorithms", // Constructs
      "11.3": "programming-and-algorithms", // Structured programming
      "12.1": "programming-and-algorithms", // Program development life cycle
      "12.2": "programming-and-algorithms", // Program design
      "12.3": "programming-and-algorithms", // Program testing and maintenance
      "13.1": "data-types-and-file-organisation@A2", // User-defined data types
      "13.2": "data-types-and-file-organisation@A2", // File organisation and access
      "13.3": "data-types-and-file-organisation@A2", // Floating-point representation
      "14.1": "networks-and-the-internet@A2", // Protocols
      "14.2": "networks-and-the-internet@A2", // Circuit/packet switching
      "15.1": "processor-fundamentals@A2", // Parallel processing and virtual machines
      "15.2": "hardware-and-logic-gates@A2", // Boolean algebra and logic circuits
      "16.1": "system-software-and-security@A2", // Purposes of an OS
            // Translation Software: the board deepens AS 5.2 at A2, and BOTH halves of
      // our course teach it — but the A2 half is where the board put it, AS keeps
      // 5.2 in system-software, so the split is honoured without either topic
      // claiming content it does not teach.
      "16.2": "programming-paradigms-and-low-level@A2", // Translation software
      "17.1": "web-technologies-and-security@A2", // Encryption and digital certificates
      "18.1": "ethics-and-ai@A2", // Artificial intelligence
      "19.1": "computational-thinking-and-problem-solving@A2",
      "19.2": "computational-thinking-and-problem-solving@A2", // Recursion
      "20.1": "programming-paradigms-and-low-level@A2",
      "20.2": "programming-paradigms-and-low-level@A2", // File processing and exception handling
    },
  },

  /**
   * CAIE IGCSE Computer Science 0478. Loaded only after the extractor was fixed:
   * it used to lose areas 7, 9 and 10 entirely (the board gives those topics no
   * subtopic code, so a regex demanding `d.d` dropped them), truncate area 6's
   * titles, and seed a row called "CONSTANT DefaultText". All 24 rows now map.
   */
  "0478": {
    subject: "computer-science",
    level: "OL",
    mapping: {
      "1.1": "data-representation",
      "1.2": "data-representation",
      "1.3": "data-representation",
      "2.1": "networking-communication",
      "2.2": "networking-communication",
      "2.3": "networking-communication",
      "3.1": "hardware-architecture",
      "3.2": "hardware-architecture",
      "3.3": "hardware-architecture",
      "3.4": "networking-communication",
      "4.1": "operating-systems",
      "4.2": "programming-concepts",
      "5.1": "web-technologies",
      "5.2": "web-technologies",
      "5.3": "ethics-security-impact",
      "6.1": "robotics-ai",
      "6.2": "robotics-ai",
      "6.3": "robotics-ai",
      "7": "algorithms-programming",
      "8.1": "programming-concepts",
      "8.2": "programming-concepts",
      "8.3": "programming-concepts",
      "9": "database-systems",
      "10": "logic-gates-boolean-logic",
    },
  },
  /**
   * CAIE AS & A Level Mathematics 9709. Both halves of the qualification, and
   * the board's levels are recorded per row: area 1 (and 2, 4, 5) are the AS
   * components, area 3 and 6 are A2. 10 statements are deliberately unmapped —
   * logarithms/exponentials, numerical solution of equations, differential
   * equations and all of mechanics have no topic of ours to point at, and an
   * unmapped row is a coverage gap the report should show, not paper over.
   */
  "9709": {
    subject: "mathematics",
    level: "AS",
    mapping: {
      "1.1": "quadratics@AS",
      "1.2": "functions@AS",
      "1.3": "coordinate-geometry@AS",
      "1.4": "circular-measure@AS",
      "1.5": "trigonometry@AS",
      "1.6": "sequences-and-series@AS",
      "1.7": "differentiation@AS",
      "1.8": "integration@AS",
      "2.1": "further-algebra@AS",
      "2.3": "further-trigonometry@AS",
      "2.4": "differentiation-ii@AS",
      "2.5": "integration-ii@AS",
      "3.1": "further-algebra@A2",
      "3.3": "further-trigonometry@A2",
      "3.4": "differentiation-ii@A2",
      "3.5": "integration-ii@A2",
      "3.7": "vectors@A2",
      "3.9": "complex-numbers@A2",
      "5.1": "numerical-measures-of-central-tendency@AS",
      "5.2": "permutations-and-combinations@AS",
      "5.3": "probability@AS",
      "5.4": "probability-distributions@AS",
      "5.5": "the-normal-distribution@AS",
      "6.1": "poisson-distribution@A2",
      "6.2": "probability-distributions@A2",
      "6.3": "continuous-random-variables@A2",
      "6.4": "sampling-and-estimation@A2",
      "6.5": "hypothesis-testing@A2",
    },
  },
  /**
   * CAIE AS & A Level Physics 9702. Areas 1-11 are AS, 12-25 are A2. 9
   * statements are unmapped for the same reason: physical quantities/SI
   * units/uncertainties, density and pressure, fundamental particles, and the
   * whole medical-physics option.
   */
  "9702": {
    subject: "physics",
    level: "AS",
    mapping: {
      "2.1": "kinematics@AS",
      "3.1": "dynamics@AS",
      "3.2": "kinematics@AS",
      "3.3": "dynamics@AS",
      "4.1": "forces-and-equilibrium@AS",
      "4.2": "forces-and-equilibrium@AS",
      "5.1": "work-energy-and-power@AS",
      "5.2": "work-energy-and-power@AS",
      "6.1": "materials-deformation@AS",
      "6.2": "materials-deformation@AS",
      "7.1": "waves@AS",
      "7.2": "waves@AS",
      "7.3": "waves@AS",
      "7.4": "waves@AS",
      "7.5": "waves@AS",
      "8.1": "superposition@AS",
      "8.2": "superposition@AS",
      "8.3": "superposition@AS",
      "8.4": "superposition@AS",
      "9.1": "electricity-d-c-circuits@AS",
      "9.2": "electricity-d-c-circuits@AS",
      "9.3": "electricity-d-c-circuits@AS",
      "10.1": "electricity-d-c-circuits@AS",
      "10.2": "electricity-d-c-circuits@AS",
      "10.3": "electricity-d-c-circuits@AS",
      "11.1": "nuclear-physics@AS",
      "12.1": "circular-motion-and-shm@A2",
      "12.2": "circular-motion-and-shm@A2",
      "13.1": "motion-in-a-circle-and-gravity@A2",
      "13.2": "motion-in-a-circle-and-gravity@A2",
      "13.3": "motion-in-a-circle-and-gravity@A2",
      "13.4": "motion-in-a-circle-and-gravity@A2",
      "14.1": "thermal-physics@A2",
      "14.2": "thermal-physics@A2",
      "14.3": "thermal-physics@A2",
      "15.1": "thermal-physics@A2",
      "15.2": "thermal-physics@A2",
      "15.3": "thermal-physics@A2",
      "16.1": "thermal-physics@A2",
      "16.2": "thermal-physics@A2",
      "17.1": "oscillations-and-waves-ii@A2",
      "17.2": "oscillations-and-waves-ii@A2",
      "17.3": "oscillations-and-waves-ii@A2",
      "18.1": "electric-fields-and-capacitance@A2",
      "18.2": "electric-fields-and-capacitance@A2",
      "18.3": "electric-fields-and-capacitance@A2",
      "18.4": "electric-fields-and-capacitance@A2",
      "18.5": "electric-fields-and-capacitance@A2",
      "19.1": "electric-fields-and-capacitance@A2",
      "19.2": "electric-fields-and-capacitance@A2",
      "19.3": "electric-fields-and-capacitance@A2",
      "20.1": "magnetic-fields-and-electromagnetism@A2",
      "20.2": "magnetic-fields-and-electromagnetism@A2",
      "20.3": "magnetic-fields-and-electromagnetism@A2",
      "20.4": "magnetic-fields-and-electromagnetism@A2",
      "20.5": "magnetic-fields-and-electromagnetism@A2",
      "21.1": "magnetic-fields-and-electromagnetism@A2",
      "21.2": "magnetic-fields-and-electromagnetism@A2",
      "22.1": "quantum-physics@A2",
      "22.2": "quantum-physics@A2",
      "22.3": "quantum-physics@A2",
      "22.4": "quantum-physics@A2",
      "23.1": "nuclear-physics@A2",
      "23.2": "nuclear-physics@A2",
      "25.1": "astronomy-and-cosmology@A2",
      "25.2": "astronomy-and-cosmology@A2",
      "25.3": "astronomy-and-cosmology@A2",
    },
  },
  /**
   * Edexcel International A Level Chemistry (9CH0, WCH11-16). The outline is a
   * local extract of the Pearson spec (`.freebuff/syllabus/9CH0-outline.json`),
   * 319 statements in 20 board areas: areas 1-10 are the AS half (Units 1-3)
   * and areas 11-20 the A2 half (Units 4-6), matching our 10+10 topics in
   * order. The mapping is generated from the area table below rather than typed
   * per code — 319 hand-written entries would only be a transcription risk.
   */
  "9CH0": {
    subject: "chemistry",
    level: "AS",
    mapping: edxMap("9CH0", 10, {
      1: "formulae-equations-and-amount-of-substance",
      2: "atomic-structure-and-the-periodic-table",
      3: "bonding-and-structure",
      4: "introductory-organic-chemistry-and-alkanes",
      5: "alkenes",
      6: "energetics",
      7: "intermolecular-forces",
      8: "redox-chemistry-and-groups-1-2-and-7",
      9: "introduction-to-kinetics-and-equilibria",
      10: "organic-halogenoalkanes-alcohols-and-spectra",
      11: "kinetics",
      12: "entropy-and-energetics",
      13: "chemical-equilibria",
      14: "acid-base-equilibria",
      15: "organic-carbonyls-carboxylic-acids-and-chirality",
      16: "redox-equilibria",
      17: "transition-metals-and-their-chemistry",
      18: "organic-arenes",
      19: "organic-nitrogen-compounds",
      20: "organic-synthesis",
    }),
  },
  /**
   * Edexcel International A Level Biology (9BI0, WBI11-16): 170 statements in
   * 8 board areas, areas 1-4 AS (Units 1-3) and 5-8 A2 (Units 4-6). Area 2 is
   * the one place the board's grouping and ours differ: it mixes gas exchange,
   * membranes and transport, enzymes, and the whole DNA/gene-expression run,
   * which our AS topics split as molecules-transport (exchange + enzymes) and
   * membranes-proteins-DNA (membranes + nucleic acids). Those four statements
   * are pinned per code so the claim stays exact.
   */
  "9BI0": {
    subject: "biology",
    level: "AS",
    mapping: edxMap(
      "9BI0",
      4,
      {
        1: "molecules-transport-and-health",
        2: "membranes-proteins-dna-and-gene-expression",
        3: "cell-structure-reproduction-and-development",
        4: "plant-structure-biodiversity-and-conservation",
        5: "energy-flow-ecosystems-and-environment",
        6: "microbiology-immunity-and-forensics",
        7: "respiration-muscles-and-internal-environment",
        8: "coordination-response-and-gene-technology",
      },
      {
        // gas exchange surfaces + amino acids/enzymes sit in the
        // molecules/transport topic, not the DNA one
        "2.1": "molecules-transport-and-health",
        "2.6": "molecules-transport-and-health",
        "2.7": "molecules-transport-and-health",
        "2.8": "molecules-transport-and-health",
      },
    ),
  },
};

/**
 * Generate a code -> 'topic-slug[@A2]' mapping for an Edexcel outline whose
 * board areas run in topic order: areas 1..asAreas are the AS half, the rest
 * A2. `overrides` pins individual statements (full mapping value, so an
 * override that is itself A2 carries its own '@A2').
 */
function edxMap(spec, asAreas, areaSlugs, overrides = {}) {
  const outline = JSON.parse(
    fs.readFileSync(path.join(__dirname, "syllabus", `${spec}-outline.json`), "utf8"),
  );
  const mapping = {};
  for (const s of outline.statements) {
    const area = Number(s.area);
    const slug = areaSlugs[area];
    if (overrides[s.code]) {
      mapping[s.code] = overrides[s.code];
    } else if (slug) {
      mapping[s.code] = area > asAreas ? `${slug}@A2` : slug;
    }
  }
  return mapping;
}
function post(query) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query });
    const req = https.request(
      {
        hostname: "api.supabase.com",
        path: `/v1/projects/${REF}/database/query`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (res) => {
        let out = "";
        res.on("data", (c) => (out += c));
        res.on("end", () =>
          res.statusCode >= 300 ? reject(new Error(`${res.statusCode} ${out.slice(0, 400)}`)) : resolve(out),
        );
      },
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

const q = (s) => `'${String(s).replace(/'/g, "''")}'`;
const levelRow = (subject, level) => `(select sl.id from public.subject_levels sl
      join public.subjects s on s.id = sl.subject_id
     where s.slug = ${q(subject)} and sl.level = ${q(level)})`;
/** Resolve a topic under a subject, restricted to the levels this spec can
 *  live at, and preferring the board's own level.
 *
 *  The restriction is not cosmetic. A split AS/A2 spec is one subject across two
 *  levels, and the same slug can exist under the IGCSE subject too: physics has
 *  a `nuclear-physics` topic at both OL and A2, so mapping the board's AS
 *  statement 11.1 (which our A2 topic teaches) resolved to the IGCSE row purely
 *  because the AS lookup found nothing and Postgres returned an arbitrary match.
 *  A 9702 statement pointing at an IGCSE Physics topic is a wrong claim, not
 *  drift, and it would have read as covered.
 *
 *  A second match at another allowed level is still a real finding, and the
 *  cross-level line below prints it. */
const levelsFor = (cfg) => (cfg.level === "OL" ? ["OL"] : ["AS", "A2"]);
const topicRow = (subject, level, slug, allowed) => `(
      select t.id from public.topics t
        join public.subject_levels sl on sl.id = t.subject_level_id
        join public.subjects s on s.id = sl.subject_id
       where s.slug = ${q(subject)} and t.slug = ${q(slug)}
         and sl.level::text in (${allowed.map(q).join(", ")})
       order by (sl.level = ${q(level)}) desc
       limit 1)`;
async function load(spec) {
  const cfg = SPECS[spec];
  if (!cfg) throw new Error(`no mapping table for ${spec}`);
  const outlinePath = path.join(__dirname, "syllabus", `${spec}-outline.json`);
  if (!fs.existsSync(outlinePath)) throw new Error(`missing ${spec}-outline.json`);
  const outline = JSON.parse(fs.readFileSync(outlinePath, "utf8"));

  const rows = [];
  const dropped = [];
  const unmapped = [];

  for (const [index, s] of outline.statements.entries()) {
    if ((cfg.drop || []).includes(s.code)) {
      dropped.push(s.code);
      continue;
    }
    const raw = cfg.mapping[s.code];
    const [slug, levelOverride] = raw ? raw.split("@") : [null, null];
    // The board's level for this statement. The outline's own `level` is a
    // combined string for split specs ('AS+A2'), which is not a level we have,
    // so the spec config is the fallback.
    const level = levelOverride || cfg.level || outline.level;
    if (!raw) unmapped.push(`${s.code} ${s.title || "(untitled)"}`);
    rows.push({
      code: s.code,
      title: s.title || "",
      area: s.area ?? null,
      tier: s.tier ?? "both",
      level,
      slug,
      sort: index,
    });
  }

  const values = rows
    .map(
      (r) =>
        `(${q(outline.board)}, ${q(spec)}, ${q(r.level)}, ${q(r.code)}, ${q(r.title)}, ` +
        `${r.area === null ? "null" : q(r.area)}, ${q(r.tier)}, ${levelRow(outline.subject, r.level)}, ` +
        `${r.slug ? topicRow(outline.subject, r.level, r.slug, levelsFor(cfg)) : "null"}, ` +
        `${q(outline.source_url)}, ${q(outline.syllabus_years)}, ${r.sort})`,
    )
    .join(",\n");

  await post(`insert into public.syllabus_statements
  (board, spec_code, level, code, title, area, tier, subject_level_id, topic_id, source_url, syllabus_years, sort_order)
values
${values}
on conflict (board, spec_code, code) do update set
  title = excluded.title,
  area = excluded.area,
  tier = excluded.tier,
  level = excluded.level,
  subject_level_id = excluded.subject_level_id,
  topic_id = excluded.topic_id,
  source_url = excluded.source_url,
  syllabus_years = excluded.syllabus_years,
  sort_order = excluded.sort_order;`);

  const mapped = rows.filter((r) => r.slug).length;
  console.log(
    `${spec}: ${rows.length} statements loaded (${mapped} mapped` +
      `${dropped.length ? `, ${dropped.length} extractor artifacts dropped` : ""}` +
      `${unmapped.length ? `, ${unmapped.length} UNMAPPED` : ""})`,
  );
  if (unmapped.length) console.log(`  unmapped: ${unmapped.join(" | ")}`);

  // Read back from the database rather than guessing: a row whose board level
  // differs from the level of the topic that teaches it is a real finding (the
  // board puts 9618's files/ADT content in the AS half, our topics for it are
  // A2), and it is the kind of thing a coverage claim must not paper over.
  const drift = JSON.parse(
    await post(`select st.code, st.level::text as board_level, sl.level::text as topic_level, t.slug
     from public.syllabus_statements st
     join public.topics t on t.id = st.topic_id
     join public.subject_levels sl on sl.id = t.subject_level_id
    where st.spec_code = ${q(spec)} and st.level <> sl.level::text
    order by st.sort_order`),
  );
  if (drift.length)
    console.log(
      `  cross-level (board half != our topic's half): ` +
        drift.map((d) => `${d.code} ${d.board_level}->${d.topic_level} ${d.slug}`).join(" | "),
    );
}

/** Which of the spec's topic slugs the database does not have. */
async function verify(spec) {
  const cfg = SPECS[spec];
  const slugs = [...new Set(Object.values(cfg.mapping).map((v) => v.split("@")[0]))];
  const out = await post(`select t.slug from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = ${q(cfg.subject)} and t.slug in (${slugs.map(q).join(", ")})`);
  const found = new Set(JSON.parse(out).map((r) => r.slug));
  const missing = slugs.filter((s) => !found.has(s));
  if (missing.length) throw new Error(`${spec}: no such topic slug(s): ${missing.join(", ")}`);
  console.log(`  ${spec}: all ${slugs.length} mapped topic slugs exist`);
}

async function main() {
  const which = process.argv[2] || "all";
  const specs = which === "all" ? Object.keys(SPECS) : [which];
  for (const spec of specs) {
    if (!SPECS[spec]) {
      console.error(
        `${spec}: not mapped in this script${spec === "0478" ? " (extractor incomplete — see docs/syllabus-coverage.md §4)" : ""}`,
      );
      process.exitCode = 2;
      continue;
    }
    await verify(spec);
    await load(spec);
  }
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
