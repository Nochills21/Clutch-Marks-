#!/usr/bin/env node
/**
 * Route health: every study route, actually rendered, checked for error states.
 *
 * Why this exists: the competitive audit listed five "P0" routes that threw
 * `TypeError: Failed to fetch` or showed an empty state. Three of them rendered
 * fine on current main, and the difference between "fine" and "broken" is not
 * visible in a build log — it only appears after the SPA has fetched its data.
 * A curl of the prerendered HTML cannot see it either, because the page is
 * client-rendered.
 *
 * So this drives a real browser: every subject hub, and every topic's notes,
 * quiz and papers route, at a real viewport. It fails (exit 1) on
 *   * an in-page error card ("Couldn't load …", "not found"),
 *   * raw exception text ("TypeError", "Failed to fetch"),
 *   * an empty page (no <h1> and almost no text).
 *
 * Usage:
 *   node .freebuff/route-health.cjs                          # dev server on :8080
 *   node .freebuff/route-health.cjs --base https://clutchmarks.study
 *   node .freebuff/route-health.cjs --limit 12 --json .freebuff-tmp/health.json
 *   ROUTE_HEALTH_PASSWORD=... node .freebuff/route-health.cjs --as pupil@example.com
 *
 * `--as` signs in first and injects the session before every navigation, so the
 * student-scoped pages are checked the way a student sees them. Signup domains
 * are restricted, so a throwaway account must use @igcse-platform.local.
 */
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer-core");

const PROJECT_REF = "zzliiazovezhxbmfeqco";
// Five was too slow for a 600-route sweep through the Vite dev server; eight
// took ~1 route/second, so a full sweep still ran past nine minutes. Sixteen
// tabs is the setting that finishes a local production sweep inside a single
// command, and it is only ever used by this harness.
const CONCURRENCY = Number(process.env.ROUTE_HEALTH_CONCURRENCY) || 16;

