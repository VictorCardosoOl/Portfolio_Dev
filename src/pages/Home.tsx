import { useEffect, useState } from 'react';
import { ScrollTrigger } from '../lib/gsap';

import SmoothScroll from '../components/SmoothScroll';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { ScrollProgressBar } from '../components/ui/ScrollProgressBar';

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

  useEffect(() => {
    const handleLoad = () => {
      document.fonts.ready.then(() => {
        setIsLoaded(true);
        ScrollTrigger.refresh();
      });
    };
    
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <TransitionLayout>
      <main className="w-full min-h-screen bg-[#FFFFFF] text-[#1a1a1a] selection:bg-[#1a1a1a] selection:text-[#FFFFFF] overflow-x-hidden">
        <ScrollProgressBar />
        <SmoothScroll isLocked={!isLoaded} />

        <div className={`transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <ErrorBoundary>
            <HeroPortfolio />
            <Services />
            <Process />
            <AboutMe />
            <Values />
            <FAQSection />
            <Footer />
          </ErrorBoundary>
        </div>
      </main>
    </TransitionLayout>
  );
}
