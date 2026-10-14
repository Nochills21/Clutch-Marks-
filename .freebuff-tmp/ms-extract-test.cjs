#!/usr/bin/env node
/*
 * Does the ai-correction in-function PDF extractor actually get text out of the
 * REAL mark schemes and question papers stored in the `past-papers` bucket?
 *
 * v1 is a port of the deployed extractor; v2 is the candidate replacement that
 * reads the text *operators* instead of every parenthesised string, so the
 * glyph runs inside one TJ array ("C","a","m","b","ri","dge") stop arriving as
 * separate words. Both run over the same bytes, so the comparison is real.
 *
 *   node .freebuff-tmp/ms-extract-test.cjs [howManyRows]
 */
const fs = require("fs");
const https = require("https");
const zlib = require("zlib");

const REF = "zzliiazovezhxbmfeqco";
const TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
if (!TOKEN) throw new Error("no management token");

const api = (path) =>
  new Promise((resolve, reject) => {
    https
      .get(
        { hostname: "api.supabase.com", path: `/v1/projects/${REF}${path}`, headers: { Authorization: `Bearer ${TOKEN}` } },
        (res) => {
          let d = "";
          res.on("data", (c) => (d += c));
          res.on("end", () => resolve(JSON.parse(d)));
        },
      )
      .on("error", reject);
  });

