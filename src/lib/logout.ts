"use client"

import { signOut } from "firebase/auth"

import { auth } from "@/lib/firebaseClient"

export async function logout() {
  await signOut(auth)
  if (typeof window !== "undefined") {
    window.location.href = "/"
  }
}
