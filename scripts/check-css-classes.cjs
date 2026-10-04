#!/usr/bin/env node
/**
 * Fail when a class used in the source has no rule in the compiled CSS.
 *
 * Why this exists
 * ---------------
 * Tailwind only generates the utilities it finds in `content` globs. The app is
 * split across two source trees (`src/` and `frontend/src/`), and for a while
 * the globs covered only `src/` — so every utility used *only* inside
 * `frontend/src` was silently absent from the CSS in dev and in `npm run build`.
 * The sidebar's `hidden md:flex` stayed `display: none` and the hamburger looked
 * broken (see docs/styling.md). Nothing failed; the styling just quietly did not
 * exist.
 *
 * What it checks
 * --------------
 * 1. Every class token in a *class context* — `className="…"`,
 *    `className={cn(…)}`, `clsx`/`twMerge`/`cva` arguments — must appear in the
 *    compiled CSS.
 * 2. Every other string literal in the source that Tailwind itself would accept
 *    as a utility (asked via Tailwind's own rule generator, so no hand-rolled
 *    prefix list) must appear as well. This is what catches classes returned
 *    from helper modules, e.g. the accent classes in `frontend/src/lib/subjects`.
 *
 * The scan roots are deliberately hardcoded rather than read from the Tailwind
 * config: if they followed the config, deleting a glob would also stop the check
 * from looking at that tree — the exact failure it is meant to prevent.
 *
 * Usage
 * -----
 *   node scripts/check-css-classes.cjs                 # dist/assets/*.css
 *   node scripts/check-css-classes.cjs --css out.css   # a specific stylesheet
 *   node scripts/check-css-classes.cjs --json          # machine-readable
 *
 * Exit codes: 0 clean, 1 missing classes, 2 the check could not run.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const MAX_REPORTED = 60;

// Trees that render markup. Keep in sync with tailwind.config.ts#content — but
// note the comment above: this list must not be *read* from the config.
const SCAN_TREES = ["src", "frontend/src"];
const SCAN_EXTS = new Set([".ts", ".tsx", ".js", ".jsx"]);
const EXTRA_FILES = ["index.html"];

const CLASS_HELPERS = new Set(["cn", "clsx", "classnames", "classNames", "cx", "twMerge", "cva"]);

// `className` is the common case; `classNames` and `activeClassName` are how
// react-day-picker, sonner and react-router's NavLink take class strings.
function isClassAttributeName(name) {
  return name === "className" || name === "class" || name === "classNames" || name.endsWith("ClassName");
}

function parseArgs(argv) {
  const args = { css: null, json: false, quiet: false, dir: ROOT };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--css") args.css = argv[++i];
    else if (arg === "--json") args.json = true;
    else if (arg === "--quiet") args.quiet = true;
    else if (arg === "--dir") args.dir = argv[++i];
  }
  return args;
}

/** Decode a CSS identifier escape (`\:`, `\/`, `\32 xl`) into its class text. */
function cssUnescape(raw) {
  let out = "";
  for (let i = 0; i < raw.length; i += 1) {
    if (raw[i] !== "\\") { out += raw[i]; continue; }
    const hex = raw.slice(i + 1).match(/^[0-9a-fA-F]{1,6}/);
    if (hex) {
      out += String.fromCodePoint(parseInt(hex[0], 16));
      i += hex[0].length;
      if (raw[i + 1] === " ") i += 1; // the space that terminates a hex escape
      continue;
    }
    out += raw[i + 1] ?? "";
    i += 1;
  }
  return out;
}

/** Every class selector in the stylesheet, decoded to `class="value"` text. */
function collectCssClasses(cssText) {
  const classes = new Set();
  // A selector token is `.` + a run of identifier chars and backslash escapes.
  // Anything unescaped and non-identifier (`>`, `+`, `,`, `:`, whitespace) ends it.
  const re = /(?:^|[^\\\w-])\.((?:\\(?:[0-9a-fA-F]{1,6}\s?|.)|[\w-])+)/g;
  for (const m of cssText.matchAll(re)) classes.add(cssUnescape(m[1]));
  return classes;
}

