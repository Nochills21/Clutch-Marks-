// Past-paper archive grouped by year; opens via watermarking proxy.
import { useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { usePlanAccess, FREE_PREVIEW_LIMIT, usePreviewSliceWithLimit } from "@/components/PreviewLimit";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/lib/auth";
import { useMySubjects } from "@/hooks/useMySubjects";
import { SubjectGate } from "@/components/SubjectGate";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PaperPractice, type PracticePaper } from "@/components/PaperPractice";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { openProtectedFile, openExternalPaper, ExternalPaperGated } from "@/lib/contentFiles";
import {
  boardLabel,
  archiveBoard,
  archivePaperGroup,
  paperSortKey,
  paperFileName,
  sortSessions,
  SESSION_ORDER,
  filterArchivePapers,
} from "@/lib/pastPaperFiles";
import { Loader2, FileText, Search, ExternalLink, Clock, Trophy, Download } from "lucide-react";
import { AiCorrectionForm } from "@/components/AiCorrectionForm";
import { QueryError } from "@/components/QueryError";
import { loadFailureMessage } from "@/lib/net";
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

// `paper_number` rows already read "Paper 1 (12)" — prefixing another "Paper"
// rendered "Paper Paper 1 (12)".
const paperLabel = (n: string | null) => (!n ? "—" : /^paper\b/i.test(n) ? n : `Paper ${n}`);