function env() {
  const raw = fs.readFileSync(path.join(__dirname, "..", ".env"), "utf8");
  const map = {};
  for (const line of raw.split(/\r?\n/)) {
    const at = line.indexOf("=");
    if (at < 1 || line.trim().startsWith("#")) continue;
    map[line.slice(0, at).trim()] = line.slice(at + 1).trim().replace(/^['"]|['"]$/g, "");
  }
  return map;
}

function arg(name, fallback = null) {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? fallback : (process.argv[index + 1] ?? true);
}

async function rest(table, query) {
  const { VITE_SUPABASE_PROJECT_ID, VITE_SUPABASE_PUBLISHABLE_KEY } = env();
  const res = await fetch(
    `https://${VITE_SUPABASE_PROJECT_ID}.supabase.co/rest/v1/${table}?${query}`,
    { headers: { apikey: VITE_SUPABASE_PUBLISHABLE_KEY, Authorization: `Bearer ${VITE_SUPABASE_PUBLISHABLE_KEY}` } },
  );
  if (!res.ok) throw new Error(`${table}: HTTP ${res.status} ${(await res.text()).slice(0, 200)}`);
  return res.json();
}

/** Sign in and return the localStorage value supabase-js expects. */
async function sessionFor(email, password) {
  const { VITE_SUPABASE_PROJECT_ID, VITE_SUPABASE_PUBLISHABLE_KEY } = env();
  const res = await fetch(`https://${VITE_SUPABASE_PROJECT_ID}.supabase.co/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: VITE_SUPABASE_PUBLISHABLE_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const body = await res.json();
  if (!res.ok || !body.access_token) {
    throw new Error(`sign-in failed: ${body.error_description ?? body.msg ?? res.status}`);
  }
  const session = {
    access_token: body.access_token,
    token_type: body.token_type ?? "bearer",
    expires_in: body.expires_in,
    expires_at: body.expires_at,
    refresh_token: body.refresh_token,
    user: body.user,
  };
  return {
    key: `sb-${VITE_SUPABASE_PROJECT_ID}-auth-token`,
    value: JSON.stringify(session),
  };
}

function chromePath() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ].filter(Boolean);
  const found = candidates.find((candidate) => fs.existsSync(candidate));
  if (!found) throw new Error("No Chrome/Edge found; set CHROME_PATH.");
  return found;
}

async function routes() {
  const subjects = await rest("subjects", "select=id,slug&order=slug");
  const levels = await rest("subject_levels", "select=id,level,subject_id&order=level");
  const topics = await rest("topics", "select=slug,subject_level_id&order=sort_order&limit=2000");
  const subjectById = new Map(subjects.map((subject) => [subject.id, subject]));
  const levelById = new Map(levels.map((level) => [level.id, level]));

  const list = [
    { url: "/", kind: "page" },
    { url: "/pricing", kind: "page" },
    { url: "/subjects", kind: "page" },
    { url: "/notes", kind: "page" },
    { url: "/lessons", kind: "page" },
    { url: "/quizzes", kind: "page" },
    { url: "/past-papers", kind: "page" },
    { url: "/refunds", kind: "page" },
    { url: "/privacy", kind: "page" },
    { url: "/terms", kind: "page" },
    // The signed-in app. Anonymous, these bounce to /auth, which is a redirect
    // and not an error; swept with `--as` they are what a student actually uses.
    { url: "/dashboard", kind: "app" },
    { url: "/practice", kind: "app" },
    { url: "/mastery", kind: "app" },
    { url: "/progress", kind: "app" },
    { url: "/settings", kind: "app" },
    { url: "/flashcards", kind: "app" },
    { url: "/study-planner", kind: "app" },
    { url: "/ai-marker", kind: "app" },
    { url: "/leaderboard", kind: "app" },
    { url: "/command-words", kind: "app" },
    { url: "/exam-plan", kind: "app" },
    { url: "/announcements", kind: "app" },
    { url: "/feedback", kind: "app" },
  ];

  for (const level of levels) {
    const subject = subjectById.get(level.subject_id);
    if (!subject) continue;
    list.push({ url: `/study/${subject.slug}/${level.level.toLowerCase()}`, kind: "hub" });
  }

  for (const topic of topics) {
    const level = levelById.get(topic.subject_level_id);
    const subject = level && subjectById.get(level.subject_id);
    if (!subject || !level) continue;
    const base = `/study/${subject.slug}/${level.level.toLowerCase()}/${topic.slug}`;
    list.push({ url: `${base}/notes`, kind: "topic-notes" });
    list.push({ url: `${base}/quiz`, kind: "topic-quiz" });
    list.push({ url: `${base}/papers`, kind: "topic-papers" });
  }

  return list;
}

const ERROR_PATTERNS = [
  /couldn'?t load/i,
  /failed to fetch/i,
  /typeerror/i,
  /something went wrong/i,
  /not found/i,
  /no quizzes available/i,
];

function classify(info) {
  const text = info.text ?? "";
  const problems = [];
  for (const pattern of ERROR_PATTERNS) {
    if (pattern.test(text)) problems.push(`text: ${pattern.source}`);
  }
  if (!info.h1 && text.length < 60) problems.push("empty page");
  if (info.h1 && /^(404|not found)$/i.test(info.h1.trim())) problems.push("not-found heading");
  return problems;
}

/**
 * Prove the classifier still bites, on the same browser and the same wait the
 * real sweep uses. A harness that only ever prints PASS is indistinguishable
 * from one that checks nothing — these two fixtures are the routes that were
 * genuinely broken (a study page whose topic does not exist, and a URL with no
 * page at all), and both must be reported as failures.
 */
async function selfTest(base) {
  const browser = await puppeteer.launch({
    executablePath: chromePath(),
    headless: "new",
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  });
  const page = await browser.newPage();
  const cases = [
    { url: "/study/maths/igcse/no-such-topic/notes", why: "a topic that does not exist" },
    { url: "/this-route-does-not-exist", why: "a URL with no page" },
  ];
  let failed = 0;
  for (const item of cases) {
    await page.goto(`${base}${item.url}`, { waitUntil: "domcontentloaded", timeout: 25000 });
    await page
      .waitForFunction(
        () => ((document.querySelector("main") || document.body).innerText || "").trim().length > 80,
        { timeout: 10000 },
      )
      .catch(() => {});
    const info = await page.evaluate(() => ({
      h1: document.querySelector("h1")?.innerText?.trim() ?? null,
      text: ((document.querySelector("main") || document.body).innerText || "").replace(/\s+/g, " ").slice(0, 1500),
    }));
    const problems = classify(info);
    const ok = problems.length > 0;
    if (!ok) failed += 1;
    console.log(`${ok ? "ok  " : "MISS"}  ${item.url}  (${item.why})  ${problems.join(", ") || "not flagged"}  h1=${JSON.stringify(info.h1)}`);
  }
  await browser.close();
  console.log(failed ? `FAIL  ${failed}/${cases.length} broken fixtures were not flagged` : `PASS  the classifier flagged both broken fixtures`);
  process.exit(failed ? 1 : 0);
}

async function main() {
  const base = String(arg("base", "http://localhost:8080")).replace(/\/+$/, "");
  if (process.argv.includes("--self-test")) return selfTest(base);
  const limit = Number(arg("limit", 0)) || 0;
  const jsonPath = arg("json", null);
  const as = arg("as", null);
  const only = arg("only", null);
  // A signed-in route renders later than an anonymous one: it waits for the
  // session, the role row and (for a teacher) the subject grant before any page
  // content can appear. A 10s window is enough anonymously and was not enough
  // under load, where every route then read as "empty page" — a slow page and a
  // broken page looked identical, which is the one thing this harness must never
  // confuse.
  const settleMs = Number(arg("wait", as ? 20000 : 10000));
  const password = process.env.ROUTE_HEALTH_PASSWORD;

  let session = null;
  if (as) {
    if (!password) throw new Error("--as needs ROUTE_HEALTH_PASSWORD in the environment");
    session = await sessionFor(String(as), password);
    console.log(`signed in as ${as}`);
  }

  let list = await routes();
  if (only) list = list.filter((route) => route.kind === only);
  if (limit) list = list.slice(0, limit);
  console.log(`${list.length} routes against ${base}`);

  const browser = await puppeteer.launch({
    executablePath: chromePath(),
    headless: "new",
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  });

  const results = [];
  let cursor = 0;

  async function worker() {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });
    if (session) {
      await page.evaluateOnNewDocument(
        (key, value) => {
          window.localStorage.setItem(key, value);
        },
        session.key,
        session.value,
      );
    }
    while (cursor < list.length) {
      const route = list[cursor++];
      const url = `${base}${route.url}`;
      try {
        // `domcontentloaded`, not `networkidle2`: the dev server holds an HMR
        // websocket open forever, so idle never arrives and every route paid a
        // 25s timeout. The render wait below is what actually decides readiness.
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 25000 });
        // The document is only the shell: React mounts and fetches afterwards,
        // so `networkidle2` can resolve on an empty <main>. Wait for the page to
        // actually have text — a route that never renders any is the failure
        // this harness exists to catch, and it is not the same as "still
        // loading", so the wait is bounded.
        await page
          .waitForFunction(
            () => ((document.querySelector("main") || document.body).innerText || "").trim().length > 80,
            { timeout: settleMs },
          )
          .catch(() => {});
        const info = await page.evaluate(() => {
          const main = document.querySelector("main") || document.body;
          return {
            path: location.pathname,
            h1: document.querySelector("h1")?.innerText?.trim() ?? null,
            text: (main.innerText || "").replace(/\s+/g, " ").slice(0, 1500),
          };
        });
        const problems = classify(info);
        results.push({ url: route.url, kind: route.kind, status: "ok", path: info.path, h1: info.h1, problems, text: info.text.slice(0, 200) });
        if (problems.length) {
          results[results.length - 1].status = "fail";
          console.log(`FAIL  ${route.url}  -> ${info.path}  [${problems.join(", ")}]  ${info.text.slice(0, 120)}`);
        }
      } catch (error) {
        results.push({ url: route.url, kind: route.kind, status: "error", error: error.message, problems: ["navigation"] });
        console.log(`ERR   ${route.url}  ${error.message.slice(0, 120)}`);
      }
    }
    await page.close();
  }

  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, list.length) }, worker));
  await browser.close();

  const failures = results.filter((result) => result.status !== "ok");
  const byKind = {};
  for (const result of results) {
    byKind[result.kind] = byKind[result.kind] ?? { total: 0, failed: 0 };
    byKind[result.kind].total += 1;
    if (result.status !== "ok") byKind[result.kind].failed += 1;
  }

  console.log("\n--- summary ---");
  for (const [kind, counts] of Object.entries(byKind)) {
    console.log(`${kind.padEnd(14)} ${String(counts.total).padStart(4)} checked  ${counts.failed} failed`);
  }
  console.log(`${failures.length === 0 ? "PASS" : "FAIL"}  ${results.length - failures.length}/${results.length} routes healthy`);

  if (jsonPath) {
    fs.writeFileSync(String(jsonPath), JSON.stringify({ base, checkedAt: new Date().toISOString(), results }, null, 2));
    console.log(`report: ${jsonPath}`);
  }

  process.exit(failures.length ? 1 : 0);
}

main().catch((error) => {
  console.error("route-health failed:", error.message);
  process.exit(2);
});
