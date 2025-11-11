'use client';

import Link from 'next/link';
import { Menu, BookOpen, Users, DollarSign, HelpCircle, GraduationCap } from 'lucide-react';
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
          ? 'flex items-center rounded-md p-2 text-lg hover:bg-secondary/30'
          : 'rounded-full px-4 py-2 text-[0.7rem] uppercase tracking-[0.32em] hover:bg-secondary/30 backdrop-blur',
        isActive ? 'text-primary' : 'text-foreground/70 hover:text-primary'
      )}
    >
      {children}
    </Link>
  );

  return mobile ? <SheetClose asChild>{linkContent}</SheetClose> : linkContent;
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b from-background/95 via-background/85 to-background/30" aria-hidden />
      <div className="absolute inset-0 -z-20 calligraphy-overlay" aria-hidden />
      <div className="container mx-auto flex max-w-screen-xl items-center justify-between px-6 py-5 md:py-7">
        <div className="flex flex-1 items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-background/95 text-foreground">
              <div className="flex h-full flex-col gap-8 p-4">
                <SheetClose asChild>
                  <Link href="/" className="flex items-center">
                    <Logo className="h-6 w-auto" />
                  </Link>
                </SheetClose>
                <div className="rounded-2xl border border-border/50 bg-card/80 p-4 text-sm font-medium uppercase tracking-[0.3em] text-primary">
                  Admissions Open
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
                  <Button asChild variant="ghost" className="w-full">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/signup">Join now</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center space-x-3">
            <Logo className="h-7 w-auto" />
          </Link>
        </div>

        <nav className="hidden flex-none items-center gap-3 rounded-full border border-border/70 bg-card/70 px-5 py-3 shadow-[0_18px_40px_-28px] shadow-black/40 backdrop-blur md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2">
          <div className="hidden rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-primary md:inline-flex">
            Admissions Open
          </div>
          <Button asChild variant="ghost" className="hidden rounded-full border border-transparent px-5 text-foreground md:inline-flex">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="rounded-full px-5">
            <Link href="/signup">Join now</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
