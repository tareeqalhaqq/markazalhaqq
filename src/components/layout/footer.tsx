import Link from 'next/link';

import { Logo } from '@/components/logo';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center">
              <Logo />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/40">
              Guiding sincere seekers through immersive programs rooted in the Qur&#39;an, Sunnah, and the way of the Salaf.
            </p>
          </div>
          <div className="grid gap-8 text-sm sm:grid-cols-3">
            <div className="space-y-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">Programs</p>
              <nav className="flex flex-col gap-2.5">
                <Link href="/courses" className="text-white/50 transition-colors hover:text-white/80">Courses</Link>
                <Link href="/talib-al-ilm" className="text-white/50 transition-colors hover:text-white/80">Talib al Ilm</Link>
                <Link href="/plans" className="text-white/50 transition-colors hover:text-white/80">Plans</Link>
              </nav>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">Community</p>
              <nav className="flex flex-col gap-2.5">
                <Link href="/about" className="text-white/50 transition-colors hover:text-white/80">About</Link>
                <Link href="/instructors" className="text-white/50 transition-colors hover:text-white/80">Instructors</Link>
                <Link href="/faq" className="text-white/50 transition-colors hover:text-white/80">FAQ</Link>
              </nav>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">Account</p>
              <nav className="flex flex-col gap-2.5">
                <Link href="/sign-in" className="text-white/50 transition-colors hover:text-white/80">Sign in</Link>
                <Link href="/sign-up" className="text-white/50 transition-colors hover:text-white/80">Create account</Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/[0.06] pt-6 text-center text-xs text-white/25">
          &copy; {new Date().getFullYear()} Markaz al-Haqq Academy
        </div>
      </div>
    </footer>
  );
}
