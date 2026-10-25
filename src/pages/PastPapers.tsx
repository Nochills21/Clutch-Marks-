// Past-paper archive grouped by year; opens via watermarking proxy.
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { usePlanAccess, FREE_PREVIEW_LIMIT, usePreviewSliceWithLimit } from "@/components/PreviewLimit";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/lib/auth";
import { useMySubjects } from "@/hooks/useMySubjects";
import { SubjectGate } from "@/components/SubjectGate";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PaperPractice, type PracticePaper } from "@/components/PaperPractice";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  filterPapersForSubjects,
} from "@/lib/pastPaperFiles";
import { levelLabel } from "@/lib/levels";
import { Loader2, FileText, Search, ExternalLink, Clock, Trophy, Download, Wand2 } from "lucide-react";
import { SolvedPaperMarker } from "@/components/SolvedPaperMarker";
import { MarkPaperDialog, type MarkablePaper } from "@/components/MarkPaperDialog";
import { QueryError } from "@/components/QueryError";
import { loadFailureMessage } from "@/lib/net";

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
  level: "OL" | "AS" | "A2" | "IGCSE" | null;
}

/**
 * `past_papers.level` has four codes but three names: "OL" (0580/0610/0620/0625/
 * 0478) and "IGCSE" (the two English subjects) both read "IGCSE".
 *
 * One option per *code* therefore put the same word in the picker twice, and
 * each of those options hid the other code's papers. A filter choice names the
 * qualification and covers every code that goes by that name.
 */
interface ArchiveLevelFilter {
  label: string;
  codes: string[] | null;
}

const LEVEL_FILTERS: ArchiveLevelFilter[] = [
  { label: "All levels", codes: null },
  { label: "IGCSE", codes: ["OL", "IGCSE"] },
  { label: "AS Level", codes: ["AS"] },
  { label: "A2 Level", codes: ["A2"] },
];

/**
 * A `?level=` value as a filter label. Accepts a code — older links, and the
 * topic pages, which pass the stored code — as well as a label, so an English
 * topic's `?level=IGCSE` link keeps its level instead of silently widening to
 * every level.
 */
function levelFilterFromParam(raw: string | null): string {
  const value = (raw ?? "").trim();
  if (!value) return "All levels";
  const upper = value.toUpperCase();
  const byCode = LEVEL_FILTERS.find((f) => f.codes?.includes(upper));
  if (byCode) return byCode.label;
  const byLabel = LEVEL_FILTERS.find((f) => f.label.toLowerCase() === value.toLowerCase());
  return byLabel?.label ?? "All levels";
}

/**
 * One page of the archive, selected with its topic so the card can name it —
 * and typed from the select itself, so the embed's shape cannot drift from the
 * interface above.
 */
const archivePapersPage = (from: number) =>
  supabase
    .from("past_papers")
    .select("*, topics(name, subject_levels(level, subjects(name, slug)))")
    .order("year", { ascending: false })
    .order("id")
    .range(from, from + 999);

type ArchivePaper = NonNullable<Awaited<ReturnType<typeof archivePapersPage>>["data"]>[number];

// `paper_number` rows already read "Paper 1 (12)" — prefixing another "Paper"
// rendered "Paper Paper 1 (12)".
// Cambridge rows store "Paper 2 (22)" and Edexcel IAL rows "Unit 3 (WBI13/01)", so
// the prefix is only added when the value carries neither word.
const paperLabel = (n: string | null) => (!n ? "—" : /^(paper|unit)\b/i.test(n) ? n : `Paper ${n}`);

