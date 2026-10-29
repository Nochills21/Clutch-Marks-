// Per-topic past-paper list.
//
// Free to read: every row links out to the board's own page for the
// qualification (see `officialPaperPage`). Nothing here serves a board PDF — we
// do not host or distribute papers — and nothing is behind the plan. The one
// paid action is "Submit for marking", our own AI marker.
import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
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
import { Archive, BookOpen, Play, ArrowRight, ExternalLink, Wand2 } from "lucide-react";
import { MarkPaperDialog } from "@/components/MarkPaperDialog";
import { archivePaperGroup, officialPaperPage } from "@/lib/pastPaperFiles";
import { relatedTopicPapers } from "@/lib/topicPapers";
import { useMySubjects } from "@/hooks/useMySubjects";
import { SubjectGate } from "@/components/SubjectGate";
import { NotInYourSubjects, useSubjectUnpicked } from "@/components/NotInYourSubjects";
import { StudyLoadError } from "@/components/StudyLoadError";

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
  const [subjectMeta, setSubjectMeta] = useState<Tables<"subjects"> | null>(null);
  const [subjectLevel, setSubjectLevel] = useState<Tables<"subject_levels"> | null>(null);
  const [topicTitle, setTopicTitle] = useState<string | null>(null);
  const topicSlug = slugifyTopicName(topic ?? "");
  const [topicId, setTopicId] = useState<string | null>(null);
  const [papers, setPapers] = useState<TopicPaper[]>([]);
  const [levelPapers, setLevelPapers] = useState<TopicPaper[]>([]);
  const [groupFilter, setGroupFilter] = useState("all");
  // Bumped by "Try again" to re-run the load effect.
  const [retryKey, setRetryKey] = useState(0);
  // The row the student tapped “Submit for marking” on — marking is scoped
  // to that paper's own mark scheme.
  const [markPaper, setMarkPaper] = useState<TopicPaper | null>(null);
  const { loaded: prefsLoaded, isAdmin: isAdminRole, needsSubjectPick } = useMySubjects();
  const unpicked = useSubjectUnpicked(subjectLevel?.id);

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

  // Every matching paper is shown: reading them is free, and the plan gate now
  // sits on the AI marker alone.
  const visiblePapers = groupFiltered;

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
      } catch (e) {
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
  // Shared with the other four surfaces that can open an unpicked subject —
  // see `useSubjectUnpicked`. `topicId` stays here: without it this is a
  // missing topic, not a missing pick.
  if (topicId && unpicked) {
    return (
      <NotInYourSubjects
        subjectLevelId={subjectLevel.id}
        subjectName={subjectMeta?.name ?? null}
        level={subjectLevel.level}
        backTo={topicNotesPath(subjectMeta?.slug ?? "", subjectLevel?.level.toLowerCase() ?? "", topicSlug)}
        backLabel="Back to topic"
      />
    );
  }

  if (error || !subjectMeta || !subjectLevel || !topicTitle || !topicId) {
    return (
      <StudyLoadError
        failure={error}
        loadTitle="Couldn't load these past papers"
        missingTitle="Past papers not found"
        missingDetail="No past papers have been linked to this topic yet."
        onRetry={() => setRetryKey((k) => k + 1)}
        backTo={topicNotesPath(subjectMeta?.slug ?? "", subjectLevel?.level.toLowerCase() ?? "", topicSlug)}
        backLabel="Back to topic"
      />
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
            Use these to practise under real exam conditions and check your answers against the mark schemes — papers and mark schemes are free to read on the board's own site.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link to={`/practice?level=${subjectLevel.id}&topic=${topicId}&mode=incorrect`}>Practise mistakes <ArrowRight className="h-3.5 w-3.5" /></Link>
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
            visiblePapers.map((p) => {
              // The board's own page for this qualification — the only place a
              // paper is opened from now on.
              const boardPage = officialPaperPage({
                ...p,
                subject_slug: subjectMeta.slug,
                level: subjectLevel.level,
              });
              return (
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
                  {boardPage && (
                    <Button asChild size="sm" variant="outline" className="gap-1.5 text-xs">
                      <a
                        href={boardPage}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Open ${p.title} on the board's own site`}
                      >
                        Get the paper <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1.5 text-xs"
                    title="Submit your solved script — marked against this paper's mark scheme"
                    onClick={() => setMarkPaper(p)}
                  >
                    <Wand2 className="h-3.5 w-3.5" /> Submit for marking
                  </Button>
                </div>
              </div>
              );
            })
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

      {/* Submit-for-marking scoped to the tapped paper's own mark scheme. */}
      <MarkPaperDialog
        paper={markPaper}
        open={markPaper !== null}
        onOpenChange={(o) => { if (!o) setMarkPaper(null); }}
      />
    </div>
  );
}
