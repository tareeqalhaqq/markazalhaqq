"use client"

import { useEffect, useState } from "react"

import { doc, serverTimestamp, updateDoc } from "firebase/firestore"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useAcademyUser } from "@/hooks/useAcademyUser"
import { db } from "@/lib/firebaseClient"

type PreferencesState = {
  emailUpdates: boolean
  sessionReminders: boolean
  marketingOptIn: boolean
  timezone: string
}

const timezoneOptions = [
  { value: "UTC", label: "UTC" },
  { value: "America/New_York", label: "Eastern" },
  { value: "America/Chicago", label: "Central" },
  { value: "America/Denver", label: "Mountain" },
  { value: "America/Los_Angeles", label: "Pacific" },
  { value: "Europe/London", label: "London" },
]

export default function AccountSettingsPage() {
  const { firebaseUser, userDoc, loading } = useAcademyUser()
  const [preferences, setPreferences] = useState<PreferencesState>({
    emailUpdates: true,
    sessionReminders: true,
    marketingOptIn: false,
    timezone: "UTC",
  })
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; message: string | null }>({
    type: "idle",
    message: null,
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!userDoc) return
    const docPreferences = (userDoc.preferences as Partial<PreferencesState>) ?? {}
    setPreferences((prev) => ({
      ...prev,
      ...docPreferences,
    }))
  }, [userDoc])

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!firebaseUser) return

    setIsSaving(true)
    setStatus({ type: "idle", message: null })

    try {
      await updateDoc(doc(db, "users", firebaseUser.uid), {
        preferences,
        updatedAt: serverTimestamp(),
      })
      setStatus({ type: "success", message: "Notification preferences updated." })
    } catch (error) {
      console.error("Failed to update preferences", error)
      setStatus({ type: "error", message: "We couldn't save your preferences. Please try again." })
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-slate-300">Loading account preferences…</p>
      </div>
    )
  }

  if (!firebaseUser) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Sign in required</AlertTitle>
        <AlertDescription>Log in to manage your account settings.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-indigo-300">Account</p>
        <h1 className="mt-2 font-headline text-3xl font-semibold text-white">Notification &amp; access settings</h1>
        <p className="text-sm text-slate-300">
          Define how the academy reaches you and which time zone to use for reminders.
        </p>
      </div>

      {status.type !== "idle" && status.message ? (
        <Alert variant={status.type === "error" ? "destructive" : "default"}>
          <AlertTitle>{status.type === "error" ? "Update failed" : "Preferences saved"}</AlertTitle>
          <AlertDescription>{status.message}</AlertDescription>
        </Alert>
      ) : null}

      <Card className="border-white/10 bg-slate-900/70 text-white">
        <CardHeader>
          <CardTitle>Communication preferences</CardTitle>
          <CardDescription className="text-slate-400">
            Toggle reminders and updates for the dashboards that replace the public marketing navigation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4 rounded-2xl bg-white/5 p-4">
                <div>
                  <p className="font-semibold">Email updates</p>
                  <p className="text-sm text-slate-400">Receive summaries about new courses, resources, and exams.</p>
                </div>
                <Switch
                  checked={preferences.emailUpdates}
                  onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, emailUpdates: checked }))}
                />
              </div>

              <div className="flex items-start justify-between gap-4 rounded-2xl bg-white/5 p-4">
                <div>
                  <p className="font-semibold">Live session reminders</p>
                  <p className="text-sm text-slate-400">24-hour alerts keep you on time for the live sessions listed in the academy menu.</p>
                </div>
                <Switch
                  checked={preferences.sessionReminders}
                  onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, sessionReminders: checked }))}
                />
              </div>

              <div className="flex items-start justify-between gap-4 rounded-2xl bg-white/5 p-4">
                <div>
                  <p className="font-semibold">Community highlights</p>
                  <p className="text-sm text-slate-400">Opt-in to hear about new benefits, news, and roadmap milestones.</p>
                </div>
                <Switch
                  checked={preferences.marketingOptIn}
                  onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, marketingOptIn: checked }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Primary timezone</Label>
              <Select
                value={preferences.timezone}
                onValueChange={(value) => setPreferences((prev) => ({ ...prev, timezone: value }))}
              >
                <SelectTrigger id="timezone" className="bg-slate-900/40 text-white">
                  <SelectValue placeholder="Select a timezone" />
                </SelectTrigger>
                <SelectContent>
                  {timezoneOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSaving} className="rounded-full">
                {isSaving ? "Saving…" : "Save preferences"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
