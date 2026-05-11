import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use GSAP quickTo for performance
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if hovering an image/carousel card specifically
      const isCardHover = target.closest('.portfolio-card') || target.closest('img');
      if (isCardHover) {
        setIsHoveringImage(true);
        setIsHovering(false);
        return;
      }
      
      // Check if hovering interactive elements
      const isInteractive = target.tagName.toLowerCase() === 'a' || 
                            target.tagName.toLowerCase() === 'button' || 
                            target.closest('a') || 
                            target.closest('button');
                            
      if (isInteractive) {
        setIsHovering(true);
        setIsHoveringImage(false);
      } else {
        setIsHovering(false);
        setIsHoveringImage(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    // Initial scale animation
    gsap.set(cursor, { scale: 0, xPercent: -50, yPercent: -50 });
    gsap.to(cursor, { scale: 1, duration: 0.5, ease: "back.out(1.7)" });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Animate cursor state changes
  useEffect(() => {
    if (!cursorRef.current) return;
    
    if (isHoveringImage) {
      gsap.to(cursorRef.current, {
        width: 80,
        height: 80,
        backgroundColor: "rgba(255,255,255,1)",
        mixBlendMode: "difference",
        duration: 0.3,
        ease: "power2.out"
      });
    } else if (isHovering) {
      gsap.to(cursorRef.current, {
        width: 40,
        height: 40,
        backgroundColor: "rgba(255,255,255,1)",
        mixBlendMode: "difference",
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(cursorRef.current, {
        width: 12,
        height: 12,
        backgroundColor: "rgba(255,255,255,1)",
        mixBlendMode: "difference",
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [isHovering, isHoveringImage]);

  return (
    <div 
      ref={cursorRef}
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center overflow-hidden"
      style={{ mixBlendMode: 'difference' }}
    >
      <span className={`text-black text-[10px] font-bold tracking-widest uppercase transition-opacity duration-300 ${isHoveringImage ? 'opacity-100' : 'opacity-0'}`}>
        View
      </span>
    </div>
  );
}
