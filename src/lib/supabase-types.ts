/**
 * Supabase database types for Markaz al-Haqq academy.
 * Matches the schema in supabase/migrations/00001_multi_role_academy.sql
 */

export type AppRole = "admin" | "instructor" | "student"

export type Profile = {
  id: string
  email: string
  full_name: string
  headline: string | null
  bio: string | null
  avatar_url: string | null
  app_role: AppRole
  preferences: Record<string, unknown>
  created_at: string
  updated_at: string
}

export type AcademyMembership = {
  id: string
  profile_id: string
  plan: string
  status: "active" | "paused" | "cancelled" | "expired"
  created_at: string
  updated_at: string
}

export type Course = {
  id: string
  title: string
  slug: string | null
  description: string
  level: string | null
  status: "upcoming" | "active" | "completed" | "archived"
  cover_image: string | null
  start_date: string | null
  is_live: boolean
  instructor_id: string | null
  instructor_name: string | null
  lesson_count: number
  created_by: string
  created_at: string
  updated_at: string
}

export type CourseModule = {
  id: string
  course_id: string
  title: string
  summary: string | null
  sort_order: number
  created_at: string
  updated_at: string
}

export type CourseLesson = {
  id: string
  course_id: string
  module_id: string | null
  title: string
  content: string | null
  video_url: string | null
  sort_order: number
  status: "draft" | "ready" | "published"
  created_at: string
  updated_at: string
}

export type Enrollment = {
  id: string
  profile_id: string
  course_id: string
  status: "active" | "paused" | "completed" | "dropped"
  enrolled_at: string
  completed_at: string | null
}

export type LessonProgress = {
  id: string
  profile_id: string
  lesson_id: string
  course_id: string
  completed_at: string
}

export type Student = {
  id: string
  profile_id: string | null
  full_name: string
  email: string
  cohort: string | null
  track: string | null
  enrollment_status: "active" | "paused" | "cancelled" | "prospect"
  live_access: boolean
  notes: string | null
  created_at: string
  updated_at: string
}

export type Teacher = {
  id: string
  profile_id: string | null
  full_name: string
  email: string
  specialty: string | null
  bio: string | null
  avatar_url: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export type LiveSession = {
  id: string
  course_id: string | null
  title: string
  course_title: string | null
  presenter: string | null
  scheduled_at: string
  format: string
  join_link: string | null
  is_live: boolean
  created_by: string
  created_at: string
  updated_at: string
}

export type Resource = {
  id: string
  course_id: string | null
  title: string
  course_title: string | null
  resource_type: string
  file_path: string | null
  file_url: string | null
  embed_url: string | null
  download_url: string | null
  file_size: string | null
  created_by: string
  created_at: string
  updated_at: string
}

export type Announcement = {
  id: string
  title: string
  body: string
  audience: string
  published_at: string
  created_by: string
  created_at: string
}

export type Exam = {
  id: string
  course_id: string | null
  title: string
  course_title: string | null
  status: string
  available_on: string | null
  proctored: boolean
  created_by: string
  created_at: string
  updated_at: string
}

export type Quiz = {
  id: string
  course_id: string | null
  title: string
  course_title: string | null
  section: string | null
  status: "draft" | "live" | "archived"
  question_count: number
  is_timed: boolean
  instructions: string | null
  created_by: string
  created_at: string
  updated_at: string
}
