// Spaced-repetition flashcard study.
import { useEffect, useState, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layers, RotateCcw, ArrowLeft, CheckCircle2, Clock, Download, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { exportFlashcardsToPdf } from "@/lib/pdfExport";
import { SEOHead } from "@/components/SEOHead";
import { ManuscriptFlashcard, ManuscriptHead } from "@/components/StudyManuscript";
import { usePlanAccess, FREE_PREVIEW_LIMIT, PreviewLimit } from "@/components/PreviewLimit";
import { useMySubjects } from "@/hooks/useMySubjects";
import { SubjectGate } from "@/components/SubjectGate";
import { QueryError } from "@/components/QueryError";
import { useLoadFailure } from "@/hooks/useLoadFailure";
import { useToast } from "@/hooks/useToast";
import { loadFailureMessage } from "@/lib/net";
import { levelLabel } from "@/lib/levels";
import type { Tables } from "@/integrations/supabase/types";

type FlashcardSetRow = Tables<"flashcard_sets"> & {
  topics?: { name: string } | null;
  flashcards?: { id: string }[];
};
type ProgressRow = Pick<Tables<"flashcard_progress">, "ease_factor" | "interval_days" | "repetitions" | "next_review_at">;

// SM-2 Algorithm
function sm2(quality: number, prev: { ease_factor: number; interval_days: number; repetitions: number }) {
  let { ease_factor, interval_days, repetitions } = prev;
  if (quality < 3) {
    repetitions = 0;
    interval_days = 1;
  } else {
    if (repetitions === 0) interval_days = 1;
    else if (repetitions === 1) interval_days = 6;
    else interval_days = Math.round(interval_days * ease_factor);
    repetitions += 1;
  }
  ease_factor = Math.max(1.3, ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
  const next_review_at = new Date(Date.now() + interval_days * 86400000).toISOString();
  return { ease_factor, interval_days, repetitions, next_review_at, last_reviewed_at: new Date().toISOString() };
}

const qualityMap = [
  { label: "Again", quality: 1, color: "bg-destructive text-destructive-foreground" },
  { label: "Hard", quality: 2, color: "bg-warning text-warning-foreground" },
  { label: "Good", quality: 4, color: "bg-primary text-primary-foreground" },
  { label: "Easy", quality: 5, color: "bg-success text-success-foreground" },
];

export default function Flashcards() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { failure, report } = useLoadFailure("your flashcard sets");
  const [sets, setSets] = useState<FlashcardSetRow[]>([]);
  const [topics, setTopics] = useState<Tables<"topics">[]>([]);
  const [levelById, setLevelById] = useState<Record<string, string>>({});
  // A topic page links here with ?topic=<id> so "Flashcards for this topic"
  // lands on that topic's sets instead of the whole catalogue. The tabs below
  // still work: the initial value is just the topic tab pre-selected.
  const [params] = useSearchParams();
  const [filter, setFilter] = useState(params.get("topic") ?? "all");
  const [studySetId, setStudySetId] = useState<string | null>(null);
  const [studyCards, setStudyCards] = useState<Tables<"flashcards">[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [progressMap, setProgressMap] = useState<Record<string, ProgressRow>>({});
  const [dueCount, setDueCount] = useState<Record<string, number>>({});
  const [studyComplete, setStudyComplete] = useState(false);

  const loadSets = useCallback(async () => {
    const [setsRes, topicsRes, levelsRes] = await Promise.all([
      supabase.from("flashcard_sets").select("*, topics(name), flashcards(id)").order("created_at", { ascending: false }),
      supabase.from("topics").select("*").order("sort_order"),
      supabase.from("subject_levels").select("id, level"),
    ]);
    if (setsRes.error || topicsRes.error || levelsRes.error) {
      report(setsRes.error ?? topicsRes.error ?? levelsRes.error);
      return;
    }
    setSets(setsRes.data ?? []);
    setTopics(topicsRes.data ?? []);
    const lv: Record<string, string> = {};
    (levelsRes.data ?? []).forEach((l) => { lv[l.id] = l.level; });
    setLevelById(lv);
  }, [report]);

  // Load due counts per set
  const loadDueCounts = useCallback(async () => {
    if (!user) return;
    const { data: progress, error: progressError } = await supabase.from("flashcard_progress").select("flashcard_id, next_review_at").eq("user_id", user.id);
    if (progressError) { report(progressError); return; }
    const now = new Date();
    const dueMap: Record<string, boolean> = {};
    (progress ?? []).forEach((p) => {
      if (new Date(p.next_review_at) <= now) dueMap[p.flashcard_id] = true;
    });

    const { data: allCards, error: allCardsError } = await supabase.from("flashcards").select("id, set_id");
    if (allCardsError) { report(allCardsError); return; }
    const reviewed = new Set((progress ?? []).map((p) => p.flashcard_id));
    const counts: Record<string, number> = {};
    (allCards ?? []).forEach((c) => {
      // Due if never reviewed OR next_review_at is past
      if (!reviewed.has(c.id) || dueMap[c.id]) {
        counts[c.set_id] = (counts[c.set_id] || 0) + 1;
      }
    });
    setDueCount(counts);
  }, [user, report]);

  useEffect(() => { loadSets(); loadDueCounts(); }, [loadSets, loadDueCounts]);

  const startStudy = async (setId: string) => {
    if (!user) return;
    const { data: cards, error: cardsError } = await supabase.from("flashcards").select("*").eq("set_id", setId).order("sort_order");
    const { data: prog, error: progError } = await supabase.from("flashcard_progress").select("*").eq("user_id", user.id);
    // Without this the deck came back empty and tapping a set did nothing.
    if (cardsError || progError) {
      toast({
        title: "Couldn't open that set",
        description: loadFailureMessage("these flashcards", cardsError ?? progError),
        variant: "destructive",
      });
      return;
    }
    const pMap: Record<string, Tables<"flashcard_progress">> = {};
    (prog ?? []).forEach((p) => { pMap[p.flashcard_id] = p; });
    setProgressMap(pMap);

    // Filter to due cards (unreviewed or next_review_at <= now)
    const now = new Date();
    const dueCards = (cards ?? []).filter((c) => {
      const p = pMap[c.id];
      return !p || new Date(p.next_review_at) <= now;
    });

    setStudyCards(dueCards.length > 0 ? dueCards : cards ?? []);
    setStudySetId(setId);
    setCurrentIdx(0);
    setFlipped(false);
    setStudyComplete(false);
  };

  const handleRate = async (quality: number) => {
    if (!user) return;
    const card = studyCards[currentIdx];
    const prev = progressMap[card.id] || { ease_factor: 2.5, interval_days: 1, repetitions: 0 };
    const updated = sm2(quality, prev);

    // The write used to be fire-and-forget: a dropped request still advanced the
    // session, so the student saw a clean finish while the SM-2 schedule never
    // moved and the card was never scheduled again. Report the failure and keep
    // `progressMap` untouched, so the card stays due and can be rated next time.
    const { error: saveError } = progressMap[card.id]
      ? await supabase
          .from("flashcard_progress")
          .update(updated)
          .eq("user_id", user.id)
          .eq("flashcard_id", card.id)
      : await supabase
          .from("flashcard_progress")
          .insert({ user_id: user.id, flashcard_id: card.id, ...updated });
    if (saveError) {
      toast({
        title: "Couldn't save that card",
        description: loadFailureMessage("this card's review schedule", saveError),
        variant: "destructive",
      });
    } else {
      setProgressMap((m) => ({ ...m, [card.id]: { ...prev, ...updated } }));
    }

    if (currentIdx + 1 < studyCards.length) {
      setCurrentIdx(currentIdx + 1);
      setFlipped(false);
    } else {
      setStudyComplete(true);
      loadDueCounts();
    }
  };

  const { isPreview, hasPaid, loading: planLoading } = usePlanAccess();
  const { pickedIds, loaded: prefsLoaded, isAdmin: isAdminRole, needsSubjectPick } = useMySubjects();

  // Topic ids belonging to the subject-levels the student picked. Admins and
  // unauthenticated previews see everything; students only see their picked
  // subjects' topics (and therefore their flashcard sets).
  const pickedTopicIds = useMemo(() => {
    if (isAdminRole || !prefsLoaded) return new Set<string>();
    return new Set(topics.filter((t) => pickedIds.has(t.subject_level_id)).map((t) => t.id));
  }, [topics, pickedIds, isAdminRole, prefsLoaded]);

  // Topics sharing a name across levels ("Thermal Physics" exists at OL and
  // AS) get the level appended so duplicate tabs and badges stay distinct.
  const topicLevelOf = (topicId: string) => {
    const lv = levelById[topics.find((x) => x.id === topicId)?.subject_level_id];
    return lv ? levelLabel(lv) : "";
  };
  const dupTopicNames = useMemo(() => {
    const counts: Record<string, number> = {};
    topics.forEach((t) => { counts[t.name] = (counts[t.name] ?? 0) + 1; });
    return new Set(Object.keys(counts).filter((n) => counts[n] > 1));
  }, [topics]);
  const topicTabLabel = (t) => {
    const lv = topicLevelOf(t.id);
    return dupTopicNames.has(t.name) && lv ? `${t.name} · ${lv}` : t.name;
  };
  const setTopicBadge = (s) => {
    const t = topics.find((x) => x.id === s.topic_id);
    const name = s.topics?.name ?? t?.name;
    if (!name) return null;
    const lv = t ? topicLevelOf(t.id) : "";
    const label = t && dupTopicNames.has(name) && lv ? `${name} · ${lv}` : name;
    return <Badge variant="secondary" className="text-[10px] shrink-0 max-w-full">{label}</Badge>;
  };

  //_visibleTopicIds picks the topic ids used for the per-topic tab triggers.
  const visibleTopicIds = useMemo(() => {
    if (isAdminRole || !prefsLoaded) return topics.map((t) => t.id);
    return topics.filter((t) => pickedIds.has(t.subject_level_id)).map((t) => t.id);
  }, [topics, pickedIds, isAdminRole, prefsLoaded]);

  // Everything the student is entitled to see, scoped to their picked subjects
  // and the active tab. Kept separate from the free-plan slice so the header
  // can say "4 of 8 sets" instead of comparing against all 100 in the catalogue.
  const scopedSets = useMemo(() => sets.filter((s) => {
    // Subject/level gate: only show sets whose topic belongs to a picked
    // subject-level. Admins and the loading/preview states bypass this.
    if (!isAdminRole && prefsLoaded && pickedTopicIds.size > 0) {
      if (!pickedTopicIds.has(s.topic_id)) return false;
    }
    if (filter === "all") return true;
    if (filter === "due") return (dueCount[s.id] ?? 0) > 0;
    return s.topic_id === filter;
  }), [sets, filter, dueCount, isAdminRole, prefsLoaded, pickedTopicIds]);

  const filteredSets = useMemo(() => {
    // Free-plan preview: mirror Lessons — show at most FREE_PREVIEW_LIMIT
    // flashcard sets per subject-level, so a free student picking "Ol Math"
    // never sees Physics/CS sets and only gets a small slice of Ol Math.
    if (!(isPreview && !hasPaid) || scopedSets.length === 0) return scopedSets;
    const byLevel = new Map<string, FlashcardSetRow[]>();
    for (const s of scopedSets) {
      const tid = s.topic_id;
      const sl = topics.find((t) => t.id === tid)?.subject_level_id;
      if (sl) byLevel.set(sl, (byLevel.get(sl) || []).concat(s));
    }
    const limited = new Set<string>();
    for (const [, items] of byLevel) {
      items.slice(0, FREE_PREVIEW_LIMIT).forEach((s) => limited.add(s.id));
    }
    return scopedSets.filter((s) => limited.has(s.id));
  }, [scopedSets, isPreview, hasPaid, topics, FREE_PREVIEW_LIMIT]);

  // Subject & level gate: students must pick at least one subject (and its
  // level) before any flashcard content is shown. While preferences are still
  // loading we render nothing — never the content itself. Placed after every
  // hook so the early returns never change hook order.
  if (!isAdminRole && !prefsLoaded) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (needsSubjectPick) {
    return (
      <div className="space-y-6">
        <SEOHead path="/flashcards" />
        <SubjectGate />
      </div>
    );
  }

  // Study mode
  if (studySetId && studyCards.length > 0) {
    const card = studyCards[currentIdx];
    const setInfo = sets.find((s) => s.id === studySetId);

    if (studyComplete) {
      return (
        <div className="cm-study flex flex-col items-center justify-center min-h-[60vh] gap-6">
          <SEOHead path="/flashcards" />
          <CheckCircle2 className="h-16 w-16 text-success" />
          <h2 className="text-2xl font-bold text-foreground">Session Complete!</h2>
          <p className="text-muted-foreground">You reviewed all {studyCards.length} cards in this session.</p>
          <Button onClick={() => { setStudySetId(null); setStudyCards([]); }}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Sets
          </Button>
        </div>
      );
    }

    return (
      <div className="cm-study max-w-xl mx-auto space-y-6">
        <SEOHead path="/flashcards" />
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => { setStudySetId(null); setStudyCards([]); }}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          <p className="text-sm text-muted-foreground">{currentIdx + 1} / {studyCards.length}</p>
        </div>

        <h2 className="text-lg font-semibold text-foreground">{setInfo?.title}</h2>

        <ManuscriptFlashcard
          eyebrow={flipped ? `Answer · card ${currentIdx + 1} of ${studyCards.length}` : `Question · card ${currentIdx + 1} of ${studyCards.length}`}
          face={flipped ? card.back : card.front}
          hint="Tap to reveal answer"
          flipped={flipped}
          onFlip={() => setFlipped(!flipped)}
        />

        {flipped && (
          <div className="grid grid-cols-4 gap-2">
            {qualityMap.map((q) => (
              <Button key={q.label} className={cn("text-sm font-medium", q.color)} onClick={() => handleRate(q.quality)}>
                {q.label}
              </Button>
            ))}
          </div>
        )}

        {/* Progress bar */}
        <div className="cm-m-progress">
          <div style={{ width: `${((currentIdx + 1) / studyCards.length) * 100}%` }} />
        </div>
      </div>
    );
  }

  // Browse mode
  return (
    <div className="cm-study space-y-6">
      <SEOHead path="/flashcards" />
      <ManuscriptHead
        eyebrow="Spaced repetition"
        title="Flashcards"
        lede={
          isPreview && !hasPaid
            ? `Preview: ${filteredSets.length} of ${scopedSets.length} sets — full access unlocks everything.`
            : "Study with spaced repetition to remember key concepts."
        }
      />

      {failure && <QueryError message={failure} onRetry={() => { window.location.reload(); }} />}

      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList className="flex-wrap h-auto justify-start gap-1 max-w-full overflow-x-auto">
          <TabsTrigger value="all">All Sets</TabsTrigger>
          <TabsTrigger value="due" className="gap-1">
            <Clock className="h-3 w-3" /> Due for Review
          </TabsTrigger>
          {visibleTopicIds.map((tid) => {
            const t = topics.find((x) => x.id === tid);
            return t ? <TabsTrigger key={t.id} value={t.id}>{topicTabLabel(t)}</TabsTrigger> : null;
          })}
        </TabsList>
      </Tabs>
      {filteredSets.length === 0 ? (
        <Card className="border-dashed"><CardContent className="py-12 text-center text-muted-foreground"><Layers className="mx-auto h-10 w-10 mb-3 opacity-40" />{filter === "due"
          ? "No cards due for review. Great job!"
          : filter === "all"
            ? "No flashcard sets available."
            : "No flashcard sets for this topic yet."}</CardContent></Card>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSets.map((s) => (
              <Card key={s.id} className="hover:shadow-md transition-shadow group">
                <CardHeader className="pb-2 cursor-pointer" onClick={() => startStudy(s.id)}>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <CardTitle className="text-base group-hover:text-primary transition-colors">{s.title}</CardTitle>
                    {setTopicBadge(s)}
                  </div>
                  {s.description && <p className="text-xs text-muted-foreground">{s.description}</p>}
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{s.flashcards?.length ?? 0} cards</span>
                    {(dueCount[s.id] ?? 0) > 0 && (
                      <Badge className="bg-warning text-warning-foreground text-[10px] gap-1">
                        <RotateCcw className="h-3 w-3" /> {dueCount[s.id]} due
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full gap-2 text-xs h-7"
                    onClick={async (e) => {
                      e.stopPropagation();
                      const { data: cards, error: exportError } = await supabase.from("flashcards").select("front, back").eq("set_id", s.id).order("sort_order");
                      if (exportError) {
                        toast({
                          title: "Couldn't export this set",
                          description: loadFailureMessage("these flashcards", exportError),
                          variant: "destructive",
                        });
                        return;
                      }
                      if (!cards || cards.length === 0) {
                        toast({ title: "Nothing to export", description: "This set has no cards yet." });
                        return;
                      }
                      try {
                        // Branded, watermarked export: the set title, every card,
                        // and the signed-in account burned into the frame.
                        await exportFlashcardsToPdf(s.title, cards, {
                          owner: user?.email ?? user?.id ?? null,
                        });
                        toast({ title: "Saved", description: "Your flashcard PDF is downloading." });
                      } catch (e) {
                        toast({
                          title: "Couldn't build the PDF",
                          description: e?.message ?? "Please try again.",
                          variant: "destructive",
                        });
                      }
                    }}
                  >
                    <Download className="h-3 w-3" /> Export PDF
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          {isPreview && !hasPaid && filteredSets.length < scopedSets.length && (
            <PreviewLimit
              hiddenCount={scopedSets.length - filteredSets.length}
              what="flashcard sets"
            />
          )}
        </>
      )}
    </div>
  );
}
