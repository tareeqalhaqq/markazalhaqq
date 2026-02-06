import "server-only"

import { createServiceRoleSupabaseClient } from "./supabase"
import type {
  Student,
  Teacher,
  Course,
  CourseModule,
  CourseLesson,
  LiveSession,
  Resource,
  Announcement,
  Exam,
  Quiz,
  Enrollment,
} from "./supabase-types"

/**
 * Server-side admin helpers that use the service-role client.
 * These bypass RLS and are meant for API routes / server actions only.
 */

const db = () => createServiceRoleSupabaseClient()

// ---------------------------------------------------------------------------
// Students roster
// ---------------------------------------------------------------------------

export async function upsertStudent(
  student: Omit<Student, "id" | "profile_id" | "created_at" | "updated_at">
) {
  const { data, error } = await db()
    .from("students")
    .upsert(
      { ...student, email: student.email.trim().toLowerCase() },
      { onConflict: "email" }
    )
    .select()
    .single()

  if (error) throw error
  return data
}

export async function removeStudent(email: string) {
  const { error } = await db()
    .from("students")
    .delete()
    .eq("email", email.trim().toLowerCase())

  if (error) throw error
}

export async function listStudents() {
  const { data, error } = await db()
    .from("students")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data ?? []
}

// ---------------------------------------------------------------------------
// Teachers
// ---------------------------------------------------------------------------

export async function createTeacher(
  teacher: Pick<Teacher, "full_name" | "email" | "specialty">
) {
  const { data, error } = await db()
    .from("teachers")
    .upsert(
      { ...teacher, email: teacher.email.trim().toLowerCase() },
      { onConflict: "email" }
    )
    .select()
    .single()

  if (error) throw error
  return data
}

// ---------------------------------------------------------------------------
// Courses
// ---------------------------------------------------------------------------

export async function createCourse(
  course: Pick<Course, "title" | "description" | "level" | "status" | "instructor_name" | "created_by"> &
    Partial<Pick<Course, "start_date" | "lesson_count" | "instructor_id" | "slug">>
) {
  const { data, error } = await db()
    .from("courses")
    .insert(course)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateCourse(courseId: string, updates: Partial<Course>) {
  const { error } = await db()
    .from("courses")
    .update(updates)
    .eq("id", courseId)

  if (error) throw error
}

export async function deleteCourse(courseId: string) {
  const { error } = await db().from("courses").delete().eq("id", courseId)
  if (error) throw error
}

// ---------------------------------------------------------------------------
// Modules
// ---------------------------------------------------------------------------

export async function createModule(
  mod: Pick<CourseModule, "course_id" | "title" | "sort_order"> & Partial<Pick<CourseModule, "summary">>
) {
  const { data, error } = await db()
    .from("course_modules")
    .insert(mod)
    .select()
    .single()

  if (error) throw error
  return data
}

// ---------------------------------------------------------------------------
// Lessons
// ---------------------------------------------------------------------------

export async function createLesson(
  lesson: Pick<CourseLesson, "course_id" | "title" | "sort_order"> &
    Partial<Pick<CourseLesson, "module_id" | "content" | "video_url" | "status">>
) {
  const { data, error } = await db()
    .from("course_lessons")
    .insert(lesson)
    .select()
    .single()

  if (error) throw error
  return data
}

// ---------------------------------------------------------------------------
// Live sessions
// ---------------------------------------------------------------------------

export async function createLiveSession(
  session: Pick<LiveSession, "title" | "scheduled_at" | "created_by"> &
    Partial<Pick<LiveSession, "course_id" | "course_title" | "presenter" | "format" | "join_link">>
) {
  const { data, error } = await db()
    .from("live_sessions")
    .insert(session)
    .select()
    .single()

  if (error) throw error
  return data
}

// ---------------------------------------------------------------------------
// Resources
// ---------------------------------------------------------------------------

export async function createResource(
  resource: Pick<Resource, "title" | "created_by"> &
    Partial<Pick<Resource, "course_id" | "course_title" | "resource_type" | "embed_url" | "download_url" | "file_path" | "file_url">>
) {
  const { data, error } = await db()
    .from("resources")
    .insert(resource)
    .select()
    .single()

  if (error) throw error
  return data
}

// ---------------------------------------------------------------------------
// Announcements
// ---------------------------------------------------------------------------

export async function createAnnouncement(
  announcement: Pick<Announcement, "title" | "body" | "created_by"> &
    Partial<Pick<Announcement, "audience" | "published_at">>
) {
  const { data, error } = await db()
    .from("announcements")
    .insert(announcement)
    .select()
    .single()

  if (error) throw error
  return data
}

// ---------------------------------------------------------------------------
// Exams
// ---------------------------------------------------------------------------

export async function createExam(
  exam: Pick<Exam, "title" | "created_by"> &
    Partial<Pick<Exam, "course_id" | "course_title" | "status" | "available_on" | "proctored">>
) {
  const { data, error } = await db()
    .from("exams")
    .insert(exam)
    .select()
    .single()

  if (error) throw error
  return data
}

// ---------------------------------------------------------------------------
// Quizzes
// ---------------------------------------------------------------------------

export async function createQuiz(
  quiz: Pick<Quiz, "title" | "created_by"> &
    Partial<Pick<Quiz, "course_id" | "course_title" | "section" | "status" | "question_count" | "is_timed" | "instructions">>
) {
  const { data, error } = await db()
    .from("quizzes")
    .insert(quiz)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateQuiz(quizId: string, updates: Partial<Quiz>) {
  const { error } = await db()
    .from("quizzes")
    .update(updates)
    .eq("id", quizId)

  if (error) throw error
}

export async function deleteQuiz(quizId: string) {
  const { error } = await db().from("quizzes").delete().eq("id", quizId)
  if (error) throw error
}

// ---------------------------------------------------------------------------
// Enrollments
// ---------------------------------------------------------------------------

export async function enrollStudent(enrollment: Pick<Enrollment, "profile_id" | "course_id">) {
  const { data, error } = await db()
    .from("enrollments")
    .upsert(enrollment, { onConflict: "profile_id,course_id" })
    .select()
    .single()

  if (error) throw error
  return data
}

// ---------------------------------------------------------------------------
// Role management
// ---------------------------------------------------------------------------

export async function setUserRole(profileId: string, role: "admin" | "instructor" | "student") {
  const { error } = await db()
    .from("profiles")
    .update({ app_role: role })
    .eq("id", profileId)

  if (error) throw error
}
