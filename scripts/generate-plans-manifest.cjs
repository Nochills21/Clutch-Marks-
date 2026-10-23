#!/usr/bin/env node
/**
 * Regenerate frontend/src/lib/plans.generated.ts from the live `plans` table.
 *
 * Why a snapshot instead of querying Supabase: the /pricing page is prerendered,
 * and its FAQ + Course/Offer JSON-LD ship inside the static HTML. A Vercel build
 * cannot be trusted to reach the database (a timeout or a rotated key would
 * silently publish a page advertising the wrong — or no — price), so the build
 * reads this committed file. It is the same contract as
 * frontend/src/lib/topicManifest.generated.ts.
 *
 * Workflow for a price change:
 *
 *   1. update public.plans (price_total is what is billed, months is the term);
 *   2. node scripts/generate-plans-manifest.cjs
 *   3. commit the regenerated file — every surface (pricing cards, FAQ, JSON-LD,
 *      admin console, preview upsell) reads it, so they cannot drift apart.
 *
 * The Management API token is read from .freebuff/get-keys.cjs (gitignored) or
 * the SUPABASE_ACCESS_TOKEN env var.
 *
 * --check compares the committed file against the live table instead of writing.
 * `npm run verify` runs it, because remembering step 3 is exactly what fails:
 * the database and the page then quote different money, and the pricing page is
 * prerendered, so the wrong number ships inside static HTML and survives until
 * someone visits it. Exit codes are 0 = current, 1 = stale (or unreadable), and
 * 2 = could not be checked (no token, network, API error) — 2 is distinct so
 * `verify` can continue on a machine that cannot reach the database *loudly*
 * rather than claiming the snapshot is fresh. The date line is excluded from
 * the comparison: a snapshot generated yesterday is not stale, a snapshot with
 * yesterday's prices is.
 */
const fs = require("fs");
const https = require("https");
const path = require("path");

const REF = "zzliiazovezhxbmfeqco";
const OUT = path.join(__dirname, "..", "frontend", "src", "lib", "plans.generated.ts");

const CHECK = process.argv.includes("--check");
// `verify` must still run on a checkout with no Management API token (a fork, a
// fresh clone before .freebuff/get-keys.cjs exists). With this flag an
// unreachable database is reported and skipped; without it the exit code stays
// 2 so a CI step can demand a real answer.
const ALLOW_UNAVAILABLE = process.argv.includes("--allow-unavailable");

const SQL = `
select json_agg(x order by x.rank, x.months, x.id)::text as manifest
from (
  select p.id, p.name, p.price_monthly, p.price_total, p.months, p.description,
         case when p.id = 'free' then 0 else 1 end as rank
  from public.plans p
) x;
`;

function readToken() {
  if (process.env.SUPABASE_ACCESS_TOKEN) return process.env.SUPABASE_ACCESS_TOKEN;
  try {
    const keys = fs.readFileSync(path.join(__dirname, "..", ".freebuff", "get-keys.cjs"), "utf8");
    return (keys.match(/sbp_[a-f0-9]+/) || [])[0];
  } catch {
    return undefined;
  }
}

function query(sql, token) {
  const body = JSON.stringify({ query: sql });
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: "api.supabase.com",
        path: `/v1/projects/${REF}/database/query`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          const clean = data.replace(/[\u0000-\u001f]/g, " ");
          if (res.statusCode !== 200 && res.statusCode !== 201) {
            reject(new Error(`HTTP ${res.statusCode}: ${clean.slice(0, 500)}`));
            return;
          }
          try {
            resolve(JSON.parse(clean));
          } catch {
            reject(new Error(`Unparseable response: ${clean.slice(0, 500)}`));
          }
        });
      },
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

function serialise(rows) {
  const plans = rows.map((r) => ({
    id: String(r.id),
    name: String(r.name),
    // numeric arrives as a string ("40.00") or a number depending on the driver.
    priceMonthly: round2(Number(r.price_monthly)),
    priceTotal: round2(Number(r.price_total)),
    months: Number(r.months),
    description: r.description === null || r.description === undefined ? null : String(r.description),
  }));

  // A missing tier would silently delete a pricing card, so refuse instead.
  const required = ["free", "monthly", "quarterly", "annual"];
  const missing = required.filter((id) => !plans.some((p) => p.id === id));
  if (missing.length > 0) throw new Error(`plans table is missing: ${missing.join(", ")}`);
  for (const p of plans) {
    if (!Number.isFinite(p.priceTotal) || p.priceTotal < 0) throw new Error(`bad price_total for ${p.id}`);
    if (!Number.isInteger(p.months) || p.months < 1) throw new Error(`bad months for ${p.id}`);
    // The stored monthly rate and the billed total must agree, or the card and
    // the JSON-LD offer would quote different money.
    if (Math.abs(p.priceMonthly - round2(p.priceTotal / p.months)) > 0.011) {
      throw new Error(
        `${p.id}: price_monthly ${p.priceMonthly} does not match price_total ${p.priceTotal} / ${p.months} months`,
      );
    }
  }

  const lines = plans.map(
    (p) =>
      `  { id: ${JSON.stringify(p.id)}, name: ${JSON.stringify(p.name)}, priceMonthly: ${p.priceMonthly}, ` +
      `priceTotal: ${p.priceTotal}, months: ${p.months}, description: ${
        p.description === null ? "null" : JSON.stringify(p.description)
      } },`,
  );

  return `// GENERATED FILE — do not hand-edit.
//
// The published price list, as the live \`plans\` table had it when this was last
// generated. The pricing page, its FAQ, the Course/Offer JSON-LD, the admin
// console and the preview upsell all read these rows, so they cannot drift
// apart — and because the build reads this file instead of querying Supabase, a
// prerender can never advertise a price the network failed to fetch.
//
// Regenerate after changing a price:
//   node scripts/generate-plans-manifest.cjs
//
// Generated: ${new Date().toISOString().slice(0, 10)} · ${plans.length} plans
export interface PlanRow {
  id: string;
  name: string;
  /** Billed amount for one term, in USD — the money that actually moves. */
  priceTotal: number;
  /** Term length in calendar months. */
  months: number;
  /** priceTotal / months, stored so the two can be checked against each other. */
  priceMonthly: number;
  description: string | null;
}

export const PLAN_ROWS: PlanRow[] = [
${lines.join("\n")}
];
`;
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

/**
 * Everything in the file except the day it was generated. Line endings too: the
 * file is written with \n, but a Windows checkout with autocrlf hands it back
 * with \r\n, and that alone must not read as a price change.
 */
function normalise(text) {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/^\/\/ Generated: \d{4}-\d{2}-\d{2}/m, "// Generated: <date>");
}

