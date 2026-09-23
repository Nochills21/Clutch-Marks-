// Public landing page.
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { HeroIllustration } from "@/components/HeroIllustration";
import { SEOHead } from "@/components/SEOHead";
import { SubjectPicker } from "@/components/SubjectPicker";
import { GraduationCap, BookOpen, Brain, BarChart3, FileText, Archive, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-background geo-pattern">
      <SEOHead
        title="Clutch Marks — Free Revision Notes, Topic Questions & Past Papers"
        description="Revision notes, exam-style topic questions with instant marking, and past papers with mark schemes for Maths, Physics and Computer Science at OL, AS and A2."
        path="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Clutch Marks",
            url: "https://clutch-marks.lovable.app/",
            description:
              "Study Maths, Physics and Computer Science at OL, AS and A2 with interactive lessons, practice quizzes and revision tools.",
          },
          {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: "Clutch Marks",
            url: "https://clutch-marks.lovable.app/",
          },
        ]}
      />

      <header className="border-b border-border/30 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between gap-2 px-3 sm:px-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[hsl(var(--neon-purple))] text-primary-foreground shadow-md glow-shadow">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-base sm:text-lg font-bold tracking-tight neon-text whitespace-nowrap">Clutch Marks</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <ThemeToggle />
            <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground sm:h-10 sm:px-4">
              <Link to="/auth">Log In</Link>
            </Button>
            <Button asChild size="sm" className="bg-gradient-to-r from-primary to-[hsl(var(--neon-purple))] hover:opacity-90 transition-opacity shadow-md glow-shadow text-primary-foreground sm:h-10 sm:px-4">
              <Link to="/auth">Get Started</Link>
            </Button>

          </div>
        </div>
      </header>

      <main>
        <section className="container py-28 lg:py-40 text-center relative">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/[0.06] blur-[120px]" />
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[hsl(var(--neon-purple))]/[0.04] blur-[100px]" />
            <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-[hsl(var(--neon-cyan))]/[0.03] blur-[80px]" />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full neon-border px-4 py-1.5 text-sm text-muted-foreground mb-8">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Revision notes · Topic questions · Past papers — IGCSE, AS & A Level
          </div>

          <h1 className="text-5xl font-bold sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05]">
            Revise Smarter.{" "}
            <span className="gradient-text">Score Higher.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg lg:text-xl text-muted-foreground leading-relaxed">
            Concise revision notes, exam-style topic questions with instant marking, and a full past-paper archive — everything you need to ace your exam.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button asChild size="lg" className="gap-2 bg-gradient-to-r from-primary to-[hsl(var(--neon-purple))] hover:opacity-90 transition-opacity shadow-lg glow-shadow text-base px-8 h-12 text-primary-foreground">
              <Link to="/auth">
                Start Revising <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-16 mx-auto max-w-3xl">
            <HeroIllustration priority className="w-full h-auto rounded-2xl shadow-2xl" />
          </div>
        </section>

        <section id="subjects" className="container pb-28 scroll-mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold sm:text-4xl">Choose your subject</h2>
            <p className="mt-3 text-muted-foreground">Pick a subject and level to get lessons, revision material, exams and an AI question bank.</p>
          </div>
          <SubjectPicker />
        </section>

        <section className="container pb-28">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: FileText, title: "Revision Notes", desc: "Concise, syllabus-matched notes for every topic — written so you can revise a whole topic in minutes, not hours.", color: "text-primary", borderColor: "border-primary/20", glow: "shadow-[0_0_20px_hsl(var(--neon-blue)/0.1)]" },
              { icon: Brain, title: "Topic Questions", desc: "Exam-style questions on every topic with instant marking, worked answers, and explanations for every step.", color: "text-[hsl(var(--neon-purple))]", borderColor: "border-[hsl(var(--neon-purple)/0.2)]", glow: "shadow-[0_0_20px_hsl(var(--neon-purple)/0.1)]" },
              { icon: Archive, title: "Past Papers & Mark Schemes", desc: "A full archive of past papers with mark schemes — practise under real exam conditions and check your answers.", color: "text-[hsl(var(--neon-cyan))]", borderColor: "border-[hsl(var(--neon-cyan)/0.2)]", glow: "shadow-[0_0_20px_hsl(var(--neon-cyan)/0.1)]" },
            ].map((f) => (
              <div key={f.title} className={`group glass-card p-7 hover:-translate-y-1 ${f.borderColor} ${f.glow}`}>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-card border ${f.borderColor} ${f.color} mb-5 transition-transform duration-300 group-hover:scale-110`}>
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container pb-28">
          <div className="rounded-2xl neon-border bg-card p-8 lg:p-12 text-center">
            <h2 className="text-2xl font-bold mb-8">Everything you need to succeed</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-left">
              {["Revision notes for every topic", "Exam-style questions with instant marking", "Past papers with mark schemes", "Progress tracking that targets weak topics"].map((item) => (
                <div key={item} className="flex items-start gap-3 p-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/30 py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Clutch Marks
        </div>
      </footer>
    </div>
  );
}
