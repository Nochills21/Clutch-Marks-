import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SEOHead } from "@/components/SEOHead";
import { FileText, Bookmark, BookmarkCheck, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Revision() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [materials, setMaterials] = useState<any[]>([]);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [topics, setTopics] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const load = async () => {
      const [matRes, topicsRes, bookmarksRes] = await Promise.all([
        supabase.from("study_materials").select("*, topics(name)").order("created_at", { ascending: false }),
        supabase.from("topics").select("*").order("sort_order"),
        user ? supabase.from("bookmarks").select("material_id").eq("user_id", user.id) : Promise.resolve({ data: [] }),
      ]);
      setMaterials(matRes.data ?? []);
      setTopics(topicsRes.data ?? []);
      setBookmarks(new Set((bookmarksRes.data ?? []).map((b: any) => b.material_id)));
    };
    load();
  }, [user]);

  const toggleBookmark = async (materialId: string) => {
    if (!user) return;
    if (bookmarks.has(materialId)) {
      await supabase.from("bookmarks").delete().eq("user_id", user.id).eq("material_id", materialId);
      setBookmarks((b) => { const n = new Set(b); n.delete(materialId); return n; });
    } else {
      await supabase.from("bookmarks").insert({ user_id: user.id, material_id: materialId });
      setBookmarks((b) => new Set(b).add(materialId));
    }
  };

  const filtered = materials.filter((m) => {
    if (filter === "all") return true;
    if (filter === "bookmarked") return bookmarks.has(m.id);
    return m.topic_id === filter;
  });

  return (
    <div className="space-y-6">
      <SEOHead title="Revision Materials — Clutch Marks" description="Access revision notes, past papers, and study materials to prepare for your exams." path="/revision" />
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Revision Materials</h1>
        <p className="text-muted-foreground">Study notes and resources</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>All</Button>
        <Button size="sm" variant={filter === "bookmarked" ? "default" : "outline"} onClick={() => setFilter("bookmarked")}>
          <Star className="h-3 w-3 mr-1" /> Bookmarked
        </Button>
        {topics.map((t) => (
          <Button key={t.id} size="sm" variant={filter === t.id ? "default" : "outline"} onClick={() => setFilter(t.id)}>
            {t.name}
          </Button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card><CardContent className="flex flex-col items-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">No materials available.</p>
        </CardContent></Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => (
            <Card key={m.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="secondary" className="mb-2">{m.topics?.name ?? "General"}</Badge>
                    <CardTitle className="text-base">{m.title}</CardTitle>
                    <Badge variant="outline" className="mt-1 capitalize">{m.material_type}</Badge>
                  </div>
                  <Button variant="ghost" size="icon" aria-label="Bookmark material" onClick={() => toggleBookmark(m.id)}>
                    {bookmarks.has(m.id) ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-4">{m.content ?? "No content."}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
