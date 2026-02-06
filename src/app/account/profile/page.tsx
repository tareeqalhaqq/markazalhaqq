import dynamic from "next/dynamic"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const ProfileClient = dynamic(() => import("./ProfileClient").then((mod) => mod.ProfileClient), { ssr: false })

export default function AccountProfilePage() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Clerk configuration required</AlertTitle>
        <AlertDescription>
          Add a NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY environment variable to enable profile management.
        </AlertDescription>
      </Alert>
    )
  }

  return <ProfileClient />
}
