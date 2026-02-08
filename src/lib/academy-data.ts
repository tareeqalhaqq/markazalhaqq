"use client"

import type { SupabaseClient } from "@supabase/supabase-js"

import type {
  Announcement as SupabaseAnnouncement,
  Course as SupabaseCourse,
  CourseLesson as SupabaseCourseLesson,
  CourseModule as SupabaseCourseModule,
  Exam as SupabaseExam,
  LiveSession as SupabaseLiveSession,
  Quiz as SupabaseQuiz,
  Resource as SupabaseResource,
  Student as SupabaseStudent,
  Teacher as SupabaseTeacher,
} from "./supabase-types"

export type AcademyCourse = {
  title: string
  instructor: string
  level: string
  status: "upcoming" | "active" | "completed"
  slug?: string
  description: string
  startDate?: string | Date
  lessonCount?: number
  completedLessons?: number
  coverImage?: string
  updatedAt?: string | Date
  instructorId?: string
  isLive?: boolean
}

export type LiveSession = {
  title: string
  courseTitle: string
  presenter: string
  scheduledAt: string
  format: string
  link?: string
  isLive?: boolean
}

export type ResourceLibraryItem = {
  title: string
  courseTitle: string
  type: string
  embedUrl: string
  downloadUrl: string
}

export type Announcement = {
  title: string
  body: string
  audience: string
  publishedAt?: string
}

export type ExamOrCertification = {
  title: string
  courseTitle: string
  status: string
  availableOn?: string
  proctored?: boolean
}

export type TeacherProfile = {
  fullName: string
  email: string
  specialty: string
}

export type StudentProfile = {
  fullName: string
  email: string
  cohort?: string
  track?: string
  enrollmentStatus?: "active" | "paused" | "cancelled" | "prospect"
  liveAccess?: boolean
  notes?: string
  id?: string
}

export type Quiz = {
  title: string
  courseTitle: string
  section?: string
  status: "draft" | "live" | "archived"
  questionCount?: number
  isTimed?: boolean
  instructions?: string
  id?: string
}

export type CourseModule = {
  title: string
  order: number
  summary?: string
}

export type CourseLesson = {
  title: string
  order: number
  content?: string
  videoUrl?: string
}

function ensureError(error: unknown, fallback: string) {
  if (error instanceof Error) return error
  return new Error(fallback)
}

function toDateString(value?: string | Date | null) {
  if (!value) return null
  if (value instanceof Date) return value.toISOString()
  return value
}

export async function createCourse(
  supabase: SupabaseClient,
  course: AcademyCourse,
  createdBy: string,
): Promise<SupabaseCourse> {
  const { data, error } = await supabase
    .from("courses")
    .insert({
      title: course.title,
      instructor_name: course.instructor,
      level: course.level || null,
      status: course.status,
      description: course.description || "",
      slug: course.slug || null,
      cover_image: course.coverImage || null,
      start_date: toDateString(course.startDate),
      lesson_count: course.lessonCount ?? 0,
      is_live: course.isLive ?? false,
      instructor_id: course.instructorId || null,
      created_by: createdBy,
    })
    .select("*")
    .single()

  if (error) throw ensureError(error, "Failed to create course")
  return data
}

export async function updateCourse(
  supabase: SupabaseClient,
  courseId: string,
  updates: Partial<AcademyCourse>,
): Promise<SupabaseCourse> {
  const { data, error } = await supabase
    .from("courses")
    .update({
      title: updates.title,
      instructor_name: updates.instructor,
      level: updates.level || null,
      status: updates.status,
      description: updates.description,
      slug: updates.slug,
      cover_image: updates.coverImage,
      start_date: updates.startDate ? toDateString(updates.startDate) : undefined,
      lesson_count: updates.lessonCount,
      is_live: updates.isLive,
      instructor_id: updates.instructorId,
    })
    .eq("id", courseId)
    .select("*")
    .single()

  if (error) throw ensureError(error, "Failed to update course")
  return data
}

