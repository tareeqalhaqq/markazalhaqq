"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useSupabase } from "@/hooks/useSupabase"

export function useUserRole() {
    const { user: clerkUser, isLoaded } = useUser()
    const supabase = useSupabase()
    const [role, setRole] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!isLoaded) return
        if (!clerkUser) {
            setRole(null)
            setLoading(false)
            return
        }

        async function fetchRole() {
            try {
                const { data, error } = await supabase
                    .from("profiles")
                    .select("app_role")
                    .eq("id", clerkUser?.id)
                    .single()

                if (data) {
                    setRole(data.app_role)
                } else {
                    setRole("user") // Default to user if no profile found (or handle error)
                }
            } catch (err) {
                console.error(err)
                setRole("user")
            } finally {
                setLoading(false)
            }
        }

        fetchRole()
    }, [isLoaded, clerkUser, supabase])

    // Return a shape compatible with legacy usage where possible, or updated
    return {
        user: clerkUser,
        role,
        loading: loading || !isLoaded
    }
}
