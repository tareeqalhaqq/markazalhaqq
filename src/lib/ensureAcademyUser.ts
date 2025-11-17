"use client"

import type { User } from "firebase/auth"
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"

import { db } from "@/lib/firebaseClient"
import type { UserRole } from "@/lib/userRoles"

export async function ensureAcademyUser(user: User): Promise<void> {
  const userRef = doc(db, "users", user.uid)
  const snapshot = await getDoc(userRef)
  const defaultRole: UserRole = "user"

  const baseProfile = {
    displayName: user.displayName ?? "",
    email: user.email ?? "",
    photoURL: user.photoURL ?? "",
    providerIds: user.providerData.map((provider) => provider.providerId),
    lastLoginAt: serverTimestamp(),
  }

  if (!snapshot.exists()) {
    await setDoc(
      userRef,
      {
        ...baseProfile,
        role: defaultRole,
        isAcademyStudent: false,
        academyPlanId: "none",
        academyRole: "student",
        createdAt: serverTimestamp(),
      },
      { merge: true },
    )
    console.log("Created Firestore user doc for", user.uid)
    return
  }

  await setDoc(userRef, baseProfile, { merge: true })
  console.log("Updated Firestore user doc for", user.uid)
}
