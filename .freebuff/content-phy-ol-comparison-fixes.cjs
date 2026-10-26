// Physics OL (0625) — comparison operators written as words.
//
// The first draft of the appended sections wrote comparison operators in prose
// ("ρ(object) (less than) ρ(fluid)") because a raw `<` would have opened a tag.
// The correct form is the escaped glyph, which the browser renders as the
// symbol: `&lt;` and `&gt;`. The mathematics notes already do this — they show
// "&gt; (greater than)", the glyph with its name beside it.
module.exports = {
  subject: "physics",
  level: "OL",
  fixes: {
    // Waves and Sound
    "4c3feece-d824-42a8-88ae-a9f3c5c313f7": [["when i (greater than) c", "when i &gt; c"]],

    // Pressure and Density
    "61da5c21-d745-4a51-ba0c-2a861af41061": [
      ["ρ(object) (less than) ρ(fluid)", "ρ(object) &lt; ρ(fluid)"],
      ["weight (greater than) maximum upthrust", "weight &gt; maximum upthrust"],
    ],

    // Nuclear Physics
    "d7f2e9e8-ff4a-4fba-9960-48d8ca800dd6": [
      ["alpha (less than) beta (less than) gamma", "alpha &lt; beta &lt; gamma"],
    ],
  },
};
