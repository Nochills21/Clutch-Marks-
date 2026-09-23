# Clutch Marks — Codebase Guide

Cambridge IGCSE / AS / A-Level study platform (Maths 0580/9709, Physics 0625/9702, CS 0478/9618). React + Vite + Supabase. Every source file starts with a one-line comment saying what it does — read that first.

## Layout

```
src/
  App.tsx                 All routes. Student pages sit behind ApprovalGate,
                          admin pages behind AdminRoute.
  lib/                    Framework-free logic (auth context, SEO metadata,
                          URL builders, upload validation, watermarking helpers).
  hooks/                  React hooks: useAuth (in lib/auth), useSubscription
                          (billing/plan gating), useMySubjects (subject picker),
                          useToast, useDevice.
  components/
    ui/                   shadcn/ui primitives — do not hand-edit.
    dashboards/           Role dashboards (student / admin / parent).
    admin/                Shared admin widgets (ContentEditor).
    *.tsx                 App-level components (gates, sidebar, watermark…).
  pages/                  One file per route, named after the route.
    admin/                One file per admin page (Admin*.tsx).
  integrations/supabase/  Generated client + Database types. types.ts must be
                          updated when the DB schema changes.
supabase/
  migrations/             Ordered SQL migrations (live DB = migrations + manual
                          fixes recorded here). All are idempotent.
  functions/              Edge functions (Deno): manage-accounts, resolve-login-email
                          (username login), serve-material (watermarking proxy),
                          study-planner, quiz-feedback, generate-questions,
                          promote-admin. Deploy with .freebuff/deploy-functions.cjs.
  base.sql                Golden schema snapshot for bootstrapping fresh projects.
.freebuff/                Ops tooling: content seeders, golden-dump.cjs,
                          auto-sync.cjs (hourly GitHub backup), pdftool.
                          NEVER commit get-keys.cjs (holds the Management token).
plugins/prerender-seo.ts  Build-time static <head> generation for crawlers.
```

## Key invariants

- **Roles**: `user_roles.role` ∈ admin | student | parent. Signup always creates a
  student (never trust client-sent role); only admins elevate.
- **Plan gating**: free plan = O Level only. AS/A2 pages are wrapped in `<PlanGate>`.
  Active subscription unlocks everything. Admins bypass.
- **File downloads** must go through `lib/contentFiles.ts` → `serve-material` edge
  function (signs + watermarks + audit-logs). Never expose storage URLs directly.
- **Audit trail**: DB triggers on all content tables write to `admin_audit_log`;
  content deletes and role changes also notify admins. Student quiz/homework
  activity is logged the same way.
- **Quizzes**: `questions.correct_option` is 0-based. Explanations follow the
  M1/A1/B1 mark-scheme convention.

## Commands

```sh
npm run dev        # Vite dev server on :8080
npm run build      # production build (runs prerender plugin)
npm run test       # vitest (password policy contract)
npx tsc --noEmit -p tsconfig.app.json   # typecheck
```

Bun is used for ops scripts (`.freebuff/*.cjs`); the bundled runtime path is in
`AGENTS.md`.
