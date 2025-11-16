"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { FirebaseError } from "firebase/app"
import {
  GoogleAuthProvider,
  OAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TareeqAlhaqqIcon } from "@/components/icons/TareeqAlhaqqIcon"
import { ensureAcademyUser } from "@/lib/ensureAcademyUser"
import { auth } from "@/lib/firebaseClient"

function AppleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12.015 16.5c.29 0 .585-.064 .854-.183.273-.12.503-.28.69-.452.185-.17.333-.375.448-.593.116-.22.182-.47.182-.733s-.044-.49-.125-.707c-.083-.22-.206-.43-.36-.615-.157-.18-.344-.34-.545-.46-.2-.116-.42-.175-.648-.175-.205 0-.41.04-.6.116-.19.076-.37.19-.53.33-.16.14-.3.3-.41.47-.11.17-.18.35-.21.53-.02.19-.03.38-.03.58 0 .28.05.54.15.76.1.22.25.42.45.59.19.16.42.29.68.37.26.09.55.13.85.13m-2.22-13.5c.6-.02 1.1-.11 1.5-.26.3-.12.5-.28.7-.45.1-.1.2-.24.3-.44.1-.19.2-.42.2-.69 0-.21-.03-.4-.1-.58-.06-.18-.16-.33-.28-.46-.12-.13-.27-.23-.44-.3-.17-.07-.36-.1-.56-.1-.56.03-1.07.16-1.53.38-.45.22-.85.52-1.2.9-.35.37-.66.8-.92 1.28-.27.48-.45.98-.55 1.5H10c.05-.5.15-.98.3-1.4.15-.42.3-.82.5-1.18.2-.37.45-.7.75-.98.3-.29.6-.52.95-.69M16.35 6.6c.15-.22.22-.48.22-.79 0-.28-.06-.53-.18-.75-.12-.22-.28-.4-.48-.53-.2-.13-.43-.2-.68-.2-.3.01-.58.08-.82.2-.24.13-.45.3-.63.5-.18.2-.33.43-.45.68-.12.25-.18.52-.18.78 0 .29.07.56.2.79.13.23.3.43.5.58.2.15.42.26.65.33.23.06.48.1.72.1.27 0 .53-.05.75-.15.22-.1.42-.23.58-.42.16-.18.28-.39.35-.62m3.65-1.5c.2-.33.3-.7.3-1.1 0-.3-.04-.57-.12-.8-.08-.23-.2-.44-.35-.62s-.32-.32-.5-.43c-.18-.11-.38-.16-.6-.18-.2-.02-.4-.03-.6-.03-.56 0-1.08.1-1.55.3-.47.2-.9.48-1.28.82-.38.45-.7.9-1 1.34s-.48.88-.75 1.3c-.27.42-.6.83-1 1.22-.4.4-.8.75-1.25 1.02-.45.28-.9.48-1.35.62-.45.13-.9.2-1.35.2-.1 0-.2-.01-.3-.02-.2-.02-.4-.05-.6-.1-.4-.08-.75-.24-1.1-.45-.3-.22-.6-.5-.82-.82-.22-.32-.33-.67-.33-1.05 0-.3.04-.58.12-.82.08-.25.2-.48.35-.68.15-.2.32-.38.5-.53.18-.15.38-.28.6-.38.22-.1.45-.16.68-.18.23-.02.48 0 .72.03.24.03.42.1.6.18.18.08.33.18.45.3.12.12.2.26.25.42.05.16.08.33.08.52 0 .22-.05.42-.15.6-.1.18-.25.34-.42.45-.18.12-.38.2-.6.22-.22.02-.45.03-.68.03-.3 0-.58-.04-.82-.12-.24-.08-.48-.2-.68-.38-.2-.17-.38-.38-.52-.62-.14-.24-.2-.5-.2-.78Z" />
        </svg>
    );
}
function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

