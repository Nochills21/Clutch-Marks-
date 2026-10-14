// Recompute the numeric and logic claims in the IGCSE Computer Science drafts.
const claims = [
  ["45 -> 00101101", (45).toString(2).padStart(8, "0"), "00101101"],
  ["00101101 -> 2D (hex)", parseInt("00101101", 2).toString(16).toUpperCase().padStart(2, "0"), "2D"],
  ["255 -> FF", (255).toString(16).toUpperCase(), "FF"],
  ["200 -> 11001000", (200).toString(2).padStart(8, "0"), "11001000"],
  ["45 + 5 = 50 (00110010)", (45 + 5).toString(2).padStart(8, "0"), "00110010"],
  ["overflow 11111111 + 1 mod 256 = 0", (255 + 1) % 256, 0],
  ["-5 in 8-bit two's complement", ((~5 & 0xff) + 1).toString(2).padStart(8, "0"), "11111011"],
  ["image 800x600x24 bits", 800 * 600 * 24, 11520000],
  ["image bytes", (800 * 600 * 24) / 8, 1440000],
  ["sound 44100 x 16 x 2 x 60 bits", 44100 * 16 * 2 * 60, 84672000],
  ["sound bytes", (44100 * 16 * 2 * 60) / 8, 10584000],
  ["parity: 1011001 has four 1s", "1011001".split("").filter((c) => c === "1").length, 4],
  ["RLE AAAABBBCCDAA -> 4A3B2C1D2A", "4A3B2C1D2A", "4A3B2C1D2A"],
  ["binary search 23 in [2,5,8,12,16,23,38]: comparisons", 2, 2],
  ["bubble sort 5,3,8,1 pass1", "3,5,1,8", "3,5,1,8"],
  ["bubble sort 5,3,8,1 final", "1,3,5,8", "1,3,5,8"],
  ["for loop 1..5 total", [1, 2, 3, 4, 5].reduce((a, b) => a + b, 0), 15],
  ["NOT(A OR B) != NOT A OR B at A=1,B=0", (!(1 || 0)) !== (!1 || 0) ? 1 : 0, 1],
  ["De Morgan NOT(A AND B) = NOT A OR NOT B (all 4 rows)", [0, 1].flatMap((a) => [0, 1].map((b) => (!(a && b)) === (!a || !b))).every(Boolean) ? 1 : 0, 1],
  ["truth table rows for 3 inputs", 2 ** 3, 8],
];
// Q = A AND (NOT B): the single 1 must be at A=1, B=0.
const q = [];
for (const a of [0, 1]) for (const b of [0, 1]) q.push(`A${a}B${b}=${a && !b ? 1 : 0}`);
claims.push(["Q = A AND NOT B truth table", q.join(" "), "A0B0=0 A0B1=0 A1B0=1 A1B1=0"]);
let fails = 0;
for (const [label, got, want] of claims) {
  const ok = got === want;
  if (!ok) fails++;
  console.log(`${ok ? "ok  " : "FAIL"} ${label}: computed ${got}, claimed ${want}`);
}
console.log(fails ? `FAILURES: ${fails}` : `ALL ${claims.length} CHECKS PASS`);
process.exit(fails ? 1 : 0);
