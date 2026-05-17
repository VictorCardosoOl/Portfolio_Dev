import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Download, MapPin, ExternalLink, Globe, Award, Briefcase, Terminal, Cpu, Smartphone, Mail, Github, Linkedin } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { PROFILE_DATA as DATA } from '../../config/profile';

// ============================================================================
// COMPONENTE SECUNDÁRIO: CONTEÚDO DO CURRÍCULO (EFResume Style - Full Section)
// ============================================================================

const SkillDots = ({ name, score }: { name: string, score: number }) => (
  <div className="flex justify-between items-center text-xs md:text-sm mb-3">
    <span className="text-gray-500 font-light">{name}</span>
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className={`w-2 h-2 rounded-full ${i <= score ? 'bg-gray-800' : 'bg-gray-200'}`} />
      ))}
    </div>
  </div>
);

const ResumeContent = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="w-full bg-[#FFFFFF] py-24 md:py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1440px] w-full mx-auto text-[#1a1a1a] font-sans">
        
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 items-end">
          <div>
            <h1 className="text-5xl md:text-7xl font-light text-black tracking-tight leading-none mb-4">Victor Cardoso</h1>
            <p className="text-xs md:text-sm text-gray-400 uppercase tracking-widest">Analista & Dev Full Stack</p>
          </div>
          <div className="flex gap-6">
            <span className="text-xs md:text-sm text-gray-400 italic">Endereço</span>
            <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed">
              Tatuapé<br/>
              São Paulo, SP<br/>
              BRASIL
            </p>
          </div>
          <div className="flex gap-6">
            <span className="text-xs md:text-sm text-gray-400 italic">Contato</span>
            <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed">
              victorcardcunha@gmail.com<br/>
              +55 11 97744-0146<br/>
              github.com/VictorCardosoOl
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-24">
          
          {/* Left Column */}
          <div>
            {/* RESUMO PROFISSIONAL */}
            <div className="mb-20">
              <h2 className="text-xs md:text-sm font-bold text-black uppercase tracking-widest border-b border-dotted border-gray-400 pb-4 mb-8">Resumo Profissional</h2>
              <p className="text-sm md:text-base text-gray-600 font-light leading-loose mb-6">
                Profissional de tecnologia com rápida ascensão na área de sistemas e operações, atuando atualmente como Analista de Soluções JR.
              </p>
              <p className="text-sm md:text-base text-gray-600 font-light leading-loose mb-6">
                Possuo profundo conhecimento técnico em sistemas de gestão (Sigo - Medicina Ocupacional) e forte capacidade para aliar visão de negócio à execução técnica. Lidero projetos estratégicos focados na automação de processos.
              </p>
              <p className="text-sm md:text-base text-gray-600 font-light leading-loose">
                Com sólida base em Front-end (React, TypeScript) e em transição para o Back-end (Node.js), tenho como principal foco atuar como Desenvolvedor Full Stack Júnior de alto impacto.
              </p>
            </div>

            {/* ESPECIALIDADES */}
            <div className="mb-20">
              <h2 className="text-xs md:text-sm font-bold text-black uppercase tracking-widest border-b border-dotted border-gray-400 pb-4 mb-12">Especialidades</h2>
              <div className="flex justify-center gap-0 relative">
                 <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-gray-300 flex items-center justify-center relative z-10 bg-white shadow-sm">
                   <Terminal size={32} className="text-gray-800" />
                   <span className="absolute -bottom-8 text-xs text-gray-500 whitespace-nowrap">Front-end</span>
                 </div>
                 <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-gray-300 flex items-center justify-center relative z-20 bg-white -ml-8 md:-ml-12 shadow-sm">
                   <Cpu size={32} className="text-gray-800" />
                   <span className="absolute -bottom-8 text-xs text-gray-500 whitespace-nowrap">Back-end</span>
                 </div>
                 <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-gray-300 flex items-center justify-center relative z-30 bg-white -ml-8 md:-ml-12 shadow-sm">
                   <Briefcase size={32} className="text-gray-800" />
                   <span className="absolute -bottom-8 text-xs text-gray-500 whitespace-nowrap">Automação</span>
                 </div>
              </div>
            </div>

            {/* COMPETÊNCIAS */}
            <div className="mb-20 mt-28">
              <h2 className="text-xs md:text-sm font-bold text-black uppercase tracking-widest border-b border-dotted border-gray-400 pb-4 mb-10">Competências Técnicas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <div>
                  <h3 className="text-xs text-gray-400 italic mb-6">Linguagens</h3>
                  <SkillDots name="JavaScript" score={5} />
                  <SkillDots name="TypeScript" score={4} />
                  <SkillDots name="Python" score={4} />
                  <SkillDots name="HTML & CSS" score={5} />
                </div>
                <div>
                  <h3 className="text-xs text-gray-400 italic mb-6">Frameworks/DB</h3>
                  <SkillDots name="React" score={5} />
                  <SkillDots name="Node.js" score={4} />
                  <SkillDots name="Next.js" score={3} />
                  <SkillDots name="SQL/MySQL" score={4} />
                </div>
              </div>
            </div>

            {/* IDIOMAS */}
            <div>
              <h2 className="text-xs md:text-sm font-bold text-black uppercase tracking-widest border-b border-dotted border-gray-400 pb-4 mb-12">Idiomas</h2>
              <div className="flex gap-16 justify-center">
                 <div className="flex flex-col items-center gap-4">
                   <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-[8px] border-gray-800 flex items-center justify-center">
                     <span className="text-xs md:text-sm font-bold">PT</span>
                   </div>
                   <div className="text-center">
                     <span className="block text-xs font-bold text-gray-700 mb-1">PORTUGUÊS</span>
                     <span className="block text-xs text-gray-400">Nativo</span>
                   </div>
                 </div>
                 <div className="flex flex-col items-center gap-4">
                   <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-[8px] border-gray-300 flex items-center justify-center relative overflow-hidden">
                     <div className="absolute inset-0 border-[8px] border-gray-800 rounded-full" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 50%)' }}></div>
                     <span className="text-xs md:text-sm font-bold relative z-10">EN</span>
                   </div>
                   <div className="text-center">
                     <span className="block text-xs font-bold text-gray-700 mb-1">INGLÊS</span>
                     <span className="block text-xs text-gray-400">Intermediário</span>
                   </div>
                 </div>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div>
            {/* EDUCAÇÃO */}
            <div className="mb-20">
              <h2 className="text-xs md:text-sm font-bold text-black uppercase tracking-widest border-b border-dotted border-gray-400 pb-4 mb-10">Formação Acadêmica</h2>
              <div className="relative border-l border-black ml-2 space-y-12 pb-4">
                <div className="relative pl-8 md:pl-12">
                  <div className="absolute -left-[4.5px] top-2 w-2 h-2 bg-black rounded-full" />
                  <span className="text-xs text-gray-400 block mb-2">Jan 2022 a Dez 2026</span>
                  <h4 className="text-sm md:text-lg font-bold text-gray-800 leading-tight mb-1">Engenharia da Computação (9º Semestre)</h4>
                  <span className="text-xs text-gray-500 italic block mt-1">Universidade Anhembi Morumbi, SP.</span>
                </div>
              </div>
            </div>

            {/* EXPERIÊNCIA */}
            <div className="mb-20 mt-10">
              <h2 className="text-xs md:text-sm font-bold text-black uppercase tracking-widest border-b border-dotted border-gray-400 pb-4 mb-12">Experiência Profissional</h2>
              
              <div className="flex items-start gap-8 md:gap-12 mb-12">
                <div className="text-7xl md:text-9xl font-light text-black leading-none shrink-0 -mt-2">1</div>
                <div>
                  <span className="text-xs text-gray-400 block mb-1">Atual</span>
                  <h4 className="text-sm md:text-lg font-bold text-gray-800 mb-1">Analista de Soluções JR.</h4>
                  <span className="text-xs md:text-sm text-gray-500 italic block mb-4">WISE SYSTEM</span>
                  <p className="text-sm text-gray-500 leading-loose">
                    Liderança do projeto "Maximizar o Uso do Sistema Sigo". Automação de processos operacionais e especificação técnica.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-8 md:gap-12 mb-12">
                <div className="text-7xl md:text-9xl font-light text-black leading-none shrink-0 -mt-2">2</div>
                <div>
                  <span className="text-xs text-gray-400 block mb-1">2025</span>
                  <h4 className="text-sm md:text-lg font-bold text-gray-800 mb-1">Supervisor de Op. / Analista</h4>
                  <span className="text-xs md:text-sm text-gray-500 italic block mb-4">WISE SYSTEM</span>
                  <p className="text-sm text-gray-500 leading-loose">
                    Suporte avançado, manutenção em servidores e correção de parâmetros de BD.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-8 md:gap-12">
                <div className="text-7xl md:text-9xl font-light text-black leading-none shrink-0 -mt-2">3</div>
                <div>
                  <span className="text-xs text-gray-400 block mb-1">2024</span>
                  <h4 className="text-sm md:text-lg font-bold text-gray-800 mb-1">Estágio em Suporte</h4>
                  <span className="text-xs md:text-sm text-gray-500 italic block mb-4">WISE SYSTEM</span>
                  <p className="text-sm text-gray-500 leading-loose">
                    Atendimento ao cliente, auxílio na infraestrutura e testes.
                  </p>
                </div>
              </div>
            </div>

            {/* CURSOS E RECONHECIMENTOS */}
            <div className="mb-20">
              <h2 className="text-xs md:text-sm font-bold text-black uppercase tracking-widest border-b border-dotted border-gray-400 pb-4 mb-10">Cursos Complementares</h2>
              
              <div className="flex items-start gap-6 mb-8">
                <div className="w-12 h-12 md:w-16 md:h-16 border-[2px] border-black flex items-center justify-center shrink-0 rounded-full">
                  <Award size={24} className="text-black" />
                </div>
                <div className="pt-1">
                  <h4 className="text-sm md:text-base font-bold text-gray-800">Front End Pro (EBAC) & Santander Coders Back-End</h4>
                  <p className="text-sm text-gray-500 leading-relaxed mt-2">Formações completas em desenvolvimento web moderno.</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 md:w-16 md:h-16 border-[2px] border-gray-400 flex items-center justify-center shrink-0 rounded-full">
                  <Award size={24} className="text-gray-400" />
                </div>
                <div className="pt-1">
                  <h4 className="text-sm md:text-base font-bold text-gray-800">JS, Algoritmos, Python e HTML</h4>
                  <p className="text-sm text-gray-500 leading-relaxed mt-2">Udemy e Curso em Vídeo - Concluídos.</p>
                </div>
              </div>
            </div>

            {/* OUTROS */}
            <div className="mb-12">
              <h2 className="text-xs md:text-sm font-bold text-black uppercase tracking-widest border-b border-dotted border-gray-400 pb-4 mb-10">Ferramentas & Outros</h2>
              <div className="flex flex-wrap gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center mb-3">
                    <Github size={24} className="text-gray-600" />
                  </div>
                  <span className="text-xs text-gray-500">Git/GitHub</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center mb-3">
                    <Terminal size={24} className="text-gray-600" />
                  </div>
                  <span className="text-xs text-gray-500">Linux</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center mb-3">
                    <Smartphone size={24} className="text-gray-600" />
                  </div>
                  <span className="text-xs text-gray-500">Office</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center mb-3">
                    <Award size={24} className="text-gray-600" />
                  </div>
                  <span className="text-xs text-gray-500">Trello</span>
                </div>
              </div>
            </div>
            
            <div className="mt-20 flex justify-end">
              <a href="#" download className="flex items-center justify-center gap-3 px-10 py-5 bg-[#1a1a1a] text-[#FFFFFF] rounded-full hover:bg-[#333333] transition-all text-xs font-bold uppercase tracking-widest shadow-lg">
                <Download size={20} /> Baixar CV PDF
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENTE PRINCIPAL: ABOUT SECTION
// ============================================================================
const AboutMe: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const img1Ref = useRef<HTMLImageElement>(null);
  const img2Ref = useRef<HTMLImageElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const modalWrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = modalWrapperRef.current;
    const overlay = overlayRef.current;
    const content = modalContentRef.current;
    if (!wrapper || !overlay || !content) return;

    if (isResumeOpen) {
      gsap.set(wrapper, { display: 'block' });
      gsap.to(overlay, { autoAlpha: 1, duration: 0.4, ease: "power2.out" });
      gsap.fromTo(content, { y: "100%" }, { y: "2%", duration: 0.8, ease: "expo.out" });
    } else {
      gsap.to(overlay, { autoAlpha: 0, duration: 0.4, ease: "power2.in" });
      gsap.to(content, { y: "100%", duration: 0.5, ease: "expo.in", onComplete: () => {
        gsap.set(wrapper, { display: 'none' });
      }});
    }
  }, [isResumeOpen]);



  // Bloquear o scroll do body quando o modal abrir
  useEffect(() => {
    if (isResumeOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isResumeOpen]);

  return (
    <>
      <section ref={sectionRef} id="aboutme" className="min-h-screen flex flex-col md:flex-row relative z-10 overflow-hidden font-sans border-t border-[#1a1a1a]/15">
        
        {/* Fundo e Textura (Noise SVG) */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04] mix-blend-overlay">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <filter id="noise-about">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise-about)" />
          </svg>
        </div>

        {/* Left Side */}
        <div className="w-full md:w-[45%] h-[40vh] md:h-screen relative flex flex-col justify-between p-8 md:p-16 z-20 pointer-events-none">
          
          {/* Sideways text */}
          <div className="hidden md:block absolute left-16 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-xs font-serif tracking-widest text-[#1a1a1a]/60">
            About Me +
          </div>

          <div /> {/* Spacer */}

          {/* Huge Text */}
          <h1 className="font-serif font-bold text-[30vw] md:text-[16vw] leading-[0.75] tracking-tight text-[#1a1a1a] md:-ml-4">
            about.
          </h1>
        </div>

        {/* Center "Currículo" Button */}
        <button 
          onClick={() => setIsResumeOpen(true)}
          className="hidden md:flex absolute left-[45%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-[#1a1a1a]/20 items-center justify-center text-[10px] uppercase font-bold tracking-widest z-30 bg-[#1a1a1a] text-white shadow-2xl hover:scale-105 transition-transform cursor-pointer"
        >
          Currículo
        </button>

        {/* Right Side (Content) */}
        <div 
          ref={carouselRef}
          className="w-full md:w-[55%] h-[60vh] md:h-screen flex items-center justify-center gap-8 md:gap-16 px-8 md:px-24 z-10" 
        >

          <div className="shrink-0 w-1/2 flex flex-col gap-6">
            <div className="aspect-[3/4] overflow-hidden bg-[#1a1a1a]/5">
              <img ref={img1Ref} src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800" className="w-full h-full object-cover grayscale mix-blend-multiply opacity-90" alt="Victor Cardoso" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/50 mb-2">PROFILE</span>
              <h3 className="font-serif text-2xl md:text-3xl text-[#1a1a1a] font-medium mb-1">Victor Cardoso</h3>
              <span className="text-sm font-sans text-[#1a1a1a]/70 uppercase tracking-wide">— DEV. /FRONTEND</span>
            </div>
          </div>

          <div className="shrink-0 w-1/2 flex flex-col gap-6">
            <div className="aspect-[3/4] overflow-hidden bg-[#1a1a1a]/5 relative">
              <img ref={img2Ref} src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800" className="w-full h-full object-cover grayscale mix-blend-multiply opacity-90" alt="Resume" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/50 mb-2">EDITORIAL</span>
              <h3 className="font-serif text-2xl md:text-3xl text-[#1a1a1a] font-medium mb-1">Full Resume</h3>
              <span className="text-sm font-sans text-[#1a1a1a]/70 uppercase tracking-wide">— EXP. /2026</span>
            </div>
          </div>



        </div>
      </section>

      {/* Modal Interno (Injetado via Portal) */}
      {typeof window !== 'undefined' && createPortal(
        <div ref={modalWrapperRef} style={{ display: 'none' }} className="fixed inset-0 z-[9998]">
          {/* Overlay Escuro */}
          <div
            ref={overlayRef}
            onClick={() => setIsResumeOpen(false)}
            className="absolute inset-0 bg-[#1a1a1a]/95 cursor-pointer opacity-0 invisible"
          />
          
          {/* Container Branco do Modal */}
          <div
            ref={modalContentRef}
            className="absolute left-0 right-0 bottom-0 z-[9999] w-full bg-[#FFFFFF] shadow-2xl overflow-hidden flex flex-col h-[98vh] rounded-t-[2rem] max-w-[96vw] mx-auto translate-y-full"
          >
            {/* Botão Fechar */}
            <div className="absolute top-0 right-0 z-50 p-6 md:p-8">
              <button onClick={() => setIsResumeOpen(false)} className="w-12 h-12 rounded-full flex items-center justify-center bg-[#1a1a1a] text-[#FFFFFF] hover:bg-[#1a1a1a]/80 transition-all focus:outline-none">
                <X size={20} />
              </button>
            </div>
            
            {/* Scroll Interno do Currículo */}
            <div className="flex-grow h-full w-full overflow-y-auto bg-[#FFFFFF] modal-scroll-container">
              <ResumeContent isOpen={isResumeOpen} />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default AboutMe;
