// OxfordAQA International GCSE Chemistry 9202 — topic 3.10 Organic Chemistry.
// Statements covered: 3.10.1 Carbon compounds as fuels, 3.10.2 Synthetic and
// naturally occurring polymers, 3.10.3 Organic compounds - their structure and
// reactions.
//
// Organic chemistry is a naming subject before it is a reacting subject: a
// student who can read a formula and place it in a homologous series can predict
// the reaction. So the note teaches the general formulas and the functional
// groups first, then reuses them across fuels, polymers and reactions instead of
// listing reactions compound by compound.
module.exports = {
  topicSlug: "organic-chemistry",
  title: "IGCSE Chemistry (OxfordAQA): Organic Chemistry",
  html: `<h2>Organic Chemistry</h2>
<p>Organic chemistry is the chemistry of carbon compounds, and there are millions of them because carbon forms four bonds and bonds to itself without limit. That could make the topic a list to memorise, and it is not: a handful of homologous series cover everything the specification asks, and each series has a general formula, a functional group and a predictable set of reactions. This topic starts from crude oil, which is where the fuels come from, then introduces the alkanes and alkenes with the test that separates them, the alcohols and carboxylic acids that follow from them, and finally the polymers — both the synthetic ones made from alkenes and the natural ones such as starch, protein and DNA. Read it as one chain of reasoning rather than four separate topics.</p>

<h3>1. Crude oil and fractional distillation</h3>
<p>Crude oil is a mixture of hydrocarbons — compounds of carbon and hydrogen only — of different chain lengths. Because the chains differ in length, they have different boiling points, and that is what separates them: fractional distillation heats the oil, lets the vapours rise up a column and draws each fraction off where it condenses.</p>
<ul>
  <li><strong>Shorter chains</strong> have lower boiling points and condense near the top of the column. They are more flammable and less viscous.</li>
  <li><strong>Longer chains</strong> have higher boiling points and condense near the bottom, where the temperature is highest. They are more viscous and burn less cleanly.</li>
  <li><strong>The fractions</strong>, from top to bottom: refinery gas, petrol, kerosene, diesel, fuel oil and bitumen.</li>
</ul>
<p>The reason for the trend is the intermolecular forces. Longer molecules have more surface contact with each other, so the forces between them are stronger and more energy is needed to separate them, which raises the boiling point. Viscosity follows the same cause: the chains tangle and slide over each other less easily.</p>

<h3>2. Alkanes: the first homologous series</h3>
<p>A homologous series is a family of compounds with the same general formula, similar chemical properties and a gradual change in physical properties from one member to the next. The alkanes have the general formula CₙH₂ₙ₊₂, contain only single bonds, and are described as saturated because each carbon has as many hydrogen atoms as it can hold.</p>
<p>CH₄, C₂H₆, C₃H₈ and C₄H₁₀ are methane, ethane, propane and butane. The prefix gives the number of carbons, and that is all the naming you need at this level; the suffix -ane tells you the compound is saturated.</p>
<ul>
  <li><strong>Structure:</strong> every carbon forms four single bonds, arranged tetrahedrally, so the molecule is not flat.</li>
  <li><strong>Reactivity:</strong> low. Single bonds are strong and there is no functional group for a reagent to attack, so alkanes mainly burn or react with halogens in the presence of ultraviolet light.</li>
  <li><strong>Physical trend:</strong> boiling point rises with chain length for the same intermolecular reason as the fractions above.</li>
</ul>

<h3>3. Combustion: complete and incomplete</h3>
<p>Alkanes are used as fuels because they burn exothermically. With plenty of oxygen the combustion is complete and the products are carbon dioxide and water.</p>
<p>CH₄ + 2O₂ → CO₂ + 2H₂O <em>Key:</em> CH₄ = methane (g); O₂ = oxygen (g); CO₂ = carbon dioxide (g); H₂O = water (g).</p>
<p>With a limited supply of air the combustion is incomplete. The products then include carbon monoxide, a colourless and odourless gas that is toxic because it binds to haemoglobin and stops the blood carrying oxygen, and sometimes soot, which is unburned carbon.</p>
<p>2CH₄ + 3O₂ → 2CO + 4H₂O <em>Key:</em> CO = carbon monoxide (g); the coefficients show that less oxygen is used per molecule of methane than in complete combustion.</p>
<p>Incomplete combustion also releases less energy per mole of fuel, which is why a badly adjusted burner gives less heat as well as more pollution. Sulfur impurities in fuels produce sulfur dioxide when burned, which dissolves in rainwater to form acid rain; that is a fuel-quality problem rather than a property of the hydrocarbon itself.</p>

<h3>4. Cracking: matching supply to demand</h3>
<p>Crude oil contains more long-chain fractions than the market wants, and more short-chain ones than it produces naturally. Cracking solves that by breaking long chains into shorter ones, using heat and often a catalyst, and it produces alkenes as well as shorter alkanes — which is where the next section comes from.</p>
<p>C₁₀H₂₂ → C₈H₁₈ + C₂H₄ <em>Key:</em> C₁₀H₂₂ = decane, the long chain being broken; C₈H₁₈ = octane, the shorter alkane produced; C₂H₄ = ethene, the alkene produced.</p>
<p>Check the balance: ten carbons on the left, eight plus two on the right; twenty-two hydrogens on the left, eighteen plus four on the right. Cracking is not a reaction with oxygen or with anything else, so the atoms must simply be redistributed, and a balanced check is the fastest way to catch a wrong product.</p>

<h3>5. Alkenes and the bromine water test</h3>
<p>Alkenes have the general formula CₙH₂ₙ and contain a carbon–carbon double bond, so they are unsaturated: they can add more atoms without losing any. Ethene is C₂H₄ and propene is C₃H₆.</p>
<p>The test that separates an alkene from an alkane is bromine water. Shake the unknown with orange bromine water: an alkene decolourises it, turning the solution from orange to colourless, because the bromine adds across the double bond. An alkane leaves the colour unchanged, because there is no double bond for the bromine to add to.</p>
<p>C₂H₄ + Br₂ → C₂H₄Br₂ <em>Key:</em> C₂H₄ = ethene (g); Br₂ = bromine, orange in solution; C₂H₄Br₂ = 1,2-dibromoethane, colourless.</p>
<p>That change from orange to colourless is the observation to write. "It goes clear" is accepted; "the bromine water stays orange" for an alkene is not.</p>

<h3>6. Addition reactions of alkenes</h3>
<p>Because the double bond can open up, alkenes undergo addition reactions in which two species join to make one product and nothing is lost. The four the specification asks for are worth learning as a set, because they all follow the same pattern.</p>
<ul>
  <li><strong>With hydrogen</strong> an alkene becomes an alkane, over a nickel catalyst: C₂H₄ + H₂ → C₂H₆. This is hydrogenation, the reaction used to harden vegetable oil into margarine.</li>
  <li><strong>With steam</strong> an alkene becomes an alcohol, over a phosphoric acid catalyst at about 300 °C and high pressure: C₂H₄ + H₂O → C₂H₅OH.</li>
  <li><strong>With bromine</strong> it forms a dibromoalkane, as above, which is the test reaction.</li>
  <li><strong>With hydrogen chloride</strong> it forms a chloroalkane: C₂H₄ + HCl → C₂H₅Cl.</li>
</ul>
<p>In every case the double bond becomes a single bond and the two new atoms attach to the carbons that were double-bonded. Notice that no small molecule is eliminated, which is what distinguishes an addition from a condensation.</p>

<h3>7. Alcohols and carboxylic acids</h3>
<p>Ethanol, C₂H₅OH, is made in two ways. Fermentation uses yeast on a sugar solution at about 25 to 35 °C in the absence of oxygen: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂. Hydration of ethene is the industrial route described above, and it is faster and purer but needs a catalyst, heat and pressure.</p>
<ul>
  <li><strong>Fermentation</strong> is cheap and uses renewable sugar, but it is slow and the product is dilute, so it must be distilled.</li>
  <li><strong>Hydration</strong> is fast and gives a concentrated product, but it uses ethene from crude oil, which is not renewable.</li>
  <li><strong>Ethanol as a fuel</strong> burns to carbon dioxide and water and can be blended into petrol, but growing the sugar competes with food crops for land.</li>
</ul>
<p>Carboxylic acids contain the functional group –COOH. Ethanoic acid, CH₃COOH, is the acid in vinegar, and it behaves like the mineral acids of topic 3.5: it neutralises bases, reacts with carbonates to give carbon dioxide, and reacts with an alcohol to form an ester. That last reaction, esterification, is condensation — two molecules join and a small molecule of water is eliminated.</p>

<h3>8. Addition polymerisation</h3>
<p>Under the right conditions the double bond of an alkene opens and the molecules join into a long chain without losing any atoms. This is addition polymerisation, and the monomer and the repeating unit have the same empirical formula, which is why the equation is written with the repeat unit in brackets and an n after it.</p>
<p>n C₂H₄ → (–CH₂–CH₂–)ₙ <em>Key:</em> C₂H₄ = ethene, the monomer; the bracket shows the repeating unit; n = the number of monomer units joined, which is large and variable.</p>
<ul>
  <li><strong>Poly(ethene)</strong> from ethene: bags, bottles and film. It is tough, flexible and unreactive.</li>
  <li><strong>Poly(propene)</strong> from propene: ropes, carpets and food containers.</li>
  <li><strong>PVC</strong> from chloroethene: window frames and pipes, because it is rigid and does not conduct.</li>
  <li><strong>PTFE</strong> from tetrafluoroethene: non-stick coatings, because it is very unreactive and has a low friction surface.</li>
</ul>
<p>Two consequences follow from the structure. Addition polymers have no functional group to attack, so they are unreactive and do not biodegrade, which is why plastic waste persists. And because the chains are long and tangled, they soften on heating and can be remoulded, which is what makes recycling possible for many of them.</p>

<h3>9. Condensation polymers and natural polymers</h3>
<p>In condensation polymerisation two different monomers, each with two functional groups, join and eliminate a small molecule — usually water — at every link. Polyesters and nylons are made this way. PET, used in drinks bottles, is made from ethane-1,2-diol and benzene-1,4-dicarboxylic acid, and the link that forms is an ester link.</p>
<table border="1">
  <tr><th>Polymer</th><th>Type</th><th>Monomer or monomers</th><th>Where it occurs</th></tr>
  <tr><td>Poly(ethene)</td><td>Addition</td><td>Ethene</td><td>Synthetic, from crude oil</td></tr>
  <tr><td>PET</td><td>Condensation</td><td>A diol and a dicarboxylic acid</td><td>Synthetic, bottles and fibres</td></tr>
  <tr><td>Starch</td><td>Condensation</td><td>Glucose</td><td>Natural, energy store in plants</td></tr>
  <tr><td>Cellulose</td><td>Condensation</td><td>Glucose</td><td>Natural, plant cell walls</td></tr>
  <tr><td>Protein</td><td>Condensation</td><td>Amino acids</td><td>Natural, enzymes, muscle and hair</td></tr>
  <tr><td>DNA</td><td>Condensation</td><td>Nucleotides</td><td>Natural, genetic material</td></tr>
</table>
<p>The natural polymers are condensation polymers made by living things. Starch and cellulose are both built from glucose but linked differently, which is why humans can digest starch and not cellulose. Proteins are chains of amino acids joined by peptide links, and the order of those amino acids determines the shape of the protein and therefore its function. DNA is a chain of nucleotides whose order carries the genetic code. All of them are biodegradable, because organisms have enzymes that can break the links — which is precisely what addition polymers lack.</p>

<h3>10. Worked example: from monomer to polymer</h3>
<p>A sample of poly(ethene) has a relative molecular mass of 8 400. Calculate the number of ethene units in the chain, and state the mass of bromine that would be needed to decolourise 0.020 mol of ethene.</p>
<p>The repeat unit is C₂H₄, with Mᵣ = 2 × 12 + 4 × 1 = 28. The number of units is 8 400 ÷ 28 = 300.</p>
<p><em>Key:</em> Mᵣ = relative molecular mass, with no unit; 12 and 1 are the relative atomic masses of carbon and hydrogen; the number of units is the polymer's mass divided by the mass of one repeat unit.</p>
<p>Ethene reacts with bromine in a 1:1 ratio, so 0.020 mol of ethene needs 0.020 mol of Br₂. The mass is 0.020 mol × 160 g/mol = 3.2 g, using Mᵣ(Br₂) = 2 × 80 = 160.</p>
<p><em>Key:</em> mol = amount of substance (mol); 160 g/mol = the relative molecular mass of bromine expressed as grams per mole; 3.2 g = the mass of bromine required.</p>
<p>The two halves of that question are the two skills this topic tests: counting repeat units, and using a mole ratio from an addition reaction. Neither needs the structure drawn out, which is why the calculation is worth practising rather than the drawing.</p>

<h3>11. Typical mistakes</h3>
<ul>
  <li>Writing an alkene's formula with the alkane's general formula. Ethene is C₂H₄, not C₂H₆.</li>
  <li>Saying bromine water goes colourless for an alkane. It stays orange; only the alkene decolourises it.</li>
  <li>Forgetting that addition polymerisation loses no atoms, so the empirical formula of the polymer is the same as the monomer's.</li>
  <li>Drawing a condensation polymer without eliminating the small molecule, which leaves the formula one water too heavy at every link.</li>
  <li>Claiming all plastics are non-biodegradable. Starch, cellulose and proteins are polymers and all biodegrade; the problem is specific to addition polymers such as poly(ethene).</li>
  <li>Calling carbon monoxide "just carbon dioxide with less oxygen". It is a different compound with a different effect: it is toxic because it binds to haemoglobin.</li>
  <li>Using "cracking" and "combustion" interchangeably. Cracking breaks chains without oxygen; combustion reacts the fuel with oxygen.</li>
</ul>

<h3>12. Exam-style questions</h3>
<ol>
  <li>Explain why petrol has a lower boiling point than bitumen. <em>Answer:</em> Petrol is a mixture of shorter hydrocarbon chains, which have weaker intermolecular forces between the molecules, so less energy is needed to separate them.</li>
  <li>Describe the test that distinguishes ethene from ethane, including the observation. <em>Answer:</em> Shake each gas with orange bromine water; ethene decolourises it, turning it colourless, while ethane leaves it orange.</li>
  <li>Write the equation for the complete combustion of propane, C₃H₈. <em>Answer:</em> C₃H₈ + 5O₂ → 3CO₂ + 4H₂O.</li>
  <li>Explain why cracking is used in the oil industry. <em>Answer:</em> It breaks long-chain fractions, for which demand is low, into shorter chains that are in demand as fuels, and it produces alkenes such as ethene, which are needed to make polymers.</li>
  <li>State two ways ethanol can be produced and give one advantage of each. <em>Answer:</em> Fermentation of sugar with yeast uses a renewable raw material and is cheap; hydration of ethene is fast and gives a concentrated product.</li>
  <li>Name the type of polymerisation that makes poly(ethene) and state what happens to the double bond. <em>Answer:</em> Addition polymerisation; the double bond opens and the molecules join without losing any atoms.</li>
  <li>Explain why poly(ethene) does not biodegrade while starch does. <em>Answer:</em> Poly(ethene) has a carbon chain with no functional group that enzymes can attack, so microorganisms cannot break it down, whereas starch has glycosidic links that enzymes can hydrolyse.</li>
  <li>0.050 mol of propene reacts completely with bromine. Calculate the mass of bromine used. <em>Answer:</em> The ratio is 1:1, so 0.050 mol of Br₂ is needed; mass = 0.050 × 160 = 8.0 g.</li>
</ol>

<h3>13. Revision checklist</h3>
<ul>
  <li>I can define a hydrocarbon and a homologous series.</li>
  <li>I can explain fractional distillation and the trend in boiling point with chain length.</li>
  <li>I can write the general formulas of alkanes and alkenes and name the first four of each.</li>
  <li>I can write complete and incomplete combustion equations.</li>
  <li>I can explain what cracking does and balance a cracking equation.</li>
  <li>I can describe the bromine water test and its observation.</li>
  <li>I can name the four addition reactions of alkenes and their products.</li>
  <li>I can describe fermentation and hydration as routes to ethanol.</li>
  <li>I can distinguish addition from condensation polymerisation.</li>
  <li>I can name two synthetic and three natural polymers with their monomers.</li>
  <li>I can calculate repeat units and use a 1:1 mole ratio from an addition reaction.</li>
</ul>
`,
};
