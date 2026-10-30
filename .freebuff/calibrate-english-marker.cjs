// calibrate-english-marker.cjs — measure the live English band marker against
// real examiner-marked scripts.
//
// The marker's whole claim is that a student's English writing is placed the
// way a real examiner would place it. That claim can only be tested against
// scripts the board has already marked, so this harness replays the boards'
// own exemplar responses through `ai-correction` and compares the result with
// the examiner's marks published beside each script.
//
// It goes through the product's real path: a throwaway student with a live
// subscription, the real function, the real prompt, the real band reconciler.
// The 0500 scripts are uploaded as page photographs (the scan is what a
// student submits); the 9280 scripts are pasted as typed answers.
//
//   node .freebuff/calibrate-english-marker.cjs --tag before
//   node .freebuff/calibrate-english-marker.cjs --only 0500 --json out.json
//   node .freebuff/calibrate-english-marker.cjs --keep     # leave the account
//
// It creates and deletes its own account, subscription and uploads. Every
// marking costs one AI call.
const fs = require("node:fs");
const path = require("node:path");
const https = require("node:https");

const ROOT = path.resolve(__dirname, "..");
const CAL = path.join(ROOT, ".freebuff-tmp/calibration");
const TOKEN = (fs.readFileSync(path.join(ROOT, ".freebuff/get-keys.cjs"), "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const ENV = fs.readFileSync(path.join(ROOT, ".env"), "utf8");
const REF = (ENV.match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];
const ANON = (ENV.match(/VITE_SUPABASE_PUBLISHABLE_KEY\s*=\s*"?([^"\n]+)"?/) || [])[1];
const ORIGIN = `https://${REF}.supabase.co`;

const LEVELS = {
  "0500": "febbe4a9-72ff-4cd6-85cd-9dbf5b016245",
  "9280": "9029c6e0-495a-4e7d-a4ec-ac3a61bde90b",
};

const argv = process.argv.slice(2);
const argOf = (name, dflt = null) => {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : dflt;
};
const tag = argOf("--tag", "run");
const jsonPath = argOf("--json", path.join(CAL, `calibration-${tag}.json`));
const only = (argOf("--only") ?? "").split(",").filter(Boolean);
const keep = argv.includes("--keep");

/* ───────────────────────────────── http ─────────────────────────────────── */

function request(method, url, { headers = {}, body } = {}) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    // A Buffer is already the bytes: serialising it would upload
    // {"type":"Buffer","data":[…]} and the marker would (correctly) refuse
    // it as an unreadable image.
    const payload = body === undefined
      ? null
      : Buffer.isBuffer(body) || body instanceof Uint8Array
      ? Buffer.from(body)
      : Buffer.from(typeof body === "string" ? body : JSON.stringify(body));
    const req = https.request(
      {
        hostname: u.hostname,
        path: u.pathname + u.search,
        method,
        headers: {
          ...headers,
          ...(payload ? { "Content-Length": payload.length } : {}),
        },
      },
      (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          const text = Buffer.concat(chunks).toString("utf8");
          let json = null;
          try {
            json = JSON.parse(text);
          } catch { /* not json */ }
          resolve({ status: res.statusCode, text, json });
        });
      },
    );
    req.setTimeout(180000, () => req.destroy(new Error("timeout")));
    req.on("error", reject);
    if (payload) req.write(payload);
    req.end();
  });
}

const mgmtQuery = async (sql) => {
  const r = await request("POST", `https://api.supabase.com/v1/projects/${REF}/database/query`, {
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: { query: sql },
  });
  if (r.status !== 200 && r.status !== 201) throw new Error(`SQL ${r.status}: ${r.text.slice(0, 400)}`);
  return r.json;
};

const auth = (extra = {}) => ({ apikey: ANON, Authorization: `Bearer ${ANON}`, ...extra });

/* ─────────────────────────────── account ────────────────────────────────── */

