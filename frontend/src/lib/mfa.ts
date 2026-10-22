// Two-factor authentication (TOTP), in one place.
//
// The factor lives in GoTrue (`auth.mfa_factors`) and is enrolled, challenged and
// verified through `supabase.auth.mfa`, so no secret ever reaches our tables. What
// this module adds is the shared vocabulary the three surfaces need — the login
// step, the admin gate and account settings — so none of them can invent its own
// idea of "verified".
//
// The server is the authority: `public.is_admin()` (migration 20261022180000)
// demands AAL2 before any admin policy or admin RPC answers, so an AAL1 session
// holding the admin role can read its own rows and nothing else. Everything here
// is the polite version of that rule — telling the person what to do next.
import { supabase } from "@/integrations/supabase/client";

export type AssuranceLevel = "aal1" | "aal2";

export type Assurance = {
  /** What this session has proved: aal2 only after a verified second factor. */
  currentLevel: AssuranceLevel | null;
  /** aal2 when the account has a verified factor and this session has not met it. */
  nextLevel: AssuranceLevel | null;
};

export type TotpFactor = {
  id: string;
  friendlyName: string | null;
  verified: boolean;
};

/** Read the session's assurance level. `null` means "could not ask", never "aal2". */
export async function readAssurance(): Promise<Assurance> {
  const { data, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (error || !data) return { currentLevel: null, nextLevel: null };
  return {
    currentLevel: (data.currentLevel as AssuranceLevel | null) ?? null,
    nextLevel: (data.nextLevel as AssuranceLevel | null) ?? null,
  };
}

/** Every TOTP factor on the account, newest first. Unverified rows are abandoned attempts. */
export async function listTotpFactors(): Promise<TotpFactor[]> {
  const { data, error } = await supabase.auth.mfa.listFactors();
  if (error || !data) return [];
  return (data.totp ?? [])
    .map((factor) => ({
      id: factor.id,
      friendlyName: factor.friendly_name ?? null,
      verified: factor.status === "verified",
    }))
    .sort((a, b) => Number(b.verified) - Number(a.verified));
}

export type EnrolledTotp = {
  factorId: string;
  /** SVG data URI of the QR code, straight from GoTrue. */
  qr: string;
  /** The base32 secret, for people typing it into their app by hand. */
  secret: string;
  /** `otpauth://` URI, for anything that accepts one. */
  uri: string;
};

// `ok` is a plain boolean, not a literal union: this project compiles without
// strictNullChecks, where `ok: true | false` widens and TypeScript stops narrowing
// at the call site (the same reason username.ts uses a string discriminant).
export type MfaResult<T> = { ok: boolean; data?: T; message?: string };

/**
 * Start enrolling a new authenticator app.
 *
 * Any half-finished factor from a previous attempt is removed first: GoTrue caps
 * an account at 10 factors, and a trail of abandoned rows makes "which one is
 * live?" a guess for whoever resets this later.
 */
export async function beginTotpEnrollment(): Promise<MfaResult<EnrolledTotp>> {
  const factors = await listTotpFactors();
  for (const factor of factors.filter((f) => !f.verified)) {
    await supabase.auth.mfa.unenroll({ factorId: factor.id }).catch(() => {});
  }

  const { data, error } = await supabase.auth.mfa.enroll({
    factorType: "totp",
    friendlyName: "Authenticator app",
  });
  if (error || !data?.totp) {
    return { ok: false, message: "We could not start setting up two-factor authentication. Please try again." };
  }
  return {
    ok: true,
    data: { factorId: data.id, qr: data.totp.qr_code, secret: data.totp.secret, uri: data.totp.uri },
  };
}

/** Check a 6-digit code and, on success, upgrade this session to AAL2. */
export async function verifyTotp(factorId: string, code: string): Promise<MfaResult<null>> {
  const digits = String(code ?? "").replace(/\s+/g, "");
  if (!/^\d{6}$/.test(digits)) return { ok: false, message: "Enter the 6-digit code from your authenticator app." };

  const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({ factorId });
  if (challengeError || !challenge) {
    return { ok: false, message: "We could not check that code just now. Please try again." };
  }
  const { error } = await supabase.auth.mfa.verify({
    factorId,
    challengeId: challenge.id,
    code: digits,
  });
  if (error) {
    // A wrong code and an expired window read the same to the person typing.
    return { ok: false, message: "That code was not accepted. Check your authenticator app and try the next one." };
  }
  return { ok: true, data: null };
}

/** Remove a factor. With one factor that turns the second step off. */
export async function removeTotpFactor(factorId: string): Promise<MfaResult<null>> {
  const { error } = await supabase.auth.mfa.unenroll({ factorId });
  if (error) return { ok: false, message: "We could not turn that off. Please try again." };
  return { ok: true, data: null };
}

/** `123456` → `123 456`, which is how every authenticator app shows it. */
export function formatCodeInput(raw: string): string {
  const digits = String(raw ?? "").replace(/\D/g, "").slice(0, 6);
  return digits.length > 3 ? `${digits.slice(0, 3)} ${digits.slice(3)}` : digits;
}
