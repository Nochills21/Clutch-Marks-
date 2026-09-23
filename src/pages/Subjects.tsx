// Subject/level catalog browser.
import { SEOHead } from "@/components/SEOHead";
import { SubjectPicker } from "@/components/SubjectPicker";

export default function Subjects() {
  return (
    <div className="space-y-6">
      <SEOHead
        title="Choose your subject — Clutch Marks"
        description="Pick a subject and level to access lessons, revision material, exams and the AI question bank."
        path="/subjects"
      />
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Choose a subject</h1>
        <p className="text-muted-foreground">Select the subject and level you want to study right now.</p>
      </div>
      <SubjectPicker />
    </div>
  );
}
