// Announcement read state.
//
// Read state is per user, stored in `public.announcement_reads` (migration
// 20260929121000). The announcements feed itself is visible to every approved
// user; what differs per student is which rows they have opened.
import { supabase } from "@/integrations/supabase/client";
import { retrySupabase } from "@/lib/net";

/**
 * How many announcements this user has not opened yet.
 *
 * Two queries rather than one join: PostgREST cannot express "parent rows with
 * no matching child" without switching the embed to !inner (which would invert
 * the result). The tables are tiny, and the announcement list is capped, so the
 * set difference is cheap and obviously correct.
 */
export async function countUnreadAnnouncements(userId: string): Promise<number> {
  const [announcements, reads] = await Promise.all([
    retrySupabase(() => supabase.from("announcements").select("id")),
    retrySupabase(() =>
      supabase.from("announcement_reads").select("announcement_id").eq("user_id", userId),
    ),
  ]);

  const readIds = new Set(
    ((reads.data ?? []) as { announcement_id: string }[]).map((r) => r.announcement_id),
  );
  return ((announcements.data ?? []) as { id: string }[]).filter((a) => !readIds.has(a.id)).length;
}

/**
 * Mark announcements as read for this user.
 *
 * Insert-only and conflict-ignored: re-opening the feed must not fail or move
 * the original `read_at`, and a partial failure is not worth surfacing — the
 * worst case is that the badge stays until the next visit.
 */
export async function markAnnouncementsRead(userId: string, ids: string[]): Promise<void> {
  if (ids.length === 0) return;
  const rows = ids.map((announcement_id) => ({ user_id: userId, announcement_id }));
  const { error } = await supabase
    .from("announcement_reads")
    .upsert(rows as never, { onConflict: "user_id,announcement_id", ignoreDuplicates: true });
  if (error) console.warn("announcements: could not record read state", error.message);
}