/**
 * Line-by-line comparison, so a drift report quotes the money that moved rather
 * than dumping two whole files. Each plan is one line, which keeps this useful.
 */
function describeDrift(live, committed) {
  const a = normalise(committed).split("\n");
  const b = normalise(live).split("\n");
  const rows = [];
  for (let i = 0; i < Math.max(a.length, b.length); i += 1) {
    if (a[i] !== b[i]) rows.push({ line: i + 1, committed: a[i], live: b[i] });
  }
  const shown = rows.slice(0, 12);
  const out = [];
  for (const r of shown) {
    out.push(`  line ${r.line}`);
    out.push(`    committed: ${r.committed === undefined ? "(nothing)" : r.committed.trim()}`);
    out.push(`    live:      ${r.live === undefined ? "(nothing)" : r.live.trim()}`);
  }
  if (rows.length > shown.length) out.push(`  … and ${rows.length - shown.length} more differing line(s)`);
  return out.join("\n");
}

const REL_OUT = path.relative(path.join(__dirname, ".."), OUT);

/** No token or no answer is a *skipped* check, never a pass that nobody sees. */
function unavailable(reason) {
  if (!CHECK) {
    // Regenerating: nothing was written, so the snapshot is exactly as stale as
    // it was. That is a failure, never a skip.
    console.error(`[plans] cannot read the plans table — ${reason}`);
    console.error("Set SUPABASE_ACCESS_TOKEN or keep .freebuff/get-keys.cjs, then re-run the generator.");
    process.exit(1);
  }
  if (ALLOW_UNAVAILABLE) {
    console.warn(`[plans] NOT CHECKED — ${reason}`);
    console.warn(`[plans] the committed prices in ${REL_OUT} were not verified against the database`);
    console.warn("[plans] run node scripts/generate-plans-manifest.cjs --check once the token is available");
    process.exit(0);
  }
  console.error(`[plans] cannot check the price snapshot — ${reason}`);
  console.error(
    "[plans] set SUPABASE_ACCESS_TOKEN or keep .freebuff/get-keys.cjs, or pass --allow-unavailable to skip this check",
  );
  process.exit(2);
}

(async () => {
  const token = readToken();
  if (!token) unavailable("no Management API token");

  let entries;
  try {
    const rows = await query(SQL, token);
    const raw = rows[0]?.manifest;
    if (!raw) throw new Error("query returned no manifest");
    entries = typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch (err) {
    unavailable(`the plans query failed (${err.message})`);
  }
  if (!Array.isArray(entries) || entries.length === 0) unavailable("the plans query returned nothing");

  // A snapshot written from rows the generator itself rejects would be a file
  // nobody should ship, so an invalid table fails the check outright — it is not
  // an availability problem, and regenerating would not fix it either.
  let live;
  try {
    live = serialise(entries);
  } catch (err) {
    console.error(`[plans] the live plans table is invalid: ${err.message}`);
    console.error("[plans] fix public.plans first — the generator refuses to write this snapshot");
    process.exit(1);
  }

  if (!CHECK) {
    fs.writeFileSync(OUT, live);
    console.log(`wrote ${entries.length} plans to ${REL_OUT}`);
    return;
  }

  let committed;
  try {
    committed = fs.readFileSync(OUT, "utf8");
  } catch {
    console.error(`[plans] ${REL_OUT} is missing — the build would fail on it`);
    console.error("[plans] run: node scripts/generate-plans-manifest.cjs");
    process.exit(1);
  }

  if (normalise(committed) === normalise(live)) {
    console.log(`[plans] ${REL_OUT} matches the live plans table (${entries.length} plans) — up to date`);
    return;
  }

  console.error(`[plans] STALE — ${REL_OUT} does not match the live plans table:`);
  console.error(describeDrift(live, committed));
  console.error("[plans] regenerate and commit:");
  console.error("  node scripts/generate-plans-manifest.cjs");
  console.error(`  git add ${REL_OUT}`);
  process.exit(1);
})().catch((err) => {
  // Anything that escaped the branches above is also an unanswered question, not
  // a verdict on the prices.
  if (CHECK) unavailable(`unexpected failure (${err.message})`);
  console.error("FAILED:", err.message);
  process.exit(1);
});
