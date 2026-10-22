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
 */
const fs = require("fs");
const https = require("https");
const path = require("path");

const REF = "zzliiazovezhxbmfeqco";
const OUT = path.join(__dirname, "..", "frontend", "src", "lib", "plans.generated.ts");

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

(async () => {
  const token = readToken();
  if (!token) {
    console.error("No Management API token: set SUPABASE_ACCESS_TOKEN or keep .freebuff/get-keys.cjs");
    process.exit(1);
  }
  const rows = await query(SQL, token);
  const raw = rows[0]?.manifest;
  if (!raw) throw new Error("query returned no manifest");
  const entries = typeof raw === "string" ? JSON.parse(raw) : raw;
  if (!Array.isArray(entries) || entries.length === 0) throw new Error("plans manifest is empty — refusing to write");

  fs.writeFileSync(OUT, serialise(entries));
  console.log(`wrote ${entries.length} plans to ${path.relative(path.join(__dirname, ".."), OUT)}`);
})().catch((err) => {
  console.error("FAILED:", err.message);
  process.exit(1);
});
