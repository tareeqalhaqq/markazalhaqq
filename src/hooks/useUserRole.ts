"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"

type ProfileState = {
  profileId: string | null
  appRole: string | null
  hasMembership: boolean
}

type ClerkUserResult = ReturnType<typeof useUser>

function useSafeClerkUser(): ClerkUserResult {
  try {
    return useUser()
  } catch {
    return { user: null, isSignedIn: false, isLoaded: true } as ClerkUserResult
  }
}

export function useUserRole() {
  const { user: clerkUser, isLoaded } = useSafeClerkUser()
  const [profileState, setProfileState] = useState<ProfileState>({
    profileId: null,
    appRole: null,
    hasMembership: false,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoaded) return

    if (!clerkUser) {
      setProfileState({ profileId: null, appRole: null, hasMembership: false })
      setLoading(false)
      return
    }

    let cancelled = false

    async function fetchProfileState() {
      setLoading(true)
      try {
        const response = await fetch("/api/me", { cache: "no-store" })
        if (!response.ok) {
          throw new Error(`Unable to load profile (status ${response.status})`)
        }

        const data = await response.json()
        if (cancelled) return

        setProfileState({
          profileId: data.profileId ?? null,
          appRole: data.appRole ?? null,
          hasMembership: Boolean(data.hasMembership),
        })
      } catch (error) {
        console.error(error)
        if (!cancelled) {
          setProfileState((current) => ({
            profileId: current.profileId,
            appRole: current.appRole ?? "user",
            hasMembership: current.hasMembership,
          }))
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchProfileState()

    return () => {
      cancelled = true
    }
  }, [clerkUser, isLoaded])

  const resolvedRole = profileState.appRole ?? "student"

  return {
    user: clerkUser,
    role: resolvedRole as "admin" | "instructor" | "student",
    profileId: profileState.profileId,
    hasMembership: profileState.hasMembership,
    loading: loading || !isLoaded,
  }
}
