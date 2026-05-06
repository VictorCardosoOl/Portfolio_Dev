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
           
           <div className="w-full md:w-1/2 h-full flex flex-col justify-between px-6 pb-4 pt-24 md:px-12 md:pb-6 md:pt-32 3xl:px-24 3xl:pb-12 3xl:pt-40 z-20">
              <header className="shrink-0 relative z-10">
                 <h1 
                   ref={titleRef}
                   className="text-fluid-h1 font-serif font-medium tracking-tighter uppercase min-h-[160px] md:min-h-[180px] lg:min-h-[240px]"
                 >
                    <TextType 
                      text={["Victor Cardoso"]}
                      typingSpeed={100}
                      initialDelay={1000}
                      loop={false}
                      showCursor={true}
                      cursorCharacter="_"
                      cursorBlinkDuration={0.4}
                    />
                 </h1>
                  <p className="hero-subtitle mt-4 md:mt-6 text-fluid-p font-sans font-light tracking-wide text-charcoal/70 max-w-sm">
                     Crio experiências digitais que unem estética impecável e engenharia de ponta.
                  </p>
              </header>
              
              <nav className="w-full max-w-md 3xl:max-w-xl mt-auto shrink-0" aria-label="Main Navigation">
                 <ul className="text-fluid-label font-medium tracking-wide">
                    {[
                       { name: 'Trabalhos', link: '#portfolio', page: '02' },
                       { name: 'Serviços', link: '#services', page: '03' },
                       { name: 'Quem Somos', link: '#aboutme', page: '04' },
                       { name: 'Valores', link: '#values', page: '05' },
                       { name: 'Contato', link: '#contact', page: '06' },
                    ].map((item, i) => (
                       <li key={i} className="border-b border-charcoal/20 last:border-0">
                          <a href={item.link} className="flex justify-between py-1 md:py-1.5 hover:opacity-60 transition-opacity focus-visible:ring-2 focus-visible:ring-charcoal focus-visible:ring-offset-2 focus-visible:ring-offset-cream outline-none rounded-sm">
                             <span>{item.name}</span>
                             <span>{item.page}</span>
                          </a>
                       </li>
                    ))}
                 </ul>
              </nav>
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
