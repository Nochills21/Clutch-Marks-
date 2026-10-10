-- ============================================================
-- Clutch Marks — golden base schema
-- Generated 2026-10-09T21:02:46.331Z from the live project (ref zzliiazovezhxbmfeqco).
-- Bootstraps a brand-new Supabase project to the identical schema:
--   structure, constraints, functions, triggers, RLS, grants, storage buckets.
-- NO row data (student records, content) is included by design.
-- Idempotent: safe to re-run; IF NOT EXISTS / OR REPLACE throughout.
-- ============================================================

create extension if not exists "uuid-ossp" with schema extensions;
create extension if not exists pgcrypto with schema extensions;
create extension if not exists moddatetime with schema extensions;

-- ============ enums ============
do $enum$ begin
  if not exists (select 1 from pg_type t join pg_namespace n on n.oid = t.typnamespace where n.nspname = 'public' and t.typname = 'app_role') then
    create type public."app_role" as enum ('admin', 'student', 'parent');
  end if;
end $enum$;
do $enum$ begin
  if not exists (select 1 from pg_type t join pg_namespace n on n.oid = t.typnamespace where n.nspname = 'public' and t.typname = 'subject_level') then
    create type public."subject_level" as enum ('OL', 'AS', 'A2');
  end if;
end $enum$;

-- ============ tables ============
create table if not exists public."_seed_fixes" (
  "key" text not null,
  "applied_at" timestamp with time zone default now(),
  constraint "_seed_fixes_pkey" PRIMARY KEY (key)
);
create table if not exists public."admin_audit_log" (
  "id" uuid default gen_random_uuid() not null,
  "actor_id" uuid,
  "actor_username" text,
  "action" text not null,
  "entity" text not null,
  "entity_id" uuid,
  "entity_label" text,
  "details" jsonb,
  "created_at" timestamp with time zone default now() not null,
  constraint "admin_audit_log_action_check" CHECK (action = ANY (ARRAY['create'::text, 'update'::text, 'delete'::text, 'approve'::text, 'reject'::text, 'role_change'::text, 'login'::text, 'download'::text, 'quiz_attempt'::text, 'homework_submission'::text, 'external_link_opened'::text, 'past_paper_link_check'::text])),
  constraint "admin_audit_log_pkey" PRIMARY KEY (id)
);
create table if not exists public."admin_audit_log_archive" (
  "id" uuid default gen_random_uuid() not null,
  "actor_id" uuid,
  "actor_username" text,
  "action" text not null,
  "entity" text not null,
  "entity_id" uuid,
  "entity_label" text,
  "details" jsonb,
  "created_at" timestamp with time zone default now() not null,
  constraint "admin_audit_log_action_check" CHECK (action = ANY (ARRAY['create'::text, 'update'::text, 'delete'::text, 'approve'::text, 'reject'::text, 'role_change'::text, 'login'::text, 'download'::text, 'quiz_attempt'::text, 'homework_submission'::text])),
  constraint "admin_audit_log_archive_pkey" PRIMARY KEY (id)
);
create table if not exists public."ai_audit_log" (
  "id" uuid default gen_random_uuid() not null,
  "user_id" uuid not null,
  "action" text not null,
  "input_hash" text,
  "model" text default 'unknown'::text not null,
  "provider" text default 'cloudflare'::text not null,
  "output_preview" text,
  "grade" numeric(10,0),
  "corrected_paper" jsonb,
  "cost_cents" numeric(10,0) default 0,
  "created_at" timestamp with time zone default now() not null,
  constraint "ai_audit_log_action_check" CHECK (action = ANY (ARRAY['plan'::text, 'correction'::text, 'paper_correction'::text])),
  constraint "ai_audit_log_pkey" PRIMARY KEY (id)
);
create table if not exists public."ai_correction" (
  "id" uuid default gen_random_uuid() not null,
  "user_id" uuid not null,
  "subject_level_id" uuid,
  "paper_text" text,
  "corrected_papers" jsonb,
  "overall_grade" numeric(10,0),
  "total_possible" integer,
  "total_earned" integer,
  "audit_ref" uuid,
  "model" text default 'unknown'::text not null,
  "created_at" timestamp with time zone default now() not null,
  "source" text default 'paste'::text not null,
  "answer_files" jsonb,
  "paper_ref" jsonb,
  constraint "ai_correction_pkey" PRIMARY KEY (id),
  constraint "ai_correction_source_check" CHECK (source = ANY (ARRAY['paste'::text, 'upload'::text, 'mixed'::text]))
);
create table if not exists public."announcements" (
  "id" uuid default gen_random_uuid() not null,
  "title" text not null,
  "content" text not null,
  "published_at" timestamp with time zone default now() not null,
  "created_at" timestamp with time zone default now() not null,
  "unread" boolean default true not null,
  constraint "announcements_no_replacement_character" CHECK (POSITION((chr(65533)) IN (title)) = 0 AND POSITION((chr(65533)) IN (COALESCE(content, ''::text))) = 0),
  constraint "announcements_pkey" PRIMARY KEY (id)
);
create table if not exists public."consent_records" (
  "id" uuid default gen_random_uuid() not null,
  "user_id" uuid not null,
  "kind" text not null,
  "document_version" text not null,
  "accepted_at" timestamp with time zone default now() not null,
  "source" text default 'signup'::text not null,
  constraint "consent_records_kind_check" CHECK (kind = ANY (ARRAY['privacy'::text, 'terms'::text, 'guardian'::text, 'marketing'::text])),
  constraint "consent_records_pkey" PRIMARY KEY (id),
  constraint "consent_records_unique_per_version" UNIQUE (user_id, kind, document_version)
);
create table if not exists public."content_feedback" (
  "id" uuid default gen_random_uuid() not null,
  "user_id" uuid default auth.uid() not null,
  "tool" text not null,
  "tool_label" text default ''::text not null,
  "rating" text,
  "message" text not null,
  "status" text default 'open'::text not null,
  "created_at" timestamp with time zone default now() not null,
  "resolved_at" timestamp with time zone,
  "resolved_by" uuid,
  constraint "content_feedback_message_check" CHECK (char_length(message) >= 1 AND char_length(message) <= 4000),
  constraint "content_feedback_pkey" PRIMARY KEY (id),
  constraint "content_feedback_rating_check" CHECK (rating = ANY (ARRAY['helpful'::text, 'unclear'::text, 'error'::text, 'suggestion'::text])),
  constraint "content_feedback_status_check" CHECK (status = ANY (ARRAY['open'::text, 'resolved'::text, 'dismissed'::text])),
  constraint "content_feedback_tool_check" CHECK (tool = ANY (ARRAY['notes'::text, 'quiz'::text, 'question'::text, 'flashcards'::text, 'past_papers'::text, 'planner'::text, 'lesson'::text, 'other'::text]))
);
create table if not exists public."content_file_versions" (
  "id" uuid default gen_random_uuid() not null,
  "entity_type" text not null,
  "entity_id" uuid not null,
  "slot" text default 'file'::text not null,
  "bucket" text not null,
  "file_path" text not null,
  "file_name" text not null,
  "version" integer default 1 not null,
  "uploaded_by" uuid default auth.uid() not null,
  "created_at" timestamp with time zone default now() not null,
  constraint "content_file_versions_pkey" PRIMARY KEY (id)
);
create table if not exists public."content_revisions" (
  "id" uuid default gen_random_uuid() not null,
  "entity_type" text not null,
  "entity_id" uuid not null,
  "title" text,
  "content" text,
  "extra" jsonb,
  "version" integer not null,
  "created_by" uuid,
  "created_by_username" text,
  "created_at" timestamp with time zone default now() not null,
  constraint "content_revisions_entity_type_check" CHECK (entity_type = ANY (ARRAY['lesson'::text, 'material'::text])),
  constraint "content_revisions_pkey" PRIMARY KEY (id)
);
create table if not exists public."data_requests" (
  "id" uuid default gen_random_uuid() not null,
  "user_id" uuid not null,
  "email" text,
  "kind" text default 'deletion'::text not null,
  "status" text default 'pending'::text not null,
  "note" text,
  "requested_at" timestamp with time zone default now() not null,
  "resolved_at" timestamp with time zone,
  "resolved_by" uuid,
  constraint "data_requests_kind_check" CHECK (kind = ANY (ARRAY['access'::text, 'correction'::text, 'deletion'::text, 'portability'::text, 'objection'::text])),
  constraint "data_requests_pkey" PRIMARY KEY (id),
  constraint "data_requests_status_check" CHECK (status = ANY (ARRAY['pending'::text, 'in_progress'::text, 'completed'::text, 'refused'::text]))
);
create table if not exists public."email_suppressions" (
  "email" text not null,
  "reason" text not null,
  "detail" text,
  "created_at" timestamp with time zone default now() not null,
  constraint "email_suppressions_pkey" PRIMARY KEY (email),
  constraint "email_suppressions_reason_check" CHECK (reason = ANY (ARRAY['bounce'::text, 'complaint'::text, 'admin'::text]))
);
create table if not exists public."feedback_messages" (
  "id" uuid default gen_random_uuid() not null,
  "feedback_id" uuid not null,
  "sender_id" uuid default auth.uid() not null,
  "body" text not null,
  "created_at" timestamp with time zone default now() not null,
  constraint "feedback_messages_body_check" CHECK (char_length(body) >= 1 AND char_length(body) <= 4000),
  constraint "feedback_messages_pkey" PRIMARY KEY (id)
);
create table if not exists public."login_lookup_throttle" (
  "client_key" text not null,
  "window_started_at" timestamp with time zone default now() not null,
  "attempts" integer default 0 not null,
  "updated_at" timestamp with time zone default now() not null,
  constraint "login_lookup_throttle_pkey" PRIMARY KEY (client_key)
);
create table if not exists public."notifications" (
  "id" uuid default gen_random_uuid() not null,
  "user_id" uuid not null,
  "title" text not null,
  "message" text not null,
  "read" boolean default false not null,
  "created_at" timestamp with time zone default now() not null,
  constraint "notifications_pkey" PRIMARY KEY (id)
);
create table if not exists public."parent_link_invites" (
  "id" uuid default gen_random_uuid() not null,
  "parent_email" text not null,
  "student_user_id" uuid not null,
  "created_at" timestamp with time zone default now() not null,
  constraint "parent_link_invites_parent_email_student_user_id_key" UNIQUE (parent_email, student_user_id),
  constraint "parent_link_invites_pkey" PRIMARY KEY (id)
);
create table if not exists public."plans" (
  "id" text not null,
  "name" text not null,
  "price_monthly" numeric(10,0) not null,
  "months" integer default 1 not null,
  "description" text,
  constraint "plans_pkey" PRIMARY KEY (id)
);
create table if not exists public."practice_attempts" (
  "id" uuid default gen_random_uuid() not null,
  "user_id" uuid not null,
  "question_id" uuid not null,
  "last_correct" boolean not null,
  "attempts_count" integer default 1 not null,
  "last_attempt_at" timestamp with time zone default now() not null,
  "created_at" timestamp with time zone default now() not null,
  constraint "practice_attempts_pkey" PRIMARY KEY (id),
  constraint "practice_attempts_user_id_question_id_key" UNIQUE (user_id, question_id)
);
create table if not exists public."profiles" (
  "id" uuid default gen_random_uuid() not null,
  "user_id" uuid not null,
  "full_name" text default ''::text not null,
  "avatar_url" text,
  "created_at" timestamp with time zone default now() not null,
  "updated_at" timestamp with time zone default now() not null,
  "username" text,
  "email" text,
  constraint "profiles_pkey" PRIMARY KEY (id),
  constraint "profiles_user_id_key" UNIQUE (user_id)
);
create table if not exists public."streaks" (
  "user_id" uuid not null,
  "current_streak" integer default 0 not null,
  "longest_streak" integer default 0 not null,
  "last_active" date,
  "updated_at" timestamp with time zone default now() not null,
  constraint "streaks_pkey" PRIMARY KEY (user_id)
);
create table if not exists public."student_prefs" (
  "user_id" uuid not null,
  "weekly_goal_days" integer default 3 not null,
  "session_minutes" integer default 20 not null,
  "leaderboard_visible" boolean default true not null,
  "reminders_enabled" boolean default true not null,
  "animations_enabled" boolean default true not null,
  "encouragement_enabled" boolean default true not null,
  "created_at" timestamp with time zone default now() not null,
  "updated_at" timestamp with time zone default now() not null,
  constraint "student_prefs_pkey" PRIMARY KEY (user_id),
  constraint "student_prefs_session_minutes_check" CHECK (session_minutes = ANY (ARRAY[10, 20, 30])),
  constraint "student_prefs_weekly_goal_days_check" CHECK (weekly_goal_days >= 1 AND weekly_goal_days <= 7)
);
create table if not exists public."study_plans" (
  "id" uuid default gen_random_uuid() not null,
  "user_id" uuid not null,
  "title" text not null,
  "content" text not null,
  "start_date" date,
  "end_date" date,
  "created_at" timestamp with time zone default now() not null,
  "updated_at" timestamp with time zone default now() not null,
  "subject_level_id" uuid,
  "ai_generated" boolean default false not null,
  "ai_model" text,
  constraint "study_plans_pkey" PRIMARY KEY (id)
);
create table if not exists public."study_sessions" (
  "id" uuid default gen_random_uuid() not null,
  "user_id" uuid not null,
  "planned_minutes" integer not null,
  "status" text default 'active'::text not null,
  "started_at" timestamp with time zone default now() not null,
  "ended_at" timestamp with time zone,
  constraint "study_sessions_pkey" PRIMARY KEY (id),
  constraint "study_sessions_planned_minutes_check" CHECK (planned_minutes = ANY (ARRAY[10, 20, 30])),
  constraint "study_sessions_status_check" CHECK (status = ANY (ARRAY['active'::text, 'completed'::text, 'set_aside'::text]))
);
create table if not exists public."subjects" (
  "id" uuid default gen_random_uuid() not null,
  "name" text not null,
  "slug" text not null,
  "description" text,
  "icon" text default 'BookOpen'::text not null,
  "color" text default 'primary'::text not null,
  "sort_order" integer default 0 not null,
  "is_active" boolean default true not null,
  "created_at" timestamp with time zone default now() not null,
  "updated_at" timestamp with time zone default now() not null,
  constraint "subjects_pkey" PRIMARY KEY (id),
  constraint "subjects_slug_key" UNIQUE (slug)
);
create table if not exists public."subscriptions" (
  "id" uuid default gen_random_uuid() not null,
  "user_id" uuid not null,
  "plan_id" text not null,
  "status" text default 'pending_payment'::text not null,
  "starts_at" timestamp with time zone,
  "ends_at" timestamp with time zone,
  "created_at" timestamp with time zone default now() not null,
  "updated_at" timestamp with time zone default now() not null,
  "payment_method" text,
  "full_name" text,
  "receipt_url" text,
  "receipt_path" text,
  constraint "subscriptions_pkey" PRIMARY KEY (id),
  constraint "subscriptions_status_check" CHECK (status = ANY (ARRAY['pending_payment'::text, 'active'::text, 'expired'::text, 'cancelled'::text]))
);
create table if not exists public."user_roles" (
  "id" uuid default gen_random_uuid() not null,
  "user_id" uuid not null,
  "role" public."app_role" default 'student'::app_role not null,
  "created_at" timestamp with time zone default now() not null,
  "is_approved" boolean default false not null,
  constraint "user_roles_pkey" PRIMARY KEY (id),
  constraint "user_roles_user_id_role_key" UNIQUE (user_id, role)
);
create table if not exists public."weekly_reports" (
  "id" uuid default gen_random_uuid() not null,
  "student_user_id" uuid not null,
  "file_url" text not null,
  "file_name" text not null,
  "week_label" text,
  "uploaded_at" timestamp with time zone default now() not null,
  "uploaded_by" uuid not null,
  constraint "weekly_reports_pkey" PRIMARY KEY (id)
);
create table if not exists public."xp_daily" (
  "user_id" uuid not null,
  "day" date default CURRENT_DATE not null,
  "tool" text not null,
  "points" integer default 0 not null,
  constraint "xp_daily_pkey" PRIMARY KEY (user_id, day, tool)
);
create table if not exists public."xp_events" (
  "id" uuid default gen_random_uuid() not null,
  "user_id" uuid not null,
  "tool" text not null,
  "ref" text not null,
  "points" integer not null,
  "created_at" timestamp with time zone default now() not null,
  constraint "xp_events_pkey" PRIMARY KEY (id)
);
create table if not exists public."announcement_reads" (
  "user_id" uuid not null,
  "announcement_id" uuid not null,
  "read_at" timestamp with time zone default now() not null,
  constraint "announcement_reads_pkey" PRIMARY KEY (user_id, announcement_id)
);
create table if not exists public."parent_student_links" (
  "id" uuid default gen_random_uuid() not null,
  "parent_id" uuid not null,
  "student_id" uuid not null,
  "created_at" timestamp with time zone default now() not null,
  constraint "parent_student_links_parent_id_student_id_key" UNIQUE (parent_id, student_id),
  constraint "parent_student_links_pkey" PRIMARY KEY (id)
);
create table if not exists public."subject_levels" (
  "id" uuid default gen_random_uuid() not null,
  "subject_id" uuid not null,
  "level" public."subject_level" not null,
  "description" text,
  "is_active" boolean default true not null,
  "sort_order" integer default 0 not null,
  "created_at" timestamp with time zone default now() not null,
  "updated_at" timestamp with time zone default now() not null,
  constraint "subject_levels_pkey" PRIMARY KEY (id),
  constraint "subject_levels_subject_id_level_key" UNIQUE (subject_id, level)
);
create table if not exists public."topics" (
  "id" uuid default gen_random_uuid() not null,
  "name" text not null,
  "description" text,
  "sort_order" integer default 0 not null,
  "created_at" timestamp with time zone default now() not null,
  "updated_at" timestamp with time zone default now() not null,
  "subject_level_id" uuid,
  "slug" text,
  constraint "topics_no_replacement_character" CHECK (POSITION((chr(65533)) IN (name)) = 0 AND POSITION((chr(65533)) IN (COALESCE(description, ''::text))) = 0),
  constraint "topics_pkey" PRIMARY KEY (id)
);
create table if not exists public."flashcard_sets" (
  "id" uuid default gen_random_uuid() not null,
  "topic_id" uuid,
  "title" text not null,
  "description" text,
  "created_at" timestamp with time zone default now() not null,
  "updated_at" timestamp with time zone default now() not null,
  constraint "flashcard_sets_no_replacement_character" CHECK (POSITION((chr(65533)) IN (title)) = 0 AND POSITION((chr(65533)) IN (COALESCE(description, ''::text))) = 0),
  constraint "flashcard_sets_pkey" PRIMARY KEY (id)
);
create table if not exists public."flashcards" (
  "id" uuid default gen_random_uuid() not null,
  "set_id" uuid not null,
  "front" text not null,
  "back" text not null,
  "sort_order" integer default 0 not null,
  "created_at" timestamp with time zone default now() not null,
  constraint "flashcards_no_replacement_character" CHECK (POSITION((chr(65533)) IN (front)) = 0 AND POSITION((chr(65533)) IN (back)) = 0),
  constraint "flashcards_pkey" PRIMARY KEY (id)
);
create table if not exists public."homework" (
  "id" uuid default gen_random_uuid() not null,
  "topic_id" uuid,
  "title" text not null,
  "description" text,
  "due_date" timestamp with time zone,
  "created_at" timestamp with time zone default now() not null,
  "updated_at" timestamp with time zone default now() not null,
  constraint "homework_pkey" PRIMARY KEY (id)
);
create table if not exists public."homework_submissions" (
  "id" uuid default gen_random_uuid() not null,
  "homework_id" uuid not null,
  "user_id" uuid not null,
  "content" text,
  "file_url" text,
  "status" text default 'pending'::text not null,
  "grade" text,
  "feedback" text,
  "submitted_at" timestamp with time zone default now() not null,
  "graded_at" timestamp with time zone,
  "correction_file_url" text,
  constraint "homework_submissions_homework_id_user_id_key" UNIQUE (homework_id, user_id),
  constraint "homework_submissions_pkey" PRIMARY KEY (id)
);
create table if not exists public."learning_objectives" (
  "id" uuid default gen_random_uuid() not null,
  "topic_id" uuid not null,
  "code" text not null,
  "statement" text not null,
  "teach" text,
  "sort_order" integer default 0 not null,
  "created_at" timestamp with time zone default now() not null,
  "updated_at" timestamp with time zone default now() not null,
  constraint "learning_objectives_pkey" PRIMARY KEY (id),
  constraint "learning_objectives_topic_id_code_key" UNIQUE (topic_id, code)
);
create table if not exists public."lessons" (
  "id" uuid default gen_random_uuid() not null,
  "topic_id" uuid not null,
  "title" text not null,
  "content" text,
  "video_url" text,
  "sort_order" integer default 0 not null,
  "created_at" timestamp with time zone default now() not null,
  "updated_at" timestamp with time zone default now() not null,
  "zoom_url" text,
  constraint "lessons_no_replacement_character" CHECK (POSITION((chr(65533)) IN (title)) = 0 AND POSITION((chr(65533)) IN (COALESCE(content, ''::text))) = 0),
  constraint "lessons_pkey" PRIMARY KEY (id)
);
create table if not exists public."objective_reviews" (
  "user_id" uuid not null,
  "objective_id" uuid not null,
  "stage" integer default 0 not null,
  "reviews" integer default 0 not null,
  "lapses" integer default 0 not null,
  "last_correct" boolean,
  "last_reviewed_at" timestamp with time zone default now() not null,
  "due_at" timestamp with time zone default now() not null,
  "created_at" timestamp with time zone default now() not null,
  "updated_at" timestamp with time zone default now() not null,
  constraint "objective_reviews_pkey" PRIMARY KEY (user_id, objective_id)
);
create table if not exists public."past_papers" (
  "id" uuid default gen_random_uuid() not null,
  "title" text not null,
  "year" integer not null,
  "session" text,
  "paper_number" text,
  "topic_id" uuid,
  "paper_url" text,
  "mark_scheme_url" text,
  "created_at" timestamp with time zone default now() not null,
  "updated_at" timestamp with time zone default now() not null,
  "source_url" text,
  "subject_slug" text,
  "level" public."subject_level",
  constraint "past_papers_no_replacement_character" CHECK (POSITION((chr(65533)) IN (title)) = 0),
  constraint "past_papers_pkey" PRIMARY KEY (id)
);
create table if not exists public."quizzes" (
  "id" uuid default gen_random_uuid() not null,
  "topic_id" uuid,
  "title" text not null,
  "description" text,
  "time_limit_minutes" integer,
  "is_published" boolean default false not null,
  "created_at" timestamp with time zone default now() not null,
  "updated_at" timestamp with time zone default now() not null,
  "exam_type" text default 'quiz'::text not null,
  "is_ai_generated" boolean default false not null,
  "exam_file_url" text,
  "correction_file_url" text,
  constraint "quizzes_no_replacement_character" CHECK (POSITION((chr(65533)) IN (title)) = 0 AND POSITION((chr(65533)) IN (COALESCE(description, ''::text))) = 0),
  constraint "quizzes_pkey" PRIMARY KEY (id)
);
create table if not exists public."student_subject_prefs" (
  "user_id" uuid not null,
  "subject_level_id" uuid not null,
  "created_at" timestamp with time zone default now() not null,
  constraint "student_subject_prefs_pkey" PRIMARY KEY (user_id, subject_level_id)
);
create table if not exists public."study_materials" (
  "id" uuid default gen_random_uuid() not null,
  "topic_id" uuid,
  "title" text not null,
  "content" text,
  "material_type" text default 'note'::text not null,
  "created_at" timestamp with time zone default now() not null,
  "updated_at" timestamp with time zone default now() not null,
  "file_url" text,
  "preview_url" text,
  "page_count" integer,
  "source_range" text,
  constraint "study_materials_material_type_check" CHECK (material_type = ANY (ARRAY['notes'::text, 'summary'::text, 'flashcard'::text, 'note'::text, 'exam-technique'::text, 'exam_technique'::text])),
  constraint "study_materials_no_replacement_character" CHECK (POSITION((chr(65533)) IN (title)) = 0 AND POSITION((chr(65533)) IN (COALESCE(content, ''::text))) = 0),
  constraint "study_materials_pkey" PRIMARY KEY (id)
);
create table if not exists public."syllabus_statements" (
  "id" uuid default gen_random_uuid() not null,
  "board" text not null,
  "spec_code" text not null,
  "level" text not null,
  "code" text not null,
  "title" text default ''::text not null,
  "area" text,
  "tier" text default 'both'::text not null,
  "subject_level_id" uuid,
  "topic_id" uuid,
  "source_url" text,
  "syllabus_years" text,
  "sort_order" integer default 0 not null,
  "created_at" timestamp with time zone default now() not null,
  "updated_at" timestamp with time zone default now() not null,
  constraint "syllabus_statements_board_spec_code_code_key" UNIQUE (board, spec_code, code),
  constraint "syllabus_statements_pkey" PRIMARY KEY (id)
);
create table if not exists public."bookmarks" (
  "id" uuid default gen_random_uuid() not null,
  "user_id" uuid not null,
  "material_id" uuid not null,
  "created_at" timestamp with time zone default now() not null,
  constraint "bookmarks_pkey" PRIMARY KEY (id),
  constraint "bookmarks_user_id_material_id_key" UNIQUE (user_id, material_id)
);
create table if not exists public."flashcard_progress" (
  "id" uuid default gen_random_uuid() not null,
  "user_id" uuid not null,
  "flashcard_id" uuid not null,
  "ease_factor" double precision default 2.5 not null,
  "interval_days" integer default 1 not null,
  "repetitions" integer default 0 not null,
  "next_review_at" timestamp with time zone default now() not null,
  "last_reviewed_at" timestamp with time zone,
  constraint "flashcard_progress_pkey" PRIMARY KEY (id),
  constraint "flashcard_progress_user_id_flashcard_id_key" UNIQUE (user_id, flashcard_id)
);
create table if not exists public."lesson_progress" (
  "id" uuid default gen_random_uuid() not null,
  "user_id" uuid not null,
  "lesson_id" uuid not null,
  "completed" boolean default false not null,
  "completed_at" timestamp with time zone,
  "created_at" timestamp with time zone default now() not null,
  constraint "lesson_progress_pkey" PRIMARY KEY (id),
  constraint "lesson_progress_user_id_lesson_id_key" UNIQUE (user_id, lesson_id)
);
create table if not exists public."material_progress" (
  "id" uuid default gen_random_uuid() not null,
  "user_id" uuid not null,
  "material_id" uuid not null,
  "completed" boolean default false not null,
  "completed_at" timestamp with time zone,
  "created_at" timestamp with time zone default now() not null,
  "updated_at" timestamp with time zone default now() not null,
  constraint "material_progress_pkey" PRIMARY KEY (id),
  constraint "material_progress_user_id_material_id_key" UNIQUE (user_id, material_id)
);
create table if not exists public."past_paper_attempts" (
  "id" uuid default gen_random_uuid() not null,
  "user_id" uuid not null,
  "paper_id" uuid,
  "paper_title" text not null,
  "session" text,
  "year" integer,
  "paper_number" text,
  "score" integer default 0 not null,
  "total_marks" integer default 0 not null,
  "percentage" integer,
  "duration_seconds" integer,
  "time_limit_seconds" integer,
  "corrected_papers" jsonb,
  "xp_earned" integer default 0 not null,
  "created_at" timestamp with time zone default now() not null,
  constraint "past_paper_attempts_pkey" PRIMARY KEY (id)
);
create table if not exists public."past_paper_link_checks" (
  "id" uuid default gen_random_uuid() not null,
  "paper_id" uuid,
  "slot" text not null,
  "url" text not null,
  "host" text,
  "session" text,
  "year" integer,
  "status" integer,
  "content_type" text,
  "ok" boolean default false not null,
  "error" text,
  "source" text default 'verify'::text not null,
  "checked_at" timestamp with time zone default now() not null,
  "review_status" text default 'pending'::text not null,
  "reviewed_at" timestamp with time zone,
  "reviewed_by" uuid,
  "created_paper_id" uuid,
  "source_code" text,
  "file_name" text,
  constraint "past_paper_link_checks_pkey" PRIMARY KEY (id),
  constraint "past_paper_link_checks_review_status_check" CHECK (review_status = ANY (ARRAY['pending'::text, 'approved'::text, 'dismissed'::text, 'resolved'::text])),
  constraint "past_paper_link_checks_slot_check" CHECK (slot = ANY (ARRAY['paper'::text, 'mark_scheme'::text, 'candidate'::text])),
  constraint "past_paper_link_checks_source_check" CHECK (source = ANY (ARRAY['verify'::text, 'pmt-harvest'::text]))
);
create table if not exists public."questions" (
  "id" uuid default gen_random_uuid() not null,
  "quiz_id" uuid not null,
  "question_text" text not null,
  "options" jsonb default '[]'::jsonb not null,
  "correct_option" integer default 0 not null,
  "explanation" text,
  "sort_order" integer default 0 not null,
  "created_at" timestamp with time zone default now() not null,
  "difficulty" text default 'medium'::text not null,
  "objective_id" uuid,
  "statement_id" uuid,
  constraint "questions_answer_index_in_range" CHECK (correct_option >= 0 AND
CASE
    WHEN jsonb_typeof(options) = 'array'::text THEN correct_option < jsonb_array_length(options)
    ELSE false
END),
  constraint "questions_no_replacement_character" CHECK (POSITION((chr(65533)) IN (question_text)) = 0 AND POSITION((chr(65533)) IN (COALESCE(explanation, ''::text))) = 0 AND POSITION((chr(65533)) IN (options::text)) = 0),
  constraint "questions_pkey" PRIMARY KEY (id)
);
create table if not exists public."quiz_attempts" (
  "id" uuid default gen_random_uuid() not null,
  "user_id" uuid not null,
  "quiz_id" uuid not null,
  "score" integer,
  "total_questions" integer,
  "started_at" timestamp with time zone default now() not null,
  "completed_at" timestamp with time zone,
  "answers" jsonb default '[]'::jsonb,
  "created_at" timestamp with time zone default now() not null,
  "submission_file_url" text,
  "correction_file_url" text,
  constraint "quiz_attempts_pkey" PRIMARY KEY (id)
);
create table if not exists public."question_bookmarks" (
  "id" uuid default gen_random_uuid() not null,
  "user_id" uuid not null,
  "question_id" uuid not null,
  "note" text,
  "created_at" timestamp with time zone default now() not null,
  constraint "question_bookmarks_pkey" PRIMARY KEY (id),
  constraint "question_bookmarks_user_id_question_id_key" UNIQUE (user_id, question_id)
);

