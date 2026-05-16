import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import { projects } from '../../data/portfolio';
import Image from '../ui/Image';
import TextType from '../ui/TextType';
import { Link } from 'react-router-dom';
import { MagneticButton } from '../ui/MagneticButton';

export default function HeroPortfolio() {
  const containerRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const gallery = galleryRef.current;
      if (!gallery) return;

      const totalScroll = gallery.scrollWidth - window.innerWidth;

      // Movimento lateral limpo
      const lateralScroll = gsap.to(gallery, {
        x: () => -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: true, 
          start: "top top",
          end: () => `+=${totalScroll}`,
          invalidateOnRefresh: true,
        }
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
              containerAnimation: lateralScroll, 
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
    <section ref={containerRef} className="relative w-full h-[100dvh] overflow-hidden">
      
      {/* Container Flexível que ultrapassa os 100vw */}
      <div ref={galleryRef} className="flex h-full w-max">
        
        {/* 1. HERO SECTION */}
        <div className="w-[100vw] h-full flex flex-col justify-center px-12 z-10 shrink-0 relative">
           <h1 className="text-4xl sm:text-5xl md:text-6xl 3xl:text-7xl font-serif font-medium tracking-tighter uppercase whitespace-pre-line text-[#1a1a1a] leading-[1.05]">
             <TextType text={["Victor\nCardoso"]} typingSpeed={100} showCursor={true} cursorCharacter="_" />
           </h1>
           <p className="mt-4 text-[11px] md:text-xs font-bold tracking-[0.25em] text-[#1a1a1a]/50 uppercase">
             selected works
           </p>
        </div>

        {/* 2. PROJETOS LADO A LADO */}
        {projects.map((project, j) => (
          <Link 
            to={`/case/${project.id}`} 
            key={project.id} 
            className="w-[80vw] md:w-[60vw] h-full flex flex-col justify-center px-8 shrink-0 group/card block cursor-pointer text-left focus:outline-none"
          >
             {/* Máscara de imagem para o Parallax */}
             <div className="w-full h-[65vh] overflow-hidden relative group rounded-sm">
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  className="project-image w-full h-full object-cover scale-[1.05] origin-center" 
                />
                {/* Overlay Elegante Escurecendo no Hover */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />
                
                {/* Botão Magnético Centralizado */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <MagneticButton>
                    <span className="px-8 py-4 bg-[#F4EFE8] text-[#1a1a1a] rounded-full text-[10px] font-bold tracking-widest uppercase shadow-2xl inline-block pointer-events-none">
                      View Case
                    </span>
                  </MagneticButton>
                </div>
             </div>
             
             {/* Metadados do Projeto */}
             <div className="flex justify-between items-center mt-6 text-[#1a1a1a] w-full">
               <h2 className="text-3xl font-serif tracking-tight group-hover/card:opacity-70 transition-opacity">{project.title}</h2>
               <span className="text-[10px] uppercase tracking-widest opacity-60">0{j + 1}</span>
             </div>
          </Link>
        ))}
        
        {/* Espaço em branco no final para respiro */}
        <div className="w-[20vw] h-full shrink-0" />
      </div>
    </section>
  );
}
