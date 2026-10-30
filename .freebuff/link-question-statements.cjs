#!/usr/bin/env node
/**
 * Backfill questions.statement_id across the legacy banks.
 *
 *   node .freebuff/link-question-statements.cjs                 # propose, write the review file
 *   node .freebuff/link-question-statements.cjs --apply         # write the links
 *   node .freebuff/link-question-statements.cjs --report        # per-statement counts from the DB
 *
 * Why conservative rather than complete: a wrong link is worse than a null one.
 * `syllabus_coverage()` reads statement_questions, so a question filed under the
 * wrong subsection makes that subsection look better tested than it is, and the
 * admin report cannot tell the difference. So this assigns only when the
 * evidence is unambiguous and leaves the rest null, and the report prints both
 * numbers instead of implying full coverage.
 *
 * Three rules, in order:
 *
 *  1. **A topic with exactly one statement** links all of its questions. There is
 *     nothing to choose between, so the mapping is definitional rather than
 *     inferred.
 *  2. **A statement title that appears verbatim** in the question, its options or
 *     its explanation wins, provided no other statement of the topic also appears
 *     verbatim (the longest phrase wins if several do).
 *  3. **Otherwise TF-IDF cosine** between the question and each statement title,
 *     accepted only at a floor and only when the winner beats the runner-up by a
 *     margin. The IDF is computed inside the topic, so a word that every
 *     statement shares ("organisms") carries almost no weight and a word unique
 *     to one statement ("osmosis") carries most of it.
 *
 * Every proposal records its evidence (rule, matched phrase or matched tokens,
 * score, margin) in .freebuff/statement-links.json, which is the review artifact
 * — read it before trusting an --apply.
 */
const fs = require("node:fs");
const path = require("node:path");
const https = require("node:https");

const ROOT = path.join(__dirname, "..");
const REF = "zzliiazovezhxbmfeqco";
const TOKEN = (fs.readFileSync(path.join(__dirname, "get-keys.cjs"), "utf8").match(/sbp_[a-f0-9]+/) || [])[0];

const BAR = {
  minCosine: 0.12,
  minMargin: 1.4,
};

const STOPWORDS = new Set([
  "the", "and", "for", "with", "from", "that", "this", "these", "those", "their", "there", "which",
  "what", "when", "where", "into", "onto", "over", "under", "about", "other", "such", "than", "then",
  "them", "they", "have", "has", "had", "been", "being", "will", "would", "could", "should", "not",
  "but", "all", "any", "some", "more", "most", "less", "its", "his", "her", "use", "used", "using",
  "based", "including", "include", "includes", "describe", "explain", "state", "give", "name", "why",
  "how", "does", "true", "false", "following", "correct", "incorrect", "best", "answer", "question",
  "statement", "statements", "organisms", "organism", "system", "systems", "structure", "structures",
  "inside", "between", "during", "before", "after", "each", "also", "only", "your", "you", "can",
  "one", "two", "three", "first", "second", "part", "parts", "type", "types", "form", "forms",
]);

function tokens(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]+/g, " ")
    .split(/[\s-]+/)
    .map((w) => (w.length > 4 && w.endsWith("s") && !w.endsWith("ss") ? w.slice(0, -1) : w))
    .filter((w) => w.length >= 4 && !STOPWORDS.has(w) && !STOPWORDS.has(w + "s"));
}

