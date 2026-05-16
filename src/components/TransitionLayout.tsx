import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

export default function TransitionLayout({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Cortina sai subindo
      gsap.to(overlayRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
      });

      // Conteúdo faz fade in subindo levemente
      gsap.fromTo(containerRef.current, 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2, clearProps: "transform" }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div 
        ref={overlayRef} 
        className="fixed inset-0 bg-[#1a1a1a] z-[999] pointer-events-none"
      />
      <div ref={containerRef} className="w-full min-h-screen">
        {children}
      </div>
    </>
  );
}
