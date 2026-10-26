// Physics OL (0625) — notation repairs inside the existing note bodies.
//
// Appending a keyed formula sheet is not enough on its own: five of these notes
// state their formulas in words inside <pre><code> blocks — "p = rho g h",
// "E = m c delta theta", "v = f lambda", "v = 2 pi r / T". A student reading
// the body still met the spelled form, so those exact strings are replaced with
// the glyph. Every `from` is a distinctive fragment, not a bare word, and each
// replacement is verified to match before any SQL is generated.
module.exports = {
  subject: "physics",
  level: "OL",
  fixes: {
    // Waves and Sound
    "4c3feece-d824-42a8-88ae-a9f3c5c313f7": [
      ["v = f lambda", "v = fλ"],
      ["lambda: wavelength in metres (m)", "λ: wavelength in metres (m)"],
      ["Wavelength (lambda)", "Wavelength (λ)"],
    ],

    // Pressure and Density
    "61da5c21-d745-4a51-ba0c-2a861af41061": [
      ["rho = m / V", "ρ = m / V"],
      ["rho: density in kilograms", "ρ: density in kilograms"],
      ["p = rho g h", "p = ρ g h"],
      ["rho: density of the liquid", "ρ: density of the liquid"],
    ],

    // Thermal Physics
    "944cae75-d042-4e44-adb7-84ee5a7e4f18": [
      ["T (K) = theta (C) + 273", "T (K) = θ (°C) + 273"],
      ["m c delta theta", "m c Δθ"],
      // The experimental form, c = V I t / (m delta theta), has no second c in
      // the product, so it needs its own entry.
      ["m delta theta", "m Δθ"],
      ["delta theta: temperature change", "Δθ: temperature change"],
    ],

    // Earth and Space
    "798f9e7d-33c5-456e-9070-c32874b67978": [
      ["orbital speed = (2 pi r) / T", "orbital speed = 2πr / T"],
      ["v = 2 pi r / T", "v = 2πr / T"],
    ],
  },
};
