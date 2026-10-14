const fs = require("fs");
const p = "frontend/src/components/dashboards/StudentDashboard.tsx";
const raw = fs.readFileSync(p, "utf8");
const crlf = raw.includes("\r\n");
let s = raw.replace(/\r\n/g, "\n");

const todays = "      <TodaysTasks />\n\n";
const gridStart = '      <div className="grid gap-8 lg:grid-cols-5">\n';
const quickStart = '        <div className="space-y-4 lg:col-span-3">\n';
const annStart = '        <div className="space-y-4 lg:col-span-2">\n';
const closeMark = "      </div>\n    </div>\n  );\n}";

const iTasks = s.indexOf(todays);
const iGrid = s.indexOf(gridStart);
const iQ = s.indexOf(quickStart);
const iA = s.indexOf(annStart);
const iClose = s.lastIndexOf(closeMark);
if ([iTasks, iGrid, iQ, iA, iClose].some((i) => i < 0)) throw new Error("marker not found");
if (!(iTasks < iGrid && iGrid < iQ && iQ < iA && iA < iClose)) throw new Error("unexpected order");

const quickBlock = s
  .slice(iQ, iA)
  .replace('space-y-4 lg:col-span-3"', 'space-y-4"')
  .split("\n")
  .map((l) => (l.startsWith("  ") ? l.slice(2) : l))
  .join("\n");
const annBlock = s.slice(iA, iClose);
const end = iClose + "      </div>\n".length;

const replacement =
  quickBlock +
  "\n" +
  gridStart +
  '        <div className="lg:col-span-3">\n' +
  "          <TodaysTasks />\n" +
  "        </div>\n" +
  annBlock +
  "      </div>\n";

s = s.slice(0, iTasks) + replacement + s.slice(end);
fs.writeFileSync(p, crlf ? s.replace(/\n/g, "\r\n") : s, "utf8");
console.log("ok, crlf =", crlf);
