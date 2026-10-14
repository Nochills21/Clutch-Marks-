/* Poll Vercel deployment + Render deploys (throwaway status script). */
const fs = require("fs");
const path = require("path");
const toks = JSON.parse(fs.readFileSync(path.join(__dirname, "..", ".freebuff", ".platform-tokens.json"), "utf8"));
const TEAM = "team_p3jEoLFxEficMebiQvjWP0uz";
const SVC = "srv-dat7l8btqb8s73a3gv8g";
const vercelId = process.argv[2];

async function j(url, headers) {
  const r = await fetch(url, { headers });
  const t = await r.text();
  try { return JSON.parse(t); } catch { return t; }
}

(async () => {
  if (vercelId) {
    const d = await j(`https://api.vercel.com/v13/deployments/${vercelId}?teamId=${TEAM}`,
      { Authorization: `Bearer ${toks.vercel}` });
    console.log("VERCEL state:", d.readyState, "| url:", d.url, "| target:", d.target);
    if (d.errorMessage) console.log("VERCEL errorMessage:", d.errorMessage);
    if (d.aliasError) console.log("VERCEL aliasError:", JSON.stringify(d.aliasError).slice(0, 300));
  }
  const rl = await j(`https://api.render.com/v1/services/${SVC}/deploys?limit=5`,
    { Authorization: `Bearer ${toks.render}`, Accept: "application/json" });
  const list = Array.isArray(rl) ? rl : (rl.deploys || []);
  for (const item of list.slice(0, 5)) {
    const dep = item.deploy || item;
    console.log("RENDER", dep.id, "|", dep.status, "| commit:", dep.commit && (dep.commit.id || "").slice(0, 7),
      "| finished:", dep.finishedAt || "—", "|", dep.createdAt || "");
  }
})().catch((e) => { console.error("ERR", e.message); process.exit(1); });
