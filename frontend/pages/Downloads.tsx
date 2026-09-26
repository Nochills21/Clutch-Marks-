// Blog funnel: email-gated formula-sheet/reference downloads for every
// subject-level. Entering an email reveals the direct PDF links; the email is
// stored in localStorage so returning visitors skip the gate.
import { useEffect, useState } from "react";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, ShieldCheck } from "lucide-react";
import { captureAttribution, track } from "@/lib/analytics";

const GATE_KEY = "cm-download-email";

type Sheet = { title: string; description: string; file: string; pages: number };
type Group = { level: string; board: string; sheets: Sheet[] };

const GROUPS: Group[] = [
  {
    level: "O Level (IGCSE)",
    board: "Cambridge",
    sheets: [
      {
        title: "Maths 0580 — Every Formula You Need",
        description:
          "Extended formula sheet for 2025–2027: index laws, quadratic formula, circle theorems with the exact reason wording, trigonometry, statistics rules.",
        file: "/downloads/clutchmarks-igcse-maths-0580-formula-sheet.pdf",
        pages: 2,
      },
      {
        title: "Physics 0625 — Equation & Data Sheet",
        description:
          "Every 0625 equation by topic with quantities and units: motion, energy, thermal, waves, electricity — plus prefixes and unit conversions.",
        file: "/downloads/clutchmarks-igcse-physics-0625-formula-sheet.pdf",
        pages: 2,
      },
      {
        title: "Computer Science 0478 — Key Facts & Reference",
        description:
          "The non-formula equivalents: number systems, two's complement, logic gates, pseudocode constructs, file-size calculations, security threats.",
        file: "/downloads/clutchmarks-igcse-computer-science-0478-reference.pdf",
        pages: 1,
      },
    ],
  },
  {
    level: "AS Level",
    board: "Edexcel (Maths & Physics) · Cambridge (CS)",
    sheets: [
      {
        title: "Mathematics (Edexcel IAL) — Formula Sheet",
        description:
          "P1 & P2 plus S1/M1: quadratics, coordinate geometry, differentiation, binomial, trig identities, normal distribution, suvat, moments.",
        file: "/downloads/clutchmarks-as-maths-edexcel-formula-sheet.pdf",
        pages: 2,
      },
      {
        title: "Physics (Edexcel IAL) — Formula Sheet",
        description:
          "Units 1–2: mechanics and materials (Stokes' law, Young modulus), waves and electricity (photoelectric equation, resistivity, EMF, potential dividers).",
        file: "/downloads/clutchmarks-as-physics-edexcel-formula-sheet.pdf",
        pages: 1,
      },
      {
        title: "Computer Science (9618) — Key Facts & Reference",
        description:
          "Paper 1 & 2 recall: representations, floating point, networking hardware and protocols, logic, assembly addressing modes, exam pseudocode.",
        file: "/downloads/clutchmarks-as-computer-science-9618-reference.pdf",
        pages: 2,
      },
    ],
  },
  {
    level: "A2 Level",
    board: "Edexcel (Maths & Physics) · Cambridge (CS)",
    sheets: [
      {
        title: "Mathematics (Edexcel IAL) — Formula Sheet",
        description:
          "P3 & P4: double angles and R-addition, implicit and parametric differentiation, integration by parts, vectors, projectiles, normal approximation.",
        file: "/downloads/clutchmarks-a2-maths-edexcel-formula-sheet.pdf",
        pages: 1,
      },
      {
        title: "Physics (Edexcel IAL) — Formula Sheet",
        description:
          "Units 4–5: circular motion, capacitors, fields, thermal physics, radioactive decay, SHM, astrophysics — with the key constants.",
        file: "/downloads/clutchmarks-a2-physics-edexcel-formula-sheet.pdf",
        pages: 1,
      },
      {
        title: "Computer Science (9618) — Key Facts & Reference",
        description:
          "Paper 3 & 4: data structures (trees, hash tables, graphs), sorting/searching Big-O, OOP, CISC/RISC, SQL and normalisation, simulation design.",
        file: "/downloads/clutchmarks-a2-computer-science-9618-reference.pdf",
        pages: 2,
      },
    ],
  },
];

export default function Downloads() {
  const [email, setEmail] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    captureAttribution();
    setUnlocked(!!localStorage.getItem(GATE_KEY));
  }, []);

  const unlock = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    localStorage.setItem(GATE_KEY, email.toLowerCase());
    setUnlocked(true);
    track("formula_sheet_unlock", { page: window.location.pathname });
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-6">
      <SEOHead
        title="Formula Sheets — IGCSE, AS & A2 Maths, Physics, CS"
        description="Download formula sheets and reference sheets for every subject and level: Cambridge IGCSE 0580/0625/0478, Edexcel IAL AS/A2 Maths and Physics, Cambridge 9618 Computer Science."
        path="/downloads"
      />
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Formula Sheets 📄</h1>
        <p className="text-muted-foreground mt-2">
          Every formula, equation and must-recall fact on printable pages — matched to
          the right exam board: <strong>Cambridge</strong> for O Level and Computer
          Science, <strong>Edexcel</strong> for AS/A2 Maths and Physics.
        </p>
      </div>

      {!unlocked ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Get all 9 sheets</CardTitle>
            <CardDescription>
              Enter your email to unlock every download. We'll never spam you — and if
              you sign up later, your progress tracking and streak start right where
              this leaves off.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="dl-email">Email</Label>
              <Input
                id="dl-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && unlock()}
              />
            </div>
            <Button className="w-full gap-2" onClick={unlock}>
              <Download className="h-4 w-4" /> Unlock all sheets
            </Button>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5" /> No card, no spam, unsubscribe anytime.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {GROUPS.map((g) => (
            <div key={g.level} className="space-y-3">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">{g.level}</h2>
                <Badge variant="secondary" className="text-xs">{g.board}</Badge>
              </div>
              {g.sheets.map((s) => (
                <Card key={s.file}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <FileText className="h-5 w-5 shrink-0 text-primary" /> {s.title}
                    </CardTitle>
                    <CardDescription>{s.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <a
                      href={s.file}
                      download
                      onClick={() => track("formula_sheet_download", { sheet: s.file })}
                    >
                      <Button size="sm" className="gap-2">
                        <Download className="h-4 w-4" /> Download PDF ({s.pages} page{s.pages === 1 ? "" : "s"})
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          ))}
          <Card>
            <CardContent className="pt-4 text-sm text-muted-foreground">
              Sheets are for personal study only (see our <a className="underline text-primary" href="/terms">terms</a>).
              Want the interactive version? Every formula here has a <a className="underline text-primary" href="/quizzes">matching quiz</a> on Clutch Marks.
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
