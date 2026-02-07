import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'

const isPublicRoute = createRouteMatcher([
    '/',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/plans',
    '/courses',
    '/courses/(.*)',
    '/about',
    '/instructors',
    '/talib-al-ilm',
    '/faq',
    '/api/webhooks(.*)',
    '/auth(.*)',
])

const clerkHandler = clerkMiddleware(async (auth, request) => {
    if (!isPublicRoute(request)) {
        await auth.protect()
    }
})

export default async function middleware(request: NextRequest, event: NextFetchEvent) {
    try {
        return await clerkHandler(request, event)
    } catch (error) {
        console.error('[middleware] Clerk invocation failed:', error)
        return NextResponse.next()
    }
}

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}
