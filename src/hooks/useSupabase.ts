import { useSession } from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js'
import { useMemo } from 'react'

export function useSupabase() {
    const { session } = useSession()

    return useMemo(() => {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

        if (!supabaseUrl || !supabaseAnonKey) {
            // Return null during build/SSG when env vars aren't available
            return null
        }

        return createClient(
            supabaseUrl,
            supabaseAnonKey,
            {
                global: {
                    fetch: async (url, options = {}) => {
                        const clerkToken = await session?.getToken({ template: 'supabase' })
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
