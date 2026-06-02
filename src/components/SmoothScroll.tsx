import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { useLocation } from 'react-router-dom';

export default function SmoothScroll({ isLocked = false }: { isLocked?: boolean }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.07, // Menor lerp = rolagem mais suave e amortecida
      smoothWheel: true,
      syncTouch: true,
      autoRaf: false, // Impede atualizações duplicadas fora do ticker
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    isLocked ? lenis.stop() : lenis.start();

    // Garante que a página inicie no topo e redimensione ao mudar de rota
    lenis.scrollTo(0, { immediate: true });
    setTimeout(() => {
      lenis.resize();
    }, 50);

    // Sincroniza Lenis e ScrollTrigger no mesmo tick do GSAP para evitar lag visual
    const updateLenis = () => {
      lenis.raf(performance.now());
      ScrollTrigger.update();
    };

    gsap.ticker.add(updateLenis);
    
    // Desativa lagSmoothing para evitar delay na sincronização
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, [prefersReducedMotion, isLocked, location.pathname]);

  return null;
}

