// Pricing: free tier + three paid plans ($20/mo, $12/mo billed quarterly, $5/mo billed annually).
// Payment is bank transfer for now: the student requests a plan, gets the payment
// instructions, and an admin activates the subscription once the transfer lands.
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useSubscription } from "@/hooks/useSubscription";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Check, Sparkles, Loader2, Clock } from "lucide-react";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    per: "forever",
    blurb: "Everything for O Level — see if Clutch Marks works for you.",
    features: ["All O Level lessons & notes", "O Level quizzes & question bank", "O Level past papers", "Progress tracking"],
    cta: null as string | null,
  },
  {
    id: "monthly",
    name: "Monthly",
    price: "$20",
    per: "/month",
    blurb: "Full access, month to month.",
    features: ["Everything in Free", "AS & A2 lessons, notes & quizzes", "AS & A2 past papers", "AI study planner", "Flashcards & smart revision"],
    highlight: false,
  },
  {
    id: "quarterly",
    name: "3 Months",
    price: "$12",
    per: "/month · billed $36",
    blurb: "Save 40% with a quarterly subscription.",
    features: ["Everything in Monthly", "Save $8/month vs monthly plan"],
    highlight: true,
  },
  {
    id: "annual",
    name: "Annual",
    price: "$5",
    per: "/month · billed $60",
    blurb: "Best value — a full year of A* prep.",
    features: ["Everything in Monthly", "Save $15/month vs monthly plan", "Priority support"],
    highlight: false,
  },
];

export default function Pricing() {
  const { user, role } = useAuth();
  const { planId, refresh } = useSubscription();
  const { toast } = useToast();
  const [selected, setSelected] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [pending, setPending] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("subscriptions")
      .select("plan_id, status")
      .eq("user_id", user.id)
      .eq("status", "pending_payment")
      .maybeSingle()
      .then(({ data }) => setPending(data?.plan_id ?? null));
  }, [user]);

  const requestPlan = async () => {
    if (!user || !selected || selected === "free") return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from("subscriptions").insert({ user_id: user.id, plan_id: selected });
      if (error) throw error;
      setPending(selected);
      toast({
        title: "Subscription requested",
        description: "Complete the bank transfer using the details below — we activate within 24h of receiving it.",
      });
      refresh();
    } catch (e: any) {
      toast({ title: "Request failed", description: e?.message, variant: "destructive" });
    } finally { setSubmitting(false); }
  };

  return (
    <div className="space-y-8">
      <SEOHead
        title="Plans & Pricing — Clutch Marks"
        description="Start free with full O Level access. Unlock AS & A2 from $5/month — A* prep for Maths, Physics and Computer Science."
        path="/pricing"
      />
      <div className="text-center space-y-3">
        <Badge variant="secondary" className="gap-1.5"><Sparkles className="h-3 w-3" /> Simple pricing</Badge>
        <h1 className="text-3xl font-bold tracking-tight">Pick your plan</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          O Level is free forever. Upgrade whenever you're ready for AS & A2 — cancel any time.
        </p>
      </div>

      {pending && (
        <Card className="border-primary/40 bg-primary/5">
          <CardContent className="flex items-center gap-3 p-4">
            <Clock className="h-5 w-5 text-primary shrink-0" />
            <div className="text-sm">
              <p className="font-medium">Your {PLANS.find(p => p.id === pending)?.name} subscription is awaiting payment.</p>
              <p className="text-muted-foreground">Transfer <span className="font-mono font-semibold">${PLANS.find(p => p.id === pending)?.price.replace("$", "")}</span> using the bank details below. We activate within 24 hours.</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {PLANS.map(p => {
          const isCurrent = p.id === planId;
          const isPending = p.id === pending;
          const locked = (p.id !== "free" && !!user && !isCurrent && !isPending) || (!user && p.id !== "free");
          return (
            <Card key={p.id} className={`relative neon-border ${p.highlight ? "border-primary/60 shadow-lg shadow-primary/10" : ""}`}>
              {p.highlight && (
                <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-[hsl(var(--neon-purple))] text-primary-foreground border-0">Most popular</Badge>
              )}
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{p.name}</CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{p.price}</span>
                  <span className="text-xs text-muted-foreground">{p.per}</span>
                </div>
                <CardDescription className="text-xs">{p.blurb}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 min-h-[120px]">
                  {p.features.map(f => (
                    <li key={f} className="flex gap-2 text-xs">
                      <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                {p.id === "free" ? (
                  <Button variant="outline" className="w-full" disabled={isCurrent}>
                    {isCurrent ? "Your current plan" : user ? "Downgrade not needed" : "Start free"}
                  </Button>
                ) : isCurrent ? (
                  <Button className="w-full" disabled>Current plan</Button>
                ) : isPending ? (
                  <Button variant="outline" className="w-full gap-2" disabled><Clock className="h-4 w-4" /> Awaiting payment</Button>
                ) : (
                  <Button
                    className="w-full bg-gradient-to-r from-primary to-[hsl(var(--neon-purple))] text-primary-foreground"
                    onClick={() => { setSelected(p.id); if (!user) toast({ title: "Sign in first", description: "Create a free account, then subscribe." }); }}
                  >
                    Subscribe
                  </Button>
                )}
                {locked && null}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How payment works</CardTitle>
          <CardDescription>Bank transfer — no card needed. Activated within 24 hours.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <ol className="space-y-2 list-decimal list-inside">
            <li>Click <span className="font-medium text-foreground">Subscribe</span> on your plan — this reserves it and tells us what to expect.</li>
            <li>Transfer the total to:
              <div className="ml-6 mt-2 rounded-lg border bg-muted/30 p-3 font-mono text-xs text-foreground space-y-1">
                <p>Bank: <span className="text-muted-foreground">[to be added by site owner]</span></p>
                <p>Account name: <span className="text-muted-foreground">[to be added]</span></p>
                <p>IBAN / Account no.: <span className="text-muted-foreground">[to be added]</span></p>
                <p>Reference: your username</p>
              </div>
            </li>
            <li>We confirm receipt and activate your plan — usually within 24 hours.</li>
          </ol>
        </CardContent>
      </Card>

      <Dialog open={!!selected && !!user} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm your subscription</DialogTitle>
            <DialogDescription>
              You're requesting the {PLANS.find(p => p.id === selected)?.name} plan
              ({PLANS.find(p => p.id === selected)?.price}{PLANS.find(p => p.id === selected)?.per}).
              We'll show the bank details after you confirm.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelected(null)}>Cancel</Button>
            <Button onClick={requestPlan} disabled={submitting} className="gap-2">
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />} Request plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {role === "admin" && (
        <p className="text-center text-xs text-muted-foreground">Admins have full access on every plan.</p>
      )}
    </div>
  );
}
