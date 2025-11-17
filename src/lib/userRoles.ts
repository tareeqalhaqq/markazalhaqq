"use client"

import { doc, serverTimestamp, updateDoc } from "firebase/firestore"

import { db } from "@/lib/firebaseClient"

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

export function deriveRoleFromProfile(profile: MaybeProfile): UserRole {
  const { role } = getProfileFields(profile)
  if (typeof role === "string" && (USER_ROLES as readonly string[]).includes(role)) {
    return role as UserRole
  }

  if (hasAdminTag(profile)) {
    return "admin"
  }

  return "user"
}

export async function updateUserRole(userId: string, role: UserRole, updatedBy?: string) {
  const userRef = doc(db, "users", userId)

  await updateDoc(userRef, {
    role,
    roleUpdatedAt: serverTimestamp(),
    ...(updatedBy ? { roleUpdatedBy: updatedBy } : {}),
  })
}
