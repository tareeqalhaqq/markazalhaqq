import { auth, currentUser } from "@clerk/nextjs/server"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

import { createServiceRoleSupabaseClient, extractProfileId } from "@/lib/supabase"

function buildRedirect(path: string) {
  const headerList = headers()
  const host = headerList.get("host") ?? "localhost:3000"
  const protocol = headerList.get("x-forwarded-proto") ?? "https"

  return new URL(path, `${protocol}://${host}`)
}

export async function GET() {
  let userId: string | null = null
  let user: Awaited<ReturnType<typeof currentUser>> = null

  try {
    const authResult = await auth()
    userId = authResult.userId
    user = await currentUser()
  } catch (error) {
    console.error("[auth/callback] Failed to verify authentication:", error)
  }

  if (!userId || !user) {
    // Redirect to home instead of /sign-in to prevent redirect loops when
    // the auth middleware or Clerk secret key is misconfigured.
    return NextResponse.redirect(buildRedirect("/"))
  }

  let supabase: ReturnType<typeof createServiceRoleSupabaseClient>

  try {
    supabase = createServiceRoleSupabaseClient()
  } catch (error) {
    console.error("[auth/callback] Supabase client creation failed:", error)
    // Supabase is misconfigured — send user to onboarding as a safe fallback
    return NextResponse.redirect(buildRedirect("/onboarding"))
  }

  const primaryEmail =
    user.primaryEmailAddress?.emailAddress ?? user.emailAddresses[0]?.emailAddress ?? userId
  const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || primaryEmail || "New user"

  const { data: ensuredProfile, error: ensureError } = await supabase.rpc("ensure_profile", {
    clerk_id: userId,
    email: primaryEmail,
    name: fullName,
  })

  if (ensureError) {
    console.error("ensure_profile failed", ensureError)
  }

  const profileId = extractProfileId(ensuredProfile)

  if (!profileId) {
    console.error("Supabase ensure_profile did not return a profile id")
    return NextResponse.redirect(buildRedirect("/onboarding"))
  }

  const { data: profileRow, error: profileError } = await supabase
    .from("profiles")
    .select("id, app_role")
    .eq("id", profileId)
    .single()

  if (profileError) {
    console.error("Unable to read profile", profileError)
  }

  const role = profileRow?.app_role

  if (role === "admin") {
    return NextResponse.redirect(buildRedirect("/dashboard/admin"))
  }

  if (role === "instructor") {
    return NextResponse.redirect(buildRedirect("/dashboard/instructor"))
  }

  if (role === "student") {
    // Check membership or student roster entry
    const { data: studentEntry } = await supabase
      .from("students")
      .select("id")
      .eq("profile_id", profileId)
      .limit(1)

    const { data: memberships, error: membershipError } = await supabase
      .from("academy_memberships")
      .select("id")
      .eq("profile_id", profileId)
      .limit(1)

    if (membershipError) {
      console.error("Unable to check memberships", membershipError)
    }

    const isEnrolled =
      (Array.isArray(studentEntry) && studentEntry.length > 0) ||
      (Array.isArray(memberships) && memberships.length > 0)

    if (!isEnrolled) {
      return NextResponse.redirect(buildRedirect("/onboarding"))
    }

    return NextResponse.redirect(buildRedirect("/dashboard/student"))
  }

  // Fallback: no recognized role
  return NextResponse.redirect(buildRedirect("/onboarding"))
}
