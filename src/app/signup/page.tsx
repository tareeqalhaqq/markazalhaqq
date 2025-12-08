"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { FirebaseError } from "firebase/app"
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth"
import { Loader2 } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ensureAcademyUser } from "@/lib/ensureAcademyUser"
import { appleProvider, auth, googleProvider } from "@/lib/firebaseClient"

function getFriendlySignupErrorMessage(error: unknown) {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "That email already has an account. Try logging in instead."
      case "auth/invalid-email":
        return "Please enter a valid email address."
      case "auth/weak-password":
        return "Please choose a stronger password with at least 6 characters."
      default:
        return "We couldn’t create your account. Please try again."
    }
  }

  return "Something went wrong while creating your account. Please try again."
}

export default function SignupPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const fullName = String(formData.get("full-name") || "").trim()
    const email = String(formData.get("email") || "").trim()
    const password = String(formData.get("password") || "")

    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password)

      if (fullName) {
        await updateProfile(credential.user, { displayName: fullName })
      }

      await ensureAcademyUser(credential.user)
      router.push("/dashboard/student")
    } catch (err) {
      setError(getFriendlySignupErrorMessage(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleProvider(provider: typeof googleProvider) {
    if (!provider) return
    setError(null)
    setIsSubmitting(true)

    try {
      const credential = await signInWithPopup(auth, provider)
      await ensureAcademyUser(credential.user)
      router.push("/dashboard/student")
    } catch (err) {
      setError(getFriendlySignupErrorMessage(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-16">
        <div className="space-y-4 text-center lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Sign up</p>
          <h1 className="font-headline text-4xl font-semibold text-slate-900">Create your Academy account</h1>
          <p className="max-w-xl text-base text-slate-600">
            Use the same authentication options as login: email and password, Google, or Apple. You&apos;ll land in the student
            dashboard after creating your profile.
          </p>
        </div>

        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle>Sign up</CardTitle>
            <CardDescription>Start learning with the Academy.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error ? (
              <Alert variant="destructive">
                <AlertTitle>Unable to create account</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="full-name">Full name</Label>
                <Input id="full-name" name="full-name" autoComplete="name" placeholder="Umar Farooq" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required autoComplete="new-password" />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account
                  </>
                ) : (
                  "Create account"
                )}
              </Button>
            </form>

            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-slate-200" />
              <span className="text-xs text-slate-400">or</span>
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="space-y-3">
              <Button variant="outline" className="w-full" onClick={() => handleProvider(googleProvider)} disabled={isSubmitting}>
                Continue with Google
              </Button>
              {appleProvider ? (
                <Button variant="outline" className="w-full" onClick={() => handleProvider(appleProvider)} disabled={isSubmitting}>
                  Continue with Apple
                </Button>
              ) : null}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between text-sm text-slate-600">
            <span>Already have an account?</span>
            <Link href="/login" className="font-semibold text-slate-900 hover:underline">
              Sign in
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
