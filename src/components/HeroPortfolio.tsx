import { useLayoutEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { projects } from '../data/portfolio';
import type { Project } from '../data/portfolio';
import Image from './ui/Image';
import TextType from './ui/TextType';
import { Button } from './ui/Button';
import ProjectModal from './ProjectModal';

export default function HeroPortfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const getScrollAmount = () => {
        return container.scrollWidth - window.innerWidth;
      };

      gsap.to(container, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[100dvh] bg-cream text-charcoal overflow-hidden"
    >
      {/* HORIZONTAL SCROLL TRACK */}
      <div 
        ref={scrollContainerRef}
        className="flex h-full z-10 relative"
        style={{ width: `${(projects.length + 1) * 100}vw` }}
      >
        
        {/* ========================================================= */}
        {/* 1. HERO SECTION (Width: 100vw)                            */}
        {/* ========================================================= */}
        <div className="w-screen h-full shrink-0 flex flex-col md:flex-row relative bg-cream">
           
           <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center md:items-start px-6 pb-4 pt-24 md:px-12 md:pb-6 md:pt-32 3xl:px-24 3xl:pb-12 3xl:pt-40 z-20 overflow-visible">
              
              {/* PORTFOLIO SVG Graphic */}
              <div className="relative w-full max-w-[180px] sm:max-w-[200px] md:max-w-[230px] lg:max-w-[260px] mx-auto md:mx-0 -mt-10 md:-mt-20 -mb-8 md:-mb-16">
                <div className="w-full text-charcoal">
                  <svg viewBox="-40 0 230 450" className="w-full h-auto fill-current">
                    <defs>
                      <mask id="hole-p">
                        <rect x="-100" y="-100" width="500" height="600" fill="white" />
                        <circle cx="60" cy="30" r="15" fill="black" />
                      </mask>
                      <mask id="hole-o1">
                        <rect x="-100" y="-100" width="500" height="600" fill="white" />
                        <circle cx="145" cy="50" r="20" fill="black" />
                      </mask>
                      <mask id="hole-r">
                        <rect x="-100" y="-100" width="500" height="600" fill="white" />
                        <circle cx="60" cy="140" r="15" fill="black" />
                      </mask>
                      <mask id="hole-o2">
                        <rect x="-100" y="-100" width="500" height="600" fill="white" />
                        <circle cx="145" cy="270" r="20" fill="black" />
                      </mask>
                      <mask id="hole-o3">
                        <rect x="-100" y="-100" width="500" height="600" fill="white" />
                        <ellipse cx="145" cy="360" rx="20" ry="13.5" fill="black" />
                      </mask>
                    </defs>

                    <text x="-95" y="-15" transform="rotate(-90)" fill="currentColor" fontSize="24" fontWeight="bold" letterSpacing="4" fontFamily="sans-serif">2026</text>

                    {/* P */}
                    <path d="M 0,0 L 60,0 A 30,30 0 0,1 60,60 L 30,60 L 30,100 L 0,100 Z" mask="url(#hole-p)" />
                    {/* O 1 */}
                    <circle cx="145" cy="50" r="45" mask="url(#hole-o1)" />
                    {/* R */}
                    <path d="M 0,110 L 60,110 A 30,30 0 0,1 60,170 L 30,170 L 30,210 L 0,210 Z" mask="url(#hole-r)" />
                    <path d="M 30,170 L 60,170 L 90,210 L 60,210 Z" />
                    {/* T */}
                    <path d="M 100,110 L 190,110 L 190,140 L 160,140 L 160,210 L 130,210 L 130,140 L 100,140 Z" />
                    {/* F */}
                    <path d="M 0,220 L 90,220 L 90,250 L 30,250 L 30,265 L 75,265 L 75,290 L 30,290 L 30,320 L 0,320 Z" />
                    {/* O 2 */}
                    <circle cx="145" cy="270" r="45" mask="url(#hole-o2)" />
                    {/* L */}
                    <path d="M 0,330 L 30,330 L 30,400 L 190,400 L 190,430 L 0,430 Z" />
                    {/* I */}
                    <rect x="50" y="330" width="30" height="60" />
                    {/* O 3 */}
                    <ellipse cx="145" cy="360" rx="45" ry="30" mask="url(#hole-o3)" />
                  </svg>
                </div>
              </div>

              {/* Name & Subtitle */}
              <div className="mt-6 md:mt-10 pl-0 w-full max-w-[500px] mx-auto md:mx-0 text-center md:text-left relative z-10">
                <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl 3xl:text-7xl font-serif font-medium tracking-tighter uppercase whitespace-pre-line text-charcoal leading-[1.05]">
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
                <p className="hero-subtitle mt-4 text-sm md:text-base font-medium tracking-widest text-charcoal/60 lowercase">
                  selected works
                </p>
              </div>

           </div>
           
           {/* Right Image Area */}
           <div className="w-full md:w-1/2 h-full flex items-center justify-center p-4 md:p-8 3xl:p-16 z-10 bg-charcoal text-cream relative">
              {/* Fake header to match original right side */}
               <div className="absolute top-6 left-6 md:top-12 md:left-12 flex justify-between w-[calc(100%-3rem)] md:w-[calc(100%-6rem)] text-fluid-label uppercase tracking-widest opacity-80 font-bold shrink-0">
                  <span>Dev &amp; Designer</span>
                  <span className="hidden md:inline">2026</span>
                  <span>01 / 06</span>
               </div>

              <div className="relative w-full max-w-[160px] sm:max-w-[200px] md:max-w-sm 3xl:max-w-lg aspect-[3/4] overflow-visible bg-stone-900 mt-12 md:mt-0">
                 <div className="absolute inset-0 w-[130%] h-full hero-image-parallax">
                    <Image 
                       src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop" 
                       className="w-full h-full object-cover grayscale opacity-90"
                       alt="Estúdio"
                    />
                 </div>
                 <div className="absolute -bottom-6 -left-6 md:-bottom-12 md:-left-12 w-2/3 aspect-square border-4 border-charcoal z-10 shadow-2xl overflow-hidden bg-stone-800">
                    <Image 
                       src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop" 
                       alt="" 
                       className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                 </div>
              </div>
           </div>
        </div>

        {/* ========================================================= */}
        {/* 2. PROJECTS SECTION (Width: N * 100vw)                    */}
        {/* ========================================================= */}
        {projects.map((project, idx) => (
          <div key={idx} className="portfolio-card w-screen h-full shrink-0 relative flex items-center justify-center bg-charcoal text-cream overflow-hidden px-6 md:px-24">
             
             {/* Background Image with GPU Accelerated Overlay Reveal */}
             <div className="portfolio-image-wrapper absolute inset-0 w-full h-full z-0 overflow-hidden">
                <div className="absolute inset-0 w-full h-full">
                  <Image 
                    className="portfolio-image absolute inset-0 w-[130%] h-full object-cover opacity-60 hover:opacity-90 grayscale hover:grayscale-0 transition-all duration-1000" 
                    src={project.image} 
                    alt={project.title}
                  />
                </div>
                <div className="portfolio-reveal-overlay absolute inset-0 w-full h-full bg-charcoal hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 z-[5]" />
             </div>
             
             {/* Text Content */}
             <div className="relative z-10 w-full max-w-[1920px] mx-auto 3xl:px-24 flex flex-col justify-center portfolio-text-reveal">
                 <span className="text-[10px] md:text-xs uppercase tracking-widest text-cream/60 font-bold">
                    0{idx + 1} / Trabalhos
                 </span>
                 <h2 className="text-fluid-h1 font-serif font-bold uppercase leading-none mt-4 md:mt-8 tracking-tighter">
                    {project.title}
                 </h2>
                 <div className="flex flex-col md:flex-row md:items-end justify-between mt-8 md:mt-12 gap-8">
                    <p className="text-fluid-p font-light max-w-md text-cream/90">
                       {project.description}
                    </p>
                    <Button 
                       variant="whiteOutline" 
                       className="rounded-full px-8 py-6 text-xs lowercase"
                       onClick={() => setSelectedProject(project)}
                    >
                       view project
                    </Button>
                 </div>
             </div>

          </div>
        ))}

      </div>

      <ProjectModal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        project={selectedProject} 
      />

    </section>
  );
}
