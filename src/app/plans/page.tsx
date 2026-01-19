import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PlansPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6 px-4">
      <h1 className="text-4xl font-bold">Coming Soon</h1>
      <p className="text-muted-foreground">
        We are currently updating our membership plans to better serve the community. Please check back later.
      </p>
      <Button asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  )
}
