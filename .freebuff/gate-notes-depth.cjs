#!/usr/bin/env node
/**
 * The exam-grade bar for published notes, as a check rather than an opinion.
 *
 *   node .freebuff/gate-notes-depth.cjs chemistry AS
 *   node .freebuff/gate-notes-depth.cjs --all
 *   node .freebuff/gate-notes-depth.cjs --all --strict     # exit 1 if any row is below the bar
 *   node .freebuff/gate-notes-depth.cjs --self-test        # prove each rule still rejects bad content
 *
 * The bar is calibrated on the deepest rows in the estate (the Chemistry A2
 * notes): a note of 8,500+ characters of text, opened by an <h2> and a real
 * introduction, at least eight <h3> sections, real structure (a table, or 15+
 * list items), a worked example, a mistakes section and exam-style questions.
 *
 * The title has to be a title, too: 12–100 characters, no markup, no newline.
 * That rule exists because a scripted content write once put a row's own body —
 * or the model's scratch text — in its title, and every library list, card and
 * <title> tag then rendered thousands of characters of prose where a heading
 * belongs. A body in the title is invisible to every other check here, because
 * the body itself can still be excellent.
 * Length alone is not the test — a padded note with repeated paragraphs fails,
 * and a note that ignores some of its own board statements fails.
 *
 * Read-only: it never writes to Supabase. Drafting and applying are separate
 * steps (.freebuff/build-notes-depth.cjs, .freebuff/deepen-materials.cjs), so a
 * gate run can never change production.
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

const REF = "zzliiazovezhxbmfeqco";
const TOKEN = (fs.readFileSync(path.join(__dirname, "get-keys.cjs"), "utf8").match(/sbp_[a-f0-9]+/) || [])[0];

/* ── the bar ─────────────────────────────────────────────────────────────── */
/*
 * Calibrated on the ten Chemistry A2 notes, which are the deepest rows in the
 * estate: 8,882–16,636 characters of text, 9–26 <h3> sections, 30–65 list items,
 * and a mistakes section plus exam-style questions in every one. The floor sits
 * just under the weakest of those, so a row at the A2 standard passes and a
 * 3,000-character summary does not. Worked examples are required here even
 * though four of the ten A2 notes lack one: a note without a worked example is
 * not yet at the standard we are holding new content to.
 */
const BAR = {
  minText: 8500,
  // The page budget scales with the size of the topic. 26,000 characters was
  // calibrated on the Chemistry notes, which cover ~10 statements; a unit topic
  // such as Biology A2 Topic 5 carries 26 statements of its own, and holding it
  // to the same fixed ceiling would force it to ~1,000 characters per statement
  // — thinner than the notes the bar was calibrated on. So the cap is a density
  // band: 26,000 floor, 2,600 characters per board statement above that. A
  // 26-statement topic may run to 67,600; a 3-statement topic still stops at
  // 26,000. Density is what the rule is about, not the raw page count.
  maxHtml: 26000,
  maxHtmlPerStatement: 2600,
  minH3: 8,
  minIntro: 200,
  minListItems: 15,
  // A heading, not a paragraph. 100 characters fits the longest real titles in
  // the estate ("2.4 Electromagnetic Induction and Alternating Currents" is 52)
  // with room to spare, and still catches a row that pasted its first sentence.
  maxTitle: 100,
};

/** The html ceiling for one row: the floor, or the per-statement band if larger. */
function htmlCap(row, bar = BAR) {
  const statements = (row.statements || []).length;
  return Math.max(bar.maxHtml, bar.maxHtmlPerStatement * statements);
}

const argv = process.argv.slice(2);
const strict = argv.includes("--strict");
const all = argv.includes("--all");
const selfTest = argv.includes("--self-test");
// Notes are the revision artefact this bar is about; summaries are deliberately
// shorter digests and are gated separately when that pass exists.
const type = argv.includes("--type") ? argv[argv.indexOf("--type") + 1] : "notes";
const [subjectArg, levelArg] = argv.filter((a) => !a.startsWith("--"));

