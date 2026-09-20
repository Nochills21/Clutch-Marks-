import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, Save, Trash2, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { SEOHead } from "@/components/SEOHead";

interface StudyPlan {
  id: string;
  title: string;
  content: string;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
}

export default function StudyPlanner() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [hoursPerWeek, setHoursPerWeek] = useState("5");
  const [targetExamDate, setTargetExamDate] = useState("");
  const [weakTopics, setWeakTopics] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<string>("");
  const [savedPlans, setSavedPlans] = useState<StudyPlan[]>([]);
  const [planTitle, setPlanTitle] = useState("");

  const loadPlans = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("study_plans")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setSavedPlans(data ?? []);
  };

  useEffect(() => { loadPlans(); }, [user]);

  const handleGenerate = async () => {
    if (!user) return;
    setGenerating(true);
    setGeneratedPlan("");
    try {
      // Pull recent quiz performance + upcoming homework for context
      const { data: attempts } = await supabase
        .from("quiz_attempts")
        .select("score, total_questions, quizzes(title)")
        .eq("user_id", user.id)
        .not("completed_at", "is", null)
        .order("completed_at", { ascending: false })
        .limit(5);

      const { data: homework } = await supabase
        .from("homework")
        .select("title, due_date")
        .gte("due_date", new Date().toISOString())
        .order("due_date")
        .limit(5);

      const quizPerformance = (attempts ?? []).map((a: any) =>
        `${a.quizzes?.title ?? "Quiz"}: ${a.score}/${a.total_questions}`
      ).join("; ") || "No completed quizzes yet";

      const upcomingHomework = (homework ?? []).map((h) =>
        `${h.title} (due ${h.due_date ? format(new Date(h.due_date), "MMM d") : "TBD"})`
      ).join("; ") || "No upcoming deadlines";

      const { data, error } = await supabase.functions.invoke("study-planner", {
        body: {
          quizPerformance,
          upcomingHomework,
          weakTopics,
          targetExamDate,
          hoursPerWeek: Number(hoursPerWeek) || 5,
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setGeneratedPlan(data.plan);
      setPlanTitle(`Study Plan – ${format(new Date(), "MMM d, yyyy")}`);
    } catch (e: any) {
      toast({
        title: "Generation failed",
        description: e?.message ?? "Please try again",
        variant: "destructive",
      });
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
    });
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Plan saved", description: "Your study plan is in your library." });
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

  return (
    <div className="space-y-8">
      <SEOHead title="Study Planner — Clutch Marks" description="Create personalized study plans and organize your exam preparation schedule." path="/study-planner" />
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Sparkles className="h-7 w-7 text-primary" /> AI Study Planner
        </h1>
        <p className="text-muted-foreground mt-1">
          Get a personalized revision schedule based on your performance and deadlines.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate a new plan</CardTitle>
          <CardDescription>The AI will use your recent quiz scores and upcoming homework automatically.</CardDescription>
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
          <Button onClick={handleGenerate} disabled={generating} className="w-full sm:w-auto">
            {generating ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating…</>
            ) : (
              <><Sparkles className="mr-2 h-4 w-4" /> Generate Plan</>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedPlan && (
        <Card className="neon-border">
          <CardHeader>
            <CardTitle>Your generated plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap text-sm leading-relaxed">
              {generatedPlan}
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
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
                      {p.end_date && ` → exam ${format(new Date(p.end_date), "MMM d, yyyy")}`}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(p.id)}
                    aria-label="Delete plan"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
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
