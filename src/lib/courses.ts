import { createServiceRoleSupabaseClient } from "./supabase"
import type { Course as SupabaseCourse } from "./supabase-types"

export type Course = SupabaseCourse

export type PublishedCoursesResult = { courses: Course[]; error?: string }

export async function getPublishedCourses(): Promise<PublishedCoursesResult> {
  const supabase = createServiceRoleSupabaseClient()
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .in("status", ["active", "upcoming"])
    .order("updated_at", { ascending: false })

  if (error) {
    console.error("Failed to fetch published courses", error)
    return { courses: [], error: error.message }
  }

  return { courses: data ?? [] }
}

export async function getAllCourses(): Promise<Course[]> {
  const supabase = createServiceRoleSupabaseClient()
  const { data, error } = await supabase.from("courses").select("*").order("updated_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data ?? []
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const supabase = createServiceRoleSupabaseClient()
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .or(`slug.eq.${slug},id.eq.${slug}`)
    .maybeSingle()

  if (error) {
    throw new Error(error.message)
  }

  return data ?? null
}
