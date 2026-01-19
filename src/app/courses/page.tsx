import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CoursesPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6 px-4">
      <h1 className="text-4xl font-bold">Coming Soon</h1>
      <p className="text-muted-foreground">
        Our course catalog is being refreshed. Please check back later for the new curriculum.
      </p>
      <Button asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  )
}
