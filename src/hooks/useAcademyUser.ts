"use client"

import { useUser } from "@clerk/nextjs"

type AcademyUserHook = {
  user: ReturnType<typeof useUser>["user"]
  courses: unknown[]
  loading: boolean
}

export function useAcademyUser(): AcademyUserHook {
  const { user, isLoaded } = useUser()

  return {
    user,
    courses: [],
    loading: !isLoaded,
  }
}
