import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ProfileClient } from "./ProfileClient"
import { getClerkPublishableKey } from "@/lib/clerk"

export default function AccountProfilePage() {
  if (!getClerkPublishableKey()) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Clerk configuration required</AlertTitle>
        <AlertDescription>
          Add a NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
          environment variable to enable profile management.
        </AlertDescription>
      </Alert>
    )
  }

  return <ProfileClient />
}
