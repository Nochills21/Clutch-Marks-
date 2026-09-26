import "https://deno.land/std@0.224.0/dotenv/load.ts";
import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

const SUPABASE_URL = Deno.env.get("VITE_SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("VITE_SUPABASE_PUBLISHABLE_KEY")!;
const FN_URL = `${SUPABASE_URL}/functions/v1/study-planner`;

Deno.test("study-planner rejects requests with no Authorization header", async () => {
  const res = await fetch(FN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY },
    body: JSON.stringify({ hoursPerWeek: 5 }),
  });
  const body = await res.json();
  assertEquals(res.status, 401);
  assertEquals(body.error, "Unauthorized");
});

Deno.test("study-planner rejects requests with an invalid bearer token", async () => {
  const res = await fetch(FN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: "Bearer not-a-real-jwt",
    },
    body: JSON.stringify({ hoursPerWeek: 5 }),
  });
  await res.text();
  assertEquals(res.status, 401);
});

Deno.test("study-planner handles CORS preflight", async () => {
  const res = await fetch(FN_URL, { method: "OPTIONS" });
  await res.text();
  assertEquals(res.status, 200);
});
