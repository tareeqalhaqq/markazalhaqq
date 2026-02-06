'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0a0a0b] text-white antialiased min-h-screen flex items-center justify-center">
        <div className="mx-auto max-w-md px-6 text-center space-y-6">
          <h1 className="text-2xl font-semibold">Something went wrong</h1>
          <p className="text-sm text-white/50">
            An unexpected error occurred while loading the page. Please try again.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={reset}
              className="rounded-full bg-white/10 px-5 py-2 text-sm font-medium hover:bg-white/20 transition-colors"
            >
              Try again
            </button>
            <a
              href="/"
              className="rounded-full border border-white/10 px-5 py-2 text-sm font-medium hover:bg-white/5 transition-colors"
            >
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
