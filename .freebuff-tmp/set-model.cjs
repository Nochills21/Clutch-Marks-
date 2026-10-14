const https = require("https");
const fs = require("fs");
const path = require("path");

const REF = "zzliiazovezhxbmfeqco";
const TOKEN = (fs.readFileSync(path.join(__dirname, "..", ".freebuff", "get-keys.cjs"), "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const model = process.argv[2];
if (!TOKEN || !model) {
  console.error("usage: node .freebuff-tmp/set-model.cjs <model-id>");
  process.exit(2);
}
const body = JSON.stringify([{ name: "GEMINI_MODEL", value: model }]);
const req = https.request(
  {
    hostname: "api.supabase.com",
    path: `/v1/projects/${REF}/secrets`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(body),
    },
  },
  (res) => {
    let out = "";
    res.setEncoding("utf8");
    res.on("data", (c) => (out += c));
    res.on("end", () => {
      console.log("HTTP", res.statusCode, out.slice(0, 300));
      process.exit(res.statusCode >= 300 ? 1 : 0);
    });
  },
);
req.on("error", (e) => {
  console.error("request failed:", e.message);
  process.exit(1);
});
req.write(body);
req.end();
