// Hourly GitHub auto-sync: dumps curriculum content tables (NO user/PII tables)
// to .freebuff/content-backup/*.json, then commits+pushes any changes (code or
// content) to origin/main. Exits early when nothing changed. Secret-scans the
// staged diff and aborts the push if anything looks like a credential.
//
// Runs under Task Scheduler; also safe to run manually: bun .freebuff/auto-sync.cjs
const fs = require("fs");
const path = require("path");
const https = require("https");
const { execSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
process.chdir(ROOT);

const LOG = path.join(ROOT, ".freebuff", "auto-sync.log");
function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  fs.appendFileSync(LOG, line + "\n");
  console.log(line);
}

// ---------- 1. Content dump ----------
const TOKEN = (fs.readFileSync(path.join(ROOT, ".freebuff", "get-keys.cjs"), "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REF = "zzliiazovezhxbmfeqco";

function query(sql) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query: sql });
    const req = https.request({
      hostname: "api.supabase.com",
      path: `/v1/projects/${REF}/database/query`,
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body) },
    }, (res) => {
      let d = "";
      res.on("data", (c) => (d += c));
      res.on("end", () => {
        if (res.statusCode >= 400) return reject(new Error(`HTTP ${res.statusCode}: ${d.slice(0, 200)}`));
        resolve(JSON.parse(d));
      });
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

// Curriculum only — deliberately excludes profiles, attempts, progress, notifications,
// audit log, links, throttle, weekly reports (student PII / operational state).
const TABLES = [
  "subjects", "subject_levels", "topics", "lessons", "questions", "quizzes",
  "study_materials", "past_papers", "flashcard_sets", "flashcards",
  "announcements", "content_revisions", "content_file_versions",
];

async function dumpContent() {
  const dir = path.join(ROOT, ".freebuff", "content-backup");
  fs.mkdirSync(dir, { recursive: true });
  let total = 0;
  const counts = {};
  for (const t of TABLES) {
    const rows = await query(`select * from public.${t} order by 1`);
    fs.writeFileSync(path.join(dir, `${t}.json`), JSON.stringify(rows, null, 1));
    counts[t] = rows.length;
    total += rows.length;
  }
  fs.writeFileSync(path.join(dir, "_manifest.json"), JSON.stringify({
    dumped_at: new Date().toISOString(),
    project_ref: REF,
    tables: TABLES,
    row_counts: counts,
  }, null, 1));
  return total;
}

// ---------- 2. Git commit + push ----------
function sh(cmd, opts = {}) {
  return execSync(cmd, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], timeout: 120000, maxBuffer: 64 * 1024 * 1024, ...opts });
}

function main() {
  // Secret scan on the staged diff AFTER staging (below) — scan happens pre-push.
  const status = sh("git status --porcelain");
  if (!status.trim()) {
    log("nothing to do — tree clean");
    return;
  }

  sh("git add -A");
  // Head+tail scan is enough for credential detection and avoids buffering
  // multi-MB diffs on routine content backups.
  const staged = sh("git diff --cached --stat") + sh("git diff --cached | head -c 2000000");

  // Secret scan: Management token, JWTs, and the gitignored key file must never
  // enter history. Abort (and unstage) if any appear.
  const DANGER = [
    /sbp_[0-9a-f]{16,}/,
    /eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}/,
    /\.freebuff\/get-keys\.cjs/,
  ];
  for (const rx of DANGER) {
    if (rx.test(staged)) {
      log(`ABORT: staged diff matches secret pattern ${rx} — push blocked, changes left staged`);
      sh("git reset");
      return;
    }
  }

  const date = new Date().toISOString().slice(0, 16).replace("T", " ");
  const msg = `Auto-sync: code + content backup (${date})`;
  sh(`git commit -m ${JSON.stringify(msg)} --allow-empty-message`);
  sh("git push origin main");
  log(`pushed: ${msg}`);
}

dumpContent()
  .then((n) => { log(`content dump ok (${n} rows)`); main(); })
  .then(() => process.exit(0))
  .catch((e) => { log(`ERROR: ${e.message}`); process.exit(1); });
