// Bell menu: reads the user's notifications (owner alerts land here).
import { useEffect, useState, useCallback } from "react";
import { Bell, Check, CheckCheck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { loadFailureMessage } from "@/lib/net";

interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  unread?: boolean;
}

/** Announcements that have not been opened. We reuse the bell menu so an
 * admin's class post also rings the student's phone — no separate endpoint.
 */
export function NotificationCenter() {
  const { user } = useAuth();
  const [items, setItems] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [failure, setFailure] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }
    // The most recent announcements, newest first.
    //
    // NOTE: these are the global `announcements` rows, which carry no per-user
    // read state at all (the table is id/title/content/published_at/created_at).
    // There is therefore no "unread" filter to apply here — a badge that
    // claims otherwise has to count per-user rows from `notifications` (see
    // AppSidebar). Do not reintroduce a `read` filter on this table: the column
    // does not exist and PostgREST answers 400.
    const { data, error } = await supabase
      .from("announcements")
      .select("id, title, content, created_at")
      .order("created_at", { ascending: false })
      .limit(30);
    setLoading(false);
    // A failed read rendered the empty "No announcements yet" state, which is a
    // lie when the request simply failed.
    if (error) {
      setFailure(loadFailureMessage("announcements", error));
      setItems([]);
      return;
    }
    setFailure(null);
    setItems((data ?? []).map((d: any) => ({
      id: d.id,
      title: d.title,
      message: d.content,
      read: false,
      created_at: d.created_at,
    })) as Notification[]);
  }, [user]);

  useEffect(() => {
    load();
    if (!user) return;
    const channel = supabase
      .channel("announcements-" + user.id)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "announcements" },
        () => load()
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user, load]);

  const unread = items.length;

  /** Jump to the announcement feed and mark every announcement as read. */
  const openFeed = async () => {
    setOpen(false);
    if (!user) return;
    load();
  };

  const markAsRead = async (id?: string) => {
    if (!user) return;
    // Mark the specific announcement as read through the UI state only,
    // since the unread flag is not present in the live schema yet.
    setItems((prev) => (id ? prev.filter((i) => i.id !== id) : []));
  };

  return (
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
            <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs" onClick={(e) => markAsRead()}>
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
                  className={cn(
                    "w-full text-left px-4 py-3 hover:bg-muted/50 transition-colors",
                    !n.read && "bg-primary/5"
                  )}
                >                  <div className="flex items-start gap-2">
                    <div className={cn("h-2 w-2 mt-1.5 rounded-full shrink-0", !n.read ? "bg-red-500" : "bg-transparent")} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{n.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{n.message}</p>
                      <p className="text-[10px] text-muted-foreground/70 mt-1">
                        {formatDistanceToNow(new Date(n.created_at), { addSuffix: true })}
                      </p>
                    </div>
                    {!n.read && <Check className="h-3 w-3 text-red-500/40 shrink-0 mt-1" />}
                  </div>
                </button >
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
