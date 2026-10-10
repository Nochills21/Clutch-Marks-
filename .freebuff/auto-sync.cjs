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
      // Decode as UTF-8 across chunk boundaries. Without this, `d += chunk`
      // decodes every HTTP chunk on its own, so a multi-byte character that
      // straddles a boundary (—, −, ≤, ˣ, ₀ …) is left as one U+FFFD per byte —
      // which is how the content backup silently rotted: the committed
      // questions.json/lessons.json carried replacement characters that are not
      // in the database. setEncoding installs a StringDecoder that holds the
      // partial sequence until the rest of it arrives.
      res.setEncoding("utf8");
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

// The last two are revision history: they record whatever was stored at the
// time, so a U+FFFD in one of them is a faithful record of an old value rather
// than damage introduced here. Current-content tables carry no such excuse.
const HISTORY_TABLES = new Set(["content_revisions", "content_file_versions"]);

async function dumpContent() {
  const dir = path.join(ROOT, ".freebuff", "content-backup");
  fs.mkdirSync(dir, { recursive: true });
  let total = 0;
  const counts = {};
  for (const t of TABLES) {
    const rows = await query(`select * from public.${t} order by 1`);
    const text = JSON.stringify(rows, null, 1);
    // A backup is only worth having if a restore from it is faithful. U+FFFD is
    // never legitimate content, so a dump containing it means this reader (or
    // the source) mangled a character: fail before writing, rather than commit
    // and push damage that a later restore would write back into the database.
    const damaged = (text.match(/\uFFFD/g) || []).length;
    if (damaged > 0 && !HISTORY_TABLES.has(t)) {
      throw new Error(`${t}.json would contain ${damaged} U+FFFD replacement character(s) — refusing to overwrite the backup`);
    }
    if (damaged > 0) {
      log(`WARN: ${t}.json holds ${damaged} U+FFFD character(s) in revision history — recorded as stored`);
    }
    fs.writeFileSync(path.join(dir, `${t}.json`), text);
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
  // Stage ONLY the sync's own paths + durable source files — never `git add -A`,
  // which would sweep unrelated work-in-progress into an automated commit.
  // Every first-party path the app is built from. `frontend/` and `backend/`
  // were missing from this list, so auto-sync shipped `src/` while the lib,
  // components, hooks and every edge function it depends on stayed local —
  // which is how a "successful" sync left half a fix behind (see 477fdfc).
  const SYNC_PATHS = [
    ".freebuff/content-backup/",
    ".freebuff/auto-sync.cjs",
    "src/",
    "frontend/",
    "backend/",
    "supabase/",
    "plugins/",
    "scripts/",
    "public/",
    "docs/",
    "index.html",
    "package.json",
    "bun.lock",
    "tsconfig.json",
    "tsconfig.app.json",
    "vite.config.ts",
    "vite.single.config.ts",
    "vitest.config.ts",
    "vercel.json",
    "render.yaml",
    ".gitignore",
    "README.md",
    "AGENTS.md",
  ];
  sh(`git add -- ${SYNC_PATHS.map(p => JSON.stringify(p)).join(" ")}`);
  const status = sh("git status --porcelain");
  if (!sh("git diff --cached --name-only").trim()) {
    log(`nothing staged for sync (unstaged non-sync files: ${status.trim() ? "yes" : "no"})`);
    return;
  }
  // Head of the diff is enough for credential detection and avoids scanning
  // multi-MB content backups. Truncate in Node, not with a `| head` pipe: this
  // runs under cmd.exe, where `head` does not exist — the pipe made execSync
  // throw every run after the dump, which left the corrupted dump staged and
  // meant this sync had never actually pushed anything.
  const staged = sh("git diff --cached --stat") + sh("git diff --cached").slice(0, 2000000);

  // Secret scan: a token or JWT *value* anywhere in the diff, and the key file
  // itself being staged. The key check reads the staged path list, not the diff
  // text: prose that merely names `.freebuff/get-keys.cjs` (AGENTS.md does, and
  // so do the probes) is not a leak, and matching it there blocked every push
  // from 2026-10-09 onward while nothing was actually exposed.
  const DANGER = [
    /sbp_[0-9a-f]{16,}/,
    /eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}/,
    /(^|\/)(get-keys\.cjs|\.platform-tokens\.json)$/,
  ];
  const stagedFiles = sh("git diff --cached --name-only");
  for (const rx of DANGER) {
    const haystack = rx.source.includes("get-keys") ? stagedFiles : staged;
    if (rx.test(haystack)) {
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

// `--dump-only` refreshes the backup without staging or pushing anything. Use it
// when auditing content, so a content refresh cannot commit work in progress.
const DUMP_ONLY = process.argv.includes("--dump-only");

if (DUMP_ONLY) {
  dumpContent()
    .then((n) => { log(`content dump ok (${n} rows) — dump-only, nothing staged`); process.exit(0); })
    .catch((e) => { log(`ERROR: ${e.message}`); process.exit(1); });
} else {
  dumpContent()
    .then((n) => { log(`content dump ok (${n} rows)`); main(); })
    .then(() => process.exit(0))
    .catch((e) => { log(`ERROR: ${e.message}`); process.exit(1); });
}