export async function deleteCourse(supabase: SupabaseClient, courseId: string) {
  const { error } = await supabase.from("courses").delete().eq("id", courseId)
  if (error) throw ensureError(error, "Failed to delete course")
}

export async function createCourseModule(
  supabase: SupabaseClient,
  courseId: string,
  module: CourseModule,
): Promise<SupabaseCourseModule> {
  const { data, error } = await supabase
    .from("course_modules")
    .insert({
      course_id: courseId,
      title: module.title,
      summary: module.summary ?? null,
      sort_order: module.order,
    })
    .select("*")
    .single()

  if (error) throw ensureError(error, "Failed to create module")
  return data
}

export async function updateCourseModule(
  supabase: SupabaseClient,
  courseId: string,
  moduleId: string,
  updates: Partial<CourseModule>,
): Promise<SupabaseCourseModule> {
  const { data, error } = await supabase
    .from("course_modules")
    .update({
      title: updates.title,
      summary: updates.summary ?? null,
      sort_order: updates.order,
    })
    .eq("id", moduleId)
    .eq("course_id", courseId)
    .select("*")
    .single()

  if (error) throw ensureError(error, "Failed to update module")
  return data
}

export async function deleteCourseModule(supabase: SupabaseClient, courseId: string, moduleId: string) {
  const { error } = await supabase.from("course_modules").delete().eq("id", moduleId).eq("course_id", courseId)
  if (error) throw ensureError(error, "Failed to delete module")
}

export async function createCourseLesson(
  supabase: SupabaseClient,
  courseId: string,
  moduleId: string | null,
  lesson: CourseLesson,
): Promise<SupabaseCourseLesson> {
  const { data, error } = await supabase
    .from("course_lessons")
    .insert({
      course_id: courseId,
      module_id: moduleId,
      title: lesson.title,
      content: lesson.content ?? null,
      video_url: lesson.videoUrl ?? null,
      sort_order: lesson.order,
      status: "draft",
    })
    .select("*")
    .single()

  if (error) throw ensureError(error, "Failed to create lesson")
  return data
}

export async function updateCourseLesson(
  supabase: SupabaseClient,
  courseId: string,
  moduleId: string | null,
  lessonId: string,
  updates: Partial<CourseLesson>,
): Promise<SupabaseCourseLesson> {
  const { data, error } = await supabase
    .from("course_lessons")
    .update({
      title: updates.title,
      content: updates.content ?? null,
      video_url: updates.videoUrl ?? null,
      sort_order: updates.order,
    })
    .eq("id", lessonId)
    .eq("course_id", courseId)
    .eq("module_id", moduleId)
    .select("*")
    .single()

  if (error) throw ensureError(error, "Failed to update lesson")
  return data
}

export async function deleteCourseLesson(
  supabase: SupabaseClient,
  courseId: string,
  moduleId: string | null,
  lessonId: string,
) {
  const { error } = await supabase
    .from("course_lessons")
    .delete()
    .eq("id", lessonId)
    .eq("course_id", courseId)
    .eq("module_id", moduleId)
  if (error) throw ensureError(error, "Failed to delete lesson")
}

export async function createLiveSession(
  supabase: SupabaseClient,
  session: LiveSession,
  createdBy: string,
): Promise<SupabaseLiveSession> {
  const { data, error } = await supabase
    .from("live_sessions")
    .insert({
      title: session.title,
      course_title: session.courseTitle,
      presenter: session.presenter || null,
      scheduled_at: session.scheduledAt,
      format: session.format || "Live",
      join_link: session.link || null,
      is_live: session.isLive ?? false,
      created_by: createdBy,
    })
    .select("*")
    .single()

  if (error) throw ensureError(error, "Failed to create live session")
  return data
}

export async function createResource(
  supabase: SupabaseClient,
  resource: ResourceLibraryItem,
  createdBy: string,
): Promise<SupabaseResource> {
  const { data, error } = await supabase
    .from("resources")
    .insert({
      title: resource.title,
      course_title: resource.courseTitle,
      resource_type: resource.type || "PDF",
      embed_url: resource.embedUrl,
      download_url: resource.downloadUrl || null,
      created_by: createdBy,
    })
    .select("*")
    .single()

  if (error) throw ensureError(error, "Failed to create resource")
  return data
}