/** All files under the scan trees, in a stable order. */
function collectSourceFiles(dir) {
  const files = [];
  const walk = (abs) => {
    for (const entry of fs.readdirSync(abs, { withFileTypes: true })) {
      if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
      const full = path.join(abs, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (SCAN_EXTS.has(path.extname(entry.name))) files.push(full);
    }
  };
  for (const tree of SCAN_TREES) {
    const abs = path.join(dir, tree);
    if (!fs.existsSync(abs)) continue;
    walk(abs);
  }
  for (const extra of EXTRA_FILES) {
    const abs = path.join(dir, extra);
    if (fs.existsSync(abs)) files.push(abs);
  }
  return files.sort();
}

/** Tokens that mean "compare", not "join" — their operands are values, not classes. */
const COMPARISON_KINDS = new Set([
  "EqualsEqualsToken", "EqualsEqualsEqualsToken", "ExclamationEqualsToken", "ExclamationEqualsEqualsToken",
  "LessThanToken", "GreaterThanToken", "LessThanEqualsToken", "GreaterThanEqualsToken",
  "InKeyword", "InstanceOfKeyword",
]);

// `group` / `peer` and their named variants are markers: they need no rule of
// their own, only the `group-*:`/`peer-*:` variants that reference them do.
const MARKER_CLASS_RE = /^(?:group|peer)(?:\/[^\s]+)?$/;

/**
 * Walk one file. `onClassToken(token, position)` receives tokens found in a
 * class context; `onAnyToken(token)` receives every other string token
 * (candidates for the indirect pass).
 */
function collectFileTokens(ts, file, text, onClassToken, onAnyToken) {
  const scriptKind = file.endsWith(".tsx") || file.endsWith(".jsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, scriptKind);

  const literalText = (node) => node.getText(source).slice(1, -1);

  /**
   * Collect the literals that occupy a *class position*, with source offsets.
   *
   * `cn("a", variant === "ghost" && "b")` contributes `a` and `b`, not
   * `ghost`: the right operand of a comparison is a value. The same applies to
   * arguments of calls that are not class helpers — `cn(buttonVariants({
   * variant: "default" }))` must not report `default`, because that helper's own
   * literals are checked where they are declared.
   */
  const classLiteralsIn = (node) => {
    const found = [];
    const visit = (n, isClassPosition) => {
      if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) {
        if (isClassPosition) found.push({ text: literalText(n), at: n.getStart(source) });
        return;
      }
      if (ts.isTemplateExpression(n)) {
        if (isClassPosition) {
          found.push({ text: n.head.text, at: n.getStart(source) });
          n.templateSpans.forEach((span) => found.push({ text: span.literal.text, at: span.literal.getStart(source) }));
        }
        n.templateSpans.forEach((span) => visit(span.expression, isClassPosition));
        return;
      }
      if (ts.isConditionalExpression(n)) {
        visit(n.whenTrue, isClassPosition);
        visit(n.whenFalse, isClassPosition);
        visit(n.condition, false);
        return;
      }
      if (ts.isBinaryExpression(n)) {
        // `a + " b"` and `cond && " b"` contribute classes; `a === "ghost"` does
        // not — comparisons are values.
        const isComparison = COMPARISON_KINDS.has(ts.SyntaxKind[n.operatorToken.kind]);
        const keep = isClassPosition && !isComparison;
        visit(n.left, keep);
        visit(n.right, keep);
        return;
      }
      if (ts.isParenthesizedExpression(n)) { visit(n.expression, isClassPosition); return; }
      if (ts.isCallExpression(n)) {
        const helper = ts.isIdentifier(n.expression) && CLASS_HELPERS.has(n.expression.text);
        n.arguments.forEach((arg) => visit(arg, isClassPosition && helper));
        visit(n.expression, false);
        return;
      }
      if (ts.isObjectLiteralExpression(n)) {
        // `defaultVariants: { variant: "ghost" }` names a variant; it is not a
        // class list, unlike the `variants` maps above it.
        const namesNotClasses = ts.isPropertyAssignment(n.parent)
          && ts.isIdentifier(n.parent.name) && n.parent.name.text === "defaultVariants";
        // `compoundVariants: [{ variant: "ghost", class: "bg-x" }]` — only the
        // `class`/`className` key holds classes when one is present.
        const hasClassKey = n.properties.some((prop) => ts.isPropertyAssignment(prop)
          && ((ts.isIdentifier(prop.name) && (prop.name.text === "class" || prop.name.text === "className"))
            || (ts.isStringLiteral(prop.name) && (prop.name.text === "class" || prop.name.text === "className"))));
        n.properties.forEach((prop) => {
          if (ts.isPropertyAssignment(prop)) {
            // `{ "is-active": active }` — the key is the class, the value a flag.
            if (ts.isStringLiteral(prop.name)) found.push({ text: literalText(prop.name), at: prop.name.getStart(source) });
            const isClassKey = (ts.isIdentifier(prop.name) && (prop.name.text === "class" || prop.name.text === "className"))
              || (ts.isStringLiteral(prop.name) && (prop.name.text === "class" || prop.name.text === "className"));
            const keepGoing = isClassPosition && !namesNotClasses && (!hasClassKey || isClassKey);
            visit(prop.initializer, keepGoing);
          } else if (ts.isStringLiteral(prop) && isClassPosition && !namesNotClasses) {
            found.push({ text: literalText(prop), at: prop.getStart(source) });
          }
        });
        return;
      }
      if (ts.isArrayLiteralExpression(n)) { n.elements.forEach((el) => visit(el, isClassPosition)); return; }
      if (ts.isAsExpression?.(n) || ts.isSatisfiesExpression?.(n) || ts.isNonNullExpression(n)) { visit(n.expression, isClassPosition); return; }
      // Everything else — JSX expressions (`className={cn(…)}`), parentheses-free
      // wrappers, blocks — keeps walking with the position it was given.
      n.forEachChild((child) => visit(child, isClassPosition));
    };
    visit(node, true);
    return found;
  };

  const isClassHelperCall = (node) =>
    ts.isCallExpression(node)
    && ts.isIdentifier(node.expression) && CLASS_HELPERS.has(node.expression.text);

  const onLiterals = (literals) => {
    for (const { text: raw, at } of literals) {
      for (const token of raw.split(/\s+/)) {
        if (!token || MARKER_CLASS_RE.test(token) || token.startsWith("--")) continue;
        onClassToken(token, at);
      }
    }
  };

  const visit = (node) => {
    if (ts.isJsxAttribute(node) && node.name && ts.isIdentifier(node.name)
        && isClassAttributeName(node.name.text) && node.initializer) {
      if (ts.isStringLiteral(node.initializer)) onLiterals([{ text: node.initializer.text, at: node.initializer.getStart(source) }]);
      else onLiterals(classLiteralsIn(node.initializer));
      return;
    }
    if (isClassHelperCall(node)) {
      onLiterals(node.arguments.flatMap((arg) => classLiteralsIn(arg)));
      return;
    }
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      // Skip attribute values and object keys elsewhere: they are never classes.
      const parent = node.parent;
      const isName = parent && (ts.isPropertyAssignment(parent) && parent.name === node);
      if (!isName) for (const token of literalText(node).split(/\s+/)) if (token) onAnyToken(token, node.getStart(source));
      return;
    }
    node.forEachChild(visit);
  };

  visit(source);
}

