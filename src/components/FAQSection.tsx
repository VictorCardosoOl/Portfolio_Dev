import React, { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';
import { MagneticButton } from './ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

// Dados mockados
const FAQ_ITEMS = [
  { 
    id: 1, 
    question: "Qual o valor de um projeto completo?", 
    answer: "Cada projeto tem escopo, desafios e objetivos únicos. Não trabalhamos com tabelas fixas, mas realizamos um diagnóstico profundo para precificar com base no valor gerado e no esforço técnico/criativo necessário." 
  },
  { 
    id: 2, 
    question: "Como funciona o processo de criação?", 
    answer: "Nosso processo é dividido em três pilares: Descoberta e Diagnóstico, onde entendemos profundamente seu negócio; Engenharia e Design, onde prototipamos e desenvolvemos a solução; e Entrega e Evolução, focando em performance e escalabilidade." 
  },
  { 
    id: 3, 
    question: "Quais tecnologias vocês utilizam?", 
    answer: "Trabalhamos com o que há de mais moderno e performático no mercado: React, Next.js, TypeScript, Tailwind CSS para front-end, Node.js para back-end, e GSAP/Framer Motion para interações avançadas." 
  },
  { 
    id: 4, 
    question: "Vocês atendem startups e empresas de fora do Brasil?", 
    answer: "Sim, somos um estúdio com operação global. Trabalhamos com empresas da Europa e da América do Norte, adaptando nossos fluxos e reuniões para os diferentes fusos horários de forma transparente e eficiente." 
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Lógica do Accordion
  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Animações GSAP
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animar .sticky-content (Esquerda)
      gsap.from(leftColRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        }
      });

      // 2. Animar .faq-item (Direita) com stagger
      if (listRef.current) {
        const items = listRef.current.querySelectorAll('.faq-item-anim');
        gsap.from(items, {
          y: 40,
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" ref={containerRef} className="py-32 md:py-48 lg:py-64 px-6 lg:px-12 3xl:px-24 bg-[#111] text-cream relative z-10 overflow-hidden min-h-[80vh] flex items-center">
      <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
        
        {/* COLUNA ESQUERDA (Sticky) */}
        <div className="lg:col-span-4 relative">
          <div ref={leftColRef} className="lg:sticky lg:top-24 pt-4">
            <span className="text-[10px] font-bold tracking-widest uppercase mb-6 block text-cream/40">
              Suporte
            </span>
            <h2 className="text-5xl md:text-6xl font-serif font-light mb-8 leading-[0.9] tracking-tight text-cream">
              Dúvidas <br/> 
              <span className="italic text-cream/40">Frequentes</span>
            </h2>
            
            {/* Botão de Contato */}
            <div className="mt-12">
              <MagneticButton>
               <a href="#contact" className="inline-flex items-center justify-center text-sm font-semibold border border-cream/30 hover:bg-cream hover:text-[#111] text-cream px-8 py-4 rounded-full transition-all duration-300">
                    Ainda com dúvidas? Fale conosco
                 </a>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA (Lista) */}
        <div ref={listRef} className="lg:col-span-7 lg:col-start-6 mt-8 lg:mt-0">
          {FAQ_ITEMS.map((item, idx) => (
            <div 
              key={item.id} 
              className="faq-item-anim border-b border-charcoal/10 dark:border-cream/10"
            >
              <button 
                onClick={() => toggleItem(idx)}
                className="w-full py-6 md:py-8 flex justify-between items-center text-left group focus:outline-none"
                aria-expanded={openIndex === idx}
                aria-controls={`faq-answer-${item.id}`}
              >
                <h3 className={`text-xl md:text-2xl font-serif font-light transition-all duration-500 pr-8
                   ${openIndex === idx ? 'translate-x-2 md:translate-x-4 opacity-100' : 'opacity-70 group-hover:opacity-100'}`}
                 >
                  {item.question}
                </h3>
                <div className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-cream/20 group-hover:border-cream/50 transition-colors">
                  <Plus className={`w-5 h-5 transition-transform duration-500 ${openIndex === idx ? 'rotate-45' : ''}`} />
                </div>
              </button>
              
              {/* Área de Resposta (Expandable) */}
              <div 
                id={`faq-answer-${item.id}`}
                className={`overflow-hidden transition-all duration-500 ease-in-out
                  ${openIndex === idx ? 'max-h-96 opacity-100 pb-10' : 'max-h-0 opacity-0 pb-0'}`}
              >
                <p className="text-sm md:text-base opacity-70 max-w-2xl font-light leading-relaxed pl-2 md:pl-4 border-l border-charcoal/20 dark:border-cream/20">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
