import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from '../lib/gsap';
import Lenis from 'lenis';
import { X, ExternalLink, Github, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from './ui/Image';
import { Project, projects } from '../data/portfolio';
import { Typography } from './ui/Typography';
import { useSearchParams } from 'react-router-dom';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const modalWrapperRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const textElementsRef = useRef<HTMLElement[]>([]);
  
  const scopedLenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number>(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [, setSearchParams] = useSearchParams();

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  
  // Navigation
  const currentIndex = project ? projects.findIndex(p => p.id === project.id) : -1;
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex !== -1 && currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const navigateTo = (id: string) => {
    setSearchParams({ project: id });
    if (scopedLenisRef.current) {
      scopedLenisRef.current.scrollTo(0, { immediate: true });
    }
  };

  // Keyboard Shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxOpen) {
          setLightboxOpen(false);
        } else {
          onClose();
        }
        return;
      }
      
      if (lightboxOpen) {
         if (e.key === 'ArrowLeft' && prevProject) {
            setLightboxOpen(false);
            navigateTo(prevProject.id);
         } else if (e.key === 'ArrowRight' && nextProject) {
            setLightboxOpen(false);
            navigateTo(nextProject.id);
         }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, lightboxOpen, onClose, prevProject, nextProject]);

  // Setup GSAP Animation & Body Locking
  useEffect(() => {
    if (isOpen && project && modalWrapperRef.current) {
      document.body.style.overflow = 'hidden';
      (window as any).lenis?.stop();

      gsap.set(modalWrapperRef.current, { display: 'block' });
      
      // Curtain Effect Reveal
      const tl = gsap.timeline();
      tl.fromTo(modalWrapperRef.current, 
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'expo.inOut' }
      );
      
      // Image Zoom in and Blur reverse
      if (imageWrapperRef.current) {
        tl.fromTo(imageWrapperRef.current,
          { scale: 1.15, filter: 'blur(10px)' },
          { scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
          "-=0.6"
        );
      }
      
      // Text stagger
      if (textElementsRef.current.length) {
        tl.fromTo(textElementsRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
          "-=0.8"
        );
      }

      // Lenis Setup for the entire Modal Wrapper
      if (modalWrapperRef.current) {
        const scopedLenis = new Lenis({
          wrapper: modalWrapperRef.current,
          content: modalWrapperRef.current.firstElementChild as HTMLElement,
          lerp: 0.08,
          orientation: 'vertical',
          touchMultiplier: 2,
        });
        scopedLenisRef.current = scopedLenis;

        const raf = (time: number) => {
          scopedLenis.raf(time);
          rafIdRef.current = requestAnimationFrame(raf);
        };
        rafIdRef.current = requestAnimationFrame(raf);
      }

    } else if (!isOpen && modalWrapperRef.current) {
      // Exit Animation
      gsap.to(modalWrapperRef.current, {
        clipPath: 'inset(100% 0 0 0)', 
        duration: 0.8, 
        ease: 'expo.inOut',
        onComplete: () => {
          gsap.set(modalWrapperRef.current, { display: 'none' });
          document.body.style.overflow = '';
          (window as any).lenis?.start();
          cancelAnimationFrame(rafIdRef.current);
          scopedLenisRef.current?.destroy();
          scopedLenisRef.current = null;
        }
      });
    }
    
    // Clear text refs array when closing or changing projects so it re-animates fresh
    return () => {
       textElementsRef.current = [];
    };
  }, [isOpen, project]);

  if (!project) return null;

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !textElementsRef.current.includes(el)) {
      textElementsRef.current.push(el);
    }
  };

  return createPortal(
    <>
      <div 
        ref={modalWrapperRef}
        className="fixed inset-0 z-[9998] bg-[#FAFAFA] text-[#1a1a1a] overflow-y-auto"
        style={{ display: 'none', scrollbarWidth: 'none' }}
      >
        <div className="w-full flex flex-col min-h-screen">
          
          {/* CONTENT WRAPPER: LEFT (STICKY) + RIGHT (SCROLLS) */}
          <div className="flex flex-col md:flex-row w-full flex-grow">
            
            {/* LEFT PANEL - STICKY */}
            <div className="w-full md:w-[35%] border-b md:border-b-0 md:border-r border-[#1a1a1a]/10 bg-white z-10 relative">
              <div className="md:sticky md:top-0 md:h-screen p-8 md:p-16 flex flex-col justify-between">
                <div>
                  <div ref={addToRefs} className="mb-12">
                     <button
                      ref={closeButtonRef}
                      onClick={onClose}
                      aria-label="Fechar projeto"
                      className="w-12 h-12 bg-[#1a1a1a] text-[#FFFFFF] hover:bg-[#1a1a1a]/80 hover:scale-105 active:scale-95 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1a1a1a]/40"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div ref={addToRefs}>
                    <Typography variant="label" className="mb-4 uppercase tracking-[0.2em] text-[#1a1a1a]/50 text-xs">
                      {project.category} · {project.year}
                    </Typography>
                  </div>

                  <div ref={addToRefs}>
                    <h2 className="text-4xl md:text-6xl tracking-widest leading-tight mb-8">
                      <span className="font-serif italic mr-2">{project.title.substring(0, Math.floor(project.title.length/2))}</span>
                      <span className="font-sans lowercase tracking-widest">{project.title.substring(Math.floor(project.title.length/2))}</span>
                    </h2>
                  </div>
                  
                  <div ref={addToRefs}>
                    <Typography variant="p" className="text-lg md:text-xl text-[#1a1a1a]/80 mb-12 font-serif italic font-light leading-relaxed">
                      {project.fullDescription}
                    </Typography>
                  </div>

                  <div ref={addToRefs} className="flex flex-wrap gap-4 mt-6">
                      {project.liveUrl && project.liveUrl !== '#' && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold border border-[#1a1a1a]/20 hover:border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#FFFFFF] text-[#1a1a1a]/70 px-5 py-3 rounded-full transition-all duration-300 font-sans focus:outline-none"
                        >
                          <ExternalLink size={14} /> Live Site
                        </a>
                      )}
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold border border-[#1a1a1a]/20 hover:border-[#1a1a1a] text-[#1a1a1a]/70 hover:text-[#1a1a1a] px-5 py-3 rounded-full transition-all duration-300 font-sans focus:outline-none"
                        >
                          <Github size={14} /> Repository
                        </a>
                      )}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL - NATURAL SCROLL */}
            <div className="w-full md:w-[65%] bg-[#FAFAFA] flex flex-col">
              
              {/* Main Image Banner */}
              <div className="w-full p-4 md:p-12 pb-0">
                 <div 
                   className="w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-2xl md:rounded-3xl cursor-zoom-in"
                   onClick={() => setLightboxOpen(true)}
                 >
                   <div ref={imageWrapperRef} className="w-full h-full">
                     <Image 
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover origin-center transition-transform duration-700 hover:scale-[1.02]"
                     />
                   </div>
                 </div>
              </div>

              {/* Additional Content Blocks */}
              <div className="p-8 md:p-16 max-w-4xl mx-auto w-full">
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
                   <div>
                      <Typography as="h3" variant="label" className="mb-4 uppercase tracking-[0.2em] text-[#1a1a1a]/50 text-[10px]">O Desafio de Engenharia</Typography>
                      <Typography variant="p" className="text-lg md:text-xl font-serif font-light text-[#1a1a1a]">
                        {project.problem}
                      </Typography>
                   </div>
                   <div>
                      <Typography as="h3" variant="label" className="mb-4 uppercase tracking-[0.2em] text-[#1a1a1a]/50 text-[10px]">Papel & Execução</Typography>
                      <Typography variant="p" className="text-base md:text-lg text-[#1a1a1a]/80">
                        {project.role}
                      </Typography>
                   </div>
                 </div>

                 <div className="mb-24">
                    <Typography as="h3" variant="label" className="mb-4 uppercase tracking-[0.2em] text-[#1a1a1a]/50 text-[10px]">Arquitetura & Clean Code</Typography>
                    <Typography variant="p" className="text-xl md:text-3xl font-medium mb-12 text-[#1a1a1a] leading-tight">
                      {project.architecture}
                    </Typography>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map(tech => (
                        <span key={tech} className="text-[10px] font-bold uppercase tracking-widest border border-[#1a1a1a]/20 text-[#1a1a1a]/70 px-4 py-2 rounded-full font-sans">
                          {tech}
                        </span>
                      ))}
                    </div>
                 </div>

                 <div className="mb-24">
                    <Typography as="h3" variant="label" className="mb-4 uppercase tracking-[0.2em] text-[#1a1a1a]/50 text-[10px]">Resultado & Impacto</Typography>
                    <Typography variant="h2" className="text-3xl md:text-5xl font-serif italic text-[#1a1a1a]">
                      "{project.outcome}"
                    </Typography>
                 </div>

              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="w-full bg-[#1a1a1a] text-[#FAFAFA] px-8 py-16 md:px-16 md:py-32 flex flex-col md:flex-row justify-between items-center gap-8 relative z-20">
             <div className="flex flex-col items-center md:items-start text-center md:text-left">
               <Typography variant="label" className="text-white/50 mb-2 uppercase tracking-widest text-[10px]">Pronto para mais?</Typography>
               <h3 className="text-3xl md:text-5xl font-serif italic tracking-wider">Continue Explorando</h3>
             </div>

             <div className="flex items-center gap-4 md:gap-8">
               {prevProject ? (
                  <button 
                    onClick={() => navigateTo(prevProject.id)} 
                    className="flex flex-col items-center md:items-end group"
                  >
                    <span className="text-[10px] uppercase tracking-widest text-white/50 group-hover:text-white transition-colors mb-2 flex items-center gap-2">
                      <ArrowLeft size={14} /> Anterior
                    </span>
                    <span className="text-xl md:text-2xl font-sans tracking-widest">{prevProject.title}</span>
                  </button>
               ) : <div className="w-32" />}

               <div className="w-[1px] h-16 bg-white/20 hidden md:block" />

               {nextProject ? (
                  <button 
                    onClick={() => navigateTo(nextProject.id)} 
                    className="flex flex-col items-center md:items-start group"
                  >
                    <span className="text-[10px] uppercase tracking-widest text-white/50 group-hover:text-white transition-colors mb-2 flex items-center gap-2">
                      Próximo <ArrowRight size={14} />
                    </span>
                    <span className="text-xl md:text-2xl font-sans tracking-widest">{nextProject.title}</span>
                  </button>
               ) : <div className="w-32" />}
             </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          onClick={() => setLightboxOpen(false)}
        >
           <button 
             onClick={() => setLightboxOpen(false)}
             className="absolute top-8 right-8 w-12 h-12 bg-white/10 text-white hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none z-50"
           >
             <X size={20} />
           </button>
           <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
             <img 
               src={project.image} 
               alt={project.title} 
               className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
             />
           </div>
        </div>
      )}
    </>,
    document.body
  );
}
