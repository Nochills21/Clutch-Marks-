// Password reset landing page: Supabase recovery links point here with a
// recovery session; the user sets a new password with the standard policy.
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SEOHead } from "@/components/SEOHead";
import { PASSWORD_RULES_TEXT, validatePassword } from "@/lib/passwordPolicy";
import { useToast } from "@/hooks/useToast";
import { KeyRound, Loader2, CheckCircle2 } from "lucide-react";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sessionReady, setSessionReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // The recovery link logs the user in with a special session; wait for it.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setSessionReady(true);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setSessionReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      return;
    }
    const pwError = validatePassword(password, "student");
    if (pwError) {
      toast({ title: "Password too weak", description: pwError, variant: "destructive" });
      return;
    }
    setSaving(true);
    const { error } = await supabase.auth.updateUser({ password });
    setSaving(false);
    if (error) {
      toast({ title: "Could not update password", description: error.message, variant: "destructive" });
      return;
    }
    setDone(true);
    toast({ title: "Password updated", description: "You can sign in with your new password now." });
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 geo-pattern">
      <SEOHead title="Reset Password — Clutch Marks" description="Set a new password for your Clutch Marks account." path="/reset-password" />
      <Card className="w-full max-w-sm neon-border bg-card/80 backdrop-blur-xl shadow-2xl">
        <CardHeader className="pb-2 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
            {done ? <CheckCircle2 className="h-6 w-6 text-emerald-500" /> : <KeyRound className="h-6 w-6 text-primary" />}
          </div>
          <h1 className="text-xl font-bold">{done ? "Password updated" : "Choose a new password"}</h1>
        </CardHeader>
        <CardContent>
          {done ? (
            <p className="text-center text-sm text-muted-foreground">Redirecting you to the dashboard…</p>
          ) : !sessionReady ? (
            <p className="text-center text-sm text-muted-foreground">
              Verifying your reset link… If nothing happens, request a new link from the sign-in page.
            </p>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">New password</Label>
                <Input id="new-password" type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} className="h-11 bg-secondary/50 border-border" />
                <p className="text-xs text-muted-foreground">{PASSWORD_RULES_TEXT}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm password</Label>
                <Input id="confirm-password" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required minLength={6} className="h-11 bg-secondary/50 border-border" />
              </div>
              <Button type="submit" disabled={saving} className="w-full h-11 gap-2 font-semibold">
                {saving && <Loader2 className="h-4 w-4 animate-spin" />} Update password
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
