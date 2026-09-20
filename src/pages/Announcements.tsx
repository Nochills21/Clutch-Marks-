import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SEOHead } from "@/components/SEOHead";
import { Megaphone } from "lucide-react";
import { format } from "date-fns";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("announcements").select("*").order("published_at", { ascending: false })
      .then(({ data }) => setAnnouncements(data ?? []));
  }, []);

  return (
    <div className="space-y-6">
      <SEOHead title="Announcements — Clutch Marks" description="Read the latest announcements, updates, and important news from Clutch Marks." path="/announcements" />
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Announcements</h1>
        <p className="text-muted-foreground">Latest news and updates</p>
      </div>
      {announcements.length === 0 ? (
        <Card><CardContent className="flex flex-col items-center py-12">
          <Megaphone className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">No announcements yet.</p>
        </CardContent></Card>
      ) : (
        <div className="space-y-4">
          {announcements.map((a) => (
            <Card key={a.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{a.title}</CardTitle>
                  <span className="text-xs text-muted-foreground">{format(new Date(a.published_at), "PPP")}</span>
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
