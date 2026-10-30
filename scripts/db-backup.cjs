#!/usr/bin/env node
/**
 * Nightly backup of the WHOLE production database, off-site.
 *
 * Why this exists: the Supabase project has `pitr_enabled: false` and zero
 * physical backups (checked 2026-10-30), so today a bad migration, a mistaken
 * `delete` or a successful attack is permanent. `scripts/backup-content.cjs`
 * covers the curriculum only; this covers everything, including student rows.
 *
 * What it produces: one self-contained, encrypted file
 *
 *     backups/db/2026-10-30T0200Z.cmbackup.enc
 *
 * containing the bundle format described in `docs/database-backup-and-restore.md`:
 * the live schema (`supabase/base.sql`), every public table's rows, and a
 * manifest with per-table row counts and SHA-256s so a restore can be checked.
 *
 * Encryption is not optional. The dump holds student names, emails, answer
 * scripts and audit rows; a plaintext .json in a bucket is a GDPR incident
 * waiting for a misconfigured ACL. AES-256-GCM with a passphrase-derived key.
 *
 * Credentials:
 *   - Dump: the Management API token in .freebuff/get-keys.cjs (no DB password
 *     needed, which is why this works today).
 *   - Encryption: BACKUP_PASSPHRASE.
 *   - Off-site: BACKUP_S3_ENDPOINT / _BUCKET / _REGION / _KEY_ID / _SECRET
 *     (any S3-compatible store: Cloudflare R2, Backblaze B2, AWS S3, MinIO).
 *
 * Usage:
 *   node scripts/db-backup.cjs                  # dump, encrypt, upload, prune
 *   node scripts/db-backup.cjs --local-only     # skip the off-site leg
 *   node scripts/db-backup.cjs --keep 30        # retention (default 14)
 *   node scripts/db-backup.cjs --out D:/bks     # destination directory
 *
 * Exit codes: 0 done, 1 dump/encrypt failure, 2 off-site not configured.
 * 2 is deliberate — a "backup" that never leaves the machine is not the thing
 * that was asked for, and it must not read as success in a nightly log.
 */
const fs = require("fs");
const path = require("path");
const https = require("https");
const crypto = require("crypto");
const zlib = require("zlib");

const ROOT = path.resolve(__dirname, "..");
const BUNDLE_FORMAT = "clutchmarks-db-backup";
const BUNDLE_VERSION = 1;
const PAGE = 1000;

// ---------------------------------------------------------------- arguments --
function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}
const OUT_DIR = path.resolve(arg("out", path.join(ROOT, "backups", "db")));
const KEEP = Number(arg("keep", "14"));
const LOCAL_ONLY = process.argv.includes("--local-only");
// Retry the off-site leg on a backup that was already dumped (a failed upload
// should not force another 2.5-minute dump of production).
const UPLOAD_ONLY = arg("upload-only", null);

// ------------------------------------------------------------- credentials --
function projectRef() {
  const env = fs.readFileSync(path.join(ROOT, ".env"), "utf8");
  return (env.match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1] || "zzliiazovezhxbmfeqco";
}
function managementToken() {
  try {
    const src = fs.readFileSync(path.join(ROOT, ".freebuff", "get-keys.cjs"), "utf8");
    return (src.match(/sbp_[a-f0-9]+/) || [])[0] || null;
  } catch {
    return null;
  }
}

// -------------------------------------------------------------- management --
function postJson(hostname, requestPath, headers, body) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);
    const req = https.request(
      { hostname, path: requestPath, method: "POST", headers: { ...headers, "Content-Length": Buffer.byteLength(payload) } },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          if (res.statusCode >= 400) return reject(new Error(`HTTP ${res.statusCode}: ${data.slice(0, 300)}`));
          try {
            resolve(JSON.parse(data));
          } catch {
            reject(new Error(`unparseable response: ${data.slice(0, 200)}`));
          }
        });
      },
    );
    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