export default function PastPapers() {
  const { toast } = useToast();
  const { user } = useAuth();
  const qc = useQueryClient();
  const { pickedIds, loaded: prefsLoaded, isAdmin } = useMySubjects();
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [boardFilter, setBoardFilter] = useState("all");
  const [paperFilter, setPaperFilter] = useState("all");
  const [sessionFilter, setSessionFilter] = useState("all");
  const [correction, setCorrection] = useState<AiCorrectionOutput | null>(null);
  const [practicePaper, setPracticePaper] = useState<PracticePaper | null>(null);

  const { data: topics, error: topicsError } = useQuery({
    queryKey: ["topics"],
    queryFn: async () => {
      // Throw so React Query surfaces the failure; ignoring `error` here meant
      // a broken request looked exactly like "no topics exist".
      const { data, error } = await supabase.from("topics").select("*").order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });

  const { data: papers, isLoading, error: papersError, refetch: refetchPapers } = useQuery({
    queryKey: ["past_papers"],
    queryFn: async () => {
      const { data, error } = await supabase.from("past_papers").select("*, topics(name, subject_levels(level, subjects(name, slug)))").order("year", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  // Saved sittings for this student, so each card can surface a best score.
  const { data: attempts } = useQuery({
    queryKey: ["past_paper_attempts", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("past_paper_attempts")
        .select("id, paper_id, percentage, created_at")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  // Best score + number of sittings per paper (rows arrive newest-first, so the
  // first percentage seen for a paper is its most recent).
  const attemptsByPaper = useMemo(() => {
    const m = new Map<string, { best: number; count: number }>();
    for (const a of attempts ?? []) {
      if (!a.paper_id || a.percentage == null) continue;
      const cur = m.get(a.paper_id);
      if (!cur) m.set(a.paper_id, { best: a.percentage, count: 1 });
      else m.set(a.paper_id, { best: Math.max(cur.best, a.percentage), count: cur.count + 1 });
    }
    return m;
  }, [attempts]);

  const { loading: planLoading, isPreview, hasPaid } = usePlanAccess();

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

  // Save-to-disk variant. Same watermarked bytes as opening, but the browser is
  // told to download (and what to call the file) instead of previewing it.
  const handleDownloadFile = async (url: string, name: string) => {
    try {
      await openProtectedFile("past-papers", url, name);
    } catch (e: any) {
      toast({ title: "Unable to download file", description: e?.message ?? "Please try again", variant: "destructive" });
    }
  };

  // External papers route through serve-external-paper, which enforces the
  // plan and audits the click. A gated rejection becomes an upgrade prompt.
  const handleOpenExternal = async (url: string, label?: string) => {
    try {
      await openExternalPaper(url, label);
    } catch (e: any) {
      if (e instanceof ExternalPaperGated) {
        toast({ title: "Full plan required", description: e.message });
        return;
      }
      toast({ title: "Unable to open link", description: e?.message ?? "Please try again", variant: "destructive" });
    }
  };

  const needsSubjectPick = !isAdmin && user && prefsLoaded && pickedIds.size === 0;

  // Past papers whose topic belongs to a subject-level the student picked.
  // Admins see everything.
  // `topics` is loaded with `select("*")`, so there is no nested
  // `subject_levels` object on it — reading `t.subject_levels?.id` left this map
  // permanently empty, which made `scopedPapers` empty and left every student
  // staring at "No past papers match your search". The topic row carries
  // `subject_level_id` directly.
  const topicToSl = useMemo(() => {
    const m = new Map<string, string>();
    (topics ?? []).forEach((t: any) => { if (t.subject_level_id) m.set(t.id, t.subject_level_id); });
    return m;
  }, [topics]);

  const scopedPapers = useMemo(() => {
    if (isAdmin || !prefsLoaded) return papers ?? [];
    return (papers ?? []).filter((p: any) => {
      const tid = p.topic_id;
      if (!tid) return false; // untagged papers — hide from everyone
      const sl = topicToSl.get(tid);
      if (!sl) return false;
      // Anonymous visitors have no picks, so the subject filter would empty the
      // archive; they see every tagged paper, then the free-plan slice above
      // them applies as it does for a signed-in student.
      return !user || pickedIds.has(sl);
    });
  }, [papers, isAdmin, prefsLoaded, pickedIds, topicToSl, user]);

  // Filter options come from the whole subject-scoped archive, not the free
  // slice, so a student can see (and reach) every board / paper / session on
  // offer. Sessions always include the full board calendar, `Specimen` included.
  const boardOptions = useMemo(() => {
    const set = new Set<string>();
    (scopedPapers ?? []).forEach((p: any) => set.add(archiveBoard(p)));
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [scopedPapers]);

  const paperOptions = useMemo(() => {
    const set = new Set<string>();
    (scopedPapers ?? []).forEach((p: any) => set.add(archivePaperGroup(p)));
    return [...set].sort((a, b) => paperSortKey(a).localeCompare(paperSortKey(b)));
  }, [scopedPapers]);

  const sessionOptions = useMemo(() => {
    const set = new Set<string>(SESSION_ORDER);
    (scopedPapers ?? []).forEach((p: any) => { if (p.session) set.add(p.session); });
    return [...set].sort(sortSessions);
  }, [scopedPapers]);

  // Every filter — search included — runs BEFORE the free-preview slice. It used
  // to be applied to `visiblePapers` (the slice), so a free student searching
  // for an older paper or a specimen only ever searched the first
  // `FREE_PREVIEW_LIMIT` rows and concluded the paper did not exist.
  const matchedPapers = useMemo(
    () => filterArchivePapers(scopedPapers ?? [], {
      search,
      level: levelFilter,
      board: boardFilter,
      paper: paperFilter,
      session: sessionFilter,
    }),
    [scopedPapers, search, levelFilter, boardFilter, paperFilter, sessionFilter],
  );

  // Year chips reflect the papers that survive the other filters, so switching
  // board or session never offers a year that would come up empty.
  const years = [...new Set(matchedPapers.map((p: any) => p.year))].sort((a, b) => b - a);
  const yearScoped = yearFilter === "all" ? matchedPapers : matchedPapers.filter((p: any) => p.year === Number(yearFilter));
  const { slice: visiblePapers } = usePreviewSliceWithLimit(yearScoped, FREE_PREVIEW_LIMIT);
  const filteredPapers = visiblePapers ?? [];

  const groupedPapers = years
    .map((y) => ({ year: y, papers: filteredPapers.filter((p: any) => p.year === y) }))
    .filter((g) => g.papers.length > 0);

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
        <SEOHead path="/past-papers" />
        <SubjectGate />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <SEOHead path="/past-papers" />
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FileText className="h-7 w-7 text-primary" /> Past Papers
        </h1>
        <p className="text-muted-foreground text-sm">
          Download past exam papers and mark schemes. Use the <span className="font-semibold text-primary">AI Corrector</span> to auto-mark your answers.
        </p>
      </div>

      {/* A failed load says so, with a retry, instead of showing a year list. */}
      {(papersError || topicsError) && (
        <QueryError
          message={loadFailureMessage("past papers", papersError ?? topicsError)}
          onRetry={() => refetchPapers()}
        />
      )}

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
          <div className="flex flex-col gap-4">
            <div className="relative">
              {/* The icon used to sit as a block above the field; every other
                  search box in the app nests it inside on the left. */}
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                aria-label="Search past papers"
                placeholder="Search papers... (e.g. 2024, Paper 1, Chem, Specimen)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-[170px]" aria-label="Filter by level">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {LEVEL_FILTERS.map((f) => (
                    <SelectItem key={f.id} value={f.id}>{f.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={boardFilter} onValueChange={setBoardFilter}>
                <SelectTrigger className="w-[200px]" aria-label="Filter by exam board">
                  <SelectValue placeholder="Board" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All boards</SelectItem>
                  {boardOptions.map((b) => (
                    <SelectItem key={b} value={b}>{b}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={paperFilter} onValueChange={setPaperFilter}>
                <SelectTrigger className="w-[200px]" aria-label="Filter by paper">
                  <SelectValue placeholder="Paper" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All papers</SelectItem>
                  {paperOptions.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sessionFilter} onValueChange={setSessionFilter}>
                <SelectTrigger className="w-[160px]" aria-label="Filter by session">
                  <SelectValue placeholder="Session" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All sessions</SelectItem>
                  {sessionOptions.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-wrap gap-2">
              {/* Year chips come from the papers actually in scope. They used to
                  be hard-coded to 2024/2023, which offered two years that did
                  not match the newest papers (2025) and hid the real ones. */}
              <Button variant="outline" onClick={() => setYearFilter("all")} className={yearFilter === "all" ? "bg-primary text-primary-foreground" : ""}>
                All years
              </Button>
              {years.map((y) => (
                <Button
                  key={y}
                  variant="outline"
                  onClick={() => setYearFilter(String(y))}
                  className={yearFilter === String(y) ? "bg-primary text-primary-foreground" : ""}
                >
                  {y}
                </Button>
              ))}
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
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <CardTitle className="text-base group-hover:text-primary transition-colors">
                      {p.title}
                    </CardTitle>
                    {/* Nothing in the archive has a PDF yet, so the primary action
                        used to be a disabled "Paper" button next to the words
                        "Awaiting upload" — a dead end. Point students at the exam
                        board's own page instead, and only show the download
                        buttons when there is actually a file to download. */}
                    <div className="flex shrink-0 flex-wrap justify-end gap-1">
                      {p.paper_url ? (
                        <Button variant="ghost" size="sm" onClick={() => handleOpenFile(p.paper_url ?? "")}>
                          View paper
                        </Button>
                      ) : null}
                      {p.mark_scheme_url && (
                        <Button variant="ghost" size="sm" onClick={() => handleOpenFile(p.mark_scheme_url ?? "")}>
                          View mark scheme
                        </Button>
                      )}
                      {/* A row can carry a paper but no mark scheme (or vice
                          versa), so the board-site fallback must fire whenever
                          *either* file is missing — keying it on `paper_url`
                          alone left those rows with no way out. */}
                      {(!p.paper_url || !p.mark_scheme_url) && p.source_url && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1"
                          onClick={() => handleOpenExternal(p.source_url!, boardLabel(p.source_url) ?? undefined)}
                        >
                          {boardLabel(p.source_url) ?? "Board site"}
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                  {/* CardDescription renders a <p>, and the level Badge renders a
                      <div> — invalid nesting, which React warns about. */}
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center gap-1.5">
                      {(p.level ?? p.topics?.subject_levels?.level) && (
                        <Badge variant="outline" className="text-[10px] uppercase tracking-[0.08em]">
                          {levelLabel(p.level ?? p.topics?.subject_levels?.level)}
                        </Badge>
                      )}
                      <span>
                        {p.session ? `${p.session} · Year ${p.year}` : `Year ${p.year}`}
                        {/* `topic_name` is not a column on past_papers — the topic
                            arrives as the nested `topics` embed. */}
                        {p.topics?.name && <span className="text-xs text-muted-foreground"> · {p.topics.name}</span>}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    {paperLabel(p.paper_number)} ·{" "}
                    {p.paper_url
                      ? "Downloadable"
                      : p.source_url
                        ? "Not in our library yet — open it on the board's site"
                        : "Awaiting upload"}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        size="sm"
                        className="gap-1.5"
                        onClick={() => setPracticePaper({
                          id: p.id,
                          title: p.title,
                          session: p.session ?? null,
                          year: p.year,
                          paper_number: p.paper_number ?? null,
                        })}
                      >
                        <Clock className="h-3.5 w-3.5" /> Practise
                      </Button>
                      {p.paper_url && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1.5"
                          aria-label={`Download ${p.title} question paper`}
                          title="Download question paper"
                          onClick={() => handleDownloadFile(p.paper_url!, paperFileName(p.title, "paper"))}
                        >
                          <Download className="h-3.5 w-3.5" /> Download paper
                        </Button>
                      )}
                      {p.mark_scheme_url && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1.5"
                          aria-label={`Download ${p.title} mark scheme`}
                          title="Download mark scheme"
                          onClick={() => handleDownloadFile(p.mark_scheme_url!, paperFileName(p.title, "mark-scheme"))}
                        >
                          <Download className="h-3.5 w-3.5" /> Download mark scheme
                        </Button>
                      )}
                    </div>
                    {(() => {
                      const score = attemptsByPaper.get(p.id);
                      if (!score) return null;
                      return (
                        <Badge variant="outline" className="gap-1 text-[10px] text-primary">
                          <Trophy className="h-3 w-3" /> Best {score.best}%
                          {score.count > 1 ? ` · ${score.count} sittings` : ""}
                        </Badge>
                      );
                    })()}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Timed, paper-scoped practice. Saving an attempt awards XP server-side
          and refreshes the per-card best score. */}
      <PaperPractice
        paper={practicePaper}
        open={practicePaper !== null}
        onOpenChange={(o) => { if (!o) setPracticePaper(null); }}
        onSaved={() => qc.invalidateQueries({ queryKey: ["past_paper_attempts"] })}
      />

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
