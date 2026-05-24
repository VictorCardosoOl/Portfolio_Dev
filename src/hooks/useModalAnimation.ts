import { useEffect } from 'react';
import { gsap } from '../lib/gsap';

export function useModalAnimation(
  isOpen: boolean, 
  wrapperRef: React.RefObject<HTMLDivElement | null>, 
  overlayRef: React.RefObject<HTMLDivElement | null>,
  modalOuterRef: React.RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Tentativa segura de pausar o lenis global se existir
      if (window && (window as any).lenis) {
        (window as any).lenis.stop();
      }
      
      if (wrapperRef.current) gsap.set(wrapperRef.current, { display: 'block' });
      if (overlayRef.current) gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.4 });
      if (modalOuterRef.current) gsap.fromTo(modalOuterRef.current, { y: '100%' }, { y: '2%', duration: 0.8, ease: 'expo.out' });
      
    } else {
      if (wrapperRef.current) {
        if (overlayRef.current) gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.4 });
        if (modalOuterRef.current) {
          gsap.to(modalOuterRef.current, {
            y: '100%', duration: 0.5, ease: 'expo.in',
            onComplete: () => {
              if (wrapperRef.current) gsap.set(wrapperRef.current, { display: 'none' });
            },
          });
        }
      }
      document.body.style.overflow = '';
      if (window && (window as any).lenis) {
        (window as any).lenis.start();
      }
    }
    
    return () => { 
      document.body.style.overflow = ''; 
    };
  }, [isOpen, wrapperRef, overlayRef, modalOuterRef]);
}
