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

      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
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

        // Parallax interno nas imagens removido para evitar barras cinzas laterais/verticais
        // e manter um visual minimalista e elegante (a imagem agora é fixa no card).
      });
      
      // Ajustes mobile
      mm.add("(max-width: 767px)", () => {
         // Nenhuma animação parallax interna na imagem para mobile para manter a consistência limpa
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full md:h-[100dvh] md:overflow-hidden pb-32 md:pb-0">
      
      {/* Container Flexível que ultrapassa os 100vw no desktop */}
      <div ref={galleryRef} className="flex flex-col md:flex-row md:h-full w-full md:w-max">
        
        {/* 1. HERO SECTION */}
        <div className="w-full md:w-[100vw] min-h-[60vh] md:h-full flex flex-col justify-center px-6 md:px-12 z-10 shrink-0 relative mt-16 md:mt-0">
           <h1 className="text-6xl sm:text-7xl md:text-[8rem] 3xl:text-[10rem] font-serif font-medium tracking-tighter uppercase whitespace-pre-line text-[#1a1a1a] leading-[0.9]">
             <TextType text={["Victor\nCardoso"]} typingSpeed={100} showCursor={true} cursorCharacter="_" />
           </h1>
           <p className="mt-4 text-[11px] md:text-xs font-bold tracking-[0.25em] text-[#1a1a1a]/50 uppercase">
             Projetos Selecionados
           </p>
        </div>

        {/* 2. PROJETOS LADO A LADO (Desktop) / VERTICAL (Mobile) */}
        {projects.map((project, j) => (
          <Link 
            to={`/case/${project.id}`} 
            key={project.id} 
            className="w-full md:w-[60vw] md:h-full flex flex-col justify-center px-6 md:px-8 shrink-0 group/card block cursor-pointer text-left focus:outline-none mb-16 md:mb-0"
          >
             {/* Máscara de imagem sem parallax interno */}
             <div className="w-full aspect-[4/5] md:aspect-video overflow-hidden relative group rounded-xl md:rounded-sm bg-transparent">
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover origin-center transition-transform duration-700 group-hover:scale-105" 
                />
                {/* Overlay Elegante Escurecendo no Hover */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />
                
                {/* Botão Magnético Centralizado */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <MagneticButton>
                    <span 
                      className="px-8 py-4 bg-[#FFFFFF] text-[#1a1a1a] rounded-full text-[10px] font-bold tracking-widest uppercase shadow-2xl inline-block pointer-events-none"
                      aria-hidden="true"
                    >
                      Ver Case
                    </span>
                  </MagneticButton>
                </div>
             </div>
             
             {/* Metadados do Projeto */}
             <div className="flex justify-between items-end mt-6 text-[#1a1a1a] w-full px-1 md:px-0">
               <h2 className="text-2xl md:text-3xl font-serif tracking-tight group-hover/card:opacity-70 transition-opacity">{project.title}</h2>
               <div className="flex items-center gap-6">
                 <span className="text-lg md:text-xl font-serif tracking-tight opacity-80">{project.year}</span>
                 <span className="text-xs font-medium uppercase tracking-widest opacity-40">0{j + 1}</span>
               </div>
             </div>
          </Link>
        ))}
        
        {/* Espaço em branco no final para respiro (apenas desktop) */}
        <div className="hidden md:block w-[20vw] h-full shrink-0" />
      </div>
    </section>
  );
}
