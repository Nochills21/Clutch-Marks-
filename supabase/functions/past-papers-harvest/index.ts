// past-papers-harvest: recurring re-verify + re-harvest of past-paper links.
//
// The archive's links rot. A bucket object can disappear (re-uploaded, renamed,
// or deleted out of band) and an external URL can start 404ing, and until now
// the only way to notice was for a student to click and get an error. This job
// runs on a schedule (pg_cron -> pg_net, shared secret header) and does two
// things:
//
//   1. Re-verify every link the archive uses (internal bucket objects and any
//      external URLs) and record the result in public.past_paper_link_checks.
//      Dead links are then `select * from past_paper_link_checks where not ok`.
//
//   2. Re-harvest the PhysicsAndMathsTutor index pages and flag PDFs whose
//      (subject, session, year, kind) no archive row covers. Those land as
//      slot='candidate' rows, so a newly published exam session shows up before
//      an admin adds it — the same match logic the one-off ingest used
//      (.freebuff/pmt-*.cjs), now recurring.
//
// Candidates are NEVER written into past_papers automatically: a public URL in
// paper_url bypasses the watermark/entitlement gate, so sourcing stays a
// deliberate ingest. This job only observes and reports.
//
// Auth: shared secret (x-harvest-secret vs HARVEST_SECRET), like weekly-digest.
// Deploy with verify_jwt=false so pg_cron's pg_net call can reach it.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-harvest-secret",
};

const UA = "Mozilla/5.0 (compatible; ClutchMarksAudit/1.0)";
const STORAGE_BUCKET = "past-papers";
const FETCH_TIMEOUT_MS = 30_000;
const CONCURRENCY = 8;

function json(body: object, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

// ── PMT index pages (mirror of .freebuff/pmt-harvest.cjs) ────────────────────
type IndexPage = { page: string; board: string; code: string; paper?: number; unit?: string | number };

const PAGES: IndexPage[] = [
  // Cambridge IGCSE Physics 0625
  ...[1, 2, 3, 4, 5, 6].map((n) => ({ page: `https://www.physicsandmathstutor.com/past-papers/gcse-physics/cie-igcse-paper-${n}/`, board: "cambridge", code: "0625", paper: n })),
  // Cambridge IGCSE Maths 0580
  ...[1, 2, 3, 4].map((n) => ({ page: `https://www.physicsandmathstutor.com/past-papers/gcse-maths/cie-igcse-paper-${n}/`, board: "cambridge", code: "0580", paper: n })),
  // Cambridge IGCSE Computer Science 0478
  ...[1, 2].map((n) => ({ page: `https://www.physicsandmathstutor.com/past-papers/gcse-computer-science/caie-paper-${n}`, board: "cambridge", code: "0478", paper: n })),
  // Cambridge A Level Computer Science 9618
  ...[1, 2, 3, 4].map((n) => ({ page: `https://www.physicsandmathstutor.com/past-papers/a-level-computer-science/caie-paper-${n}/`, board: "cambridge", code: "9618", paper: n })),
  // Edexcel IAL Physics (WPH11..WPH15)
  ...[1, 2, 3, 4, 5].map((n) => ({ page: `https://www.physicsandmathstutor.com/past-papers/a-level-physics/edexcel-unit-${n}/`, board: "edexcel", code: `WPH1${n}`, unit: n })),
  // Edexcel IAL Maths
  { page: "https://www.physicsandmathstutor.com/a-level-maths-papers/c1-edexcel/", board: "edexcel", code: "WMA11", unit: "P1" },
  { page: "https://www.physicsandmathstutor.com/a-level-maths-papers/c2-edexcel/", board: "edexcel", code: "WMA12", unit: "P2" },
  { page: "https://www.physicsandmathstutor.com/a-level-maths-papers/c3-edexcel/", board: "edexcel", code: "WMA13", unit: "P3" },
  { page: "https://www.physicsandmathstutor.com/a-level-maths-papers/m1-edexcel/", board: "edexcel", code: "WME01", unit: "M1" },
  { page: "https://www.physicsandmathstutor.com/a-level-maths-papers/s1-edexcel/", board: "edexcel", code: "WST01", unit: "S1" },
  { page: "https://www.physicsandmathstutor.com/a-level-maths-papers/s2-edexcel/", board: "edexcel", code: "WST02", unit: "S2" },
];

const LINK_RE = /href="(https:\/\/pmt\.physicsandmathstutor\.com\/download\/[^"]+\.pdf)"/gi;

