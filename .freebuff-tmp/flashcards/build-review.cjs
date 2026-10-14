// Read-only. Builds the review file from flagged.json + rewrites.cjs.
// Asserts every flagged card has exactly one rewrite and no rewrite is unused.
// Writes .freebuff-tmp/flashcards/review.json; never touches the database.
const fs = require('fs');
const { execFileSync } = require('child_process');
const { rewrites, inserts } = require('./rewrites.cjs');

const flagged = JSON.parse(fs.readFileSync('.freebuff-tmp/flashcards/flagged.json', 'utf8'));
const used = new Set();
const updates = [];
const problems = [];

for (const f of flagged) {
  const key = `${f.slug}|${f.sort_order}`;
  const rw = rewrites[key];
  if (!rw) { problems.push(`no rewrite for ${key}`); continue; }
  used.add(key);
  updates.push({ id: f.id, slug: f.slug, sort_order: f.sort_order, old_front: f.front, old_back: f.back, front: rw[0], back: rw[1] });
}
for (const key of Object.keys(rewrites)) if (!used.has(key)) problems.push(`unused rewrite ${key}`);

// Look up the set id for each deck that needs a new card.
const insertTopics = [...new Set(inserts.map(i => i[0]))];
const list = insertTopics.map(s => `'${s}'`).join(',');
const sets = JSON.parse(execFileSync('node', ['.freebuff-tmp/fc-coverage.cjs',
  `select t.slug, s.id as set_id from flashcard_sets s join topics t on t.id=s.topic_id where t.slug in (${list});`],
  { encoding: 'utf8' }));
const setFor = Object.fromEntries(sets.map(s => [s.slug, s.set_id]));
const adds = inserts.map(([slug, sort_order, front, back]) => {
  if (!setFor[slug]) problems.push(`no set for ${slug}`);
  return { set_id: setFor[slug], slug, sort_order, front, back };
});

if (problems.length) { console.error('PROBLEMS:\n' + problems.join('\n')); process.exit(1); }

const review = { flagged_rows: flagged.length, updates, inserts: adds };
fs.writeFileSync('.freebuff-tmp/flashcards/review.json', JSON.stringify(review, null, 2));
console.log(`ok: ${updates.length} updates, ${adds.length} inserts, all ${flagged.length} flagged rows covered`);
