import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { specialties } from '../../data/services';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpanded = (index: number) => {
    setExpandedIndex(prev => prev === index ? null : index);
  };

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.srv-header-line', {
        y: '110%',
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.srv-header',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.srv-row', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.srv-list',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={containerRef}
      className="border-t border-[#1a1a1a]/15 overflow-hidden relative z-10"
    >
      

      <div className="container-fluid py-12 md:py-16">

        {/* ── HEADER ── */}
        <div className="srv-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
          <div>
            <div className="overflow-hidden mb-4">
              <span className="srv-header-line block text-[10px] uppercase tracking-[0.3em] font-bold text-[#1a1a1a]/40">
                03 / Especialidades
              </span>
            </div>
            <div className="overflow-hidden">
              <h2 className="srv-header-line text-fluid-h2 font-serif font-light leading-none tracking-tighter uppercase text-[#1a1a1a]">
                Serviços
              </h2>
            </div>
          </div>

          <p className="text-sm md:text-base font-light leading-relaxed text-[#1a1a1a]/50 pb-2 md:self-end max-w-xs md:max-w-sm">
            Combinando engenharia sólida com sensibilidade de design para entregar produtos digitais que impressionam e performam.
          </p>
        </div>

        {/* ── LISTA DE ESPECIALIDADES ── */}
        <ul className="srv-list divide-y divide-[#1a1a1a]/10">
          {specialties.map((item, i) => {
            const isExpanded = expandedIndex === i;
            return (
              <li
                key={item.id}
                className="srv-row cursor-pointer"
                onClick={() => toggleExpanded(i)}
                onMouseEnter={() => window.innerWidth >= 1024 && setExpandedIndex(i)}
                onMouseLeave={() => window.innerWidth >= 1024 && setExpandedIndex(null)}
              >
                {/* Row header */}
                <div className="w-full flex items-center gap-6 md:gap-10 py-5 md:py-6">
                  {/* Number */}
                  <span className="font-serif text-sm md:text-base text-[#1a1a1a]/25 shrink-0 w-8 text-right tabular-nums">
                    {item.id}
                  </span>

                  {/* Title */}
                  <span className={`flex-1 text-2xl md:text-3xl lg:text-4xl font-serif tracking-tight transition-colors duration-300 ${isExpanded ? 'text-[#1a1a1a]/50' : 'text-[#1a1a1a]'}`}>
                    {item.title}
                  </span>

                  {/* Tech tags — md+ */}
                  <span className="hidden md:flex gap-2 flex-wrap justify-end shrink-0 max-w-[280px]">
                    {item.technologies.map(tech => (
                      <span
                        key={tech}
                        className="text-[10px] uppercase tracking-widest font-bold border border-[#1a1a1a]/20 text-[#1a1a1a]/40 px-2.5 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </span>

                  {/* Toggle icon */}
                  <span
                    className={`shrink-0 ml-2 text-[#1a1a1a]/40 transition-transform duration-500 ${isExpanded ? 'rotate-45' : 'rotate-0'}`}
                    aria-hidden="true"
                  >
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <line x1="11" y1="1" x2="11" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="1" y1="11" x2="21" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </div>

                {/* Expandable panel */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="pl-14 md:pl-20 pb-8 grid md:grid-cols-2 gap-10">
                    <p className="text-sm md:text-base font-light text-[#1a1a1a]/60 leading-relaxed max-w-lg">
                      {item.description}
                    </p>

                    <div>
                      <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#1a1a1a]/30 mb-4">
                        Entregáveis
                      </p>
                      <ul className="space-y-2">
                        {item.deliverables.map(d => (
                          <li key={d} className="flex items-center gap-3 text-sm text-[#1a1a1a]/70 font-light">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]/30 shrink-0" aria-hidden="true" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* ── CTA ── */}
        <div className="mt-10 md:mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <p className="text-sm text-[#1a1a1a]/40 font-light max-w-xs leading-relaxed">
            Cada projeto é tratado como único — sem templates, sem atalhos.
          </p>
          <a
            href="#contact"
            id="services-cta"
            className="group inline-flex items-center gap-3 border border-[#1a1a1a]/20 hover:border-[#1a1a1a]/60 text-[#1a1a1a]/70 hover:text-[#1a1a1a] text-xs uppercase tracking-widest font-bold py-4 px-8 transition-all duration-300 rounded-sm"
          >
            Vamos conversar
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      
    </section>
  );
}


