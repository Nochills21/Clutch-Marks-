// Inline symbol keys — batch 7: the last four rows the formula audit flags with
// a real relation behind the finding (one Chemistry AS note, three Computer
// Science / Physics quick-revision summaries). The fifth, `Databases and Data
// Definition`, carries SQL inside prose — that is code, not a relation, and the
// audit's code test is widened for it rather than a key invented.
//
//   node .freebuff/apply-inline-keys.cjs .freebuff/content-keyed-4.cjs
module.exports = {
  edits: {
    /* Chemistry AS — bonding and structure: what the lines in a displayed
       formula count */
    "4e823748-461e-4fc0-bb53-b1228833b6ca": [
      {
        find: "<li>Multiple bonds: in carbon dioxide, O=C=O, each double bond is two shared pairs. In nitrogen, N≡N, there are three shared pairs.</li>",
        replace:
          "<li>Multiple bonds: in carbon dioxide, O=C=O, each double bond is two shared pairs. In nitrogen, N≡N, there are three shared pairs. <em>Key:</em> in a displayed formula every line drawn between two atoms is one shared pair, so O=C=O counts four pairs altogether and N≡N six; a single, double and triple bond therefore draw one, two and three lines, and the more lines between the same two atoms, the shorter and stronger the bond.</li>",
      },
    ],

    /* Computer Science OL — data representation: place values and 2ⁿ */
    "bfb3a5da-592c-4c27-b57d-df44885a19d9": [
      {
        find: "An 8-bit unsigned number can represent 0 to 255.",
        replace:
          "An 8-bit unsigned number can represent 0 to 255, because eight bits give 2⁸ = 256 patterns and the largest value is 2⁸ − 1. <em>Key:</em> each binary place is a power of two — 128, 64, 32, 16, 8, 4, 2, 1 reading left to right; one hexadecimal digit stands for exactly four bits, which is why 9D splits into 1001 and 1101 and means 9 × 16 + 13; \"unsigned\" means the range starts at 0 rather than at −128.",
      },
    ],

    /* Computer Science A2 — the declaration an enumerated type is written with */
    "eb0814a1-dfea-4224-af6d-931215635f9c": [
      {
        find: "An enumerated type lists named values in order: TYPE Months = (Jan, Feb, Mar ...). Internally each value is an integer index starting at 0.",
        replace:
          "An enumerated type lists named values in order: TYPE Months = (Jan, Feb, Mar ...). Internally each value is an integer index starting at 0. <em>Key:</em> TYPE is the keyword that declares a user-defined type; Months is the type's identifier; the bracketed list gives the values a variable of that type may hold, in order, so Jan is index 0 and Dec 11 — twelve values fit in a single byte, and the indexes being ordered is what lets &lt; and &gt; work on the names.",
      },
    ],

    /* Physics OL — measurement: converting a length, an area and a volume */
    "c989dc5d-9cbc-49c9-a0d7-34613b70534f": [
      {
        find: "<li>1 m = 100 cm, 1 litre = 1000 cm³ = 10⁻³ m³, and 1 cm³ = 10⁻⁶ m³.</li>",
        replace:
          "<li>1 m = 100 cm, 1 litre = 1000 cm³ = 10⁻³ m³, and 1 cm³ = 10⁻⁶ m³. <em>Key:</em> the length conversion is applied once for a length, squared for an area and cubed for a volume — 1 m = 10² cm, so 1 m³ = (10²)³ = 10⁶ cm³; a litre is defined as 1000 cm³, so 1 cm³ = 10⁻³ litre = 10⁻⁶ m³.</li>",
      },
    ],
  },
};
