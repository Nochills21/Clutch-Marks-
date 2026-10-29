// Post-checkout confirmation: the page Stripe sends a student to after Checkout.
//
// Three jobs, in order of weight:
//
//   1. Say thank you and explain what just happened — what unlocked, when the
//      first payment is taken, how to cancel. Stripe's own confirmation screen
//      answers none of those, and someone who has just handed over card
//      details wants to be told they did the right thing before they are
//      moved on.
//   2. Report the plan only once the webhook has actually written the row. The
//      redirect lands seconds before `customer.subscription.created` is
//      processed, so this page re-reads the subscription a few times and
//      degrades to generic copy rather than naming a plan (or a charge date)
//      it cannot see. Never promise a date the database has not confirmed.
//   3. Send the student on to the dashboard — on a countdown they can stop,
//      because the point of this page is the reading, not the transit.
//
// It lives in PublicShell rather than the signed-in shell on purpose:
// AppLayout bounces a visitor whose session has not restored yet to /auth, and
// "your payment worked" must never be answered by a sign-in form.
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ArrowRight, Check, Clock, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import { useSubscription } from "@/hooks/useSubscription";
import { planById, totalOf } from "@/lib/plans";
import { TRIAL_DAYS } from "@/lib/legal";

/** Seconds on this page before the student is taken on to the dashboard. */
const REDIRECT_SECONDS = 8;

/** Extra reads of the subscription while the webhook is still in flight. */
const CONFIRM_ATTEMPTS = 4;

const dateLabel = (iso: string | null) => (iso ? format(new Date(iso), "d MMMM yyyy") : null);

export default function CheckoutSuccess() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { planId, hasPaid, trialEndsAt, endsAt, refresh } = useSubscription();

  const [seconds, setSeconds] = useState(REDIRECT_SECONDS);
  const [stopped, setStopped] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Stripe redirects the browser back before its own webhook is delivered, so
  // the first read usually finds no row at all. Ask again a few times — and
  // stop the moment a live plan arrives, so a student who is already in does
  // not sit through the whole schedule.
  useEffect(() => {
    if (hasPaid || attempts >= CONFIRM_ATTEMPTS) return;
    const timer = window.setTimeout(() => {
      refresh();
      setAttempts((n) => n + 1);
    }, 2500);
    return () => window.clearTimeout(timer);
  }, [hasPaid, attempts, refresh]);

  useEffect(() => {
    if (stopped || seconds <= 0) return;
    const timer = window.setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [seconds, stopped]);

  // Only leave once auth has settled: navigating to /dashboard mid-restore
  // would bounce the student to /auth and undo the point of the page.
  useEffect(() => {
    if (stopped || seconds > 0 || authLoading) return;
    navigate(user ? "/dashboard" : "/auth", { replace: true });
  }, [stopped, seconds, authLoading, user, navigate]);

  // A plan is shown only when the webhook has confirmed one; before that the
  // page says the confirmation is in progress instead of guessing.
  const plan = hasPaid ? planById(planId) : null;
  const chargeOn = dateLabel(trialEndsAt ?? endsAt);
  const confirmed = Boolean(plan);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <SEOHead
        title="Payment confirmed — Clutch Marks"
        description="Your Clutch Marks subscription is set up and your free trial has started."
        path="/checkout/success"
        noindex
      />

      <div className="text-center space-y-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-500/40">
          <Check className="h-8 w-8 text-emerald-500" strokeWidth={3} />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            {confirmed ? "You're in — thanks for subscribing" : "Thank you — your payment went through"}
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {confirmed ? (
              <>
                Your <span className="font-medium text-foreground">{plan?.name}</span> plan is set up and your{" "}
                {TRIAL_DAYS}-day free trial has started. Everything below is unlocked right now.
              </>
            ) : (
              <>
                Your {TRIAL_DAYS}-day free trial is starting. We are confirming the details with Stripe — this takes a
                few seconds.
              </>
            )}
          </p>
          {!confirmed && (
            <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Confirming your subscription…
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            icon: Sparkles,
            title: "Everything unlocked",
            body: "Every subject and level — IGCSE, AS and A2 — with all lessons, notes, quizzes, past papers and flashcards.",
          },
          {
            icon: Clock,
            title: chargeOn ? `First payment ${chargeOn}` : `${TRIAL_DAYS} days free`,
            body: chargeOn
              ? `We'll take ${plan ? totalOf(plan) : "your plan price"} on ${chargeOn} unless you cancel before then. Cancel any time from Manage billing.`
              : `Nothing is charged during the ${TRIAL_DAYS}-day trial. Your plan renews automatically when it ends, and you can cancel any time before that.`,
          },
          {
            icon: ShieldCheck,
            title: "Protected by our refund policy",
            body: `If a payment is taken at the end of your trial and something isn't right, our refund policy covers the first ${TRIAL_DAYS} days.`,
          },
        ].map((item) => (
          <Card key={item.title} className="bg-muted/30">
            <CardContent className="space-y-2 p-4">
              <p className="flex items-center gap-1.5 text-sm font-medium">
                <item.icon className="h-4 w-4 text-primary" /> {item.title}
              </p>
              <p className="text-xs leading-snug text-muted-foreground">{item.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-primary/40 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Where to now</CardTitle>
          <CardDescription>
            Your dashboard has your subjects, progress and the AI tools — open it and carry on from where you left off.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            {stopped ? (
              "Staying on this page — take your time."
            ) : (
              <>
                Taking you to your dashboard in{" "}
                <span className="font-medium text-foreground tabular-nums">{seconds}s</span>…
              </>
            )}
          </p>
          <div className="flex items-center gap-2">
            {stopped ? (
              <Button variant="outline" size="sm" onClick={() => { setStopped(false); setSeconds(3); }}>
                Continue automatically
              </Button>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setStopped(true)}>
                Stay here
              </Button>
            )}
            <Button
              className="sheen gap-1.5"
              onClick={() => navigate(user ? "/dashboard" : "/auth", { replace: true })}
            >
              Go to dashboard <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground">
        A receipt is on its way to your inbox. You can change your card or cancel from{" "}
        <Link to="/pricing" className="text-primary underline">
          Manage billing
        </Link>
        , and the full terms are in our{" "}
        <Link to="/refunds" className="text-primary underline">
          refund policy
        </Link>
        .
      </p>
    </div>
  );
}
