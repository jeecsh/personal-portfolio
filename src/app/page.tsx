'use client';

import HeroSection from  "../app/components/hero"
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <main className="min-h-screen">
      <HeroSection />
      

    </main>
  );
}