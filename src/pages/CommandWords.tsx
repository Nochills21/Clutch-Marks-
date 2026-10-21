// Command-word trainer.
//
// The cheapest exam-technique win in the syllabus: a student who knows what
// "explain" buys versus what "describe" buys stops losing marks they could
// have earned. Two modes on one page — read the reference, then drill it.
//
// Deliberately self-marked. These answers are about recognising the shape of a
// scoring response, which does not need the AI marker (and must not consume its
// quota to be useful).
import { useMemo, useState } from "react";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { CheckCircle2, RotateCcw, XCircle, PenLine, BookOpen } from "lucide-react";
import { COMMAND_WORDS, drillOrder, type DrillItem } from "@/lib/commandWords";

export default function CommandWords() {
  const order = useMemo(() => drillOrder(), []);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [answered, setAnswered] = useState(0);

  const item: DrillItem | null = order[index] ?? null;
  const done = index >= order.length;
  const isRight = item !== null && picked === item.answer;

  const choose = (option: number) => {
    if (picked !== null || !item) return;
    setPicked(option);
    setAnswered((n) => n + 1);
    if (option === item.answer) setCorrect((n) => n + 1);
  };

  const next = () => {
    setPicked(null);
    setIndex((i) => i + 1);
  };

  const reset = () => {
    setIndex(0);
    setPicked(null);
    setCorrect(0);
    setAnswered(0);
  };

  return (
    <div className="space-y-6">
      {/* No ROUTE_META entry by design (the build cannot enumerate this page, so
          it is answered by the noindex SPA fallback). The title has to be given
          here for the same reason. */}
      <SEOHead path="/command-words" title="Command words — Clutch Marks" noindex />
      <div>
        <h1 className="flex items-center gap-2 text-3xl font-bold">
          <PenLine className="h-7 w-7 text-primary" /> Command words
        </h1>
        <p className="mt-1 max-w-3xl text-muted-foreground">
          Every question tells you what kind of answer earns the mark. “Describe” wants what
          happens; “explain” wants why. Learn the eight words that decide most of your marks,
          then check you can spot the difference.
        </p>
      </div>

      <Tabs defaultValue="drill" className="space-y-6">
        <TabsList>
          <TabsTrigger value="drill" className="gap-1.5">
            <PenLine className="h-3.5 w-3.5" /> Drill
          </TabsTrigger>
          <TabsTrigger value="reference" className="gap-1.5">
            <BookOpen className="h-3.5 w-3.5" /> Reference
          </TabsTrigger>
        </TabsList>

        <TabsContent value="drill" className="space-y-4">
          {done || !item ? (
            <Card className="neon-border">
              <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
                <CheckCircle2 className="h-12 w-12 text-primary" />
                <div>
                  <p className="text-2xl font-bold">
                    {correct} of {answered || order.length} right
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {correct === answered && answered > 0
                      ? "You can tell the words apart. Re-read the reference before your next paper."
                      : "Read the reference tab, then run the drill again — the distinction is the whole skill."}
                  </p>
                </div>
                <Button onClick={reset} className="gap-2">
                  <RotateCcw className="h-4 w-4" /> Run it again
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex items-center justify-between gap-4">
                <Badge variant="outline" className="gap-1.5 font-mono">
                  {index + 1} / {order.length}
                </Badge>
                <Badge variant="secondary">{item.word}</Badge>
              </div>
              <Progress value={(index / order.length) * 100} className="h-1.5" />

              <Card>
                <CardHeader>
                  <CardDescription>
                    Which response earns the marks for this question?
                  </CardDescription>
                  <CardTitle className="text-lg leading-snug">{item.prompt}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {item.options.map((option, i) => {
                    const state =
                      picked === null
                        ? "idle"
                        : i === item.answer
                          ? "correct"
                          : i === picked
                            ? "wrong"
                            : "muted";
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => choose(i)}
                        disabled={picked !== null}
                        className={cn(
                          "flex w-full items-start gap-3 rounded-lg border p-3 text-left text-sm transition-colors",
                          state === "idle" && "hover:border-primary/50 hover:bg-accent/40",
                          state === "correct" && "border-emerald-500/60 bg-emerald-500/10",
                          state === "wrong" && "border-destructive/60 bg-destructive/10",
                          state === "muted" && "opacity-60",
                        )}
                      >
                        <span className="mt-0.5 font-mono text-xs text-muted-foreground">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="min-w-0 flex-1">{option}</span>
                        {state === "correct" && <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />}
                        {state === "wrong" && <XCircle className="h-4 w-4 shrink-0 text-destructive" />}
                      </button>
                    );
                  })}

                  {picked !== null && (
                    <div className="mt-3 space-y-3 rounded-lg bg-secondary/50 p-3">
                      <p className="text-sm">
                        <span className="font-semibold">{isRight ? "Correct. " : "Not quite. "}</span>
                        {item.why}
                      </p>
                      <Button onClick={next} className="w-full">
                        {index + 1 < order.length ? "Next question" : "Finish"}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="reference" className="space-y-3">
          {COMMAND_WORDS.map((c) => (
            <Card key={c.word}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <span className="font-mono text-primary">{c.word}</span>
                </CardTitle>
                <CardDescription>{c.wants}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold text-foreground">The shape: </span>
                  <span className="text-muted-foreground">{c.shape}</span>
                </p>
                <p className="rounded-md bg-destructive/5 px-3 py-2 text-muted-foreground">
                  <span className="font-semibold text-destructive">The trap: </span>
                  {c.trap}
                </p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
