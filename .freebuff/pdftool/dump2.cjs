const j = require('./booklet-pages.json');
for (const p of j.pages) if ([2, 12, 13].includes(p.page)) console.log(`PAGE ${p.page} FULL:`, p.text, '\n');
