// Per-topic past-paper list.
import { useEffect, useState } from "react";
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
} from "@/lib/topicUrls";
import { Archive, BookOpen, Play, Clock, ArrowRight, ArrowLeft } from "lucide-react";

interface TopicPaper {
  id: string;
  title: string;
  year: number;
  session: string | null;
  paper_number: string | null;
  paper_url: string | null;
  mark_scheme_url: string | null;
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

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: sub } = await supabase.from("subjects").select("*").ilike("slug", subject ?? "").limit(1);
        const subjectRow = sub?.[0] ?? null;
        if (!subjectRow) {
          setError("Subject not found");
          setLoading(false);
          return;
        }
        setSubjectMeta(subjectRow);

        const { data: sl } = await supabase.from("subject_levels").select("*").eq("subject_id", subjectRow.id).eq("level", (level ?? "").toUpperCase() as SubjectLevelCode).limit(1);
        const levelRow = sl?.[0] ?? null;
        if (!levelRow) {
          setError("Level not found");
          setLoading(false);
          return;
        }
        setSubjectLevel(levelRow);

        const { data: tps } = await supabase.from("topics").select("*").eq("subject_level_id", levelRow.id).order("sort_order");
        const topicList = tps ?? [];
        const topicRow = topicList.find((t) => slugifyTopicName(t.name) === topicSlug || t.name.toLowerCase() === (topic ?? "").replace(/-/g, " ").toLowerCase());
        if (!topicRow) {
          setError("Topic not found on this level");
          setLoading(false);
          return;
        }
        setTopicTitle(topicRow.name);
        setTopicId(topicRow.id);

        if (active && topicRow) {
          const { data } = await supabase.from("past_papers").select("*").eq("topic_id", topicRow.id).order("year", { ascending: false });
          if (active) setPapers((data ?? []) as unknown as TopicPaper[]);
        }
      } catch (e: any) {
        setError(e.message ?? "Failed to load topic past papers");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [subject, level, topic, topicSlug]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-28 rounded-2xl" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  if (error || !subjectMeta || !subjectLevel || !topicTitle || !topicId) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Past papers not found</CardTitle>
          <CardDescription>{error ?? "No past papers have been linked to this topic yet."}</CardDescription>
        </CardHeader>
        <CardContent>
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

  return (
    <div className="space-y-6">
      <SEOHead
        title={`${topicTitle} — Past Papers & Mark Schemes | ${subjectMeta.name} ${LEVEL_LABELS[levelCode]} | Clutch Marks`}
        description={`Past papers and mark schemes for ${topicTitle} in ${subjectMeta.name} ${LEVEL_LABELS[levelCode]}. Practise under real exam conditions with papers sorted by year.`}
        path={topicPapersPath(subjectMeta.slug, subjectLevel.level.toLowerCase(), topicSlug)}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: `${topicTitle} — Past Papers & Mark Schemes`,
          description: `Past papers and mark schemes for ${topicTitle} in ${subjectMeta.name} ${LEVEL_LABELS[levelCode]}, organised by year and session.`,
          url: `https://clutch-marks.lovable.app${topicPapersPath(subjectMeta.slug, subjectLevel.level.toLowerCase(), topicSlug)}`,
          educationalLevel: LEVEL_LABELS[levelCode],
          about: { "@type": "Thing", name: topicTitle },
          isPartOf: {
            "@type": "Course",
            name: `${subjectMeta.name} ${LEVEL_LABELS[levelCode]}`,
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
        levelLabel={LEVEL_LABELS[levelCode]}
        topicName={topicTitle}
        currentLabel="Past Papers & Mark Schemes"
        subjectSlug={subjectMeta.slug}
        level={subjectLevel.level.toLowerCase()}
        topicSlug={topicSlug}
      />

      <div className={`glass-card p-6 flex-wrap items-center gap-4 ${accent.border}`}>
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
            {papers.length} past paper{papers.length === 1 ? "" : "s"} linked to {topicTitle} in {subjectMeta.name} {LEVEL_LABELS[levelCode]}.
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
          { label: "Past Papers", value: papers.length, icon: Archive, color: accent.text },
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
        </CardHeader>
        <CardContent className="space-y-2">
          {papers.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">No past papers have been linked to this topic yet.</p>
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
