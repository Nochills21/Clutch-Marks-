// Past-paper archive grouped by year; opens via watermarking proxy.
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { usePlanAccess, FREE_PREVIEW_LIMIT, usePreviewSliceWithLimit } from "@/components/PreviewLimit";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/lib/auth";
import { useMySubjects } from "@/hooks/useMySubjects";
import { SubjectGate } from "@/components/SubjectGate";
import { useQuery } from "@tanstack/react-query";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { openProtectedFile } from "@/lib/contentFiles";
import { Loader2, FileText, Search } from "lucide-react";
import { AiCorrectionForm } from "@/components/AiCorrectionForm";
type AiCorrectionOutput = any;

interface PastPaper {
  id: string;
  year: number;
  session: string | null;
  paper_number: string | null;
  title: string;
  topic_id: string | null;
  paper_url: string | null;
  mark_scheme_url: string | null;
  topic_name: string | null;
  subject_slug: string | null;
  level: "OL" | "AS" | "A2" | null;
}

const LEVEL_FILTERS = [
  { id: "all", label: "All levels" },
  { id: "OL", label: "IGCSE / O Level" },
  { id: "AS", label: "AS Level" },
  { id: "A2", label: "A2 Level" },
];

const levelLabel = (l: string | null) => LEVEL_FILTERS.find((f) => f.id === l)?.label ?? l;

