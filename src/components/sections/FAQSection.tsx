import React, { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from '../ui/MagneticButton';
import { PROFILE_DATA } from '../../config/profile';
import { useWhatsAppModal } from '../../context/WhatsAppModalContext';

gsap.registerPlugin(ScrollTrigger);

const FAQ_ITEMS = [
  {
    id: '01',
    question: 'Qual o valor de um projeto completo?',
    answer:
      'Cada projeto tem escopo, desafios e objetivos únicos. Não trabalhamos com tabelas fixas, mas realizamos um diagnóstico profundo para precificar com base no valor gerado e no esforço técnico/criativo necessário.',
  },
  {
    id: '02',
    question: 'Como funciona o processo de criação?',
    answer:
      'Nosso processo é dividido em três pilares: Descoberta e Diagnóstico, onde entendemos profundamente seu negócio; Engenharia e Design, onde prototipamos e desenvolvemos a solução; e Entrega e Evolução, focando em performance e escalabilidade.',
  },
  {
    id: '03',
    question: 'Quais tecnologias vocês utilizam?',
    answer:
      'Trabalhamos com o que há de mais moderno e performático no mercado: React, Next.js, TypeScript, Tailwind CSS para front-end, Node.js para back-end, e GSAP/Framer Motion para interações avançadas.',
  },
  {
    id: '04',
    question: 'Vocês atendem startups e empresas de fora do Brasil?',
    answer:
      'Sim, somos um estúdio com operação global. Trabalhamos com empresas da Europa e da América do Norte, adaptando nossos fluxos e reuniões para os diferentes fusos horários de forma transparente e eficiente.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { openWhatsAppModal } = useWhatsAppModal();

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from('.faq-header-line', {
        y: '110%',
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.faq-header',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Rows
      gsap.from('.faq-row', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.faq-list',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="faq"
      ref={containerRef}
      className="border-t border-black/5 shadow-[0_-8px_30px_rgba(0,0,0,0.03)] bg-white/80 backdrop-blur-sm overflow-hidden relative z-10"
    >
      

      <div className="container-fluid py-12 md:py-16">

        {/* ── HEADER ── */}
        <div className="faq-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
          <div>
            <div className="overflow-hidden mb-4">
              <span className="faq-header-line block text-[10px] uppercase tracking-[0.3em] font-bold text-[#1a1a1a]/40">
                05 / Dúvidas Frequentes
              </span>
            </div>
            <div className="overflow-hidden">
              <h2 className="faq-header-line text-fluid-h2 font-serif font-light leading-none tracking-tighter uppercase text-[#1a1a1a]">
                Perguntas
              </h2>
            </div>
          </div>

          <p className="text-sm md:text-base font-light leading-relaxed text-[#1a1a1a]/50 pb-2 md:self-end max-w-xs md:max-w-sm">
            Respostas diretas para as questões mais comuns antes de começarmos a trabalhar juntos.
          </p>
        </div>

        {/* ── LISTA ── */}
        <ul className="faq-list divide-y divide-[#1a1a1a]/10">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <li 
                key={item.id} 
                className="faq-row"
                onMouseEnter={() => window.innerWidth >= 1024 && setOpenIndex(i)}
                onMouseLeave={() => window.innerWidth >= 1024 && setOpenIndex(null)}
              >
                <button
                  onClick={() => toggleItem(i)}
                  className="w-full flex items-center gap-6 md:gap-10 py-5 md:py-6 text-left group focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  {/* Index */}
                  <span className="font-serif text-sm md:text-base text-[#1a1a1a]/25 shrink-0 w-8 text-right tabular-nums">
                    {item.id}
                  </span>

                  {/* Question */}
                  <span
                    className={`flex-1 text-2xl md:text-3xl lg:text-4xl font-serif tracking-tight transition-colors duration-300 ${
                      isOpen ? 'text-[#1a1a1a]/50' : 'text-[#1a1a1a]'
                    }`}
                  >
                    {item.question}
                  </span>

                  {/* Toggle icon */}
                  <span
                    className={`shrink-0 ml-2 text-[#1a1a1a]/40 transition-transform duration-500 ${
                      isOpen ? 'rotate-45' : 'rotate-0'
                    }`}
                    aria-hidden="true"
                  >
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <line x1="11" y1="1" x2="11" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="1" y1="11" x2="21" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>

                {/* Answer panel */}
                <div
                  id={`faq-answer-${item.id}`}
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="pl-14 md:pl-20 pb-8 text-sm md:text-base font-light text-[#1a1a1a]/60 leading-relaxed max-w-2xl">
                    {item.answer}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        {/* ── CTA ── */}
        <div className="mt-10 md:mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <p className="text-sm text-[#1a1a1a]/40 font-light max-w-xs leading-relaxed">
            Ainda não encontrou o que procura? Fale diretamente comigo.
          </p>
          <MagneticButton>
            <button
              onClick={openWhatsAppModal}
              id="faq-cta"
              className="group inline-flex items-center gap-3 border border-[#1a1a1a]/20 hover:border-[#1a1a1a]/60 text-[#1a1a1a]/70 hover:text-[#1a1a1a] text-xs uppercase tracking-widest font-bold py-4 px-8 transition-all duration-300 rounded-sm"
            >
              WhatsApp
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
            </button>
          </MagneticButton>
        </div>

      </div>

      
    </section>
  );
}


