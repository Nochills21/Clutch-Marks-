// Blog funnel: email-gated formula-sheet downloads. Entering an email (and
// optionally signing up) reveals the direct PDF links. The email is stored in
// localStorage so returning visitors skip the gate.
import { useEffect, useState } from "react";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, FileText, ShieldCheck } from "lucide-react";
import { captureAttribution, track } from "@/lib/analytics";

const GATE_KEY = "cm-download-email";

const SHEETS = [
  {
    title: "IGCSE Maths 0580 — Every Formula You Need",
    description:
      "Extended-level formula sheet for the 2025–2027 syllabus: index laws, quadratic formula, circle theorems with the exact reason wording, trigonometry, and the statistics rules students forget.",
    file: "/downloads/clutchmarks-igcse-maths-0580-formula-sheet.pdf",
    pages: 2,
  },
  {
    title: "IGCSE Physics 0625 — Equation & Data Sheet",
    description:
      "Every 0625 equation by topic with quantities and units: motion, energy, thermal, waves, electricity — plus the prefixes and unit conversions that cost marks.",
    file: "/downloads/clutchmarks-igcse-physics-0625-formula-sheet.pdf",
    pages: 2,
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
        title="Free IGCSE Formula Sheets — Maths 0580 & Physics 0625"
        description="Download the free Clutch Marks formula sheets for IGCSE Maths 0580 and Physics 0625 — every formula and equation on two printable pages, aligned to the 2025–2027 syllabus."
        path="/downloads"
      />
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Free IGCSE Formula Sheets 📄</h1>
        <p className="text-muted-foreground mt-2">
          Every formula on two printable pages — designed for the 2025–2027 Cambridge syllabus.
          Print them, stick them on your wall, and drill them into memory.
        </p>
      </div>

      {!unlocked ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Get the sheets (free)</CardTitle>
            <CardDescription>
              Enter your email to unlock instant downloads. We'll never spam you — and if you
              sign up later, your progress tracking and streak start right where this leaves off.
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
              <Download className="h-4 w-4" /> Unlock both sheets
            </Button>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5" /> No card, no spam, unsubscribe anytime.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {SHEETS.map((s) => (
            <Card key={s.file}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="h-5 w-5 text-primary" /> {s.title}
                </CardTitle>
                <CardDescription>{s.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <a href={s.file} download onClick={() => track("formula_sheet_download", { sheet: s.file })}>
                  <Button className="gap-2">
                    <Download className="h-4 w-4" /> Download PDF ({s.pages} pages)
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
          <Card>
            <CardContent className="pt-4 text-sm text-muted-foreground">
              Sheets are for personal study only (see our <a className="underline text-primary" href="/terms">terms</a>).
              Want the interactive version? Every formula here has a <a className="underline text-primary" href="/quizzes">matching quiz</a> on Clutch Marks — free.
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
