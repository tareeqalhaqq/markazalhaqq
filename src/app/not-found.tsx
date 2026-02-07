import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="mx-auto max-w-md text-center space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Page not found</h1>
        <p className="text-sm text-white/50">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-3">
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