function getSignupErrorMessage(error: unknown) {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "An account with that email already exists. Try signing in instead."
      case "auth/invalid-email":
        return "Please provide a valid email address."
      case "auth/weak-password":
        return "Your password should be at least 6 characters long."
      default:
        return "We couldn't create your account. Please try again."
    }
  }

  return "We couldn't create your account. Please try again."
}

function getFriendlyErrorMessage(error: unknown) {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "That email is already registered. Try signing in or resetting your password."
      case "auth/invalid-email":
        return "That email doesn’t look right. Please double-check and try again."
      case "auth/weak-password":
        return "Your password must be at least 6 characters. Please choose a stronger password."
      default:
        return "We couldn’t create your account. Please try again or contact support if the issue continues."
    }
  }

  return "Something went wrong while creating your account. Please try again."
}

const googleProvider = new GoogleAuthProvider()
const appleProvider = new OAuthProvider("apple.com")
appleProvider.addScope("email")
appleProvider.addScope("name")

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
  const [socialLoading, setSocialLoading] = useState<"google" | "apple" | null>(null)

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
      router.push("/academy")
    } catch (err) {
      if (err instanceof FirebaseError && err.code.startsWith("auth/")) {
        setError(getFriendlySignupErrorMessage(err))
      } else {
        console.error("Failed to create academy profile", err)
        setError("We couldn't finish preparing your academy profile. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleSocialSignup(provider: GoogleAuthProvider | OAuthProvider, providerName: "google" | "apple") {
    setError(null)
    setSocialLoading(providerName)

    try {
      const credential = await signInWithPopup(auth, provider)
      await ensureAcademyUser(credential.user)
      router.push("/academy")
    } catch (err) {
      if (err instanceof FirebaseError && err.code.startsWith("auth/")) {
        setError(getFriendlySignupErrorMessage(err))
      } else {
        console.error("Failed to complete profile setup", err)
        setError("We couldn't finish preparing your academy profile. Please try again.")
      }
    } finally {
      setSocialLoading(null)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-white via-blue-50/60 to-purple-50/60 px-4 py-16">
      <Card className="w-full max-w-md border border-muted bg-white/85 shadow-xl shadow-primary/15 backdrop-blur">
        <CardHeader className="space-y-3 text-center">
          <CardTitle className="font-headline text-3xl font-bold tracking-tight text-foreground">Create an account</CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Join MarkazalHaqq to access the official Tareeq Al-Haqq learning experience.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {error ? (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="full-name">Full name</Label>
                <Input id="full-name" name="full-name" placeholder="Your name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Creating account..." : "Create account"}
              </Button>
            </form>
            {isSubmitting ? (
              <p className="text-center text-sm text-muted-foreground" aria-live="polite">
                Creating your account and preparing your academy dashboard…
              </p>
            ) : null}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">Or sign up with</span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                disabled={socialLoading === "google"}
                onClick={() => handleSocialSignup(googleProvider, "google")}
              >
                {socialLoading === "google" ? (
                  "Connecting to Google…"
                ) : (
                  <>
                    <GoogleIcon className="mr-2 h-5 w-5" /> Sign up with Google
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full bg-black text-white hover:bg-black/80 hover:text-white"
                disabled={socialLoading === "apple"}
                onClick={() => handleSocialSignup(appleProvider, "apple")}
              >
                {socialLoading === "apple" ? (
                  "Connecting to Apple…"
                ) : (
                  <>
                    <AppleIcon className="mr-2 h-5 w-5" /> Sign up with Apple
                  </>
                )}
              </Button>
              <Button variant="outline" className="w-full">
                <TareeqAlhaqqIcon className="mr-2 h-5 w-5 text-green-600" /> Sign up with Tareeqalhaqq
              </Button>
            </div>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function shouldUseRedirectSignIn() {
  if (typeof window === "undefined") {
    return false
  }

  return /Mobi|Android/i.test(window.navigator.userAgent)
}
