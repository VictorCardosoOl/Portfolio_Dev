import { useEffect, useState } from 'react';
import { ScrollTrigger } from '../lib/gsap';

import { ScrollProgressBar } from '../components/ui/ScrollProgressBar';

import HeroPortfolio from '../components/sections/HeroPortfolio';
import Services from '../components/sections/Services';
import Process from '../components/sections/Process';
import AboutMe from '../components/sections/AboutMe';
import Values from '../components/sections/Values';
import FAQSection from '../components/sections/FAQSection';
import Footer from '../components/sections/Footer';
import TransitionLayout from '../components/TransitionLayout';

import { Preloader } from '../components/ui/Preloader';

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    if (!showPreloader) {
      ScrollTrigger.refresh();
    }
    
    // Controla o travamento do scroll global através da instância unificada do Lenis
    const lenis = (window as any).lenis;
    if (lenis) {
      showPreloader ? lenis.stop() : lenis.start();
    }
  }, [showPreloader]);

  return (
    <TransitionLayout>
      <title>Victor Cardoso | Frontend Dev & Designer UI</title>
      <meta name="description" content="Portfólio de Victor Cardoso - Engenheiro de Software focado em UI/UX e Web Performance." />
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
      <main className="w-full min-h-screen bg-[#FFFFFF] text-[#1a1a1a] selection:bg-[#1a1a1a] selection:text-[#FFFFFF] overflow-x-hidden">
        <ScrollProgressBar />

        <div className="w-full">
          <HeroPortfolio />
          <Services />
          <Process />
          <AboutMe />
          <Values />
          <FAQSection />
          <Footer />
        </div>
      </main>
    </TransitionLayout>
  );
}
