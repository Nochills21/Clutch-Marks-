// The last eleven rows the formula audit flags, each for a real reason:
//
//   * four rows write their equations with → (a reaction is an equation) and
//     carried no key for the notation they use;
//   * seven rows promise an equation in their own prose and never write it, so
//     the equation is added where the promise is made.
//
//   node .freebuff/apply-inline-keys.cjs .freebuff/content-lesson-keys-7.cjs
module.exports = {
  edits: {
    /* Chemistry A2 — the precipitation and catalysis equations of the section */
    "993c19a2-5f9f-4b8d-afaa-cd061d9c7338": [
      {
        find: "and Zn2+(aq).</p>",
        replace:
          "and Zn2+(aq). <em>Key:</em> in the equations below the metal ion and the hydroxide are aqueous (aq) and the precipitate is solid (s); Cr(OH)3(H2O)3 is the hydroxide carrying three water molecules of crystallisation inside its formula, so the brackets are not decoration; a complex ion's overall charge is written outside its square brackets, as in [Cu(NH3)4(H2O)2]2+; and both atoms and charge must balance — Cr3+ + 3OH− → Cr(OH)3 puts +3 against −3 on the left and a neutral product on the right.</p>",
      },
    ],

    /* Physics OL — the A/Z notation every decay equation is written in */
    "1fa2a57d-eab6-4997-809b-27e861d23b0f": [
      {
        find: "<p>Balance A and Z on both sides — that is the check.</p>",
        replace:
          "<p>Balance A and Z on both sides — that is the check. <em>Key:</em> in ²³⁸₉₂U the top number is the mass number A (protons + neutrons) and the bottom number is the atomic number Z (protons); an α particle is a helium nucleus with A = 4 and Z = 2, so emitting one lowers A by 4 and Z by 2; a β⁻ particle is an electron with A = 0 and Z = −1, so emitting one leaves A alone and raises Z by 1; γ radiation carries no mass or charge, so neither number changes.</p>",
      },
    ],

    /* Chemistry AS — the radical dot in the initiation step */
    "b7b1b585-4b39-43ca-b289-6933fb5bcf6b": [
      {
        find: "<li>The three stages are initiation (Cl2 → 2Cl•), propagation (a radical reacts with an alkane, regenerating a radical) and termination (two radicals combine).</li>",
        replace:
          "<li>The three stages are initiation (Cl2 → 2Cl•), propagation (a radical reacts with an alkane, regenerating a radical) and termination (two radicals combine). <em>Key:</em> Cl2 = one chlorine molecule; Cl• = a chlorine radical, the dot standing for its single unpaired electron; the 2 in front of Cl• records that homolytic fission of one molecule gives two radicals, which is why a trace of light starts a chain that consumes many molecules.</li>",
      },
    ],

    /* Chemistry AS — reading a half-equation */
    "47637407-cc04-4576-9984-6ed01a25d6c9": [
      {
        find: "<li>Example: MnO4⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H2O, and acidified manganate(VII) decolourises when it is reduced.</li>",
        replace:
          "<li>Example: MnO4⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H2O, and acidified manganate(VII) decolourises when it is reduced. <em>Key:</em> MnO4⁻ = the manganate(VII) ion; H⁺ = the acid that supplies the protons; e⁻ = an electron, on the left because the ion is being reduced; Mn²⁺ = the manganese(II) ion left in solution; H2O = water, made from the oxygens and protons. The equation balances atoms and charge: −1 + 8 − 5 = +2 on each side.</li>",
      },
    ],

    /* Biology A2 — the equation the section calls "the shorthand" and never writes */
    "de2af4ab-d36e-4c26-9cf6-c1e5312f6dd9": [
      {
        find: "that most organisms use.</p>",
        replace:
          "that most organisms use.</p>\n<p>6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (light, chlorophyll) <em>Key:</em> CO₂ = carbon dioxide, taken in through the stomata; H₂O = water, split by photolysis; C₆H₁₂O₆ = glucose, the carbohydrate the light energy ends up stored in; O₂ = oxygen, released from the water rather than from the carbon dioxide, which is why isotope labelling with ¹⁸O settles the question; the 6 in front of each species is the coefficient that balances six carbons, twelve hydrogens and eighteen oxygens on each side. The light and chlorophyll are written after the arrow because they are the conditions, not reactants.</p>",
      },
    ],

    /* Chemistry AS — an addition reaction with its product and its visible result */
    "3f80c4ce-e7f1-4af5-bb03-bc27da874e5f": [
      {
        find: "causing a colour change from purple to colourless.</p>",
        replace:
          "causing a colour change from purple to colourless.</p>\n<p>CH₂=CH₂ + Br₂ → CH₂BrCH₂Br <em>Key:</em> CH₂=CH₂ = ethene; Br₂ = bromine, orange-brown in solution; CH₂BrCH₂Br = 1,2-dibromoethane, colourless — one bromine atom bonds to each carbon of the double bond as the π bond breaks, so every atom of both reactants appears in the product, which is what makes this an addition and not a substitution. The disappearance of the orange colour is the test for a C=C.</p>",
      },
    ],

    /* Biology OL — the hydrolysis equations the introduction promises */
    "28f80528-ff78-41cb-b43c-8c697d38dcfa": [
      {
        find: "Every digestive reaction is written as a hydrolysis equation, and the absorption calculation is worked from first principles.</p>",
        replace:
          "Every digestive reaction is written as a hydrolysis equation, and the absorption calculation is worked from first principles.</p>\n<p>Starch + H₂O → maltose (amylase), maltose + H₂O → glucose (maltase); protein + H₂O → amino acids (protease); fat + H₂O → fatty acids + glycerol (lipase). <em>Key:</em> H₂O appears on the left of every one of these because hydrolysis is the reaction that splits a bond with water, which is also why the products are smaller molecules than the substrate; the enzyme named in brackets is a catalyst, so it is written above or beside the arrow, never balanced into the equation; and the products, not the substrate, are what the ileum absorbs.</p>",
      },
    ],

    /* Chemistry A2 — the nitration equation benzene's section describes in words */
    "dc64d220-a1d9-4671-bfdd-67785046d0ed": [
      {
        find: "<p>Benzene undergoes a variety of chemical reactions under specific conditions.</p>",
        replace:
          "<p>Benzene undergoes a variety of chemical reactions under specific conditions.</p>\n<p>C₆H₆ + HNO₃ → C₆H₅NO₂ + H₂O (concentrated H₂SO₄, about 50 °C) <em>Key:</em> C₆H₆ = benzene; HNO₃ = concentrated nitric acid, which the sulfuric acid converts into the NO₂⁺ electrophile; C₆H₅NO₂ = nitrobenzene; H₂O = water, formed when a proton is lost from the ring to restore the delocalised system. That proton loss is why this is a substitution: the ring still has six carbons and its delocalised π cloud, unlike an addition across a C=C.</p>",
      },
    ],

    /* Maths OL — the probability formulae the summary tells students to quote */
    "e17a624b-2af7-4814-9f39-c302535c75f8": [
      {
        find: "Show the formula you use, so the method mark is available.</p>",
        replace:
          "Show the formula you use, so the method mark is available.</p>\n<p>P(A ∪ B) = P(A) + P(B) − P(A ∩ B) and P(A′) = 1 − P(A) <em>Key:</em> P(A) = the probability of event A, a number between 0 and 1 with no units; ∪ means \"or\" (A, or B, or both); ∩ means \"and\" (both at once); subtracting P(A ∩ B) stops the outcomes in both events being counted twice; A′ is the complement, everything that is not A, and P(A) + P(A′) = 1. For independent events multiply: P(A ∩ B) = P(A) × P(B).</p>",
      },
    ],

    /* Chemistry A2 — the ligand exchange equation behind the colour change */
    "2ed6c47b-aff6-48a7-a34f-855d1a7b2fe6": [
      {
        find: "<li>Excess aqueous ammonia converts Cu²⁺ into [Cu(NH₃)₄(H₂O)₂]²⁺, a deep blue complex.</li>",
        replace:
          "<li>Excess aqueous ammonia converts Cu²⁺ into [Cu(NH₃)₄(H₂O)₂]²⁺, a deep blue complex. <em>Key:</em> [Cu(H₂O)₆]²⁺ + 4NH₃ → [Cu(NH₃)₄(H₂O)₂]²⁺ + 4H₂O — the copper ion starts with six water ligands; four ammonia molecules replace four of them and two waters remain, so four waters are released; the coordination number stays 6 throughout, the charge is +2 on both sides, and the colour deepens from pale blue to deep blue. A ligand exchange that keeps the coordination number the same changes the colour without changing the shape.</li>",
      },
    ],
  },
};
