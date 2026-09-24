// Renders public/og.png — the branded 1200x630 social card.
// Run with: bun scripts/make-og-image.mjs
//
// The previous og:image was a signed Google Storage URL with an expiry date, so
// every social preview would have broken once it lapsed. This generates a
// committed asset instead.
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const out = path.join(root, "public", "og.png");
const logo = path.join(root, "public", "icon-512.png");

const W = 1200;
const H = 630;

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#F5B301"/>
      <stop offset="1" stop-color="#E8862E"/>
    </linearGradient>
    <radialGradient id="bloom" cx="50%" cy="0%" r="70%">
      <stop offset="0" stop-color="#E8B01E" stop-opacity="0.20"/>
      <stop offset="1" stop-color="#E8B01E" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
      <path d="M56 0H0V56" fill="none" stroke="#E8B01E" stroke-opacity="0.06" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="#0B0B0D"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#bloom)"/>

  <rect x="0" y="0" width="${W}" height="3" fill="url(#gold)"/>

  <text x="88" y="150" fill="#8A8A93" font-family="Inter, Helvetica, Arial, sans-serif"
        font-size="21" font-weight="600" letter-spacing="5">MATHS · PHYSICS · COMPUTER SCIENCE</text>

  <text x="86" y="285" fill="#F2EFE9" font-family="Georgia, 'Times New Roman', serif"
        font-size="94" font-weight="600" letter-spacing="-2">Clutch Marks</text>

  <rect x="88" y="330" width="120" height="3" fill="url(#gold)"/>

  <text x="88" y="410" fill="#B9B4AC" font-family="Inter, Helvetica, Arial, sans-serif"
        font-size="34" font-weight="400">Revision notes, topic questions with instant</text>
  <text x="88" y="458" fill="#B9B4AC" font-family="Inter, Helvetica, Arial, sans-serif"
        font-size="34" font-weight="400">marking, and a full past-paper archive.</text>

  <text x="88" y="552" fill="#E8B01E" font-family="Inter, Helvetica, Arial, sans-serif"
        font-size="26" font-weight="600" letter-spacing="1">IGCSE  ·  AS  ·  A LEVEL</text>
</svg>
`;

const logoBuffer = await sharp(logo).resize(150, 150).png().toBuffer();

await sharp(Buffer.from(svg))
  .composite([{ input: logoBuffer, top: 60, left: W - 210 }])
  .png()
  .toFile(out);

console.log(`wrote ${path.relative(root, out)} (${W}x${H})`);
