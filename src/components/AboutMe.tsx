import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Download, MapPin, ExternalLink, Globe, Award, Briefcase, Terminal, Cpu } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { PROFILE_DATA as DATA } from '../config/profile';

// ============================================================================
// COMPONENTE SECUNDÁRIO: CONTEÚDO DO CURRÍCULO (Resume Content)
// ============================================================================
const ResumeContent = () => (
  <div className="bg-white min-h-screen pb-24">
    {/* Header do CV */}
    <div className="w-full bg-[#000000] text-white pt-32 pb-16 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row gap-10 items-end relative z-10 3xl:px-12">
        <div className="flex-1 pb-2">
          <span className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-[10px] font-mono uppercase tracking-widest text-white/80 mb-4 inline-block">
            {DATA.role}
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight mb-4 leading-none">
            {DATA.name}
          </h1>
          <p className="text-lg md:text-xl font-light text-white/70 max-w-2xl mb-8 leading-relaxed">
            {DATA.bio}
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs font-mono text-white/50 uppercase tracking-widest border-t border-white/10 pt-6">
            <span className="flex items-center gap-2"><MapPin size={12} /> {DATA.location}</span>
            <span className="flex items-center gap-2"><Globe size={12} /> Português / Inglês</span>
            <a href={DATA.socials.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white hover:text-[#999999] transition-colors underline-offset-4">
              <ExternalLink size={12} /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* Corpo do CV */}
    <div className="max-w-[1920px] mx-auto px-6 md:px-12 3xl:px-24 mt-24 md:mt-32 3xl:mt-40">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        {/* Esquerda: Experiência e Educação */}
        <div className="lg:col-span-8 space-y-16">
          <section>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#000000]/40 mb-10 border-b border-[#000000]/10 pb-4 flex items-center gap-2">
              <Briefcase size={14} /> Experiência Profissional
            </h3>
            <div className="relative border-l border-[#000000]/10 ml-3 space-y-12">
              {DATA.experience.map((job, idx) => (
                <div key={idx} className="pl-8 relative group">
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#000000] border-2 border-white group-hover:scale-125 transition-transform" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                    <h4 className="text-xl font-serif text-[#000000] font-light">{job.role}</h4>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#999999]">{job.period}</span>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#000000]/50 mb-4">{job.company} • {job.location}</p>
                  <ul className="space-y-2">
                    {job.description.map((desc, i) => (
                      <li key={i} className="text-sm text-[#000000]/70 font-light leading-relaxed flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 bg-[#000000]/30 rounded-full shrink-0" /> {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#000000]/40 mb-8 border-b border-[#000000]/10 pb-4 flex items-center gap-2">
              <Award size={14} /> Formação Acadêmica
            </h3>
            <div className="space-y-6">
              {DATA.education.map((edu, idx) => (
                <div key={idx} className="bg-gray-50 p-6 rounded-sm border border-[#000000]/5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#999999] mb-1 block">{edu.period}</span>
                  <h4 className="text-lg font-serif font-medium text-[#000000] mb-1">{edu.degree}</h4>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#000000]/50">{edu.institution}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Direita: Skills */}
        <div className="lg:col-span-4 space-y-12">
          <section>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#000000]/40 mb-6 border-b border-[#000000]/10 pb-4">Competências</h3>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-sm border border-[#000000]/5">
                <div className="flex items-center gap-2 mb-4">
                  <Terminal size={16} /> <h4 className="font-serif font-medium text-lg">Técnicas</h4>
                </div>
                <ul className="space-y-2">
                  {DATA.skills.technical.map((skill, i) => (
                    <li key={i} className="text-xs font-mono text-[#000000]/80 border-b border-[#000000]/5 pb-1">{skill}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-sm border border-[#000000]/5">
                <div className="flex items-center gap-2 mb-4">
                  <Cpu size={16} /> <h4 className="font-serif font-medium text-lg">Soft Skills</h4>
                </div>
                <ul className="space-y-2">
                  {DATA.skills.softSkills.map((skill, i) => (
                    <li key={i} className="text-xs font-mono text-[#000000]/80 border-b border-[#000000]/5 pb-1">{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          
          <div className="pt-4 sticky top-8">
            <a href={DATA.resumeLink} download className="flex items-center justify-center gap-3 w-full px-8 py-4 bg-[#000000] text-white rounded-full hover:bg-[#111111] transition-all text-xs font-bold uppercase tracking-widest shadow-lg">
              <Download size={16} /> Baixar CV Completo
            </a>
          </div>
        </div>

      </div>
    </div>
  </div>
);

// ============================================================================
// COMPONENTE PRINCIPAL: ABOUT SECTION
// ============================================================================
const AboutMe: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const img1Ref = useRef<HTMLImageElement>(null);
  const img2Ref = useRef<HTMLImageElement>(null);
  const img3Ref = useRef<HTMLImageElement>(null);
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

  // Purged GSAP for static validation

  // Bloquear o scroll do body quando o modal abrir
  useEffect(() => {
    if (isResumeOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isResumeOpen]);

  return (
    <>
      <section ref={sectionRef} id="aboutme" className="bg-white py-12 md:py-16 flex flex-col justify-center relative z-10 overflow-hidden">
        <div className="container-fluid relative z-10">
          
          {/* Header Texto */}
          <div className="mb-8 md:mb-10 flex flex-col">
            <h2 className="text-fluid-h3 font-serif font-light leading-[1.3] tracking-tight text-[#666] mb-8 max-w-2xl">
              Sou <span className="font-semibold text-[#111]">Victor Cardoso</span>, especialista em <span className="font-semibold text-[#111]">Análise</span> de<br className="hidden lg:block" />
              <span className="font-semibold text-[#111]">Sistemas</span> e <span className="font-semibold text-[#111]">Liderança Operacional</span>.<br className="hidden lg:block" />
              Transformo <span className="font-semibold text-[#111]">complexidade</span> técnica em<br className="hidden lg:block" />
              <span className="font-semibold text-[#111]">eficiência</span> de negócio, unindo habilidades<br className="hidden lg:block" />
              analíticas e estratégia para entregar <span className="font-semibold text-[#111]">resultados</span><br className="hidden lg:block" />
              reais.
            </h2>
            
            <div className="w-full mt-auto">
              <h3 className="text-fluid-label font-bold uppercase tracking-[0.2em] text-[#111] mb-4 pl-1">
                Sobre Mim
              </h3>
              <div className="w-full h-px bg-[#111]/20" />
            </div>
          </div>

          {/* Imagens Parallax */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-10 max-w-screen-2xl 3xl:max-w-[1600px] mx-auto">
            <div className="aspect-[3/4] overflow-hidden bg-gray-100">
              <img ref={img1Ref} src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800" className="w-full h-[115%] object-cover grayscale will-change-transform" alt="Industrial" />
            </div>

            {/* Imagem clicável que abre o Modal */}
            <div className="aspect-[3/4] overflow-hidden bg-gray-100 cursor-pointer group relative" onClick={() => setIsResumeOpen(true)}>
              <img ref={img2Ref} src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800" className="w-full h-[125%] object-cover grayscale will-change-transform" alt="Perfil" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-500 flex items-center justify-center">
                <span className="text-white font-mono text-xs tracking-widest uppercase border border-white px-6 py-3 backdrop-blur-sm opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                  Ver Currículo
                </span>
              </div>
            </div>

            <div className="aspect-[3/4] overflow-hidden bg-gray-100">
              <img ref={img3Ref} src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800" className="w-full h-[120%] object-cover grayscale will-change-transform" alt="Nature" />
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
            className="absolute inset-0 bg-black/95 cursor-pointer opacity-0 invisible"
          />
          
          {/* Container Branco do Modal */}
          <div
            ref={modalContentRef}
            className="absolute left-0 right-0 bottom-0 z-[9999] w-full bg-white shadow-2xl overflow-hidden flex flex-col h-[98vh] rounded-t-[2rem] max-w-[96vw] mx-auto translate-y-full"
          >
            {/* Botão Fechar */}
            <div className="absolute top-0 right-0 z-50 p-6 md:p-8">
              <button onClick={() => setIsResumeOpen(false)} className="w-12 h-12 rounded-full flex items-center justify-center bg-[#000000] text-white hover:bg-[#333] transition-all">
                <X size={20} />
              </button>
            </div>
            
            {/* Scroll Interno do Currículo */}
            <div className="flex-grow h-full w-full overflow-y-auto bg-white">
              <ResumeContent />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default AboutMe;