function query(text) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({ query: text });
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
          if (res.statusCode >= 300) return reject(new Error(`HTTP ${res.statusCode}: ${out.slice(0, 500)}`));
          try {
            resolve(JSON.parse(out));
          } catch {
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

/**
 * TF-IDF cosine between one question and each statement title of its topic.
 *
 * A token in the stem is worth three times one that only appears in an option or
 * the explanation. That weighting is a repair, not a preference: the first pass
 * scored the whole item equally and filed "Speed is calculated as" under
 * "Forces" because an option mentioned force, while "Motion" shares no word with
 * the stem at all. Options are distractors by design, so evidence from them must
 * never be enough on its own.
 */
function scoreStatements(text, statements, stemTokens) {
  const qTokens = tokens(text);
  const qCount = new Map();
  for (const t of qTokens) qCount.set(t, (qCount.get(t) || 0) + 1);
  for (const t of stemTokens) qCount.set(t, (qCount.get(t) || 0) + 2);

  const docs = statements.map((s) => new Set(tokens(s.title)));
  const N = statements.length;
  const idf = new Map();
  for (const [token] of qCount) {
    const df = docs.filter((d) => d.has(token)).length;
    if (!df) {
      idf.set(token, 0);
      continue;
    }
    idf.set(token, Math.log((N + 1) / (df + 0.5)));
  }

  const qVec = new Map();
  let qNorm = 0;
  for (const [token, count] of qCount) {
    const w = (1 + Math.log(count)) * (idf.get(token) || 0);
    if (w > 0) {
      qVec.set(token, w);
      qNorm += w * w;
    }
  }
  qNorm = Math.sqrt(qNorm);
  if (!qNorm) return statements.map((s) => ({ code: s.code, score: 0, matched: [] }));

  return statements.map((s, i) => {
    let dot = 0;
    let dNorm = 0;
    const matched = [];
    for (const token of docs[i]) {
      const w = idf.get(token) ?? 0;
      dNorm += w * w;
      if (qVec.has(token)) {
        dot += qVec.get(token) * w;
        matched.push(token);
      }
    }
    dNorm = Math.sqrt(dNorm) || 1;
    return { code: s.code, score: dot / (qNorm * dNorm), matched };
  });
}

/** The statement whose title appears verbatim, longest phrase first; null if 0 or 2+ tie at top. */
function phraseMatch(haystack, statements) {
  const text = String(haystack || "").toLowerCase();
  const hits = statements
    .map((s) => ({ code: s.code, title: String(s.title || "").toLowerCase().trim() }))
    // A one-word title has to be distinctive to be evidence. "Heart" and
    // "Blood" appear in almost every question of a circulation topic, so a
    // verbatim hit on them says nothing about which statement is being tested;
    // "Osmosis" or "Electrolysis" does.
    .filter((s) => (s.title.split(/\s+/).length >= 2 || s.title.length >= 7) && text.includes(s.title))
    .sort((a, b) => b.title.length - a.title.length);
  if (!hits.length) return null;
  const longest = hits[0].title.length;
  const tied = hits.filter((h) => h.title.length === longest);
  return tied.length === 1 ? hits[0] : null;
}

function proposalFor(question, statements) {
  const stemTokens = new Set(tokens(question.question_text));
  const text = [question.question_text, (question.options || []).join(" "), question.explanation || ""].join(" ");

  if (statements.length === 1) {
    return { code: statements[0].code, rule: "single-statement topic", score: 1, margin: Infinity, matched: [] };
  }

  // The verbatim rule reads the stem and the explanation, never the options.
  // Options are distractors by design: "Which technique separates ethanol from
  // water?" lists Chromatography as a wrong answer, and matching there filed the
  // question under Chromatography instead of Separation and purification.
  const phrase = phraseMatch(`${question.question_text} ${question.explanation || ""}`, statements);
  if (phrase) {
    return { code: phrase.code, rule: "verbatim title", score: 1, margin: Infinity, matched: [phrase.title] };
  }

  const scored = scoreStatements(text, statements, stemTokens).sort((a, b) => b.score - a.score);
  const [best, second] = scored;
  const margin = second && second.score > 0 ? best.score / second.score : Infinity;
  // The winning match must be visible in the stem itself. A link argued only
  // from an option or the explanation is a guess dressed as evidence.
  const stemEvidence = best.matched.some((m) => stemTokens.has(m));
  if (stemEvidence && best.score >= BAR.minCosine && margin >= BAR.minMargin) {
    return { code: best.code, rule: "tf-idf", score: Number(best.score.toFixed(3)), margin: Number(margin.toFixed(2)), matched: best.matched };
  }
  return {
    code: null,
    rule: "left null",
    score: Number((best?.score || 0).toFixed(3)),
    margin: Number.isFinite(margin) ? Number(margin.toFixed(2)) : null,
    matched: best?.matched || [],
  };
}

async function loadBank() {
  const rows = await query(`select q.id, q.question_text, q.options::text as options, q.explanation,
      t.slug as topic, t.id as topic_id, sub.slug as subject, sl.level
    from public.questions q
    join public.quizzes z on z.id = q.quiz_id
    join public.topics t on t.id = z.topic_id
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects sub on sub.id = sl.subject_id
    where q.statement_id is null
    order by sub.slug, sl.level, t.sort_order, q.sort_order`);

  const statements = await query(`select s.id, s.code, s.title, s.topic_id
    from public.syllabus_statements s
    order by s.topic_id, s.sort_order`);

  const byTopic = new Map();
  for (const s of statements) {
    if (!byTopic.has(s.topic_id)) byTopic.set(s.topic_id, []);
    byTopic.get(s.topic_id).push({ id: s.id, code: s.code, title: s.title });
  }

  return {
    questions: rows.map((r) => {
      let options = [];
      try {
        options = JSON.parse(r.options || "[]");
      } catch {
        options = [];
      }
      return { ...r, options };
    }),
    byTopic,
  };
}

async function main() {
  const argv = process.argv.slice(2);

  /**
   * Repair links argued from a distractor option.
   *
   * The first pass matched statement titles anywhere in the item, including the
   * options, which filed "Which technique separates ethanol from water?" under
   * Chromatography because chromatography was one of the wrong choices. The
   * discriminator is correct_option: a title in the *correct* option is real
   * evidence ("Group 0 elements are called" -> Noble gases), a title that appears
   * only in a wrong option is a distractor and must not decide anything.
   */
  if (argv.includes("--repair-distractor")) {
    const rows = await query(`select q.id, q.question_text, q.options::text as options, q.explanation,
        q.correct_option, s.code as live_code, s.title as live_title,
        t.id as topic_id, t.slug as topic, sub.slug as subject, sl.level
      from public.questions q
      join public.quizzes z on z.id = q.quiz_id
      join public.topics t on t.id = z.topic_id
      join public.subject_levels sl on sl.id = t.subject_level_id
      join public.subjects sub on sub.id = sl.subject_id
      join public.syllabus_statements s on s.id = q.statement_id`);
    const statements = await query(`select id, code, title, topic_id from public.syllabus_statements order by topic_id, sort_order`);
    const byTopic = new Map();
    for (const s of statements) {
      if (!byTopic.has(s.topic_id)) byTopic.set(s.topic_id, []);
      byTopic.get(s.topic_id).push({ id: s.id, code: s.code, title: s.title });
    }

    const fixes = [];
    for (const r of rows) {
      const title = String(r.live_title || "").toLowerCase().trim();
      if (!title) continue;
      if (title.split(/\s+/).length < 2 && title.length < 7) continue;
      let options = [];
      try {
        options = JSON.parse(r.options || "[]");
      } catch {
        options = [];
      }
      const prose = `${r.question_text} ${r.explanation || ""}`.toLowerCase();
      const inProse = prose.includes(title);
      const inCorrect = String(options[r.correct_option] || "").toLowerCase().includes(title);
      const inWrong = options.some((o, i) => i !== r.correct_option && String(o || "").toLowerCase().includes(title));
      if (inProse || inCorrect || !inWrong) continue;
      const p = proposalFor({ question_text: r.question_text, options, explanation: r.explanation }, byTopic.get(r.topic_id) || []);
      fixes.push({ id: r.id, topic: r.topic, subject: r.subject, level: r.level, from: r.live_code, to: p.code, rule: p.rule, stem: r.question_text });
    }

    console.log(`${fixes.length} link(s) argued from a distractor option`);
    for (const f of fixes.slice(0, 10)) console.log(`  ${f.from} -> ${f.to || "null"} (${f.rule})  ${String(f.stem).slice(0, 62)}`);
    if (!fixes.length) return;

    const CHUNK = 100;
    for (let i = 0; i < fixes.length; i += CHUNK) {
      const batch = fixes.slice(i, i + CHUNK);
      const values = batch
        .map((f) =>
          f.to
            ? `('${f.id}'::uuid, (select s.id from public.syllabus_statements s
      join public.topics t on t.id = s.topic_id
      join public.subject_levels sl on sl.id = t.subject_level_id
      join public.subjects sub on sub.id = sl.subject_id
      where sub.slug = '${f.subject}' and sl.level = '${f.level}' and t.slug = '${f.topic}' and s.code = '${f.to}' limit 1))`
            : `('${f.id}'::uuid, null::uuid)`,
        )
        .join(",\n    ");
      await query(`update public.questions q set statement_id = v.sid
from (values
    ${values}
) as v(qid, sid) where q.id = v.qid;`);
    }
    console.log(`repaired ${fixes.length}; ${fixes.filter((f) => !f.to).length} set null`);
    return;
  }

  if (argv.includes("--report")) {
    const rows = await query(`select sub.slug as subject, sl.level, t.slug as topic, s.code, s.title,
        count(q.id) as questions
      from public.syllabus_statements s
      join public.topics t on t.id = s.topic_id
      join public.subject_levels sl on sl.id = t.subject_level_id
      join public.subjects sub on sub.id = sl.subject_id
      left join public.questions q on q.statement_id = s.id
      group by sub.slug, sl.level, t.slug, s.code, s.title
      order by sub.slug, sl.level, t.sort_order, s.sort_order`);
    const empty = rows.filter((r) => Number(r.questions) === 0);
    console.log(`${rows.length} statements · ${rows.reduce((n, r) => n + Number(r.questions), 0)} linked questions · ${empty.length} statements with none`);
    for (const r of rows) {
      console.log(`${String(r.subject).padEnd(34)} ${String(r.level).padEnd(5)} ${String(r.code).padEnd(7)} ${String(r.questions).padStart(3)}  ${r.title}`);
    }
    return;
  }

  const { questions, byTopic } = await loadBank();
  const proposals = [];
  let noStatements = 0;
  for (const q of questions) {
    const statements = byTopic.get(q.topic_id) || [];
    if (!statements.length) {
      noStatements++;
      proposals.push({ id: q.id, topic: q.topic, subject: q.subject, level: q.level, stem: q.question_text, code: null, rule: "topic has no statements", score: 0, margin: null, matched: [] });
      continue;
    }
    const p = proposalFor(q, statements);
    proposals.push({ id: q.id, topic: q.topic, subject: q.subject, level: q.level, stem: q.question_text, ...p });
  }

  const linked = proposals.filter((p) => p.code);
  const byRule = linked.reduce((acc, p) => ({ ...acc, [p.rule]: (acc[p.rule] || 0) + 1 }), {});
  const outPath = path.join(__dirname, "statement-links.json");
  // Never clobber a review file that still records an applied pass. A second
  // run proposes nothing (the links exist), and overwriting it with an empty
  // list destroys the only record of what the first run changed — which is what
  // the coverage report's "before" column is reconstructed from.
  if (!linked.length && fs.existsSync(outPath)) {
    console.log(`  review file kept as-is: ${path.relative(ROOT, outPath)} (nothing new proposed)`);
  } else
  fs.writeFileSync(
    outPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        bar: BAR,
        totals: { unlinked: questions.length, proposed: linked.length, leftNull: questions.length - linked.length, topicsWithoutStatements: noStatements, byRule },
        proposals,
      },
      null,
      2,
    ),
  );

  console.log(`${questions.length} unlinked questions`);
  console.log(`  proposed: ${linked.length} (${Object.entries(byRule).map(([k, v]) => `${k} ${v}`).join(", ")})`);
  console.log(`  left null: ${questions.length - linked.length} (${noStatements} in topics with no statements at all)`);
  console.log(`  review file: ${path.relative(ROOT, outPath)}`);

  if (!argv.includes("--apply")) {
    console.log("dry run: nothing written to the database. Re-run with --apply to link.");
    return;
  }

  const CHUNK = 200;
  let written = 0;
  for (let i = 0; i < linked.length; i += CHUNK) {
    const batch = linked.slice(i, i + CHUNK);
    // Pin subject and level as well as topic slug: nine topic slugs exist twice
    // (chemistry OL and 9202 IGCSE share "organic-chemistry", maths AS and A2
    // share "proof"), so a slug-and-code lookup alone can resolve to another
    // qualification's statement. Today none of those pairs share a code, which is
    // why the first run measured 0 cross-topic links — that is luck, not a
    // guarantee, and this is the line that makes it one.
    const values = batch
      .map(
        (p) => `('${p.id}'::uuid, (select s.id from public.syllabus_statements s
      join public.topics t on t.id = s.topic_id
      join public.subject_levels sl on sl.id = s.subject_level_id
      join public.subjects sub on sub.id = sl.subject_id
      where sub.slug = '${p.subject.replace(/'/g, "''")}' and sl.level = '${p.level.replace(/'/g, "''")}'
        and t.slug = '${p.topic.replace(/'/g, "''")}' and s.code = '${p.code.replace(/'/g, "''")}' limit 1))`,
      )
      .join(",\n    ");
    const sql = `update public.questions q
  set statement_id = v.sid
from (values
    ${values}
) as v(qid, sid)
where q.id = v.qid and q.statement_id is null and v.sid is not null;`;
    await query(sql);
    written += batch.length;
    console.log(`  linked ${written}/${linked.length}`);
  }

  // Assert the property the backfill must never break: a question's statement
  // belongs to the topic its quiz belongs to. A cross-topic link inflates a
  // topic that does not contain the question, and the admin report cannot tell.
  const [{ bad }] = await query(`select count(*)::int as bad
    from public.questions q
    join public.quizzes z on z.id = q.quiz_id
    join public.syllabus_statements s on s.id = q.statement_id
    where s.topic_id is distinct from z.topic_id`);
  if (bad) {
    console.error(`FAIL: ${bad} question(s) linked to a statement outside their own topic`);
    process.exit(1);
  }
  console.log("verified: 0 cross-topic links");
  console.log("done");
}

// Exported so the applied links can be re-derived and checked offline by
// .freebuff/audit-statement-links.cjs — a link that no longer follows from the
// rules is either a stale write or a manual edit, and both are worth knowing.
module.exports = { proposalFor, tokens, scoreStatements };

if (require.main === module) {
  main().catch((e) => {
    console.error("FAIL", e.message);
    process.exit(1);
  });
}
