// The three places a second factor appears, in one component file:
//
//   MfaGate          the wall in front of /admin — enroll if the account has no
//                    authenticator yet, otherwise ask for the code
//   TwoFactorSettings the account-settings card: set up, see what is enrolled,
//                    turn it off
//   TotpCodeForm     the login step, after the password was accepted
//
// All three are UI over `@/lib/mfa`; none of them is the security boundary. The
// database refuses admin work at AAL1 (public.is_admin), so a browser that skips
// this file gets an empty console rather than a working one.
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import {
  beginTotpEnrollment,
  formatCodeInput,
  listTotpFactors,
  readAssurance,
  removeTotpFactor,
  verifyTotp,
  type TotpFactor,
} from "@/lib/mfa";
import { Check, Copy, KeyRound, Loader2, ShieldCheck, ShieldOff, Smartphone } from "lucide-react";

const SECRET_CHUNK = 4;

/** Base32 secrets are 32 characters; grouping them makes hand-entry possible. */
function chunkSecret(secret: string): string {
  return (secret.match(new RegExp(`.{1,${SECRET_CHUNK}}`, "g")) ?? []).join(" ");
}

/** The 6-digit box, shared by enrollment, the gate and the login step. */
export function TotpCodeForm({
  factorId,
  onVerified,
  submitLabel = "Verify",
  autoFocus = true,
  compact = false,
}: {
  factorId: string;
  onVerified: () => void;
  submitLabel?: string;
  autoFocus?: boolean;
  compact?: boolean;
}) {
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    const result = await verifyTotp(factorId, code);
    setBusy(false);
    if (!result.ok) {
      setError(result.message);
      setCode("");
      inputRef.current?.focus();
      return;
    }
    onVerified();
  };

  return (
    <form onSubmit={submit} className="space-y-2" noValidate>
      <Label htmlFor="totp-code" className={compact ? "text-xs" : "text-sm"}>
        6-digit code
      </Label>
      <div className="flex flex-wrap items-center gap-2">
        <Input
          id="totp-code"
          ref={inputRef}
          value={code}
          onChange={(event) => {
            setCode(formatCodeInput(event.target.value));
            setError(null);
          }}
          inputMode="numeric"
          autoComplete="one-time-code"
          placeholder="123 456"
          aria-describedby="totp-code-help"
          aria-invalid={!!error}
          className="h-11 w-36 font-mono tracking-[0.2em]"
          maxLength={7}
        />
        <Button type="submit" disabled={busy || code.replace(/\D/g, "").length !== 6} className="h-11 gap-2">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
          {submitLabel}
        </Button>
      </div>
      <p id="totp-code-help" aria-live="polite" className="min-h-[1.25rem] text-xs">
        {error ? (
          <span className="text-destructive" role="alert">{error}</span>
        ) : (
          <span className="text-muted-foreground">Codes change every 30 seconds.</span>
        )}
      </p>
    </form>
  );
}

/** QR + secret + verify, shown while a factor is being set up. */
function TotpEnrollment({ onEnrolled }: { onEnrolled: () => void }) {
  const [enrolled, setEnrolled] = useState<{ factorId: string; qr: string; secret: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    void (async () => {
      const result = await beginTotpEnrollment();
      if (!result.ok) setError(result.message);
      else setEnrolled(result.data);
    })();
  }, []);

  if (error) {
    return <p className="text-sm text-destructive" role="alert">{error}</p>;
  }
  if (!enrolled) {
    return (
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Preparing your setup code…
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <ol className="space-y-1 text-sm text-muted-foreground">
        <li>1. Open your authenticator app (Google Authenticator, 1Password, Authy…).</li>
        <li>2. Scan the code, or type the key underneath it.</li>
        <li>3. Enter the 6-digit code it shows.</li>
      </ol>

      <div className="flex flex-wrap items-start gap-4">
        <img
          src={enrolled.qr}
          alt="QR code for your authenticator app"
          width={168}
          height={168}
          className="rounded-md border bg-white p-2"
        />
        <div className="min-w-[14rem] space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Or enter this key by hand</p>
          <code className="block break-all rounded-md bg-secondary/60 px-2 py-1.5 font-mono text-xs">
            {chunkSecret(enrolled.secret)}
          </code>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => {
              void navigator.clipboard?.writeText(enrolled.secret).then(
                () => setCopied(true),
                () => setCopied(false),
              );
            }}
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy key"}
          </Button>
        </div>
      </div>

      <TotpCodeForm factorId={enrolled.factorId} onVerified={onEnrolled} submitLabel="Turn on" />
    </div>
  );
}