function sql(token, ref, query) {
  return postJson(
    "api.supabase.com",
    `/v1/projects/${ref}/database/query`,
    { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    { query },
  );
}

// ------------------------------------------------------------------- crypto --
function deriveKey(passphrase, salt) {
  // scrypt at the OWASP floor for interactive use; a nightly job can afford it.
  return crypto.scryptSync(passphrase, salt, 32, { N: 16384, r: 8, p: 1 });
}

function encrypt(plain, passphrase) {
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);
  const key = deriveKey(passphrase, salt);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const body = Buffer.concat([cipher.update(plain), cipher.final()]);
  const header = { v: BUNDLE_VERSION, alg: "aes-256-gcm", kdf: "scrypt", salt: salt.toString("base64"), iv: iv.toString("base64"), tag: cipher.getAuthTag().toString("base64") };
  // One JSON header line, then the ciphertext. Restore reads the first line.
  return Buffer.concat([Buffer.from(`${JSON.stringify(header)}\n`, "utf8"), body]);
}

function s3Config() {
  return {
    endpoint: process.env.BACKUP_S3_ENDPOINT,
    bucket: process.env.BACKUP_S3_BUCKET,
    region: process.env.BACKUP_S3_REGION || "auto",
    keyId: process.env.BACKUP_S3_KEY_ID,
    secret: process.env.BACKUP_S3_SECRET,
    prefix: process.env.BACKUP_S3_PREFIX || "clutchmarks-db",
  };
}
function isConfigured(cfg) {
  return Boolean(cfg.endpoint && cfg.bucket && cfg.keyId && cfg.secret);
}

// ---------------------------------------------------------------- S3 upload --
// SigV4 by hand: no dependency, works with R2/B2/S3/MinIO.
function hmac(key, data) {
  return crypto.createHmac("sha256", key).update(data).digest();
}
function sha256hex(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

async function s3Put({ endpoint, bucket, region, keyId, secret, prefix }, name, body) {
  const url = new URL(endpoint);
  // `URL.host` carries the port (`127.0.0.1:9443`); https.request wants the
  // hostname without it and the port separately. The canonical `host` header in
  // SigV4 must match what is actually sent, so it keeps the port.
  const hostHeader = url.host;
  const port = url.port ? Number(url.port) : undefined;
  const objectPath = `/${bucket}/${[prefix, name].filter(Boolean).join("/")}`;
  const payloadHash = sha256hex(body);
  const amzDate = new Date().toISOString().replace(/[:-]|\.\d{3}/g, "");
  const dateStamp = amzDate.slice(0, 8);
  const contentType = "application/octet-stream";

  const canonicalHeaders =
    `content-type:${contentType}\nhost:${hostHeader}\n` +
    `x-amz-content-sha256:${payloadHash}\nx-amz-date:${amzDate}\n`;
  const signedHeaders = "content-type;host;x-amz-content-sha256;x-amz-date";
  const canonicalRequest = ["PUT", objectPath, "", canonicalHeaders, signedHeaders, payloadHash].join("\n");

  const scope = `${dateStamp}/${region}/s3/aws4_request`;
  const stringToSign = ["AWS4-HMAC-SHA256", amzDate, scope, sha256hex(canonicalRequest)].join("\n");
  const signingKey = hmac(hmac(hmac(hmac(`AWS4${secret}`, dateStamp), region), "s3"), "aws4_request");
  const signature = crypto.createHmac("sha256", signingKey).update(stringToSign).digest("hex");

  const authorization =
    `AWS4-HMAC-SHA256 Credential=${keyId}/${scope}, ` +
    `SignedHeaders=${signedHeaders}, Signature=${signature}`;

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: url.hostname,
        port,
        path: objectPath,
        method: "PUT",
        headers: {
          Host: hostHeader,
          "Content-Type": contentType,
          "Content-Length": body.length,
          "x-amz-content-sha256": payloadHash,
          "x-amz-date": amzDate,
          Authorization: authorization,
        },
      },
      (res) => {
        let d = "";
        res.on("data", (c) => (d += c));
        res.on("end", () => {
          if (res.statusCode >= 300) return reject(new Error(`S3 PUT ${res.statusCode}: ${d.slice(0, 300)}`));
          resolve();
        });
      },
    );
    req.on("error", reject);
    req.end(body);
  });
}

