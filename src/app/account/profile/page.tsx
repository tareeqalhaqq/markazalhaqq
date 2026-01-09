"use client"

import { useEffect, useState } from "react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAcademyUser } from "@/hooks/useAcademyUser"
import { supabase } from "@/lib/supabaseClient"

const placeholders = {
  headline: "Describe your current focus (e.g., Lead student mentor)",
  bio: "Share a short story about your learning goals and responsibilities within the academy.",
}

type ProfileFormState = {
  name: string
  headline: string
  bio: string
  photoURL: string
}

export default function AccountProfilePage() {
  const { user, userDoc, loading } = useAcademyUser()
  const [formState, setFormState] = useState<ProfileFormState>({
    name: "",
    headline: "",
    bio: "",
    photoURL: "",
  })
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; message: string | null }>({
    type: "idle",
    message: null,
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setFormState({
      name: userDoc?.displayName ?? (user?.user_metadata?.full_name as string) ?? "",
      headline: (userDoc?.headline as string) ?? "",
      bio: (userDoc?.bio as string) ?? "",
      photoURL: userDoc?.photoURL ?? (user?.user_metadata?.avatar_url as string) ?? "",
    })
  }, [user?.user_metadata, userDoc?.bio, userDoc?.displayName, userDoc?.headline, userDoc?.photoURL])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!user) {
      return
    }

    setIsSaving(true)
    setStatus({ type: "idle", message: null })

    try {
      const [authUpdate, profileUpdate] = await Promise.all([
        supabase.auth.updateUser({
          data: {
            full_name: formState.name,
            avatar_url: formState.photoURL || null,
          },
        }),
        supabase
          .from("users")
          .update({
            displayName: formState.name,
            headline: formState.headline,
            bio: formState.bio,
            photoURL: formState.photoURL,
            updatedAt: new Date().toISOString(),
          })
          .eq("id", user.id),
      ])

      if (authUpdate.error || profileUpdate.error) {
        throw authUpdate.error ?? profileUpdate.error
      }
      setStatus({ type: "success", message: "Profile updated successfully." })
    } catch (error) {
      console.error("Failed to update profile", error)
      setStatus({ type: "error", message: "We couldn't save your profile. Please try again." })
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-slate-300">Loading account profile…</p>
      </div>
    )
  }

  if (!user) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Sign in required</AlertTitle>
        <AlertDescription>Log in to manage your academy profile.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-indigo-300">Account</p>
        <h1 className="mt-2 font-headline text-3xl font-semibold text-white">Profile &amp; settings</h1>
        <p className="text-sm text-slate-300">
          Update the details the academy surfaces across dashboards, session rosters, and certificates.
        </p>
      </div>

      {status.type !== "idle" && status.message ? (
        <Alert variant={status.type === "error" ? "destructive" : "default"}>
          <AlertTitle>{status.type === "error" ? "Update failed" : "Profile saved"}</AlertTitle>
          <AlertDescription>{status.message}</AlertDescription>
        </Alert>
      ) : null}

      <Card className="border-white/10 bg-slate-900/70 text-white">
        <CardHeader>
          <CardTitle>Edit profile</CardTitle>
          <CardDescription className="text-slate-400">
            These updates sync directly with Supabase so future releases and certificates pull the latest information automatically.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  value={formState.name}
                  onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="Your display name"
                  className="bg-slate-900/40 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="photo">Photo URL</Label>
                <Input
                  id="photo"
                  value={formState.photoURL}
                  onChange={(event) => setFormState((prev) => ({ ...prev, photoURL: event.target.value }))}
                  placeholder="https://"
                  className="bg-slate-900/40 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="headline">Role headline</Label>
              <Input
                id="headline"
                value={formState.headline}
                onChange={(event) => setFormState((prev) => ({ ...prev, headline: event.target.value }))}
                placeholder={placeholders.headline}
                className="bg-slate-900/40 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Story &amp; responsibilities</Label>
              <Textarea
                id="bio"
                value={formState.bio}
                onChange={(event) => setFormState((prev) => ({ ...prev, bio: event.target.value }))}
                placeholder={placeholders.bio}
                className="min-h-[140px] bg-slate-900/40 text-white"
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSaving} className="rounded-full">
                {isSaving ? "Saving…" : "Save profile"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
