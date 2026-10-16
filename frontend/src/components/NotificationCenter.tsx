// Bell menu: platform announcements, with per-user read state.
//
// Read state lives in public.announcement_reads, so an announcement opened (or
// marked read) stays read on every later visit. Clicking an item opens the full
// text in a dialog, which also records the read.
import { useEffect, useState, useCallback } from "react";
import { Bell, CheckCheck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { format, formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { loadFailureMessage, retrySupabase } from "@/lib/net";
import { markAnnouncementsRead } from "@/lib/announcements";

interface AnnouncementItem {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  read: boolean;
}

export function NotificationCenter() {
  const { user } = useAuth();
  const [items, setItems] = useState<AnnouncementItem[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [failure, setFailure] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }
    // The most recent announcements (same order as the feed), plus this user's
    // read markers. Both are needed: an announcement is unread only when this
    // user has no read row for it.
    const [announcements, reads] = await Promise.all([
      retrySupabase(() =>
        supabase
          .from("announcements")
          .select("id, title, content, published_at")
          .order("published_at", { ascending: false })
          .limit(30),
      ),
      retrySupabase(() =>
        supabase.from("announcement_reads").select("announcement_id").eq("user_id", user.id),
      ),
    ]);
    setLoading(false);
    // A failed read rendered the empty "No announcements yet" state, which is a
    // lie when the request simply failed.
    const error = announcements.error ?? reads.error;
    if (error) {
      setFailure(loadFailureMessage("announcements", error));
      setItems([]);
      return;
    }
    setFailure(null);
    const readIds = new Set(
      ((reads.data ?? []) as { announcement_id: string }[]).map((r) => r.announcement_id),
    );
    setItems(
      ((announcements.data ?? []) as { id: string; title: string; content: string; published_at: string }[]).map(
        (d) => ({
          id: d.id,
          title: d.title,
          content: d.content,
          publishedAt: d.published_at,
          read: readIds.has(d.id),
        }),
      ),
    );
  }, [user]);

  useEffect(() => {
    load();
    if (!user) return;
    const channel = supabase
      .channel("announcements-" + user.id)
      .on("postgres_changes", { event: "*", schema: "public", table: "announcements" }, () => load())
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, load]);

  const unread = items.filter((i) => !i.read).length;
  const selected = items.find((i) => i.id === selectedId) ?? null;

  /** Record reads locally at once, then persist them for this user. */
  const markRead = useCallback(
    (ids: string[]) => {
      if (!user || ids.length === 0) return;
      const idSet = new Set(ids);
      setItems((prev) => prev.map((i) => (idSet.has(i.id) ? { ...i, read: true } : i)));
      void markAnnouncementsRead(user.id, ids);
    },
    [user],
  );

  const openItem = (item: AnnouncementItem) => {
    setOpen(false);
    setSelectedId(item.id);
    markRead([item.id]);
  };

  const markAllRead = () => markRead(items.filter((i) => !i.read).map((i) => i.id));

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
            <Bell className="h-5 w-5" />
            {unread > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 min-w-5 p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground border-2 border-background">
                {unread > 9 ? "9+" : unread} new
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80 p-0">
          <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
            <p className="text-sm font-semibold">
              Notifications
              {unread > 0 && (
                <Badge className="ml-2 text-[10px] bg-red-500/15 text-red-600 border-red-500/20">
                  {unread} new
                </Badge>
              )}
            </p>
            {unread > 0 && (
              <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs" onClick={markAllRead}>
                <CheckCheck className="h-3.5 w-3.5" /> Mark all read
              </Button>
            )}
          </div>
          <ScrollArea className="max-h-[420px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <p className="text-sm text-muted-foreground">Loading…</p>
              </div>
            ) : failure ? (
              <div className="flex flex-col items-center justify-center gap-2 px-4 py-10 text-center">
                <p className="text-sm text-destructive">{failure}</p>
                <Button variant="outline" size="sm" className="gap-1" onClick={() => load()}>
                  <RotateCcw className="h-3.5 w-3.5" /> Try again
                </Button>
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Bell className="h-8 w-8 text-muted-foreground/30 mb-2" />
                <p className="text-sm text-muted-foreground">No announcements yet</p>
              </div>
            ) : (
              <div className="divide-y divide-border/40">
                {items.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => openItem(n)}
                    className={cn(
                      "flex w-full items-start text-left leading-normal px-4 py-3 hover:bg-muted/50 transition-colors",
                      !n.read && "bg-primary/5",
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <div
                        className={cn(
                          "h-2 w-2 mt-1.5 rounded-full shrink-0",
                          !n.read ? "bg-red-500" : "bg-transparent",
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <p className={cn("text-sm truncate", !n.read ? "font-semibold" : "font-medium")}>
                          {n.title}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{n.content}</p>
                        <p className="text-[10px] text-muted-foreground/70 mt-1">
                          {formatDistanceToNow(new Date(n.publishedAt), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </ScrollArea>
        </PopoverContent>
      </Popover>

      {/* Outside the popover so it survives the popover closing on click. */}
      <Dialog open={selected !== null} onOpenChange={(o) => !o && setSelectedId(null)}>
        <DialogContent className="max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.title}</DialogTitle>
                <DialogDescription>{format(new Date(selected.publishedAt), "PPP")}</DialogDescription>
              </DialogHeader>
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{selected.content}</p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
