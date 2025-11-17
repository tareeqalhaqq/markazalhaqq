"use client"

import { doc, serverTimestamp, updateDoc } from "firebase/firestore"

import { db } from "@/lib/firebaseClient"

export const USER_ROLES = ["user", "admin"] as const
export type UserRole = (typeof USER_ROLES)[number]

export async function updateUserRole(userId: string, role: UserRole, updatedBy?: string) {
  const userRef = doc(db, "users", userId)

  await updateDoc(userRef, {
    role,
    roleUpdatedAt: serverTimestamp(),
    ...(updatedBy ? { roleUpdatedBy: updatedBy } : {}),
  })
}
