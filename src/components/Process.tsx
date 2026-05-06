/**
 * 🚀 Process Section (Standalone)
 * -------------------------------------------------------------
 * Dependências necessárias para este componente funcionar em outro projeto:
 * npm install gsap
 * 
 * Este arquivo foi unificado para facilitar a cópia para outros projetos.
 * Contém os dados (PROCESS_STEPS), o micro-componente de animação (Reveal)
 * e o componente principal (Process).
 */

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── 1. DADOS DOS PROCESSOS (Anteriormente em constants.tsx) ───────────

export const PROCESS_STEPS = [
  {
    id: '01',
    title: 'Imersão',
    subtitle: 'COMPREENDENDO A RAIZ DO PROBLEMA ANTES DE PROPOR A SOLUÇÃO.',
    description: 'Entendimento profundo das regras de negócio, mapeamento de dores operacionais e análise arquitetural do projeto. Nesta etapa formamos o escopo e focamos em alinhar a expectativa com a viabilidade técnica.'
  },
  {
    id: '02',
    title: 'Estratégia',
    subtitle: 'NADA É DESENHADO SEM UM PROPÓSITO TÉCNICO E DE NEGÓCIO.',
    description: 'Definição de KPIs, prazos, fluxos de uso e criação visual. Planejamos detalhadamente a arquitetura do ecossistema e ferramentas antes da implementação.'
  },
  {
    id: '03',
    title: 'Engenharia',
    subtitle: 'CONSTRUÇÃO SÓLIDA, ESCALÁVEL E COM CÓDIGO LIMPO.',
    description: 'Desenvolvimento técnico com foco em performance, estabilidade e segurança. Utilizamos as melhores práticas do mercado e tecnologias inovadoras para construir ferramentas e plataformas performáticas.'
  },
  {
    id: '04',
    title: 'Sustentação',
    subtitle: 'O LANÇAMENTO É APENAS O INÍCIO DO CICLO.',
    description: 'Testes integrados, entrega guiada e documentação final. Após o lançamento, atuamos com treinamentos e suporte contínuo garantindo longevidade e escalabilidade corporativa.'
  }
];

// ── 2. COMPONENTE UI AUXILIAR ─────────────────────────────────────────

interface RevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
  y?: number;
  className?: string;
  variant?: 'translate' | 'clip' | 'blur' | 'chars';
}

const Reveal: React.FC<RevealProps> = ({
  children,
  width = 'fit-content',
  className = '',
}) => {
  return (
    <div style={{ width }} className={`relative ${className}`}>
      <div>{children}</div>
    </div>
  );
};

// ── 3. COMPONENTE PRINCIPAL (Process) ──────────────────────────────────

interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

const Process: React.FC = () => {
  if (!PROCESS_STEPS || PROCESS_STEPS.length === 0) return null;

  return (
    <section id="process" className="py-12 md:py-16 bg-white text-[#111] relative overflow-hidden z-10 flex flex-col justify-center">
      <div className="container-fluid">
        <div className="mb-20 md:mb-32 max-w-2xl">
           <Reveal>
               <h2 className="text-fluid-h2 font-serif font-light text-[#111] leading-[0.9] tracking-tighter uppercase mt-4">
                 BRIEFING
               </h2>
           </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {PROCESS_STEPS.map((step: ProcessStep, index: number) => (
            <Reveal key={step.id} delay={index * 150}>
              <div className="flex flex-col h-full border-t border-[#000000]/10 pt-8 mt-8 lg:mt-0 lg:border-t-0 lg:pt-0">
                 <span className="text-fluid-display font-serif italic text-[#000000]/10 leading-none mb-4 md:mb-6 block select-none tracking-tighter">
                   {step.id}
                 </span>
                  <h3 className="text-fluid-h3 font-serif font-light text-[#111] mb-3 tracking-tight">
                   {step.title}
                 </h3>
                 <p className="text-fluid-p text-[#333] leading-relaxed font-sans max-w-sm">
                   {step.description}
                 </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
