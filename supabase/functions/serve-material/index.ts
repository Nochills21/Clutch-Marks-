// serve-material: streams study PDFs to approved users with a per-user
// watermark burned into every page (tiled diagonal "Clutch Marks" + identity
// footer), then logs the download to the admin audit trail.
//
// Why server-side: client-side watermarks are trivially stripped; stamping the
// bytes at serve time means any re-shared copy still carries the identity.
//
// Request:  POST { bucket, path }
// Auth:     signed-in user with an approved role (student or admin).
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.97.0";
import { PDFDocument, rgb, StandardFonts, degrees } from "https://esm.sh/pdf-lib@1.17.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ALLOWED_BUCKETS = new Set(["study-materials", "past-papers", "quiz-files"]);

function json(body: object, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

const escapePdf = (s: string) => s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // ── Auth: caller must hold a valid session JWT ─────────────────────────
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } },
    });
    const { data: { user }, error: authError } = await userClient.auth.getUser();
    if (authError || !user) return json({ error: "Not authenticated" }, 401);

    const adminClient = createClient(supabaseUrl, serviceKey);

    // ── Gate: approved student or admin only ───────────────────────────────
    const { data: roleRow } = await adminClient
      .from("user_roles")
      .select("role, is_approved")
      .eq("user_id", user.id)
      .maybeSingle();
    if (!roleRow || !roleRow.is_approved) {
      return json({ error: "Your account is awaiting approval" }, 403);
    }

    // ── Request validation ─────────────────────────────────────────────────
    const { bucket, path } = await req.json().catch(() => ({ bucket: null, path: null }));
    if (!ALLOWED_BUCKETS.has(bucket) || typeof path !== "string" || !path.trim()) {
      return json({ error: "Invalid bucket or path" }, 400);
    }
    // Path traversal hard-stop: no matter what storage would do with it.
    if (path.includes("..") || path.startsWith("/")) {
      return json({ error: "Invalid path" }, 400);
    }

    // ── Fetch the original PDF (service role: buckets are private) ─────────
    const { data: fileData, error: dlError } = await adminClient.storage
      .from(bucket)
      .download(path);
    if (dlError || !fileData) return json({ error: "File not found" }, 404);

    // Non-PDFs are streamed unchanged (images used for previews/thumbnails).
    const buf = new Uint8Array(await fileData.arrayBuffer());
    const isPdf = buf.length > 4 && buf[0] === 0x25 && buf[1] === 0x50 && buf[2] === 0x44 && buf[3] === 0x46; // "%PDF"
    if (!isPdf) {
      return new Response(buf, {
        headers: {
          "Content-Type": fileData.type || "application/octet-stream",
          "Content-Disposition": `inline; filename="${path.split("/").pop() ?? "file"}"`,
          "Cache-Control": "private, no-store",
        },
      });
    }

    // ── Identity string burned into the document ───────────────────────────
    const stamp = `Licensed to ${user.email ?? user.id} · ClutchPrep`;
    const now = new Date();
    const utc = now.toISOString().replace("T", " ").slice(0, 19) + " UTC";

    const pdf = await PDFDocument.load(buf);
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const pages = pdf.getPages();

    for (const page of pages) {
      const { width, height } = page.getSize();

      // Tiled diagonal "Clutch Marks" — large, rotated, low-contrast so they
      // sit behind the content instead of over it.
      const stepX = 260;
      const stepY = 170;
      const fontSize = 15;
      for (let y = -stepY; y < height + stepY; y += stepY) {
        for (let x = -stepX; x < width + stepX; x += stepX) {
          // Stagger alternate rows for a woven look.
          const offsetX = (Math.round(y / stepY) % 2 === 0) ? 0 : stepX / 2;
          page.drawText("CLUTCH", {
            x: x + offsetX,
            y,
            size: fontSize,
            font,
            color: rgb(0.72, 0.72, 0.78),
            opacity: 0.14,
            rotate: degrees(45),
          });
        }
      }

      // Per-user footer on every page — the traceability layer.
      page.drawText(`${stamp}  ·  ${utc}`, {
        x: 24,
        y: 18,
        size: 7.5,
        font,
        color: rgb(0.45, 0.45, 0.5),
        opacity: 0.85,
      });
    }

    // Traceable metadata (survives many PDF tools even when visuals are cropped).
    pdf.setTitle(path.split("/").pop() ?? "ClutchPrep material");
    pdf.setProducer("ClutchPrep serve-material");
    pdf.setKeywords([`license:${user.email ?? user.id}`, `ts:${now.toISOString()}`]);

    // useObjectStreams:false keeps the info dictionary plaintext — the
    // traceability metadata stays greppable in any PDF inspector.
    const stamped = await pdf.save({ useObjectStreams: false });

    // ── Audit: attribute this serve to the receiving account ───────────────
    // Awaited (not fire-and-forget): the isolate can terminate right after the
    // response is returned, which would drop the log row.
    const label = path.split("/").pop() ?? path;
    const { error: rpcError } = await adminClient.rpc("audit_admin_action", {
      p_action: "download",
      p_entity: bucket,
      p_entity_id: null,
      p_entity_label: label,
      p_details: { path, user_id: user.id, pages: pages.length },
      p_actor_id: user.id,
      p_actor_username: user.email ?? user.id,
    });
    if (rpcError) console.error("audit log failed:", rpcError.message);

    return new Response(stamped as unknown as BodyInit, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${escapePdf(label) || "file.pdf"}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (e) {
    console.error("serve-material error:", e);
    return json({ error: "Internal error" }, 500);
  }
});
