// Repair, not polish: the existing excretion note worked an example that
// multiplied a "12 dm³ processed" volume its own passage never justified (it
// said 1.5 dm³ per hour over four hours, which is 6 dm³), and labelled a
// concentration (0.05 g dm⁻³) as a mass in grams. The replacement keeps the
// same data and states the one calculation the data supports.
//
//   node .freebuff/apply-note-text-fixes.cjs .freebuff/content-bio-ol-deep-c-fix.cjs
module.exports = {
  fixes: {
    "d4b4bf03-7fd4-4d21-9c65-0a7f3841e11b": [
      [
        "Mass of urea removed per dm³ = 0.06 − 0.01 = 0.05 g; over a 4-hour session treating 12 dm³ of blood-pass volume, up to about 0.6 g is cleared per 12 dm³ processed (use the actual volumes in any question, and show mass = concentration × volume in every calculation.",
        "The concentration falls by 0.06 − 0.01 = 0.05 g/dm³, so the mass removed from 5 dm³ of blood is 0.05 × 5 = 0.25 g. Write the units at every step, because g dm⁻³ × dm³ is the multiplication that turns a concentration into a mass.",
      ],
      [
        "volume = volume of blood processed by the machine (dm³)",
        "volume = volume of blood in which that fall occurred (dm³)",
      ],
    ],
  },
};
