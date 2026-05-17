import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';

export function ScrollProgressBar() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={progressRef}
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#1a1a1a] z-[60] origin-left scale-x-0 pointer-events-none"
    />
  );
}
