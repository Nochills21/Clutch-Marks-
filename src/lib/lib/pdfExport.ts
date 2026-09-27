// Client-side lesson export to PDF for offline study.
import { jsPDF } from "jspdf";

const PAGE_MARGIN = 15;

function addWrapped(doc: jsPDF, text: string, x: number, y: number, maxWidth: number, lineHeight = 6): number {
  const lines = doc.splitTextToSize(text, maxWidth);
  for (const line of lines) {
    if (y > doc.internal.pageSize.getHeight() - PAGE_MARGIN) {
      doc.addPage();
      y = PAGE_MARGIN;
    }
    doc.text(line, x, y);
    y += lineHeight;
  }
  return y;
}

export function exportLessonToPdf(lesson: { title: string; content?: string | null; video_url?: string | null }) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxWidth = pageWidth - PAGE_MARGIN * 2;
  let y = PAGE_MARGIN + 5;

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  y = addWrapped(doc, lesson.title, PAGE_MARGIN, y, maxWidth, 8) + 4;

  doc.setDrawColor(180);
  doc.line(PAGE_MARGIN, y, pageWidth - PAGE_MARGIN, y);
  y += 6;

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  const plain = (lesson.content ?? "No content available.").replace(/<[^>]+>/g, "");
  y = addWrapped(doc, plain, PAGE_MARGIN, y, maxWidth, 6);

  if (lesson.video_url) {
    y += 6;
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100);
    y = addWrapped(doc, `Video: ${lesson.video_url}`, PAGE_MARGIN, y, maxWidth, 5);
  }

  doc.save(`${lesson.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.pdf`);
}

export function exportFlashcardsToPdf(setTitle: string, cards: { front: string; back: string }[]) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxWidth = pageWidth - PAGE_MARGIN * 2;
  let y = PAGE_MARGIN + 5;

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  y = addWrapped(doc, setTitle, PAGE_MARGIN, y, maxWidth, 8) + 2;

  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(120);
  y = addWrapped(doc, `${cards.length} cards`, PAGE_MARGIN, y, maxWidth, 5) + 4;
  doc.setTextColor(0);

  cards.forEach((c, i) => {
    if (y > doc.internal.pageSize.getHeight() - 30) { doc.addPage(); y = PAGE_MARGIN; }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    y = addWrapped(doc, `${i + 1}. Q: ${c.front}`, PAGE_MARGIN, y, maxWidth, 6) + 1;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(60);
    y = addWrapped(doc, `   A: ${c.back}`, PAGE_MARGIN, y, maxWidth, 5) + 4;
    doc.setTextColor(0);
  });

  doc.save(`${setTitle.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-flashcards.pdf`);
}
