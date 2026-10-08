// Platform announcements feed.
//
// The feed is visible to every approved user; opening it records a per-user
// read marker (public.announcement_reads) so the sidebar badge clears. A failed
// load must say so — the previous version rendered "No announcements yet." for
// a query that had actually errored, which is indistinguishable from having no
// announcements at all.
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SEOHead } from "@/components/SEOHead";
import { Megaphone, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { markAnnouncementsRead } from "@/lib/announcements";

export default function Announcements() {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    supabase
      .from("announcements")
      .select("*")
      .order("published_at", { ascending: false })
      .then(({ data, error: err }) => {
        if (!active) return;
        if (err) {
          setError(err.message || "Could not load announcements");
          setAnnouncements([]);
        } else {
          const rows = data ?? [];
          setAnnouncements(rows);
          // Reading the feed is what marks it read.
          if (user) void markAnnouncementsRead(user.id, rows.map((a: any) => a.id));
        }
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [user, reloadKey]);

  const retry = useCallback(() => setReloadKey((k) => k + 1), []);

  return (
    <div className="space-y-6">
      <SEOHead path="/announcements" />
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Announcements</h1>
        <p className="text-muted-foreground">Latest news and updates</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[0, 1].map((i) => (
            <Card key={i}>
              <CardContent className="space-y-3 py-6">
                <Skeleton className="h-5 w-52" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : error ? (
        <Card><CardContent className="flex flex-col items-center gap-3 py-12">
          <Megaphone className="h-12 w-12 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">{error}</p>
          <Button variant="outline" size="sm" className="gap-2" onClick={retry}>
            <RefreshCw className="h-4 w-4" /> Try again
          </Button>
        </CardContent></Card>
      ) : announcements.length === 0 ? (
        <Card><CardContent className="flex flex-col items-center py-12">
          <Megaphone className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">No announcements yet.</p>
        </CardContent></Card>
      ) : (
        <div className="space-y-4">
          {announcements.map((a) => (
            <Card key={a.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-4">
                  <CardTitle className="text-lg">{a.title}</CardTitle>
                  <span className="shrink-0 text-xs text-muted-foreground">{format(new Date(a.published_at), "PPP")}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap">{a.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