/** Tailwind's own answer to "is this a utility?", so no prefix list is needed. */
function makeUtilityOracle() {
  const ts = require("typescript");
  const configPath = path.join(ROOT, "tailwind.config.ts");
  if (!fs.existsSync(configPath)) return { oracle: null, why: "tailwind.config.ts not found" };

  let tmp = null;
  try {
    const out = ts.transpileModule(fs.readFileSync(configPath, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    }).outputText;
    // Written inside the project (node_modules/.cache) so the config's own
    // `require("tailwindcss-animate")` still resolves from the project's
    // node_modules — a temp dir outside the tree cannot see them.
    const cacheDir = path.join(ROOT, "node_modules", ".cache", "check-css-classes");
    fs.mkdirSync(cacheDir, { recursive: true });
    tmp = path.join(cacheDir, `tw-config-${process.pid}.cjs`);
    fs.writeFileSync(tmp, out);
    const raw = require(tmp);
    const config = raw.default ?? raw;

    const resolveConfig = require("tailwindcss/resolveConfig");
    const { createContext } = require("tailwindcss/lib/lib/setupContextUtils");
    const { generateRules } = require("tailwindcss/lib/lib/generateRules");
    const context = createContext(resolveConfig(config), []);
    const cache = new Map();
    return {
      oracle: (candidate) => {
        if (cache.has(candidate)) return cache.get(candidate);
        let ok = false;
        try { ok = generateRules(new Set([candidate]), context).length > 0; } catch { ok = false; }
        cache.set(candidate, ok);
        return ok;
      },
    };
  } catch (error) {
    return { oracle: null, why: error.message };
  } finally {
    if (tmp) { try { fs.unlinkSync(tmp); } catch { /* best effort */ } }
  }
}

function loadAllowlist() {
  const file = path.join(__dirname, "css-class-allowlist.cjs");
  if (!fs.existsSync(file)) return new Map();
  const exported = require(file);
  const list = Array.isArray(exported) ? exported : exported.allow ?? [];
  return new Map(list.map((entry) => (typeof entry === "string" ? [entry, ""] : [entry.class, entry.why ?? ""])));
}

