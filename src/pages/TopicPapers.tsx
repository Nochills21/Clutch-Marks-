// Per-topic past-paper list.
//
// Free to read: every row links out to the board's own page for the
// qualification (see `officialPaperPage`). Nothing here serves a board PDF — we
// do not host or distribute papers — and nothing is behind the plan. The one
// paid action is "Submit for marking", our own AI marker.
import { useEffect, useMemo, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SEOHead } from "@/components/SEOHead";
import { TopicBreadcrumb } from "@/components/TopicBreadcrumb";
import { LEVELS, LEVEL_LABELS, subjectIcon, subjectAccent, type SubjectLevelCode } from "@/lib/subjects";
import { canonicalLevelSlug, levelAliasCodes, levelNeedsRedirect } from "@/lib/levelSlug";
import { uniqueTopicPrefix } from "@/lib/topicLookup";
import {
  topicNotesPath,
  topicQuizPath,
  topicPapersPath,
  slugifyTopicName,
  topicSlugOf,
} from "@/lib/topicUrls";
import { topicHead } from "@/lib/topicSeo";
import { Archive, ArrowRight, ExternalLink, Wand2, BookOpen, Play } from "lucide-react";
import { PaperDesk } from "@/components/PaperDesk";
import { MarkPaperDialog } from "@/components/MarkPaperDialog";
import { archivePaperGroup, officialPaperPage, sortSessions } from "@/lib/pastPaperFiles";
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
  // Which paper the desk has open. The desk owns the selection so the phone
  // layout can expand the chosen row in place.
  const [selectedPaperId, setSelectedPaperId] = useState<string | null>(null);
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
  // Newest first, then by the board's own session order. `relatedTopicPapers`
  // concatenates the topic's own rows with the level's, so the list arrived in
  // query order — and because a paper's title does not carry its sitting, a
  // reader met five identical headings in no order at all.
  const groupFiltered = (groupFilter === "all"
    ? related.papers
    : related.papers.filter((p) => archivePaperGroup(p) === groupFilter))
    .slice()
    .sort(
      (a, b) =>
        (b.year ?? 0) - (a.year ?? 0) ||
        sortSessions(a.session ?? "", b.session ?? "") ||
        archivePaperGroup(a).localeCompare(archivePaperGroup(b)),
    );

  // Every matching paper is shown: reading them is free, and the plan gate now
  // sits on the AI marker alone.
  const visiblePapers = groupFiltered;
  // Open the newest paper in view so the pane is never an empty hint on arrival.
  // A group-filter change keeps the choice while the paper is still listed and
  // falls back to the first row when it is not.
  const selectedPaper = useMemo(
    () => visiblePapers.find((p) => p.id === selectedPaperId) ?? visiblePapers[0] ?? null,
    [visiblePapers, selectedPaperId],
  );

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

        // `igcse` and `ol` resolve to the same level; the canonical redirect
        // below keeps one address for it (see @/lib/levelSlug).
        const { data: sl, error: slError } = await supabase.from("subject_levels").select("*").eq("subject_id", subjectRow.id).in("level", levelAliasCodes(level ?? "")).limit(1);
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
        // A shortened address resolves only when one topic can match it.
        const topicRow = topicList.find(
          (t) =>
            topicSlugOf(t) === topicSlug ||
            // Last-resort match for URLs minted before slugs were persisted.
            slugifyTopicName(t.name) === topicSlug ||
            t.name.toLowerCase() === (topic ?? "").replace(/-/g, " ").toLowerCase(),
        ) ?? uniqueTopicPrefix(topicList, topicSlug);
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
  if (subjectLevel && levelNeedsRedirect(subjectLevel.level, level ?? "")) {
    return (
      <Navigate
        replace
        to={`/study/${subject}/${canonicalLevelSlug(subjectLevel.level)}/${topicSlug}/papers`}
      />
    );
  }

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

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><Archive className="h-5 w-5 text-primary" /> Past Papers & Mark Schemes for {topicTitle}</CardTitle>
          <CardDescription>
            Pick a paper for its sitting, the board's own page (question paper and mark scheme) and the next step into the topic.
          </CardDescription>
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
        <CardContent>
          <PaperDesk
            papers={visiblePapers}
            selected={selectedPaper}
            onSelect={(paper) => setSelectedPaperId(paper.id)}
            ariaLabel={`Past papers for ${topicTitle}`}
            empty={
              <p className="text-sm text-muted-foreground py-4 text-center">
                No past papers have been linked to this topic yet.
              </p>
            }
            hint="Choose a paper to see its sitting, where to read it on the board's site, and the notes and questions this topic is examined on."
            renderDetail={(paper) => {
              // The board's own page for this qualification — the only place a
              // paper is opened from now on.
              const boardPage = officialPaperPage({
                ...paper,
                subject_slug: subjectMeta.slug,
                level: subjectLevel.level,
              });
              return (
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                      {archivePaperGroup(paper)} · {LEVEL_LABELS[levelCode]}
                    </p>
                    <h3 className="mt-1 text-sm font-semibold leading-snug">{paper.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {[paper.session, `Year ${paper.year}`, paper.paper_number].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {boardPage && (
                      <Button asChild size="sm" className="gap-1.5">
                        <a
                          href={boardPage}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`Open ${paper.title} on the board's own site`}
                        >
                          Get the paper <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1.5"
                      title="Submit your solved script — marked against this paper's mark scheme"
                      onClick={() => setMarkPaper(paper)}
                    >
                      <Wand2 className="h-3.5 w-3.5" /> Submit for marking
                    </Button>
                  </div>
                  <div className="space-y-1.5 border-t pt-3">
                    <p className="text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                      Bridge into the topic
                    </p>
                    <Link
                      to={topicNotesPath(subjectMeta.slug, subjectLevel.level.toLowerCase(), topicSlug)}
                      className="flex items-center gap-1.5 text-sm text-primary hover:underline"
                    >
                      <BookOpen className="h-3.5 w-3.5 shrink-0" /> Read the notes for {topicTitle}
                    </Link>
                    <Link
                      to={topicQuizPath(subjectMeta.slug, subjectLevel.level.toLowerCase(), topicSlug)}
                      className="flex items-center gap-1.5 text-sm text-primary hover:underline"
                    >
                      <Play className="h-3.5 w-3.5 shrink-0" /> Work the topic questions — method on every answer
                    </Link>
                    <Link
                      to={`/practice?level=${subjectLevel.id}&topic=${topicId}&mode=incorrect`}
                      className="flex items-center gap-1.5 text-sm text-primary hover:underline"
                    >
                      <ArrowRight className="h-3.5 w-3.5 shrink-0" /> Practise the ones you got wrong
                    </Link>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Papers and mark schemes stay on the board's own site — we link there, we never host or copy them.
                  </p>
                </div>
              );
            }}
          />
        </CardContent>
      </Card>


      {/* Submit-for-marking scoped to the tapped paper's own mark scheme. */}
      <MarkPaperDialog
        paper={markPaper}
        open={markPaper !== null}
        onOpenChange={(o) => { if (!o) setMarkPaper(null); }}
      />
    </div>
  );
}
