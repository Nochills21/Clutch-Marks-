// Past-paper archive grouped by year; opens via watermarking proxy.
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, FileCheck, Search, Download } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { SEOHead } from "@/components/SEOHead";
import { getRouteMeta } from "@/lib/seoRoutes";
import { openProtectedFile } from "@/lib/contentFiles";

function extractPath(urlOrPath: string): string {
  const marker = "/past-papers/";
  const idx = urlOrPath.indexOf(marker);
  return idx >= 0 ? urlOrPath.slice(idx + marker.length) : urlOrPath;
}

async function openSignedUrl(urlOrPath: string, onError: (msg: string) => void) {
  // Past papers are PDFs — open them through serve-material so every download
  // is watermarked per-user (Clutch Marks + identity) and audit-logged.
  try {
    await openProtectedFile("past-papers", extractPath(urlOrPath));
  } catch (e: any) {
    onError(e?.message ?? "Unable to open file");
  }
}

export default function PastPapers() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [topicFilter, setTopicFilter] = useState("all");

  const { data: topics } = useQuery({
    queryKey: ["topics"],
    queryFn: async () => {
      const { data } = await supabase.from("topics").select("*").order("sort_order");
      return data ?? [];
    },
  });

  const { data: papers, isLoading } = useQuery({
    queryKey: ["past_papers"],
    queryFn: async () => {
      const { data } = await supabase.from("past_papers").select("*, topics(name)").order("year", { ascending: false });
      return data ?? [];
    },
  });

  const years = [...new Set(papers?.map((p: any) => p.year) ?? [])].sort((a, b) => b - a);

  const filtered = papers?.filter((p: any) => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (yearFilter !== "all" && p.year !== Number(yearFilter)) return false;
    if (topicFilter !== "all" && p.topic_id !== topicFilter) return false;
    return true;
  }) ?? [];

  // Group by year
  const grouped = filtered.reduce((acc: Record<number, any[]>, p: any) => {
    (acc[p.year] = acc[p.year] || []).push(p);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <SEOHead title="Past Papers & Mark Schemes — Clutch Marks" description="Download past exam papers and mark schemes by year, session and paper number to practise under exam conditions." path="/past-papers" jsonLd={getRouteMeta("/past-papers")?.jsonLd} />
      <div>
        <h1 className="text-2xl font-bold text-foreground">Past Papers Bank</h1>
        <p className="text-muted-foreground text-sm">Browse and download IGCSE past papers and mark schemes</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search papers…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={yearFilter} onValueChange={setYearFilter}>
          <SelectTrigger className="w-[130px]"><SelectValue placeholder="Year" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            {years.map(y => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={topicFilter} onValueChange={setTopicFilter}>
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="Topic" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Topics</SelectItem>
            {topics?.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : !filtered.length ? (
        <Card><CardContent className="py-12 text-center text-muted-foreground">No past papers found.</CardContent></Card>
      ) : (
        Object.entries(grouped)
          .sort(([a], [b]) => Number(b) - Number(a))
          .map(([year, items]) => (
            <div key={year} className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">{year}</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {(items as any[]).map(p => (
                  <Card key={p.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold leading-tight">{p.title}</CardTitle>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {p.session && <Badge variant="secondary" className="text-[10px]">{p.session}</Badge>}
                        {p.paper_number && <Badge variant="outline" className="text-[10px]">{p.paper_number}</Badge>}
                        {p.topics?.name && <Badge className="text-[10px]">{p.topics.name}</Badge>}
                      </div>
                    </CardHeader>
                    <CardContent className="flex gap-2 pt-0">
                      {p.paper_url && (
                        <Button size="sm" variant="outline" className="gap-1.5 text-xs" onClick={() => openSignedUrl(p.paper_url, (m) => toast({ title: "Error", description: m, variant: "destructive" }))}>
                          <FileText className="h-3.5 w-3.5" /> Paper
                        </Button>
                      )}
                      {p.mark_scheme_url && (
                        <Button size="sm" variant="outline" className="gap-1.5 text-xs text-green-600 border-green-200 hover:bg-green-50" onClick={() => openSignedUrl(p.mark_scheme_url, (m) => toast({ title: "Error", description: m, variant: "destructive" }))}>
                          <FileCheck className="h-3.5 w-3.5" /> Mark Scheme
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))
      )}
    </div>
  );
}
