'use client';

import { Suspense, lazy } from 'react';
import HeroParallax from '@/components/home/HeroParallax';

// Lazy load heavy components
const Features = lazy(() => import('@/components/home/Features'));
const ProcessParallax = lazy(() => import('@/components/home/ProcessParallax'));
const ParallaxStats = lazy(() => import('@/components/home/ParallaxStats'));

// Loading fallback component
function SectionLoader() {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero loads immediately */}
      <HeroParallax />
      
      {/* Heavy sections load on demand */}
      <Suspense fallback={<SectionLoader />}>
        <Features />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <ProcessParallax />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <ParallaxStats />
      </Suspense>
    </div>
  );
}

