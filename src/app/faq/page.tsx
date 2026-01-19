import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function FAQPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6 px-4">
      <h1 className="text-4xl font-bold">Frequency Asked Questions</h1>
      <p className="text-muted-foreground">
        We are updating our FAQ section. Please contact support if you have any questions.
      </p>
      <Button asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  )
}
