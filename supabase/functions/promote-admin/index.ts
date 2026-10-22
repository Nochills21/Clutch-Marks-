import { createClient } from "https://esm.sh/@supabase/supabase-js@2.97.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Verify caller is admin
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user: caller } } = await userClient.auth.getUser();
    if (!caller) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    // Check caller is admin AND approved
    const { data: callerRole } = await adminClient
      .from("user_roles")
      .select("role")
      .eq("user_id", caller.id)
      .eq("role", "admin")
      .eq("is_approved", true)
      .single();

    if (!callerRole) {
      return new Response(JSON.stringify({ error: "Only approved admins can promote users" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { email } = await req.json();
    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Find the account. `profiles` carries the email and is indexed, so this is
    // one query instead of paging through every auth user; the old code called
    // `listUsers()` once and only searched its first page (50 accounts), so any
    // account past that was reported as "No account found".
    const wanted = email.toLowerCase().trim();
    let targetId: string | null = null;

    const { data: profile, error: profileError } = await adminClient
      .from("profiles")
      .select("user_id, username, email")
      .ilike("email", wanted)
      .maybeSingle();
    if (profileError) {
      return new Response(JSON.stringify({ error: profileError.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    targetId = profile?.user_id ?? null;

    // Fallback: an auth user with no profile row yet. Page through the admin API
    // until the email is found, rather than trusting a single page.
    if (!targetId) {
      for (let page = 1; page <= 20 && !targetId; page++) {
        const { data, error: listError } = await adminClient.auth.admin.listUsers({ page, perPage: 200 });
        if (listError) {
          return new Response(JSON.stringify({ error: listError.message }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        const match = data?.users?.find((u) => u.email?.toLowerCase() === wanted);
        if (match) targetId = match.id;
        if (!data?.users?.length) break;
      }
    }

    if (!targetId) {
      return new Response(JSON.stringify({ error: `No account found with the email ${wanted}` }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Update every role row the account has; the table's primary key is `id`
    // without a unique user_id, so more than one row can exist. If it has none
    // (an account created outside the signup trigger), insert one instead of
    // reporting a success that changed nothing.
    const { data: updated, error: updateError } = await adminClient
      .from("user_roles")
      .update({ role: "admin", is_approved: true })
      .eq("user_id", targetId)
      .select("id");

    if (updateError) {
      return new Response(JSON.stringify({ error: updateError.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!updated || updated.length === 0) {
      const { error: insertError } = await adminClient
        .from("user_roles")
        .insert({ user_id: targetId, role: "admin", is_approved: true });
      if (insertError) {
        return new Response(JSON.stringify({ error: insertError.message }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // Service-role writes leave a null actor on the audit trail; attribute the
    // promotion to the admin who made it, as manage-accounts does.
    const { data: callerProfile } = await adminClient
      .from("profiles")
      .select("username")
      .eq("user_id", caller.id)
      .maybeSingle();
    await adminClient.rpc("audit_admin_action", {
      p_action: "role_change",
      p_entity: "user",
      p_entity_id: targetId,
      p_entity_label: profile?.username ?? wanted,
      p_details: { promoted_to: "admin" },
      p_actor_id: caller.id,
      p_actor_username: callerProfile?.username ?? caller.email ?? null,
    });

    return new Response(JSON.stringify({ success: true, user_id: targetId }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
