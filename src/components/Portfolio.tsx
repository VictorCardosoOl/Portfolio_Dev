import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/portfolio';
import Image from './ui/Image';
import { Button } from './ui/Button';
import { Heading } from './ui/Heading';

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const getScrollAmount = () => {
        return window.innerWidth * (projects.length - 1);
      };

      const horizontalAnim = gsap.to(container, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
        }
      });

      // Animação de revelação do texto para cada projeto
      gsap.utils.toArray<HTMLElement>('.portfolio-card').forEach((card) => {
        const textElements = card.querySelectorAll('.portfolio-text-reveal > *');
        gsap.from(textElements, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: horizontalAnim,
            start: "left 85%",
            toggleActions: "play none none none"
          }
        });
      });
      // Força um recálculo para garantir que o tamanho dos projetos seja lido corretamente
      // após a remoção da tela de loading.
      setTimeout(() => ScrollTrigger.refresh(), 500);
      setTimeout(() => ScrollTrigger.refresh(), 1500);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="portfolio" 
      ref={sectionRef} 
      className="relative w-full h-[100dvh] bg-white text-charcoal overflow-hidden"
    >
      {/* Background static texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
        <Image src="https://images.unsplash.com/photo-1618220179428-22790b46a0eb?q=80&w=1000&auto=format&fit=crop" alt="" className="w-full h-full object-cover grayscale" />
      </div>

      <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20">
        <h2 className="text-[10px] md:text-xs uppercase tracking-widest font-bold opacity-80">Trabalhos / Backstage</h2>
      </div>

      <div 
        ref={scrollContainerRef} 
        className="flex h-full items-center relative z-10"
        style={{ width: `${projects.length * 100}vw` }}
      >
        {projects.map((project, idx) => (
          <div key={idx} className="flex items-center justify-center w-[100vw] h-full shrink-0">
            <div className="portfolio-card w-[90vw] md:w-[85vw] lg:w-[80vw] h-[80vh] relative group overflow-hidden rounded-md shadow-2xl bg-stone-900">
            
            {/* Imagem de Fundo (Full Bleed) */}
            <Image
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out z-0"
            />
            
            {/* Overlay para contraste do texto */}
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-700 z-0" />

            {/* Conteúdo Sobreposto (Esquerda) */}
            <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-16 lg:p-24 portfolio-text-reveal z-10 w-full md:w-[80%] lg:w-[60%]">
              {/* Opcional: Número e título menor (mantido para contexto, mas com estilo clean) */}
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/70 mb-4 block font-bold">
                0{idx + 1}
              </span>
              
              {/* Título Principal (Estilo Imagem de Referência) */}
              <Heading size="h2" weight="bold" className="leading-tight text-white drop-shadow-lg">
                {project.title}
              </Heading>
              
              {/* Descrição Opcional (Se quiser manter da versão anterior) */}
              <p className="mt-6 text-base md:text-lg font-light tracking-wide text-white/90 max-w-xl leading-relaxed drop-shadow-md">
                {project.description}
              </p>
              
              {/* Botão (Estilo Imagem de Referência) */}
              <div className="mt-10">
                <Button variant="whiteOutline" size="lg" className="rounded-none lowercase px-10 py-6 text-sm" onClick={() => alert("Abrir Modal de Backstage: Desafios, Arquitetura, Impacto")}>
                  view project
                </Button>
              </div>
            </div>
          </div>
        </div>
        ))}
      </div>
    </section>
  );
}