function query(sql) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({ query: sql });
    const req = https.request(
      {
        hostname: "api.supabase.com",
        path: `/v1/projects/${REF}/database/query`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload),
        },
      },
      (res) => {
        let out = "";
        res.setEncoding("utf8");
        res.on("data", (c) => (out += c));
        res.on("end", () => {
          if (res.statusCode >= 300) return reject(new Error(`HTTP ${res.statusCode}: ${out.slice(0, 400)}`));
          try {
            resolve(JSON.parse(out));
          } catch (e) {
            reject(new Error(`bad JSON: ${out.slice(0, 200)}`));
          }
        });
      },
    );
    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

/* ── the checks ──────────────────────────────────────────────────────────── */

const STOPWORDS = new Set([
  "about", "above", "after", "again", "against", "because", "been", "before", "being", "below",
  "between", "both", "cannot", "could", "does", "doing", "down", "during", "each", "from",
  "further", "have", "having", "here", "into", "itself", "more", "most", "must", "only", "other",
  "over", "same", "should", "some", "such", "than", "that", "their", "them", "then", "there",
  "these", "they", "this", "those", "through", "under", "until", "very", "were", "what", "when",
  "where", "which", "while", "with", "would", "your", "using", "used", "use", "including",
  "include", "includes", "also", "will", "within", "without", "able", "student", "students",
  "topic", "know", "understand", "calculate", "explain", "describe", "able",
]);

