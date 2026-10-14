const fs = require("fs");
const p = "./.freebuff/objectives/robotics-ai.cjs";
const lines = fs.readFileSync(p, "utf8").split("\n");
// File lines 326-331 (0-based 325-330) hold the corrupted block; verify anchors first.
if (lines[325].indexOf('options: ["", ],') < 0) throw new Error("start anchor moved: " + JSON.stringify(lines[325]));
if (lines[330].trim() !== "],") throw new Error("end anchor moved: " + JSON.stringify(lines[330]));
const fixed =
  "      options: [" +
  JSON.stringify("The user interface asked; the knowledge base answered directly") +
  ", " +
  JSON.stringify("Machine learning retrained itself on the car") +
  ", " +
  JSON.stringify("The inference engine matched the noise answers against knowledge-base rules") +
  ", " +
  JSON.stringify("The sensors replaced the alternator") +
  "],";
lines.splice(325, 6, fixed);
fs.writeFileSync(p, lines.join("\n"));
console.log("repaired");
