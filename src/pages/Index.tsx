// Public landing page — the brand's front door. Ink canvas, gold used as a
// precision accent, display serif for the headline, hairline rules instead of
// glows, and content grounded in real counts from the platform.
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SEOHead } from "@/components/SEOHead";
import { SubjectPicker } from "@/components/SubjectPicker";
import { BrandLockup } from "@/components/BrandMark";
import { SITE } from "@/lib/site";
import {
  BookOpen, Brain, Archive, ArrowRight, Check,
  FileText, Target, TrendingUp,
} from "lucide-react";

/** Counts verified against the live database — keep honest or update together. */
const TRACKS = [
  { label: "Subjects", value: "3", detail: "Maths · Physics · Computer Science" },
  { label: "Levels", value: "IGCSE · AS · A2", detail: "IGCSE to A Level" },
  { label: "Past papers", value: "700+", detail: "Catalogued with mark schemes" },
  { label: "Exams covered", value: "0580 · 0625 · 0478 · 9618 · IAL", detail: "Cambridge & Edexcel" },
];

const TOOLS = [
  {
    index: "01",
    icon: FileText,
    title: "Revision notes",
    desc: "Syllabus-matched notes for every topic, written tight enough to revise a topic in minutes rather than hours.",
    accent: "text-primary",
    tile: "from-primary/15 to-primary/[0.04]",
  },
  {
    index: "02",
    icon: Brain,
    title: "Exam-style questions",
    desc: "Topic questions marked instantly, with worked answers and an explanation for every step you miss.",
    accent: "text-[hsl(var(--gold-soft))]",
    tile: "from-[hsl(var(--gold-soft)/0.15)] to-[hsl(var(--gold-soft)/0.03)]",
  },
  {
    index: "03",
    icon: Archive,
    title: "Past papers",
    desc: "Past papers and mark schemes from 2015 to 2025, sorted by session and component, ready for timed practice.",
    accent: "text-[hsl(var(--gold-deep))]",
    tile: "from-[hsl(var(--gold-deep)/0.2)] to-[hsl(var(--gold-deep)/0.04)]",
  },
];

