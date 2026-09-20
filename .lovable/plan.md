

# Plan: Flashcard System + Calendar View

## 1. Database Changes (Migration)

**New tables:**

- **`flashcard_sets`** — `id`, `topic_id` (uuid, nullable), `title`, `description`, `created_at`, `updated_at`
  - RLS: Admins can manage (ALL), authenticated can view (SELECT)

- **`flashcards`** — `id`, `set_id` (references flashcard_sets), `front` (text), `back` (text), `sort_order`, `created_at`
  - RLS: Admins can manage (ALL), authenticated can view (SELECT)

- **`flashcard_progress`** — `id`, `user_id`, `flashcard_id`, `ease_factor` (float, default 2.5), `interval_days` (int, default 1), `repetitions` (int, default 0), `next_review_at` (timestamptz, default now()), `last_reviewed_at` (timestamptz)
  - RLS: Users can manage own records (SELECT/INSERT/UPDATE where user_id = auth.uid()), Admins can view all

No foreign keys to auth.users — topic_id references topics table conceptually but without FK constraint (matching existing pattern).

## 2. Admin: Manage Flashcard Sets

**New file: `src/pages/admin/AdminFlashcards.tsx`**
- List all flashcard sets with topic badge
- Create/edit dialog: title, description, topic selector
- Expand a set to manage individual cards (front/back pairs)
- Add/edit/delete cards inline

## 3. Student: Flashcard Study Page

**New file: `src/pages/Flashcards.tsx`**
- Browse flashcard sets filtered by topic
- Study mode: show front, click to flip, then rate difficulty (Again / Hard / Good / Easy)
- SM-2 spaced repetition algorithm updates `flashcard_progress` (ease_factor, interval, next_review_at)
- Dashboard shows cards due for review today

## 4. Calendar View Page

**New file: `src/pages/CalendarPage.tsx`**
- Monthly calendar grid built with existing date utilities
- Fetches and overlays:
  - Homework due dates (from `homework.due_date`)
  - Quiz dates (from `quizzes.created_at` for published quizzes)
  - Zoom lessons (from `lessons.zoom_url` where not null, using lesson date context)
- Color-coded dots/badges per event type
- Click a day to see details in a popover
- Week/month toggle

## 5. Navigation Updates

**`src/components/AppSidebar.tsx`**:
- Add "Flashcards" link for students (icon: `Layers`)
- Add "Calendar" link for students (icon: `Calendar`)
- Add "Manage Flashcards" link for admins

**`src/App.tsx`**:
- Add routes: `/flashcards`, `/calendar`, `/admin/flashcards`

## Technical Notes

- Spaced repetition uses SM-2 algorithm: after each review, update ease_factor, interval, and next_review_at client-side, then upsert to `flashcard_progress`
- Calendar uses a custom grid component (no external calendar library needed) — days of month rendered in a CSS grid with event indicators
- All new tables follow existing RLS patterns with `has_role()` checks

