import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from './lib/gsap';

import Navbar from './components/Navbar';
import SmoothScroll from './components/SmoothScroll';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NAVIGATION_CONFIG } from './config/navigation';

import HeroPortfolio from './components/HeroPortfolio';
import Services from './components/Services';
import Process from './components/Process';
import AboutMe from './components/AboutMe';
import Values from './components/Values';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import CustomCursor from './components/ui/CustomCursor';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  // Marca como carregado quando todo o conteúdo (inclusive imagens) terminar o load
  useEffect(() => {
    const handleLoad = () => setIsLoaded(true);
    
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  // Progress bar GSAP — só inicia quando o conteúdo estiver visível
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
    <main className="w-full min-h-screen bg-cream text-charcoal selection:bg-charcoal selection:text-cream cursor-none">
      <CustomCursor />
      
      {/* Wayfinding: Progress Bar */}
      <div
        ref={progressRef}
        className="fixed top-0 left-0 right-0 h-[2px] bg-charcoal z-[60] origin-left scale-x-0 pointer-events-none"
      />

      <SmoothScroll isLocked={!isLoaded} />

      <Navbar
        items={NAVIGATION_CONFIG}
        logoText="Victor Cardoso"
      />

      {/* Conteúdo principal — cada seção tem seu próprio ErrorBoundary para isolar falhas */}
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
  );
}
