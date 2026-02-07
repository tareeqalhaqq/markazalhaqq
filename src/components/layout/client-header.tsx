'use client';

import dynamic from 'next/dynamic';

const Header = dynamic(
  () => import('@/components/layout/header').then((mod) => ({ default: mod.Header })),
  { ssr: false }
);

export function ClientHeader() {
  return <Header />;
}
