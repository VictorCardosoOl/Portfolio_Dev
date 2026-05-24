import { useEffect, useRef } from 'react';
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
  const modalOuterRef   = useRef<HTMLDivElement>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const overlayRef      = useRef<HTMLDivElement>(null);
  const wrapperRef      = useRef<HTMLDivElement>(null);
  const scopedLenisRef  = useRef<Lenis | null>(null);
  const rafIdRef        = useRef<number>(0);
  const closeButtonRef  = useRef<HTMLButtonElement>(null);
  const [, setSearchParams] = useSearchParams();

  // Handle Focus Trap & Keyboard Shortcuts
  useEffect(() => {
    if (!isOpen || !modalOuterRef.current) return;

    const modal = modalOuterRef.current;
    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab') {
        if (e.shiftKey) { // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else { // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, project]); // Depend on project to re-evaluate focusable elements when navigating

  // Handle animations & global body/scroll locking
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Pausa o lenis global na Home para não rolar em background
      (window as any).lenis?.stop();

      gsap.set(wrapperRef.current, { display: 'block' });
      gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.4 });
      gsap.fromTo(modalOuterRef.current, { y: '100%' }, { y: '2%', duration: 0.8, ease: 'expo.out' });

      // Auto-focus no botão de fechar quando abre
      const focusTimeout = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 850);

      // Iniciar o Lenis escopado do modal
      const timeout = setTimeout(() => {
        if (modalContainerRef.current && modalContentRef.current) {
          const scopedLenis = new Lenis({
            wrapper: modalContainerRef.current,
            content: modalContentRef.current,
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
      }, 300);

      return () => {
        clearTimeout(timeout);
        clearTimeout(focusTimeout);
        document.body.style.overflow = '';
        (window as any).lenis?.start();
        cancelAnimationFrame(rafIdRef.current);
        scopedLenisRef.current?.destroy();
        scopedLenisRef.current = null;
      };
    } else {
      if (wrapperRef.current) {
        gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.4 });
        gsap.to(modalOuterRef.current, {
          y: '100%', duration: 0.5, ease: 'expo.in',
          onComplete: () => gsap.set(wrapperRef.current, { display: 'none' }),
        });
      }
      document.body.style.overflow = '';
      (window as any).lenis?.start();
      cancelAnimationFrame(rafIdRef.current);
      scopedLenisRef.current?.destroy();
      scopedLenisRef.current = null;
    }
  }, [isOpen]); 

  // Reset scroll on navigate between projects
  useEffect(() => {
    if (project && scopedLenisRef.current) {
       scopedLenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [project]);

  if (!project) return null;

  const currentIndex = projects.findIndex(p => p.id === project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const navigateTo = (id: string) => {
    setSearchParams({ project: id });
  };

  return createPortal(
    <div ref={wrapperRef} style={{ display: 'none' }} className="fixed inset-0 z-[9998]">
      {/* Overlay Escuro */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 opacity-0 invisible"
        aria-hidden="true"
      />

      <div
        ref={modalOuterRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
        tabIndex={-1}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onClose();
        }}
        className="absolute left-0 right-0 bottom-0 z-[9999] bg-[#FFFFFF] text-[#1a1a1a] rounded-t-[2rem] md:rounded-t-[3rem] h-[98vh] overflow-hidden shadow-2xl translate-y-full border-t border-[#1a1a1a]/10 outline-none"
      >
        <div ref={modalContainerRef} className="h-full w-full overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
          <div ref={modalContentRef} className="pb-16 md:pb-32 flex flex-col items-center">

            {/* BG Gigante */}
            <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none flex justify-center pt-20 md:pt-28 opacity-[0.04] select-none" aria-hidden="true">
              <span className="text-[15vw] font-bold uppercase tracking-tighter whitespace-nowrap font-serif">
                {project.title}
              </span>
            </div>

            {/* ── HEADER ── */}
            <div className="container mx-auto px-6 mt-16 md:mt-36 mb-10 md:mb-16 flex flex-col items-center text-center relative z-10">
              <Typography variant="label" className="mb-6 flex items-center gap-3">
                <span>{project.category}</span>
                <span className="w-1 h-1 rounded-full bg-[#1a1a1a]/40" aria-hidden="true" />
                <span>{project.year}</span>
              </Typography>

              <Typography
                as="h2"
                id="modal-project-title"
                variant="huge"
                className="max-w-[90vw]"
              >
                {project.title}
              </Typography>

              {/* External links */}
              <div className="flex flex-wrap justify-center gap-4 mt-6 md:mt-10">
                {project.liveUrl && project.liveUrl !== '#' && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold border border-[#1a1a1a]/20 hover:border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#FFFFFF] text-[#1a1a1a]/70 px-6 py-3 rounded-full transition-all duration-300 font-sans focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1a1a]"
                  >
                    <ExternalLink size={14} />
                    Ver ao vivo
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold border border-[#1a1a1a]/20 hover:border-[#1a1a1a] text-[#1a1a1a]/70 hover:text-[#1a1a1a] px-6 py-3 rounded-full transition-all duration-300 font-sans focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1a1a]"
                  >
                    <Github size={14} />
                    Repositório
                  </a>
                )}
              </div>
            </div>

            {/* ── PROJECT IMAGE ── */}
            <div className="w-full max-w-[90vw] md:max-w-[80vw] xl:max-w-[70vw] aspect-[4/3] md:aspect-video relative z-20 mb-12 md:mb-24">
              <div className="absolute inset-0 w-full h-full rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl bg-black">
                <Image
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale mix-blend-screen opacity-90 hover:scale-105 transition-transform duration-1000"
                />
              </div>
            </div>

            {/* ── CONTENT (Brutalismo Minimalista) ── */}
            <div className="container mx-auto px-6 max-w-5xl relative z-10 w-full">

              {/* Meta row */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 border-b border-[#1a1a1a]/20 pb-8 md:pb-12 mb-10 md:mb-16">
                <div>
                  <Typography variant="label" className="mb-2">Projeto</Typography>
                  <Typography variant="h4">{project.title}</Typography>
                </div>
                <div>
                  <Typography variant="label" className="mb-2">Categoria</Typography>
                  <Typography variant="h4">{project.category}</Typography>
                </div>
                <div>
                  <Typography variant="label" className="mb-2">Ano</Typography>
                  <Typography variant="h4">{project.year}</Typography>
                </div>
              </div>

              {/* Desafio Técnico */}
              <div className="mb-10 md:mb-16">
                <Typography as="h3" variant="label" className="mb-4">O Desafio de Engenharia</Typography>
                <Typography variant="h3">
                  {project.problem}
                </Typography>
              </div>

              {/* Arquitetura */}
              <div className="mb-10 md:mb-16">
                <Typography as="h3" variant="label" className="mb-4">Arquitetura & Clean Code</Typography>
                <Typography variant="p" className="text-lg md:text-2xl font-medium mb-8 text-[#1a1a1a]">
                  {project.architecture}
                </Typography>
                <div className="flex flex-wrap gap-3">
                  {project.techStack.map(tech => (
                    <span
                      key={tech}
                      className="text-xs font-bold uppercase tracking-widest border border-[#1a1a1a] text-[#1a1a1a] px-6 py-2 rounded-full font-sans"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Role */}
              <div className="mb-10 md:mb-16">
                <Typography as="h3" variant="label" className="mb-4">Papel & Execução</Typography>
                <Typography variant="p" className="text-lg md:text-xl text-[#1a1a1a]/90">
                  {project.role}
                </Typography>
              </div>

              {/* Outcome */}
              <div className="mb-12 md:mb-24">
                <Typography as="h3" variant="label" className="mb-4">Resultado & Impacto</Typography>
                <Typography variant="h2">
                  {project.outcome}
                </Typography>
              </div>

              {/* Footer Navigation Buttons */}
              <div className="border-t border-[#1a1a1a]/20 pt-16 flex justify-between items-center gap-4 flex-wrap">
                {prevProject ? (
                  <button 
                    onClick={() => navigateTo(prevProject.id)}
                    className="flex items-center gap-3 text-xs uppercase tracking-widest font-bold text-[#1a1a1a]/50 hover:text-[#1a1a1a] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1a1a] p-3 rounded-full hover:bg-[#1a1a1a]/5 font-sans"
                  >
                    <ArrowLeft size={16} />
                    Projeto Anterior
                  </button>
                ) : <div />}
                
                {nextProject ? (
                  <button 
                    onClick={() => navigateTo(nextProject.id)}
                    className="flex items-center gap-3 text-xs uppercase tracking-widest font-bold text-[#1a1a1a]/50 hover:text-[#1a1a1a] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1a1a] p-3 rounded-full hover:bg-[#1a1a1a]/5 font-sans"
                  >
                    Próximo Projeto
                    <ArrowRight size={16} />
                  </button>
                ) : <div />}
              </div>

            </div>
          </div>
        </div>

        {/* HIGH CONTRAST CLOSE BUTTON */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Fechar projeto"
          className="absolute top-6 right-6 md:top-8 md:right-8 z-50 w-16 h-16 bg-[#1a1a1a] text-[#FFFFFF] hover:bg-[#1a1a1a]/80 hover:scale-105 active:scale-95 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl border border-[#1a1a1a]/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1a1a1a]/40"
        >
          <X size={28} />
        </button>
      </div>
    </div>,
    document.body
  );
}