/**
 * The wall in front of the admin console.
 *
 * An admin session at AAL1 has no admin data (the database refuses it), so the
 * only useful things to offer are "set it up" and "enter the code". The route
 * re-renders with the console once the session is upgraded.
 */
export function MfaGate() {
  const { refreshAssurance, user } = useAuth();
  const [state, setState] = useState<"loading" | "challenge" | "enroll">("loading");
  const [factor, setFactor] = useState<TotpFactor | null>(null);

  const load = useCallback(async () => {
    const factors = await listTotpFactors();
    const verified = factors.find((f) => f.verified) ?? null;
    setFactor(verified);
    setState(verified ? "challenge" : "enroll");
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const unlocked = useCallback(() => {
    void refreshAssurance();
  }, [refreshAssurance]);

  return (
    <div className="mx-auto max-w-xl py-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ShieldCheck className="h-4 w-4 text-primary" /> One more step
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {state === "loading" ? (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Checking this device…
            </p>
          ) : state === "challenge" && factor ? (
            <>
              <p className="text-sm text-muted-foreground">
                The admin console needs the code from your authenticator app. Your password alone is not
                enough — that is deliberate.
              </p>
              <TotpCodeForm factorId={factor.id} onVerified={unlocked} submitLabel="Unlock" />
              <p className="text-xs text-muted-foreground">
                Signed in as {user?.email ?? "this account"}. Lost your authenticator? Ask support to reset
                it before you can use the console again.
              </p>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                This account can run the admin console, so it needs a second factor: your password plus a
                6-digit code from an authenticator app. Set it up now — it takes about a minute, and the
                console opens as soon as the code is confirmed.
              </p>
              <TotpEnrollment onEnrolled={unlocked} />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Account settings: what is enrolled, how to add it, and how to turn it off.
 * Turning it off needs the password again? No — it needs nothing extra, because an
 * AAL1 session that has the password already holds the factor's owner; the value
 * is that the *console* still needs the factor, which is a database rule.
 */
export function TwoFactorSettings() {
  const { refreshAssurance, role } = useAuth();
  const [factors, setFactors] = useState<TotpFactor[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const list = await listTotpFactors();
    setFactors(list);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const verified = (factors ?? []).filter((f) => f.verified);

  const disable = async (factorId: string) => {
    setBusy(true);
    setError(null);
    const result = await removeTotpFactor(factorId);
    setBusy(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    await load();
    await refreshAssurance();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Smartphone className="h-4 w-4 text-primary" /> Two-factor authentication
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {factors === null ? (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Checking…
          </p>
        ) : verified.length > 0 ? (
          <>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <Badge variant="secondary" className="gap-1">
                <ShieldCheck className="h-3.5 w-3.5" /> On
              </Badge>
              <span className="text-muted-foreground">
                {verified[0].friendlyName ?? "Authenticator app"} — admin pages ask for a code.
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {verified.map((factor) => (
                <Button
                  key={factor.id}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  disabled={busy}
                  onClick={() => void disable(factor.id)}
                >
                  <ShieldOff className="h-3.5 w-3.5" /> Turn off
                </Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Turning it off does not change your password. If this account runs the admin console, the
              console will ask you to set it up again before it opens.
            </p>
          </>
        ) : role === "admin" ? (
          <>
            <p className="text-sm text-muted-foreground">
              Not set up. The admin console requires it: your password alone cannot open it.
            </p>
            <TotpEnrollment
              onEnrolled={() => {
                void load();
                void refreshAssurance();
              }}
            />
          </>
        ) : (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <KeyRound className="h-4 w-4" /> Not available for this account.
          </p>
        )}

        {error ? <p className="text-sm text-destructive" role="alert">{error}</p> : null}
      </CardContent>
    </Card>
  );
}

/** Used by account settings to explain why the wall exists, without repeating it. */
export function assuranceLabel(current: string | null): string {
  return current === "aal2" ? "Verified this session" : "Code required for admin pages";
}

export { readAssurance };
