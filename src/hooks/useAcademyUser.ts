"use client"

import { useEffect, useState } from "react"

import type { User } from "@supabase/supabase-js"

import { ensureAcademyUser } from "@/lib/ensureAcademyUser"
import { supabase } from "@/lib/supabaseClient"

type AcademyCourse = Record<string, unknown> & { id: string }

type UseAcademyUserResult = {
  user: User | null
  userDoc: (Record<string, unknown> & { id: string }) | null
  courses: AcademyCourse[]
  loading: boolean
}

export function useAcademyUser(): UseAcademyUserResult {
  const [user, setUser] = useState<User | null>(null)
  const [userDoc, setUserDoc] = useState<(Record<string, unknown> & { id: string }) | null>(null)
  const [courses, setCourses] = useState<AcademyCourse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const handleSession = async (currentUser: User | null) => {
      if (!isMounted) return
      setUser(currentUser)

      if (!currentUser) {
        setUserDoc(null)
        setCourses([])
        setLoading(false)
        return
      }

      setLoading(true)

      try {
        await ensureAcademyUser(currentUser)
        const { data: userProfile, error: profileError } = await supabase
          .from("users")
          .select("*")
          .eq("id", currentUser.id)
          .maybeSingle()

        if (profileError) {
          console.error("Failed to load user profile", profileError)
        }

        setUserDoc(userProfile ? { id: userProfile.id, ...userProfile } : null)

        const { data: courseData, error: courseError } = await supabase
          .from("academyCourses")
          .select("*")
          .or(`userId.eq.${currentUser.id},userUid.eq.${currentUser.id},studentId.eq.${currentUser.id}`)

        if (courseError) {
          console.error("Failed to load academy courses", courseError)
          setCourses([])
        } else {
          setCourses((courseData ?? []).map((course) => ({ id: String(course.id ?? ""), ...course })))
        }
      } catch (error) {
        console.error("Failed to load academy user data", error)
        setCourses([])
      } finally {
        setLoading(false)
      }
    }

    supabase.auth
      .getSession()
      .then(({ data }) => handleSession(data.session?.user ?? null))
      .catch((error) => {
        console.error("Failed to get session", error)
        setLoading(false)
      })

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSession(session?.user ?? null)
    })

    return () => {
      isMounted = false
      authListener.subscription.unsubscribe()
    }
  }, [])

  return { user, userDoc, courses, loading }
}