let ACCOUNT = null;
/** Every object path this run created, so cleanup removes exactly those. */
const UPLOADED = [];

async function makeStudent() {
  const email = `calib-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}@igcse-platform.local`;
  const password = `Cal_${Math.random().toString(36).slice(2)}Aa1!`;
  const signup = await request("POST", `${ORIGIN}/auth/v1/signup`, {
    headers: { ...auth(), "Content-Type": "application/json" },
    body: { email, password, data: { full_name: "Calibration student" } },
  });
  if (signup.status >= 400) throw new Error(`signup ${signup.status}: ${signup.text.slice(0, 300)}`);
  const id = signup.json?.user?.id ?? signup.json?.id;
  if (!id) throw new Error(`signup returned no user id: ${signup.text.slice(0, 300)}`);

  // The admin API's secret key is not usable for this project (see
  // docs/key-rotation.md), so confirmation and the plan are set by SQL.
  await mgmtQuery(`update auth.users set email_confirmed_at = coalesce(email_confirmed_at, now()) where id = '${id}';`);
  await mgmtQuery(
    `insert into public.subscriptions (user_id, plan_id, status, starts_at, ends_at) ` +
      `values ('${id}', 'monthly', 'active', now(), now() + interval '2 days');`,
  );

  const signin = await request("POST", `${ORIGIN}/auth/v1/token?grant_type=password`, {
    headers: { ...auth(), "Content-Type": "application/json" },
    body: { email, password },
  });
  if (signin.status !== 200 || !signin.json?.access_token) {
    throw new Error(`signin ${signin.status}: ${signin.text.slice(0, 300)}`);
  }
  ACCOUNT = { id, email, password, token: signin.json.access_token };
  console.log(`account: ${email} (${id.slice(0, 8)}…) subscribed`);
  return ACCOUNT;
}

async function dropStudent() {
  if (!ACCOUNT || keep) {
    if (ACCOUNT && keep) console.log(`keeping account ${ACCOUNT.email}`);
    return;
  }
  // Delete exactly the paths this run uploaded: the list endpoint returns
  // folders rather than a recursive tree, so a prefix deletion misses nested
  // objects and leaves them orphaned in the bucket.
  try {
    for (let i = 0; i < UPLOADED.length; i += 100) {
      const prefixes = UPLOADED.slice(i, i + 100);
      const res = await request("DELETE", `${ORIGIN}/storage/v1/object/homework-uploads`, {
        headers: { ...auth({ Authorization: `Bearer ${ACCOUNT.token}` }), "Content-Type": "application/json" },
        body: { prefixes },
      });
      if (res.status >= 400) console.warn(`storage cleanup: HTTP ${res.status} ${res.text.slice(0, 160)}`);
    }
  } catch (error) {
    console.warn(`storage cleanup: ${error.message}`);
  }
  // Deleting the auth user cascades profile, role, subscription and audit rows.
  await mgmtQuery(`delete from auth.users where id = '${ACCOUNT.id}';`);
  console.log("account deleted");
}

/* ──────────────────────────────── marking ───────────────────────────────── */

async function uploadPages(fixture) {
  const dir = path.join(CAL, fixture.answer.dir);
  const files = [];
  for (const name of fixture.answer.files) {
    const file = path.join(dir, name);
    if (!fs.existsSync(file)) throw new Error(`missing page image ${file} (run extract-pages.cjs)`);
    const objectPath = `${ACCOUNT.id}/calibration/${fixture.id}/${name}`;
    const up = await request("POST", `${ORIGIN}/storage/v1/object/homework-uploads/${objectPath}`, {
      headers: {
        ...auth({ Authorization: `Bearer ${ACCOUNT.token}` }),
        "Content-Type": "image/png",
        "x-upsert": "true",
      },
      body: fs.readFileSync(file),
    });
    if (up.status >= 400) throw new Error(`upload ${name}: ${up.status} ${up.text.slice(0, 200)}`);
    UPLOADED.push(objectPath);
    files.push({ bucket: "homework-uploads", path: objectPath, name, mimeType: "image/png" });
  }
  return files;
}

