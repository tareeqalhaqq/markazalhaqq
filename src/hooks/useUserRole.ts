"use client"

import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"

import { deriveRoleFromProfile, type UserRole } from "@/lib/userRoles"
import { supabase } from "@/lib/supabaseClient"

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
    let isMounted = true

    const handleUser = async (currentUser: User | null) => {
      if (!isMounted) return
      setUser(currentUser)

      if (!currentUser) {
        setRole(null)
        setLoading(false)
        return
      }

      setLoading(true)
      const { data, error } = await supabase.from("users").select("role, tags").eq("id", currentUser.id).maybeSingle()

      if (error) {
        console.error("Failed to fetch user role", error)
        setRole("user")
      } else {
        setRole(deriveRoleFromProfile(data))
      }
      setLoading(false)
    }

    supabase.auth
      .getSession()
      .then(({ data }) => handleUser(data.session?.user ?? null))
      .catch((error) => {
        console.error("Failed to get session", error)
        setLoading(false)
      })

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      handleUser(session?.user ?? null)
    })

    return () => {
      isMounted = false
      authListener.subscription.unsubscribe()
    }
  }, [])

  return { user, role, loading }
}
