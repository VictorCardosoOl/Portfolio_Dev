import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

import Navbar from '../components/Navbar';
import SmoothScroll from '../components/SmoothScroll';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { NAVIGATION_CONFIG } from '../config/navigation';

import HeroPortfolio from '../components/sections/HeroPortfolio';
import Services from '../components/sections/Services';
import Process from '../components/sections/Process';
import AboutMe from '../components/sections/AboutMe';
import Values from '../components/sections/Values';
import FAQSection from '../components/sections/FAQSection';
import Footer from '../components/sections/Footer';
import TransitionLayout from '../components/TransitionLayout';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleLoad = () => setIsLoaded(true);
    
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    const ctx = gsap.context(() => {
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.1,
        },
      });
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    });
    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <TransitionLayout>
      <main className="w-full min-h-screen bg-[#F4EFE8] text-[#1a1a1a] selection:bg-[#1a1a1a] selection:text-[#F4EFE8]">
        <div
          ref={progressRef}
          className="fixed top-0 left-0 right-0 h-[2px] bg-[#1a1a1a] z-[60] origin-left scale-x-0 pointer-events-none"
        />

        <SmoothScroll isLocked={!isLoaded} />

        <Navbar
          items={NAVIGATION_CONFIG}
          logoText="Victor Cardoso"
        />

        <div className={`transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <ErrorBoundary><HeroPortfolio /></ErrorBoundary>
          <ErrorBoundary><Services /></ErrorBoundary>
          <ErrorBoundary><Process /></ErrorBoundary>
          <ErrorBoundary><AboutMe /></ErrorBoundary>
          <ErrorBoundary><Values /></ErrorBoundary>
          <ErrorBoundary><FAQSection /></ErrorBoundary>
          <ErrorBoundary><Footer /></ErrorBoundary>
        </div>
      </main>
    </TransitionLayout>
  );
}
