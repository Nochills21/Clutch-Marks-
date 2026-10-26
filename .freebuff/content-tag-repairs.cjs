// Three notes whose markup does not balance, found by a per-tag sweep of every
// material and lesson. None of these render as an error — the browser silently
// reshapes the document — which is why they survived every other check.
//
//   9c77bccd  Probability Distributions  one extra </em> closes nothing
//   15f953e6  Astronomy and Cosmology    a doubled </pre>
//   33a0fa2e  Organic Nitrogen Compounds four <li> left open, and a nested
//                                        <ol><li><li> block in the exam-style
//                                        questions
//
//   node .freebuff/apply-note-text-fixes.cjs .freebuff/content-tag-repairs.cjs
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-fixes.sql --apply

module.exports = {
  fixes: {
    "9c77bccd-7dc1-4b5a-8498-f45f5af99624": [
      [
        "E(X − 3) = −1, a loss of 1 per game.</em>",
        "E(X − 3) = −1, a loss of 1 per game.",
      ],
    ],

    "15f953e6-3831-4cd9-a4ff-98a991c5d346": [
      ["</code></pre></pre>", "</code></pre>"],
    ],

    "33a0fa2e-e229-4df3-abf8-d266c0f90886": [
      ["Give that delocalisation as the reason, not just the fact.", "Give that delocalisation as the reason, not just the fact.</li>"],
      ["The –N=N– group links the two aromatic rings.", "The –N=N– group links the two aromatic rings.</li>"],
      ["one to react and one to neutralise the HCl formed.", "one to react and one to neutralise the HCl formed.</li>"],
      ["when asked about the form of the amino acid in solution.", "when asked about the form of the amino acid in solution.</li>"],
      ["<ol><li><li>", "<ol><li>"],
      ["<li><li><li>", "<li>"],
      ["</li></li>", "</li>"],
    ],
  },
};
