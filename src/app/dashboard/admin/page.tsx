"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUserRole } from "@/hooks/useUserRole"
import { USER_ROLES, type UserRole, updateUserRole } from "@/lib/userRoles"

export default function AdminWorkspacePage() {
  const router = useRouter()
  const { user, role, loading } = useUserRole()
  const [targetUserId, setTargetUserId] = useState("")
  const [selectedRole, setSelectedRole] = useState<UserRole>("user")
  const [roleUpdateSuccess, setRoleUpdateSuccess] = useState<string | null>(null)
  const [roleUpdateError, setRoleUpdateError] = useState<string | null>(null)
  const [isUpdatingRole, setIsUpdatingRole] = useState(false)

  useEffect(() => {
    if (!loading && (!user || role !== "admin")) {
      router.replace("/dashboard")
    }
  }, [loading, role, router, user])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Checking your admin permissions…</p>
      </div>
    )
  }

  if (!user || role !== "admin") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-3 text-center">
        <p className="text-lg font-semibold">Admin access required</p>
        <p className="text-muted-foreground">
          This workspace is restricted to verified MarkazalHaqq administrators.
        </p>
      </div>
    )
  }

  async function handleRoleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setRoleUpdateSuccess(null)
    setRoleUpdateError(null)

    const trimmedTarget = targetUserId.trim()

    if (!trimmedTarget) {
      setRoleUpdateError("Enter the UID of the user you want to update.")
      return
    }

    try {
      setIsUpdatingRole(true)
      await updateUserRole(trimmedTarget, selectedRole, user.uid)
      setRoleUpdateSuccess(`Updated role for ${trimmedTarget} to ${selectedRole}.`)
      setTargetUserId("")
    } catch (error) {
      console.error("Failed to update user role", error)
      setRoleUpdateError("Unable to update the user role. Double-check the UID and try again.")
    } finally {
      setIsUpdatingRole(false)
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4">
      <div className="space-y-1 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">Admin workspace</p>
        <h1 className="text-3xl font-bold">Manage privileged access</h1>
        <p className="text-muted-foreground">
          Administrators can grant or revoke elevated permissions and work with admin-only Firestore content.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assign roles</CardTitle>
          <CardDescription>
            Update the <code>role</code> field inside <code>users/{"{"}uid{"}"}</code> documents to grant admin access.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleRoleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="target-uid">Firebase UID</Label>
              <Input
                id="target-uid"
                name="target-uid"
                placeholder="userUid123"
                value={targetUserId}
                onChange={(event) => setTargetUserId(event.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                name="role"
                value={selectedRole}
                onChange={(event) => setSelectedRole(event.target.value as UserRole)}
                className="h-11 rounded-md border border-input bg-transparent px-3 py-2 text-sm"
              >
                {USER_ROLES.map((roleValue) => (
                  <option key={roleValue} value={roleValue}>
                    {roleValue === "admin" ? "Admin" : "User"}
                  </option>
                ))}
              </select>
            </div>
            <Button type="submit" disabled={isUpdatingRole}>
              {isUpdatingRole ? "Updating role…" : "Update role"}
            </Button>
          </form>
          <div className="mt-4 space-y-2">
            {roleUpdateSuccess ? (
              <Alert>
                <AlertDescription>{roleUpdateSuccess}</AlertDescription>
              </Alert>
            ) : null}
            {roleUpdateError ? (
              <Alert variant="destructive">
                <AlertDescription>{roleUpdateError}</AlertDescription>
              </Alert>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Admin-only collections</CardTitle>
          <CardDescription>
            Documents in <code>admin_content</code> are protected by security rules. Only users whose role is set to
            <code>admin</code> may read or write.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            Store unpublished launches, cohort outlines, or sensitive announcements in <code>admin_content</code> to keep them
            hidden from students until you&apos;re ready to share.
          </p>
          <ul className="list-disc space-y-2 pl-4">
            <li>Use Firestore listeners to react to updates instantly inside the admin dashboard.</li>
            <li>Pair these rules with Cloud Functions if you want to automate onboarding or audits.</li>
            <li>Changes to a user&apos;s <code>role</code> take effect immediately thanks to the real-time listener.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
