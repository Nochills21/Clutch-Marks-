import { createClient } from "https://esm.sh/@supabase/supabase-js@2.97.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "Not authenticated" }, 401);

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Verify caller
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user: caller } } = await userClient.auth.getUser();
    if (!caller) return json({ error: "Not authenticated" }, 401);

    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    // Check caller is admin AND approved
    const { data: callerRole } = await adminClient
      .from("user_roles")
      .select("role")
      .eq("user_id", caller.id)
      .eq("role", "admin")
      .eq("is_approved", true)
      .single();
    if (!callerRole) return json({ error: "Only approved admins can manage accounts" }, 403);

    const { action, user_id, username, full_name, password, role, email: emailInput } =
      await req.json();

    // ── Audit attribution ──
    // The service-role writes below bypass RLS triggers that would log actor_id = null,
    // so each mutation is attributed explicitly to the verified admin caller.
    const callerProfile = await adminClient
      .from("profiles")
      .select("username")
      .eq("user_id", caller.id)
      .single();
    const audit = (
      p_action: string,
      p_entity: string,
      p_entity_id: string | null,
      p_entity_label: string | null,
      p_details: Record<string, unknown>,
    ) =>
      adminClient.rpc("audit_admin_action", {
        p_action,
        p_entity,
        p_entity_id,
        p_entity_label,
        p_details,
        p_actor_id: caller.id,
        p_actor_username: callerProfile.data?.username ?? caller.email ?? null,
      });

    const USERNAME_RE = /^[a-zA-Z0-9._-]{3,32}$/;
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // ── Password policy ──
    // GoTrue enforces the global minimum length (6). Everything stronger than
    // that is enforced here so it can differ per role: admins must use 12+
    // characters with full character variety; every new/changed password is
    // additionally screened against known breaches (HaveIBeenPwned,
    // k-anonymity range API — only a 5-char hash prefix ever leaves this box).
    const PASSWORD_GROUPS: Array<[RegExp, string]> = [
      [/[a-z]/, "a lowercase letter"],
      [/[A-Z]/, "an uppercase letter"],
      [/[0-9]/, "a number"],
      [/[^A-Za-z0-9]/, "a symbol"],
    ];
    const sha1Hex = async (s: string): Promise<string> => {
      const digest = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(s));
      return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();
    };
    const isBreachedPassword = async (password: string): Promise<boolean> => {
      try {
        const hash = await sha1Hex(password);
        const res = await fetch(`https://api.pwnedpasswords.com/range/${hash.slice(0, 5)}`);
        if (!res.ok) return false; // fail open if the breach service is down
        const body = await res.text();
        return body.split("\n").some((line) => line.trim().split(":")[0] === hash.slice(5));
      } catch {
        return false;
      }
    };
    const passwordPolicyError = async (password: unknown, role: "admin" | "other"): Promise<string | null> => {
      const min = role === "admin" ? 12 : 8;
      if (typeof password !== "string" || password.length < min) {
        return role === "admin"
          ? `Admin passwords must be at least ${min} characters.`
          : `Password must be at least ${min} characters.`;
      }
      const missing = PASSWORD_GROUPS.filter(([re]) => !re.test(password)).map(([, label]) => label);
      if (missing.length > 0) return `Password must contain ${missing.join(", ")}.`;
      if (await isBreachedPassword(password)) {
        return "That password has appeared in known data breaches. Choose a different one.";
      }
      return null;
    };
    const targetRoleFor = async (userId: string): Promise<"admin" | "other"> => {
      const { data } = await adminClient
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();
      return data ? "admin" : "other";
    };

    // ── APPROVE ──
    if (action === "approve") {
      if (!user_id) return json({ error: "user_id required" }, 400);
      const { data: targetProfile } = await adminClient
        .from("profiles")
        .select("username, full_name")
        .eq("user_id", user_id)
        .single();
      const { error } = await adminClient
        .from("user_roles")
        .update({ is_approved: true })
        .eq("user_id", user_id);
      if (error) return json({ error: error.message }, 500);
      await audit("approve", "user", user_id, targetProfile?.username ?? targetProfile?.full_name ?? null, {});
      return json({ success: true });
    }

    // ── REJECT / DELETE ──
    if (action === "reject" || action === "delete") {
      if (!user_id) return json({ error: "user_id required" }, 400);
      // Capture identity before the cascade erases profile/role rows.
      const { data: target } = await adminClient
        .from("profiles")
        .select("username, full_name, email")
        .eq("user_id", user_id)
        .single();
      const { error } = await adminClient.auth.admin.deleteUser(user_id);
      if (error) return json({ error: error.message }, 500);
      await audit(action === "delete" ? "delete" : "reject", "user", null, target?.username ?? target?.email ?? user_id, {
        target_email: target?.email ?? null,
        target_full_name: target?.full_name ?? null,
      });
      return json({ success: true });
    }

    // ── CREATE ──
    if (action === "create") {
      if (!emailInput || !password || !full_name) {
        return json({ error: "email, full_name, and password are required" }, 400);
      }

      // Email-first identity: a real email is required; username is optional
      // (only useful for admins who want username login).
      const cleanEmail = typeof emailInput !== "undefined" && emailInput ? String(emailInput).toLowerCase().trim() : "";
      if (!cleanEmail || !EMAIL_RE.test(cleanEmail)) {
        return json({ error: "A valid email is required" }, 400);
      }
      const cleanUsername = username ? String(username).toLowerCase().trim() : "";
      if (cleanUsername && !USERNAME_RE.test(cleanUsername)) {
        return json({ error: "Username must be 3-32 characters (letters, numbers, . _ -)" }, 400);
      }
      const userRole = role === "admin" ? "admin" : "student";

      // Enforce the per-role password policy before creating anything.
      const pwError = await passwordPolicyError(password, userRole === "admin" ? "admin" : "other");
      if (pwError) return json({ error: pwError }, 400);

      // Check if email or username is already taken
      const { data: existingEmail } = await adminClient
        .from("profiles")
        .select("id")
        .ilike("email", cleanEmail)
        .maybeSingle();
      if (existingEmail) return json({ error: "Email already in use" }, 409);
      if (cleanUsername) {
        const { data: existingUname } = await adminClient
          .from("profiles")
          .select("id")
          .eq("username", cleanUsername)
          .maybeSingle();
        if (existingUname) return json({ error: "Username already taken" }, 409);
      }

      const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
        email: cleanEmail,
        password,
        email_confirm: true,
        user_metadata: {
          full_name,
          ...(cleanUsername ? { username: cleanUsername } : {}),
          // Never publish 'admin' through metadata — the trigger ignores it.
          ...(userRole === "student" ? { role: userRole } : {}),
        },
      });
      if (createError) return json({ error: createError.message }, 500);

      // The signup trigger seeds a 'student' row; set the requested role and
      // auto-approve (admin-created accounts bypass the approval queue).
      const { error: roleErr } = await adminClient
        .from("user_roles")
        .update({ role: userRole, is_approved: true })
        .eq("user_id", newUser.user.id);
      if (roleErr) return json({ error: roleErr.message }, 500);
      // Trigger row not yet visible (race) — insert it.
      const { data: roleRow } = await adminClient
        .from("user_roles")
        .select("id")
        .eq("user_id", newUser.user.id)
        .maybeSingle();
      if (!roleRow) {
        const { error: insErr } = await adminClient
          .from("user_roles")
          .insert({ user_id: newUser.user.id, role: userRole, is_approved: true });
        if (insErr) return json({ error: insErr.message }, 500);
      }

      await audit("create", "user", newUser.user.id, cleanEmail, { role: userRole, username: cleanUsername || null });
      return json({ success: true, user_id: newUser.user.id });
    }

    // ── SET IDENTITY (username / email) — admin only, server validated ──
    if (action === "set_identity") {
      if (!user_id) return json({ error: "user_id required" }, 400);
      if (username === undefined && emailInput === undefined) {
        return json({ error: "username or email required" }, 400);
      }

      const profileUpdates: Record<string, unknown> = {};
      const authUpdates: Record<string, unknown> = {};

      if (username !== undefined) {
        const clean = typeof username === "string" ? username.toLowerCase().trim() : "";
        if (clean === "") {
          profileUpdates.username = null;
        } else {
          if (!USERNAME_RE.test(clean)) {
            return json({ error: "Username must be 3-32 characters (letters, numbers, . _ -)" }, 400);
          }
          const { data: taken } = await adminClient
            .from("profiles")
            .select("user_id")
            .ilike("username", clean)
            .neq("user_id", user_id)
            .maybeSingle();
          if (taken) return json({ error: "Username already taken" }, 409);
          profileUpdates.username = clean;
        }
      }

      if (emailInput !== undefined) {
        const cleanEmail = typeof emailInput === "string" ? emailInput.toLowerCase().trim() : "";
        if (!EMAIL_RE.test(cleanEmail)) return json({ error: "Invalid email address" }, 400);
        const { data: taken } = await adminClient
          .from("profiles")
          .select("user_id")
          .ilike("email", cleanEmail)
          .neq("user_id", user_id)
          .maybeSingle();
        if (taken) return json({ error: "Email already in use" }, 409);
        profileUpdates.email = cleanEmail;
        authUpdates.email = cleanEmail;
      }

      if (Object.keys(authUpdates).length > 0) {
        const { error: authErr } = await adminClient.auth.admin.updateUserById(user_id, authUpdates);
        if (authErr) return json({ error: authErr.message }, 500);
      }

      const { error } = await adminClient
        .from("profiles")
        .update(profileUpdates)
        .eq("user_id", user_id);
      if (error) return json({ error: error.message }, 500);
      await audit("update", "user", user_id, (profileUpdates.username as string) ?? (profileUpdates.email as string) ?? null, {
        set_username: profileUpdates.username ?? null,
        set_email: profileUpdates.email ?? null,
      });
      return json({ success: true });
    }

    // ── UPDATE PASSWORD (optional username management for admins) ──
    if (action === "update_credentials") {
      if (!user_id) return json({ error: "user_id required" }, 400);
      const updates: Record<string, unknown> = {};
      if (username !== undefined) {
        const clean = username === null ? "" : String(username).toLowerCase().trim();
        if (clean) {
          if (!USERNAME_RE.test(clean)) {
            return json({ error: "Username must be 3-32 characters (letters, numbers, . _ -)" }, 400);
          }
          const { data: taken } = await adminClient
            .from("profiles")
            .select("user_id")
            .ilike("username", clean)
            .neq("user_id", user_id)
            .maybeSingle();
          if (taken) return json({ error: "Username already taken" }, 409);
        }
        const { error: uErr } = await adminClient
          .from("profiles")
          .update({ username: clean || null })
          .eq("user_id", user_id);
        if (uErr) return json({ error: uErr.message }, 500);
      }
      if (password) {
        // Grandfathered minimum stays 8 for self-service changes on non-admin
        // accounts; admins (and any password an admin sets for someone) must
        // meet the stronger admin policy.
        const roleOfTarget = await targetRoleFor(user_id);
        const pwError = await passwordPolicyError(password, roleOfTarget);
        if (pwError) return json({ error: pwError }, 400);
        updates.password = password;
      }
      if (!password && username === undefined) return json({ error: "Nothing to update" }, 400);
      const { error } = await adminClient.auth.admin.updateUserById(user_id, updates);
      if (error) return json({ error: error.message }, 500);
      const { data: labelRow } = await adminClient
        .from("profiles")
        .select("email")
        .eq("user_id", user_id)
        .maybeSingle();
      await audit("update", "user_credentials", user_id, labelRow?.email ?? null, {
        password_changed: Boolean(password),
        username_changed: username !== undefined,
      });
      return json({ success: true });
    }

    return json({ error: "Invalid action" }, 400);
  } catch (e) {
    return json({ error: e.message }, 500);
  }
});
