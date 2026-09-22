// Extract env values with full quote handling. Prints key lengths for sanity.
const fs = require("fs");
const env = fs.readFileSync(".env", "utf8");
function envVal(name) {
  const m = env.match(new RegExp(`^${name}=(.*)$`, "m"));
  if (!m) return null;
  let v = m[1].trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
  return v;
}
module.exports = { envVal };
