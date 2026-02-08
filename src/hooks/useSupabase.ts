import { useSession } from '@clerk/nextjs'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { useMemo } from 'react'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export function useSupabase(): SupabaseClient {
    const { session } = useSession()

    return useMemo(() => {
        if (!supabaseUrl || !supabaseAnonKey) {
            console.error("useSupabase: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required")
            return createClient('https://placeholder.supabase.co', 'placeholder')
        }

        return createClient(
            supabaseUrl,
            supabaseAnonKey,
            {
                global: {
                    fetch: async (url, options = {}) => {
                        let clerkToken: string | null = null
                        try {
                            clerkToken = await session?.getToken({ template: 'supabase' })
                            if (!clerkToken) {
                                clerkToken = await session?.getToken()
                            }
                        } catch (error) {
                            console.error("useSupabase: unable to fetch Clerk token", error)
                        }
                        const headers = new Headers(options?.headers)
                        if (clerkToken) {
                            headers.set('Authorization', `Bearer ${clerkToken}`)
                        }
                        return fetch(url, {
                            ...options,
                            headers,
                        })
                    },
                },
            }
        )
    }, [session])
}
