// Account settings (/settings).
//
// One identity field is the account holder's own to change: the username. It is
// a login handle and the leaderboard name, so the rules are exactly the ones
// signup applies — lower-case, 3–32 characters from [a-z0-9._-], unique
// case-insensitively — and the database is the authority for all three
// (public.set_my_username). Email and profile ownership stay admin-only, which
// is why this page shows the email rather than offering to change it.
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/useToast";
import { USERNAME_MAX, USERNAME_RULES, normalizeUsername, validateUsername } from "@/lib/username";
import { AtSign, Check, Loader2, Lock, Mail, KeyRound, UserRound } from "lucide-react";

type ProfileRow = {
  username: string | null;
  email: string | null;
  full_name: string | null;
};

type SetUsernameResult = {
  ok: boolean;
  username?: string;
  error?: "invalid" | "taken" | "unchanged" | "missing";
  message?: string;
};

export default function Settings() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);
  // Only server answers live here. The shape check is derived, so a student who
  // types an unusable handle is told why while typing instead of being left with
  // a disabled Save button and no explanation.
  const [serverError, setServerError] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setLoadError(null);
    const { data, error } = await supabase
      .from("profiles")
      .select("username, email, full_name")
      .eq("user_id", user.id)
      .maybeSingle();
    if (error) {
      setLoadError(error.message);
      setLoading(false);
      return;
    }
    const row = (data ?? null) as ProfileRow | null;
    setProfile(row);
    setDraft(row?.username ?? "");
    setLoading(false);
  }, [user]);

  useEffect(() => {
    void load();
  }, [load]);

  const current = profile?.username ?? "";
  const candidate = normalizeUsername(draft);
  const unchanged = candidate === current;
  const check = validateUsername(draft);
  const canSave = !!user && !saving && !unchanged && check.status === "valid";
  const invalidMessage = check.status === "invalid" ? check.message : null;
  const problem = serverError ?? (unchanged ? null : invalidMessage);

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaved(null);
    if (check.status === "invalid") {
      // Already visible in the field's feedback; keep focus where the error is.
      document.getElementById("username")?.focus();
      return;
    }
    setServerError(null);
    setSaving(true);
    // The server re-validates and owns the uniqueness check; the client check is
    // only there to answer before a round trip.
    const { data, error } = await supabase.rpc("set_my_username", { _username: check.value });
    setSaving(false);

    if (error) {
      const message = "We could not save that just now. Please try again.";
      setServerError(message);
      toast({ title: "Username not changed", description: message, variant: "destructive" });
      return;
    }

    const result = data as SetUsernameResult | null;
    if (!result?.ok) {
      const message = result?.message ?? "We could not save that username.";
      setServerError(message);
      toast({ title: "Username not changed", description: message, variant: "destructive" });
      return;
    }

    const username = result.username ?? check.value;
    setProfile((prev) => ({ username, email: prev?.email ?? null, full_name: prev?.full_name ?? null }));
    setDraft(username);
    toast({
      title: "Username updated",
      description: `You can now sign in as @${username} or with your email.`,
    });
    setSaved(username);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <SEOHead path="/settings" />
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your username is how you sign in and how you appear on the leaderboard. Change it any time
          other students do not already have it.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <AtSign className="h-4 w-4 text-primary" /> Username
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading your account…
            </p>
          ) : loadError ? (
            <div className="space-y-2 text-sm">
              <p className="text-destructive">We could not load your account: {loadError}</p>
              <Button variant="outline" size="sm" onClick={() => void load()}>
                Try again
              </Button>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="text-muted-foreground">Current username</span>
                {current ? (
                  <Badge variant="secondary" className="font-mono text-[13px]">@{current}</Badge>
                ) : (
                  <Badge variant="outline" className="text-[13px]">Not set yet</Badge>
                )}
              </div>

              <form onSubmit={save} className="space-y-2" noValidate>
                <Label htmlFor="username" className="text-sm font-medium">
                  {current ? "New username" : "Choose a username"}
                </Label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      @
                    </span>
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck={false}
                      maxLength={USERNAME_MAX}
                      value={draft}
                      onChange={(e) => {
                        setDraft(e.target.value);
                        setServerError(null);
                        setSaved(null);
                      }}
                      placeholder="yourname"
                      className="h-11 bg-secondary/50 pl-7"
                      aria-describedby="username-rules username-feedback"
                      aria-invalid={!!problem}
                    />
                  </div>
                  <Button type="submit" disabled={!canSave} className="h-11 gap-2">
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                    Save
                  </Button>
                </div>
                <p id="username-rules" className="text-xs text-muted-foreground">
                  {USERNAME_RULES} It is not case-sensitive, so @Sam and @sam cannot be two accounts.
                </p>
                <div id="username-feedback" aria-live="polite" className="min-h-[1.25rem] text-xs">
                  {problem ? (
                    <span className="text-destructive" role="alert">{problem}</span>
                  ) : saved ? (
                    <span className="text-emerald-500">Saved — your username is @{saved}.</span>
                  ) : unchanged && current ? (
                    <span className="text-muted-foreground">This is already your username.</span>
                  ) : null}
                </div>
              </form>

              <p className="text-xs text-muted-foreground">
                Changing your username does not change your email or your password, and it does not
                lose your progress — everything is tied to your account, not to the name.
              </p>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Mail className="h-4 w-4 text-primary" /> Signing in
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center gap-2">
            <span>Email</span>
            <span className="font-medium text-foreground">{profile?.email ?? user?.email ?? "—"}</span>
          </div>
          <p>
            Either your email or your username works on the sign-in page. A username is only a
            handle: your email is never shown to other students.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <Button asChild variant="outline" size="sm" className="gap-2">
              <Link to="/reset-password"><KeyRound className="h-4 w-4" /> Change password</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="gap-2">
              <Link to="/data-rights"><UserRound className="h-4 w-4" /> Your data</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <p className="flex items-start gap-2 pb-6 text-xs text-muted-foreground">
        <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        Your email address and your account owner are admin-only changes — ask support if either is
        wrong. Usernames you stop using become available to other students, so a released name can be
        claimed by someone else.
      </p>
    </div>
  );
}
