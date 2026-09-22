// Render original vs watermarked page 1 and diff pixels. Delete after use.
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fs = require("fs");
const { createCanvas } = require("@napi-rs/canvas");
const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");

async function renderPage1(file, out) {
  const doc = await pdfjs.getDocument({ data: new Uint8Array(fs.readFileSync(file)), useSystemFonts: true }).promise;
  const page = await doc.getPage(1);
  const viewport = page.getViewport({ scale: 1.2 });
  const canvas = createCanvas(viewport.width, viewport.height);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvasContext: ctx, viewport }).promise;
  fs.writeFileSync(out, canvas.toBuffer("image/png"));
  return { w: canvas.width, h: canvas.height, buf: ctx.getImageData(0, 0, canvas.width, canvas.height).data };
}

const a = await renderPage1("out/a2-binomial-questions.pdf", "../wm-orig.png");
const b = await renderPage1("../wm.pdf", "../wm-marked.png");
if (a.buf.length !== b.buf.length) { console.log("size mismatch"); process.exit(0); }
let diff = 0, maxDelta = 0;
for (let i = 0; i < a.buf.length; i += 4) {
  const d = Math.abs(a.buf[i] - b.buf[i]) + Math.abs(a.buf[i + 1] - b.buf[i + 1]) + Math.abs(a.buf[i + 2] - b.buf[i + 2]);
  if (d > 12) diff++;
  if (d > maxDelta) maxDelta = d;
}
const px = a.w * a.h;
console.log(`page ${a.w}x${a.h}: ${diff} pixels changed (${((diff / px) * 100).toFixed(2)}%), maxDelta ${maxDelta}`);
console.log(diff > px * 0.005 ? "WATERMARK VISUALLY PRESENT" : "no visible change - investigate");
