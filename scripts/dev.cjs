#!/usr/bin/env node
/**
 * Dev launcher — the one entrypoint for starting the dev server (used by the
 * detached recipe in .freebuff/run.md and by humans). Runs the predev gate
 * (typecheck + daily backup) and only boots Vite when the tree is healthy.
 */
const { spawn, spawnSync } = require("child_process");
const path = require("path");

const BUN = process.env.BUN_PATH
  || "C:\\Users\\zaidt\\AppData\\Local\\Programs\\@codebufffreebuff-desktop\\resources\\bun\\bun.exe";
const root = path.resolve(__dirname, "..");

const gate = spawnSync(BUN, [path.join(root, "scripts", "predev-gate.cjs")], {
  stdio: "inherit", cwd: root,
});
if (gate.status !== 0) {
  console.error("[dev] predev gate failed — Vite not started.");
  process.exit(gate.status ?? 1);
}

const vite = spawn(BUN, [path.join(root, "node_modules", "vite", "bin", "vite.js")], {
  stdio: "inherit", cwd: root,
});
vite.on("exit", (code) => process.exit(code ?? 0));
