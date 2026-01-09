"use client"

import type { User } from "@supabase/supabase-js"

import type { UserRole } from "@/lib/userRoles"
import { supabase } from "@/lib/supabaseClient"

export async function ensureAcademyUser(user: User): Promise<void> {
  const defaultRole: UserRole = "user"
  const now = new Date().toISOString()

  const baseProfile = {
    id: user.id,
    displayName: user.user_metadata?.full_name ?? user.user_metadata?.name ?? "",
    email: user.email ?? "",
    photoURL: user.user_metadata?.avatar_url ?? "",
    providerIds: user.app_metadata?.providers ?? [],
    lastLoginAt: now,
    updatedAt: now,
  }

  const { data: existingProfile, error } = await supabase.from("users").select("id").eq("id", user.id).maybeSingle()

  if (error) {
    console.error("Failed to look up academy profile", error)
  }

  if (!existingProfile) {
    const { error: insertError } = await supabase.from("users").insert({
      ...baseProfile,
      role: defaultRole,
      isAcademyStudent: false,
      academyPlanId: "none",
      academyRole: "student",
      createdAt: now,
    })

    if (insertError) {
      console.error("Failed to create academy profile", insertError)
    }

    return
  }

  const { error: updateError } = await supabase.from("users").update(baseProfile).eq("id", user.id)
  if (updateError) {
    console.error("Failed to update academy profile", updateError)
  }
}
