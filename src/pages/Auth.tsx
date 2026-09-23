import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SEOHead } from "@/components/SEOHead";
import { PASSWORD_RULES_TEXT, validatePassword, isBreachedPassword } from "@/lib/passwordPolicy";
import { GraduationCap, ArrowLeft, Sparkles } from "lucide-react";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const lastAttemptRef = useRef(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<string>("student");

  const resolveEmail = async (
    identifier: string,
  ): Promise<{ email: string | null; throttled: boolean }> => {
    const trimmed = identifier.trim();
    if (!trimmed) return { email: null, throttled: false };
    // If it already looks like an email, use it directly
    if (trimmed.includes("@")) return { email: trimmed.toLowerCase(), throttled: false };
    // Otherwise resolve the username server-side (service-role edge function)
    try {
      const { data, error } = await supabase.functions.invoke("resolve-login-email", {
        body: { identifier: trimmed },
      });
      const status = (error as { context?: { status?: number } } | null)?.context?.status;
      if (status === 429) return { email: null, throttled: true };
      if (error || !data?.email) return { email: null, throttled: false };
      return { email: data.email as string, throttled: false };
    } catch {
      return { email: null, throttled: false };
    }
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
      const { email: resolved, throttled } = await resolveEmail(loginIdentifier);
      if (throttled) {
        toast({
          title: "Too many attempts",
          description: "Please wait a minute before trying again.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      const email = resolved;
      // No fallback: if the resolver can't confirm the username, don't guess a
      // synthetic email — guessing emails client-side is an account-enumeration
      // vector and can't be rate-limited server-side.
      if (!email) {
        toast({ title: "Login failed", description: "Invalid email/username or password", variant: "destructive" });
        setLoading(false);
        return;
      }
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: loginPassword,
      });
      if (error) {
        // Always the same generic message — never reveal whether the account exists
        toast({ title: "Login failed", description: "Invalid email/username or password", variant: "destructive" });
      } else {
        navigate("/dashboard");
      }
    } catch {
      toast({ title: "Login failed", description: "Invalid email/username or password", variant: "destructive" });
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
    const { error } = await supabase.auth.signUp({
      email,
      password: signupPassword,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: { full_name: fullName, role },
      },
    });
    setLoading(false);
    if (error) {
      toast({ title: "Signup failed", description: error.message, variant: "destructive" });
    } else {
      toast({
        title: role === "parent" ? "Parent account created" : "Welcome to Clutch Marks!",
        description: role === "parent"
          ? "You can link your child's account from the dashboard now."
          : "Your free plan is active — every O Level lesson, quiz and note is ready.",
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
                    <Label htmlFor="login-identifier" className="text-sm font-medium">Email or Username</Label>
                    <Input id="login-identifier" placeholder="you@example.com or username" value={loginIdentifier} onChange={e => setLoginIdentifier(e.target.value)} required className={inputClasses} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-sm font-medium">Password</Label>
                    <Input id="login-password" type="password" placeholder="••••••••" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required className={inputClasses} />
                  </div>
                  <Button type="submit" className="w-full h-11 bg-gradient-to-r from-primary to-[hsl(var(--neon-purple))] hover:opacity-90 transition-opacity shadow-md glow-shadow font-semibold text-sm text-primary-foreground" disabled={loading}>
                    {loading ? "Signing in…" : "Sign In"}
                  </Button>
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
                  <Button type="submit" className="w-full h-11 bg-gradient-to-r from-primary to-[hsl(var(--neon-purple))] hover:opacity-90 transition-opacity shadow-md glow-shadow font-semibold text-sm text-primary-foreground" disabled={loading}>
                    {loading ? "Creating account…" : "Create Account"}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground pt-1">
                    Free plan includes all O Level material — no approval needed
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