export default function PastPapers() {
  const { toast } = useToast();
  const { user } = useAuth();
  const qc = useQueryClient();
  const { pickedIds, loaded: prefsLoaded, isAdmin, needsSubjectPick } = useMySubjects();
  const { data: subjectLevels } = useQuery({
    queryKey: ["archive_subject_levels"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subject_levels")
        .select("id, level, subjects(name, slug)")
        .eq("is_active", true);
      if (error) throw error;
      return data ?? [];
    },
  });
  // The archive can be entered from a topic page (`?subject=…&topic=…`) or from
  // the ⌘K palette, which is what makes "past papers for this topic" a single
  // hop instead of a hunt through the filters. The query is the initial state,
  // and the effect below re-reads it: React Router keeps this component mounted
  // when only the query changes, so without it a jump from one topic's papers to
  // another's left the previous topic's filters — and its papers — on screen.
  const [params] = useSearchParams();
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState(params.get("year") ?? "all");
  const [subjectFilter, setSubjectFilter] = useState(params.get("subject") ?? "all");
  const [topicFilter, setTopicFilter] = useState(params.get("topic") ?? "all");
  const [levelFilter, setLevelFilter] = useState(() => levelFilterFromParam(params.get("level")));
  const [boardFilter, setBoardFilter] = useState("all");
  const [paperFilter, setPaperFilter] = useState("all");
  const [sessionFilter, setSessionFilter] = useState("all");
  // A new set of query params is a new request from the student (topic → papers,
  // palette → papers), so the selects take their values from the URL whenever
  // it changes. Choosing a filter by hand never rewrites the URL, so this cannot
  // undo a manual choice.
  useEffect(() => {
    setYearFilter(params.get("year") ?? "all");
    setSubjectFilter(params.get("subject") ?? "all");
    setTopicFilter(params.get("topic") ?? "all");
    setLevelFilter(levelFilterFromParam(params.get("level")));
  }, [params]);

  const [practicePaper, setPracticePaper] = useState<PracticePaper | null>(null);
  // The paper whose row the student tapped “Submit for marking” on — the
  // marking is scoped to that paper's own mark scheme.
  const [markPaper, setMarkPaper] = useState<MarkablePaper | null>(null);

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
      // Paged, because PostgREST answers at most `max_rows` rows per request
      // (1000 on this project) no matter what the client asks for. The archive
      // is past that figure, so one request silently dropped its tail — and a
      // topic whose only papers sat in that tail looked unfiled. `order("id")`
      // after the year keeps page boundaries stable.
      const rows: ArchivePaper[] = [];
      for (let from = 0; ; from += 1000) {
        const { data, error } = await archivePapersPage(from);
        if (error) throw error;
        rows.push(...(data ?? []));
        if ((data ?? []).length < 1000) break;
      }
      return rows;
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

  const handleOpenFile = async (url: string) => {
    try {
      await openProtectedFile("past-papers", url);
    } catch (e) {
      toast({ title: "Unable to open file", description: e?.message ?? "Please try again", variant: "destructive" });
    }
  };

  // Save-to-disk variant. Same watermarked bytes as opening, but the browser is
  // told to download (and what to call the file) instead of previewing it.
  const handleDownloadFile = async (url: string, name: string) => {
    try {
      await openProtectedFile("past-papers", url, name);
    } catch (e) {
      toast({ title: "Unable to download file", description: e?.message ?? "Please try again", variant: "destructive" });
    }
  };

  // External papers route through serve-external-paper, which enforces the
  // plan and audits the click. A gated rejection becomes an upgrade prompt.
  const handleOpenExternal = async (url: string, label?: string) => {
    try {
      await openExternalPaper(url, label);
    } catch (e) {
      if (e instanceof ExternalPaperGated) {
        toast({ title: "Full plan required", description: e.message });
        return;
      }
      toast({ title: "Unable to open link", description: e?.message ?? "Please try again", variant: "destructive" });
    }
  };

  // Topic-linked rows use topic ownership; metadata-only rows use their
  // persisted subject_slug + level. The latter matters for archive papers that
  // are correctly classified but intentionally not assigned to a single topic.
  const topicToSl = useMemo(() => {
    const m = new Map<string, string>();
    (topics ?? []).forEach((t) => { if (t.subject_level_id) m.set(t.id, t.subject_level_id); });
    return m;
  }, [topics]);

  const subjectLevelByCode = useMemo(() => {
    const m = new Map<string, string>();
    (subjectLevels ?? []).forEach((row) => {
      const slug = row.subjects?.slug;
      if (slug && row.level) m.set(`${slug.toLowerCase()}/${String(row.level).toUpperCase()}`, row.id);
    });
    return m;
  }, [subjectLevels]);

  const scopedPapers = useMemo(
    () => filterPapersForSubjects(papers ?? [], {
      isAdmin,
      loaded: prefsLoaded,
      signedIn: !!user,
      pickedSubjectLevels: pickedIds,
      topicSubjectLevels: topicToSl,
      subjectLevelByCode,
    }),
    [papers, isAdmin, prefsLoaded, user, pickedIds, topicToSl, subjectLevelByCode],
  );

  // Subject names come from the subject_levels query rather than being
  // title-cased from the slug, so "english-first-language-cambridge" reads as the
  // name the console uses.
  const subjectNameBySlug = useMemo(() => {
    const m = new Map<string, string>();
    (subjectLevels ?? []).forEach((row) => {
      const slug = row.subjects?.slug?.toLowerCase();
      const name = row.subjects?.name;
      if (slug && name) m.set(slug, name);
    });
    return m;
  }, [subjectLevels]);

  const subjectOptions = useMemo(() => {
    const set = new Set<string>();
    (scopedPapers ?? []).forEach((p) => { if (p.subject_slug) set.add(p.subject_slug.toLowerCase()); });
    return [...set]
      .map((slug) => ({ slug, name: subjectNameBySlug.get(slug) ?? slug }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [scopedPapers, subjectNameBySlug]);

  // Only topics that actually hold papers, so the picker is a short list of real
  // choices rather than every topic in the catalogue.
  const topicOptions = useMemo(() => {
    const withPapers = new Set<string>();
    (scopedPapers ?? []).forEach((p) => { if (p.topic_id) withPapers.add(p.topic_id); });
    const slugByLevel = new Map<string, string>();
    const codeByLevel = new Map<string, string>();
    (subjectLevels ?? []).forEach((row) => {
      const slug = row.subjects?.slug?.toLowerCase();
      if (slug) slugByLevel.set(row.id, slug);
      codeByLevel.set(row.id, row.level);
    });
    // The level filter runs *after* this slice, so a topic from another level
    // could match the topic filter and then be filtered away — an empty list
    // with no banner to explain it. Offer only the levels that filter covers.
    const levelCodes = LEVEL_FILTERS.find((f) => f.label === levelFilter)?.codes ?? null;
    const list = (topics ?? [])
      .filter((t) => withPapers.has(t.id))
      .filter((t) => subjectFilter === "all" || slugByLevel.get(t.subject_level_id) === subjectFilter)
      .filter((t) => {
        const code = codeByLevel.get(t.subject_level_id);
        return !!code && (levelCodes === null || levelCodes.includes(code));
      })
      .map((t) => ({ id: t.id, name: t.name, code: codeByLevel.get(t.subject_level_id) ?? "" }));
    // Maths AS and A2 both teach "Trigonometry", "Integration" and five more, so
    // a bare name would appear twice and one of the two would silently hide the
    // other's papers. Label the repeats with their level.
    const repeats = new Map<string, number>();
    list.forEach((t) => repeats.set(t.name, (repeats.get(t.name) ?? 0) + 1));
    return list
      .map((t) => ({
        id: t.id,
        name: (repeats.get(t.name) ?? 0) > 1 ? `${t.name} (${levelLabel(t.code)})` : t.name,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [scopedPapers, topics, subjectLevels, subjectFilter, levelFilter]);

  // Filter options come from the whole subject-scoped archive, not the free
  // slice, so a student can see (and reach) every board / paper / session on
  // offer. Sessions always include the full board calendar, `Specimen` included.
  const boardOptions = useMemo(() => {
    const set = new Set<string>();
    (scopedPapers ?? []).forEach((p) => set.add(archiveBoard(p)));
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [scopedPapers]);

  const paperOptions = useMemo(() => {
    const set = new Set<string>();
    (scopedPapers ?? []).forEach((p) => set.add(archivePaperGroup(p)));
    return [...set].sort((a, b) => paperSortKey(a).localeCompare(paperSortKey(b)));
  }, [scopedPapers]);

  const sessionOptions = useMemo(() => {
    const set = new Set<string>(SESSION_ORDER);
    (scopedPapers ?? []).forEach((p) => { if (p.session) set.add(p.session); });
    return [...set].sort(sortSessions);
  }, [scopedPapers]);

  // Every filter — search included — runs BEFORE the free-preview slice. It used
  // to be applied to `visiblePapers` (the slice), so a free student searching
  // for an older paper or a specimen only ever searched the first
  // `FREE_PREVIEW_LIMIT` rows and concluded the paper did not exist.
  // Subject and topic first: they are the student's own words ("Physics", "Forces
  // and Motion"), so everything downstream — board, paper, session and the year
  // chips — reflects the slice they asked for instead of the whole archive.
  const topicScoped = useMemo(
    () => (scopedPapers ?? []).filter((p) => {
      if (subjectFilter !== "all" && (p.subject_slug ?? "").toLowerCase() !== subjectFilter) return false;
      if (topicFilter !== "all" && p.topic_id !== topicFilter) return false;
      return true;
    }),
    [scopedPapers, subjectFilter, topicFilter],
  );

  // Most archive rows are filed by subject and level but carry no topic, so a
  // topic link from a topic page could land on an empty archive. Widening to the
  // subject keeps the student on the right shelf, and the banner below says why
  // the list is wider than the link they followed.
  const topicUnfiled =
    topicFilter !== "all" && (scopedPapers ?? []).length > 0 && topicScoped.length === 0;
  const subjectScoped = useMemo(
    () => (topicUnfiled
      ? (scopedPapers ?? []).filter(
          (p) => subjectFilter === "all" || (p.subject_slug ?? "").toLowerCase() === subjectFilter,
        )
      : topicScoped),
    [topicUnfiled, scopedPapers, subjectFilter, topicScoped],
  );

  // The level filter runs on the *codes* a label covers, before the shared
  // archive predicate: that predicate compares one raw code, which is why
  // "IGCSE" used to reach only the OL papers.
  const levelScoped = useMemo(() => {
    const codes = LEVEL_FILTERS.find((f) => f.label === levelFilter)?.codes;
    if (!codes) return subjectScoped;
    return subjectScoped.filter((p) => codes.includes(String(p.level ?? "").toUpperCase()));
  }, [subjectScoped, levelFilter]);

  const matchedPapers = useMemo(
    () => filterArchivePapers(levelScoped, {
      search,
      board: boardFilter,
      paper: paperFilter,
      session: sessionFilter,
    }),
    [levelScoped, search, boardFilter, paperFilter, sessionFilter],
  );

  // Year chips reflect the papers that survive the other filters, so switching
  // board or session never offers a year that would come up empty.
  const years = [...new Set(matchedPapers.map((p) => p.year))].sort((a, b) => b - a);
  const yearScoped = yearFilter === "all" ? matchedPapers : matchedPapers.filter((p) => p.year === Number(yearFilter));
  const { slice: visiblePapers } = usePreviewSliceWithLimit(yearScoped, FREE_PREVIEW_LIMIT);
  const filteredPapers = visiblePapers ?? [];

  const groupedPapers = years
    .map((y) => ({ year: y, papers: filteredPapers.filter((p) => p.year === y) }))
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
          Download past exam papers and mark schemes. Solve one on paper and mark it with the{" "}
          <Link to="/ai-marker" className="font-semibold text-primary underline decoration-primary/30 underline-offset-4">AI Marker</Link>.
        </p>
      </div>

      {/* A failed load says so, with a retry, instead of showing a year list. */}
      {(papersError || topicsError) && (
        <QueryError
          message={loadFailureMessage("past papers", papersError ?? topicsError)}
          onRetry={() => refetchPapers()}
        />
      )}

      {/* AI marking of an uploaded solved paper. The component gates itself:
          free accounts get an upgrade card, and the worker enforces the plan
          server-side regardless. */}
      <div className="max-w-4xl mx-auto">
        <SolvedPaperMarker title="Mark a solved past paper" />
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
              <Select
                value={subjectFilter}
                onValueChange={(value) => {
                  setSubjectFilter(value);
                  // A topic from another subject can never survive this slice, so
                  // keeping it would silently empty the page.
                  setTopicFilter("all");
                }}
              >
                <SelectTrigger className="w-[200px]" aria-label="Filter by subject">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All subjects</SelectItem>
                  {subjectOptions.map((s) => (
                    <SelectItem key={s.slug} value={s.slug}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={topicFilter} onValueChange={setTopicFilter}>
                <SelectTrigger className="w-[220px]" aria-label="Filter by topic">
                  <SelectValue placeholder="Topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All topics</SelectItem>
                  {topicOptions.map((t) => (
                    <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-[170px]" aria-label="Filter by level">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {LEVEL_FILTERS.map((f) => (
                    <SelectItem key={f.label} value={f.label}>{f.label}</SelectItem>
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
            {topicUnfiled && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-primary/25 bg-primary/5 px-4 py-2.5 text-sm">
                <span>
                  No papers are filed under{" "}
                  <span className="font-medium">
                    {(topics ?? []).find((t) => t.id === topicFilter)?.name ?? "this topic"}
                  </span>{" "}
                  yet — showing every paper for this subject instead.
                </span>
                <Button size="sm" variant="ghost" onClick={() => setTopicFilter("all")}>
                  Clear topic
                </Button>
              </div>
            )}
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
            g.papers.map((p) => (
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
                      {p.topics?.subject_levels?.level && (
                        <Badge variant="outline" className="text-[10px] uppercase tracking-[0.08em]">
                          {levelLabel(p.topics?.subject_levels?.level)}
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
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5"
                        title="Submit your solved script — marked against this paper's mark scheme"
                        onClick={() => setMarkPaper(p)}
                      >
                        <Wand2 className="h-3.5 w-3.5" /> Submit for marking
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

      {/* Submit-for-marking scoped to the tapped paper's own mark scheme. */}
      <MarkPaperDialog
        paper={markPaper}
        open={markPaper !== null}
        onOpenChange={(o) => { if (!o) setMarkPaper(null); }}
      />

    </div>
  );
}
