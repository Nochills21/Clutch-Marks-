// Pricing: preview tier + three paid plans, all billed through Stripe.
//
// Every figure shown here (and in the FAQ and the Course/Offer JSON-LD) comes
// from `@/lib/plans`, which reads the generated snapshot of the `plans` table —
// change a price in the database, regenerate, and this page follows. Nothing
// below hardcodes money.
//
// There is one payment path: Stripe Checkout, card and Apple Pay, starting with
// a 3-day free trial. The browser never writes a subscription row — the
// `stripe-webhook` function does, after Stripe confirms the subscription — and
// the button only ever passes a plan id to `billing`. See the refund policy at
// /refunds, which is the document the trial copy below promises.
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useSubscription } from "@/hooks/useSubscription";
import { SEOHead } from "@/components/SEOHead";
import { FAQ_ITEMS, PRICING_JSON_LD } from "@/lib/seoRoutes";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/useToast";
import { planById, money, billedLabel, savingsVsMonthly, totalOf } from "@/lib/plans";
import { billingFailure, billingFailureTitle, checkoutUrl, portalUrl } from "@/lib/billing";
import { TRIAL_DAYS } from "@/lib/legal";
import { Check, Sparkles, Loader2, Clock, CreditCard, ShieldCheck, ArrowRight } from "lucide-react";
import { format } from "date-fns";

/** Statuses that grant access; matches public.has_active_plan(). */
const LIVE_STATUSES = ["active", "trialing"];

// Marketing copy lives here; every number is read from the plan snapshot.
const monthlyPlan = planById("monthly");
const quarterlyPlan = planById("quarterly");
const annualPlan = planById("annual");
const quarterlySave = quarterlyPlan ? savingsVsMonthly(quarterlyPlan) : null;
const annualSave = annualPlan ? savingsVsMonthly(annualPlan) : null;

const UNLOCKED_FEATURES = [
  "Everything unlocked",
  "All levels: IGCSE, AS Level & A2 Level",
  "Every lesson, note, quiz & past paper",
  "AI marking of your handwritten scripts",
  "AI study planner",
  "Flashcards & smart revision",
];

const PLANS = [
  {
    id: "free",
    name: "Preview",
    price: "$0",
    per: "forever",
    blurb: "A taste of everything — see if Clutch Marks works for you.",
    features: ["A preview of every level (IGCSE, AS Level & A2 Level)", "Sample lessons & notes in each subject", "Progress tracking", "Upgrade any time for full access"],
    cta: null as string | null,
    highlight: false,
  },
  ...(monthlyPlan
    ? [{
        id: monthlyPlan.id,
        name: monthlyPlan.name,
        price: money(monthlyPlan.priceMonthly),
        per: billedLabel(monthlyPlan),
        blurb: "Full access, month to month.",
        features: UNLOCKED_FEATURES,
        highlight: false,
      }]
    : []),
  ...(quarterlyPlan
    ? [{
        id: quarterlyPlan.id,
        name: quarterlyPlan.name,
        price: money(quarterlyPlan.priceMonthly),
        per: billedLabel(quarterlyPlan),
        blurb: quarterlySave
          ? `Save ${quarterlySave.percent}% with a quarterly subscription.`
          : "A term at a time.",
        features: [
          "Everything in Monthly",
          quarterlySave ? `Save ${quarterlySave.label}/month vs monthly plan` : "A term at a time",
        ],
        highlight: true,
      }]
    : []),
  ...(annualPlan
    ? [{
        id: annualPlan.id,
        name: annualPlan.name,
        price: money(annualPlan.priceMonthly),
        per: billedLabel(annualPlan),
        blurb: "Best value — a full year of A* prep.",
        features: [
          "Everything in Monthly",
          annualSave ? `Save ${annualSave.label}/month vs monthly plan` : "A full year of access",
          "Priority support",
        ],
        highlight: false,
      }]
    : []),
];

const dateLabel = (iso: string | null) => (iso ? format(new Date(iso), "d MMM yyyy") : null);

