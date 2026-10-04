# Styling: why `frontend/src` must stay in the Tailwind content globs

The app is split across **two source trees**, and `tailwind.config.ts` has to scan both.

| Tree | Holds | Reached by |
| --- | --- | --- |
| `src/` | `main.tsx`, `App.tsx`, `index.css`, `pages/` | Vite entry `index.html` → `/src/main.tsx` |
| `frontend/src/` | `components/`, `hooks/`, `lib/`, `integrations/` | the `@/*` alias (`resolve.alias` in `vite.config.ts`) |

So a page at `src/pages/PastPapers.tsx` imports its shell and UI primitives from
`frontend/src/components/*`. Tailwind's JIT only generates utilities for class names
it finds in `content` globs, and the config listed `./pages`, `./components`, `./app`
and `./src` — everything except `frontend/src`.

## What that broke

Every utility class used *only* inside `frontend/src` was missing from the compiled CSS,
in dev **and** in `npm run build`. The visible symptom was the sidebar:

- `frontend/src/components/ui/sidebar.tsx` renders the desktop sidebar as
  `hidden md:flex`, so without `md:flex` it stayed `display: none` forever;
- the hamburger still toggled React state (cookie `sidebar:state` flipped, the
  `data-state`/`data-collapsible` attributes updated) but nothing moved — it looked
  like "the sidebar button does nothing";
- the mobile path was unaffected because it renders inside a Radix `Sheet`.

Many other responsive rules were missing too: `md:p-7`, `sm:px-4`, `lg:px-8`,
`sm:max-w-sm` on dialogs/sheets, `md:table-cell` inside components, and every
`group-data-[collapsible=…]` / arbitrary-variant class.

## The rule

Keep `"./frontend/src/**/*.{ts,tsx}"` in `tailwind.config.ts#content`. If a new source
tree is added, add it there as well, and re-check with:

```bash
npm run build
npm run check:css
```

## The guard: `scripts/check-css-classes.cjs`

`npm run build` now ends with this check, so a missing content glob fails the build
instead of shipping silently. It reads the **compiled** stylesheet from `dist/assets`
and every class token in the source, then reports any token with no matching selector.

- Class positions — `className="…"`, `classNames` / `activeClassName` / `*ClassName`
  attributes, and `cn`/`clsx`/`classnames`/`cx`/`twMerge`/`cva` arguments — are checked
  directly against the CSS. `group`/`peer` markers, comparison operands
  (`variant === "ghost"`), `defaultVariants`, and non-`class` keys of
  `compoundVariants` are skipped.
- Other string literals are only flagged when Tailwind itself accepts them as a utility
  (asked through Tailwind's own rule generator), so prose, ids and URLs cannot trip it.
- The scan roots (`src/`, `frontend/src/`, `index.html`; hardcoded, **not** read from the
  Tailwind config) are deliberately independent of `content`: if they followed the config,
  deleting a glob would also stop the check from looking at that tree — the exact failure
  it exists to catch.

```bash
npm run check:css                                  # dist/assets/*.css
node scripts/check-css-classes.cjs --css out.css   # a specific stylesheet
node scripts/check-css-classes.cjs --json          # machine-readable findings
```

Exit codes: `0` clean, `1` classes used in the source but missing from the CSS,
`2` the check could not run (no `dist/assets`, missing scan root, fewer than 50 source
files or 100 CSS classes — it refuses to report success on an empty scan).

Runtime-only classes that can never be seen by the scanner go in
[`scripts/css-class-allowlist.cjs`](../scripts/css-class-allowlist.cjs) as
`{ class: "…", why: "…" }`. Every entry needs a real reason; the current list only has
`toaster`, which sonner injects at runtime.

Regression-proof for the whole guard (build the CSS from a config whose `content` misses
`frontend/src`, then run the check) reports ~629 missing classes including `md:flex`
(`sidebar.tsx:195`), `md:p-7` (`AppLayout.tsx:132`) and
`group-data-[collapsible=icon]:hidden` (`sidebar.tsx:387`), and exits 1.

A dev-server symptom is easier to spot in the browser console:

```js
document.querySelector('[data-collapsible] .fixed')           // the desktop sidebar
getComputedStyle(document.querySelector('[data-collapsible] .fixed')).display   // "flex", not "none"
```

Fixed 2026-09-30.
