'use client';

import * as React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

class ClerkErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('[ClerkProvider] initialization error caught:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export function SafeClerkProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkErrorBoundary fallback={children}>
      <ClerkProvider
        appearance={{
          baseTheme: dark,
          variables: { colorPrimary: '#3b82f6' },
        }}
      >
        {children}
      </ClerkProvider>
    </ClerkErrorBoundary>
  );
}
