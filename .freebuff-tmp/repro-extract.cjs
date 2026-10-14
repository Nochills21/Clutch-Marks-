// Local replica of the worker's PDF extractor (logic from
// supabase/functions/ai-correction/index.ts) to diagnose why the staged
// CS mark scheme yields <200 chars.
const fs = require("fs");

// The worker joins runs with U+0000 so line breaks survive normalisation.
const SEP = String.fromCharCode(0);

let inflateLogged = 0;
async function inflate(bytes) {
  try {
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate"));
    const buf = new Uint8Array(await new Response(stream).arrayBuffer());
    return new TextDecoder("latin1").decode(buf);
  } catch (e) {
    if (inflateLogged < 3) {
      inflateLogged++;
      console.log("inflate error:", e && e.message, "chunkLen:", bytes.length,
        "head:", Array.from(bytes.slice(0, 6)).map((b) => b.toString(16)).join(" "));
    }
    return null;
  }
}

function unescapePdfString(raw) {
  return raw.replace(/\\([nrtbf()\\]|[0-7]{1,3})/g, (_m, esc) => {
    switch (esc) {
      case "n": return "\n";
      case "r": return "\r";
      case "t": return "\t";
      case "b": return "\b";
      case "f": return "\f";
      case "(": return "(";
      case ")": return ")";
      case "\\": return "\\";
      default: return String.fromCharCode(parseInt(esc, 8));
    }
  });
}

function textFromTextBlock(block) {
  const out = [];
  const operator = /\[([\s\S]*?)\]\s*TJ|\(((?:\\.|[^\\()])*)\)\s*Tj|\bT[dD*]\b/g;
  let match;
  while ((match = operator.exec(block)) !== null) {
    const whole = match[0];
    const tjBody = match[1];
    const tjString = match[2];
    if (tjBody !== undefined) {
      const runs = tjBody.match(/\((?:\\.|[^\\()])*\)/g) || [];
      out.push(runs.map((literal) => unescapePdfString(literal.slice(1, -1))).join(""));
    } else if (tjString !== undefined) {
      out.push(unescapePdfString(tjString));
    } else if (whole === "Td" || whole === "TD" || whole === "T*") {
      out.push("\n");
    }
  }
  return out;
}

async function eachTextStream(bytes, visit, stats) {
  const STREAM = [0x73, 0x74, 0x72, 0x65, 0x61, 0x6d];
  const ENDSTREAM = [0x65, 0x6e, 0x64, 0x73, 0x74, 0x72, 0x65, 0x61, 0x6d];
  const indexOf = (from, needle) => {
    for (let i = from; i + needle.length <= bytes.length; i += 1) {
      let hit = true;
      for (let j = 0; j < needle.length; j += 1) {
        if (bytes[i + j] !== needle[j]) { hit = false; break; }
      }
      if (hit) return i;
    }
    return -1;
  };
  let searchFrom = 0;
  for (;;) {
    let start = indexOf(searchFrom, STREAM);
    while (start !== -1 && bytes[start + STREAM.length] !== 0x0d && bytes[start + STREAM.length] !== 0x0a) {
      start = indexOf(start + 1, STREAM);
    }
    if (start === -1) break;
    const end = indexOf(start, ENDSTREAM);
    if (end === -1) break;
    searchFrom = end + ENDSTREAM.length;
    let dataStart = start + STREAM.length;
    if (bytes[dataStart] === 0x0d) dataStart += 1;
    if (bytes[dataStart] === 0x0a) dataStart += 1;
    let dataEnd = end;
    if (bytes[dataEnd - 1] === 0x0a) dataEnd -= 1;
    if (bytes[dataEnd - 1] === 0x0d) dataEnd -= 1;
    if (dataEnd <= dataStart) continue;
    const chunk = bytes.subarray(dataStart, dataEnd);
    const inflated = await inflate(chunk);
    const decoded = inflated !== null ? inflated : new TextDecoder("latin1").decode(chunk);
    stats.total++;
    if (inflated === null) stats.inflateFail++;
    if (decoded.indexOf("BT") === -1) {
      stats.noBT++;
      continue;
    }
    stats.withBT++;
    visit(decoded);
  }
}

async function extractPdfText(bytes, stats) {
  const pieces = [];
  const collector = (decoded) => {
    const blocks = decoded.match(/BT[\s\S]*?ET/g) || [];
    for (const block of blocks) {
      const parts = textFromTextBlock(block);
      for (const p of parts) pieces.push(p);
    }
  };
  await eachTextStream(bytes, collector, stats);
  const sepRe1 = new RegExp(SEP + "*\\n" + SEP + "*", "g");
  const sepRe2 = new RegExp(SEP, "g");
  return pieces
    .join(SEP)
    .replace(sepRe1, "\n")
    .replace(sepRe2, "")
    .split("\n")
    .map((line) => line.replace(/[ \t]{2,}/g, " ").trim())
    .filter((line) => line.length > 0)
    .join("\n")
    .trim();
}

(async () => {
  const file = process.argv[2];
  const bytes = new Uint8Array(fs.readFileSync(file));
  const stats = { total: 0, inflateFail: 0, noBT: 0, withBT: 0 };
  const text = await extractPdfText(bytes, stats);
  console.log("stats:", JSON.stringify(stats));
  console.log("worker-extracted chars:", text.length);
  console.log("--- head:", JSON.stringify(text.slice(0, 300)));
})();
