import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from './ui/Image';
import TextType from './ui/TextType';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-subtitle", {
        y: 20,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.5
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={containerRef} className="min-h-[100dvh] w-full grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 overflow-hidden">
      <div className="bg-cream px-6 pb-6 pt-24 md:px-12 md:pb-8 md:pt-32 3xl:px-24 3xl:pt-40 flex flex-col justify-center items-center md:items-start min-h-[50dvh] md:min-h-full relative">
        <div className="flex flex-col items-start w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[320px] mx-auto md:mx-0">
          
          {/* PORTFOLIO Graphic */}
          <div className="w-full text-[#E32626]">
            <svg viewBox="-40 0 228 384" className="w-full h-auto fill-current">
              <defs>
                <mask id="hole-p">
                  <rect x="-100" y="-100" width="500" height="500" fill="white" />
                  <circle cx="61" cy="29" r="14" fill="black" />
                </mask>
                <mask id="hole-o1">
                  <rect x="-100" y="-100" width="500" height="500" fill="white" />
                  <circle cx="143" cy="45" r="22" fill="black" />
                </mask>
                <mask id="hole-r">
                  <rect x="-100" y="-100" width="500" height="500" fill="white" />
                  <circle cx="61" cy="125" r="14" fill="black" />
                </mask>
                <mask id="hole-o2">
                  <rect x="-100" y="-100" width="500" height="500" fill="white" />
                  <circle cx="143" cy="241" r="22" fill="black" />
                </mask>
                <mask id="hole-o3">
                  <rect x="-100" y="-100" width="500" height="500" fill="white" />
                  <circle cx="143" cy="320" r="14" fill="black" />
                </mask>
              </defs>

              <text x="-90" y="-15" transform="rotate(-90)" fill="currentColor" fontSize="24" fontWeight="bold" letterSpacing="4" fontFamily="sans-serif">2026</text>

              {/* P */}
              <path d="M 0,0 L 90,0 L 90,58 L 32,58 L 32,90 L 0,90 Z" mask="url(#hole-p)" />
              {/* O 1 */}
              <rect x="98" y="0" width="90" height="90" mask="url(#hole-o1)" />
              {/* R */}
              <path d="M 0,98 L 90,98 L 90,152 L 65,152 L 90,188 L 50,188 L 32,152 L 32,188 L 0,188 Z" mask="url(#hole-r)" />
              {/* T */}
              <path d="M 98,98 L 188,98 L 188,130 L 158,130 L 158,188 L 128,188 L 128,130 L 98,130 Z" />
              {/* F */}
              <path d="M 0,196 L 90,196 L 90,228 L 32,228 L 32,242 L 70,242 L 70,268 L 32,268 L 32,286 L 0,286 Z" />
              {/* O 2 */}
              <rect x="98" y="196" width="90" height="90" mask="url(#hole-o2)" />
              {/* L */}
              <path d="M 0,294 L 32,294 L 32,354 L 188,354 L 188,384 L 0,384 Z" />
              {/* I */}
              <rect x="40" y="294" width="50" height="52" />
              {/* O 3 */}
              <rect x="98" y="294" width="90" height="52" mask="url(#hole-o3)" />
            </svg>
          </div>

          {/* Name & Subtitle */}
          <div className="mt-6 md:mt-8 pl-[17.5%] w-max relative z-10 min-h-[120px]">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium tracking-tighter uppercase whitespace-pre-line text-charcoal leading-[1.1]">
              <TextType 
                text={["Victor\nCardoso"]}
                typingSpeed={100}
                initialDelay={1000}
                loop={false}
                showCursor={true}
                cursorCharacter="_"
                cursorBlinkDuration={0.4}
              />
            </h1>
            <p className="hero-subtitle mt-2 text-sm md:text-base font-medium tracking-wider text-charcoal/60 lowercase">
              selected works
            </p>
          </div>

        </div>
      </div>

      <div className="bg-charcoal text-cream px-6 pb-6 pt-6 md:px-12 md:pb-8 md:pt-32 3xl:px-24 3xl:pt-40 flex flex-col min-h-[50dvh] md:min-h-full relative">
        <div className="flex justify-between text-fluid-label uppercase tracking-widest opacity-80 font-bold shrink-0">
          <span>Estúdio de Design</span>
          <span className="hidden md:inline">2026</span>
          <span>01 / 06</span>
        </div>
        
        <div className="flex-grow flex items-center justify-center p-4 md:p-8 3xl:p-16 min-h-0">
          <div className="relative w-full max-w-[160px] sm:max-w-[200px] md:max-w-sm 3xl:max-w-lg aspect-[3/4] overflow-visible bg-stone-900">
            <Image 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop" 
              alt="Minimalist Architecture" 
              className="hero-image-main w-full h-full object-cover scale-110 grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute -bottom-6 -left-6 md:-bottom-12 md:-left-12 w-2/3 aspect-square border-4 border-charcoal z-10 shadow-2xl overflow-hidden bg-stone-800">
              <Image 
                src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop" 
                alt="" 
                className="hero-image-sub w-full h-full object-cover scale-110 grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
