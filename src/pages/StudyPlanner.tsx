// AI study-plan generation and saved plans.
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { callStudyPlanner } from "@/lib/ai";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/useToast";
import { usePlanAccess } from "@/components/PreviewLimit";
import { Loader2, Sparkles, Save, Trash2, Calendar as CalendarIcon, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { SEOHead } from "@/components/SEOHead";

interface StudyPlan {
  id: string;
  title: string;
  content: string;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  subject_level_id: string | null;
  ai_generated: boolean;
  ai_model: string | null;
}

// Free users see their saved plans but cannot burn AI generation budget: the
// generate card is replaced with an upgrade prompt (same pattern as the AI
// marker's gate). The worker only checks approval, not plan, so this gate is
// what stops unlimited free generation.
function PlannerUpgradeCard() {
  return (
    <Card className="neon-border border-dashed">
      <CardContent className="flex flex-col items-center px-6 py-12 text-center">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
          <Lock className="h-7 w-7 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">AI study plans are part of the full plan</h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Tell us your hours, exam date and weak topics, and the planner builds a
          personal revision schedule from your quiz results and deadlines.
        </p>
        <Button
          asChild
          size="lg"
          className="mt-7 gap-2 bg-gradient-to-r from-primary to-[hsl(var(--neon-purple))] text-primary-foreground"
        >
          <Link to="/pricing">
            <Sparkles className="h-4 w-4" /> View plans
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function StudyPlanner() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { loading: planLoading, isPreview } = usePlanAccess();
  const [hoursPerWeek, setHoursPerWeek] = useState("5");
  const [targetExamDate, setTargetExamDate] = useState("");
  const [weakTopics, setWeakTopics] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<string>("");
  const [planModel, setPlanModel] = useState<string>("");
  const [savedPlans, setSavedPlans] = useState<any[]>([]);
  const [planTitle, setPlanTitle] = useState("");

  const loadPlans = () => {
    if (!user) return;
    // supabase queries return a PostgrestBuilder. Use .then to get data.
    const q = supabase
      .from("study_plans")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    (q as any).then(({ data, error }: any) => {
      // Report instead of silently showing an empty planner.
      if (error) {
        toast({ title: "Could not load your plans", description: error.message, variant: "destructive" });
        return;
      }
      setSavedPlans(data ?? []);
    });
  };

  useEffect(() => { loadPlans(); }, [user]);

  const handleGenerate = async () => {
    if (!user) return;
    setGenerating(true);
    setGeneratedPlan("");
    setPlanModel("");
    try {
      const { quizPerformance, upcomingHomework, weakTopics: wt } = extractContext();
      const out = await callStudyPlanner({
        quizPerformance,
        upcomingHomework,
        weakTopics: wt,
        targetExamDate,
        hoursPerWeek: Number(hoursPerWeek) || 5,
        subjectLevelId: null,
      });
      setGeneratedPlan(out.plan);
      setPlanModel(out.model);
      setPlanTitle(`Study Plan – ${format(new Date(), "MMM d, yyyy")}`);
      toast({ title: "Plan generated", description: "Your personalized schedule is ready." });
    } catch (e: any) {
      toast({ title: "Generation failed", description: e?.message ?? "Please try again", variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!user || !generatedPlan || !planTitle.trim()) return;
    const { error } = await supabase.from("study_plans").insert({
      user_id: user.id,
      title: planTitle.trim(),
      content: generatedPlan,
      start_date: new Date().toISOString().slice(0, 10),
      end_date: targetExamDate || null,
      subject_level_id: null,
      ai_generated: true,
      ai_model: planModel,
    });
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Plan saved", description: "Your AI-generated study plan is in your library." });
      setGeneratedPlan("");
      loadPlans();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("study_plans").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    } else {
      loadPlans();
    }
  };

  const extractContext = () => {
    let quizPerformance = "No completed quizzes yet";
    let upcomingHomework = "No upcoming deadlines";
    let weakTopics = "";

    if (user) {
      const { data: attempts } = (supabase
        .from("quiz_attempts")
        .select("score, total_questions, quizzes(title)")
        .eq("user_id", user.id)
        .not("completed_at", "is", null)
        .order("completed_at", { ascending: false })
        .limit(5)) as any;

      const { data: homework } = (supabase
        .from("homework")
        .select("title, due_date")
        .gte("due_date", new Date().toISOString())
        .order("due_date")
        .limit(5)) as any;

      const perf = (attempts ?? []).map((a: any) =>
        `${a.quizzes?.title ?? "Quiz"}: ${a.score ?? 0}/${a.total_questions ?? 0}`
      ).join("; ") || "No completed quizzes yet";
      quizPerformance = perf;
      upcomingHomework = (homework ?? []).map((h: any) =>
        `${h.title} (due ${h.due_date ? format(new Date(h.due_date), "MMM d") : "TBD"})`
      ).join("; ") || "No upcoming deadlines";

      weakTopics = "";
    }
    return { quizPerformance, upcomingHomework, weakTopics };
  };

  return (
    <div className="space-y-8">
      <SEOHead path="/study-planner" />
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Sparkles className="h-7 w-7 text-primary" /> AI Study Planner
        </h1>
        <p className="text-muted-foreground mt-1">
          Get a personalized revision schedule built from your quiz results, deadlines, and weak topics.
        </p>
      </div>

      {planLoading ? (
        <Card>
          <CardContent className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </CardContent>
        </Card>
      ) : isPreview ? (
        <PlannerUpgradeCard />
      ) : (
      <Card>
        <CardHeader>
          <CardTitle>Generate a new plan</CardTitle>
          <CardDescription>
            The AI uses your recent quiz scores, upcoming homework, and weak topics automatically.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="hours">Hours available per week</Label>
              <Input
                id="hours"
                type="number"
                min="1"
                max="40"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exam-date">Target exam date (optional)</Label>
              <Input
                id="exam-date"
                type="date"
                value={targetExamDate}
                onChange={(e) => setTargetExamDate(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="weak">Topics you want to focus on (optional)</Label>
            <Textarea
              id="weak"
              placeholder="e.g., Quadratic equations, Kinematics, Algorithms..."
              value={weakTopics}
              onChange={(e) => setWeakTopics(e.target.value)}
              rows={3}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleGenerate} disabled={generating} className="flex-1">
              {generating ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating…</>
              ) : (
                <><Sparkles className="mr-2 h-4 w-4" /> Generate Plan</>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      )}

      {generatedPlan && (
        <Card className="neon-border">
          <CardHeader>
            <CardTitle>Your generated plan</CardTitle>
            <CardDescription>
              {planModel && <span className="text-xs text-muted-foreground">Model: {planModel}</span>}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap text-sm leading-relaxed">
              {generatedPlan}
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <Input
                value={planTitle}
                onChange={(e) => setPlanTitle(e.target.value)}
                placeholder="Plan title"
                className="flex-1"
              />
              <Button onClick={handleSave} disabled={!planTitle.trim()}>
                <Save className="mr-2 h-4 w-4" /> Save plan
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4">Saved plans</h2>
        {savedPlans.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground text-sm">
              No saved plans yet. Generate one above to get started.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {savedPlans.map((p) => (
              <Card key={p.id}>
                <CardHeader className="flex flex-row items-start justify-between gap-2 pb-2">
                  <div>
                    <CardTitle className="text-base">{p.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1 text-xs">
                      <CalendarIcon className="h-3 w-3" />
                      {format(new Date(p.created_at), "MMM d, yyyy")}
                      {p.end_date && <> → exam {format(new Date(p.end_date), "MMM d, yyyy")}</>}
                      {p.ai_generated && <span className="ml-2 text-[10px] font-semibold uppercase tracking-wider text-primary/70">AI generated</span>}
                    </CardDescription>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(p.id)}
                      aria-label="Delete plan"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap text-sm leading-relaxed">
                    {p.content}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
