const fs = require("fs");

async function main() {
  const bytes = new Uint8Array(fs.readFileSync(".freebuff-tmp/cs-ms.pdf"));
  const raw = new TextDecoder("latin1").decode(bytes);
  const start = raw.indexOf("stream", 0);
  const end = raw.indexOf("endstream", start);
  let dataStart = start + 6;
  if (raw[dataStart] === "\r") dataStart += 1;
  if (raw[dataStart] === "\n") dataStart += 1;
  let dataEnd = end;
  if (raw[dataEnd - 1] === "\n") dataEnd -= 1;
  if (raw[dataEnd - 1] === "\r") dataEnd -= 1;
  const chunk = new Uint8Array(dataEnd - dataStart);
  for (let i = dataStart; i < dataEnd; i += 1) chunk[i - dataStart] = raw.charCodeAt(i);
  console.log("chunk len:", chunk.length);

  // Path A: exact replica path.
  try {
    const stream = new Blob([chunk]).stream().pipeThrough(new DecompressionStream("deflate"));
    const buf = new Uint8Array(await new Response(stream).arrayBuffer());
    console.log("A (Blob) OK:", buf.length);
  } catch (e) {
    console.log("A (Blob) FAIL:", JSON.stringify(e && e.message), e && e.constructor && e.constructor.name);
  }

  // Path B: direct construct.
  try {
    const ds = new DecompressionStream("deflate");
    const w = ds.writable.getWriter();
    await w.write(chunk);
    await w.close();
    const out = [];
    const r = ds.readable.getReader();
    for (;;) {
      const { done, value } = await r.read();
      if (done) break;
      out.push(value);
    }
    const total = out.reduce((n, v) => n + v.length, 0);
    console.log("B (direct) OK:", total);
  } catch (e) {
    console.log("B (direct) FAIL:", JSON.stringify(e && e.message), e && e.constructor && e.constructor.name);
  }

  // Path C: zlib reference.
  try {
    const d = require("zlib").inflateSync(Buffer.from(chunk));
    console.log("C (zlib) OK:", d.length);
  } catch (e) {
    console.log("C (zlib) FAIL:", e.message);
  }
}

main();