-- ============ indexes ============
create index if not exists admin_audit_log_actor_idx ON public.admin_audit_log USING btree (actor_id, created_at DESC);
create index if not exists admin_audit_log_created_at_idx ON public.admin_audit_log USING btree (created_at DESC);
create index if not exists admin_audit_log_entity_idx ON public.admin_audit_log USING btree (entity, created_at DESC);
create index if not exists admin_audit_log_archive_actor_id_created_at_idx ON public.admin_audit_log_archive USING btree (actor_id, created_at DESC);
create index if not exists admin_audit_log_archive_created_at_idx ON public.admin_audit_log_archive USING btree (created_at DESC);
create index if not exists admin_audit_log_archive_entity_created_at_idx ON public.admin_audit_log_archive USING btree (entity, created_at DESC);
create index if not exists ai_correction_user_created ON public.ai_correction USING btree (user_id, created_at DESC);
create index if not exists announcement_reads_user_idx ON public.announcement_reads USING btree (user_id);
create index if not exists idx_consent_records_user ON public.consent_records USING btree (user_id);
create index if not exists idx_content_feedback_created ON public.content_feedback USING btree (created_at DESC);
create index if not exists idx_content_feedback_status ON public.content_feedback USING btree (status, created_at DESC);
create index if not exists content_file_versions_entity_idx ON public.content_file_versions USING btree (entity_type, entity_id, slot, version DESC);
create index if not exists content_revisions_created_at_idx ON public.content_revisions USING btree (created_at DESC);
create index if not exists content_revisions_entity_idx ON public.content_revisions USING btree (entity_type, entity_id, version DESC);
create index if not exists idx_data_requests_open ON public.data_requests USING btree (status, requested_at DESC);
create index if not exists idx_feedback_messages_thread ON public.feedback_messages USING btree (feedback_id, created_at);
create index if not exists idx_learning_objectives_topic ON public.learning_objectives USING btree (topic_id, sort_order);
create index if not exists idx_objective_reviews_due ON public.objective_reviews USING btree (user_id, due_at);
create index if not exists past_paper_attempts_paper_idx ON public.past_paper_attempts USING btree (paper_id, created_at DESC);
create index if not exists past_paper_attempts_user_idx ON public.past_paper_attempts USING btree (user_id, created_at DESC);
create index if not exists past_paper_link_checks_ok_idx ON public.past_paper_link_checks USING btree (ok);
create index if not exists past_paper_link_checks_review_idx ON public.past_paper_link_checks USING btree (review_status, slot, ok);
create UNIQUE index if not exists past_paper_link_checks_url_slot_key ON public.past_paper_link_checks USING btree (slot, url);
create index if not exists past_papers_level_idx ON public.past_papers USING btree (level);
create index if not exists past_papers_subject_level_idx ON public.past_papers USING btree (subject_slug, level);
create index if not exists past_papers_topic_idx ON public.past_papers USING btree (topic_id);
create index if not exists past_papers_year_idx ON public.past_papers USING btree (year DESC);
create index if not exists idx_practice_attempts_user ON public.practice_attempts USING btree (user_id);
create UNIQUE index if not exists profiles_email_unique_idx ON public.profiles USING btree (lower(email)) WHERE (email IS NOT NULL);
create UNIQUE index if not exists profiles_username_unique_idx ON public.profiles USING btree (lower(username)) WHERE (username IS NOT NULL);
create index if not exists idx_question_bookmarks_user ON public.question_bookmarks USING btree (user_id);
create index if not exists idx_questions_objective ON public.questions USING btree (objective_id);
create index if not exists idx_questions_statement ON public.questions USING btree (statement_id);
create index if not exists idx_student_subject_prefs_user ON public.student_subject_prefs USING btree (user_id);
create UNIQUE index if not exists study_sessions_one_active ON public.study_sessions USING btree (user_id) WHERE (status = 'active'::text);
create index if not exists study_sessions_user_time ON public.study_sessions USING btree (user_id, started_at DESC);
create index if not exists idx_subscriptions_status ON public.subscriptions USING btree (status);
create index if not exists idx_subscriptions_user ON public.subscriptions USING btree (user_id);
create index if not exists idx_syllabus_statements_spec ON public.syllabus_statements USING btree (spec_code, level, sort_order);
create index if not exists idx_syllabus_statements_topic ON public.syllabus_statements USING btree (topic_id);
create index if not exists topics_subject_level_id_idx ON public.topics USING btree (subject_level_id);
create UNIQUE index if not exists topics_subject_level_slug_key ON public.topics USING btree (subject_level_id, slug);
create UNIQUE index if not exists xp_events_dedupe ON public.xp_events USING btree (user_id, tool, ref);
create index if not exists xp_events_time ON public.xp_events USING btree (created_at DESC);
create index if not exists xp_events_user_time ON public.xp_events USING btree (user_id, created_at DESC);

