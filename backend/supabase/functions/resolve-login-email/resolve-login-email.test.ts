import "https://deno.land/std@0.224.0/dotenv/load.ts";
import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.224.0/assert/mod.ts";

const SUPABASE_URL = Deno.env.get("VITE_SUPABASE_URL")!;
const ANON_KEY = Deno.env.get("VITE_SUPABASE_PUBLISHABLE_KEY")!;
const FN_URL = `${SUPABASE_URL}/functions/v1/resolve-login-email`;

// The rate limit is keyed on the caller's real IP (the platform rewrites
// x-forwarded-for), so every test in this file shares one budget.
const MAX_PER_WINDOW = 30;
const WINDOW_MS = 61_000;

const MISS_USERNAME = `zz-no-such-user-${crypto.randomUUID().slice(0, 8)}`;
const INVALID_USERNAME = "not a valid username!!";
// Syntactically valid identifier that may or may not exist — responses must
// look the same either way.
const REAL_USERNAME = "we-23";

let used = 0;

/** Wait out the rate-limit window when the next batch would exceed the cap. */
async function reserve(n: number) {
  if (used + n > MAX_PER_WINDOW - 2) {
    await new Promise((r) => setTimeout(r, WINDOW_MS));
    used = 0;
  }
  used += n;
}

type Probe = { status: number; body: Record<string, unknown>; ms: number };

async function probe(identifier: unknown): Promise<Probe> {
  const started = performance.now();
  const res = await fetch(FN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ANON_KEY}`,
      apikey: ANON_KEY,
    },
    body: JSON.stringify({ identifier }),
  });
  const text = await res.text();
  const ms = performance.now() - started;
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(text);
  } catch {
    body = { raw: text };
  }
  return { status: res.status, body, ms };
}

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

Deno.test("miss, invalid and empty identifiers return byte-identical bodies", async () => {
  await reserve(4);
  const probes = [
    await probe(MISS_USERNAME),
    await probe(INVALID_USERNAME),
    await probe(""),
    await probe(12345),
  ];

  for (const p of probes) {
    assertEquals(p.status, 200);
    assertEquals(p.body, { email: null });
  }

  const shapes = new Set(probes.map((p) => JSON.stringify(p.body)));
  assertEquals(shapes.size, 1, "responses must be indistinguishable");
});

Deno.test("response key set never changes between a hit and a miss", async () => {
  await reserve(2);
  const miss = await probe(MISS_USERNAME);
  const maybeHit = await probe(REAL_USERNAME);

  assertEquals(Object.keys(miss.body), ["email"]);
  assertEquals(Object.keys(maybeHit.body), ["email"]);
  assertEquals(maybeHit.status, 200);
  assert(
    maybeHit.body.email === null || typeof maybeHit.body.email === "string",
    "email must be null or a string",
  );
});

Deno.test("timing is uniform across valid, invalid and missing identifiers", async () => {
  const samples = 3;
  await reserve(samples * 3);

  const collect = async (identifier: unknown) => {
    const runs: number[] = [];
    for (let i = 0; i < samples; i++) runs.push((await probe(identifier)).ms);
    return runs;
  };

  const missTimes = await collect(MISS_USERNAME);
  const invalidTimes = await collect(INVALID_USERNAME);
  const validTimes = await collect(REAL_USERNAME);

  // The function enforces a ~250ms floor on every path.
  for (const t of [...missTimes, ...invalidTimes, ...validTimes]) {
    assert(t >= 230, `response returned too fast (${t.toFixed(0)}ms)`);
  }

  const medians = [median(missTimes), median(invalidTimes), median(validTimes)];
  const spread = Math.max(...medians) - Math.min(...medians);
  assert(
    spread < 300,
    `timing spread too large: ${spread.toFixed(0)}ms (${medians.map((m) => m.toFixed(0)).join(", ")})`,
  );
});

Deno.test("throttles past the per-client cap without changing the body", async () => {
  // Start from a clean window, then deliberately blow through the cap.
  await new Promise((r) => setTimeout(r, WINDOW_MS));
  used = 0;

  const results: Probe[] = [];
  for (let i = 0; i < MAX_PER_WINDOW + 3; i++) {
    results.push(await probe(MISS_USERNAME));
  }
  used = MAX_PER_WINDOW + 3;

  const throttled = results.filter((r) => r.status === 429);
  assert(throttled.length > 0, "expected 429s once the cap is exceeded");
  assertEquals(results[0].status, 200, "the first request must not be throttled");

  for (const r of throttled) {
    assertEquals(r.body, { email: null });
    assert(r.ms >= 230, "throttled responses must respect the timing floor too");
  }

  const shapes = new Set(results.map((r) => JSON.stringify(r.body)));
  assertEquals(shapes.size, 1, "throttled bodies must match normal bodies");
});

Deno.test("non-POST methods do not leak account information", async () => {
  const res = await fetch(`${FN_URL}?identifier=${REAL_USERNAME}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${ANON_KEY}`, apikey: ANON_KEY },
  });
  const body = await res.json().catch(() => ({}));
  assertEquals(res.status, 405);
  assertEquals(body, { email: null });
});
