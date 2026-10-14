const https = require("https");
const fs = require("fs");
const path = require("path");
const REF = "zzliiazovezhxbmfeqco";
const TOKEN = (fs.readFileSync(path.join(__dirname, "..", ".freebuff", "get-keys.cjs"), "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
https.get(
  {
    hostname: "api.supabase.com",
    path: `/v1/projects/${REF}/config/auth`,
    headers: { Authorization: `Bearer ${TOKEN}` },
  },
  (res) => {
    let out = "";
    res.setEncoding("utf8");
    res.on("data", (c) => (out += c));
    res.on("end", () => {
      if (res.statusCode >= 300) {
        console.error(`HTTP ${res.statusCode} ${out.slice(0, 300)}`);
        process.exit(1);
      }
      const c = JSON.parse(out);
      const keys = Object.keys(c).filter((k) => /external_google|site_url|uri_allow_list|external_email|disable_signup|mailer_autoconfirm/i.test(k));
      for (const k of keys) console.log(k, "=", k.includes("secret") ? "[redacted]" : JSON.stringify(c[k]));
      console.log("google-related keys:", Object.keys(c).filter((k) => k.includes("google")).join(", "));
    });
  },
);
