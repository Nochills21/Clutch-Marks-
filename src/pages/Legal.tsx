// Privacy Policy and Terms of Service — written in plain, student-friendly
// language. Both pages share one shell so the style stays identical.
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Section = { heading: string; body: React.ReactNode };

function LegalShell({
  title,
  description,
  updated,
  intro,
  sections,
  path,
}: {
  title: string;
  description: string;
  updated: string;
  intro: string;
  sections: Section[];
  path: string;
}) {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <SEOHead title={title} description={description} path={path} />
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1">Last updated: {updated}</p>
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
        Questions about this page? Contact us at{" "}
        <a href="mailto:support@clutchmarks.study" className="text-primary underline">support@clutchmarks.study</a>{" "}
        or send a message through the{" "}
        <Link to="/feedback" className="text-primary underline">Feedback tab</Link>.
      </p>
    </div>
  );
}

const UPDATED = "24 September 2026";

const privacySections: Section[] = [
  {
    heading: "What we collect",
    body: (
      <>
        <p>When you use Clutch Marks, we collect only what we need to run the platform:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Your account details</strong> — your name, email address, and password (stored securely, never in plain text).</li>
          <li><strong>Your learning activity</strong> — which lessons you open, quiz and practice answers you give, scores, XP, and study streaks.</li>
          <li><strong>Parent links</strong> — if you add a parent's email, we store the link so they can see your progress.</li>
        </ul>
        <p>We do <strong>not</strong> ask for your home address or phone number, and we never sell your data to anyone.</p>
      </>
    ),
  },
  {
    heading: "What your parents can see",
    body: (
      <p>
        If a parent account is linked to yours, they can see your quiz scores, lesson progress, and
        weekly summary emails about your learning. They cannot see your password or sign in as you.
        You'll be told when a parent is linked to your account.
      </p>
    ),
  },
  {
    heading: "How we keep your information safe",
    body: (
      <p>
        Your data is stored with Supabase, a professional database service, using encryption and
        strict access rules. Only you can see your personal dashboard, and admins can only see what
        they need to run the site. Our study materials carry an invisible watermark with your
        account email, so leaked content can be traced back to the account that shared it — please
        keep your password to yourself.
      </p>
    ),
  },
  {
    heading: "How long we keep things",
    body: (
      <p>
        We keep your learning records while your account is open, so your progress and streaks are
        always there when you come back. Activity logs are archived and anonymised after 12 months.
        If you want your account deleted, ask your parent to contact us at{" "}
        <a href="mailto:support@clutchmarks.study" className="text-primary underline">support@clutchmarks.study</a>{" "}
        and we'll remove it.
      </p>
    ),
  },
  {
    heading: "Cookies and tracking",
    body: (
      <p>
        We use only the essential cookies needed to keep you signed in. We don't use advertising
        trackers, and we don't follow you around the internet.
      </p>
    ),
  },
  {
    heading: "Your choices",
    body: (
      <ul className="list-disc pl-5 space-y-1">
        <li>You can see everything we store about your activity in your own dashboard.</li>
        <li>You can change your password any time from the login page.</li>
        <li>Parents can request a copy of their child's data or account deletion by emailing <a href="mailto:support@clutchmarks.study" className="text-primary underline">support@clutchmarks.study</a>.</li>
      </ul>
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
      description="How Clutch Marks collects, uses and protects student and parent data — in plain language."
      path="/privacy"
      updated={UPDATED}
      intro="We collect the minimum we need: your name, email and learning activity. We never sell your data, we never show ads, and parents only see learning progress. Delete your account any time and your data goes with it."
      sections={privacySections}
    />
  );
}

export function TermsOfService() {
  return (
    <LegalShell
      title="Terms of Service"
      description="The rules for using Clutch Marks — fair use, content ownership, and account policies in plain language."
      path="/terms"
      updated={UPDATED}
      intro="Study honestly, keep your account to yourself, and don't share our materials outside the site — everything on Clutch Marks is watermarked and owned by us. Break the rules and we may suspend your account."
      sections={termsSections}
    />
  );
}
