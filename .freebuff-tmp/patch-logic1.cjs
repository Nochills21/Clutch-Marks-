const fs = require("fs");
const p = "./.freebuff/objectives/logic-gates-boolean-logic.cjs";
let s = fs.readFileSync(p, "utf8");
const oldBlock = [
  '      q: "A circuit outputs (A NAND B) NOR (A AND B). Give the output column for input rows 00, 01, 10, 11.",',
  '      options: ["0, 1, 1, 1", "1, 0, 0, 0", "0, 0, 0, 1", "1, 1, 1, 0"],',
  "      correct: 0,",
  "      explanation:",
  '        "Marks as awarded: NAND column 1,1,1,0 and AND column 0,0,0,1 [1]; NOR of the two gives 0,1,1,1 [1]. The second option is the NAND column alone; the third is the AND column alone; the last inverts the NOR.",',
].join("\n");
const newBlock = [
  '      q: "A circuit outputs (A NOR B) OR (A AND B). Give the output column for input rows 00, 01, 10, 11.",',
  '      options: ["1, 0, 0, 1", "0, 1, 1, 0", "1, 1, 1, 1", "0, 0, 0, 0"],',
  "      correct: 0,",
  "      explanation:",
  '        "Marks as awarded: NOR column 1,0,0,0 and AND column 0,0,0,1 [1]; OR of the two gives 1,0,0,1 [1]. The second option inverts every row; the third is stuck at 1; the last copies neither gate.",',
].join("\n");
if (s.indexOf(oldBlock) < 0) {
  console.log("anchor missing");
  process.exit(1);
}
s = s.split(oldBlock).join(newBlock);
fs.writeFileSync(p, s);
console.log("exam fixed");
