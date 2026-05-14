import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { projects } from '../data/portfolio';
import type { Project } from '../data/portfolio';
import Image from './ui/Image';
import TextType from './ui/TextType';
import { Button } from './ui/Button';
import ProjectModal from './ProjectModal';

const bgColors = ['bg-[#B4C5D5]', 'bg-[#C6A4B3]', 'bg-[#8D9F8E]'];
const N = 3;

export default function HeroPortfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  const selectedProjects = projects.slice(0, N);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // Helper function to get exact X positions for the accordion
      const getPositions = (state: number) => {
        const isMobile = window.innerWidth < 768;
        const thinStrip = 6; // 6vw para as tiras laterais
        let heroX = "0vw";
        let pX: string[] = [];

        if (isMobile) {
          if (state === 0) {
            heroX = "0vw";
            pX = ["100vw", "100vw", "100vw"];
          } else {
            heroX = "-100vw";
            const activeIndex = state - 1;
            for (let i = 0; i < N; i++) {
              if (i < activeIndex) pX[i] = "0vw"; // Fica escondido embaixo do ativo
              else if (i === activeIndex) pX[i] = "0vw";
              else pX[i] = "100vw"; // Fora da tela à direita
            }
          }
        } else {
          // Desktop Accordion
          if (state === 0) {
            heroX = "0vw";
            for (let i = 0; i < N; i++) {
              pX[i] = `${50 + i * (50 / N)}vw`; // 50vw, 66.6vw, 83.3vw
            }
          } else {
            heroX = "-50vw";
            const activeIndex = state - 1;
            for (let i = 0; i < N; i++) {
              if (i < activeIndex) {
                pX[i] = `${i * thinStrip}vw`;
              } else if (i === activeIndex) {
                pX[i] = `${i * thinStrip}vw`;
              } else {
                pX[i] = `${100 - (N - i) * thinStrip}vw`;
              }
            }
          }
        }
        return { heroX, pX };
      };

      // 1. Initial State
      const pos0 = getPositions(0);
      gsap.set(heroRef.current, { x: pos0.heroX });
      selectedProjects.forEach((_, j) => {
        gsap.set(panelRefs.current[j], { x: pos0.pX[j] });
        gsap.set(imageRefs.current[j], { scale: 1.4 }); // High parallax scale initially
        gsap.set(textRefs.current[j], { opacity: 0, y: 50 });
      });

      // 2. GSAP Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1.2, // Um pouco de inércia suave
          start: "top top",
          end: `+=${N * 1000}`,
          invalidateOnRefresh: true,
        }
      });

      for (let step = 1; step <= N; step++) {
        const label = `step${step}`;
        tl.addLabel(label, step - 1);
        
        tl.to(heroRef.current, { 
          x: () => getPositions(step).heroX, 
          ease: "power2.inOut" 
        }, label);

        const activeIndex = step - 1;
        for (let j = 0; j < N; j++) {
          tl.to(panelRefs.current[j], { 
            x: () => getPositions(step).pX[j],
            ease: "power2.inOut" 
          }, label);

          if (j === activeIndex) {
            tl.to(imageRefs.current[j], { scale: 1, ease: "power2.out" }, label);
            tl.to(textRefs.current[j], { opacity: 1, y: 0, ease: "power2.out" }, label);
          } else if (j === activeIndex - 1) {
            tl.to(imageRefs.current[j], { scale: 1.15, ease: "power2.inOut" }, label);
            tl.to(textRefs.current[j], { opacity: 0, y: -20, ease: "power2.inOut" }, label);
          }
        }
      }

    }, containerRef);

    return () => ctx.revert();
  }, [selectedProjects]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[100dvh] bg-[#F4EFE8] overflow-hidden"
    >
      {/* 1. HERO SECTION */}
      <div 
        ref={heroRef}
        className="absolute top-0 left-0 w-[100vw] md:w-[50vw] h-full flex flex-col justify-center items-center md:items-start px-6 pt-24 md:px-12 md:pt-32 z-10 bg-[#F4EFE8]"
      >
        <div className="relative w-full max-w-[180px] sm:max-w-[200px] md:max-w-[240px] mx-auto md:mx-0 md:-ml-6 -mt-10 md:-mt-20 -mb-8 md:-mb-14">
          <div className="w-full text-[#1a1a1a]">
            <svg viewBox="-40 0 230 450" className="w-full h-auto fill-current">
              <defs>
                <mask id="hole-p"><rect x="-100" y="-100" width="500" height="600" fill="white" /><circle cx="60" cy="30" r="15" fill="black" /></mask>
                <mask id="hole-o1"><rect x="-100" y="-100" width="500" height="600" fill="white" /><circle cx="145" cy="50" r="20" fill="black" /></mask>
                <mask id="hole-r"><rect x="-100" y="-100" width="500" height="600" fill="white" /><circle cx="60" cy="140" r="15" fill="black" /></mask>
                <mask id="hole-o2"><rect x="-100" y="-100" width="500" height="600" fill="white" /><circle cx="145" cy="270" r="20" fill="black" /></mask>
                <mask id="hole-o3"><rect x="-100" y="-100" width="500" height="600" fill="white" /><ellipse cx="145" cy="360" rx="20" ry="13.5" fill="black" /></mask>
              </defs>
              <text x="-95" y="-15" transform="rotate(-90)" fill="currentColor" fontSize="24" fontWeight="bold" letterSpacing="4" fontFamily="sans-serif">2026</text>
              <path d="M 0,0 L 60,0 A 30,30 0 0,1 60,60 L 30,60 L 30,100 L 0,100 Z" mask="url(#hole-p)" />
              <circle cx="145" cy="50" r="45" mask="url(#hole-o1)" />
              <path d="M 0,110 L 60,110 A 30,30 0 0,1 60,170 L 30,170 L 30,210 L 0,210 Z" mask="url(#hole-r)" />
              <path d="M 30,170 L 60,170 L 90,210 L 60,210 Z" />
              <path d="M 100,110 L 190,110 L 190,140 L 160,140 L 160,210 L 130,210 L 130,140 L 100,140 Z" />
              <path d="M 0,220 L 90,220 L 90,250 L 30,250 L 30,265 L 75,265 L 75,290 L 30,290 L 30,320 L 0,320 Z" />
              <circle cx="145" cy="270" r="45" mask="url(#hole-o2)" />
              <path d="M 0,330 L 30,330 L 30,400 L 190,400 L 190,430 L 0,430 Z" />
              <rect x="50" y="330" width="30" height="60" />
              <ellipse cx="145" cy="360" rx="45" ry="30" mask="url(#hole-o3)" />
            </svg>
          </div>
        </div>

        <div className="mt-6 md:mt-10 w-full max-w-[500px] text-center md:text-left z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl 3xl:text-7xl font-serif font-medium tracking-tighter uppercase whitespace-pre-line text-[#1a1a1a] leading-[1.05]">
            <TextType text={["Victor\nCardoso"]} typingSpeed={100} initialDelay={1000} loop={false} showCursor={true} cursorCharacter="_" cursorBlinkDuration={0.4} />
          </h1>
          <p className="mt-4 text-[11px] md:text-xs font-bold tracking-[0.25em] text-[#1a1a1a]/50 uppercase">
            selected works
          </p>
        </div>
      </div>

      {/* 2. ACCORDION PANELS */}
      {selectedProjects.map((project, j) => {
        // Empilhamento Z-Index: 20, 30, 40 (Painel 2 cobre o 1, que cobre o 0)
        const zIndex = (j + 2) * 10;
        
        return (
          <div 
            key={project.id}
            ref={el => panelRefs.current[j] = el}
            className={`absolute top-0 left-0 w-[100vw] h-full ${bgColors[j] || 'bg-stone-300'} flex flex-col overflow-hidden shadow-[-20px_0_40px_rgba(0,0,0,0.15)]`}
            style={{ zIndex, willChange: 'transform' }}
          >
            {/* Top Image Area */}
            <div className="w-full h-[60vh] md:h-[65vh] relative overflow-hidden bg-[#1a1a1a]">
              <div ref={el => imageRefs.current[j] = el} className="w-full h-full origin-center">
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover opacity-90" 
                />
              </div>
            </div>
            
            {/* Bottom Content Area */}
            <div className="w-full h-[40vh] md:h-[35vh] flex flex-col justify-between p-6 md:p-12 relative text-[#1a1a1a]">
              <div className="flex justify-between w-full text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em]">
                <div className="flex gap-4 md:gap-10 items-center">
                  <span className="border border-[#1a1a1a]/30 rounded-full px-4 py-1.5 bg-white/20 backdrop-blur-sm">{project.year}</span>
                  <span className="opacity-70">{project.category}</span>
                </div>
                <span className="hidden lg:block max-w-[240px] text-right opacity-70 leading-relaxed font-normal tracking-wide">
                  {project.fullDescription.slice(0, 75)}...
                </span>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div ref={el => textRefs.current[j] = el} className="translate-y-8">
                  <h2 className="text-[14vw] md:text-[10vw] leading-none tracking-tighter font-serif whitespace-nowrap mt-4 text-[#1a1a1a]">
                    {project.title}
                  </h2>
                </div>
              </div>

              <div className="flex justify-between items-end w-full relative z-10">
                <div className="text-[11px] font-bold tracking-[0.25em] opacity-50">
                  0{j + 1}
                </div>
                <Button 
                   variant="default" 
                   className="rounded-full w-14 h-14 md:w-20 md:h-20 flex items-center justify-center p-0 hover:scale-105 active:scale-95 transition-transform pointer-events-auto shadow-lg"
                   onClick={() => setSelectedProject(project)}
                >
                   <span className="sr-only">View Project</span>
                   <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                   </svg>
                </Button>
              </div>
            </div>
          </div>
        );
      })}

      <ProjectModal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} project={selectedProject} />
    </section>
  );
}