export default function PastPapers() {
  const { toast } = useToast();
  const { user } = useAuth();
  const { pickedIds, loaded: prefsLoaded, isAdmin } = useMySubjects();
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [correction, setCorrection] = useState<AiCorrectionOutput | null>(null);

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
      const { data } = await supabase.from("past_papers").select("*, topics(name, subject_levels(id))").order("year", { ascending: false });
      return data ?? [];
    },
  });

  const { loading: planLoading, isPreview, hasPaid } = usePlanAccess();
  const { slice: visiblePapers } = usePreviewSliceWithLimit(scopedPapers ?? [], FREE_PREVIEW_LIMIT);
  const years = [...new Set(visiblePapers?.map((p: any) => p.year) ?? [])].sort((a, b) => b - a);

  const handleCorrect = (result: AiCorrectionOutput) => {
    setCorrection(result);
    toast({
      title: "Corrected",
      description: `Overall grade: ${result.overall_grade}% (${result.total_earned}/${result.total_possible} marks)`,
    });
  };

  const handleOpenFile = async (url: string) => {
    try {
      await openProtectedFile("past-papers", url);
    } catch (e: any) {
      toast({ title: "Unable to open file", description: e?.message ?? "Please try again", variant: "destructive" });
    }
  };

  const needsSubjectPick = !isAdmin && prefsLoaded && pickedIds.size === 0;

  // Past papers whose topic belongs to a subject-level the student picked.
  // Admins see everything.
  const topicToSl = useMemo(() => {
    const m = new Map<string, string>();
    (topics ?? []).forEach((t: any) => { if (t.subject_levels?.id) m.set(t.id, t.subject_levels.id); });
    return m;
  }, [topics]);

  const scopedPapers = useMemo(() => {
    if (isAdmin || !prefsLoaded) return papers ?? [];
    return (papers ?? []).filter((p: any) => {
      const tid = p.topic_id;
      if (!tid) return false; // untagged papers — hide from students
      const sl = topicToSl.get(tid);
      return sl && pickedIds.has(sl);
    });
  }, [papers, isAdmin, prefsLoaded, pickedIds, topicToSl]);

  const filteredPapers = (visiblePapers ?? [])
    .filter((p: any) => {
      // Scope to picked subjects (already applied via scopedPapers -> visiblePapers
      // chain, but enforce again in case visiblePapers includes unscoped items).
      if (!isAdmin && prefsLoaded) {
        const tid = p.topic_id;
        if (tid) {
          const sl = topicToSl.get(tid);
          if (sl && !pickedIds.has(sl)) return false;
        }
      }
      return (levelFilter === "all" || p.level === levelFilter) &&
        (search === "" ||
        p.title?.toLowerCase().includes(search.toLowerCase()) ||
        p.paper_number?.toLowerCase().includes(search.toLowerCase()) ||
        p.session?.toLowerCase().includes(search.toLowerCase()));
    });

  const groupedPapers = years.map((y) => ({
    year: y,
    papers: filteredPapers.filter((p: any) => p.year === y),
  })).filter((g) => (yearFilter === "all" ? true : g.year === Number(yearFilter)));

  if (!isAdmin && !prefsLoaded) {
    return (
      <div className="flex justify-center py-24">
        <div className="h-8 w-8 rounded-full border-primary/30 border animate-spin" />
      </div>
    );
  }
  if (needsSubjectPick) {
    return (
      <div className="space-y-6">
        <SEOHead title="Past Papers — Clutch Marks" description="Browse and download past papers and mark schemes." path="/past-papers" />
        <SubjectGate />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <SEOHead
        title="Past Papers — Clutch Marks"
        description="Browse and download IGCSE, AS and A Level past papers and mark schemes by year, session and paper number to practise under exam conditions."
        path="/past-papers"
      />
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FileText className="h-7 w-7 text-primary" /> Past Papers
        </h1>
        <p className="text-muted-foreground text-sm">
          Download past exam papers and mark schemes. Use the <span className="font-semibold text-primary">AI Corrector</span> to auto-mark your answers.
        </p>
      </div>

      {/* AI auto-correction form */}
      <div className="max-w-4xl mx-auto">
        <AiCorrectionForm
          subjectLevelId={null}
          onCorrected={handleCorrect}
          onReset={() => setCorrection(null)}
        />
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Search className="h-4 w-4 mr-2 text-muted-foreground" />
              <Input
                placeholder="Search papers... (e.g. 2024, Paper 1, Chem)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-[170px]">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {LEVEL_FILTERS.map((f) => (
                    <SelectItem key={f.id} value={f.id}>{f.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => setYearFilter("all")} className={yearFilter === "all" ? "bg-primary text-primary-foreground" : ""}>
                All years
              </Button>
              <Button variant="outline" onClick={() => setYearFilter("2024")} className={yearFilter === "2024" ? "bg-primary text-primary-foreground" : ""}>
                2024
              </Button>
              <Button variant="outline" onClick={() => setYearFilter("2023")} className={yearFilter === "2023" ? "bg-primary text-primary-foreground" : ""}>
                2023
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Paper grid */}
      {isLoading ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="text-sm text-muted-foreground mt-2">Loading past papers…</p>
          </CardContent>
        </Card>
      ) : filteredPapers.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-sm text-muted-foreground">No past papers match your search.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groupedPapers.flatMap((g) =>
            g.papers.map((p: any) => (
              <Card key={p.id} className="hover:shadow-md transition-shadow group">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base group-hover:text-primary transition-colors">
                      {p.title}
                    </CardTitle>
                    <div className="flex shrink-0 gap-1">
                      <Button variant="ghost" size="sm" disabled={!p.paper_url} onClick={() => handleOpenFile(p.paper_url ?? "")}>
                        Paper
                      </Button>
                      {p.mark_scheme_url && (
                        <Button variant="ghost" size="sm" onClick={() => handleOpenFile(p.mark_scheme_url ?? "")}>
                          Mark scheme
                        </Button>
                      )}
                    </div>
                  </div>
                  <CardDescription className="space-y-1">
                    <span className="flex items-center gap-1.5">
                      {p.level && (
                        <Badge variant="outline" className="text-[10px] uppercase tracking-[0.08em]">
                          {levelLabel(p.level)}
                        </Badge>
                      )}
                      <span>
                        {p.session ? `${p.session} · Year ${p.year}` : `Year ${p.year}`}
                        {p.topic_name && <span className="text-xs text-muted-foreground"> · {p.topic_name}</span>}
                      </span>
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Paper {p.paper_number ?? "—"} · {p.paper_url ? "Downloadable" : "Pending"}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {correction && (
        <Card className="mx-auto max-w-4xl">
          <CardHeader>
            <CardTitle>AI correction result</CardTitle>
            <CardDescription>
              Overall grade: <span className="font-bold text-2xl text-primary">{correction.overall_grade}%</span> ({correction.total_earned}/{correction.total_possible} marks)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {correction.corrected_papers.map((r) => (
                <div key={r.question} className="rounded-md border border-primary/10 p-3">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 rounded-full shrink-0"></span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{r.question}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{r.feedback}</p>
                      <p className="text-xs text-muted-foreground/70 mt-0.5">
                        <span className="font-semibold text-primary">{r.marks_earned}/{r.total_marks}</span> · {r.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
