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
      if (!username || !password || !full_name) {
        return json({ error: "username, full_name, and password are required" }, 400);
      }

      const cleanUsername = username.toLowerCase().trim();
      const email = `${cleanUsername}@igcse-platform.local`;
      const userRole = role || "student";

      // Check if username already exists
      const { data: existing } = await adminClient
        .from("profiles")
        .select("id")
        .eq("username", cleanUsername)
        .single();
      if (existing) return json({ error: "Username already taken" }, 409);

      const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name, username: cleanUsername, role: userRole },
      });
      if (createError) return json({ error: createError.message }, 500);

      // Auto-approve admin-created accounts
      await adminClient
        .from("user_roles")
        .update({ is_approved: true })
        .eq("user_id", newUser.user.id);

      await audit("create", "user", newUser.user.id, cleanUsername, { role: userRole });
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

    // ── UPDATE EMAIL & PASSWORD ──
    if (action === "update_credentials") {
      if (!user_id) return json({ error: "user_id required" }, 400);
      const updates: Record<string, unknown> = {};
      let newUsername: string | null = null;
      if (username) {
        newUsername = String(username).toLowerCase().trim();
        if (!USERNAME_RE.test(newUsername)) {
          return json({ error: "Username must be 3-32 characters (letters, numbers, . _ -)" }, 400);
        }
        const { data: taken } = await adminClient
          .from("profiles")
          .select("user_id")
          .ilike("username", newUsername)
          .neq("user_id", user_id)
          .maybeSingle();
        if (taken) return json({ error: "Username already taken" }, 409);
        updates.email = `${newUsername}@igcse-platform.local`;
      }
      if (password) {
        if (typeof password !== "string" || password.length < 8) {
          return json({ error: "Password must be at least 8 characters" }, 400);
        }
        updates.password = password;
      }
      if (Object.keys(updates).length === 0) return json({ error: "Nothing to update" }, 400);
      const { error } = await adminClient.auth.admin.updateUserById(user_id, updates);
      if (error) return json({ error: error.message }, 500);
      if (newUsername) {
        await adminClient
          .from("profiles")
          .update({ username: newUsername, email: `${newUsername}@igcse-platform.local` })
          .eq("user_id", user_id);
      }
      await audit("update", "user_credentials", user_id, newUsername ?? null, {
        password_changed: Boolean(password),
      });
      return json({ success: true });
    }

    return json({ error: "Invalid action" }, 400);
  } catch (e) {
    return json({ error: e.message }, 500);
  }
});
