import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { createClerkSupabaseClient } from '@/lib/supabase'
import { auth } from '@clerk/nextjs/server'

export async function GET() {
    const authObj = await auth()
    const { userId } = authObj
    const user = await currentUser()

    if (!userId || !user) {
        return redirect('/sign-in')
    }

    const supabase = await createClerkSupabaseClient(authObj)

    const email = user.emailAddresses[0]?.emailAddress
    const fullName = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim()

    // 1. Ensure Profile in Supabase
    const { error: profileError } = await supabase.rpc('ensure_profile', {
        clerk_id: userId,
        email: email,
        full_name: fullName || email, // Fallback to email if name is empty
    })

    if (profileError) {
        console.error('Error creating profile:', profileError)
        // Continue anyway, maybe it exists or partial failure. 
        // Ideally we might show an error, but let's try to proceed.
    }

    // 2. Check Role and Membership for Routing
    // Check if admin
    const { data: profile } = await supabase
        .from('profiles')
        .select('app_role')
        .eq('id', userId)
        .single()

    if (profile?.app_role === 'admin') {
        return redirect('/dashboard')
    }

    // Check academy membership
    const { data: memberships } = await supabase
        .from('academy_memberships')
        .select('id')
        .eq('user_id', userId)
        .limit(1)

    const hasMembership = memberships && memberships.length > 0

    if (hasMembership) {
        return redirect('/dashboard')
    } else {
        // New user or no membership
        return redirect('/onboarding')
    }
}