function keywords(title) {
  return String(title || "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 5 && !STOPWORDS.has(w));
}

const textOf = (html) =>
  String(html || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:nbsp|amp|lt|gt|quot|#39);/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Every paragraph that is repeated verbatim is padding, not teaching. */
function repeatedParagraphs(html) {
  const chunks = String(html || "")
    .split(/<\/?(?:p|li|h[2-6])[^>]*>/i)
    .map((p) => textOf(p))
    .filter((p) => p.length > 60);
  const seen = new Set();
  let repeats = 0;
  for (const p of chunks) {
    if (seen.has(p)) repeats++;
    else seen.add(p);
  }
  return repeats;
}

/**
 * Score one row. `row` needs: title, content, statements[] (code + title).
 * Returns { ok, reasons[], stats{} }.
 */
function check(row, bar = BAR) {
  const content = String(row.content || "");
  const text = textOf(content);
  const reasons = [];
  const h3 = (content.match(/<h3\b/gi) || []).length;
  const tables = (content.match(/<table\b/gi) || []).length;
  const blocks = (content.match(/<pre\b/gi) || []).length;
  const paragraphs = (content.match(/<p\b/gi) || []).length;

  if (!content.trim()) reasons.push("no content");
  if (text.length < bar.minText) reasons.push(`text ${text.length} < ${bar.minText}`);
  const cap = htmlCap(row, bar);
  // Inline figures are markup, not reading. One SVG figure costs four to seven
  // kilobytes of attributes — a drawing a student takes in at a glance — so
  // counting it as page weight judged a note *with* a diagram as if it were a
  // wall of prose: four Physics notes failed this cap on their figure alone
  // while their text stayed well inside the band. The rule is about what a page
  // asks someone to read, so `<svg>` blocks come out of the count and every
  // character of prose that remains is still held to the same ceiling.
  const reading = content.replace(/<svg\b[\s\S]*?<\/svg>/gi, "");
  if (reading.length > cap) reasons.push(`reading html ${reading.length} > ${cap}${cap > bar.maxHtml ? ` (${(row.statements || []).length} statements)` : ""}`);
  if (!/^\s*<h2\b/i.test(content)) reasons.push("does not open with <h2>");
  if (h3 < bar.minH3) reasons.push(`${h3} <h3> sections < ${bar.minH3}`);
  // Structure, not a house style: the A2 notes teach through long bullet lists,
  // the AS notes through prose and tables. Either is acceptable, a bare essay is not.
  const listItems = (content.match(/<li\b/gi) || []).length;
  if (listItems < bar.minListItems && tables === 0) {
    reasons.push(`${listItems} list items and no table`);
  }

  const intro = (content.match(/^\s*<h2\b[^>]*>[\s\S]*?<\/h2>\s*<p\b[^>]*>([\s\S]*?)<\/p>/i) || [])[1];
  if (!intro) reasons.push("no introduction paragraph after the <h2>");
  else if (textOf(intro).length < bar.minIntro) reasons.push(`introduction ${textOf(intro).length} < ${bar.minIntro} chars`);

  // The estate already names these sections three ways; accept the substance
  // rather than one house wording.
  if (!/worked example|worked reasoning|worked calculation|worked solution/i.test(text)) {
    reasons.push('no worked example section');
  }
  if (!/exam-style|exam style|exam questions|exam practice|exam tips|exam technique/i.test(text)) {
    reasons.push("no exam-practice section");
  }
  if (!/typical mistakes|common mistakes|common errors/i.test(text)) reasons.push("no mistakes section");

  if (content.includes("`")) reasons.push("contains a backtick");
  if (content.includes("\uFFFD")) reasons.push("contains U+FFFD");
  if (/\\\\\(|\\\\\[|\$\$/.test(content)) reasons.push("contains LaTeX maths");
  if (/<script|<iframe|<a\s|<img|onclick=|style=/i.test(content)) reasons.push("contains a rejected tag");

  const repeats = repeatedParagraphs(content);
  if (repeats > 0) reasons.push(`${repeats} repeated paragraph(s)`);

  // The title is a field of its own, not a preview of the body. Checked on the
  // raw value for the newline (trim would hide a trailing one) and on the
  // trimmed value for length and markup.
  const rawTitle = String(row.title ?? "");
  const title = rawTitle.trim();
  if (title.length < 12) reasons.push("title too short");
  if (title.length > bar.maxTitle) reasons.push(`title ${title.length} > ${bar.maxTitle} chars`);
  if (/<[a-z/!]/i.test(title)) reasons.push("title contains a tag");
  if (/[\r\n]/.test(rawTitle)) reasons.push("title contains a newline");
  if (/[—-]\s*study notes$/i.test(title)) reasons.push("generic title");

  const statements = row.statements || [];
  const lower = text.toLowerCase();
  const missing = [];
  for (const st of statements) {
    const words = keywords(st.title);
    if (!words.length) continue;
    const hits = words.filter((w) => lower.includes(w)).length;
    if (hits < Math.min(2, words.length)) missing.push(`${st.code} ${st.title}`);
  }
  if (statements.length && missing.length > statements.length / 2) {
    reasons.push(`covers ${statements.length - missing.length}/${statements.length} statements`);
  }

  return {
    ok: reasons.length === 0,
    reasons,
    stats: {
      html: content.length,
      reading: reading.length,
      text: text.length,
      h3,
      tables,
      blocks,
      listItems,
      paragraphs,
      statements: statements.length,
      missing: missing.length,
    },
  };
}

/* ── self-test ───────────────────────────────────────────────────────────── */

/**
 * A synthetic passing note, so each rule can be broken in exactly one way and
 * shown to reject. If a mutation stops being caught, the gate has been weakened
 * and the self-test fails with the rule that no longer bites.
 */
function goodFixture() {
  const filler = [];
  for (let i = 0; i < 60; i++) {
    filler.push(
      `<p>Paragraph ${i + 1} explains a distinct idea about the topic in enough detail to be useful to a student revising for the examination, with a worked calculation and the reason each step is taken in that particular order.</p>`,
    );
  }
  const sections = [];
  for (let i = 0; i < 6; i++) {
    sections.push(`<h3>Section ${i + 1}</h3>${filler.slice(i * 10, i * 10 + 10).join("")}`);
  }
  return [
    "<h2>AS Level Chemistry: Fixture</h2>",
    `<p>${"This introduction names the specification, the unit and the scope of the topic in a sentence long enough to be a real introduction rather than a label. ".repeat(2)}</p>`,
    ...sections,
    "<h3>Worked example</h3><p>Step one, step two, answer with units.</p>",
    "<table border=\"1\"><tr><th>A</th><th>B</th></tr><tr><td>1</td><td>2</td></tr></table>",
    `<h3>Revision checklist</h3><ul>${Array.from({ length: 26 }, (_, i) => `<li>Checklist item ${i + 1} can be stated, applied and checked.</li>`).join("")}</ul>`,
    "<h3>Typical mistakes</h3><ul><li>Forgetting the sign.</li></ul>",
    "<h3>Exam-style questions</h3><ol><li>Question. Answer.</li></ol>",
  ].join("\n");
}

function runSelfTest() {
  const base = { title: "AS Level Chemistry: Fixture", content: goodFixture(), statements: [] };
  // A body that is over the 26,000 floor but not over 26,000 + 12 × 2,600, so the
  // two cap cases below differ only in how many statements the topic carries.
  // Each paragraph is numbered: unnumbered filler would trip the repeat check and
  // the scaling case would fail for the wrong reason.
  const padded = Array.from(
    { length: 90 },
    (_, i) =>
      `<p>Padding paragraph ${i + 1} adds length to the fixture without restating any earlier sentence, so that the only rule under test is the page budget this topic is allowed.</p>`,
  ).join("");
  const longBody = base.content + padded;
  const twelveStatements = Array.from({ length: 12 }, (_, i) => ({
    code: `9.${i + 1}`,
    title: "Paragraph length under review",
  }));
  // Each case names the reason it must produce, so a passing overall verdict
  // cannot hide a rule that has stopped firing for an unrelated reason.
  const cases = [
    ["passes unmodified", base, true, null],
    [
      "over the page cap",
      { ...base, content: longBody },
      false,
      /html \d+ > 26000/,
    ],
    [
      "page budget scales with statements",
      { ...base, content: longBody, statements: twelveStatements },
      true,
      null,
    ],
    ["short body", { ...base, content: base.content.slice(0, 4000) }, false, /text \d+ < 8500/],
    [
      "no h2 opener",
      { ...base, content: base.content.replace("<h2>", "<h3>").replace("</h2>", "</h3>") },
      false,
      /does not open with <h2>/,
    ],
    ["too few sections", { ...base, content: base.content.replace(/<h3>Section \d<\/h3>/g, "") }, false, /<h3> sections/],
    [
      "no structure",
      { ...base, content: base.content.replace(/<li>/g, "<span>").replace(/<table[\s\S]*?<\/table>/, "") },
      false,
      /list items and no table/,
    ],
    [
      "no worked example",
      {
        ...base,
        content: base.content.replace("Worked example", "An aside").replace(/worked calculation/gi, "calculation"),
      },
      false,
      /worked example/,
    ],
    ["no exam practice", { ...base, content: base.content.replace("Exam-style questions", "Further reading") }, false, /exam-practice/],
    ["no mistakes section", { ...base, content: base.content.replace("Typical mistakes", "Notes") }, false, /mistakes section/],
    ["backtick", { ...base, content: base.content + "<p>a `tick`</p>" }, false, /backtick/],
    ["U+FFFD", { ...base, content: base.content + "<p>bad \uFFFD char</p>" }, false, /U\+FFFD/],
    ["rejected tag", { ...base, content: base.content + '<a href="/x">link</a>' }, false, /rejected tag/],
    [
      "repeated paragraph",
      { ...base, content: base.content + base.content.match(/<p>Paragraph 1 [\s\S]*?<\/p>/)[0] },
      false,
      /repeated paragraph/,
    ],
    ["generic title", { ...base, title: "Energetics — Study Notes" }, false, /generic title/],
    [
      "title holds the body",
      {
        ...base,
        title:
          "Energetics is the study of heat energy changes in chemical reactions, measured under standard conditions, and this sentence is far too long to be a page title.",
      },
      false,
      /title \d+ > 100 chars/,
    ],
    ["title holds markup", { ...base, title: "<h3>Energetics</h3>" }, false, /title contains a tag/],
    ["title holds a newline", { ...base, title: "Energetics\nand enthalpy" }, false, /title contains a newline/],
    [
      "ignores its statements",
      {
        ...base,
        statements: [
          { code: "1.1", title: "enthalpy change of combustion" },
          { code: "1.2", title: "calorimetry calculations" },
          { code: "1.3", title: "bond enthalpy limitations" },
        ],
      },
      false,
      /covers 0\/3 statements/,
    ],
  ];
  let failures = 0;
  for (const [name, row, shouldPass, expectReason] of cases) {
    const result = check(row);
    const reasonOk = expectReason ? result.reasons.some((r) => expectReason.test(r)) : true;
    const correct = result.ok === shouldPass && reasonOk;
    if (!correct) failures++;
    console.log(
      `${correct ? "ok  " : "FAIL"} ${name} → ${result.ok ? "pass" : result.reasons.join("; ")}` +
        (expectReason && !reasonOk ? `  [expected /${expectReason.source}/]` : ""),
    );
  }
  console.log(failures ? `\n${failures} self-test case(s) did not behave` : "\nself-test clean: every rule still rejects what it should");
  process.exit(failures ? 1 : 0);
}

/* ── the run ─────────────────────────────────────────────────────────────── */

async function main() {
  if (selfTest) return runSelfTest();

  const filters = [];
  if (!all) {
    if (!subjectArg || !levelArg) {
      console.error("usage: node .freebuff/gate-notes-depth.cjs <subject> <level> | --all [--strict] [--type notes|summary] | --self-test");
      process.exit(2);
    }
    filters.push(`s.slug = '${subjectArg}'`);
    filters.push(`sl.level::text = '${levelArg}'`);
  }

  const rows = await query(`
select m.id, m.title, m.content, m.material_type,
       s.name as subject, sl.level::text as level, t.slug as topic, t.name as topic_name,
       coalesce((select jsonb_agg(jsonb_build_object('code', st.code, 'title', st.title) order by st.sort_order)
                 from public.syllabus_statements st where st.topic_id = t.id), '[]'::jsonb) as statements
from public.study_materials m
join public.topics t on t.id = m.topic_id
join public.subject_levels sl on sl.id = t.subject_level_id
join public.subjects s on s.id = sl.subject_id
where m.material_type = '${type}'
${filters.length ? `and ${filters.join(" and ")}` : ""}
order by s.name, sl.level, t.slug, m.material_type;`);

  if (!rows.length) {
    console.error("no rows matched");
    process.exit(2);
  }

  const groups = new Map();
  let failed = 0;
  for (const row of rows) {
    const key = `${row.subject} ${row.level}`;
    if (!groups.has(key)) groups.set(key, { pass: 0, fail: 0, below: [] });
    const g = groups.get(key);
    const r = check(row);
    if (r.ok) g.pass++;
    else {
      g.fail++;
      failed++;
      g.below.push({ topic: row.topic, chars: r.stats.text, reasons: r.reasons });
    }
  }

  for (const [label, g] of groups) {
    console.log(`\n${label}  ${g.pass}/${g.pass + g.fail} at the bar`);
    for (const b of g.below) console.log(`  ✗ ${b.topic} (${b.chars} chars): ${b.reasons.join("; ")}`);
  }
  const total = rows.length;
  console.log(`\n${total - failed}/${total} notes at the bar (${failed} below)`);
  if (strict && failed) process.exit(1);
}

// Exported so a drafting step can score a candidate body before it writes
// anything (`require("./gate-notes-depth.cjs").check(row)`), which is how an
// append is proven to clear the bar before it reaches the live table.
module.exports = { check, htmlCap, textOf, BAR };

if (require.main === module) {
  main().catch((e) => {
    console.error("gate failed:", e.message);
    process.exit(1);
  });
}
