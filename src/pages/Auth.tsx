// Login + signup (student or parent), with password policy and breach check.
// Anyone signs in with their email *or* their username: a username is traded
// for a session server-side by the `login-with-username` edge function, which
// verifies the password and never hands the account's email back to the client.
// Optional parent email at signup auto-links the child to that parent account
// (instant if it exists, queued if not). Includes a forgot-password flow.
import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/useToast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SEOHead } from "@/components/SEOHead";
import { captureAttribution, getAttribution, trackSignup } from "@/lib/analytics";
import { PASSWORD_RULES_TEXT, validatePassword, isBreachedPassword } from "@/lib/passwordPolicy";
import { GraduationCap, ArrowLeft, Sparkles } from "lucide-react";
import { ForgotPasswordDialog } from "@/components/ForgotPasswordDialog";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const lastAttemptRef = useRef(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Persist first-touch UTM attribution (blog links etc.) before signup.
  useEffect(() => {
    captureAttribution();
  }, []);

  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [role, setRole] = useState<string>("student");

  const GENERIC_LOGIN_ERROR = "Invalid email/username or password";

  // Username sign-in: the edge function resolves the identifier, checks the
  // password against the auth server and returns only a session. There is no
  // client-side fallback that guesses an email — guessing is an account
  // enumeration vector and can't be rate-limited from the browser.
  const signInWithUsername = async (
    identifier: string,
    password: string,
  ): Promise<{ ok: boolean; throttled: boolean }> => {
    const { data, error } = await supabase.functions.invoke("login-with-username", {
      body: { identifier, password },
    });
    const status = (error as { context?: { status?: number } } | null)?.context?.status;
    if (status === 429) return { ok: false, throttled: true };
    const accessToken = (data as { access_token?: string } | null)?.access_token;
    const refreshToken = (data as { refresh_token?: string } | null)?.refresh_token;
    if (error || !accessToken || !refreshToken) return { ok: false, throttled: false };
    // Persist the session exactly as a password grant would have.
    const { error: sessionError } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
    return { ok: !sessionError, throttled: false };
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    // Light client-side throttle to discourage rapid-fire attempts
    const now = Date.now();
    if (now - lastAttemptRef.current < 1000) return;
    lastAttemptRef.current = now;

    setLoading(true);
    try {
      const identifier = loginIdentifier.trim();
      // Emails go straight to the auth server; anything else is a username.
      const result = identifier.includes("@")
        ? {
            ok: !(
              await supabase.auth.signInWithPassword({
                email: identifier.toLowerCase(),
                password: loginPassword,
              })
            ).error,
            throttled: false,
          }
        : await signInWithUsername(identifier, loginPassword);

      if (result.throttled) {
        toast({
          title: "Too many attempts",
          description: "Please wait a minute before trying again.",
          variant: "destructive",
        });
      } else if (!result.ok) {
        // Always the same generic message — never reveal whether the account exists
        toast({ title: "Login failed", description: GENERIC_LOGIN_ERROR, variant: "destructive" });
      } else {
        navigate("/dashboard");
      }
    } catch {
      toast({ title: "Login failed", description: GENERIC_LOGIN_ERROR, variant: "destructive" });
    }
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    // Password policy: minimum length is enforced by the auth server (6);
    // complexity and breach-screening are enforced here with clear feedback.
    const pwError = validatePassword(signupPassword, "student");
    if (pwError) {
      toast({ title: "Password too weak", description: pwError, variant: "destructive" });
      return;
    }
    setLoading(true);
    if (await isBreachedPassword(signupPassword)) {
      toast({
        title: "Choose a safer password",
        description: "That password has appeared in known data breaches. Please pick a different one.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    const email = signupEmail.toLowerCase().trim();
    // Parent link: students may attach a parent's email. It must differ from
    // their own — the server ignores equal emails, we block it here with a
    // clear message instead.
    const parent = parentEmail.toLowerCase().trim();
    if (role === "student" && parent && parent === email) {
      toast({
        title: "Parent email invalid",
        description: "Your parent's email must be different from your own.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    const { error } = await supabase.auth.signUp({
      email,
      password: signupPassword,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: {
          full_name: fullName,
          role,
          // Only sent for students; ignored server-side otherwise.
          parent_email: role === "student" && parent ? parent : undefined,
          // Blog/ad attribution (first-touch UTM), stored in user metadata.
          attribution: getAttribution() ?? undefined,
        },
      },
    });
    if (!error) trackSignup(role);
    setLoading(false);
    if (error) {
      toast({ title: "Signup failed", description: error.message, variant: "destructive" });
    } else {
      toast({
        title: role === "parent" ? "Parent account created" : "Welcome to Clutch Marks!",
        description: role === "parent"
          ? "Children who signed up with your email are linked automatically."
          : parent
            ? "Account ready — we've linked your parent's account to yours."
            : "Your account is ready — pick your subjects and start studying.",
      });
    }
  };

  const inputClasses = "h-11 bg-secondary/50 border-border focus:border-primary/50 focus:ring-primary/20";

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 overflow-hidden geo-pattern">
      <SEOHead title="Log In — Clutch Marks" description="Sign in or create an account to access lessons, quizzes, and track your Clutch Marks progress." path="/auth" />
      {/* Ambient neon glows */}
      <div className="absolute inset-0 -z-10 bg-background">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[800px] h-[800px] rounded-full bg-primary/[0.08] blur-[120px]" />
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[500px] h-[500px] rounded-full bg-[hsl(var(--neon-purple))]/[0.06] blur-[100px]" />
        <div className="absolute top-1/2 left-0 -translate-x-1/3 w-[400px] h-[400px] rounded-full bg-[hsl(var(--neon-cyan))]/[0.04] blur-[80px]" />
      </div>

      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 lg:p-6">
        <Button asChild variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
          <Link to="/"><ArrowLeft className="h-4 w-4" /> Back</Link>
        </Button>
        <ThemeToggle />
      </div>

      <div className="w-full max-w-[420px]">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[hsl(var(--neon-purple))] text-primary-foreground shadow-lg glow-shadow">
            <GraduationCap className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-muted-foreground">Sign in to continue your studies</p>
        </div>

        <Card className="neon-border bg-card/80 backdrop-blur-xl shadow-2xl">
          <Tabs defaultValue="login">
            <CardHeader className="pb-4">
              <TabsList className="grid w-full grid-cols-2 bg-secondary/60">
                <TabsTrigger value="login" className="data-[state=active]:bg-card data-[state=active]:shadow-sm font-semibold">Log In</TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-card data-[state=active]:shadow-sm font-semibold">Sign Up</TabsTrigger>
              </TabsList>
            </CardHeader>

            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4 pt-0">
                  <div className="space-y-2">
                    <Label htmlFor="login-identifier" className="text-sm font-medium">Email or username</Label>
                    <Input id="login-identifier" type="text" autoComplete="username" placeholder="you@example.com" value={loginIdentifier} onChange={e => setLoginIdentifier(e.target.value)} required className={inputClasses} />
                    <p className="text-xs text-muted-foreground">Use the email you signed up with, or your Clutch Marks username.</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-sm font-medium">Password</Label>
                    <Input id="login-password" type="password" placeholder="••••••••" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required className={inputClasses} />
                  </div>
                  <Button type="submit" className="w-full h-11 bg-gradient-to-r from-primary to-[hsl(var(--neon-purple))] hover:opacity-90 transition-opacity shadow-md glow-shadow font-semibold text-sm text-primary-foreground" disabled={loading}>
                    {loading ? "Signing in…" : "Sign In"}
                  </Button>
                  <p className="text-center text-xs">
                    <ForgotPasswordDialog />
                  </p>
                </CardContent>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup}>
                <CardContent className="space-y-4 pt-0">
                  <div className="space-y-2">
                    <Label htmlFor="full-name" className="text-sm font-medium">Full Name</Label>
                    <Input id="full-name" placeholder="Your full name" value={fullName} onChange={e => setFullName(e.target.value)} required className={inputClasses} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-sm font-medium">Email</Label>
                    <Input id="signup-email" type="email" placeholder="you@example.com" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} required className={inputClasses} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-sm font-medium">Password</Label>
                    <Input id="signup-password" type="password" placeholder="6+ chars, mixed case, number, symbol" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} required minLength={6} className={inputClasses} />
                    <p className="text-xs text-muted-foreground">{PASSWORD_RULES_TEXT}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">I am a</Label>
                    <Select value={role} onValueChange={setRole}>
                      <SelectTrigger className="h-11 bg-secondary/50 border-border"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {role === "student" && (
                    <div className="space-y-2">
                      <Label htmlFor="parent-email" className="text-sm font-medium">Parent's email <span className="text-muted-foreground font-normal">(optional)</span></Label>
                      <Input id="parent-email" type="email" placeholder="parent@example.com" value={parentEmail} onChange={e => setParentEmail(e.target.value)} className={inputClasses} />
                      <p className="text-xs text-muted-foreground">If your parent already has an account they'll see your progress; otherwise they'll be linked automatically when they sign up.</p>
                    </div>
                  )}
                  <Button type="submit" className="w-full h-11 bg-gradient-to-r from-primary to-[hsl(var(--neon-purple))] hover:opacity-90 transition-opacity shadow-md glow-shadow font-semibold text-sm text-primary-foreground" disabled={loading}>
                    {loading ? "Creating account…" : "Create Account"}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground pt-1">
                    No approval needed — pick your subjects and start studying
                  </p>
                </CardContent>
              </form>
            </TabsContent>
          </Tabs>
        </Card>

        <div className="mt-6 flex justify-center">
          <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/60">
            <Sparkles className="h-3 w-3" /> Powered by Clutch Marks
          </div>
        </div>
      </div>
    </div>
  );
}