const sql = (query) =>
  new Promise((resolve, reject) => {
    const body = JSON.stringify({ query });
    const req = https.request(
      {
        hostname: "api.supabase.com",
        path: `/v1/projects/${REF}/database/query`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (res) => {
        let d = "";
        res.on("data", (c) => (d += c));
        res.on("end", () => {
          if (res.statusCode >= 300) return reject(new Error(`${res.statusCode} ${d.slice(0, 300)}`));
          resolve(JSON.parse(d));
        });
      },
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });

const inflate = (bytes) => {
  try {
    return zlib.inflateSync(Buffer.from(bytes)).toString("latin1");
  } catch {
    return null;
  }
};

function unescapePdfString(raw) {
  return raw.replace(/\\([nrtbf()\\]|[0-7]{1,3})/g, (_m, esc) => {
    switch (esc) {
      case "n": return "\n";
      case "r": return "\r";
      case "t": return "\t";
      case "b": return "\b";
      case "f": return "\f";
      case "(": return "(";
      case ")": return ")";
      case "\\": return "\\";
      default: return String.fromCharCode(parseInt(esc, 8));
    }
  });
}

/** Walk every FlateDecode stream that carries a BT…ET text block. */
function eachTextStream(bytes, visit) {
  const raw = Buffer.from(bytes).toString("latin1");
  let searchFrom = 0;
  for (;;) {
    const start = raw.indexOf("stream", searchFrom);
    if (start === -1) break;
    const end = raw.indexOf("endstream", start);
    if (end === -1) break;
    searchFrom = end + 9;

    let dataStart = start + 6;
    if (raw[dataStart] === "\r") dataStart += 1;
    if (raw[dataStart] === "\n") dataStart += 1;
    let dataEnd = end;
    if (raw[dataEnd - 1] === "\n") dataEnd -= 1;
    if (raw[dataEnd - 1] === "\r") dataEnd -= 1;
    if (dataEnd <= dataStart) continue;

    const chunk = new Uint8Array(dataEnd - dataStart);
    for (let i = dataStart; i < dataEnd; i += 1) chunk[i - dataStart] = raw.charCodeAt(i);

    const decoded = inflate(chunk) ?? Buffer.from(chunk).toString("latin1");
    if (!decoded.includes("BT")) continue;
    visit(decoded);
  }
}

/* v1 — the extractor as deployed (every string a separate word). */
function extractV1(bytes) {
  const pieces = [];
  eachTextStream(bytes, (decoded) => {
    for (const block of decoded.match(/BT[\s\S]*?ET/g) ?? []) {
      for (const literal of block.match(/\((?:\\\\.|[^\\()])*\)/g) ?? []) {
        pieces.push(unescapePdfString(literal.slice(1, -1)));
      }
      if (/\bT[dD*]\b/.test(block)) pieces.push("\n");
    }
  });
  return pieces
    .join(" ")
    .replace(/\s*\n\s*/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/* v2 — read the operators: concatenate the glyph runs of one TJ array. */
function textFromBlock(block) {
  const out = [];
  const re = /\[([\s\S]*?)\]\s*TJ|\(((?:\\.|[^\\()])*)\)\s*Tj|\bT[dD*]\b/g;
  let m;
  while ((m = re.exec(block)) !== null) {
    const [whole, tjBody, tjString] = m;
    if (tjBody !== undefined) {
      const runs = tjBody.match(/\((?:\\\\.|[^\\()])*\)/g) ?? [];
      out.push(runs.map((r) => unescapePdfString(r.slice(1, -1))).join(""));
    } else if (tjString !== undefined) {
      out.push(unescapePdfString(tjString));
    } else if (/^T[dD*]$/.test(whole)) {
      out.push("\n");
    }
  }
  return out;
}

function extractV2(bytes) {
  const pieces = [];
  eachTextStream(bytes, (decoded) => {
    for (const block of decoded.match(/BT[\s\S]*?ET/g) ?? []) pieces.push(...textFromBlock(block));
  });
  return pieces
    .join("\u0000")
    .replace(/\u0000*\n\u0000*/g, "\n") // a text-positioning op opens a new line
    .replace(/\u0000/g, "")
    .split("\n")
    .map((line) => line.replace(/[ \t]{2,}/g, " ").trim())
    .filter((line) => line.length > 0)
    .join("\n")
    .trim();
}

/* ── drive it against real rows ─────────────────────────────────────────── */

(async () => {
  const limit = Number(process.argv[2] || 3);
  const { createClient } = require("@supabase/supabase-js");
  const serviceKey = (await api("/api-keys")).find((k) => k.name === "service_role").api_key;
  const admin = createClient(`https://${REF}.supabase.co`, serviceKey);

  const rows = await sql(
    `select id, title, year, paper_number, mark_scheme_url, paper_url
     from past_papers
     where mark_scheme_url is not null
     order by year desc nulls last, title
     limit ${limit}`,
  );

  const junk = (t) => {
    const w = t.split(/\s+/).filter(Boolean);
    if (!w.length) return 100;
    return Math.round((w.filter((x) => x.length === 1).length / w.length) * 100);
  };

  let ok = 0;
  for (const row of rows) {
    console.log(`\n── ${row.title} · ${row.year ?? "-"} · p${row.paper_number ?? "-"}  [${row.id}]`);
    for (const [label, path] of [["mark scheme", row.mark_scheme_url], ["question paper", row.paper_url]]) {
      if (!path) {
        console.log(`   ${label.padEnd(14)} — (none)`);
        continue;
      }
      const { data, error } = await admin.storage.from("past-papers").download(path);
      if (error || !data) {
        console.log(`   ${label.padEnd(14)} — DOWNLOAD FAILED: ${error && error.message}`);
        continue;
      }
      const bytes = new Uint8Array(await data.arrayBuffer());
      const v1 = extractV1(bytes);
      const v2 = extractV2(bytes);
      const usable = v2.length >= 400 && v2.includes(" ");
      if (usable && label === "mark scheme") ok += 1;
      console.log(
        `   ${label.padEnd(14)} ${String(bytes.length).padStart(8)}b → v1 ${String(v1.length).padStart(6)}c ${String(
          junk(v1),
        ).padStart(3)}% 1-char · v2 ${String(v2.length).padStart(6)}c ${String(junk(v2)).padStart(3)}% 1-char  ${
          v2.length === 0 ? "NO TEXT LAYER (scan)" : usable ? "OK" : "thin"
        }`,
      );
      if (v2.length) console.log(`      v2: ${JSON.stringify(v2.slice(0, 200))}`);
    }
  }
  console.log(`\n${ok}/${rows.length} mark schemes carried a usable text layer (v2)`);
  process.exit(ok ? 0 : 1);
})().catch((e) => {
  console.error("crashed:", e.message);
  process.exit(1);
});
