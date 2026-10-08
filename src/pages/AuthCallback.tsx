// Return URL for social sign-in (/auth/callback).
//
// supabase-js parses the session out of the URL on load (detectSessionInUrl is
// on by default), which can land a tick after this page mounts — so we listen
// for the session *and* check for one immediately, and only report a problem
// once we have waited long enough to be sure.
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [failed, setFailed] = useState<string | null>(null);

  useEffect(() => {
    // Google can bounce back with an explicit refusal (e.g. the account was not
    // granted access). Show it rather than spinning forever.
    const params = new URLSearchParams(window.location.search);
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const problem =
      params.get("error_description") ||
      params.get("error") ||
      hash.get("error_description") ||
      hash.get("error");
    if (problem) {
      setFailed(problem.replace(/\+/g, " "));
      return;
    }

    let settled = false;
    const land = () => {
      if (settled) return;
      settled = true;
      navigate("/dashboard", { replace: true });
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) land();
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) land();
    });

    // 12s is generous for a slow connection; after that, offer the password form
    // instead of leaving the student on a blank screen.
    const timer = window.setTimeout(() => {
      if (!settled) setFailed("We couldn't finish signing you in.");
    }, 12_000);

    return () => {
      window.clearTimeout(timer);
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 geo-pattern">
      <SEOHead path="/auth/callback" />
      <div className="absolute inset-0 -z-10 bg-background">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[700px] h-[700px] rounded-full bg-primary/[0.08] blur-[120px]" />
      </div>
      <Card className="neon-border w-full max-w-[420px] bg-card/80 backdrop-blur-xl">
        <CardContent className="space-y-5 p-7 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[hsl(var(--neon-purple))] text-primary-foreground shadow-lg glow-shadow">
            <GraduationCap className="h-7 w-7" />
          </div>
          {failed ? (
            <>
              <div className="space-y-2">
                <h1 className="text-lg font-semibold">Sign-in didn't complete</h1>
                <p className="text-sm text-muted-foreground">{failed}</p>
                <p className="text-xs text-muted-foreground">
                  Nothing is wrong with your account — you can sign in with your email and password
                  instead.
                </p>
              </div>
              <Button asChild className="w-full">
                <Link to="/auth">Back to sign in</Link>
              </Button>
            </>
          ) : (
            <div className="space-y-3" role="status" aria-live="polite">
              <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
              <p className="text-sm text-muted-foreground">Signing you in…</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
