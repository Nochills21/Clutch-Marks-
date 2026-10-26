#!/usr/bin/env node
/**
 * Write the SQL that replaces the body of existing study_materials rows.
 *
 *   node .freebuff/deepen-materials.cjs .freebuff/content-deepen-pilot.cjs > .freebuff-tmp/deepen-pilot.sql
 *
 * A module may also export `titles` keyed by the same row ids; those rows get the
 * new title in the same guarded update.
 *   node .freebuff/apply-sql-file.cjs .freebuff-tmp/deepen-pilot.sql          # dry run (ROLLBACK)
 *   node .freebuff/apply-sql-file.cjs .freebuff-tmp/deepen-pilot.sql --apply  # live
 *
 * The content module is a plain .cjs file whose rows are template literals,
 * so the rules in AGENTS.md apply: no backticks, no "${", and 0-based answers
 * anywhere quiz data is involved. Each statement is guarded by the row's
 * material_type so a stale id can never overwrite the wrong kind of row, and
 * the statement fails (zero rows updated) if the id is missing.
 */
const path = require("path");

const modPath = process.argv[2];
if (!modPath) {
  console.error("usage: node .freebuff/deepen-materials.cjs <content.cjs>");
  process.exit(2);
}
const { rows, titles = {}, expectType = "notes" } = require(path.resolve(modPath));
const ids = Object.keys(rows);
if (ids.length === 0) {
  console.error("no rows in module");
  process.exit(2);
}
for (const id of ids) {
  if (!/^[0-9a-f-]{36}$/.test(id)) {
    console.error(`bad id: ${id}`);
    process.exit(2);
  }
  const html = rows[id];
  if (typeof html !== "string" || html.trim().length === 0) {
    console.error(`empty body for ${id}`);
    process.exit(2);
  }
  if (html.includes("\uFFFD")) {
    console.error(`U+FFFD in ${id}`);
    process.exit(2);
  }
  let tag = "body";
  while (html.includes(`$${tag}$`)) tag += "x";
  // An optional title, so a deepened row can adopt the house title format in the
  // same guarded statement rather than needing a second hand-written update.
  const title = typeof titles[id] === "string" ? titles[id].trim() : "";
  let titleSql = "";
  if (title) {
    if (title.includes("\uFFFD")) {
      console.error(`U+FFFD in title for ${id}`);
      process.exit(2);
    }
    let titleTag = "title";
    while (title.includes(`$${titleTag}$`)) titleTag += "x";
    titleSql = `, title = $${titleTag}$${title}$${titleTag}$`;
  }
  const out = [];
  out.push(
    `update public.study_materials set content = $${tag}$\n${html.trim()}\n$${tag}$, updated_at = now()${titleSql}` +
      ` where id = '${id}' and material_type = '${expectType}';`,
  );
  process.stdout.write(out.join("\n") + "\n");
}
