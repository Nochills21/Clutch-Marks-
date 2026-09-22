-- ============================================================
-- Clutch Marks — golden base schema
-- Generated 2026-09-22T10:57:12.964Z from the live project (ref zzliiazovezhxbmfeqco).
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
  constraint "admin_audit_log_action_check" CHECK (action = ANY (ARRAY['create'::text, 'update'::text, 'delete'::text, 'approve'::text, 'reject'::text, 'role_change'::text, 'login'::text, 'download'::text, 'quiz_attempt'::text, 'homework_submission'::text])),
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
create table if not exists public."announcements" (
  "id" uuid default gen_random_uuid() not null,
  "title" text not null,
  "content" text not null,
  "published_at" timestamp with time zone default now() not null,
  "created_at" timestamp with time zone default now() not null,
  constraint "announcements_pkey" PRIMARY KEY (id)
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
create table if not exists public."parent_student_links" (
  "id" uuid default gen_random_uuid() not null,
  "parent_id" uuid not null,
  "student_id" uuid not null,
  "created_at" timestamp with time zone default now() not null,
  constraint "parent_student_links_parent_id_student_id_key" UNIQUE (parent_id, student_id),
  constraint "parent_student_links_pkey" PRIMARY KEY (id)
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
create table if not exists public."study_plans" (
  "id" uuid default gen_random_uuid() not null,
  "user_id" uuid not null,
  "title" text not null,
  "content" text not null,
  "start_date" date,
  "end_date" date,
  "created_at" timestamp with time zone default now() not null,
  "updated_at" timestamp with time zone default now() not null,
  constraint "study_plans_pkey" PRIMARY KEY (id)
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
  constraint "topics_pkey" PRIMARY KEY (id)
);
create table if not exists public."flashcard_sets" (
  "id" uuid default gen_random_uuid() not null,
  "topic_id" uuid,
  "title" text not null,
  "description" text,
  "created_at" timestamp with time zone default now() not null,
  "updated_at" timestamp with time zone default now() not null,
  constraint "flashcard_sets_pkey" PRIMARY KEY (id)
);
create table if not exists public."flashcards" (
  "id" uuid default gen_random_uuid() not null,
  "set_id" uuid not null,
  "front" text not null,
  "back" text not null,
  "sort_order" integer default 0 not null,
  "created_at" timestamp with time zone default now() not null,
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
  constraint "lessons_pkey" PRIMARY KEY (id)
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
  constraint "quizzes_pkey" PRIMARY KEY (id)
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
  constraint "study_materials_material_type_check" CHECK (material_type = ANY (ARRAY['notes'::text, 'summary'::text, 'flashcard'::text, 'note'::text])),
  constraint "study_materials_pkey" PRIMARY KEY (id)
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
create index if not exists content_file_versions_entity_idx ON public.content_file_versions USING btree (entity_type, entity_id, slot, version DESC);
create index if not exists content_revisions_created_at_idx ON public.content_revisions USING btree (created_at DESC);
create index if not exists content_revisions_entity_idx ON public.content_revisions USING btree (entity_type, entity_id, version DESC);
create index if not exists past_papers_topic_idx ON public.past_papers USING btree (topic_id);
create index if not exists past_papers_year_idx ON public.past_papers USING btree (year DESC);
create index if not exists idx_practice_attempts_user ON public.practice_attempts USING btree (user_id);
create UNIQUE index if not exists profiles_email_unique_idx ON public.profiles USING btree (lower(email)) WHERE (email IS NOT NULL);
create UNIQUE index if not exists profiles_username_unique_idx ON public.profiles USING btree (lower(username)) WHERE (username IS NOT NULL);
create index if not exists idx_question_bookmarks_user ON public.question_bookmarks USING btree (user_id);
create index if not exists topics_subject_level_id_idx ON public.topics USING btree (subject_level_id);

-- ============ foreign keys ============
alter table public."bookmarks" drop constraint if exists "bookmarks_material_id_fkey";
alter table public."bookmarks" add constraint "bookmarks_material_id_fkey" FOREIGN KEY (material_id) REFERENCES study_materials(id) ON DELETE CASCADE;
alter table public."bookmarks" drop constraint if exists "bookmarks_user_id_fkey";
alter table public."bookmarks" add constraint "bookmarks_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
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
alter table public."parent_student_links" drop constraint if exists "parent_student_links_parent_id_fkey";
alter table public."parent_student_links" add constraint "parent_student_links_parent_id_fkey" FOREIGN KEY (parent_id) REFERENCES auth.users(id) ON DELETE CASCADE;
alter table public."parent_student_links" drop constraint if exists "parent_student_links_student_id_fkey";
alter table public."parent_student_links" add constraint "parent_student_links_student_id_fkey" FOREIGN KEY (student_id) REFERENCES auth.users(id) ON DELETE CASCADE;
alter table public."past_papers" drop constraint if exists "past_papers_topic_id_fkey";
alter table public."past_papers" add constraint "past_papers_topic_id_fkey" FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE SET NULL;
alter table public."profiles" drop constraint if exists "profiles_user_id_fkey";
alter table public."profiles" add constraint "profiles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
alter table public."question_bookmarks" drop constraint if exists "question_bookmarks_question_id_fkey";
alter table public."question_bookmarks" add constraint "question_bookmarks_question_id_fkey" FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE;
alter table public."questions" drop constraint if exists "questions_quiz_id_fkey";
alter table public."questions" add constraint "questions_quiz_id_fkey" FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE;
alter table public."quiz_attempts" drop constraint if exists "quiz_attempts_quiz_id_fkey";
alter table public."quiz_attempts" add constraint "quiz_attempts_quiz_id_fkey" FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE;
alter table public."quiz_attempts" drop constraint if exists "quiz_attempts_user_id_fkey";
alter table public."quiz_attempts" add constraint "quiz_attempts_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
alter table public."quizzes" drop constraint if exists "quizzes_topic_id_fkey";
alter table public."quizzes" add constraint "quizzes_topic_id_fkey" FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE;
alter table public."study_materials" drop constraint if exists "study_materials_topic_id_fkey";
alter table public."study_materials" add constraint "study_materials_topic_id_fkey" FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE;
alter table public."subject_levels" drop constraint if exists "subject_levels_subject_id_fkey";
alter table public."subject_levels" add constraint "subject_levels_subject_id_fkey" FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE;
alter table public."topics" drop constraint if exists "topics_subject_level_id_fkey";
alter table public."topics" add constraint "topics_subject_level_id_fkey" FOREIGN KEY (subject_level_id) REFERENCES subject_levels(id) ON DELETE SET NULL;
alter table public."user_roles" drop constraint if exists "user_roles_user_id_fkey";
alter table public."user_roles" add constraint "user_roles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- ============ functions ============
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
  if p_action not in ('create','update','delete','approve','reject','role_change','login','download') then
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
    AND public.is_user_approved(auth.uid())
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
DECLARE
  _q record;
  _is_correct boolean;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  IF NOT public.is_user_approved(auth.uid()) THEN
    RAISE EXCEPTION 'Account not approved';
  END IF;
  SELECT q.correct_option, q.explanation
    INTO _q
  FROM public.questions q
  JOIN public.quizzes z ON z.id = q.quiz_id
  WHERE q.id = _question_id AND z.is_published = true;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Question not found';
  END IF;

  _is_correct := _selected = _q.correct_option;

  INSERT INTO public.practice_attempts (user_id, question_id, last_correct, attempts_count, last_attempt_at)
  VALUES (auth.uid(), _question_id, _is_correct, 1, now())
  ON CONFLICT (user_id, question_id) DO UPDATE
    SET last_correct = EXCLUDED.last_correct,
        attempts_count = public.practice_attempts.attempts_count + 1,
        last_attempt_at = now();

  RETURN jsonb_build_object(
    'correct', _is_correct,
    'correct_option', _q.correct_option,
    'explanation', _q.explanation
  );
END;
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
    AND public.is_user_approved(auth.uid())
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
         COALESCE(qs.ai_total, 0), COALESCE(qs.ai_answered, 0), COALESCE(qs.ai_correct, 0),
         COALESCE(qs.saved_q, 0), COALESCE(qs.wrong_q, 0)
  FROM lv
  LEFT JOIN topic_counts ON topic_counts.subject_level_id = lv.level_id
  LEFT JOIN les ON les.subject_level_id = lv.level_id
  LEFT JOIN mat ON mat.subject_level_id = lv.level_id
  LEFT JOIN qz ON qz.subject_level_id = lv.level_id
  LEFT JOIN qs ON qs.subject_level_id = lv.level_id
  WHERE public.is_user_approved(auth.uid())
  ORDER BY lv.name, lv.level;
$function$;

CREATE OR REPLACE FUNCTION public.grade_quiz(_quiz_id uuid, _answers jsonb, _submission_file_url text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  _user_id uuid := auth.uid();
  _correct integer := 0;
  _total integer := 0;
  _q record;
  _selected integer;
  _results jsonb := '[]'::jsonb;
BEGIN
  IF _user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  IF NOT public.is_user_approved(_user_id) THEN
    RAISE EXCEPTION 'Account not approved';
  END IF;

  FOR _q IN
    SELECT q.id, q.correct_option, q.explanation, q.options
    FROM public.questions q
    WHERE q.quiz_id = _quiz_id
    ORDER BY q.sort_order
  LOOP
    _total := _total + 1;
    _selected := (_answers->>(_q.id::text))::integer;
    IF _selected = _q.correct_option THEN
      _correct := _correct + 1;
    END IF;
    _results := _results || jsonb_build_object(
      'question_id', _q.id,
      'selected', _selected,
      'correct_option', _q.correct_option,
      'explanation', _q.explanation,
      'options', _q.options
    );
  END LOOP;

  INSERT INTO public.quiz_attempts (user_id, quiz_id, score, total_questions, completed_at, submission_file_url, answers)
  VALUES (
    _user_id, _quiz_id, _correct, _total, now(), _submission_file_url,
    (SELECT jsonb_agg(jsonb_build_object('question_id', k, 'selected', (_answers->>k)::integer))
     FROM jsonb_object_keys(_answers) k)
  );

  RETURN jsonb_build_object('correct', _correct, 'total', _total, 'results', _results);
END;
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  candidate text;
BEGIN
  -- Admin-created accounts pass username in user metadata; public signups get a
  -- username derived from the email local-part. Sanitized to the app's charset.
  candidate := COALESCE(
    NULLIF(NEW.raw_user_meta_data->>'username', ''),
    split_part(COALESCE(NEW.email, ''), '@', 1)
  );
  candidate := regexp_replace(candidate, '[^A-Za-z0-9._-]', '', 'g');
  IF candidate IS NULL OR length(candidate) < 2 THEN
    candidate := 'user-' || left(NEW.id::text, 8);
  END IF;

  -- Defensive uniqueness (the admin create flow pre-checks; collisions can still
  -- come from email local-parts).
  WHILE EXISTS (SELECT 1 FROM public.profiles WHERE username = candidate) LOOP
    candidate := left(candidate, 56) || '-' || left(NEW.id::text, 4);
  END LOOP;

  INSERT INTO public.profiles (user_id, full_name, username, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    candidate,
    NEW.email
  );

  -- SECURITY: Never trust client-sent role. Always default to 'student'.
  -- Only admins can elevate roles via the admin panel.
  INSERT INTO public.user_roles (user_id, role, is_approved)
  VALUES (NEW.id, 'student', false);

  RETURN NEW;
END;
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
  return null;
end;
$function$;


-- ============ triggers ============
drop trigger if exists "audit_announcements_changes" on public."announcements";
CREATE TRIGGER audit_announcements_changes AFTER INSERT OR DELETE OR UPDATE ON announcements FOR EACH ROW EXECUTE FUNCTION write_admin_audit_log();
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
drop trigger if exists "audit_lessons_changes" on public."lessons";
CREATE TRIGGER audit_lessons_changes AFTER INSERT OR DELETE OR UPDATE ON lessons FOR EACH ROW EXECUTE FUNCTION write_admin_audit_log();
drop trigger if exists "trg_lessons_revision" on public."lessons";
CREATE TRIGGER trg_lessons_revision BEFORE UPDATE ON lessons FOR EACH ROW EXECUTE FUNCTION snapshot_content_revision();
drop trigger if exists "update_lessons_updated_at" on public."lessons";
CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON lessons FOR EACH ROW EXECUTE FUNCTION update_updated_at();
drop trigger if exists "set_material_progress_updated_at" on public."material_progress";
CREATE TRIGGER set_material_progress_updated_at BEFORE UPDATE ON material_progress FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');
drop trigger if exists "audit_past_papers_changes" on public."past_papers";
CREATE TRIGGER audit_past_papers_changes AFTER INSERT OR DELETE OR UPDATE ON past_papers FOR EACH ROW EXECUTE FUNCTION write_admin_audit_log();
drop trigger if exists "set_past_papers_updated_at" on public."past_papers";
CREATE TRIGGER set_past_papers_updated_at BEFORE UPDATE ON past_papers FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');
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
drop trigger if exists "audit_topics_changes" on public."topics";
CREATE TRIGGER audit_topics_changes AFTER INSERT OR DELETE OR UPDATE ON topics FOR EACH ROW EXECUTE FUNCTION write_admin_audit_log();
drop trigger if exists "update_topics_updated_at" on public."topics";
CREATE TRIGGER update_topics_updated_at BEFORE UPDATE ON topics FOR EACH ROW EXECUTE FUNCTION update_updated_at();
drop trigger if exists "user_roles_writer_guard" on public."user_roles";
CREATE TRIGGER user_roles_writer_guard BEFORE INSERT OR DELETE OR UPDATE ON user_roles FOR EACH ROW EXECUTE FUNCTION enforce_user_roles_writer();

-- ============ row level security ============
alter table public."admin_audit_log" enable row level security;
alter table public."content_revisions" enable row level security;
alter table public."admin_audit_log_archive" enable row level security;
alter table public."announcements" enable row level security;
alter table public."lesson_progress" enable row level security;
alter table public."homework" enable row level security;
alter table public."notifications" enable row level security;
alter table public."parent_student_links" enable row level security;
alter table public."bookmarks" enable row level security;
alter table public."quizzes" enable row level security;
alter table public."study_materials" enable row level security;
alter table public."profiles" enable row level security;
alter table public."user_roles" enable row level security;
alter table public."questions" enable row level security;
alter table public."lessons" enable row level security;
alter table public."homework_submissions" enable row level security;
alter table public."quiz_attempts" enable row level security;
alter table public."subjects" enable row level security;
alter table public."subject_levels" enable row level security;
alter table public."topics" enable row level security;
alter table public."material_progress" enable row level security;
alter table public."_seed_fixes" enable row level security;
alter table public."past_papers" enable row level security;
alter table public."flashcard_sets" enable row level security;
alter table public."practice_attempts" enable row level security;
alter table public."question_bookmarks" enable row level security;
alter table public."login_lookup_throttle" enable row level security;
alter table public."weekly_reports" enable row level security;
alter table public."flashcards" enable row level security;
alter table public."flashcard_progress" enable row level security;
alter table public."study_plans" enable row level security;
alter table public."content_file_versions" enable row level security;

drop policy if exists "Admin audit log read - approved admins only" on public."admin_audit_log";
create policy "Admin audit log read - approved admins only" on public."admin_audit_log" for select using ((EXISTS ( SELECT 1
   FROM user_roles r
  WHERE ((r.user_id = auth.uid()) AND (r.role = 'admin'::app_role) AND (r.is_approved = true)))));
drop policy if exists "Archive read - approved admins only" on public."admin_audit_log_archive";
create policy "Archive read - approved admins only" on public."admin_audit_log_archive" for select to "authenticated" using ((EXISTS ( SELECT 1
   FROM user_roles r
  WHERE ((r.user_id = auth.uid()) AND (r.role = 'admin'::app_role) AND r.is_approved))));
drop policy if exists "Admins can manage announcements" on public."announcements";
create policy "Admins can manage announcements" on public."announcements" for all to "authenticated" using (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Anyone authenticated can view announcements" on public."announcements";
create policy "Anyone authenticated can view announcements" on public."announcements" for select to "authenticated" using (true);
drop policy if exists "Users can delete own bookmarks" on public."bookmarks";
create policy "Users can delete own bookmarks" on public."bookmarks" for delete to "authenticated" using ((user_id = auth.uid()));
drop policy if exists "Users can insert own bookmarks" on public."bookmarks";
create policy "Users can insert own bookmarks" on public."bookmarks" for insert with check ((auth.uid() = user_id));
drop policy if exists "Users can view own bookmarks" on public."bookmarks";
create policy "Users can view own bookmarks" on public."bookmarks" for select to "authenticated" using ((user_id = auth.uid()));
drop policy if exists "Admins manage content file versions" on public."content_file_versions";
create policy "Admins manage content file versions" on public."content_file_versions" for all to "authenticated" using (has_role(auth.uid(), 'admin'::app_role)) with check (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Content revisions read - approved admins only" on public."content_revisions";
create policy "Content revisions read - approved admins only" on public."content_revisions" for select using ((EXISTS ( SELECT 1
   FROM user_roles r
  WHERE ((r.user_id = auth.uid()) AND (r.role = 'admin'::app_role) AND (r.is_approved = true)))));
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
drop policy if exists "Admins can manage all links" on public."parent_student_links";
create policy "Admins can manage all links" on public."parent_student_links" for all to "authenticated" using (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Parents can view own links" on public."parent_student_links";
create policy "Parents can view own links" on public."parent_student_links" for select to "authenticated" using ((parent_id = auth.uid()));
drop policy if exists "Students can view own links" on public."parent_student_links";
create policy "Students can view own links" on public."parent_student_links" for select to "authenticated" using ((student_id = auth.uid()));
drop policy if exists "Admins manage past papers" on public."past_papers";
create policy "Admins manage past papers" on public."past_papers" for all using (has_role(auth.uid(), 'admin'::app_role)) with check (has_role(auth.uid(), 'admin'::app_role));
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
drop policy if exists "Admins can manage materials" on public."study_materials";
create policy "Admins can manage materials" on public."study_materials" for all to "authenticated" using (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Authenticated can view text materials" on public."study_materials";
create policy "Authenticated can view text materials" on public."study_materials" for select to "authenticated" using (((file_url IS NULL) OR has_role(auth.uid(), 'admin'::app_role)));
drop policy if exists "Admins can view all study plans" on public."study_plans";
create policy "Admins can view all study plans" on public."study_plans" for select to "authenticated" using (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Users can delete own study plans" on public."study_plans";
create policy "Users can delete own study plans" on public."study_plans" for delete to "authenticated" using ((user_id = auth.uid()));
drop policy if exists "Users can insert own study plans" on public."study_plans";
create policy "Users can insert own study plans" on public."study_plans" for insert to "authenticated" with check ((user_id = auth.uid()));
drop policy if exists "Users can update own study plans" on public."study_plans";
create policy "Users can update own study plans" on public."study_plans" for update to "authenticated" using ((user_id = auth.uid()));
drop policy if exists "Users can view own study plans" on public."study_plans";
create policy "Users can view own study plans" on public."study_plans" for select to "authenticated" using ((user_id = auth.uid()));
drop policy if exists "Admins manage subject levels" on public."subject_levels";
create policy "Admins manage subject levels" on public."subject_levels" for all to "authenticated" using (has_role(auth.uid(), 'admin'::app_role)) with check (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Anyone can view active subject levels" on public."subject_levels";
create policy "Anyone can view active subject levels" on public."subject_levels" for select using (((is_active = true) OR ((auth.uid() IS NOT NULL) AND has_role(auth.uid(), 'admin'::app_role))));
drop policy if exists "Admins manage subjects" on public."subjects";
create policy "Admins manage subjects" on public."subjects" for all to "authenticated" using (has_role(auth.uid(), 'admin'::app_role)) with check (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Anyone can view active subjects" on public."subjects";
create policy "Anyone can view active subjects" on public."subjects" for select using (((is_active = true) OR ((auth.uid() IS NOT NULL) AND has_role(auth.uid(), 'admin'::app_role))));
drop policy if exists "Admins can manage topics" on public."topics";
create policy "Admins can manage topics" on public."topics" for all to "authenticated" using (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Anyone authenticated can view topics" on public."topics";
create policy "Anyone authenticated can view topics" on public."topics" for select to "authenticated" using (true);
drop policy if exists "Admins can manage all roles" on public."user_roles";
create policy "Admins can manage all roles" on public."user_roles" for all using (has_role(auth.uid(), 'admin'::app_role)) with check (has_role(auth.uid(), 'admin'::app_role));
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
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."announcements" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."announcements" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."announcements" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."bookmarks" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."bookmarks" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."bookmarks" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."content_file_versions" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."content_file_versions" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."content_file_versions" to service_role;
grant SELECT on public."content_revisions" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."content_revisions" to service_role;
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
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."parent_student_links" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."parent_student_links" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."parent_student_links" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."past_papers" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."past_papers" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."past_papers" to service_role;
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
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."study_materials" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."study_materials" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."study_materials" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."study_plans" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."study_plans" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."study_plans" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."subject_levels" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."subject_levels" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."subject_levels" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."subjects" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."subjects" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."subjects" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."topics" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."topics" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."topics" to service_role;
grant REFERENCES, SELECT, TRIGGER on public."user_roles" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, UPDATE on public."user_roles" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."user_roles" to service_role;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."weekly_reports" to anon;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."weekly_reports" to authenticated;
grant DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE on public."weekly_reports" to service_role;

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
drop policy if exists "Users can upload own homework files" on "storage"."objects";
create policy "Users can upload own homework files" on "storage"."objects" for insert to "authenticated" with check (((bucket_id = 'homework-uploads'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));
drop policy if exists "Users can view own homework files" on "storage"."objects";
create policy "Users can view own homework files" on "storage"."objects" for select to "authenticated" using (((bucket_id = 'homework-uploads'::text) AND (((auth.uid())::text = (storage.foldername(name))[1]) OR has_role(auth.uid(), 'admin'::app_role))));

-- ============ comments ============
comment on table public."admin_audit_log" is $dd$Append-only audit trail of admin content changes and user-management actions. Written only by triggers and the audit_admin_action() SECURITY DEFINER function.$dd$;
comment on table public."content_revisions" is $dd$Version history for lessons and study materials. A new row is written by trigger before each UPDATE of lessons/study_materials; restore via restore_content_revision().$dd$;

