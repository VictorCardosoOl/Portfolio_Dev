import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Download, MapPin, ExternalLink, Globe, Award, Briefcase, Terminal, Cpu, Smartphone, Mail, Github, Linkedin } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { PROFILE_DATA as DATA } from '../../config/profile';

// ============================================================================
// COMPONENTE SECUNDÁRIO: CONTEÚDO DO CURRÍCULO (Resume Content - Vertical Scroll)
// ============================================================================
const ResumeContent = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="w-full bg-[#fafafa]">
      <div className="flex flex-col text-[#333333]">
        
        {/* Panel 1: Header / Intro */}
        <div className="w-full flex items-center justify-center p-8 lg:p-24 relative border-b border-[#e5e5e5]">
          <div className="max-w-4xl w-full">
             <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-4 text-[#1a1a1a]">Victor<br/>Cardoso Cunha</h1>
             <p className="text-lg md:text-2xl text-[#666666] font-light mb-8">Analista de Soluções JR / Desenvolvedor Full Stack Júnior</p>
             
             <div className="flex flex-wrap gap-6 text-sm font-mono text-[#666666] mb-12">
               <span className="flex items-center gap-2"><MapPin size={16}/> Tatuapé - São Paulo/SP</span>
               <span className="flex items-center gap-2"><Smartphone size={16}/> (11) 97744-0146</span>
               <span className="flex items-center gap-2"><Mail size={16}/> victorcardcunha@gmail.com</span>
             </div>

             <div className="flex gap-4">
               <a href="https://github.com/VictorCardosoOl" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 border border-[#333333] hover:bg-[#333333] hover:text-[#FFFFFF] transition-colors rounded-full text-xs font-bold uppercase tracking-wider">
                 <Github size={16}/> GitHub
               </a>
               <a href="#" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 border border-[#333333] hover:bg-[#333333] hover:text-[#FFFFFF] transition-colors rounded-full text-xs font-bold uppercase tracking-wider">
                 <Linkedin size={16}/> LinkedIn
               </a>
             </div>
          </div>
        </div>

        {/* Panel 2: Resumo & Competências */}
        <div className="w-full flex flex-col justify-center p-8 lg:p-24 border-b border-[#e5e5e5] bg-white">
          <div className="max-w-4xl w-full mx-auto">
            <h2 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#999999] mb-6 flex items-center gap-3">
              <Terminal size={18}/> Resumo Profissional
            </h2>
            <p className="text-base md:text-xl leading-relaxed font-light mb-12 text-[#444444]">
              Profissional de tecnologia com rápida ascensão na área de sistemas e operações, atuando atualmente como Analista de Soluções JR. Possuo profundo conhecimento técnico em sistemas de gestão (Sigo - Medicina Ocupacional) e forte capacidade para aliar visão de negócio à execução técnica. Lidero projetos estratégicos focados na automação de processos, análise de estruturas operacionais e especificação de novas funcionalidades. Com sólida base em Front-end (React, TypeScript) e em transição para o Back-end (Node.js), tenho como principal foco atuar como Desenvolvedor Full Stack Júnior de alto impacto.
            </p>

            <h2 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#999999] mb-6">Competências Técnicas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div>
                 <h4 className="font-bold mb-3 text-[#1a1a1a] text-sm">Linguagens & Frameworks</h4>
                 <div className="flex flex-wrap gap-2">
                   {['Python', 'JavaScript', 'TypeScript', 'Node.js', 'Next.js', 'React', 'HTML5', 'CSS'].map(s => (
                     <span key={s} className="px-3 py-1 bg-[#eeeeee] text-[10px] font-mono rounded-sm text-[#333333]">{s}</span>
                   ))}
                 </div>
               </div>
               <div>
                 <h4 className="font-bold mb-3 text-[#1a1a1a] text-sm">Bancos de Dados</h4>
                 <div className="flex flex-wrap gap-2">
                   {['SQL', 'MySQL'].map(s => (
                     <span key={s} className="px-3 py-1 bg-[#eeeeee] text-[10px] font-mono rounded-sm text-[#333333]">{s}</span>
                   ))}
                 </div>
               </div>
               <div>
                 <h4 className="font-bold mb-3 text-[#1a1a1a] text-sm">Ferramentas e Infra</h4>
                 <div className="flex flex-wrap gap-2">
                   {['Git', 'GitHub', 'Trello', 'Linux', 'Windows'].map(s => (
                     <span key={s} className="px-3 py-1 bg-[#eeeeee] text-[10px] font-mono rounded-sm text-[#333333]">{s}</span>
                   ))}
                 </div>
               </div>
               <div>
                 <h4 className="font-bold mb-3 text-[#1a1a1a] text-sm">Outros</h4>
                 <div className="flex flex-wrap gap-2">
                   {['Pacote Office Avançado', 'Automação', 'Especificação Técnica'].map(s => (
                     <span key={s} className="px-3 py-1 bg-[#eeeeee] text-[10px] font-mono rounded-sm text-[#333333]">{s}</span>
                   ))}
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Panel 3: Experiência Profissional */}
        <div className="w-full flex flex-col justify-center p-8 lg:p-24 border-b border-[#e5e5e5]">
          <div className="max-w-4xl w-full mx-auto">
            <h2 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#999999] mb-10 flex items-center gap-3">
              <Briefcase size={18}/> Experiência Profissional
            </h2>
            <div className="space-y-10 relative border-l-2 border-[#dddddd] pl-8">
               <div className="relative">
                 <div className="absolute -left-[41px] top-1 w-5 h-5 bg-[#fafafa] border-4 border-[#1a1a1a] rounded-full"/>
                 <h3 className="text-xl font-bold text-[#1a1a1a]">Analista de Soluções JR</h3>
                 <span className="text-xs font-mono text-[#666666]">WISE SYSTEM (São Paulo, SP) • Atual</span>
                 <ul className="mt-3 space-y-1 text-sm text-[#444444] font-light">
                   <li>• Liderança do projeto estratégico "Maximizar o Uso do Sistema Sigo".</li>
                   <li>• Análise de estruturas operacionais e automação de processos manuais.</li>
                   <li>• Especificação técnica de novas funcionalidades para a equipe de desenvolvimento.</li>
                   <li>• Atuação contínua como elo entre as necessidades do negócio e as soluções tecnológicas.</li>
                 </ul>
               </div>

               <div className="relative">
                 <div className="absolute -left-[41px] top-1 w-5 h-5 bg-[#fafafa] border-4 border-[#cccccc] rounded-full"/>
                 <h3 className="text-lg font-bold text-[#333333]">Supervisor de Op. / Analista de Treinamento</h3>
                 <span className="text-xs font-mono text-[#666666]">WISE SYSTEM • 2025</span>
                 <ul className="mt-3 space-y-1 text-sm text-[#444444] font-light">
                   <li>• Suporte técnico avançado e aplicação de testes de software.</li>
                   <li>• Manutenção e instalação de programas em computadores e servidores.</li>
                   <li>• Correção de parâmetros via banco de dados e manutenção de infraestrutura.</li>
                 </ul>
               </div>

               <div className="relative">
                 <div className="absolute -left-[41px] top-1 w-5 h-5 bg-[#fafafa] border-4 border-[#cccccc] rounded-full"/>
                 <h3 className="text-lg font-bold text-[#333333]">Estágio em Suporte</h3>
                 <span className="text-xs font-mono text-[#666666]">WISE SYSTEM • 2024</span>
                 <ul className="mt-3 space-y-1 text-sm text-[#444444] font-light">
                   <li>• Atendimento ao cliente e suporte técnico de primeiro nível.</li>
                   <li>• Auxílio na manutenção de infraestrutura e testes de sistemas.</li>
                 </ul>
               </div>
            </div>
          </div>
        </div>

        {/* Panel 4: Formação Acadêmica & Cursos */}
        <div className="w-full flex flex-col justify-center p-8 lg:p-24 bg-white relative pb-32">
          <div className="max-w-4xl w-full mx-auto">
            <h2 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#999999] mb-6 flex items-center gap-3">
              <Award size={18}/> Formação Acadêmica
            </h2>
            <div className="mb-12">
              <h3 className="text-lg font-bold text-[#1a1a1a]">Engenharia da Computação</h3>
              <p className="text-sm text-[#666666] font-light mt-1">Universidade Anhembi Morumbi • 01/2022 a 12/2026 (Cursando 9º Semestre)</p>
            </div>

            <h2 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#999999] mb-6">Cursos Complementares</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 text-[#444444]">
              <li className="p-4 bg-[#eeeeee] rounded-sm">
                <span className="block font-bold text-[#1a1a1a] text-sm">Front End Pro</span>
                <span className="text-xs">EBAC (Cursando)</span>
              </li>
              <li className="p-4 bg-[#eeeeee] rounded-sm">
                <span className="block font-bold text-[#1a1a1a] text-sm">Santander Coders 2023.2 | Back-End</span>
                <span className="text-xs">Concluído</span>
              </li>
              <li className="p-4 bg-[#eeeeee] rounded-sm">
                <span className="block font-bold text-[#1a1a1a] text-sm">JS Algoritmos e Estrutura de Dados</span>
                <span className="text-xs">Udemy – Concluído</span>
              </li>
              <li className="p-4 bg-[#eeeeee] rounded-sm">
                <span className="block font-bold text-[#1a1a1a] text-sm">Python e HTML</span>
                <span className="text-xs">Curso em Vídeo – Concluídos</span>
              </li>
            </ul>

            <h2 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#999999] mb-3">Idiomas</h2>
            <p className="text-sm text-[#444444] font-light"><strong>Inglês:</strong> Intermediário (Leitura e Escrita)</p>
          </div>
          
          <div className="max-w-4xl w-full mx-auto mt-12 flex justify-start">
             <a href="#" download className="flex items-center justify-center gap-3 px-8 py-4 bg-[#1a1a1a] text-[#FFFFFF] rounded-full hover:bg-[#333333] transition-all text-[10px] font-bold uppercase tracking-widest shadow-lg">
               <Download size={16} /> Baixar CV PDF
             </a>
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
