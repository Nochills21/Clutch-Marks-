// Per-topic past-paper list.
import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SEOHead } from "@/components/SEOHead";
import { TopicBreadcrumb } from "@/components/TopicBreadcrumb";
import { LEVELS, LEVEL_LABELS, subjectIcon, subjectAccent, type SubjectLevelCode } from "@/lib/subjects";
import {
  topicNotesPath,
  topicQuizPath,
  topicPapersPath,
  slugifyTopicName,
  topicSlugOf,
} from "@/lib/topicUrls";
import { topicHead } from "@/lib/topicSeo";
import { Archive, BookOpen, Play, Clock, ArrowRight, ArrowLeft, FileText, FileCheck, ExternalLink, Sparkles, RotateCcw, Download } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { openProtectedFile, openExternalPaper, ExternalPaperGated } from "@/lib/contentFiles";
import { paperFileName, archivePaperGroup } from "@/lib/pastPaperFiles";
import { relatedTopicPapers } from "@/lib/topicPapers";
import { usePlanAccess, FREE_PREVIEW_LIMIT } from "@/components/PreviewLimit";
import { PreviewBanner } from "@/components/PreviewBanner";
import { useMySubjects } from "@/hooks/useMySubjects";
import { useAuth } from "@/lib/auth";
import { SubjectGate } from "@/components/SubjectGate";

interface TopicPaper {
  id: string;
  title: string;
  year: number;
  session: string | null;
  paper_number: string | null;
  paper_url: string | null;
  mark_scheme_url: string | null;
  source_url: string | null;
  topic_id: string | null;
}

