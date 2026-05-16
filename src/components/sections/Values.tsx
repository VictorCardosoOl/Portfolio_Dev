import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface CoreValue {
  title: string;
  description: string;
}

const CORE_VALUES: CoreValue[] = [
  { 
    title: 'Engenharia de Ponta', 
    description: 'Sistemas arquitetados para performance extrema e escalabilidade infinita.' 
  },
  { 
    title: 'Design Editorial', 
    description: 'Estética de alto padrão que comunica autoridade e eleva o valor percebido da sua marca.' 
  },
  { 
    title: 'Precisão Absoluta', 
    description: 'Atenção obsessiva aos mínimos detalhes, em cada linha de código e em cada pixel da tela.' 
  }
];

export default function Values() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".value-item", {
        x: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".values-list",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="values" 
      ref={containerRef} 
      className="min-h-screen grid grid-cols-1 md:grid-cols-2 border-t border-[#1a1a1a]/15 pt-24 pb-24 text-charcoal overflow-hidden"
    >
      <div className="p-8 md:p-12 3xl:p-24 4xl:p-32 flex flex-col min-h-[50vh] md:min-h-screen">
        <div className="flex justify-between text-[10px] 3xl:text-xs uppercase tracking-widest opacity-80 font-bold mb-8">
          <h2 className="font-serif font-light tracking-tight">Victor Cardoso</h2>
          <span className="opacity-90">Valores Fundamentais</span>
        </div>
        
        <div className="flex-grow flex items-center justify-center p-8 md:p-16 3xl:p-24">
           <div className="w-full max-w-sm 3xl:max-w-lg 4xl:max-w-2xl aspect-[4/5] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop" 
              alt="Team working" 
              className="values-image w-full h-full object-cover opacity-90 scale-110 grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="p-8 md:p-12 3xl:p-24 4xl:p-32 flex flex-col min-h-[50vh] md:min-h-screen">
        <div className="flex justify-between text-[10px] 3xl:text-xs uppercase tracking-widest opacity-80 font-bold">
          <span>Perfil da Agência</span>
          <span>2026</span>
          <span>05 / 06</span>
        </div>
        
        <div className="flex-grow flex flex-col justify-center items-start mt-12 md:mt-0">
          <ul className="values-list space-y-8 md:space-y-12 w-full max-w-xl" aria-label="Core Values List">
            {CORE_VALUES.map((item, index) => (
              <li 
                key={item.title}
                className="value-item flex flex-col md:flex-row gap-4 md:gap-8 border-b border-charcoal/10 pb-8 group"
              >
                <span className="text-xs font-bold tracking-widest text-charcoal/30 pt-1 shrink-0" aria-hidden="true">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-fluid-h3 font-serif font-light text-charcoal mb-3 group-hover:opacity-70 transition-opacity">
                    {item.title}
                  </h3>
                  <p className="font-light text-sm md:text-base text-charcoal/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}


