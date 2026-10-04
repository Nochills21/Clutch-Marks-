// serve-material: streams study PDFs to approved users with a per-user
// watermark burned into every page (tiled diagonal "Clutch Marks" + identity
// footer), then logs the download to the admin audit trail.
//
// Entitlement is enforced here, not just in the UI: an account without an active
// paid subscription (and not an admin) receives only the first
// FREE_PREVIEW_PAGES pages of the document. The free-plan slide was previously
// computed in the browser (usePreviewSliceWithLimit), which hid rows from the
// list but still served the complete file to anyone who asked — the full text
// was one network-tab request away. Truncating at serve time means the rest of
// the document never reaches an unentitled client at all.
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

/** Pages a non-paying account receives. Mirrors FREE_PREVIEW_LIMIT's intent. */
const FREE_PREVIEW_PAGES = 3;

function json(body: object, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

/**
 * HTTP-safe filename for `Content-Disposition`.
 *
 * The original used a PDF-string escaper here, which escapes backslashes and
 * parentheses — the wrong alphabet for an HTTP header. A filename containing a
 * quote or a newline could break out of the quoted value, so this strips
 * anything that is not plainly safe instead.
 */
function safeFilename(name: string): string {
  const cleaned = name
    .replace(/[^\w.\- ]+/g, "_")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
  return cleaned || "file";
}

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

    // ── Entitlement: does this account receive the whole document? ─────────
    // Same rule as the client's useSubscription: admins always do; a paid
    // subscription does while it is active and has not lapsed.
    let hasFullAccess = roleRow.role === "admin";
    if (!hasFullAccess) {
      const { data: sub } = await adminClient
        .from("subscriptions")
        .select("status, ends_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      hasFullAccess =
        !!sub && sub.status === "active" && (!sub.ends_at || new Date(sub.ends_at) > new Date());
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
          // corsHeaders is REQUIRED here: the caller is the app origin, so a
          // response without Access-Control-Allow-Origin is blocked by the
          // browser even after a successful preflight. Omitting it made every
          // download fall back to a plain signed URL — unwatermarked and
          // unaudited.
          ...corsHeaders,
          "Content-Type": fileData.type || "application/octet-stream",
          "Content-Disposition": `inline; filename="${safeFilename(path.split("/").pop() ?? "file")}"`,
          "Cache-Control": "private, no-store",
        },
      });
    }

    // ── Identity string burned into the document ───────────────────────────
    const stamp = `Licensed to ${user.email ?? user.id} · Clutch Marks`;
    const now = new Date();
    const utc = now.toISOString().replace("T", " ").slice(0, 19) + " UTC";

    const pdf = await PDFDocument.load(buf);
    const totalPages = pdf.getPageCount();

    // Free accounts are handed just the opening pages of the real document.
    let doc = pdf;
    if (!hasFullAccess && totalPages > FREE_PREVIEW_PAGES) {
      doc = await PDFDocument.create();
      const kept = await doc.copyPages(pdf, pdf.getPageIndices().slice(0, FREE_PREVIEW_PAGES));
      for (const page of kept) doc.addPage(page);
    }

    const font = await doc.embedFont(StandardFonts.Helvetica);
    const pages = doc.getPages();

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
          page.drawText("CLUTCH MARKS", {
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

    // Truncated previews say so on the page itself, so a shared screenshot
    // cannot be mistaken for the whole document.
    if (pages.length < totalPages) {
      const last = pages[pages.length - 1];
      last.drawText(
        `Preview: pages 1-${pages.length} of ${totalPages} - Clutch Marks`,
        { x: 24, y: 30, size: 9, font, color: rgb(0.5, 0.2, 0.2), opacity: 0.9 },
      );
    }

    // Traceable metadata (survives many PDF tools even when visuals are cropped).
    doc.setTitle(path.split("/").pop() ?? "Clutch Marks material");
    doc.setProducer("Clutch Marks serve-material");
    doc.setKeywords([`license:${user.email ?? user.id}`, `ts:${now.toISOString()}`]);

    // useObjectStreams:false keeps the info dictionary plaintext — the
    // traceability metadata stays greppable in any PDF inspector.
    const stamped = await doc.save({ useObjectStreams: false });

    // ── Audit: attribute this serve to the receiving account ───────────────
    // Awaited (not fire-and-forget): the isolate can terminate right after the
    // response is returned, which would drop the log row.
    const label = path.split("/").pop() ?? path;
    const { error: rpcError } = await adminClient.rpc("audit_admin_action", {
      p_action: "download",
      p_entity: bucket,
      p_entity_id: null,
      p_entity_label: label,
      p_details: {
        path,
        user_id: user.id,
        pages: pages.length,
        total_pages: totalPages,
        preview: pages.length < totalPages,
      },
      p_actor_id: user.id,
      p_actor_username: user.email ?? user.id,
    });
    if (rpcError) console.error("audit log failed:", rpcError.message);

    return new Response(stamped as unknown as BodyInit, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${safeFilename(label)}"`,
        "Cache-Control": "private, no-store",
        // Lets a client (or a support query) see that this was a truncated serve.
        "X-Clutchmarks-Preview": pages.length < totalPages ? "truncated" : "full",
        "X-Clutchmarks-Pages": String(pages.length),
      },
    });
  } catch (e) {
    console.error("serve-material error:", e);
    return json({ error: "Internal error" }, 500);
  }
});