// ── Helpers ──────────────────────────────────────────────────────────────────
type LinkResult = { status: number; contentType: string; ok: boolean; error?: string };

async function fetchHtml(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "User-Agent": UA },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

/**
 * Verify a remote URL resolves to a real document. HEAD is cheap but some hosts
 * refuse it (405/403); fall back to a range-limited GET so we still learn the
 * status and content type without pulling the whole file.
 */
async function checkRemote(url: string): Promise<LinkResult> {
  const attempt = async (method: "HEAD" | "GET"): Promise<Response | null> => {
    try {
      const init: RequestInit = { method, redirect: "follow", headers: { "User-Agent": UA }, signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) };
      if (method === "GET") init.headers = { "User-Agent": UA, Range: "bytes=0-0" };
      return await fetch(url, init);
    } catch {
      return null;
    }
  };

  let res = await attempt("HEAD");
  if (!res || res.status === 0 || res.status === 403 || res.status === 405 || res.status === 501) {
    const fallback = await attempt("GET");
    if (fallback) res = fallback;
  }
  if (!res) return { status: 0, contentType: "", ok: false, error: "unreachable" };
  const contentType = res.headers.get("content-type") ?? "";
  // 206 from the range GET still proves the resource exists.
  const okStatus = res.status === 200 || res.status === 206;
  const ok = okStatus && /pdf/i.test(contentType);
  return { status: res.status, contentType, ok, error: ok ? undefined : `status ${res.status}${contentType ? ` (${contentType})` : ""}` };
}

/** Verify a bucket object still exists by asking storage to sign it. */
async function checkStorage(admin: ReturnType<typeof createClient>, path: string): Promise<LinkResult> {
  const { error } = await admin.storage.from(STORAGE_BUCKET).createSignedUrl(path, 60);
  if (error) return { status: 404, contentType: "", ok: false, error: error.message };
  return { status: 200, contentType: "application/pdf", ok: true };
}

function isExternal(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

/** Parse a PMT source filename into sitting + kind. Ported from pmt-match.cjs. */
function parseFileName(file: string): { kind: "paper" | "mark_scheme"; session: string | null; year: number | null } | null {
  const base = file.replace(/\.pdf$/i, "");
  let kind: "paper" | "mark_scheme" | null = null;
  if (/(^|[^A-Za-z])QP([^A-Za-z]|$)/.test(base)) kind = "paper";
  else if (/(^|[^A-Za-z])MS([^A-Za-z]|$)/.test(base)) kind = "mark_scheme";
  if (!kind) return null;

  let session: string | null = null;
  let year: number | null = null;
  const m = base.match(/^(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})/i);
  if (m) {
    const mon = m[1].toLowerCase();
    year = Number(m[2]);
    if (mon === "june" || mon === "may") session = "May/June";
    else if (mon === "october" || mon === "november") session = "Oct/Nov";
    else if (mon === "march" || mon === "february" || mon === "january") session = "Feb/Mar";
  }
  return { kind, session, year };
}

/** Extract the subject code from an archive title (ported from pmt-match.cjs). */
function codeFromTitle(title: string): string | null {
  const m = title.match(/\(([A-Z0-9]{4,6})\s*\/\s*\d+\)/i);
  if (m) return m[1].toUpperCase();
  const bare = title.match(/\b(\d{4})\b/);
  return bare ? bare[1] : null;
}