export default function Pricing() {
  // `loading` matters here: /pricing is reached from inside the app (Upgrade
  // links), and the session can still be restoring when the page mounts.
  const { user, role, loading: authLoading } = useAuth();
  const {
    planId, hasPaid, status, trialEndsAt, endsAt, cancelAtPeriodEnd,
    hasStripeCustomer, liveStripeSubscription, comped, lapsed,
  } = useSubscription();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [starting, setStarting] = useState<string | null>(null);
  const [openingPortal, setOpeningPortal] = useState(false);
  // The URL is cleaned after the first handling, which re-runs the effect; this
  // keeps the second run from handling the same outcome twice.
  const checkoutHandled = useRef(false);

  const currentPlan = planById(planId);
  const isTrialing = status === "trialing";
  const isPastDue = status === "past_due";
  // A running subscription or a failed payment: both have something to manage.
  const hasAccess = hasPaid || isPastDue;
  // …but only when Stripe has a customer to open the portal for. A plan granted
  // by hand has no Stripe customer, and an ended one has nothing live to manage:
  // both used to get a "Manage billing" button that answered 404, while the
  // Checkout that would have worked was hidden behind it.
  const canManageBilling = hasStripeCustomer && (liveStripeSubscription || isPastDue);
  const periodEnd = isTrialing ? trialEndsAt ?? endsAt : endsAt;

  // Stripe redirects back with ?checkout=success or =cancelled. Success belongs
  // to /checkout/success (the confirmation page waits on the webhook itself);
  // cancelling only earns a toast.
  useEffect(() => {
    const outcome = searchParams.get("checkout");
    if (!outcome || checkoutHandled.current) return;
    checkoutHandled.current = true;
    if (outcome === "success") {
      // Sessions created before /checkout/success existed still carry this URL.
      // Send them to the confirmation page instead of leaving the student on
      // the pricing grid — `billing` points new sessions there directly.
      navigate("/checkout/success", { replace: true });
      return;
    } else if (outcome === "cancelled") {
      toast({ title: "Checkout cancelled", description: "Nothing was charged — you can start the trial whenever you're ready." });
    }
    // Drop the parameter so a reload does not replay the toast.
    const next = new URLSearchParams(searchParams);
    next.delete("checkout");
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams, toast, navigate]);

  const openPortal = async () => {
    if (!user) {
      toast({ title: "Sign in first", description: "Sign in to manage your billing." });
      return;
    }
    setOpeningPortal(true);
    try {
      window.location.assign(await portalUrl());
    } catch (e) {
      const { message, code } = await billingFailure(e);
      toast({
        title: billingFailureTitle(code, "Could not open billing"),
        description: message,
        variant: "destructive",
      });
    } finally {
      setOpeningPortal(false);
    }
  };

  const startCheckout = async (targetPlanId: string) => {
    if (authLoading) return;
    if (!user) {
      toast({ title: "Sign in first", description: "Create an account, then start your free trial." });
      return;
    }
    setStarting(targetPlanId);
    try {
      window.location.assign(await checkoutUrl(targetPlanId));
    } catch (e) {
      const { message, code } = await billingFailure(e);
      // The one state the browser cannot see: Stripe still holds a subscription
      // whose stored row looks dead (a dunning `past_due`, an `unpaid` that the
      // webhook wrote as `past_due`). Backing out with a toast left the student
      // with nothing to click, so send them where it can be dealt with.
      if (code === "already_subscribed") {
        await openPortal();
        return;
      }
      toast({
        title: billingFailureTitle(code, "Could not start checkout"),
        description: message,
        variant: "destructive",
      });
    } finally {
      setStarting(null);
    }
  };

  return (
    <div className="space-y-8">
      <SEOHead
        path="/pricing"
        jsonLd={PRICING_JSON_LD}
      />
      <div className="text-center space-y-3">
        <Badge variant="secondary" className="gap-1.5"><Sparkles className="h-3 w-3" /> {TRIAL_DAYS}-day free trial</Badge>
        <h1 className="text-3xl font-bold tracking-tight">Pick your plan</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Try full access free for {TRIAL_DAYS} days — every subject, every level. Pay by card or Apple Pay when you
          start; your first payment is taken when the trial ends. Cancel any time.
        </p>
      </div>

      {hasPaid && (
        <Card className={isPastDue ? "border-amber-500/40 bg-amber-500/5" : "border-primary/40 bg-primary/5"}>
          <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3 text-sm">
              <Clock className="h-5 w-5 shrink-0 text-primary mt-0.5" />
              <div>
                <p className="font-medium">
                  {comped
                    ? `Your ${currentPlan?.name ?? ""} plan was granted to this account`
                    : isTrialing
                      ? `Your ${TRIAL_DAYS}-day free trial is running`
                      : `Your ${currentPlan?.name ?? ""} plan is active`}
                  {!comped && periodEnd ? ` — ${isTrialing ? "ends" : cancelAtPeriodEnd ? "ends" : "renews"} ${dateLabel(periodEnd)}` : ""}
                  {comped && periodEnd ? ` — access runs until ${dateLabel(periodEnd)}` : ""}
                </p>
                <p className="text-muted-foreground">
                  {comped
                    ? periodEnd
                      ? `There's no card on file and nothing will be charged. Set up billing below to keep full access after ${dateLabel(periodEnd)}.`
                      : "There's no card on file and no renewal. Set up billing below whenever you'd like to move onto a paid plan."
                    : isTrialing && currentPlan
                      ? `We'll take ${totalOf(currentPlan)} on ${dateLabel(periodEnd) ?? "the day the trial ends"} unless you cancel first.`
                      : cancelAtPeriodEnd
                        ? "Your subscription is cancelled and will not renew."
                        : "Your plan renews automatically. Cancel any time before it renews."}
                </p>
              </div>
            </div>
            {canManageBilling && (
              <Button variant="outline" className="gap-2 shrink-0" onClick={openPortal} disabled={openingPortal}>
                {openingPortal ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
                Manage billing
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {isPastDue && (
        <Card className="border-destructive/40 bg-destructive/5">
          <CardContent className="p-4 text-sm">
            <p className="font-medium">We couldn't take your last payment.</p>
            {hasStripeCustomer ? (
              <p className="text-muted-foreground">
                Update your card in <button type="button" onClick={openPortal} className="text-primary underline">billing</button> to
                keep full access.
              </p>
            ) : (
              <p className="text-muted-foreground">
                There's no card on file for this account. Choose a plan below to set up billing.
              </p>
            )}
          </CardContent>
        </Card>
      )}

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {PLANS.map(p => {
          const isCurrent = p.id === planId && LIVE_STATUSES.includes(status ?? "");
          const isBusy = starting === p.id;
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
                  <Button variant="outline" className="w-full" disabled>
                    {hasAccess ? "Included in your plan" : "Your current plan"}
                  </Button>
                ) : isCurrent ? (
                  <Button className="w-full" disabled>{isTrialing ? "Your free trial" : "Current plan"}</Button>
                ) : canManageBilling ? (
                  <Button variant="outline" className="w-full gap-2" onClick={openPortal} disabled={openingPortal}>
                    <CreditCard className="h-4 w-4" /> Manage billing
                  </Button>
                ) : (
                  <Button
                    className="w-full bg-gradient-to-r from-primary to-[hsl(var(--neon-purple))] text-primary-foreground"
                    disabled={authLoading || Boolean(starting)}
                    onClick={() => startCheckout(p.id)}
                  >
                    {isBusy ? (
                      <><Loader2 className="h-4 w-4 animate-spin mr-1.5" /> Opening Stripe…</>
                    ) : (
                      <>{lapsed ? "Subscribe again" : "Start free trial"} <ArrowRight className="h-3.5 w-3.5 ml-1" /></>
                    )}
                  </Button>
                )}
                {p.id !== "free" && !hasAccess && (() => {
                  const plan = planById(p.id);
                  if (!plan) return null;
                  const term = plan.months === 1 ? "per month" : plan.months === 12 ? "per year" : "per term";
                  return (
                    <p className="text-center text-[11px] text-muted-foreground">
                      Free for {TRIAL_DAYS} days, then {totalOf(plan)} {term}
                    </p>
                  );
                })()}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How payment works</CardTitle>
          <CardDescription>Secure checkout by Stripe — card or Apple Pay. {TRIAL_DAYS}-day free trial, cancel any time.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <ol className="space-y-2 list-decimal list-inside">
            <li>Pick a plan and choose <span className="font-medium text-foreground">Start free trial</span>.</li>
            <li>Enter your card — or pay with Apple Pay if your device offers it — on Stripe's secure checkout page.</li>
            <li>You get full access straight away. Nothing is charged for {TRIAL_DAYS} days.</li>
            <li>When the trial ends your plan renews automatically. Cancel any time before then and you pay nothing.</li>
          </ol>
          <div className="grid gap-2 sm:grid-cols-3">
            {[
              { icon: CreditCard, title: "Card & Apple Pay", body: "Payments are handled by Stripe. We never see or store your card details." },
              { icon: Clock, title: `${TRIAL_DAYS}-day free trial`, body: "Full access from day one. Cancel before the trial ends and you are not charged." },
              { icon: ShieldCheck, title: "Refunds through the trial", body: "If a payment is taken at the end of your trial, the refund policy covers it." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border bg-muted/30 p-3 text-xs text-foreground">
                <p className="font-medium flex items-center gap-1.5"><item.icon className="h-3.5 w-3.5 text-primary" /> {item.title}</p>
                <p className="mt-1.5 leading-snug text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="text-xs">
            Read the full <Link to="/refunds" className="text-primary underline">refund policy</Link>, including how the
            {" "}{TRIAL_DAYS}-day trial period is handled.
          </p>
        </CardContent>
      </Card>

      {/* Visible FAQ — mirrors the FAQPage structured data so the markup
          Google reads corresponds to content actually on the page. */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Frequently asked questions</CardTitle>
          <CardDescription>Quick answers about plans, payment and access.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {FAQ_ITEMS.map((item) => (
            <div key={item.q} className="space-y-1">
              <h3 className="text-sm font-medium text-foreground">{item.q}</h3>
              <p className="text-sm text-muted-foreground">{item.a}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {role === "admin" && (
        <p className="text-center text-xs text-muted-foreground">Admins have full access on every plan.</p>
      )}
    </div>
  );
}