export default function TopicPapers() {
  const { slug: subject, level, topic } = useParams<{
    slug: string;
    level: string;
    topic: string;
  }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subjectMeta, setSubjectMeta] = useState<any>(null);
  const [subjectLevel, setSubjectLevel] = useState<any>(null);
  const [topicTitle, setTopicTitle] = useState<string | null>(null);
  const topicSlug = slugifyTopicName(topic ?? "");
  const [topicId, setTopicId] = useState<string | null>(null);
  const [papers, setPapers] = useState<TopicPaper[]>([]);
  const [levelPapers, setLevelPapers] = useState<TopicPaper[]>([]);
  const [groupFilter, setGroupFilter] = useState("all");
  // Bumped by "Try again" to re-run the load effect.
  const [retryKey, setRetryKey] = useState(0);
  const { toast } = useToast();
  const { isPreview, hasPaid } = usePlanAccess();
  const { user } = useAuth();
  const { pickedIds, loaded: prefsLoaded, isAdmin: isAdminRole, needsSubjectPick } = useMySubjects();

  // Paper-aware set: the topic's own tagged papers plus every other paper in
  // this subject-level sitting in the same paper group — so a Paper 1 lesson
  // lists Paper 1 papers (with their mark schemes), a mechanics lesson lists
  // mechanics papers, and so on for every paper of every subject and level.
  // Topics with no tagged papers of their own fall back to the whole level.
  const related = useMemo(
    () => relatedTopicPapers(topicId ?? "", papers, levelPapers.length > 0 ? levelPapers : papers),
    [topicId, papers, levelPapers],
  );
  const groupFiltered = groupFilter === "all"
    ? related.papers
    : related.papers.filter((p) => archivePaperGroup(p) === groupFilter);

  // Free-plan limit for this topic's past papers: show the first 2 records
  // (follows the global FREE_PREVIEW_LIMIT policy); paid accounts see all.
  const visiblePapers = hasPaid
    ? groupFiltered
    : isPreview
      ? groupFiltered.slice(0, FREE_PREVIEW_LIMIT)
      : groupFiltered;

  const openPaper = async (url: string) => {
    try {
      await openProtectedFile("past-papers", url);
    } catch (e: any) {
      toast({ title: "Error", description: e?.message ?? "Unable to open file", variant: "destructive" });
    }
  };

  // Save-to-disk variant of openPaper: same watermarked bytes, but the browser
  // is told to download them (with a sensible filename) instead of previewing.
  const downloadPaper = async (url: string, name: string) => {
    try {
      await openProtectedFile("past-papers", url, name);
    } catch (e: any) {
      toast({ title: "Error", description: e?.message ?? "Unable to download file", variant: "destructive" });
    }
  };

  // External papers route through serve-external-paper, which enforces the plan
  // and audits the click; a gated rejection becomes an upgrade prompt.
  const openExternal = async (url: string, label?: string) => {
    try {
      await openExternalPaper(url, label);
    } catch (e: any) {
      if (e instanceof ExternalPaperGated) {
        toast({ title: "Full plan required", description: e.message });
        return;
      }
      toast({ title: "Error", description: e?.message ?? "Unable to open link", variant: "destructive" });
    }
  };

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: sub, error: subError } = await supabase.from("subjects").select("*").ilike("slug", subject ?? "").limit(1);
        if (subError) throw subError;
        const subjectRow = sub?.[0] ?? null;
        if (!subjectRow) {
          setError("Subject not found");
          setLoading(false);
          return;
        }
        setSubjectMeta(subjectRow);

        const { data: sl, error: slError } = await supabase.from("subject_levels").select("*").eq("subject_id", subjectRow.id).eq("level", (level ?? "").toUpperCase() as SubjectLevelCode).limit(1);
        if (slError) throw slError;
        const levelRow = sl?.[0] ?? null;
        if (!levelRow) {
          setError("Level not found");
          setLoading(false);
          return;
        }
        setSubjectLevel(levelRow);

        const { data: tps, error: tpsError } = await supabase.from("topics").select("*").eq("subject_level_id", levelRow.id).order("sort_order");
        if (tpsError) throw tpsError;
        const topicList = tps ?? [];
        const topicRow = topicList.find(
          (t) =>
            topicSlugOf(t) === topicSlug ||
            // Last-resort match for URLs minted before slugs were persisted.
            slugifyTopicName(t.name) === topicSlug ||
            t.name.toLowerCase() === (topic ?? "").replace(/-/g, " ").toLowerCase(),
        );
        if (!topicRow) {
          setError("Topic not found on this level");
          setLoading(false);
          return;
        }
        setTopicTitle(topicRow.name);
        setTopicId(topicRow.id);
        setGroupFilter("all");

        if (active && topicRow) {
          const levelTopicIds = topicList.map((t) => t.id);
          const [ownRes, levelRes] = await Promise.all([
            supabase.from("past_papers").select("*").eq("topic_id", topicRow.id).order("year", { ascending: false }),
            supabase.from("past_papers").select("*").in("topic_id", levelTopicIds).order("year", { ascending: false }),
          ]);
          if (ownRes.error) throw ownRes.error;
          if (levelRes.error) throw levelRes.error;
          if (active) {
            setPapers((ownRes.data ?? []) as unknown as TopicPaper[]);
            setLevelPapers((levelRes.data ?? []) as unknown as TopicPaper[]);
          }
        }
      } catch (e: any) {
        setError(e.message ?? "Failed to load topic past papers");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [subject, level, topic, topicSlug, retryKey]);

  if (!isAdminRole && !prefsLoaded) {
    return (
      <div className="flex justify-center py-24">
        <div className="h-8 w-8 rounded-full border-primary/30 border animate-spin" />
      </div>
    );
  }
  // "Does this reader still have to pick subjects?" is asked in one place.
  if (needsSubjectPick) {
    return (
      <div className="space-y-6">
        <SEOHead title={`${topicTitle ?? "Past Papers"} — Clutch Marks`} description="Past papers and mark schemes." path={topicPapersPath(subjectMeta?.slug ?? "", subjectLevel?.level.toLowerCase() ?? "", topicSlug)} />
        <SubjectGate />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-28 rounded-2xl" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  // Students only see topics belonging to a subject-level they picked.
  // Anonymous visitors are not enrolled in any subject yet, so they see the
  // topic regardless; signing in and picking it afterwards personalises the
  // view.
  if (!isAdminRole && user && prefsLoaded && topicId && !pickedIds.has(subjectLevel?.id ?? "")) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Past papers not found</CardTitle>
          <CardDescription>You haven't selected this subject yet.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline" className="gap-2">
            <Link to={topicNotesPath(subjectMeta?.slug ?? "", subjectLevel?.level.toLowerCase() ?? "", topicSlug)}><ArrowLeft className="h-4 w-4" /> Back to topic</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (error || !subjectMeta || !subjectLevel || !topicTitle || !topicId) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            {error && !/not found/i.test(error) ? "Couldn't load these past papers" : "Past papers not found"}
          </CardTitle>
          <CardDescription>{error ?? "No past papers have been linked to this topic yet."}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2" onClick={() => setRetryKey((k) => k + 1)}>
            <RotateCcw className="h-4 w-4" /> Try again
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link to={topicNotesPath(subjectMeta?.slug ?? "", subjectLevel?.level.toLowerCase() ?? "", topicSlug)}><ArrowLeft className="h-4 w-4" /> Back to topic</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const Icon = subjectIcon(subjectMeta.icon);
  const accent = subjectAccent(subjectMeta.color);
  const levelCode = subjectLevel.level as SubjectLevelCode;
  const topicSeo = topicHead(
    {
      subjectSlug: subjectMeta.slug,
      subjectName: subjectMeta.name,
      level: subjectLevel.level,
      topicSlug,
      topicName: topicTitle,
    },
    "papers",
  );

  return (
    <div className="space-y-6">
      <PreviewBanner />
      {/* Title, description, canonical and JSON-LD come from topicSeo, which is
          also what the build-time prerenderer writes into this URL's static HTML
          — so the crawler's head and the browser's head cannot disagree. */}
      <SEOHead {...topicSeo} />

      <TopicBreadcrumb
        subjectName={subjectMeta.name}
        levelLabel={LEVEL_LABELS[levelCode]}
        topicName={topicTitle}
        currentLabel="Past Papers & Mark Schemes"
        subjectSlug={subjectMeta.slug}
        level={subjectLevel.level.toLowerCase()}
        topicSlug={topicSlug}
      />

      <div className={`glass-card p-6 flex flex-wrap items-center gap-4 ${accent.border}`}>
        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${accent.border} ${accent.bg} ${accent.text}`}>
          <Icon className="h-7 w-7" />
        </div>
        <div className="flex-1 min-w-[200px]">
          <h1 className="text-2xl font-bold tracking-tight">{topicTitle}</h1>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="secondary">{subjectMeta.name}</Badge>
            <Badge variant="outline">{LEVEL_LABELS[levelCode]}</Badge>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {groupFiltered.length} past paper{groupFiltered.length === 1 ? "" : "s"} linked to {topicTitle} in {subjectMeta.name} {LEVEL_LABELS[levelCode]}.
            {related.filtered && related.groups.length > 0 && (
              <span> Showing {related.groups.join(", ")} papers for this topic.</span>
            )}
            {isPreview && !hasPaid && (
              <span className="text-xs text-primary"> ({visiblePapers.length} of {groupFiltered.length} shown — full archive on the full plan)</span>
            )}
            Use these to practise under real exam conditions and check your answers against the mark schemes.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link to={`/practice?level=${subjectLevel.id}&topic=${topicId}`}>Practise mistakes <ArrowRight className="h-3.5 w-3.5" /></Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "Past Papers", value: groupFiltered.length, icon: Archive, color: accent.text },
          { label: "Notes", value: 0, icon: BookOpen, color: accent.text },
          { label: "Topic Questions", value: 0, icon: Play, color: accent.text },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-3 p-4">
              <s.icon className={`h-5 w-5 ${s.color}`} />
              <div>
                <p className="text-xl font-bold leading-none">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><Archive className="h-5 w-5 text-primary" /> Past Papers & Mark Schemes for {topicTitle}</CardTitle>
          <CardDescription>Organised by year, session and paper number</CardDescription>
          {related.groups.length > 1 && (
            <div className="flex flex-wrap gap-2 px-6">
              <Button
                size="sm"
                variant={groupFilter === "all" ? "default" : "outline"}
                onClick={() => setGroupFilter("all")}
              >
                All ({related.papers.length})
              </Button>
              {related.groups.map((g) => (
                <Button
                  key={g}
                  size="sm"
                  variant={groupFilter === g ? "default" : "outline"}
                  onClick={() => setGroupFilter(groupFilter === g ? "all" : g)}
                >
                  {g} ({related.papers.filter((p) => archivePaperGroup(p) === g).length})
                </Button>
              ))}
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-2">
          {visiblePapers.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">No past papers have been linked to this topic yet.</p>
          ) : (
            visiblePapers.map((p) => (
              <div
                key={p.id}
                className="flex flex-col gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{p.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {p.year}
                    {p.session ? ` · ${p.session}` : ""}
                    {p.paper_number ? ` · ${p.paper_number}` : ""}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:shrink-0 sm:justify-end">
                  {p.paper_url && (
                    <>
                      <Button size="sm" variant="outline" className="gap-1.5 text-xs" onClick={() => openPaper(p.paper_url!)}>
                        <FileText className="h-3.5 w-3.5" /> Paper
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="gap-1.5 text-xs"
                        aria-label={`Download ${p.title} question paper`}
                        title="Download question paper"
                        onClick={() => downloadPaper(p.paper_url!, paperFileName(p.title, "paper"))}
                      >
                        <Download className="h-3.5 w-3.5" /> Download
                      </Button>
                    </>
                  )}
                  {p.mark_scheme_url && (
                    <>
                      <Button size="sm" variant="outline" className="gap-1.5 text-xs text-green-600 border-green-200 hover:bg-green-50" onClick={() => openPaper(p.mark_scheme_url!)}>
                        <FileCheck className="h-3.5 w-3.5" /> Mark Scheme
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="gap-1.5 text-xs text-green-600"
                        aria-label={`Download ${p.title} mark scheme`}
                        title="Download mark scheme"
                        onClick={() => downloadPaper(p.mark_scheme_url!, paperFileName(p.title, "mark-scheme"))}
                      >
                        <Download className="h-3.5 w-3.5" /> Download
                      </Button>
                    </>
                  )}
                  {!p.paper_url && !p.mark_scheme_url && (
                    <Badge variant="secondary" className="gap-1.5 text-[10px] text-muted-foreground">
                      <Clock className="h-3 w-3" /> Files coming soon
                    </Badge>
                  )}
                  {p.source_url && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1.5 text-xs"
                      onClick={() => openExternal(p.source_url!, p.title)}
                    >
                      Official paper <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
          {!hasPaid && isPreview && groupFiltered.length > visiblePapers.length && (
            <div className="mt-4 flex justify-between items-center border-t pt-4">
              <p className="text-sm text-muted-foreground">{groupFiltered.length - visiblePapers.length} more paper{groupFiltered.length - visiblePapers.length === 1 ? "" : "s"} available on the full plan.</p>
              <Button asChild variant="outline" size="sm">
                <Link to="/pricing"><Sparkles className="h-3.5 w-3.5 mr-2" /> View plans</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2"><BookOpen className="h-5 w-5 text-primary" /> Revision Notes</CardTitle>
            <CardDescription>Notes linked to {topicTitle}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground py-4 text-center">No revision notes have been uploaded for this topic yet.</p>
            <Button asChild variant="outline" className="gap-2 w-full justify-center">
              <Link to={topicNotesPath(subjectMeta.slug, subjectLevel.level.toLowerCase(), topicSlug)}>
                Browse notes <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2"><Play className="h-5 w-5 text-primary" /> Topic Questions</CardTitle>
            <CardDescription>Questions linked to {topicTitle}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground py-4 text-center">No topic questions have been created for this topic yet.</p>
            <Button asChild variant="outline" className="gap-2 w-full justify-center">
              <Link to={topicQuizPath(subjectMeta.slug, subjectLevel.level.toLowerCase(), topicSlug)}>
                Browse questions <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
