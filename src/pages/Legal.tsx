// Privacy Policy and Terms of Service — written in plain, student-friendly
// language. Both pages share one shell so the style stays identical.
//
// The privacy notice is a PDPL notice (Saudi Personal Data Protection Law and
// its Implementing Regulations): it has to name a lawful basis per purpose, the
// recipients and where they process, how long each category is kept, the rights
// a reader can exercise and how, and the route to SDAIA. Keep the retention
// lines in step with supabase/migrations/20261008130000_pdpl_retention_purge.sql
// — pdpl.test.ts fails if the two drift.
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DATA_REQUEST_RESPONSE_DAYS,
  LEGAL_LAST_UPDATED,
  PRIVACY_CONTACT_EMAIL,
  PRIVACY_CONTACT_HREF,
  PRIVACY_POLICY_VERSION,
} from "@/lib/legal";

type Section = { heading: string; body: React.ReactNode };

/** Shared table styling: these documents carry data tables, not prose only. */
const tableClass = "w-full text-xs border-collapse [&_th]:text-left [&_th]:align-top [&_th]:py-2 [&_th]:pr-3 [&_th]:text-foreground [&_td]:align-top [&_td]:py-2 [&_td]:pr-3 [&_td]:border-t [&_td]:border-border/60";

function LegalShell({
  title,
  updated,
  version,
  intro,
  sections,
  path,
}: {
  title: string;
  updated: string;
  version: string;
  intro: string;
  sections: Section[];
  path: string;
}) {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <SEOHead path={path} />
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Last updated: {updated} · Version {version}
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">The short version</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">{intro}</CardContent>
      </Card>
      <div className="space-y-4">
        {sections.map((s, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="text-base">{s.heading}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed [&_a]:text-primary [&_a]:underline">
              {s.body}
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-xs text-muted-foreground pb-6">
        Questions about this page, or a request we can act on? Contact us at{" "}
        <a href={PRIVACY_CONTACT_HREF} className="text-primary underline">{PRIVACY_CONTACT_EMAIL}</a>, use the{" "}
        <Link to="/data-rights" className="text-primary underline">data rights page</Link>, or send a message
        through the <Link to="/feedback" className="text-primary underline">Feedback tab</Link>.
      </p>
    </div>
  );
}

const UPDATED = LEGAL_LAST_UPDATED;

const privacySections: Section[] = [
  {
    heading: "Who is responsible for your data",
    body: (
      <>
        <p>
          Clutch Marks runs clutchmarks.study. We decide why and how your personal data is used, so
          under the Saudi Personal Data Protection Law (<strong>PDPL</strong>) and its Implementing
          Regulations we are the <strong>controller</strong>, and we are accountable for it.
        </p>
        <p>
          Privacy questions, requests and complaints go to{" "}
          <a href={PRIVACY_CONTACT_HREF}>{PRIVACY_CONTACT_EMAIL}</a>. This notice is version{" "}
          {PRIVACY_POLICY_VERSION}; when we change it we change the version, and the version you
          accepted is recorded with your account (see{" "}
          <Link to="/data-rights">your data rights</Link>).
        </p>
      </>
    ),
  },
  {
    heading: "What we collect, why, and on what basis",
    body: (
      <>
        <p>
          We collect the least we can and use it only for the purpose it was collected for. The
          lawful basis matters: where it is <strong>consent</strong> you can withdraw it, and where
          it is <strong>contract</strong> we cannot run the service without it.
        </p>
        <table className={tableClass}>
          <thead>
            <tr><th>What</th><th>Why</th><th>Basis</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Name, email address, username, password (stored hashed, never readable)</td>
              <td>To create and secure your account and sign you in</td>
              <td>Contract</td>
            </tr>
            <tr>
              <td>Your study activity — lessons opened, quiz and practice answers, scores, marks, XP, streaks, flashcard reviews, study plans</td>
              <td>To mark your work, show your progress and scope the platform to the subjects you chose</td>
              <td>Contract</td>
            </tr>
            <tr>
              <td>The email address of a parent or guardian you choose to link</td>
              <td>To let that person follow your progress, and to send them a weekly summary</td>
              <td>Consent — unlink at any time from your dashboard</td>
            </tr>
            <tr>
              <td>Plan and payment status, and the receipt you upload</td>
              <td>To give access to what you paid for and to keep accounting records</td>
              <td>Contract, and legal obligation for the records</td>
            </tr>
            <tr>
              <td>Feedback and messages you send us</td>
              <td>To fix mistakes in the content and reply to you</td>
              <td>Legitimate interests</td>
            </tr>
            <tr>
              <td>Security data: sign-in throttling keys and the record of administrator actions</td>
              <td>To stop account-takeover attempts and to know who changed what</td>
              <td>Legitimate interests</td>
            </tr>
            <tr>
              <td>Aggregate usage analytics (which pages are visited, which subjects are opened)</td>
              <td>To see what is worth building and what is broken</td>
              <td>Legitimate interests, with an opt-out on the <Link to="/data-rights">data rights page</Link></td>
            </tr>
          </tbody>
        </table>
        <p>
          We do <strong>not</strong> ask for your address, phone number or date of birth, we do not
          use advertising trackers, and we never sell your data. When you ask us to mark an answer
          or write a study plan, the text you submitted is sent to our AI provider to produce it —
          don't paste personal details into an answer.
        </p>
      </>
    ),
  },
  {
    heading: "Who else handles it",
    body: (
      <>
        <p>
          We use service providers (<strong>processors</strong>) that may only act on our
          instructions. Each is named here so you know who can touch your data:
        </p>
        <table className={tableClass}>
          <thead>
            <tr><th>Provider</th><th>What it does for us</th><th>Where it processes</th></tr>
          </thead>
          <tbody>
            <tr><td>Supabase</td><td>Database, sign-in, file storage</td><td>Singapore (ap-southeast-1)</td></tr>
            <tr><td>Vercel</td><td>Serves the website and its files</td><td>Global network of edge locations</td></tr>
            <tr><td>Render</td><td>Runs the small API in front of our server functions</td><td>United States / European Union</td></tr>
            <tr><td>Cloudflare</td><td>Worker AI marking and study-plan generation</td><td>Global network of edge locations</td></tr>
            <tr><td>Resend</td><td>Delivers our emails (welcome, weekly digest, alerts)</td><td>United States</td></tr>
            <tr><td>Plausible</td><td>Aggregate, cookie-free analytics</td><td>European Union</td></tr>
          </tbody>
        </table>
        <p>
          Staff access is limited to administrators who need it, and their changes are written to an
          audit log.
        </p>
      </>
    ),
  },
  {
    heading: "Transfers outside the Kingdom",
    body: (
      <>
        <p>
          We operate from outside Saudi Arabia, and so do the providers above: your data may be
          processed outside the Kingdom, chiefly in Singapore, the European Union and the United
          States. Under the PDPL's Regulations on Personal Data Transfers outside the Kingdom, a
          transfer like this needs a lawful basis and adequate safeguards.
        </p>
        <p>
          We rely on the safeguards our providers make available — their data-processing terms and
          the standard contractual protections they offer — and on your consent where consent is the
          basis of the processing. You can ask us for the current list of providers and the
          safeguards in place by emailing{" "}
          <a href={PRIVACY_CONTACT_HREF}>{PRIVACY_CONTACT_EMAIL}</a>, and we will not transfer your
          data to anyone else for their own purposes.
        </p>
      </>
    ),
  },
  {
    heading: "How long we keep it",
    body: (
      <>
        <p>
          Nothing is kept "just in case". Each category has a period, and where a period is a
          promise an automated job enforces it:
        </p>
        <table className={tableClass}>
          <thead>
            <tr><th>What</th><th>How long</th></tr>
          </thead>
          <tbody>
            <tr><td>Account details and study activity</td><td>While your account is open. Deleted within {DATA_REQUEST_RESPONSE_DAYS} days of a verified deletion request.</td></tr>
            <tr><td>Consent records (which notice version you accepted, and when)</td><td>Deleted together with your account.</td></tr>
            <tr><td>Parent and guardian links</td><td>Until either side unlinks; an invite is deleted as soon as the parent registers.</td></tr>
            <tr><td>Administrator audit log</td><td>12 months, then archived in anonymised form.</td></tr>
            <tr><td>Sign-in security logs</td><td>30 days, then purged nightly.</td></tr>
            <tr><td>Notifications</td><td>180 days once read, then purged nightly.</td></tr>
            <tr><td>Closed data requests</td><td>24 months as a compliance record, then purged nightly.</td></tr>
            <tr><td>Payment and subscription records</td><td>As long as tax and accounting rules require, then deleted.</td></tr>
            <tr><td>Email suppression list</td><td>Until the address is cleared or you ask us to remove it.</td></tr>
          </tbody>
        </table>
        <p>
          A copy of deleted data can remain in our providers' backups until those backups rotate on
          their normal schedule; it is not used for anything.
        </p>
      </>
    ),
  },
  {
    heading: "Your rights, and how to use them",
    body: (
      <>
        <p>
          The PDPL gives you rights over your own data. Every one of them is requestable from the{" "}
          <Link to="/data-rights">data rights page</Link> or by email, and we do not charge for it:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>To be told</strong> how your data is used — that is what this notice is for.</li>
          <li><strong>Access</strong> — a copy of everything we hold about you. You can download it yourself from the data rights page.</li>
          <li><strong>Correction</strong> — put right anything inaccurate or incomplete.</li>
          <li><strong>Destruction</strong> — have your account and its data erased.</li>
          <li><strong>Portability</strong> — receive it in a usable, machine-readable form.</li>
          <li><strong>Withdraw consent</strong> — where we rely on consent (a parent link, analytics) with no effect on what happened before.</li>
          <li><strong>Object</strong> to processing we justify by legitimate interests.</li>
        </ul>
        <p>
          We answer within {DATA_REQUEST_RESPONSE_DAYS} days; if a request is unusually complex we
          tell you why it will take longer. We may ask you to confirm you are the account holder —
          never for more than we need to do that. If you are not satisfied with our answer, you can
          complain to the <strong>Saudi Data & AI Authority (SDAIA)</strong>, which regulates this
          law, at <a href="https://sdaia.gov.sa" target="_blank" rel="noreferrer noopener">sdaia.gov.sa</a>.
        </p>
      </>
    ),
  },
  {
    heading: "Students, parents and guardians",
    body: (
      <>
        <p>
          Most people here are school students, so we deliberately collect almost nothing about a
          young person: a name, an email address and their own study activity. There is no
          advertising, no profiling for marketing, and no selling — to anyone, at any age.
        </p>
        <p>
          A parent or guardian who is linked sees progress only: scores, lessons completed and the
          weekly summary. They cannot sign in as the student, and they never see the password. If you
          are under 18, please involve a parent or guardian — and they can exercise every right in
          this notice on your behalf by writing to us from{" "}
          <a href={PRIVACY_CONTACT_HREF}>{PRIVACY_CONTACT_EMAIL}</a>. We act on a guardian's
          verified request just as we would on the student's own.
        </p>
      </>
    ),
  },
  {
    heading: "How we keep it safe",
    body: (
      <>
        <p>
          Your data is encrypted in transit, passwords are stored hashed and are screened against
          known breach lists, and every table is protected by row-level access rules so one account
          cannot read another's. Only administrators who need access have it, and their actions are
          audited. Study materials carry a watermark tied to the account that downloaded them, so
          leaked content can be traced — please keep your password to yourself.
        </p>
        <p>
          If a breach ever risks your data, we notify SDAIA within <strong>72 hours</strong> of
          becoming aware of it and tell the people affected what happened and what to do.
        </p>
      </>
    ),
  },
  {
    heading: "What is stored on your device",
    body: (
      <>
        <p>
          We use no advertising or third-party tracking cookies. What we do keep in your browser is
          there to make the site work or to remember a choice you made:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Your sign-in session</strong>, so you stay signed in between visits.</li>
          <li><strong>Your theme and sidebar state</strong>, so the site looks the way you left it.</li>
          <li><strong>The address you used to unlock a download</strong>, so the gate does not ask twice on your own device.</li>
          <li><strong>Dismissed prompts and first-touch attribution</strong> (which link brought you here), which we use to know what is worth publishing.</li>
          <li><strong>Your analytics choice</strong> — if you opt out, we remember that too.</li>
        </ul>
        <p>
          Analytics is aggregate and cookie-free (Plausible, hosted in the EU) and can be switched
          off on the <Link to="/data-rights">data rights page</Link>. Clearing your browser storage
          removes everything listed above, at the cost of being signed out.
        </p>
      </>
    ),
  },
  {
    heading: "Changes to this notice",
    body: (
      <>
        <p>
          When we change how we handle personal data we update this notice and its version, and we
          bump it whenever a change matters. The version you agreed to when you created your account
          is stored with your account, so you can always see which text you accepted.
        </p>
        <p>
          This notice describes how we apply the PDPL to this platform. It is written to be read by
          students, parents and teachers — it is not legal advice to anyone else, and it does not
          limit any right the law gives you.
        </p>
      </>
    ),
  },
];

const termsSections: Section[] = [
  {
    heading: "Using Clutch Marks",
    body: (
      <p>
        Clutch Marks is a study platform for IGCSE, AS and A Level students. By creating an account
        you agree to use it honestly: do your own quizzes, don't share your account, and don't try
        to break things. Accounts are free to start, with an optional paid plan that unlocks more
        content — the current prices are on the <Link to="/pricing">Pricing page</Link>.
      </p>
    ),
  },
  {
    heading: "Our content belongs to us",
    body: (
      <p>
        Everything on this site — lessons, revision notes, quizzes, past paper materials, flashcards
        and images — is owned by Clutch Marks and is for your personal study only. You may not
        download, copy, screenshot, republish or share our materials outside the site. Our content
        is watermarked with your account details, so if it ends up somewhere it shouldn't, we can
        tell which account shared it. Sharing paid content can lead to your account being suspended
        and, for paid plans, no refund.
      </p>
    ),
  },
  {
    heading: "XP, streaks and leaderboards",
    body: (
      <p>
        Points and streaks are meant to reward genuine study. Trying to cheat the system (bots,
        scripts, or repeated fake answers) is not allowed, and we may reset XP or suspend accounts
        that abuse it. Be kind on the leaderboard — it shows your display name only.
      </p>
    ),
  },
  {
    heading: "Payments and subscriptions",
    body: (
      <p>
        Paid plans are billed through the payment method shown on the Pricing page. Your plan lasts
        for the period you paid for and doesn't auto-renew unless we clearly say so. If a payment
        fails or is reversed, the account returns to the limited preview tier.
      </p>
    ),
  },
  {
    heading: "Accounts and behaviour",
    body: (
      <ul className="list-disc pl-5 space-y-1">
        <li>One account per student. Don't share your login with friends.</li>
        <li>Don't upload anything offensive or try to hack, scrape, or overload the site.</li>
        <li>We can suspend accounts that break these rules or put other students at risk.</li>
        <li>
          We handle your personal data as described in the{" "}
          <Link to="/privacy">Privacy Policy</Link>, including the rights it gives you.
        </li>
      </ul>
    ),
  },
  {
    heading: "If something goes wrong",
    body: (
      <p>
        We work hard to keep the site accurate and available, but we can't promise it will always be
        perfect or online. If we make a mistake that affects you, contact us and we'll make it
        right. Nothing in these terms removes rights you have under consumer law.
      </p>
    ),
  },
];

export function PrivacyPolicy() {
  return (
    <LegalShell
      title="Privacy Policy"
      path="/privacy"
      updated={UPDATED}
      version={PRIVACY_POLICY_VERSION}
      intro="We collect the minimum: your name, email and your own study activity. No advertising trackers, no selling, no asking for more than we need. This notice says what we hold, why, who else touches it, how long we keep it, and how to get a copy or have it all deleted — and most of it you can do from the data rights page without waiting for us."
      sections={privacySections}
    />
  );
}

export function TermsOfService() {
  return (
    <LegalShell
      title="Terms of Service"
      path="/terms"
      updated={UPDATED}
      version={PRIVACY_POLICY_VERSION}
      intro="Study honestly, keep your account to yourself, and don't share our materials outside the site — everything on Clutch Marks is watermarked and owned by us. Break the rules and we may suspend your account."
      sections={termsSections}
    />
  );
}
