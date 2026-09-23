export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admin_audit_log: {
        Row: {
          id: string
          actor_id: string | null
          actor_username: string | null
          action: string
          entity: string
          entity_id: string | null
          entity_label: string | null
          details: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          actor_id?: string | null
          actor_username?: string | null
          action: string
          entity: string
          entity_id?: string | null
          entity_label?: string | null
          details?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          actor_id?: string | null
          actor_username?: string | null
          action?: string
          entity?: string
          entity_id?: string | null
          entity_label?: string | null
          details?: Json | null
          created_at?: string
        }
        Relationships: []
      }

      announcements: {
        Row: {
          content: string
          created_at: string
          id: string
          published_at: string
          title: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          published_at?: string
          title: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          published_at?: string
          title?: string
        }
        Relationships: []
      }
      bookmarks: {
        Row: {
          created_at: string
          id: string
          material_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          material_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          material_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "study_materials"
            referencedColumns: ["id"]
          },
        ]
      }
      content_feedback: {
        Row: {
          id: string
          user_id: string
          tool: string
          tool_label: string
          rating: string | null
          message: string
          status: string
          created_at: string
          resolved_at: string | null
          resolved_by: string | null
        }
        Insert: {
          id?: string
          user_id?: string
          tool: string
          tool_label?: string
          rating?: string | null
          message: string
          status?: string
          created_at?: string
          resolved_at?: string | null
          resolved_by?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          tool?: string
          tool_label?: string
          rating?: string | null
          message?: string
          status?: string
          created_at?: string
          resolved_at?: string | null
          resolved_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_feedback_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      content_revisions: {
        Row: {
          id: string
          entity_type: string
          entity_id: string
          title: string | null
          content: string | null
          extra: Json | null
          version: number
          created_by: string | null
          created_by_username: string | null
          created_at: string
        }
        Insert: {
          id?: string
          entity_type: string
          entity_id: string
          title?: string | null
          content?: string | null
          extra?: Json | null
          version: number
          created_by?: string | null
          created_by_username?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          entity_type?: string
          entity_id?: string
          title?: string | null
          content?: string | null
          extra?: Json | null
          version?: number
          created_by?: string | null
          created_by_username?: string | null
          created_at?: string
        }
        Relationships: []
      }

      content_file_versions: {
        Row: {
          bucket: string
          created_at: string
          entity_id: string
          entity_type: string
          file_name: string
          file_path: string
          id: string
          slot: string
          uploaded_by: string
          version: number
        }
        Insert: {
          bucket: string
          created_at?: string
          entity_id: string
          entity_type: string
          file_name: string
          file_path: string
          id?: string
          slot?: string
          uploaded_by?: string
          version?: number
        }
        Update: {
          bucket?: string
          created_at?: string
          entity_id?: string
          entity_type?: string
          file_name?: string
          file_path?: string
          id?: string
          slot?: string
          uploaded_by?: string
          version?: number
        }
        Relationships: []
      }
      flashcard_progress: {
        Row: {
          ease_factor: number
          flashcard_id: string
          id: string
          interval_days: number
          last_reviewed_at: string | null
          next_review_at: string
          repetitions: number
          user_id: string
        }
        Insert: {
          ease_factor?: number
          flashcard_id: string
          id?: string
          interval_days?: number
          last_reviewed_at?: string | null
          next_review_at?: string
          repetitions?: number
          user_id: string
        }
        Update: {
          ease_factor?: number
          flashcard_id?: string
          id?: string
          interval_days?: number
          last_reviewed_at?: string | null
          next_review_at?: string
          repetitions?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "flashcard_progress_flashcard_id_fkey"
            columns: ["flashcard_id"]
            isOneToOne: false
            referencedRelation: "flashcards"
            referencedColumns: ["id"]
          },
        ]
      }
      flashcard_sets: {
        Row: {
          created_at: string
          description: string | null
          id: string
          title: string
          topic_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          title: string
          topic_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          title?: string
          topic_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      flashcards: {
        Row: {
          back: string
          created_at: string
          front: string
          id: string
          set_id: string
          sort_order: number
        }
        Insert: {
          back: string
          created_at?: string
          front: string
          id?: string
          set_id: string
          sort_order?: number
        }
        Update: {
          back?: string
          created_at?: string
          front?: string
          id?: string
          set_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "flashcards_set_id_fkey"
            columns: ["set_id"]
            isOneToOne: false
            referencedRelation: "flashcard_sets"
            referencedColumns: ["id"]
          },
        ]
      }
      homework: {
        Row: {
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          title: string
          topic_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          title: string
          topic_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          title?: string
          topic_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "homework_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      homework_submissions: {
        Row: {
          content: string | null
          correction_file_url: string | null
          feedback: string | null
          file_url: string | null
          grade: string | null
          graded_at: string | null
          homework_id: string
          id: string
          status: string
          submitted_at: string
          user_id: string
        }
        Insert: {
          content?: string | null
          correction_file_url?: string | null
          feedback?: string | null
          file_url?: string | null
          grade?: string | null
          graded_at?: string | null
          homework_id: string
          id?: string
          status?: string
          submitted_at?: string
          user_id: string
        }
        Update: {
          content?: string | null
          correction_file_url?: string | null
          feedback?: string | null
          file_url?: string | null
          grade?: string | null
          graded_at?: string | null
          homework_id?: string
          id?: string
          status?: string
          submitted_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "homework_submissions_homework_id_fkey"
            columns: ["homework_id"]
            isOneToOne: false
            referencedRelation: "homework"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_progress: {
        Row: {
          completed: boolean
          completed_at: string | null
          created_at: string
          id: string
          lesson_id: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          lesson_id: string
          user_id: string
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          lesson_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          content: string | null
          created_at: string
          id: string
          sort_order: number
          title: string
          topic_id: string
          updated_at: string
          video_url: string | null
          zoom_url: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          sort_order?: number
          title: string
          topic_id: string
          updated_at?: string
          video_url?: string | null
          zoom_url?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          sort_order?: number
          title?: string
          topic_id?: string
          updated_at?: string
          video_url?: string | null
          zoom_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      login_lookup_throttle: {
        Row: {
          attempts: number
          client_key: string
          updated_at: string
          window_started_at: string
        }
        Insert: {
          attempts?: number
          client_key: string
          updated_at?: string
          window_started_at?: string
        }
        Update: {
          attempts?: number
          client_key?: string
          updated_at?: string
          window_started_at?: string
        }
        Relationships: []
      }
      material_progress: {
        Row: {
          completed: boolean
          completed_at: string | null
          created_at: string
          id: string
          material_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          material_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          material_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "material_progress_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "study_materials"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          message: string
          read: boolean
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          read?: boolean
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          read?: boolean
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      parent_student_links: {
        Row: {
          created_at: string
          id: string
          parent_id: string
          student_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          parent_id: string
          student_id: string
        }
        Update: {
          created_at?: string
          id?: string
          parent_id?: string
          student_id?: string
        }
        Relationships: []
      }
      past_papers: {
        Row: {
          created_at: string
          id: string
          mark_scheme_url: string | null
          paper_number: string | null
          paper_url: string | null
          session: string | null
          title: string
          topic_id: string | null
          updated_at: string
          year: number
        }
        Insert: {
          created_at?: string
          id?: string
          mark_scheme_url?: string | null
          paper_number?: string | null
          paper_url?: string | null
          session?: string | null
          title: string
          topic_id?: string | null
          updated_at?: string
          year: number
        }
        Update: {
          created_at?: string
          id?: string
          mark_scheme_url?: string | null
          paper_number?: string | null
          paper_url?: string | null
          session?: string | null
          title?: string
          topic_id?: string | null
          updated_at?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "past_papers_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      practice_attempts: {
        Row: {
          attempts_count: number
          created_at: string
          id: string
          last_attempt_at: string
          last_correct: boolean
          question_id: string
          user_id: string
        }
        Insert: {
          attempts_count?: number
          created_at?: string
          id?: string
          last_attempt_at?: string
          last_correct: boolean
          question_id: string
          user_id: string
        }
        Update: {
          attempts_count?: number
          created_at?: string
          id?: string
          last_attempt_at?: string
          last_correct?: boolean
          question_id?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          updated_at: string
          user_id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          updated_at?: string
          user_id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          updated_at?: string
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      question_bookmarks: {
        Row: {
          created_at: string
          id: string
          note: string | null
          question_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          note?: string | null
          question_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          note?: string | null
          question_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "question_bookmarks_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          correct_option: number
          created_at: string
          difficulty: string
          explanation: string | null
          id: string
          options: Json
          question_text: string
          quiz_id: string
          sort_order: number
        }
        Insert: {
          correct_option?: number
          created_at?: string
          difficulty?: string
          explanation?: string | null
          id?: string
          options?: Json
          question_text: string
          quiz_id: string
          sort_order?: number
        }
        Update: {
          correct_option?: number
          created_at?: string
          difficulty?: string
          explanation?: string | null
          id?: string
          options?: Json
          question_text?: string
          quiz_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_attempts: {
        Row: {
          answers: Json | null
          completed_at: string | null
          correction_file_url: string | null
          created_at: string
          id: string
          quiz_id: string
          score: number | null
          started_at: string
          submission_file_url: string | null
          total_questions: number | null
          user_id: string
        }
        Insert: {
          answers?: Json | null
          completed_at?: string | null
          correction_file_url?: string | null
          created_at?: string
          id?: string
          quiz_id: string
          score?: number | null
          started_at?: string
          submission_file_url?: string | null
          total_questions?: number | null
          user_id: string
        }
        Update: {
          answers?: Json | null
          completed_at?: string | null
          correction_file_url?: string | null
          created_at?: string
          id?: string
          quiz_id?: string
          score?: number | null
          started_at?: string
          submission_file_url?: string | null
          total_questions?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          created_at: string
          description: string | null
          exam_file_url: string | null
          exam_type: string
          id: string
          is_ai_generated: boolean
          is_published: boolean
          time_limit_minutes: number | null
          title: string
          topic_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          exam_file_url?: string | null
          exam_type?: string
          id?: string
          is_ai_generated?: boolean
          is_published?: boolean
          time_limit_minutes?: number | null
          title: string
          topic_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          exam_file_url?: string | null
          exam_type?: string
          id?: string
          is_ai_generated?: boolean
          is_published?: boolean
          time_limit_minutes?: number | null
          title?: string
          topic_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      study_materials: {
        Row: {
          content: string | null
          created_at: string
          file_url: string | null
          id: string
          material_type: string
          preview_url: string | null
          page_count: number | null
          source_range: string | null
          title: string
          topic_id: string | null
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          file_url?: string | null
          id?: string
          material_type?: string
          preview_url?: string | null
          page_count?: number | null
          source_range?: string | null
          title: string
          topic_id?: string | null
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          file_url?: string | null
          id?: string
          material_type?: string
          preview_url?: string | null
          page_count?: number | null
          source_range?: string | null
          title?: string
          topic_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_materials_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      study_plans: {
        Row: {
          content: string
          created_at: string
          end_date: string | null
          id: string
          start_date: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          end_date?: string | null
          id?: string
          start_date?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          end_date?: string | null
          id?: string
          start_date?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subject_levels: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          level: Database["public"]["Enums"]["subject_level"]
          sort_order: number
          subject_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          level: Database["public"]["Enums"]["subject_level"]
          sort_order?: number
          subject_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          level?: Database["public"]["Enums"]["subject_level"]
          sort_order?: number
          subject_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subject_levels_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
        Row: {
          color: string
          created_at: string
          description: string | null
          icon: string
          id: string
          is_active: boolean
          name: string
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          color?: string
          created_at?: string
          description?: string | null
          icon?: string
          id?: string
          is_active?: boolean
          name: string
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          color?: string
          created_at?: string
          description?: string | null
          icon?: string
          id?: string
          is_active?: boolean
          name?: string
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      topics: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          sort_order: number
          subject_level_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          sort_order?: number
          subject_level_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          sort_order?: number
          subject_level_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "topics_subject_level_id_fkey"
            columns: ["subject_level_id"]
            isOneToOne: false
            referencedRelation: "subject_levels"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          is_approved: boolean
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_approved?: boolean
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_approved?: boolean
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan_id: string
          status: string
          starts_at: string | null
          ends_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_id: string
          status?: string
          starts_at?: string | null
          ends_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_id?: string
          status?: string
          starts_at?: string | null
          ends_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      student_subject_prefs: {
        Row: {
          user_id: string
          subject_level_id: string
          created_at: string
        }
        Insert: {
          user_id: string
          subject_level_id: string
          created_at?: string
        }
        Update: {
          user_id?: string
          subject_level_id?: string
          created_at?: string
        }
        Relationships: []
      }
      weekly_reports: {
        Row: {
          file_name: string
          file_url: string
          id: string
          student_user_id: string
          uploaded_at: string
          uploaded_by: string
          week_label: string | null
        }
        Insert: {
          file_name: string
          file_url: string
          id?: string
          student_user_id: string
          uploaded_at?: string
          uploaded_by: string
          week_label?: string | null
        }
        Update: {
          file_name?: string
          file_url?: string
          id?: string
          student_user_id?: string
          uploaded_at?: string
          uploaded_by?: string
          week_label?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      browse_questions: {
        Args: {
          _difficulty?: string
          _exam_type?: string
          _limit?: number
          _offset?: number
          _search?: string
          _subject_level_id?: string
          _topic_id?: string
        }
        Returns: {
          attempts_count: number
          bookmarked: boolean
          difficulty: string
          exam_type: string
          id: string
          is_ai_generated: boolean
          last_correct: boolean
          options: Json
          question_text: string
          quiz_id: string
          quiz_title: string
          topic_id: string
          topic_name: string
        }[]
      }
      check_practice_answer: {
        Args: { _question_id: string; _selected: number }
        Returns: Json
      }
      get_email_for_login: { Args: { _identifier: string }; Returns: string }
      get_practice_questions: {
        Args: { _limit?: number; _topic_id: string }
        Returns: {
          id: string
          options: Json
          question_text: string
          quiz_id: string
        }[]
      }
      get_practice_summary: {
        Args: never
        Returns: {
          answered: number
          attempts: number
          correct: number
          last_attempt_at: string
          topic_id: string
          topic_name: string
          total_questions: number
        }[]
      }
      get_profile_id: { Args: { _user_id: string }; Returns: string }
      get_review_questions: {
        Args: { _limit?: number; _mode?: string; _subject_level_id?: string }
        Returns: {
          attempts_count: number
          bookmarked: boolean
          difficulty: string
          id: string
          last_attempt_at: string
          last_correct: boolean
          options: Json
          question_text: string
          quiz_id: string
          quiz_title: string
          topic_id: string
          topic_name: string
        }[]
      }
      get_student_questions: {
        Args: { _quiz_id: string }
        Returns: {
          id: string
          options: Json
          question_text: string
          quiz_id: string
          sort_order: number
        }[]
      }
      get_subject_progress: {
        Args: never
        Returns: {
          ai_questions_answered: number
          ai_questions_correct: number
          ai_questions_total: number
          bookmarked_questions: number
          incorrect_questions: number
          lessons_completed: number
          lessons_total: number
          level: Database["public"]["Enums"]["subject_level"]
          materials_bookmarked: number
          materials_total: number
          quiz_attempts: number
          quiz_avg_score: number
          subject_color: string
          subject_icon: string
          subject_id: string
          subject_level_id: string
          subject_name: string
          subject_slug: string
          topics_count: number
        }[]
      }
      grade_quiz: {
        Args: {
          _answers: Json
          _quiz_id: string
          _submission_file_url?: string
        }
        Returns: Json
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_linked_parent: {
        Args: { _parent_auth_id: string; _student_auth_id: string }
        Returns: boolean
      }
      is_user_approved: { Args: { _user_id: string }; Returns: boolean }
      register_login_lookup: {
        Args: { _client_key: string; _max?: number; _window_seconds?: number }
        Returns: boolean
      }
      restore_content_revision: { Args: { p_revision_id: string }; Returns: undefined }
    }
    Enums: {
      app_role: "admin" | "student" | "parent"
      subject_level: "OL" | "AS" | "A2"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "student", "parent"],
      subject_level: ["OL", "AS", "A2"],
    },
  },
} as const
