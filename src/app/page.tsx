'use client';

import { Suspense } from 'react';
import SolarSystemSimulation from '@/components/solar-system/SolarSystemSimulation';
import LoadingScreen from '@/components/ui/LoadingScreen';

export default function Home() {
  return (
    <main className="w-full h-screen overflow-hidden">
      <Suspense fallback={<LoadingScreen />}>
        <SolarSystemSimulation />
      </Suspense>
    </main>
  );
}