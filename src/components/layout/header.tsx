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
        'transition-colors font-medium',
        mobile
          ? 'flex items-center text-lg p-2 rounded-md hover:bg-accent/10'
          : 'px-3 py-2 text-sm hover:text-primary',
        isActive ? 'text-primary' : 'text-foreground/70'
      )}
    >
      {children}
    </Link>
  );

  return mobile ? <SheetClose asChild>{linkContent}</SheetClose> : linkContent;
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        {/* Left Section */}
        <div className="flex flex-1 justify-start">
          <div className="mr-4 flex items-center md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="p-4">
                  <SheetClose asChild>
                    <Link href="/" className="mb-8 flex items-center">
                      <Logo className="h-6 w-auto" />
                    </Link>
                  </SheetClose>
                  <nav className="flex flex-col gap-3">
                    {navLinks.map((link) => (
                      <NavLink key={link.href} href={link.href} mobile>
                        <link.icon className="mr-3 h-5 w-5 text-primary/80" />
                        {link.label}
                      </NavLink>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <Link href="/" className="flex items-center space-x-2">
            <Logo className="h-6 w-auto" />
          </Link>
        </div>

        {/* Center Section (Desktop) */}
        <nav className="hidden flex-none justify-center md:flex md:gap-2">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>))}
        </nav>

        {/* Right Section */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
