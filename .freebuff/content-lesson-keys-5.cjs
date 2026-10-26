// Lesson inline symbol keys — batch 5: the nine lessons the earlier passes left
// unkeyed because they were mistaken for code. The other fourteen rows the
// audit still flags are SQL/pseudocode/table-attribute lines, which are not
// relations and must not be keyed.
//
//   node .freebuff/apply-inline-keys.cjs .freebuff/content-lesson-keys-5.cjs
module.exports = {
  edits: {
    /* Chemistry A2 — carbonyls: what RCHO and RCOR actually say */
    "7ab80d70-3251-410c-98f2-af866ef47ad8": [
      {
        find: "<li>An aldehyde has the C=O group at the end of a chain (RCHO). A ketone has it inside the chain (RCOR).</li>",
        replace:
          "<li>An aldehyde has the C=O group at the end of a chain (RCHO). A ketone has it inside the chain (RCOR). <em>Key:</em> R = an alkyl group (CH₃, C₂H₅ …); C=O = the carbonyl group; CHO = the aldehyde end group, whose hydrogen is written out because it is the one the nucleophile is judged against; COR = a carbonyl carbon carrying two carbon groups — which is why a ketone cannot be oxidised further.</li>",
      },
    ],

    /* Maths OL — algebraic fractions and the values they are valid for */
    "46bc6dac-9bfb-446c-ba12-dd69bf84657c": [
      {
        find: "<p>Factorise top and bottom fully, then cancel: (x² − 9)/(x + 3) = (x − 3). To add, use a common denominator: 1/(x+1) + 2/(x−1) = (3x + 1)/((x+1)(x−1)).</p>",
        replace:
          "<p>Factorise top and bottom fully, then cancel: (x² − 9)/(x + 3) = (x − 3). To add, use a common denominator: 1/(x+1) + 2/(x−1) = (3x + 1)/((x+1)(x−1)). <em>Key:</em> x = the variable, a real number in the same unit as the expression; the cancelled form is equal to the original only where the cancelled factor is not zero, so x ≠ −3 there, and the sum is defined only for x ≠ −1 and x ≠ 1 — state that with the answer.</p>",
      },
    ],

    /* Computer Science — the Boolean expression the alarm question asks for */
    "22a2609f-bf40-4e4c-ab9c-db7df65a0545": [
      {
        find: "<p>Define inputs/outputs first. Alarm rings (X=1) if sensor P triggered AND (door D OR window W): X = P AND (D OR W). Then draw the circuit: OR first, then AND.</p>",
        replace:
          "<p>Define inputs/outputs first. Alarm rings (X=1) if sensor P triggered AND (door D OR window W): X = P AND (D OR W). Then draw the circuit: OR first, then AND. <em>Key:</em> X = the output, 1 when the alarm rings and 0 when it is silent; P, D, W = the three inputs, each 1 when its sensor is triggered and 0 otherwise; AND gives 1 only when both its inputs are 1, OR gives 1 when either is — the brackets are the circuit order, not decoration.</p>",
      },
    ],

    /* Maths OL — sets: inclusion–exclusion */
    "ea200f42-2b84-4f07-b7bf-a1682d037ac7": [
      {
        find: "<p>With region variables x, y, z: use the totals to form equations, e.g. n(A ∪ B) = n(A) + n(B) − n(A ∩ B).</p>",
        replace:
          "<p>With region variables x, y, z: use the totals to form equations, e.g. n(A ∪ B) = n(A) + n(B) − n(A ∩ B). <em>Key:</em> n(S) = the number of elements in set S (a count, so no unit); A and B = the two sets; ∪ = union, everything in either set; ∩ = intersection, everything in both; x, y, z = the counts in the three regions of the diagram. The intersection is subtracted because adding n(A) and n(B) counts it twice.</p>",
      },
    ],

    /* Maths OL — bearings: the ± 180° needs a direction rule */
    "ca23b9cf-c05f-4902-9dea-1431db264e95": [
      {
        find: "<li>Back bearing = front bearing ± 180°.</li>",
        replace:
          "<li>Back bearing = front bearing ± 180°. <em>Key:</em> a bearing is measured clockwise from north and written in three figures (000°–360°); add 180° when the front bearing is under 180°, subtract 180° when it is over — the sign is chosen so the answer stays inside 000°–360° — it is one rule, not two answers.</li>",
      },
    ],

    /* Chemistry AS — what the period and group numbers are counting */
    "6f0d8973-11d7-4363-bd74-cc6f427bd4d6": [
      {
        find: "<li>Period number = highest principal quantum number in use; group number relates to the number of outer electrons.</li>",
        replace:
          "<li>Period number = highest principal quantum number in use; group number relates to the number of outer electrons. <em>Key:</em> n = the principal quantum number, 1, 2, 3 … labelling the electron shell and its energy; the period is the highest n occupied in the ground state; the group is the outer-electron count for groups 1–2 and that count plus 10 for groups 13–18.</li>",
      },
    ],

    /* Chemistry A2 — infrared: the wavenumber scale itself */
    "cb2fe0f1-c450-49c4-9da7-7695a5806a8e": [
      {
        find: "<li>Bonds absorb infrared radiation at characteristic wavenumbers. A broad absorption near 3200–3550 cm⁻¹ indicates an O–H group in an alcohol. A strong absorption near 1700 cm⁻¹ indicates a C=O group.</li>",
        replace:
          "<li>Bonds absorb infrared radiation at characteristic wavenumbers. A broad absorption near 3200–3550 cm⁻¹ indicates an O–H group in an alcohol. A strong absorption near 1700 cm⁻¹ indicates a C=O group. <em>Key:</em> wavenumber (cm⁻¹) = 1/λ with λ measured in cm, so it counts how many wavelengths fit in one centimetre — a larger wavenumber means a shorter wavelength and a higher-energy vibration. The O–H band is broad because hydrogen bonding varies its energy; C=O is sharp and strong.</li>",
      },
    ],

    /* Computer Science — indexed addressing */
    "2c07ddbc-86b2-4abe-bcb5-07320517d448": [
      {
        find: "<li><strong>Indexed</strong>: effective address = base + index register; ideal for arrays.</li>",
        replace:
          "<li><strong>Indexed</strong>: effective address = base + index register; ideal for arrays. <em>Key:</em> effective address = the address the operand is actually fetched from (a memory address, not a value); the base register holds the start address of the block, usually the array's first element; the index register holds the offset of the wanted element — change only the index and the same instruction walks the array.</li>",
      },
    ],

    /* Maths OL — the line of best fit and its two coefficients */
    "07ae256d-f9ba-47c4-a70d-a65469f635de": [
      {
        find: "<p><strong>Example:</strong> line through (10, 24) and (50, 60): m = 36/40 = 0.9 → y = 0.9x + 15.</p>",
        replace:
          "<p><strong>Example:</strong> line through (10, 24) and (50, 60): m = 36/40 = 0.9 → y = 0.9x + 15. <em>Key:</em> x = the value on the horizontal axis (the variable you control); y = the value on the vertical axis; m = the gradient, the change in y per unit change in x, so it carries y's unit divided by x's; 15 = the intercept, the y value where the line crosses x = 0 — read it off the graph only if x = 0 is inside the data's range.</p>",
      },
    ],
  },
};
