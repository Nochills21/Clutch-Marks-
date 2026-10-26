// Lesson inline symbol keys — batch 6: the Alkenes lesson, whose only relation
// is a bond description written with the σ and π symbols and a bond angle.
//
//   node .freebuff/apply-inline-keys.cjs .freebuff/content-lesson-keys-6.cjs
module.exports = {
  edits: {
    "17b43860-5749-4401-940a-13bea9afe0fa": [
      {
        find: "<li>A C=C double bond consists of one σ bond and one π bond.",
        replace:
          "<li>A C=C double bond consists of one σ bond and one π bond. <em>Key:</em> C=C = the carbon–carbon double bond; σ (sigma) = the bond from the end-on overlap of orbitals, along the line joining the nuclei; π (pi) = the weaker sideways overlap of p orbitals, whose electron cloud lies above and below the C–C axis.",
      },
      {
        find: "<li>The carbons of a C=C bond are planar, with bond angles of about 120°.</li>",
        replace:
          "<li>The carbons of a C=C bond are planar, with bond angles of about 120°. <em>Key:</em> 120° is the H–C=C bond angle expected from three electron regions around each double-bonded carbon (trigonal planar, 360° ÷ 3) — a measured angle far from 120° means the carbons are not both sp².</li>",
      },
    ],
  },
};
