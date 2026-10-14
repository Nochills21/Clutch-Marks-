const fs = require("fs");
const p = ".freebuff/seed-objectives-batch.cjs";
const L = fs.readFileSync(p, "utf8").split("\n");
console.log("old116:", JSON.stringify(L[115].slice(0, 80)));
L[115] = "      `insert into public.quizzes (id, topic_id, title, description, is_published, exam_type)";
L.splice(
  116,
  0,
  "values ('00000000-0000-0000-0000-000000000000', ${T}, ${q(QUIZ_TITLE)}, ${dq(QUIZ_DESCRIPTION, \"desc\")}, true, 'quiz');`,",
);
fs.writeFileSync(p, L.join("\n"));
console.log("patched");
