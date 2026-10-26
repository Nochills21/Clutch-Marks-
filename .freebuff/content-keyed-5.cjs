// The Alkenes quick-revision summary writes its general formula with subscripts
// but no reaction, so it both looks equation-free to the audit and gives a
// student revising nothing to reproduce. The addition equation goes in above
// the key-points list.
//
//   node .freebuff/apply-inline-keys.cjs .freebuff/content-keyed-5.cjs
module.exports = {
  edits: {
    "6c729b5d-b173-4132-8b53-5a6445138c00": [
      {
        find: "<h3>Key points to remember</h3>",
        replace:
          "<p>C<sub>n</sub>H<sub>2n</sub> is the general formula; the characteristic reaction is addition: C₂H₄ + HBr → C₂H₅Br. <em>Key:</em> n = the number of carbon atoms in the chain, so ethene (n = 2) is C₂H₄ and propene (n = 3) is C₃H₆; C₂H₄ = ethene; HBr = hydrogen bromide; C₂H₅Br = bromoethane, which is the only product because both atoms of HBr add across the C=C as the π bond breaks — nothing is eliminated, which is what separates addition from substitution.</p>\n<h3>Key points to remember</h3>",
      },
    ],
  },
};