function main() {
  const args = parseArgs(process.argv);
  const distDir = path.join(args.dir, "dist", "assets");

  let cssFiles = [];
  if (args.css) {
    const abs = path.resolve(args.dir, args.css);
    if (!fs.existsSync(abs)) {
      console.error(`[check:css] stylesheet not found: ${abs}`);
      process.exit(2);
    }
    cssFiles = [abs];
  } else {
    if (!fs.existsSync(distDir)) {
      console.error("[check:css] no dist/assets — run `vite build` first (this check reads the shipped CSS).");
      process.exit(2);
    }
    cssFiles = fs.readdirSync(distDir).filter((f) => f.endsWith(".css")).map((f) => path.join(distDir, f));
  }
  if (cssFiles.length === 0) {
    console.error("[check:css] no compiled CSS found to check against.");
    process.exit(2);
  }

  const cssClasses = new Set();
  for (const file of cssFiles) {
    for (const cls of collectCssClasses(fs.readFileSync(file, "utf8"))) cssClasses.add(cls);
  }

  const files = collectSourceFiles(args.dir);
  const missingScanRoot = SCAN_TREES.filter((tree) => !fs.existsSync(path.join(args.dir, tree)));
  if (files.length < 50 || missingScanRoot.length > 0 || cssClasses.size < 100) {
    console.error(
      `[check:css] refusing to report success: ${files.length} source files, ${cssClasses.size} CSS classes`
      + (missingScanRoot.length ? `, missing scan root(s): ${missingScanRoot.join(", ")}` : ""),
    );
    process.exit(2);
  }

  let ts;
  try {
    ts = require("typescript");
  } catch (error) {
    console.error(`[check:css] the TypeScript parser is required for this check: ${error.message}`);
    process.exit(2);
  }

  /** @type {Map<string, {file: string, line: number}>} */
  const classContext = new Map();
  /** @type {Map<string, {file: string, line: number}>} */
  const otherTokens = new Map();

  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    const rel = path.relative(args.dir, file);
    const lineOf = (at) => text.slice(0, at).split("\n").length;
    collectFileTokens(
      ts,
      file,
      text,
      (token, at) => {
        if (!classContext.has(token)) classContext.set(token, { file: rel, line: lineOf(at) });
      },
      (token, at) => {
        if (!otherTokens.has(token)) otherTokens.set(token, { file: rel, line: lineOf(at) });
      },
    );
  }

  const allowlist = loadAllowlist();
  const findings = [];

  for (const [token, where] of classContext) {
    if (cssClasses.has(token) || allowlist.has(token)) continue;
    findings.push({ class: token, source: `${where.file}:${where.line}`, tier: "class attribute" });
  }

  // Step 2 — utilities referenced indirectly. Only tokens Tailwind itself would
  // accept are considered, so prose, ids and URLs cannot trip the check.
  const { oracle, why } = makeUtilityOracle();
  const indirect = [];
  if (oracle) {
    const reported = new Set(findings.map((f) => f.class));
    for (const [token, where] of otherTokens) {
      if (token.length > 100 || cssClasses.has(token) || allowlist.has(token) || reported.has(token)) continue;
      if (!/^[!\-a-zA-Z0-9[]/.test(token)) continue;
      if (token.includes("://") || /[\s"'`{};=@$]/.test(token)) continue;
      if (!oracle(token)) continue;
      indirect.push({ class: token, source: `${where.file}:${where.line}`, tier: "indirect" });
    }
    findings.push(...indirect);
  }

  if (args.json) {
    console.log(JSON.stringify({ cssFiles: cssFiles.map((f) => path.relative(args.dir, f)), scanned: files.length, cssClasses: cssClasses.size, findings }, null, 2));
  } else if (findings.length === 0) {
    const note = oracle ? "" : ` (indirect pass skipped: ${why})`;
    if (!args.quiet) console.log(`[check:css] ${files.length} source files · ${cssClasses.size} CSS classes · every class resolves${note}`);
  } else {
    findings.sort((a, b) => a.class.localeCompare(b.class) || a.source.localeCompare(b.source));
    console.error(`\n[check:css] ${findings.length} class${findings.length === 1 ? "" : "es"} used in the source but missing from the compiled CSS:\n`);
    for (const f of findings.slice(0, MAX_REPORTED)) {
      console.error(`  ${f.class.padEnd(42)} ${f.source}`);
    }
    if (findings.length > MAX_REPORTED) console.error(`  … and ${findings.length - MAX_REPORTED} more`);
    console.error(
      "\n  Almost always a Tailwind `content` glob that does not cover the file using the class\n"
      + "  (see docs/styling.md). Add the tree to tailwind.config.ts#content and rebuild; if a class\n"
      + "  is genuinely runtime-only, list it in scripts/css-class-allowlist.cjs with a reason.\n",
    );
  }

  process.exit(findings.length === 0 ? 0 : 1);
}

main();
