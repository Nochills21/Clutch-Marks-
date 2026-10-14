// One-off patch: extract oneBatch() in gatherDrafts + add the A* top-up loop.
// Run: node .freebuff-tmp/patch-builder-topup.cjs
const fs = require("fs");
const P = ".freebuff/build-topic-bank.cjs";
const src = fs.readFileSync(P, "utf8");

const oldBlock = `  const covered = () => new Set(accepted.map((q) => q.statement_code).filter(Boolean));
  const existing = (await existingStems(topic.id)).map((r) => r.question_text);

  let calls = 0;
  let want = [];
  while (calls < MAX_CALLS) {
    const missing = statements.map((s) => s.code).filter((c) => !covered().has(c));
    want = calls === 0 ? [] : missing;
    if (calls > 0 && !want.length) break;

    const count = calls === 0 ? FIRST_BATCH : Math.min(8, Math.max(2, want.length * 2));
    // Every question written so far in this run goes back to the model. Without
    // it, a follow-up call re-issues the same handful with the numbers changed:
    // measured on the first batch, 6 of 17 drafts were duplicates of another
    // draft in the same batch.
    const res = await draft(topic.id, "questions", count, want, {
      avoid: accepted.map((q) => q.question_text),
    });
    calls += 1;
    if (res.dropped) notes.push(\`call \${calls}: the function dropped \${res.dropped} draft(s) that failed its shape check\`);

    for (const q of res.questions ?? []) {
      const reasons = rejectReasons(q);
      const key = stemKey(q.question_text);
      if (reasons.length === 0) {
        if (seen.includes(key)) reasons.push("duplicates another draft in this batch");
        else if (seen.some((k) => similarity(k, key) >= 0.72)) reasons.push("is a near-copy of another draft in this batch");
        const existingNear = existing.find((e) => similarity(stemKey(e), key) >= 0.72);
        if (existingNear) reasons.push(\`is a near-copy of a question already in this topic: "\${existingNear.slice(0, 70)}"\`);
      }
      if (reasons.length) {
        rejected.push({ question_text: q.question_text, difficulty: q.difficulty, reasons });
        continue;
      }
      seen.push(key);
      accepted.push(q);
    }

    const stillMissing = statements.map((s) => s.code).filter((c) => !covered().has(c));
    if (!stillMissing.length) break;
    if (calls >= MAX_CALLS) notes.push(\`gave up after \${calls} calls with \${stillMissing.length} statement(s) uncovered: \${stillMissing.join(", ")}\`);
  }`;

const newBlock = `  const covered = () => new Set(accepted.map((q) => q.statement_code).filter(Boolean));
  const examHave = () => accepted.filter((q) => q.difficulty === "exam").length;
  const existing = (await existingStems(topic.id)).map((r) => r.question_text);

  // One drafting call plus its machine gate. Shared by the coverage loop and
  // the exam-tier top-up loop below so both filter identically.
  const oneBatch = async (count, want) => {
    // Every question written so far in this run goes back to the model. Without
    // it, a follow-up call re-issues the same handful with the numbers changed:
    // measured on the first batch, 6 of 17 drafts were duplicates of another
    // draft in the same batch.
    const res = await draft(topic.id, "questions", count, want, {
      avoid: accepted.map((q) => q.question_text),
    });
    calls += 1;
    if (res.dropped) notes.push(\`call \${calls}: the function dropped \${res.dropped} draft(s) that failed its shape check\`);

    for (const q of res.questions ?? []) {
      const reasons = rejectReasons(q);
      const key = stemKey(q.question_text);
      if (reasons.length === 0) {
        if (seen.includes(key)) reasons.push("duplicates another draft in this batch");
        else if (seen.some((k) => similarity(k, key) >= 0.72)) reasons.push("is a near-copy of another draft in this batch");
        const existingNear = existing.find((e) => similarity(stemKey(e), key) >= 0.72);
        if (existingNear) reasons.push(\`is a near-copy of a question already in this topic: "\${existingNear.slice(0, 70)}"\`);
      }
      if (reasons.length) {
        rejected.push({ question_text: q.question_text, difficulty: q.difficulty, reasons });
        continue;
      }
      seen.push(key);
      accepted.push(q);
    }
  };

  let calls = 0;
  let want = [];
  while (calls < MAX_CALLS) {
    const missing = statements.map((s) => s.code).filter((c) => !covered().has(c));
    want = calls === 0 ? [] : missing;
    if (calls > 0 && !want.length) break;

    const count = calls === 0 ? FIRST_BATCH : Math.min(8, Math.max(2, want.length * 2));
    await oneBatch(count, want);

    const stillMissing = statements.map((s) => s.code).filter((c) => !covered().has(c));
    if (!stillMissing.length) break;
    if (calls >= MAX_CALLS) notes.push(\`gave up after \${calls} calls with \${stillMissing.length} statement(s) uncovered: \${stillMissing.join(", ")}\`);
  }

  // A* top-up. Coverage alone is not the gate: the model's default mix lands
  // 2-4 exam-tier questions per topic and the A* floor is MIN_EXAM_TIER. While
  // the topic is short, keep drafting bounded follow-ups aimed at the whole
  // topic; the prompt's exam-tier share does the work.
  for (let top = 0; top < 2; top += 1) {
    const need = MIN_EXAM_TIER - examHave();
    if (need <= 0) break;
    await oneBatch(Math.min(8, Math.max(4, need * 2)), statements.map((s) => s.code));
  }
  if (examHave() < MIN_EXAM_TIER) {
    notes.push(\`gave up with only \${examHave()} exam-tier question(s); the A* gate wants \${MIN_EXAM_TIER}\`);
  }`;

const hits = src.split(oldBlock).length - 1;
if (hits !== 1) {
  console.error(`ABORT: old block found ${hits} times, expected exactly 1`);
  process.exit(1);
}
fs.writeFileSync(P, src.replace(oldBlock, newBlock));
console.log("patched OK");
