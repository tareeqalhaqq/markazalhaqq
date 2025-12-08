"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { FirebaseError } from "firebase/app"
import { onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { Loader2, Mail } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ensureAcademyUser } from "@/lib/ensureAcademyUser"
import { appleProvider, auth, db, googleProvider } from "@/lib/firebaseClient"
import { deriveRoleFromProfile, type UserRole } from "@/lib/userRoles"

async function resolveRole(userId: string): Promise<UserRole> {
  const profileRef = doc(db, "users", userId)
  const profileSnapshot = await getDoc(profileRef)
  return deriveRoleFromProfile(profileSnapshot.data())
}

function getDestination(role: UserRole) {
  return role === "admin" ? "/dashboard/admin" : "/dashboard/student"
}

function getFriendlyErrorMessage(error: unknown) {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/invalid-credential":
      case "auth/invalid-email":
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "Those credentials don’t match any academy profile. Double-check the email and password."
      case "auth/too-many-requests":
        return "Too many attempts. Please wait a moment and try again."
      default:
        return "We couldn't sign you in. Please try again or contact support."
    }
  }

  return "Something went wrong while signing you in. Please try again."
}

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return
      resolveRole(currentUser.uid)
        .then((role) => router.replace(getDestination(role)))
        .catch(() => router.replace("/dashboard/student"))
    })

    return () => unsubscribe()
  }, [router])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setStatusMessage(null)
    setIsSubmitting(true)

    try {
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password)
      await ensureAcademyUser(credential.user)
      const role = await resolveRole(credential.user.uid)
      router.push(getDestination(role))
    } catch (err) {
      if (err instanceof FirebaseError && err.code.startsWith("auth/")) {
        setError(getFriendlyErrorMessage(err))
      } else {
        setError("We couldn't finish preparing your academy profile. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handlePasswordReset() {
    setError(null)
    setStatusMessage(null)

    if (!email.trim()) {
      setError("Enter the email tied to your academy account so we can send a reset link.")
      return
    }

    try {
      await sendPasswordResetEmail(auth, email.trim())
      setStatusMessage(`Password reset instructions are on their way to ${email.trim()}.`)
    } catch (err) {
      if (err instanceof FirebaseError && err.code.startsWith("auth/")) {
        setError(getFriendlyErrorMessage(err))
      } else {
        setError("We couldn't send the reset email. Please try again.")
      }
    }
  }

  async function handleProvider(provider: typeof googleProvider) {
    if (!provider) return
    setError(null)
    setStatusMessage(null)
    setIsSubmitting(true)

    try {
      const credential = await signInWithPopup(auth, provider)
      await ensureAcademyUser(credential.user)
      const role = await resolveRole(credential.user.uid)
      router.push(getDestination(role))
    } catch (err) {
      setError("We couldn't authenticate with that provider. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-16">
        <div className="space-y-4 text-center lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Sign in</p>
          <h1 className="font-headline text-4xl font-semibold text-slate-900">Access your Academy account</h1>
          <p className="max-w-xl text-base text-slate-600">
            Use your email and password or continue with Google or Apple. Your admin or student dashboard will load based on
            your role.
          </p>
        </div>

        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>Enter your credentials to continue.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error ? (
              <Alert variant="destructive">
                <AlertTitle>Unable to sign in</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}
            {statusMessage ? (
              <Alert>
                <AlertTitle>Check your email</AlertTitle>
                <AlertDescription>{statusMessage}</AlertDescription>
              </Alert>
            ) : null}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in
                  </>
                ) : (
                  "Sign in"
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
                <Mail className="mr-2 h-4 w-4" /> Continue with Google
              </Button>
              {appleProvider ? (
                <Button variant="outline" className="w-full" onClick={() => handleProvider(appleProvider)} disabled={isSubmitting}>
                  Continue with Apple
                </Button>
              ) : null}
            </div>

            <button
              type="button"
              onClick={handlePasswordReset}
              className="w-full text-left text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              Forgot your password?
            </button>
          </CardContent>
          <CardFooter className="flex justify-between text-sm text-slate-600">
            <span>Do not have an account?</span>
            <Link href="/signup" className="font-semibold text-slate-900 hover:underline">
              Sign up
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
