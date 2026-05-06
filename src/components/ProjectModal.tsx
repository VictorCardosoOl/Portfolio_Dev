import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from '../lib/gsap';
import Lenis from 'lenis';
import { X, ExternalLink, Github } from 'lucide-react';
import Image from './ui/Image';
import { Project } from '../data/portfolio';

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
  // C1 FIX: Guardar o ID do RAF para cancelamento correto
  const rafIdRef        = useRef<number>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      gsap.set(wrapperRef.current, { display: 'block' });
      gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.4 });
      gsap.fromTo(modalOuterRef.current, { y: '100%' }, { y: '2%', duration: 0.8, ease: 'expo.out' });

      // C1 FIX: Move focus into the modal after animation
      const focusTimeout = setTimeout(() => {
        const focusable = modalOuterRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        focusable?.focus();
      }, 850);

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

          // C1 FIX: Guardar rafId e cancelar corretamente no cleanup
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
        window.removeEventListener('keydown', handleKeyDown);
        // C1 FIX: Cancelar RAF antes de destruir Lenis
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
      window.removeEventListener('keydown', handleKeyDown);
      // C1 FIX: Cancelar RAF no fechamento também
      cancelAnimationFrame(rafIdRef.current);
      scopedLenisRef.current?.destroy();
      scopedLenisRef.current = null;
    }
  }, [isOpen, onClose]);

  if (!project) return null;

  return createPortal(
    <div ref={wrapperRef} style={{ display: 'none' }} className="fixed inset-0 z-[9998]">
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 opacity-0 invisible"
        aria-hidden="true"
      />

      {/* D1 FIX: role="dialog" + aria-modal + aria-labelledby */}
      <div
        ref={modalOuterRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
        className="absolute left-0 right-0 bottom-0 z-[9999] bg-[#f4f2ee] text-[#111] rounded-t-[2rem] h-[98vh] overflow-hidden shadow-2xl translate-y-full"
      >
        {/* Scoped Lenis Scroll Container */}
        <div ref={modalContainerRef} className="h-full w-full overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
          <div ref={modalContentRef} className="pb-32 flex flex-col items-center">

            {/* Giant background title */}
            <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none flex justify-center pt-20 md:pt-28 opacity-[0.04] select-none" aria-hidden="true">
              <span className="text-[15vw] font-bold uppercase tracking-tighter whitespace-nowrap">
                {project.title}
              </span>
            </div>

            {/* ── HEADER ── */}
            <div className="container mx-auto px-6 mt-24 md:mt-36 mb-10 flex flex-col items-center text-center relative z-10">
              <div className="flex gap-3 items-center mb-6 text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-[#111]/40">
                <span>{project.category}</span>
                <span className="w-1 h-1 rounded-full bg-[#111]/40" aria-hidden="true" />
                <span>{project.year}</span>
              </div>

              {/* D1 FIX: id para aria-labelledby */}
              <h2
                id="modal-project-title"
                className="text-6xl sm:text-7xl md:text-[9rem] lg:text-[11rem] font-serif font-light uppercase leading-[0.85] tracking-tighter max-w-[90vw]"
              >
                {project.title}
              </h2>

              {/* External links */}
              <div className="flex gap-4 mt-8">
                {project.liveUrl && project.liveUrl !== '#' && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold border border-[#111]/20 hover:border-[#111] text-[#111]/60 hover:text-[#111] px-5 py-2.5 rounded-full transition-all duration-200"
                  >
                    <ExternalLink size={12} />
                    Ver ao vivo
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold border border-[#111]/20 hover:border-[#111] text-[#111]/60 hover:text-[#111] px-5 py-2.5 rounded-full transition-all duration-200"
                  >
                    <Github size={12} />
                    Repositório
                  </a>
                )}
              </div>
            </div>

            {/* ── PROJECT IMAGE ── */}
            <div className="w-full max-w-[90vw] md:max-w-[75vw] xl:max-w-[65vw] aspect-[4/3] md:aspect-video relative z-20 mb-20">
              <div className="absolute inset-0 w-full h-full rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl">
                <Image
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                />
              </div>
            </div>

            {/* ── CONTENT ── */}
            <div className="container mx-auto px-6 max-w-4xl relative z-10 w-full">

              {/* Meta row */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 border-b border-[#111]/10 pb-12 mb-12">
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.25em] opacity-40 mb-2 font-bold">Projeto</h4>
                  <p className="text-base font-medium">{project.title}</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.25em] opacity-40 mb-2 font-bold">Categoria</h4>
                  <p className="text-base font-medium">{project.category}</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.25em] opacity-40 mb-2 font-bold">Ano</h4>
                  <p className="text-base font-medium">{project.year}</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-12">
                <p className="text-xl md:text-2xl font-serif font-light leading-relaxed text-[#111]/80 max-w-3xl">
                  {project.fullDescription}
                </p>
              </div>

              {/* Technical Challenge */}
              <div className="bg-[#111] text-cream rounded-2xl p-8 md:p-10 mb-12">
                <h3 className="text-[10px] uppercase tracking-[0.25em] font-bold text-cream/60 mb-4">
                  ⚙ Desafio Técnico
                </h3>
                <p className="text-base md:text-lg font-light leading-relaxed text-cream/80">
                  {project.technicalChallenge}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="mb-12">
                <h3 className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#111]/60 mb-5">
                  Stack utilizada
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <span
                      key={tech}
                      className="text-xs font-bold uppercase tracking-widest border border-[#111]/15 text-[#111]/60 px-4 py-2 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Fechar projeto"
          className="absolute top-6 right-6 md:top-8 md:right-8 z-50 w-12 h-12 bg-black/5 hover:bg-black text-black hover:text-white rounded-full flex items-center justify-center transition-colors duration-300 backdrop-blur-md"
        >
          <X size={20} />
        </button>
      </div>
    </div>,
    document.body
  );
}
