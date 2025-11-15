'use client';

import Link from 'next/link';
import { Menu, BookOpen, Users, DollarSign, HelpCircle, GraduationCap, CalendarClock, Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/courses', label: 'Courses', icon: BookOpen },
  { href: '/about', label: 'About', icon: Users },
  { href: '/instructors', label: 'Instructors', icon: GraduationCap },
  { href: '/talib-al-ilm', label: 'Talib al Ilm', icon: Sparkles },
  { href: '/plans', label: 'Plans', icon: DollarSign },
  { href: '/faq', label: 'FAQ', icon: HelpCircle },
];

function NavLink({ href, children, mobile = false }: { href: string; children: React.ReactNode; mobile?: boolean }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const linkContent = (
    <Link
      href={href}
      className={cn(
        'font-medium transition-colors',
        mobile
          ? 'flex items-center rounded-xl p-2 text-base hover:bg-muted'
          : 'rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] hover:bg-primary/10',
        isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
      )}
    >
      {children}
    </Link>
  );

  return mobile ? <SheetClose asChild>{linkContent}</SheetClose> : linkContent;
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-white/80 backdrop-blur-md">
      <div className="hidden border-b border-primary/20 bg-gradient-to-r from-primary via-primary/80 to-secondary/90 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary-foreground md:block">
        <div className="container mx-auto flex items-center justify-center px-6">
          Next cohort opens soon · Join the waitlist today
        </div>
      </div>
      <div className="container mx-auto flex max-w-screen-xl items-center justify-between px-6 py-4 md:py-6">
        <div className="flex flex-1 items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[320px] bg-white/95 text-foreground">
              <div className="flex h-full flex-col gap-8 p-4">
                <SheetClose asChild>
                  <Link href="/" className="flex items-center">
                    <Logo className="h-6 w-auto" />
                  </Link>
                </SheetClose>
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-muted/50 p-4 text-left text-sm text-muted-foreground">
                  <CalendarClock className="h-5 w-5 text-primary" />
                  <span className="font-medium uppercase tracking-[0.3em] text-primary">Next intake to be announced</span>
                </div>
                <nav className="flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <NavLink key={link.href} href={link.href} mobile>
                      <link.icon className="mr-3 h-5 w-5 text-primary/80" />
                      {link.label}
                    </NavLink>
                  ))}
                </nav>
                <div className="mt-auto space-y-3">
                  <Button asChild variant="outline" className="w-full rounded-full border-border">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild className="w-full rounded-full">
                    <Link href="/signup">Join the waitlist</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center space-x-3">
            <Logo className="h-8 w-auto" />
          </Link>
        </div>

        <nav className="hidden flex-none items-center gap-2 rounded-full border border-border/80 bg-white/80 px-3 py-2 shadow-sm md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2">
          <Button asChild variant="ghost" className="hidden rounded-full px-5 text-muted-foreground hover:text-foreground md:inline-flex">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="rounded-full px-5 shadow-[0_20px_30px_-15px_rgba(99,102,241,0.4)]">
            <Link href="/signup">Join the waitlist</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
