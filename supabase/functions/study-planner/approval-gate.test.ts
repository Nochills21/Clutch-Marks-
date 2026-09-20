// Integration test: verify the approval gate blocks unapproved users
// across every edge function that touches quiz/study data.
//
// Requires SUPABASE_SERVICE_ROLE_KEY in your .env so the test can:
//   1. Create a confirmed-but-unapproved user via the admin API
//   2. Sign that user in to obtain a real JWT
//   3. Clean the user up afterwards
// Without it the tests skip with a clear explanation (the approval gate
// can't be exercised against a real user otherwise — fresh signups require
// email confirmation and have no session).
import "https://deno.land/std@0.224.0/dotenv/load.ts";
import { assert, assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const SUPABASE_URL = Deno.env.get("VITE_SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("VITE_SUPABASE_PUBLISHABLE_KEY")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const FNS = {
  studyPlanner: `${SUPABASE_URL}/functions/v1/study-planner`,
  quizFeedback: `${SUPABASE_URL}/functions/v1/quiz-feedback`,
  manageAccounts: `${SUPABASE_URL}/functions/v1/manage-accounts`,
  promoteAdmin: `${SUPABASE_URL}/functions/v1/promote-admin`,
};

interface UnapprovedUser {
  userId: string;
  token: string;
  cleanup: () => Promise<void>;
}

async function createUnapprovedUser(): Promise<UnapprovedUser> {
  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY!);
  const username = `test-unapproved-${crypto.randomUUID().slice(0, 8)}`;
  const email = `${username}@igcse-platform.local`;
  const password = `Pw_${crypto.randomUUID()}`;

  // email_confirm:true lets us sign in immediately. handle_new_user trigger
  // still inserts a user_roles row with is_approved=false — exactly what we want.
  const { data: created, error: createError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: "Test Unapproved", username, role: "student" },
  });
  if (createError || !created.user) {
    throw new Error(`admin.createUser failed: ${createError?.message}`);
  }
  const userId = created.user.id;

  // Defensive: ensure the trigger left this account unapproved.
  const { data: roleRow } = await admin
    .from("user_roles")
    .select("is_approved, role")
    .eq("user_id", userId)
    .maybeSingle();
  assertEquals(roleRow?.is_approved, false, "fixture should be unapproved");
  assertEquals(roleRow?.role, "student", "fixture should default to student");

  // Sign in to get a real session token.
  const anon = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const { data: signIn, error: signInError } = await anon.auth.signInWithPassword({
    email,
    password,
  });
  if (signInError || !signIn.session) {
    await admin.auth.admin.deleteUser(userId).catch(() => {});
    throw new Error(`signIn failed: ${signInError?.message ?? "no session"}`);
  }

  return {
    userId,
    token: signIn.session.access_token,
    cleanup: async () => {
      await admin.auth.admin.deleteUser(userId).catch(() => {});
    },
  };
}

async function callFn(url: string, token: string, body: unknown): Promise<Response> {
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
}

// Share a single unapproved-user fixture across all four tests in this file.
let cached: Promise<UnapprovedUser> | null = null;
const getUser = () => (cached ??= createUnapprovedUser());

function skipIfNoServiceRole(name: string, fn: (u: UnapprovedUser) => Promise<void>) {
  Deno.test({
    name,
    ignore: !SERVICE_ROLE_KEY,
    async fn() {
      const u = await getUser();
      await fn(u);
    },
  });
}

skipIfNoServiceRole(
  "study-planner blocks unapproved users with 403",
  async ({ token }) => {
    const res = await callFn(FNS.studyPlanner, token, {
      hoursPerWeek: 5,
      quizPerformance: "x",
      upcomingHomework: "x",
      weakTopics: "x",
      targetExamDate: "",
    });
    const body = await res.json();
    assertEquals(res.status, 403, `got ${res.status}: ${JSON.stringify(body)}`);
    assert(
      typeof body.error === "string" && /approv/i.test(body.error),
      `expected approval error, got: ${JSON.stringify(body)}`,
    );
  },
);

skipIfNoServiceRole(
  "quiz-feedback blocks unapproved users with 403",
  async ({ token }) => {
    const res = await callFn(FNS.quizFeedback, token, {
      quizId: "00000000-0000-0000-0000-000000000000",
      answers: {},
    });
    const body = await res.json();
    assertEquals(res.status, 403, `got ${res.status}: ${JSON.stringify(body)}`);
    assert(
      typeof body.error === "string" && /approv/i.test(body.error),
      `expected approval error, got: ${JSON.stringify(body)}`,
    );
  },
);

skipIfNoServiceRole(
  "manage-accounts blocks unapproved (non-admin) users with 403",
  async ({ token }) => {
    const res = await callFn(FNS.manageAccounts, token, {
      action: "approve",
      user_id: "00000000-0000-0000-0000-000000000000",
    });
    const body = await res.json();
    assertEquals(res.status, 403, `got ${res.status}: ${JSON.stringify(body)}`);
    assert(
      typeof body.error === "string" && /admin/i.test(body.error),
      `expected admin-only error, got: ${JSON.stringify(body)}`,
    );
  },
);

skipIfNoServiceRole(
  "promote-admin blocks unapproved (non-admin) users with 403",
  async ({ token }) => {
    const res = await callFn(FNS.promoteAdmin, token, {
      email: "anyone@igcse-platform.local",
    });
    const body = await res.json();
    assertEquals(res.status, 403, `got ${res.status}: ${JSON.stringify(body)}`);
    assert(
      typeof body.error === "string" && /admin/i.test(body.error),
      `expected admin-only error, got: ${JSON.stringify(body)}`,
    );
  },
);

// Cleanup hook — runs once, after the four tests above.
Deno.test({
  name: "cleanup: delete fixture user",
  ignore: !SERVICE_ROLE_KEY,
  sanitizeOps: false,
  sanitizeResources: false,
  async fn() {
    if (cached) {
      const u = await cached;
      await u.cleanup();
    }
  },
});
