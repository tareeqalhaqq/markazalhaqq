"use client"

import { supabase } from "@/lib/supabaseClient"

export const USER_ROLES = ["user", "admin"] as const
export type UserRole = (typeof USER_ROLES)[number]

type MaybeProfile = Record<string, unknown> | null | undefined

function getProfileFields(profile: MaybeProfile) {
  if (!profile || typeof profile !== "object") {
    return {}
  }

  return profile as { role?: unknown; tags?: unknown }
}

function hasAdminTag(profile: MaybeProfile) {
  const { tags } = getProfileFields(profile)
  if (!Array.isArray(tags)) return false

  return tags.some((tag) => typeof tag === "string" && tag.toLowerCase() === "admin")
}

function isAdminEmail(email?: string | null): boolean {
  if (!email) return false
  const domain = email.split("@")[1]?.toLowerCase()
  return domain === "tareeqalhaqq.org" || domain === "tareeqalhaqq.com"
}

export function deriveRoleFromProfile(profile: MaybeProfile, email?: string | null): UserRole {
  const { role } = getProfileFields(profile)

  if (role === "admin") {
    return "admin"
  }

  if (hasAdminTag(profile) || isAdminEmail(email)) {
    return "admin"
  }

  if (typeof role === "string" && (USER_ROLES as readonly string[]).includes(role)) {
    return role as UserRole
  }

  return "user"
}

export async function updateUserRole(userId: string, role: UserRole, updatedBy?: string) {
  const { error } = await supabase.from("users").update({
    role,
    roleUpdatedAt: new Date().toISOString(),
    ...(updatedBy ? { roleUpdatedBy: updatedBy } : {}),
  }).eq("id", userId)

  if (error) {
    console.error("Failed to update user role", error)
  }
}