/** Run an async mapper over items with bounded concurrency. */
async function pool<T, R>(items: T[], n: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const out = new Array<R>(items.length);
  let cursor = 0;
  const workers = Array.from({ length: Math.max(1, Math.min(n, items.length)) }, async () => {
    while (true) {
      const idx = cursor++;
      if (idx >= items.length) return;
      out[idx] = await fn(items[idx]);
    }
  });
  await Promise.all(workers);
  return out;
}

type CheckRow = {
  paper_id: string | null;
  slot: "paper" | "mark_scheme" | "candidate";
  url: string;
  host: string | null;
  session: string | null;
  year: number | null;
  status: number;
  content_type: string | null;
  ok: boolean;
  error: string | null;
  source: "verify" | "pmt-harvest";
  // Candidate rows only: subject code + source filename for approval titles.
  source_code?: string;
  file_name?: string;
  checked_at: string;
};

function hostOf(url: string): string | null {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

/** Upsert checks in batches, keyed on (slot, url). */
async function writeChecks(admin: ReturnType<typeof createClient>, rows: CheckRow[]): Promise<number> {
  const CHUNK = 200;
  let written = 0;
  for (let i = 0; i < rows.length; i += CHUNK) {
    const batch = rows.slice(i, i + CHUNK);
    const { error } = await admin.from("past_paper_link_checks").upsert(batch, { onConflict: "slot,url" });
    if (error) throw new Error(`upsert past_paper_link_checks: ${error.message}`);
    written += batch.length;
  }
  return written;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

    const expected = Deno.env.get("HARVEST_SECRET");
    const provided = req.headers.get("x-harvest-secret");
    if (!expected || provided !== expected) return json({ error: "unauthorized" }, 401);

    const body = await req.json().catch(() => ({})) as { skipHarvest?: boolean; maxLinks?: number };
    const skipHarvest = body.skipHarvest === true;

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } },
    );

    const started = Date.now();
    const now = new Date().toISOString();

    // ── 1. Re-verify every link the archive currently uses ─────────────────
    const { data: papers, error: papersErr } = await admin
      .from("past_papers")
      .select("id, title, year, session, paper_number, paper_url, mark_scheme_url");
    if (papersErr) throw new Error(papersErr.message);

    type Target = { paperId: string; slot: "paper" | "mark_scheme"; url: string; session: string | null; year: number | null };
    const targets: Target[] = [];
    const seen = new Set<string>();
    // What the archive already sources per subject: the newest year, and which
    // sessions of that year. A harvested sitting is only "new" if it is newer
    // than this — older unsourced years are a curation choice, not news.
    const maxYearByCode = new Map<string, number>();
    const sessionsAtMaxByCode = new Map<string, Set<string>>();

    for (const p of papers ?? []) {
      const code = codeFromTitle(p.title ?? "");
      const slots: Array<{ slot: "paper" | "mark_scheme"; url: string | null }> = [
        { slot: "paper", url: p.paper_url },
        { slot: "mark_scheme", url: p.mark_scheme_url },
      ];
      for (const s of slots) {
        if (!s.url) continue;
        if (code && p.session && p.year) {
          const cur = maxYearByCode.get(code) ?? 0;
          if (p.year > cur) {
            maxYearByCode.set(code, p.year);
            sessionsAtMaxByCode.set(code, new Set([p.session]));
          } else if (p.year === cur) {
            sessionsAtMaxByCode.get(code)!.add(p.session);
          }
        }
        const key = `${s.slot}|${s.url}`;
        if (seen.has(key)) continue;
        seen.add(key);
        targets.push({ paperId: p.id, slot: s.slot, url: s.url, session: p.session ?? null, year: p.year ?? null });
      }
    }

    const verified = await pool(targets, CONCURRENCY, async (t) => {
      const r = isExternal(t.url) ? await checkRemote(t.url) : await checkStorage(admin, t.url);
      const row: CheckRow = {
        paper_id: t.paperId,
        slot: t.slot,
        url: t.url,
        host: isExternal(t.url) ? hostOf(t.url) : STORAGE_BUCKET,
        session: t.session,
        year: t.year,
        status: r.status,
        content_type: r.contentType || null,
        ok: r.ok,
        error: r.error ?? null,
        source: "verify",
        checked_at: now,
      };
      return row;
    });

    const verifiedWritten = await writeChecks(admin, verified);
    const dead = verified.filter((r) => !r.ok);

    // ── 2. Re-harvest PMT index pages; record newer-than-archive sittings ───
    const candidates: CheckRow[] = [];
    let harvestedLinks = 0;
    let harvestPages = 0;
    const harvestErrors: string[] = [];

    if (!skipHarvest) {
      for (const p of PAGES) {
        const html = await fetchHtml(p.page);
        if (!html) {
          harvestErrors.push(p.code);
          continue;
        }
        harvestPages += 1;
        const local = new Map<string, string>(); // url -> filename (dedupe within page)
        for (const m of html.matchAll(LINK_RE)) {
          const url = m[1];
          if (!local.has(url)) local.set(url, decodeURIComponent(url.split("/").pop() ?? ""));
        }
        for (const [url, file] of local) {
          harvestedLinks += 1;
          const parsed = parseFileName(file);
          if (!parsed || !parsed.session || !parsed.year) continue; // unclassifiable
          const maxYear = maxYearByCode.get(p.code);
          if (maxYear == null) continue; // nothing sourced for this code yet
          const isNewer = parsed.year > maxYear ||
            (parsed.year === maxYear && !(sessionsAtMaxByCode.get(p.code)?.has(parsed.session)));
          if (!isNewer) continue; // already-sourced sitting
          const ck = `candidate|${url}`;
          if (seen.has(ck)) continue;
          seen.add(ck);
          candidates.push({
            paper_id: null,
            slot: "candidate",
            url,
            host: hostOf(url),
            session: parsed.session,
            year: parsed.year,
            status: 0,
            content_type: null,
            ok: false,
            error: null,
            source: "pmt-harvest",
            // Kept so an admin approval can build a real title instead of a URL.
            source_code: p.code,
            file_name: file,
            checked_at: now,
          });
        }
        await new Promise((r) => setTimeout(r, 300)); // be polite to the source
      }

      // Only verify candidates up to a bound — a fresh syllabus could add many.
      const maxLinks = Number.isInteger(body.maxLinks) ? Math.max(0, body.maxLinks as number) : 100;
      const toVerify = candidates.slice(0, maxLinks);
      const results = await pool(toVerify, CONCURRENCY, (c) => checkRemote(c.url));
      results.forEach((r, i) => {
        toVerify[i].status = r.status;
        toVerify[i].content_type = r.contentType || null;
        toVerify[i].ok = r.ok;
        toVerify[i].error = r.error ?? null;
      });
      for (const c of candidates.slice(maxLinks)) c.error = "not verified (over maxLinks)";
    }

    const candidatesWritten = candidates.length ? await writeChecks(admin, candidates) : 0;

    // ── 3. One audit summary row per run ───────────────────────────────────
    const summary = {
      linksChecked: verifiedWritten,
      linksOk: verified.length - dead.length,
      linksDead: dead.length,
      deadLinks: dead.slice(0, 20).map((d) => ({ url: d.url, slot: d.slot, status: d.status, error: d.error })),
      harvestPages,
      harvestErrors,
      harvestedLinks,
      candidates: candidatesWritten,
      candidatesLive: candidates.filter((c) => c.ok).length,
      durationMs: Date.now() - started,
      skippedHarvest: skipHarvest,
    };

    await admin.rpc("audit_admin_action", {
      p_action: "past_paper_link_check",
      p_entity: "past_papers",
      p_entity_id: null,
      p_entity_label: "recurring link check",
      p_details: summary,
      p_actor_id: null,
      p_actor_username: "past-papers-harvest",
    });

    return json({ ok: true, ...summary });
  } catch (e) {
    console.error("past-papers-harvest error:", e instanceof Error ? e.message : e);
    return json({ error: e instanceof Error ? e.message : "unknown" }, 500);
  }
});
