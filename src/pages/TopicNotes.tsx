// Per-topic notes page (SEO-friendly URL).
import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SEOHead } from "@/components/SEOHead";
import { TopicBreadcrumb } from "@/components/TopicBreadcrumb";
import { subjectIcon, subjectAccent, LEVELS, LEVEL_LABELS, type SubjectLevelCode } from "@/lib/subjects";
import { topicHead } from "@/lib/topicSeo";
import {
  topicNotesPath,
  topicQuizPath,
  topicPapersPath,
  slugifyTopicName,
  topicSlugOf,
} from "@/lib/topicUrls";
import { FileText, BookOpen, Play, Archive, ArrowRight, ArrowLeft, Pencil, ExternalLink, Download, RotateCcw } from "lucide-react";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { MaterialPreview } from "@/components/MaterialPreview";
import { openProtectedFile } from "@/lib/contentFiles";
import { relatedTopicPapers } from "@/lib/topicPapers";
import { topicMasterySummary } from "@/lib/topicMastery";
import { TopicMasteryRing } from "@/components/TopicMasteryRing";
import { smallMarkdownToHtml } from "@/lib/objectiveTeach";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { useMySubjects } from "@/hooks/useMySubjects";
import { SubjectGate } from "@/components/SubjectGate";

export default function TopicNotes() {
  const { slug: subject, level, topic } = useParams<{ slug: string; level: string; topic: string }>();
  const { role } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subjectMeta, setSubjectMeta] = useState<any>(null);
  const [subjectLevel, setSubjectLevel] = useState<any>(null);
  const [topicTitle, setTopicTitle] = useState<string | null>(null);
  const [topicId, setTopicId] = useState<string | null>(null);
  const topicSlug = slugifyTopicName(topic ?? "");
  const [lessons, setLessons] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [papers, setPapers] = useState<any[]>([]);
  const [levelPapers, setLevelPapers] = useState<any[]>([]);
  const [masteryRows, setMasteryRows] = useState<{ state: string }[] | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const bumpRevision = () => setReloadKey((k) => k + 1);

  const { user } = useAuth();
  const { pickedIds, loaded: prefsLoaded, isAdmin: isAdminRole, needsSubjectPick } = useMySubjects();

  // This student's objective states for the ring. Objectives exist only for
  // authored topics and the RPC is authenticated-only, so anything else
  // leaves the ring hidden rather than guessing.
  useEffect(() => {
    if (!topicId || !user) {
      setMasteryRows(null);
      return;
    }
    let live = true;
    supabase.rpc("topic_objective_mastery", { _topic_id: topicId }).then(({ data, error }) => {
      if (live && !error) setMasteryRows((data ?? []) as { state: string }[]);
    });
    return () => {
      live = false;
    };
  }, [topicId, user]);

  const mastery = masteryRows && masteryRows.length > 0 ? topicMasterySummary(masteryRows) : null;

  // Paper-aware papers: the topic's own papers plus every other paper in this
  // subject-level sitting in the same paper group (Paper 1 lessons list Paper
  // 1 papers with their mark schemes, mechanics lessons list mechanics
  // papers, …). Falls back to the whole level when the topic has no tagged
  // papers of its own.
  const relatedPapers = useMemo(
    () => relatedTopicPapers(topicId ?? "", papers, levelPapers.length > 0 ? levelPapers : papers),
    [topicId, papers, levelPapers],
  );

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: sub, error: subError } = await supabase
          .from("subjects")
          .select("*")
          .ilike("slug", subject ?? "")
          .limit(1);
        if (subError) throw subError;
        const subjectRow = sub?.[0] ?? null;
        if (!subjectRow) {
          setError("Subject not found");
          setLoading(false);
          return;
        }
        setSubjectMeta(subjectRow);

        const { data: sl, error: slError } = await supabase
          .from("subject_levels")
          .select("*")
          .eq("subject_id", subjectRow.id)
          .eq("level", (level ?? "").toUpperCase() as SubjectLevelCode)
          .limit(1);
        if (slError) throw slError;
        const levelRow = sl?.[0] ?? null;
        if (!levelRow) {
          setError("Level not found");
          setLoading(false);
          return;
        }
        setSubjectLevel(levelRow);

        const { data: tps, error: tpsError } = await supabase
          .from("topics")
          .select("*")
          .eq("subject_level_id", levelRow.id)
          .order("sort_order");
        if (tpsError) throw tpsError;
        const topicList = tps ?? [];

        const normalizedTopic = topic?.replace(/-/g, " ") ?? "";
        const topicId = topicList.find(
          (t) =>
            t.name.toLowerCase() === normalizedTopic.toLowerCase() ||
            topicSlugOf(t) === topicSlug ||
            // Last-resort match for URLs minted before slugs were persisted.
            slugifyTopicName(t.name) === topicSlug,
        )?.id;
        if (!topicId) {
          setError("Topic not found on this level");
          setLoading(false);
          return;
        }
        const topicRow = topicList.find((t) => t.id === topicId) ?? null;
        setTopicTitle(topicRow?.name ?? normalizedTopic);
        setTopicId(topicId);

        const levelTopicIds = topicList.map((t) => t.id);
        const [ls, ms, qz, pp, lp] = await Promise.all([
          topicId && supabase.from("lessons").select("*, topics(name)").eq("topic_id", topicId).order("sort_order"),
          supabase.from("study_materials").select("*, topics(name)").eq("topic_id", topicId).order("created_at", { ascending: false }),
          supabase.from("quizzes").select("*, topics(name)").eq("topic_id", topicId).order("created_at", { ascending: false }),
          supabase.from("past_papers").select("*, topics(name)").eq("topic_id", topicId).order("year", { ascending: false }),
          supabase.from("past_papers").select("*, topics(name)").in("topic_id", levelTopicIds).order("year", { ascending: false }),
        ]);

        setLessons((ls.data ?? []).filter(Boolean));
        setMaterials((ms.data ?? []).filter(Boolean));
        setQuizzes((qz.data ?? []).filter((q) => q.is_published));
        setPapers((pp.data ?? []).filter(Boolean));
        setLevelPapers((lp.data ?? []).filter(Boolean));
      } catch (e: any) {
        setError(e.message ?? "Failed to load topic content");
      } finally {
        setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [subject, level, topic, topicSlug, reloadKey]);

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
        <SEOHead title={`${topicTitle ?? "Revision Notes"} — Clutch Marks`} description="Revision notes, topic questions and past papers." path={topicNotesPath(subjectMeta?.slug ?? "", subjectLevel?.level.toLowerCase() ?? "", topicSlug)} />
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
          <CardTitle>Topic not found</CardTitle>
          <CardDescription>You haven't selected this subject yet.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline" className="gap-2">
            <Link to="/subjects"><ArrowLeft className="h-4 w-4" /> Back to subjects</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (error || !subjectMeta || !subjectLevel || !topicTitle) {
    return (
      <Card>
        <CardHeader>
          {/* A failed request is not the same as a missing topic. Saying
              "not found" for a dropped connection sent students looking for a
              problem in their notes instead of retrying. */}
          <CardTitle>
            {error && !/not found/i.test(error) ? "Couldn't load this topic" : "Topic not found"}
          </CardTitle>
          <CardDescription>{error ?? "The topic you are looking for is not yet available."}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2" onClick={bumpRevision}>
            <RotateCcw className="h-4 w-4" /> Try again
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link to="/subjects"><ArrowLeft className="h-4 w-4" /> Back to subjects</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const Icon = subjectIcon(subjectMeta.icon);
  const accent = subjectAccent(subjectMeta.color);
  const levelCode = subjectLevel.level as SubjectLevelCode;
  const levelLabel = LEVEL_LABELS[levelCode];
  const topicSeo = topicHead(
    {
      subjectSlug: subjectMeta.slug,
      subjectName: subjectMeta.name,
      level: subjectLevel.level,
      topicSlug,
      topicName: topicTitle,
    },
    "notes",
  );

  const topicLessons = lessons.length;
  const topicNotesCount = materials.length;

  return (
    <div className="space-y-6">
      {/* Title, description, canonical and JSON-LD all come from topicSeo, which
          is also what the build-time prerenderer writes into this URL's static
          HTML — the head a crawler reads without running JavaScript and the head
          it reads after booting React are the same by construction. */}
      <SEOHead {...topicSeo} />

      <TopicBreadcrumb
        subjectName={subjectMeta.name}
        levelLabel={levelLabel}
        topicName={topicTitle}
        currentLabel="Revision Notes"
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
            <Badge variant="outline">{levelLabel}</Badge>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Revision notes, topic questions and past papers for {topicTitle} in {subjectMeta.name} {levelLabel}.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link to={`/practice?level=${subjectLevel.id}&topic=${topicId}`}>Practise mistakes <ArrowRight className="h-3.5 w-3.5" /></Link>
          </Button>
        </div>
      </div>

      {mastery && (
        <Card className={mastery.examReady ? "border-emerald-500/40" : ""}>
          <CardContent className="flex flex-wrap items-center gap-4 p-4">
            <TopicMasteryRing percent={mastery.percent} band={mastery.band} label={`${topicTitle} mastery ${mastery.percent}%`} />
            <div className="min-w-0 flex-1">
              <p className="font-semibold">
                {mastery.examReady ? "Exam-ready" : `${mastery.mastered} of ${mastery.total} objectives mastered`}
              </p>
              <p className="text-xs text-muted-foreground">
                {mastery.examReady
                  ? "Every objective in this topic is mastered. Keep it green with refresh checks."
                  : "Master every objective to turn this topic green — wrong answers come back as Strengthen checks."}
              </p>
            </div>
            <Button asChild variant={mastery.examReady ? "outline" : "default"} size="sm" className="gap-1.5">
              <Link to="/mastery">
                {mastery.examReady ? "Refresh checks" : "Strengthen"} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "Lessons", value: topicLessons, icon: BookOpen, color: accent.text },
          { label: "Notes", value: topicNotesCount, icon: FileText, color: accent.text },
          { label: "Topic Questions", value: quizzes.length, icon: Play, color: accent.text },
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
          <CardTitle className="text-lg flex items-center gap-2"><BookOpen className="h-5 w-5 text-primary" /> Lessons</CardTitle>
          <CardDescription>Structured lessons for {topicTitle}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {lessons.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">No lessons have been created for this topic yet.</p>
          ) : (
            lessons.map((l) => (
              <Link
                key={l.id}
                to={`/lessons/${l.id}/notes`}
                className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{l.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Lesson · {topicTitle}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-4">
                  {role === "admin" && (
                    <ContentEditor
                      entityType="lesson"
                      entityId={l.id}
                      initialTitle={l.title}
                      initialContent={l.content ?? null}
                      onSaved={bumpRevision}
                      trigger={
                        <Button size="sm" variant="ghost" className="gap-1 h-8" onClick={(e) => e.preventDefault()}>
                          <Pencil className="h-3.5 w-3.5" /> Edit
                        </Button>
                      }
                    />
                  )}
                  <Badge variant="outline" className="text-[10px]">Notes</Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Link>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /> Revision Notes & Study Materials</CardTitle>
          <CardDescription>Downloadable notes and materials for {topicTitle}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {materials.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">No revision notes have been uploaded for this topic yet.</p>
          ) : (
            materials.map((m) => (
              // A plain row, not a Link: wrapping the whole card in a link to
              // /notes made every material behave as "go to the library", which
              // threw away the topic the student was reading and hid the fact
              // that a downloadable file exists at all.
              <div
                key={m.id}
                className="rounded-lg border transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center justify-between gap-2 p-3">
                <MaterialPreview
                  fileUrl={m.file_url}
                  previewUrl={m.preview_url}
                  pageCount={m.page_count}
                  sourceRange={m.source_range}
                />
                <div className="min-w-0 flex-1 px-3">
                  <p className="font-medium truncate">{m.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 capitalize">
                    {m.material_type} · {topicTitle}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-4">
                  {role === "admin" && (
                    <ContentEditor
                      entityType="material"
                      entityId={m.id}
                      initialTitle={m.title}
                      initialContent={m.content ?? null}
                      onSaved={bumpRevision}
                      trigger={
                        <Button size="sm" variant="ghost" className="gap-1 h-8" onClick={(e) => e.preventDefault()}>
                          <Pencil className="h-3.5 w-3.5" /> Edit
                        </Button>
                      }
                    />
                  )}
                  <Badge
                    variant={m.material_type === "notes" ? "secondary" : "outline"}
                    className="text-[10px] capitalize"
                  >
                    {m.material_type}
                  </Badge>
                  {m.file_url ? (
                    <>
                      <Button size="sm" variant="ghost" className="gap-1 h-8"
                        onClick={async () => {
                          try {
                            await openProtectedFile("study-materials", m.file_url);
                          } catch (e: any) {
                            toast.error(e?.message ?? "Could not open this file");
                          }
                        }}>
                        <ExternalLink className="h-3.5 w-3.5" /> Open
                      </Button>
                      <Button size="sm" variant="ghost" className="gap-1 h-8"
                        onClick={async () => {
                          try {
                            await openProtectedFile("study-materials", m.file_url, m.title);
                          } catch (e: any) {
                            toast.error(e?.message ?? "Could not download this file");
                          }
                        }}>
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                    </>
                  ) : m.content ? null : (
                    <Button asChild size="sm" variant="ghost" className="gap-1 h-8">
                      <Link to="/notes">
                        Read <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  )}
                </div>
                </div>
                {/* A material with no file is a note whose text lives in the
                    row. The exam-technique "extras" are exactly that, and
                    before this they were a row whose only action was a "Read"
                    link to the notes library — which does not list their type,
                    so the link led to a page that did not contain them. The
                    text is rendered where the student already is. */}
                {!m.file_url && m.content && (
                  <div
                    className="border-t px-3 pb-3 pt-2 text-sm [&_h3]:mt-3 [&_h3]:font-semibold [&_li]:ml-5 [&_li]:list-disc [&_p]:mt-1 [&_p]:text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(smallMarkdownToHtml(String(m.content))) }}
                  />
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        <Card className="min-w-0">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2"><Play className="h-5 w-5 text-primary" /> Topic Questions</CardTitle>
            <CardDescription>Exam-style questions for {topicTitle}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {quizzes.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">No topic questions have been created for this topic yet.</p>
            ) : (
              quizzes.map((q) => (
                <Link
                  key={q.id}
                  to={topicQuizPath(subjectMeta.slug, subjectLevel.level.toLowerCase(), topicSlug)}
                  className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{q.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 capitalize">
                      {q.exam_type ? String(q.exam_type).replace("_", " ") : "Quiz"} · {topicTitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-4">
                    <Badge variant="outline" className="text-[10px]">{q.questions?.length ?? "Questions"}</Badge>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
              ))
            )}
            <Button asChild variant="outline" className="gap-2 mt-3 w-full justify-center">
              <Link to={topicQuizPath(subjectMeta.slug, subjectLevel.level.toLowerCase(), topicSlug)}>
                Browse all topic questions <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="min-w-0">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2"><Archive className="h-5 w-5 text-primary" /> Past Papers & Mark Schemes</CardTitle>          <CardDescription>
            Papers linked to {topicTitle}
            {relatedPapers.filtered && relatedPapers.groups.length > 0 && (
              <> — showing {relatedPapers.groups.join(", ")} papers</>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
            {relatedPapers.papers.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">No past papers are linked to this topic yet.</p>
            ) : (
              relatedPapers.papers.slice(0, 5).map((p) => (
                <Link
                  key={p.id}
                  to={topicPapersPath(subjectMeta.slug, subjectLevel.level.toLowerCase(), topicSlug)}
                  className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{p.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {p.year}
                      {p.session ? ` · ${p.session}` : ""}
                      {p.paper_number ? ` · ${p.paper_number}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-4">
                    <Badge variant="outline" className="text-[10px]">Past Paper</Badge>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
              ))
            )}
            <Button asChild variant="outline" className="gap-2 mt-3 w-full justify-center">
              <Link to={topicPapersPath(subjectMeta.slug, subjectLevel.level.toLowerCase(), topicSlug)}>
                Browse all topic papers <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
