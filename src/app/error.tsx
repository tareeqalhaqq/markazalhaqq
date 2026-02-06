'use client'

import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="mx-auto max-w-md text-center space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Something went wrong</h1>
        <p className="text-sm text-white/50">
          An error occurred while loading this page. Please try again.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="rounded-full bg-white/10 px-5 py-2 text-sm font-medium hover:bg-white/20 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full border border-white/10 px-5 py-2 text-sm font-medium hover:bg-white/5 transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}
