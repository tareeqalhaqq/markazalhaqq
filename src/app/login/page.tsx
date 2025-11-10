import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

function AppleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12.015 16.5c.29 0 .585-.064 .854-.183.273-.12.503-.28.69-.452.185-.17.333-.375.448-.593.116-.22.182-.47.182-.733s-.044-.49-.125-.707c-.083-.22-.206-.43-.36-.615-.157-.18-.344-.34-.545-.46-.2-.116-.42-.175-.648-.175-.205 0-.41.04-.6.116-.19.076-.37.19-.53.33-.16.14-.3.3-.41.47-.11.17-.18.35-.21.53-.02.19-.03.38-.03.58 0 .28.05.54.15.76.1.22.25.42.45.59.19.16.42.29.68.37.26.09.55.13.85.13m-2.22-13.5c.6-.02 1.1-.11 1.5-.26.3-.12.5-.28.7-.45.1-.1.2-.24.3-.44.1-.19.2-.42.2-.69 0-.21-.03-.4-.1-.58-.06-.18-.16-.33-.28-.46-.12-.13-.27-.23-.44-.3-.17-.07-.36-.1-.56-.1-.56.03-1.07.16-1.53.38-.45.22-.85.52-1.2.9-.35.37-.66.8-.92 1.28-.27.48-.45.98-.55 1.5H10c.05-.5.15-.98.3-1.4.15-.42.3-.82.5-1.18.2-.37.45-.7.75-.98.3-.29.6-.52.95-.69M16.35 6.6c.15-.22.22-.48.22-.79 0-.28-.06-.53-.18-.75-.12-.22-.28-.4-.48-.53-.2-.13-.43-.2-.68-.2-.3.01-.58.08-.82.2-.24.13-.45.3-.63.5-.18.2-.33.43-.45.68-.12.25-.18.52-.18.78 0 .29.07.56.2.79.13.23.3.43.5.58.2.15.42.26.65.33.23.06.48.1.72.1.27 0 .53-.05.75-.15.22-.1.42-.23.58-.42.16-.18.28-.39.35-.62m3.65-1.5c.2-.33.3-.7.3-1.1 0-.3-.04-.57-.12-.8-.08-.23-.2-.44-.35-.62s-.32-.32-.5-.43c-.18-.1-.38-.16-.6-.18-.2-.02-.4-.03-.6-.03-.56 0-1.08.1-1.55.3-.47.2-.9.48-12.8 1.42-.38.45-.7.9-1 1.34s.48.88.75 1.3c.27.42.6.83 1 1.22.4.4.8.75 1.25 1.02.45.28.9.48 1.35.62.45.13.9.2 1.35.2.1 0 .2-.01.3-.02.2-.02.4-.05.6-.1.4-.08.75-.24 1.1-.45.3-.22.6-.5.8-.82.2-.32.3-.67.3-1.05 0-.3-.04-.58-.12-.82-.08-.25-.2-.48-.35-.68-.15-.2-.32-.38-.5-.53-.18-.15-.38-.28-.6-.38-.22-.1-.45-.16-.68-.18-.25-.02-.5 0-.72.03-.22.03-.42.1-.6.18-.18.08-.33.18-.45.3-.12.12-.2.26-.25.42-.05.16-.08.33-.08.52 0 .22.05.42.15.6.1.18.25.34.42.45.18.12.38.2.6.22.22.02.45.03.68.03.3 0 .58-.04.82-.12.24-.08.48-.2.68-.38.2-.17.38-.38.52-.62.14-.24.2-.5.2-.78Z" />
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
function TareeqAlhaqqIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8.5 16.5l-3-3 1.5-1.5L8.5 13.5l6-6 1.5 1.5-7.5 7.5z" />
      </svg>
    )
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-sky-100 via-white to-sky-200 px-4 py-16">
      <Card className="w-full max-w-md border border-primary/10 bg-white/80 shadow-xl shadow-primary/20 backdrop-blur">
        <CardHeader className="space-y-3 text-center">
          <CardTitle className="font-headline text-3xl font-bold tracking-tight text-foreground">Welcome back</CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Sign in to continue your journey with the official Tareeq Al-Haqq academy.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <form className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="ml-auto inline-block text-sm text-primary underline">
                    Forgot password?
                  </Link>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <Button variant="outline" className="w-full">
                <GoogleIcon className="mr-2 h-5 w-5" /> Login with Google
              </Button>
              <Button variant="outline" className="w-full bg-black text-white hover:bg-black/80 hover:text-white">
                <AppleIcon className="mr-2 h-5 w-5" /> Login with Apple
              </Button>
              <Button variant="outline" className="w-full">
                <TareeqAlhaqqIcon className="mr-2 h-5 w-5 text-green-600" /> Login with Tareeqalhaqq
              </Button>
            </div>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-medium text-primary underline">
                Sign up
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
