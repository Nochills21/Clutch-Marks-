#!/usr/bin/env node
/**
 * Seed the IGCSE Biology (0610) and Chemistry (0620) lessons.
 *
 * Why: both levels had every topic and ZERO lessons, so their hubs reported
 * "0 Lessons" while the other IGCSE levels listed one lesson per topic. One
 * lesson per topic is the shape of the whole estate (`lessons.sort_order` is 1
 * within its topic, which is why `lessonAccess` ranks by topic first).
 *
 * Idempotent: a lesson whose (topic, title) already exists is left alone, so
 * re-running after an edit inserts only what is new. Refuses to start if a topic
 * slug in the module is not in the database — a typo must not silently seed
 * nothing.
 *
 * Usage:
 *   node .freebuff/seed-lessons-ol.cjs            # dry run: print the plan
 *   node .freebuff/seed-lessons-ol.cjs --apply    # write
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

const REF = "zzliiazovezhxbmfeqco";

function token() {
  const src = fs.readFileSync(path.join(__dirname, "get-keys.cjs"), "utf8");
  const found = (src.match(/sbp_[a-f0-9]+/) || [])[0];
  if (!found) throw new Error("no management token in .freebuff/get-keys.cjs");
  return found;
}

function sql(query) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({ query });
    const req = https.request(
      {
        hostname: "api.supabase.com",
        path: `/v1/projects/${REF}/database/query`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token()}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          if (res.statusCode >= 400) return reject(new Error(`HTTP ${res.statusCode}: ${data.slice(0, 500)}`));
          try {
            resolve(JSON.parse(data));
          } catch {
            resolve(data);
          }
        });
      },
    );
    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

/** Postgres dollar-quoting, so apostrophes and maths in the body need no escaping. */
function quote(text, index) {
  const tag = `$cm${index}$`;
  if (text.includes(tag)) throw new Error("content contains its own dollar-quote tag");
  return `${tag}${text}${tag}`;
}

const SOURCES = [
  { subject: "chemistry", level: "OL", module: "./content-lessons-chem-ol.cjs" },
  { subject: "biology", level: "OL", module: "./content-lessons-bio-ol.cjs" },
];

async function main() {
  const apply = process.argv.includes("--apply");
  let planned = 0;
  let inserted = 0;

  for (const source of SOURCES) {
    const lessons = require(source.module);
    const slugs = lessons.map((lesson) => lesson.topic);
    const rows = await sql(
      `select t.slug
         from public.topics t
         join public.subject_levels sl on sl.id = t.subject_level_id
         join public.subjects s on s.id = sl.subject_id
        where s.slug = '${source.subject}' and sl.level = '${source.level}'
          and t.slug = any(array[${slugs.map((slug) => `'${slug}'`).join(", ")}])`,
    );
    const found = new Set(rows.map((row) => row.slug));
    const missing = slugs.filter((slug) => !found.has(slug));
    if (missing.length) {
      throw new Error(`${source.subject}/${source.level}: topic slug(s) not in the database: ${missing.join(", ")}`);
    }
    if (found.size !== lessons.length) {
      throw new Error(`${source.subject}/${source.level}: ${lessons.length} lessons for ${found.size} topics`);
    }

    for (const [index, lesson] of lessons.entries()) {
      planned += 1;
      if (!lesson.content || lesson.content.length < 900) {
        throw new Error(`${source.subject}/${lesson.topic}: body is too thin (${lesson.content?.length ?? 0} chars)`);
      }
      if (lesson.content.includes("`") || lesson.content.includes("\uFFFD")) {
        throw new Error(`${source.subject}/${lesson.topic}: body has a backtick or a replacement character`);
      }
      const body = quote(lesson.content, index);
      const title = quote(lesson.title, index);
      const statement = `insert into public.lessons (topic_id, title, sort_order, content)
select t.id, ${title}, 1, ${body}
  from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
 where s.slug = '${source.subject}' and sl.level = '${source.level}' and t.slug = '${lesson.topic}'
   and not exists (select 1 from public.lessons l where l.topic_id = t.id and l.title = ${title})
returning id`;
      if (!apply) {
        console.log(`would insert  ${source.subject}/${source.level}  ${lesson.topic}  (${lesson.content.length} chars)`);
        continue;
      }
      const result = await sql(statement);
      if (!Array.isArray(result) || result.length > 1) {
        throw new Error(`${source.subject}/${lesson.topic}: expected at most one inserted row, got ${JSON.stringify(result).slice(0, 200)}`);
      }
      inserted += result.length;
      console.log(`${result.length ? "inserted" : "already there"}  ${source.subject}/${source.level}  ${lesson.topic}`);
    }
  }

  const counts = await sql(
    `select s.slug, sl.level, count(l.id) as lessons
       from public.subject_levels sl
       join public.subjects s on s.id = sl.subject_id
       left join public.topics t on t.subject_level_id = sl.id
       left join public.lessons l on l.topic_id = t.id
      where s.slug in ('biology', 'chemistry') and sl.level = 'OL'
      group by 1, 2 order by 1`,
  );
  console.log(`\nplanned ${planned}, inserted ${inserted}`);
  console.log(JSON.stringify(counts));
  if (!apply) console.log("\nDry run. Re-run with --apply to write.");
}

main().catch((err) => {
  console.error("seed failed:", err.message);
  process.exit(1);
});