async function mark(fixture) {
  const started = Date.now();
  const body = {
    subjectLevelId: LEVELS[fixture.board],
    paper: [{ question: fixture.task, answer: "" }],
  };
  if (fixture.answer.type === "text") {
    body.paper = [{ question: fixture.task, answer: fixture.answer.text }];
  } else {
    body.paper = [{ question: fixture.task, answer: "" }];
    body.answerFiles = await uploadPages(fixture);
  }

  const res = await request("POST", `${ORIGIN}/functions/v1/ai-correction`, {
    headers: {
      ...auth({ Authorization: `Bearer ${ACCOUNT.token}` }),
      "Content-Type": "application/json",
    },
    body,
  });
  const elapsed = Math.round((Date.now() - started) / 1000);
  if (res.status !== 200) {
    return { error: `HTTP ${res.status}: ${res.text.replace(/\s+/g, " ").slice(0, 300)}`, elapsed };
  }
  const corrected = res.json?.corrected_papers ?? res.json?.corrected ?? [];
  const first = corrected[0];
  if (!first) return { error: `no corrected question: ${res.text.slice(0, 200)}`, elapsed };
  return {
    elapsed,
    mode: first.marking_mode,
    band: first.band ?? "",
    marks_earned: first.marks_earned,
    total_marks: first.total_marks,
    criteria: (first.criteria ?? []).map((c) => ({
      name: c.name,
      band: c.band,
      marks: c.marks_awarded,
      max: c.marks_available,
    })),
    feedback: first.feedback,
    evidence: (first.criteria ?? []).map((c) => c.evidence),
  };
}

/* ─────────────────────────────── comparison ─────────────────────────────── */

/** Which board criterion a returned criterion name belongs to. */
function boardMatch(name, boardMarks) {
  const n = String(name ?? "").toLowerCase();
  for (const b of boardMarks) {
    const key = b.name.toLowerCase();
    if (n.includes(key)) return b.name;
    if (/content/.test(key) && /content/.test(n)) return b.name;
    if (/language/.test(key) && /language/.test(n)) return b.name;
    if (/style/.test(key) && /style/.test(n)) return b.name;
  }
  return null;
}

function compare(fixture, result) {
  const out = {
    id: fixture.id,
    board: fixture.board,
    question: fixture.question,
    board_total: fixture.board_total,
    total: fixture.total,
    board_marks: fixture.board_marks,
    ...result,
  };
  if (result.error) return out;

  out.marker_total = result.marks_earned;
  out.total_delta = result.marks_earned - fixture.board_total;

  const byCriterion = {};
  const unmatched = [];
  for (const c of result.criteria ?? []) {
    const key = boardMatch(c.name, fixture.board_marks);
    if (key) {
      byCriterion[key] = byCriterion[key] ?? [];
      byCriterion[key].push(c);
    } else {
      unmatched.push(c.name);
    }
  }

  out.match = fixture.board_marks.map((b) => {
    const hits = byCriterion[b.name] ?? [];
    // When the marker invented a different split, compare against the merged mark.
    const marks = hits.reduce((s, c) => s + c.marks, 0);
    return {
      criterion: b.name,
      board: b.marks,
      board_max: b.max,
      marker: hits.length ? marks : null,
      marker_names: hits.map((c) => `${c.name} ${c.marks}/${c.max}${c.band ? ` ${c.band}` : ""}`),
      delta: hits.length ? marks - b.marks : null,
    };
  });
  out.unmatched_criteria = unmatched;
  out.criterion_names = (result.criteria ?? []).map((c) => c.name);
  return out;
}

/* ───────────────────────────────── run ──────────────────────────────────── */

