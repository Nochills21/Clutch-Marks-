// Per-topic notes page (SEO-friendly URL).
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SEOHead } from "@/components/SEOHead";
import { TopicBreadcrumb } from "@/components/TopicBreadcrumb";
import { subjectIcon, subjectAccent, LEVELS, LEVEL_LABELS, type SubjectLevelCode } from "@/lib/subjects";
import {
  topicNotesPath,
  topicQuizPath,
  topicPapersPath,
  slugifyTopicName,
} from "@/lib/topicUrls";
import { FileText, BookOpen, Play, Archive, ArrowRight, ArrowLeft, Pencil } from "lucide-react";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { MaterialPreview } from "@/components/MaterialPreview";
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
  const [reloadKey, setReloadKey] = useState(0);
  const bumpRevision = () => setReloadKey((k) => k + 1);

  const { pickedIds, loaded: prefsLoaded, isAdmin: isAdminRole } = useMySubjects();

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: sub } = await supabase
          .from("subjects")
          .select("*")
          .ilike("slug", subject ?? "")
          .limit(1);
        const subjectRow = sub?.[0] ?? null;
        if (!subjectRow) {
          setError("Subject not found");
          setLoading(false);
          return;
        }
        setSubjectMeta(subjectRow);

        const { data: sl } = await supabase
          .from("subject_levels")
          .select("*")
          .eq("subject_id", subjectRow.id)
          .eq("level", (level ?? "").toUpperCase() as SubjectLevelCode)
          .limit(1);
        const levelRow = sl?.[0] ?? null;
        if (!levelRow) {
          setError("Level not found");
          setLoading(false);
          return;
        }
        setSubjectLevel(levelRow);

        const { data: tps } = await supabase
          .from("topics")
          .select("*")
          .eq("subject_level_id", levelRow.id)
          .order("sort_order");
        const topicList = tps ?? [];

        const normalizedTopic = topic?.replace(/-/g, " ") ?? "";
        const topicId = topicList.find(
          (t) => t.name.toLowerCase() === normalizedTopic.toLowerCase() || slugifyTopicName(t.name) === topicSlug,
        )?.id;
        if (!topicId) {
          setError("Topic not found on this level");
          setLoading(false);
          return;
        }
        const topicRow = topicList.find((t) => t.id === topicId) ?? null;
        setTopicTitle(topicRow?.name ?? normalizedTopic);
        setTopicId(topicId);

        const [ls, ms, qz, pp] = await Promise.all([
          topicId && supabase.from("lessons").select("*, topics(name)").eq("topic_id", topicId).order("sort_order"),
          supabase.from("study_materials").select("*, topics(name)").eq("topic_id", topicId).order("created_at", { ascending: false }),
          supabase.from("quizzes").select("*, topics(name)").eq("topic_id", topicId).order("created_at", { ascending: false }),
          supabase.from("past_papers").select("*, topics(name)").eq("topic_id", topicId).order("year", { ascending: false }),
        ]);

        setLessons((ls.data ?? []).filter(Boolean));
        setMaterials((ms.data ?? []).filter(Boolean));
        setQuizzes((qz.data ?? []).filter((q) => q.is_published));
        setPapers((pp.data ?? []).filter(Boolean));
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
  if (!isAdminRole && prefsLoaded && pickedIds.size === 0) {
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
  if (!isAdminRole && prefsLoaded && topicId && !pickedIds.has(subjectLevel?.id ?? "")) {
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
          <CardTitle>Topic not found</CardTitle>
          <CardDescription>{error ?? "The topic you are looking for is not yet available."}</CardDescription>
        </CardHeader>
        <CardContent>
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

  const topicLessons = lessons.length;
  const topicNotesCount = materials.length;

  return (
    <div className="space-y-6">
      <SEOHead
        title={`${topicTitle} — Revision Notes | ${subjectMeta.name} ${levelLabel} | Clutch Marks`}
        description={`Revision notes, topic questions and past papers for ${topicTitle} in ${subjectMeta.name} ${levelLabel}.`}
        path={topicNotesPath(subjectMeta.slug, subjectLevel.level.toLowerCase(), topicSlug)}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: `${topicTitle} — Revision Notes`,
          description: `Revision notes and study materials for ${topicTitle} in ${subjectMeta.name} ${levelLabel} at Clutch Marks.`,
          url: `https://clutch-marks.lovable.app${topicNotesPath(subjectMeta.slug, subjectLevel.level.toLowerCase(), topicSlug)}`,
          educationalLevel: levelLabel,
          about: { "@type": "Thing", name: topicTitle },
          isPartOf: {
            "@type": "Course",
            name: `${subjectMeta.name} ${levelLabel}`,
            url: `https://clutch-marks.lovable.app/study/${subjectMeta.slug}/${subjectLevel.level.toLowerCase()}`,
          },
          provider: {
            "@type": "EducationalOrganization",
            name: "Clutch Marks",
            url: "https://clutch-marks.lovable.app/",
          },
        }}
      />

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
              <Link
                key={m.id}
                to={`/notes`}
                className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors"
              >
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
                    className="text-[10px]"
                  >
                    {m.material_type}
                  </Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Link>
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
            <CardTitle className="text-lg flex items-center gap-2"><Archive className="h-5 w-5 text-primary" /> Past Papers & Mark Schemes</CardTitle>
            <CardDescription>Papers linked to {topicTitle}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {papers.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">No past papers are linked to this topic yet.</p>
            ) : (
              papers.map((p) => (
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
