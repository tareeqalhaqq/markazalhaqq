"use client"

import { useEffect, useState } from "react"
import { onAuthStateChanged, type User } from "firebase/auth"
import { doc, onSnapshot } from "firebase/firestore"

import { auth, db } from "@/lib/firebaseClient"
import { deriveRoleFromProfile, type UserRole } from "@/lib/userRoles"

export type UseUserRoleResult = {
  user: User | null
  role: UserRole | null
  loading: boolean
}

export function useUserRole(): UseUserRoleResult {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<UserRole | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsubscribeProfile: (() => void) | null = null

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)

      if (unsubscribeProfile) {
        unsubscribeProfile()
        unsubscribeProfile = null
      }

      if (!currentUser) {
        setRole(null)
        setLoading(false)
        return
      }

      setLoading(true)
      const profileRef = doc(db, "users", currentUser.uid)

      unsubscribeProfile = onSnapshot(
        profileRef,
        (snapshot) => {
          const data = snapshot.data()
          setRole(deriveRoleFromProfile(data))
          setLoading(false)
        },
        () => {
          setRole("user")
          setLoading(false)
        },
      )
    })

    return () => {
      unsubscribeAuth()
      if (unsubscribeProfile) {
        unsubscribeProfile()
      }
    }
  }, [])

  return { user, role, loading }
}