function summarise(rows) {
  const done = rows.filter((r) => !r.error);
  if (!done.length) return;
  const totalDelta = done.map((r) => r.total_delta);
  const abs = totalDelta.map(Math.abs);
  const mean = (xs) => xs.reduce((s, x) => s + x, 0) / xs.length;
  const within = (n) => `${Math.round((abs.filter((d) => d <= n).length / abs.length) * 100)}%`;

  console.log(`\n${"script".padEnd(16)} ${"board".padStart(6)} ${"marker".padStart(7)} ${"Δ".padStart(4)}  criteria`);
  for (const r of done) {
    const crit = (r.match ?? [])
      .map((m) => `${m.criterion.split(" ")[0]} ${m.board}→${m.marker ?? "?"}`)
      .join("  ");
    console.log(
      `${r.id.padEnd(16)} ${String(`${r.board_total}/${r.total}`).padStart(6)} ` +
        `${String(`${r.marker_total}/${r.total_marks}`).padStart(7)} ` +
        `${String(r.total_delta >= 0 ? `+${r.total_delta}` : r.total_delta).padStart(4)}  ${crit}` +
        (r.unmatched_criteria?.length ? `  unmatched: ${r.unmatched_criteria.join(", ")}` : ""),
    );
  }
  console.log(
    `\nmean error ${mean(abs).toFixed(1)} marks · signed bias ${mean(totalDelta) >= 0 ? "+" : ""}` +
      `${mean(totalDelta).toFixed(1)} · exact ${abs.filter((d) => d === 0).length}/${abs.length}` +
      ` · within 1 ${within(1)} · within 2 ${within(2)} · within 3 ${within(3)}`,
  );
  const failed = rows.filter((r) => r.error);
  if (failed.length) {
    console.log(`\nfailed (${failed.length}):`);
    for (const f of failed) console.log(`  ${f.id}: ${f.error}`);
  }
}

(async () => {
  const { fixtures } = JSON.parse(fs.readFileSync(path.join(CAL, "fixtures.json"), "utf8"));
  const selected = fixtures.filter(
    (f) => !only.length || only.includes(f.id) || only.includes(f.board),
  );
  if (!selected.length) {
    console.error(`no fixtures matched --only ${only.join(",")}`);
    process.exit(2);
  }
  console.log(`calibrating ${selected.length} examiner-marked script(s) — tag "${tag}"`);

  await makeStudent();
  const rows = [];
  try {
    for (const fixture of selected) {
      process.stdout.write(`${fixture.id.padEnd(16)} marking… `);
      let result = null;
      // A 502 from the marker is an upstream model failure, not a bad script:
      // it happens intermittently on an otherwise healthy function, so one
      // retry keeps a flaky call from being recorded as a marking.
      for (let attempt = 1; attempt <= 2; attempt += 1) {
        try {
          result = await mark(fixture);
        } catch (error) {
          result = { error: error.message };
        }
        if (!result.error || !/HTTP 502/.test(result.error) || attempt === 2) break;
        process.stdout.write(`retry ${attempt}… `);
        await new Promise((r) => setTimeout(r, 4000));
      }
      const row = compare(fixture, result);
      rows.push(row);
      if (row.error) {
        console.log(`ERROR ${row.error}`);
      } else {
        console.log(
          `${row.marker_total}/${row.total_marks} (board ${row.board_total}) ` +
            `Δ${row.total_delta >= 0 ? "+" : ""}${row.total_delta} in ${row.elapsed}s`,
        );
      }
      // Written after every script so a long run is resumable and interruptible.
      fs.writeFileSync(
        jsonPath,
        JSON.stringify(
          {
            tag,
            generated: new Date().toISOString(),
            marker: "supabase/functions/ai-correction (live)",
            results: rows,
          },
          null,
          2,
        ),
      );
    }
  } finally {
    summarise(rows);
    await dropStudent();
    console.log(`\nwrote ${path.relative(ROOT, jsonPath)}`);
  }
})();
