"use client"

import type { User } from "firebase/auth"
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"

import { db } from "@/lib/firebaseClient"

export async function ensureAcademyUser(user: User): Promise<void> {
  const userRef = doc(db, "users", user.uid)
  const snapshot = await getDoc(userRef)

  if (!snapshot.exists()) {
    await setDoc(
      userRef,
      {
        displayName: user.displayName || "",
        email: user.email || "",
        role: "student",
        isAcademyStudent: false,
        academyPlanId: "none",
        academyRole: "student",
        createdAt: serverTimestamp(),
      },
      { merge: true },
    )
    console.log("Created Firestore user doc for", user.uid)
  } else {
    console.log("Firestore user doc already exists for", user.uid)
  }
}