// --------------------------------------------------------------------- main --
(async () => {
  const ref = projectRef();
  const token = managementToken();
  if (!token) {
    console.error("No management token in .freebuff/get-keys.cjs, and no DB password is configured.\n" +
      "This dump path uses the Management API, so that token is the credential it needs.");
    process.exit(1);
  }
  // ---- --upload-only: no dump, just the off-site leg and retention ----------
  if (UPLOAD_ONLY) {
    if (!fs.existsSync(UPLOAD_ONLY)) {
      console.error(`no such file: ${UPLOAD_ONLY}`);
      process.exit(1);
    }
    const cfg = s3Config();
    if (!isConfigured(cfg)) {
      console.error("OFFSITE NOT CONFIGURED — set BACKUP_S3_ENDPOINT/_BUCKET/_REGION/_KEY_ID/_SECRET.");
      process.exit(2);
    }
    const name = path.basename(UPLOAD_ONLY);
    await s3Put(cfg, name, fs.readFileSync(UPLOAD_ONLY));
    console.log(`[db-backup] uploaded ${name} to ${cfg.bucket}/${[cfg.prefix, name].filter(Boolean).join("/")}`);
    return;
  }

  const passphrase = process.env.BACKUP_PASSPHRASE;
  if (!passphrase) {
    console.error(
      "BACKUP_PASSPHRASE is not set. Refusing to write a plaintext dump of student data to disk.\n" +
        "Generate one and keep it OUT of this repository and OUT of the bucket:\n" +
        "  openssl rand -base64 32\n" +
        "Then set it in the environment of the scheduled task (see docs/database-backup-and-restore.md).",
    );
    process.exit(1);
  }

  const started = Date.now();
  console.log(`[db-backup] ${ref} -> ${OUT_DIR}`);

  // 1. Live schema. base.sql is regenerated by .freebuff/golden-dump.cjs; take
  //    the committed copy so the bundle is self-contained and reviewable.
  let schema = "";
  try {
    schema = fs.readFileSync(path.join(ROOT, "supabase", "base.sql"), "utf8");
  } catch {
    console.warn("[db-backup] WARNING: supabase/base.sql missing — bundle has data but no schema");
  }

  // 2. Every public table, discovered from the catalog rather than hardcoded,
  //    so a table added next month is backed up without editing this file.
  const tableRows = await sql(
    token,
    ref,
    `select c.relname as name,
            (select count(*) from pg_attribute a where a.attrelid=c.oid and a.attnum>0 and not a.attisdropped) as cols
     from pg_class c join pg_namespace n on n.oid=c.relnamespace
     where n.nspname='public' and c.relkind='r'
     order by c.relname`,
  );
  const tables = tableRows.map((r) => r.name);
  console.log(`[db-backup] ${tables.length} tables`);

  const data = {};
  const manifest = {};
  let totalRows = 0;
  let failures = 0;

  for (const table of tables) {
    try {
      const rows = [];
      for (let offset = 0; ; offset += PAGE) {
        // Paged: study_materials carries multi-MB note bodies, so one unbounded
        // response is a real timeout risk.
        const page = await sql(
          token,
          ref,
          `select coalesce(json_agg(t), '[]'::json) from (select * from public."${table}" limit ${PAGE} offset ${offset}) t`,
        );
        const batch = Array.isArray(page) ? page[0].coalesce : [];
        rows.push(...batch);
        if (batch.length < PAGE) break;
      }
      const json = JSON.stringify(rows);
      data[table] = rows;
      manifest[table] = { rows: rows.length, sha256: crypto.createHash("sha256").update(json).digest("hex") };
      totalRows += rows.length;
      if (rows.length) console.log(`  ${String(rows.length).padStart(7)} rows  ${table}`);
    } catch (err) {
      // A partial backup that reports success is the worst outcome: an operator
      // restores it believing the database is intact.
      failures += 1;
      manifest[table] = { rows: -1, error: err.message };
      console.error(`  FAILED  ${table}: ${err.message}`);
    }
  }

  const bundle = {
    format: BUNDLE_FORMAT,
    version: BUNDLE_VERSION,
    createdAt: new Date().toISOString(),
    projectRef: ref,
    tables: data,
    manifest: { totals: { rows: totalRows, tables: tables.length }, tables: manifest },
    schema,
  };

  // 3. Compress, then encrypt.
  const plain = zlib.gzipSync(Buffer.from(JSON.stringify(bundle), "utf8"), { level: 9 });
  const encrypted = encrypt(plain, passphrase);

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const name = `${stamp}.cmbackup.enc`;
  const file = path.join(OUT_DIR, name);

  // Write to a temp name and rename, so an interrupted run never leaves a
  // half-written file that looks like a backup.
  const tmp = `${file}.partial`;
  fs.writeFileSync(tmp, encrypted);
  fs.renameSync(tmp, file);

  const kb = (encrypted.length / 1024).toFixed(0);
  console.log(`[db-backup] wrote ${name} (${kb} KB, ${totalRows} rows, gzip+AES-256-GCM)`);

  if (failures > 0) {
    console.error(`[db-backup] ${failures} table(s) failed — this backup is INCOMPLETE. Not uploading.`);
    process.exit(1);
  }

  // 4. Off-site. A backup that never leaves this machine does not survive the
  //    machine, which is the case the owner actually asked about.
  const cfg = s3Config();
  const configured = isConfigured(cfg);

  if (!configured) {
    if (LOCAL_ONLY) {
      console.log("[db-backup] --local-only: skipping upload (this copy is NOT off-site)");
    } else {
      console.error(
        "\n[db-backup] OFFSITE NOT CONFIGURED — the backup exists locally and would be lost with this machine.\n" +
          "Set these and re-run (values from Cloudflare R2 / B2 / S3 / MinIO):\n" +
          "  BACKUP_S3_ENDPOINT  e.g. https://<account>.r2.cloudflarestorage.com\n" +
          "  BACKUP_S3_BUCKET    e.g. clutchmarks-backups\n" +
          "  BACKUP_S3_REGION    e.g. auto\n" +
          "  BACKUP_S3_KEY_ID / BACKUP_S3_SECRET\n" +
          "Pass --local-only to accept a local-only backup explicitly.",
      );
      process.exit(2);
    }
  } else {
    await s3Put(cfg, name, encrypted);
    console.log(`[db-backup] uploaded to ${cfg.bucket}/${[cfg.prefix, name].filter(Boolean).join("/")}`);
  }

  // 5. Retention: the newest KEEP files stay. Pruning only after the upload
  //    succeeded, so a failed upload cannot also delete yesterday's copy.
  const files = fs
    .readdirSync(OUT_DIR)
    .filter((f) => f.endsWith(".cmbackup.enc"))
    .sort();
  for (const stale of files.slice(0, Math.max(0, files.length - KEEP))) {
    fs.unlinkSync(path.join(OUT_DIR, stale));
    console.log(`[db-backup] pruned ${stale}`);
  }

  console.log(`[db-backup] done in ${((Date.now() - started) / 1000).toFixed(1)}s — keep=${KEEP}`);
})().catch((err) => {
  console.error("[db-backup] FAILED:", err.message);
  process.exit(1);
});
