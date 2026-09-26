#!/usr/bin/env node
/**
 * Daily auto-backup of uncommitted work.
 *
 * Creates at most ONE snapshot per calendar day (stamp file under .freebuff/),
 * capturing EVERYTHING uncommitted — staged, unstaged, and untracked source —
 * as a commit on refs/backups/daily (a hidden git ref, never checked out).
 * The working tree, index and branch are left untouched.
 *
 * Why: the 2026-09-26 working-tree corruption incident showed uncommitted work
 * can be silently damaged between sessions. These snapshots make every day's
 * state recoverable:
 *
 *   git log refs/backups/daily            # list daily snapshots
 *   git show refs/backups/daily:src/x.tsx # read a file from a snapshot
 *   git restore --source=<sha> -- <file>  # recover a file
 *
 * Idempotent and cheap: exits early when today's backup already exists or when
 * there is nothing to back up. Run by the predev gate (scripts/predev-gate.cjs)
 * and independently via bun.exe scripts/daily-backup.cjs.
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const stampFile = path.join(root, ".freebuff", "last-daily-backup");
const ref = "refs/backups/daily";

function git(args, opts = {}) {
  // -c core.autocrlf=false: snapshot exact working-tree bytes and skip the
  // hundreds of "LF will be replaced by CRLF" conversion warnings.
  return execFileSync("git", ["-c", "core.autocrlf=false", ...args], {
    cwd: root, encoding: "utf8", ...opts,
  }).trim();
}

// ---- Throttle: one snapshot per calendar day ---------------------------------
const today = new Date().toISOString().slice(0, 10);
try {
  if (fs.readFileSync(stampFile, "utf8").trim() === today) {
    console.log(`[backup] already backed up today (${today}) — skipping`);
    process.exit(0);
  }
} catch { /* no stamp yet — first run */ }

// ---- Nothing to do when the tree is clean ------------------------------------
const status = git(["status", "--porcelain", "--", ".", ":!.freebuff/last-daily-backup"]);
if (status.length === 0) {
  console.log("[backup] working tree clean — nothing to back up");
  fs.writeFileSync(stampFile, today);
  process.exit(0);
}

// ---- Build the snapshot tree (index + working tree + untracked source) ------
// Temporary index: start from the real index, overlay tracked-file worktree
// contents, then add untracked source files.
const tmpIdx = path.join(root, ".git", "daily-backup-index");
try { fs.unlinkSync(tmpIdx); } catch { /* fresh */ }
const env = { ...process.env, GIT_INDEX_FILE: tmpIdx };

git(["read-tree", "HEAD"], { env }); // base = last commit (robust vs weird index states)

// Overlay current contents of every tracked-but-modified file.
const changed = status.split("\n")
  .map((l) => l.slice(3).trim())
  .filter((f) => f && !f.startsWith(".freebuff/last-daily-backup"));
for (const f of changed) {
  const abs = path.join(root, f);
  if (!fs.existsSync(abs) || fs.statSync(abs).isDirectory()) continue;
  try {
    git(["add", "--force", "--", f], { env }); // respects .gitignore via --force on tmp index only
  } catch { /* deleted mid-run — skip */ }
}

// Add untracked source files (gitignore-respecting).
let untracked = [];
try {
  untracked = git(["ls-files", "--others", "--exclude-standard",
    "--", "src", "backend", "frontend", "supabase", "scripts", "docs", "public", "plugins"])
    .split("\n").filter(Boolean);
} catch { /* none */ }
for (const f of untracked) {
  try {
    git(["add", "--force", "--", f], { env });
  } catch { /* skip unreadable */ }
}

const tree = git(["write-tree"], { env });
// Resolve the previous snapshot, if any (the ref may not exist on first run).
let parent = "";
try {
  parent = git(["rev-parse", "--verify", "--quiet", ref + "^{commit}"], { env });
} catch { /* first backup — no parent */ }
const commit = git([
  "commit-tree", tree,
  ...(parent ? ["-p", parent] : []),
  "-m",
  `daily-backup: ${today} (auto — uncommitted work snapshot)\n\n${changed.length + untracked.length} files captured. Working tree left untouched.`,
]);
git(["update-ref", ref, commit]);

fs.writeFileSync(stampFile, today);
console.log(`[backup] snapshot ${commit.slice(0, 12)} on ${ref} (${changed.length + untracked.length} files)`);
