'use client';

import HeroSection from "../app/components/hero"
import { useEffect } from 'react';
import AboutSection from '../app/components/about';
import ModernNavbar from '../app/components/nav';
import { NavProvider, useNav } from '../app/context/NavContext';
import InteractiveScrollSection from '../app/components/skills'
import ShowcaseSection from '../app/components/showcase';
import PortfolioGrid from '../app/components/projects';
function MainContent() {
  const { isNavVisible } = useNav();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <main className="min-h-screen">
      <HeroSection />
      {isNavVisible && <ModernNavbar />}
      <AboutSection />
      <ShowcaseSection/>
      <PortfolioGrid/>
      <InteractiveScrollSection/>
     
    </main>
  );
}

export default function Home() {
  return (
    <NavProvider>
      <MainContent />
    </NavProvider>
  );
}
