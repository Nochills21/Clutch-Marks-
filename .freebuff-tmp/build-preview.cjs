// Wrap the staged circular-measure draft in a full page that loads the built
// app stylesheet, so the Preview tab shows it with the Clutch Marks styling.
const fs = require("fs");
const path = require("path");
const cssFile = fs.readdirSync("dist/assets").find((f) => f.endsWith(".css"));
if (!cssFile) throw new Error("no built CSS in dist/assets");
const frag = fs.readFileSync(".freebuff/drafts/notes-circular-measure.html", "utf8");
const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Circular Measure - draft preview</title>
<link rel="stylesheet" href="../dist/assets/${cssFile}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap">
</head>
<body class="bg-background">
<main class="cm-study mx-auto max-w-4xl p-8">
<article class="cm-reader">
${frag}
</article>
</main>
</body>
</html>
`;
fs.writeFileSync(".freebuff-tmp/preview-circular-measure.html", page);
console.log("css:", cssFile, "page chars:", page.length);
