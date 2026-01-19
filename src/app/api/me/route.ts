import { auth, currentUser, type User } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

import { createServiceRoleSupabaseClient, extractProfileId } from "@/lib/supabase"

function getUserDetails(user: User, fallbackId: string) {
  const email = user.primaryEmailAddress?.emailAddress ?? user.emailAddresses[0]?.emailAddress ?? fallbackId
  const name = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || email || "New user"

  return { email, name }
}

export async function GET() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { email, name } = getUserDetails(user, userId)
  const supabase = createServiceRoleSupabaseClient()

  const { data: ensuredProfile, error: ensureError } = await supabase.rpc("ensure_profile", {
    clerk_id: userId,
    email,
    name,
  })

  if (ensureError) {
    console.error("ensure_profile failed in /api/me", ensureError)
  }

  const profileId = extractProfileId(ensuredProfile)

  if (!profileId) {
    return NextResponse.json({ profileId: null, appRole: null, hasMembership: false })
  }

  const { data: profileRow, error: profileError } = await supabase
    .from("profiles")
    .select("id, app_role")
    .eq("id", profileId)
    .single()

  if (profileError) {
    console.error("Unable to read profile in /api/me", profileError)
  }

  const { data: memberships, error: membershipError } = await supabase
    .from("academy_memberships")
    .select("id")
    .eq("profile_id", profileId)
    .limit(1)

  if (membershipError) {
    console.error("Unable to check memberships in /api/me", membershipError)
  }

  return NextResponse.json({
    profileId,
    appRole: profileRow?.app_role ?? null,
    hasMembership: Array.isArray(memberships) && memberships.length > 0,
  })
}
