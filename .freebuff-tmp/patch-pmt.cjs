const fs = require("fs");
const p = ".freebuff/pmt-bulk-ingest.cjs";
let src = fs.readFileSync(p, "utf8");
const reps = [
  [
`  const existingKeys = new Set(
    existing.map((r) => \`\${r.subject_slug}|\${r.level}|\${r.title}|\${r.session ?? ""}|\${r.year ?? ""}\`),
  );`,
`  const rowKey = (r) => \`\${r.subject_slug}|\${r.level}|\${r.title}|\${r.session ?? ""}|\${r.year ?? ""}\`;
  const existingKeys = new Set(existing.map(rowKey));
  // Rows recorded from the board's index before any PDF was fetched: they carry
  // no file at all, so a plain "already present" skip made them unreachable for
  // ever — and they are exactly the rows the archive page lists as flagged.
  const filelessByKey = new Map(
    existing.filter((r) => !r.paper_url || !r.mark_scheme_url).map((r) => [rowKey(r), r]),
  );`,
  ],
  [
`  const seen = new Set();
  const fresh = [];
  for (const p of [...pairs].sort((a, b) => (b.year ?? 0) - (a.year ?? 0))) {
    const key = \`\${p.subject_slug}|\${p.level}|\${p.title}|\${p.session ?? ""}|\${p.year ?? ""}\`;
    if (existingKeys.has(key) || seen.has(key)) continue;
    seen.add(key);
    fresh.push(p);
  }
  log(\`pairs on PMT: \${pairs.length}, of which new: \${fresh.length}, page errors: \${pageErrors.length}\`);
  if (pageErrors.length) log(\`  errors: \${pageErrors.slice(0, 6).join("; ")}\`);

  const queue = fresh.slice(0, LIMIT);`,
`  const seen = new Set();
  const fresh = [];
  const backfill = [];
  for (const p of [...pairs].sort((a, b) => (b.year ?? 0) - (a.year ?? 0))) {
    const key = \`\${p.subject_slug}|\${p.level}|\${p.title}|\${p.session ?? ""}|\${p.year ?? ""}\`;
    if (seen.has(key)) continue;
    seen.add(key);
    if (existingKeys.has(key)) {
      const row = filelessByKey.get(key);
      if (row) backfill.push({ ...p, rowId: row.id });
      continue;
    }
    fresh.push(p);
  }
  log(
    \`pairs on PMT: \${pairs.length}, of which new: \${fresh.length}, filling file-less row(s): \${backfill.length}, page errors: \${pageErrors.length}\`,
  );
  if (pageErrors.length) log(\`  errors: \${pageErrors.slice(0, 6).join("; ")}\`);

  // File-less rows first: they are already on the archive page, so a budget that
  // buys 40 pairs should close 40 broken listings before it adds new ones. The
  // update touches only the file columns, so a row's topic link and session stay
  // as they are.
  const queue = [...backfill, ...fresh].slice(0, LIMIT);`,
  ],
  [
`  let uploaded = 0;
  let inserted = 0;
  let bytes = 0;`,
`  let uploaded = 0;
  let inserted = 0;
  let filled = 0;
  let bytes = 0;`,
  ],
  [
`      const ins = await admin.from("past_papers").insert(row).select("id").single();
      if (ins.error) throw new Error(\`insert row: \${ins.error.message}\`);
      inserted += 1;
      existingKeys.add(\`\${p.subject_slug}|\${p.level}|\${p.title}|\${p.session ?? ""}|\${p.year ?? ""}\`);
      ingested.push({ ...p, id: ins.data.id });`,
`      let rowId = p.rowId ?? null;
      if (rowId) {
        const patch = { paper_url: qpPath, mark_scheme_url: msPath, source_url: p.qp };
        const upd = await admin.from("past_papers").update(patch).eq("id", rowId).select("id").single();
        if (upd.error) throw new Error(\`update row: \${upd.error.message}\`);
        filled += 1;
      } else {
        const ins = await admin.from("past_papers").insert(row).select("id").single();
        if (ins.error) throw new Error(\`insert row: \${ins.error.message}\`);
        inserted += 1;
        rowId = ins.data.id;
        existingKeys.add(\`\${p.subject_slug}|\${p.level}|\${p.title}|\${p.session ?? ""}|\${p.year ?? ""}\`);
      }
      ingested.push({ ...p, id: rowId });`,
  ],
  [
`  log(\`done: \${uploaded} file(s) uploaded, \${inserted} row(s) inserted, \${resolved} harvested candidate(s) resolved\`);`,
`  log(
    \`done: \${uploaded} file(s) uploaded, \${inserted} row(s) inserted, \${filled} file-less row(s) filled, \${resolved} harvested candidate(s) resolved\`,
  );`,
  ],
];
let ok = 0;
for (const [from, to] of reps) {
  const n = src.split(from).length - 1;
  if (n !== 1) { console.error(`REPLACEMENT ${ok + 1}: found ${n} match(es) — aborting`); process.exit(1); }
  src = src.replace(from, to);
  ok += 1;
}
fs.writeFileSync(p, src);
console.log(`patched ${ok} replacement(s) in ${p}`);
