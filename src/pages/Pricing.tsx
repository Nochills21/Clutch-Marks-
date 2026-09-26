// Pricing: preview tier + three paid plans ($20/mo, $12/mo billed quarterly, $5/mo billed annually).
// Exactly two payment methods: Bank Transfer or E-Wallet (Urpay). Requesting a
// plan captures the payer's full name and a transaction receipt; an admin then
// activates the subscription from Admin Payments.
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useSubscription } from "@/hooks/useSubscription";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/useToast";
import { validateUploadFile } from "@/lib/fileValidation";
import { Check, Sparkles, Loader2, Clock, Landmark, Wallet, Upload, FileText, ShieldCheck } from "lucide-react";
import { PAYMENT } from "@backend/payments.config";

const PLANS = [
  {
    id: "free",
    name: "Preview",
    price: "$0",
    per: "forever",
    blurb: "A taste of everything — see if Clutch Marks works for you.",
    features: ["A preview of every level (OL, AS & A2)", "Sample lessons & notes in each subject", "Progress tracking", "Upgrade any time for full access"],
    cta: null as string | null,
  },
  {
    id: "monthly",
    name: "Monthly",
    price: "$20",
    per: "/month",
    blurb: "Full access, month to month.",
    features: ["Everything unlocked", "All levels: OL, AS & A2", "Every lesson, note, quiz & past paper", "AI study planner", "Flashcards & smart revision"],
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

type PaymentMethod = "bank_transfer" | "ewallet_urpay";

const PAYMENT_METHODS: {
  id: PaymentMethod;
  label: string;
  tagline: string;
  icon: React.ElementType;
}[] = [
  { id: "bank_transfer", label: "Bank Transfer", tagline: "Pay from any bank app — send us the transfer receipt.", icon: Landmark },
  { id: "ewallet_urpay", label: "E-Wallet (Urpay)", tagline: "Send via the Urpay app — attach your payment screenshot.", icon: Wallet },
];

export default function Pricing() {
  const { user, role } = useAuth();
  const { planId, refresh } = useSubscription();
  const { toast } = useToast();

  const [selected, setSelected] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [pending, setPending] = useState<string | null>(null);
  const [pendingDetails, setPendingDetails] = useState<{ method: PaymentMethod | null } | null>(null);

  // Request-plan form state
  const [fullName, setFullName] = useState("");
  const [method, setMethod] = useState<PaymentMethod | null>(null);
  const [receipt, setReceipt] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("subscriptions")
      .select("plan_id, status, payment_method, full_name")
      .eq("user_id", user.id)
      .eq("status", "pending_payment")
      .order("created_at", { ascending: false })
      .limit(1)
      .then(({ data }) => {
        // Cast: generated DB types predate the payment_method/full_name columns.
        const row = (data as any[] | null)?.[0];
        if (!row) return;
        setPending(row.plan_id);
        setPendingDetails({ method: (row.payment_method as PaymentMethod) ?? null });
        if (row.full_name) setFullName(row.full_name);
      });
  }, [user]);

  const selectedPlan = PLANS.find((p) => p.id === selected);
  const selectedMethod = PAYMENT_METHODS.find((m) => m.id === method);

  const requestPlan = async () => {
    if (!user || !selected || selected === "free") return;
    if (!method) {
      toast({ title: "Choose a payment method", description: "Pick Bank Transfer or E-Wallet (Urpay) to continue.", variant: "destructive" });
      return;
    }
    if (!fullName.trim()) {
      toast({ title: "Full name required", description: "Enter the account holder's full name for verification.", variant: "destructive" });
      return;
    }
    if (!receipt) {
      toast({ title: "Receipt required", description: "Attach a screenshot or PDF of your transaction.", variant: "destructive" });
      return;
    }
    const check = validateUploadFile(receipt);
    if (check.ok === false) {
      toast({ title: "Receipt rejected", description: check.error, variant: "destructive" });
      return;
    }

    setSubmitting(true);
    setUploading(true);
    try {
      // 1) Upload the receipt to the private homework-uploads bucket,
      //    payments/<uid>/ — allowed by the payments storage policy.
      const ext = receipt.name.split(".").pop()?.toLowerCase() ?? "png";
      const path = `payments/${user.id}/${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("homework-uploads").upload(path, receipt);
      if (upErr) throw new Error(`Receipt upload failed: ${upErr.message}`);
      setUploading(false);

      // 2) Create or update the pending subscription with the details.
      //    (No unique constraint on user_id+plan_id, so upsert can't be used.)
      const payload = {
        status: "pending_payment" as const,
        payment_method: method,
        full_name: fullName.trim(),
        receipt_path: path,
        updated_at: new Date().toISOString(),
      };
      const { data: existing } = await supabase
        .from("subscriptions")
        .select("id")
        .eq("user_id", user.id)
        .eq("plan_id", selected)
        .maybeSingle();
      const { error } = existing?.id
        ? await supabase.from("subscriptions").update(payload).eq("id", existing.id)
        : await supabase.from("subscriptions").insert({ user_id: user.id, plan_id: selected, ...payload });
      if (error) throw error;

      setPending(selected);
      setPendingDetails({ method });
      toast({
        title: "Payment details received",
        description: "We're verifying your transaction — your plan activates within 24 hours.",
      });
      refresh();
      setSelected(null);
    } catch (e: any) {
      toast({ title: "Request failed", description: e?.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
      setUploading(false);
    }
  };

  const resetForm = () => {
    setMethod(null);
    setReceipt(null);
    setSelected(null);
  };

  return (
    <div className="space-y-8">
      <SEOHead
        title="Plans & Pricing — Clutch Marks"
        description="A preview of every subject at every level. Unlock everything from $5/month — A* prep for Maths, Physics and Computer Science."
        path="/pricing"
      />
      <div className="text-center space-y-3">
        <Badge variant="secondary" className="gap-1.5"><Sparkles className="h-3 w-3" /> Simple pricing</Badge>
        <h1 className="text-3xl font-bold tracking-tight">Pick your plan</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Try before you commit — a preview of every subject at every level. Upgrade whenever you're ready for full access — cancel any time.
        </p>
      </div>

      {pending && (
        <Card className="border-primary/40 bg-primary/5">
          <CardContent className="flex items-start gap-3 p-4">
            <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">Your {PLANS.find(p => p.id === pending)?.name} subscription is awaiting verification.</p>
              <p className="text-muted-foreground">
                We've received your{pendingDetails?.method ? ` ${PAYMENT_METHODS.find(m => m.id === pendingDetails.method)?.label ?? ""}` : ""} details
                {fullName ? ` under “${fullName}”` : ""}. Activation happens within 24 hours of confirmation.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {PLANS.map(p => {
          const isCurrent = p.id === planId;
          const isPending = p.id === pending;
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
                    {isCurrent ? "Your current plan" : user ? "Downgrade not needed" : "Start with preview"}
                  </Button>
                ) : isCurrent ? (
                  <Button className="w-full" disabled>Current plan</Button>
                ) : isPending ? (
                  <Button variant="outline" className="w-full gap-2" disabled><Clock className="h-4 w-4" /> Awaiting verification</Button>
                ) : (
                  <Button
                    className="w-full bg-gradient-to-r from-primary to-[hsl(var(--neon-purple))] text-primary-foreground"
                    onClick={() => { if (user) setSelected(p.id); else toast({ title: "Sign in first", description: "Create an account, then subscribe." }); }}
                  >
                    Request plan
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How payment works</CardTitle>
          <CardDescription>Two ways to pay — Bank Transfer or E-Wallet (Urpay). Activated within 24 hours.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <ol className="space-y-2 list-decimal list-inside">
            <li>Click <span className="font-medium text-foreground">Request plan</span> and choose your method.</li>
            <li>Send the total using one of:
              <div className="ml-6 mt-2 grid gap-2 sm:grid-cols-2">
                <div className="rounded-lg border bg-muted/30 p-3 text-xs text-foreground">
                  <p className="font-medium flex items-center gap-1.5"><Landmark className="h-3.5 w-3.5 text-primary" /> Bank Transfer</p>
                  <p className="mt-1 font-mono text-[11px] space-y-0.5">
                    Bank: <span className="text-muted-foreground">{PAYMENT.bankTransfer.bankName}</span><br />
                    Account name: <span className="text-muted-foreground">{PAYMENT.bankTransfer.accountHolder}</span><br />
                    IBAN: <span className="text-muted-foreground break-all">{PAYMENT.bankTransfer.iban}</span><br />
                    Account no.: <span className="text-muted-foreground">{PAYMENT.bankTransfer.accountNo}</span><br />
                    Reference: Zaidthaersaadeh@gmail.com
                  </p>
                </div>
                <div className="rounded-lg border bg-muted/30 p-3 text-xs text-foreground">
                  <p className="font-medium flex items-center gap-1.5"><Wallet className="h-3.5 w-3.5 text-primary" /> E-Wallet (Urpay)</p>
                  <p className="mt-1 font-mono text-[11px]">
                    Urpay number: <span className="text-muted-foreground">{PAYMENT.urpay.number}</span><br />
                    Reference: Zaidthaersaadeh@gmail.com
                  </p>
                </div>
              </div>
            </li>
            <li>Upload the transaction receipt in the request form so we can match your payment.</li>
            <li>We verify and activate your plan — usually within 24 hours.</li>
          </ol>
        </CardContent>
      </Card>

      {/* Request-plan dialog: method → full name → receipt */}
      <Dialog open={!!selected && !!user} onOpenChange={(o) => { if (!o) resetForm(); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Request the {selectedPlan?.name} plan</DialogTitle>
            <DialogDescription>
              {selectedPlan?.price}{selectedPlan?.per} — choose how you're paying, then tell us who paid and attach the receipt.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5">
            {/* Method */}
            <div className="space-y-2">
              <Label>Payment method</Label>
              <div className="grid gap-2 sm:grid-cols-2">
                {PAYMENT_METHODS.map(m => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.id)}
                    className={`rounded-xl border p-3 text-left transition-colors ${
                      method === m.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/40 hover:bg-secondary/40"
                    }`}
                  >
                    <m.icon className={`h-4 w-4 ${method === m.id ? "text-primary" : "text-muted-foreground"}`} />
                    <p className="mt-1.5 text-sm font-medium">{m.label}</p>
                    <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{m.tagline}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Full name */}
            <div className="space-y-2">
              <Label htmlFor="payer-name">Full name</Label>
              <Input
                id="payer-name"
                placeholder="As it appears on the transfer / Urpay account"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
              />
            </div>

            {/* Receipt */}
            <div className="space-y-2">
              <Label htmlFor="payer-receipt">Receipt of transaction</Label>
              <label
                htmlFor="payer-receipt"
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-border p-3 transition-colors hover:border-primary/40 hover:bg-secondary/30"
              >
                <Upload className="h-4 w-4 text-muted-foreground" />
                <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
                  {receipt ? receipt.name : "Screenshot or PDF of your payment"}
                </span>
                <input
                  id="payer-receipt"
                  type="file"
                  accept="image/png,image/jpeg,image/webp,application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0] ?? null;
                    if (f) {
                      const check = validateUploadFile(f);
                      if (check.ok === false) {
                        toast({ title: "File rejected", description: check.error, variant: "destructive" });
                        e.target.value = "";
                        return;
                      }
                    }
                    setReceipt(f);
                  }}
                />
              </label>
              {receipt && (
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <FileText className="h-3 w-3 text-primary" /> {(receipt.size / 1024).toFixed(0)} KB — ready to upload
                </p>
              )}
              <p className="flex items-start gap-1.5 text-[11px] leading-snug text-muted-foreground">
                <ShieldCheck className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                Receipts are private — only admins verifying your payment can view them.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={resetForm} disabled={submitting}>Cancel</Button>
            <Button onClick={requestPlan} disabled={submitting} className="gap-2">
              {submitting ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> {uploading ? "Uploading receipt…" : "Submitting…"}</>
              ) : (
                <>{selectedMethod?.label ?? "Submit"} request</>
              )}
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
