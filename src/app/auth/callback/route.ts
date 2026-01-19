import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

import { createServiceRoleSupabaseClient, extractProfileId } from "@/lib/supabase"

export async function GET() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId || !user) {
    return redirect("/sign-in")
  }

  const supabase = createServiceRoleSupabaseClient()

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
    return redirect("/onboarding")
  }

  const { data: profileRow, error: profileError } = await supabase
    .from("profiles")
    .select("id, app_role")
    .eq("id", profileId)
    .single()

  if (profileError) {
    console.error("Unable to read profile", profileError)
  }

  if (profileRow?.app_role === "admin") {
    return redirect("/admin")
  }

  const { data: memberships, error: membershipError } = await supabase
    .from("academy_memberships")
    .select("id")
    .eq("profile_id", profileId)
    .limit(1)

  if (membershipError) {
    console.error("Unable to check memberships", membershipError)
  }

  const hasMembership = Array.isArray(memberships) && memberships.length > 0

  if (!hasMembership) {
    return redirect("/onboarding")
  }

  return redirect("/dashboard")
}
