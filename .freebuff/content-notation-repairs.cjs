// Repairs for bodies damaged by the first two versions of the `10` rule in
// .freebuff/normalise-note-notation.cjs, plus the fractional exponents whose
// caret the superscript rule ate.
//
// Every `from` is an exact substring of the live row, and
// .freebuff/apply-note-text-fixes.cjs refuses to write if any of them is absent,
// so this cannot silently edit something else. The numbers are recoverable from
// context: 2.0 × 900 × 60 is 108 000 J, and 90 − T = T − 10 gives 100 = 2T.
//
// Apply with:
//   node .freebuff/apply-note-text-fixes.cjs .freebuff/content-notation-repairs.cjs
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-fixes.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-fixes.sql --apply    (live)

module.exports = {
  fixes: {
    // A Level Physics: Thermal Physics — `108` and `100` read as 10⁸ and 10⁰.
    "9aeb73c7-e1de-4bae-bb5e-eb23ae83e3b3": [
      ["= 10⁸ 000 J = 10⁸ kJ", "= 108 000 J = 108 kJ"],
      ["= 10⁸ 000/500 = 216 s", "= 108 000/500 = 216 s"],
      ["10 → 10⁰ = 2T", "10 → 100 = 2T"],
    ],

    // AS Level Physics: D.C. Circuits — the divider was asked for 3.0/12 of 1000 Ω.
    "b019737f-148f-4517-90eb-36528c45eb85": [["= R2/10⁰⁰", "= R2/1000"]],

    // AS Level Mathematics: Exponentials and Logarithms — fractional exponents
    // and a base that is not ten.
    "7b88a182-63f2-490e-9fe3-af5bde499827": [
      ["10².4 = 251", "10^2.4 = 251"],
      ["y = 10¹.4 × 10^(0.3x) = 25.1", "y = 10^1.4 × 10^(0.3x) = 25.1"],
      ["b = e⁰.25", "b = e^0.25"],
    ],

    // A Level Mathematics: Exponentials and Logarithms.
    "b9b130df-e3f7-41f1-9347-ac8773a9fe71": [["y = e¹.2", "y = e^1.2"]],

    // A Level Mathematics: Numerical Methods — the convergence check.
    "623cecd2-630e-456c-ac75-c567c01d46c3": [
      ["checking: e⁰.3 = 1.35 against 1.2; e².2 = 9.03 against 8.8", "checking: e^0.3 = 1.35 against 1.2; e^2.2 = 9.03 against 8.8"],
    ],
  },
};