export async function createAnnouncement(
  supabase: SupabaseClient,
  announcement: Announcement,
  createdBy: string,
): Promise<SupabaseAnnouncement> {
  const { data, error } = await supabase
    .from("announcements")
    .insert({
      title: announcement.title,
      body: announcement.body,
      audience: announcement.audience,
      published_at: announcement.publishedAt || new Date().toISOString(),
      created_by: createdBy,
    })
    .select("*")
    .single()

  if (error) throw ensureError(error, "Failed to create announcement")
  return data
}

export async function createExamOrCertification(
  supabase: SupabaseClient,
  exam: ExamOrCertification,
  createdBy: string,
): Promise<SupabaseExam> {
  const { data, error } = await supabase
    .from("exams")
    .insert({
      title: exam.title,
      course_title: exam.courseTitle,
      status: exam.status,
      available_on: exam.availableOn || null,
      proctored: exam.proctored ?? false,
      created_by: createdBy,
    })
    .select("*")
    .single()

  if (error) throw ensureError(error, "Failed to create exam")
  return data
}

export async function createTeacherProfile(
  supabase: SupabaseClient,
  teacher: TeacherProfile,
): Promise<SupabaseTeacher> {
  const { data, error } = await supabase
    .from("teachers")
    .insert({
      full_name: teacher.fullName,
      email: teacher.email,
      specialty: teacher.specialty || null,
    })
    .select("*")
    .single()

  if (error) throw ensureError(error, "Failed to create teacher profile")
  return data
}

export async function upsertStudentProfile(
  supabase: SupabaseClient,
  student: StudentProfile,
): Promise<SupabaseStudent> {
  const normalizedEmail = student.email.trim().toLowerCase()
  const { data, error } = await supabase
    .from("students")
    .upsert(
      {
        full_name: student.fullName,
        email: normalizedEmail,
        cohort: student.cohort || null,
        track: student.track || null,
        enrollment_status: student.enrollmentStatus ?? "active",
        live_access: student.liveAccess ?? true,
        notes: student.notes || null,
      },
      { onConflict: "email" },
    )
    .select("*")
    .single()

  if (error) throw ensureError(error, "Failed to upsert student profile")
  return data
}

export async function removeStudentProfile(supabase: SupabaseClient, email: string) {
  if (!email) return
  const { error } = await supabase.from("students").delete().eq("email", email.trim().toLowerCase())
  if (error) throw ensureError(error, "Failed to remove student profile")
}

export async function createQuiz(
  supabase: SupabaseClient,
  quiz: Quiz,
  createdBy: string,
): Promise<SupabaseQuiz> {
  const { data, error } = await supabase
    .from("quizzes")
    .insert({
      title: quiz.title,
      course_title: quiz.courseTitle,
      section: quiz.section || null,
      status: quiz.status,
      question_count: quiz.questionCount ?? 0,
      is_timed: quiz.isTimed ?? false,
      instructions: quiz.instructions || null,
      created_by: createdBy,
    })
    .select("*")
    .single()

  if (error) throw ensureError(error, "Failed to create quiz")
  return data
}

export async function updateQuiz(
  supabase: SupabaseClient,
  quizId: string,
  updates: Partial<Quiz>,
): Promise<SupabaseQuiz> {
  const { data, error } = await supabase
    .from("quizzes")
    .update({
      title: updates.title,
      course_title: updates.courseTitle,
      section: updates.section,
      status: updates.status,
      question_count: updates.questionCount,
      is_timed: updates.isTimed,
      instructions: updates.instructions,
    })
    .eq("id", quizId)
    .select("*")
    .single()

  if (error) throw ensureError(error, "Failed to update quiz")
  return data
}

export async function deleteQuiz(supabase: SupabaseClient, quizId: string) {
  const { error } = await supabase.from("quizzes").delete().eq("id", quizId)
  if (error) throw ensureError(error, "Failed to delete quiz")
}
