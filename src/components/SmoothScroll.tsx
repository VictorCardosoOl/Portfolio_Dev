import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { useLocation } from 'react-router-dom';

export default function SmoothScroll() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Inicializa o Lenis apenas uma vez
    const lenis = new Lenis({
      lerp: 0.07, 
      smoothWheel: true,
      syncTouch: true,
      autoRaf: false, // Deixamos o GSAP controlar o requestAnimationFrame
    });

    // Torna o lenis globalmente acessível caso precise pausar em algum momento
    (window as any).lenis = lenis;

    // 2. Sincroniza o ScrollTrigger com o scroll do Lenis
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Integra o Lenis ao Ticker do GSAP (o GSAP v3.12+ passa o tempo em segundos, o Lenis espera ms)
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Limpeza correta ao desmontar a aplicação
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  // 4. Toda vez que a rota mudar, volte o scroll para o topo imediatamente
  useEffect(() => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return null;
}
