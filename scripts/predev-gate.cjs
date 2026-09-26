#!/usr/bin/env node
/**
 * Pre-dev gate — runs before the Vite dev server starts (npm/bun lifecycle
 * "predev" hook, and the first step of the detached start in .freebuff/run.md).
 *
 * 1. Typecheck the app. A damaged working tree (see the 2026-09-26 incident in
 *    .freebuff/run.md) used to break the dev server silently at runtime; now it
 *    fails loudly BEFORE vite starts.
 * 2. Fire the throttled daily backup of uncommitted work (scripts/daily-backup.cjs)
 *    so a later crash can never lose more than a day of changes.
 *
 * Run through the bundled bun: bun.exe scripts/predev-gate.cjs
 * (There is no node/npm on this machine — see .freebuff/run.md.)
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const BUN = process.env.BUN_PATH
  || "C:\\Users\\zaidt\\AppData\\Local\\Programs\\@codebufffreebuff-desktop\\resources\\bun\\bun.exe";
const FAST = process.env.SKIP_TYPECHECK === "1"; // escape hatch for one-off runs

function run(cmd, args) {
  execFileSync(cmd, args, { stdio: "inherit", cwd: root });
}

// ---- 1. Typecheck gate ------------------------------------------------------
if (!FAST) {
  const tsc = path.join(root, "node_modules", "typescript", "bin", "tsc");
  if (!fs.existsSync(tsc)) {
    console.error("[predev] node_modules/typescript missing — run: bun install");
    process.exit(1);
  }
  console.log("[predev] typechecking (tsc --noEmit)…");
  try {
    run(BUN, [tsc, "--noEmit", "-p", "tsconfig.app.json"]);
    console.log("[predev] typecheck OK");
  } catch {
    console.error(
      "\n[predev] TYPECHECK FAILED — refusing to start a dev server on a\n" +
      "[predev] broken working tree. Fix the errors above (or restore the\n" +
      "[predev] file from the git index: git restore --worktree -- <file>),\n" +
      "[predev] or bypass once with SKIP_TYPECHECK=1.\n",
    );
    process.exit(1);
  }
} else {
  console.log("[predev] SKIP_TYPECHECK=1 — skipping typecheck");
}

// ---- 2. Daily backup (throttled: at most one per calendar day) --------------
try {
  run(BUN, [path.join(root, "scripts", "daily-backup.cjs")]);
} catch (e) {
  // Backup failure must never block development — just surface it.
  console.warn("[predev] daily backup failed (non-fatal):", e?.message ?? e);
}
