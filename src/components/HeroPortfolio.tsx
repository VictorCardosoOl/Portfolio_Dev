import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { projects } from '../data/portfolio';
import Image from './ui/Image';
import TextType from './ui/TextType';

export default function HeroPortfolio() {
  const containerRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const gallery = galleryRef.current;
      if (!gallery) return;

      // Movimento lateral limpo em vez de envelopes empilhados
      gsap.to(gallery, {
        x: () => -(gallery.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: true, // lag do scrub off para telas 120Hz
          start: "top top",
          end: () => `+=${gallery.scrollWidth}`,
          invalidateOnRefresh: true,
        },
        id: "lateral-scroll"
      });

      // Parallax sutil nas imagens para sofisticação
      gsap.utils.toArray('.project-image').forEach((img: any) => {
        gsap.fromTo(img, 
          { x: "-10vw" }, 
          {
            x: "10vw",
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              containerAnimation: gsap.getById("lateral-scroll"), // Link com a animação acima
              start: "left right",
              end: "right left",
              scrub: true,
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[100dvh] bg-[#F4EFE8] overflow-hidden">
      
      {/* Container Flexível que ultrapassa os 100vw */}
      <div ref={galleryRef} className="flex h-full w-max">
        
        {/* 1. HERO SECTION (Fica como o primeiro item da fila) */}
        <div className="w-[100vw] h-full flex flex-col justify-center px-12 z-10 shrink-0 relative">
           <h1 className="text-4xl sm:text-5xl md:text-6xl 3xl:text-7xl font-serif font-medium tracking-tighter uppercase whitespace-pre-line text-[#1a1a1a] leading-[1.05]">
             <TextType text={["Victor\nCardoso"]} typingSpeed={100} showCursor={true} cursorCharacter="_" />
           </h1>
           <p className="mt-4 text-xs font-bold tracking-[0.25em] text-[#1a1a1a]/50 uppercase">
             selected works
           </p>
        </div>

        {/* 2. PROJETOS LADO A LADO (Adeus Envelopes) */}
        {projects.map((project, j) => (
          <div key={project.id} className="w-[80vw] md:w-[60vw] h-full flex flex-col justify-center px-8 shrink-0">
             {/* Máscara de imagem para o Parallax */}
             <div className="w-full h-[65vh] overflow-hidden relative group rounded-sm">
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  className="project-image w-full h-full object-cover scale-[1.05] origin-center" 
                />
                {/* Overlay Elegante */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500" />
             </div>
             
             {/* Metadados do Projeto */}
             <div className="flex justify-between items-center mt-6 text-[#1a1a1a]">
               <h2 className="text-3xl font-serif tracking-tight">{project.title}</h2>
               <span className="text-[10px] uppercase tracking-widest opacity-60">0{j + 1}</span>
             </div>
          </div>
        ))}
        
        {/* Espaço em branco no final para respiro */}
        <div className="w-[20vw] h-full shrink-0" />
      </div>
    </section>
  );
}
