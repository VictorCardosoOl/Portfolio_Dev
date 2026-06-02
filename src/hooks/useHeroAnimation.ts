import { useLayoutEffect } from 'react';
import { gsap } from '../lib/gsap';

export function useHeroAnimation(
  containerRef: React.RefObject<HTMLElement | null>,
  galleryRef: React.RefObject<HTMLDivElement | null>
) {
  useLayoutEffect(() => {
    const container = containerRef.current;
    const gallery = galleryRef.current;
    if (!container || !gallery) return;

    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const totalScroll = gallery.scrollWidth - window.innerWidth;

        // Movimento lateral limpo
        gsap.to(gallery, {
          x: () => -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1, // Suaviza o scroll horizontal em alta taxa de atualização
            start: "top top",
            end: () => `+=${totalScroll}`,
            invalidateOnRefresh: true,
          }
        });
      });
      
      mm.add("(max-width: 767px)", () => {
        // Sem parallax para manter performance suave em mobile
      });

    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, galleryRef]);
}
