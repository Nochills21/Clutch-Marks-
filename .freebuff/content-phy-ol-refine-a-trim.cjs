#!/usr/bin/env node
/**
 * Physics IGCSE — Forces and Motion: tighten the new section.
 *
 * The refinement above took this note to 26,312 characters of reading markup
 * against the gate's 26,000 ceiling for a four-statement topic. The ceiling is
 * a density band, not a character target, and the three sentences removed here
 * are the ones that repeated a point already made a paragraph earlier — so the
 * section keeps every distinction it teaches and the page stops being 300
 * characters past the band.
 *
 * Apply with:
 *   node .freebuff/apply-note-text-fixes.cjs .freebuff/content-phy-ol-refine-a-trim.cjs
 *   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-fixes.sql --apply
 */
module.exports = {
  fixes: {
    "e08e10e6-d123-407a-877f-dcc7c82c3d5b": [
      [
        "<p>A velocity–time graph is not a picture of the journey. It is a table of two quantities, drawn so that the arithmetic can be done with a ruler. That is the whole idea, and it is why the graph rewards a student who knows what to look for and punishes one who reads it like a map.</p>",
        "<p>A velocity–time graph is not a picture of the journey: it is a table of two quantities, drawn so the arithmetic can be done with a ruler.</p>",
      ],
      [
        "<p>Notice what that number is <em>not</em>. The car spent most of the journey at 24 m s⁻¹, yet its average is 16.8 m s⁻¹, because the first four seconds and the last two were slower. A student who averages 6, 0 and −12 (or 24 and 0) gets a number with no meaning at all.</p>",
        "<p>Notice what that number is <em>not</em>. The car spent most of the journey at 24 m s⁻¹, yet its average is 16.8 m s⁻¹, because the first four seconds and the last two were slower.</p>",
      ],
      [
        "<p>Read the graph above in the order the journey happened, and at every segment ask two questions: <em>what is the gradient</em> and <em>what is the area underneath</em>. The answers are always the same two quantities, just measured over different intervals.</p>",
        "<p>Read the graph above in the order the journey happened, and at every segment ask two questions: <em>what is the gradient</em> and <em>what is the area underneath</em>.</p>",
      ],
    ],
  },
};