-- ============ foreign keys ============
alter table public."announcement_reads" drop constraint if exists "announcement_reads_announcement_id_fkey";
alter table public."announcement_reads" add constraint "announcement_reads_announcement_id_fkey" FOREIGN KEY (announcement_id) REFERENCES announcements(id) ON DELETE CASCADE;
alter table public."announcement_reads" drop constraint if exists "announcement_reads_user_id_fkey";
alter table public."announcement_reads" add constraint "announcement_reads_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
alter table public."bookmarks" drop constraint if exists "bookmarks_material_id_fkey";
alter table public."bookmarks" add constraint "bookmarks_material_id_fkey" FOREIGN KEY (material_id) REFERENCES study_materials(id) ON DELETE CASCADE;
alter table public."bookmarks" drop constraint if exists "bookmarks_user_id_fkey";
alter table public."bookmarks" add constraint "bookmarks_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
alter table public."consent_records" drop constraint if exists "consent_records_user_id_fkey";
alter table public."consent_records" add constraint "consent_records_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
alter table public."content_feedback" drop constraint if exists "content_feedback_resolved_by_fkey";
alter table public."content_feedback" add constraint "content_feedback_resolved_by_fkey" FOREIGN KEY (resolved_by) REFERENCES auth.users(id) ON DELETE SET NULL;
alter table public."content_feedback" drop constraint if exists "content_feedback_user_id_fkey";
alter table public."content_feedback" add constraint "content_feedback_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
alter table public."data_requests" drop constraint if exists "data_requests_user_id_fkey";
alter table public."data_requests" add constraint "data_requests_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
alter table public."feedback_messages" drop constraint if exists "feedback_messages_feedback_id_fkey";
alter table public."feedback_messages" add constraint "feedback_messages_feedback_id_fkey" FOREIGN KEY (feedback_id) REFERENCES content_feedback(id) ON DELETE CASCADE;
alter table public."feedback_messages" drop constraint if exists "feedback_messages_sender_id_fkey";
alter table public."feedback_messages" add constraint "feedback_messages_sender_id_fkey" FOREIGN KEY (sender_id) REFERENCES auth.users(id) ON DELETE CASCADE;
alter table public."flashcard_progress" drop constraint if exists "flashcard_progress_flashcard_id_fkey";
alter table public."flashcard_progress" add constraint "flashcard_progress_flashcard_id_fkey" FOREIGN KEY (flashcard_id) REFERENCES flashcards(id) ON DELETE CASCADE;
alter table public."flashcard_sets" drop constraint if exists "flashcard_sets_topic_id_fkey";
alter table public."flashcard_sets" add constraint "flashcard_sets_topic_id_fkey" FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE SET NULL;
alter table public."flashcards" drop constraint if exists "flashcards_set_id_fkey";
alter table public."flashcards" add constraint "flashcards_set_id_fkey" FOREIGN KEY (set_id) REFERENCES flashcard_sets(id) ON DELETE CASCADE;
alter table public."homework_submissions" drop constraint if exists "homework_submissions_homework_id_fkey";
alter table public."homework_submissions" add constraint "homework_submissions_homework_id_fkey" FOREIGN KEY (homework_id) REFERENCES homework(id) ON DELETE CASCADE;
alter table public."homework_submissions" drop constraint if exists "homework_submissions_user_id_fkey";
alter table public."homework_submissions" add constraint "homework_submissions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
alter table public."homework" drop constraint if exists "homework_topic_id_fkey";
alter table public."homework" add constraint "homework_topic_id_fkey" FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE;
alter table public."learning_objectives" drop constraint if exists "learning_objectives_topic_id_fkey";
alter table public."learning_objectives" add constraint "learning_objectives_topic_id_fkey" FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE;
alter table public."lesson_progress" drop constraint if exists "lesson_progress_lesson_id_fkey";
alter table public."lesson_progress" add constraint "lesson_progress_lesson_id_fkey" FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE;
alter table public."lesson_progress" drop constraint if exists "lesson_progress_user_id_fkey";
alter table public."lesson_progress" add constraint "lesson_progress_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
alter table public."lessons" drop constraint if exists "lessons_topic_id_fkey";
alter table public."lessons" add constraint "lessons_topic_id_fkey" FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE;
alter table public."material_progress" drop constraint if exists "material_progress_material_id_fkey";
alter table public."material_progress" add constraint "material_progress_material_id_fkey" FOREIGN KEY (material_id) REFERENCES study_materials(id) ON DELETE CASCADE;
alter table public."material_progress" drop constraint if exists "material_progress_user_id_fkey";
alter table public."material_progress" add constraint "material_progress_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
alter table public."notifications" drop constraint if exists "notifications_user_id_fkey";
alter table public."notifications" add constraint "notifications_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
alter table public."objective_reviews" drop constraint if exists "objective_reviews_objective_id_fkey";
alter table public."objective_reviews" add constraint "objective_reviews_objective_id_fkey" FOREIGN KEY (objective_id) REFERENCES learning_objectives(id) ON DELETE CASCADE;
alter table public."objective_reviews" drop constraint if exists "objective_reviews_user_id_fkey";
alter table public."objective_reviews" add constraint "objective_reviews_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
alter table public."parent_link_invites" drop constraint if exists "parent_link_invites_student_user_id_fkey";
alter table public."parent_link_invites" add constraint "parent_link_invites_student_user_id_fkey" FOREIGN KEY (student_user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
alter table public."parent_student_links" drop constraint if exists "parent_student_links_parent_fk";
alter table public."parent_student_links" add constraint "parent_student_links_parent_fk" FOREIGN KEY (parent_id) REFERENCES profiles(user_id) ON DELETE CASCADE;
alter table public."parent_student_links" drop constraint if exists "parent_student_links_parent_id_fkey";
alter table public."parent_student_links" add constraint "parent_student_links_parent_id_fkey" FOREIGN KEY (parent_id) REFERENCES auth.users(id) ON DELETE CASCADE;
alter table public."parent_student_links" drop constraint if exists "parent_student_links_student_fk";
alter table public."parent_student_links" add constraint "parent_student_links_student_fk" FOREIGN KEY (student_id) REFERENCES profiles(user_id) ON DELETE CASCADE;
alter table public."parent_student_links" drop constraint if exists "parent_student_links_student_id_fkey";
alter table public."parent_student_links" add constraint "parent_student_links_student_id_fkey" FOREIGN KEY (student_id) REFERENCES auth.users(id) ON DELETE CASCADE;
alter table public."past_paper_attempts" drop constraint if exists "past_paper_attempts_paper_id_fkey";
alter table public."past_paper_attempts" add constraint "past_paper_attempts_paper_id_fkey" FOREIGN KEY (paper_id) REFERENCES past_papers(id) ON DELETE SET NULL;
alter table public."past_paper_attempts" drop constraint if exists "past_paper_attempts_user_id_fkey";
alter table public."past_paper_attempts" add constraint "past_paper_attempts_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
alter table public."past_paper_link_checks" drop constraint if exists "past_paper_link_checks_created_paper_id_fkey";
alter table public."past_paper_link_checks" add constraint "past_paper_link_checks_created_paper_id_fkey" FOREIGN KEY (created_paper_id) REFERENCES past_papers(id) ON DELETE SET NULL;
alter table public."past_paper_link_checks" drop constraint if exists "past_paper_link_checks_paper_id_fkey";
alter table public."past_paper_link_checks" add constraint "past_paper_link_checks_paper_id_fkey" FOREIGN KEY (paper_id) REFERENCES past_papers(id) ON DELETE CASCADE;
alter table public."past_papers" drop constraint if exists "past_papers_topic_id_fkey";
alter table public."past_papers" add constraint "past_papers_topic_id_fkey" FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE SET NULL;
alter table public."profiles" drop constraint if exists "profiles_user_id_fkey";
alter table public."profiles" add constraint "profiles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
alter table public."question_bookmarks" drop constraint if exists "question_bookmarks_question_id_fkey";
alter table public."question_bookmarks" add constraint "question_bookmarks_question_id_fkey" FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE;
alter table public."questions" drop constraint if exists "questions_objective_id_fkey";
alter table public."questions" add constraint "questions_objective_id_fkey" FOREIGN KEY (objective_id) REFERENCES learning_objectives(id) ON DELETE SET NULL;
alter table public."questions" drop constraint if exists "questions_quiz_id_fkey";
alter table public."questions" add constraint "questions_quiz_id_fkey" FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE;
alter table public."questions" drop constraint if exists "questions_statement_id_fkey";
alter table public."questions" add constraint "questions_statement_id_fkey" FOREIGN KEY (statement_id) REFERENCES syllabus_statements(id) ON DELETE SET NULL;
alter table public."quiz_attempts" drop constraint if exists "quiz_attempts_quiz_id_fkey";
alter table public."quiz_attempts" add constraint "quiz_attempts_quiz_id_fkey" FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE;
alter table public."quiz_attempts" drop constraint if exists "quiz_attempts_user_id_fkey";
alter table public."quiz_attempts" add constraint "quiz_attempts_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
alter table public."quizzes" drop constraint if exists "quizzes_topic_id_fkey";
alter table public."quizzes" add constraint "quizzes_topic_id_fkey" FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE;
alter table public."streaks" drop constraint if exists "streaks_user_id_fkey";
alter table public."streaks" add constraint "streaks_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
alter table public."student_prefs" drop constraint if exists "student_prefs_user_id_fkey";
alter table public."student_prefs" add constraint "student_prefs_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
alter table public."student_subject_prefs" drop constraint if exists "student_subject_prefs_subject_level_id_fkey";
alter table public."student_subject_prefs" add constraint "student_subject_prefs_subject_level_id_fkey" FOREIGN KEY (subject_level_id) REFERENCES subject_levels(id) ON DELETE CASCADE;
alter table public."student_subject_prefs" drop constraint if exists "student_subject_prefs_user_id_fkey";
alter table public."student_subject_prefs" add constraint "student_subject_prefs_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
alter table public."study_materials" drop constraint if exists "study_materials_topic_id_fkey";
alter table public."study_materials" add constraint "study_materials_topic_id_fkey" FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE;
alter table public."study_sessions" drop constraint if exists "study_sessions_user_id_fkey";
alter table public."study_sessions" add constraint "study_sessions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
alter table public."subject_levels" drop constraint if exists "subject_levels_subject_id_fkey";
alter table public."subject_levels" add constraint "subject_levels_subject_id_fkey" FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE;
alter table public."subscriptions" drop constraint if exists "subscriptions_plan_id_fkey";
alter table public."subscriptions" add constraint "subscriptions_plan_id_fkey" FOREIGN KEY (plan_id) REFERENCES plans(id);
alter table public."subscriptions" drop constraint if exists "subscriptions_profiles_fk";
alter table public."subscriptions" add constraint "subscriptions_profiles_fk" FOREIGN KEY (user_id) REFERENCES profiles(user_id) ON DELETE CASCADE;
alter table public."subscriptions" drop constraint if exists "subscriptions_user_id_fkey";
alter table public."subscriptions" add constraint "subscriptions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
alter table public."syllabus_statements" drop constraint if exists "syllabus_statements_subject_level_id_fkey";
alter table public."syllabus_statements" add constraint "syllabus_statements_subject_level_id_fkey" FOREIGN KEY (subject_level_id) REFERENCES subject_levels(id) ON DELETE SET NULL;
alter table public."syllabus_statements" drop constraint if exists "syllabus_statements_topic_id_fkey";
alter table public."syllabus_statements" add constraint "syllabus_statements_topic_id_fkey" FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE SET NULL;
alter table public."topics" drop constraint if exists "topics_subject_level_id_fkey";
alter table public."topics" add constraint "topics_subject_level_id_fkey" FOREIGN KEY (subject_level_id) REFERENCES subject_levels(id) ON DELETE SET NULL;
alter table public."user_roles" drop constraint if exists "user_roles_user_id_fkey";
alter table public."user_roles" add constraint "user_roles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
alter table public."xp_daily" drop constraint if exists "xp_daily_user_id_fkey";
alter table public."xp_daily" add constraint "xp_daily_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
alter table public."xp_events" drop constraint if exists "xp_events_user_id_fkey";
alter table public."xp_events" add constraint "xp_events_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- ============ functions ============
CREATE OR REPLACE FUNCTION public.approve_paper_candidate(p_check_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  _uid uuid := auth.uid();
  _c record;
  _title text;
  _paper_id uuid;
begin
  if _uid is null then raise exception 'Not authenticated'; end if;
  if not public.has_role(_uid, 'admin') then raise exception 'Admin only'; end if;

  select * into _c from public.past_paper_link_checks where id = p_check_id for update;
  if _c.id is null then raise exception 'Candidate not found'; end if;
  if _c.slot <> 'candidate' then raise exception 'Not a candidate row'; end if;
  if _c.review_status <> 'pending' then raise exception 'Already reviewed'; end if;
  if _c.year is null then raise exception 'Candidate has no year to place it in the archive'; end if;

  _title := coalesce(
    nullif(
      concat_ws(
        ' — ',
        nullif(trim(coalesce(_c.source_code, '')), ''),
        nullif(trim(regexp_replace(coalesce(_c.file_name, ''), '\.pdf$', '', 'i')), '')
      ),
      ''
    ),
    'New sitting' || case when _c.session is not null then ' ' || _c.session else '' end
  );

  -- Untagged draft: hidden from students (the student list drops rows with no
  -- topic_id) and the file is still ours to attach.
  insert into public.past_papers (title, year, session, paper_number, topic_id, subject_slug, level, paper_url, mark_scheme_url, source_url)
  values (_title, _c.year, _c.session, null, null, null, null, null, null, _c.url)
  returning id into _paper_id;

  update public.past_paper_link_checks
    set review_status = 'approved', reviewed_at = now(), reviewed_by = _uid, created_paper_id = _paper_id
    where id = p_check_id;

  perform public.audit_admin_action(
    p_action := 'approve',
    p_entity := 'past_paper_candidate',
    p_entity_id := _paper_id,
    p_entity_label := left(_title, 200),
    p_details := jsonb_build_object(
      'check_id', p_check_id,
      'url', _c.url,
      'session', _c.session,
      'year', _c.year,
      'source_code', _c.source_code
    ),
    p_actor_id := _uid,
    p_actor_username := null
  );

  return jsonb_build_object('paper_id', _paper_id, 'title', _title);
end;
$function$;

CREATE OR REPLACE FUNCTION public.archive_old_audit_entries(p_batch integer DEFAULT 5000)
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_cutoff timestamptz := now() - interval '12 months';
  v_moved  integer := 0;
  v_chunk  integer;
BEGIN
  LOOP
    WITH picked AS (
      SELECT id FROM public.admin_audit_log
      WHERE created_at < v_cutoff
      ORDER BY created_at
      FOR UPDATE SKIP LOCKED
      LIMIT p_batch
    ),
    ins AS (
      INSERT INTO public.admin_audit_log_archive
      SELECT l.* FROM public.admin_audit_log l JOIN picked USING (id)
      RETURNING 1
    ),
    del AS (
      DELETE FROM public.admin_audit_log l USING picked WHERE l.id = picked.id
      RETURNING 1
    )
    SELECT count(*) INTO v_chunk FROM del;

    v_moved := v_moved + v_chunk;
    EXIT WHEN v_chunk < p_batch;
  END LOOP;
  RETURN v_moved;
END;
$function$;

CREATE OR REPLACE FUNCTION public.audit_admin_action(p_action text, p_entity text, p_entity_id uuid DEFAULT NULL::uuid, p_entity_label text DEFAULT NULL::text, p_details jsonb DEFAULT NULL::jsonb, p_actor_id uuid DEFAULT NULL::uuid, p_actor_username text DEFAULT NULL::text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_actor uuid;
  v_username text;
begin
  if p_action not in (
    'create','update','delete','approve','reject','role_change','login','download',
    'quiz_attempt','homework_submission','external_link_opened','past_paper_link_check'
  ) then
    raise exception 'audit_admin_action: invalid action %', p_action;
  end if;
  if p_entity is null or length(p_entity) > 64 then
    raise exception 'audit_admin_action: invalid entity';
  end if;

  select p.user_id, p.username into v_actor, v_username
  from public.profiles p where p.user_id = auth.uid();

  -- Service-role callers (edge functions) run without a user JWT; they must pass
  -- the acting user explicitly. Direct-JWT callers resolve via auth.uid().
  if v_actor is null then
    v_actor := p_actor_id;
    v_username := p_actor_username;
  end if;

  insert into public.admin_audit_log (actor_id, actor_username, action, entity, entity_id, entity_label, details)
  values (v_actor, v_username, p_action, p_entity, p_entity_id, p_entity_label, p_details);
end;
$function$;

CREATE OR REPLACE FUNCTION public.award_xp(p_user_id uuid, p_tool text, p_ref text, p_points integer, p_daily_cap integer, p_min_gap_seconds integer DEFAULT 0)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_today date := current_date;
  v_today_points integer;
  v_last_event timestamptz;
  v_paid integer;
begin
  if p_user_id is null or p_points is null or p_points <= 0 then
    return false;
  end if;
  -- Admins never earn XP: they aren't students and it blocks self-farming.
  if exists (select 1 from public.user_roles r where r.user_id = p_user_id and r.role = 'admin') then
    return false;
  end if;

  -- 4a. Dedupe: identical (user, tool, ref) already paid → no-op.
  insert into public.xp_events (user_id, tool, ref, points)
  values (p_user_id, p_tool, p_ref, p_points)
  on conflict (user_id, tool, ref) do nothing;

  if not found then
    return false;
  end if;

  -- 4b. Burst guard: too soon after the previous event.
  if p_min_gap_seconds > 0 then
    select max(created_at) into v_last_event from public.xp_events e
    where e.user_id = p_user_id and e.tool = p_tool and e.created_at < (select created_at from public.xp_events x where (x.user_id, x.tool, x.ref) = (p_user_id, p_tool, p_ref));
    if v_last_event is not null and now() - v_last_event < make_interval(secs => p_min_gap_seconds) then
      delete from public.xp_events where user_id = p_user_id and tool = p_tool and ref = p_ref;
      return false;
    end if;
  end if;

  -- 4c. Daily cap (points, not events — students can't game small awards).
  insert into public.xp_daily (user_id, day, tool, points) values (p_user_id, v_today, p_tool, 0)
  on conflict (user_id, day, tool) do nothing;
  select points into v_today_points from public.xp_daily
    where user_id = p_user_id and day = v_today and tool = p_tool for update;

  if v_today_points >= p_daily_cap then
    delete from public.xp_events where user_id = p_user_id and tool = p_tool and ref = p_ref;
    return false;
  end if;

  v_paid := least(p_points, p_daily_cap - v_today_points);
  update public.xp_daily set points = points + v_paid
    where user_id = p_user_id and day = v_today and tool = p_tool;
  update public.xp_events set points = v_paid
    where user_id = p_user_id and tool = p_tool and ref = p_ref;
  return v_paid > 0;
end;
$function$;

CREATE OR REPLACE FUNCTION public.browse_questions(_topic_id uuid DEFAULT NULL::uuid, _subject_level_id uuid DEFAULT NULL::uuid, _difficulty text DEFAULT NULL::text, _exam_type text DEFAULT NULL::text, _search text DEFAULT NULL::text, _limit integer DEFAULT 50, _offset integer DEFAULT 0)
 RETURNS TABLE(id uuid, quiz_id uuid, quiz_title text, question_text text, options jsonb, difficulty text, exam_type text, is_ai_generated boolean, topic_id uuid, topic_name text, bookmarked boolean, last_correct boolean, attempts_count integer)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT q.id, q.quiz_id, z.title, q.question_text, q.options,
         q.difficulty, z.exam_type, z.is_ai_generated,
         t.id, t.name,
         (qb.id IS NOT NULL), pa.last_correct, COALESCE(pa.attempts_count, 0)
  FROM public.questions q
  JOIN public.quizzes z ON z.id = q.quiz_id
  LEFT JOIN public.topics t ON t.id = z.topic_id
  LEFT JOIN public.question_bookmarks qb ON qb.question_id = q.id AND qb.user_id = auth.uid()
  LEFT JOIN public.practice_attempts pa ON pa.question_id = q.id AND pa.user_id = auth.uid()
  WHERE z.is_published = true
    AND (_topic_id IS NULL OR z.topic_id = _topic_id)
    AND (_subject_level_id IS NULL OR t.subject_level_id = _subject_level_id)
    AND (_difficulty IS NULL OR q.difficulty = _difficulty)
    AND (_exam_type IS NULL OR z.exam_type = _exam_type)
    AND (_search IS NULL OR _search = '' OR q.question_text ILIKE '%' || _search || '%' OR z.title ILIKE '%' || _search || '%')
    -- Signed-in callers still need an approved account; an anonymous caller
    -- (auth.uid() is null) gets published questions only, which is the same
    -- public-content rule the study pages and the sitemap already rely on.
    AND (auth.uid() IS NULL OR public.is_user_approved(auth.uid()))
  ORDER BY z.title, q.sort_order
  LIMIT GREATEST(1, LEAST(_limit, 200))
  OFFSET GREATEST(0, _offset);
$function$;

CREATE OR REPLACE FUNCTION public.check_practice_answer(_question_id uuid, _selected integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  _q record;
  _is_correct boolean;
  _prev_correct boolean;
  _first_try boolean;
  _xp integer := 0;
  _corrected boolean := false;
begin
  if auth.uid() is null then raise exception 'Not authenticated'; end if;
  if not public.is_user_approved(auth.uid()) then raise exception 'Account not approved'; end if;

  select q.correct_option, q.explanation
    into _q
  from public.questions q
  join public.quizzes z on z.id = q.quiz_id
  where q.id = _question_id and z.is_published = true;

  if not found then
    raise exception 'Question not found';
  end if;

  _is_correct := _selected = _q.correct_option;

  select pa.last_correct into _prev_correct
  from public.practice_attempts pa
  where pa.user_id = auth.uid() and pa.question_id = _question_id;

  insert into public.practice_attempts (user_id, question_id, last_correct, attempts_count, last_attempt_at)
  values (auth.uid(), _question_id, _is_correct, 1, now())
  on conflict (user_id, question_id) do update
    set last_correct = excluded.last_correct,
        attempts_count = public.practice_attempts.attempts_count + 1,
        last_attempt_at = now();

  _first_try := _prev_correct is null;

  if _is_correct then
    if public.award_xp(auth.uid(), 'practice', _question_id::text, 10, 100) then
      _xp := _xp + 10;
    end if;
    -- Turned a previous mistake around (never counted on a first attempt).
    if _prev_correct is false
       and public.award_xp(auth.uid(), 'mistake_fixed', _question_id::text, 15, 150) then
      _xp := _xp + 15;
      _corrected := true;
    end if;
    perform public.touch_streak(auth.uid());
  end if;

  return jsonb_build_object(
    'correct', _is_correct,
    'correct_option', _q.correct_option,
    'explanation', _q.explanation,
    'xp_earned', _xp,
    'corrected_mistake', _corrected,
    'first_attempt', _first_try
  );
end;
$function$;

CREATE OR REPLACE FUNCTION public.content_integrity_findings()
 RETURNS TABLE(category text, severity text, table_name text, row_id uuid, label text, field text, detail text, snippet text)
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  _uid uuid := auth.uid();
begin
  if _uid is null then raise exception 'Not authenticated'; end if;
  if not public.has_role(_uid, 'admin') then raise exception 'Admin only'; end if;

  return query

  -- ── 1. The Unicode replacement character in any student-visible field ──────
  select 'replacement_character'::text, 'error'::text, 'questions'::text, q.id,
         coalesce(z.title, left(q.question_text, 80)),
         f.field,
         'Contains the replacement character (U+FFFD) where a real character was',
         left(f.value, 200)
    from public.questions q
    left join public.quizzes z on z.id = q.quiz_id
    cross join lateral (values
      ('question_text', q.question_text),
      ('explanation', coalesce(q.explanation, '')),
      ('options', q.options::text)
    ) as f(field, value)
   where f.value like '%' || chr(65533) || '%'

  union all
  select 'replacement_character', 'error', 'quizzes', z.id, z.title, f.field,
         'Contains the replacement character (U+FFFD) where a real character was',
         left(f.value, 200)
    from public.quizzes z
    cross join lateral (values
      ('title', z.title),
      ('description', coalesce(z.description, ''))
    ) as f(field, value)
   where f.value like '%' || chr(65533) || '%'

  union all
  select 'replacement_character', 'error', 'topics', t.id, t.name, f.field,
         'Contains the replacement character (U+FFFD) where a real character was',
         left(f.value, 200)
    from public.topics t
    cross join lateral (values
      ('name', t.name),
      ('description', coalesce(t.description, ''))
    ) as f(field, value)
   where f.value like '%' || chr(65533) || '%'

  union all
  select 'replacement_character', 'error', 'lessons', l.id, l.title, f.field,
         'Contains the replacement character (U+FFFD) where a real character was',
         left(f.value, 200)
    from public.lessons l
    cross join lateral (values
      ('title', l.title),
      ('content', coalesce(l.content, ''))
    ) as f(field, value)
   where f.value like '%' || chr(65533) || '%'

  union all
  select 'replacement_character', 'error', 'study_materials', m.id, m.title, f.field,
         'Contains the replacement character (U+FFFD) where a real character was',
         left(f.value, 200)
    from public.study_materials m
    cross join lateral (values
      ('title', m.title),
      ('content', coalesce(m.content, ''))
    ) as f(field, value)
   where f.value like '%' || chr(65533) || '%'

  union all
  select 'replacement_character', 'error', 'flashcards', c.id,
         coalesce(s.title, left(c.front, 80)), f.field,
         'Contains the replacement character (U+FFFD) where a real character was',
         left(f.value, 200)
    from public.flashcards c
    left join public.flashcard_sets s on s.id = c.set_id
    cross join lateral (values
      ('front', c.front),
      ('back', c.back)
    ) as f(field, value)
   where f.value like '%' || chr(65533) || '%'

  union all
  select 'replacement_character', 'error', 'flashcard_sets', s.id, s.title, f.field,
         'Contains the replacement character (U+FFFD) where a real character was',
         left(f.value, 200)
    from public.flashcard_sets s
    cross join lateral (values
      ('title', s.title),
      ('description', coalesce(s.description, ''))
    ) as f(field, value)
   where f.value like '%' || chr(65533) || '%'

  union all
  select 'replacement_character', 'error', 'past_papers', p.id, p.title, 'title',
         'Contains the replacement character (U+FFFD) where a real character was',
         left(p.title, 200)
    from public.past_papers p
   where p.title like '%' || chr(65533) || '%'

  union all
  select 'replacement_character', 'error', 'announcements', a.id, a.title, f.field,
         'Contains the replacement character (U+FFFD) where a real character was',
         left(f.value, 200)
    from public.announcements a
    cross join lateral (values
      ('title', a.title),
      ('content', a.content)
    ) as f(field, value)
   where f.value like '%' || chr(65533) || '%'

  -- ── 2. correct_option that cannot point at the right option ───────────────
  union all
  select 'answer_index', o.severity, 'questions', q.id,
         coalesce(z.title, left(q.question_text, 80)), 'correct_option', o.detail,
         left(q.options::text, 200)
    from public.questions q
    left join public.quizzes z on z.id = q.quiz_id
    cross join lateral (
      select
        jsonb_typeof(q.options) as kind,
        case when jsonb_typeof(q.options) = 'array' then jsonb_array_length(q.options) end as n,
        (select count(*) from (
           select e.value from jsonb_array_elements_text(
             case when jsonb_typeof(q.options) = 'array' then q.options else '[]'::jsonb end
           ) e(value)
           group by e.value having count(*) > 1
         ) d) as dupes,
        (select count(*) from jsonb_array_elements_text(
           case when jsonb_typeof(q.options) = 'array' then q.options else '[]'::jsonb end
         ) e(value) where btrim(e.value) = '') as blanks
    ) counts
    cross join lateral (
      select
        case
          when counts.kind <> 'array' then 'error'
          when counts.n < 2 then 'error'
          when q.correct_option < 0 then 'error'
          when q.correct_option >= counts.n then 'error'
          else 'warning'
        end as severity,
        case
          when counts.kind <> 'array' then 'options is ' || coalesce(counts.kind, 'null') || ', not an array'
          when counts.n < 2 then 'only ' || counts.n || ' option(s) — nothing to choose between'
          when q.correct_option < 0 then 'correct_option is ' || q.correct_option || ' (negative)'
          when q.correct_option = counts.n then
            'correct_option ' || q.correct_option || ' equals the option count — looks 1-based, so marking scores against the wrong option'
          when q.correct_option > counts.n then
            'correct_option ' || q.correct_option || ' is outside 0..' || (counts.n - 1)
          when counts.blanks > 0 then counts.blanks || ' empty option(s)'
          else counts.dupes || ' duplicated option(s)'
        end as detail
    ) o
   where counts.kind <> 'array'
      or counts.n < 2
      or q.correct_option < 0
      or q.correct_option >= counts.n
      or counts.dupes > 0
      or counts.blanks > 0

  -- ── 3. material_type values the student surfaces never read ───────────────
  -- The type itself is checked against the widened vocabulary from part 1, so an
  -- `exam-technique` note is no longer reported as an unknown type. What remains
  -- is the genuine alias: 'note' is stored, 'notes' is read.
  union all
  select 'material_type_alias', 'warning', 'study_materials', m.id, m.title, 'material_type',
         case
           when m.material_type = 'note' then
             'material_type is ''note'' but student pages read ''notes'' — this row is invisible to students'
           else
             'material_type ''' || m.material_type || ''' is not one of notes/summary/flashcard/exam-technique'
         end,
         case when m.content is not null then 'has text content' else 'file only' end
    from public.study_materials m
   where m.material_type = 'note'
      or lower(replace(coalesce(m.material_type, ''), '_', '-'))
         not in ('notes', 'summary', 'flashcard', 'exam-technique')

  -- ── 4. questions that test recall of the notes, not the specification ─────
  -- The stem is the signature: the seeded practice sets open with "From the …
  -- notes" / "Which statement…" and ask the student which sentence appears in a
  -- topic's notes. Nothing about the question is about the subject, and the
  -- distractors come from other topics' summaries, so the only way to answer is
  -- to have memorised the page. Genuine questions never open this way.
  union all
  select 'notes_recall_prompt', 'warning', 'questions', q.id,
         coalesce(z.title, left(q.question_text, 80)), 'question_text',
         'the stem asks which statement appears in the topic notes — it tests recall of the note text, not the specification',
         left(q.question_text, 200)
    from public.questions q
    left join public.quizzes z on z.id = q.quiz_id
   where q.question_text ~* '^\s*(from the|which)'
     -- Word boundaries on purpose: a bare 'notes' matches inside 'denotes'.
     and q.question_text ~* '\mnotes\M';
end;
$function$;

CREATE OR REPLACE FUNCTION public.dismiss_paper_candidate(p_check_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  _uid uuid := auth.uid();
  _c record;
begin
  if _uid is null then raise exception 'Not authenticated'; end if;
  if not public.has_role(_uid, 'admin') then raise exception 'Admin only'; end if;

  select * into _c from public.past_paper_link_checks where id = p_check_id for update;
  if _c.id is null then raise exception 'Candidate not found'; end if;
  if _c.slot <> 'candidate' then raise exception 'Not a candidate row'; end if;
  if _c.review_status <> 'pending' then raise exception 'Already reviewed'; end if;

  update public.past_paper_link_checks
    set review_status = 'dismissed', reviewed_at = now(), reviewed_by = _uid
    where id = p_check_id;

  perform public.audit_admin_action(
    p_action := 'reject',
    p_entity := 'past_paper_candidate',
    p_entity_id := p_check_id,
    p_entity_label := coalesce(nullif(concat_ws(' — ', _c.source_code, _c.file_name), ''), _c.url),
    p_details := jsonb_build_object('check_id', p_check_id, 'url', _c.url, 'session', _c.session, 'year', _c.year),
    p_actor_id := _uid,
    p_actor_username := null
  );

  return jsonb_build_object('check_id', p_check_id, 'review_status', 'dismissed');
end;
$function$;

CREATE OR REPLACE FUNCTION public.enforce_user_roles_writer()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF current_user IN ('service_role', 'postgres') THEN
    RETURN COALESCE(NEW, OLD);
  END IF;
  IF EXISTS (
    SELECT 1 FROM public.user_roles r
    WHERE r.user_id = auth.uid() AND r.role = 'admin' AND r.is_approved = true
  ) THEN
    RETURN COALESCE(NEW, OLD);
  END IF;
  RAISE EXCEPTION 'Only approved admins can modify user roles';
END;
$function$;

CREATE OR REPLACE FUNCTION public.export_my_data()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_uid uuid := auth.uid();
  v_out jsonb;
  v_table text;
  v_rows jsonb;
  -- Every public table with a user_id column, read from the catalogue rather
  -- than trusted to this list staying current (see the guard in the loop).
  v_tables text[] := array[
    'ai_audit_log', 'ai_correction', 'announcement_reads', 'bookmarks',
    'content_feedback', 'flashcard_progress', 'homework_submissions',
    'leaderboard_public', 'lesson_progress', 'material_progress',
    'notifications', 'past_paper_attempts', 'practice_attempts', 'profiles',
    'question_bookmarks', 'quiz_attempts', 'streaks', 'student_prefs',
    'student_subject_prefs', 'study_plans', 'study_sessions', 'subscriptions',
    'user_roles', 'xp_daily', 'xp_events'
  ];
begin
  if v_uid is null then
    raise exception 'export_my_data: no authenticated user';
  end if;

  v_out := jsonb_build_object(
    'exported_at', now(),
    'schema_version', 1,
    'note', 'Everything Clutch Marks holds for this account, machine-readable.'
  );

  foreach v_table in array v_tables loop
    -- Skip a table that has been dropped or renamed instead of failing the whole
    -- export: a partial copy plus an explicit error is worse for the reader than
    -- a complete copy of what exists.
    if to_regclass('public.' || v_table) is null then
      v_out := v_out || jsonb_build_object(v_table, 'missing at export time');
      continue;
    end if;
    execute format(
      'select coalesce(jsonb_agg(to_jsonb(t)), ''[]''::jsonb) from public.%I t where t.user_id = $1',
      v_table
    ) into v_rows using v_uid;
    v_out := v_out || jsonb_build_object(v_table, v_rows);
  end loop;

  -- Relationships that are not keyed by a single user_id.
  v_out := v_out || jsonb_build_object(
    'parent_student_links', coalesce((
      select jsonb_agg(to_jsonb(l)) from public.parent_student_links l
      where l.parent_id = v_uid or l.student_id = v_uid
    ), '[]'::jsonb),
    'parent_link_invites', coalesce((
      select jsonb_agg(to_jsonb(i)) from public.parent_link_invites i
      where i.student_user_id = v_uid
    ), '[]'::jsonb),
    'consent_records', coalesce((
      select jsonb_agg(to_jsonb(c)) from public.consent_records c
      where c.user_id = v_uid
    ), '[]'::jsonb),
    'data_requests', coalesce((
      select jsonb_agg(to_jsonb(d)) from public.data_requests d
      where d.user_id = v_uid
    ), '[]'::jsonb),
    -- The sign-in identity itself lives in auth.users, not in public.
    'account', (
      select jsonb_build_object(
        'email', u.email,
        'created_at', u.created_at,
        'last_sign_in_at', u.last_sign_in_at,
        'identities', coalesce((
          select jsonb_agg(jsonb_build_object('provider', i.provider, 'created_at', i.created_at))
          from auth.identities i where i.user_id = u.id
        ), '[]'::jsonb)
      )
      from auth.users u where u.id = v_uid
    )
  );

  return v_out;
end;
$function$;

CREATE OR REPLACE FUNCTION public.finish_study_session(_session_id uuid, _completed boolean DEFAULT true)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  _uid uuid := auth.uid();
  _row public.study_sessions;
  _xp integer := 0;
  _week_days integer;
  _goal integer;
  _goal_met boolean;
begin
  if _uid is null then raise exception 'Not authenticated'; end if;

  select * into _row from public.study_sessions
   where id = _session_id and user_id = _uid;
  if not found then raise exception 'Session not found'; end if;

  update public.study_sessions
     set status = case when _completed then 'completed' else 'set_aside' end,
         ended_at = now()
   where id = _session_id and user_id = _uid;

  if _completed and _row.status = 'active' then
    if public.award_xp(_uid, 'session', _session_id::text, 20, 40, 600) then
      _xp := 20;
    end if;
    perform public.touch_streak(_uid);
  end if;

  select count(distinct created_at::date) into _week_days
  from public.xp_events
  where user_id = _uid and created_at >= date_trunc('week', current_date)::date
    and created_at < date_trunc('week', current_date)::date + 7;

  _goal := coalesce((select weekly_goal_days from public.student_prefs where user_id = _uid), 3);
  _goal_met := public.today_goal_met(_uid);

  return jsonb_build_object(
    'xp_earned', _xp,
    'days_this_week', coalesce(_week_days, 0),
    'weekly_goal_days', _goal,
    'weekly_goal_met', coalesce(_week_days, 0) >= _goal,
    'today_goal_met', _goal_met
  );
end;
$function$;

CREATE OR REPLACE FUNCTION public.get_dashboard_counts(_level_ids uuid[] DEFAULT NULL::uuid[])
 RETURNS TABLE(topics_total integer, lessons_total integer, lessons_done integer, quizzes_total integer, questions_total integer, notes_total integer, notes_done integer, materials_total integer)
 LANGUAGE sql
 STABLE
 SET search_path TO 'public'
AS $function$
  WITH scope AS (
    SELECT t.id AS topic_id
    FROM public.topics t
    JOIN public.subject_levels sl ON sl.id = t.subject_level_id
    JOIN public.subjects s ON s.id = sl.subject_id
    WHERE (_level_ids IS NULL OR t.subject_level_id = ANY(_level_ids))
      AND sl.is_active
      AND s.is_active
  ),
  les AS (
    SELECT COUNT(DISTINCT l.id)::int AS total,
           COUNT(DISTINCT l.id) FILTER (WHERE lp.completed)::int AS done
    FROM scope sc
    JOIN public.lessons l ON l.topic_id = sc.topic_id
    LEFT JOIN public.lesson_progress lp ON lp.lesson_id = l.id AND lp.user_id = auth.uid()
  ),
  qz AS (
    SELECT COUNT(DISTINCT z.id)::int AS quizzes,
           COUNT(q.id)::int AS questions
    FROM scope sc
    JOIN public.quizzes z ON z.topic_id = sc.topic_id AND z.is_published
    LEFT JOIN public.questions q ON q.quiz_id = z.id
  ),
  -- "Notes" counts the same two types the /notes library lists. It used to
  -- count material_type = 'notes' only, so the tile read "0/30" while the page
  -- it links to said "0 of 60" (the library deliberately includes summaries).
  mt AS (
    SELECT COUNT(*) FILTER (WHERE m.material_type IN ('notes', 'summary'))::int AS notes,
           COUNT(*)::int AS materials,
           COUNT(*) FILTER (WHERE m.material_type IN ('notes', 'summary') AND mp.completed)::int AS notes_done
    FROM scope sc
    JOIN public.study_materials m ON m.topic_id = sc.topic_id
    LEFT JOIN public.material_progress mp ON mp.material_id = m.id AND mp.user_id = auth.uid()
  )
  SELECT (SELECT COUNT(*)::int FROM scope),
         les.total, les.done,
         qz.quizzes, qz.questions,
         mt.notes, mt.notes_done, mt.materials
  FROM les, qz, mt;
$function$;

CREATE OR REPLACE FUNCTION public.get_free_preview(_subject_level_id uuid DEFAULT NULL::uuid)
 RETURNS TABLE(item_id uuid, item_type text, topic_id uuid, topic_name text, title text, is_published boolean, is_ai_generated boolean, created_at timestamp with time zone)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  WITH published_questions AS (
    SELECT q.id AS item_id,
           'question' AS item_type,
           z.topic_id,
           t.name AS topic_name,
           z.title,
           z.is_published,
           z.is_ai_generated,
           q.created_at
    FROM public.questions q
    JOIN public.quizzes z ON z.id = q.quiz_id
    LEFT JOIN public.topics t ON t.id = z.topic_id
    WHERE z.is_published = true
      AND public.is_user_approved(auth.uid())
      AND public.has_role(auth.uid(), 'admin') IS NOT TRUE
  ),
  published_quizzes AS (
    SELECT id AS item_id,
           'quiz' AS item_type,
           topic_id,
           NULL AS topic_name,
           title,
           is_published,
           is_ai_generated,
           created_at
    FROM public.quizzes
    WHERE is_published = true
      AND public.is_user_approved(auth.uid())
      AND public.has_role(auth.uid(), 'admin') IS NOT TRUE
  ),
  past_papers AS (
    SELECT id AS item_id,
           'past_paper' AS item_type,
           topic_id,
           NULL AS topic_name,
           title,
           false AS is_published,
           false AS is_ai_generated,
           created_at
    FROM public.past_papers
    WHERE public.is_user_approved(auth.uid())
      AND public.has_role(auth.uid(), 'admin') IS NOT TRUE
  )
  SELECT item_id, item_type, topic_id, topic_name, title, is_published,
         is_ai_generated, created_at
  FROM (
    SELECT * FROM published_questions
    UNION ALL
    SELECT * FROM published_quizzes
    UNION ALL
    SELECT * FROM past_papers
  ) AS combined
  WHERE _subject_level_id IS NULL
     OR combined.topic_id IN (
       SELECT t.id FROM public.topics t WHERE t.subject_level_id = _subject_level_id
     )
  ORDER BY combined.created_at DESC
  LIMIT GREATEST(1, LEAST(2, (SELECT count(*) FROM (
    SELECT * FROM published_questions
    UNION ALL
    SELECT * FROM published_quizzes
    UNION ALL
    SELECT * FROM past_papers
  ) AS sub)));
$function$;

CREATE OR REPLACE FUNCTION public.get_practice_questions(_topic_id uuid, _limit integer DEFAULT 10)
 RETURNS TABLE(id uuid, quiz_id uuid, question_text text, options jsonb)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT q.id, q.quiz_id, q.question_text, q.options
  FROM public.questions q
  JOIN public.quizzes z ON z.id = q.quiz_id
  WHERE z.is_published = true
    AND z.topic_id = _topic_id
    AND public.is_user_approved(auth.uid())
  ORDER BY random()
  LIMIT GREATEST(1, LEAST(_limit, 50));
$function$;

CREATE OR REPLACE FUNCTION public.get_practice_summary()
 RETURNS TABLE(topic_id uuid, topic_name text, total_questions bigint, answered bigint, correct bigint, attempts bigint, last_attempt_at timestamp with time zone)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  WITH base AS (
    SELECT
      t.id AS topic_id,
      t.name AS topic_name,
      q.id AS question_id,
      pa.last_correct,
      pa.attempts_count,
      pa.last_attempt_at
    FROM public.topics t
    LEFT JOIN public.quizzes z ON z.topic_id = t.id AND z.is_published = true
    LEFT JOIN public.questions q ON q.quiz_id = z.id
    LEFT JOIN public.practice_attempts pa
      ON pa.question_id = q.id AND pa.user_id = auth.uid()
    WHERE auth.uid() IS NOT NULL
  )
  SELECT
    topic_id,
    topic_name,
    COUNT(question_id) FILTER (WHERE question_id IS NOT NULL) AS total_questions,
    COUNT(question_id) FILTER (WHERE last_attempt_at IS NOT NULL) AS answered,
    COUNT(question_id) FILTER (WHERE last_correct IS TRUE) AS correct,
    COALESCE(SUM(attempts_count), 0)::bigint AS attempts,
    MAX(last_attempt_at) AS last_attempt_at
  FROM base
  GROUP BY topic_id, topic_name
  ORDER BY topic_name;
$function$;

CREATE OR REPLACE FUNCTION public.get_profile_id(_user_id uuid)
 RETURNS uuid
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT id FROM public.profiles WHERE user_id = _user_id LIMIT 1
$function$;

CREATE OR REPLACE FUNCTION public.get_review_questions(_subject_level_id uuid DEFAULT NULL::uuid, _mode text DEFAULT 'incorrect'::text, _limit integer DEFAULT 50)
 RETURNS TABLE(id uuid, quiz_id uuid, quiz_title text, question_text text, options jsonb, difficulty text, topic_id uuid, topic_name text, bookmarked boolean, last_correct boolean, attempts_count integer, last_attempt_at timestamp with time zone)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT q.id, q.quiz_id, z.title, q.question_text, q.options,
         q.difficulty, t.id, t.name,
         (qb.id IS NOT NULL), pa.last_correct, COALESCE(pa.attempts_count, 0), pa.last_attempt_at
  FROM public.questions q
  JOIN public.quizzes z ON z.id = q.quiz_id
  LEFT JOIN public.topics t ON t.id = z.topic_id
  LEFT JOIN public.question_bookmarks qb ON qb.question_id = q.id AND qb.user_id = auth.uid()
  LEFT JOIN public.practice_attempts pa ON pa.question_id = q.id AND pa.user_id = auth.uid()
  WHERE z.is_published = true
    AND (public.is_user_approved(auth.uid()) OR public.has_role(auth.uid(), 'admin'))
    AND (_subject_level_id IS NULL OR t.subject_level_id = _subject_level_id)
    AND (
      (_mode = 'bookmarked' AND qb.id IS NOT NULL)
      OR (_mode = 'incorrect' AND pa.id IS NOT NULL AND pa.last_correct = false)
      OR (_mode = 'all' AND (qb.id IS NOT NULL OR (pa.id IS NOT NULL AND pa.last_correct = false)))
    )
  ORDER BY pa.last_attempt_at DESC NULLS LAST, z.title, q.sort_order
  LIMIT GREATEST(1, LEAST(_limit, 200));
$function$;

CREATE OR REPLACE FUNCTION public.get_student_questions(_quiz_id uuid)
 RETURNS TABLE(id uuid, quiz_id uuid, question_text text, options jsonb, sort_order integer)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT q.id, q.quiz_id, q.question_text, q.options, q.sort_order
  FROM public.questions q
  WHERE q.quiz_id = _quiz_id
    AND public.is_user_approved(auth.uid())
  ORDER BY q.sort_order;
$function$;

CREATE OR REPLACE FUNCTION public.get_subject_progress()
 RETURNS TABLE(subject_id uuid, subject_name text, subject_slug text, subject_icon text, subject_color text, subject_level_id uuid, level subject_level, topics_count bigint, lessons_total bigint, lessons_completed bigint, materials_total bigint, materials_bookmarked bigint, quiz_attempts bigint, quiz_avg_score numeric, ai_questions_total bigint, ai_questions_answered bigint, ai_questions_correct bigint, bookmarked_questions bigint, incorrect_questions bigint)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  WITH lv AS (
    SELECT sl.id AS level_id, sl.level, s.id AS s_id, s.name, s.slug, s.icon, s.color
    FROM public.subject_levels sl
    JOIN public.subjects s ON s.id = sl.subject_id
    WHERE sl.is_active = true AND s.is_active = true
  ),
  tp AS (SELECT t.id AS topic_id, t.subject_level_id FROM public.topics t WHERE t.subject_level_id IS NOT NULL),
  topic_counts AS (SELECT subject_level_id, COUNT(*) AS n FROM tp GROUP BY 1),
  les AS (
    SELECT tp.subject_level_id,
           COUNT(l.id) AS total,
           COUNT(lp.id) FILTER (WHERE lp.completed) AS done
    FROM tp JOIN public.lessons l ON l.topic_id = tp.topic_id
    LEFT JOIN public.lesson_progress lp ON lp.lesson_id = l.id AND lp.user_id = auth.uid()
    GROUP BY 1
  ),
  mat AS (
    SELECT tp.subject_level_id,
           COUNT(m.id) AS total,
           COUNT(b.id) AS saved
    FROM tp JOIN public.study_materials m ON m.topic_id = tp.topic_id
    LEFT JOIN public.bookmarks b ON b.material_id = m.id AND b.user_id = auth.uid()
    GROUP BY 1
  ),
  qz AS (
    SELECT tp.subject_level_id,
           COUNT(qa.id) AS attempts,
           ROUND(AVG(CASE WHEN qa.total_questions > 0 THEN qa.score::numeric / qa.total_questions * 100 END), 1) AS avg_score
    FROM tp JOIN public.quizzes z ON z.topic_id = tp.topic_id
    JOIN public.quiz_attempts qa ON qa.quiz_id = z.id AND qa.user_id = auth.uid()
    GROUP BY 1
  ),
  qs AS (
    SELECT tp.subject_level_id,
           COUNT(q.id) FILTER (WHERE z.is_ai_generated) AS ai_total,
           COUNT(pa.id) FILTER (WHERE z.is_ai_generated) AS ai_answered,
           COUNT(pa.id) FILTER (WHERE z.is_ai_generated AND pa.last_correct) AS ai_correct,
           COUNT(qb.id) AS saved_q,
           COUNT(pa.id) FILTER (WHERE pa.last_correct = false) AS wrong_q
    FROM tp
    JOIN public.quizzes z ON z.topic_id = tp.topic_id AND z.is_published = true
    JOIN public.questions q ON q.quiz_id = z.id
    LEFT JOIN public.practice_attempts pa ON pa.question_id = q.id AND pa.user_id = auth.uid()
    LEFT JOIN public.question_bookmarks qb ON qb.question_id = q.id AND qb.user_id = auth.uid()
    GROUP BY 1
  )
  SELECT lv.s_id, lv.name, lv.slug, lv.icon, lv.color, lv.level_id, lv.level,
         COALESCE(topic_counts.n, 0),
         COALESCE(les.total, 0), COALESCE(les.done, 0),
         COALESCE(mat.total, 0), COALESCE(mat.saved, 0),
         COALESCE(qz.attempts, 0), COALESCE(qz.avg_score, 0),
         COALESCE(qs.ai_total, 0), COALESCE(qs.ai_answered, 0),
         COALESCE(qs.ai_correct, 0), COALESCE(qs.saved_q, 0), COALESCE(qs.wrong_q, 0)
  FROM lv
  LEFT JOIN topic_counts ON topic_counts.subject_level_id = lv.level_id
  LEFT JOIN les ON les.subject_level_id = lv.level_id
  LEFT JOIN mat ON mat.subject_level_id = lv.level_id
  LEFT JOIN qz ON qz.subject_level_id = lv.level_id
  LEFT JOIN qs ON qs.subject_level_id = lv.level_id
  WHERE public.is_user_approved(auth.uid()) OR public.has_role(auth.uid(), 'admin')
  ORDER BY lv.name, lv.level;
$function$;

CREATE OR REPLACE FUNCTION public.grade_quiz(_quiz_id uuid, _answers jsonb, _submission_file_url text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  _user_id uuid := auth.uid();
  _correct integer := 0;
  _total integer := 0;
  _q record;
  _selected integer;
  _attempt_id uuid;
  _results jsonb := '[]'::jsonb;
  _xp integer := 0;
begin
  if _user_id is null then raise exception 'Not authenticated'; end if;
  -- Admins bypass the approval gate for oversight, as everywhere else.
  if not (public.is_user_approved(_user_id) or public.has_role(_user_id, 'admin')) then
    raise exception 'Account not approved';
  end if;

  for _q in
    select q.id, q.correct_option, q.explanation, q.options, q.objective_id
    from public.questions q
    where q.quiz_id = _quiz_id
    order by q.sort_order
  loop
    _total := _total + 1;
    _selected := (_answers->>(_q.id::text))::integer;
    if _selected = _q.correct_option then
      _correct := _correct + 1;
      if public.award_xp(_user_id, 'quiz', _q.id::text, 20, 200) then
        _xp := _xp + 20;
      end if;
    end if;
    -- Evidence for the mastery loop, for tagged questions only, and only when
    -- the question was actually answered (an unanswered question says nothing).
    -- The practice_attempts trigger advances the schedule from here.
    if _q.objective_id is not null and _selected is not null then
      insert into public.practice_attempts (user_id, question_id, last_correct, attempts_count, last_attempt_at)
      values (_user_id, _q.id, (_selected = _q.correct_option), 1, now())
      on conflict (user_id, question_id) do update
        set last_correct = excluded.last_correct,
            attempts_count = public.practice_attempts.attempts_count + 1,
            last_attempt_at = now();
    end if;
    _results := _results || jsonb_build_object(
      'question_id', _q.id,
      'selected', _selected,
      'correct_option', _q.correct_option,
      'explanation', _q.explanation,
      'options', _q.options
    );
  end loop;

  if _total > 0 then
    insert into public.quiz_attempts (
      quiz_id, user_id, score, total_questions, submission_file_url, answers, completed_at
    )
    values (
      _quiz_id, _user_id, _correct, _total, _submission_file_url,
      (select jsonb_agg(jsonb_build_object('question_id', k, 'selected', (_answers->>k)::integer))
         from jsonb_object_keys(_answers) k),
      now()
    )
    returning id into _attempt_id;
    perform public.touch_streak(_user_id);
  end if;

  return jsonb_build_object(
    'correct', _correct,
    'total', _total,
    'attempt_id', _attempt_id,
    'xp_earned', _xp,
    'results', _results
  );
end;
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_parent_email text;
  v_parent_user uuid;
  v_full_name text;
  v_avatar text;
  v_privacy_version text;
  v_terms_version text;
BEGIN
  -- Google sends `name`; the signup form sends `full_name`. Prefer the explicit
  -- full name, then Google's, then the email prefix so a name is always shown.
  v_full_name := COALESCE(
    NULLIF(btrim(COALESCE(NEW.raw_user_meta_data->>'full_name', '')), ''),
    NULLIF(btrim(COALESCE(NEW.raw_user_meta_data->>'name', '')), ''),
    split_part(COALESCE(NEW.email, ''), '@', 1)
  );
  v_avatar := NULLIF(btrim(COALESCE(
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_user_meta_data->>'picture',
    ''
  )), '');

  -- Profiles first (satisfies the auth.users trigger contract). Username only
  -- when an admin deliberately provisioned one; public signup stays email-only.
  INSERT INTO public.profiles (user_id, full_name, username, email, avatar_url)
  VALUES (
    NEW.id,
    v_full_name,
    NULLIF(btrim(COALESCE(NEW.raw_user_meta_data->>'username', '')), ''),
    NEW.email,
    v_avatar
  );

  -- PDPL: record which privacy/terms version this account accepted, and when the
  -- server accepted it. Absent for provider sign-ups (Google) and for accounts an
  -- admin provisions, which is itself the honest record â€” nothing was ticked.
  v_privacy_version := NULLIF(btrim(COALESCE(NEW.raw_user_meta_data->'consent'->>'privacy_version', '')), '');
  v_terms_version := NULLIF(btrim(COALESCE(NEW.raw_user_meta_data->'consent'->>'terms_version', '')), '');
  IF v_privacy_version IS NOT NULL THEN
    INSERT INTO public.consent_records (user_id, kind, document_version)
    VALUES (NEW.id, 'privacy', left(v_privacy_version, 64))
    ON CONFLICT DO NOTHING;
  END IF;
  IF v_terms_version IS NOT NULL THEN
    INSERT INTO public.consent_records (user_id, kind, document_version)
    VALUES (NEW.id, 'terms', left(v_terms_version, 64))
    ON CONFLICT DO NOTHING;
  END IF;

  -- SECURITY: Never trust client-sent role. Everyone starts as a student on
  -- the free plan; only admins can elevate roles afterwards. The ONLY public
  -- elevation is self-registering as a parent (limited view of linked
  -- children); 'admin' in public metadata is ignored â€” manage-accounts
  -- provisions admins with a verified service-role update after creation.
  INSERT INTO public.user_roles (user_id, role, is_approved)
  VALUES (NEW.id, 'student', true);

  IF COALESCE(NEW.raw_user_meta_data->>'role', '') = 'parent' THEN
    UPDATE public.user_roles SET role = 'parent' WHERE user_id = NEW.id;
  END IF;

  -- Optional parent email at student signup: link instantly if the parent
  -- account exists, otherwise park an invite that auto-links on parent signup.
  -- (Variables carry a v_ prefix â€” bare `parent_email` collides with the
  -- parent_link_invites column in the statements below and breaks signup.)
  v_parent_email := lower(btrim(COALESCE(NEW.raw_user_meta_data->>'parent_email', '')));
  IF v_parent_email <> '' AND NEW.email IS NOT NULL AND lower(NEW.email) <> v_parent_email THEN
    SELECT p.user_id INTO v_parent_user
    FROM public.profiles p
    JOIN public.user_roles r ON r.user_id = p.user_id AND r.role = 'parent'
    WHERE lower(p.email) = v_parent_email
    LIMIT 1;

    IF v_parent_user IS NOT NULL THEN
      INSERT INTO public.parent_student_links (parent_id, student_id)
      VALUES (v_parent_user, NEW.id)
      ON CONFLICT DO NOTHING;
    ELSE
      INSERT INTO public.parent_link_invites (parent_email, student_user_id)
      VALUES (v_parent_email, NEW.id)
      ON CONFLICT DO NOTHING;
    END IF;
  END IF;

  -- Parent side: adopt any parked invites addressed to this email (a parent
  -- registering after their child already signed up).
  IF lower(COALESCE(NEW.email, '')) <> '' THEN
    INSERT INTO public.parent_student_links (parent_id, student_id)
    SELECT NEW.id, i.student_user_id
    FROM public.parent_link_invites i
    WHERE i.parent_email = lower(NEW.email)
    ON CONFLICT DO NOTHING;

    DELETE FROM public.parent_link_invites
    WHERE parent_link_invites.parent_email = lower(NEW.email);
  END IF;

  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.has_active_plan(_user_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select
    -- Admins own the content and must be able to exercise the marker they ship.
    exists (
      select 1 from public.user_roles
       where user_id = _user_id
         and role = 'admin'
         and is_approved = true
    )
    or exists (
      select 1 from public.subscriptions
       where user_id = _user_id
         and status = 'active'
         and (ends_at is null or ends_at > now())
    );
$function$;

CREATE OR REPLACE FUNCTION public.has_active_subscription(p_user_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select exists (
    select 1 from public.subscriptions
    where user_id = p_user_id
      and status = 'active'
      and coalesce(ends_at, 'infinity') > now()
  );
$function$;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$function$;

CREATE OR REPLACE FUNCTION public.i_am_parent()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select exists (
    select 1 from public.user_roles
    where user_id = auth.uid() and role = 'parent'
  );
$function$;

CREATE OR REPLACE FUNCTION public.is_linked_parent(_parent_auth_id uuid, _student_auth_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.parent_student_links
    WHERE parent_id = _parent_auth_id AND student_id = _student_auth_id
  )
$function$;

CREATE OR REPLACE FUNCTION public.is_user_approved(_user_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND is_approved = true
  );
$function$;

CREATE OR REPLACE FUNCTION public.log_student_activity()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_actor  text;
  v_label  text;
  v_action text;
  v_entity text;
  v_details jsonb;
BEGIN
  SELECT p.username INTO v_actor FROM public.profiles p WHERE p.user_id = NEW.user_id;

  IF TG_TABLE_NAME = 'quiz_attempts' THEN
    SELECT q.title INTO v_label FROM public.quizzes q WHERE q.id = NEW.quiz_id;
    v_action := 'quiz_attempt';
    v_entity := 'quiz_attempt';
    v_details := jsonb_build_object(
      'score', NEW.score,
      'total_questions', NEW.total_questions,
      'percentage', CASE WHEN NEW.total_questions > 0
                         THEN round((NEW.score::numeric / NEW.total_questions) * 100, 1)
                         ELSE NULL END,
      'completed_at', NEW.completed_at
    );
  ELSIF TG_TABLE_NAME = 'homework_submissions' THEN
    SELECT h.title INTO v_label FROM public.homework h WHERE h.id = NEW.homework_id;
    v_action := 'homework_submission';
    v_entity := 'homework_submission';
    v_details := jsonb_build_object(
      'status', NEW.status,
      'has_file', (NEW.file_url IS NOT NULL),
      'submitted_at', NEW.submitted_at
    );
  END IF;

  INSERT INTO public.admin_audit_log (actor_id, actor_username, action, entity, entity_id, entity_label, details)
  VALUES (
    NEW.user_id,
    COALESCE(v_actor, 'unknown'),
    v_action,
    v_entity,
    NEW.id,
    COALESCE(v_label, NEW.id::text),
    v_details
  );

  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.my_next_objective()
 RETURNS TABLE(action text, subject_slug text, level text, topic_id uuid, topic_slug text, topic_name text, objective_id uuid, code text, statement text, checks integer, attempted integer, correct integer, state text, stage integer, due_at timestamp with time zone, overdue boolean)
 LANGUAGE sql
 STABLE
 SET search_path TO 'public'
AS $function$
  select case
           when m.overdue then 'review'
           when m.state = 'working' then 'practise'
           when m.state = 'not_started' then 'start'
           else 'review'
         end as action,
         m.subject_slug, m.level, m.topic_id, m.topic_slug, m.topic_name,
         m.objective_id, m.code, m.statement,
         m.checks, m.attempted, m.correct, m.state, m.stage, m.due_at, m.overdue
    from public.my_objective_mastery() m
   where m.checks > 0
   order by (case when m.overdue then 0 else 1 end),
            (case when m.overdue then now() - m.due_at else interval '0' end) desc,
            (case m.state when 'working' then 0 when 'not_started' then 1 else 2 end),
            (case when m.attempted > 0 then m.correct::numeric / greatest(m.checks, 1) else 1 end),
            m.last_reviewed_at asc nulls first,
            m.code
   limit 1;
$function$;

CREATE OR REPLACE FUNCTION public.my_objective_mastery()
 RETURNS TABLE(subject_slug text, level text, topic_id uuid, topic_slug text, topic_name text, objective_id uuid, code text, statement text, sort_order integer, checks integer, attempted integer, correct integer, state text, stage integer, due_at timestamp with time zone, overdue boolean, last_reviewed_at timestamp with time zone)
 LANGUAGE sql
 STABLE
 SET search_path TO 'public'
AS $function$
  with per_objective as (
    select o.id,
           o.topic_id,
           o.code,
           o.statement,
           o.sort_order,
           (select count(*) from public.questions q where q.objective_id = o.id)::int as checks,
           (select count(*)
              from public.practice_attempts pa
              join public.questions q on q.id = pa.question_id
             where q.objective_id = o.id and pa.user_id = auth.uid())::int as attempted,
           (select count(*)
              from public.practice_attempts pa
              join public.questions q on q.id = pa.question_id
             where q.objective_id = o.id and pa.user_id = auth.uid() and pa.last_correct)::int as correct
      from public.learning_objectives o
  )
  select s.slug as subject_slug,
         sl.level::text as level,
         t.id as topic_id,
         t.slug as topic_slug,
         t.name as topic_name,
         po.id as objective_id,
         po.code,
         po.statement,
         po.sort_order,
         po.checks,
         po.attempted,
         po.correct,
         case
           when po.attempted = 0 then 'not_started'
           when po.checks > 0 and po.correct >= po.checks then 'mastered'
           else 'working'
         end as state,
         coalesce(r.stage, 0) as stage,
         r.due_at,
         (r.due_at is not null and r.due_at <= now()) as overdue,
         r.last_reviewed_at
    from per_objective po
    join public.topics t on t.id = po.topic_id
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
    left join public.objective_reviews r
      on r.objective_id = po.id and r.user_id = auth.uid()
   order by s.slug, sl.level, t.name, po.sort_order, po.code;
$function$;

CREATE OR REPLACE FUNCTION public.my_study_prefs()
 RETURNS jsonb
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select jsonb_build_object(
    'weekly_goal_days', coalesce(p.weekly_goal_days, 3),
    'session_minutes', coalesce(p.session_minutes, 20),
    'leaderboard_visible', coalesce(p.leaderboard_visible, true),
    'reminders_enabled', coalesce(p.reminders_enabled, true),
    'animations_enabled', coalesce(p.animations_enabled, true),
    'encouragement_enabled', coalesce(p.encouragement_enabled, true)
  )
  from (select 1) _
  left join public.student_prefs p on p.user_id = auth.uid();
$function$;

CREATE OR REPLACE FUNCTION public.my_wins(_days integer DEFAULT 7)
 RETURNS jsonb
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  with me as (select auth.uid() as uid),
  win as (select now() - make_interval(days => greatest(1, least(coalesce(_days, 7), 30))) as t),
  recent as (
    select pa.* from public.practice_attempts pa, me
    where pa.user_id = me.uid and pa.last_correct and pa.attempts_count > 1
      and pa.last_attempt_at >= (select t from win)
  )
  select jsonb_build_object(
    'days_studied', (
      select count(distinct e.created_at::date) from public.xp_events e, me
      where e.user_id = me.uid and e.created_at >= (select t from win)
    ),
    'mistakes_fixed', (select count(*) from recent),
    'mistakes_fixed_by_subject', coalesce((
      select jsonb_agg(x order by (x->>'fixed')::integer desc) from (
        select jsonb_build_object('subject', s.name, 'fixed', count(*)) as x
        from recent r
        join public.questions q on q.id = r.question_id
        join public.quizzes z on z.id = q.quiz_id
        join public.topics t on t.id = z.topic_id
        join public.subject_levels sl on sl.id = t.subject_level_id
        join public.subjects s on s.id = sl.subject_id
        group by s.name
        order by count(*) desc
        limit 3
      ) sub
    ), '[]'::jsonb),
    'lessons_completed', (
      select count(*) from public.lesson_progress lp, me
      where lp.user_id = me.uid and lp.completed and lp.completed_at >= (select t from win)
    ),
    'notes_completed', (
      select count(*) from public.material_progress mp, me
      where mp.user_id = me.uid and mp.completed and mp.completed_at >= (select t from win)
    ),
    'quizzes_done', (
      select count(*) from public.quiz_attempts qa, me
      where qa.user_id = me.uid and qa.completed_at >= (select t from win)
    ),
    'best_quiz_pct', (
      select max(round(100.0 * qa.score / nullif(qa.total_questions, 0)))::integer
      from public.quiz_attempts qa, me
      where qa.user_id = me.uid and qa.completed_at >= (select t from win)
    ),
    'sessions_completed', (
      select count(*) from public.study_sessions s, me
      where s.user_id = me.uid and s.status = 'completed' and s.started_at >= (select t from win)
    ),
    -- "You improved on algebra": this week's quiz average vs last week's, per
    -- subject, only where there is a real (>=5 point) improvement.
    'subject_improvements', coalesce((
      select jsonb_agg(jsonb_build_object(
               'subject', subject, 'recent_pct', recent_pct, 'delta', delta
             ) order by delta desc)
      from (
        select s.name as subject,
               round(avg(case when qa.completed_at >= now() - interval '7 days'
                              then 100.0 * qa.score / nullif(qa.total_questions, 0) end))::integer as recent_pct,
               (round(avg(case when qa.completed_at >= now() - interval '7 days'
                               then 100.0 * qa.score / nullif(qa.total_questions, 0) end))
              - round(avg(case when qa.completed_at < now() - interval '7 days'
                               then 100.0 * qa.score / nullif(qa.total_questions, 0) end)))::integer as delta
        from public.quiz_attempts qa
        join public.quizzes z on z.id = qa.quiz_id
        join public.topics t on t.id = z.topic_id
        join public.subject_levels sl on sl.id = t.subject_level_id
        join public.subjects s on s.id = sl.subject_id, me
        where qa.user_id = me.uid and qa.completed_at >= now() - interval '14 days'
        group by s.name
        having avg(case when qa.completed_at >= now() - interval '7 days'
                        then 100.0 * qa.score / nullif(qa.total_questions, 0) end) is not null
           and avg(case when qa.completed_at < now() - interval '7 days'
                        then 100.0 * qa.score / nullif(qa.total_questions, 0) end) is not null
      ) sub
      where delta >= 5
    ), '[]'::jsonb)
  );
$function$;

CREATE OR REPLACE FUNCTION public.my_xp_summary()
 RETURNS jsonb
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  with me as (select auth.uid() as uid),
  wk as (select date_trunc('week', current_date)::date as ws),
  days as (
    select distinct e.created_at::date as d
    from public.xp_events e, me
    where e.user_id = me.uid and e.created_at >= (select ws from wk)
  ),
  prefs as (select p.* from public.student_prefs p, me where p.user_id = me.uid)
  select jsonb_build_object(
    'xp_all_time', coalesce((select sum(points) from public.xp_events where user_id = (select uid from me)), 0),
    'xp_today', coalesce((select sum(points) from public.xp_events where user_id = (select uid from me) and created_at >= current_date), 0),
    'xp_30d', coalesce((select sum(points) from public.xp_events where user_id = (select uid from me) and created_at >= now() - interval '30 days'), 0),
    'caps_used', (select jsonb_object_agg(tool, points) from public.xp_daily where user_id = (select uid from me) and day = current_date),
    -- Repurposed, and now non-punishing: days studied this week.
    'streak', (select count(*) from days),
    'longest_streak', coalesce((select longest_streak from public.streaks where user_id = (select uid from me)), 0),
    'days_this_week', (select count(*) from days),
    'week_days', coalesce((select jsonb_agg(distinct extract(isodow from d)) from days), '[]'::jsonb),
    'weekly_goal_days', coalesce((select weekly_goal_days from prefs), 3),
    'weekly_goal_met', (select count(*) from days) >= coalesce((select weekly_goal_days from prefs), 3),
    'session_minutes', coalesce((select session_minutes from prefs), 20),
    'leaderboard_visible', coalesce((select leaderboard_visible from prefs), true),
    'reminders_enabled', coalesce((select reminders_enabled from prefs), true),
    'animations_enabled', coalesce((select animations_enabled from prefs), true),
    'encouragement_enabled', coalesce((select encouragement_enabled from prefs), true),
    'today_goal_met', public.today_goal_met((select uid from me)),
    'today_active_session', coalesce((
      select jsonb_build_object('id', s.id, 'planned_minutes', s.planned_minutes, 'started_at', s.started_at)
      from public.study_sessions s, me
      where s.user_id = me.uid and s.status = 'active'
      limit 1
    ), 'null'::jsonb),
    'sessions_this_week', (
      select count(*) from public.study_sessions s, me
      where s.user_id = me.uid and s.status = 'completed'
        and s.started_at >= (select ws from wk)
    )
  );
$function$;

CREATE OR REPLACE FUNCTION public.notify_admins_new_feedback()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_tool text;
  v_label text;
begin
  select f.tool, nullif(f.tool_label, '') into v_tool, v_label
  from public.content_feedback f
  where f.id = NEW.id;

  insert into public.notifications (user_id, title, message)
  select r.user_id,
    'New feedback from a student',
    case coalesce(v_tool, 'other')
      when 'notes' then 'Revision notes'
      when 'quiz' then 'Quiz'
      when 'question' then 'Topic question'
      when 'flashcards' then 'Flashcards'
      when 'past_papers' then 'Past papers'
      when 'planner' then 'Study planner'
      when 'lesson' then 'Lesson'
      else 'General'
    end
    || case when v_label is not null then ' (' || v_label || ')' else '' end
    || ' — open Feedback to read and reply.'
  from public.user_roles r
  where r.role = 'admin';

  return new;
end;
$function$;

CREATE OR REPLACE FUNCTION public.notify_admins_of_sensitive_event(p_action text, p_entity text, p_label text, p_actor text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  insert into public.notifications (user_id, title, message)
  select r.user_id,
    case when p_action = 'delete'
      then 'Content deleted: ' || p_entity
      else 'Account change: ' || p_entity end,
    coalesce(p_actor, 'someone') || ' ' ||
      case p_action
        when 'delete' then 'deleted '
        when 'create' then 'created '
        when 'update' then 'modified '
        when 'approve' then 'changed '
        else p_action || 'd '
      end ||
      coalesce(p_label, 'a ' || p_entity) ||
      '. Review the Audit Log for details.'
  from public.user_roles r
  where r.role = 'admin';
end;
$function$;

CREATE OR REPLACE FUNCTION public.notify_feedback_reply()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_reporter uuid;
  v_title   text;
BEGIN
  SELECT f.user_id, f.tool_label INTO v_reporter, v_title
  FROM public.content_feedback f
  WHERE f.id = NEW.feedback_id;

  IF v_reporter IS NOT NULL AND NEW.sender_id <> v_reporter THEN
    INSERT INTO public.notifications (user_id, title, message)
    VALUES (
      v_reporter,
      'New reply on your feedback',
      COALESCE(NULLIF(v_title, ''), 'Your report') || ' — the team replied to you.'
    );
  END IF;

  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.objective_review_interval(_stage integer)
 RETURNS interval
 LANGUAGE sql
 IMMUTABLE
AS $function$
  select (array[
    interval '1 day',
    interval '3 days',
    interval '7 days',
    interval '16 days',
    interval '35 days'
  ])[greatest(1, least(5, coalesce(_stage, 1)))];
$function$;

CREATE OR REPLACE FUNCTION public.objective_review_questions(_objective_id uuid, _limit integer DEFAULT 5)
 RETURNS TABLE(question_id uuid, question_text text, options jsonb, difficulty text, sort_order integer, attempts_count integer, last_correct boolean, last_attempt_at timestamp with time zone, next_due_at timestamp with time zone, stage integer)
 LANGUAGE sql
 STABLE
 SET search_path TO 'public'
AS $function$
  select q.id as question_id,
         q.question_text,
         q.options,
         q.difficulty,
         q.sort_order,
         coalesce(pa.attempts_count, 0) as attempts_count,
         pa.last_correct,
         pa.last_attempt_at,
         r.due_at as next_due_at,
         coalesce(r.stage, 0) as stage
    from public.questions q
    left join public.practice_attempts pa
      on pa.question_id = q.id and pa.user_id = auth.uid()
    left join public.objective_reviews r
      on r.objective_id = q.objective_id and r.user_id = auth.uid()
   where q.objective_id = _objective_id
   order by coalesce(pa.last_correct, false) asc,
            pa.last_attempt_at asc nulls first,
            q.sort_order
   limit greatest(1, least(20, coalesce(_limit, 5)));
$function$;

CREATE OR REPLACE FUNCTION public.pdpl_notify_admins_of_request()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  insert into public.notifications (user_id, title, message)
  select r.user_id,
         'Data request: ' || new.kind,
         coalesce(new.email, 'An account') || ' filed a ' || new.kind || ' request (ref ' ||
         left(new.id::text, 8) || '). Act on the account, then mark the request resolved.'
  from public.user_roles r
  where r.role = 'admin';
  return new;
end;
$function$;

CREATE OR REPLACE FUNCTION public.pdpl_snapshot_request_email()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  if new.email is null then
    select p.email into new.email from public.profiles p where p.user_id = new.user_id;
  end if;
  return new;
end;
$function$;

CREATE OR REPLACE FUNCTION public.protect_profile_identity_fields()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  _identity_changed boolean;
  _is_service boolean;
BEGIN
  _identity_changed :=
       NEW.user_id  IS DISTINCT FROM OLD.user_id
    OR NEW.username IS DISTINCT FROM OLD.username
    OR NEW.email    IS DISTINCT FROM OLD.email;

  IF NOT _identity_changed THEN
    RETURN NEW;
  END IF;

  _is_service := current_setting('request.jwt.claim.role', true) = 'service_role'
                 OR current_setting('role', true) IN ('service_role', 'postgres')
                 OR session_user IN ('postgres', 'supabase_admin');

  IF _is_service THEN
    RETURN NEW;
  END IF;

  IF auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin') THEN
    RETURN NEW;
  END IF;

  IF NEW.user_id IS DISTINCT FROM OLD.user_id THEN
    RAISE EXCEPTION 'Only an administrator can change a profile owner';
  END IF;
  IF NEW.username IS DISTINCT FROM OLD.username THEN
    RAISE EXCEPTION 'Only an administrator can change your username';
  END IF;
  RAISE EXCEPTION 'Only an administrator can change your email';
END;
$function$;

CREATE OR REPLACE FUNCTION public.purge_expired_personal_data()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_throttle int := 0;
  v_notifications int := 0;
  v_requests int := 0;
begin
  -- Login throttling keys: only useful for the window they measure.
  delete from public.login_lookup_throttle
  where updated_at < now() - interval '30 days';
  get diagnostics v_throttle = row_count;

  -- Read notifications are a convenience log, not a record of anything.
  delete from public.notifications
  where read and created_at < now() - interval '180 days';
  get diagnostics v_notifications = row_count;

  -- Closed requests stay as a compliance record for two years, then go. Their
  -- email snapshot is the only personal data left in them.
  delete from public.data_requests
  where status in ('completed', 'refused')
    and coalesce(resolved_at, requested_at) < now() - interval '24 months';
  get diagnostics v_requests = row_count;

  return jsonb_build_object(
    'purged_at', now(),
    'login_throttle_rows', v_throttle,
    'notification_rows', v_notifications,
    'closed_request_rows', v_requests
  );
end;
$function$;

CREATE OR REPLACE FUNCTION public.record_objective_evidence(_user_id uuid, _question_id uuid, _is_correct boolean)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  _objective uuid;
begin
  select q.objective_id into _objective
    from public.questions q
   where q.id = _question_id;

  if _objective is null then
    return;
  end if;

  insert into public.objective_reviews as r
    (user_id, objective_id, stage, reviews, lapses, last_correct, due_at)
  values (
    _user_id,
    _objective,
    case when _is_correct then 1 else 0 end,
    1,
    case when _is_correct then 0 else 1 end,
    _is_correct,
    now() + public.objective_review_interval(case when _is_correct then 1 else 0 end)
  )
  on conflict (user_id, objective_id) do update
    set stage = case when _is_correct then least(5, r.stage + 1) else 0 end,
        reviews = r.reviews + 1,
        lapses = r.lapses + (case when _is_correct then 0 else 1 end),
        last_correct = excluded.last_correct,
        last_reviewed_at = now(),
        updated_at = now(),
        due_at = now() + public.objective_review_interval(
          case when _is_correct then least(5, r.stage + 1) else 0 end
        );
end;
$function$;

CREATE OR REPLACE FUNCTION public.record_paper_attempt(p_paper_id uuid, p_paper_title text, p_score integer, p_total_marks integer, p_session text DEFAULT NULL::text, p_year integer DEFAULT NULL::integer, p_paper_number text DEFAULT NULL::text, p_duration_seconds integer DEFAULT NULL::integer, p_time_limit_seconds integer DEFAULT NULL::integer, p_corrected_papers jsonb DEFAULT NULL::jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  _user_id uuid := auth.uid();
  _attempt_id uuid;
  _percentage integer;
  _xp integer := 0;
  _streak integer := 0;
begin
  if _user_id is null then raise exception 'Not authenticated'; end if;
  if not (public.is_user_approved(_user_id) or public.has_role(_user_id, 'admin')) then
    raise exception 'Account not approved';
  end if;

  _percentage := case
    when coalesce(p_total_marks, 0) > 0
      then round(least(greatest(coalesce(p_score, 0), 0), p_total_marks)::numeric / p_total_marks * 100)::integer
    else null
  end;

  insert into public.past_paper_attempts (
    user_id, paper_id, paper_title, session, year, paper_number,
    score, total_marks, percentage, duration_seconds, time_limit_seconds, corrected_papers
  ) values (
    _user_id, p_paper_id, p_paper_title, p_session, p_year, p_paper_number,
    greatest(coalesce(p_score, 0), 0), greatest(coalesce(p_total_marks, 0), 0), _percentage,
    p_duration_seconds, p_time_limit_seconds, p_corrected_papers
  )
  returning id into _attempt_id;

  if public.award_xp(_user_id, 'paper', _attempt_id::text, 20, 150) then
    perform public.touch_streak(_user_id);
  end if;

  -- award_xp() records the amount actually paid on the ledger row (and deletes
  -- the row when nothing was paid), so read it back rather than assuming 20.
  select points into _xp from public.xp_events
    where user_id = _user_id and tool = 'paper' and ref = _attempt_id::text;

  update public.past_paper_attempts set xp_earned = coalesce(_xp, 0) where id = _attempt_id;

  select current_streak into _streak from public.streaks where user_id = _user_id;

  return jsonb_build_object(
    'attempt_id', _attempt_id,
    'percentage', _percentage,
    'xp_earned', coalesce(_xp, 0),
    'streak', coalesce(_streak, 0)
  );
end;
$function$;

CREATE OR REPLACE FUNCTION public.register_login_lookup(_client_key text, _max integer DEFAULT 10, _window_seconds integer DEFAULT 60)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  _attempts integer;
BEGIN
  INSERT INTO public.login_lookup_throttle (client_key, window_started_at, attempts, updated_at)
  VALUES (_client_key, now(), 1, now())
  ON CONFLICT (client_key) DO UPDATE
    SET attempts = CASE
          WHEN public.login_lookup_throttle.window_started_at < now() - make_interval(secs => _window_seconds)
          THEN 1
          ELSE public.login_lookup_throttle.attempts + 1
        END,
        window_started_at = CASE
          WHEN public.login_lookup_throttle.window_started_at < now() - make_interval(secs => _window_seconds)
          THEN now()
          ELSE public.login_lookup_throttle.window_started_at
        END,
        updated_at = now()
  RETURNING attempts INTO _attempts;

  DELETE FROM public.login_lookup_throttle
  WHERE updated_at < now() - interval '1 hour';

  RETURN _attempts > _max;
END;
$function$;

CREATE OR REPLACE FUNCTION public.resolve_paper_link(p_check_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  _uid uuid := auth.uid();
  _c record;
begin
  if _uid is null then raise exception 'Not authenticated'; end if;
  if not public.has_role(_uid, 'admin') then raise exception 'Admin only'; end if;

  select * into _c from public.past_paper_link_checks where id = p_check_id for update;
  if _c.id is null then raise exception 'Link check not found'; end if;
  if _c.slot = 'candidate' then raise exception 'Use approve/dismiss for a candidate'; end if;
  if _c.review_status = 'resolved' then raise exception 'Already resolved'; end if;

  update public.past_paper_link_checks
    set review_status = 'resolved', reviewed_at = now(), reviewed_by = _uid
    where id = p_check_id;

  perform public.audit_admin_action(
    p_action := 'update',
    p_entity := 'past_paper_link',
    p_entity_id := _c.paper_id,
    p_entity_label := left(coalesce(_c.url, 'link'), 200),
    p_details := jsonb_build_object('check_id', p_check_id, 'slot', _c.slot, 'status', _c.status, 'error', _c.error),
    p_actor_id := _uid,
    p_actor_username := null
  );

  return jsonb_build_object('check_id', p_check_id, 'review_status', 'resolved');
end;
$function$;

CREATE OR REPLACE FUNCTION public.restore_content_revision(p_revision_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  r public.content_revisions%rowtype;
  v_is_admin boolean;
begin
  select exists (
    select 1 from public.user_roles ur
    where ur.user_id = auth.uid() and ur.role = 'admin' and ur.is_approved = true
  ) into v_is_admin;
  if not v_is_admin then
    raise exception 'restore_content_revision: only approved admins can restore revisions';
  end if;

  select * into r from public.content_revisions c where c.id = p_revision_id;
  if not found then
    raise exception 'restore_content_revision: revision % not found', p_revision_id;
  end if;

  if r.entity_type = 'lesson' then
    update public.lessons set
      title = r.title,
      content = r.content,
      video_url = r.extra->>'video_url',
      sort_order = coalesce((r.extra->>'sort_order')::integer, sort_order),
      updated_at = now()
    where id = r.entity_id;
  elsif r.entity_type = 'material' then
    update public.study_materials set
      title = r.title,
      content = r.content,
      material_type = coalesce(r.extra->>'material_type', material_type),
      file_url = coalesce(r.extra->>'file_url', file_url),
      updated_at = now()
    where id = r.entity_id;
  else
    raise exception 'restore_content_revision: unsupported entity_type %', r.entity_type;
  end if;
end;
$function$;

CREATE OR REPLACE FUNCTION public.rls_auto_enable()
 RETURNS event_trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'pg_catalog'
AS $function$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN
    SELECT *
    FROM pg_event_trigger_ddl_commands()
    WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      AND object_type IN ('table','partitioned table')
  LOOP
     IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
      BEGIN
        EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
        RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
      EXCEPTION
        WHEN OTHERS THEN
          RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
      END;
     ELSE
        RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
     END IF;
  END LOOP;
END;
$function$;

CREATE OR REPLACE FUNCTION public.send_welcome_email()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_role text;
  v_secret text;
BEGIN
  SELECT role INTO v_role FROM public.user_roles WHERE user_id = NEW.id;

  SELECT value INTO v_secret FROM private.app_secrets WHERE key = 'welcome_secret';

  IF v_secret IS NULL THEN
    RAISE WARNING 'welcome-email skipped: no secret configured';
    RETURN NEW;
  END IF;

  BEGIN
    PERFORM net.http_post(
      url := 'https://zzliiazovezhxbmfeqco.supabase.co/functions/v1/welcome-email',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'x-welcome-secret', v_secret
      ),
      body := jsonb_build_object(
        'recipient', jsonb_build_object(
          'email', NEW.email,
          'full_name', COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
          'role', v_role
        )
      ),
      timeout_milliseconds := 5000
    );
  EXCEPTION WHEN OTHERS THEN
    -- Email is best-effort; never block signup.
    RAISE WARNING 'welcome-email dispatch failed: %', SQLERRM;
  END;

  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.set_study_prefs(_patch jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  _uid uuid := auth.uid();
begin
  if _uid is null then raise exception 'Not authenticated'; end if;
  if _patch is null or jsonb_typeof(_patch) <> 'object' then raise exception 'Expected an object'; end if;

  insert into public.student_prefs (user_id) values (_uid) on conflict (user_id) do nothing;

  update public.student_prefs
     set weekly_goal_days = coalesce((_patch->>'weekly_goal_days')::integer, weekly_goal_days),
         session_minutes = coalesce((_patch->>'session_minutes')::integer, session_minutes),
         leaderboard_visible = coalesce((_patch->>'leaderboard_visible')::boolean, leaderboard_visible),
         reminders_enabled = coalesce((_patch->>'reminders_enabled')::boolean, reminders_enabled),
         animations_enabled = coalesce((_patch->>'animations_enabled')::boolean, animations_enabled),
         encouragement_enabled = coalesce((_patch->>'encouragement_enabled')::boolean, encouragement_enabled),
         updated_at = now()
   where user_id = _uid;

  return public.my_study_prefs();
end;
$function$;

CREATE OR REPLACE FUNCTION public.slugify_topic_name(txt text)
 RETURNS text
 LANGUAGE sql
 IMMUTABLE
AS $function$
  select coalesce(
    nullif(
      btrim(
        regexp_replace(
          regexp_replace(
            btrim(
              regexp_replace(
                normalize(lower(coalesce(txt, '')), NFKD),
                '[^a-z0-9\s-]', ' ', 'g'
              )
            ),
            '\s+', '-', 'g'
          ),
          '-+', '-', 'g'
        ),
        '-'
      ),
      ''
    ),
    'topic'
  );
$function$;

CREATE OR REPLACE FUNCTION public.snapshot_content_revision()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_actor uuid;
  v_username text;
  v_version integer;
  v_changed boolean;
begin
  select p.user_id, p.username into v_actor, v_username
  from public.profiles p where p.user_id = auth.uid();

  if tg_table_name = 'lessons' then
    v_changed := (old.title is distinct from new.title)
              or (old.content is distinct from new.content)
              or (old.video_url is distinct from new.video_url)
              or (old.sort_order is distinct from new.sort_order);
    if not v_changed then return new; end if;
    insert into public.content_revisions
      (entity_type, entity_id, title, content, extra, version, created_by, created_by_username)
    values
      ('lesson', old.id, old.title, old.content,
       jsonb_build_object('video_url', old.video_url, 'sort_order', old.sort_order),
       coalesce((select max(version) + 1 from public.content_revisions r
                 where r.entity_type = 'lesson' and r.entity_id = old.id), 1),
       v_actor, v_username);
  elsif tg_table_name = 'study_materials' then
    v_changed := (old.title is distinct from new.title)
              or (old.content is distinct from new.content)
              or (old.material_type is distinct from new.material_type)
              or (old.file_url is distinct from new.file_url);
    if not v_changed then return new; end if;
    insert into public.content_revisions
      (entity_type, entity_id, title, content, extra, version, created_by, created_by_username)
    values
      ('material', old.id, old.title, old.content,
       jsonb_build_object('material_type', old.material_type, 'file_url', old.file_url),
       coalesce((select max(version) + 1 from public.content_revisions r
                 where r.entity_type = 'material' and r.entity_id = old.id), 1),
       v_actor, v_username);
  end if;

  return new;
end;
$function$;

CREATE OR REPLACE FUNCTION public.start_study_session(_minutes integer DEFAULT 20)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  _uid uuid := auth.uid();
  _row public.study_sessions;
begin
  if _uid is null then raise exception 'Not authenticated'; end if;
  if not public.is_user_approved(_uid) then raise exception 'Account not approved'; end if;
  if _minutes not in (10, 20, 30) then raise exception 'Choose a 10, 20 or 30 minute session'; end if;

  update public.study_sessions
     set status = 'set_aside', ended_at = now()
   where user_id = _uid and status = 'active';

  insert into public.study_sessions (user_id, planned_minutes)
  values (_uid, _minutes)
  returning * into _row;

  return jsonb_build_object(
    'id', _row.id,
    'planned_minutes', _row.planned_minutes,
    'started_at', _row.started_at
  );
end;
$function$;

CREATE OR REPLACE FUNCTION public.syllabus_coverage()
 RETURNS TABLE(board text, spec_code text, level text, area text, code text, title text, tier text, subject_slug text, topic_slug text, topic_name text, mapped boolean, topic_note_chars integer, topic_questions integer, topic_materials integer, exam_tier_questions integer, technique_materials integer, statement_questions integer, topic_ready boolean, a_star_ready boolean)
 LANGUAGE sql
 STABLE
 SET search_path TO 'public'
AS $function$
  with per_topic as (
    select t.id,
           coalesce((select sum(length(l.content)) from public.lessons l where l.topic_id = t.id), 0)::int as note_chars,
           (select count(*) from public.questions q join public.quizzes z on z.id = q.quiz_id where z.topic_id = t.id)::int as questions,
           (select count(*) from public.study_materials m where m.topic_id = t.id)::int as materials,
           (select count(*) from public.questions q join public.quizzes z on z.id = q.quiz_id
             where z.topic_id = t.id and lower(coalesce(q.difficulty, '')) = 'exam')::int as exam_questions,
           (select count(*) from public.study_materials m
             where m.topic_id = t.id
               and lower(replace(coalesce(m.material_type, ''), '_', '-')) = 'exam-technique')::int as technique_materials
      from public.topics t
  )
  select st.board,
         st.spec_code,
         st.level,
         st.area,
         st.code,
         st.title,
         st.tier,
         sub.slug as subject_slug,
         t.slug as topic_slug,
         t.name as topic_name,
         (st.topic_id is not null) as mapped,
         coalesce(pt.note_chars, 0) as topic_note_chars,
         coalesce(pt.questions, 0) as topic_questions,
         coalesce(pt.materials, 0) as topic_materials,
         coalesce(pt.exam_questions, 0) as exam_tier_questions,
         coalesce(pt.technique_materials, 0) as technique_materials,
         (select count(*) from public.questions q where q.statement_id = st.id)::int as statement_questions,
         (st.topic_id is not null and coalesce(pt.note_chars, 0) >= 1000 and coalesce(pt.questions, 0) >= 15) as topic_ready,
         (st.topic_id is not null
            and coalesce(pt.exam_questions, 0) >= 5
            and coalesce(pt.technique_materials, 0) >= 1) as a_star_ready
    from public.syllabus_statements st
    left join public.topics t on t.id = st.topic_id
    left join per_topic pt on pt.id = st.topic_id
    left join public.subject_levels sl on sl.id = t.subject_level_id
    left join public.subjects sub on sub.id = sl.subject_id
   where public.has_role(auth.uid(), 'admin'::app_role)
   order by st.spec_code, st.sort_order, st.code;
$function$;

CREATE OR REPLACE FUNCTION public.today_goal_met(p_user_id uuid)
 RETURNS boolean
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select exists (
      select 1 from public.study_sessions s
      where s.user_id = p_user_id and s.status = 'completed'
        and s.started_at::date = current_date
    )
    or coalesce((
      select sum(e.points) from public.xp_events e
      where e.user_id = p_user_id and e.created_at::date = current_date
    ), 0) >= 50;
$function$;

CREATE OR REPLACE FUNCTION public.topic_objective_mastery(_topic_id uuid)
 RETURNS TABLE(objective_id uuid, code text, statement text, sort_order integer, checks integer, attempted integer, correct integer, state text)
 LANGUAGE sql
 STABLE
 SET search_path TO 'public'
AS $function$
  with checks as (
    select q.objective_id,
           count(*)::int as checks
      from public.questions q
      join public.quizzes z on z.id = q.quiz_id
     where z.topic_id = _topic_id
       and q.objective_id is not null
     group by q.objective_id
  ),
  mine as (
    select q.objective_id,
           count(*)::int as attempted,
           count(*) filter (where p.last_correct)::int as correct
      from public.practice_attempts p
      join public.questions q on q.id = p.question_id
      join public.quizzes z on z.id = q.quiz_id
     where z.topic_id = _topic_id
       and p.user_id = auth.uid()
       and q.objective_id is not null
     group by q.objective_id
  )
  select o.id,
         o.code,
         o.statement,
         o.sort_order,
         coalesce(c.checks, 0),
         coalesce(m.attempted, 0),
         coalesce(m.correct, 0),
         case
           when coalesce(m.attempted, 0) = 0 then 'not_started'
           when coalesce(c.checks, 0) > 0 and coalesce(m.correct, 0) >= c.checks then 'mastered'
           else 'working'
         end
    from public.learning_objectives o
    left join checks c on c.objective_id = o.id
    left join mine m on m.objective_id = o.id
   where o.topic_id = _topic_id
   order by o.sort_order, o.code;
$function$;

CREATE OR REPLACE FUNCTION public.topics_set_slug()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
declare
  base text;
  candidate text;
  n int := 1;
begin
  if new.slug is null or btrim(new.slug) = '' then
    base := public.slugify_topic_name(new.name);
    candidate := base;
    while exists (
      select 1 from public.topics
      where slug = candidate
        and subject_level_id is not distinct from new.subject_level_id
        and id is distinct from new.id
    ) loop
      n := n + 1;
      candidate := base || '-' || n;
    end loop;
    new.slug := candidate;
  end if;
  return new;
end;
$function$;

CREATE OR REPLACE FUNCTION public.touch_streak(p_user_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_week_start date := date_trunc('week', current_date)::date;
  v_days integer;
begin
  if p_user_id is null then return; end if;

  insert into public.streaks (user_id, current_streak, longest_streak, last_active)
  values (p_user_id, 0, 0, current_date)
  on conflict (user_id) do nothing;

  -- Days studied this ISO week, straight from the XP ledger. Nothing here can
  -- decrease: a quiet day just is not added, and Monday starts a fresh count.
  select count(distinct e.created_at::date)
    into v_days
  from public.xp_events e
  where e.user_id = p_user_id
    and e.created_at >= v_week_start
    and e.created_at < v_week_start + 7;

  update public.streaks
     set current_streak = coalesce(v_days, 0),
         longest_streak = greatest(longest_streak, coalesce(v_days, 0)),
         last_active = current_date,
         updated_at = now()
   where user_id = p_user_id;
end;
$function$;

CREATE OR REPLACE FUNCTION public.trg_practice_attempt_objective()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  perform public.record_objective_evidence(new.user_id, new.question_id, new.last_correct);
  return null;
end;
$function$;

CREATE OR REPLACE FUNCTION public.update_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.write_admin_audit_log()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_actor uuid;
  v_username text;
  v_action text;
  v_old_label text;
  v_new_label text;
  v_diff jsonb;
begin
  select p.user_id, p.username into v_actor, v_username
  from public.profiles p where p.user_id = auth.uid();

  if tg_op = 'INSERT' then
    v_action := 'create';
  elsif tg_op = 'UPDATE' then
    if new is not distinct from old then return null; end if;
    v_action := 'update';
  elsif tg_op = 'DELETE' then
    v_action := 'delete';
  end if;

  v_new_label := coalesce(to_jsonb(new)->>'title', to_jsonb(new)->>'name', to_jsonb(new)->>'username');
  v_old_label := coalesce(to_jsonb(old)->>'title', to_jsonb(old)->>'name', to_jsonb(old)->>'username');
  v_diff := jsonb_build_object(
    'before', to_jsonb(old),
    'after', to_jsonb(new)
  );

  insert into public.admin_audit_log (actor_id, actor_username, action, entity, entity_id, entity_label, details)
  values (
    v_actor,
    v_username,
    v_action,
    tg_table_name,
    coalesce(to_jsonb(new)->>'id', to_jsonb(old)->>'id')::uuid,
    coalesce(v_new_label, v_old_label),
    v_diff
  );

  -- Owner alerts: content deletions and user_roles changes.
  if v_action = 'delete' or tg_table_name = 'user_roles' then
    perform public.notify_admins_of_sensitive_event(
      v_action, tg_table_name, coalesce(v_new_label, v_old_label), v_username);
  end if;

  return null;
end;
$function$;

CREATE OR REPLACE FUNCTION public.xp_on_flashcard_review()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  if public.award_xp(new.user_id, 'flashcards', new.flashcard_id::text, 5, 40) then
    perform public.touch_streak(new.user_id);
  end if;
  return null;
end;
$function$;

CREATE OR REPLACE FUNCTION public.xp_on_lesson_complete()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  if new.completed and (old.completed is not true) then
    if public.award_xp(new.user_id, 'lesson', new.lesson_id::text, 10, 60) then
      perform public.touch_streak(new.user_id);
    end if;
  end if;
  return null;
end;
$function$;

CREATE OR REPLACE FUNCTION public.xp_on_material_complete()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  if new.completed and (old.completed is not true) then
    if public.award_xp(new.user_id, 'note', new.material_id::text, 10, 60) then
      perform public.touch_streak(new.user_id);
    end if;
  end if;
  return null;
end;
$function$;


-- ============ triggers ============
drop trigger if exists "audit_announcements_changes" on public."announcements";
CREATE TRIGGER audit_announcements_changes AFTER INSERT OR DELETE OR UPDATE ON announcements FOR EACH ROW EXECUTE FUNCTION write_admin_audit_log();
drop trigger if exists "on_feedback_created" on public."content_feedback";
CREATE TRIGGER on_feedback_created AFTER INSERT ON content_feedback FOR EACH ROW EXECUTE FUNCTION notify_admins_new_feedback();
drop trigger if exists "notify_admins_of_data_request" on public."data_requests";
CREATE TRIGGER notify_admins_of_data_request AFTER INSERT ON data_requests FOR EACH ROW EXECUTE FUNCTION pdpl_notify_admins_of_request();
drop trigger if exists "set_data_request_email" on public."data_requests";
CREATE TRIGGER set_data_request_email BEFORE INSERT ON data_requests FOR EACH ROW EXECUTE FUNCTION pdpl_snapshot_request_email();
drop trigger if exists "audit_email_suppressions_changes" on public."email_suppressions";
CREATE TRIGGER audit_email_suppressions_changes AFTER INSERT OR DELETE OR UPDATE ON email_suppressions FOR EACH ROW EXECUTE FUNCTION write_admin_audit_log();
drop trigger if exists "on_feedback_reply_notify" on public."feedback_messages";
CREATE TRIGGER on_feedback_reply_notify AFTER INSERT ON feedback_messages FOR EACH ROW EXECUTE FUNCTION notify_feedback_reply();
drop trigger if exists "xp_flashcard_review" on public."flashcard_progress";
CREATE TRIGGER xp_flashcard_review AFTER INSERT ON flashcard_progress FOR EACH ROW EXECUTE FUNCTION xp_on_flashcard_review();
drop trigger if exists "audit_flashcard_sets_changes" on public."flashcard_sets";
CREATE TRIGGER audit_flashcard_sets_changes AFTER INSERT OR DELETE OR UPDATE ON flashcard_sets FOR EACH ROW EXECUTE FUNCTION write_admin_audit_log();
drop trigger if exists "update_flashcard_sets_updated_at" on public."flashcard_sets";
CREATE TRIGGER update_flashcard_sets_updated_at BEFORE UPDATE ON flashcard_sets FOR EACH ROW EXECUTE FUNCTION update_updated_at();
drop trigger if exists "audit_flashcards_changes" on public."flashcards";
CREATE TRIGGER audit_flashcards_changes AFTER INSERT OR DELETE OR UPDATE ON flashcards FOR EACH ROW EXECUTE FUNCTION write_admin_audit_log();
drop trigger if exists "audit_homework_changes" on public."homework";
CREATE TRIGGER audit_homework_changes AFTER INSERT OR DELETE OR UPDATE ON homework FOR EACH ROW EXECUTE FUNCTION write_admin_audit_log();
drop trigger if exists "update_homework_updated_at" on public."homework";
CREATE TRIGGER update_homework_updated_at BEFORE UPDATE ON homework FOR EACH ROW EXECUTE FUNCTION update_updated_at();
drop trigger if exists "trg_log_homework_submissions" on public."homework_submissions";
CREATE TRIGGER trg_log_homework_submissions AFTER INSERT ON homework_submissions FOR EACH ROW EXECUTE FUNCTION log_student_activity();
drop trigger if exists "update_learning_objectives_updated_at" on public."learning_objectives";
CREATE TRIGGER update_learning_objectives_updated_at BEFORE UPDATE ON learning_objectives FOR EACH ROW EXECUTE FUNCTION update_updated_at();
drop trigger if exists "xp_lesson_complete" on public."lesson_progress";
CREATE TRIGGER xp_lesson_complete AFTER INSERT OR UPDATE OF completed ON lesson_progress FOR EACH ROW EXECUTE FUNCTION xp_on_lesson_complete();
drop trigger if exists "audit_lessons_changes" on public."lessons";
CREATE TRIGGER audit_lessons_changes AFTER INSERT OR DELETE OR UPDATE ON lessons FOR EACH ROW EXECUTE FUNCTION write_admin_audit_log();
drop trigger if exists "trg_lessons_revision" on public."lessons";
CREATE TRIGGER trg_lessons_revision BEFORE UPDATE ON lessons FOR EACH ROW EXECUTE FUNCTION snapshot_content_revision();
drop trigger if exists "update_lessons_updated_at" on public."lessons";
CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON lessons FOR EACH ROW EXECUTE FUNCTION update_updated_at();
drop trigger if exists "set_material_progress_updated_at" on public."material_progress";
CREATE TRIGGER set_material_progress_updated_at BEFORE UPDATE ON material_progress FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');
drop trigger if exists "xp_material_complete" on public."material_progress";
CREATE TRIGGER xp_material_complete AFTER INSERT OR UPDATE OF completed ON material_progress FOR EACH ROW EXECUTE FUNCTION xp_on_material_complete();
drop trigger if exists "update_objective_reviews_updated_at" on public."objective_reviews";
CREATE TRIGGER update_objective_reviews_updated_at BEFORE UPDATE ON objective_reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at();
drop trigger if exists "audit_past_papers_changes" on public."past_papers";
CREATE TRIGGER audit_past_papers_changes AFTER INSERT OR DELETE OR UPDATE ON past_papers FOR EACH ROW EXECUTE FUNCTION write_admin_audit_log();
drop trigger if exists "set_past_papers_updated_at" on public."past_papers";
CREATE TRIGGER set_past_papers_updated_at BEFORE UPDATE ON past_papers FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');
drop trigger if exists "practice_attempts_objective_review" on public."practice_attempts";
CREATE TRIGGER practice_attempts_objective_review AFTER INSERT OR UPDATE OF last_correct ON practice_attempts FOR EACH ROW EXECUTE FUNCTION trg_practice_attempt_objective();
drop trigger if exists "protect_profile_identity_fields" on public."profiles";
CREATE TRIGGER protect_profile_identity_fields BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION protect_profile_identity_fields();
drop trigger if exists "update_profiles_updated_at" on public."profiles";
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
drop trigger if exists "audit_questions_changes" on public."questions";
CREATE TRIGGER audit_questions_changes AFTER INSERT OR DELETE OR UPDATE ON questions FOR EACH ROW EXECUTE FUNCTION write_admin_audit_log();
drop trigger if exists "trg_log_quiz_attempts" on public."quiz_attempts";
CREATE TRIGGER trg_log_quiz_attempts AFTER INSERT ON quiz_attempts FOR EACH ROW EXECUTE FUNCTION log_student_activity();
drop trigger if exists "audit_quizzes_changes" on public."quizzes";
CREATE TRIGGER audit_quizzes_changes AFTER INSERT OR DELETE OR UPDATE ON quizzes FOR EACH ROW EXECUTE FUNCTION write_admin_audit_log();
drop trigger if exists "update_quizzes_updated_at" on public."quizzes";
CREATE TRIGGER update_quizzes_updated_at BEFORE UPDATE ON quizzes FOR EACH ROW EXECUTE FUNCTION update_updated_at();
drop trigger if exists "audit_study_materials_changes" on public."study_materials";
CREATE TRIGGER audit_study_materials_changes AFTER INSERT OR DELETE OR UPDATE ON study_materials FOR EACH ROW EXECUTE FUNCTION write_admin_audit_log();
drop trigger if exists "trg_materials_revision" on public."study_materials";
CREATE TRIGGER trg_materials_revision BEFORE UPDATE ON study_materials FOR EACH ROW EXECUTE FUNCTION snapshot_content_revision();
drop trigger if exists "update_study_materials_updated_at" on public."study_materials";
CREATE TRIGGER update_study_materials_updated_at BEFORE UPDATE ON study_materials FOR EACH ROW EXECUTE FUNCTION update_updated_at();
drop trigger if exists "set_study_plans_updated_at" on public."study_plans";
CREATE TRIGGER set_study_plans_updated_at BEFORE UPDATE ON study_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at();
drop trigger if exists "audit_subject_levels_changes" on public."subject_levels";
CREATE TRIGGER audit_subject_levels_changes AFTER INSERT OR DELETE OR UPDATE ON subject_levels FOR EACH ROW EXECUTE FUNCTION write_admin_audit_log();
drop trigger if exists "update_subject_levels_updated_at" on public."subject_levels";
CREATE TRIGGER update_subject_levels_updated_at BEFORE UPDATE ON subject_levels FOR EACH ROW EXECUTE FUNCTION update_updated_at();
drop trigger if exists "audit_subjects_changes" on public."subjects";
CREATE TRIGGER audit_subjects_changes AFTER INSERT OR DELETE OR UPDATE ON subjects FOR EACH ROW EXECUTE FUNCTION write_admin_audit_log();
drop trigger if exists "update_subjects_updated_at" on public."subjects";
CREATE TRIGGER update_subjects_updated_at BEFORE UPDATE ON subjects FOR EACH ROW EXECUTE FUNCTION update_updated_at();
drop trigger if exists "update_syllabus_statements_updated_at" on public."syllabus_statements";
CREATE TRIGGER update_syllabus_statements_updated_at BEFORE UPDATE ON syllabus_statements FOR EACH ROW EXECUTE FUNCTION update_updated_at();
drop trigger if exists "audit_topics_changes" on public."topics";
CREATE TRIGGER audit_topics_changes AFTER INSERT OR DELETE OR UPDATE ON topics FOR EACH ROW EXECUTE FUNCTION write_admin_audit_log();
drop trigger if exists "topics_set_slug" on public."topics";
CREATE TRIGGER topics_set_slug BEFORE INSERT OR UPDATE OF name, slug ON topics FOR EACH ROW EXECUTE FUNCTION topics_set_slug();
drop trigger if exists "update_topics_updated_at" on public."topics";
CREATE TRIGGER update_topics_updated_at BEFORE UPDATE ON topics FOR EACH ROW EXECUTE FUNCTION update_updated_at();
drop trigger if exists "user_roles_writer_guard" on public."user_roles";
CREATE TRIGGER user_roles_writer_guard BEFORE INSERT OR DELETE OR UPDATE ON user_roles FOR EACH ROW EXECUTE FUNCTION enforce_user_roles_writer();

-- ============ row level security ============
alter table public."objective_reviews" enable row level security;
alter table public."admin_audit_log" enable row level security;
alter table public."ai_audit_log" enable row level security;
alter table public."syllabus_statements" enable row level security;
alter table public."xp_events" enable row level security;
alter table public."email_suppressions" enable row level security;
alter table public."admin_audit_log_archive" enable row level security;
alter table public."quizzes" enable row level security;
alter table public."lessons" enable row level security;
alter table public."questions" enable row level security;
alter table public."lesson_progress" enable row level security;
alter table public."homework" enable row level security;
alter table public."notifications" enable row level security;
alter table public."bookmarks" enable row level security;
alter table public."xp_daily" enable row level security;
alter table public."announcements" enable row level security;
alter table public."user_roles" enable row level security;
alter table public."study_materials" enable row level security;
alter table public."homework_submissions" enable row level security;
alter table public."quiz_attempts" enable row level security;
alter table public."subjects" enable row level security;
alter table public."subject_levels" enable row level security;
alter table public."topics" enable row level security;
alter table public."streaks" enable row level security;
alter table public."ai_correction" enable row level security;
alter table public."plans" enable row level security;
alter table public."announcement_reads" enable row level security;
alter table public."subscriptions" enable row level security;
alter table public."feedback_messages" enable row level security;
alter table public."parent_link_invites" enable row level security;
alter table public."flashcard_sets" enable row level security;
alter table public."past_papers" enable row level security;
alter table public."material_progress" enable row level security;
alter table public."_seed_fixes" enable row level security;
alter table public."practice_attempts" enable row level security;
alter table public."content_feedback" enable row level security;
alter table public."question_bookmarks" enable row level security;
alter table public."login_lookup_throttle" enable row level security;
alter table public."weekly_reports" enable row level security;
alter table public."flashcards" enable row level security;
alter table public."flashcard_progress" enable row level security;
alter table public."content_file_versions" enable row level security;
alter table public."content_revisions" enable row level security;
alter table public."student_subject_prefs" enable row level security;
alter table public."study_plans" enable row level security;
alter table public."profiles" enable row level security;
alter table public."parent_student_links" enable row level security;
alter table public."past_paper_link_checks" enable row level security;
alter table public."past_paper_attempts" enable row level security;
alter table public."student_prefs" enable row level security;
alter table public."study_sessions" enable row level security;
alter table public."consent_records" enable row level security;
alter table public."data_requests" enable row level security;
alter table public."learning_objectives" enable row level security;

drop policy if exists "Admin audit log read - approved admins only" on public."admin_audit_log";
create policy "Admin audit log read - approved admins only" on public."admin_audit_log" for select using ((EXISTS ( SELECT 1
   FROM user_roles r
  WHERE ((r.user_id = auth.uid()) AND (r.role = 'admin'::app_role) AND (r.is_approved = true)))));
drop policy if exists "Archive read - approved admins only" on public."admin_audit_log_archive";
create policy "Archive read - approved admins only" on public."admin_audit_log_archive" for select to "authenticated" using ((EXISTS ( SELECT 1
   FROM user_roles r
  WHERE ((r.user_id = auth.uid()) AND (r.role = 'admin'::app_role) AND r.is_approved))));
drop policy if exists "Admins can manage all AI audit log" on public."ai_audit_log";
create policy "Admins can manage all AI audit log" on public."ai_audit_log" for all to "authenticated" using (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Students can view own AI audit log" on public."ai_audit_log";
create policy "Students can view own AI audit log" on public."ai_audit_log" for select to "authenticated" using ((user_id = auth.uid()));
drop policy if exists "Admins can manage all AI corrections" on public."ai_correction";
create policy "Admins can manage all AI corrections" on public."ai_correction" for all to "authenticated" using (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Students can insert own AI corrections" on public."ai_correction";
create policy "Students can insert own AI corrections" on public."ai_correction" for insert to "authenticated" with check (((user_id = auth.uid()) AND ((EXISTS ( SELECT 1
   FROM user_roles
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'admin'::app_role) AND (user_roles.is_approved = true)))) OR (EXISTS ( SELECT 1
   FROM subscriptions
  WHERE ((subscriptions.user_id = auth.uid()) AND (subscriptions.status = 'active'::text) AND ((subscriptions.ends_at IS NULL) OR (subscriptions.ends_at > now()))))))));
drop policy if exists "Students can view own AI corrections" on public."ai_correction";
create policy "Students can view own AI corrections" on public."ai_correction" for select to "authenticated" using ((user_id = auth.uid()));
drop policy if exists "Users clear own announcement state" on public."announcement_reads";
create policy "Users clear own announcement state" on public."announcement_reads" for delete to "authenticated" using ((user_id = auth.uid()));
drop policy if exists "Users mark own announcements read" on public."announcement_reads";
create policy "Users mark own announcements read" on public."announcement_reads" for insert to "authenticated" with check ((user_id = auth.uid()));
drop policy if exists "Users read own announcement state" on public."announcement_reads";
create policy "Users read own announcement state" on public."announcement_reads" for select to "authenticated" using ((user_id = auth.uid()));
drop policy if exists "Users update own announcement state" on public."announcement_reads";
create policy "Users update own announcement state" on public."announcement_reads" for update to "authenticated" using ((user_id = auth.uid())) with check ((user_id = auth.uid()));
drop policy if exists "Admins can manage announcements" on public."announcements";
create policy "Admins can manage announcements" on public."announcements" for all to "authenticated" using (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Approved users can view announcements" on public."announcements";
create policy "Approved users can view announcements" on public."announcements" for select to "authenticated" using ((is_user_approved(auth.uid()) OR has_role(auth.uid(), 'admin'::app_role)));
drop policy if exists "Users can delete own bookmarks" on public."bookmarks";
create policy "Users can delete own bookmarks" on public."bookmarks" for delete to "authenticated" using ((user_id = auth.uid()));
drop policy if exists "Users can insert own bookmarks" on public."bookmarks";
create policy "Users can insert own bookmarks" on public."bookmarks" for insert with check ((auth.uid() = user_id));
drop policy if exists "Users can view own bookmarks" on public."bookmarks";
create policy "Users can view own bookmarks" on public."bookmarks" for select to "authenticated" using ((user_id = auth.uid()));
drop policy if exists "Admins read all consent records" on public."consent_records";
create policy "Admins read all consent records" on public."consent_records" for select to "authenticated" using (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Users read own consent records" on public."consent_records";
create policy "Users read own consent records" on public."consent_records" for select to "authenticated" using ((user_id = auth.uid()));
drop policy if exists "Admins can manage all feedback" on public."content_feedback";
create policy "Admins can manage all feedback" on public."content_feedback" for all to "authenticated" using (has_role(auth.uid(), 'admin'::app_role)) with check (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Users can insert own feedback" on public."content_feedback";
create policy "Users can insert own feedback" on public."content_feedback" for insert to "authenticated" with check ((user_id = auth.uid()));
drop policy if exists "Users can view own feedback" on public."content_feedback";
create policy "Users can view own feedback" on public."content_feedback" for select to "authenticated" using ((user_id = auth.uid()));
drop policy if exists "Admins manage content file versions" on public."content_file_versions";
create policy "Admins manage content file versions" on public."content_file_versions" for all to "authenticated" using (has_role(auth.uid(), 'admin'::app_role)) with check (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Content revisions read - approved admins only" on public."content_revisions";
create policy "Content revisions read - approved admins only" on public."content_revisions" for select using ((EXISTS ( SELECT 1
   FROM user_roles r
  WHERE ((r.user_id = auth.uid()) AND (r.role = 'admin'::app_role) AND (r.is_approved = true)))));
drop policy if exists "Admins manage data requests" on public."data_requests";
create policy "Admins manage data requests" on public."data_requests" for all to "authenticated" using (has_role(auth.uid(), 'admin'::app_role)) with check (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Users file own data requests" on public."data_requests";
create policy "Users file own data requests" on public."data_requests" for insert to "authenticated" with check ((user_id = auth.uid()));
drop policy if exists "Users read own data requests" on public."data_requests";
create policy "Users read own data requests" on public."data_requests" for select to "authenticated" using ((user_id = auth.uid()));
drop policy if exists "Users withdraw own pending request" on public."data_requests";
create policy "Users withdraw own pending request" on public."data_requests" for delete to "authenticated" using (((user_id = auth.uid()) AND (status = 'pending'::text)));
drop policy if exists "admins_clear_suppressions" on public."email_suppressions";
create policy "admins_clear_suppressions" on public."email_suppressions" for delete to "authenticated" using ((EXISTS ( SELECT 1
   FROM user_roles r
  WHERE ((r.user_id = auth.uid()) AND (r.role = 'admin'::app_role) AND (r.is_approved = true)))));
drop policy if exists "admins_view_suppressions" on public."email_suppressions";
create policy "admins_view_suppressions" on public."email_suppressions" for select to "authenticated" using ((EXISTS ( SELECT 1
   FROM user_roles r
  WHERE ((r.user_id = auth.uid()) AND (r.role = 'admin'::app_role) AND (r.is_approved = true)))));
drop policy if exists "Admins post to any thread" on public."feedback_messages";
create policy "Admins post to any thread" on public."feedback_messages" for insert to "authenticated" with check (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Thread participants read messages" on public."feedback_messages";
create policy "Thread participants read messages" on public."feedback_messages" for select to "authenticated" using (((sender_id = auth.uid()) OR has_role(auth.uid(), 'admin'::app_role) OR (EXISTS ( SELECT 1
   FROM content_feedback f
  WHERE ((f.id = feedback_messages.feedback_id) AND (f.user_id = auth.uid()))))));
drop policy if exists "Users post to their own thread" on public."feedback_messages";
create policy "Users post to their own thread" on public."feedback_messages" for insert to "authenticated" with check (((sender_id = auth.uid()) AND (EXISTS ( SELECT 1
   FROM content_feedback f
  WHERE ((f.id = feedback_messages.feedback_id) AND (f.user_id = auth.uid()))))));
drop policy if exists "Admins can view all flashcard_progress" on public."flashcard_progress";
create policy "Admins can view all flashcard_progress" on public."flashcard_progress" for select to "authenticated" using (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Users can insert own flashcard_progress" on public."flashcard_progress";
create policy "Users can insert own flashcard_progress" on public."flashcard_progress" for insert to "authenticated" with check ((user_id = auth.uid()));
drop policy if exists "Users can update own flashcard_progress" on public."flashcard_progress";
create policy "Users can update own flashcard_progress" on public."flashcard_progress" for update to "authenticated" using ((user_id = auth.uid()));
drop policy if exists "Users can view own flashcard_progress" on public."flashcard_progress";
create policy "Users can view own flashcard_progress" on public."flashcard_progress" for select to "authenticated" using ((user_id = auth.uid()));
drop policy if exists "Admins can manage flashcard_sets" on public."flashcard_sets";
create policy "Admins can manage flashcard_sets" on public."flashcard_sets" for all to "authenticated" using (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Authenticated can view flashcard_sets" on public."flashcard_sets";
create policy "Authenticated can view flashcard_sets" on public."flashcard_sets" for select to "authenticated" using (true);
drop policy if exists "Admins can manage flashcards" on public."flashcards";
create policy "Admins can manage flashcards" on public."flashcards" for all to "authenticated" using (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Authenticated can view flashcards" on public."flashcards";
create policy "Authenticated can view flashcards" on public."flashcards" for select to "authenticated" using (true);
drop policy if exists "Admins can manage homework" on public."homework";
create policy "Admins can manage homework" on public."homework" for all to "authenticated" using (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Anyone authenticated can view homework" on public."homework";
create policy "Anyone authenticated can view homework" on public."homework" for select to "authenticated" using (true);
drop policy if exists "Admins can manage all submissions" on public."homework_submissions";
create policy "Admins can manage all submissions" on public."homework_submissions" for all to "authenticated" using (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Parents can view linked student submissions" on public."homework_submissions";
create policy "Parents can view linked student submissions" on public."homework_submissions" for select to "authenticated" using ((has_role(auth.uid(), 'parent'::app_role) AND is_linked_parent(auth.uid(), user_id)));
drop policy if exists "Users can insert own submissions" on public."homework_submissions";
create policy "Users can insert own submissions" on public."homework_submissions" for insert with check ((auth.uid() = user_id));
drop policy if exists "Users can update own submissions" on public."homework_submissions";
create policy "Users can update own submissions" on public."homework_submissions" for update to "authenticated" using ((user_id = auth.uid()));
drop policy if exists "Users can view own submissions" on public."homework_submissions";
create policy "Users can view own submissions" on public."homework_submissions" for select to "authenticated" using ((user_id = auth.uid()));
drop policy if exists "Admins can manage objectives" on public."learning_objectives";
create policy "Admins can manage objectives" on public."learning_objectives" for all to "authenticated" using (has_role(auth.uid(), 'admin'::app_role)) with check (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Anyone authenticated can view objectives" on public."learning_objectives";
create policy "Anyone authenticated can view objectives" on public."learning_objectives" for select to "authenticated" using (true);
drop policy if exists "Anyone can view objectives" on public."learning_objectives";
create policy "Anyone can view objectives" on public."learning_objectives" for select to "anon" using (true);
drop policy if exists "Admins can view all progress" on public."lesson_progress";
create policy "Admins can view all progress" on public."lesson_progress" for select to "authenticated" using (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Parents can view linked student progress" on public."lesson_progress";
create policy "Parents can view linked student progress" on public."lesson_progress" for select to "authenticated" using ((has_role(auth.uid(), 'parent'::app_role) AND is_linked_parent(auth.uid(), user_id)));
drop policy if exists "Users can insert own progress" on public."lesson_progress";
create policy "Users can insert own progress" on public."lesson_progress" for insert with check ((auth.uid() = user_id));
drop policy if exists "Users can update own progress" on public."lesson_progress";
create policy "Users can update own progress" on public."lesson_progress" for update to "authenticated" using ((user_id = auth.uid()));
drop policy if exists "Users can view own progress" on public."lesson_progress";
create policy "Users can view own progress" on public."lesson_progress" for select to "authenticated" using ((user_id = auth.uid()));
drop policy if exists "Admins can manage lessons" on public."lessons";
create policy "Admins can manage lessons" on public."lessons" for all to "authenticated" using (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Anyone authenticated can view lessons" on public."lessons";
create policy "Anyone authenticated can view lessons" on public."lessons" for select to "authenticated" using (true);
drop policy if exists "Anyone can view lessons" on public."lessons";
create policy "Anyone can view lessons" on public."lessons" for select to "anon" using (true);
drop policy if exists "No client access to login throttle" on public."login_lookup_throttle";
create policy "No client access to login throttle" on public."login_lookup_throttle" for all to "authenticated" using (false) with check (false);
drop policy if exists "Users manage own material progress" on public."material_progress";
create policy "Users manage own material progress" on public."material_progress" for all using ((auth.uid() = user_id)) with check ((auth.uid() = user_id));
drop policy if exists "Admins can manage all notifications" on public."notifications";
create policy "Admins can manage all notifications" on public."notifications" for all to "authenticated" using (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Users can update own notifications" on public."notifications";
create policy "Users can update own notifications" on public."notifications" for update to "authenticated" using ((user_id = auth.uid()));
drop policy if exists "Users can view own notifications" on public."notifications";
create policy "Users can view own notifications" on public."notifications" for select to "authenticated" using ((user_id = auth.uid()));
drop policy if exists "Admins can manage review schedules" on public."objective_reviews";
create policy "Admins can manage review schedules" on public."objective_reviews" for all to "authenticated" using (has_role(auth.uid(), 'admin'::app_role)) with check (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Students can view their own review schedule" on public."objective_reviews";
create policy "Students can view their own review schedule" on public."objective_reviews" for select to "authenticated" using ((auth.uid() = user_id));
drop policy if exists "Service role only" on public."parent_link_invites";
create policy "Service role only" on public."parent_link_invites" for all to "anon", "authenticated" using (false) with check (false);
drop policy if exists "Admins can manage all links" on public."parent_student_links";
create policy "Admins can manage all links" on public."parent_student_links" for all to "authenticated" using (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Parents can create own links" on public."parent_student_links";
create policy "Parents can create own links" on public."parent_student_links" for insert with check ((has_role(auth.uid(), 'parent'::app_role) AND (parent_id = auth.uid())));
drop policy if exists "Parents can remove own links" on public."parent_student_links";
create policy "Parents can remove own links" on public."parent_student_links" for delete using ((parent_id = auth.uid()));
drop policy if exists "Parents can view own links" on public."parent_student_links";
create policy "Parents can view own links" on public."parent_student_links" for select to "authenticated" using ((parent_id = auth.uid()));
drop policy if exists "Students can view own links" on public."parent_student_links";
create policy "Students can view own links" on public."parent_student_links" for select to "authenticated" using ((student_id = auth.uid()));
drop policy if exists "past paper attempts read own" on public."past_paper_attempts";
create policy "past paper attempts read own" on public."past_paper_attempts" for select to "authenticated" using (((user_id = auth.uid()) OR has_role(auth.uid(), 'admin'::app_role)));
drop policy if exists "past paper link checks read - approved admins only" on public."past_paper_link_checks";
create policy "past paper link checks read - approved admins only" on public."past_paper_link_checks" for select using ((EXISTS ( SELECT 1
   FROM user_roles r
  WHERE ((r.user_id = auth.uid()) AND (r.role = 'admin'::app_role) AND (r.is_approved = true)))));
drop policy if exists "Admins manage past papers" on public."past_papers";
create policy "Admins manage past papers" on public."past_papers" for all using (has_role(auth.uid(), 'admin'::app_role)) with check (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Anyone can view past papers" on public."past_papers";
create policy "Anyone can view past papers" on public."past_papers" for select to "anon" using (true);
drop policy if exists "Authenticated users can view past papers" on public."past_papers";
create policy "Authenticated users can view past papers" on public."past_papers" for select using ((auth.uid() IS NOT NULL));
drop policy if exists "Admins can view all practice_attempts" on public."practice_attempts";
create policy "Admins can view all practice_attempts" on public."practice_attempts" for select to "authenticated" using (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Users can insert own practice_attempts" on public."practice_attempts";
create policy "Users can insert own practice_attempts" on public."practice_attempts" for insert to "authenticated" with check ((user_id = auth.uid()));
drop policy if exists "Users can update own practice_attempts" on public."practice_attempts";
create policy "Users can update own practice_attempts" on public."practice_attempts" for update to "authenticated" using ((user_id = auth.uid()));
drop policy if exists "Users can view own practice_attempts" on public."practice_attempts";
create policy "Users can view own practice_attempts" on public."practice_attempts" for select to "authenticated" using ((user_id = auth.uid()));
drop policy if exists "Admins can update all profiles" on public."profiles";
create policy "Admins can update all profiles" on public."profiles" for update to "authenticated" using (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Admins can view all profiles" on public."profiles";
create policy "Admins can view all profiles" on public."profiles" for select to "authenticated" using (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Parents can view linked and findable students" on public."profiles";
create policy "Parents can view linked and findable students" on public."profiles" for select using (i_am_parent());
drop policy if exists "System inserts profiles" on public."profiles";
create policy "System inserts profiles" on public."profiles" for insert to "authenticated" with check ((user_id = auth.uid()));
drop policy if exists "Users can update own profile" on public."profiles";
create policy "Users can update own profile" on public."profiles" for update to "authenticated" using ((user_id = auth.uid()));
drop policy if exists "Users can view own profile" on public."profiles";
create policy "Users can view own profile" on public."profiles" for select to "authenticated" using ((user_id = auth.uid()));
drop policy if exists "Admins view all question bookmarks" on public."question_bookmarks";
create policy "Admins view all question bookmarks" on public."question_bookmarks" for select to "authenticated" using (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Approved users manage own question bookmarks" on public."question_bookmarks";
create policy "Approved users manage own question bookmarks" on public."question_bookmarks" for all to "authenticated" using (((user_id = auth.uid()) AND is_user_approved(auth.uid()))) with check (((user_id = auth.uid()) AND is_user_approved(auth.uid())));
drop policy if exists "Admins can manage questions" on public."questions";
create policy "Admins can manage questions" on public."questions" for all to "authenticated" using (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Anyone authenticated can view questions" on public."questions";
create policy "Anyone authenticated can view questions" on public."questions" for select to "authenticated" using (true);
drop policy if exists "Admins can view all attempts" on public."quiz_attempts";
create policy "Admins can view all attempts" on public."quiz_attempts" for select to "authenticated" using (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Parents can view linked student attempts" on public."quiz_attempts";
create policy "Parents can view linked student attempts" on public."quiz_attempts" for select to "authenticated" using ((has_role(auth.uid(), 'parent'::app_role) AND is_linked_parent(auth.uid(), user_id)));
drop policy if exists "Users can insert own attempts" on public."quiz_attempts";
create policy "Users can insert own attempts" on public."quiz_attempts" for insert with check ((auth.uid() = user_id));
drop policy if exists "Users can update own attempts" on public."quiz_attempts";
create policy "Users can update own attempts" on public."quiz_attempts" for update to "authenticated" using ((user_id = auth.uid()));
drop policy if exists "Users can view own attempts" on public."quiz_attempts";
create policy "Users can view own attempts" on public."quiz_attempts" for select to "authenticated" using ((user_id = auth.uid()));
drop policy if exists "Admins can manage quizzes" on public."quizzes";
create policy "Admins can manage quizzes" on public."quizzes" for all to "authenticated" using (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Anyone authenticated can view published quizzes" on public."quizzes";
create policy "Anyone authenticated can view published quizzes" on public."quizzes" for select to "authenticated" using (((is_published = true) OR has_role(auth.uid(), 'admin'::app_role)));
drop policy if exists "Anyone can view published quizzes" on public."quizzes";
create policy "Anyone can view published quizzes" on public."quizzes" for select to "anon" using (((is_published = true) OR has_role(auth.uid(), 'admin'::app_role)));
drop policy if exists "prefs read own" on public."student_prefs";
create policy "prefs read own" on public."student_prefs" for select using (((user_id = auth.uid()) OR has_role(auth.uid(), 'admin'::app_role)));
drop policy if exists "prefs update own" on public."student_prefs";
create policy "prefs update own" on public."student_prefs" for update using ((user_id = auth.uid())) with check ((user_id = auth.uid()));
drop policy if exists "prefs write own" on public."student_prefs";
create policy "prefs write own" on public."student_prefs" for insert with check ((user_id = auth.uid()));
drop policy if exists "Read own subject prefs" on public."student_subject_prefs";
create policy "Read own subject prefs" on public."student_subject_prefs" for select using ((auth.uid() = user_id));
drop policy if exists "Write own subject prefs" on public."student_subject_prefs";
create policy "Write own subject prefs" on public."student_subject_prefs" for all using ((auth.uid() = user_id)) with check ((auth.uid() = user_id));
drop policy if exists "Admins can manage materials" on public."study_materials";
create policy "Admins can manage materials" on public."study_materials" for all to "authenticated" using (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Anyone can view study materials" on public."study_materials";
create policy "Anyone can view study materials" on public."study_materials" for select to "anon" using (((file_url IS NULL) OR has_role(auth.uid(), 'admin'::app_role)));
drop policy if exists "Authenticated can view text materials" on public."study_materials";
create policy "Authenticated can view text materials" on public."study_materials" for select to "authenticated" using (((file_url IS NULL) OR has_role(auth.uid(), 'admin'::app_role)));
drop policy if exists "Admins can manage all study plans" on public."study_plans";
create policy "Admins can manage all study plans" on public."study_plans" for all to "authenticated" using (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Admins can view all study plans" on public."study_plans";
create policy "Admins can view all study plans" on public."study_plans" for select to "authenticated" using (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Students can insert own study plans" on public."study_plans";
create policy "Students can insert own study plans" on public."study_plans" for insert to "authenticated" with check ((user_id = auth.uid()));
drop policy if exists "Students can update own study plans" on public."study_plans";
create policy "Students can update own study plans" on public."study_plans" for update to "authenticated" using ((user_id = auth.uid())) with check ((user_id = auth.uid()));
drop policy if exists "Students can view own study plans" on public."study_plans";
create policy "Students can view own study plans" on public."study_plans" for select to "authenticated" using ((user_id = auth.uid()));
drop policy if exists "Users can delete own study plans" on public."study_plans";
create policy "Users can delete own study plans" on public."study_plans" for delete to "authenticated" using ((user_id = auth.uid()));
drop policy if exists "Users can insert own study plans" on public."study_plans";
create policy "Users can insert own study plans" on public."study_plans" for insert to "authenticated" with check ((user_id = auth.uid()));
drop policy if exists "Users can update own study plans" on public."study_plans";
create policy "Users can update own study plans" on public."study_plans" for update to "authenticated" using ((user_id = auth.uid()));
drop policy if exists "Users can view own study plans" on public."study_plans";
create policy "Users can view own study plans" on public."study_plans" for select to "authenticated" using ((user_id = auth.uid()));
drop policy if exists "sessions insert own" on public."study_sessions";
create policy "sessions insert own" on public."study_sessions" for insert with check ((user_id = auth.uid()));
drop policy if exists "sessions read own" on public."study_sessions";
create policy "sessions read own" on public."study_sessions" for select using (((user_id = auth.uid()) OR has_role(auth.uid(), 'admin'::app_role)));
drop policy if exists "sessions update own" on public."study_sessions";
create policy "sessions update own" on public."study_sessions" for update using ((user_id = auth.uid())) with check ((user_id = auth.uid()));
drop policy if exists "Admins manage subject levels" on public."subject_levels";
create policy "Admins manage subject levels" on public."subject_levels" for all to "authenticated" using (has_role(auth.uid(), 'admin'::app_role)) with check (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Anyone can view active subject levels" on public."subject_levels";
create policy "Anyone can view active subject levels" on public."subject_levels" for select using (((is_active = true) OR ((auth.uid() IS NOT NULL) AND has_role(auth.uid(), 'admin'::app_role))));
drop policy if exists "Admins manage subjects" on public."subjects";
create policy "Admins manage subjects" on public."subjects" for all to "authenticated" using (has_role(auth.uid(), 'admin'::app_role)) with check (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Anyone can view active subjects" on public."subjects";
create policy "Anyone can view active subjects" on public."subjects" for select using (((is_active = true) OR ((auth.uid() IS NOT NULL) AND has_role(auth.uid(), 'admin'::app_role))));
drop policy if exists "Admins insert subscriptions" on public."subscriptions";
create policy "Admins insert subscriptions" on public."subscriptions" for insert to "authenticated" with check (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Admins manage subscriptions" on public."subscriptions";
create policy "Admins manage subscriptions" on public."subscriptions" for update using ((EXISTS ( SELECT 1
   FROM user_roles ur
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'admin'::app_role)))));
drop policy if exists "Admins read all subscriptions" on public."subscriptions";
create policy "Admins read all subscriptions" on public."subscriptions" for select using ((EXISTS ( SELECT 1
   FROM user_roles ur
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'admin'::app_role)))));
drop policy if exists "Admins select all subscriptions" on public."subscriptions";
create policy "Admins select all subscriptions" on public."subscriptions" for select to "authenticated" using (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Users create own subscription request" on public."subscriptions";
create policy "Users create own subscription request" on public."subscriptions" for insert to "authenticated" with check (((auth.uid() = user_id) AND (status = 'pending_payment'::text) AND ((payment_method = ANY (ARRAY['bank_transfer'::text, 'ewallet_urpay'::text])) OR (payment_method IS NULL))));
drop policy if exists "Users read own subscription" on public."subscriptions";
create policy "Users read own subscription" on public."subscriptions" for select using ((auth.uid() = user_id));
drop policy if exists "Users update own pending subscription" on public."subscriptions";
create policy "Users update own pending subscription" on public."subscriptions" for update to "authenticated" using (((auth.uid() = user_id) AND (status = 'pending_payment'::text))) with check (((auth.uid() = user_id) AND (status = 'pending_payment'::text) AND ((payment_method = ANY (ARRAY['bank_transfer'::text, 'ewallet_urpay'::text])) OR (payment_method IS NULL)) AND (has_role(auth.uid(), 'admin'::app_role) OR ((full_name IS NOT NULL) AND ((receipt_path IS NOT NULL) OR (receipt_url IS NOT NULL))))));
drop policy if exists "Admins can manage syllabus statements" on public."syllabus_statements";
create policy "Admins can manage syllabus statements" on public."syllabus_statements" for all to "authenticated" using (has_role(auth.uid(), 'admin'::app_role)) with check (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Anyone authenticated can view syllabus statements" on public."syllabus_statements";
create policy "Anyone authenticated can view syllabus statements" on public."syllabus_statements" for select to "authenticated" using (true);
drop policy if exists "Anyone can view syllabus statements" on public."syllabus_statements";
create policy "Anyone can view syllabus statements" on public."syllabus_statements" for select to "anon" using (true);
drop policy if exists "Admins can manage topics" on public."topics";
create policy "Admins can manage topics" on public."topics" for all to "authenticated" using (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Anyone authenticated can view topics" on public."topics";
create policy "Anyone authenticated can view topics" on public."topics" for select to "authenticated" using (true);
drop policy if exists "Anyone can view topics" on public."topics";
create policy "Anyone can view topics" on public."topics" for select to "anon" using (true);
drop policy if exists "Admins can manage all roles" on public."user_roles";
create policy "Admins can manage all roles" on public."user_roles" for all using (has_role(auth.uid(), 'admin'::app_role)) with check (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Parents can verify student roles" on public."user_roles";
create policy "Parents can verify student roles" on public."user_roles" for select using ((i_am_parent() AND (role = 'student'::app_role)));
drop policy if exists "Users can view own roles" on public."user_roles";
create policy "Users can view own roles" on public."user_roles" for select to "authenticated" using ((user_id = auth.uid()));
drop policy if exists "Admins can manage weekly reports" on public."weekly_reports";
create policy "Admins can manage weekly reports" on public."weekly_reports" for all to "authenticated" using (has_role(auth.uid(), 'admin'::app_role)) with check (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Parents can view linked student reports" on public."weekly_reports";
create policy "Parents can view linked student reports" on public."weekly_reports" for select to "authenticated" using ((has_role(auth.uid(), 'parent'::app_role) AND is_linked_parent(auth.uid(), student_user_id)));
drop policy if exists "Students can view own reports" on public."weekly_reports";
create policy "Students can view own reports" on public."weekly_reports" for select to "authenticated" using ((student_user_id = auth.uid()));

-- ============ grants ============
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."_seed_fixes" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."_seed_fixes" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."_seed_fixes" to service_role;
grant SELECT on public."admin_audit_log" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."admin_audit_log" to service_role;
grant SELECT on public."admin_audit_log_archive" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."admin_audit_log_archive" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."ai_audit_log" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."ai_audit_log" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."ai_audit_log" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."ai_correction" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."ai_correction" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."ai_correction" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."announcement_reads" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."announcement_reads" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."announcement_reads" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."announcements" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."announcements" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."announcements" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."bookmarks" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."bookmarks" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."bookmarks" to service_role;
grant SELECT on public."consent_records" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."consent_records" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."content_feedback" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."content_feedback" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."content_feedback" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."content_file_versions" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."content_file_versions" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."content_file_versions" to service_role;
grant SELECT on public."content_revisions" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."content_revisions" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."data_requests" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."data_requests" to service_role;
grant DELETE, SELECT on public."email_suppressions" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."email_suppressions" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."feedback_messages" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."feedback_messages" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."feedback_messages" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."flashcard_progress" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."flashcard_progress" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."flashcard_progress" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."flashcard_sets" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."flashcard_sets" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."flashcard_sets" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."flashcards" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."flashcards" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."flashcards" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."homework" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."homework" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."homework" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."homework_submissions" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."homework_submissions" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."homework_submissions" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."leaderboard_public" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."leaderboard_public" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."leaderboard_public" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."learning_objectives" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."learning_objectives" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."learning_objectives" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."lesson_progress" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."lesson_progress" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."lesson_progress" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."lessons" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."lessons" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."lessons" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."login_lookup_throttle" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."login_lookup_throttle" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."login_lookup_throttle" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."material_progress" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."material_progress" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."material_progress" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."notifications" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."notifications" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."notifications" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."objective_reviews" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."objective_reviews" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."objective_reviews" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."parent_link_invites" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."parent_link_invites" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."parent_link_invites" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."parent_student_links" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."parent_student_links" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."parent_student_links" to service_role;
grant SELECT on public."past_paper_attempts" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."past_paper_attempts" to service_role;
grant SELECT on public."past_paper_link_checks" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."past_paper_link_checks" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."past_papers" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."past_papers" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."past_papers" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."plans" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."plans" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."plans" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."practice_attempts" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."practice_attempts" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."practice_attempts" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."profiles" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."profiles" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."profiles" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."question_bookmarks" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."question_bookmarks" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."question_bookmarks" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."questions" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."questions" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."questions" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."quiz_attempts" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."quiz_attempts" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."quiz_attempts" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."quizzes" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."quizzes" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."quizzes" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."streaks" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."streaks" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."streaks" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."student_prefs" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."student_prefs" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."student_prefs" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."student_subject_prefs" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."student_subject_prefs" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."student_subject_prefs" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."study_materials" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."study_materials" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."study_materials" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."study_plans" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."study_plans" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."study_plans" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."study_sessions" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."study_sessions" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."study_sessions" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."subject_levels" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."subject_levels" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."subject_levels" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."subjects" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."subjects" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."subjects" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."subscriptions" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."subscriptions" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."subscriptions" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."syllabus_statements" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."syllabus_statements" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."syllabus_statements" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."topics" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."topics" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."topics" to service_role;
grant REFERENCES, SELECT, TRIGGER on public."user_roles" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, UPDATE on public."user_roles" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."user_roles" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."weekly_reports" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."weekly_reports" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."weekly_reports" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."xp_daily" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."xp_daily" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."xp_daily" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."xp_events" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."xp_events" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."xp_events" to service_role;

-- ============ storage buckets ============
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('homework-uploads', 'homework-uploads', false, 26214400, array['application/pdf','image/png','image/jpeg','image/webp','image/gif','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document']::text[])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('lesson-resources', 'lesson-resources', true, 52428800, array['application/pdf','image/png','image/jpeg','image/webp','image/gif','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.openxmlformats-officedocument.presentationml.presentation','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/plain','text/markdown','text/csv']::text[])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('past-papers', 'past-papers', false, 52428800, array['application/pdf']::text[])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('quiz-files', 'quiz-files', false, null, null)
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('study-materials', 'study-materials', false, 52428800, array['application/pdf','image/png','image/jpeg','image/webp','image/gif','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.openxmlformats-officedocument.presentationml.presentation','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/plain','text/markdown','text/csv']::text[])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;
drop policy if exists "Admins can delete lesson resources" on "storage"."objects";
create policy "Admins can delete lesson resources" on "storage"."objects" for delete to "authenticated" using (((bucket_id = 'lesson-resources'::text) AND has_role(auth.uid(), 'admin'::app_role)));
drop policy if exists "Admins can delete past paper files" on "storage"."objects";
create policy "Admins can delete past paper files" on "storage"."objects" for delete using (((bucket_id = 'past-papers'::text) AND has_role(auth.uid(), 'admin'::app_role)));
drop policy if exists "Admins can update past paper files" on "storage"."objects";
create policy "Admins can update past paper files" on "storage"."objects" for update using (((bucket_id = 'past-papers'::text) AND has_role(auth.uid(), 'admin'::app_role)));
drop policy if exists "Admins can upload lesson resources" on "storage"."objects";
create policy "Admins can upload lesson resources" on "storage"."objects" for insert to "authenticated" with check (((bucket_id = 'lesson-resources'::text) AND has_role(auth.uid(), 'admin'::app_role)));
drop policy if exists "Admins can upload past paper files" on "storage"."objects";
create policy "Admins can upload past paper files" on "storage"."objects" for insert with check (((bucket_id = 'past-papers'::text) AND has_role(auth.uid(), 'admin'::app_role)));
drop policy if exists "Admins manage quiz files" on "storage"."objects";
create policy "Admins manage quiz files" on "storage"."objects" for all to "authenticated" using (((bucket_id = 'quiz-files'::text) AND has_role(auth.uid(), 'admin'::app_role))) with check (((bucket_id = 'quiz-files'::text) AND has_role(auth.uid(), 'admin'::app_role)));
drop policy if exists "Admins manage study materials" on "storage"."objects";
create policy "Admins manage study materials" on "storage"."objects" for all to "authenticated" using (((bucket_id = 'study-materials'::text) AND has_role(auth.uid(), 'admin'::app_role))) with check (((bucket_id = 'study-materials'::text) AND has_role(auth.uid(), 'admin'::app_role)));
drop policy if exists "Anyone can view lesson resources" on "storage"."objects";
create policy "Anyone can view lesson resources" on "storage"."objects" for select using ((bucket_id = 'lesson-resources'::text));
drop policy if exists "Approved users read quiz files" on "storage"."objects";
create policy "Approved users read quiz files" on "storage"."objects" for select to "authenticated" using (((bucket_id = 'quiz-files'::text) AND is_user_approved(auth.uid())));
drop policy if exists "Approved users read study materials" on "storage"."objects";
create policy "Approved users read study materials" on "storage"."objects" for select to "authenticated" using (((bucket_id = 'study-materials'::text) AND is_user_approved(auth.uid())));
drop policy if exists "Authenticated users can read past paper files" on "storage"."objects";
create policy "Authenticated users can read past paper files" on "storage"."objects" for select using (((bucket_id = 'past-papers'::text) AND (auth.uid() IS NOT NULL)));
drop policy if exists "Users can delete own homework files" on "storage"."objects";
create policy "Users can delete own homework files" on "storage"."objects" for delete to "authenticated" using (((bucket_id = 'homework-uploads'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));
drop policy if exists "Users can upload own homework files" on "storage"."objects";
create policy "Users can upload own homework files" on "storage"."objects" for insert to "authenticated" with check (((bucket_id = 'homework-uploads'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));
drop policy if exists "Users can upload payment receipts" on "storage"."objects";
create policy "Users can upload payment receipts" on "storage"."objects" for insert to "authenticated" with check (((bucket_id = 'homework-uploads'::text) AND ((storage.foldername(name))[1] = 'payments'::text) AND ((storage.foldername(name))[2] = (auth.uid())::text)));
drop policy if exists "Users can view own homework files" on "storage"."objects";
create policy "Users can view own homework files" on "storage"."objects" for select to "authenticated" using (((bucket_id = 'homework-uploads'::text) AND (((auth.uid())::text = (storage.foldername(name))[1]) OR has_role(auth.uid(), 'admin'::app_role))));
drop policy if exists "Users can view payment receipts" on "storage"."objects";
create policy "Users can view payment receipts" on "storage"."objects" for select to "authenticated" using (((bucket_id = 'homework-uploads'::text) AND ((storage.foldername(name))[1] = 'payments'::text) AND (((storage.foldername(name))[2] = (auth.uid())::text) OR has_role(auth.uid(), 'admin'::app_role))));

-- ============ comments ============
comment on table public."objective_reviews" is $dd$Resurfacing schedule per student and objective; written by answers, never by the client.$dd$;
comment on table public."admin_audit_log" is $dd$Append-only audit trail of admin content changes and user-management actions. Written only by triggers and the audit_admin_action() SECURITY DEFINER function.$dd$;
comment on table public."syllabus_statements" is $dd$Official board subtopics (the specification checklist), mapped to the topic that teaches them.$dd$;
comment on table public."content_revisions" is $dd$Version history for lessons and study materials. A new row is written by trigger before each UPDATE of lessons/study_materials; restore via restore_content_revision().$dd$;
comment on table public."learning_objectives" is $dd$Per-topic syllabus objectives: the micro-lesson and the unit of mastery.$dd$;