const PILLARS = [
  { icon: FileText, text: "Revision notes for every topic and level" },
  { icon: Brain, text: "Instant marking with worked explanations" },
  { icon: Archive, text: "Past papers and mark schemes in one archive" },
  { icon: TrendingUp, text: "Progress tracking that targets weak topics" },
  { icon: Target, text: "A planner built around your exam dates" },
  { icon: BookOpen, text: "Flashcards that resurface what you forget" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Title, description and JSON-LD come from ROUTE_META["/"] — the same
          source the prerenderer writes into the static HTML. Duplicating them
          here is how the homepage ended up with one title for crawlers that run
          JavaScript and a different one for crawlers that don't. */}
      <SEOHead path="/" />

      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between gap-3 px-4">
          <Link to="/" className="min-w-0">
            <BrandLockup size={36} subtitle="Study platform" />
          </Link>
          <div className="flex items-center gap-1.5 shrink-0">
            <ThemeToggle />
            <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Link to="/auth">Log in</Link>
            </Button>
            <Button asChild size="sm" className="sheen gap-1.5">
              <Link to="/auth">
                Start revising <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* ---------- hero ---------- */}
        <section className="relative overflow-hidden bloom">
          <div className="container relative px-4 pt-20 pb-16 text-center lg:pt-28 lg:pb-24">
            <p className="eyebrow mb-6">
              IGCSE &middot; AS &middot; A Level — Cambridge &amp; Edexcel
            </p>

            <h1 className="display-xl mx-auto max-w-4xl text-[2.75rem] sm:text-6xl lg:text-[4.5rem]">
              Revise smarter. <span className="gradient-text">Score higher.</span>
            </h1>

            <p className="lede mx-auto mt-7 text-center">
              Concise revision notes, exam-style topic questions marked instantly, a full
              past-paper archive — and AI marking of your solved scripts against the official
              mark schemes — everything you need for Maths, Physics and Computer Science,
              in one place.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="sheen gap-2 h-12 px-7 text-[15px]">
                <Link to="/auth">
                  Start revising <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              {/* A real route, not an in-page anchor: notes, topic questions and
                  past papers are readable without an account, and the anchor only
                  led to the subject picker, which needs one. */}
              <Button asChild size="lg" variant="outline" className="h-12 px-6 text-[15px]">
                <Link to="/subjects">Browse subjects</Link>
              </Button>
            </div>

            <p className="mt-5 text-[13px] text-muted-foreground">
              No card required &middot; Start with a free preview of every level
            </p>

            <div className="mx-auto mt-14 max-w-4xl">
              <div className="surface-raised relative overflow-hidden p-4 sm:p-6">
                <div className="bloom pointer-events-none absolute inset-0" aria-hidden="true" />
                <div className="flex items-center justify-center gap-3 py-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold-soft/20 px-3 py-1.5 text-[11px] font-mono tracking-[0.12em] uppercase text-gold-soft">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    AI marking included
                  </span>
                </div>
                <img
                  src="/brand/cover.jpg"
                  width={1600}
                  height={893}
                  alt="Master your clutch moments — achieve your best marks with focused tools"
                  decoding="async"
                  className="relative w-full rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ---------- grounded numbers ---------- */}
        <section className="border-y border-border/60 bg-card/40">
          <div className="container grid grid-cols-2 gap-y-8 px-4 py-10 lg:grid-cols-4">
            {TRACKS.map((t, i) => (
              <div
                key={t.label}
                className={`px-2 lg:px-6 ${i > 0 ? "lg:border-l lg:border-border/60" : ""}`}
              >
                <p className="eyebrow">{t.label}</p>
                <p className="num mt-2 font-mono text-2xl font-semibold tracking-tight text-foreground">
                  {t.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{t.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- the three tools ---------- */}
        <section className="container px-4 py-20 lg:py-24">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-3">The toolkit</p>
            <h2 className="display-xl text-3xl lg:text-4xl">
              Three instruments, one way of working.
            </h2>
            <hr className="rule-gold mt-6 w-24" />
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {TOOLS.map((t) => (
              <div key={t.title} className="group surface flex flex-col p-7 transition-colors hover:border-primary/30">
                <div className="flex items-start justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-gradient-to-br ${t.tile}`}>
                    <t.icon className={`h-[22px] w-[22px] ${t.accent}`} />
                  </div>
                  <span className="num font-mono text-[11px] tracking-widest text-muted-foreground/50">
                    {t.index}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">{t.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- subject picker ---------- */}
        <section id="subjects" className="scroll-mt-20 border-t border-border/60 bg-card/30">
          <div className="container px-4 py-20 lg:py-24">
            <div className="mb-10 text-center">
              <p className="eyebrow mb-3">Where to begin</p>
              <h2 className="display-xl text-3xl lg:text-4xl">Choose your subject</h2>
              <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
                Pick a subject and level to open its notes, topic questions, past papers and
                practice sets.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <SubjectPicker />
              <Button asChild variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground">
                <Link to="/subjects">
                  Browse every subject and level <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ---------- what's inside ---------- */}
        <section className="container px-4 py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="eyebrow mb-3">Everything included</p>
              <h2 className="display-xl text-3xl lg:text-4xl">
                Built for the whole exam season.
              </h2>
              <hr className="rule-gold mt-6 w-24" />
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Every level gets the same treatment — notes, questions, papers and progress
                tracking — so nothing is a dead end when you switch from learning to revising.
              </p>
            </div>

            <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {PILLARS.map((p) => (
                <li key={p.text} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                    <Check className="h-3 w-3 text-primary" />
                  </span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{p.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- closing call to action ---------- */}
        <section className="container px-4 pb-24">
          <div className="surface-raised relative overflow-hidden px-8 py-14 text-center lg:px-16">
            <div className="bloom pointer-events-none absolute inset-0" />
            <div className="relative">
              <h2 className="display-xl mx-auto max-w-2xl text-3xl lg:text-4xl">
                Your next exam has a date. Start today.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">
                Create an account and pick your subjects — you'll be revising within a minute.
              </p>
              <div className="mt-8 flex justify-center">
                <Button asChild size="lg" className="sheen gap-2 h-12 px-7 text-[15px]">
                  <Link to="/auth">
                    Create your account <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60">
        <div className="container flex flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row">
          <BrandLockup size={32} />
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-muted-foreground">
            <Link to="/pricing" className="transition-colors hover:text-foreground">Pricing</Link>
            <Link to="/downloads" className="transition-colors hover:text-foreground">Downloads</Link>
            <Link to="/privacy" className="transition-colors hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="transition-colors hover:text-foreground">Terms</Link>
            <a href={`mailto:${SITE.supportEmail}`} className="transition-colors hover:text-foreground">
              Support
            </a>
          </div>
        </div>
        <div className="container px-4 pb-12">
          <div className="mx-auto max-w-2xl">
            <p className="mb-6 text-center text-sm leading-relaxed text-muted-foreground sm:text-left">
              Hey — I&apos;m Zaid Saadeh, from Al Rowad International Schools. I&apos;m 16, and I&apos;ve been
              building Clutch Marks for a really long time, so I&apos;d genuinely appreciate your
              support. Thank you &lt;3.
            </p>
            <p className="text-center text-sm text-muted-foreground sm:text-left">
              <span className="font-medium text-foreground">Contact</span>
              <span className="mx-2 text-muted-foreground/60">·</span>
              <a
                href="https://wa.me/966547388010?text=Hi,%20I%20reached%20you%20from%20Clutch%20Marks"
                className="font-medium text-foreground underline-offset-4 hover:text-primary"
              >
                WhatsApp: +966 54 738 8010
              </a>
              <span className="mx-2 text-muted-foreground/60">·</span>
              <a
                href="mailto:Clutchmarks.support@gmail.com?subject=Clutch%20Marks%20feedback"
                className="font-medium text-foreground underline-offset-4 hover:text-primary"
              >
                Email: Clutchmarks.support@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="container px-4 pb-8">
          <p className="text-center text-xs text-muted-foreground/70 sm:text-left">
            &copy; {new Date().getFullYear()} {SITE.name}. Past paper links point to the official
            exam board sites.
          </p>
        </div>
      </footer>
    </div>
  );
}
