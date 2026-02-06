import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PlansPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
        Plans
      </span>
      <h1 className="mt-6 font-headline text-3xl font-semibold text-foreground sm:text-4xl">
        Coming Soon
      </h1>
      <p className="mt-4 max-w-md text-sm text-white/50">
        We are updating our membership plans to better serve the community. Please check back later.
      </p>
      <Button asChild className="mt-8 rounded-full px-6">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  )
}
