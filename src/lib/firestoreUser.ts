"use client"

import type { User } from "firebase/auth"
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"

import { db } from "@/lib/firebaseClient"

export async function ensureUserDocument(user: User | null | undefined) {
  if (!user) {
    return
  }

  const userRef = doc(db, "users", user.uid)
  const snapshot = await getDoc(userRef)
  const basePayload = {
    displayName: user.displayName ?? null,
    email: user.email ?? null,
    photoURL: user.photoURL ?? null,
    providerIds: user.providerData.map((provider) => provider.providerId),
    lastLoginAt: serverTimestamp(),
  }

  if (snapshot.exists()) {
    await setDoc(userRef, basePayload, { merge: true })
    return
  }

  await setDoc(
    userRef,
    {
      ...basePayload,
      createdAt: serverTimestamp(),
    },
    { merge: true },
  )
}
