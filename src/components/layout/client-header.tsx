'use client';

import dynamic from 'next/dynamic';
import * as React from 'react';

import { Logo } from '@/components/logo';

const Header = dynamic(
  () => import('@/components/layout/header').then((mod) => ({ default: mod.Header })),
  { ssr: false }
);

function FallbackHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/">
          <Logo />
        </a>
      </div>
    </header>
  );
}

class HeaderErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('[ClientHeader] render error caught:', error);
  }

  render() {
    if (this.state.hasError) {
      return <FallbackHeader />;
    }
    return this.props.children;
  }
}

export function ClientHeader() {
  return (
    <HeaderErrorBoundary>
      <Header />
    </HeaderErrorBoundary>
  );
}
