import { createClient } from '@supabase/supabase-js'

export async function createClerkSupabaseClient(session: { getToken: (options: { template: string }) => Promise<string | null> }) {
    const token = await session.getToken({ template: 'supabase' }) ?? undefined

    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            global: {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        }
    )
}
